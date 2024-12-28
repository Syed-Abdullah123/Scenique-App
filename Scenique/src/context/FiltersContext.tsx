import React, { createContext, useState } from "react";

const FilterContext = createContext<any>(null);

const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    orientation: "all", // "all", "portrait", "landscape"
  });

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterProvider };
