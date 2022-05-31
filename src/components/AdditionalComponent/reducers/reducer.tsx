export const initialState = {
  text_id: "",
  text_en: "",
  link: "",
  icon: "ArrowForward",
  button_link_text_id: "",
  button_link_text_en: "",
  text_color: "#ffffff",
  link_color: "#fcd045",
  bg_color: "#f55f14",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "TEXT_ID":
      return { ...state, text_id: action.data };
    case "TEXT_EN":
      return { ...state, text_en: action.data };
    case "LINK":
      return { ...state, link: action.data };
    case "ICON":
      return { ...state, icon: action.data };
    case "TEXT_COLOR":
      return { ...state, text_color: action.data };
    case "LINK_COLOR":
      return { ...state, link_color: action.data };
    case "BUTTON_TEXT_ID":
      return { ...state, button_link_text_id: action.data };
    case "BUTTON_TEXT_EN":
      return { ...state, button_link_text_en: action.data };
    case "BG_COLOR":
      return { ...state, bg_color: action.data };
    case "SET_DATA":
      return { ...state, ...action.data };
  }
};

export const initialBulkState = {
  files: [],
};

export const bulkReducer = (state, action) => {
  if (action.type === "FILES") return { ...state, files: action.data };
};

export const initialAppointmentState = {
  loading: false,
  active: false,
  customer_subscription: null,
  customers: [],
  hospitals: [],
  hospital: null,
  detail: null,
  partner_provider_id: "",
  type: "",
  guardian_name: "",
  guardian_phone: "",
  doctor_name: "",
  doctor_specialty: "",
  polyclinic: "",
  time: "",
  start_date: "",
  user_id: "",
  date: "",
  partner_provider: "",
  location_hospital: null,
  search_customer: "",
  search_hospital: "",
  files: [],
};
