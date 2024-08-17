import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import suspense from "astro-suspense";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react(), suspense()],
  adapter: vercel()
});