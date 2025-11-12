import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store';

interface PlasmicCriteria {
  plateletLow: boolean;
  hemolysis: boolean;
  noActiveCancer: boolean;
  noTransplant: boolean;
  mcvLow: boolean;
  inrNormal: boolean;
  creatinineNormal: boolean;
}

export function PlasmicCalculator() {
  const { trackEvent } = useAppStore();
  const [criteria, setCriteria] = useState<PlasmicCriteria>({
    plateletLow: false,
    hemolysis: false,
    noActiveCancer: false,
    noTransplant: false,
    mcvLow: false,
    inrNormal: false,
    creatinineNormal: false,
  });

  const [showResult, setShowResult] = useState(false);

  const handleToggle = (key: keyof PlasmicCriteria) => {
    setCriteria((prev) => ({ ...prev, [key]: !prev[key] }));
    setShowResult(false);
  };

  const calculateScore = () => {
    return Object.values(criteria).filter(Boolean).length;
  };

  const handleCalculate = () => {
    setShowResult(true);
    trackEvent({
      eventType: 'interact',
      data: {
        calculator: 'PLASMIC',
        score: calculateScore(),
      },
    });
  };

  const handleReset = () => {
    setCriteria({
      plateletLow: false,
      hemolysis: false,
      noActiveCancer: false,
      noTransplant: false,
      mcvLow: false,
      inrNormal: false,
      creatinineNormal: false,
    });
    setShowResult(false);
  };

  const score = calculateScore();
  const getRiskLevel = () => {
    if (score <= 4) return 'low';
    if (score === 5) return 'intermediate';
    return 'high';
  };

  const getRiskColor = () => {
    const risk = getRiskLevel();
    if (risk === 'low') return 'success';
    if (risk === 'intermediate') return 'warning';
    return 'destructive';
  };

  const getInterpretation = () => {
    const risk = getRiskLevel();
    if (risk === 'low') {
      return {
        likelihood: '<5% likelihood of severe ADAMTS13 deficiency (<10%)',
        recommendation: 'Consider alternative diagnoses. ADAMTS13 testing may still be appropriate based on clinical context.',
        urgency: 'low' as const,
      };
    }
    if (risk === 'intermediate') {
      return {
        likelihood: '5-24% likelihood of severe ADAMTS13 deficiency',
        recommendation: 'Send ADAMTS13 activity level. Consider plasma exchange if high clinical suspicion.',
        urgency: 'medium' as const,
      };
    }
    return {
      likelihood: '>70% likelihood of severe ADAMTS13 deficiency',
      recommendation: 'HIGH SUSPICION FOR TTP. Initiate urgent plasma exchange empirically while awaiting ADAMTS13 results.',
      urgency: 'critical' as const,
    };
  };

  const criteriaItems = [
    {
      key: 'plateletLow' as keyof PlasmicCriteria,
      label: 'Platelet count <30 × 10⁹/L',
      detail: '(or <30,000/μL)',
    },
    {
      key: 'hemolysis' as keyof PlasmicCriteria,
      label: 'Evidence of hemolysis',
      detail: 'Reticulocyte count >2.5%, OR undetectable haptoglobin, OR indirect bilirubin >2 mg/dL',
    },
    {
      key: 'noActiveCancer' as keyof PlasmicCriteria,
      label: 'No active cancer',
      detail: 'No history of active malignancy',
    },
    {
      key: 'noTransplant' as keyof PlasmicCriteria,
      label: 'No transplant history',
      detail: 'No solid-organ or stem-cell transplant',
    },
    {
      key: 'mcvLow' as keyof PlasmicCriteria,
      label: 'MCV <90 fL',
      detail: 'Mean corpuscular volume below 90 femtoliters',
    },
    {
      key: 'inrNormal' as keyof PlasmicCriteria,
      label: 'INR <1.5',
      detail: 'International normalized ratio below 1.5',
    },
    {
      key: 'creatinineNormal' as keyof PlasmicCriteria,
      label: 'Creatinine <2.0 mg/dL',
      detail: 'Serum creatinine below 2.0 mg/dL (or <177 μmol/L)',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>PLASMIC Score Calculator</CardTitle>
              <CardDescription>
                Rapid assessment tool for thrombotic microangiopathies
              </CardDescription>
            </div>
            <Badge variant="outline">v2017</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="info">
            <AlertTitle>Clinical Context</AlertTitle>
            <AlertDescription>
              The PLASMIC score helps predict the likelihood of severe ADAMTS13 deficiency in patients with suspected TTP.
              Use this tool for adults presenting with thrombocytopenia and microangiopathic hemolytic anemia.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Criteria (1 point each)</h3>
            {criteriaItems.map((item) => (
              <div
                key={item.key}
                className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleToggle(item.key)}
              >
                <input
                  type="checkbox"
                  checked={criteria[item.key]}
                  onChange={() => handleToggle(item.key)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                  aria-label={item.label}
                />
                <div className="flex-1">
                  <label className="font-medium cursor-pointer">{item.label}</label>
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCalculate} className="flex-1">
              Calculate Score
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>

          {showResult && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">PLASMIC Score:</span>
                <Badge variant={getRiskColor()} className="text-lg px-4 py-2">
                  {score} / 7
                </Badge>
              </div>

              <Alert variant={getRiskLevel() === 'high' ? 'destructive' : getRiskLevel() === 'intermediate' ? 'warning' : 'info'}>
                <AlertTitle className="text-lg">
                  {getRiskLevel().toUpperCase()} Risk
                </AlertTitle>
                <AlertDescription className="space-y-3 mt-2">
                  <p className="font-medium">{getInterpretation().likelihood}</p>
                  <p>{getInterpretation().recommendation}</p>
                </AlertDescription>
              </Alert>

              {getRiskLevel() === 'high' && (
                <Alert variant="destructive">
                  <AlertTitle>⚠️ URGENT ACTION REQUIRED</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>DO NOT DELAY plasma exchange while awaiting ADAMTS13 results</li>
                      <li>Contact hematology immediately</li>
                      <li>Avoid platelet transfusion unless life-threatening bleeding</li>
                      <li>Consider corticosteroids and caplacizumab</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
                <h4 className="font-semibold">Clinical Pearls</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>PLASMIC score of 6-7 has {'>'}70% positive predictive value for severe ADAMTS13 deficiency</li>
                  <li>Score calculated before ADAMTS13 results are available</li>
                  <li>Does not replace clinical judgment - empiric treatment may be warranted even with lower scores</li>
                  <li>Send ADAMTS13 activity and inhibitor testing before starting plasma exchange when possible</li>
                </ul>
              </div>

              <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
                <p className="font-semibold">Reference:</p>
                <p>
                  Bendapudi PK, et al. Derivation and external validation of the PLASMIC score for rapid
                  assessment of adults with thrombotic microangiopathies: a cohort study. Lancet Haematol.
                  2017;4(4):e157-e164.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Alert variant="warning">
        <AlertTitle>Clinical Disclaimer</AlertTitle>
        <AlertDescription>
          This calculator is for educational purposes and should not replace clinical judgment.
          Always consult with appropriate specialists and consider the full clinical context when
          making treatment decisions.
        </AlertDescription>
      </Alert>
    </div>
  );
}
