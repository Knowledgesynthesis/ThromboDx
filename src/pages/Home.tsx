import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';
import { Badge } from '@/components/ui/Badge';
import {
  Calculator,
  GitCompare,
  FlaskConical,
  Microscope,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { useAppStore } from '@/store';

export function Home() {
  const { progress } = useAppStore();

  const features = [
    {
      title: 'Comparison Table',
      description: 'Side-by-side comparison of DIC, TTP, ITP, and HUS',
      icon: GitCompare,
      to: '/compare',
      color: 'text-blue-500',
    },
    {
      title: 'Clinical Calculators',
      description: 'PLASMIC score, ISTH DIC score, and more',
      icon: Calculator,
      to: '/calculators',
      color: 'text-green-500',
    },
    {
      title: 'Lab Interpreter',
      description: 'Interactive lab value interpretation',
      icon: FlaskConical,
      to: '/lab-interpreter',
      color: 'text-purple-500',
    },
    {
      title: 'Case Studies',
      description: 'Real-world clinical scenarios with branching paths',
      icon: Microscope,
      to: '/cases',
      color: 'text-orange-500',
    },
    {
      title: 'Educational Content',
      description: 'Comprehensive lessons and learning modules',
      icon: BookOpen,
      to: '/learn',
      color: 'text-pink-500',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-4xl font-bold">ThromboLens</h1>
          <Badge variant="default">v1.0</Badge>
        </div>
        <p className="text-xl text-muted-foreground">
          Master DIC, TTP, ITP, HUS — from smear to systems
        </p>
        <p className="text-muted-foreground max-w-2xl">
          An interactive educational platform for learning about thrombotic and hemostatic disorders.
          From medical students to attendings, build your diagnostic and management skills with
          evidence-based tools and real-world cases.
        </p>
      </div>

      {/* Critical Safety Alert */}
      <Alert variant="destructive">
        <AlertTitle>⚠️ Clinical Disclaimer</AlertTitle>
        <AlertDescription>
          This application is for educational purposes only and should not replace clinical judgment
          or substitute for professional medical advice. Always consult with appropriate specialists
          and consider the full clinical context when making treatment decisions. In emergency situations,
          contact your local emergency services immediately.
        </AlertDescription>
      </Alert>

      {/* Progress Card */}
      {progress.completedLessons.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Continue your learning journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold">{progress.completedLessons.length}</div>
                <div className="text-sm text-muted-foreground">Lessons</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold">{progress.completedCases.length}</div>
                <div className="text-sm text-muted-foreground">Cases</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold">{progress.masteredTopics.length}</div>
                <div className="text-sm text-muted-foreground">Topics</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <div className="text-2xl font-bold">{Math.floor(progress.totalTimeMinutes / 60)}h</div>
                <div className="text-sm text-muted-foreground">Study Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.to} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="mt-4">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to={feature.to}>
                  <Button variant="outline" className="w-full group">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Start Section */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
          <CardDescription>New to ThromboLens? Start here</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Review the Comparison Table</p>
                <p className="text-sm text-muted-foreground">
                  Get oriented with side-by-side features of DIC, TTP, ITP, and HUS
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Try the Clinical Calculators</p>
                <p className="text-sm text-muted-foreground">
                  Practice with PLASMIC and ISTH DIC scoring tools
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Work Through Cases</p>
                <p className="text-sm text-muted-foreground">
                  Apply your knowledge with realistic clinical scenarios
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">🌙 Dark Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Optimized for comfortable learning in any lighting condition
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">📱 Mobile-First</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Learn on the go with responsive design for all devices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">🔒 Offline-Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access content anytime with progressive web app technology
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
