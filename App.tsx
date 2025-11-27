
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ToolPage } from './pages/ToolPage';
import { About } from './pages/About';
import { FAQ } from './pages/FAQ';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';
import { ToolId } from './types';

type PageView = 'home' | 'tool' | 'about' | 'faq' | 'privacy' | 'terms' | 'contact';

const App: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolId | null>(null);
  const [currentView, setCurrentView] = useState<PageView>('home');

  const navigateToTool = (toolId: ToolId) => {
    setCurrentTool(toolId);
    setCurrentView('tool');
    window.scrollTo(0, 0);
  };

  const navigateHome = () => {
    setCurrentTool(null);
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  const navigateToPage = (page: PageView) => {
    setCurrentTool(null);
    setCurrentView(page);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (currentView === 'tool' && currentTool) {
      return <ToolPage toolId={currentTool} onBack={navigateHome} />;
    }
    switch (currentView) {
      case 'about':
        return <About onBack={navigateHome} />;
      case 'faq':
        return <FAQ onBack={navigateHome} />;
      case 'privacy':
        return <Privacy onBack={navigateHome} />;
      case 'terms':
        return <Terms onBack={navigateHome} />;
      case 'contact':
        return <Contact onBack={navigateHome} />;
      default:
        return <Home onNavigateTool={navigateToTool} />;
    }
  };

  return (
    <Layout 
      onNavigateHome={navigateHome} 
      onNavigateAbout={() => navigateToPage('about')}
      onNavigateFAQ={() => navigateToPage('faq')}
      onNavigatePrivacy={() => navigateToPage('privacy')}
      onNavigateTerms={() => navigateToPage('terms')}
      onNavigateContact={() => navigateToPage('contact')}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
