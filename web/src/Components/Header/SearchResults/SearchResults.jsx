import React, { useCallback, useEffect, useState } from "react";

import './SearchResults.scss'
import { useAvailableProductsData } from "../../../hooks/useProducts";
import { useCreateReport } from "../../../hooks/useReports";

const SearchResults = ({ query }) => {
  const { data, isLoading } = useAvailableProductsData();
  const { mutate } = useCreateReport();

  const [results, setResults] = useState(data);

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);

    return () => clearTimeout(handler);
  }, [query]);

  const loadResults = useCallback(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    if (!data)
      return;

    const filteredResults = new Map();

    Object.entries(data).forEach(([, value]) => {
      const queryString = debouncedQuery.trim().toLowerCase()

      const itemKey = `item-${value.id}`;

      if (
        value.name.toLowerCase().includes(queryString.toLowerCase()) ||
        value.description?.toLowerCase().includes(queryString.toLowerCase())
      )
        filteredResults.set(itemKey, { ...value, type: "item" });

      value.categories.forEach(category => {
        const categoryKey = `category-${category.id}`;

        if (
          category.name.toLowerCase().includes(queryString.toLowerCase()) ||
          category.description?.toLowerCase().includes(queryString.toLowerCase())
        )
          filteredResults.set(categoryKey, { ...category, type: "category" });
      });
    });

    if (filteredResults.size > 0)
      setResults([...filteredResults.values()]);

    else
      setResults([])
  }, [data, debouncedQuery]);

  useEffect(() => {
    loadResults()
  }, [data, debouncedQuery]);

  const handleReport = useCallback((entityType, entityId) => mutate({
    type: 'search',
    entityType,
    entityId,
    count: 1
  }), []);

  if (isLoading)
    return <div>Buscando...</div>

  if (!results)
    return <div>Nenhum resultado encontrado.</div>

  return (
    <div className="search-wrapper">
      <ul className="search-results">
        {results.length === 0 ? (
          <p className="no-results">Nenhum resultado encontrado.</p>
        ) : (
          results.map(result => {
            return result.type === "category" ? (
              <li
                key={result.type + '-' + result.id}
                onClick={() => handleReport(result.type, result.id)}
              >
                <span>Categoria: </span>
                {result.name}
              </li>
            ) : (
              <li
                key={result.type + '-' + result.id}
                onClick={() => handleReport(result.type, result.id)}
              >
                {result.name}
              </li>
            );
          })
        )}
      </ul>
    </div >
  );
};

export default SearchResults;
