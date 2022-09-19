import Document, { Head, Main, NextScript, Html } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='pt'>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/icon.png' />
          <meta name='theme-color' content='#fff' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument
