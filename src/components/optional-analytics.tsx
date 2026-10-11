'use client';
import { useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
export function OptionalAnalytics({ token }: { token: string }) {
  const [consent, setConsent] = useState(false);
  return (
    <div className="analytics-choice">
      <p>
        Optional visit and performance analytics by Cloudflare.{' '}
        <Link href="/privacy/">Privacy details</Link>.
      </p>
      {consent ? (
        <>
          <Script
            id="cloudflare-analytics"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token })}
            strategy="afterInteractive"
          />
          <button onClick={() => window.location.reload()}>Stop analytics and reload</button>
        </>
      ) : (
        <button onClick={() => setConsent(true)}>Enable optional analytics for this visit</button>
      )}
    </div>
  );
}
