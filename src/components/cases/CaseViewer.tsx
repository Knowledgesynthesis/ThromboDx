import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import type { Case } from '@/types';
import { useAppStore } from '@/store';

interface CaseViewerProps {
  caseData: Case;
  onComplete: () => void;
}

export function CaseViewer({ caseData, onComplete }: CaseViewerProps) {
  const { completeCase, trackEvent } = useAppStore();
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [showDebrief, setShowDebrief] = useState(false);

  const currentEvent = caseData.timeline[currentEventIndex];
  const isLastEvent = currentEventIndex === caseData.timeline.length - 1;

  const handleOptionSelect = (optionId: string) => {
    const option = currentEvent.decision?.options.find((opt) => opt.id === optionId);
    if (!option) return;

    setSelectedOptions((prev) => ({ ...prev, [currentEventIndex]: optionId }));

    trackEvent({
      eventType: 'interact',
      data: {
        caseId: caseData.id,
        eventIndex: currentEventIndex,
        optionSelected: optionId,
        wasCorrect: option.isCorrect,
      },
    });
  };

  const handleNext = () => {
    if (isLastEvent) {
      setShowDebrief(true);
      completeCase(caseData.id);
    } else {
      setCurrentEventIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentEventIndex(0);
    setSelectedOptions({});
    setShowDebrief(false);
  };

  const getDifficultyColor = () => {
    switch (caseData.difficulty) {
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

  const selectedOption = selectedOptions[currentEventIndex]
    ? currentEvent.decision?.options.find((opt) => opt.id === selectedOptions[currentEventIndex])
    : null;

  if (showDebrief) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Case Complete: {caseData.title}</CardTitle>
              <Badge variant="success">✓ Completed</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Learning Objectives</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {caseData.learningObjectives.map((obj, idx) => (
                  <li key={idx}>{obj}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {caseData.debrief.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx}>{takeaway}</li>
                ))}
              </ul>
            </div>

            <Alert variant="warning">
              <AlertTitle>Common Pitfalls</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {caseData.debrief.pitfalls.map((pitfall, idx) => (
                    <li key={idx}>{pitfall}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>

            <div className="pt-4 border-t">
              <h3 className="font-semibold text-lg mb-3">References</h3>
              <div className="space-y-2 text-sm">
                {caseData.debrief.references.map((ref, idx) => (
                  <p key={idx} className="text-muted-foreground">
                    [{idx + 1}] {ref.citation}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleReset} variant="outline" className="flex-1">
                Restart Case
              </Button>
              <Button onClick={onComplete} className="flex-1">
                Back to Cases
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Case Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <CardTitle>{caseData.title}</CardTitle>
              <CardDescription className="mt-2">{caseData.scenario}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant={getDifficultyColor()}>{caseData.difficulty}</Badge>
              <Badge variant="outline">{caseData.syndrome}</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2">
        {caseData.timeline.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 flex-1 rounded-full ${
              idx < currentEventIndex
                ? 'bg-primary'
                : idx === currentEventIndex
                ? 'bg-primary/50'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Current Event */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg">{currentEvent.time}</CardTitle>
              <Badge variant="outline" className="mt-2 capitalize">
                {currentEvent.type}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              Step {currentEventIndex + 1} of {caseData.timeline.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground whitespace-pre-line">{currentEvent.description}</p>

          {/* Labs */}
          {currentEvent.labs && currentEvent.labs.length > 0 && (
            <div className="rounded-lg border p-4 bg-muted/30">
              <h4 className="font-semibold mb-3">Laboratory Results</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {currentEvent.labs.map((lab, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded ${
                      lab.isAbnormal ? 'bg-destructive/10' : ''
                    }`}
                  >
                    <span className="font-medium">{lab.name}</span>
                    <span className={lab.isAbnormal ? 'text-destructive font-semibold' : ''}>
                      {lab.value} {lab.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decision Point */}
          {currentEvent.decision && !selectedOptions[currentEventIndex] && (
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-semibold text-lg">{currentEvent.decision.prompt}</h4>
              <div className="space-y-3">
                {currentEvent.decision.options.map((option) => (
                  <Button
                    key={option.id}
                    variant="outline"
                    className="w-full text-left h-auto py-4 px-4 justify-start"
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Feedback */}
          {selectedOption && (
            <div className="space-y-4 pt-4 border-t">
              <Alert variant={selectedOption.isCorrect ? 'success' : 'destructive'}>
                <AlertTitle>
                  {selectedOption.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </AlertTitle>
                <AlertDescription>
                  <p className="mt-2">{selectedOption.feedback}</p>
                  {selectedOption.consequences && (
                    <p className="mt-3 font-medium">{selectedOption.consequences}</p>
                  )}
                </AlertDescription>
              </Alert>

              <Button onClick={handleNext} className="w-full">
                {isLastEvent ? 'View Debrief' : 'Continue to Next Event'}
              </Button>
            </div>
          )}

          {/* No decision point - just continue */}
          {!currentEvent.decision && (
            <Button onClick={handleNext} className="w-full">
              {isLastEvent ? 'View Debrief' : 'Continue'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
