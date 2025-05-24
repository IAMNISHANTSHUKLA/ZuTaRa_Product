"use client";

import { useParams, useRouter } from 'next/navigation';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Briefcase, MapPin, DollarSign, CalendarDays, UserCheck, ExternalLink, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

// Re-define or import sampleJobs if it's in a shared location
// For this example, defining it here. In a real app, this would be fetched.
const sampleJobs = [
  {
    id: "1",
    title: "Senior Residential Architect",
    clientName: "Dream Homes Inc.",
    clientLogo: "https://placehold.co/80x80/2E7DAF/FFFFFF?text=DH",
    aiClientLogoHint: "company logo D H",
    location: "Remote (Global)",
    budget: "$70,000 - $90,000 Annually",
    postedDate: "2024-07-15",
    skills: ["Revit", "AutoCAD", "Residential Design", "Client Management", "Project Coordination", "Sustainable Practices"],
    description: "Seeking an experienced residential architect to lead design projects from conception to completion. The ideal candidate will have a strong portfolio showcasing innovative residential designs and a proven track record of managing projects effectively. Responsibilities include client communication, team leadership, and ensuring designs meet all regulatory standards. This is a full-time remote position with opportunities for growth.",
    category: "residential",
    projectType: "Full-time",
    experienceLevel: "Senior (5+ years)"
  },
  {
    id: "2",
    title: "Commercial Interior Designer for Cafe Chain",
    clientName: "Urban Brews Co.",
    clientLogo: "https://placehold.co/80x80/77B5B0/FFFFFF?text=UB",
    aiClientLogoHint: "company logo U B",
    location: "New York, NY",
    budget: "$3,000 - $5,000 Project-Based",
    postedDate: "2024-07-20",
    skills: ["Interior Design", "SketchUp", "Commercial Spaces", "Vendor Sourcing", "Mood Boards", "FF&E Selection"],
    description: "Design the interior for a new line of modern cafes. Must have experience with F&B projects, creating unique and inviting spaces. You will be responsible for the entire design lifecycle, from concept development to overseeing installation. A strong portfolio in commercial interior design is essential.",
    category: "interior",
    projectType: "Contract / Freelance",
    experienceLevel: "Mid-Level (2-5 years)"
  },
  {
    id: "3",
    title: "Architectural Visualization Specialist (Internship)",
    clientName: "Pixel Perfect Renders",
    clientLogo: "https://placehold.co/80x80/A0A0A0/FFFFFF?text=PPR",
    aiClientLogoHint: "company logo P P R",
    location: "Remote (US-based)",
    budget: "$15 - $20 / hour",
    postedDate: "2024-07-22",
    skills: ["3ds Max", "V-Ray", "Photoshop", "Architectural Rendering", "Post-production", "Lumion"],
    description: "Paid internship for a talented student or recent grad to create high-quality architectural visualizations. You will work alongside senior artists on exciting projects, gaining valuable industry experience. This is a great opportunity to build your portfolio and learn from experts in the field.",
    category: "visualization",
    projectType: "Internship",
    experienceLevel: "Entry-Level / Intern"
  },
   {
    id: "4",
    title: "Sustainable Building Consultant",
    clientName: "Green Future Designs",
    clientLogo: "https://placehold.co/80x80/4CAF50/FFFFFF?text=GFD",
    aiClientLogoHint: "company logo G F D",
    location: "Austin, TX",
    budget: "Project-based, $50-$75/hr",
    postedDate: "2024-07-18",
    skills: ["LEED Certification", "Sustainable Design", "Energy Modeling", "Consulting", "BREEAM"],
    description: "Provide expert advice on sustainable building practices and LEED certification for various projects. Join a passionate team dedicated to creating environmentally friendly architectural solutions.",
    category: "commercial",
    projectType: "Consultancy",
    experienceLevel: "Expert (7+ years)"
  },
  {
    id: "5",
    title: "Junior Architect for Urban Planning",
    clientName: "CityScape Planners",
    clientLogo: "https://placehold.co/80x80/FFC107/000000?text=CSP",
    aiClientLogoHint: "company logo C S P",
    location: "San Francisco, CA",
    budget: "$60,000 - $75,000 Annually",
    postedDate: "2024-07-25",
    skills: ["Urban Design", "AutoCAD", "GIS", "Community Engagement", "Rhino"],
    description: "Join a dynamic team working on large-scale urban planning projects. Entry-level position with growth opportunities to shape the future of cities.",
    category: "visualization",
    projectType: "Full-time",
    experienceLevel: "Junior (0-2 years)"
  }
];

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = typeof params.id === 'string' ? params.id : undefined;
  const job = sampleJobs.find(j => j.id === jobId);

  if (!job) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8 mt-20 flex-grow">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Job Not Found</h1>
            <p className="text-muted-foreground">The job you are looking for does not exist or may have been removed.</p>
            <Button onClick={() => router.back()} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20 flex-grow">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Job Details Column */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <Image 
                    src={job.clientLogo} 
                    alt={`${job.clientName} logo`}
                    width={64} 
                    height={64} 
                    className="rounded-md border"
                    data-ai-hint={job.aiClientLogoHint}
                  />
                  <div>
                    <CardTitle className="text-3xl font-bold text-primary">{job.title}</CardTitle>
                    <CardDescription className="text-lg">
                      Posted by <Link href="#" className="text-accent hover:underline">{job.clientName}</Link>
                    </CardDescription>
                  </div>
                </div>
                 <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
                    <div className="flex items-center"><MapPin className="h-4 w-4 mr-1.5 text-accent"/> {job.location}</div>
                    <div className="flex items-center"><DollarSign className="h-4 w-4 mr-1.5 text-accent"/> {job.budget}</div>
                    <div className="flex items-center"><CalendarDays className="h-4 w-4 mr-1.5 text-accent"/> Posted: {new Date(job.postedDate).toLocaleDateString()}</div>
                    <div className="flex items-center"><Briefcase className="h-4 w-4 mr-1.5 text-accent"/> {job.projectType}</div>
                    <div className="flex items-center"><UserCheck className="h-4 w-4 mr-1.5 text-accent"/> {job.experienceLevel}</div>
                </div>
              </CardHeader>
              <CardContent>
                <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                <p className="text-foreground whitespace-pre-line leading-relaxed">{job.description}</p>

                <h2 className="text-xl font-semibold mt-6 mb-3">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Placeholder for Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Other jobs you might be interested in...</p>
                {/* TODO: Logic to display similar jobs */}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar / Actions Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4"/> Apply Now
                </Button>
                <Button variant="outline" className="w-full">
                  <Bookmark className="mr-2 h-4 w-4"/> Save Job
                </Button>
                <Button variant="outline" className="w-full">
                   <Share2 className="mr-2 h-4 w-4"/> Share Job
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About {job.clientName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                   <Image 
                    src={job.clientLogo} 
                    alt={`${job.clientName} logo`}
                    width={80} 
                    height={80} 
                    className="rounded-lg border"
                    data-ai-hint={job.aiClientLogoHint} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Information about the client or company hiring for this position. 
                  This could include their mission, size, or typical projects.
                </p>
                <Link href="#" className="text-primary hover:underline text-sm">
                  View Company Profile &rarr;
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
