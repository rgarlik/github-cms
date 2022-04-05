/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import App from "next/app";
import React from 'react';
import type { AppProps } from 'next/app';
import '../global.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
