import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        placeholder="Buscar por ID o descripción..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;