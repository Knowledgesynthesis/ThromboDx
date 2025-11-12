import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store';

interface CoagInputs {
  pt: string;
  inr: string;
  aptt: string;
  fibrinogen: string;
  dDimer: string;
  platelets: string;
}

interface InterpretationResult {
  pattern: string;
  likelyDiagnoses: string[];
  keyFindings: string[];
  recommendations: string[];
  severity: 'normal' | 'mild' | 'moderate' | 'severe';
}

export function CoagulationPanelSimulator() {
  const { settings, trackEvent } = useAppStore();

  const [inputs, setInputs] = useState<CoagInputs>({
    pt: '',
    inr: '',
    aptt: '',
    fibrinogen: '',
    dDimer: '',
    platelets: '',
  });

  const [result, setResult] = useState<InterpretationResult | null>(null);

  const handleInputChange = (field: keyof CoagInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setResult(null);
  };

  const interpretPanel = () => {
    const pt = parseFloat(inputs.pt);
    const inr = parseFloat(inputs.inr);
    const aptt = parseFloat(inputs.aptt);
    const fibrinogen = parseFloat(inputs.fibrinogen);
    const dDimer = parseFloat(inputs.dDimer);
    const platelets = parseFloat(inputs.platelets);

    if (isNaN(pt) || isNaN(inr) || isNaN(aptt)) {
      alert('Please enter PT, INR, and aPTT at minimum');
      return;
    }

    const interpretation = analyzeCoagulation(pt, inr, aptt, fibrinogen, dDimer, platelets);
    setResult(interpretation);

    trackEvent({
      eventType: 'interact',
      data: {
        tool: 'Coagulation Panel Simulator',
        pt,
        inr,
        aptt,
      },
    });
  };

  const analyzeCoagulation = (
    pt: number,
    inr: number,
    aptt: number,
    fibrinogen: number,
    dDimer: number,
    platelets: number
  ): InterpretationResult => {
    const ptProlonged = pt > 13.5;
    const apttProlonged = aptt > 35;
    const fibLow = !isNaN(fibrinogen) && fibrinogen < 200;
    const dDimerHigh = !isNaN(dDimer) && dDimer > 500;
    const plateletsLow = !isNaN(platelets) && platelets < 150;

    let pattern = 'Unknown';
    const likelyDiagnoses: string[] = [];
    const keyFindings: string[] = [];
    const recommendations: string[] = [];
    let severity: InterpretationResult['severity'] = 'normal';

    // Pattern Recognition
    if (ptProlonged && apttProlonged && fibLow && dDimerHigh) {
      // Consumptive Coagulopathy Pattern
      pattern = 'Consumptive Coagulopathy';
      likelyDiagnoses.push('Disseminated Intravascular Coagulation (DIC)');
      keyFindings.push('Global coagulation abnormality with consumption');
      keyFindings.push(`PT prolonged (${pt.toFixed(1)} sec, INR ${inr.toFixed(2)})`);
      keyFindings.push(`aPTT prolonged (${aptt.toFixed(1)} sec)`);
      if (!isNaN(fibrinogen)) keyFindings.push(`Low fibrinogen (${fibrinogen} mg/dL)`);
      if (!isNaN(dDimer)) keyFindings.push(`Markedly elevated D-dimer (${dDimer} ng/mL)`);

      recommendations.push('Calculate ISTH DIC score immediately');
      recommendations.push('Identify and treat underlying condition');
      recommendations.push('Consider transfusion support based on bleeding/procedures');
      recommendations.push('Serial monitoring of coagulation parameters');

      severity = fibrinogen < 100 ? 'severe' : 'moderate';
    } else if (ptProlonged && apttProlonged && !fibLow) {
      // Combined Factor Deficiency or Anticoagulation
      pattern = 'Combined Pathway Prolongation';
      likelyDiagnoses.push('Warfarin/Vitamin K antagonist effect');
      likelyDiagnoses.push('Vitamin K deficiency');
      likelyDiagnoses.push('Liver disease');
      likelyDiagnoses.push('Direct thrombin inhibitor effect');

      keyFindings.push('Both PT and aPTT prolonged');
      keyFindings.push('Fibrinogen preserved (argues against DIC)');

      recommendations.push('Check medication history (warfarin, DOACs)');
      recommendations.push('Assess liver function');
      recommendations.push('Consider vitamin K deficiency');

      severity = inr > 3 ? 'moderate' : 'mild';
    } else if (ptProlonged && !apttProlonged) {
      // Extrinsic Pathway
      pattern = 'Isolated PT/INR Prolongation';
      likelyDiagnoses.push('Factor VII deficiency');
      likelyDiagnoses.push('Early warfarin effect');
      likelyDiagnoses.push('Mild liver disease');
      likelyDiagnoses.push('Early vitamin K deficiency');

      keyFindings.push('PT prolonged, aPTT normal');
      keyFindings.push('Suggests extrinsic pathway abnormality');

      recommendations.push('Check Factor VII level');
      recommendations.push('Review medications');
      recommendations.push('Assess liver function and vitamin K status');

      severity = inr > 2 ? 'moderate' : 'mild';
    } else if (!ptProlonged && apttProlonged) {
      // Intrinsic Pathway
      pattern = 'Isolated aPTT Prolongation';
      likelyDiagnoses.push('Heparin effect');
      likelyDiagnoses.push('Factor VIII, IX, XI deficiency');
      likelyDiagnoses.push('von Willebrand disease');
      likelyDiagnoses.push('Lupus anticoagulant');

      keyFindings.push('aPTT prolonged, PT/INR normal');
      keyFindings.push('Suggests intrinsic pathway abnormality');

      recommendations.push('Check heparin level if on anticoagulation');
      recommendations.push('Consider factor assays (VIII, IX, XI)');
      recommendations.push('Consider mixing study');
      recommendations.push('Check for lupus anticoagulant if indicated');

      severity = aptt > 60 ? 'moderate' : 'mild';
    } else if (!ptProlonged && !apttProlonged && plateletsLow) {
      // Isolated Thrombocytopenia
      pattern = 'Normal Coagulation with Thrombocytopenia';
      likelyDiagnoses.push('Immune Thrombocytopenia (ITP)');
      likelyDiagnoses.push('Drug-induced thrombocytopenia');
      likelyDiagnoses.push('TTP (if hemolysis present)');
      likelyDiagnoses.push('HUS (if renal impairment present)');

      keyFindings.push('Normal PT/INR and aPTT');
      keyFindings.push(`Isolated thrombocytopenia (${platelets} × 10⁹/L)`);
      keyFindings.push('No consumptive coagulopathy');

      recommendations.push('Check peripheral smear for schistocytes');
      recommendations.push('Assess for hemolysis (LDH, haptoglobin)');
      recommendations.push('Check renal function');
      recommendations.push('Use MAHA Lab Interpreter for detailed assessment');

      severity = platelets < 30 ? 'severe' : platelets < 50 ? 'moderate' : 'mild';
    } else {
      // Normal Pattern
      pattern = 'Normal Coagulation Profile';
      keyFindings.push('PT/INR within normal range');
      keyFindings.push('aPTT within normal range');
      if (!isNaN(fibrinogen) && fibrinogen >= 200) keyFindings.push('Fibrinogen normal');
      if (!isNaN(platelets) && platelets >= 150) keyFindings.push('Platelet count normal');

      likelyDiagnoses.push('No significant coagulation abnormality detected');

      recommendations.push('No immediate coagulation concerns');
      if (!isNaN(dDimer) && dDimer > 500) {
        recommendations.push('Elevated D-dimer may indicate thrombosis, inflammation, or other conditions');
      }

      severity = 'normal';
    }

    // Special considerations for DIC
    if (pattern === 'Consumptive Coagulopathy' || (ptProlonged && apttProlonged && (fibLow || dDimerHigh))) {
      if (!isNaN(platelets) && plateletsLow) {
        keyFindings.push(`Thrombocytopenia present (${platelets} × 10⁹/L)`);
      }
      if (!isNaN(dDimer) && dDimerHigh) {
        keyFindings.push(dDimer > 5000 ? 'Markedly elevated D-dimer (>5× ULN)' : 'Elevated D-dimer');
      }
    }

    return {
      pattern,
      likelyDiagnoses,
      keyFindings,
      recommendations,
      severity,
    };
  };

  const handleReset = () => {
    setInputs({
      pt: '',
      inr: '',
      aptt: '',
      fibrinogen: '',
      dDimer: '',
      platelets: '',
    });
    setResult(null);
  };

  const getSeverityColor = (severity: InterpretationResult['severity']) => {
    switch (severity) {
      case 'severe':
        return 'destructive';
      case 'moderate':
        return 'warning';
      case 'mild':
        return 'secondary';
      case 'normal':
        return 'success';
      default:
        return 'outline';
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Coagulation Panel Simulator</CardTitle>
          <CardDescription>
            Interactive interpretation of coagulation studies and differential diagnosis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="info">
            <AlertTitle>Clinical Application</AlertTitle>
            <AlertDescription>
              Enter coagulation panel values to receive pattern recognition analysis and differential
              diagnosis. Particularly useful for distinguishing consumptive coagulopathy (DIC) from
              isolated thrombocytopenia or other coagulation disorders.
            </AlertDescription>
          </Alert>

          {/* Coagulation Inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Prothrombin Time (PT) <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="12.5"
                  value={inputs.pt}
                  onChange={(e) => handleInputChange('pt', e.target.value)}
                />
                <span className="text-sm text-muted-foreground">sec</span>
              </div>
              <p className="text-xs text-muted-foreground">Normal: 11-13.5 seconds</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                INR <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="1.0"
                  value={inputs.inr}
                  onChange={(e) => handleInputChange('inr', e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">Normal: 0.8-1.2</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                aPTT <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="30"
                  value={inputs.aptt}
                  onChange={(e) => handleInputChange('aptt', e.target.value)}
                />
                <span className="text-sm text-muted-foreground">sec</span>
              </div>
              <p className="text-xs text-muted-foreground">Normal: 25-35 seconds</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Fibrinogen</label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="300"
                  value={inputs.fibrinogen}
                  onChange={(e) => handleInputChange('fibrinogen', e.target.value)}
                />
                <span className="text-sm text-muted-foreground">mg/dL</span>
              </div>
              <p className="text-xs text-muted-foreground">Normal: 200-400 mg/dL</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">D-dimer</label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="250"
                  value={inputs.dDimer}
                  onChange={(e) => handleInputChange('dDimer', e.target.value)}
                />
                <span className="text-sm text-muted-foreground">ng/mL</span>
              </div>
              <p className="text-xs text-muted-foreground">Normal: &lt;500 ng/mL</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Platelet Count</label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="250"
                  value={inputs.platelets}
                  onChange={(e) => handleInputChange('platelets', e.target.value)}
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {settings.units === 'us' ? '×10³/μL' : '×10⁹/L'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Normal: 150-450</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={interpretPanel} className="flex-1">
              Interpret Panel
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Pattern Recognition</h3>
                <Badge variant={getSeverityColor(result.severity)} className="text-sm px-3 py-1">
                  {result.severity.toUpperCase()}
                </Badge>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{result.pattern}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Key Findings</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {result.keyFindings.map((finding, idx) => (
                        <li key={idx}>{finding}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Likely Diagnoses</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.likelyDiagnoses.map((dx, idx) => (
                        <Badge key={idx} variant="outline">
                          {dx}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {result.pattern === 'Consumptive Coagulopathy' && (
                <Alert variant="destructive">
                  <AlertTitle>Urgent Evaluation Required</AlertTitle>
                  <AlertDescription>
                    <p className="mb-2">Consumptive coagulopathy pattern detected. Take immediate action:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Calculate ISTH DIC score</li>
                      <li>Identify and treat underlying condition</li>
                      <li>Monitor for bleeding complications</li>
                      <li>Consider hematology consultation</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {result.pattern === 'Normal Coagulation with Thrombocytopenia' && (
                <Alert variant="warning">
                  <AlertTitle>Isolated Thrombocytopenia</AlertTitle>
                  <AlertDescription>
                    Normal coagulation with low platelets suggests microangiopathic process or immune
                    destruction. Use the MAHA Lab Interpreter for detailed assessment of TTP/HUS/ITP.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Alert variant="warning">
        <AlertTitle>Educational Tool</AlertTitle>
        <AlertDescription>
          This simulator provides pattern-based interpretation to aid learning. Clinical decisions
          should incorporate the full clinical context, additional laboratory data, and specialist
          consultation when appropriate.
        </AlertDescription>
      </Alert>
    </div>
  );
}
