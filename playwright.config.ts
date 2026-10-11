import { defineConfig } from '@playwright/test';
const port = process.env.MODIVO_PREVIEW_PORT || '4173';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  outputDir: 'artifacts/playwright',
  reporter: 'list',
  use: { baseURL: `http://127.0.0.1:${port}${basePath}/`, channel: 'chrome', headless: true },
  webServer: {
    command: 'npm run preview',
    url: `http://127.0.0.1:${port}${basePath}/`,
    reuseExistingServer: false,
  },
});
