import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import { useAppStore } from '@/store';
import type { Syndrome } from '@/types';
import { labPresets } from '@/data/labPresets';

interface LabInputs {
  platelets: string;
  hemoglobin: string;
  ldh: string;
  haptoglobin: string;
  indirectBilirubin: string;
  creatinine: string;
  schistocytes: 'none' | 'rare' | 'moderate' | 'numerous';
}

interface ProbabilityResult {
  syndrome: Syndrome;
  probability: 'very-low' | 'low' | 'moderate' | 'high' | 'very-high';
  score: number;
  reasoning: string[];
  warnings?: string[];
}

export function MAHALabInterpreter() {
  const { settings, trackEvent } = useAppStore();

  const [inputs, setInputs] = useState<LabInputs>({
    platelets: '',
    hemoglobin: '',
    ldh: '',
    haptoglobin: '',
    indirectBilirubin: '',
    creatinine: '',
    schistocytes: 'none',
  });

  const [results, setResults] = useState<ProbabilityResult[] | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [showPresetInfo, setShowPresetInfo] = useState(false);

  const handleInputChange = (field: keyof LabInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
    setResults(null);
    setSelectedPreset('');
    setShowPresetInfo(false);
  };

  const loadPreset = (presetId: string) => {
    const preset = labPresets.find(p => p.id === presetId);
    if (!preset) return;

    setInputs({
      platelets: preset.values.platelets.toString(),
      hemoglobin: preset.values.hemoglobin.toString(),
      ldh: preset.values.ldh.toString(),
      haptoglobin: preset.values.haptoglobin.toString(),
      indirectBilirubin: preset.values.indirectBilirubin.toString(),
      creatinine: preset.values.creatinine.toString(),
      schistocytes: preset.values.schistocytes,
    });
    setSelectedPreset(presetId);
    setShowPresetInfo(true);
    setResults(null);
  };

  const interpretLabs = () => {
    const platelets = parseFloat(inputs.platelets);
    const hemoglobin = parseFloat(inputs.hemoglobin);
    const ldh = parseFloat(inputs.ldh);
    const haptoglobin = parseFloat(inputs.haptoglobin);
    const creatinine = parseFloat(inputs.creatinine);

    // Validate inputs
    if (isNaN(platelets) || isNaN(hemoglobin) || isNaN(ldh)) {
      alert('Please enter valid numbers for required fields');
      return;
    }

    const probabilities: ProbabilityResult[] = [];

    // TTP Assessment
    const ttpScore = calculateTTPScore(platelets, hemoglobin, ldh, haptoglobin, creatinine, inputs.schistocytes);
    probabilities.push(ttpScore);

    // HUS Assessment
    const husScore = calculateHUSScore(platelets, hemoglobin, ldh, haptoglobin, creatinine, inputs.schistocytes);
    probabilities.push(husScore);

    // DIC Assessment
    const dicScore = calculateDICScore(platelets, hemoglobin, ldh, inputs.schistocytes);
    probabilities.push(dicScore);

    // ITP Assessment
    const itpScore = calculateITPScore(platelets, hemoglobin, ldh, haptoglobin, inputs.schistocytes);
    probabilities.push(itpScore);

    setResults(probabilities);
    trackEvent({
      eventType: 'interact',
      data: {
        tool: 'MAHA Lab Interpreter',
        platelets,
        hemoglobin,
        ldh,
      },
    });
  };

  const calculateTTPScore = (
    platelets: number,
    hemoglobin: number,
    ldh: number,
    haptoglobin: number,
    creatinine: number,
    schistocytes: string
  ): ProbabilityResult => {
    let score = 0;
    const reasoning: string[] = [];
    const warnings: string[] = [];

    // Severe thrombocytopenia
    if (platelets < 30) {
      score += 3;
      reasoning.push('Severe thrombocytopenia (<30 × 10⁹/L) - highly consistent with TTP');
    } else if (platelets < 100) {
      score += 1;
      reasoning.push('Moderate thrombocytopenia - possible but less specific');
    }

    // Anemia
    if (hemoglobin < 10) {
      score += 2;
      reasoning.push('Anemia with Hb <10 g/dL - consistent with hemolysis');
    }

    // Markedly elevated LDH
    if (ldh > 1000) {
      score += 3;
      reasoning.push('Markedly elevated LDH (>1000 U/L) - strong evidence of hemolysis');
    } else if (ldh > 500) {
      score += 2;
      reasoning.push('Elevated LDH - suggests hemolysis');
    }

    // Undetectable haptoglobin
    if (haptoglobin < 10) {
      score += 2;
      reasoning.push('Undetectable/very low haptoglobin - confirms hemolysis');
    }

    // Schistocytes
    if (schistocytes === 'numerous') {
      score += 3;
      reasoning.push('Numerous schistocytes - hallmark of TTP');
      warnings.push('DO NOT DELAY plasma exchange if TTP suspected');
    } else if (schistocytes === 'moderate') {
      score += 2;
      reasoning.push('Moderate schistocytes present');
    }

    // Renal involvement (mild)
    if (creatinine > 1.2 && creatinine < 2.0) {
      score += 1;
      reasoning.push('Mild renal impairment - can occur in TTP');
    } else if (creatinine >= 2.0) {
      score -= 1;
      reasoning.push('Significant renal impairment - more suggestive of HUS');
    }

    let probability: ProbabilityResult['probability'];
    if (score >= 10) probability = 'very-high';
    else if (score >= 7) probability = 'high';
    else if (score >= 4) probability = 'moderate';
    else if (score >= 2) probability = 'low';
    else probability = 'very-low';

    if (probability === 'high' || probability === 'very-high') {
      warnings.push('Consider urgent PLASMIC score calculation');
      warnings.push('Send ADAMTS13 activity and inhibitor immediately');
      warnings.push('Consult hematology for plasma exchange consideration');
    }

    return {
      syndrome: 'TTP',
      probability,
      score,
      reasoning,
      warnings,
    };
  };

  const calculateHUSScore = (
    platelets: number,
    hemoglobin: number,
    ldh: number,
    haptoglobin: number,
    creatinine: number,
    schistocytes: string
  ): ProbabilityResult => {
    let score = 0;
    const reasoning: string[] = [];
    const warnings: string[] = [];

    // Thrombocytopenia
    if (platelets < 100) {
      score += 2;
      reasoning.push('Thrombocytopenia present');
    }

    // Anemia
    if (hemoglobin < 10) {
      score += 2;
      reasoning.push('Anemia consistent with hemolysis');
    }

    // Elevated LDH
    if (ldh > 500) {
      score += 2;
      reasoning.push('Elevated LDH indicates hemolysis');
    }

    // Low haptoglobin
    if (haptoglobin < 30) {
      score += 2;
      reasoning.push('Low haptoglobin confirms hemolysis');
    }

    // Schistocytes
    if (schistocytes === 'numerous' || schistocytes === 'moderate') {
      score += 2;
      reasoning.push('Schistocytes present on smear');
    }

    // Significant renal impairment (KEY feature)
    if (creatinine >= 2.0) {
      score += 4;
      reasoning.push('Significant renal impairment - HALLMARK of HUS');
      warnings.push('Monitor renal function closely');
    } else if (creatinine > 1.5) {
      score += 2;
      reasoning.push('Elevated creatinine');
    }

    let probability: ProbabilityResult['probability'];
    if (score >= 10) probability = 'very-high';
    else if (score >= 7) probability = 'high';
    else if (score >= 4) probability = 'moderate';
    else if (score >= 2) probability = 'low';
    else probability = 'very-low';

    if (probability === 'high' || probability === 'very-high') {
      warnings.push('Determine if STEC-associated (diarrhea history)');
      warnings.push('Consider complement studies for atypical HUS');
      warnings.push('DO NOT use antibiotics if STEC-HUS suspected');
    }

    return {
      syndrome: 'HUS',
      probability,
      score,
      reasoning,
      warnings,
    };
  };

  const calculateDICScore = (
    platelets: number,
    hemoglobin: number,
    ldh: number,
    schistocytes: string
  ): ProbabilityResult => {
    let score = 0;
    const reasoning: string[] = [];
    const warnings: string[] = [];

    // Thrombocytopenia
    if (platelets < 100) {
      score += 2;
      reasoning.push('Thrombocytopenia present');
    }

    // Variable hemolysis
    if (hemoglobin < 10 && schistocytes !== 'none') {
      score += 1;
      reasoning.push('Some evidence of hemolysis');
    }

    // Moderate LDH elevation
    if (ldh > 400 && ldh < 1000) {
      score += 1;
      reasoning.push('Moderately elevated LDH');
    }

    // Note: This is incomplete without coagulation parameters
    reasoning.push('⚠️ DIC assessment incomplete without PT/INR, aPTT, fibrinogen, D-dimer');
    reasoning.push('Use the Coagulation Panel Simulator for complete DIC evaluation');

    let probability: ProbabilityResult['probability'];
    if (score >= 4) probability = 'moderate';
    else if (score >= 2) probability = 'low';
    else probability = 'very-low';

    warnings.push('Cannot fully assess DIC without coagulation studies');
    warnings.push('Check PT/INR, aPTT, fibrinogen, D-dimer');

    return {
      syndrome: 'DIC',
      probability,
      score,
      reasoning,
      warnings,
    };
  };

  const calculateITPScore = (
    platelets: number,
    hemoglobin: number,
    ldh: number,
    haptoglobin: number,
    schistocytes: string
  ): ProbabilityResult => {
    let score = 0;
    const reasoning: string[] = [];
    const warnings: string[] = [];

    // Isolated thrombocytopenia
    if (platelets < 100) {
      score += 2;
      reasoning.push('Thrombocytopenia present');
    }

    // NO hemolysis (key feature)
    if (hemoglobin >= 12) {
      score += 2;
      reasoning.push('Normal hemoglobin - no anemia');
    } else {
      score -= 2;
      reasoning.push('Anemia present - argues against isolated ITP');
    }

    if (ldh <= 300) {
      score += 2;
      reasoning.push('Normal LDH - no hemolysis');
    } else {
      score -= 2;
      reasoning.push('Elevated LDH - suggests hemolysis, not consistent with ITP');
    }

    if (haptoglobin >= 30 || isNaN(haptoglobin)) {
      score += 2;
      reasoning.push('Normal/not low haptoglobin - no hemolysis');
    } else {
      score -= 2;
      reasoning.push('Low haptoglobin indicates hemolysis - not ITP');
    }

    if (schistocytes === 'none') {
      score += 2;
      reasoning.push('No schistocytes - consistent with ITP');
    } else {
      score -= 3;
      reasoning.push('Schistocytes present - NOT consistent with ITP');
    }

    let probability: ProbabilityResult['probability'];
    if (score >= 8) probability = 'high';
    else if (score >= 5) probability = 'moderate';
    else if (score >= 2) probability = 'low';
    else probability = 'very-low';

    if (probability === 'high') {
      reasoning.push('ITP is diagnosis of EXCLUSION - rule out other causes first');
      warnings.push('Exclude secondary causes (HIV, HCV, H. pylori, autoimmune)');
    }

    return {
      syndrome: 'ITP',
      probability,
      score,
      reasoning,
      warnings,
    };
  };

  const getProbabilityColor = (prob: ProbabilityResult['probability']) => {
    switch (prob) {
      case 'very-high':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'moderate':
        return 'warning';
      case 'low':
        return 'secondary';
      case 'very-low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getProbabilityText = (prob: ProbabilityResult['probability']) => {
    return prob.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const handleReset = () => {
    setInputs({
      platelets: '',
      hemoglobin: '',
      ldh: '',
      haptoglobin: '',
      indirectBilirubin: '',
      creatinine: '',
      schistocytes: 'none',
    });
    setResults(null);
    setSelectedPreset('');
    setShowPresetInfo(false);
  };

  const sortedResults = results?.sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>MAHA Lab Interpreter</CardTitle>
          <CardDescription>
            Interactive tool for interpreting lab values in thrombotic microangiopathies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="info">
            <AlertTitle>How to Use</AlertTitle>
            <AlertDescription>
              Enter available lab values below. The tool will provide probability-based interpretations
              for DIC, TTP, ITP, and HUS. This is a screening tool - always correlate with clinical
              presentation and confirm with specialist evaluation.
            </AlertDescription>
          </Alert>

          {/* Lab Presets */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-base">Load Educational Presets</CardTitle>
              <CardDescription>
                Pre-populated lab values for different pathologies at varying severity levels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {labPresets.map((preset) => (
                  <Button
                    key={preset.id}
                    variant={selectedPreset === preset.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => loadPreset(preset.id)}
                    className="text-xs h-auto py-2 px-3"
                  >
                    <div className="text-left">
                      <div className="font-semibold">{preset.name}</div>
                      <div className="text-[10px] opacity-70 capitalize">{preset.severity}</div>
                    </div>
                  </Button>
                ))}
              </div>

              {showPresetInfo && selectedPreset && (
                <Alert variant="info" className="mt-4">
                  <AlertDescription>
                    <p className="font-medium mb-1">
                      {labPresets.find(p => p.id === selectedPreset)?.description}
                    </p>
                    <p className="text-sm mt-2">
                      {labPresets.find(p => p.id === selectedPreset)?.clinicalContext}
                    </p>
                    {labPresets.find(p => p.id === selectedPreset)?.references && (
                      <p className="text-xs mt-2 opacity-70">
                        References: {labPresets.find(p => p.id === selectedPreset)?.references?.join(', ')}
                      </p>
                    )}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Lab Inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Platelet Count <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="150"
                  value={inputs.platelets}
                  onChange={(e) => handleInputChange('platelets', e.target.value)}
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {settings.units === 'us' ? '×10³/μL' : '×10⁹/L'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Normal: 150-450</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Hemoglobin <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="14"
                  value={inputs.hemoglobin}
                  onChange={(e) => handleInputChange('hemoglobin', e.target.value)}
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {settings.units === 'us' ? 'g/dL' : 'g/L'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">Normal: 12-16 g/dL</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                LDH <span className="text-destructive">*</span>
              </label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="200"
                  value={inputs.ldh}
                  onChange={(e) => handleInputChange('ldh', e.target.value)}
                />
                <span className="text-sm text-muted-foreground">U/L</span>
              </div>
              <p className="text-xs text-muted-foreground">Normal: 140-280 U/L</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Haptoglobin</label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="50"
                  value={inputs.haptoglobin}
                  onChange={(e) => handleInputChange('haptoglobin', e.target.value)}
                />
                <span className="text-sm text-muted-foreground">mg/dL</span>
              </div>
              <p className="text-xs text-muted-foreground">Normal: 30-200 mg/dL</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Indirect Bilirubin</label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="0.5"
                  value={inputs.indirectBilirubin}
                  onChange={(e) => handleInputChange('indirectBilirubin', e.target.value)}
                />
                <span className="text-sm text-muted-foreground">mg/dL</span>
              </div>
              <p className="text-xs text-muted-foreground">Normal: 0.1-1.0 mg/dL</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Creatinine</label>
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="1.0"
                  value={inputs.creatinine}
                  onChange={(e) => handleInputChange('creatinine', e.target.value)}
                />
                <span className="text-sm text-muted-foreground">mg/dL</span>
              </div>
              <p className="text-xs text-muted-foreground">Normal: 0.7-1.3 mg/dL</p>
            </div>
          </div>

          {/* Schistocytes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Schistocytes on Peripheral Smear</label>
            <div className="flex gap-2 flex-wrap">
              {(['none', 'rare', 'moderate', 'numerous'] as const).map((option) => (
                <Button
                  key={option}
                  variant={inputs.schistocytes === option ? 'default' : 'outline'}
                  onClick={() => handleInputChange('schistocytes', option)}
                  size="sm"
                  className="capitalize"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={interpretLabs} className="flex-1">
              Interpret Labs
            </Button>
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          </div>

          {/* Results */}
          {sortedResults && (
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-semibold">Probability Assessment</h3>

              <div className="grid md:grid-cols-2 gap-4">
                {sortedResults.map((result) => (
                  <Card key={result.syndrome} className="relative">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{result.syndrome}</CardTitle>
                        <Badge variant={getProbabilityColor(result.probability)}>
                          {getProbabilityText(result.probability)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm space-y-1">
                        <p className="font-medium">Reasoning:</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {result.reasoning.map((reason, idx) => (
                            <li key={idx}>{reason}</li>
                          ))}
                        </ul>
                      </div>

                      {result.warnings && result.warnings.length > 0 && (
                        <Alert variant="warning" className="mt-3">
                          <AlertDescription>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {result.warnings.map((warning, idx) => (
                                <li key={idx}>{warning}</li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Alert variant="info">
                <AlertTitle>Next Steps</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Consider clinical context (triggers, symptoms, time course)</li>
                    <li>Order additional studies based on probability</li>
                    <li>Consult hematology for high-probability cases</li>
                    <li>Use specific calculators (PLASMIC, ISTH DIC) when appropriate</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      <Alert variant="warning">
        <AlertTitle>Clinical Disclaimer</AlertTitle>
        <AlertDescription>
          This is a probability-based screening tool for educational purposes. It does not replace
          clinical judgment, specialist consultation, or definitive diagnostic testing. Always
          correlate with the full clinical picture and obtain appropriate confirmatory studies.
        </AlertDescription>
      </Alert>
    </div>
  );
}
