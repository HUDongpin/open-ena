import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Open ENA",
    short_name: "Open ENA",
    description: "Open, browser-based Epistemic Network Analysis prepared for jENA integration.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7FBFE",
    theme_color: "#89CFF0",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
