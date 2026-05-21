import { createFileRoute } from "@tanstack/react-router";
import PearlArcPage from "@/components/pearl-arc-page";

export const Route = createFileRoute("/")({
  component: PearlArcPage,
  head: () => ({
    meta: [
      { title: "PearlArc Dental — Crafting Beautiful Smiles with Advanced Dentistry" },
      {
        name: "description",
        content:
          "A boutique dental studio where precision medicine meets quiet luxury. Book your consultation at PearlArc Dental.",
      },
      { property: "og:title", content: "PearlArc Dental Studio" },
      {
        property: "og:description",
        content:
          "Crafting beautiful smiles with advanced dentistry - preventive care, cosmetic dentistry, implants and more.",
      },
    ],
  }),
});
