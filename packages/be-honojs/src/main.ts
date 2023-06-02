import { sharedLibs } from '@shared/libs';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.json({ message: sharedLibs() }));

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(
      `Listening on http://localhost:${info.port} ENV:${process.env.ENV}`
    );
  }
);
