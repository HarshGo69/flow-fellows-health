import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rocket, Sparkles, Clock } from "lucide-react";

interface ComingSoonProps {
  children: React.ReactNode;
  feature?: string;
}

const ComingSoon = ({ children, feature = "This feature" }: ComingSoonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {children}
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="card-futuristic border-primary/30 max-w-md">
          <DialogHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Rocket className="w-16 h-16 text-primary animate-float" />
                <Sparkles className="w-6 h-6 text-accent absolute -top-2 -right-2 animate-glow-pulse" />
              </div>
            </div>
            
            <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Coming Soon!
            </DialogTitle>
            
            <DialogDescription className="text-center space-y-3">
              <p className="text-lg">{feature} is being developed with cutting-edge wellness tech.</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Expected in the next update</span>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-6">
            <div className="bg-gradient-card p-4 rounded-lg border border-primary/20">
              <h4 className="font-semibold text-primary mb-2">What's Coming:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Advanced AI-powered insights</li>
                <li>• Real-time social challenges</li>
                <li>• Achievement system with rewards</li>
                <li>• Personalized wellness coaching</li>
              </ul>
            </div>
            
            <Button 
              onClick={() => setIsOpen(false)}
              className="w-full bg-gradient-primary hover:scale-105 transition-transform"
            >
              Got it! Can't wait 🚀
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ComingSoon;