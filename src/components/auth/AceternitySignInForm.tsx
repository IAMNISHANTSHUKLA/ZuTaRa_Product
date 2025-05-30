
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import type { UserProfile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label"; 
import { Input } from "@/components/ui/input"; 
import { IconBrandGoogle } from "@tabler/icons-react";

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default function AceternitySignInForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Success", description: "Signed in successfully." });
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userProfile = userDoc.data() as UserProfile;
          if (userProfile.role === 'client') {
            router.push("/client/dashboard");
          } else if (userProfile.role === 'freelancer') {
            router.push("/freelancer/dashboard");
          } else {
            // If role is not set, redirect to home, user might need to complete profile
            toast({ title: "Profile Incomplete", description: "Please complete your profile information."});
            router.push("/"); 
          }
        } else {
          // Should ideally not happen if user signed up correctly, but as a fallback
           toast({ title: "Profile Not Found", description: "Please complete your profile information."});
          router.push("/"); 
        }
      } else {
        router.push("/"); 
      }
    } catch (error: any) {
      console.error("Sign In Error:", error);
      let description = "Failed to sign in. Please try again.";
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        description = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.code === "auth/invalid-email") {
        description = "The email address is not valid. Please enter a valid email.";
      }
      toast({
        title: "Sign In Error",
        description: description,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      let userProfileData: UserProfile;

      if (userDoc.exists()) {
        userProfileData = userDoc.data() as UserProfile;
        // Ensure role is explicitly null if undefined from Firestore
        if (userProfileData.role === undefined) userProfileData.role = null; 
        // Merge photoURL in case it changed
        await setDoc(doc(db, "users", user.uid), { photoURL: user.photoURL }, { merge: true }); 
      } else {
        // New user via Google, role will be null initially
        userProfileData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: null, 
        };
        await setDoc(doc(db, "users", user.uid), userProfileData);
      }
      
      toast({ title: "Signed in with Google", description: userProfileData.role ? "Welcome back to Zutara!" : "Welcome to Zutara! Please select your role or complete your profile." });

      if (userProfileData.role === 'client') {
        router.push("/client/dashboard");
      } else if (userProfileData.role === 'freelancer') {
        router.push("/freelancer/dashboard");
      } else {
        // If role is null (e.g., new Google Sign-In user), redirect to home or a profile completion page.
        // For now, redirecting to home. You might want a dedicated page for role selection.
        router.push("/");
      }

    } catch (error: any) {
      console.error("Google Sign In Error:", error);
      toast({
        title: "Google Sign In Error",
        description: error.message || "Failed to sign in with Google.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome Back to Zutara
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Sign in to access your Zutara account.
      </p>

      <form className="my-8" onSubmit={handleEmailSignIn}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in →"}
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            type="button"
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {loading ? "Processing..." : "Sign in with Google"}
            </span>
            <BottomGradient />
          </button>
        </div>
        <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-300">
          Don&apos;t have a Zutara account?{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
