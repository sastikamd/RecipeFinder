import React from 'react';
import HeartIcon from './HeartIcon';

const RecipeCard = ({ recipe, isFavorite, onClick, onToggleFavorite }) => {
  return (
    <div className="recipe-card cursor-pointer" onClick={onClick}>
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-400 hover:text-red-500'
          }`}
        >
          <HeartIcon filled={isFavorite} size={20} />
        </button>
        {recipe.strCategory && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs font-medium">
              {recipe.strCategory}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
          {recipe.strMeal}
        </h3>
        {recipe.strArea && (
          <p className="text-sm text-gray-600">{recipe.strArea} Cuisine</p>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;