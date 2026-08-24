# Open ENA

Open ENA is a focused, two-page public website and interface preview for browser-based Epistemic Network Analysis. It is a subproject of the ENA project and is designed around openness: open methods, open tooling, and a transparent path from coded data to epistemic networks.

Open ENA is collaboratively designed and developed by **Dr. Peter HU Dongpin**, **Professor Eric Hamilton**, and **Professor Tu Yun-Fang**. Their work brings together learning science, quantitative ethnography, artificial intelligence, and educational technology to make ENA methods and tools more transparent, accessible, and useful on the web.

## Research foundation

Research connected to this development project has been published in top-tier peer-reviewed journals and leading international conference proceedings in educational technology and quantitative ethnography, including the Q1 journal *Computers & Education* and the refereed *International Conference on Quantitative Ethnography* (ICQE) proceedings. A further paper focused directly on the development of jENA and web-based Open ENA tools is forthcoming for ICQE 2026.

### Published work

Yu, J., Hu, D., & Wang, C.-H. (2024). Development of ENA 3D: A tool for epistemic network analysis in three-dimensional space. In Y. J. Kim & Z. Swiecki (Eds.), *Advances in quantitative ethnography: 6th International Conference, ICQE 2024, proceedings, Part I* (pp. 152–165). Springer. https://doi.org/10.1007/978-3-031-76335-9_11

Tu, Y.-F., Hwang, G.-J., & Hu, D. (2025). Effects on the learning achievement, approaches to learning, and multi-stage reflection quality of students with different levels of digital self-efficacy in a data literacy course: An ARCS-based self-reflective online learning model. *Computers & Education, 238*, Article 105397. https://doi.org/10.1016/j.compedu.2025.105397

### Forthcoming work

Hu, D., Hamilton, E., Tu, Y.-F., & Xu, Q. (2026, November). *Design and development from rENA to jENA: Accelerating the creation of web-based Open ENA tools* [Conference paper]. International Conference on Quantitative Ethnography.

The forthcoming citation reflects the conference information currently available and will be updated when the official ICQE 2026 proceedings and DOI are released.

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
