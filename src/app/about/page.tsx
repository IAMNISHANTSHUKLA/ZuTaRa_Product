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
            <CardTitle className="text-4xl font-bold text-primary">About Zutara</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg text-foreground">
            <div className="flex justify-center mb-8">
              <Image 
                src="https://placehold.co/800x400/2E7DAF/FFFFFF?text=Our+Mission" 
                alt="Zutara Mission" 
                width={800} 
                height={400} 
                className="rounded-lg shadow-md"
                data-ai-hint="team collaboration office" 
              />
            </div>
            <p>
              Welcome to Zutara, the premier platform dedicated to bridging the gap between
              talented architects, visionary clients, and aspiring students in the architectural world.
              Our mission is to foster a vibrant ecosystem where creativity thrives, collaborations flourish,
              and careers are built.
            </p>
            <p>
              At Zutara, we believe in the power of connection. Whether you're a seasoned architectural firm
              looking to showcase your portfolio, a client with a dream project waiting to be realized, or a
              student eager to gain hands-on experience through internships, Zutara provides the tools
              and community to make it happen.
            </p>
            <h2 className="text-2xl font-semibold text-accent pt-4">Our Vision</h2>
            <p>
              We envision a future where finding the right architectural talent or project is seamless,
              transparent, and inspiring. By leveraging technology, including AI-powered matching, we aim
              to simplify the discovery process, enabling more meaningful and successful partnerships.
            </p>
            <h2 className="text-2xl font-semibold text-accent pt-4">Why Zutara?</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Curated Network:</strong> Access a community of verified professionals and serious clients.</li>
              <li><strong>Streamlined Process:</strong> Easy-to-use tools for job posting, profile creation, and communication.</li>
              <li><strong>Career Growth:</strong> Opportunities for freelancers to find projects and students to secure internships.</li>
              <li><strong>AI-Powered Insights:</strong> Intelligent matching to connect the right people for the right projects.</li>
            </ul>
            <p className="pt-4">
              Join Zutara today and be a part of revolutionizing how architectural projects come to life.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
