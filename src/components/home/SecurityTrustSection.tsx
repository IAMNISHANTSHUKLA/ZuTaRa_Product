
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Lock, Users } from "lucide-react";

export default function SecurityTrustSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Security & Trust on ZuTaRa</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Your data, intellectual property, and collaborations are protected with industry-leading security measures.</p>
        </div>
        <Card className="max-w-3xl mx-auto bg-card/80 border-none shadow-lg">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-start space-x-4">
              <ShieldCheck className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-foreground">Bank-Level Security Protocols</h3>
                <p className="text-muted-foreground">
                  ZuTaRa employs robust security protocols to protect user data, financial information, and intellectual property. Our platform undergoes regular security audits and maintains compliance with international data protection standards.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Lock className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-foreground">Reputation-Based System</h3>
                <p className="text-muted-foreground">
                  We've built a system that promotes transparency and accountability. Every interaction is documented, and both clients and freelancers contribute to a comprehensive feedback system that maintains high standards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
