
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerColumns = [
  {
    title: "Specializations",
    links: [
        { text: "Residential Architecture", href: "/jobs?category=Residential+Architecture" },
        { text: "Commercial Architecture", href: "/jobs?category=Commercial+Architecture" },
        { text: "Interior Design", href: "/jobs?category=Interior+Design" },
        { text: "Landscape Architecture", href: "/jobs?category=Landscape+Architecture" },
        { text: "Urban Planning", href: "/jobs?category=Urban+Planning" },
        { text: "Graphic Design", href: "/jobs?category=Graphic+Design" },
        { text: "UX/UI Design", href: "/jobs?category=UX%2FUI+Design" },
        { text: "3D Visualization", href: "/jobs?category=3D+Visualization" },
    ]
  },
  {
    title: "For Creatives",
    links: [
        { text: "Create Your Profile", href: "/signup?role=freelancer" },
        { text: "Find Projects", href: "/jobs" },
        { text: "How ZuTaRa Works", href: "/#getting-started" },
        { text: "Community Hub", href: "#" }, // Placeholder
    ]
  },
  {
    title: "For Clients",
    links: [
        { text: "Post a Project", href: "/client/post-job" },
        { text: "Hire Talent", href: "/jobs" }, 
        { text: "How to Hire", href: "/#getting-started" },
        { text: "Browse Portfolios", href: "/projects" }
    ]
  },
   {
    title: "ZuTaRa",
    links: [
        { text: "About Us", href: "/about" },
        { text: "Success Stories", href: "/#success-stories" }, 
        { text: "Pricing & Plans", href: "/#pricing-plans" }, 
        { text: "Security & Trust", href: "/#security-trust" },
        { text: "Help & Support", href: "#" }, // Placeholder
        { text: "Terms of Service", href: "#" }, // Placeholder
        { text: "Privacy Policy", href: "#" }, // Placeholder
    ]
  }
];

export default function Footer() {
  return (
    <footer className="template-content4 footer-container pt-16 pb-8">
      <div className="template-footer-section">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {footerColumns.map((column) => (
            <div key={column.title} className="template-footer-column mb-8 md:mb-0">
              <h4 className="text-lg font-semibold mb-4 text-primary">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.text}>
                    <Link href={link.href} className="hover:text-primary transition-colors text-muted-foreground hover:text-foreground">
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
              <Image src="https://storage.googleapis.com/project-spark-312117-web-assets/v1/projects/studio-default-project/uploads/d3d8e577-4b8f-43b2-9a84-0a377fc32d80.png" alt="Zutara Logo" width={150} height={50} data-ai-hint="logo" className="object-contain"/>
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
          © {new Date().getFullYear()} ZuTaRa. All rights reserved. Where Global Creativity Meets Unlimited Opportunity.
        </p>
      </div>
    </footer>
  );
}
