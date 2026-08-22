// Food-map data, organised by health condition.
//
// Each condition plots everyday foods on two 0–100 axes and rates them with a
// 4-step tier (0 best → 3 avoid). The axes and wording differ per condition,
// but the shape of the data is shared so one chart can render any of them.
//
// Educational overview only — not medical advice. Individual tolerance and
// clinical targets vary; freshness, portion size and preparation all matter.

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

export interface FoodItem {
  name: string;
  category: Category;
  x: number; // 0–100, horizontal axis (meaning depends on condition)
  y: number; // 0–100, vertical axis (meaning depends on condition)
  tier: Tier;
  note: string;
  emoji?: string;
}

export interface Condition {
  id: string;
  /** Short label shown in the switcher. */
  switchLabel: string;
  /** Header eyebrow. */
  kicker: string;
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  /** Short axis labels used in the hover card. */
  xMetric: string;
  yMetric: string;
  safeLabel: string;
  avoidLabel: string;
  tiers: { tier: Tier; label: string; blurb: string }[];
  categories: Category[];
  /** Human-readable data source, shown as a link on the page. */
  sourceName: string;
  sourceUrl: string;
  footer: string;
  items: FoodItem[];
}

// Emoji shown next to foods that have a fitting one. Shared across conditions.
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
  "Dried apricot": "🍑",
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
  "Egg white": "🥚",
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
  "Cola / soda": "🥤",
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

const withEmoji = (items: FoodItem[]): FoodItem[] =>
  items.map((f) => ({ ...f, emoji: EMOJI[f.name] }));

