import React, { FC, createContext, useState } from "react";

export const InstantTemplateContext = createContext(null);

const NOOP = () => {
  return;
};

const INITIAL_VALUE = {
  filter: {
    show: false,
    handleChange: NOOP,
    clearFilter: NOOP,
    handleSearchData: NOOP,
    customFilter: null,
  },
  addButton: { show: false, handleClick: NOOP },
  bodyClass: "",
  dateRangeFilter: { show: false },
  addExtraButton: { show: false, url: "", body: {} },
  addBulkButton: { show: false, url: "", body: {} },
  customAddButton: { show: false, url: "", body: {} },
  additionalButton: null,
};

const InstantTemplateProvider: FC = ({ children }) => {
  const [value, setValue] = useState(INITIAL_VALUE);

  return (
    <InstantTemplateContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      {children}
    </InstantTemplateContext.Provider>
  );
};

export default InstantTemplateProvider;
