import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { Achievement } from "@/lib/achievementSystem";

interface AchievementBadgeProps {
  achievement: Achievement;
}

const AchievementBadge = ({ achievement }: AchievementBadgeProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "speed":
        return "from-blue-500 to-cyan-500";
      case "accuracy":
        return "from-green-500 to-emerald-500";
      case "consistency":
        return "from-orange-500 to-red-500";
      case "milestone":
        return "from-purple-500 to-pink-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  return (
    <Card
      className={`p-4 transition-all duration-300 ${
        achievement.unlocked
          ? "hover:scale-105 border-2 border-primary"
          : "opacity-50"
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-gradient-to-br ${getCategoryColor(
            achievement.category
          )} ${achievement.unlocked ? "" : "grayscale"}`}
        >
          {achievement.unlocked ? achievement.icon : <Lock className="w-8 h-8 text-white" />}
        </div>
        
        <div>
          <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
          <p className="text-xs text-muted-foreground">{achievement.description}</p>
        </div>

        <Badge
          variant="outline"
          className={`text-xs ${
            achievement.unlocked
              ? "bg-success/10 text-success border-success/20"
              : "bg-muted"
          }`}
        >
          {achievement.unlocked ? "Unlocked" : "Locked"}
        </Badge>

        {achievement.unlocked && achievement.unlockedAt && (
          <span className="text-xs text-muted-foreground">
            {new Date(achievement.unlockedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </Card>
  );
};

export default AchievementBadge;