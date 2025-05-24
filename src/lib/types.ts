import type { User as FirebaseUser } from "firebase/auth";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  role: "client" | "freelancer" | "admin" | null; // Added admin and null for flexibility
  // Add other profile fields as needed
  skills?: string[];
  experience?: string;
  portfolio?: string;
  testimonials?: string[];
}

export interface JobPost {
  id?: string;
  clientId: string;
  title: string;
  description: string;
  requiredSkills: string[];
  budget: string; // Could be a number or range string
  deadline: string; // Consider using Date type or ISO string
  createdAt: Date;
  updatedAt?: Date;
  status: "open" | "in-progress" | "closed";
}

// Extended FirebaseUser with our custom user profile data
export interface AuthUser extends FirebaseUser {
  profile?: UserProfile;
}
