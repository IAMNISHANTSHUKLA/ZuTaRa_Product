
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const freelancerPlans = [
  { name: "Starter", price: "Free", features: ["Profile Creation", "Basic Features", "Community Access"], cta: "Get Started", href:"/signup?role=freelancer" },
  { name: "Professional", price: "Contact Us", features: ["Advanced Portfolio Tools", "Priority Matching", "Dedicated Support"], cta: "Learn More", href:"#" },
  { name: "Enterprise", price: "Custom", features: ["White-Label Solutions", "Team Management", "API Access"], cta: "Request Demo", href:"#" },
];

const clientPlans = [
  { name: "Project-Based", price: "Pay Per Project", features: ["No Monthly Fees", "Access Global Talent", "Secure Escrow"], cta: "Post a Project", href:"/client/post-job" },
  { name: "Subscription", price: "Contact Us", features: ["Discounted Rates", "Ongoing Design Needs", "Dedicated Account Manager"], cta: "Learn More", href:"#" },
  { name: "Enterprise", price: "Custom", features: ["Custom Solutions", "Large Organizations", "Volume Discounts"], cta: "Request Demo", href:"#" },
];

export default function PricingPlansSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Pricing & Plans</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Flexible options for creative professionals and clients of all sizes on ZuTaRa.</p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center text-primary mb-8">For Freelancers</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {freelancerPlans.map(plan => (
              <Card key={plan.name} className="flex flex-col">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-foreground">{plan.price}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                  {plan.features.map(feature => (
                    <div key={feature} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                <div className="p-6 mt-auto">
                  <Link href={plan.href}>
                    <Button className="w-full" variant={plan.name === "Starter" ? "default" : "outline"}>{plan.cta}</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-center text-accent mb-8">For Clients</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {clientPlans.map(plan => (
              <Card key={plan.name} className="flex flex-col">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-foreground">{plan.price}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-3">
                  {plan.features.map(feature => (
                    <div key={feature} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </CardContent>
                 <div className="p-6 mt-auto">
                  <Link href={plan.href}>
                    <Button className="w-full" variant={plan.name === "Project-Based" ? "default" : "outline"} style={plan.name !== "Project-Based" ? {borderColor: 'hsl(var(--accent))', color: 'hsl(var(--accent))'} : {}}>{plan.cta}</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <p className="text-center text-muted-foreground mt-12 text-sm">All plans include secure payment processing, customer support, and access to our collaboration tools.</p>
      </div>
    </section>
  );
}
