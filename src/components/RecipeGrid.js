import React from 'react';
import RecipeCard from './RecipeCard';
import LoadingSkeleton from './LoadingSkeleton';

const RecipeGrid = ({ recipes, favorites, loading, onRecipeClick, onToggleFavorite }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Showing {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            isFavorite={favorites.includes(recipe.idMeal)}
            onClick={() => onRecipeClick(recipe.idMeal)}
            onToggleFavorite={() => onToggleFavorite(recipe.idMeal)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeGrid;