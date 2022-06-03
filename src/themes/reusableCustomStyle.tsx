import { css } from "react-emotion";
export const cssInputField = css({
    padding: 8,
    border: "1px solid lightgray",
    borderRadius: 8,
    background: "#d3d3d340",
});
export const cssFooter = css({
    borderTop: "1px solid lightgray",
    marginTop: "24px !important",
    textAlign: "right",
});
export const cssModalWrapper = css({
    position: "absolute",
    width: "70%",
    backgroundColor: "#fff",
    boxShadow:
        "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)",
    padding: 16,
    borderRadius: 8,
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    maxHeight: 500,
    overflowX: "scroll",
});