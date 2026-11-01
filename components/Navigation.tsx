'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Monogram, Wordmark } from '@/components/Brand';
import ThemeToggle from '@/components/ThemeToggle';
import { CloseIcon, MenuIcon } from '@/components/icons';
import { NAV_ITEMS } from '@/components/site';

function isActivePath(pathname: string, path: string): boolean {
  if (path === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(path);
}

export default function Navigation(): React.JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/80 backdrop-blur-xl supports-[backdrop-filter]:bg-paper/70">
      <nav className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" onClick={close} className="flex items-center gap-2.5 rounded-md" aria-label="Ishaan Rajiv, home">
          <Monogram className="h-7 w-7" />
          <Wordmark className="text-[1.25rem] leading-none" />
        </Link>

        <div className="flex items-center gap-1">
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.path);

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-full px-3 py-2 text-[0.9375rem] transition-colors ${
                      active ? 'bg-ink/[0.07] text-ink' : 'text-ink/65 hover:text-ink'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/[0.07] hover:text-ink md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-b rule bg-paper md:hidden"
      >
        <ul className="mx-auto max-w-page px-4 pb-6 pt-2 sm:px-6">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.path);

            return (
              <li key={item.path} className="border-b rule last:border-b-0">
                <Link
                  href={item.path}
                  onClick={close}
                  aria-current={active ? 'page' : undefined}
                  className={`block py-4 text-[1.5rem] font-semibold tracking-[-0.025em] transition-colors ${
                    active ? 'text-ink' : 'text-ink/55 hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
