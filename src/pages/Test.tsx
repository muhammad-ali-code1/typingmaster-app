import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TypingArea from "@/components/TypingArea";
import StatsDisplay from "@/components/StatsDisplay";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { generateText } from "@/lib/textGenerator";

const Test = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [timeLimit, setTimeLimit] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const startTest = useCallback(() => {
    setText(generateText("medium", timeLimit * 15));
    setCurrentIndex(0);
    setStartTime(Date.now());
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTimeLeft(timeLimit);
    setIsStarted(true);
    setIsFinished(false);
  }, [timeLimit]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  useEffect(() => {
    if (!isStarted || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          clearInterval(timer);
          // Navigate to results
          navigate("/results", {
            state: { wpm, accuracy, mistakes, timeLimit },
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isFinished, navigate, wpm, accuracy, mistakes, timeLimit]);

  const handleTyping = (typedChar: string) => {
    if (!isStarted || isFinished) return;

    const isCorrect = typedChar === text[currentIndex];
    
    if (!isCorrect) {
      setMistakes((prev) => prev + 1);
    }

    setCurrentIndex((prev) => prev + 1);

    const newIndex = currentIndex + 1;
    const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
    const wordsTyped = newIndex / 5;
    const newWpm = Math.round(wordsTyped / (timeElapsed || 0.01));
    const newAccuracy = Math.round(((newIndex - mistakes - (isCorrect ? 0 : 1)) / newIndex) * 100);

    setWpm(newWpm);
    setAccuracy(newAccuracy);
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
          <h1 className="text-2xl font-bold">Test Mode</h1>
          <div className="text-2xl font-mono font-bold text-primary">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {!isStarted ? (
            <div className="text-center space-y-8">
              <h2 className="text-3xl font-bold">Choose Test Duration</h2>
              <div className="flex gap-4 justify-center">
                {[60, 180, 300].map((time) => (
                  <Button
                    key={time}
                    variant={timeLimit === time ? "default" : "outline"}
                    size="lg"
                    onClick={() => setTimeLimit(time)}
                  >
                    {time / 60} {time === 60 ? "Minute" : "Minutes"}
                  </Button>
                ))}
              </div>
              <Button
                size="lg"
                onClick={startTest}
                className="gap-2"
              >
                <Play className="w-5 h-5" />
                Start Test
              </Button>
            </div>
          ) : (
            <>
              <StatsDisplay wpm={wpm} accuracy={accuracy} mistakes={mistakes} />
              
              <TypingArea
                text={text}
                currentIndex={currentIndex}
                onTyping={handleTyping}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Test;
