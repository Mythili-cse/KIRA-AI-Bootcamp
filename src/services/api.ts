import { RESTAURANTS, DISHES, CRAVING_CATEGORIES } from '../data/mockData';
import { Restaurant, Dish, RecommendationRequest, RecommendationMatch } from '../types';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || '/api';

export async function fetchRestaurants(filters?: { search?: string; cuisine?: string; featured?: boolean }) {
  try {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.cuisine) params.append('cuisine', filters.cuisine);
    if (filters?.featured) params.append('featured', 'true');

    const res = await fetch(`${API_BASE}/restaurants?${params.toString()}`);
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    return json.data as Restaurant[];
  } catch (err) {
    let list = [...RESTAURANTS];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.some(c => c.toLowerCase().includes(q)));
    }
    if (filters?.cuisine) {
      list = list.filter(r => r.cuisine.includes(filters.cuisine!));
    }
    if (filters?.featured) {
      list = list.filter(r => r.featured);
    }
    return list;
  }
}

export async function fetchRestaurantById(idOrSlug: string) {
  try {
    const res = await fetch(`${API_BASE}/restaurants/${idOrSlug}`);
    if (!res.ok) throw new Error('Not found');
    const json = await res.json();
    return json.data as Restaurant & { dishes: Dish[] };
  } catch (err) {
    const found = RESTAURANTS.find(r => r.id === idOrSlug || r.slug === idOrSlug) || RESTAURANTS[0];
    const rDishes = DISHES.filter(d => d.restaurantId === found.id);
    return { ...found, dishes: rDishes };
  }
}

export async function fetchDishes(filters?: { craving?: string; search?: string; trending?: boolean }) {
  try {
    const params = new URLSearchParams();
    if (filters?.craving) params.append('craving', filters.craving);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.trending) params.append('trending', 'true');

    const res = await fetch(`${API_BASE}/dishes?${params.toString()}`);
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    return json.data as Dish[];
  } catch (err) {
    let list = [...DISHES];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.cuisine.toLowerCase().includes(q) ||
        d.cravingTags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (filters?.craving) {
      const crv = filters.craving.toLowerCase();
      list = list.filter(d => d.cravingTags.some(t => t.toLowerCase().includes(crv)));
    }
    if (filters?.trending) {
      list = list.filter(d => d.trending);
    }
    return list;
  }
}

/**
 * Enhanced Natural Language AI Craving Engine
 * Parses natural queries, extracts budget limits (e.g. "under ₹300"), handles combined cravings (e.g. "spicy and crispy"),
 * and guarantees 0 empty results with intelligent fallback recommendations.
 */
