
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Placeholder data for portfolio projects
const portfolioProjects = [
  {
    id: "proj-1",
    title: "Downtown Mixed-Use Development",
    category: "Architecture, Urban Planning",
    imageUrl: "https://placehold.co/600x400/2E7DAF/FFFFFF?text=Mixed-Use+Dev",
    aiHint: "modern city architecture",
    description: "A 24-story mixed-use building featuring retail, office, and residential units. Focused on sustainable design and community integration.",
    publishedDate: "2023-10-15",
  },
  {
    id: "proj-2",
    title: "Minimalist Scandinavian Residence",
    category: "Interior Design",
    imageUrl: "https://placehold.co/600x400/77B5B0/FFFFFF?text=Scandinavian+Home",
    aiHint: "minimalist interior living room",
    description: "Interior design for a 3-bedroom home, emphasizing natural light, organic materials, and functional simplicity.",
    publishedDate: "2023-08-22",
  },
  {
    id: "proj-3",
    title: "Kinetic Facade System - Concept",
    category: "Conceptual Design, Technical Drawings",
    imageUrl: "https://placehold.co/600x400/A0A0A0/FFFFFF?text=Kinetic+Facade",
    aiHint: "dynamic building facade",
    description: "A conceptual design and technical prototype for a responsive facade system that adapts to environmental conditions.",
    publishedDate: "2023-05-30",
  },
];

export default function FreelancerPortfolioPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Portfolio</h1>
          <p className="text-muted-foreground">Manage and showcase your architectural and design projects.</p>
        </div>
        <Link href="/freelancer/portfolio/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioProjects.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden">
            <CardHeader className="p-0">
               <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint={project.aiHint}
                />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <p className="text-sm text-muted-foreground mb-1">{project.category}</p>
              <CardTitle className="mb-2 text-xl">{project.title}</CardTitle>
              <CardDescription className="line-clamp-3">{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Published: {new Date(project.publishedDate).toLocaleDateString()}
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
                 <Button variant="outline" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
       {portfolioProjects.length === 0 && (
          <div className="col-span-full text-center py-20 bg-card rounded-lg border-2 border-dashed">
            <h2 className="text-2xl font-semibold mb-2">Your Portfolio is Empty</h2>
            <p className="text-muted-foreground mb-4">Start by adding your first project to showcase your skills.</p>
            <Link href="/freelancer/portfolio/add">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Project
              </Button>
            </Link>
          </div>
        )}
    </div>
  );
}
