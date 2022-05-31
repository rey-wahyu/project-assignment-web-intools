import React, { FC } from "react";
import { Typography } from "@material-ui/core";

import { PROPS } from "./constants/interface";
import * as classes from "./styles";

const PageTitle: FC<PROPS> = ({ title }) => (
  <div className={classes.cssPageTitleContainer}>
    <Typography className={classes.cssTypo} variant="h1">
      {title}
    </Typography>
  </div>
);

export default PageTitle;
