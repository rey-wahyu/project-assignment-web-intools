import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core";
// import themes from "@themes";

import "@styles/global.css";
import "@styles/vars.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Component {...pageProps} />
        // <ThemeProvider theme={themes.default}>
        //     <Component {...pageProps} />
        // </ThemeProvider>
    );
}

export default MyApp;
