export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'Chilli' | 'Powders' | 'Whole Spices' | 'Flour' | 'Herbs';
  tagline: string;
  shortDescription: string;
  description: string;
  usageAndStorage: string;
  certificationsNote: string;
  startingPrice: number; // in PKR for smallest size
  packSizes: { size: string; price: number; sku?: string; isBulk?: boolean }[];
  image: string;
  gallery: string[];
  heatLevel?: number; // 0 to 5
  heatName?: string;
  sourcingOrigin?: string;
  sourcingRegionId?: string; // Links to Origin & Terroir
  isFeatured?: boolean;
  freshnessHighlights: string[];
}

export const brandLogo = "/Logo/Organic Flavouring logo_page-0001.jpg";

export const assets = {
  hero: "/images/Red Chilli Powder Seven Picture.jpg",
  estate: "/images/image.jpg",
  macroTexture: "/images/Red Chilli Powder Second Picture.jpg",
  sunDrying: "/images/Red Chilli Powder Four Picture.jpg",
  qualitySeal: "/images/Red Chilli Powder Five Picture.jpg",
  packagingRange: "/images/Red Chilli Powder Front Picture.jpg",
  assortment: "/images/Red Chilli Powder Eight Picture.jpg",
  culinaryTable: "/images/Red Chilli Powder Six Picture.jpg",
  powderMain: "/images/Red Chilli Powder.jpg",
  flakesMain: "/images/Red Chilli Powder Third Picture.jpg"
};

export const officialInfo = {
  name: "Organic Flavouring",
  tagline: "Serving You the Natural Twist!",
  promiseLine: "Freshly Procured. Hygienically Packed. Naturally Flavorful.",
  positioningLine: "Premium Spices Since 1994",
  founded: "1994",
  city: "Lahore, Pakistan",
  phone: "+92 300 0000000",
  email: "info@organicflavouring.com",
  whatsapp: "923000000000",
  whatsappFormatted: "+92 300 0000000"
};

export const officialCertificates = [
  {
    id: "halal",
    title: "Halal Certification",
    standard: "Pakistan Halal Standard PS:3733-2022 (R) / OIC-SMIIC 1:2019",
    scope: "Packaging and Distribution of Spices",
    certifiedBy: "Accredited Third-Party Halal Certification Body",
    badgeLabel: "Halal Certified",
    description: "Certified compliance with Islamic Shariah guidelines and Pakistan Halal Standards for 100% pure botanical food consumption."
  },
  {
    id: "iso",
    title: "ISO 9001:2015 Quality Management System",
    standard: "ISO 9001:2015",
    scope: "Packaging and Distribution of Spices",
    certifiedBy: "Accredited Third-Party Certification Body",
    badgeLabel: "ISO 9001:2015 Certified",
    description: "Certified compliance with international quality management standards for hygienic procurement, storage, sorting, packaging, and nationwide distribution."
  }
];

