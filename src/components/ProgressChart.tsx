import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar } from "lucide-react";

const ProgressChart = () => {
  // Mock data for the last 7 days
  const weekData = [
    { day: "Mon", sleep: 8, exercise: 60, water: 8, study: 4 },
    { day: "Tue", sleep: 7.5, exercise: 45, water: 7, study: 3.5 },
    { day: "Wed", sleep: 8, exercise: 60, water: 8, study: 4 },
    { day: "Thu", sleep: 7, exercise: 30, water: 6, study: 3 },
    { day: "Fri", sleep: 8.5, exercise: 75, water: 9, study: 4.5 },
    { day: "Sat", sleep: 9, exercise: 90, water: 8, study: 2 },
    { day: "Sun", sleep: 8, exercise: 60, water: 7, study: 3.5 },
  ];

  const getBarHeight = (value: number, max: number) => {
    return Math.max((value / max) * 100, 5); // Minimum 5% height for visibility
  };

  const habits = [
    { key: 'sleep', label: 'Sleep (hrs)', color: 'bg-accent', max: 10 },
    { key: 'exercise', label: 'Exercise (min)', color: 'bg-success', max: 90 },
    { key: 'water', label: 'Water (cups)', color: 'bg-primary', max: 10 },
    { key: 'study', label: 'Study (hrs)', color: 'bg-warning', max: 5 },
  ];

  return (
    <Card className="card-futuristic">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Weekly Progress
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Last 7 days performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chart */}
        <div className="space-y-4">
          {habits.map((habit) => (
            <div key={habit.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{habit.label}</span>
                <Badge variant="outline" className="text-xs">
                  Avg: {(weekData.reduce((sum, day) => sum + (day[habit.key as keyof typeof day] as number), 0) / 7).toFixed(1)}
                </Badge>
              </div>
              <div className="flex items-end gap-2 h-20">
                {weekData.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-muted rounded-md overflow-hidden relative h-16">
                      <div
                        className={`${habit.color} rounded-md transition-all duration-500 ease-out absolute bottom-0 w-full`}
                        style={{
                          height: `${getBarHeight(day[habit.key as keyof typeof day] as number, habit.max)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Insights */}
        <div className="space-y-3">
          <h4 className="font-medium">This Week's Insights</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-success/10 border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success animate-glow-pulse" />
              <span>Great job on weekend exercise! 90 minutes on Saturday 🔥</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
              <span>Sleep consistency improved by 15% this week</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-warning/10 border border-warning/20">
              <div className="w-2 h-2 rounded-full bg-warning animate-glow-pulse" />
              <span>Consider increasing water intake on weekdays</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressChart;