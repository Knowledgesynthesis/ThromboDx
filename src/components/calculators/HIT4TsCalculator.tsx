import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store';

interface HIT4TsScores {
  thrombocytopenia: number;
  timing: number;
  thrombosis: number;
  otherCauses: number;
}

export function HIT4TsCalculator() {
  const { trackEvent } = useAppStore();

  const [scores, setScores] = useState<HIT4TsScores>({
    thrombocytopenia: -1,
    timing: -1,
    thrombosis: -1,
    otherCauses: -1,
  });

  const [showResult, setShowResult] = useState(false);

  const handleScoreChange = (category: keyof HIT4TsScores, value: number) => {
    setScores((prev) => ({ ...prev, [category]: value }));
    setShowResult(false);
  };

  const calculateScore = () => {
    return scores.thrombocytopenia + scores.timing + scores.thrombosis + scores.otherCauses;
  };

  const handleCalculate = () => {
    const allSelected = Object.values(scores).every(score => score !== -1);
    if (!allSelected) {
      alert('Please select an option for all 4 categories');
      return;
    }

    setShowResult(true);
    trackEvent({
      eventType: 'interact',
      data: {
        calculator: 'HIT 4Ts',
        score: calculateScore(),
      },
    });
  };

  const handleReset = () => {
    setScores({
      thrombocytopenia: -1,
      timing: -1,
      thrombosis: -1,
      otherCauses: -1,
    });
    setShowResult(false);
  };

  const score = calculateScore();

  const getRiskLevel = () => {
    if (score <= 3) return 'low';
    if (score <= 5) return 'intermediate';
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
        probability: '~0.1-1% likelihood of HIT',
        recommendation: 'HIT is unlikely. Consider alternative diagnoses. Routine HIT testing not recommended.',
        actions: [
          'Continue heparin if clinically indicated',
          'No need for HIT antibody testing in most cases',
          'Consider other causes of thrombocytopenia',
        ],
      };
    }

    if (risk === 'intermediate') {
      return {
        probability: '~10-30% likelihood of HIT',
        recommendation: 'Moderate suspicion for HIT. Send HIT antibody testing and consider stopping heparin pending results.',
        actions: [
          'Send HIT antibody panel (immunoassay)',
          'Consider stopping heparin, especially if alternative anticoagulation needed',
          'If stopping heparin, use alternative anticoagulant (argatroban, bivalirudin, fondaparinux)',
          'Avoid platelet transfusions unless bleeding',
          'Confirmatory serotonin release assay may be needed if immunoassay positive',
        ],
      };
    }

    return {
      probability: '~50-80% likelihood of HIT',
      recommendation: 'HIGH suspicion for HIT. STOP heparin immediately and start alternative anticoagulation while awaiting confirmatory testing.',
      actions: [
        'STOP all heparin (including flushes) immediately',
        'Send HIT antibody panel urgently',
        'Start alternative anticoagulant IMMEDIATELY (argatroban, bivalirudin, fondaparinux)',
        'DO NOT give platelet transfusions (increases thrombosis risk)',
        'Screen for thrombosis (DVT/PE, limb ischemia)',
        'DO NOT give warfarin until platelets >150 × 10⁹/L (risk of limb gangrene)',
        'Confirmatory testing (serotonin release assay) if immunoassay positive',
      ],
    };
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>HIT 4Ts Score Calculator</CardTitle>
              <CardDescription>
                Pre-test probability assessment for Heparin-Induced Thrombocytopenia
              </CardDescription>
            </div>
            <Badge variant="outline">v2012</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="info">
            <AlertTitle>Clinical Context</AlertTitle>
            <AlertDescription>
              The 4Ts score helps estimate the pretest probability of HIT in patients with thrombocytopenia
              who are receiving or have recently received heparin. Use this before ordering HIT antibody testing.
            </AlertDescription>
          </Alert>

          {/* Category 1: Thrombocytopenia */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">1. Thrombocytopenia</h3>
            <div className="space-y-2">
              {[
                { label: 'Platelet fall >50% AND nadir ≥20 × 10⁹/L', value: 2 },
                { label: 'Platelet fall 30-50% OR nadir 10-19 × 10⁹/L', value: 1 },
                { label: 'Platelet fall <30% OR nadir <10 × 10⁹/L', value: 0 },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors ${
                    scores.thrombocytopenia === option.value ? 'bg-accent border-primary' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="thrombocytopenia"
                    checked={scores.thrombocytopenia === option.value}
                    onChange={() => handleScoreChange('thrombocytopenia', option.value)}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span className="flex-1">{option.label}</span>
                  <Badge variant="outline">{option.value} pt</Badge>
                </label>
              ))}
            </div>
          </div>

          {/* Category 2: Timing */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">2. Timing of Platelet Count Fall</h3>
            <div className="space-y-2">
              {[
                { label: 'Clear onset days 5-10 OR ≤1 day (prior heparin exposure within 30 days)', value: 2 },
                { label: 'Consistent with days 5-10 but not clear OR onset after day 10 OR ≤1 day (prior heparin exposure 30-100 days ago)', value: 1 },
                { label: 'Platelet count fall <4 days without recent exposure', value: 0 },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors ${
                    scores.timing === option.value ? 'bg-accent border-primary' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="timing"
                    checked={scores.timing === option.value}
                    onChange={() => handleScoreChange('timing', option.value)}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span className="flex-1 text-sm">{option.label}</span>
                  <Badge variant="outline">{option.value} pt</Badge>
                </label>
              ))}
            </div>
          </div>

          {/* Category 3: Thrombosis */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">3. Thrombosis or Other Sequelae</h3>
            <div className="space-y-2">
              {[
                { label: 'New thrombosis OR skin necrosis OR acute systemic reaction post-heparin bolus', value: 2 },
                { label: 'Progressive or recurrent thrombosis OR non-necrotizing skin lesions OR suspected thrombosis (not proven)', value: 1 },
                { label: 'None', value: 0 },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors ${
                    scores.thrombosis === option.value ? 'bg-accent border-primary' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="thrombosis"
                    checked={scores.thrombosis === option.value}
                    onChange={() => handleScoreChange('thrombosis', option.value)}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span className="flex-1 text-sm">{option.label}</span>
                  <Badge variant="outline">{option.value} pt</Badge>
                </label>
              ))}
            </div>
          </div>

          {/* Category 4: Other Causes */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">4. Other Causes for Thrombocytopenia</h3>
            <div className="space-y-2">
              {[
                { label: 'None evident', value: 2 },
                { label: 'Possible other cause', value: 1 },
                { label: 'Definite other cause present', value: 0 },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors ${
                    scores.otherCauses === option.value ? 'bg-accent border-primary' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="otherCauses"
                    checked={scores.otherCauses === option.value}
                    onChange={() => handleScoreChange('otherCauses', option.value)}
                    className="h-4 w-4 text-primary focus:ring-primary"
                  />
                  <span className="flex-1">{option.label}</span>
                  <Badge variant="outline">{option.value} pt</Badge>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCalculate} className="flex-1">
              Calculate Score
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>

          {/* Results */}
          {showResult && (
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">4Ts Score:</span>
                <Badge variant={getRiskColor()} className="text-lg px-4 py-2">
                  {score} / 8
                </Badge>
              </div>

              <Alert variant={getRiskLevel() === 'high' ? 'destructive' : getRiskLevel() === 'intermediate' ? 'warning' : 'success'}>
                <AlertTitle className="text-lg">
                  {getRiskLevel().toUpperCase()} Probability
                </AlertTitle>
                <AlertDescription className="space-y-3 mt-2">
                  <p className="font-medium">{getInterpretation().probability}</p>
                  <p>{getInterpretation().recommendation}</p>

                  <div className="mt-3">
                    <p className="font-semibold mb-2">Recommended Actions:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {getInterpretation().actions.map((action, idx) => (
                        <li key={idx} className="text-sm">{action}</li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>

              {getRiskLevel() === 'high' && (
                <Alert variant="destructive">
                  <AlertTitle>⚠️ HIGH RISK - IMMEDIATE ACTION REQUIRED</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      <li>STOP all heparin products immediately (including line flushes)</li>
                      <li>Start alternative anticoagulant urgently (do not wait for lab confirmation)</li>
                      <li>DO NOT transfuse platelets unless life-threatening bleeding</li>
                      <li>DO NOT start warfarin until platelets {'>'} 150 × 10⁹/L</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
                <h4 className="font-semibold">Clinical Pearls</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Low 4Ts score (0-3) has ~99% negative predictive value - HIT very unlikely</li>
                  <li>High 4Ts score (6-8) has ~50-80% positive predictive value - needs confirmatory testing</li>
                  <li>Typical HIT onset: 5-10 days after heparin exposure</li>
                  <li>Rapid onset HIT (&lt;24h) occurs with recent heparin exposure (within 100 days)</li>
                  <li>HIT antibodies detected by immunoassay (PF4-heparin ELISA) - functional assay (SRA) confirms</li>
                  <li>Warfarin should not be started until platelet recovery to avoid limb gangrene</li>
                </ul>
              </div>

              <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t">
                <p className="font-semibold">References:</p>
                <p>
                  Cuker A, et al. Predictive value of the 4Ts scoring system for heparin-induced thrombocytopenia:
                  a systematic review and meta-analysis. Blood. 2012;120(20):4160-4167.
                </p>
                <p className="mt-1">
                  Linkins LA, et al. Treatment and prevention of heparin-induced thrombocytopenia:
                  Antithrombotic Therapy and Prevention of Thrombosis, 9th ed. Chest. 2012;141(2 Suppl):e495S-e530S.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Alert variant="warning">
        <AlertTitle>Clinical Disclaimer</AlertTitle>
        <AlertDescription>
          This calculator is for educational purposes and clinical decision support. Always integrate
          with full clinical assessment and consult with hematology for suspected or confirmed HIT.
        </AlertDescription>
      </Alert>
    </div>
  );
}
