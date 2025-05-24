"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
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

const navItems: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  {
    label: 'Language',
    children: [
      { label: 'English' },
      { label: 'Hindi' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'AI Tools', href: '#' }, // Placeholder links
      { label: 'Dashboard', href: '/dashboard' }, // Conditional link
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
    } else {
      // Fallback or prompt for role if not set
      router.push('/auth/signin'); // Or a role selection page
    }
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


  return (
    <header className="template-header shadow-md">
      <div className="flex items-center">
        <Link href="/" className="template-logo">
          <Image src="https://placehold.co/150x50/2E7DAF/white?text=ArchConnect" alt="ArchConnect Logo" width={120} height={30} data-ai-hint="logo building" />
        </Link>
      </div>
      <nav className="template-nav">
        {navItems.map((item, index) => (
          <div 
            key={item.label} 
            className={`relative ${item.children ? 'template-has-dropdown' : ''}`}
            ref={el => dropdownRefs.current[index] = el}
          >
            {item.href ? (
               item.label === 'Dashboard' && !user ? null : (
                <Link href={item.label === 'Dashboard' ? (userProfile?.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard') : item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              )
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
              <div className="template-dropdown absolute mt-2 py-2 w-48 bg-background shadow-xl rounded-md border border-border">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={
                      child.label === 'Dashboard' && user 
                        ? (userProfile?.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard') 
                        : (child.href || '#')
                    }
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 text-sm template-dropdown-item hover:bg-accent hover:text-accent-foreground"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

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
            <Link href="/auth/signin">
              <Button variant="ghost" className="hover:text-primary">
                <LogIn className="mr-2 h-4 w-4" /> Log In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                 Sign Up <UserPlus className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </>
        )}
         <ThemeToggle />
      </nav>
    </header>
  );
}
