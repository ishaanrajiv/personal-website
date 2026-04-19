'use client';

import React, { useEffect, useRef } from 'react';

interface HeroNameProps {
  firstName: string;
  lastName: string;
}

export default function HeroName({ firstName, lastName }: HeroNameProps): React.JSX.Element {
  const firstLineRef = useRef<HTMLDivElement>(null);
  const secondLineRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const applyTransforms = () => {
      frameRef.current = null;

      const firstLine = firstLineRef.current;
      const secondLine = secondLineRef.current;

      if (!firstLine || !secondLine) {
        return;
      }

      if (reducedMotionRef.current) {
        firstLine.style.transform = '';
        firstLine.style.opacity = '';
        secondLine.style.transform = '';
        secondLine.style.opacity = '';
        return;
      }

      const progress = Math.min(window.scrollY / 420, 1);

      firstLine.style.transform = `translate3d(0, ${progress * -16}px, 0) scale(${1 - progress * 0.025})`;
      firstLine.style.opacity = `${1 - progress * 0.08}`;
      secondLine.style.transform = `translate3d(${progress * 10}px, ${progress * -6}px, 0)`;
      secondLine.style.opacity = `${0.82 - progress * 0.12}`;
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(applyTransforms);
    };

    const syncMotionPreference = () => {
      reducedMotionRef.current = mediaQuery.matches;
      scheduleUpdate();
    };

    syncMotionPreference();
    scheduleUpdate();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    mediaQuery.addEventListener('change', syncMotionPreference);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      mediaQuery.removeEventListener('change', syncMotionPreference);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-0 md:space-y-[-0.24em]">
      <div ref={firstLineRef} className="display-name">
        {firstName}
      </div>
      <div ref={secondLineRef} className="display-name display-ghost pl-[0.04em]">
        {lastName}
      </div>
    </div>
  );
}
