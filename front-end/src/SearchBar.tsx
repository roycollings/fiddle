import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import Results from './Results';
import { request } from './api/request';

// TODO: Error handling

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([] as object[]);
  const [isSearching, setIsSearching] = useState(Boolean);
  const [hasSearched, setHasSearched] = useState(Boolean);

  const performSearch = async () => {
    if (searchTerm === '') {
      return;
    }

    setHasSearched(true);
    setIsSearching(true);

    const response = await request({
      endpoint: 'search',
      params: `term=${searchTerm}`
    });
    const responseJson = await response.json();
    const { data } = responseJson;

    setResults(data);
    setIsSearching(false);
  };

  const showResultsSection = () => {
    if (!hasSearched) {
      return '';
    }

    return isSearching ? 'Searching ...' : <Results data={results} />;
  };

  useEffect(() => setHasSearched(false), []);

  return (
    <div>
      <div className="SearchBar">
        <input
          type="text"
          className="searchTerm"
          aria-label="Search term"
          placeholder="Enter search term"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          disabled={searchTerm === ''}
          className="searchBtn"
          type="submit"
          aria-label="Perform search"
          onClick={performSearch}
        >
          Search
        </button>
      </div>
      <div data-testid="results">{showResultsSection()}</div>
    </div>
  );
};

export default SearchBar;
