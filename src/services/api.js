const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export const searchRecipes = async (query) => {
  const response = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.meals || [];
};

export const getCategories = async () => {
  const response = await fetch(`${API_BASE}/categories.php`);
  const data = await response.json();
  return data.categories || [];
};

export const getRecipeDetails = async (id) => {
  const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
  const data = await response.json();
  return data.meals ? data.meals[0] : null;
};

export const getRandomRecipes = async (count = 12) => {
  const promises = [];

  for (let i = 0; i < count; i++) {
    promises.push(
      fetch(`${API_BASE}/random.php`)
        .then(res => res.json())
        .then(data => data.meals[0])
    );
  }

  const results = await Promise.all(promises);
  return results.filter(Boolean);
};

export const filterByCategory = async (category) => {
  const response = await fetch(`${API_BASE}/filter.php?c=${encodeURIComponent(category)}`);
  const data = await response.json();
  return data.meals || [];
};

export const filterByIngredient = async (ingredient) => {
  const response = await fetch(`${API_BASE}/filter.php?i=${encodeURIComponent(ingredient)}`);
  const data = await response.json();
  return data.meals || [];
};