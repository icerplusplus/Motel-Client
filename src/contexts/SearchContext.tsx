import React from "react";

export interface SearchContextProps {}

export const SearchContext = React.createContext<SearchContextProps>({});

export interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const dynamicValue = React.useMemo(() => ({}), []);

  return (
    <SearchContext.Provider value={{ ...dynamicValue }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => React.useContext(SearchContext);
