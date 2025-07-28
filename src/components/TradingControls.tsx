import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Power, Settings } from "lucide-react";

interface TradingControlsProps {
  autoExecuteEnabled: boolean;
  onAutoExecuteToggle: (enabled: boolean) => void;
  onEmergencyStop: () => void;
  tradingActive: boolean;
}

export const TradingControls = ({ 
  autoExecuteEnabled, 
  onAutoExecuteToggle, 
  onEmergencyStop,
  tradingActive 
}: TradingControlsProps) => {
  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Trading Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="auto-execute" className="text-sm font-medium">
              Auto-Execute Trades
            </Label>
            <p className="text-xs text-muted-foreground">
              Automatically execute AI-recommended trades
            </p>
          </div>
          <Switch
            id="auto-execute"
            checked={autoExecuteEnabled}
            onCheckedChange={onAutoExecuteToggle}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-sm font-medium">Trading Status</Label>
            <p className="text-xs text-muted-foreground">
              Current system status
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${tradingActive ? 'bg-profit' : 'bg-muted'}`} />
            <span className="text-sm">{tradingActive ? 'Active' : 'Inactive'}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button 
            variant="emergency" 
            size="lg" 
            onClick={onEmergencyStop}
            className="w-full"
          >
            <AlertTriangle className="h-5 w-5 mr-2" />
            Emergency Stop
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Immediately halts all trading activity
          </p>
        </div>
      </CardContent>
    </Card>
  );
};