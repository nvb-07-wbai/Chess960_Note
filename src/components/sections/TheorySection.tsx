import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ALGORITHM_TOPICS } from '../../data/algorithms';
import { ALGORITHM_DEFENSE_QA } from '../../data/algorithmDefenseQA';
import type { AlgorithmDefenseQAItem } from '../../data/algorithmDefenseQA';
import type { AlgorithmTopic, TabType } from '../../types';
import {
  BookOpen,
  Cpu,
  ChevronDown,
  ChevronUp,
  Shield,
  Code,
  Layers,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  GraduationCap,
  AlertTriangle,
  CheckCircle2,
  FileCode,
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { AlphaBetaVisualizer } from '../widgets/AlphaBetaVisualizer';
import { ChessboardViewer } from '../widgets/ChessboardViewer';
import { TimeCalculator } from '../widgets/TimeCalculator';
import { MoveOrderingVisualizer } from '../widgets/MoveOrderingVisualizer';
import { TranspositionTableDemo } from '../widgets/TranspositionTableDemo';

interface TheorySectionProps {
  onNavigate: (tab: TabType, targetId?: string) => void;
  targetTopicId?: string;
}

export const TheorySection: React.FC<TheorySectionProps> = ({ onNavigate, targetTopicId }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    targetTopicId || ALGORITHM_TOPICS[0].id
  );
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [showAllAnswers, setShowAllAnswers] = useState<boolean>(false);

  const categories = [
    'all',
    'Cơ sở lý thuyết',
    'Thuật toán tìm kiếm',
    'Kỹ thuật cắt tỉa',
    'Tối ưu hóa tìm kiếm',
    'Thuật toán tìm kiếm nâng cao',
    'Bộ nhớ & Quản trị trạng thái',
    'Cắt tỉa & Xử lý biên',
    'Kỹ thuật cắt tỉa nâng cao',
    'Biểu diễn tri thức & Lượng giá',
    'Quản trị hệ thống',
  ];

  const currentTopic =
    ALGORITHM_TOPICS.find((t) => t.id === selectedTopicId) || ALGORITHM_TOPICS[0];

  const defenseQAList = ALGORITHM_DEFENSE_QA[currentTopic.id] || [];

  const toggleAnswer = (id: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleAll = () => {
    const nextState = !showAllAnswers;
    setShowAllAnswers(nextState);
    const updated: Record<string, boolean> = {};
    defenseQAList.forEach((item) => {
      updated[item.id] = nextState;
    });
    setRevealedAnswers(updated);
  };

  const getTargetCodeTab = (fileName?: string): TabType => {
    if (!fileName) return 'code-map';
    if (fileName.includes('search')) return 'code-search';
    if (fileName.includes('eval')) return 'code-eval';
    if (fileName.includes('time')) return 'code-time';
    if (fileName.includes('bot')) return 'code-bot';
    return 'code-map';
  };

  const renderWidget = (type?: string) => {
    switch (type) {
      case 'tree':
        return <AlphaBetaVisualizer />;
      case 'chessboard':
        return <ChessboardViewer />;
      case 'time-calculator':
        return <TimeCalculator />;
      case 'move-order':
        return <MoveOrderingVisualizer />;
      case 'tt-table':
        return <TranspositionTableDemo />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <SectionHeader
        badge="Lý Thuyết Thuật Toán"
        badgeVariant="cyan"
        title="15 Chuyên Đề Thuật Toán Tìm Kiếm & Lượng Giá Đối Kháng"
        description="Từ nền tảng không gian trạng thái, Minimax, Negamax, Alpha-Beta đến các kỹ thuật hiện đại: PVS, LMR, NMP, RFP, PeSTO Tapered Evaluation và Quản trị thời gian hấp thụ độ trễ."
      />

      {/* Filter Category Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              filterCategory === cat
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {cat === 'all' ? 'Tất cả chủ đề' : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Topics Navigation List (4 cols) */}
        <div className="lg:col-span-4 space-y-2 max-h-[850px] overflow-y-auto pr-1">
          {ALGORITHM_TOPICS.filter(
            (t) => filterCategory === 'all' || t.category === filterCategory
          ).map((topic, idx) => {
            const isSelected = selectedTopicId === topic.id;

            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500 shadow-lg scale-[1.01]'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">
                    CHỦ ĐỀ {idx + 1}
                  </span>
                  <Badge variant="cyan" size="sm">
                    {topic.category}
                  </Badge>
                </div>
                <div className="text-xs font-bold text-white line-clamp-1">{topic.title}</div>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {topic.definition}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right: In-depth Topic Content & Widget (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="cyan">{currentTopic.category}</Badge>
                <span className="text-xs text-slate-400 font-mono">
                  {currentTopic.team12Implementation.file} ({currentTopic.team12Implementation.lines})
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {currentTopic.title}
              </h2>
            </div>

            {/* Definition & Principle */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="font-bold text-slate-300 block mb-1">Định nghĩa bản chất:</span>
                <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                  {currentTopic.definition}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-300 block mb-1">Nguyên lý hoạt động:</span>
                <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                  {currentTopic.principle}
                </p>
              </div>
            </div>

            {/* Mathematical Formula if available */}
            {currentTopic.formula && (
              <div>
                <span className="font-bold text-slate-300 block mb-1 text-xs">Công thức toán học:</span>
                <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/30 text-cyan-300 font-mono text-xs overflow-x-auto">
                  {currentTopic.formula}
                </div>
              </div>
            )}

            {/* Pseudocode if available */}
            {currentTopic.pseudocode && (
              <div>
                <span className="font-bold text-slate-300 block mb-1 text-xs">Mã giả thuật toán (Pseudocode):</span>
                <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed">
                  {currentTopic.pseudocode}
                </pre>
              </div>
            )}

            {/* Team 12 Implementation & Rationale */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 space-y-3 text-xs">
              <div className="font-bold text-white flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-emerald-400" />
                  Cách Nhóm 12 triển khai trong mã nguồn thực tế:
                </span>
                <span className="font-mono text-emerald-400">
                  {currentTopic.team12Implementation.functionName}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed">
                {currentTopic.team12Implementation.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/40">
                  <span className="text-emerald-400 font-bold block mb-1">Lý do nhóm lựa chọn:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {currentTopic.team12Implementation.rationale}
                  </p>
                </div>
                <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-700/40">
                  <span className="text-amber-400 font-bold block mb-1">Giới hạn & Lưu ý:</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {currentTopic.team12Implementation.limitations}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Defense Q&A Box (Click to reveal answers) */}
            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950 border border-emerald-500/30 shadow-xl space-y-4">
                {/* Header of Defense Box */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                        KHUNG VẤN ĐÁP GIẢNG VIÊN (CLICK ĐỂ HIỆN ĐÁP ÁN)
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Mô phỏng phản xạ phòng thủ: Tự trả lời trước, sau đó nhấp vào từng câu hỏi để đối chiếu đáp án chi tiết và dẫn chứng mã nguồn.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium">
                      {defenseQAList.length} câu hỏi
                    </span>
                    {defenseQAList.length > 0 && (
                      <button
                        onClick={handleToggleAll}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-colors"
                      >
                        {showAllAnswers ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                            <span>Ẩn tất cả</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Hiện tất cả</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* List of Q&A cards */}
                {defenseQAList.length > 0 ? (
                  <div className="space-y-3">
                    {defenseQAList.map((qa) => {
                      const isRevealed = !!revealedAnswers[qa.id];
                      return (
                        <div
                          key={qa.id}
                          className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                            isRevealed
                              ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
                              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                          }`}
                        >
                          {/* Question clickable toggle */}
                          <button
                            onClick={() => toggleAnswer(qa.id)}
                            className="w-full text-left p-3.5 flex items-start justify-between gap-3 focus:outline-none transition-colors"
                          >
                            <div className="space-y-1.5 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                                <span className="font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-bold">
                                  {qa.id}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded font-medium border ${
                                    qa.difficulty === 'basic'
                                      ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                                      : qa.difficulty === 'medium'
                                      ? 'bg-sky-950/60 text-sky-300 border-sky-500/30'
                                      : 'bg-purple-950/60 text-purple-300 border-purple-500/30'
                                  }`}
                                >
                                  {qa.difficulty === 'basic'
                                    ? 'Cơ bản'
                                    : qa.difficulty === 'medium'
                                    ? 'Trung cấp'
                                    : 'Chuyên sâu'}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                                  {qa.categoryType}
                                </span>
                              </div>
                              <h5 className="text-xs sm:text-sm font-semibold text-white leading-snug flex items-start gap-2">
                                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{qa.question}</span>
                              </h5>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                              <span
                                className={`text-[11px] font-medium px-2 py-1 rounded-md transition-colors hidden sm:inline-flex items-center gap-1 ${
                                  isRevealed
                                    ? 'bg-slate-800 text-slate-300'
                                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                }`}
                              >
                                {isRevealed ? (
                                  <>
                                    <EyeOff className="w-3.5 h-3.5" /> Ẩn đáp án
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-3.5 h-3.5" /> Mở đáp án
                                  </>
                                )}
                              </span>
                              <div
                                className={`p-1.5 rounded-lg border transition-all ${
                                  isRevealed
                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                    : 'bg-slate-800 text-slate-400 border-slate-700'
                                }`}
                              >
                                {isRevealed ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </div>
                            </div>
                          </button>

                          {/* Collapsible Answer Body */}
                          {isRevealed && (
                            <div className="px-4 pb-4 pt-1 space-y-3 border-t border-slate-800/80 animate-in fade-in duration-200">
                              {/* 1. Quick Pitch */}
                              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs">
                                <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                                  ⚡ Phản xạ 30 giây (Trả lời ngắn gọn, tự tin):
                                </div>
                                <p className="text-slate-100 leading-relaxed font-sans">
                                  {qa.quickPitch}
                                </p>
                              </div>

                              {/* 2. Deep Academic Explanation */}
                              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
                                <div className="font-bold text-sky-400 mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                                  <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                                  📖 Cơ sở lý thuyết & Báo cáo kỹ thuật:
                                </div>
                                <p className="text-slate-300 leading-relaxed font-sans">
                                  {qa.deepExplanation}
                                </p>
                              </div>

                              {/* 3. Code Reference if available */}
                              {qa.codeRef && (
                                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                                  <div className="flex items-center gap-2">
                                    <FileCode className="w-4 h-4 text-emerald-400" />
                                    <span className="text-slate-400 text-[11px]">Dẫn chứng mã nguồn:</span>
                                    <span className="font-mono text-emerald-300 font-semibold text-[11px]">
                                      {qa.codeRef.file}
                                    </span>
                                    <span className="text-slate-500 text-[10px]">→</span>
                                    <span className="font-mono text-cyan-300 text-[11px]">
                                      {qa.codeRef.functionName}()
                                    </span>
                                    <span className="text-slate-400 text-[10px]">
                                      ({qa.codeRef.lines})
                                    </span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onNavigate(
                                        getTargetCodeTab(qa.codeRef?.file),
                                        qa.codeRef?.functionName
                                      );
                                    }}
                                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[11px] font-medium border border-slate-700 transition-colors flex items-center gap-1"
                                  >
                                    Xem hàm này <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                              )}

                              {/* 4. Teacher Follow-up Question if available */}
                              {qa.teacherFollowUp && (
                                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-xs space-y-1.5">
                                  <div className="font-bold text-amber-400 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                                    ⚠️ Giảng viên chất vấn thêm (Follow-up Question):
                                  </div>
                                  <p className="text-amber-200/90 font-medium italic">
                                    "{qa.teacherFollowUp.question}"
                                  </p>
                                  <div className="pt-1 text-slate-200 leading-relaxed border-t border-amber-500/20 text-[11px]">
                                    <span className="font-bold text-emerald-400 mr-1">Cách đối đáp:</span>
                                    {qa.teacherFollowUp.answer}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentTopic.defensePoints.map((dp, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-slate-200 text-xs leading-relaxed"
                      >
                        • {dp}
                      </div>
                    ))}
                  </div>
                )}

                {/* Additional Defense Checklist if topic has defensePoints */}
                {defenseQAList.length > 0 && currentTopic.defensePoints.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-bold text-slate-400 block mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Trọng điểm ghi nhớ nhanh khi bảo vệ thuật toán này:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentTopic.defensePoints.map((dp, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 text-[11px] leading-relaxed flex items-start gap-1.5"
                        >
                          <span className="text-emerald-400 shrink-0 font-bold">•</span>
                          <span>{dp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Widget if available */}
          {currentTopic.widgetType && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Mô phỏng trực quan tương tác cho chủ đề này:
              </div>
              {renderWidget(currentTopic.widgetType)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
