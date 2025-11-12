import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';

export function Cases() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Clinical Cases</h1>
        <p className="text-muted-foreground">
          Real-world scenarios with branching decision paths
        </p>
      </div>

      <Alert variant="info">
        <AlertTitle>Coming Soon</AlertTitle>
        <AlertDescription>
          Interactive case studies are under development. These will include time-based clinical
          scenarios with lab results, imaging, and decision points.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="opacity-60">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-lg">Sepsis-Associated DIC</CardTitle>
              <Badge variant="outline">Advanced</Badge>
            </div>
            <CardDescription>
              48-year-old with pneumosepsis developing coagulopathy
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Coming soon: Navigate through a complete ICU course with evolving labs and treatment decisions.
          </CardContent>
        </Card>

        <Card className="opacity-60">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-lg">Pregnancy-Associated TTP</CardTitle>
              <Badge variant="outline">Intermediate</Badge>
            </div>
            <CardDescription>
              32-year-old at 28 weeks gestation with thrombocytopenia
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Coming soon: Differentiate from HELLP syndrome and make urgent treatment decisions.
          </CardContent>
        </Card>

        <Card className="opacity-60">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-lg">Pediatric STEC-HUS</CardTitle>
              <Badge variant="outline">Beginner</Badge>
            </div>
            <CardDescription>
              5-year-old with bloody diarrhea and acute kidney injury
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Coming soon: Learn supportive care principles and antibiotic stewardship.
          </CardContent>
        </Card>

        <Card className="opacity-60">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-lg">Refractory ITP</CardTitle>
              <Badge variant="outline">Intermediate</Badge>
            </div>
            <CardDescription>
              40-year-old with persistent thrombocytopenia
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Coming soon: Explore second and third-line treatment options.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
