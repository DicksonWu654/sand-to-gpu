# Security

## Report a vulnerability

Please avoid putting credentials, personal data, or an unpatched vulnerability's exploitation details in a public issue.

Use GitHub's **Security → Report a vulnerability** option when it is available for this repository. If private reporting is unavailable, open an issue titled “Private security contact requested” without vulnerability details, and wait for a maintainer to establish a private channel. No response-time guarantee or bounty program is currently offered.

A useful private report identifies the affected commit or version, component, expected security boundary, impact, and minimal reproduction needed to understand the problem. Use synthetic data and avoid accessing other people's systems or information.

## Supported scope

Security fixes target the current `main` branch. Historical snapshots, old review artifacts, and independently hosted copies are not separately maintained releases.

The project includes a static learning application, a local development server, and an optional local speech-generation service. The development server binds to `127.0.0.1` by default. Keep the narration backend local; publish static files for a public reader instead of exposing the development service. See the [release guide](docs/PUBLISHING.md).

## Data and dependencies

Reading progress and preferences are stored in the browser. The reader's **Copy page for AI** action copies text locally; it does not submit that text to an AI provider. The current page loads fonts from Google Fonts, and source links may lead to external websites.

Optional narration setup downloads Python dependencies and model assets. Speech is subsequently synthesized on the local machine and saved in a local cache. A static audio edition serves existing recordings and word-timing files. These assets and runtime environments are excluded from the source repository.

Do not include secrets, local caches, personal browser data, or private files in contributions or release bundles. Dependency installation and model downloads require their own upstream trust; pinned versions and automated checks do not constitute a security certification.
