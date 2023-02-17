import { Html, Head, Main, NextScript } from 'next/document';

// TODO: fix this

export default function Document() {
  return (
    <Html>
      <Head>
        <link href="//vjs.zencdn.net/7.10.2/video-js.min.css" rel="stylesheet" />
        <script src="//vjs.zencdn.net/7.10.2/video.min.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
