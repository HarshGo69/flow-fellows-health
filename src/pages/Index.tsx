import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HabitCard from "@/components/HabitCard";
import ProgressChart from "@/components/ProgressChart";
import GroupCard from "@/components/GroupCard";
import StreakBadge from "@/components/StreakBadge";
import { Trophy, Users, Target, TrendingUp, Zap, Moon, Droplets, Dumbbell, BookOpen } from "lucide-react";

const Index = () => {
  const [habits] = useState([
    { id: 1, name: "Sleep", icon: Moon, current: 7.5, target: 8, streak: 12, color: "accent" },
    { id: 2, name: "Water", icon: Droplets, current: 6, target: 8, streak: 8, color: "primary" },
    { id: 3, name: "Exercise", icon: Dumbbell, current: 45, target: 60, streak: 5, color: "success" },
    { id: 4, name: "Study", icon: BookOpen, current: 3.5, target: 4, streak: 15, color: "warning" },
  ]);

  const [groups] = useState([
    { id: 1, name: "Study Squad", members: 12, challenge: "30-day Study Challenge", progress: 78 },
    { id: 2, name: "Fitness Friends", members: 8, challenge: "Morning Workout Club", progress: 65 },
    { id: 3, name: "Sleep Heroes", members: 15, challenge: "8-Hour Sleep Goal", progress: 92 },
  ]);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-inter bg-gradient-primary bg-clip-text text-transparent">
            WellTrack
          </h1>
          <p className="text-muted-foreground">Your futuristic wellness companion</p>
        </div>
        <div className="flex items-center gap-4">
          <StreakBadge streak={12} />
          <Button variant="outline" className="hover-glow">
            <Trophy className="w-4 h-4 mr-2" />
            View Achievements
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Groups
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-futuristic">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Streak</p>
                    <p className="text-2xl font-bold text-primary">47 days</p>
                  </div>
                  <Zap className="w-8 h-8 text-primary animate-glow-pulse" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-futuristic">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Weekly Score</p>
                    <p className="text-2xl font-bold text-success">87%</p>
                  </div>
                  <Trophy className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-futuristic">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Groups</p>
                    <p className="text-2xl font-bold text-accent">3</p>
                  </div>
                  <Users className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-futuristic">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Habits</p>
                    <p className="text-2xl font-bold text-warning">4/4</p>
                  </div>
                  <Target className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Habits Grid */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Today's Habits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {habits.map((habit) => (
                <HabitCard key={habit.id} habit={habit} />
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Progress Tab */}
        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgressChart />
            <Card className="card-futuristic">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Recent Achievements
                </CardTitle>
                <CardDescription>Your latest milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    New!
                  </Badge>
                  <div>
                    <p className="font-medium">15-Day Study Streak</p>
                    <p className="text-sm text-muted-foreground">Completed yesterday</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    Hot!
                  </Badge>
                  <div>
                    <p className="font-medium">Sleep Champion</p>
                    <p className="text-sm text-muted-foreground">7 days of perfect sleep</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Groups Tab */}
        <TabsContent value="groups" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Groups</h2>
            <Button className="bg-gradient-primary hover:scale-105 transition-transform">
              <Users className="w-4 h-4 mr-2" />
              Join New Group
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;