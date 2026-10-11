'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './arrow';
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open]);
  return (
    <header className="site-header wrap">
      <Link className="wordmark" href="/" aria-label="MODIVO home">
        modivo<span className="brand-dot"></span>
      </Link>
      <span className="header-note">
        Independent ideas.
        <br />
        Endlessly useful.
      </span>
      <button
        ref={button}
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close −' : 'Menu +'}
      </button>
      <nav
        id="main-nav"
        className={open ? 'main-nav is-open' : 'main-nav'}
        aria-label="Main navigation"
      >
        <Link
          href="/shop/"
          aria-current={pathname === '/shop' || pathname === '/shop/' ? 'page' : undefined}
          onClick={() => setOpen(false)}
        >
          Shop
        </Link>
        <Link href="/#collections" onClick={() => setOpen(false)}>
          Collections
        </Link>
        <Link href="/about/" onClick={() => setOpen(false)}>
          Our thinking
        </Link>
        <Link className="nav-contact" href="/contact/" onClick={() => setOpen(false)}>
          Say hello <Arrow diagonal />
        </Link>
      </nav>
    </header>
  );
}
