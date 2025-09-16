import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CircularProgress from "./CircularProgress";
import StreakBadge from "./StreakBadge";
import { Plus, Minus, Check } from "lucide-react";
import axios from "axios";

interface Habit {
  id: number;
  name: string;
  icon: React.ElementType;
  target: number;
  streak: number;
  color: string;
  key: string; // 'sleep', 'exercise', 'water', 'study'
}

interface HabitCardProps {
  habit: Habit;
  token: string; // JWT auth token
}

const HabitCard = ({ habit, token }: HabitCardProps) => {
  const [current, setCurrent] = useState(0); // start at 0
  const { toast } = useToast();
  const percentage = Math.min((current / habit.target) * 100, 100);
  const isCompleted = current >= habit.target;

  // Sync to backend whenever current changes
  useEffect(() => {
    if (!token) return;
    const updateBackend = async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/progress",
          { habit: habit.key, action: "set", value: current },
          { headers: { "x-auth-token": token } }
        );
      } catch (err) {
        console.error("Failed to update habit:", err);
      }
    };
    updateBackend();
  }, [current, habit.key, token]);

  const increment = () => {
    const newValue = Math.min(current + 0.5, habit.target + 2);
    setCurrent(newValue);

    if (newValue >= habit.target) {
      toast({
        title: "🎉 Goal Completed!",
        description: `You've completed your ${habit.name} goal!`,
        className: "border-success/30 bg-success/10",
      });
    } else if (newValue >= habit.target * 0.8 && current < habit.target * 0.8) {
      toast({
        title: "🔥 Almost There!",
        description: `You're 80% of the way to your ${habit.name} goal.`,
        className: "border-warning/30 bg-warning/10",
      });
    } else {
      toast({
        title: "📈 Progress Updated",
        description: `${habit.name} increased to ${newValue}`,
        className: "border-primary/30 bg-primary/10",
      });
    }
  };

  const decrement = () => {
    const newValue = Math.max(current - 0.5, 0);
    setCurrent(newValue);
    toast({
      title: "📉 Progress Adjusted",
      description: `${habit.name} decreased to ${newValue}`,
      className: "border-muted/30 bg-muted/10",
    });
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "accent":
        return "text-accent";
      case "success":
        return "text-success";
      case "warning":
        return "text-warning";
      default:
        return "text-primary";
    }
  };

  return (
    <Card className={`card-futuristic transition-all duration-300 ${isCompleted ? "animate-glow-pulse" : ""}`}>
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
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-2xl font-bold font-mono">{current}</p>
            <p className="text-xs text-muted-foreground">Current</p>
          </div>

          <CircularProgress value={percentage} size={100} strokeWidth={8} color={habit.color} showValue={true} />

          <div className="text-center">
            <p className="text-2xl font-bold font-mono text-muted-foreground">{habit.target}</p>
            <p className="text-xs text-muted-foreground">Target</p>
          </div>
        </div>

        <div className="text-center">
          {isCompleted ? (
            <div className="flex items-center justify-center gap-2 text-success">
              <Check className="w-4 h-4" />
              <span className="font-medium">Goal completed! 🎉</span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{(habit.target - current).toFixed(1)} more to reach your goal</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" size="sm" onClick={decrement} disabled={current <= 0}>
            <Minus className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={increment}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitCard;
