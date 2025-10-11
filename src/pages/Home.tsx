import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Timer, Trophy, Settings, Keyboard } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Practice Mode",
      description: "Improve your typing with unlimited practice",
      icon: Brain,
      path: "/practice",
      gradient: "from-primary to-primary-glow",
    },
    {
      title: "Test Mode",
      description: "Timed tests to measure your speed",
      icon: Timer,
      path: "/test",
      gradient: "from-accent to-primary",
    },
    {
      title: "Leaderboard",
      description: "See top scores and compete",
      icon: Trophy,
      path: "/leaderboard",
      gradient: "from-success to-primary",
    },
    {
      title: "Settings",
      description: "Customize your typing experience",
      icon: Settings,
      path: "/settings",
      gradient: "from-muted-foreground to-foreground",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Keyboard className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              TypeMaster
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Master your typing skills with practice and tests
          </p>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.path}
                className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-glow hover:-translate-y-1 border-2 hover:border-primary"
                onClick={() => navigate(item.path)}
              >
                <div className="p-8">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-card-foreground">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              </Card>
            );
          })}
        </div>
      </main>

      <footer className="py-6 text-center text-muted-foreground">
        <p>Press any key to start typing • ESC to return home</p>
      </footer>
    </div>
  );
};

export default Home;
