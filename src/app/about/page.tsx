
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">About ZuTaRa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg text-foreground">
            <div className="flex justify-center mb-8">
              <Image 
                src="https://placehold.co/800x400/2E7DAF/FFFFFF?text=About+ZuTaRa" 
                alt="About ZuTaRa Platform" 
                width={800} 
                height={400} 
                className="rounded-lg shadow-md"
                data-ai-hint="global team collaboration"
              />
            </div>
            <p className="text-center max-w-3xl mx-auto text-xl text-muted-foreground">
              ZuTaRa represents the future of creative collaboration, breaking down geographical barriers to unite design professionals with clients who value exceptional work. Our platform is built specifically for designers and architects who understand that great projects know no boundaries.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 pt-8 items-center">
                <div>
                    <Image 
                        src="https://placehold.co/600x400/77B5B0/FFFFFF?text=Our+Ecosystem" 
                        alt="ZuTaRa Ecosystem" 
                        width={600} 
                        height={400} 
                        className="rounded-lg shadow-md"
                        data-ai-hint="diverse minds networking"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-semibold text-accent mb-4">Our Beliefs</h2>
                    <p className="mb-4">
                    We believe that creativity flourishes when diverse minds come together. ZuTaRa creates an ecosystem where innovative design solutions emerge from the intersection of global perspectives, cutting-edge technology, and meaningful professional relationships.
                    </p>
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 pt-8 items-center">
                 <div>
                    <h2 className="text-3xl font-semibold text-accent mb-4">Our Mission</h2>
                    <p className="mb-4">
                    Our mission is simple: to democratize access to world-class design and architectural talent while empowering creative professionals to reach their full potential in the global marketplace.
                    </p>
                 </div>
                 <div>
                    <Image 
                        src="https://placehold.co/600x400/A0A0A0/FFFFFF?text=Global+Marketplace" 
                        alt="ZuTaRa Global Marketplace" 
                        width={600} 
                        height={400} 
                        className="rounded-lg shadow-md"
                        data-ai-hint="world map connections"
                    />
                </div>
            </div>

            <div className="text-center pt-10">
                <p className="text-2xl font-semibold text-primary">
                    Join ZuTaRa - Where Global Creativity Meets Unlimited Opportunity.
                </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
