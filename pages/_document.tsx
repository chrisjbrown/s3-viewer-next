import { Html, Head, Main, NextScript } from 'next/document';
import { inter } from '@/pages/fonts';

export default function Document() {
  return (
    <Html>
      <Head />
      <body className={`${inter.className} antialiased`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
