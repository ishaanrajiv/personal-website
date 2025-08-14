'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  siteName?: string;
  className?: string;
}

export default function Navigation({ siteName = "Ishaan Rajiv", className = "" }: NavigationProps): React.JSX.Element {
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const getLinkClassName = (path: string): string => {
    const baseClasses = "transition-colors";
    if (isActive(path)) {
      return `${baseClasses} text-[#ededed] font-medium`;
    }
    return `${baseClasses} text-[#737373] hover:text-[#ededed]`;
  };

  return (
    <nav className={`sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#262626] ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-medium hover:text-[#737373] transition-colors">
            {siteName}
          </Link>
          <div className="flex gap-4 sm:gap-8">
            <Link href="/" className={getLinkClassName('/')}>
              Home
            </Link>
            <Link href="/blog" className={getLinkClassName('/blog')}>
              Blog
            </Link>
            <Link href="/projects" className={getLinkClassName('/projects')}>
              Projects
            </Link>
            <Link href="/contact" className={getLinkClassName('/contact')}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}