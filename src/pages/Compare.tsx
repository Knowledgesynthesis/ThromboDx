import { ComparisonTable } from '@/components/ComparisonTable';

export function Compare() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Syndrome Comparison</h1>
        <p className="text-muted-foreground">
          Comprehensive side-by-side comparison of DIC, TTP, ITP, and HUS
        </p>
      </div>
      <ComparisonTable />
    </div>
  );
}
