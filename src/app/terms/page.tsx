
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2>1. Introduction</h2>
            <p>Welcome to Zutara! These Terms of Service ("Terms") govern your use of our website, products, and services. By using Zutara, you agree to these Terms.</p>

            <h2>2. User Accounts</h2>
            <p>You must provide accurate information when creating your account. You are responsible for safeguarding your account and for all activities that occur under it.</p>

            <h2>3. User Conduct</h2>
            <p>You agree not to use Zutara for any unlawful purpose or to engage in any conduct that is harmful, fraudulent, or otherwise objectionable.</p>
            
            <h2>4. Intellectual Property</h2>
            <p>You retain ownership of the content you post on Zutara. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display it in connection with the service.</p>

            <h2>5. Termination</h2>
            <p>We may terminate or suspend your account at any time, without prior notice or liability, for any reason, including if you breach these Terms.</p>
            
            <h2>6. Disclaimers and Limitation of Liability</h2>
            <p>Zutara is provided "as is" without any warranties. We are not liable for any indirect, incidental, or consequential damages.</p>

            <h2>7. Governing Law</h2>
            <p>These Terms shall be governed by the laws of the jurisdiction in which our company is based, without regard to its conflict of law provisions.</p>
            
            <h2>8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms on this page.</p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us through our support page.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
