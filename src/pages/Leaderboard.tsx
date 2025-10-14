import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react";
import SEO from "@/components/SEO";

interface LeaderboardEntry {
  name: string;
  wpm: number;
  accuracy: number;
  date: string;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem("leaderboard");
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries);
      setEntries(parsed.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.wpm - a.wpm));
    }
  }, []);

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Leaderboard - Top Typing Scores"
        description="View top typing test scores and compete with other typists. Check the best WPM scores and accuracy rates. Challenge yourself to reach the top of the leaderboard."
        keywords="typing leaderboard, top typing scores, typing competition, best WPM scores, typing rankings, fastest typists"
        canonical="/leaderboard"
      />
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
          <h1 className="text-2xl font-bold">Leaderboard</h1>
          <div className="w-24" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {entries.length === 0 ? (
            <Card className="p-12 text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">No Scores Yet</h2>
              <p className="text-muted-foreground mb-6">
                Complete a test to see your score on the leaderboard!
              </p>
              <Button onClick={() => navigate("/test")}>Take a Test</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {entries.map((entry, index) => (
                <Card
                  key={`${entry.name}-${entry.date}`}
                  className={`p-6 transition-all duration-300 hover:shadow-glow ${
                    index < 3 ? "border-2 border-primary" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12">
                      {getRankIcon(index)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{entry.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        {entry.wpm}
                      </div>
                      <div className="text-sm text-muted-foreground">WPM</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-success">
                        {entry.accuracy}%
                      </div>
                      <div className="text-sm text-muted-foreground">Accuracy</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
