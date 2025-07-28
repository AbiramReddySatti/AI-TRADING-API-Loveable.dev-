import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface AIAnalysis {
  symbol: string;
  action: "BUY" | "SELL" | "HOLD";
  confidence: number;
  reasoning: string;
  targetPrice: number;
  currentPrice: number;
}

interface AIAnalysisCardProps {
  analysis: AIAnalysis;
  onExecute: (analysis: AIAnalysis) => void;
  autoExecuteEnabled: boolean;
}

export const AIAnalysisCard = ({ analysis, onExecute, autoExecuteEnabled }: AIAnalysisCardProps) => {
  const getActionIcon = () => {
    switch (analysis.action) {
      case "BUY":
        return <TrendingUp className="h-5 w-5" />;
      case "SELL":
        return <TrendingDown className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getActionVariant = () => {
    switch (analysis.action) {
      case "BUY":
        return "profit";
      case "SELL":
        return "loss";
      default:
        return "warning";
    }
  };

  const priceChange = ((analysis.targetPrice - analysis.currentPrice) / analysis.currentPrice) * 100;

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-ai-primary" />
          AI Analysis: {analysis.symbol}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getActionIcon()}
            <span className="text-lg font-semibold">{analysis.action}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Confidence</div>
            <div className="text-lg font-bold">{analysis.confidence}%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Current Price</div>
            <div className="text-lg font-semibold">${analysis.currentPrice.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Target Price</div>
            <div className="text-lg font-semibold">${analysis.targetPrice.toFixed(2)}</div>
          </div>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">AI Reasoning</div>
          <p className="text-sm">{analysis.reasoning}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            Expected: 
            <span className={`ml-1 font-semibold ${priceChange > 0 ? 'text-profit' : 'text-loss'}`}>
              {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </span>
          </div>
          <Button 
            variant={getActionVariant()} 
            onClick={() => onExecute(analysis)}
            disabled={autoExecuteEnabled}
            size="sm"
          >
            {autoExecuteEnabled ? 'Auto-Execute' : 'Execute Trade'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};