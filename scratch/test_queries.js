import { processNaturalLanguageCraving } from '../src/services/api.ts';

const queriesToTest = [
  // 12 Core Queries
  'spicy',
  'cheesy',
  'crispy',
  'sweet',
  'healthy',
  'comfort food',
  'late night',
  'date night',
  'biryani',
  'pizza',
  'chicken',
  'food under ₹300',

  // 8 Combined Natural Language Queries
  'something spicy and crispy',
  'something cheesy for movie night',
  'healthy food under ₹300',
  'spicy chicken',
  'sweet dessert',
  'late night comfort food',
  'food for date night',
  'crispy food under ₹300'
];

console.log("=== CRAVIO 20-QUERY AI VALIDATION TEST ===");

let passed = true;

queriesToTest.forEach((query, idx) => {
  const results = processNaturalLanguageCraving(query);
  const count = results.length;
  if (count === 0) {
    console.error(`❌ FAILED query #${idx+1} "${query}": returned 0 results`);
    passed = false;
  } else {
    const topMatch = results[0];
    
    // Check price constraints
    if (query.includes('under ₹300') && topMatch.dish.price > 300) {
      console.error(`❌ FAILED price constraint for "${query}": top match ${topMatch.dish.name} costs ₹${topMatch.dish.price} > 300`);
      passed = false;
    } else {
      console.log(`✅ PASSED #${idx+1} "${query}": ${count} results found. Top match: "${topMatch.dish.name}" (₹${topMatch.dish.price} • ${topMatch.matchScore}% Match - ${topMatch.matchReason})`);
    }
  }
});

if (passed) {
  console.log("\n🎉 ALL 20 AI QUERIES PASSED WITH 100% SUCCESS & ZERO BLANK SCREENS!");
} else {
  console.error("\n❌ SOME QUERIES FAILED!");
}
