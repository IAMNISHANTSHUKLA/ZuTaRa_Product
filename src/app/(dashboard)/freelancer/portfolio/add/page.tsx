
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

const addProjectSchema = z.object({
  title: z.string().min(5, "Project title must be at least 5 characters."),
  category: z.string({ required_error: "Please select a project category." }),
  description: z.string().min(20, "Description must be at least 20 characters."),
  projectImage: z.any().optional(), // In a real app, handle file uploads with more specific validation
  client: z.string().optional(),
  timeline: z.string().optional(),
});

type AddProjectFormData = z.infer<typeof addProjectSchema>;

export default function AddProjectPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddProjectFormData>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      client: "",
      timeline: "",
    },
  });

  async function onSubmit(values: AddProjectFormData) {
    setIsSubmitting(true);
    console.log("New Project Data:", values);
    
    // Here you would typically handle the form submission, e.g.:
    // 1. Upload the image to Firebase Storage.
    // 2. Get the image URL.
    // 3. Save the project data (including the image URL) to Firestore.

    setTimeout(() => {
      toast({
        title: "Project Added!",
        description: `"${values.title}" has been added to your portfolio.`,
      });
      form.reset();
      // Optionally redirect to portfolio page:
      // router.push('/freelancer/portfolio');
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Add New Portfolio Project</CardTitle>
        <CardDescription>Fill out the details below to showcase your work.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Downtown Mixed-Use Development" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Category</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the main category of your project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Architecture">Architecture</SelectItem>
                      <SelectItem value="Interior Design">Interior Design</SelectItem>
                      <SelectItem value="Urban Planning">Urban Planning</SelectItem>
                      <SelectItem value="Conceptual Design">Conceptual Design</SelectItem>
                      <SelectItem value="Technical Drawings">Technical Drawings</SelectItem>
                      <SelectItem value="3D Visualization">3D Visualization</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the project, your role, the challenges, and the outcome."
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
                control={form.control}
                name="projectImage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Main Project Image</FormLabel>
                        <FormControl>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary/80">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                    <Input id="dropzone-file" type="file" className="hidden" onChange={(e) => field.onChange(e.target.files)} />
                                </label>
                            </div> 
                        </FormControl>
                        <FormDescription>
                            This will be the main cover image for your project.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <FormField
                    control={form.control}
                    name="client"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Client (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., GreenLiving Developers" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Project Timeline (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 6 Months, or Jan 2023 - Jun 2023" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Adding Project..." : "Add Project to Portfolio"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
