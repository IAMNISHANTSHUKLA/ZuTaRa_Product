"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Briefcase, DollarSign, CalendarDays } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

// Dummy job data - replace with actual data fetching
const sampleJobs = [
  {
    id: "1",
    title: "Senior Residential Architect",
    clientName: "Dream Homes Inc.",
    location: "Remote (Global)",
    budget: "$70,000 - $90,000 Annually",
    postedDate: "2024-07-15",
    skills: ["Revit", "AutoCAD", "Residential Design", "Client Management"],
    description: "Seeking an experienced residential architect to lead design projects from conception to completion. Strong portfolio required.",
    category: "residential"
  },
  {
    id: "2",
    title: "Commercial Interior Designer for Cafe Chain",
    clientName: "Urban Brews Co.",
    location: "New York, NY",
    budget: "$3,000 - $5,000 Project-Based",
    postedDate: "2024-07-20",
    skills: ["Interior Design", "SketchUp", "Commercial Spaces", "Vendor Sourcing"],
    description: "Design the interior for a new line of modern cafes. Must have experience with F&B projects.",
    category: "interior"
  },
  {
    id: "3",
    title: "Architectural Visualization Specialist (Internship)",
    clientName: "Pixel Perfect Renders",
    location: "Remote (US-based)",
    budget: "$15 - $20 / hour",
    postedDate: "2024-07-22",
    skills: ["3ds Max", "V-Ray", "Photoshop", "Architectural Rendering"],
    description: "Paid internship for a talented student or recent grad to create high-quality architectural visualizations.",
    category: "internship"
  },
  {
    id: "4",
    title: "Sustainable Building Consultant",
    clientName: "Green Future Designs",
    location: "Austin, TX",
    budget: "Project-based, $50-$75/hr",
    postedDate: "2024-07-18",
    skills: ["LEED Certification", "Sustainable Design", "Energy Modeling", "Consulting"],
    description: "Provide expert advice on sustainable building practices and LEED certification for various projects.",
    category: "commercial" // Example, could also be 'residential'
  },
  {
    id: "5",
    title: "Junior Architect for Urban Planning",
    clientName: "CityScape Planners",
    location: "San Francisco, CA",
    budget: "$60,000 - $75,000 Annually",
    postedDate: "2024-07-25",
    skills: ["Urban Design", "AutoCAD", "GIS", "Community Engagement"],
    description: "Join a dynamic team working on large-scale urban planning projects. Entry-level position with growth opportunities.",
    category: "visualization" // Example, could be 'commercial' or a dedicated 'urban planning' category
  }
];

const jobCategories = [
  { value: "all", label: "All Categories" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "interior", label: "Interior Design" },
  { value: "visualization", label: "Visualization" },
  { value: "internship", label: "Internship" },
];

export default function JobsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || "all");
  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);

  useEffect(() => {
    let jobs = sampleJobs;
    const currentSearchTerm = searchParams.get('q') || "";
    const currentCategory = searchParams.get('category') || "all";

    if (currentSearchTerm) {
      setSearchTerm(currentSearchTerm); // Sync state with URL
      jobs = jobs.filter(job =>
        job.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(currentSearchTerm.toLowerCase())) ||
        job.clientName.toLowerCase().includes(currentSearchTerm.toLowerCase())
      );
    }
    
    if (currentCategory && currentCategory !== "all") {
      setSelectedCategory(currentCategory); // Sync state with URL
      jobs = jobs.filter(job => job.category === currentCategory);
    }
    
    setFilteredJobs(jobs);
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set('q', searchTerm);
    } else {
      params.delete('q');
    }
    if (selectedCategory && selectedCategory !== "all") {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }
    router.push(`/jobs?${params.toString()}`);
  };
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    router.push(`/jobs?${params.toString()}`);
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-primary">Find Your Next Opportunity</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Browse through a wide range of architectural projects and positions.
          </p>
        </div>

        <Card className="mb-8 shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-2">
                <label htmlFor="search-keywords" className="block text-sm font-medium text-foreground mb-1">Keywords</label>
                <div className="relative">
                  <Input 
                    id="search-keywords" 
                    placeholder="Job title, skills, or company" 
                    className="pl-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div>
                <label htmlFor="select-category" className="block text-sm font-medium text-foreground mb-1">Category</label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="select-category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobCategories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full md:w-auto" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" /> Search Jobs
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <CardTitle className="text-2xl font-semibold text-primary hover:underline">
                      <Link href={`/jobs/${job.id}`}>{job.title}</Link>
                    </CardTitle>
                    <Badge variant="secondary" className="mt-2 sm:mt-0">{job.location}</Badge>
                  </div>
                  <CardDescription className="flex items-center text-sm text-muted-foreground pt-1">
                    <Briefcase className="h-4 w-4 mr-1.5" /> {job.clientName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground line-clamp-3 mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map(skill => <Badge key={skill} variant="outline">{skill}</Badge>)}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1.5 text-accent"/> Budget: {job.budget}
                      </div>
                      <div className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1.5 text-accent"/> Posted: {new Date(job.postedDate).toLocaleDateString()}
                      </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Link href={`/jobs/${job.id}`}>
                    <Button>View Details & Apply</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                No jobs found matching your criteria. Try adjusting your search or filters.
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pagination (Placeholder - if needed for many jobs) */}
        {/* 
        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="mr-2">Previous</Button>
          <Button variant="outline">Next</Button>
        </div>
        */}
      </main>
      <Footer />
    </>
  );
}
