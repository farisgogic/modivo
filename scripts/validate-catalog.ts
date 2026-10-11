import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { loadEnvConfig } from '@next/env';
import { products } from '../src/lib/catalog';
import { validateCatalog } from '../src/lib/catalog-validation';
loadEnvConfig(process.cwd());
const errors = validateCatalog(products, (path) => existsSync(resolve('public', `.${path}`)));
const url = process.env.NEXT_PUBLIC_SITE_URL;
const base = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') || '';
if (url) {
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol !== 'https:' ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash ||
      parsed.hostname === 'localhost' ||
      parsed.hostname.endsWith('.invalid')
    )
      errors.push('SITE_URL must be a real HTTPS public URL without credentials or query strings');
    if (parsed.pathname.replace(/\/$/, '') !== base)
      errors.push('SITE_URL path must match BASE_PATH');
  } catch {
    errors.push('Invalid SITE_URL');
  }
}
if (
  process.env.NEXT_PUBLIC_SALES_ENABLED === 'true' &&
  (!url || process.env.NEXT_PUBLIC_LEGAL_APPROVED !== 'true')
)
  errors.push('Sales require the confirmed public URL and reviewed legal content');
if (
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true' &&
  (!url ||
    process.env.NEXT_PUBLIC_ANALYTICS_REVIEWED !== 'true' ||
    process.env.NEXT_PUBLIC_LEGAL_APPROVED !== 'true' ||
    !/^[a-f0-9]{32}$/i.test(process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN || ''))
)
  errors.push(
    'Analytics require URL, reviewed legal/privacy settings, and a valid public beacon token',
  );
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(
  `Catalog validated: ${products.length} products. Sales ${process.env.NEXT_PUBLIC_SALES_ENABLED === 'true' ? 'enabled' : 'disabled'}.`,
);
