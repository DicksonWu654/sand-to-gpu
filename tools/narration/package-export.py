"""Package a verified, completed static course; never include the local model/runtime."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import subprocess
import tempfile
import zipfile

PROJECT = Path(__file__).resolve().parents[2]
ALLOWED = {'.html', '.js', '.css', '.json', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.ico', '.woff', '.woff2', '.ttf', '.otf', '.mp3', '.txt', '.xml', '.webmanifest', '.map', '.md'}
EXPECTED_LESSONS = {f'#/s/{n:02}' for n in range(1, 11)} | {f'#/m/{n:02}' for n in range(22)}


def read_json(file):
    return json.loads(file.read_text(encoding='utf-8'))


def sha256(file):
    digest = hashlib.sha256()
    with file.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(block)
    return digest.hexdigest()


def outside_git(destination):
    if destination == PROJECT or PROJECT in destination.parents:
        raise ValueError('Archive must be outside the source repository.')
    parent = destination.parent
    while not parent.exists():
        parent = parent.parent
    result = subprocess.run(['git', '-C', str(parent), 'rev-parse', '--show-toplevel'], capture_output=True)
    if result.returncode == 0:
        raise ValueError('Archive destination is inside a Git repository.')


def validate(export, progress):
    render = read_json(progress / 'progress.json')
    encoded = read_json(progress / 'export-progress.json')
    if render.get('status') != 'complete' or encoded.get('status') != 'complete':
        raise ValueError('Rendering and MP3 export must both report complete before packaging.')
    if render.get('failedClips', 0) or encoded.get('failedClips', 0):
        raise ValueError('Export still reports failed clips.')
    if Path(render.get('output', '')).resolve() != export or Path(encoded.get('output', '')).resolve() != export:
        raise ValueError('Progress records refer to a different export directory.')
    index_file = export / 'narration' / 'index.json'
    index = read_json(index_file)
    if index.get('version') != 1 or index.get('complete') is not True or index.get('voice') != 'af_heart' or index.get('audioFormat') != 'mp3':
        raise ValueError('A complete Heart MP3 index is required.')
    if set(index.get('lessons', {})) != EXPECTED_LESSONS:
        raise ValueError('The complete set of 32 lessons is required.')
    if index.get('sourceHash') != render.get('sourceHash') or sha256(export / 'content.js') != index['sourceHash']:
        raise ValueError('Exported course content differs from the completed render.')
    if 'name="narration-mode" content="static"' not in (export / 'index.html').read_text(encoding='utf-8'):
        raise ValueError('The static-only narration marker is missing.')
    referenced_audio = set()
    for lesson_id, entry in index['lessons'].items():
        stem = lesson_id.replace('#/', '').replace('/', '')
        if entry.get('manifest') != f'lessons/{stem}.json':
            raise ValueError('Unexpected lesson manifest path.')
        chapter = read_json(export / 'narration' / entry['manifest'])
        if chapter.get('complete') is not True or chapter.get('voice') != 'af_heart' or chapter.get('lessonId') != lesson_id or not chapter.get('passages'):
            raise ValueError(f'Incomplete lesson manifest: {lesson_id}')
        for passage in chapter['passages']:
            audio_url = passage.get('audioUrl', '')
            if not re.fullmatch(r'audio/[a-f0-9]{64}\.mp3', audio_url):
                raise ValueError('A passage references unexpected or uncompressed audio.')
            audio = export / 'narration' / audio_url
            if not audio.is_file() or audio.stat().st_size <= 500:
                raise ValueError(f'Missing or empty audio: {audio_url}')
            if not passage.get('text') or not passage.get('words') or passage.get('duration', 0) <= 0:
                raise ValueError('A passage lacks text, word timings or duration.')
            referenced_audio.add(audio.relative_to(export).as_posix())
    if len(referenced_audio) != render.get('uniqueClips') or len(referenced_audio) != encoded.get('compressedClips'):
        raise ValueError('Audio inventory and completion counts differ.')
    files = []
    for directory, folders, names in os.walk(export, followlinks=False):
        directory = Path(directory)
        for name in folders + names:
            candidate = directory / name
            if candidate.is_symlink():
                raise ValueError(f'Symlinks are not allowed in a publication bundle: {candidate.relative_to(export)}')
        for name in names:
            file = directory / name
            relative = file.relative_to(export).as_posix()
            if not stat.S_ISREG(file.stat().st_mode):
                raise ValueError(f'Nonregular asset: {relative}')
            if file.suffix.lower() not in ALLOWED or any(part.startswith('.') for part in file.relative_to(export).parts):
                raise ValueError(f'Unexpected artifact in completed static export: {relative}')
            if file.suffix.lower() == '.mp3' and relative not in referenced_audio:
                raise ValueError(f'Unreferenced audio remains in completed export: {relative}')
            files.append((file, relative, file.stat().st_size, file.stat().st_mtime_ns))
    return sorted(files, key=lambda row: row[1]), sha256(index_file), len(referenced_audio)


def main():
    base = Path(os.environ.get('NARRATION_HOME', Path.home() / '.cache' / 'sand-to-gpu'))
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, default=base / 'static-export')
    parser.add_argument('--progress-dir', type=Path, default=base / 'prerender')
    parser.add_argument('--output', type=Path, required=True, help='New ZIP path outside Git; an existing file is never overwritten.')
    options = parser.parse_args()
    if options.source.is_symlink():
        raise ValueError('Export root may not be a symlink.')
    export, progress = options.source.resolve(), options.progress_dir.resolve()
    destination = options.output.absolute()
    if destination.is_symlink() or destination.exists():
        raise ValueError('Archive already exists; choose a new filename.')
    destination = destination.resolve()
    if destination.suffix.lower() != '.zip' or export == destination or export in destination.parents:
        raise ValueError('Choose a .zip file outside the export directory.')
    outside_git(destination)
    files, index_hash, audio_count = validate(export, progress)
    destination.parent.mkdir(parents=True, exist_ok=True)
    temporary = None
    try:
        descriptor, temporary_name = tempfile.mkstemp(prefix='.' + destination.name + '.', suffix='.tmp', dir=destination.parent)
        os.close(descriptor)
        temporary = Path(temporary_name)
        with zipfile.ZipFile(temporary, 'w', allowZip64=True, strict_timestamps=False) as archive:
            for count, (file, relative, size, modified) in enumerate(files, 1):
                mode = zipfile.ZIP_STORED if file.suffix.lower() == '.mp3' else zipfile.ZIP_DEFLATED
                archive.write(file, relative, compress_type=mode, compresslevel=None if mode == zipfile.ZIP_STORED else 6)
                current = file.stat()
                if current.st_size != size or current.st_mtime_ns != modified:
                    raise ValueError('Export changed during packaging; archive withheld.')
                if count % 1000 == 0:
                    print(f'Packaged {count}/{len(files)} assets', flush=True)
        final_files, final_index_hash, final_audio_count = validate(export, progress)
        if final_index_hash != index_hash or final_files != files or final_audio_count != audio_count:
            raise ValueError('Export changed during packaging; archive withheld.')
        with zipfile.ZipFile(temporary) as archive:
            if archive.testzip() is not None:
                raise ValueError('ZIP integrity check failed.')
        archive_hash = sha256(temporary)
        # Atomic, no-clobber publication. Both paths are on the destination filesystem.
        # Unlike replace()/rename(), link() fails if another file appeared at the target.
        os.link(temporary, destination)
        temporary.unlink()
        temporary = None
        print(json.dumps({'archive': str(destination), 'files': len(files), 'lessons': 32, 'audioClips': audio_count, 'bytes': destination.stat().st_size, 'sha256': archive_hash}, indent=2))
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, KeyError, TypeError, json.JSONDecodeError) as error:
        raise SystemExit(f'Packaging stopped: {error}')
