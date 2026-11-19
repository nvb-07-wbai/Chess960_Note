import React, { useState, useMemo } from 'react';
import { MEMBER_QUESTIONS } from '../../data/memberQuestions';
import type { DefenseQuestion } from '../../types';

export const MemberQASection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<string>('bach');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const members = [
    { id: 'bach', name: 'Nguyễn Văn Bách', role: 'Kiến trúc & Bot Coordinator (bot.py)', count: 16 },
    { id: 'long', name: 'Trần Phi Long', role: 'Thuật toán tìm kiếm & Alpha-Beta (search.py)', count: 16 },
    { id: 'viet', name: 'Nguyễn Tiến Việt', role: 'Đánh giá thế cờ & Tapered Eval (evaluation.py)', count: 16 },
    { id: 'vuong', name: 'Hồ Sĩ Vương', role: 'Sắp xếp nước đi & Quản lý thời gian (time_manager.py)', count: 16 },
  ];

  const currentMemberInfo = members.find((m) => m.id === selectedMember) || members[0];

  const filteredQuestions = useMemo(() => {
    return MEMBER_QUESTIONS.filter((q: DefenseQuestion) => {
      const matchMember = q.memberTarget === selectedMember;
      const isCross = q.title.toLowerCase().includes('chéo') || q.question.toLowerCase().includes('chéo');
      const matchCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'role' && !isCross) ||
        (selectedCategory === 'cross' && isCross);
      const matchSearch =
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.quickPitch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.deepExplanation.toLowerCase().includes(searchTerm.toLowerCase());
      return matchMember && matchCategory && matchSearch;
    });
  }, [selectedMember, selectedCategory, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <span>👤</span>
              Bộ câu hỏi cá nhân & Chất vấn chéo – 64 câu (16 câu / thành viên)
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Ngân Hàng Vấn Đáp Theo Thành Viên (Member Q&A)
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Mỗi thành viên được trang bị <span className="text-emerald-400 font-semibold">8 câu hỏi chuyên sâu phần việc</span> và{' '}
              <span className="text-amber-400 font-semibold">8 câu hỏi chất vấn chéo (Cross-examination)</span> để đảm bảo không ai bị động
              khi thầy cô hỏi sang module của bạn khác.
            </p>
          </div>
        </div>

        {/* Member Selector Tabs */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {members.map((m) => {
            const isSelected = selectedMember === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMember(m.id);
                  setExpandedId(null);
                }}
                className={`p-4 rounded-xl text-left transition-all border ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500/50 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{m.name}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                    16 câu
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{m.role}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Sub-nav Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-2">Phân loại:</span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-700 text-white font-semibold'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            Tất cả (16)
          </button>
          <button
            onClick={() => setSelectedCategory('role')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === 'role'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            Chuyên trách
          </button>
          <button
            onClick={() => setSelectedCategory('cross')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === 'cross'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            Chất vấn chéo
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder={`Tìm câu hỏi cho ${currentMemberInfo.name}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Member Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q: DefenseQuestion, idx: number) => {
          const isExpanded = expandedId === q.id;
          const isCross = q.title.toLowerCase().includes('chéo') || q.question.toLowerCase().includes('chéo');

          return (
            <div
              key={q.id}
              className={`bg-slate-900 border transition-all rounded-2xl overflow-hidden ${
                isExpanded
                  ? isCross
                    ? 'border-amber-500/50 shadow-xl shadow-amber-500/5'
                    : 'border-emerald-500/50 shadow-xl shadow-emerald-500/5'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Question Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-start md:items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-lg font-mono text-xs font-bold border shrink-0 ${
                      isCross
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}
                  >
                    {isCross ? 'CHÉO' : 'CHUYÊN'} {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-white leading-snug">
                      {q.question}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-mono text-slate-500">{q.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] text-slate-400">
                        {isCross ? 'Chất vấn module ngoài chuyên trách' : 'Trọng tâm module phụ trách'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    className={`text-xs font-medium flex items-center gap-1 ${
                      isCross ? 'text-amber-400 hover:text-amber-300' : 'text-emerald-400 hover:text-emerald-300'
                    }`}
                  >
                    {isExpanded ? 'Thu gọn ▲' : 'Xem câu trả lời ▼'}
                  </button>
                </div>
              </div>

              {/* Expanded Answer Content */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-800/80 bg-slate-950/40 space-y-5">
                  {/* 30s Elevator Pitch */}
                  <div
                    className={`border rounded-xl p-4 space-y-1.5 ${
                      isCross
                        ? 'bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/20 border-amber-500/30'
                        : 'bg-gradient-to-r from-emerald-950/30 via-slate-900 to-emerald-950/20 border-emerald-500/30'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                        isCross ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      <span>⚡</span> Kịch bản trả lời nhanh 30 giây (Nói tự tin, dứt khoát):
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium italic">
                      "{q.answer.quickPitch}"
                    </p>
                  </div>

                  {/* Full Analysis */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>📖</span> Phân tích chi tiết & Luận cứ bảo vệ:
                    </h4>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {q.answer.deepExplanation}
                    </p>
                  </div>

                  {/* Execution Flow */}
                  {q.answer.executionFlow && q.answer.executionFlow.length > 0 && (
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        ⚡ Trình tự thực thi logic:
                      </h4>
                      <ol className="space-y-1 text-xs text-slate-300">
                        {q.answer.executionFlow.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono">{sIdx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Follow-up Traps */}
                  {q.answer.teacherFollowUps && q.answer.teacherFollowUps.length > 0 && (
                    <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span>🎯</span> Bẫy chất vấn dồn dập của Giảng viên:
                      </h4>
                      <div className="space-y-2 text-xs">
                        {q.answer.teacherFollowUps.map((tf, trapIdx) => (
                          <div key={trapIdx} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                            <strong className="text-rose-300 block mb-1">Q: {tf.question}</strong>
                            <p className="text-slate-300 italic">{tf.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
