import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="legal-main wrap">
      <div className="section-kicker">404 / A SMALL DETOUR</div>
      <h1 style={{ marginTop: 25 }}>
        Nothing here.
        <br />
        <span className="serif">Plenty ahead.</span>
      </h1>
      <p>This page may have moved, or the address might not be quite right.</p>
      <Link href="/" className="button button-dark">
        Back to the good things ↗
      </Link>
    </main>
  );
}
