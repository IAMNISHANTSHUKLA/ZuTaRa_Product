
import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import JobListingsPageContent from '@/components/jobs/JobListingsPageContent';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Metadata should be defined at the top level of the page component
export const metadata: Metadata = {
  title: 'Zutara - Job Listings',
  description: 'Find architecture and design jobs on Zutara.',
};

export default function JobListingsPage() { // This is the top-level page component
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div className="flex justify-center items-center h-screen"><p>Loading Zutara job listings...</p></div>}>
          <JobListingsPageContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

    