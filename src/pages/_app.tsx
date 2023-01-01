import Head from 'next/head';
import React from 'react';

import { withTRPC } from '@trpc/next';
import { ToastContainer, toast } from 'react-toastify';
import { AppType } from 'next/dist/shared/lib/utils';
import type { AppRouter } from '@/server/routers';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';

const App: AppType = ({ Component, pageProps }) => {
  const seo = {
    title: 'PokeTinder',
    description: 'Do you like tme all?'
  };
  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name='description' content={seo.description} />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      url,
      queryClientConfig: {
        defaultOptions: {
          queries: { retry: false, onError: ({ error }) => toast.error(error.message) }
        }
      }
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true
})(App);
