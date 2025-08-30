export const FAVORITES_KEY = 'recipeFavorites';

export const getFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};


export const addToFavorites = (recipeId) => {
  const favorites = getFavorites();
  if (!favorites.includes(recipeId)) {
    favorites.push(recipeId);
    saveFavorites(favorites);
  }
  return favorites;
};

export const removeFromFavorites = (recipeId) => {
  const favorites = getFavorites();
  const filtered = favorites.filter(id => id !== recipeId);
  saveFavorites(filtered);
  return filtered;
};