export const terroirRegions = [
  {
    id: "dandi-cut-sindh",
    name: "Dandi Cut Sindh",
    tagline: "Rich ruby color & balanced authentic aroma",
    description: "A traditional variety known for its rich color, strong aroma, and balanced heat profile.",
    heat: "Balanced Medium-Hot",
    soilAndClimate: "Sun-drenched alluvial soil nourished by the Indus river plains.",
    usedInProducts: ["Red Chilli (Powder and Flakes)"],
    image: assets.packagingRange,
    mapCoords: { x: 38, y: 72 }
  },
  {
    id: "moro-sindh",
    name: "Extra Hot Moro Sindh",
    tagline: "Intense pungent heat for bold desi cooking",
    description: "Sourced from the Moro region of Sindh, offering intense heat and robust flavor for authentic desi cooking.",
    heat: "Extra Hot Pungency",
    soilAndClimate: "High-temperature arid climate producing high natural capsaicin oils.",
    usedInProducts: ["Red Chilli (Powder and Flakes)"],
    image: assets.powderMain,
    mapCoords: { x: 42, y: 68 }
  },
  {
    id: "kashmiri-chilli",
    name: "Kashmiri Chilli",
    tagline: "Vibrant natural red scarlet color with mild gentle warmth",
    description: "Famous for its vibrant natural red color, mild heat, and rich appearance in curries, karahi, and barbecue preparations.",
    heat: "Mild Aromatic Warmth",
    soilAndClimate: "High-altitude cooler valleys fostering rich natural carotenoid pigments.",
    usedInProducts: ["Red Chilli (Powder and Flakes)"],
    image: assets.macroTexture,
    mapCoords: { x: 68, y: 22 }
  },
  {
    id: "tota-pari",
    name: "Tota Pari Chilli",
    tagline: "Distinctive shape, crisp texture & versatile culinary use",
    description: "Recognized for its distinctive shape, strong aroma, and versatile culinary use across Pakistani recipes.",
    heat: "Robust Medium Heat",
    soilAndClimate: "Sub-tropical loam soil producing fleshy, thick-walled aromatic pods.",
    usedInProducts: ["Red Chilli (Powder and Flakes)"],
    image: assets.flakesMain,
    mapCoords: { x: 48, y: 55 }
  },
  {
    id: "lodhran-region",
    name: "Lodhran Region Selection",
    tagline: "South Punjab's celebrated agricultural spice belt",
    description: "Premium spice sourcing from South Punjab's agricultural belt, known for quality produce and favorable growing conditions.",
    heat: "Pure Terroir Warmth",
    soilAndClimate: "Mineral-rich Punjab river basin soils with long sunny drying seasons.",
    usedInProducts: ["Turmeric Powder", "Coriander", "Zeera (Cumin)"],
    image: assets.sunDrying,
    mapCoords: { x: 52, y: 48 }
  }
];

