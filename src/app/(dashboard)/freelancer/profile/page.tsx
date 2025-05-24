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
  skills: z.string().optional(), // Comma-separated for simplicity
  experience: z.string().optional(),
  portfolio: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  // photoURL: z.string().url("Must be a valid URL for photo").optional(), // For file upload, this needs different handling
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function FreelancerProfilePage() {
  const { toast } = useToast();
  const { user, userProfile, updateUserProfile, fetchUserProfile, loading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [photoFile, setPhotoFile] = useState<File | null>(null); // For file upload handling

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
      // If userProfile is not yet loaded but user exists, try fetching
      fetchUserProfile(user.uid);
    }
  }, [userProfile, form, user, authLoading, fetchUserProfile]);


  async function onSubmit(values: ProfileFormData) {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    
    const profileDataToUpdate: Partial<UserProfile> = {
      displayName: values.displayName,
      skills: values.skills?.split(",").map(s => s.trim()).filter(s => s),
      experience: values.experience,
      portfolio: values.portfolio,
    };

    // Placeholder for photoURL update logic if implementing file uploads
    // if (photoFile) { /* ... upload logic ...; profileDataToUpdate.photoURL = uploadedUrl; */ }

    try {
      await updateUserProfile(user.uid, profileDataToUpdate);
      toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast({ title: "Error", description: "Failed to update profile.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  // const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setPhotoFile(event.target.files[0]);
  //     // Optionally display a preview
  //   }
  // };

  if (authLoading) {
     return <div className="flex justify-center items-center h-screen"><p>Loading profile...</p></div>;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Freelancer Profile</CardTitle>
        <CardDescription>Keep your profile up-to-date to attract clients.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4 mb-8">
          <Avatar className="w-24 h-24">
            <AvatarImage src={userProfile?.photoURL || user?.photoURL || `https://placehold.co/96x96/77B5B0/FFFFFF?text=${userProfile?.displayName?.charAt(0) || user?.email?.charAt(0) || 'A'}`} />
            <AvatarFallback>{userProfile?.displayName?.charAt(0) || user?.email?.charAt(0) || "A"}</AvatarFallback>
          </Avatar>
          {/* 
          <div className="relative">
            <Button variant="outline" size="sm" asChild>
              <label htmlFor="photoUpload" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" /> Change Photo
              </label>
            </Button>
            <Input id="photoUpload" type="file" className="absolute opacity-0 w-0 h-0" onChange={handlePhotoChange} accept="image/*" />
          </div>
          {photoFile && <p className="text-sm text-muted-foreground">New: {photoFile.name}</p>}
          */}
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
                    <Input placeholder="Your Name or Company" {...field} />
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
            {/* Add more fields like testimonials here if needed */}
            <Button type="submit" className="w-full" disabled={isSubmitting || authLoading}>
              {isSubmitting ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
