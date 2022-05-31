export const initialState = {
  start_date: null,
  end_date: null,
  filterValue: { search: "" },
  showFilter: false,
};

export const filterReducer = (state, { type, value }) => {
  switch (type) {
    case "SET_FILTER_VALUE": {
      const { filterValue } = value;
      return {
        ...state,
        filterValue: { ...state.filterValue, ...filterValue },
      };
    }

    case "SET_START_DATE": {
      const { start_date } = value;
      return {
        ...state,
        start_date,
      };
    }

    case "SET_END_DATE": {
      const { end_date } = value;
      return {
        ...state,
        end_date,
      };
    }

    case "CLEAR_FILTER": {
      return {
        ...state,
        start_date: null,
        end_date: null,
        filterValue: { search: "" },
      };
    }

    case "SET_SHOW_FILTER": {
      const { showFilter } = value;
      return {
        ...state,
        showFilter,
      };
    }

    default: {
      return state;
    }
  }
};
