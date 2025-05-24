"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { PlusCircle, Briefcase, Users, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function ClientDashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && userProfile?.role !== 'client') {
      // If user is logged in but not a client, redirect them appropriately
      // For example, to freelancer dashboard or a role mismatch page
      router.push(userProfile?.role === 'freelancer' ? '/freelancer/dashboard' : '/');
    }
  }, [user, userProfile, loading, router]);

  if (loading || !user || userProfile?.role !== 'client') {
    // Show loading state or null if redirection is about to happen
    return <div className="flex justify-center items-center h-screen"><p>Loading client dashboard...</p></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and find talented architects.</p>
        </div>
        <Link href="/client/post-job">
          <Button>
            <PlusCircle className="mr-2 h-5 w-5" /> Post a New Job
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proposals Received</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">View and manage proposals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Unread</div>
            <p className="text-xs text-muted-foreground">Communicate with freelancers</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Job Postings</CardTitle>
          <CardDescription>Your recently posted jobs.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for list of job postings */}
          <p className="text-muted-foreground">You haven't posted any jobs yet.</p>
          <Link href="/client/post-job" className="text-sm">
            <Button variant="link" className="p-0 h-auto mt-2">Post your first job</Button>
          </Link>
        </CardContent>
      </Card>
       {/* Placeholder for AI Candidate Matcher integration */}
       <Card>
        <CardHeader>
          <CardTitle>AI Candidate Matcher</CardTitle>
          <CardDescription>Find the best freelancers for your project using AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Feature coming soon. Enter a job description to find matching candidates.</p>
          {/* Input for job description and button to trigger AI matching can go here */}
        </CardContent>
      </Card>
    </div>
  );
}
