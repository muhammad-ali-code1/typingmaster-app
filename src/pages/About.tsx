import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const About = () => {
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
                About Us
              </h1>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 md:p-12 shadow-lg">
              <p className="text-lg leading-relaxed text-foreground/90">
                Typing Master is a simple yet powerful web-based platform built to help people improve typing speed, accuracy, and confidence. Our mission is to make learning efficient through practice and fun challenges. We designed Typing Master for students, professionals, and anyone who wants to type faster on any device.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90 mt-6">
                We provide different modes such as Practice, Test, and Speed Check to track progress in real time. Each exercise is carefully designed to strengthen finger movement, increase speed, and reduce typing errors.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90 mt-6">
                Our goal is to create a free and accessible learning tool that supports education and digital growth worldwide. We are continuously improving our system to provide a better user experience with accurate results and a clean, distraction-free interface.
              </p>
              <p className="text-lg leading-relaxed text-foreground/90 mt-6">
                At Typing Master, we believe that small daily efforts can lead to big achievements. Thank you for choosing us as your typing partner!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
