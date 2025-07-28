import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AIAnalysisCard } from "@/components/AIAnalysisCard";
import { TradingControls } from "@/components/TradingControls";
import { RiskManagement } from "@/components/RiskManagement";
import { MarketOverview } from "@/components/MarketOverview";
import { toast } from "sonner";
import { Brain, BarChart3 } from "lucide-react";
import heroImage from "@/assets/trading-hero.jpg";

const Index = () => {
  const [autoExecuteEnabled, setAutoExecuteEnabled] = useState(false);
  const [tradingActive, setTradingActive] = useState(true);
  const [riskSettings, setRiskSettings] = useState({
    stopLoss: 5,
    takeProfit: 10,
    maxPositionSize: 1000,
    dailyLossLimit: 500,
  });

  // Mock data for demonstration
  const mockAnalysis = {
    symbol: "AAPL",
    action: "BUY" as const,
    confidence: 87,
    reasoning: "Strong earnings beat expectations, positive sentiment from product launches, and technical indicators showing bullish momentum. RSI at 45 suggests room for upward movement.",
    targetPrice: 195.50,
    currentPrice: 182.25,
  };

  const mockMarketData = [
    { symbol: "AAPL", price: 182.25, change: 2.15, changePercent: 1.19, volume: 45230000 },
    { symbol: "MSFT", price: 378.91, change: -1.23, changePercent: -0.32, volume: 28140000 },
    { symbol: "GOOGL", price: 142.68, change: 0.87, changePercent: 0.61, volume: 31250000 },
    { symbol: "TSLA", price: 248.42, change: -3.45, changePercent: -1.37, volume: 52180000 },
  ];

  const handleExecuteTrade = (analysis: any) => {
    toast.success(`${analysis.action} order placed for ${analysis.symbol}`, {
      description: `Target: $${analysis.targetPrice.toFixed(2)} | Confidence: ${analysis.confidence}%`
    });
  };

  const handleEmergencyStop = () => {
    setTradingActive(false);
    setAutoExecuteEnabled(false);
    toast.error("Emergency stop activated - All trading halted", {
      description: "All open orders cancelled and auto-execution disabled"
    });
  };

  const handleAutoExecuteToggle = (enabled: boolean) => {
    setAutoExecuteEnabled(enabled);
    toast.info(enabled ? "Auto-execution enabled" : "Auto-execution disabled", {
      description: enabled ? "AI trades will execute automatically" : "Manual approval required for trades"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-primary/20 to-ai-primary/20 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Trading Dashboard" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-background/40" />
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              AI Trading Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Harness the power of artificial intelligence to make smarter trading decisions with automated risk management.
            </p>
            <div className="flex gap-4">
              <Button variant="ai" size="lg">
                <Brain className="h-5 w-5 mr-2" />
                View AI Analysis
              </Button>
              <Button variant="outline" size="lg">
                <BarChart3 className="h-5 w-5 mr-2" />
                Market Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <AIAnalysisCard 
              analysis={mockAnalysis}
              onExecute={handleExecuteTrade}
              autoExecuteEnabled={autoExecuteEnabled}
            />
            <MarketOverview marketData={mockMarketData} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TradingControls
              autoExecuteEnabled={autoExecuteEnabled}
              onAutoExecuteToggle={handleAutoExecuteToggle}
              onEmergencyStop={handleEmergencyStop}
              tradingActive={tradingActive}
            />
            <RiskManagement
              settings={riskSettings}
              onUpdateSettings={setRiskSettings}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
