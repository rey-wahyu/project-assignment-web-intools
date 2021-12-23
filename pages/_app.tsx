import React from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";

import "@styles/global.css";
import "@styles/vars.css";
import store from "@redux/store";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
