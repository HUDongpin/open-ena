# Open ENA

Open ENA is a focused, two-page public website and interface preview for browser-based Epistemic Network Analysis. It is a subproject of the ENA project and is designed around openness: open methods, open tooling, and a transparent path from coded data to epistemic networks.

## Current scope

- `/` — Open ENA brand introduction and a faithful static/UI-only preview of the ENA workbench
- `/about` — project team
- Next.js 16 and React 19
- `jena-js` 0.6.2 is pinned for the later analysis integration
- No dataset parsing, model fitting, 3D ENA, ONA, exports, or authentication is implemented in this first UI milestone

The analysis runtime will be synchronized from the parent ENA project after its pending 3D ENA and ONA work is complete. The preview is intentionally explicit about this boundary.

## Local development

```bash
npm install
npm run dev
```

Before release:

```bash
npm run verify
```

## Design

The source of truth is [`design-system/open-ena/MASTER.md`](design-system/open-ena/MASTER.md), with page-specific rules under `design-system/open-ena/pages/`.

## License

The source code and original vector identity assets are GPL-3.0-only. The later analysis runtime is powered by jENA, which is also distributed under GPL-3.0-only.

The four team portraits are expressly excluded from the GPL grant. They retain the rights and permission conditions of their respective people, project owners, and source institutions; see [`MEDIA-LICENSE.md`](MEDIA-LICENSE.md) and [`docs/team-portrait-sources.md`](docs/team-portrait-sources.md).
