import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Calculator,
  FlaskConical,
  Microscope,
  FileText,
  Settings,
  X,
  GitCompare,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', to: '/', icon: Home },
  { name: 'Comparison Table', to: '/compare', icon: GitCompare },
  { name: 'Calculators', to: '/calculators', icon: Calculator },
  { name: 'Lab Interpreter', to: '/lab-interpreter', icon: FlaskConical },
  { name: 'Cases', to: '/cases', icon: Microscope },
  { name: 'Learn', to: '/learn', icon: BookOpen },
  { name: 'References', to: '/references', icon: FileText },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-200 ease-in-out md:sticky md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between p-4 md:hidden">
            <span className="text-sm font-semibold">Menu</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <p className="text-xs text-muted-foreground">
              Educational tool for hematology learning
            </p>
            <p className="text-xs text-muted-foreground mt-1">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
