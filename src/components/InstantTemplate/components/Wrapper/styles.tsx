import { css } from "react-emotion";

export const cssWidgetWrapper = css({
  display: "flex",
});

export const cssPaper = css({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "auto",
});

export const cssWidgetRoot = css({
  boxShadow:
    "0px 3px 11px 0px #e8eafc, 0 3px 3px -2px #b2b2b21a, 0 1px 8px 0 #9a9a9a1a !important",
});

export const cssMoreButton = css({
  margin: -8,
  padding: 0,
  width: 40,
  height: 40,
  color: "#B9B9B9 !important",
  "&:hover": {
    backgroundColor: "#536DFE",
    color: "rgba(255, 255, 255, 0.35) !important",
  },
});

export const cssWidgetBody = css({
  paddingBottom: 24,
  paddingRight: 24,
  paddingLeft: 24,
});
