import React, { useState } from 'react';
import { PARAMETERS_DATA } from '../../data/parameterGuide';
import type { ParameterDossier } from '../../types';

export const ParameterGuideSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Tất cả 12 tham số' },
    { id: 'search', label: 'Tìm kiếm & Bảng băm' },
    { id: 'pruning', label: 'Cắt tỉa (Pruning)' },
    { id: 'eval', label: 'Đánh giá (Evaluation)' },
    { id: 'time', label: 'Thời gian (Time)' },
  ];

  const filteredParams = PARAMETERS_DATA.filter((p: ParameterDossier) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'search') return p.category === 'search' || p.category === 'memory';
    if (selectedCategory === 'pruning') return p.category === 'pruning';
    if (selectedCategory === 'eval') return p.category === 'eval';
    if (selectedCategory === 'time') return p.category === 'time';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
              <span>⚖️</span>
              Cẩm nang bảo vệ siêu tham số (Hyperparameters)
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Tại Sao Lại Là Con Số Này? (Why This Value?)
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Giải trình mọi con số ma thuật (magic numbers), công thức thực nghiệm và ngưỡng an toàn trong mã nguồn
              của Nhóm 12 để trả lời xuất sắc câu hỏi <span className="text-white font-medium">"Tại sao chọn giá trị này?"</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
              12 Thông số trọng yếu
            </span>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === c.id
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredParams.map((param: ParameterDossier) => {
          const isExpanded = expandedId === param.id;
          return (
            <div
              key={param.id}
              className={`bg-slate-900 border transition-all rounded-2xl overflow-hidden flex flex-col justify-between ${
                isExpanded
                  ? 'border-amber-500/50 shadow-xl shadow-amber-500/5 col-span-1 md:col-span-2'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="p-5 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">{param.file}</span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-amber-400 font-medium uppercase tracking-wider">
                        {param.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white font-mono mt-0.5">{param.name}</h3>
                  </div>
                  <div className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-sm font-bold shadow-inner">
                    {param.currentValue}
                  </div>
                </div>

                {/* Role in algorithm */}
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  <strong className="text-white">Vai trò:</strong> {param.roleInAlgorithm}
                </p>

                {/* If increased / decreased quick comparison */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-900/30">
                    <span className="font-semibold text-blue-400 block mb-0.5">▲ Nếu tăng quá cao:</span>
                    <span className="text-slate-400">{param.ifIncreased}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/30">
                    <span className="font-semibold text-rose-400 block mb-0.5">▼ Nếu giảm quá thấp:</span>
                    <span className="text-slate-400">{param.ifDecreased}</span>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-800/80 space-y-4">
                    <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <span>🧪</span> Cơ sở lý thuyết & Căn cứ thực nghiệm:
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{param.whyChosen}</p>
                    </div>

                    <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-900/30">
                      <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <span>🎤</span> Kịch bản trả lời 30 giây khi được hỏi:
                      </h4>
                      <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-950/80 p-3 rounded-lg border border-slate-800/80">
                        "{param.defenseScript}"
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Expand Toggle Button */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : param.id)}
                className="px-5 py-2.5 bg-slate-950/60 border-t border-slate-800/60 cursor-pointer text-center text-xs text-slate-400 hover:text-amber-400 hover:bg-slate-800/30 transition-colors select-none font-medium"
              >
                {isExpanded ? 'Thu gọn phân tích ▲' : 'Xem đầy đủ căn cứ & kịch bản 30s ▼'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