// ─────────────────────────────────────────────────────────────
// Histamine intolerance
//   x = food's own histamine content
//   y = additional trigger load (liberators, DAO-blockers, amines)
// ─────────────────────────────────────────────────────────────
const histamineItems: FoodItem[] = [
  // Vegetables
  { name: "Broccoli", category: "Vegetables", x: 12, y: 10, tier: 0, note: "Fresh brassica, well tolerated." },
  { name: "Carrot", category: "Vegetables", x: 8, y: 8, tier: 0, note: "Low histamine root vegetable." },
  { name: "Cucumber", category: "Vegetables", x: 6, y: 6, tier: 0, note: "Very well tolerated fresh." },
  { name: "Zucchini", category: "Vegetables", x: 10, y: 9, tier: 0, note: "Mild, safe cooked or raw." },
  { name: "Bell pepper", category: "Vegetables", x: 14, y: 12, tier: 0, note: "Fresh sweet pepper is fine." },
  { name: "Lettuce", category: "Vegetables", x: 10, y: 10, tier: 0, note: "Fresh leaves well tolerated." },
  { name: "Potato", category: "Vegetables", x: 9, y: 8, tier: 0, note: "Neutral staple." },
  { name: "Sweet potato", category: "Vegetables", x: 10, y: 9, tier: 0, note: "Well tolerated." },
  { name: "Onion", category: "Vegetables", x: 15, y: 18, tier: 0, note: "Mild DAO-supportive quercetin." },
  { name: "Garlic", category: "Vegetables", x: 16, y: 20, tier: 0, note: "Anti-inflammatory, usually fine." },
  { name: "Asparagus", category: "Vegetables", x: 20, y: 22, tier: 1, note: "Mild liberator for some." },
  { name: "Mushroom", category: "Vegetables", x: 38, y: 40, tier: 2, note: "Aged/dried are higher." },
  { name: "Spinach", category: "Vegetables", x: 62, y: 58, tier: 3, note: "High histamine leaf." },
  { name: "Tomato", category: "Vegetables", x: 70, y: 68, tier: 3, note: "High histamine + liberator." },
  { name: "Eggplant", category: "Vegetables", x: 66, y: 60, tier: 3, note: "High biogenic amines." },
  { name: "Avocado", category: "Vegetables", x: 64, y: 55, tier: 3, note: "High amines, ripens fast." },
  { name: "Green beans", category: "Vegetables", x: 12, y: 10, tier: 0, note: "Fresh, well tolerated." },
  { name: "Cauliflower", category: "Vegetables", x: 12, y: 11, tier: 0, note: "Fresh brassica, fine." },
  { name: "Pumpkin", category: "Vegetables", x: 10, y: 9, tier: 0, note: "Well-tolerated squash." },
  { name: "Cabbage (raw)", category: "Vegetables", x: 18, y: 16, tier: 1, note: "Fine fresh; fermented becomes sauerkraut." },
  // Fruits
  { name: "Apple", category: "Fruits", x: 10, y: 10, tier: 0, note: "Fresh apple well tolerated." },
  { name: "Pear", category: "Fruits", x: 10, y: 9, tier: 0, note: "Low histamine." },
  { name: "Blueberry", category: "Fruits", x: 14, y: 12, tier: 0, note: "Antioxidant, generally safe." },
  { name: "Grape", category: "Fruits", x: 18, y: 20, tier: 1, note: "Fine fresh; not as wine." },
  { name: "Mango", category: "Fruits", x: 24, y: 26, tier: 1, note: "Mild liberator." },
  { name: "Peach", category: "Fruits", x: 30, y: 34, tier: 1, note: "Histamine liberator." },
  { name: "Banana", category: "Fruits", x: 36, y: 42, tier: 2, note: "Liberator; riper = worse." },
  { name: "Kiwi", category: "Fruits", x: 42, y: 40, tier: 2, note: "Moderately high." },
  { name: "Papaya", category: "Fruits", x: 48, y: 52, tier: 2, note: "Strong liberator." },
  { name: "Pineapple", category: "Fruits", x: 52, y: 56, tier: 3, note: "Liberator + amines." },
  { name: "Strawberry", category: "Fruits", x: 55, y: 58, tier: 3, note: "Classic histamine liberator." },
  { name: "Citrus (orange)", category: "Fruits", x: 58, y: 62, tier: 3, note: "Strong liberator." },
  { name: "Cherry", category: "Fruits", x: 12, y: 11, tier: 0, note: "Well tolerated fresh." },
  { name: "Watermelon", category: "Fruits", x: 14, y: 14, tier: 0, note: "Generally fine fresh." },
  { name: "Apricot (fresh)", category: "Fruits", x: 16, y: 16, tier: 0, note: "Fresh is fine; dried is high." },
  { name: "Raspberry", category: "Fruits", x: 44, y: 48, tier: 2, note: "Mild liberator." },
  { name: "Lemon", category: "Fruits", x: 56, y: 62, tier: 3, note: "Citrus liberator." },
  { name: "Dried apricot", category: "Fruits", x: 74, y: 60, tier: 3, note: "Dried fruit concentrates amines." },
  // Meat & Fish
  { name: "Fresh chicken", category: "Meat & Fish", x: 10, y: 8, tier: 0, note: "Fresh/cooked promptly is fine." },
  { name: "Fresh turkey", category: "Meat & Fish", x: 11, y: 9, tier: 0, note: "Low histamine when fresh." },
  { name: "Fresh beef", category: "Meat & Fish", x: 16, y: 14, tier: 0, note: "Fresh, not aged." },
  { name: "Fresh pork", category: "Meat & Fish", x: 18, y: 16, tier: 1, note: "Eat very fresh." },
  { name: "Fresh cod", category: "Meat & Fish", x: 24, y: 20, tier: 1, note: "Ultra-fresh white fish only." },
  { name: "Fresh salmon", category: "Meat & Fish", x: 30, y: 26, tier: 1, note: "Oily fish — eat very fresh." },
  { name: "Smoked salmon", category: "Meat & Fish", x: 76, y: 66, tier: 3, note: "Smoked/cured, high histamine." },
  { name: "Leftover meat", category: "Meat & Fish", x: 55, y: 45, tier: 3, note: "Histamine builds on storage." },
  { name: "Canned tuna", category: "Meat & Fish", x: 78, y: 62, tier: 3, note: "Scombroid-prone, high histamine." },
  { name: "Mackerel", category: "Meat & Fish", x: 84, y: 70, tier: 3, note: "Very high; scombroid risk." },
  { name: "Sardines (canned)", category: "Meat & Fish", x: 82, y: 66, tier: 3, note: "High histamine oily fish." },
  { name: "Shellfish (shrimp)", category: "Meat & Fish", x: 68, y: 64, tier: 3, note: "Liberator + high amines." },
  { name: "Cured ham", category: "Meat & Fish", x: 80, y: 72, tier: 3, note: "Aged/cured = very high." },
  { name: "Salami", category: "Meat & Fish", x: 86, y: 78, tier: 3, note: "Fermented, cured, avoid." },
  // Dairy & Eggs
  { name: "Egg yolk", category: "Dairy & Eggs", x: 12, y: 12, tier: 0, note: "Yolk well tolerated." },
  { name: "Egg white (raw)", category: "Dairy & Eggs", x: 30, y: 44, tier: 2, note: "Raw white is a liberator." },
  { name: "Fresh milk", category: "Dairy & Eggs", x: 14, y: 12, tier: 0, note: "Pasteurized fresh milk ok." },
  { name: "Butter", category: "Dairy & Eggs", x: 12, y: 10, tier: 0, note: "Low histamine fat." },
  { name: "Ricotta", category: "Dairy & Eggs", x: 16, y: 14, tier: 0, note: "Fresh whey cheese, well tolerated." },
  { name: "Cream cheese (fresh)", category: "Dairy & Eggs", x: 22, y: 18, tier: 1, note: "Fresh, unaged is milder." },
  { name: "Mozzarella", category: "Dairy & Eggs", x: 26, y: 22, tier: 1, note: "Fresh young cheese — better tolerated than aged." },
  { name: "Yogurt", category: "Dairy & Eggs", x: 50, y: 46, tier: 2, note: "Fermented — variable." },
  { name: "Aged cheddar", category: "Dairy & Eggs", x: 88, y: 74, tier: 3, note: "Aging skyrockets histamine." },
  { name: "Parmesan", category: "Dairy & Eggs", x: 90, y: 78, tier: 3, note: "Long-aged, very high." },
  { name: "Blue cheese", category: "Dairy & Eggs", x: 92, y: 82, tier: 3, note: "Mold-ripened, avoid." },
  // Fermented
  { name: "Sauerkraut", category: "Fermented", x: 90, y: 84, tier: 3, note: "Fermented cabbage, very high." },
  { name: "Kimchi", category: "Fermented", x: 88, y: 82, tier: 3, note: "Fermented + spiced." },
  { name: "Soy sauce", category: "Fermented", x: 82, y: 80, tier: 3, note: "Fermented soy, high." },
  { name: "Miso", category: "Fermented", x: 80, y: 76, tier: 3, note: "Fermented paste." },
  { name: "Vinegar (wine)", category: "Fermented", x: 76, y: 78, tier: 3, note: "Fermented; liberator." },
  { name: "Tempeh", category: "Fermented", x: 70, y: 66, tier: 3, note: "Fermented soy." },
  { name: "Kombucha", category: "Fermented", x: 72, y: 74, tier: 3, note: "Fermented tea." },
  { name: "Olives (brined)", category: "Fermented", x: 68, y: 64, tier: 3, note: "Brined/fermented, high." },
  // Grains & Legumes
  { name: "White rice", category: "Grains & Legumes", x: 6, y: 6, tier: 0, note: "Very safe staple." },
  { name: "Oats", category: "Grains & Legumes", x: 12, y: 12, tier: 0, note: "Well tolerated grain." },
  { name: "Quinoa", category: "Grains & Legumes", x: 14, y: 14, tier: 0, note: "Low histamine pseudo-grain." },
  { name: "Buckwheat", category: "Grains & Legumes", x: 12, y: 12, tier: 0, note: "Well-tolerated pseudo-grain." },
  { name: "Corn / polenta", category: "Grains & Legumes", x: 12, y: 12, tier: 0, note: "Well tolerated." },
  { name: "Wheat / bread", category: "Grains & Legumes", x: 24, y: 26, tier: 1, note: "Yeast can add load." },
  { name: "Chickpeas", category: "Grains & Legumes", x: 34, y: 40, tier: 2, note: "Legume amines." },
  { name: "Lentils", category: "Grains & Legumes", x: 36, y: 42, tier: 2, note: "Moderate biogenic amines." },
  { name: "Soybeans", category: "Grains & Legumes", x: 54, y: 58, tier: 3, note: "High amines / liberator." },
  // Nuts & Seeds
  { name: "Chia seeds", category: "Nuts & Seeds", x: 12, y: 14, tier: 0, note: "Well tolerated." },
  { name: "Flax seeds", category: "Nuts & Seeds", x: 14, y: 16, tier: 0, note: "Low histamine." },
  { name: "Macadamia", category: "Nuts & Seeds", x: 20, y: 22, tier: 1, note: "Milder nut option." },
  { name: "Sunflower seeds", category: "Nuts & Seeds", x: 22, y: 24, tier: 1, note: "Milder seed option." },
  { name: "Pistachios", category: "Nuts & Seeds", x: 56, y: 60, tier: 3, note: "High amines / liberator." },
  { name: "Almonds", category: "Nuts & Seeds", x: 30, y: 38, tier: 2, note: "Mild liberator." },
  { name: "Peanuts", category: "Nuts & Seeds", x: 52, y: 60, tier: 3, note: "Strong liberator." },
  { name: "Cashews", category: "Nuts & Seeds", x: 50, y: 56, tier: 3, note: "Liberator + amines." },
  { name: "Walnuts", category: "Nuts & Seeds", x: 48, y: 54, tier: 2, note: "Moderately high." },
  // Beverages
  { name: "Water", category: "Beverages", x: 2, y: 2, tier: 0, note: "Baseline safe." },
  { name: "Herbal tea (rooibos)", category: "Beverages", x: 8, y: 8, tier: 0, note: "Caffeine-free, safe." },
  { name: "Coconut water", category: "Beverages", x: 14, y: 12, tier: 0, note: "Well tolerated." },
  { name: "Black tea", category: "Beverages", x: 40, y: 48, tier: 2, note: "DAO-blocking." },
  { name: "Coffee", category: "Beverages", x: 44, y: 52, tier: 2, note: "DAO-blocking liberator." },
  { name: "Green tea", category: "Beverages", x: 42, y: 50, tier: 2, note: "Can block DAO." },
  { name: "Energy drink", category: "Beverages", x: 60, y: 66, tier: 3, note: "Additives + liberators." },
  { name: "Beer", category: "Beverages", x: 78, y: 82, tier: 3, note: "Fermented, DAO-blocking." },
  { name: "White wine", category: "Beverages", x: 74, y: 82, tier: 3, note: "Alcohol blocks DAO; sulfites too." },
  { name: "Red wine", category: "Beverages", x: 88, y: 90, tier: 3, note: "High histamine + blocks DAO." },
  { name: "Champagne / sparkling", category: "Beverages", x: 82, y: 86, tier: 3, note: "Fermented alcohol." },
  // Condiments & Extras
  { name: "Olive oil", category: "Condiments & Extras", x: 6, y: 6, tier: 0, note: "Fresh fat, safe." },
  { name: "Salt", category: "Condiments & Extras", x: 2, y: 2, tier: 0, note: "Neutral." },
  { name: "Fresh herbs (basil)", category: "Condiments & Extras", x: 12, y: 12, tier: 0, note: "Fresh herbs fine." },
  { name: "Maple syrup", category: "Condiments & Extras", x: 16, y: 16, tier: 1, note: "Generally tolerated." },
  { name: "Honey", category: "Condiments & Extras", x: 18, y: 18, tier: 1, note: "Usually fine." },
  { name: "Cocoa / chocolate", category: "Condiments & Extras", x: 66, y: 76, tier: 3, note: "Strong DAO-blocker." },
  { name: "Ketchup", category: "Condiments & Extras", x: 72, y: 70, tier: 3, note: "Tomato + vinegar." },
  { name: "Mustard", category: "Condiments & Extras", x: 50, y: 54, tier: 3, note: "Spice + vinegar." },
];

