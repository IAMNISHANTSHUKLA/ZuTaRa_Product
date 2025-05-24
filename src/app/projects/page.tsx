import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const featuredProjects = [
  {
    id: 1,
    title: "Modern Eco Villa",
    category: "Residential Architecture",
    imageUrl: "https://placehold.co/600x400/77B5B0/FFFFFF?text=Eco+Villa",
    aiHint: "modern house exterior",
    description: "A stunning sustainable villa design focusing on natural light and eco-friendly materials.",
  },
  {
    id: 2,
    title: "Urban Co-Working Space",
    category: "Commercial Design",
    imageUrl: "https://placehold.co/600x400/2E7DAF/FFFFFF?text=Co-working",
    aiHint: "modern office interior",
    description: "Innovative co-working hub designed for collaboration and productivity in a bustling city center.",
  },
  {
    id: 3,
    title: "Historic Landmark Restoration",
    category: "Preservation & Restoration",
    imageUrl: "https://placehold.co/600x400/A0A0A0/FFFFFF?text=Restoration",
    aiHint: "historic building facade",
    description: "Meticulous restoration of a 19th-century landmark, blending historical charm with modern functionality.",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">Featured Projects</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Discover inspiring architectural marvels and innovative designs from our talented community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image 
                  src={project.imageUrl} 
                  alt={project.title} 
                  width={600} 
                  height={400} 
                  className="w-full h-64 object-cover" 
                  data-ai-hint={project.aiHint}
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-2xl font-semibold mb-2">{project.title}</CardTitle>
                <p className="text-sm text-accent font-medium mb-3">{project.category}</p>
                <CardDescription className="text-foreground line-clamp-3 mb-4">{project.description}</CardDescription>
                <Link href={`/projects/${project.id}`}>
                  <span className="text-primary hover:underline font-medium">View Project Details &rarr;</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link href="/jobs">
            <span className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md text-lg font-semibold transition-colors">
              Find Your Next Project
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
