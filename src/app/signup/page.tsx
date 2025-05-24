"use client";

import AceternitySignUpForm from "@/components/auth/AceternitySignUpForm";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
       <Link href="/" className="mb-8">
         <Image src="https://placehold.co/200x70/2E7DAF/white?text=Zutara" alt="Zutara Logo" width={180} height={60} data-ai-hint="logo building" />
       </Link>
       <AceternitySignUpForm />
    </div>
  );
}
