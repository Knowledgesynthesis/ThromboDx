import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Home } from '@/pages/Home';
import { Compare } from '@/pages/Compare';
import { Calculators } from '@/pages/Calculators';
import { LabInterpreter } from '@/pages/LabInterpreter';
import { Cases } from '@/pages/Cases';
import { Learn } from '@/pages/Learn';
import { References } from '@/pages/References';
import { Settings } from '@/pages/Settings';
import { useEffect } from 'react';
import { useAppStore } from '@/store';

function App() {
  const { settings } = useAppStore();

  useEffect(() => {
    // Apply font size
    const root = document.documentElement;
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
    };
    root.style.fontSize = fontSizes[settings.fontSize];

    // Apply reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
    } else {
      root.style.removeProperty('--animation-duration');
    }
  }, [settings.fontSize, settings.reducedMotion]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background font-sans antialiased">
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <Header />
        <div className="flex">
          <Sidebar />
          <main id="main-content" className="flex-1 p-6 md:p-8 lg:p-10" role="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/lab-interpreter" element={<LabInterpreter />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/references" element={<References />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
