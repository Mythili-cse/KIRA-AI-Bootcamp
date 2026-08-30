import express from 'express';
import cors from 'cors';
import { RESTAURANTS, DISHES } from './seedData.js';

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// Allow configured production origin or open fallback for deployment
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'CRAVIO REST API Engine',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString()
  });
});

// Restaurants API
app.get('/api/restaurants', (req, res) => {
  let results = [...RESTAURANTS];
  const { search, cuisine, featured } = req.query;

  if (search) {
    const q = search.toString().toLowerCase();
    results = results.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.some(c => c.toLowerCase().includes(q)));
  }

  if (cuisine) {
    results = results.filter(r => r.cuisine.includes(cuisine.toString()));
  }

  if (featured === 'true') {
    results = results.filter(r => r.featured);
  }

  res.json({ success: true, count: results.length, data: results });
});

app.get('/api/restaurants/:id', (req, res) => {
  const restaurant = RESTAURANTS.find(r => r.id === req.params.id || r.slug === req.params.id);
  if (!restaurant) {
    return res.status(404).json({ success: false, message: 'Restaurant not found' });
  }
  const restaurantDishes = DISHES.filter(d => d.restaurantId === restaurant.id);
  res.json({ success: true, data: { ...restaurant, dishes: restaurantDishes } });
});

// Dishes API
app.get('/api/dishes', (req, res) => {
  let results = [...DISHES];
  const { craving, search, diet, trending } = req.query;

  if (search) {
    const q = search.toString().toLowerCase();
    results = results.filter(d => d.name.toLowerCase().includes(q) || d.cuisine.toLowerCase().includes(q));
  }

  if (craving) {
    const crv = craving.toString().toLowerCase();
    results = results.filter(d => d.cravingTags.some(t => t.toLowerCase() === crv));
  }

  if (diet === 'vegetarian') {
    results = results.filter(d => d.isVegetarian);
  } else if (diet === 'vegan') {
    results = results.filter(d => d.isVegan);
  }

  if (trending === 'true') {
    results = results.filter(d => d.trending);
  }

  res.json({ success: true, count: results.length, data: results });
});

// AI Recommendation Endpoint
app.post('/api/recommendations', (req, res) => {
  const { mood, cuisine, diet } = req.body || {};

  let scoredDishes = DISHES.map(dish => {
    let score = 75;

    if (mood) {
      const m = mood.toLowerCase();
      if (m === 'spicy' && dish.spiceLevel >= 2) score += 15;
      if (m === 'comforting' && dish.cravingTags.includes('Comfort Food')) score += 15;
      if (m === 'light' && (dish.isVegan || dish.cravingTags.includes('Healthy'))) score += 15;
      if (m === 'indulgent' && dish.cravingTags.includes('Cheesy')) score += 15;
    }

    if (cuisine && cuisine !== 'All' && dish.cuisine.toLowerCase().includes(cuisine.toLowerCase())) {
      score += 10;
    }

    if (diet === 'Vegetarian' && dish.isVegetarian) score += 5;
    if (diet === 'Vegan' && dish.isVegan) score += 5;

    score = Math.min(score, 98);

    let reason = `Selected because it matches your preference for ${dish.cravingTags.join(' + ')} and ${dish.cuisine}.`;

    return {
      dish,
      matchScore: score,
      matchReason: reason
    };
  });

  scoredDishes.sort((a, b) => b.matchScore - a.matchScore);
  const topMatches = scoredDishes.slice(0, 5);

  res.json({
    success: true,
    data: topMatches
  });
});

app.listen(PORT, HOST, () => {
  console.log(`CRAVIO REST API engine running on http://${HOST}:${PORT}`);
});
