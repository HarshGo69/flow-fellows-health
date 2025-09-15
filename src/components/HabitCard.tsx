import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StreakBadge from "./StreakBadge";
import { Plus, Minus, Check } from "lucide-react";

interface Habit {
  id: number;
  name: string;
  icon: React.ElementType;
  current: number;
  target: number;
  streak: number;
  color: string;
}

interface HabitCardProps {
  habit: Habit;
}

const HabitCard = ({ habit }: HabitCardProps) => {
  const [current, setCurrent] = useState(habit.current);
  const percentage = Math.min((current / habit.target) * 100, 100);
  const isCompleted = current >= habit.target;

  const increment = () => {
    setCurrent(prev => Math.min(prev + 0.5, habit.target + 2));
  };

  const decrement = () => {
    setCurrent(prev => Math.max(prev - 0.5, 0));
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary': return 'text-primary';
      case 'accent': return 'text-accent';
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      default: return 'text-primary';
    }
  };

  const getProgressClass = (color: string) => {
    switch (color) {
      case 'primary': return '[&>div]:bg-primary [&>div]:shadow-[0_0_10px_hsl(180_100%_50%_/_0.4)]';
      case 'accent': return '[&>div]:bg-accent [&>div]:shadow-[0_0_10px_hsl(270_100%_70%_/_0.4)]';
      case 'success': return '[&>div]:bg-success [&>div]:shadow-[0_0_10px_hsl(120_100%_50%_/_0.4)]';
      case 'warning': return '[&>div]:bg-warning [&>div]:shadow-[0_0_10px_hsl(45_100%_50%_/_0.4)]';
      default: return '[&>div]:bg-primary [&>div]:shadow-[0_0_10px_hsl(180_100%_50%_/_0.4)]';
    }
  };

  return (
    <Card className={`card-futuristic transition-all duration-300 ${isCompleted ? 'animate-glow-pulse' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <habit.icon className={`w-6 h-6 ${getColorClass(habit.color)}`} />
            <span className="text-lg">{habit.name}</span>
          </div>
          <StreakBadge streak={habit.streak} size="sm" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current vs Target Display */}
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-2xl font-bold font-mono">{current}</p>
            <p className="text-xs text-muted-foreground">Current</p>
          </div>
          <div className="text-center text-muted-foreground">
            <p className="text-sm">/</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold font-mono text-muted-foreground">{habit.target}</p>
            <p className="text-xs text-muted-foreground">Target</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress 
            value={percentage} 
            className={`h-3 bg-muted ${getProgressClass(habit.color)}`}
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{percentage.toFixed(0)}% Complete</span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-success">
                <Check className="w-4 h-4" />
                Goal reached!
              </span>
            )}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={decrement}
            disabled={current <= 0}
            className="hover-glow"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={increment}
            className="hover-glow"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitCard;