import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface TypingAreaProps {
  text: string;
  currentIndex: number;
  onTyping: (char: string, isCorrect: boolean) => void;
  typedChars?: Array<{ char: string; correct: boolean }>;
}

const TypingArea = ({ text, currentIndex, onTyping, typedChars = [] }: TypingAreaProps) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    mobileInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.length === 1 && currentIndex < text.length) {
        e.preventDefault(); // Prevent spacebar from scrolling page
        // Case-insensitive comparison
        const isCorrect = e.key.toLowerCase() === text[currentIndex].toLowerCase();
        onTyping(e.key, isCorrect);
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [onTyping, text, currentIndex]);

  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length > 0 && currentIndex < text.length) {
      const char = inputValue[inputValue.length - 1];
      const isCorrect = char.toLowerCase() === text[currentIndex].toLowerCase();
      onTyping(char, isCorrect);
      e.target.value = ''; // Clear input after processing
    }
  };

  return (
    <Card className="p-8 bg-card">
      {/* Hidden input for mobile keyboard */}
      <input
        ref={mobileInputRef}
        type="text"
        onChange={handleMobileInput}
        className="absolute opacity-0 pointer-events-none"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <div
        ref={inputRef}
        className="text-2xl font-mono leading-relaxed focus:outline-none select-none"
        tabIndex={0}
        onClick={() => mobileInputRef.current?.focus()}
      >
        {text.split("").map((char, index) => {
          let className = "transition-colors duration-150";
          
          if (index < currentIndex) {
            // Check if this character was typed correctly
            const typedChar = typedChars[index];
            if (typedChar && !typedChar.correct) {
              className += " text-error line-through"; // Red for incorrect
            } else {
              className += " text-success"; // Green for correct
            }
          } else if (index === currentIndex) {
            className += " bg-primary/20 text-foreground animate-pulse";
          } else {
            className += " text-muted-foreground";
          }

          return (
            <span key={index} className={className}>
              {char}
            </span>
          );
        })}
        <span className="inline-block w-0.5 h-8 bg-primary ml-1 animate-pulse" />
      </div>
    </Card>
  );
};

export default TypingArea;
