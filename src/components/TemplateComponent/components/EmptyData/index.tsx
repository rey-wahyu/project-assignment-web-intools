import React, { FC } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Inbox } from "@material-ui/icons";

interface PROPS {
  length: number;
}

const EmptyComponent: FC<PROPS> = ({ length }) => (
  <TableRow>
    <TableCell colSpan={length}>
      <div style={{ textAlign: "center" }}>
        <Inbox style={{ fontSize: 48 }} />
        <div>There is no data</div>
      </div>
    </TableCell>
  </TableRow>
);

export default EmptyComponent;
