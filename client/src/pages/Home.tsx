import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";

type Tier = "free" | "personal" | "enterprise";

interface PlatformData {
  name: string;
  color: string;
  tiers: {
    [key in Tier]: {
      price: number;
      features: string[];
      support: string;
      scalability: string;
      security: string[];
      scores: {
        price: number;
        features: number;
        support: number;
        scalability: number;
        security: number;
        total: number;
      };
    };
  };
}

const platformData: PlatformData[] = [
  {
    name: "Manus AI",
    color: "from-orange-500 to-orange-600",
    tiers: {
      free: {
        price: 0,
        features: ["Limited autonomous task execution", "Basic research"],
        support: "Help center",
        scalability: "Low",
        security: ["Standard encryption"],
        scores: { price: 10, features: 6, support: 4, scalability: 4, security: 5, total: 5.8 },
      },
      personal: {
        price: 20,
        features: ["4,000 credits/mo", "300 daily refresh", "20 concurrent tasks", "Web/slides/design"],
        support: "Email support",
        scalability: "Medium",
        security: ["Standard encryption"],
        scores: { price: 9, features: 7, support: 6, scalability: 7, security: 5, total: 6.8 },
      },
      enterprise: {
        price: 200,
        features: ["40,000 credits/mo", "Team plan", "SSO", "API access", "Wide Research", "Data analytics"],
        support: "Priority support, dedicated assistance",
        scalability: "High",
        security: ["SOC 2 Type 1/2", "ISO 27001/27701", "SSO", "Meta infrastructure"],
        scores: { price: 5, features: 10, support: 10, scalability: 10, security: 10, total: 8.55 },
      },
    },
  },
  {
    name: "ChatGPT",
    color: "from-teal-500 to-teal-600",
    tiers: {
      free: {
        price: 0,
        features: ["Access to GPT-4o", "Limited web browsing", "Data analysis", "Vision"],
        support: "Self-service help center",
        scalability: "Low",
        security: ["Standard encryption", "Data used for training (opt-out available)"],
        scores: { price: 10, features: 8, support: 4, scalability: 4, security: 6, total: 6.4 },
      },
      personal: {
        price: 20,
        features: ["Full GPT-4o access", "DALL-E", "Advanced voice", "Priority access"],
        support: "Standard email support",
        scalability: "Medium",
        security: ["Standard encryption", "Opt-out for training"],
        scores: { price: 9, features: 9, support: 6, scalability: 7, security: 7, total: 7.6 },
      },
      enterprise: {
        price: 60,
        features: ["Unlimited high-speed GPT-4o", "Admin console", "SSO", "Analytics", "Expanded context"],
        support: "Priority support, dedicated account manager",
        scalability: "High",
        security: ["SOC 2 compliant", "Data not used for training", "SSO", "Enterprise controls"],
        scores: { price: 7, features: 9, support: 10, scalability: 10, security: 9, total: 8.45 },
      },
    },
  },
  {
    name: "Claude",
    color: "from-purple-500 to-purple-600",
    tiers: {
      free: {
        price: 0,
        features: ["Access to Claude 3.5 Sonnet", "Basic chat", "Limited usage"],
        support: "Help center",
        scalability: "Low",
        security: ["Standard encryption"],
        scores: { price: 10, features: 7, support: 4, scalability: 4, security: 5, total: 6.2 },
      },
      personal: {
        price: 20,
        features: ["Claude 3.5 Sonnet/Opus", "Priority access", "Early features", "Higher limits"],
        support: "Priority email support",
        scalability: "Medium",
        security: ["Standard encryption", "Data not used for training"],
        scores: { price: 9, features: 8, support: 8, scalability: 7, security: 8, total: 8.0 },
      },
      enterprise: {
        price: 20,
        features: ["500k context window", "GitHub integration", "Activity feeds", "Admin controls"],
        support: "Priority support, onboarding",
        scalability: "High",
        security: ["SOC 2 Type II", "SSO", "HIPAA compliance support", "Data not used for training"],
        scores: { price: 10, features: 9, support: 9, scalability: 9, security: 9, total: 8.15 },
      },
    },
  },
  {
    name: "Gemini",
    color: "from-yellow-500 to-yellow-600",
    tiers: {
      free: {
        price: 0,
        features: ["Access to Gemini Pro", "Google Workspace integration (limited)"],
        support: "Google Help",
        scalability: "Low",
        security: ["Standard Google security"],
        scores: { price: 10, features: 6, support: 4, scalability: 4, security: 6, total: 6.0 },
      },
      personal: {
        price: 20,
        features: ["Gemini Ultra 1.0/1.5 Pro", "2TB storage", "Workspace integration"],
        support: "Google One support",
        scalability: "Medium",
        security: ["Standard encryption", "Workspace data protection"],
        scores: { price: 9, features: 8, support: 6, scalability: 7, security: 7, total: 7.4 },
      },
      enterprise: {
        price: 30,
        features: ["Full Workspace AI integration", "Enterprise-grade security", "Higher usage limits"],
        support: "24/7 Enterprise support",
        scalability: "High",
        security: ["SOC 1/2/3", "ISO 27001", "HIPAA", "Data not used for training"],
        scores: { price: 9, features: 8, support: 10, scalability: 9, security: 9, total: 8.15 },
      },
    },
  },
];

