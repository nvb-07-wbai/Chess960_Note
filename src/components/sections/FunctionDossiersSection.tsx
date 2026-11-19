import React, { useState, useMemo } from 'react';
import { FUNCTION_DOSSIERS } from '../../data/functionDossiers';
import type { FunctionDossier } from '../../types';

export const FunctionDossiersSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCoreOnly, setFilterCoreOnly] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const files = [
    { id: 'all', label: 'Tất cả 25 hàm/lớp' },
    { id: 'student/bot.py', label: 'bot.py (2)' },
    { id: 'student/search.py', label: 'search.py (9)' },
    { id: 'student/evaluation.py', label: 'evaluation.py (9)' },
    { id: 'student/time_manager.py', label: 'time_manager.py (5)' },
  ];

  const filteredDossiers = useMemo(() => {
    return FUNCTION_DOSSIERS.filter((dossier: FunctionDossier) => {
      const matchFile = selectedFile === 'all' || dossier.file === selectedFile;
      const matchCore = !filterCoreOnly || dossier.isCore;
      const matchSearch =
        dossier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dossier.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dossier.signature.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dossier.memoryDefense.toLowerCase().includes(searchTerm.toLowerCase());
      return matchFile && matchCore && matchSearch;
    });
  }, [selectedFile, filterCoreOnly, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Bảng 7 & AST Nhom12 – Đầy đủ 25 thành phần
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Hồ Sơ Toàn Bộ Hàm & Lớp (Function Dossiers)
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Tra cứu từng hàm trong mã nguồn: Vai trò, Input, Output, Thứ tự thực thi, Lý do thiết kế, 
              Kịch bản lỗi và <span className="text-amber-400 font-medium">Câu hỏi chất vấn mở rộng của giảng viên</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
              Đang hiển thị: <strong className="text-emerald-400">{filteredDossiers.length}</strong> / 25
            </span>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {files.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFile(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedFile === f.id
                    ? 'bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterCoreOnly}
                onChange={(e) => setFilterCoreOnly(e.target.checked)}
                className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500/20 bg-slate-800"
              />
              Chỉ xem hàm cốt lõi
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm hàm, tham số, câu hỏi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 md:w-64 bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
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
      </div>

      {/* Dossier Cards List */}
      <div className="space-y-4">
        {filteredDossiers.map((dossier: FunctionDossier) => {
          const isExpanded = expandedId === dossier.id;
          return (
            <div
              key={dossier.id}
              className={`bg-slate-900 border transition-all rounded-2xl overflow-hidden ${
                isExpanded
                  ? 'border-emerald-500/50 shadow-xl shadow-emerald-500/5'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : dossier.id)}
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-start md:items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                      dossier.isCore
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {dossier.isCore ? 'CORE' : 'HELPER'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white font-mono">{dossier.name}</h3>
                      <span className="text-xs text-slate-500 font-mono">({dossier.file})</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{dossier.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden lg:block text-right">
                    <span className="text-[11px] font-mono text-emerald-400/80 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/40">
                      {dossier.signature.length > 55
                        ? dossier.signature.slice(0, 52) + '...'
                        : dossier.signature}
                    </span>
                  </div>
                  <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1">
                    {isExpanded ? 'Thu gọn ▲' : 'Xem hồ sơ ▼'}
                  </button>
                </div>
              </div>

              {/* Expanded Detail Body */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-800/80 bg-slate-950/40 space-y-6">
                  {/* Signature Box */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-xs text-emerald-400">
                    <span className="text-slate-500"># Signature:</span> {dossier.signature}
                  </div>

                  {/* Input / Output Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4">
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-blue-400">▶</span> Đầu vào (Inputs)
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{dossier.inputDescription}</p>
                    </div>
                    <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4">
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="text-emerald-400">◀</span> Đầu ra (Outputs)
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{dossier.outputDescription}</p>
                    </div>
                  </div>

                  {/* Step Execution Sequence */}
                  <div className="bg-slate-900/80 border border-slate-800/80 rounded-xl p-4">
                    <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <span className="text-amber-400">⚡</span> Trình tự thực thi từng bước (Step-by-step logic)
                    </h4>
                    <ol className="space-y-2 text-xs text-slate-300">
                      {dossier.stepSequence.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-slate-500 font-mono">{idx + 1}.</span>
                          <span className="leading-relaxed">{step.replace(/^\d+\.\s*/, '')}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Why Chosen & Failure Scenario */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-4">
                      <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span>💡</span> Tại sao nhóm chọn giải pháp này?
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{dossier.whyChosen}</p>
                    </div>
                    <div className="bg-rose-950/20 border border-rose-900/30 rounded-xl p-4">
                      <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span>⚠️</span> Kịch bản lỗi / Nếu không có hàm này:
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{dossier.failureScenario}</p>
                    </div>
                  </div>

                  {/* Teacher Trap & 30s Defense Script */}
                  <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/20 border border-amber-500/30 rounded-xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <span>🎯</span> Câu hỏi chất vấn mở rộng của Giảng viên khi vấn đáp:
                    </div>
                    <p className="text-sm font-semibold text-white italic">
                      "{dossier.teacherTrap}"
                    </p>
                    <div className="pt-2 border-t border-amber-500/20">
                      <div className="text-[11px] font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                        <span>🎤</span> Kịch bản phản xạ bảo vệ (Nói trôi chảy không nhìn code):
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                        {dossier.memoryDefense}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
