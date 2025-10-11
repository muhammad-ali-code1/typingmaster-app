import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TypingArea from "@/components/TypingArea";
import StatsDisplay from "@/components/StatsDisplay";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { generateWordsByLength } from "@/lib/textGenerator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const LEVELS = [2, 4, 6, 8, 10, 12];
const WORDS_PER_LEVEL = 5;

const Practice = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0); // Index in LEVELS array
  const [wordsCompleted, setWordsCompleted] = useState(0); // Words completed in current level
  const [totalCorrectChars, setTotalCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const [typedChars, setTypedChars] = useState<Array<{ char: string; correct: boolean }>>([]);

  // Load best level from localStorage
  useEffect(() => {
    const savedLevel = localStorage.getItem("bestPracticeLevel");
    if (savedLevel) {
      const levelIndex = LEVELS.indexOf(parseInt(savedLevel));
      if (levelIndex !== -1) {
        setCurrentLevel(levelIndex);
      }
    }
  }, []);

  const generateNewText = useCallback((level: number) => {
    const letterCount = LEVELS[level];
    setText(generateWordsByLength(letterCount, WORDS_PER_LEVEL));
    setCurrentIndex(0);
    setTypedChars([]);
  }, []);

  useEffect(() => {
    generateNewText(currentLevel);
  }, [currentLevel, generateNewText]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [navigate]);

  const resetPractice = useCallback(() => {
    setCurrentLevel(0);
    setWordsCompleted(0);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTotalCorrectChars(0);
    setTotalChars(0);
    setShowCompletion(false);
    generateNewText(0);
  }, [generateNewText]);

  const handleTyping = (typedChar: string, isCorrect: boolean) => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const newTypedChars = [...typedChars, { char: typedChar, correct: isCorrect }];
    setTypedChars(newTypedChars);

    if (!isCorrect) {
      setMistakes((prev) => prev + 1);
    } else {
      setTotalCorrectChars((prev) => prev + 1);
    }

    setTotalChars((prev) => prev + 1);
    setCurrentIndex((prev) => prev + 1);

    // Calculate stats
    const newIndex = currentIndex + 1;
    const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
    const wordsTyped = totalChars / 5;
    const newWpm = Math.round(wordsTyped / (timeElapsed || 0.01));
    const newAccuracy = totalChars > 0 ? Math.round((totalCorrectChars / totalChars) * 100) : 100;

    setWpm(newWpm);
    setAccuracy(newAccuracy);

    // Check if level complete
    if (newIndex >= text.length) {
      const newWordsCompleted = wordsCompleted + WORDS_PER_LEVEL;
      setWordsCompleted(newWordsCompleted);

      // Check if should advance to next level
      if (newWordsCompleted >= WORDS_PER_LEVEL && currentLevel < LEVELS.length - 1) {
        setTimeout(() => {
          const nextLevel = currentLevel + 1;
          setCurrentLevel(nextLevel);
          setWordsCompleted(0);
          
          // Save best level
          const bestLevel = parseInt(localStorage.getItem("bestPracticeLevel") || "2");
          if (LEVELS[nextLevel] > bestLevel) {
            localStorage.setItem("bestPracticeLevel", String(LEVELS[nextLevel]));
          }
        }, 500);
      } else if (currentLevel === LEVELS.length - 1) {
        // Completed all levels
        setTimeout(() => {
          setShowCompletion(true);
        }, 500);
      } else {
        // Generate more words at same level
        setTimeout(() => {
          generateNewText(currentLevel);
        }, 500);
      }
    }
  };

  const progressPercentage = ((wordsCompleted % WORDS_PER_LEVEL) / WORDS_PER_LEVEL) * 100;

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
          <h1 className="text-2xl font-bold">Progressive Practice</h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Level indicator */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-xl font-semibold">
                Level {currentLevel + 1} - {LEVELS[currentLevel]}-Letter Words
              </h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{wordsCompleted % WORDS_PER_LEVEL} / {WORDS_PER_LEVEL} words</span>
                <span>Progress to next level</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </div>

          <StatsDisplay wpm={wpm} accuracy={accuracy} mistakes={mistakes} />
          
          <TypingArea
            text={text}
            currentIndex={currentIndex}
            onTyping={handleTyping}
            typedChars={typedChars}
          />

          <div className="flex justify-center">
            <Button
              onClick={resetPractice}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Restart Practice
            </Button>
          </div>
        </div>
      </main>

      {/* Completion Dialog */}
      <Dialog open={showCompletion} onOpenChange={setShowCompletion}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-primary" />
            </div>
            <DialogTitle className="text-center text-2xl">Well Done!</DialogTitle>
            <DialogDescription className="text-center">
              You've completed all progressive levels!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{wpm}</div>
                <div className="text-sm text-muted-foreground">Total WPM</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{LEVELS.length}</div>
                <div className="text-sm text-muted-foreground">Levels</div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button onClick={resetPractice} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Restart Practice
            </Button>
            <Button onClick={() => navigate("/test")} variant="outline" className="w-full">
              Go to Test Mode
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Practice;
