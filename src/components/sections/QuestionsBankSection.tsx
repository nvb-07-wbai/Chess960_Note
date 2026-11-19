import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { QUESTIONS_BANK } from '../../data/questionsBank';
import type { QAQuestion, QuestionCategory, QuestionDifficulty, TabType } from '../../types';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Shield,
  Code,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface QuestionsBankSectionProps {
  onNavigate: (tab: TabType, targetId?: string) => void;
  targetQuestionId?: string;
}

export const QuestionsBankSection: React.FC<QuestionsBankSectionProps> = ({
  onNavigate,
  targetQuestionId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    [targetQuestionId || '']: true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = (expand: boolean) => {
    const updated: Record<string, boolean> = {};
    filteredQuestions.forEach((q) => {
      updated[q.id] = expand;
    });
    setExpandedIds(updated);
  };

  const filteredQuestions = QUESTIONS_BANK.filter((q) => {
    const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchQuery =
      !searchQuery ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.quickAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchDiff && matchQuery;
  });

  const getCategoryBadgeVariant = (cat: QuestionCategory): 'cyan' | 'amber' | 'rose' => {
    switch (cat) {
      case 'general':
        return 'cyan';
      case 'code':
        return 'amber';
      case 'scenario':
      default:
        return 'rose';
    }
  };

  const getDifficultyBadgeVariant = (diff: QuestionDifficulty): 'emerald' | 'amber' | 'rose' => {
    switch (diff) {
      case 'basic':
        return 'emerald';
      case 'medium':
        return 'amber';
      case 'advanced':
        return 'rose';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <SectionHeader
        badge="Ngân Hàng Vấn Đáp"
        badgeVariant="emerald"
        title="Ngân Hàng Câu Hỏi & Đáp Án Vấn Đáp Chuẩn (48 Câu)"
        description="Được phân loại theo 3 nhóm: Kiến thức chung, Đi sâu vào mã nguồn và Câu hỏi tình huống. Mỗi câu hỏi gồm câu trả lời 30 giây để nói trực tiếp trước giảng viên, phân tích bản chất, trích dẫn file code và câu hỏi truy vấn tiếp nối."
      />

      {/* Filter and Search Bar */}
      <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi theo từ khóa, thẻ (tags)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => expandAll(true)}
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
            >
              Mở tất cả
            </button>
            <button
              onClick={() => expandAll(false)}
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
            >
              Thu gọn
            </button>
            <button
              onClick={() => onNavigate('practice')}
              className="text-xs font-bold text-white px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 shadow-md transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Luyện tập Flashcard
            </button>
          </div>
        </div>

        {/* Category & Difficulty Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-700/60 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-medium">Nhóm câu hỏi:</span>
            {[
              { id: 'all', label: `Tất cả (${QUESTIONS_BANK.length})` },
              { id: 'general', label: 'Nhóm 1: Kiến thức chung (15)' },
              { id: 'code', label: 'Nhóm 2: Chuyên sâu Code (18)' },
              { id: 'scenario', label: 'Nhóm 3: Tình huống (15)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Độ khó:</span>
            {['all', 'basic', 'medium', 'advanced'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 rounded-lg capitalize font-semibold transition cursor-pointer ${
                  selectedDifficulty === diff
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {diff === 'all' ? 'Tất cả' : diff === 'basic' ? 'Cơ bản' : diff === 'medium' ? 'Trung bình' : 'Nâng cao'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800">
            Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedIds[q.id] ?? false;

            return (
              <div
                key={q.id}
                id={`q-${q.id}`}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? 'bg-slate-900/90 border-slate-700 shadow-xl'
                    : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                {/* Header / Question Title */}
                <button
                  onClick={() => toggleExpand(q.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono font-bold text-slate-500">
                        #{idx + 1}
                      </span>
                      <Badge variant={getCategoryBadgeVariant(q.category)}>
                        {q.category === 'general'
                          ? 'Kiến thức chung'
                          : q.category === 'code'
                          ? 'Chuyên sâu Code'
                          : 'Tình huống'}
                      </Badge>
                      <Badge variant={getDifficultyBadgeVariant(q.difficulty)} size="sm">
                        {q.difficulty === 'basic' ? 'Cơ bản' : q.difficulty === 'medium' ? 'Trung bình' : 'Nâng cao'}
                      </Badge>
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-800/80 px-2 py-0.5 rounded">
                        {q.topic}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="p-1 rounded-lg text-slate-400 hover:text-white shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Body Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4 text-xs sm:text-sm">
                    {/* Quick Answer (20-45s pitch) */}
                    <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                        <span className="flex items-center gap-1.5">
                          <Shield className="w-4 h-4" /> Trả lời nhanh trước giảng viên (20 – 45 giây):
                        </span>
                        <span className="text-[10px] font-normal text-slate-400 font-mono">
                          Elevator Pitch
                        </span>
                      </div>
                      <p className="text-slate-100 font-medium leading-relaxed">
                        {q.quickAnswer}
                      </p>
                    </div>

                    {/* Detailed Explanation */}
                    <div>
                      <span className="font-bold text-slate-300 block mb-1 text-xs">
                        Giải thích chi tiết để hiểu bản chất:
                      </span>
                      <p className="text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800 text-xs">
                        {q.detailedExplanation}
                      </p>
                    </div>

                    {/* Example Scenario if any */}
                    {q.exampleScenario && (
                      <div className="text-xs text-slate-400 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                        <strong>Ví dụ thực tế:</strong> {q.exampleScenario}
                      </div>
                    )}

                    {/* Code Reference and Teacher Follow-up */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {q.codeReference && (
                        <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs space-y-1">
                          <span className="text-slate-400 font-medium block">
                            File và hàm liên quan trong code Nhóm 12:
                          </span>
                          <div className="font-mono text-emerald-400 font-bold flex items-center justify-between">
                            <span>
                              {q.codeReference.file} ({q.codeReference.lines})
                            </span>
                            <button
                              onClick={() => {
                                const tabMap: Record<string, TabType> = {
                                  'student/bot.py': 'code-bot',
                                  'student/search.py': 'code-search',
                                  'student/evaluation.py': 'code-eval',
                                  'student/time_manager.py': 'code-time',
                                };
                                const tab = tabMap[q.codeReference?.file || ''] || 'code-bot';
                                onNavigate(tab);
                              }}
                              className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-sans cursor-pointer"
                            >
                              Xem code <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            Hàm: {q.codeReference.functionName}
                          </div>
                        </div>
                      )}

                      <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl text-xs space-y-1">
                        <span className="text-rose-400 font-bold block flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5" /> Câu hỏi truy vấn tiếp theo (Giảng viên có thể hỏi sâu):
                        </span>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {q.teacherFollowUp}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
