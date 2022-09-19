import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import store from '../store/store';
import { Provider } from 'react-redux';
import Loading from '../components/Loading/Loading';
import Main from '../components/Main';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <Provider store={store}>
      {loading ? (
        <Loading />
      ) : (
        <Main>
          <Component {...pageProps} />
        </Main>
      )}
    </Provider>
  );
};

export default MyApp;
