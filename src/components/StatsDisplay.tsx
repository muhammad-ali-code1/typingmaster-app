import { Card } from "@/components/ui/card";
import { Target, Trophy, AlertCircle } from "lucide-react";

interface StatsDisplayProps {
  wpm: number;
  accuracy: number;
  mistakes: number;
}

const StatsDisplay = ({ wpm, accuracy, mistakes }: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 text-center border-2 hover:border-primary transition-colors">
        <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
        <div className="text-3xl font-bold text-primary mb-1">{wpm}</div>
        <div className="text-sm text-muted-foreground">Words Per Minute</div>
      </Card>

      <Card className="p-6 text-center border-2 hover:border-success transition-colors">
        <Trophy className="w-8 h-8 mx-auto mb-2 text-success" />
        <div className="text-3xl font-bold text-success mb-1">{accuracy}%</div>
        <div className="text-sm text-muted-foreground">Accuracy</div>
      </Card>

      <Card className="p-6 text-center border-2 hover:border-error transition-colors">
        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-error" />
        <div className="text-3xl font-bold text-error mb-1">{mistakes}</div>
        <div className="text-sm text-muted-foreground">Mistakes</div>
      </Card>
    </div>
  );
};

export default StatsDisplay;
