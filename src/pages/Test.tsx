import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import StatsDisplay from "@/components/StatsDisplay";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { generateText } from "@/lib/textGenerator";

const Test = () => {
  const navigate = useNavigate();
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWord, setTypedWord] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);
  const [correctCharsTyped, setCorrectCharsTyped] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [timeLimit, setTimeLimit] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const startTest = useCallback(() => {
    // Predefined sentences for typing practice
    const sentences = [
      "The quick brown fox jumps over the lazy dog.",
      "Typing fast takes practice and patience.",
      "Accuracy is more important than speed.",
      "Every great typist was once a beginner.",
      "Focus on steady improvement each day.",
      "Practice makes perfect with consistent effort.",
      "Learning to type well opens many opportunities.",
      "Proper finger placement improves typing speed.",
      "Good posture helps prevent typing fatigue.",
      "Regular breaks keep your hands healthy."
    ];

    // Generate enough sentences to fill the time limit
    const wordsNeeded = timeLimit * 20;
    let wordList: string[] = [];
    
    while (wordList.length < wordsNeeded) {
      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
      const sentenceWords = randomSentence.split(" ").filter(w => w.length > 0);
      wordList = [...wordList, ...sentenceWords];
    }

    setWords(wordList);
    setCurrentWordIndex(0);
    setTypedWord("");
    setStartTime(Date.now());
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTotalCharsTyped(0);
    setCorrectCharsTyped(0);
    setWordsCompleted(0);
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

  useEffect(() => {
    if (!isStarted || isFinished || words.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentWord = words[currentWordIndex];
      
      // Handle backspace
      if (e.key === "Backspace") {
        e.preventDefault();
        setTypedWord((prev) => prev.slice(0, -1));
        return;
      }

      // Handle space bar - move to next word
      if (e.key === " ") {
        e.preventDefault();
        
        // Only advance if user typed something
        if (typedWord.length > 0) {
          // Compare words (case-insensitive and trimmed)
          const normalizedCurrentWord = currentWord.toLowerCase().trim();
          const normalizedTypedWord = typedWord.toLowerCase().trim();
          
          // Calculate accuracy based on character matching
          const wordChars = normalizedCurrentWord.length;
          const typedChars = normalizedTypedWord.length;
          const maxLength = Math.max(wordChars, typedChars);
          
          let correctChars = 0;
          for (let i = 0; i < maxLength; i++) {
            if (normalizedCurrentWord[i] === normalizedTypedWord[i]) {
              correctChars++;
            } else {
              setMistakes((prev) => prev + 1);
            }
          }

          const newTotalChars = totalCharsTyped + typedChars;
          const newCorrectChars = correctCharsTyped + correctChars;
          
          setTotalCharsTyped(newTotalChars);
          setCorrectCharsTyped(newCorrectChars);
          setWordsCompleted((prev) => prev + 1);

          // Calculate WPM and accuracy
          const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
          const newWpm = Math.round((newTotalChars / 5) / (timeElapsed || 0.01));
          const newAccuracy = Math.round((newCorrectChars / newTotalChars) * 100);

          setWpm(newWpm);
          setAccuracy(newAccuracy);

          // Move to next word
          setTypedWord("");
          setCurrentWordIndex((prev) => {
            const nextIndex = prev + 1;
            // Loop back if we run out of words
            if (nextIndex >= words.length) {
              return 0;
            }
            return nextIndex;
          });
        }
        return;
      }

      // Handle regular character typing
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setTypedWord((prev) => prev + e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isStarted, isFinished, words, currentWordIndex, typedWord, totalCharsTyped, correctCharsTyped, startTime, mistakes]);

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
              
              <Card className="p-12 bg-card">
                <div className="text-center space-y-6">
                  <div className="text-sm text-muted-foreground font-medium">
                    Word {wordsCompleted + 1}
                  </div>
                  
                  <div className="text-4xl font-mono font-bold tracking-wider min-h-[80px] flex items-center justify-center gap-4 flex-wrap">
                    {/* Show 5 words at once */}
                    {[0, 1, 2, 3, 4].map((offset) => {
                      const wordIndex = currentWordIndex + offset;
                      const word = words[wordIndex];
                      
                      if (!word) return null;
                      
                      const isCurrentWord = offset === 0;
                      
                      return (
                        <div key={wordIndex} className="inline-flex transition-all duration-300">
                          {isCurrentWord ? (
                            // Current word being typed - show character-by-character feedback
                            <span className="border-b-4 border-primary pb-1">
                              {word.split("").map((char, index) => {
                                let className = "transition-colors duration-100";
                                
                                if (index < typedWord.length) {
                                  // Show typed characters (case-insensitive comparison)
                                  if (typedWord[index].toLowerCase() === char.toLowerCase()) {
                                    className += " text-success"; // Correct - green
                                  } else {
                                    className += " text-error"; // Wrong - red
                                  }
                                } else if (index === typedWord.length) {
                                  className += " bg-primary/20 animate-pulse"; // Current cursor position
                                } else {
                                  className += " text-foreground"; // Untyped
                                }

                                return (
                                  <span key={index} className={className}>
                                    {char}
                                  </span>
                                );
                              })}
                            </span>
                          ) : (
                            // Upcoming words - show in muted color
                            <span className="text-muted-foreground/60">
                              {word}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="text-lg text-muted-foreground font-medium">
                    Type the words above and press <kbd className="px-2 py-1 bg-secondary rounded text-sm">Space</kbd> to continue
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Test;
