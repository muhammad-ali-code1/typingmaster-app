import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle, Clock, Target } from "lucide-react";
import { Lesson } from "@/lib/lessonSystem";

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  onClick: () => void;
}

const LessonCard = ({ lesson, isCompleted, onClick }: LessonCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "advanced":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <Card
      onClick={lesson.isLocked ? undefined : onClick}
      className={`p-6 transition-all duration-200 hover:shadow-lg ${
        lesson.isLocked
          ? "opacity-50 cursor-not-allowed"
          : "cursor-pointer hover:scale-105"
      } ${isCompleted ? "border-success border-2" : ""}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
              isCompleted
                ? "bg-success/20 text-success"
                : lesson.isLocked
                ? "bg-muted"
                : "bg-primary/20 text-primary"
            }`}
          >
            {lesson.isLocked ? (
              <Lock className="w-6 h-6" />
            ) : isCompleted ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              lesson.id
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{lesson.title}</h3>
            <Badge
              variant="outline"
              className={`mt-1 ${getDifficultyColor(lesson.difficulty)}`}
            >
              {lesson.difficulty}
            </Badge>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {lesson.description}
      </p>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Target className="w-4 h-4" />
          <span>{lesson.targetWpm} WPM</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{lesson.targetAccuracy}% accuracy</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">
            {lesson.category}
          </span>
          {isCompleted && (
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              Completed
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LessonCard;