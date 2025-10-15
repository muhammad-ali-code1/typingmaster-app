import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TypingArea from "@/components/TypingArea";
import StatsDisplay from "@/components/StatsDisplay";
import LessonCard from "@/components/LessonCard";
import AchievementBadge from "@/components/AchievementBadge";
import ProgressDashboard from "@/components/ProgressDashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, BookOpen, Award, ArrowRight } from "lucide-react";
import { lessons, getNextLesson, Lesson } from "@/lib/lessonSystem";
import {
  loadProgress,
  saveProgress,
  checkAndUnlockAchievements,
  updateStreak,
  UserProgress,
} from "@/lib/achievementSystem";
import SEO from "@/components/SEO";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const Practice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("lessons");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  
  // Typing state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [totalCorrectChars, setTotalCorrectChars] = useState(0);
  const [totalChars, setTotalChars] = useState(0);
  const [typedChars, setTypedChars] = useState<Array<{ char: string; correct: boolean }>>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showAchievement, setShowAchievement] = useState(false);
  const [newAchievements, setNewAchievements] = useState<any[]>([]);

  // Load lesson from URL or first lesson
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lessonId = params.get("lesson");
    if (lessonId) {
      const lesson = lessons.find((l) => l.id === parseInt(lessonId));
      if (lesson) {
        setSelectedLesson(lesson);
        setActiveTab("practice");
      }
    }
  }, [location]);

  // Update streak on mount
  useEffect(() => {
    const updatedProgress = updateStreak(progress);
    setProgress(updatedProgress);
    saveProgress(updatedProgress);
  }, []);

  const startLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setActiveTab("practice");
    resetTypingState();
  };

  const resetTypingState = () => {
    setCurrentIndex(0);
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTotalCorrectChars(0);
    setTotalChars(0);
    setTypedChars([]);
  };

  const handleTyping = (typedChar: string, isCorrect: boolean) => {
    if (!selectedLesson) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    const newTypedChars = [...typedChars, { char: typedChar, correct: isCorrect }];
    setTypedChars(newTypedChars);

    if (!isCorrect) {
      setMistakes((prev) => prev + 1);
    }

    const newIndex = currentIndex + 1;
    const newTotalChars = totalChars + 1;
    const newTotalCorrectChars = totalCorrectChars + (isCorrect ? 1 : 0);

    const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
    const wordsTyped = newTotalChars / 5;
    const newWpm = Math.round(wordsTyped / (timeElapsed || 0.01));
    const newAccuracy = Math.round((newTotalCorrectChars / newTotalChars) * 100);

    setTotalCorrectChars(newTotalCorrectChars);
    setTotalChars(newTotalChars);
    setCurrentIndex(newIndex);
    setWpm(newWpm);
    setAccuracy(newAccuracy);

    // Check if lesson complete
    if (newIndex >= selectedLesson.text.length) {
      completeLesson(newWpm, newAccuracy);
    }
  };

  const completeLesson = (finalWpm: number, finalAccuracy: number) => {
    if (!selectedLesson) return;

    const practiceTime = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;

    // Update progress
    const updatedProgress: UserProgress = {
      ...progress,
      completedLessons: progress.completedLessons.includes(selectedLesson.id)
        ? progress.completedLessons
        : [...progress.completedLessons, selectedLesson.id],
      bestWpm: Math.max(progress.bestWpm, finalWpm),
      bestAccuracy: Math.max(progress.bestAccuracy, finalAccuracy),
      totalPracticeTime: progress.totalPracticeTime + practiceTime,
    };

    // Check for achievements
    const { unlockedNew, updated } = checkAndUnlockAchievements(
      updatedProgress,
      finalWpm,
      finalAccuracy
    );

    setProgress(updated);
    saveProgress(updated);

    if (unlockedNew.length > 0) {
      setNewAchievements(unlockedNew);
      setShowAchievement(true);
    }

    setShowCompletion(true);

    toast({
      title: "Lesson Complete! 🎉",
      description: `${finalWpm} WPM with ${finalAccuracy}% accuracy`,
    });
  };

  const handleNextLesson = () => {
    if (!selectedLesson) return;
    
    const nextLesson = getNextLesson(selectedLesson.id);
    if (nextLesson) {
      setShowCompletion(false);
      startLesson(nextLesson);
    } else {
      setShowCompletion(false);
      setActiveTab("lessons");
      setSelectedLesson(null);
    }
  };

  const isLessonCompleted = (lessonId: number) => {
    return progress.completedLessons.includes(lessonId);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Interactive Typing Lessons - Learn Touch Typing"
        description="Master touch typing with 20 structured lessons from beginner to advanced. Track progress, earn achievements, and improve your typing speed and accuracy."
        keywords="typing lessons, touch typing, learn typing, typing course, typing practice, typing tutorial, improve typing skills"
        canonical="/practice"
      />

      <header className="border-b sticky top-0 bg-background z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
          <h1 className="text-2xl font-bold">Typing Lessons</h1>
          <div className="w-32" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="lessons" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Lessons
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <Trophy className="w-4 h-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Award className="w-4 h-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-6">
            {selectedLesson && activeTab === "lessons" ? (
              <div className="max-w-4xl mx-auto space-y-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedLesson(null)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Lessons
                </Button>
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold">{selectedLesson.title}</h2>
                  <p className="text-muted-foreground">{selectedLesson.description}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center space-y-4 mb-8">
                  <h2 className="text-3xl font-bold">Choose Your Lesson</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Progress through 20 structured lessons designed to take you from beginner to
                    advanced typist. Each lesson builds on the previous one.
                  </p>
                </div>

                {/* Beginner Lessons */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-green-500">🟢 Beginner Lessons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lessons
                      .filter((l) => l.difficulty === "beginner")
                      .map((lesson) => (
                        <LessonCard
                          key={lesson.id}
                          lesson={lesson}
                          isCompleted={isLessonCompleted(lesson.id)}
                          onClick={() => startLesson(lesson)}
                        />
                      ))}
                  </div>
                </div>

                {/* Intermediate Lessons */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-yellow-500">🟡 Intermediate Lessons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lessons
                      .filter((l) => l.difficulty === "intermediate")
                      .map((lesson) => (
                        <LessonCard
                          key={lesson.id}
                          lesson={lesson}
                          isCompleted={isLessonCompleted(lesson.id)}
                          onClick={() => startLesson(lesson)}
                        />
                      ))}
                  </div>
                </div>

                {/* Advanced Lessons */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-red-500">🔴 Advanced Lessons</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lessons
                      .filter((l) => l.difficulty === "advanced")
                      .map((lesson) => (
                        <LessonCard
                          key={lesson.id}
                          lesson={lesson}
                          isCompleted={isLessonCompleted(lesson.id)}
                          onClick={() => startLesson(lesson)}
                        />
                      ))}
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            {selectedLesson ? (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold">{selectedLesson.title}</h2>
                  <p className="text-muted-foreground">{selectedLesson.description}</p>
                </div>

                <StatsDisplay wpm={wpm} accuracy={accuracy} mistakes={mistakes} />

                <TypingArea
                  text={selectedLesson.text}
                  currentIndex={currentIndex}
                  onTyping={handleTyping}
                  typedChars={typedChars}
                />

                <div className="flex justify-center gap-4">
                  <Button onClick={resetTypingState} variant="outline">
                    Restart Lesson
                  </Button>
                  <Button onClick={() => setActiveTab("lessons")} variant="ghost">
                    Choose Different Lesson
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Lesson Selected</h3>
                <p className="text-muted-foreground mb-4">
                  Choose a lesson from the Lessons tab to start practicing
                </p>
                <Button onClick={() => setActiveTab("lessons")}>Browse Lessons</Button>
              </div>
            )}
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <ProgressDashboard progress={progress} />
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold">Your Achievements</h2>
              <p className="text-muted-foreground">
                Unlock badges by completing lessons and reaching milestones
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {progress.achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Completion Dialog */}
      <Dialog open={showCompletion} onOpenChange={setShowCompletion}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16 text-primary" />
            </div>
            <DialogTitle className="text-center text-2xl">Lesson Complete!</DialogTitle>
            <DialogDescription className="text-center">
              Great job on completing {selectedLesson?.title}!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{wpm}</div>
                <div className="text-sm text-muted-foreground">WPM</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-col gap-2">
            {getNextLesson(selectedLesson?.id || 0) ? (
              <Button onClick={handleNextLesson} className="w-full gap-2">
                Next Lesson
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={() => navigate("/test")} className="w-full">
                Try Test Mode
              </Button>
            )}
            <Button onClick={() => setActiveTab("lessons")} variant="outline" className="w-full">
              Choose Another Lesson
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Achievement Unlock Dialog */}
      <Dialog open={showAchievement} onOpenChange={setShowAchievement}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <Award className="w-16 h-16 text-primary animate-bounce" />
            </div>
            <DialogTitle className="text-center text-2xl">Achievement Unlocked!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {newAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="text-4xl">{achievement.icon}</div>
                <div>
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setShowAchievement(false)} className="w-full">
              Awesome!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Practice;