import { useState, useEffect } from "react";
import fuzzysort from "fuzzysort";

export const useSearch = (initialSearchVal, initialData, searchKeys) => {
  const [data, setData] = useState(initialData || []);
  const [searchTerm, setSearchTerm] = useState(initialSearchVal);

  useEffect(() => initialData && setData(initialData), [initialData]);

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);

    const fuzzyResults = fuzzysort.go(newSearchTerm, data, {
      keys: searchKeys,
      allowTypo: true,
      limit: 100, // don't return more results than you need!
      threshold: -10000, // don't return bad results
    });

    let bestResult = fuzzyResults[0]?.obj;

    let searchResults = initialData.filter((obj) => obj !== bestResult);

    if (bestResult !== undefined) searchResults.unshift(bestResult);

    setData(searchResults);
  };

  return [data, handleSearch, searchTerm, setData];
};
