import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';

export function LabInterpreter() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Lab Interpreter</h1>
        <p className="text-muted-foreground">
          Interactive tool for interpreting lab values in thrombotic microangiopathies
        </p>
      </div>

      <Alert variant="info">
        <AlertTitle>Coming Soon</AlertTitle>
        <AlertDescription>
          The Lab Interpreter tool will allow you to input lab values and receive probability-based
          interpretations for DIC, TTP, ITP, and HUS. This feature is currently under development.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Planned Features</CardTitle>
          <CardDescription>What to expect in the Lab Interpreter</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Input lab values: Platelets, Hb, LDH, haptoglobin, bilirubin, creatinine</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Coagulation panel inputs: PT/INR, aPTT, fibrinogen, D-dimer</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Peripheral smear findings selector</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Real-time probability hints for each syndrome</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Clinical context warnings and recommendations</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary font-bold">•</span>
              <span>Unit conversion between US and SI systems</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
