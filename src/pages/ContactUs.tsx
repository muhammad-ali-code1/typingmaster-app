import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
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
              <p className="text-lg leading-relaxed text-foreground/90 mb-8">
                If you have any questions, suggestions, or issues, we'd love to hear from you!
              </p>
              
              <div className="flex items-center gap-3 justify-center">
                <Mail className="w-6 h-6 text-primary" />
                <a 
                  href="mailto:officialmuhmmadali@gmail.com"
                  className="text-xl text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  officialmuhmmadali@gmail.com
                </a>
              </div>

              <p className="text-lg leading-relaxed text-foreground/90 mt-8 text-center">
                We'll do our best to reply as soon as possible and help you improve your typing experience.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
