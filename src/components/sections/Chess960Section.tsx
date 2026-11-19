import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { CHESS960_OVERVIEW, CHESS960_RULES } from '../../data/chess960Rules';
import { Shield, Sparkles, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Chess960Section: React.FC = () => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>(CHESS960_RULES[0].id);

  const selectedRule = CHESS960_RULES.find((r) => r.id === selectedRuleId) || CHESS960_RULES[0];

  return (
    <div className="space-y-8 animate-fadeIn">
      <SectionHeader
        badge="Luật Thi Đấu"
        badgeVariant="indigo"
        title="Chess960 (Fischer Random) & Thể Thức Giải Đấu"
        description="Toàn bộ quy định về 960 thế cờ xuất phát, nguyên tắc nhập thành Chess960, các nước đi đặc biệt và những ràng buộc khắt khe của hệ thống thi đấu ChessLab."
      />

      {/* Overview Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <Badge variant="indigo">Lịch sử & Động lực</Badge>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {CHESS960_OVERVIEW.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {CHESS960_OVERVIEW.coreMotivation}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400 font-mono">
            <span>Nhà phát minh: <strong className="text-white">{CHESS960_OVERVIEW.inventor}</strong></span>
            <span>Tổng số thế cờ: <strong className="text-indigo-400">{CHESS960_OVERVIEW.totalPositions}</strong></span>
            <span>Cờ vua chuẩn: <strong className="text-emerald-400">ID #{CHESS960_OVERVIEW.standardChessId} (RNBQKBNR)</strong></span>
          </div>
        </div>
      </div>

      {/* Rules Navigation & Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation list */}
        <div className="lg:col-span-4 space-y-2">
          {CHESS960_RULES.map((rule) => {
            const isSelected = selectedRuleId === rule.id;
            return (
              <button
                key={rule.id}
                onClick={() => setSelectedRuleId(rule.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/50 border-indigo-500 shadow-lg scale-[1.01]'
                    : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                  {rule.category}
                </div>
                <div className="text-xs font-bold text-white mt-0.5">{rule.title}</div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {rule.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Rule Content */}
        <div className="lg:col-span-8 bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-xl space-y-5">
          <div>
            <Badge variant="indigo">{selectedRule.category.toUpperCase()}</Badge>
            <h3 className="text-xl font-bold text-white mt-1.5">{selectedRule.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{selectedRule.subtitle}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
            {selectedRule.summary}
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Chi tiết các quy định:
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {selectedRule.details.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Defense Notes */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-slate-200 space-y-1">
            <div className="font-bold text-indigo-300 flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Điểm mấu chốt khi vấn đáp về Chess960:
            </div>
            <p className="leading-relaxed text-[11px] text-slate-300">
              {selectedRule.defenseNotes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
