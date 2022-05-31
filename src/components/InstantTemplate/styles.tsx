import { css } from "react-emotion";

export const cssTableWidget = css({
  overflowX: "auto",
});

export const cssSetColumnTableWidth = (isFixed: boolean): string =>
  css({
    background: "ghostwhite",
    ...(isFixed && {
      tableLayout: "fixed",
    }),
  });

export const cssTableHead = css({
  borderBottom: "4px double black",
  textAlign: "center",
});
