import { css } from "react-emotion";

export const cssSelectList = css({
  width: "100%",
  ".MuiInput-root": {
    border: "1px solid rgba(0, 0, 0, 0.23) !important",
    height: "auto",
    minHeight: 49,
    borderRadius: 4,
    marginTop: "0px !important",
    paddingLeft: "10px",
  },
  ".MuiInputLabel-root": {
    top: "-8px !important",
    background: "#fff",
    zIndex: 1,
    left: 8,
    padding: "0px 4px",
  },
  ".MuiInput-underline:before": {
    borderBottom: "0px !important",
  },
  ".MuiInput-underline:after": {
    borderBottom: "0px !important",
  },
});

export const cssTextField = css({
  input: { height: 30 },
});

export const cssFileWrapper = css({
  border: "1px solid #e0e0e0",
  borderRadius: 4,
  padding: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "4px 0px",
});
