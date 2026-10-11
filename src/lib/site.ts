const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const site = {
  name: 'MODIVO',
  description:
    'Beautifully useful digital products. Thoughtful templates, planners, and creative tools for the things you make.',
  url: rawUrl ? new URL(rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`).href : undefined,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'modivo2026@gmail.com',
  legalApproved: process.env.NEXT_PUBLIC_LEGAL_APPROVED === 'true',
};
export const launchReady = Boolean(site.url && site.email && site.legalApproved);
export const absoluteUrl = (path: string) =>
  site.url ? new URL(path.replace(/^\//, ''), site.url).toString() : undefined;
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') || '';
export const assetPath = (path: string) => `${basePath}${path}`;
export const analyticsEnabled =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true' &&
  process.env.NEXT_PUBLIC_ANALYTICS_REVIEWED === 'true' &&
  site.legalApproved;
