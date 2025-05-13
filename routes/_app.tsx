import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Macube-deploy</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/css/main.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
