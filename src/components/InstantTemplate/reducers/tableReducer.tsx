export const initialStateParams = {
  list: [],
  params: {
    rowsPerPage: 10,
    page: 1,
    search: "",
  },
  rowsPerPageOptions: [3, 5, 10, 25],
  openModal: false,
  formValue: {},
  modalType: "",
  meta: { page: "1", per_page: "3", total_data: 0, total_page: 0 },
};

export const reducerParams = (state, { type, value }) => {
  switch (type) {
    case "SET_LIST": {
      const { list, params, meta } = value;
      return {
        ...state,
        list,
        params,
        meta,
      };
    }

    case "SET_OPEN_MODAL": {
      const { show, form, modalType } = value;
      return {
        ...state,
        openModal: show,
        formValue: form,
        modalType,
      };
    }

    case "SET_FORM_VALUE": {
      return {
        ...state,
        formValue: value,
      };
    }

    default: {
      return state;
    }
  }
};
