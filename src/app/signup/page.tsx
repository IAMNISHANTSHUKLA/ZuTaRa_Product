
"use client";

import AceternitySignUpForm from "@/components/auth/AceternitySignUpForm";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
       <Link href="/" className="mb-8">
         <Image src="https://storage.googleapis.com/project-spark-312117-web-assets/v1/projects/studio-default-project/uploads/d3d8e577-4b8f-43b2-9a84-0a377fc32d80.png" alt="Zutara Logo" width={180} height={60} data-ai-hint="logo" className="object-contain" />
       </Link>
       <AceternitySignUpForm />
    </div>
  );
}
