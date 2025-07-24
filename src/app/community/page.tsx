
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, MessageSquare } from "lucide-react";

export default function CommunityPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">Community Hub</CardTitle>
            <p className="text-muted-foreground">Connect, collaborate, and learn with the Zutara community.</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center">
                <p className="max-w-3xl mx-auto text-lg">
                    Welcome to the heart of Zutara. Our community hub is a place for designers, architects, and clients to interact, share ideas, and grow together.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <Users className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-semibold">Forums & Discussions</h3>
                    <p className="text-muted-foreground">Engage in discussions on design trends, software tips, and professional advice.</p>
                </div>
                <div className="flex flex-col items-center">
                    <Calendar className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-semibold">Events & Webinars</h3>
                    <p className="text-muted-foreground">Join exclusive events, workshops, and webinars hosted by industry experts.</p>
                </div>
                 <div className="flex flex-col items-center">
                    <MessageSquare className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-semibold">Networking</h3>
                    <p className="text-muted-foreground">Connect with peers and potential collaborators from around the world.</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
