import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TypingArea from "@/components/TypingArea";
import StatsDisplay from "@/components/StatsDisplay";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { generateText } from "@/lib/textGenerator";

const Practice = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");

  const resetPractice = useCallback(() => {
    setText(generateText(difficulty));
    setCurrentIndex(0);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
  }, [difficulty]);

  useEffect(() => {
    resetPractice();
  }, [resetPractice]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  const handleTyping = (typedChar: string) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const isCorrect = typedChar === text[currentIndex];
    
    if (!isCorrect) {
      setMistakes((prev) => prev + 1);
    }

    setCurrentIndex((prev) => prev + 1);

    // Calculate stats
    const newIndex = currentIndex + 1;
    const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
    const wordsTyped = newIndex / 5;
    const newWpm = Math.round(wordsTyped / (timeElapsed || 0.01));
    const newAccuracy = Math.round(((newIndex - mistakes - (isCorrect ? 0 : 1)) / newIndex) * 100);

    setWpm(newWpm);
    setAccuracy(newAccuracy);

    // Generate new text when finished
    if (newIndex >= text.length) {
      setTimeout(resetPractice, 1000);
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
          <h1 className="text-2xl font-bold">Practice Mode</h1>
          <div className="flex gap-2">
            {(["easy", "medium", "hard"] as const).map((level) => (
              <Button
                key={level}
                variant={difficulty === level ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setDifficulty(level);
                  resetPractice();
                }}
                className="capitalize"
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <StatsDisplay wpm={wpm} accuracy={accuracy} mistakes={mistakes} />
          
          <TypingArea
            text={text}
            currentIndex={currentIndex}
            onTyping={handleTyping}
          />

          <div className="flex justify-center">
            <Button
              onClick={resetPractice}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Practice;
