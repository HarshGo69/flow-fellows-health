import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CircularProgress from "./CircularProgress";
import { TrendingUp, Calendar, Target } from "lucide-react";

const WeeklyProgressGraph = () => {
  // Mock data for the last 7 days with completion percentages
  const weekData = [
    { day: "Mon", date: "15", overall: 85, habits: { sleep: 100, exercise: 75, water: 87, study: 100 } },
    { day: "Tue", date: "16", overall: 72, habits: { sleep: 94, exercise: 56, water: 87, study: 87 } },
    { day: "Wed", date: "17", overall: 90, habits: { sleep: 100, exercise: 75, water: 100, study: 100 } },
    { day: "Thu", date: "18", overall: 65, habits: { sleep: 87, exercise: 37, water: 75, study: 75 } },
    { day: "Fri", date: "19", overall: 95, habits: { sleep: 106, exercise: 93, water: 112, study: 112 } },
    { day: "Sat", date: "20", overall: 85, habits: { sleep: 112, exercise: 112, water: 100, study: 50 } },
    { day: "Sun", date: "21", overall: 78, habits: { sleep: 100, exercise: 75, water: 87, study: 87 } },
  ];

  const habits = [
    { key: 'sleep', label: 'Sleep', color: 'accent', icon: '🌙' },
    { key: 'exercise', label: 'Exercise', color: 'success', icon: '💪' },
    { key: 'water', label: 'Water', color: 'primary', icon: '💧' },
    { key: 'study', label: 'Study', color: 'warning', icon: '📚' },
  ];

  const weekAverage = Math.round(weekData.reduce((sum, day) => sum + day.overall, 0) / weekData.length);

  return (
    <Card className="card-futuristic">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Weekly Progress Overview
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last 7 days performance
          </span>
          <Badge variant="outline" className="bg-gradient-primary text-primary-foreground">
            Week Avg: {weekAverage}%
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Daily Overview Circles */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Target className="w-4 h-4" />
            Daily Completion
          </h4>
          <div className="grid grid-cols-7 gap-4">
            {weekData.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <CircularProgress 
                  value={day.overall} 
                  size={60} 
                  strokeWidth={4}
                  color={day.overall >= 90 ? 'success' : day.overall >= 70 ? 'primary' : 'warning'}
                  showValue={false}
                  className="hover:scale-110 transition-transform"
                />
                <div className="text-center">
                  <p className="text-xs font-medium">{day.day}</p>
                  <p className="text-xs text-muted-foreground">{day.date}</p>
                  <p className="text-xs font-mono font-bold mt-1">{day.overall}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Habit Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium">Habit Performance This Week</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {habits.map((habit) => {
              const avgPerformance = Math.round(
                weekData.reduce((sum, day) => sum + day.habits[habit.key as keyof typeof day.habits], 0) / 7
              );
              return (
                <div key={habit.key} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card/50">
                  <div className="text-2xl">{habit.icon}</div>
                  <CircularProgress 
                    value={avgPerformance} 
                    size={50} 
                    strokeWidth={4}
                    color={habit.color}
                    showValue={false}
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium">{habit.label}</p>
                    <p className="text-xs font-mono text-muted-foreground">{avgPerformance}% avg</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Insights */}
        <div className="space-y-3">
          <h4 className="font-medium">This Week's Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-success/10 border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success animate-glow-pulse mt-2" />
              <div>
                <p className="font-medium text-success">Best Day: Friday</p>
                <p className="text-muted-foreground">Exceeded all goals with 95% completion</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse mt-2" />
              <div>
                <p className="font-medium text-primary">Consistency Streak</p>
                <p className="text-muted-foreground">5 days above 70% completion</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <div className="w-2 h-2 rounded-full bg-accent animate-glow-pulse mt-2" />
              <div>
                <p className="font-medium text-accent">Sleep Champion</p>
                <p className="text-muted-foreground">Perfect sleep schedule maintained</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20">
              <div className="w-2 h-2 rounded-full bg-warning animate-glow-pulse mt-2" />
              <div>
                <p className="font-medium text-warning">Growth Area</p>
                <p className="text-muted-foreground">Thursday needs attention (65%)</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyProgressGraph;