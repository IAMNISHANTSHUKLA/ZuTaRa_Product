
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerColumns = [
  {
    title: "Categories",
    links: [
        { text: "Graphics & Design", href: "/jobs?category=Graphics+%26+Design" },
        { text: "Digital Marketing", href: "/jobs?category=Digital+Marketing" },
        { text: "Writing & Translation", href: "/jobs?category=Writing+%26+Translation" },
        { text: "Video & Animation", href: "/jobs?category=Video+%26+Animation" },
        { text: "Music & Audio", href: "/jobs?category=Music+%26+Audio" },
        { text: "Programming & Tech", href: "/jobs?category=Programming+%26+Tech" },
        { text: "AI Services", href: "/jobs?category=AI+Services" },
        { text: "Architecture & Interior Design", href: "/jobs?category=Architecture+%26+Interior+Design" },
        { text: "Consulting", href: "/jobs?category=Consulting" }
    ]
  },
  {
    title: "For Freelancers",
    links: [
        { text: "Become a Freelancer", href: "/signup?role=freelancer" },
        { text: "Zutara Community Hub", href: "#" },
        { text: "Forum", href: "#" },
        { text: "Events", href: "#" }
    ]
  },
  {
    title: "For Clients",
    links: [
        { text: "Post a Job on Zutara", href: "/client/post-job" },
        { text: "Browse Freelancers", href: "/jobs" }, // General jobs page can serve as browse
        { text: "How to Hire on Zutara", href: "#" },
        { text: "Zutara Go", href: "#" }
    ]
  },
  {
    title: "For Students",
    links: [
        { text: "Find Internships on Zutara", href: "/jobs?q=internship" },
        { text: "Portfolio Building Tips", href: "#" },
        { text: "Mentorship Programs", href: "#" },
        { text: "Student Competitions", href: "#" }
    ]
  },
  {
    title: "Company",
    links: [
        { text: "About Zutara", href: "/about" },
        { text: "Help & Support", href: "#" },
        { text: "Careers at Zutara", href: "#" },
        { text: "Terms of Service", href: "#" },
        { text: "Privacy Policy", href: "#" },
        { text: "Press & News", href: "#" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="template-content4 footer-container pt-16 pb-8">
      <div className="template-footer-section">
        <div className="template-footer-columns">
          {footerColumns.map((column) => (
            <div key={column.title} className="template-footer-column mb-8 md:mb-0">
              <h4 className="text-lg font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.text}>
                    <Link href={link.href} className="hover:text-primary transition-colors">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="template-footer-divider my-12" />
        <div className="template-footer-bottom flex flex-col md:flex-row justify-between items-center">
          <div className="template-footer-logo mb-6 md:mb-0">
            <Link href="/">
              <Image src="https://placehold.co/180x60/2E7DAF/white?text=Zutara" alt="Zutara Logo" width={150} height={40} data-ai-hint="logo building" />
            </Link>
          </div>
          <div className="template-footer-socials flex space-x-4">
            <Link href="#" aria-label="Facebook"><Facebook className="w-6 h-6 hover:text-primary transition-colors" /></Link>
            <Link href="#" aria-label="Twitter"><Twitter className="w-6 h-6 hover:text-primary transition-colors" /></Link>
            <Link href="#" aria-label="Instagram"><Instagram className="w-6 h-6 hover:text-primary transition-colors" /></Link>
            <Link href="#" aria-label="LinkedIn"><Linkedin className="w-6 h-6 hover:text-primary transition-colors" /></Link>
          </div>
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8">
          © {new Date().getFullYear()} Zutara. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
