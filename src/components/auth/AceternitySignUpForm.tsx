
"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import type { UserProfile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label"; // Will use the new Aceternity Label
import { Input } from "@/components/ui/input"; // Will use the new Aceternity Input
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

function AceternitySignUpFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "freelancer" | undefined>(() => {
      const roleFromQuery = searchParams.get('role');
      if (roleFromQuery === 'client' || roleFromQuery === 'freelancer') {
          return roleFromQuery;
      }
      return undefined;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const roleFromQuery = searchParams.get('role');
    if (roleFromQuery === 'client' || roleFromQuery === 'freelancer') {
      setRole(roleFromQuery);
    }
  }, [searchParams]);


  const handleEmailSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!role) {
      toast({ title: "Error", description: "Please select a role.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const displayName = `${firstName} ${lastName}`.trim();
      await updateProfile(user, { displayName });

      const userProfileData: UserProfile = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        role: role,
      };
      await setDoc(doc(db, "users", user.uid), userProfileData);

      toast({ title: "Success", description: "Account created successfully! Please sign in." });
      router.push("/signin");
    } catch (error: any) {
      console.error("Sign Up Error:", error);
      if (error.code) {
        console.error("Firebase Error Code:", error.code);
      }
      toast({
        title: "Sign Up Error",
        description: error.message || "Failed to create account.",
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

      if (!userDoc.exists() || !userDoc.data()?.role) {
        // New user or existing user without a role
        const userProfileData: Partial<UserProfile> = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: userDoc.exists() ? userDoc.data()?.role || null : null, // Preserve existing role if any, else null
        };
        await setDoc(doc(db, "users", user.uid), userProfileData, { merge: true });
        toast({ title: "Signed in with Google", description: "Welcome! Please complete your profile if needed." });
         // Redirect to dashboard or a role selection page if role is null
        if (!userProfileData.role) {
            // Potentially redirect to a page to select role or rely on dashboard to prompt
            router.push(userProfileData.role === 'client' ? '/client/dashboard' : userProfileData.role === 'freelancer' ? '/freelancer/dashboard' : '/');
        } else {
            router.push(userProfileData.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard');
        }

      } else {
         // Existing user with a role
        toast({ title: "Signed in with Google", description: "Welcome back!" });
        const existingProfile = userDoc.data() as UserProfile;
        router.push(existingProfile.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard');
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
        Join Zutara
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Create your account to connect with architects and clients.
      </p>

      <form className="my-8" onSubmit={handleEmailSignUp}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Ada" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Lovelace" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="ada.lovelace@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </LabelInputContainer>
        
        <LabelInputContainer className="mb-8">
            <Label htmlFor="role">I am a...</Label>
            <Select 
                value={role} 
                onValueChange={(value: "client" | "freelancer") => setRole(value)}
            >
                <SelectTrigger id="role" className="bg-gray-50 dark:bg-zinc-800 dark:text-white">
                    <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="client">Client (Looking to hire)</SelectItem>
                    <SelectItem value="freelancer">Freelancer/Architect</SelectItem>
                </SelectContent>
            </Select>
            {!role && <p className="text-xs text-red-500">Please select a role.</p>}
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up →"}
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
              {loading ? "Processing..." : "Sign up with Google"}
            </span>
            <BottomGradient />
          </button>
        </div>
         <p className="mt-8 text-center text-sm text-neutral-600 dark:text-neutral-300">
          Already have an account?{" "}
          <Link href="/signin" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function AceternitySignUpForm() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <AceternitySignUpFormContent />
    </Suspense>
  )
}