// ─────────────────────────────────────────────────────────────
// Kidney failure (chronic kidney disease / renal diet)
//
// Sourced from USDA FoodData Central, SR Legacy (2018), using measured
// potassium, phosphorus and sodium per 100 g. Each note shows the raw mg
// values. Axes and tiers are derived from those numbers:
//   x = potassium, scaled min(100, K / 7)
//   y = phosphorus / sodium load, scaled min(100, max(P / 8, Na / 12))
//   tier = worst renal band across the three minerals per 100 g:
//     0 all low · 1 K≥200 or P≥100 or Na≥140 · 2 K≥300/P≥200/Na≥400
//     · 3 K≥400 or P≥300 or Na≥800
// Bottom-left is kidney-friendly; top-right is best limited/avoided.
// ─────────────────────────────────────────────────────────────
const kidneyItems: FoodItem[] = [
  // Vegetables
  { name: "Cabbage (raw)", category: "Vegetables", x: 24, y: 3, tier: 0, note: "Per 100 g: 170 mg potassium, 26 mg phosphorus, 18 mg sodium." },
  { name: "Cauliflower", category: "Vegetables", x: 43, y: 6, tier: 1, note: "Per 100 g: 299 mg potassium, 44 mg phosphorus, 30 mg sodium." },
  { name: "Cucumber", category: "Vegetables", x: 21, y: 3, tier: 0, note: "Per 100 g: 147 mg potassium, 24 mg phosphorus, 2 mg sodium." },
  { name: "Lettuce", category: "Vegetables", x: 20, y: 2, tier: 0, note: "Per 100 g: 141 mg potassium, 20 mg phosphorus, 10 mg sodium." },
  { name: "Bell pepper", category: "Vegetables", x: 25, y: 2, tier: 0, note: "Per 100 g: 175 mg potassium, 20 mg phosphorus, 3 mg sodium." },
  { name: "Onion", category: "Vegetables", x: 21, y: 4, tier: 0, note: "Per 100 g: 146 mg potassium, 29 mg phosphorus, 4 mg sodium." },
  { name: "Green beans", category: "Vegetables", x: 30, y: 5, tier: 1, note: "Per 100 g: 211 mg potassium, 38 mg phosphorus, 6 mg sodium." },
  { name: "Carrot", category: "Vegetables", x: 46, y: 6, tier: 2, note: "Per 100 g: 320 mg potassium, 35 mg phosphorus, 69 mg sodium." },
  { name: "Zucchini", category: "Vegetables", x: 37, y: 5, tier: 1, note: "Per 100 g: 261 mg potassium, 38 mg phosphorus, 8 mg sodium." },
  { name: "Broccoli", category: "Vegetables", x: 45, y: 8, tier: 2, note: "Per 100 g: 316 mg potassium, 66 mg phosphorus, 33 mg sodium." },
  { name: "Mushroom", category: "Vegetables", x: 45, y: 11, tier: 2, note: "Per 100 g: 318 mg potassium, 86 mg phosphorus, 5 mg sodium." },
  { name: "Pumpkin", category: "Vegetables", x: 49, y: 6, tier: 2, note: "Per 100 g: 340 mg potassium, 44 mg phosphorus, 1 mg sodium." },
  { name: "Potato", category: "Vegetables", x: 61, y: 7, tier: 3, note: "Per 100 g: 425 mg potassium, 57 mg phosphorus, 6 mg sodium." },
  { name: "Sweet potato", category: "Vegetables", x: 48, y: 6, tier: 2, note: "Per 100 g: 337 mg potassium, 47 mg phosphorus, 55 mg sodium." },
  { name: "Spinach", category: "Vegetables", x: 80, y: 7, tier: 3, note: "Per 100 g: 558 mg potassium, 49 mg phosphorus, 79 mg sodium." },
  { name: "Tomato", category: "Vegetables", x: 34, y: 3, tier: 1, note: "Per 100 g: 237 mg potassium, 24 mg phosphorus, 5 mg sodium." },
  { name: "Avocado", category: "Vegetables", x: 72, y: 7, tier: 3, note: "Per 100 g: 507 mg potassium, 54 mg phosphorus, 8 mg sodium." },
  // Fruits
  { name: "Apple", category: "Fruits", x: 14, y: 1, tier: 0, note: "Per 100 g: 100 mg potassium, 10 mg phosphorus, 2 mg sodium." },
  { name: "Blueberry", category: "Fruits", x: 11, y: 2, tier: 0, note: "Per 100 g: 77 mg potassium, 12 mg phosphorus, 1 mg sodium." },
  { name: "Strawberry", category: "Fruits", x: 22, y: 3, tier: 0, note: "Per 100 g: 153 mg potassium, 24 mg phosphorus, 1 mg sodium." },
  { name: "Grape", category: "Fruits", x: 27, y: 1, tier: 0, note: "Per 100 g: 191 mg potassium, 10 mg phosphorus, 2 mg sodium." },
  { name: "Pear", category: "Fruits", x: 17, y: 2, tier: 0, note: "Per 100 g: 116 mg potassium, 12 mg phosphorus, 1 mg sodium." },
  { name: "Pineapple", category: "Fruits", x: 16, y: 1, tier: 0, note: "Per 100 g: 109 mg potassium, 8 mg phosphorus, 1 mg sodium." },
  { name: "Watermelon", category: "Fruits", x: 16, y: 1, tier: 0, note: "Per 100 g: 112 mg potassium, 11 mg phosphorus, 1 mg sodium." },
  { name: "Raspberry", category: "Fruits", x: 22, y: 4, tier: 0, note: "Per 100 g: 151 mg potassium, 29 mg phosphorus, 1 mg sodium." },
  { name: "Cherry", category: "Fruits", x: 32, y: 3, tier: 1, note: "Per 100 g: 222 mg potassium, 21 mg phosphorus, 0 mg sodium." },
  { name: "Peach", category: "Fruits", x: 27, y: 2, tier: 0, note: "Per 100 g: 190 mg potassium, 20 mg phosphorus, 0 mg sodium." },
  { name: "Mango", category: "Fruits", x: 24, y: 2, tier: 0, note: "Per 100 g: 168 mg potassium, 14 mg phosphorus, 1 mg sodium." },
  { name: "Kiwi", category: "Fruits", x: 45, y: 4, tier: 2, note: "Per 100 g: 312 mg potassium, 34 mg phosphorus, 3 mg sodium." },
  { name: "Citrus (orange)", category: "Fruits", x: 26, y: 2, tier: 0, note: "Per 100 g: 181 mg potassium, 14 mg phosphorus, 0 mg sodium." },
  { name: "Banana", category: "Fruits", x: 51, y: 3, tier: 2, note: "Per 100 g: 358 mg potassium, 22 mg phosphorus, 1 mg sodium." },
  { name: "Dried apricot", category: "Fruits", x: 100, y: 9, tier: 3, note: "Per 100 g: 1162 mg potassium, 71 mg phosphorus, 10 mg sodium." },
  // Meat & Fish
  { name: "Egg white", category: "Meat & Fish", x: 23, y: 14, tier: 1, note: "Per 100 g: 163 mg potassium, 15 mg phosphorus, 166 mg sodium." },
  { name: "Fresh chicken", category: "Meat & Fish", x: 48, y: 27, tier: 2, note: "Per 100 g: 334 mg potassium, 213 mg phosphorus, 45 mg sodium." },
  { name: "Fresh turkey", category: "Meat & Fish", x: 35, y: 25, tier: 2, note: "Per 100 g: 242 mg potassium, 201 mg phosphorus, 113 mg sodium." },
  { name: "Fresh cod", category: "Meat & Fish", x: 59, y: 25, tier: 3, note: "Per 100 g: 413 mg potassium, 203 mg phosphorus, 54 mg sodium." },
  { name: "Fresh salmon", category: "Meat & Fish", x: 52, y: 30, tier: 2, note: "Per 100 g: 363 mg potassium, 240 mg phosphorus, 59 mg sodium." },
  { name: "Fresh beef", category: "Meat & Fish", x: 42, y: 21, tier: 1, note: "Per 100 g: 295 mg potassium, 171 mg phosphorus, 66 mg sodium." },
  { name: "Fresh pork", category: "Meat & Fish", x: 56, y: 26, tier: 2, note: "Per 100 g: 389 mg potassium, 211 mg phosphorus, 52 mg sodium." },
  { name: "Canned tuna", category: "Meat & Fish", x: 26, y: 21, tier: 1, note: "Per 100 g: 179 mg potassium, 139 mg phosphorus, 247 mg sodium." },
  { name: "Shellfish (shrimp)", category: "Meat & Fish", x: 38, y: 27, tier: 2, note: "Per 100 g: 264 mg potassium, 214 mg phosphorus, 119 mg sodium." },
  { name: "Egg yolk", category: "Meat & Fish", x: 16, y: 49, tier: 3, note: "Per 100 g: 109 mg potassium, 390 mg phosphorus, 48 mg sodium." },
  { name: "Cured ham", category: "Meat & Fish", x: 52, y: 100, tier: 3, note: "Per 100 g: 362 mg potassium, 248 mg phosphorus, 1385 mg sodium." },
  { name: "Salami", category: "Meat & Fish", x: 54, y: 100, tier: 3, note: "Per 100 g: 378 mg potassium, 229 mg phosphorus, 2260 mg sodium." },
  // Dairy & Eggs
  { name: "Butter", category: "Dairy & Eggs", x: 3, y: 3, tier: 0, note: "Per 100 g: 24 mg potassium, 24 mg phosphorus, 11 mg sodium." },
  { name: "Cream cheese (fresh)", category: "Dairy & Eggs", x: 16, y: 36, tier: 2, note: "Per 100 g: 112 mg potassium, 91 mg phosphorus, 436 mg sodium." },
  { name: "Fresh milk", category: "Dairy & Eggs", x: 19, y: 10, tier: 0, note: "Per 100 g: 132 mg potassium, 84 mg phosphorus, 43 mg sodium." },
  { name: "Yogurt", category: "Dairy & Eggs", x: 22, y: 12, tier: 0, note: "Per 100 g: 155 mg potassium, 95 mg phosphorus, 46 mg sodium." },
  { name: "Aged cheddar", category: "Dairy & Eggs", x: 11, y: 58, tier: 3, note: "Per 100 g: 76 mg potassium, 460 mg phosphorus, 644 mg sodium." },
  { name: "Parmesan", category: "Dairy & Eggs", x: 13, y: 98, tier: 3, note: "Per 100 g: 92 mg potassium, 694 mg phosphorus, 1175 mg sodium." },
  // Grains & Legumes
  { name: "White rice", category: "Grains & Legumes", x: 16, y: 14, tier: 1, note: "Per 100 g: 115 mg potassium, 115 mg phosphorus, 5 mg sodium." },
  { name: "Corn / polenta", category: "Grains & Legumes", x: 39, y: 11, tier: 1, note: "Per 100 g: 270 mg potassium, 89 mg phosphorus, 15 mg sodium." },
  { name: "Wheat / bread", category: "Grains & Legumes", x: 18, y: 41, tier: 2, note: "Per 100 g: 126 mg potassium, 98 mg phosphorus, 490 mg sodium." },
  { name: "Oats", category: "Grains & Legumes", x: 61, y: 65, tier: 3, note: "Per 100 g: 429 mg potassium, 523 mg phosphorus, 2 mg sodium." },
  { name: "Buckwheat", category: "Grains & Legumes", x: 66, y: 43, tier: 3, note: "Per 100 g: 460 mg potassium, 347 mg phosphorus, 1 mg sodium." },
  { name: "Chickpeas", category: "Grains & Legumes", x: 100, y: 32, tier: 3, note: "Per 100 g: 718 mg potassium, 252 mg phosphorus, 24 mg sodium." },
  { name: "Lentils", category: "Grains & Legumes", x: 97, y: 35, tier: 3, note: "Per 100 g: 677 mg potassium, 281 mg phosphorus, 6 mg sodium." },
  { name: "Soybeans", category: "Grains & Legumes", x: 100, y: 88, tier: 3, note: "Per 100 g: 1797 mg potassium, 704 mg phosphorus, 2 mg sodium." },
  // Nuts & Seeds
  { name: "Macadamia", category: "Nuts & Seeds", x: 53, y: 24, tier: 2, note: "Per 100 g: 368 mg potassium, 188 mg phosphorus, 5 mg sodium." },
  { name: "Walnuts", category: "Nuts & Seeds", x: 63, y: 43, tier: 3, note: "Per 100 g: 441 mg potassium, 346 mg phosphorus, 2 mg sodium." },
  { name: "Almonds", category: "Nuts & Seeds", x: 100, y: 60, tier: 3, note: "Per 100 g: 733 mg potassium, 481 mg phosphorus, 1 mg sodium." },
  { name: "Peanuts", category: "Nuts & Seeds", x: 100, y: 47, tier: 3, note: "Per 100 g: 705 mg potassium, 376 mg phosphorus, 18 mg sodium." },
  { name: "Cashews", category: "Nuts & Seeds", x: 94, y: 74, tier: 3, note: "Per 100 g: 660 mg potassium, 593 mg phosphorus, 12 mg sodium." },
  { name: "Sunflower seeds", category: "Nuts & Seeds", x: 92, y: 82, tier: 3, note: "Per 100 g: 645 mg potassium, 660 mg phosphorus, 9 mg sodium." },
  { name: "Chia seeds", category: "Nuts & Seeds", x: 58, y: 100, tier: 3, note: "Per 100 g: 407 mg potassium, 860 mg phosphorus, 16 mg sodium." },
  // Beverages
  { name: "Water", category: "Beverages", x: 0, y: 0, tier: 0, note: "Per 100 g: 1 mg potassium, 0 mg phosphorus, 3 mg sodium." },
  { name: "Green tea", category: "Beverages", x: 1, y: 0, tier: 0, note: "Per 100 g: 8 mg potassium, 0 mg phosphorus, 1 mg sodium." },
  { name: "Black tea", category: "Beverages", x: 5, y: 0, tier: 0, note: "Per 100 g: 37 mg potassium, 1 mg phosphorus, 3 mg sodium." },
  { name: "Coffee", category: "Beverages", x: 7, y: 0, tier: 0, note: "Per 100 g: 49 mg potassium, 3 mg phosphorus, 2 mg sodium." },
  { name: "Red wine", category: "Beverages", x: 18, y: 3, tier: 0, note: "Per 100 g: 127 mg potassium, 23 mg phosphorus, 4 mg sodium." },
  { name: "Beer", category: "Beverages", x: 4, y: 2, tier: 0, note: "Per 100 g: 27 mg potassium, 14 mg phosphorus, 4 mg sodium." },
  { name: "Cola / soda", category: "Beverages", x: 1, y: 1, tier: 0, note: "Per 100 g: 5 mg potassium, 9 mg phosphorus, 3 mg sodium." },
  { name: "Coconut water", category: "Beverages", x: 36, y: 9, tier: 1, note: "Per 100 g: 250 mg potassium, 20 mg phosphorus, 105 mg sodium." },
  // Condiments & Extras
  { name: "Olive oil", category: "Condiments & Extras", x: 0, y: 0, tier: 0, note: "Per 100 g: 1 mg potassium, 0 mg phosphorus, 2 mg sodium." },
  { name: "Honey", category: "Condiments & Extras", x: 7, y: 0, tier: 0, note: "Per 100 g: 52 mg potassium, 4 mg phosphorus, 4 mg sodium." },
  { name: "Maple syrup", category: "Condiments & Extras", x: 30, y: 1, tier: 1, note: "Per 100 g: 212 mg potassium, 2 mg phosphorus, 12 mg sodium." },
  { name: "Mustard", category: "Condiments & Extras", x: 22, y: 92, tier: 3, note: "Per 100 g: 152 mg potassium, 108 mg phosphorus, 1104 mg sodium." },
  { name: "Ketchup", category: "Condiments & Extras", x: 40, y: 76, tier: 3, note: "Per 100 g: 281 mg potassium, 26 mg phosphorus, 907 mg sodium." },
  { name: "Cocoa / chocolate", category: "Condiments & Extras", x: 100, y: 38, tier: 3, note: "Per 100 g: 715 mg potassium, 308 mg phosphorus, 20 mg sodium." },
  { name: "Salt", category: "Condiments & Extras", x: 1, y: 100, tier: 3, note: "Per 100 g: 8 mg potassium, 0 mg phosphorus, 38758 mg sodium." },
];

