"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generateJobPost } from "@/ai/flows/job-post-generator"; // AI feature
import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const jobPostSchema = z.object({
  projectDescription: z.string().min(10, { message: "Project description must be at least 10 characters." }).optional(),
  jobTitle: z.string().min(5, { message: "Job title must be at least 5 characters." }),
  jobDescription: z.string().min(20, { message: "Detailed description must be at least 20 characters." }),
  requiredSkills: z.string().min(3, { message: "Please list at least one skill." }), // Comma-separated string for simplicity
  budget: z.string().min(1, { message: "Budget is required." }),
  deadline: z.string().min(1, { message: "Deadline is required." }), // Could use a date picker
});

type JobPostFormData = z.infer<typeof jobPostSchema>;

export default function PostJobPage() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      projectDescription: "",
      jobTitle: "",
      jobDescription: "",
      requiredSkills: "",
      budget: "",
      deadline: "",
    },
  });

  async function handleGenerateJobPost() {
    const projectDesc = form.getValues("projectDescription");
    if (!projectDesc || projectDesc.length < 10) {
      toast({
        title: "Error",
        description: "Please provide a brief project description (min 10 characters) to generate a job post.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateJobPost({ projectDescription: projectDesc });
      form.setValue("jobTitle", result.jobTitle);
      form.setValue("jobDescription", result.jobDescription);
      form.setValue("requiredSkills", result.requiredSkills);
      form.setValue("budget", result.budget);
      form.setValue("deadline", result.deadline);
      toast({ title: "Success", description: "Job post draft generated!" });
    } catch (error) {
      console.error("AI Job Post Generation Error:", error);
      toast({
        title: "AI Generation Error",
        description: "Could not generate job post. Please try again or fill manually.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  async function onSubmit(values: JobPostFormData) {
    setIsSubmitting(true);
    // Here you would typically save the job post to your database (e.g., Firestore)
    console.log("Job Post Submitted:", values);
    // Example: await addDoc(collection(db, "jobPosts"), { ...values, clientId: user.uid, createdAt: new Date() });
    
    setTimeout(() => { // Simulate API call
      toast({
        title: "Job Posted!",
        description: "Your job listing has been successfully created.",
      });
      form.reset();
      setIsSubmitting(false);
      // router.push("/client/dashboard"); // Optional: Redirect after posting
    }, 1000);
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create a New Job Post</CardTitle>
        <CardDescription>Fill in the details for your project to find the best talent.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Project Description (for AI)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Design a modern minimalist 3-bedroom house with a focus on sustainability."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <Button type="button" onClick={handleGenerateJobPost} disabled={isGenerating} className="mt-2">
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isGenerating ? "Generating..." : "Generate with AI"}
                  </Button>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Residential Architect for New Build" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a comprehensive description of the project, scope of work, deliverables, etc."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requiredSkills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., AutoCAD, Revit, 3D Modeling, Sustainable Design (comma-separated)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., $5,000 - $10,000 or Fixed Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Deadline</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 3 Months or YYYY-MM-DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting || isGenerating}>
              {isSubmitting ? "Submitting..." : "Post Job"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
