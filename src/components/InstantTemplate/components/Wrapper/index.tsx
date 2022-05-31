import React, { FC, useContext } from "react";
import { cx } from "react-emotion";
import { Paper } from "@material-ui/core";

import { InstantTemplateContext } from "../../context";
import Filter from "../Filter";
import * as classes from "./styles";
import { WrapperProps } from "@components/TemplateComponent/constants/interface";

const TemplateWrapper: FC<WrapperProps> = ({ children }) => {
  const { value: templateVal } = useContext(InstantTemplateContext);

  return (
    <div className={classes.cssWidgetWrapper}>
      <Paper
        className={classes.cssPaper}
        classes={{
          root: classes.cssWidgetRoot,
        }}
      >
        <Filter />
        <div className={cx(classes.cssWidgetBody, templateVal.bodyClass)}>
          {children}
        </div>
      </Paper>
    </div>
  );
};

export default TemplateWrapper;
