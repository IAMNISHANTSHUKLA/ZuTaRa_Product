import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerColumns = [
  {
    title: "Categories",
    links: ["Graphics & Design", "Digital Marketing", "Writing & Translation", "Video & Animation", "Music & Audio", "Programming & Tech", "AI Services", "Consulting", "Data", "Business", "Personal Growth & Hobbies", "Photography", "Finance", "End-to-End Projects", "Service Catalog"]
  },
  {
    title: "For Freelancers",
    links: ["Become a Freelancer", "Become an Agency", "Freelancer Equity Program", "Kickstart", "Community Hub", "Forum", "Events"]
  },
  {
    title: "For Clients",
    links: ["Zutara Pro", "Project Management", "ClearVoice", "Content Marketing", "Creative Talent", "AutoDS", "Dropshipping Tool", "Logo Maker", "Contact Sales", "Zutara Go"]
  },
  {
    title: "For Students",
    links: ["Internships", "Portfolio Building", "Mentorship", "Courses", "Competitions"]
  },
  {
    title: "Company",
    links: ["About Zutara", "Help & Support", "Social Impact", "Careers", "Terms of Service", "Privacy Policy", "Do not sell or share my personal information", "Partnerships", "Creator Network", "Affiliates", "Invite a Friend", "Press & News", "Investor Relations"]
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
                  <li key={link}>
                    <Link href="#" className="hover:text-primary transition-colors">
                      {link.replace("ArchConnect", "Zutara")}
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
            <Image src="https://placehold.co/180x60/2E7DAF/white?text=Zutara" alt="Zutara Logo" width={150} height={40} data-ai-hint="logo building" />
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
