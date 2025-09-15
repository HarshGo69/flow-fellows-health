import { Badge } from "@/components/ui/badge";
import { Flame, Zap } from "lucide-react";

interface StreakBadgeProps {
  streak: number;
  size?: "sm" | "md" | "lg";
}

const StreakBadge = ({ streak, size = "md" }: StreakBadgeProps) => {
  const getStreakLevel = (streak: number) => {
    if (streak >= 30) return { level: "legendary", color: "text-warning", glow: "animate-glow-pulse" };
    if (streak >= 14) return { level: "fire", color: "text-destructive", glow: "animate-float" };
    if (streak >= 7) return { level: "hot", color: "text-primary", glow: "" };
    return { level: "building", color: "text-muted-foreground", glow: "" };
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-1";
      case "lg":
        return "text-base px-4 py-2";
      default:
        return "text-sm px-3 py-1.5";
    }
  };

  const { level, color, glow } = getStreakLevel(streak);

  return (
    <Badge 
      variant="outline" 
      className={`
        streak-badge ${getSizeClasses(size)} ${glow}
        bg-gradient-primary border-primary/30
        hover:scale-110 transition-transform cursor-pointer
      `}
    >
      <div className="flex items-center gap-1.5">
        {level === "legendary" ? (
          <Zap className={`w-4 h-4 ${color}`} />
        ) : (
          <Flame className={`w-4 h-4 ${color}`} />
        )}
        <span className="font-mono font-bold">{streak}</span>
        <span className="hidden sm:inline font-medium">
          {streak === 1 ? "day" : "days"}
        </span>
      </div>
    </Badge>
  );
};

export default StreakBadge;