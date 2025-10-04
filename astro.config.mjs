// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Crucial for deployment to a GitHub Project Page (e.g., user.github.io/repo-name)
  // The repository name is 'astro-nexus-dev'
  base: '/astro-nexus-dev',
});
