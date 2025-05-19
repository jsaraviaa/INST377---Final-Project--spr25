// Fetches nutrition data from Spoonacular
export default async function handler(req, res) {
    const { query } = req.query;
  
    if (!query) return res.status(400).json({ error: 'Missing query' });
  
    const response = await fetch(
      `https://api.spoonacular.com/recipes/parseIngredients?ingredientList=${encodeURIComponent(
        query
      )}&servings=1&apiKey=${e8feca6c890c4801b16b47f45a093fab}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  
    const data = await response.json();
  
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found' });
    }
  
    const { name, amount, unit, nutrition } = data[0];
    res.status(200).json({
      food: name,
      amount,
      unit,
      calories: nutrition.nutrients.find((n) => n.name === 'Calories')?.amount,
      protein: nutrition.nutrients.find((n) => n.name === 'Protein')?.amount,
      carbs: nutrition.nutrients.find((n) => n.name === 'Carbohydrates')?.amount,
      fat: nutrition.nutrients.find((n) => n.name === 'Fat')?.amount
    });
  }