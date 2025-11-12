import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CaseViewer } from '@/components/cases/CaseViewer';
import { cases } from '@/data/casesData';
import type { Case } from '@/types';
import { useAppStore } from '@/store';

export function Cases() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const { progress } = useAppStore();

  const getDifficultyColor = (difficulty: Case['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (selectedCase) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => setSelectedCase(null)}>
          ← Back to Cases
        </Button>
        <CaseViewer caseData={selectedCase} onComplete={() => setSelectedCase(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Clinical Cases</h1>
        <p className="text-muted-foreground">
          Interactive scenarios with branching decision paths and real-time feedback
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {cases.map((caseItem) => {
          const isCompleted = progress.completedCases.includes(caseItem.id);

          return (
            <Card
              key={caseItem.id}
              className="hover:shadow-lg transition-shadow relative"
            >
              {isCompleted && (
                <div className="absolute top-3 right-3">
                  <Badge variant="success">✓ Completed</Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg pr-24">{caseItem.title}</CardTitle>
                  <Badge variant={getDifficultyColor(caseItem.difficulty)}>
                    {caseItem.difficulty}
                  </Badge>
                </div>
                <CardDescription>{caseItem.scenario}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{caseItem.syndrome}</Badge>
                  {caseItem.learnerLevel.map((level) => (
                    <Badge key={level} variant="secondary" className="text-xs">
                      {level}
                    </Badge>
                  ))}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Learning objectives:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {caseItem.learningObjectives.slice(0, 2).map((obj, idx) => (
                      <li key={idx}>{obj}</li>
                    ))}
                    {caseItem.learningObjectives.length > 2 && (
                      <li className="text-xs">
                        +{caseItem.learningObjectives.length - 2} more...
                      </li>
                    )}
                  </ul>
                </div>

                <Button
                  onClick={() => setSelectedCase(caseItem)}
                  className="w-full"
                >
                  {isCompleted ? 'Review Case' : 'Start Case'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About These Cases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Each case presents a real-world clinical scenario with branching decision points.
            You'll receive immediate feedback on your choices and learn key clinical pearls.
          </p>
          <div className="pt-3 border-t">
            <h4 className="font-semibold mb-2">Case Features:</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Time-based clinical progression</li>
              <li>Real lab values and imaging findings</li>
              <li>Multiple decision points with feedback</li>
              <li>Comprehensive debrief with references</li>
              <li>Progress tracking and completion status</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
