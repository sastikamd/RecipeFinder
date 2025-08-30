import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import RecipeGrid from './components/RecipeGrid';
import RecipeModal from './components/RecipeModal';
import { searchRecipes, getCategories, getRandomRecipes, getRecipeDetails } from './services/api';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  
  const [favorites, setFavorites] = useState([]);
  
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadInitialRecipes();
    loadCategories();
  }, []);

  const loadInitialRecipes = async () => {
    setLoading(true);
    try {
      const data = await getRandomRecipes(12);
      setRecipes(data);
    } catch (err) {
      setError('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories');
    }
  };

  const handleSearch = useCallback(async (term) => {
    if (!term.trim()) {
      loadInitialRecipes();
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await searchRecipes(term);
      setRecipes(data);
      if (data.length === 0) {
        setError('No recipes found');
      }
    } catch (err) {
      setError('Failed to search recipes');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilter = useCallback(async (category, ingredient) => {
    setLoading(true);
    setError('');
    try {
      let data = [];
      if (category) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const result = await response.json();
        data = result.meals || [];
      } else if (ingredient) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const result = await response.json();
        data = result.meals || [];
      } else {
        loadInitialRecipes();
        return;
      }

      setRecipes(data);
      if (data.length === 0) {
        setError('No recipes found for the selected filter');
      }
    } catch (err) {
      setError('Failed to filter recipes');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleFavorite = useCallback((recipeId) => {
    setFavorites(currentFavorites => {
      const isAlreadyFavorite = currentFavorites.includes(recipeId);
      if (isAlreadyFavorite) {
        return currentFavorites.filter(id => id !== recipeId);
      } else {
        return [...currentFavorites, recipeId];
      }
    });
  }, []);

  const openRecipeModal = async (recipeId) => {
    try {
      const recipe = await getRecipeDetails(recipeId);
      setSelectedRecipe(recipe);
    } catch (err) {
      setError('Failed to load recipe details');
    }
  };

  const filteredRecipes = showFavorites 
    ? recipes.filter(recipe => favorites.includes(recipe.idMeal))
    : recipes;

  return (
    <div className="min-h-screen bg-gray-50" style={{ backgroundColor: "antiquewhite" }}>
      <header className="bg-white shadow-sm border-b" style={{ backgroundColor: "burlywood"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Sastika's Recipes Finder</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                style={{
                  backgroundColor: "antiquewhite",
                  color: "black",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  transition: "all 0.3s ease",
                }}
              >
                {showFavorites ? "Show All" : `Favorites (${favorites.length})`}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ backgroundColor: "antiquewhite" }}>
        <div className="space-y-6">
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={handleSearch}
          />

          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            selectedIngredient={selectedIngredient}
            setSelectedCategory={setSelectedCategory}
            setSelectedIngredient={setSelectedIngredient}
            onFilter={handleFilter}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <RecipeGrid
            recipes={filteredRecipes}
            favorites={favorites}
            loading={loading}
            onRecipeClick={openRecipeModal}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </main>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          isFavorite={favorites.includes(selectedRecipe.idMeal)}
          onClose={() => setSelectedRecipe(null)}
          onToggleFavorite={() => toggleFavorite(selectedRecipe.idMeal)}
        />
      )}
    </div>
  );
}

export default App;
