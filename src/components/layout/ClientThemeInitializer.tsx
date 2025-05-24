'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme'; // Assuming useTheme is created

export default function ClientThemeInitializer() {
  const [theme] = useTheme(); // Initialize and apply theme

  useEffect(() => {
    // This effect ensures that the theme class is applied on the client side
    // after initial hydration. The useTheme hook itself handles setting the class.
    // This component is mainly to ensure the hook runs early.
  }, [theme]);

  return null; // This component doesn't render anything
}
