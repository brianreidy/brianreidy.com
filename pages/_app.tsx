import { AppProps } from 'next/app';
import '@styles/globals.css';
import '@styles/prism.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Application({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default Application;
