import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Moon, Sun, Volume2, VolumeX } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    const isSoundEnabled = localStorage.getItem("soundEnabled") !== "false";
    setDarkMode(isDark);
    setSoundEnabled(isSoundEnabled);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem("darkMode", String(newValue));
    
    if (newValue) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleSound = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    localStorage.setItem("soundEnabled", String(newValue));
  };

  const clearLeaderboard = () => {
    if (confirm("Are you sure you want to clear the leaderboard? This cannot be undone.")) {
      localStorage.removeItem("leaderboard");
      alert("Leaderboard cleared!");
    }
  };

  const resetPracticeProgress = () => {
    if (confirm("Are you sure you want to reset your practice progress? This cannot be undone.")) {
      localStorage.removeItem("bestPracticeLevel");
      alert("Practice progress reset!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Appearance</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-primary" />
                )}
                <Label htmlFor="dark-mode" className="text-base cursor-pointer">
                  Dark Mode
                </Label>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Audio</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-primary" />
                ) : (
                  <VolumeX className="w-5 h-5 text-muted-foreground" />
                )}
                <Label htmlFor="sound" className="text-base cursor-pointer">
                  Typing Sounds
                </Label>
              </div>
              <Switch
                id="sound"
                checked={soundEnabled}
                onCheckedChange={toggleSound}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Data</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Clear Leaderboard</Label>
                  <p className="text-sm text-muted-foreground">
                    Remove all saved scores
                  </p>
                </div>
                <Button variant="destructive" onClick={clearLeaderboard}>
                  Clear
                </Button>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <Label className="text-base">Reset Practice Progress</Label>
                  <p className="text-sm text-muted-foreground">
                    Reset your progressive practice level
                  </p>
                </div>
                <Button variant="destructive" onClick={resetPracticeProgress}>
                  Reset
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-muted-foreground mb-2">
              TypeMaster v1.0
            </p>
            <p className="text-sm text-muted-foreground">
              Improve your typing speed and accuracy with practice and timed tests.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
