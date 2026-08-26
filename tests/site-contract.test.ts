import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

function pageRoutes(directory: string): string[] {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) return pageRoutes(path);
    return entry === "page.tsx" ? [relative(root, path)] : [];
  });
}

test("the public site has exactly the Open ENA and About content pages", () => {
  assert.deepEqual(pageRoutes(join(root, "app")).sort(), ["app/about/page.tsx", "app/page.tsx"]);
  const header = read("components/SiteHeader.tsx");
  assert.match(header, /href="\/"/);
  assert.match(header, /href="\/about"/);
  assert.doesNotMatch(header, /News|Academy|Mission/);
});

test("the Open ENA workbench is explicitly a UI-only preview", () => {
  const preview = read("components/OpenEnaPreview.tsx");
  const home = read("app/page.tsx");
  const packageJson = JSON.parse(read("package.json")) as { dependencies: Record<string, string> };

  assert.match(preview, /Static UI milestone/);
  assert.match(preview, /no data is loaded, processed, retained, or exported/i);
  assert.doesNotMatch(preview, /readOnly/);
  assert.match(preview, /aria-pressed="true" disabled/);
  assert.match(preview, /className="sr-only" aria-live="polite"/);
  assert.doesNotMatch(preview, /preview-control-panel" aria-live/);
  assert.match(preview, /"sets", label: "Sets"/);
  assert.match(preview, /"data", label: "Data"/);
  assert.match(preview, /"model", label: "Model"/);
  assert.match(preview, /"plot", label: "Plot"/);
  assert.match(preview, /"stats", label: "Stats"/);
  assert.match(preview, /3D <small>later<\/small>/);
  assert.match(home, /Planned runtime/);
  assert.match(home, /jENA 0\.6\.2/);
  assert.equal(packageJson.dependencies["jena-js"], "0.6.2");
});

test("team names, titles, institutions, and local portraits match the approved brief", () => {
  const team = read("lib/team.ts");
  const teamCard = read("components/TeamCard.tsx");
  const css = read("app/globals.css");
  const expected = [
    ["Dr. Peter HU Dongpin", "The Education University of Hong Kong", "public/team/peter-hu-dongpin.png"],
    ["Prof. Eric Hamilton", "Pepperdine University", "public/team/eric-hamilton.png"],
    [
      "Prof. Sandy TU Yun-Fang",
      "National Taiwan University of Science and Technology",
      "public/team/sandy-tu-yun-fang.jpg",
    ],
    ["Ms. Shirleen XU Qiaolin", "Meredith College", "public/team/shirleen-xu-qiaolin.png"],
  ] as const;

  for (const [name, institution, image] of expected) {
    assert.match(team, new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.match(team, new RegExp(institution.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    assert.equal(existsSync(join(root, image)), true, `${image} should exist`);
  }

  assert.doesNotMatch(team, /Soochow University/);
  assert.doesNotMatch(team, /Shirleen[\s\S]{0,300}(Professor|PhD|Department of)/i);
  assert.doesNotMatch(teamCard, /team-index/);
  assert.doesNotMatch(css, /\.team-index/);
});

test("the About page includes the approved Project Publications with local cover artwork", () => {
  const about = read("app/about/page.tsx");
  const publications = read("lib/publications.ts");
  const publicationCard = read("components/PublicationCard.tsx");
  const css = read("app/globals.css");
  const covers = [
    "public/publications/ena-3d-epistemic-network.webp",
    "public/publications/arcs-data-literacy-reflection.webp",
    "public/publications/rena-to-jena-open-tools.webp",
  ];

  assert.match(about, /quantitative ethnography, artificial intelligence, and educational technology/);
  assert.doesNotMatch(about, /quantitative ethnography, data science, and educational technology/);
  assert.match(about, /PROJECT PUBLICATIONS/);
  assert.match(publications, /Development of ENA 3D/);
  assert.match(publications, /Effects on the learning achievement/);
  assert.match(publications, /Design and development from rENA to jENA/);
  assert.match(publications, /10\.1007\/978-3-031-76335-9_11/);
  assert.match(publications, /10\.1016\/j\.compedu\.2025\.105397/);
  assert.match(publicationCard, /<cite>/);
  assert.match(css, /text-indent: -1\.15rem/);

  for (const cover of covers) {
    assert.equal(existsSync(join(root, cover)), true, `${cover} should exist`);
  }
});

test("Project Publications use the requested order, author initials, and clean ending", () => {
  const about = read("app/about/page.tsx");
  const publications = read("lib/publications.ts");
  const css = read("app/globals.css");

  assert.match(
    publications,
    /id: "rena-to-jena",\s+sequence: "01"[\s\S]*id: "data-literacy-reflection",\s+sequence: "02"[\s\S]*id: "ena-3d",\s+sequence: "03"/,
  );
  assert.match(publications, /authors: "Hu, D\., Hamilton, E\., Tu, Y\. F\., & Xu, Q\."/);
  assert.match(publications, /authors: "Tu, Y\. F\., Hwang, G\. J\., & Hu, D\."/);
  assert.match(publications, /authors: "Yu, J\., Hu, D\., & Wang, C\. H\."/);
  assert.doesNotMatch(publications, /authors: "[^"]*[A-Z]\.-[A-Z]\./);
  assert.doesNotMatch(about, /References use APA 7th formatting/);
  assert.doesNotMatch(about, /publication-note/);
  assert.doesNotMatch(css, /\.publication-note/);
});

test("the GitHub introduction credits the three design and development collaborators and cites the research foundation", () => {
  const readme = read("README.md");

  assert.match(
    readme,
    /collaboratively designed and developed by \*\*Dr\. Peter HU Dongpin\*\*, \*\*Professor Eric Hamilton\*\*, and \*\*Professor Tu Yun-Fang\*\*/,
  );
  assert.match(readme, /top-tier peer-reviewed journals and leading international conference proceedings/);
  assert.match(readme, /Q1 journal \*Computers & Education\*/);
  assert.match(readme, /Published work/);
  assert.match(readme, /Forthcoming work/);
  assert.match(readme, /10\.1007\/978-3-031-76335-9_11/);
  assert.match(readme, /10\.1016\/j\.compedu\.2025\.105397/);
  assert.match(readme, /official ICQE 2026 proceedings and DOI are released/);
});

test("the logo makes openness structural and provides accessible descriptions", () => {
  const mark = read("public/logo-open-ena-mark.svg");
  const wordmark = read("public/logo-open-ena.svg");

  assert.match(mark, /open blue ring/i);
  assert.match(mark, /stroke="#89CFF0"/);
  assert.match(mark, /54\.2 12\.2/);
  assert.match(wordmark, />OPEN<\/text>/);
  assert.match(wordmark, />ENA<\/text>/);
  assert.match(wordmark, /ENA placed beneath Open/i);
  assert.match(read("components/BrandLogo.tsx"), /logo-open-ena-compact\.svg/);
});

test("responsive and accessible UI safeguards are present", () => {
  const css = read("app/globals.css");
  const layout = read("components/SiteHeader.tsx");

  assert.match(css, /@media \(max-width: 480px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /min-height: 44px/);
  assert.match(layout, /Skip to main content/);
});

test("canonical production metadata exposes only the two public routes", () => {
  assert.match(read("app/layout.tsx"), /https:\/\/www\.open-ena\.com/);
  const home = read("app/page.tsx");
  const about = read("app/about/page.tsx");
  assert.match(home, /url: "\/"/);
  assert.match(about, /url: "\/about"/);
  assert.match(home, /card: "summary"/);
  assert.match(about, /card: "summary"/);
  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /https:\/\/www\.open-ena\.com\//);
  assert.match(sitemap, /https:\/\/www\.open-ena\.com\/about/);
  assert.equal((sitemap.match(/url:/g) ?? []).length, 2);
  assert.equal(JSON.parse(read("vercel.json")).framework, "nextjs");
  const nextConfig = read("next.config.ts");
  assert.match(nextConfig, /type: "host", value: "open-ena\.com"/);
  assert.match(nextConfig, /destination: "https:\/\/www\.open-ena\.com\/:path\*"/);
});
