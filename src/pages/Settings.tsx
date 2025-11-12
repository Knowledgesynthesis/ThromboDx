import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store';
import { Badge } from '@/components/ui/Badge';
import type { LearnerLevel, LearningContext } from '@/types';

export function Settings() {
  const { settings, updateSettings, progress } = useAppStore();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your learning experience</p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Theme</label>
            <div className="flex gap-3">
              {(['light', 'dark', 'system'] as const).map((theme) => (
                <Button
                  key={theme}
                  variant={settings.theme === theme ? 'default' : 'outline'}
                  onClick={() => updateSettings({ theme })}
                  className="capitalize"
                >
                  {theme}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Font Size</label>
            <div className="flex gap-3">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <Button
                  key={size}
                  variant={settings.fontSize === size ? 'default' : 'outline'}
                  onClick={() => updateSettings({ fontSize: size })}
                  className="capitalize"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Units</CardTitle>
          <CardDescription>Select your preferred unit system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant={settings.units === 'us' ? 'default' : 'outline'}
              onClick={() => updateSettings({ units: 'us' })}
            >
              US Units
            </Button>
            <Button
              variant={settings.units === 'si' ? 'default' : 'outline'}
              onClick={() => updateSettings({ units: 'si' })}
            >
              SI Units
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            {settings.units === 'us'
              ? 'US: g/dL, mg/dL, ×10³/μL'
              : 'SI: g/L, μmol/L, ×10⁹/L'}
          </p>
        </CardContent>
      </Card>

      {/* Learner Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Learner Profile</CardTitle>
          <CardDescription>Personalize content to your level</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Training Level</label>
            <div className="flex flex-wrap gap-2">
              {(['medical-student', 'resident', 'fellow', 'attending'] as LearnerLevel[]).map(
                (level) => (
                  <Button
                    key={level}
                    variant={settings.learnerLevel === level ? 'default' : 'outline'}
                    onClick={() => updateSettings({ learnerLevel: level })}
                    size="sm"
                  >
                    {level.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')}
                  </Button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Learning Context</label>
            <div className="flex flex-wrap gap-2">
              {(['exam-prep', 'bedside', 'research'] as LearningContext[]).map((context) => (
                <Button
                  key={context}
                  variant={settings.learningContext === context ? 'default' : 'outline'}
                  onClick={() => updateSettings({ learningContext: context })}
                  size="sm"
                >
                  {context.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ')}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>Options for enhanced accessibility</CardDescription>
        </CardHeader>
        <CardContent>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.reducedMotion}
              onChange={(e) => updateSettings({ reducedMotion: e.target.checked })}
              className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
            />
            <div>
              <p className="font-medium">Reduce Motion</p>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions
              </p>
            </div>
          </label>
        </CardContent>
      </Card>

      {/* Progress Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Learning statistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Completed Lessons</span>
              <Badge>{progress.completedLessons.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Completed Cases</span>
              <Badge>{progress.completedCases.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Mastered Topics</span>
              <Badge>{progress.masteredTopics.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm">Study Time</span>
              <Badge>{Math.floor(progress.totalTimeMinutes / 60)}h</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your app data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10">
            <h4 className="font-semibold mb-2">Reset All Data</h4>
            <p className="text-sm text-muted-foreground mb-3">
              This will permanently delete all your progress, settings, and data. This action cannot
              be undone.
            </p>
            <Button variant="destructive" size="sm" onClick={handleReset}>
              Reset Application
            </Button>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• All data is stored locally on your device</p>
            <p>• No personal information is sent to external servers</p>
            <p>• Your privacy is protected</p>
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Version</span>
            <Badge variant="outline">1.0.0</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Build</span>
            <span className="text-muted-foreground">2024-01</span>
          </div>
          <div className="pt-3 border-t text-xs text-muted-foreground">
            <p>ThromboLens is an educational tool for hematology learning.</p>
            <p className="mt-2">
              For educational purposes only. Not a substitute for professional medical advice.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
