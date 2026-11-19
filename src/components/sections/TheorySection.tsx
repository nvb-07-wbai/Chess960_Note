import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ALGORITHM_TOPICS } from '../../data/algorithms';
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

            {/* Defense Points */}
            <div>
              <div className="font-bold text-emerald-400 text-xs mb-2 flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> Các câu hỏi vấn đáp giảng viên có thể chất vấn:
              </div>
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
