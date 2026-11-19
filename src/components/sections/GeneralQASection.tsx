import React, { useState, useMemo } from 'react';
import { GENERAL_QUESTIONS } from '../../data/generalQuestions';
import type { DefenseQuestion } from '../../types';

export const GeneralQASection: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const topics = [
    { id: 'all', label: 'Tất cả 32 câu hỏi' },
    { id: 'project-overview', label: 'Tổng quan bài toán (5)' },
    { id: 'architecture', label: 'Kiến trúc & Luồng IPC (5)' },
    { id: 'search', label: 'Thuật toán tìm kiếm (8)' },
    { id: 'evaluation', label: 'Đánh giá & Tàn cuộc (6)' },
    { id: 'time-management', label: 'Quản lý thời gian (4)' },
    { id: 'experiment', label: 'Thực nghiệm giải đấu (4)' },
  ];

  const filteredQuestions = useMemo(() => {
    return GENERAL_QUESTIONS.filter((q: DefenseQuestion) => {
      const matchTopic = selectedTopic === 'all' || q.topic === selectedTopic;
      const matchSearch =
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.quickPitch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.deepExplanation.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTopic && matchSearch;
    });
  }, [selectedTopic, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-2">
              <span>📚</span>
              Bộ câu hỏi chung toàn dự án – 32 câu chuẩn hóa
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Ngân Hàng Vấn Đáp Tổng Hợp (General Q&A)
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Bao quát toàn diện từ bài toán Chess960, kiến trúc 10 bước, thuật toán Negamax/Alpha-Beta,
              đánh giá thế cờ Tapered, quản lý thời gian 3 lớp cho đến thực nghiệm giải đấu 48 ván.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
              Đang xem: <strong className="text-blue-400">{filteredQuestions.length}</strong> / 32 câu
            </span>
          </div>
        </div>

        {/* Topic Selector & Search */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedTopic === t.id
                    ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Tìm câu hỏi, từ khóa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
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
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((q: DefenseQuestion, index: number) => {
          const isExpanded = expandedId === q.id;
          return (
            <div
              key={q.id}
              className={`bg-slate-900 border transition-all rounded-2xl overflow-hidden ${
                isExpanded
                  ? 'border-blue-500/50 shadow-xl shadow-blue-500/5'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Question Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-start md:items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 font-mono text-xs font-bold border border-blue-500/20 shrink-0">
                    Q{index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-white leading-snug">
                      {q.question}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-mono text-slate-500">Mã: {q.id}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-[11px] text-blue-400/80 font-medium">
                        {q.topic}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1">
                    {isExpanded ? 'Thu gọn ▲' : 'Xem câu trả lời ▼'}
                  </button>
                </div>
              </div>

              {/* Answer Content */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-800/80 bg-slate-950/40 space-y-5">
                  {/* 30s Elevator Pitch */}
                  <div className="bg-gradient-to-r from-emerald-950/30 via-slate-900 to-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      <span>⚡</span> Kịch bản trả lời nhanh 30 giây (Elevator Pitch):
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium italic">
                      "{q.answer.quickPitch}"
                    </p>
                  </div>

                  {/* Full Analysis */}
                  <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-2">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>📖</span> Phân tích chi tiết & Dẫn chứng kỹ thuật:
                    </h4>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {q.answer.deepExplanation}
                    </p>
                  </div>

                  {/* Execution Flow */}
                  {q.answer.executionFlow && q.answer.executionFlow.length > 0 && (
                    <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                        ⚡ Trình tự thực thi:
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
                    <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-4 space-y-2">
                      <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span>🎯</span> Câu hỏi bẫy / Mở rộng giảng viên thường hỏi thêm:
                      </h4>
                      <div className="space-y-2 text-xs">
                        {q.answer.teacherFollowUps.map((tf, fIdx) => (
                          <div key={fIdx} className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                            <strong className="text-amber-300 block mb-1">Q: {tf.question}</strong>
                            <p className="text-slate-300 italic">{tf.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Code Ref */}
                  {q.answer.codeRef && (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
                      <span className="text-slate-500">Mã nguồn tham chiếu:</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px] border border-slate-700">
                        {q.answer.codeRef.file}:{q.answer.codeRef.lines} ({q.answer.codeRef.functionName})
                      </span>
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
