
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
import { Label } from "@/components/ui/label"; // Aceternity Label
import { Input } from "@/components/ui/input"; // Aceternity Input
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
      // Fetch user profile after sign-in to determine role and redirect
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
            router.push("/"); // Fallback if role is not set or unknown
          }
        } else {
          router.push("/"); // Fallback if profile doesn't exist (shouldn't happen for email sign-in)
        }
      } else {
        router.push("/"); // Fallback
      }
    } catch (error: any) {
      console.error("Sign In Error:", error);
      toast({
        title: "Sign In Error",
        description: error.message || "Failed to sign in.",
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
        // If user exists but role is somehow missing, set it to null
        if (userProfileData.role === undefined) userProfileData.role = null;
         await setDoc(doc(db, "users", user.uid), { photoURL: user.photoURL }, { merge: true }); // Update photoURL
      } else {
        // New user via Google
        userProfileData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: null, // Role needs to be set post-registration
        };
        await setDoc(doc(db, "users", user.uid), userProfileData);
      }
      
      toast({ title: "Signed in with Google", description: userDoc.exists() && userDoc.data()?.role ? "Welcome back!" : "Welcome! Please complete your profile if prompted." });

      if (userProfileData.role === 'client') {
        router.push("/client/dashboard");
      } else if (userProfileData.role === 'freelancer') {
        router.push("/freelancer/dashboard");
      } else {
        // If role is null (e.g., new Google user), redirect to home or a profile completion page.
        // For now, let's redirect to home. The dashboard/profile page should handle prompting for role.
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
        Welcome Back to ArchConnect
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Sign in to access your account.
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
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
