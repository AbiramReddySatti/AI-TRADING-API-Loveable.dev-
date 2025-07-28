import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

interface RiskSettings {
  stopLoss: number;
  takeProfit: number;
  maxPositionSize: number;
  dailyLossLimit: number;
}

interface RiskManagementProps {
  settings: RiskSettings;
  onUpdateSettings: (settings: RiskSettings) => void;
}

export const RiskManagement = ({ settings, onUpdateSettings }: RiskManagementProps) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onUpdateSettings(localSettings);
  };

  const handleInputChange = (field: keyof RiskSettings, value: string) => {
    const numValue = parseFloat(value) || 0;
    setLocalSettings(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-warning" />
          Risk Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stop-loss" className="flex items-center gap-1 text-sm">
              <TrendingDown className="h-4 w-4 text-loss" />
              Stop Loss (%)
            </Label>
            <Input
              id="stop-loss"
              type="number"
              value={localSettings.stopLoss}
              onChange={(e) => handleInputChange('stopLoss', e.target.value)}
              placeholder="5"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="take-profit" className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-profit" />
              Take Profit (%)
            </Label>
            <Input
              id="take-profit"
              type="number"
              value={localSettings.takeProfit}
              onChange={(e) => handleInputChange('takeProfit', e.target.value)}
              placeholder="10"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="position-size" className="text-sm">
            Max Position Size ($)
          </Label>
          <Input
            id="position-size"
            type="number"
            value={localSettings.maxPositionSize}
            onChange={(e) => handleInputChange('maxPositionSize', e.target.value)}
            placeholder="1000"
            min="0"
            step="100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="daily-limit" className="text-sm">
            Daily Loss Limit ($)
          </Label>
          <Input
            id="daily-limit"
            type="number"
            value={localSettings.dailyLossLimit}
            onChange={(e) => handleInputChange('dailyLossLimit', e.target.value)}
            placeholder="500"
            min="0"
            step="50"
          />
        </div>

        <Button onClick={handleSave} className="w-full">
          Update Risk Settings
        </Button>

        <div className="p-3 bg-muted rounded-lg text-xs text-muted-foreground">
          <p>Risk controls help protect your capital by automatically closing positions when preset limits are reached.</p>
        </div>
      </CardContent>
    </Card>
  );
};