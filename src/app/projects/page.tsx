
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const featuredProjects = [
  {
    id: 1,
    title: "Modern Eco Villa in Bali",
    category: "Residential Architecture, Sustainable Design",
    imageUrl: "https://placehold.co/600x400/77B5B0/FFFFFF?text=Eco+Villa+Zutara",
    aiHint: "modern house exterior",
    description: "A stunning sustainable villa design focusing on natural light, local materials, and seamless indoor-outdoor living, featured on Zutara.",
  },
  {
    id: 2,
    title: "Tech Hub Co-Working Space, Berlin",
    category: "Commercial Design, Interior Architecture",
    imageUrl: "https://placehold.co/600x400/2E7DAF/FFFFFF?text=Co-working+Zutara",
    aiHint: "modern office interior",
    description: "Innovative co-working hub designed for collaboration and productivity in a bustling tech district, showcased by Zutara.",
  },
  {
    id: 3,
    title: "19th Century Landmark Restoration, Paris",
    category: "Preservation & Restoration, Historic Architecture",
    imageUrl: "https://placehold.co/600x400/A0A0A0/FFFFFF?text=Restoration+Zutara",
    aiHint: "historic building facade",
    description: "Meticulous restoration of a 19th-century landmark, blending historical charm with modern functionality, a Zutara highlight.",
  },
   {
    id: 4,
    title: "Urban Oasis Landscape Design, Singapore",
    category: "Landscape Architecture, Urban Planning",
    imageUrl: "https://placehold.co/600x400/4CAF50/FFFFFF?text=Urban+Oasis+Zutara",
    aiHint: "urban park design",
    description: "Transforming a dense urban area into a green sanctuary with innovative landscaping and sustainable water features.",
  },
  {
    id: 5,
    title: "Minimalist Brand Identity for FinTech",
    category: "Graphic Design, Brand Identity",
    imageUrl: "https://placehold.co/600x400/FFC107/000000?text=FinTech+Brand+Zutara",
    aiHint: "minimalist logo design",
    description: "A sleek and modern brand identity for a financial technology startup, emphasizing trust and simplicity.",
  },
  {
    id: 6,
    title: "Interactive Museum Exhibit UX/UI",
    category: "UX/UI Design, Digital Media",
    imageUrl: "https://placehold.co/600x400/9C27B0/FFFFFF?text=Museum+UX+Zutara",
    aiHint: "interactive screen display",
    description: "Engaging user experience and interface design for an interactive historical exhibit, enhancing visitor engagement.",
  }
];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">Inspiring Projects on ZuTaRa</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Discover a curated selection of architectural marvels and innovative designs from the talented global community on ZuTaRa. These projects showcase the breadth of creativity and expertise available on our platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
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
              <CardContent className="p-6 flex flex-col flex-grow">
                <CardTitle className="text-2xl font-semibold mb-2">{project.title}</CardTitle>
                <p className="text-sm text-accent font-medium mb-3">{project.category}</p>
                <CardDescription className="text-foreground line-clamp-3 mb-4 flex-grow">{project.description}</CardDescription>
                <div className="mt-auto">
                  <Link href={`/jobs?q=${encodeURIComponent(project.title)}`} passHref>
                    <Button variant="outline" className="w-full">Find Similar Projects</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link href="/jobs" passHref>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold transition-colors">
                Browse All Job Opportunities on Zutara
              </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
