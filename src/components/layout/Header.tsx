
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button'; // Keep for DropdownMenuTrigger if needed
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from 'next/navigation';

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

// Updated navItems to match the ZUTARA design
const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  {
    label: 'Language',
    children: [
      { label: 'English', href: '#' }, // Added href for consistency
      { label: 'Hindi', href: '#' },   // Added href for consistency
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'AI Tools', href: '#' },
      { label: 'Dashboard', href: '#' }, // Placeholder, will be conditional
      { label: 'Build A Firm', href: '#' },
    ],
  },
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, logout, userProfile } = useAuth();
  const router = useRouter();
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleDashboardNavigation = () => {
    if (userProfile?.role === 'client') {
      router.push('/client/dashboard');
    } else if (userProfile?.role === 'freelancer') {
      router.push('/freelancer/dashboard');
    } else if (user) { // If user exists but no specific role dashboard
      router.push('/'); // Default to home or a generic dashboard
    } else {
      router.push('/signin');
    }
    setActiveDropdown(null); // Close dropdown after navigation
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && dropdownRefs.current.every(ref => ref && !ref.contains(event.target as Node))) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  // Filter out Dashboard from Solutions if user is not logged in, or create specific dashboard link
  const getSolutionsItems = () => {
    let solutions = navItems.find(item => item.label === 'Solutions')?.children || [];
    if (user) {
      solutions = solutions.map(item => 
        item.label === 'Dashboard' 
        ? { 
            label: 'Dashboard', 
            href: userProfile?.role === 'client' ? '/client/dashboard' : (userProfile?.role === 'freelancer' ? '/freelancer/dashboard' : '/') 
          } 
        : item
      );
    } else {
      solutions = solutions.filter(item => item.label !== 'Dashboard');
    }
    return solutions;
  };


  return (
    <header className="template-header">
      <div className="template-logo-container">
        <Link href="/" className="template-logo">
          {/* Updated logo to ZUTARA */}
          <Image 
            src="https://placehold.co/130x30/333333/FFFFFF?text=Z+ZUTARA&font=arial" 
            alt="ZUTARA Logo" 
            width={130} 
            height={30} 
            data-ai-hint="Z icon brand name" 
          />
        </Link>
        <ThemeToggle />
      </div>
      <nav className="template-nav">
        {navItems.map((item, index) => {
          if (item.label === 'Solutions') { // Special handling for Solutions dropdown
            const solutionLinks = getSolutionsItems();
            if (solutionLinks.length === 0 && !user) return null; // Don't render Solutions if no items for logged out user

            return (
              <div 
                key={item.label} 
                className={`relative ${item.children ? 'template-has-dropdown' : ''}`}
                ref={el => dropdownRefs.current[index] = el}
              >
                <button
                  onClick={() => handleDropdownToggle(item.label)}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  {item.label}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {activeDropdown === item.label && (
                  <div className="template-dropdown">
                    {solutionLinks.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href || '#'}
                        onClick={child.label === 'Dashboard' ? handleDashboardNavigation : () => setActiveDropdown(null)}
                        className="block px-4 py-2 text-sm template-dropdown-item hover:bg-accent hover:text-accent-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Default rendering for other nav items
          return (
            <div 
              key={item.label} 
              className={`relative ${item.children ? 'template-has-dropdown' : ''}`}
              ref={el => dropdownRefs.current[index] = el}
            >
              {item.href ? (
                <Link href={item.href} className="hover:text-primary transition-colors" onClick={() => setActiveDropdown(null)}>
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => item.children && handleDropdownToggle(item.label)}
                  className="flex items-center hover:text-primary transition-colors"
                >
                  {item.label}
                  {item.children && <ChevronDown className="ml-1 h-4 w-4" />}
                </button>
              )}
              {item.children && activeDropdown === item.label && (
                <div className="template-dropdown">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href || '#'}
                      onClick={() => setActiveDropdown(null)}
                      className="block px-4 py-2 text-sm template-dropdown-item hover:bg-accent hover:text-accent-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {user ? (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || `https://placehold.co/40x40/77B5B0/FFFFFF?text=${user.displayName?.charAt(0) || 'U'}`} alt={user.displayName || "User"} />
                  <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName || user.email}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDashboardNavigation}>
                Dashboard
              </DropdownMenuItem>
              {userProfile?.role === 'freelancer' && (
                <DropdownMenuItem onClick={() => router.push('/freelancer/profile')}>
                  Profile
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            {/* Updated Log In to be a simple link to match design */}
            <Link href="/signin" className="hover:text-primary transition-colors">
              Log In
            </Link>
            {/* Sign Up remains a button for better UX, though not in the image */}
            <Link href="/signup">
              <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 ml-2">
                 Sign Up <UserPlus className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </>
        )}
         {/* ThemeToggle is now next to the logo */}
      </nav>
    </header>
  );
}