export const conditions: Condition[] = [
  {
    id: "histamine",
    switchLabel: "Histamine intolerance",
    kicker: "Histamine intolerance",
    title: "The Histamine Food Map",
    description:
      "everyday foods plotted by their own histamine content and their additional trigger load — histamine liberators, DAO-blockers and other biogenic amines. Bottom-left is safest; top-right is best avoided.",
    xLabel: "Histamine content  →",
    yLabel: "Trigger load (liberators · DAO-block)  →",
    xMetric: "Histamine",
    yMetric: "Trigger",
    safeLabel: "SAFE ZONE",
    avoidLabel: "AVOID",
    tiers: [
      { tier: 0, label: "Well tolerated", blurb: "Low histamine, generally safe fresh." },
      { tier: 1, label: "Moderate", blurb: "Some histamine or minor liberator effect." },
      { tier: 2, label: "High", blurb: "Notably high — limit portions." },
      { tier: 3, label: "Avoid", blurb: "Very high histamine or strong triggers." },
    ],
    categories: CATEGORIES,
    sourceName: "SIGHI histamine food-compatibility list",
    sourceUrl: "https://www.mastzellaktivierung.info/downloads/foodlist/11_FoodList_EN_alphabetic_withC013.pdf",
    footer:
      "Tolerance ratings are aligned with the SIGHI food-compatibility list. Note that histamine content is not a fixed value — it varies sharply with freshness, ripeness, storage and preparation — so positions are indicative rather than measured. Educational overview only — not medical advice. Histamine tolerance is highly individual, and a food's histamine level changes sharply with freshness, ripeness, storage and preparation. Ratings are aligned with common histamine-intolerance food compatibility lists.",
    items: withEmoji(histamineItems),
  },
  {
    id: "kidney",
    switchLabel: "Kidney failure",
    kicker: "Chronic kidney disease · renal diet",
    title: "The Kidney-Friendly Food Map",
    description:
      "everyday foods plotted by their potassium and their phosphorus & sodium load — the minerals struggling kidneys can't clear well — using measured USDA values per 100 g. Bottom-left is kidney-friendly; top-right is best limited or avoided.",
    xLabel: "Potassium content  →",
    yLabel: "Phosphorus / sodium load  →",
    xMetric: "Potassium",
    yMetric: "Phos/Na",
    safeLabel: "KIDNEY-FRIENDLY",
    avoidLabel: "AVOID",
    tiers: [
      { tier: 0, label: "Kidney-friendly", blurb: "Low potassium, phosphorus and sodium." },
      { tier: 1, label: "Moderate", blurb: "Mind portion size." },
      { tier: 2, label: "High", blurb: "Notably high — limit." },
      { tier: 3, label: "Avoid", blurb: "Very high potassium, phosphorus or sodium." },
    ],
    categories: CATEGORIES,
    sourceName: "USDA FoodData Central (SR Legacy)",
    sourceUrl: "https://fdc.nal.usda.gov/",
    footer:
      "Mineral values are from USDA FoodData Central (SR Legacy, per 100 g raw/plain unless noted). Educational overview only — not medical advice. Renal-diet targets depend on your CKD stage, labs and whether you're on dialysis — always follow your nephrologist or renal dietitian. Potassium can often be lowered by leaching/boiling, portion size matters as much as the food itself, and additive (inorganic) phosphorus in processed foods is absorbed far more than these raw-food numbers suggest.",
    items: withEmoji(kidneyItems),
  },
];