export const products: Product[] = [
  {
    id: "red-chilli-flakes",
    sku: "2026010100019",
    name: "Red Chilli Flakes",
    category: "Chilli",
    tagline: "Sun-Dried & Stone-Milled • Sindh & Kashmiri Sourcing",
    shortDescription: "Pure single-origin coarse crushed flakes. High natural carotenoid color, zero artificial Sudan dyes.",
    description: "Our flagship Red Chilli Flakes are sourced from celebrated Pakistani terroirs including Dandi Cut Sindh, Moro Sindh, Kashmiri regions, and Tota Pari chilli-producing areas. Every batch is freshly procured, sun-cured over clean beds, and slow ground to preserve its natural aroma and rich red hue.",
    usageAndStorage: "Store in an airtight container in a cool, dry place away from direct sunlight. Ideal for daily Pakistani salan, Nihari, Karahi, daal tarka, and BBQ marinades.",
    certificationsNote: "Halal Certified & ISO 9001:2015. 100% pure botanical with zero synthetic additives.",
    startingPrice: 150,
    packSizes: [
      { size: "100g", price: 150, sku: "2026010100019" },
      { size: "200g", price: 300, sku: "2026010100018" },
      { size: "400g", price: 600, sku: "2026010100017" },
      { size: "800g", price: 1200, sku: "2026010100016" }
    ],
    image: "/images/products/red-chilli-flakes-1.jpg",
    gallery: [
      "/images/products/red-chilli-flakes-1.jpg",
      assets.packagingRange,
      assets.macroTexture,
      assets.qualitySeal
    ],
    heatLevel: 4,
    heatName: "Balanced Robust Desi Heat",
    sourcingOrigin: "Dandi Cut & Moro (Sindh) / Lodhran (Punjab)",
    sourcingRegionId: "dandi-cut-sindh",
    isFeatured: true,
    freshnessHighlights: [
      "Freshly ground from whole sun-dried pods",
      "0% Sudan I-IV dyes or chemical coloring",
      "Hygienically packed in ISO 9001 certified facility",
      "Aroma & essential volatile oils preserved"
    ]
  },
  {
    id: "red-chilli-powder",
    sku: "2026010100026",
    name: "Red Chilli Powder",
    category: "Chilli",
    tagline: "Sun-Dried & Stone-Milled • Sindh & Kashmiri Sourcing",
    shortDescription: "Pure single-origin red chilli powder. High natural carotenoid color, zero artificial Sudan dyes.",
    description: "Our flagship Red Chilli Powder is sourced from celebrated Pakistani terroirs including Dandi Cut Sindh, Moro Sindh, Kashmiri regions, and Tota Pari chilli-producing areas. Every batch is freshly procured, sun-cured over clean beds, and slow ground to preserve its natural aroma and rich red hue.",
    usageAndStorage: "Store in an airtight container in a cool, dry place away from direct sunlight. Ideal for daily Pakistani salan, Nihari, Karahi, daal tarka, and BBQ marinades.",
    certificationsNote: "Halal Certified & ISO 9001:2015. 100% pure botanical with zero synthetic additives.",
    startingPrice: 140,
    packSizes: [
      { size: "100g", price: 140, sku: "2026010100026" },
      { size: "200g", price: 280, sku: "2026010100025" },
      { size: "400g", price: 560, sku: "2026010100024" },
      { size: "800g", price: 1120, sku: "2026010100023" }
    ],
    image: "/images/products/red-chilli-powder-1.jpg",
    gallery: [
      "/images/products/red-chilli-powder-1.jpg",
      assets.packagingRange,
      assets.macroTexture,
      assets.qualitySeal
    ],
    heatLevel: 4,
    heatName: "Balanced Robust Desi Heat",
    sourcingOrigin: "Dandi Cut & Moro (Sindh) / Lodhran (Punjab)",
    sourcingRegionId: "dandi-cut-sindh",
    isFeatured: true,
    freshnessHighlights: [
      "Freshly ground from whole sun-dried pods",
      "0% Sudan I-IV dyes or chemical coloring",
      "Hygienically packed in ISO 9001 certified facility",
      "Aroma & essential volatile oils preserved"
    ]
  },
  {
    id: "turmeric-powder-haldi",
    sku: "2026010100033",
    name: "Turmeric Powder",
    category: "Powders",
    tagline: "High Natural Curcumin • Pure Golden Earthy Warmth",
    shortDescription: "100% pure sun-cured turmeric rhizomes, freshly ground with zero lead chromate, starch, or artificial polish.",
    description: "Sourced from fertile turmeric-growing belts in Punjab and Sindh. Tested for high natural curcumin potency, this pure Haldi brings an authentic golden warmth, rich aroma, and natural wellness to your daily cooking.",
    usageAndStorage: "Keep tightly sealed in amber glass or opaque pouch. Essential for gravies, vegetable curries, daal, and golden milk (Haldi Doodh).",
    certificationsNote: "Halal Certified & ISO 9001:2015 Quality Management System.",
    startingPrice: 150,
    packSizes: [
      { size: "100g", price: 150, sku: "2026010100033" },
      { size: "200g", price: 300, sku: "2026010100034" },
      { size: "400g", price: 600, sku: "2026010100035" },
      { size: "800g", price: 1200, sku: "2026010100036" }
    ],
    image: "/images/products/turmeric-powder-1.jpg",
    gallery: [
      "/images/products/turmeric-powder-1.jpg",
      "/images/products/turmeric-powder-2.jpg",
      "/images/products/turmeric-powder-3.jpg",
      "/images/products/turmeric-powder-4.jpg",
      "/images/products/turmeric-powder-5.jpg",
      "/images/products/turmeric-powder-6.jpg",
      "/images/products/turmeric-powder-7.jpg",
      "/images/products/turmeric-powder-8.jpg"
    ],
    heatLevel: 0,
    heatName: "Non-Pungent Earthy Warmth",
    sourcingOrigin: "Kasur & South Punjab Belt",
    sourcingRegionId: "lodhran-region",
    isFeatured: true,
    freshnessHighlights: [
      "High natural curcumin percentage",
      "0% Lead chromate or yellow dye powder",
      "Hygienically milled & sifted",
      "Natural antiseptic and aromatic properties"
    ]
  },
  {
    id: "corriander-powder",
    sku: "2026010100040",
    name: "Corriander Powder",
    category: "Powders",
    tagline: "Freshly Roasted & Ground • Citrusy Floral Aroma",
    shortDescription: "Pure botanical coriander powder. Naturally fragrant, coarse-to-fine milled for velvety gravies and marinades.",
    description: "Selected from plump, fragrant green-gold coriander seeds. Gently roasted at low temperatures to release their volatile linalool oils before hygienic stone grinding.",
    usageAndStorage: "Store away from heat and moisture. Use as the aromatic foundation in all curries, biryani masala, and qorma bases.",
    certificationsNote: "Halal Certified & ISO 9001:2015 Certified.",
    startingPrice: 200,
    packSizes: [
      { size: "100g", price: 200, sku: "2026010100040" },
      { size: "200g", price: 400, sku: "2026010100041" },
      { size: "400g", price: 800, sku: "2026010100042" },
      { size: "800g", price: 1600, sku: "2026010100043" }
    ],
    image: "/images/products/corriander-powder-1.jpg",
    gallery: [
      "/images/products/corriander-powder-1.jpg",
      "/images/products/corriander-powder-2.jpg",
      assets.hero
    ],
    heatLevel: 0,
    heatName: "Mild Floral Herbaceous",
    sourcingOrigin: "Punjab & Sindh River Plains",
    sourcingRegionId: "lodhran-region",
    isFeatured: true,
    freshnessHighlights: [
      "No spent husk or sawdust fillers",
      "Freshly ground in small batches",
      "Rich natural citrus & earthy bouquet",
      "Certified 100% pure botanical"
    ]
  },
  {
    id: "garam-masala",
    sku: "2026010100057",
    name: "Garam Masala",
    category: "Powders",
    tagline: "30-Year Heritage Formula • Whole Spice Royale",
    shortDescription: "The signature 1994 family recipe combining whole black cardamom, cinnamon, cloves, nutmeg, mace, and cumin.",
    description: "Crafted using our family's generational formula established in 1994. Every whole spice in this master blend is individually inspected, lightly roasted, and freshly ground for an incomparable royal finish.",
    usageAndStorage: "Sprinkle 1/2 teaspoon over hot dishes at the very end of cooking (Dum) to trap the rich essential aromatics.",
    certificationsNote: "Halal Certified & ISO 9001:2015 Quality Management System.",
    startingPrice: 300,
    packSizes: [
      { size: "100g", price: 300, sku: "2026010100057" },
      { size: "200g", price: 600, sku: "2026010100056" },
      { size: "400g", price: 1200, sku: "2026010100055" },
      { size: "800g", price: 2400, sku: "2026010100054" }
    ],
    image: "/images/products/garam-masala-1.jpg",
    gallery: [
      "/images/products/garam-masala-1.jpg",
      assets.culinaryTable,
      assets.qualitySeal
    ],
    heatLevel: 2,
    heatName: "Warming Royal Spice Heat",
    sourcingOrigin: "Direct Import & Pakistani Heritage Sourcing",
    isFeatured: true,
    freshnessHighlights: [
      "12-spice traditional family recipe",
      "Never watered down with excess cumin or coriander",
      "High concentration of whole aromatic spices",
      "Hygienically packed to preserve top notes"
    ]
  },
  {
    id: "black-pepper",
    sku: "2026010100064",
    name: "Black Pepper",
    category: "Whole Spices",
    tagline: "Bold High-Piperine Berries • Sharp Crisp Pungency",
    shortDescription: "Heavy density, bold whole black peppercorns and coarsely crushed table grind. Sharp aroma and intense natural warmth.",
    description: "High-density black peppercorns rich in essential piperine oil. Available as whole aromatic berries or freshly crushed table seasoning with an intense, woody aroma.",
    usageAndStorage: "Grind fresh over steaks, soups, eggs, White Karahi, and pasta dishes for clean, zesty heat.",
    certificationsNote: "Halal Certified & ISO 9001:2015 Certified.",
    startingPrice: 350,
    packSizes: [
      { size: "100g", price: 350, sku: "2026010100064" },
      { size: "200g", price: 700, sku: "2026010100065" },
      { size: "400g", price: 1400, sku: "2026010100066" },
      { size: "800g", price: 2800, sku: "2026010100067" }
    ],
    image: "/images/products/black-pepper-1.jpg",
    gallery: [
      "/images/products/black-pepper-1.jpg",
      "/images/products/black-pepper-2.jpg",
      assets.packagingRange
    ],
    heatLevel: 3,
    heatName: "Crisp Sharp Heat",
    sourcingOrigin: "Premium Selected Grade",
    isFeatured: false,
    freshnessHighlights: [
      "High density, heavy berries",
      "Zero light berries or mineral oil polish",
      "Clean, unadulterated spicy bite",
      "Hygienically sealed in airtight packaging"
    ]
  },
  {
    id: "gram-flour",
    sku: "2026010100074",
    name: "Gram Flour (Besan)",
    category: "Flour",
    tagline: "100% Pure Desi Chana • Silky Hygienic Milling",
    shortDescription: "Finely ground pure desi brown chickpeas (Kala Chana). Zero pea flour mixing or artificial coloring.",
    description: "Milled exclusively from 100% pure de-husked desi chickpeas in our certified hygienic Lahore milling facility. Produces the crispest, lightest pakoras and traditional halwas without heavy grease absorption.",
    usageAndStorage: "Keep in an airtight container in a dry pantry. Perfect for Ramadan pakoras, Kadi Pakora, Besan Ladoo, and savory batters.",
    certificationsNote: "Halal Certified & ISO 9001:2015 Certified.",
    startingPrice: 250,
    packSizes: [
      { size: "400g", price: 250, sku: "2026010100074" },
      { size: "800g", price: 500, sku: "2026010100073" }
    ],
    image: assets.qualitySeal,
    gallery: [
      assets.qualitySeal,
      assets.packagingRange,
      assets.hero
    ],
    heatLevel: 0,
    heatName: "Nutty Gluten-Free Pulse Flour",
    sourcingOrigin: "Punjab Chickpea Belt",
    isFeatured: false,
    freshnessHighlights: [
      "100% Desi Chana (Zero yellow pea/Matar mixing)",
      "Silky fine mesh hygienic sifting",
      "Naturally high protein & dietary fiber",
      "Rich golden aroma when roasted"
    ]
  },
  {
    id: "kasuri-methi",
    sku: "2026010100084",
    name: "Kasuri Methi",
    category: "Herbs",
    tagline: "Aromatic Dried Fenugreek Leaves",
    shortDescription: "Hand-picked, sun-dried fenugreek leaves from the famous Kasur region.",
    description: "Our Kasuri Methi is sourced directly from the fields of Kasur, renowned globally for the most aromatic fenugreek. Sun-dried to preserve its essential oils, it adds a distinct savory flavor to your dishes.",
    usageAndStorage: "Crush gently between palms before sprinkling over Qorma, Karahi, or mixed vegetables at the end of cooking. Store in an airtight jar.",
    certificationsNote: "Halal Certified & ISO 9001:2015 Certified.",
    startingPrice: 150,
    packSizes: [
      { size: "50g", price: 150, sku: "2026010100084" },
      { size: "100g", price: 300, sku: "2026010100085" },
      { size: "200g", price: 550, sku: "2026010100086" },
      { size: "400g", price: 1100, sku: "2026010100087" }
    ],
    image: assets.assortment,
    gallery: [
      assets.assortment,
      assets.packagingRange
    ],
    heatLevel: 0,
    heatName: "Savory Earthy Aroma",
    sourcingOrigin: "Kasur Region",
    isFeatured: false,
    freshnessHighlights: [
      "Authentic Kasur origin",
      "Carefully destemmed",
      "Preserved natural green color",
      "Intense aromatic profile"
    ]
  },
  {
    id: "wheat-flour",
    sku: "2026010100094",
    name: "Wheat Flour",
    category: "Flour",
    tagline: "Wholesome Chakki Atta",
    shortDescription: "100% whole wheat flour, stone-ground to preserve bran and germ for nutritious, soft rotis.",
    description: "Our Wheat Flour (Chakki Atta) is milled from premium quality wheat grains. The traditional stone grinding process ensures that the natural dietary fibers, vitamins, and minerals are retained, yielding soft and fluffy rotis.",
    usageAndStorage: "Store in a cool, dry place in an airtight container to maintain freshness and protect from moisture.",
    certificationsNote: "Halal Certified & ISO 9001:2015 Certified.",
    startingPrice: 800,
    packSizes: [
      { size: "5kgs", price: 800, sku: "2026010100094" },
      { size: "10kgs", price: 1600, sku: "2026010100093" }
    ],
    image: assets.qualitySeal,
    gallery: [
      assets.qualitySeal,
      assets.packagingRange
    ],
    heatLevel: 0,
    heatName: "Nutritious Whole Wheat",
    sourcingOrigin: "Punjab Wheat Belt",
    isFeatured: false,
    freshnessHighlights: [
      "100% Whole Wheat",
      "Rich in natural dietary fiber",
      "No added preservatives or bleaching agents",
      "Produces soft, long-lasting rotis"
    ]
  },
  {
    id: "zera-whole",
    sku: "2026010100104",
    name: "Zera Whole",
    category: "Whole Spices",
    tagline: "Unpolished Whole White Cumin • Rich Warmth",
    shortDescription: "Aromatic, long-grain whole cumin seeds. Essential for authentic Pakistani tarka and rice dishes.",
    description: "Naturally dried whole white cumin seeds sourced from prime crops. Free from artificial dust, dirt, or stone mixing, offering an unmatched nutty, earthy aroma when tempered in oil.",
    usageAndStorage: "Sizzle in warm Desi Ghee for zeera rice, daal baghaar, or dry-roast and crush for raita and chaat masala.",
    certificationsNote: "Halal Certified & ISO 9001:2015 Certified.",
    startingPrice: 150,
    packSizes: [
      { size: "50g", price: 150, sku: "2026010100104" },
      { size: "100g", price: 300, sku: "2026010100105" },
      { size: "200g", price: 600, sku: "2026010100106" }
    ],
    image: assets.sunDrying,
    gallery: [
      assets.sunDrying,
      assets.assortment,
      assets.packagingRange
    ],
    heatLevel: 1,
    heatName: "Warm Nutty Earthy",
    sourcingOrigin: "Lodhran & South Punjab Belt",
    sourcingRegionId: "lodhran-region",
    isFeatured: false,
    freshnessHighlights: [
      "Machine-cleaned & hand-sorted",
      "Zero artificial fragrance",
      "High natural cuminaldehyde",
      "Authentic tarka sizzle guarantee"
    ]
  },
  {
    id: "corriander-whole",
    sku: "2026010100114",
    name: "Corriander Whole",
    category: "Whole Spices",
    tagline: "Aromatic Whole Coriander Seeds",
    shortDescription: "Plump, green-gold coriander seeds with a bright, citrusy aroma.",
    description: "Selected from the finest crops, our whole coriander seeds are rich in natural essential oils. They provide a warm, floral, and slightly citrusy flavor essential for pickling, marinades, and custom spice blends.",
    usageAndStorage: "Lightly toast in a dry pan before crushing to release maximum flavor. Store in an airtight container.",
    certificationsNote: "Halal Certified & ISO 9001:2015 Certified.",
    startingPrice: 200,
    packSizes: [
      { size: "100g", price: 200, sku: "2026010100114" },
      { size: "200g", price: 400, sku: "2026010100115" },
      { size: "400g", price: 800, sku: "2026010100116" }
    ],
    image: assets.macroTexture,
    gallery: [
      assets.macroTexture,
      assets.assortment,
      assets.packagingRange
    ],
    heatLevel: 0,
    heatName: "Mild Floral Herbaceous",
    sourcingOrigin: "Punjab & Sindh River Plains",
    sourcingRegionId: "lodhran-region",
    isFeatured: false,
    freshnessHighlights: [
      "Plump, unbroken seeds",
      "High volatile oil content",
      "Cleaned and sorted",
      "Bright citrusy flavor profile"
    ]
  }
];
