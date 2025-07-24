
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, create or modify your profile, post projects, or communicate with other users. This information may include your name, email address, portfolio, and other professional details.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, including to facilitate payments, connect clients and freelancers, and send administrative messages.</p>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>We may share your information with other users to facilitate project collaboration. We may also share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</p>
            
            <h2>4. Data Security</h2>
            <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>

            <h2>5. Your Choices</h2>
            <p>You may update, correct, or delete information about you at any time by logging into your online account or emailing us. If you wish to delete or deactivate your account, please contact us, but note that we may retain certain information as required by law or for legitimate business purposes.</p>

            <h2>6. Cookies</h2>
            <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>

            <h2>7. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

            <h2>8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
