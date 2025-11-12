import { MAHALabInterpreter } from '@/components/lab/MAHALabInterpreter';

export function LabInterpreter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Lab Interpreter</h1>
        <p className="text-muted-foreground">
          Interactive tool for interpreting lab values in thrombotic microangiopathies
        </p>
      </div>
      <MAHALabInterpreter />
    </div>
  );
}
