# GitHub Actions and GPT Sites

The workflow builds Takewheel on an Ubuntu runner and saves its Worker, browser assets, database migrations, and exact source revision as a downloadable artifact. It does not deploy to GitHub Pages or automatically publish to GPT Sites.

1. Push the app files at the repository root (package.json must be at the root).
2. Open the repository's Actions tab and choose Build Takewheel for GPT Sites.
3. The workflow runs on pushes to main. If necessary select Run workflow manually. If Actions is disabled, enable it in repository settings.
4. Open the completed run. Download the takewheel-sites-build artifact. Failed runs have step logs explaining the failure.
5. Return the run URL to this Codex chat. The exact source still needs synchronization to the existing private Sites repository, supported packaging, and a native Sites save/deploy operation. A successful Actions build alone is not a live deployment.

No Sites credentials or GitHub personal access token are needed for the build. Never put short-lived Sites source credentials in this workflow. No supported unattended Sites deployment API has been configured.

The source manifest reuses Site appgprj_6ac3bada28248191b387182a561afff0. Retain it. The app relies on Sites-managed D1 and authenticated identity headers. Hosting this build on another provider requires database wiring and replacement authentication; directly trusting client-supplied identity headers would be unsafe.

References:
- https://docs.github.com/en/actions/tutorials/store-and-share-data
- https://github.com/actions/upload-artifact
