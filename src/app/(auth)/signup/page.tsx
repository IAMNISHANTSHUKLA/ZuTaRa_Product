import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

// Wrapper component to allow SignUpForm to use useSearchParams
function SignUpPageContent() {
  return <SignUpForm />;
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
       <Link href="/" className="mb-8">
         <Image src="https://placehold.co/200x70/2E7DAF/white?text=ArchConnect" alt="ArchConnect Logo" width={180} height={60} data-ai-hint="logo building" />
       </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <SignUpPageContent />
      </Suspense>
    </div>
  );
}
