"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Eye, Briefcase, DollarSign, Edit3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function FreelancerDashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && userProfile?.role !== 'freelancer') {
      router.push(userProfile?.role === 'client' ? '/client/dashboard' : '/');
    }
  }, [user, userProfile, loading, router]);

  if (loading || !user || userProfile?.role !== 'freelancer') {
    return <div className="flex justify-center items-center h-screen"><p>Loading freelancer dashboard...</p></div>;
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Freelancer Dashboard</h1>
          <p className="text-muted-foreground">Manage your profile, find jobs, and track your earnings.</p>
        </div>
        <Link href="/freelancer/profile">
          <Button variant="outline">
            <Edit3 className="mr-2 h-5 w-5" /> Edit Profile
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <Link href="/jobs/applied" className="text-xs text-primary hover:underline">
              View applications
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,250.00</div>
            <p className="text-xs text-muted-foreground">View earnings report</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommended Jobs</CardTitle>
          <CardDescription>Jobs matched to your skills and profile.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for list of recommended jobs */}
          <p className="text-muted-foreground">No job recommendations available yet.</p>
          <Link href="/jobs">
            <Button variant="link" className="p-0 h-auto mt-2">Browse all jobs</Button>
          </Link>
          {/* AI Job Matcher integration will populate this section */}
        </CardContent>
      </Card>
    </div>
  );
}
