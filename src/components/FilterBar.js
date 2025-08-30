import React from 'react';

const FilterBar = ({
  categories,
  selectedCategory,
  selectedIngredient,
  setSelectedCategory,
  setSelectedIngredient,
  onFilter
}) => {
  const popularIngredients = [
    'chicken', 'beef', 'pork', 'fish', 'rice', 'pasta', 
    'tomato', 'onion', 'garlic', 'cheese'
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedIngredient('');
    onFilter(category, '');
  };

  const handleIngredientChange = (ingredient) => {
    setSelectedIngredient(ingredient);
    setSelectedCategory('');
    onFilter('', ingredient);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedIngredient('');
    onFilter('', '');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="flex-1">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="filter-select w-full"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.idCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="ingredient" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Ingredient
        </label>
        <select
          id="ingredient"
          value={selectedIngredient}
          onChange={(e) => handleIngredientChange(e.target.value)}
          className="filter-select w-full"
        >
          <option value="">All Ingredients</option>
          {popularIngredients.map((ingredient) => (
            <option key={ingredient} value={ingredient}>
              {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {(selectedCategory || selectedIngredient) && (
        <div className="flex-shrink-0">
          <button
            onClick={clearFilters}
            className="btn-secondary mt-6"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;