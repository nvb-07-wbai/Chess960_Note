import React, { useState, useRef, useEffect } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { CODE_MODULES } from '../../data/codeModules';
import type { CodeAnnotation, CodeModule, TabType } from '../../types';
import {
  Code,
  FileCode,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Shield,
  Layers,
  HelpCircle,
  Copy,
  Check,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface CodeExplorerSectionProps {
  initialFile?: 'bot.py' | 'search.py' | 'evaluation.py' | 'time_manager.py';
  highlightAnnotationId?: string;
  onNavigate: (tab: TabType, targetId?: string) => void;
}

export const CodeExplorerSection: React.FC<CodeExplorerSectionProps> = ({
  initialFile = 'bot.py',
  highlightAnnotationId,
  onNavigate,
}) => {
  const [selectedFile, setSelectedFile] = useState<'bot.py' | 'search.py' | 'evaluation.py' | 'time_manager.py'>(
    initialFile
  );
  const [expandedAnnotations, setExpandedAnnotations] = useState<Record<string, boolean>>({});
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(highlightAnnotationId || null);
  const [copied, setCopied] = useState<boolean>(false);

  const codeContainerRef = useRef<HTMLDivElement>(null);
  const currentModule: CodeModule = CODE_MODULES[selectedFile];

  useEffect(() => {
    if (initialFile) {
      setSelectedFile(initialFile);
    }
  }, [initialFile]);

  useEffect(() => {
    if (highlightAnnotationId) {
      setActiveAnnotationId(highlightAnnotationId);
      setExpandedAnnotations((prev) => ({ ...prev, [highlightAnnotationId]: true }));
    }
  }, [highlightAnnotationId]);

  // Expand all / collapse all
  const toggleAll = (expand: boolean) => {
    const updated: Record<string, boolean> = {};
    currentModule.annotations.forEach((ann) => {
      updated[ann.id] = expand;
    });
    setExpandedAnnotations(updated);
  };

  const toggleAnnotation = (id: string) => {
    setExpandedAnnotations((prev) => ({ ...prev, [id]: !prev[id] }));
    setActiveAnnotationId(id);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentModule.rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rawLines = currentModule.rawCode.split('\n');

  // Syntax highlighting helper
  const highlightSyntax = (line: string) => {
    if (line.trim().startsWith('#') || line.trim().startsWith('"""') || line.trim().startsWith("'''")) {
      return <span className="code-comment">{line}</span>;
    }
    // Simple fast syntax highlighting
    const parts = line.split(/(\b(?:def|class|return|if|else|elif|import|from|while|for|in|break|continue|try|except|finally|None|True|False|self|int|float|str|bool)\b|"[^"]*"|'[^']*'|#[^\n]*)/g);
    return (
      <>
        {parts.map((p, i) => {
          if (/^(def|class|return|if|else|elif|import|from|while|for|in|break|continue|try|except|finally)$/.test(p)) {
            return <span key={i} className="code-keyword">{p}</span>;
          }
          if (/^(None|True|False|self)$/.test(p)) {
            return <span key={i} className="code-fn">{p}</span>;
          }
          if (/^(int|float|str|bool)$/.test(p)) {
            return <span key={i} className="code-type">{p}</span>;
          }
          if (/^(".*"|'.*')$/.test(p)) {
            return <span key={i} className="code-str">{p}</span>;
          }
          if (p.startsWith('#')) {
            return <span key={i} className="code-comment">{p}</span>;
          }
          return <span key={i}>{p}</span>;
        })}
      </>
    );
  };

  const activeAnn = currentModule.annotations.find((a) => a.id === activeAnnotationId);

  return (
    <div className="space-y-6 animate-fadeIn">
      <SectionHeader
        badge="Sổ Tay Mã Nguồn"
        badgeVariant="emerald"
        title="Code Explorer – Giải Thích Từng Khối Lệnh Thực Tế"
        description="Mã nguồn nguyên bản 100% từ thư mục student/ của Nhóm 12. Mỗi khối lệnh được giải thích cặn kẽ mục đích, tham số đầu vào, kết quả trả về, vai trò hệ thống và các câu hỏi vấn đáp mà giảng viên có thể hỏi sâu."
      />

      {/* Module Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-800/80 rounded-2xl border border-slate-700/80">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['bot.py', 'search.py', 'evaluation.py', 'time_manager.py'] as const).map((file) => {
            const isSelected = selectedFile === file;
            const mod = CODE_MODULES[file];
            return (
              <button
                key={file}
                onClick={() => {
                  setSelectedFile(file);
                  setActiveAnnotationId(null);
                  setExpandedAnnotations({});
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <FileCode className="w-4 h-4 shrink-0" />
                <span>{file}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isSelected ? 'bg-emerald-950/80 text-emerald-200' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {mod.linesCount} dòng
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 px-2">
          <button
            onClick={() => toggleAll(true)}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 transition"
          >
            Mở tất cả
          </button>
          <button
            onClick={() => toggleAll(false)}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900/60 hover:bg-slate-900 border border-slate-700/60 transition"
          >
            Thu gọn tất cả
          </button>
          <button
            onClick={handleCopyCode}
            className="text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-1"
            title="Sao chép toàn bộ mã nguồn"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã chép' : 'Sao chép file'}</span>
          </button>
        </div>
      </div>

      {/* Module Summary Header */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <div className="font-bold text-white text-sm flex items-center gap-2">
            <span>{currentModule.name}</span>
            <span className="text-slate-400 font-mono font-normal">({currentModule.fileName})</span>
            <Badge variant="cyan">{currentModule.author}</Badge>
          </div>
          <p className="text-slate-300 mt-1 leading-relaxed max-w-4xl">
            {currentModule.summary}
          </p>
        </div>
        <div className="flex sm:flex-col items-end gap-1 shrink-0 font-mono text-[11px] text-slate-400">
          <div>Lớp: {currentModule.keyClasses.join(', ')}</div>
          <div>Hàm lõi: {currentModule.coreFunctions.slice(0, 3).join(', ')}...</div>
        </div>
      </div>

      {/* Two-Column Code & Explanation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code View (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[850px]">
          <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="ml-2 font-bold text-slate-300">{currentModule.fileName}</span>
            </div>
            <div className="text-[11px] text-slate-500">
              {rawLines.length} dòng lệnh Python
            </div>
          </div>

          <div
            ref={codeContainerRef}
            className="overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed space-y-0.5 select-text"
          >
            {rawLines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted =
                activeAnn && lineNum >= activeAnn.startLine && lineNum <= activeAnn.endLine;

              return (
                <div
                  key={lineNum}
                  id={`line-${lineNum}`}
                  className={`flex items-start transition-colors px-1 rounded ${
                    isHighlighted
                      ? 'bg-emerald-950/50 text-white font-medium border-l-2 border-emerald-400'
                      : 'hover:bg-slate-900/60'
                  }`}
                >
                  <span className="w-10 shrink-0 text-slate-600 text-right pr-3 select-none text-[11px]">
                    {lineNum}
                  </span>
                  <span className="whitespace-pre flex-1 overflow-x-visible">
                    {highlightSyntax(line)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Explanations List (5 cols) */}
        <div className="lg:col-span-5 space-y-4 max-h-[850px] overflow-y-auto pr-1">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Danh mục giải thích ({currentModule.annotations.length} khối)</span>
            <span className="text-[10px] text-slate-500 font-normal">Nhấp để xem chi tiết</span>
          </div>

          {currentModule.annotations.map((ann) => {
            const isExpanded = expandedAnnotations[ann.id] ?? false;
            const isActive = activeAnnotationId === ann.id;

            return (
              <div
                key={ann.id}
                id={`ann-${ann.id}`}
                className={`rounded-xl border transition-all ${
                  isActive
                    ? 'border-emerald-500 bg-slate-900/90 shadow-lg shadow-emerald-950/40'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAnnotation(ann.id)}
                  className="w-full text-left p-3.5 flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Dòng {ann.startLine} – {ann.endLine}
                      </span>
                      {ann.relatedFunctions && (
                        <span className="text-[10px] font-mono text-slate-400">
                          {ann.relatedFunctions[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white leading-snug">{ann.title}</h3>
                  </div>

                  <div className="p-1 text-slate-400 hover:text-white">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-3.5 text-xs">
                    {/* Purpose */}
                    <div>
                      <div className="font-bold text-slate-300 mb-1">Mục đích:</div>
                      <p className="text-slate-300 leading-relaxed bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40">
                        {ann.purpose}
                      </p>
                    </div>

                    {/* Line by line explanation */}
                    <div>
                      <div className="font-bold text-slate-300 mb-1.5">Phân tích từng câu lệnh:</div>
                      <ul className="space-y-1.5 text-slate-300">
                        {ann.explanation.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-emerald-400 shrink-0 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Inputs and Outputs */}
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                      <div className="bg-slate-800/40 p-2 rounded border border-slate-700/30">
                        <span className="text-slate-400 block font-sans font-semibold mb-0.5">Đầu vào:</span>
                        <span className="text-amber-300">{ann.inputs}</span>
                      </div>
                      <div className="bg-slate-800/40 p-2 rounded border border-slate-700/30">
                        <span className="text-slate-400 block font-sans font-semibold mb-0.5">Đầu ra:</span>
                        <span className="text-cyan-300">{ann.outputs}</span>
                      </div>
                    </div>

                    {/* Role in system */}
                    <div>
                      <div className="font-bold text-slate-300 mb-1">Vai trò trong hệ thống:</div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {ann.systemRole}
                      </p>
                    </div>

                    {/* Defense Points */}
                    <div>
                      <div className="font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5" /> Điểm mấu chốt để bảo vệ trước giảng viên:
                      </div>
                      <div className="space-y-2">
                        {ann.defensePoints.map((dp, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-slate-200 leading-relaxed text-[11px]"
                          >
                            {dp}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
