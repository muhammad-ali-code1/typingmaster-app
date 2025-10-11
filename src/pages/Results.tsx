import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Target, AlertCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  const { wpm = 0, accuracy = 0, mistakes = 0, timeLimit = 60 } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  const saveScore = () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    leaderboard.push({
      name: name.trim(),
      wpm,
      accuracy,
      date: new Date().toISOString(),
    });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    setSaved(true);
    toast.success("Score saved to leaderboard!");
  };

  const getPerformanceMessage = () => {
    if (wpm >= 80) return "Outstanding! 🎉";
    if (wpm >= 60) return "Great job! 👏";
    if (wpm >= 40) return "Good effort! 💪";
    return "Keep practicing! 📈";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <div className="inline-flex p-6 rounded-full bg-gradient-primary mb-4">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Test Complete!</h1>
          <p className="text-xl text-muted-foreground">{getPerformanceMessage()}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card className="p-6 text-center border-2 border-primary">
            <Target className="w-8 h-8 mx-auto mb-3 text-primary" />
            <div className="text-4xl font-bold text-primary mb-1">{wpm}</div>
            <div className="text-sm text-muted-foreground">Words Per Minute</div>
          </Card>

          <Card className="p-6 text-center border-2 border-success">
            <Trophy className="w-8 h-8 mx-auto mb-3 text-success" />
            <div className="text-4xl font-bold text-success mb-1">{accuracy}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </Card>

          <Card className="p-6 text-center">
            <AlertCircle className="w-8 h-8 mx-auto mb-3 text-error" />
            <div className="text-4xl font-bold text-error mb-1">{mistakes}</div>
            <div className="text-sm text-muted-foreground">Mistakes</div>
          </Card>

          <Card className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
            <div className="text-4xl font-bold mb-1">{timeLimit / 60}</div>
            <div className="text-sm text-muted-foreground">
              {timeLimit === 60 ? "Minute" : "Minutes"}
            </div>
          </Card>
        </div>

        {!saved ? (
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="name">Save to Leaderboard</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && saveScore()}
              />
            </div>
            <Button onClick={saveScore} className="w-full" size="lg">
              Save Score
            </Button>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-success/10 border border-success rounded-lg text-center">
            <p className="text-success font-medium">✓ Score saved successfully!</p>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/test")}
            className="flex-1"
          >
            Try Again
          </Button>
          <Button
            onClick={() => navigate("/leaderboard")}
            className="flex-1"
          >
            View Leaderboard
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex-1"
          >
            Home
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Results;
