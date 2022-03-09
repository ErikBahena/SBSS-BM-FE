import { useState } from "react";
import fuzzysort from "fuzzysort";

export const useSearch = (initialSearchVal, initialData, searchKeys) => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState(initialSearchVal);

  const handleSearch = (newSearchTerm, data) => {
    setSearchTerm(newSearchTerm);
    setData(data);

    const fuzzyResults = fuzzysort.go(newSearchTerm, data, {
      keys: searchKeys,

      allowTypo: true,
    });

    let bestResult = fuzzyResults[0]?.obj;

    let searchResults = initialData.filter((obj) => obj !== bestResult);

    if (bestResult !== undefined) searchResults.unshift(bestResult);

    setData(searchResults);
  };

  return [data, handleSearch, searchTerm, setData];
};
