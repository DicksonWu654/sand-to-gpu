# Public readiness audit

Date: 2026-09-14. Baseline: `7c33ec3` (15 commits). This is a bounded repository privacy and secret review, with a current-tree cleanup. It does not change repository visibility or rewrite history.

## Checks performed

- Enumerated all 501 baseline tracked files and all objects reachable from local Git refs. Scanned 913 distinct blob versions, totaling 73,675,334 bytes, for common private-key headers, GitHub tokens, AWS access-key IDs, API-token patterns, credential-bearing HTTP URLs, credential assignments, and personal workstation/session identifiers.
- Ran Gitleaks 8.30.1 with its default rules and full redaction against all 15 commits (`gitleaks git --log-opts=--all --redact`) and a temporary snapshot of the 501 current tracked files (`gitleaks dir --redact`). History scanning processed approximately 55.03 MB of diff data; the current-tree scan processed approximately 22.43 MB.
- Reviewed all 15 Gitleaks alerts in each scan. They are `generic-api-key` matches on SHA-256 narration cache identifiers in six QA files. These values select generated recordings; they do not authorize access. The cache-key construction is in `tools/narration/backend.js`. They were retained as useful reproducibility evidence, without a broad secret-scanner exclusion.
- Reviewed the separate token-pattern candidate: an SK hynix article URL slug, not a credential. No actionable secret was found by these checks.
- Checked tracked filenames for credential files, private keys, model weights, recordings, archives and screenshots. None were tracked at the baseline. All baseline tracked files were text; current tracked JSON remained parseable after cleanup.
- Read the development server, narration API boundary, model setup and main HTML. The server defaults to loopback; narration requests require local, same-origin access. Static-only serving is available. The main HTML requests Google Fonts, so the site should not be described as making no third-party requests.

## Current-tree cleanup

Removed personal machine paths, the obsolete private hosted-artifact URL, session/workflow identifiers and an irrelevant personal spending-limit comment from 15 documentation/report files. Paths into this repository are now relative. Paths to excluded recordings, runtimes and downloads use descriptive placeholders such as `<home>` and `<downloads>`. These identify historical local evidence; they are not downloadable public assets.

The technical review findings, iteration sequence, failure reports, numerical results and recording checksums remain intact. The current-tree scan found no remaining known workstation usernames, private artifact URLs or workflow IDs in tracked documentation and reports immediately after this cleanup. Newly generated reports should use relative paths to preserve that property.

Files sanitized:

- `HANDOFF.md` and `PRERENDER_2026-09-13.md`
- `course/review/backhalf-reader-followup-2026-09-13.md`
- `qa/historical-critiques-2026-09-13.json`
- `qa/reports/global-coverage.json`
- `qa/reports/language-build-contract-review.json`
- `qa/reports/language-readability.json`
- `qa/reports/module08-sample.json`
- `qa/reports/narration-gpu-benchmark.json`
- `qa/reports/narration-neutrality-release.json`
- `qa/reports/narration-package.json`
- `qa/reports/narration-prerender.json`
- `qa/reports/narration.json`
- `qa/reports/section-figures.json`
- `qa/reports/shell-final-first-attempt.txt`

## What remains in history

The existing signed history is preserved. Making this repository public would expose its earlier versions as well as the current tree. At the baseline, 49 historical blob versions contained workstation paths, 32 contained session/workflow identifiers, and 12 contained the obsolete private artifact URL and personal spending-limit note. These categories overlap. The author/committer email and public signing identity also remain in Git metadata.

Current-tree cleanup does not erase those historical values. No private signing key or access credential was found. Before changing visibility, the owner should understand that preserving the original history publishes these identifiers. Publishing with different historical privacy properties would require a separately chosen history strategy.

## Scope and limits

This review covers the local reachable Git history and tracked working-tree snapshot. It does not inspect GitHub account settings, releases, issue attachments, remote refs absent locally, reflogs, unreachable objects, personal browser storage, or ignored model/audio caches. Pattern scans and Gitleaks reduce risk but cannot prove that every secret or personal detail is absent. No offensive testing or third-party probing was performed.

The review also identified publication documentation needs: an explicit project license; clear treatment of third-party code, fonts and optional speech dependencies; and a distinction between the source repository and the much larger generated audio distribution. Those are release-documentation tasks, not a legal clearance of every cited source or model output. Linked research, company names and source quotations do not become project-owned material merely by being included in the course. This audit does not certify content accuracy or rights in every source.
