import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Zap, Calendar, Award } from "lucide-react";
import { UserProgress } from "@/lib/achievementSystem";
import { calculateProgress } from "@/lib/lessonSystem";

interface ProgressDashboardProps {
  progress: UserProgress;
}

const ProgressDashboard = ({ progress }: ProgressDashboardProps) => {
  const overallProgress = calculateProgress(progress.completedLessons);
  const unlockedAchievements = progress.achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Your Progress
          </h3>
          <span className="text-3xl font-bold text-primary">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-3 mb-2" />
        <p className="text-sm text-muted-foreground">
          {progress.completedLessons.length} of 20 lessons completed
        </p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Best WPM */}
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <Target className="w-8 h-8 mx-auto mb-3 text-primary" />
          <div className="text-3xl font-bold text-primary mb-1">
            {progress.bestWpm}
          </div>
          <div className="text-sm text-muted-foreground">Best WPM</div>
        </Card>

        {/* Best Accuracy */}
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <Zap className="w-8 h-8 mx-auto mb-3 text-success" />
          <div className="text-3xl font-bold text-success mb-1">
            {progress.bestAccuracy}%
          </div>
          <div className="text-sm text-muted-foreground">Best Accuracy</div>
        </Card>

        {/* Current Streak */}
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <Calendar className="w-8 h-8 mx-auto mb-3 text-orange-500" />
          <div className="text-3xl font-bold text-orange-500 mb-1">
            {progress.currentStreak}
          </div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <Award className="w-8 h-8 mx-auto mb-3 text-purple-500" />
          <div className="text-3xl font-bold text-purple-500 mb-1">
            {unlockedAchievements}
          </div>
          <div className="text-sm text-muted-foreground">Achievements</div>
        </Card>
      </div>

      {/* Practice Time */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-lg mb-1">Total Practice Time</h4>
            <p className="text-3xl font-bold text-primary">
              {Math.round(progress.totalPracticeTime)} min
            </p>
          </div>
          <div className="text-right">
            <h4 className="font-semibold text-lg mb-1">Longest Streak</h4>
            <p className="text-3xl font-bold text-orange-500">
              {progress.longestStreak} days
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProgressDashboard;