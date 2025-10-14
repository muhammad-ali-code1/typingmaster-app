import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import SEO from "@/components/SEO";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <SEO 
        title="Contact Us - Get Support & Send Feedback"
        description="Contact TypeMaster for support, feedback, or collaboration. We respond within 48 hours. Email us at officialmuhammadali008@gmail.com for any questions or suggestions."
        keywords="contact typing master, customer support, feedback, help, typing test support, contact us"
        canonical="/contact-us"
      />
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/50 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              TypeMaster
            </h1>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Contact Us
              </h1>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 md:p-12 shadow-lg">
              <p className="text-lg leading-relaxed text-foreground/90">
                We value your feedback and questions. If you have any issues, suggestions, or collaboration ideas, please reach out to us. Our team at Typing Master is committed to supporting users and improving the website based on your needs.
              </p>
              
              <p className="text-lg leading-relaxed text-foreground/90 mt-6">
                You can contact us directly through email at:
              </p>

              <div className="flex items-center gap-3 justify-center my-6">
                <Mail className="w-6 h-6 text-primary" />
                <a 
                  href="mailto:officialmuhammadali008@gmail.com"
                  className="text-xl text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  officialmuhammadali008@gmail.com
                </a>
              </div>

              <p className="text-lg leading-relaxed text-foreground/90">
                We aim to respond to all messages within 48 hours. Please include clear details about your question or concern so we can assist you quickly.
              </p>

              <p className="text-lg leading-relaxed text-foreground/90 mt-6">
                If you notice technical problems, spelling errors, or any bug in the typing test, kindly mention the device and browser you are using — this helps us fix issues faster.
              </p>

              <p className="text-lg leading-relaxed text-foreground/90 mt-6">
                We are constantly working to enhance your learning experience, and your input makes a big difference. Thank you for being part of the Typing Master community and helping us grow together.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
