import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ComingSoon from "./ComingSoon";
import { Users, MessageCircle, Trophy, Target } from "lucide-react";

interface Group {
  id: number;
  name: string;
  members: number;
  challenge: string;
  progress: number;
}

interface GroupCardProps {
  group: Group;
}

const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <Card className="card-futuristic hover:animate-scale-glow group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              {group.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <span>{group.members} members</span>
              <Badge variant="outline" className="ml-2 text-xs">
                Active
              </Badge>
            </CardDescription>
          </div>
          <ComingSoon feature="Group chat system">
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </ComingSoon>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Challenge */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-accent" />
            <span className="font-medium text-sm">Current Challenge</span>
          </div>
          <p className="text-sm text-muted-foreground pl-6">{group.challenge}</p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Group Progress</span>
            <span className="text-sm font-mono text-primary">{group.progress}%</span>
          </div>
          <Progress 
            value={group.progress} 
            className="h-2 bg-muted [&>div]:bg-gradient-primary [&>div]:shadow-[0_0_10px_hsl(180_100%_50%_/_0.4)]"
          />
        </div>

        {/* Leaderboard Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium flex items-center gap-1">
              <Trophy className="w-4 h-4 text-warning" />
              Top Performers
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <Badge variant="secondary" className="w-5 h-5 rounded-full p-0 flex items-center justify-center bg-warning text-warning-foreground">
                  1
                </Badge>
                Sarah Chen
              </span>
              <span className="font-mono text-warning">98%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <Badge variant="secondary" className="w-5 h-5 rounded-full p-0 flex items-center justify-center bg-muted">
                  2
                </Badge>
                Alex Kim
              </span>
              <span className="font-mono">92%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                <Badge variant="secondary" className="w-5 h-5 rounded-full p-0 flex items-center justify-center bg-muted">
                  3
                </Badge>
                Jordan Lee
              </span>
              <span className="font-mono">89%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <ComingSoon feature="Group details page">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover-glow"
            >
              View Details
            </Button>
          </ComingSoon>
          <ComingSoon feature="Group chat system">
            <Button 
              size="sm" 
              className="bg-gradient-primary hover:scale-105 transition-transform"
            >
              Join Chat
            </Button>
          </ComingSoon>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupCard;