import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsAndConditions = () => {
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
                Terms & Conditions
              </h1>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 md:p-12 shadow-lg">
              <p className="text-lg leading-relaxed text-foreground/90">
                Welcome to Typing Master. By accessing or using our website, you agree to follow these terms and conditions.
                This website is designed for educational and typing practice purposes only.
                You are not allowed to copy, reproduce, or redistribute any part of this site or its content without permission.
                While we try to keep the website accurate and available, we are not responsible for any errors, downtime, or data loss.
                By continuing to use this website, you accept these terms in full.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
