import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PlasmicCalculator } from '@/components/calculators/PlasmicCalculator';
import { DICCalculator } from '@/components/calculators/DICalculator';
import { CoagulationPanelSimulator } from '@/components/lab/CoagulationPanelSimulator';

type CalculatorType = 'plasmic' | 'dic' | 'coag' | null;

export function Calculators() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(null);

  const calculators = [
    {
      id: 'plasmic' as const,
      name: 'PLASMIC Score',
      description: 'Rapid assessment for TTP likelihood',
      version: 'v2017',
      useCase: 'Predicts severe ADAMTS13 deficiency in suspected TTP',
    },
    {
      id: 'dic' as const,
      name: 'ISTH DIC Score',
      description: 'Overt DIC scoring system',
      version: 'v2001',
      useCase: 'Identifies overt disseminated intravascular coagulation',
    },
    {
      id: 'coag' as const,
      name: 'Coagulation Panel Simulator',
      description: 'Pattern recognition and interpretation',
      version: 'Interactive',
      useCase: 'Analyzes coagulation studies to differentiate consumptive vs other coagulopathies',
    },
  ];

  if (activeCalculator) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setActiveCalculator(null)}>
            ← Back to Calculators
          </Button>
        </div>
        {activeCalculator === 'plasmic' && <PlasmicCalculator />}
        {activeCalculator === 'dic' && <DICCalculator />}
        {activeCalculator === 'coag' && <CoagulationPanelSimulator />}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Clinical Calculators</h1>
        <p className="text-muted-foreground">
          Evidence-based scoring tools for diagnostic assessment
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {calculators.map((calc) => (
          <Card key={calc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle>{calc.name}</CardTitle>
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {calc.version}
                </span>
              </div>
              <CardDescription>{calc.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <strong>Use Case:</strong> {calc.useCase}
              </div>
              <Button
                onClick={() => setActiveCalculator(calc.id)}
                className="w-full"
              >
                Open Calculator
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About These Calculators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-semibold mb-1">PLASMIC Score</h4>
              <p className="text-muted-foreground">
                Validated tool to predict severe ADAMTS13 deficiency (&lt;10% activity) in adults with
                suspected thrombotic microangiopathy. High scores (6-7) warrant empiric plasma exchange
                while awaiting confirmatory testing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">ISTH DIC Score</h4>
              <p className="text-muted-foreground">
                International Society on Thrombosis and Haemostasis criteria for overt disseminated
                intravascular coagulation. Requires presence of an underlying disorder associated with
                DIC. Score ≥5 indicates overt DIC.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2 text-sm">Clinical Pearls</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Always correlate calculator results with clinical presentation</li>
              <li>These tools aid but do not replace clinical judgment</li>
              <li>Consider specialist consultation for complex cases</li>
              <li>Serial assessments may be needed for evolving conditions</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
