import Head from 'next/head';
import { SWRConfig } from 'swr';
import { Layout } from '../components/layout/layout';
import { NotficationContextProvider } from '../store/notification-context';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
     <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then(res => res.json())
      }}
    >
      <Head>
        <title>Events App</title>
        <meta name="description" content="Events application implemented with NexJS" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NotficationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotficationContextProvider>
    </SWRConfig>
  );
}

export default MyApp
