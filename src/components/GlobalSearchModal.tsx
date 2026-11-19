import React, { useState, useEffect } from 'react';
import { Search, X, Code, BookOpen, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import { QUESTIONS_BANK } from '../data/questionsBank';
import { ALGORITHM_TOPICS } from '../data/algorithms';
import { GLOSSARY_ITEMS } from '../data/glossary';
import { CODE_MODULES } from '../data/codeModules';
import type { TabType } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabType, targetId?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search in Questions
  const matchedQuestions = q
    ? QUESTIONS_BANK.filter(
        (item) =>
          item.question.toLowerCase().includes(q) ||
          item.quickAnswer.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 5)
    : [];

  // Search in Theory
  const matchedTheory = q
    ? ALGORITHM_TOPICS.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.definition.toLowerCase().includes(q) ||
          item.principle.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  // Search in Glossary
  const matchedGlossary = q
    ? GLOSSARY_ITEMS.filter(
        (item) =>
          item.term.toLowerCase().includes(q) ||
          item.vietnamese.toLowerCase().includes(q) ||
          item.shortDef.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  // Search in Code Annotations
  const matchedCode = q
    ? Object.values(CODE_MODULES).flatMap((mod) =>
        mod.annotations
          .filter(
            (ann) =>
              ann.title.toLowerCase().includes(q) ||
              ann.purpose.toLowerCase().includes(q) ||
              ann.defensePoints.some((dp) => dp.toLowerCase().includes(q))
          )
          .map((ann) => ({ ...ann, moduleFile: mod.fileName }))
      ).slice(0, 4)
    : [];

  const totalResults =
    matchedQuestions.length + matchedTheory.length + matchedGlossary.length + matchedCode.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/50">
          <Search className="w-5 h-5 text-emerald-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Tìm kiếm mã nguồn, thuật toán, câu hỏi vấn đáp, thuật ngữ (Ctrl+K)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-500"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white mr-2 text-xs"
            >
              Xóa
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              Gõ từ khóa để tra cứu toàn bộ cơ sở tri thức ChessLab Nhóm 12
              <div className="flex justify-center gap-2 mt-3 font-mono text-[11px]">
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">Negamax</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">PeSTO</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">PVS</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">TimeManager</span>
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">SEE</span>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              Không tìm thấy kết quả nào khớp với "<strong>{query}</strong>".
            </div>
          ) : (
            <>
              {/* Questions Group */}
              {matchedQuestions.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Ngân hàng câu hỏi vấn đáp ({matchedQuestions.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchedQuestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate('qa', item.id);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-emerald-500/50 transition group flex items-start justify-between"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                            {item.question}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {item.quickAnswer}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Theory Group */}
              {matchedTheory.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    Lý thuyết thuật toán ({matchedTheory.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchedTheory.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate('theory', item.id);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/50 transition group flex items-start justify-between"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-cyan-300">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {item.definition}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Code Group */}
              {matchedCode.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-amber-400" />
                    Sổ tay mã nguồn ({matchedCode.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchedCode.map((item) => {
                      const tabName: TabType =
                        item.moduleFile === 'bot.py'
                          ? 'code-bot'
                          : item.moduleFile === 'search.py'
                          ? 'code-search'
                          : item.moduleFile === 'evaluation.py'
                          ? 'code-eval'
                          : 'code-time';

                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onNavigate(tabName, item.id);
                            onClose();
                          }}
                          className="w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-amber-500/50 transition group flex items-start justify-between"
                        >
                          <div>
                            <div className="text-xs font-semibold text-white group-hover:text-amber-300 flex items-center gap-2">
                              {item.title}
                              <span className="text-[10px] font-mono text-slate-400">
                                {item.moduleFile} (L{item.startLine}-{item.endLine})
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                              {item.purpose}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0 ml-2" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Glossary Group */}
              {matchedGlossary.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-400" />
                    Bảng thuật ngữ AI ({matchedGlossary.length})
                  </div>
                  <div className="space-y-1.5">
                    {matchedGlossary.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate('glossary', item.id);
                          onClose();
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/50 transition group flex items-start justify-between"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white group-hover:text-purple-300 flex items-center gap-2">
                            {item.term}
                            <span className="text-[11px] text-slate-400">({item.vietnamese})</span>
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {item.shortDef}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