const weights = {
  price: 0.25,
  features: 0.3,
  support: 0.1,
  scalability: 0.15,
  security: 0.2,
};

export default function Home() {
  const [selectedTier, setSelectedTier] = useState<Tier>("enterprise");
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>(null);

  const sortedPlatforms = [...platformData].sort(
    (a, b) => b.tiers[selectedTier].scores.total - a.tiers[selectedTier].scores.total
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container py-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">AI Platform Comparison 2026</h1>
          <p className="text-lg text-muted-foreground">
            Compare Claude, Gemini, ChatGPT, and Manus AI across price, features, support, scalability, and security.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        {/* Tier Selector */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Select Tier</h2>
          <Tabs value={selectedTier} onValueChange={(v) => setSelectedTier(v as Tier)}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Scoring Methodology */}
        <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-5">
          {Object.entries(weights).map(([category, weight]) => (
            <Card key={category} className="p-4">
              <h3 className="font-semibold text-foreground capitalize mb-2">{category}</h3>
              <p className="text-2xl font-bold text-accent">{(weight * 100).toFixed(0)}%</p>
              <p className="text-xs text-muted-foreground mt-2">Weight in scoring</p>
            </Card>
          ))}
        </div>

        {/* Platform Comparison Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Platform Rankings</h2>
          {sortedPlatforms.map((platform) => {
            const tierData = platform.tiers[selectedTier];
            const isExpanded = expandedPlatform === platform.name;

            return (
              <Card
                key={platform.name}
                className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
                onClick={() => setExpandedPlatform(isExpanded ? null : platform.name)}
              >
                <div className={`bg-gradient-to-r ${platform.color} p-6 text-white`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{platform.name}</h3>
                      <div className="flex gap-4 items-center">
                        <div>
                          <p className="text-sm opacity-90">Monthly Price</p>
                          <p className="text-3xl font-bold">${tierData.price}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Total Score</p>
                          <p className="text-3xl font-bold">{tierData.scores.total.toFixed(2)}/10</p>
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                {/* Score Breakdown */}
                <div className="p-6 bg-card border-b border-border">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(tierData.scores).map(([key, score]) => {
                      if (key === "total") return null;
                      return (
                        <div key={key}>
                          <p className="text-sm text-muted-foreground capitalize mb-2">{key}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-accent h-full transition-all"
                                style={{ width: `${(score / 10) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-foreground w-8">{score}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-6 bg-background space-y-6 border-t border-border">
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {tierData.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Support */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Support</h4>
                      <p className="text-muted-foreground">{tierData.support}</p>
                    </div>

                    {/* Scalability */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Scalability</h4>
                      <p className="text-muted-foreground">{tierData.scalability}</p>
                    </div>

                    {/* Security */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Security & Compliance</h4>
                      <div className="flex flex-wrap gap-2">
                        {tierData.security.map((cert, idx) => (
                          <Badge key={idx} variant="outline">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Summary Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Methodology</h3>
            <p className="text-muted-foreground mb-4">
              Our comparison uses a weighted scoring model across five key dimensions:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Price (25%):</strong> Cost-effectiveness across tiers
              </li>
              <li>
                <strong className="text-foreground">Features (30%):</strong> Capabilities and integrations
              </li>
              <li>
                <strong className="text-foreground">Support (10%):</strong> Availability and responsiveness
              </li>
              <li>
                <strong className="text-foreground">Scalability (15%):</strong> Enterprise deployment ease
              </li>
              <li>
                <strong className="text-foreground">Security (20%):</strong> Compliance and data privacy
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Key Insights</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Manus AI</strong> leads in autonomous task execution and research capabilities.
              </li>
              <li>
                <strong className="text-foreground">ChatGPT</strong> remains the most versatile for general productivity.
              </li>
              <li>
                <strong className="text-foreground">Claude</strong> offers the best value with massive context windows.
              </li>
              <li>
                <strong className="text-foreground">Gemini</strong> excels for Google Workspace integration.
              </li>
            </ul>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container py-8 text-center text-muted-foreground">
          <p>AI Platform Comparison 2026 • Data current as of April 2026</p>
        </div>
      </footer>
    </div>
  );
}
