import React, { useState, useEffect } from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearchTerm !== searchTerm) {
        setSearchTerm(localSearchTerm);
        onSearch(localSearchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchTerm, searchTerm, setSearchTerm, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            placeholder="Search for recipes..."
            className="search-input pl-10 pr-12"
          />
          {localSearchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;