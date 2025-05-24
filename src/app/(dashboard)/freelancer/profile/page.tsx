
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import type { UserProfile } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

const profileSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters."),
  skills: z.string().optional(), 
  experience: z.string().optional(),
  portfolio: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function FreelancerProfilePage() {
  const { toast } = useToast();
  const { user, userProfile, updateUserProfile, fetchUserProfile, loading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: "",
      skills: "",
      experience: "",
      portfolio: "",
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        displayName: userProfile.displayName || "",
        skills: userProfile.skills?.join(", ") || "",
        experience: userProfile.experience || "",
        portfolio: userProfile.portfolio || "",
      });
    } else if (user && !authLoading) {
      fetchUserProfile(user.uid);
    }
  }, [userProfile, form, user, authLoading, fetchUserProfile]);


  async function onSubmit(values: ProfileFormData) {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to update your Zutara profile.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    
    const profileDataToUpdate: Partial<UserProfile> = {
      displayName: values.displayName,
      skills: values.skills?.split(",").map(s => s.trim()).filter(s => s),
      experience: values.experience,
      portfolio: values.portfolio,
    };

    try {
      await updateUserProfile(user.uid, profileDataToUpdate);
      toast({ title: "Zutara Profile Updated", description: "Your Zutara profile has been successfully updated." });
    } catch (error) {
      console.error("Zutara Profile Update Error:", error);
      toast({ title: "Error", description: "Failed to update Zutara profile.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }


  if (authLoading) {
     return <div className="flex justify-center items-center h-screen"><p>Loading Zutara profile...</p></div>;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Zutara Freelancer Profile</CardTitle>
        <CardDescription>Keep your Zutara profile up-to-date to attract clients.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4 mb-8">
          <Avatar className="w-24 h-24">
            <AvatarImage src={userProfile?.photoURL || user?.photoURL || `https://placehold.co/96x96/77B5B0/FFFFFF?text=${userProfile?.displayName?.charAt(0) || user?.email?.charAt(0) || 'Z'}`} />
            <AvatarFallback>{userProfile?.displayName?.charAt(0) || user?.email?.charAt(0) || "Z"}</AvatarFallback>
          </Avatar>
          {/* File upload for photo is commented out, can be re-enabled later */}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name or Company on Zutara" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Revit, Sustainable Design, Project Management (comma-separated)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Briefly describe your professional experience, years in the field, notable achievements."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio Link (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourportfolio.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting || authLoading}>
              {isSubmitting ? "Saving to Zutara..." : "Save Zutara Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
