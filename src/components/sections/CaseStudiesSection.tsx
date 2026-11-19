import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/caseStudies';
import type { CaseStudyDossier } from '../../types';

export const CaseStudiesSection: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);

  const currentCase: CaseStudyDossier =
    CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  const getResultBadge = (outcome: string) => {
    switch (outcome) {
      case 'mate':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Chiếu hết (Mate)
          </span>
        );
      case 'timeout-win':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Thắng hết giờ (Timeout Win)
          </span>
        );
      case 'material-gain':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Ưu thế vật chất lớn
          </span>
        );
      case 'draw':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-300 border border-slate-500/20">
            Hòa cờ (Draw)
          </span>
        );
      case 'missed-win':
      case 'depth-barrier':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Hạn chế / Thua
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
              <span>♟️</span>
              Chương 5 Báo cáo – Phân tích 10 tình huống thực chiến
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Phân Tích Ván Đấu & Tình Huống Cờ (Case Studies)
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              10 tình huống bước ngoặt trong giải đấu 48 ván (Bảng 10): Nước đi then chốt, thời gian suy nghĩ,
              sự phối hợp thuật toán và <span className="text-amber-400 font-medium">câu hỏi bảo vệ trước giảng viên</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
              POS-01 đến POS-10
            </span>
          </div>
        </div>

        {/* Horizontal Case Selector */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CASE_STUDIES.map((cs) => {
            const isSelected = cs.id === selectedCaseId;
            return (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseId(cs.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-purple-600 text-white font-semibold shadow-lg shadow-purple-600/30'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="font-mono font-bold">{cs.id}</span>
                <span className="opacity-75">{cs.matchId}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Case Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 font-mono text-sm font-bold border border-purple-500/20">
                    {currentCase.id}
                  </span>
                  <h2 className="text-lg font-bold text-white">{currentCase.matchId}</h2>
                  <span className="text-xs text-slate-400 font-mono">(Nước #{currentCase.moveNumber})</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Chủ đề chiến thuật: <strong className="text-slate-200">{currentCase.tacticalTheme}</strong>
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getResultBadge(currentCase.outcomeType)}
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Nước đi then chốt</span>
                <span className="text-base font-bold text-white font-mono">{currentCase.movePlayed}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">Bên: {currentCase.color}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Thời gian suy nghĩ</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  {(currentCase.thinkingTimeMs / 1000).toFixed(3)}s
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{currentCase.thinkingTimeMs} ms</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Điểm lượng giá</span>
                <span className="text-base font-bold text-amber-400 font-mono">
                  {currentCase.evalScore}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Δ: {currentCase.deltaCp}</span>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[11px] text-slate-500 block">Biến thể Chess960</span>
                <span className="text-base font-bold text-purple-400 font-mono">ID #{currentCase.frcId}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Fischer Random</span>
              </div>
            </div>

            {/* Tactical Rationale */}
            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-2">
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <span>🔍</span> Bối cảnh bàn cờ & Quyết định của Bot
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{currentCase.boardStateDesc}</p>
              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800/60">
                <strong className="text-slate-300">Lý do chọn nước cờ:</strong> {currentCase.botChoiceReason}
              </p>
            </div>

            {/* Key Algorithm Responsible */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-medium">Thuật toán chịu trách nhiệm chính:</span>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-emerald-400">
                ⚡ {currentCase.keyAlgorithmResponsible}
              </div>
            </div>

            {/* Heuristic & Alternatives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-950/20 border border-blue-900/30 p-3.5 rounded-xl space-y-1">
                <h4 className="font-semibold text-blue-400 uppercase tracking-wider text-[11px]">
                  📌 Heuristic / Ngưỡng kích hoạt:
                </h4>
                <p className="text-slate-300 leading-relaxed">{currentCase.activeHeuristicOrThreshold}</p>
              </div>
              <div className="bg-slate-950/40 border border-slate-800 p-3.5 rounded-xl space-y-1">
                <h4 className="font-semibold text-slate-400 uppercase tracking-wider text-[11px]">
                  💡 Nước cờ thay thế tốt hơn (nếu có):
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {currentCase.betterAlternative || 'Không có, đây là nước cờ tối ưu tuyệt đối.'}
                </p>
              </div>
            </div>

            {/* Actual Outcome & How to Improve */}
            <div className="bg-purple-950/20 border border-purple-900/30 p-4 rounded-xl space-y-2 text-xs">
              <div>
                <strong className="text-purple-300 block mb-0.5">Kết quả thực tế ván đấu:</strong>
                <span className="text-slate-300">{currentCase.actualOutcome}</span>
              </div>
              <div className="pt-2 border-t border-purple-900/20">
                <strong className="text-amber-300 block mb-0.5">Nếu được làm lại, nhóm sẽ cải tiến:</strong>
                <span className="text-slate-300">{currentCase.ifRedoneHowToImprove}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Teacher Follow-up & Defense Note */}
        <div className="space-y-4">
          <div className="bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>🎯</span> Câu hỏi vấn đáp tình huống này:
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs text-amber-300 font-semibold block">Gợi ý câu hỏi thầy cô:</span>
              <p className="text-sm font-semibold text-white italic">
                "{currentCase.tacticalIssue}"
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-emerald-400 font-semibold block flex items-center gap-1.5">
                <span>🎤</span> Kịch bản trả lời xuất sắc (Nói trôi chảy):
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {currentCase.teacherDefenseNotes}
              </p>
            </div>
          </div>

          {/* Quick Navigation to Other Cases */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              10 Ván đấu tiêu biểu (Bảng 10):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {CASE_STUDIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-2 rounded-lg text-left transition-all font-mono truncate ${
                    c.id === selectedCaseId
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                      : 'bg-slate-800/40 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {c.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
