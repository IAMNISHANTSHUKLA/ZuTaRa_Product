
"use client";

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollEffectElements {
  sectionRef: React.RefObject<HTMLElement>; // General HTMLElement is fine for the hook's input
  bgRef?: React.RefObject<HTMLElement>;
  contentRef: React.RefObject<HTMLElement>;
}

export function useScrollEffect({ sectionRef, bgRef, contentRef }: ScrollEffectElements) {
  const requestRef = useRef<number>();

  // Memoize updateEffects to prevent re-creation on every render if dependencies don't change
  const updateEffects = React.useCallback(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const windowHeight = window.innerHeight;
    const rect = sectionRef.current.getBoundingClientRect();
    
    const sectionCenterInViewport = rect.top + rect.height / 2;
    const distanceToViewportCenter = Math.abs(sectionCenterInViewport - windowHeight / 2);
    const maxEffectiveDistance = windowHeight * 0.75; 
    let visibilityFactor = 1 - Math.min(distanceToViewportCenter / maxEffectiveDistance, 1);
    visibilityFactor = Math.max(0, visibilityFactor); 

    const fade = visibilityFactor;
    const scale = 1 + (1 - fade) * 0.2; 

    if (bgRef?.current) {
      bgRef.current.style.opacity = `${fade}`;
      bgRef.current.style.transform = `scale(${scale})`;
    }
    contentRef.current.style.opacity = `${fade}`;
  }, [sectionRef, bgRef, contentRef]); // Add dependencies

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    if (!currentSectionRef) return;

    let isActive = false; 

    const handleScrollOrResize = () => {
      if (isActive) { 
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
        }
        requestRef.current = requestAnimationFrame(updateEffects);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isActive = true;
            if (!requestRef.current) { 
              requestRef.current = requestAnimationFrame(updateEffects);
            }
          } else {
            isActive = false;
            if (requestRef.current) { 
              cancelAnimationFrame(requestRef.current);
              requestRef.current = undefined;
            }
          }
        });
      },
      { threshold: 0 } 
    );

    observer.observe(currentSectionRef);
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, [sectionRef, bgRef, contentRef, updateEffects]); // Added updateEffects to dependencies
}

// Helper component to apply scroll effect to its children
interface ScrollEffectSectionProps extends React.HTMLAttributes<HTMLSectionElement> {
  children: (refs: { 
    sectionRef: React.RefObject<HTMLSectionElement>, 
    bgRef: React.RefObject<HTMLDivElement>, 
    contentRef: React.RefObject<HTMLDivElement> 
  }) => React.ReactNode;
  bgClassName?: string;
  bgImageUrl?: string;
  contentClassName?: string;
}

export const ScrollEffectSection = ({
  children,
  className,
  bgClassName,
  bgImageUrl,
  contentClassName,
  ...rest
}: ScrollEffectSectionProps): JSX.Element => {
  const sectionRef = useRef<HTMLSectionElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useScrollEffect({ sectionRef, bgRef, contentRef });

  return (
    <section
      ref={sectionRef}
      className={cn('template-section', className)}
      {...rest}
    >
      {bgImageUrl && (
        <div 
          ref={bgRef} 
          className={cn('template-bg', bgClassName)}
          style={{ backgroundImage: `url(${bgImageUrl})` }}
        />
      )}
      {!bgImageUrl && bgRef && ( // Ensure bgRef is used if provided, even without image
        <div ref={bgRef} className={cn('template-bg', bgClassName)} />
      )}
      <div ref={contentRef} className={cn('template-content', contentClassName)}>
        {children({ sectionRef, bgRef, contentRef })}
      </div>
    </section>
  );
};
