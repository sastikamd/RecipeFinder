import React, { useEffect } from 'react';
import HeartIcon from './HeartIcon';
import { parseIngredients, getYouTubeVideoId } from '../utils/helpers';

const RecipeModal = ({ recipe, isFavorite, onClose, onToggleFavorite }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const ingredients = parseIngredients(recipe);
  const videoId = getYouTubeVideoId(recipe.strYoutube);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center" style={{ backgroundColor: "burlywood" }}>
          <h2 className="text-2xl font-bold text-gray-900 pr-8">{recipe.strMeal}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleFavorite}
              className={`p-2 rounded-full transition-all ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 text-gray-400 hover:text-red-500'
              }`}
            >
              <HeartIcon filled={isFavorite} size={24} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6" style={{ backgroundColor: "antiquewhite" }}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              <div className="space-y-2">
                {recipe.strCategory && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                      {recipe.strCategory}
                    </span>
                  </div>
                )}

                {recipe.strArea && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Cuisine:</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                      {recipe.strArea}
                    </span>
                  </div>
                )}

                {recipe.strTags && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                      {recipe.strTags.split(',').map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700">{ingredient.name}</span>
                    <span className="text-gray-500 text-sm font-medium">
                      {ingredient.measure}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Instructions</h3>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {recipe.strInstructions}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {videoId && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Video Tutorial</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Recipe Video"
                    className="w-full h-64 rounded-lg"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {recipe.strSource && (
              <div>
                <a
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-primary"
                >
                  View Original Recipe
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;