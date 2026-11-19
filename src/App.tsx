import React, { useState, useEffect } from 'react';
import type { TabType } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { OverviewSection } from './components/sections/OverviewSection';
import { ArchitectureSection } from './components/sections/ArchitectureSection';
import { CodeExplorerSection } from './components/sections/CodeExplorerSection';
import { TheorySection } from './components/sections/TheorySection';
import { Chess960Section } from './components/sections/Chess960Section';
import { QuestionsBankSection } from './components/sections/QuestionsBankSection';
import { PracticeQuizSection } from './components/sections/PracticeQuizSection';
import { GlossarySection } from './components/sections/GlossarySection';
import { SourceMapSection } from './components/sections/SourceMapSection';

// Newly added specialized oral defense components
import { OralDefenseSimulatorSection } from './components/sections/OralDefenseSimulatorSection';
import { FunctionDossiersSection } from './components/sections/FunctionDossiersSection';
import { ParameterGuideSection } from './components/sections/ParameterGuideSection';
import { CaseStudiesSection } from './components/sections/CaseStudiesSection';
import { GeneralQASection } from './components/sections/GeneralQASection';
import { MemberQASection } from './components/sections/MemberQASection';

import { PROJECT_METADATA } from './data/teamInfo';
import { Menu, ArrowUp } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('defense-simulator');
  const [targetId, setTargetId] = useState<string | undefined>(undefined);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Theme mode: dark mode default
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('chesslab_theme');
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('chesslab_theme', isDarkMode ? 'dark' : 'light');
    } catch (e) {
      console.error(e);
    }
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  // Sync hash routing on load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs: TabType[] = [
        'overview',
        'architecture',
        'code-bot',
        'code-search',
        'code-eval',
        'code-time',
        'theory',
        'chess960',
        'qa',
        'practice',
        'glossary',
        'source-map',
        'defense-simulator',
        'function-dossiers',
        'parameters',
        'case-studies',
        'general-qa',
        'member-qa',
      ];
      if (validTabs.includes(hash as TabType)) {
        setCurrentTab(hash as TabType);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (tab: TabType, targetItemId?: string) => {
    setCurrentTab(tab);
    setTargetId(targetItemId);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Mobile Menu Toggle Bar */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 font-semibold"
        >
          <Menu className="w-4 h-4" />
          <span>Danh mục chuyên đề</span>
        </button>
        <span className="font-mono text-emerald-400 font-bold uppercase text-[11px]">
          {currentTab}
        </span>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onNavigate={handleNavigate}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Pane */}
        <main className="flex-1 lg:pl-64 min-w-0 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            {/* New Defense Modules */}
            {currentTab === 'defense-simulator' && <OralDefenseSimulatorSection />}
            {currentTab === 'function-dossiers' && <FunctionDossiersSection />}
            {currentTab === 'parameters' && <ParameterGuideSection />}
            {currentTab === 'case-studies' && <CaseStudiesSection />}
            {currentTab === 'general-qa' && <GeneralQASection />}
            {currentTab === 'member-qa' && <MemberQASection />}

            {/* Existing Foundations */}
            {currentTab === 'overview' && <OverviewSection onNavigate={handleNavigate} />}
            {currentTab === 'architecture' && <ArchitectureSection onNavigate={handleNavigate} />}
            {currentTab === 'code-bot' && (
              <CodeExplorerSection
                initialFile="bot.py"
                highlightAnnotationId={targetId}
                onNavigate={handleNavigate}
              />
            )}
            {currentTab === 'code-search' && (
              <CodeExplorerSection
                initialFile="search.py"
                highlightAnnotationId={targetId}
                onNavigate={handleNavigate}
              />
            )}
            {currentTab === 'code-eval' && (
              <CodeExplorerSection
                initialFile="evaluation.py"
                highlightAnnotationId={targetId}
                onNavigate={handleNavigate}
              />
            )}
            {currentTab === 'code-time' && (
              <CodeExplorerSection
                initialFile="time_manager.py"
                highlightAnnotationId={targetId}
                onNavigate={handleNavigate}
              />
            )}
            {currentTab === 'theory' && (
              <TheorySection onNavigate={handleNavigate} targetTopicId={targetId} />
            )}
            {currentTab === 'chess960' && <Chess960Section />}
            {currentTab === 'qa' && (
              <QuestionsBankSection onNavigate={handleNavigate} targetQuestionId={targetId} />
            )}
            {currentTab === 'practice' && <PracticeQuizSection onNavigate={handleNavigate} />}
            {currentTab === 'glossary' && (
              <GlossarySection onNavigate={handleNavigate} targetTermId={targetId} />
            )}
            {currentTab === 'source-map' && <SourceMapSection />}
          </div>

          {/* Footer */}
          <footer className="mt-20 border-t border-slate-800 pt-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white">CHESSLAB NOTE</span>
                <span>•</span>
                <span>Nhóm 12 • UET – VNU</span>
                <span>•</span>
                <span className="font-mono text-emerald-400">
                  Commit {PROJECT_METADATA.referenceCommit.substring(0, 7)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>Xây dựng phục vụ bảo vệ bài tập lớn môn Biểu diễn tri thức và tìm kiếm nâng cao</span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-30 p-3 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 transition-all scale-100 hover:scale-110 cursor-pointer"
          title="Lên đầu trang"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default App;
