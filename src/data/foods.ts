// Histamine-intolerance food map data.
//
// Scoring model (0–100 on each axis):
//   histamine — the food's own histamine content.
//   trigger   — additional load from histamine liberators, DAO-blockers and
//               other biogenic amines (putrescine, cadaverine, tyramine).
//
// tier is the overall compatibility rating, aligned with the SIGHI food
// compatibility scale:
//   0 well tolerated · 1 moderate · 2 high · 3 avoid
//
// This is an educational overview, not medical advice. Individual tolerance
// varies widely, and freshness/ripeness/storage changes histamine sharply.

export type Category =
  | "Vegetables"
  | "Fruits"
  | "Meat & Fish"
  | "Dairy & Eggs"
  | "Fermented"
  | "Grains & Legumes"
  | "Nuts & Seeds"
  | "Beverages"
  | "Condiments & Extras";

export type Tier = 0 | 1 | 2 | 3;

export interface Food {
  name: string;
  category: Category;
  histamine: number; // 0–100
  trigger: number; // 0–100
  tier: Tier;
  note: string;
  emoji?: string; // shown when a fitting emoji exists
}

// Emoji shown next to foods that have a fitting one. Foods without an entry
// simply render without an emoji.
const EMOJI: Record<string, string> = {
  Broccoli: "🥦",
  Carrot: "🥕",
  Cucumber: "🥒",
  Zucchini: "🥒",
  "Bell pepper": "🫑",
  Lettuce: "🥬",
  Potato: "🥔",
  "Sweet potato": "🍠",
  Onion: "🧅",
  Garlic: "🧄",
  Mushroom: "🍄",
  "Green beans": "🫛",
  Cauliflower: "🥦",
  Pumpkin: "🎃",
  "Cabbage (raw)": "🥬",
  Spinach: "🥬",
  Tomato: "🍅",
  Eggplant: "🍆",
  Avocado: "🥑",
  Apple: "🍎",
  Pear: "🍐",
  Blueberry: "🫐",
  Grape: "🍇",
  Mango: "🥭",
  Peach: "🍑",
  Banana: "🍌",
  Kiwi: "🥝",
  Pineapple: "🍍",
  Strawberry: "🍓",
  Cherry: "🍒",
  Watermelon: "🍉",
  "Apricot (fresh)": "🍑",
  Raspberry: "🫐",
  Lemon: "🍋",
  "Citrus (orange)": "🍊",
  "Fresh chicken": "🍗",
  "Fresh turkey": "🦃",
  "Fresh beef": "🥩",
  "Fresh pork": "🥩",
  "Fresh cod": "🐟",
  "Fresh salmon": "🐟",
  "Smoked salmon": "🐟",
  "Leftover meat": "🍖",
  "Canned tuna": "🐟",
  Mackerel: "🐟",
  "Sardines (canned)": "🐟",
  "Shellfish (shrimp)": "🦐",
  "Cured ham": "🍖",
  Salami: "🥓",
  "Egg yolk": "🥚",
  "Egg white (raw)": "🥚",
  "Fresh milk": "🥛",
  Butter: "🧈",
  Ricotta: "🧀",
  "Cream cheese (fresh)": "🧀",
  Mozzarella: "🧀",
  Yogurt: "🥣",
  "Aged cheddar": "🧀",
  Parmesan: "🧀",
  "Blue cheese": "🧀",
  Kimchi: "🥬",
  "Soy sauce": "🍶",
  Miso: "🍲",
  Kombucha: "🍵",
  "Olives (brined)": "🫒",
  "White rice": "🍚",
  Buckwheat: "🌾",
  Oats: "🥣",
  "Corn / polenta": "🌽",
  "Wheat / bread": "🍞",
  Chickpeas: "🫘",
  Lentils: "🫘",
  Soybeans: "🫛",
  "Chia seeds": "🌱",
  "Flax seeds": "🌱",
  Macadamia: "🥜",
  "Sunflower seeds": "🌻",
  Pistachios: "🥜",
  Almonds: "🥜",
  Peanuts: "🥜",
  Cashews: "🥜",
  Walnuts: "🥜",
  Water: "💧",
  "Herbal tea (rooibos)": "🍵",
  "Coconut water": "🥥",
  "Black tea": "🍵",
  Coffee: "☕",
  "Green tea": "🍵",
  "Energy drink": "🥤",
  Beer: "🍺",
  "White wine": "🥂",
  "Red wine": "🍷",
  "Champagne / sparkling": "🥂",
  "Olive oil": "🫒",
  Salt: "🧂",
  "Fresh herbs (basil)": "🌿",
  "Maple syrup": "🍁",
  Honey: "🍯",
  "Cocoa / chocolate": "🍫",
  Ketchup: "🍅",
  Mustard: "🌭",
};