export function processNaturalLanguageCraving(promptQuery: string): RecommendationMatch[] {
  const query = promptQuery.toLowerCase().trim();
  if (!query) {
    return DISHES.slice(0, 5).map(dish => ({
      dish,
      matchScore: 95,
      matchReason: 'Curated top recommendation for your palate',
    }));
  }

  // 1. Extract Price Constraint (e.g. "under ₹300", "under 300", "below 300", "under 400")
  let maxPriceConstraint: number | null = null;
  const priceMatch = query.match(/(?:under|below|less than|max)\s*(?:₹|rs\.?|inr)?\s*(\d+)/i) || query.match(/(?:₹|rs\.?)\s*(\d+)/i);
  if (priceMatch && priceMatch[1]) {
    const parsedPrice = parseInt(priceMatch[1], 10);
    if (!isNaN(parsedPrice) && parsedPrice > 50) {
      maxPriceConstraint = parsedPrice;
    }
  }

  const tokens = query.split(/[\s,+.&]+/);

  // 2. Multi-Craving Category Mappings
  const categoryKeywords: Record<string, string[]> = {
    'Spicy': ['spicy', 'hot', 'fiery', 'chili', 'chilli', 'pepper', 'schezwan', 'angara', 'tikka', 'peri', 'masala'],
    'Cheesy': ['cheesy', 'cheese', 'melted', 'gooey', 'burrata', 'mozzarella', 'fontina', 'parmesan', 'queso', 'pizza'],
    'Crispy': ['crispy', 'crunchy', 'fried', 'wings', 'tempura', 'breaded', 'crust'],
    'Sweet': ['sweet', 'dessert', 'cake', 'macaron', 'chocolate', 'tart', 'pastry', 'sugar', 'bakery'],
    'Healthy': ['healthy', 'clean', 'vegan', 'salad', 'green', 'avocado', 'grain', 'light', 'protein'],
    'Comfort': ['comfort', 'warm', 'soup', 'stew', 'dal', 'butter chicken', 'biryani', 'homestyle'],
    'Late Night': ['late night', 'midnight', 'ramen', 'sliders', 'night', 'afterhours'],
    'Date Night': ['date night', 'date', 'romantic', 'couple', 'fine dining', 'truffle', 'wine'],
    'Biryani': ['biryani', 'rice', 'mutton biryani', 'chicken biryani'],
    'Pizza': ['pizza', 'margherita', 'woodfired', 'crust'],
    'Chicken': ['chicken', 'wings', 'tikka', 'schezwan chicken']
  };

  // Determine which categories are present in the query
  const activePromptCategories: string[] = [];
  Object.entries(categoryKeywords).forEach(([catName, keywords]) => {
    if (keywords.some(kw => query.includes(kw))) {
      activePromptCategories.push(catName);
    }
  });

  const matchedDishes = DISHES.map(dish => {
    let score = 70; // baseline compatibility score
    const matchedReasons: string[] = [];
    let isPriceMatch = true;

    // Price Filtering & Scoring
    if (maxPriceConstraint !== null) {
      if (dish.price <= maxPriceConstraint) {
        score += 25;
        matchedReasons.push(`Under ₹${maxPriceConstraint}`);
      } else {
        score -= 40; // penalize over-budget items
        isPriceMatch = false;
      }
    }

    // Category & Tag Scoring
    let matchedCategoryCount = 0;
    activePromptCategories.forEach(catName => {
      const keywords = categoryKeywords[catName];
      const hasCategoryInDish = dish.cravingTags.some(tag => tag.toLowerCase().includes(catName.toLowerCase()) || keywords.some(kw => tag.toLowerCase().includes(kw))) ||
        keywords.some(kw => dish.name.toLowerCase().includes(kw) || dish.cuisine.toLowerCase().includes(kw));

      if (hasCategoryInDish) {
        matchedCategoryCount++;
        score += 15;
        matchedReasons.push(catName);
      }
    });

    // Multi-Craving Combination Bonus (e.g. "Spicy + Crispy")
    if (activePromptCategories.length > 1 && matchedCategoryCount >= 2) {
      score += 20;
    }

    // Direct String Match
    if (dish.name.toLowerCase().includes(query)) score += 25;
    if (dish.cuisine.toLowerCase().includes(query)) {
      score += 15;
      matchedReasons.push(dish.cuisine);
    }

    // Token Keyword Checks
    tokens.forEach(token => {
      if (token.length > 2) {
        if (dish.name.toLowerCase().includes(token)) score += 8;
        if (dish.cravingTags.some(t => t.toLowerCase().includes(token))) score += 8;
      }
    });

    // Normalize match score between 82% and 98%
    score = Math.min(Math.max(score, 82), 98);

    const uniqueReasons = Array.from(new Set(matchedReasons));
    let reasonText = uniqueReasons.length > 0
      ? `${uniqueReasons.slice(0, 3).join(' + ')} match · Highly rated`
      : `Tailored match based on flavor profiles of ${dish.cuisine}`;

    return {
      dish,
      matchScore: score,
      matchReason: reasonText,
      isPriceMatch,
    };
  });

  // If a max price constraint exists, prioritize dishes that fit budget
  if (maxPriceConstraint !== null) {
    const budgetDishes = matchedDishes.filter(m => m.dish.price <= maxPriceConstraint!);
    if (budgetDishes.length > 0) {
      budgetDishes.sort((a, b) => b.matchScore - a.matchScore);
      return budgetDishes.slice(0, 5);
    }
  }

  // General Sort descending by match score
  matchedDishes.sort((a, b) => b.matchScore - a.matchScore);

  // Guarantee top 5 recommendations ALWAYS returned (Never empty!)
  return matchedDishes.slice(0, 5);
}

export async function fetchSmartRecommendations(req: RecommendationRequest): Promise<RecommendationMatch[]> {
  if (req.promptQuery) {
    return processNaturalLanguageCraving(req.promptQuery);
  }

  try {
    const res = await fetch(`${API_BASE}/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw new Error('Recommendation error');
    const json = await res.json();
    return json.data as RecommendationMatch[];
  } catch (err) {
    const promptCombined = `${req.mood} ${req.cuisine} ${req.diet} ${req.budget}`;
    return processNaturalLanguageCraving(promptCombined);
  }
}
