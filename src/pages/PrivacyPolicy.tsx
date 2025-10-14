import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <SEO 
        title="Privacy Policy - Your Data Protection"
        description="Read TypeMaster's privacy policy. We never collect personal information without consent and never share data with third parties. Learn how we protect your privacy."
        keywords="privacy policy, data protection, user privacy, typing master privacy, cookies policy"
        canonical="/privacy-policy"
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
                Privacy Policy
              </h1>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 md:p-12 shadow-lg">
              <p className="text-lg leading-relaxed text-foreground/90">
                At Typing Master, we care deeply about your privacy. We never ask for personal details such as your full name, address, or payment information. Any information collected, such as typing scores, device type, or time spent on pages, is used only to improve the accuracy and quality of our typing tools. We may use cookies to understand how users interact with the website so we can enhance speed, design, and functionality. These cookies never store personal data or share it with outside parties.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90 mt-6">
                We do not sell, rent, or exchange any user information with third parties. Occasionally, we may display third-party ads through trusted networks like Google AdSense. Those advertisers may use cookies to show you relevant ads. You can disable cookies through your browser settings if you prefer.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90 mt-6">
                By using Typing Master, you agree to this privacy policy and understand that we may update it from time to time. Any future updates will be posted here to keep you informed.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
