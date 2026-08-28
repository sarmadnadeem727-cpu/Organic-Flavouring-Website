import { assets } from './products';

export interface Recipe {
  id: string;
  title: string;
  urduTitle: string;
  category: string;
  time: string;
  difficulty: string;
  yields: string;
  featuredSpice: string;
  image: string;
  summary: string;
  ingredients: string[];
  instructions: string[];
  chefTip: string;
}

export const recipes: Recipe[] = [
  {
    id: "royal-shahi-mutton-karahi",
    title: "Heritage Shahi Mutton Karahi",
    urduTitle: "شاہی مٹن کڑاہی",
    category: "Traditional Desi Mains",
    time: "45 Mins",
    difficulty: "Medium",
    yields: "4-5 Servings",
    featuredSpice: "Dandi Cut Red Chilli Powder & Kuti Lal Mirch",
    image: assets.culinaryTable,
    summary: "Slow-cooked succulent mutton in a wok with ripe plum tomatoes, ginger slivers, and freshly ground Dandi Cut red chilli for an unforgettable aroma.",
    ingredients: [
      "1 kg fresh mutton (bone-in)",
      "5 ripe red tomatoes, halved",
      "2 tbsp ginger-garlic paste",
      "1.5 tbsp Organic Flavouring Dandi Cut Red Chilli Powder",
      "1 tsp Organic Flavouring Kuti Lal Mirch (Crushed Flakes)",
      "1/2 tsp Organic Flavouring Haldi (Turmeric Powder)",
      "4 whole green chillies & 1 inch fresh ginger julienne",
      "4 tbsp pure Desi Ghee or mustard oil",
      "1 tbsp freshly crushed black pepper & coriander seeds",
      "Himalayan pink salt to taste"
    ],
    instructions: [
      "Heat Desi Ghee in a heavy iron Karahi over high flame. Add mutton and ginger-garlic paste, searing for 8-10 minutes until aromatic.",
      "Add Organic Flavouring Haldi and Dandi Cut Red Chilli Powder. Stir thoroughly to coat the meat with radiant ruby color.",
      "Place tomato halves cut-side down on top of the meat. Cover and cook on medium-low flame for 30 minutes until mutton is tender and tomato skins slide off.",
      "Remove tomato skins and mash tomatoes into the gravy with a wooden spoon over high flame until oil separates (Bhoonai).",
      "Sprinkle Organic Flavouring Kuti Lal Mirch, crushed black pepper, and julienned ginger. Serve sizzling with hot tandoori naan."
    ],
    chefTip: "The authentic Dandi Cut chilli releases natural crimson oils without needing artificial food color."
  },
  {
    id: "artisanal-desi-ghee-chilli-tarka",
    title: "Smoky Desi Ghee & Sabut Mirch Daal Tarka",
    urduTitle: "دیسی گھی و ثابت لال مرچ کا تڑکہ",
    category: "Tarka & Tempering",
    time: "25 Mins",
    difficulty: "Easy",
    yields: "4 Servings",
    featuredSpice: "Sun-Dried Whole Pods (Sabut Mirch) & Kuti Mirch Flakes",
    image: assets.macroTexture,
    summary: "Creamy slow-simmered yellow lentils finished with a fragrant sizzle of pure Desi Ghee, whole stemless chillies, zeera, and crushed flakes.",
    ingredients: [
      "1 cup Moong & Masoor Daal (washed and boiled with salt and Organic Flavouring Haldi)",
      "3 tbsp pure Desi Ghee",
      "4-5 Organic Flavouring Sun-Dried Whole Chilli Pods",
      "1 tsp Organic Flavouring Artisanal Kuti Mirch Flakes",
      "1 tsp whole cumin seeds (Zeera)",
      "3 cloves garlic, thinly sliced",
      "Fresh cilantro leaves for garnish"
    ],
    instructions: [
      "Simmer the boiled daal until smooth and velvety.",
      "In a small tempering pan, heat Desi Ghee over medium flame.",
      "Add whole Organic Flavouring Sun-Dried Chilli Pods, sliced garlic, and zeera. Fry for 1 minute until garlic is golden and whole chillies turn glossy burgundy.",
      "Turn off the heat and stir in Organic Flavouring Kuti Mirch Flakes to avoid burning.",
      "Immediately pour the bubbling tarka over the hot daal. Cover the pot for 2 minutes to trap the heavenly smoky aromatics."
    ],
    chefTip: "Sizzling the whole pods whole allows the essential seed oils to infuse the ghee with rich fragrance without overwhelming sharpness."
  },
  {
    id: "lahori-slow-cooked-nihari",
    title: "Slow-Simmered Lahori Beef Shank Nihari",
    urduTitle: "لاہوری بیف نہاری",
    category: "Traditional Desi Mains",
    time: "3 Hours",
    difficulty: "Advanced",
    yields: "6-8 Servings",
    featuredSpice: "Extra Hot Moro Sindh Chilli Powder & Dandi Cut Blend",
    image: assets.qualitySeal,
    summary: "Tender beef shank slow-braised in a rich spiced broth with toasted flour, whole spices, and our signature Moro Sindh fiery red chilli.",
    ingredients: [
      "1.5 kg beef shank with bone marrow (Bong & Nalli)",
      "1/2 cup mustard oil or ghee",
      "2 medium onions, finely sliced",
      "2 tbsp Organic Flavouring Extra Hot Moro Sindh Chilli Powder",
      "1 tbsp Organic Flavouring Dandi Cut Red Chilli Powder",
      "1 tsp Organic Flavouring Haldi",
      "2 tbsp homemade Nihari masala (fennel, dry ginger, cloves, star anise)",
      "4 tbsp whole wheat flour roasted in a dry pan and dissolved in 1 cup water",
      "Fresh lemon wedges, julienned ginger, chopped green chillies & cilantro"
    ],
    instructions: [
      "Heat oil in a heavy-bottomed pot and brown the sliced onions until golden. Remove half for garnish.",
      "Add beef shanks, ginger-garlic paste, and Organic Flavouring chilli powders. Sauté for 5 minutes until meat is seared and a bright red oil (Tari) emerges.",
      "Reserve 3 tablespoons of the red oil (Tari) in a bowl to drizzle before serving.",
      "Add Nihari masala and 6 cups water. Bring to a boil, cover tightly, and simmer on low heat for 2.5 to 3 hours until meat is melt-in-the-mouth tender.",
      "Slowly whisk in the dissolved roasted flour slurry, stirring continuously until the gravy thickens into a glossy, velvety consistency.",
      "Simmer for an additional 15 minutes. Serve hot garnished with reserved Tari, julienned ginger, green chillies, and lemon juice."
    ],
    chefTip: "Moro Sindh chilli gives the Nihari that authentic deep red restaurant Tari naturally, without synthetic food dyes."
  }
];