export const TIERS: { tier: Tier; label: string; blurb: string }[] = [
  { tier: 0, label: "Well tolerated", blurb: "Low histamine, generally safe fresh." },
  { tier: 1, label: "Moderate", blurb: "Some histamine or minor liberator effect." },
  { tier: 2, label: "High", blurb: "Notably high — limit portions." },
  { tier: 3, label: "Avoid", blurb: "Very high histamine or strong triggers." },
];

export const CATEGORIES: Category[] = [
  "Vegetables",
  "Fruits",
  "Meat & Fish",
  "Dairy & Eggs",
  "Fermented",
  "Grains & Legumes",
  "Nuts & Seeds",
  "Beverages",
  "Condiments & Extras",
];

const rawFoods: Food[] = [
  // ── Vegetables ─────────────────────────────────────────────
  { name: "Broccoli", category: "Vegetables", histamine: 12, trigger: 10, tier: 0, note: "Fresh brassica, well tolerated." },
  { name: "Carrot", category: "Vegetables", histamine: 8, trigger: 8, tier: 0, note: "Low histamine root vegetable." },
  { name: "Cucumber", category: "Vegetables", histamine: 6, trigger: 6, tier: 0, note: "Very well tolerated fresh." },
  { name: "Zucchini", category: "Vegetables", histamine: 10, trigger: 9, tier: 0, note: "Mild, safe cooked or raw." },
  { name: "Bell pepper", category: "Vegetables", histamine: 14, trigger: 12, tier: 0, note: "Fresh sweet pepper is fine." },
  { name: "Lettuce", category: "Vegetables", histamine: 10, trigger: 10, tier: 0, note: "Fresh leaves well tolerated." },
  { name: "Potato", category: "Vegetables", histamine: 9, trigger: 8, tier: 0, note: "Neutral staple." },
  { name: "Sweet potato", category: "Vegetables", histamine: 10, trigger: 9, tier: 0, note: "Well tolerated." },
  { name: "Onion", category: "Vegetables", histamine: 15, trigger: 18, tier: 0, note: "Mild DAO-supportive quercetin." },
  { name: "Garlic", category: "Vegetables", histamine: 16, trigger: 20, tier: 0, note: "Anti-inflammatory, usually fine." },
  { name: "Asparagus", category: "Vegetables", histamine: 20, trigger: 22, tier: 1, note: "Mild liberator for some." },
  { name: "Mushroom", category: "Vegetables", histamine: 38, trigger: 40, tier: 2, note: "Aged/dried are higher." },
  { name: "Spinach", category: "Vegetables", histamine: 62, trigger: 58, tier: 3, note: "High histamine leaf." },
  { name: "Tomato", category: "Vegetables", histamine: 70, trigger: 68, tier: 3, note: "High histamine + liberator." },
  { name: "Eggplant", category: "Vegetables", histamine: 66, trigger: 60, tier: 3, note: "High biogenic amines." },
  { name: "Avocado", category: "Vegetables", histamine: 64, trigger: 55, tier: 3, note: "High amines, ripens fast." },
  { name: "Green beans", category: "Vegetables", histamine: 12, trigger: 10, tier: 0, note: "Fresh, well tolerated." },
  { name: "Cauliflower", category: "Vegetables", histamine: 12, trigger: 11, tier: 0, note: "Fresh brassica, fine." },
  { name: "Pumpkin", category: "Vegetables", histamine: 10, trigger: 9, tier: 0, note: "Well-tolerated squash." },
  { name: "Cabbage (raw)", category: "Vegetables", histamine: 18, trigger: 16, tier: 1, note: "Fine fresh; fermented becomes sauerkraut." },

  // ── Fruits ─────────────────────────────────────────────────
  { name: "Apple", category: "Fruits", histamine: 10, trigger: 10, tier: 0, note: "Fresh apple well tolerated." },
  { name: "Pear", category: "Fruits", histamine: 10, trigger: 9, tier: 0, note: "Low histamine." },
  { name: "Blueberry", category: "Fruits", histamine: 14, trigger: 12, tier: 0, note: "Antioxidant, generally safe." },
  { name: "Grape", category: "Fruits", histamine: 18, trigger: 20, tier: 1, note: "Fine fresh; not as wine." },
  { name: "Mango", category: "Fruits", histamine: 24, trigger: 26, tier: 1, note: "Mild liberator." },
  { name: "Peach", category: "Fruits", histamine: 30, trigger: 34, tier: 1, note: "Histamine liberator." },
  { name: "Banana", category: "Fruits", histamine: 36, trigger: 42, tier: 2, note: "Liberator; riper = worse." },
  { name: "Kiwi", category: "Fruits", histamine: 42, trigger: 40, tier: 2, note: "Moderately high." },
  { name: "Papaya", category: "Fruits", histamine: 48, trigger: 52, tier: 2, note: "Strong liberator." },
  { name: "Pineapple", category: "Fruits", histamine: 52, trigger: 56, tier: 3, note: "Liberator + amines." },
  { name: "Strawberry", category: "Fruits", histamine: 55, trigger: 58, tier: 3, note: "Classic histamine liberator." },
  { name: "Citrus (orange)", category: "Fruits", histamine: 58, trigger: 62, tier: 3, note: "Strong liberator." },
  { name: "Cherry", category: "Fruits", histamine: 12, trigger: 11, tier: 0, note: "Well tolerated fresh." },
  { name: "Watermelon", category: "Fruits", histamine: 14, trigger: 14, tier: 0, note: "Generally fine fresh." },
  { name: "Apricot (fresh)", category: "Fruits", histamine: 16, trigger: 16, tier: 0, note: "Fresh is fine; dried is high." },
  { name: "Raspberry", category: "Fruits", histamine: 44, trigger: 48, tier: 2, note: "Mild liberator." },
  { name: "Lemon", category: "Fruits", histamine: 56, trigger: 62, tier: 3, note: "Citrus liberator." },
  { name: "Dried apricot", category: "Fruits", histamine: 74, trigger: 60, tier: 3, note: "Dried fruit concentrates amines." },

  // ── Meat & Fish ────────────────────────────────────────────
  { name: "Fresh chicken", category: "Meat & Fish", histamine: 10, trigger: 8, tier: 0, note: "Fresh/cooked promptly is fine." },
  { name: "Fresh turkey", category: "Meat & Fish", histamine: 11, trigger: 9, tier: 0, note: "Low histamine when fresh." },
  { name: "Fresh beef", category: "Meat & Fish", histamine: 16, trigger: 14, tier: 0, note: "Fresh, not aged." },
  { name: "Fresh pork", category: "Meat & Fish", histamine: 18, trigger: 16, tier: 1, note: "Eat very fresh." },
  { name: "Fresh cod", category: "Meat & Fish", histamine: 24, trigger: 20, tier: 1, note: "Ultra-fresh white fish only." },
  { name: "Fresh salmon", category: "Meat & Fish", histamine: 30, trigger: 26, tier: 1, note: "Oily fish — eat very fresh." },
  { name: "Smoked salmon", category: "Meat & Fish", histamine: 76, trigger: 66, tier: 3, note: "Smoked/cured, high histamine." },
  { name: "Leftover meat", category: "Meat & Fish", histamine: 55, trigger: 45, tier: 3, note: "Histamine builds on storage." },
  { name: "Canned tuna", category: "Meat & Fish", histamine: 78, trigger: 62, tier: 3, note: "Scombroid-prone, high histamine." },
  { name: "Mackerel", category: "Meat & Fish", histamine: 84, trigger: 70, tier: 3, note: "Very high; scombroid risk." },
  { name: "Sardines (canned)", category: "Meat & Fish", histamine: 82, trigger: 66, tier: 3, note: "High histamine oily fish." },
  { name: "Shellfish (shrimp)", category: "Meat & Fish", histamine: 68, trigger: 64, tier: 3, note: "Liberator + high amines." },
  { name: "Cured ham", category: "Meat & Fish", histamine: 80, trigger: 72, tier: 3, note: "Aged/cured = very high." },
  { name: "Salami", category: "Meat & Fish", histamine: 86, trigger: 78, tier: 3, note: "Fermented, cured, avoid." },

  // ── Dairy & Eggs ───────────────────────────────────────────
  { name: "Egg yolk", category: "Dairy & Eggs", histamine: 12, trigger: 12, tier: 0, note: "Yolk well tolerated." },
  { name: "Egg white (raw)", category: "Dairy & Eggs", histamine: 30, trigger: 44, tier: 2, note: "Raw white is a liberator." },
  { name: "Fresh milk", category: "Dairy & Eggs", histamine: 14, trigger: 12, tier: 0, note: "Pasteurized fresh milk ok." },
  { name: "Butter", category: "Dairy & Eggs", histamine: 12, trigger: 10, tier: 0, note: "Low histamine fat." },
  { name: "Ricotta", category: "Dairy & Eggs", histamine: 16, trigger: 14, tier: 0, note: "Fresh whey cheese, well tolerated." },
  { name: "Cream cheese (fresh)", category: "Dairy & Eggs", histamine: 22, trigger: 18, tier: 1, note: "Fresh, unaged is milder." },
  { name: "Mozzarella", category: "Dairy & Eggs", histamine: 26, trigger: 22, tier: 1, note: "Fresh young cheese — better tolerated than aged." },
  { name: "Yogurt", category: "Dairy & Eggs", histamine: 50, trigger: 46, tier: 2, note: "Fermented — variable." },
  { name: "Aged cheddar", category: "Dairy & Eggs", histamine: 88, trigger: 74, tier: 3, note: "Aging skyrockets histamine." },
  { name: "Parmesan", category: "Dairy & Eggs", histamine: 90, trigger: 78, tier: 3, note: "Long-aged, very high." },
  { name: "Blue cheese", category: "Dairy & Eggs", histamine: 92, trigger: 82, tier: 3, note: "Mold-ripened, avoid." },

  // ── Fermented ──────────────────────────────────────────────
  { name: "Sauerkraut", category: "Fermented", histamine: 90, trigger: 84, tier: 3, note: "Fermented cabbage, very high." },
  { name: "Kimchi", category: "Fermented", histamine: 88, trigger: 82, tier: 3, note: "Fermented + spiced." },
  { name: "Soy sauce", category: "Fermented", histamine: 82, trigger: 80, tier: 3, note: "Fermented soy, high." },
  { name: "Miso", category: "Fermented", histamine: 80, trigger: 76, tier: 3, note: "Fermented paste." },
  { name: "Vinegar (wine)", category: "Fermented", histamine: 76, trigger: 78, tier: 3, note: "Fermented; liberator." },
  { name: "Tempeh", category: "Fermented", histamine: 70, trigger: 66, tier: 3, note: "Fermented soy." },
  { name: "Kombucha", category: "Fermented", histamine: 72, trigger: 74, tier: 3, note: "Fermented tea." },
  { name: "Olives (brined)", category: "Fermented", histamine: 68, trigger: 64, tier: 3, note: "Brined/fermented, high." },

  // ── Grains & Legumes ───────────────────────────────────────
  { name: "White rice", category: "Grains & Legumes", histamine: 6, trigger: 6, tier: 0, note: "Very safe staple." },
  { name: "Oats", category: "Grains & Legumes", histamine: 12, trigger: 12, tier: 0, note: "Well tolerated grain." },
  { name: "Quinoa", category: "Grains & Legumes", histamine: 14, trigger: 14, tier: 0, note: "Low histamine pseudo-grain." },
  { name: "Buckwheat", category: "Grains & Legumes", histamine: 12, trigger: 12, tier: 0, note: "Well-tolerated pseudo-grain." },
  { name: "Corn / polenta", category: "Grains & Legumes", histamine: 12, trigger: 12, tier: 0, note: "Well tolerated." },
  { name: "Wheat / bread", category: "Grains & Legumes", histamine: 24, trigger: 26, tier: 1, note: "Yeast can add load." },
  { name: "Chickpeas", category: "Grains & Legumes", histamine: 34, trigger: 40, tier: 2, note: "Legume amines." },
  { name: "Lentils", category: "Grains & Legumes", histamine: 36, trigger: 42, tier: 2, note: "Moderate biogenic amines." },
  { name: "Soybeans", category: "Grains & Legumes", histamine: 54, trigger: 58, tier: 3, note: "High amines / liberator." },

  // ── Nuts & Seeds ───────────────────────────────────────────
  { name: "Chia seeds", category: "Nuts & Seeds", histamine: 12, trigger: 14, tier: 0, note: "Well tolerated." },
  { name: "Flax seeds", category: "Nuts & Seeds", histamine: 14, trigger: 16, tier: 0, note: "Low histamine." },
  { name: "Macadamia", category: "Nuts & Seeds", histamine: 20, trigger: 22, tier: 1, note: "Milder nut option." },
  { name: "Sunflower seeds", category: "Nuts & Seeds", histamine: 22, trigger: 24, tier: 1, note: "Milder seed option." },
  { name: "Pistachios", category: "Nuts & Seeds", histamine: 56, trigger: 60, tier: 3, note: "High amines / liberator." },
  { name: "Almonds", category: "Nuts & Seeds", histamine: 30, trigger: 38, tier: 2, note: "Mild liberator." },
  { name: "Peanuts", category: "Nuts & Seeds", histamine: 52, trigger: 60, tier: 3, note: "Strong liberator." },
  { name: "Cashews", category: "Nuts & Seeds", histamine: 50, trigger: 56, tier: 3, note: "Liberator + amines." },
  { name: "Walnuts", category: "Nuts & Seeds", histamine: 48, trigger: 54, tier: 2, note: "Moderately high." },

  // ── Beverages ──────────────────────────────────────────────
  { name: "Water", category: "Beverages", histamine: 2, trigger: 2, tier: 0, note: "Baseline safe." },
  { name: "Herbal tea (rooibos)", category: "Beverages", histamine: 8, trigger: 8, tier: 0, note: "Caffeine-free, safe." },
  { name: "Coconut water", category: "Beverages", histamine: 14, trigger: 12, tier: 0, note: "Well tolerated." },
  { name: "Black tea", category: "Beverages", histamine: 40, trigger: 48, tier: 2, note: "DAO-blocking." },
  { name: "Coffee", category: "Beverages", histamine: 44, trigger: 52, tier: 2, note: "DAO-blocking liberator." },
  { name: "Green tea", category: "Beverages", histamine: 42, trigger: 50, tier: 2, note: "Can block DAO." },
  { name: "Energy drink", category: "Beverages", histamine: 60, trigger: 66, tier: 3, note: "Additives + liberators." },
  { name: "Beer", category: "Beverages", histamine: 78, trigger: 82, tier: 3, note: "Fermented, DAO-blocking." },
  { name: "White wine", category: "Beverages", histamine: 74, trigger: 82, tier: 3, note: "Alcohol blocks DAO; sulfites too." },
  { name: "Red wine", category: "Beverages", histamine: 88, trigger: 90, tier: 3, note: "High histamine + blocks DAO." },
  { name: "Champagne / sparkling", category: "Beverages", histamine: 82, trigger: 86, tier: 3, note: "Fermented alcohol." },

  // ── Condiments & Extras ────────────────────────────────────
  { name: "Olive oil", category: "Condiments & Extras", histamine: 6, trigger: 6, tier: 0, note: "Fresh fat, safe." },
  { name: "Salt", category: "Condiments & Extras", histamine: 2, trigger: 2, tier: 0, note: "Neutral." },
  { name: "Fresh herbs (basil)", category: "Condiments & Extras", histamine: 12, trigger: 12, tier: 0, note: "Fresh herbs fine." },
  { name: "Maple syrup", category: "Condiments & Extras", histamine: 16, trigger: 16, tier: 1, note: "Generally tolerated." },
  { name: "Honey", category: "Condiments & Extras", histamine: 18, trigger: 18, tier: 1, note: "Usually fine." },
  { name: "Cocoa / chocolate", category: "Condiments & Extras", histamine: 66, trigger: 76, tier: 3, note: "Strong DAO-blocker." },
  { name: "Ketchup", category: "Condiments & Extras", histamine: 72, trigger: 70, tier: 3, note: "Tomato + vinegar." },
  { name: "Mustard", category: "Condiments & Extras", histamine: 50, trigger: 54, tier: 3, note: "Spice + vinegar." },
];

export const foods: Food[] = rawFoods.map((f) => ({
  ...f,
  emoji: EMOJI[f.name],
}));
