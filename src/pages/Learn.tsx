import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';

export function Learn() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Educational Content</h1>
        <p className="text-muted-foreground">
          Comprehensive lessons on hemostasis, coagulation, and thrombotic disorders
        </p>
      </div>

      <Alert variant="info">
        <AlertTitle>Content Library Expanding</AlertTitle>
        <AlertDescription>
          Educational modules are being added progressively. Core comparison and calculator tools
          are already available.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Curriculum Outline</h2>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">Module 1: Hemostasis Fundamentals</CardTitle>
              <Badge variant="outline">Foundation</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">Prerequisites for understanding DIC, TTP, ITP, and HUS</p>
            <ul className="space-y-1 pl-4">
              <li>• Primary hemostasis and platelet physiology</li>
              <li>• Secondary hemostasis and coagulation cascade</li>
              <li>• Fibrinolysis and D-dimer formation</li>
              <li>• Laboratory interpretation basics</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">Module 2: Microangiopathic Hemolytic Anemia</CardTitle>
              <Badge variant="outline">Core</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">Understanding MAHA and schistocytes</p>
            <ul className="space-y-1 pl-4">
              <li>• Pathophysiology of mechanical hemolysis</li>
              <li>• Peripheral smear recognition</li>
              <li>• LDH, haptoglobin, and indirect bilirubin</li>
              <li>• MAHA differential diagnosis</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">Module 3: Disseminated Intravascular Coagulation</CardTitle>
              <Badge variant="outline">Advanced</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">Consumptive coagulopathy in critical illness</p>
            <ul className="space-y-1 pl-4">
              <li>• Pathophysiology of thrombin generation</li>
              <li>• Overt vs non-overt DIC</li>
              <li>• ISTH scoring system in detail</li>
              <li>• Management and transfusion strategies</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">Module 4: Thrombotic Thrombocytopenic Purpura</CardTitle>
              <Badge variant="outline">Advanced</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">ADAMTS13 deficiency and ultra-large vWF multimers</p>
            <ul className="space-y-1 pl-4">
              <li>• ADAMTS13 biology and testing</li>
              <li>• Acquired vs hereditary TTP</li>
              <li>• PLASMIC score application</li>
              <li>• Plasma exchange and caplacizumab</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">Module 5: Immune Thrombocytopenia</CardTitle>
              <Badge variant="outline">Core</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">Platelet destruction and management</p>
            <ul className="space-y-1 pl-4">
              <li>• Primary vs secondary ITP</li>
              <li>• Diagnosis of exclusion</li>
              <li>• Treatment thresholds and options</li>
              <li>• Bleeding risk assessment</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">Module 6: Hemolytic Uremic Syndrome</CardTitle>
              <Badge variant="outline">Advanced</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-muted-foreground">STEC-HUS and complement-mediated aHUS</p>
            <ul className="space-y-1 pl-4">
              <li>• Shiga toxin pathophysiology</li>
              <li>• Complement pathway dysregulation</li>
              <li>• Antibiotic considerations in STEC-HUS</li>
              <li>• Eculizumab in atypical HUS</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
