export interface BatchRecord {
  batchNo: string;
  productName: string;
  harvestRegion: string;
  procurementDate: string;
  millingDate: string;
  purityScore: string;
  capsaicinSHU: string;
  moistureContent: string;
  astaColourValue: string;
  pesticideScreening: string;
  isoStandard: string;
  isoCertNo: string;
  halalCertNo: string;
  hftNo: string;
  certBody: string;
  inspectorNotes: string;
}

export const batchDatabase: Record<string, BatchRecord> = {
  "OF-2026-DC01": {
    batchNo: "OF-2026-DC01",
    productName: "Red Chilli (Powder and Flakes)",
    harvestRegion: "Dandi Cut Belt, Sindh, Pakistan",
    procurementDate: "August 2026 Fresh Mandi Procurement",
    millingDate: "August 20, 2026 (Hygienic Slow Stone Milling)",
    purityScore: "100.0% Pure Single-Origin Botanical",
    capsaicinSHU: "32,400 SHU (Standard Robust Desi Heat)",
    moistureContent: "7.1% (Ideal Shelf Preservation)",
    astaColourValue: "136 ASTA (Deep Natural Ruby Red)",
    pesticideScreening: "ND (Not Detected - 0% Sudan Dyes)",
    isoStandard: "ISO 9001:2015 Quality Management System",
    isoCertNo: "A26-92-0847",
    halalCertNo: "C26-92-0848",
    hftNo: "HC-OF-001",
    certBody: "Gitchia Institute of Global Certification",
    inspectorNotes: "Uniform crimson grind with high natural oleoresin content, rich authentic desi aroma, and zero artificial dyes."
  },
  "OF-2026-HD02": {
    batchNo: "OF-2026-HD02",
    productName: "Turmeric Powder (Haldi)",
    harvestRegion: "Kasur & South Punjab Belt",
    procurementDate: "August 2026 Procurement",
    millingDate: "August 22, 2026 (Hygienic Milling)",
    purityScore: "100.0% Pure Curcumin-Rich Rhizome",
    capsaicinSHU: "0 SHU (Antiseptic Earthy Warmth)",
    moistureContent: "7.0%",
    astaColourValue: "Natural Golden Curcumin >3.8%",
    pesticideScreening: "ND (Zero Chemical Polish or Lead Chromate)",
    isoStandard: "ISO 9001:2015",
    isoCertNo: "A26-92-0847",
    halalCertNo: "C26-92-0848",
    hftNo: "HC-OF-002",
    certBody: "Gitchia Institute of Global Certification",
    inspectorNotes: "Vibrant golden hue, deep earthy aroma, 100% free from starch additives, polishing agents, or synthetic dyes."
  }
};
