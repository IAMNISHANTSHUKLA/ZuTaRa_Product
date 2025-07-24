
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LifeBuoy, BookOpen, Mail } from "lucide-react";

export default function SupportPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary">Help & Support</CardTitle>
            <p className="text-muted-foreground">We're here to help you get the most out of Zutara.</p>
          </CardHeader>
          <CardContent className="space-y-8">
             <div className="text-center">
                <p className="max-w-3xl mx-auto text-lg">
                    Find answers to your questions, learn how to use the platform effectively, and get in touch with our support team.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <BookOpen className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-semibold">Knowledge Base</h3>
                    <p className="text-muted-foreground">Browse our comprehensive articles and guides to find answers quickly.</p>
                </div>
                <div className="flex flex-col items-center">
                    <LifeBuoy className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-semibold">FAQ</h3>
                    <p className="text-muted-foreground">Find answers to frequently asked questions about accounts, projects, and payments.</p>
                </div>
                 <div className="flex flex-col items-center">
                    <Mail className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-xl font-semibold">Contact Us</h3>
                    <p className="text-muted-foreground">Can't find an answer? Contact our support team directly for assistance.</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
