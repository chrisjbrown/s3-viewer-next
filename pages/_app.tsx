import type { AppProps } from 'next/app';
import '@/pages/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
