import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store';

export function DICCalculator() {
  const { trackEvent } = useAppStore();
  const [hasRiskFactor, setHasRiskFactor] = useState<boolean | null>(null);
  const [plateletScore, setPlateletScore] = useState<number>(0);
  const [dDimerScore, setDDimerScore] = useState<number>(0);
  const [ptScore, setPtScore] = useState<number>(0);
  const [fibrinogenScore, setFibrinogenScore] = useState<number>(0);
  const [showResult, setShowResult] = useState(false);

  const calculateScore = () => {
    return plateletScore + dDimerScore + ptScore + fibrinogenScore;
  };

  const handleCalculate = () => {
    if (hasRiskFactor === null) {
      alert('Please indicate if patient has an underlying disorder associated with DIC');
      return;
    }
    if (!hasRiskFactor) {
      alert('Patient must have an underlying disorder associated with DIC to use this scoring system');
      return;
    }
    setShowResult(true);
    trackEvent({
      eventType: 'interact',
      data: {
        calculator: 'ISTH DIC',
        score: calculateScore(),
      },
    });
  };

  const handleReset = () => {
    setHasRiskFactor(null);
    setPlateletScore(0);
    setDDimerScore(0);
    setPtScore(0);
    setFibrinogenScore(0);
    setShowResult(false);
  };

  const score = calculateScore();
  const isOvertDIC = score >= 5;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>ISTH Overt DIC Score</CardTitle>
              <CardDescription>
                International Society on Thrombosis and Haemostasis scoring system
              </CardDescription>
            </div>
            <Badge variant="outline">v2001</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="info">
            <AlertTitle>When to Use</AlertTitle>
            <AlertDescription>
              Use this score in patients with conditions known to be associated with DIC
              (sepsis, trauma, malignancy, obstetric complications, severe pancreatitis).
              The score helps identify overt DIC requiring intervention.
            </AlertDescription>
          </Alert>

          {/* Risk Factor Assessment */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">1. Risk Assessment (Required)</h3>
            <p className="text-sm text-muted-foreground">
              Does the patient have an underlying disorder known to be associated with DIC?
            </p>
            <div className="flex gap-3">
              <Button
                variant={hasRiskFactor === true ? 'default' : 'outline'}
                onClick={() => {
                  setHasRiskFactor(true);
                  setShowResult(false);
                }}
                className="flex-1"
              >
                Yes
              </Button>
              <Button
                variant={hasRiskFactor === false ? 'destructive' : 'outline'}
                onClick={() => {
                  setHasRiskFactor(false);
                  setShowResult(false);
                }}
                className="flex-1"
              >
                No
              </Button>
            </div>
            {hasRiskFactor === false && (
              <Alert variant="warning">
                <AlertDescription>
                  If no underlying disorder is present, DIC is unlikely. Consider alternative diagnoses.
                </AlertDescription>
              </Alert>
            )}
          </div>

          {hasRiskFactor && (
            <>
              {/* Platelet Count */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">2. Platelet Count</h3>
                <div className="space-y-2">
                  {[
                    { label: '>100 × 10⁹/L', value: 0 },
                    { label: '<100 × 10⁹/L', value: 1 },
                    { label: '<50 × 10⁹/L', value: 2 },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors ${
                        plateletScore === option.value ? 'bg-accent border-primary' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="platelet"
                        checked={plateletScore === option.value}
                        onChange={() => {
                          setPlateletScore(option.value);
                          setShowResult(false);
                        }}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <span className="flex-1">{option.label}</span>
                      <Badge variant="outline">{option.value} pt</Badge>
                    </label>
                  ))}
                </div>
              </div>

              {/* D-dimer */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">3. D-dimer / Fibrin Degradation Products</h3>
                <div className="space-y-2">
                  {[
                    { label: 'No increase', value: 0 },
                    { label: 'Moderate increase', value: 2, detail: '(typically 2-4× upper limit)' },
                    { label: 'Strong increase', value: 3, detail: '(typically >5× upper limit)' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors ${
                        dDimerScore === option.value ? 'bg-accent border-primary' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="ddimer"
                        checked={dDimerScore === option.value}
                        onChange={() => {
                          setDDimerScore(option.value);
                          setShowResult(false);
                        }}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <div className="flex-1">
                        <span>{option.label}</span>
                        {option.detail && (
                          <p className="text-xs text-muted-foreground">{option.detail}</p>
                        )}
                      </div>
                      <Badge variant="outline">{option.value} pt</Badge>
                    </label>
                  ))}
                </div>
              </div>

              {/* PT Prolongation */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">4. Prothrombin Time (PT) Prolongation</h3>
                <div className="space-y-2">
                  {[
                    { label: '<3 seconds above normal', value: 0 },
                    { label: '3-6 seconds above normal', value: 1 },
                    { label: '>6 seconds above normal', value: 2 },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors ${
                        ptScore === option.value ? 'bg-accent border-primary' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="pt"
                        checked={ptScore === option.value}
                        onChange={() => {
                          setPtScore(option.value);
                          setShowResult(false);
                        }}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <span className="flex-1">{option.label}</span>
                      <Badge variant="outline">{option.value} pt</Badge>
                    </label>
                  ))}
                </div>
              </div>

              {/* Fibrinogen */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">5. Fibrinogen Level</h3>
                <div className="space-y-2">
                  {[
                    { label: '>100 mg/dL (>1.0 g/L)', value: 0 },
                    { label: '<100 mg/dL (<1.0 g/L)', value: 1 },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors ${
                        fibrinogenScore === option.value ? 'bg-accent border-primary' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="fibrinogen"
                        checked={fibrinogenScore === option.value}
                        onChange={() => {
                          setFibrinogenScore(option.value);
                          setShowResult(false);
                        }}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <span className="flex-1">{option.label}</span>
                      <Badge variant="outline">{option.value} pt</Badge>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {hasRiskFactor && (
            <div className="flex gap-3">
              <Button onClick={handleCalculate} className="flex-1">
                Calculate Score
              </Button>
              <Button onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>
          )}

          {showResult && hasRiskFactor && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">ISTH DIC Score:</span>
                <Badge variant={isOvertDIC ? 'destructive' : 'secondary'} className="text-lg px-4 py-2">
                  {score} points
                </Badge>
              </div>

              <Alert variant={isOvertDIC ? 'destructive' : 'info'}>
                <AlertTitle className="text-lg">
                  {isOvertDIC ? 'Compatible with Overt DIC' : 'Not Compatible with Overt DIC'}
                </AlertTitle>
                <AlertDescription className="space-y-3 mt-2">
                  {isOvertDIC ? (
                    <>
                      <p className="font-medium">Score ≥5 is compatible with overt DIC</p>
                      <p>Management considerations:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Treat underlying disorder aggressively</li>
                        <li>Consider transfusion support based on clinical context</li>
                        <li>Platelet transfusion: Generally if &lt;10-20 × 10⁹/L and bleeding, or &lt;50 × 10⁹/L with invasive procedures</li>
                        <li>FFP/cryoprecipitate if bleeding and coagulopathy</li>
                        <li>Monitor serial labs (platelets, PT, fibrinogen, D-dimer)</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p>Score &lt;5 does not meet criteria for overt DIC</p>
                      <p>Consider:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Non-overt (early) DIC - repeat scoring in 24-48 hours</li>
                        <li>Alternative diagnoses (TTP, HUS, ITP, liver disease)</li>
                        <li>Continue treating underlying condition</li>
                      </ul>
                    </>
                  )}
                </AlertDescription>
              </Alert>

              <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
                <h4 className="font-semibold">Clinical Pearls</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>DIC is a dynamic process - serial scoring may be needed</li>
                  <li>Normal PT/aPTT does NOT exclude DIC (may see isolated thrombocytopenia early)</li>
                  <li>Fibrinogen is an acute phase reactant - may be normal/elevated despite consumption</li>
                  <li>Avoid prophylactic platelet transfusion in non-bleeding patients</li>
                  <li>Heparin may be considered in thrombotic-predominant DIC (purpura fulminans, acral ischemia)</li>
                </ul>
              </div>

              <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
                <p className="font-semibold">Reference:</p>
                <p>
                  Taylor FB Jr, et al. Towards definition, clinical and laboratory criteria, and a scoring
                  system for disseminated intravascular coagulation. Thromb Haemost. 2001;86(5):1327-1330.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Alert variant="warning">
        <AlertTitle>Clinical Disclaimer</AlertTitle>
        <AlertDescription>
          This calculator is for educational purposes only. Clinical decisions should be made in
          consultation with appropriate specialists and based on the full clinical picture.
        </AlertDescription>
      </Alert>
    </div>
  );
}
