import React, { useEffect, useState } from "react";

import mock from '../../../mocks/categoriesMocks.json';

const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const filteredResults = new Map();

    Object.entries(mock.data).forEach(([, value]) => {
      const queryString = debouncedQuery.trim().toLowerCase()

      const categoryKey = `category-${value.id}`;

      if (
        value.name.toLowerCase().includes(queryString.toLowerCase()) ||
        value.description.toLowerCase().includes(queryString.toLowerCase())
      )
        filteredResults.set(categoryKey, { ...value, type: "category" });

      value.items.forEach(item => {
        const itemKey = `item-${item.id}`;

        if (
          item.name.toLowerCase().includes(queryString.toLowerCase()) ||
          item.description.toLowerCase().includes(queryString.toLowerCase())
        )
          filteredResults.set(itemKey, { ...item, type: "item" });
      });
    });

    console.log([...filteredResults.values()]);

    if (filteredResults.size > 0)
      setResults([...filteredResults.values()]);

    else
      setResults([])
  }, [debouncedQuery]);

  return (
    <ul className="search-results">
      {
        results.length === 0
          ? <p>Nenhum resultado encontrado.</p>
          : results.map(result => {
            return result.type === "category"
              ? // Category result
              <li key={result.type + '-' + result.id}>
                <span>Categoria:</span>
                {result.name}
              </li>
              : // Item result
              <li key={result.type + '-' + result.id}>
                {result.name}
              </li>
          })
      }
    </ul>
  );
};

export default SearchResults;
