
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
  { label: 'Browse Jobs', href: '/jobs' }, // Added Browse Jobs
  {
    label: 'Language', // Kept as per original template, can be removed if not needed
    children: [
      { label: 'English', href: '#' }, 
      { label: 'Hindi', href: '#' },   
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
    } else if (user) { 
      router.push('/'); 
    } else {
      router.push('/signin');
    }
    setActiveDropdown(null); 
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

  const getSolutionsItems = () => { // Renamed from Solutions to reflect current navItems
    let dashboardItem = { label: 'Dashboard', href: '#' };
    if (user) {
      dashboardItem.href = userProfile?.role === 'client' ? '/client/dashboard' : (userProfile?.role === 'freelancer' ? '/freelancer/dashboard' : '/');
      return [
        dashboardItem,
        // { label: 'AI Tools', href: '#' }, // Example, if you re-add Solutions
        // { label: 'Build A Firm', href: '#' },
      ];
    }
    return []; // No "Solutions" or dynamic dashboard link if not logged in from main nav
  };

  return (
    <header className="template-header">
      <div className="template-logo-container">
        <Link href="/" className="template-logo">
          <Image 
            src="https://storage.googleapis.com/project-spark-312117-web-assets/v1/projects/studio-default-project/uploads/d3d8e577-4b8f-43b2-9a84-0a377fc32d80.png" 
            alt="Zutara Logo" 
            width={140} 
            height={40} 
            data-ai-hint="logo" 
            className="object-contain"
          />
        </Link>
        <ThemeToggle />
      </div>
      <nav className="template-nav">
        {navItems.map((item, index) => (
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
        ))}

        {user ? (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userProfile?.photoURL || user.photoURL || `https://placehold.co/40x40/77B5B0/FFFFFF?text=${userProfile?.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}`} alt={userProfile?.displayName || user.email || "User"} />
                  <AvatarFallback>{userProfile?.displayName?.charAt(0) || user.email?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userProfile?.displayName || user.email}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email} ({userProfile?.role || 'Role not set'})
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
            <Link href="/signin" className="hover:text-primary transition-colors">
              Log In
            </Link>
            <Link href="/signup">
              <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 ml-2">
                 Sign Up <UserPlus className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
