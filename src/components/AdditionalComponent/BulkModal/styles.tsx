import { css } from "react-emotion";

export const modalWrapper = css({
  position: "absolute",
  width: 280,
  maxHeight: 520,
  backgroundColor: "#fff",
  boxShadow:
    "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)",
  padding: 16,
  borderRadius: 8,
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
  overflow: "auto",
});

export const gridWrapper = css({
  borderBottom: "1px solid lightgray",
  marginBottom: 16,
  fontSize: 24,
});

export const titleStyle = css({
  fontSize: 20,
});

export const createBulkInput = css({
  marginBottom: 15,
  marginTop: 5,
});

export const inputStyle = css({
  width: "100%",
});

export const cssTextField = css({
  input: { height: 30 },
});
