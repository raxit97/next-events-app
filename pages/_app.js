import { SWRConfig } from 'swr';
import { Layout } from '../components/layout/layout';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
     <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then(res => res.json())
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp
