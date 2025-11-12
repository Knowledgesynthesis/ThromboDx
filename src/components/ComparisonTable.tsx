import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { syndromeComparison } from '@/data/comparisonData';

export function ComparisonTable() {
  const [selectedSyndromes, setSelectedSyndromes] = useState<Set<string>>(
    new Set(['DIC', 'TTP', 'ITP', 'HUS'])
  );

  const syndromes = ['DIC', 'TTP', 'ITP', 'HUS'] as const;

  const toggleSyndrome = (syndrome: string) => {
    const newSelected = new Set(selectedSyndromes);
    if (newSelected.has(syndrome)) {
      if (newSelected.size > 1) {
        newSelected.delete(syndrome);
      }
    } else {
      newSelected.add(syndrome);
    }
    setSelectedSyndromes(newSelected);
  };

  const renderCellContent = (content: string | string[]) => {
    if (Array.isArray(content)) {
      return (
        <ul className="list-disc list-inside space-y-1">
          {content.map((item, idx) => (
            <li key={idx} className="text-sm">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return <span className="text-sm">{content}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>DIC vs TTP vs ITP vs HUS - Comparison</CardTitle>
          <CardDescription>
            Side-by-side comparison of key features, labs, and management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="info">
            <AlertTitle>How to Use</AlertTitle>
            <AlertDescription>
              Select syndromes to compare. This table highlights the key differences and similarities
              to help with bedside differentiation. Click on syndrome badges to toggle visibility.
            </AlertDescription>
          </Alert>

          {/* Syndrome Filters */}
          <div className="flex flex-wrap gap-2">
            {syndromes.map((syndrome) => (
              <Badge
                key={syndrome}
                variant={selectedSyndromes.has(syndrome) ? 'default' : 'outline'}
                className="cursor-pointer text-sm px-4 py-2"
                onClick={() => toggleSyndrome(syndrome)}
              >
                {syndrome}
              </Badge>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-3 font-semibold bg-muted/50 sticky left-0 z-10">
                    Category
                  </th>
                  {syndromes
                    .filter((s) => selectedSyndromes.has(s))
                    .map((syndrome) => (
                      <th
                        key={syndrome}
                        className="text-left p-3 font-semibold bg-muted/50 min-w-[200px]"
                      >
                        {syndrome}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {syndromeComparison.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-accent/30 transition-colors"
                  >
                    <td className="p-3 font-medium bg-background sticky left-0 z-10 border-r border-border">
                      {row.category}
                    </td>
                    {syndromes
                      .filter((s) => selectedSyndromes.has(s))
                      .map((syndrome) => (
                        <td key={syndrome} className="p-3 align-top">
                          {renderCellContent(row[syndrome])}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4">
            <Alert variant="destructive">
              <AlertTitle>TTP - Critical Don't Miss</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                  <li>DO NOT DELAY plasma exchange for high PLASMIC scores</li>
                  <li>Avoid platelet transfusion (may worsen thrombosis)</li>
                  <li>Mortality approaches 90% if untreated</li>
                </ul>
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertTitle>HUS - Key Precautions</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2 text-sm">
                  <li>DO NOT use antibiotics in STEC-HUS (increases toxin release)</li>
                  <li>Atypical HUS: Consider eculizumab (complement inhibitor)</li>
                  <li>Monitor renal function closely</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-3">
            <h4 className="font-semibold">Clinical Pearls for Differentiation</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>
                <strong>Coagulation abnormal?</strong> Yes → Consider DIC. No → Consider TTP/HUS/ITP
              </p>
              <p>
                <strong>Hemolysis present?</strong> Yes → TTP/HUS/DIC possible. No → Consider ITP
              </p>
              <p>
                <strong>Neurologic symptoms?</strong> Prominent → TTP likely. Minimal → Consider HUS/DIC
              </p>
              <p>
                <strong>Renal failure?</strong> Prominent → HUS likely. Mild → Consider TTP. Variable → DIC possible
              </p>
              <p>
                <strong>ADAMTS13 activity?</strong> &lt;10% → TTP. Normal → Not TTP
              </p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground pt-4 border-t">
            <p className="font-semibold mb-2">Key References:</p>
            <ul className="space-y-1">
              <li>
                George JN, Nester CM. Syndromes of thrombotic microangiopathy. N Engl J Med. 2014;371(7):654-666.
              </li>
              <li>
                Levi M, Ten Cate H. Disseminated intravascular coagulation. N Engl J Med. 1999;341(8):586-592.
              </li>
              <li>
                Neunert C, et al. American Society of Hematology 2019 guidelines for immune thrombocytopenia. Blood Adv. 2019;3(23):3829-3866.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Alert variant="warning">
        <AlertTitle>Educational Use Only</AlertTitle>
        <AlertDescription>
          This comparison table is for educational purposes. Clinical diagnosis requires comprehensive
          evaluation including history, physical exam, lab studies, and specialist consultation.
        </AlertDescription>
      </Alert>
    </div>
  );
}
