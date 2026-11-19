import React, { useState } from 'react';
import { ARCHITECTURE_NODES } from '../../data/systemArchitecture';
import type { ArchitectureNode } from '../../types';
import { Cpu, Clock, Database, Crosshair, Shield, Play, ArrowRight, X, Code } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode>(ARCHITECTURE_NODES[1]); // Default StudentBot
  const [filterLayer, setFilterLayer] = useState<string>('all');

  const getNodeIcon = (id: string) => {
    switch (id) {
      case 'grader':
        return <Play className="w-5 h-5 text-indigo-400" />;
      case 'student_bot':
        return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'time_manager':
        return <Clock className="w-5 h-5 text-amber-400" />;
      case 'searcher':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'transposition_table':
        return <Database className="w-5 h-5 text-purple-400" />;
      case 'evaluation':
        return <Crosshair className="w-5 h-5 text-rose-400" />;
      default:
        return <Cpu className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getNodeBadgeColor = (layer: string): 'indigo' | 'emerald' | 'amber' | 'cyan' | 'purple' | 'rose' => {
    switch (layer) {
      case 'external':
        return 'indigo';
      case 'controller':
        return 'emerald';
      case 'timing':
        return 'amber';
      case 'search':
        return 'cyan';
      case 'memory':
        return 'purple';
      case 'evaluation':
        return 'rose';
      default:
        return 'emerald';
    }
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">
              Sơ Đồ Kiến Trúc Hệ Thống & Luồng Gọi Hàm Tương Tác
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Nhấp vào bất kỳ thành phần nào để xem vai trò, luồng gọi, đoạn code minh họa và điểm cần bảo vệ trước giảng viên
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {['all', 'controller', 'search', 'evaluation', 'timing', 'memory'].map((layer) => (
            <button
              key={layer}
              onClick={() => setFilterLayer(layer)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterLayer === layer
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white'
              }`}
            >
              {layer === 'all' ? 'Tất cả tầng' : layer}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Diagram Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        {/* Left Column: Interactive Node Map */}
        <div className="lg:col-span-7 space-y-4">
          {/* Top Layer: Grader */}
          <div className="flex justify-center">
            {ARCHITECTURE_NODES.filter((n) => n.id === 'grader').map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`w-full max-w-md p-3.5 rounded-xl border text-left transition-all ${
                  selectedNode.id === node.id
                    ? 'border-indigo-400 bg-indigo-950/40 shadow-lg shadow-indigo-950/50 scale-[1.02]'
                    : 'border-slate-700 bg-slate-900/70 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                      {getNodeIcon(node.id)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{node.name}</div>
                      <div className="text-[11px] text-slate-400">{node.file}</div>
                    </div>
                  </div>
                  <Badge variant={getNodeBadgeColor(node.layer)}>Tầng Bên Ngoài</Badge>
                </div>
              </button>
            ))}
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center text-slate-600">
            <div className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-slate-600" />
              <span className="text-[10px] text-slate-400 font-mono px-2 py-0.5 bg-slate-900 rounded border border-slate-700/50 my-0.5">
                choose_move(board, context)
              </span>
              <div className="w-0.5 h-4 bg-slate-600" />
            </div>
          </div>

          {/* Central Controller: StudentBot */}
          <div className="flex justify-center">
            {ARCHITECTURE_NODES.filter((n) => n.id === 'student_bot').map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`w-full max-w-md p-4 rounded-xl border text-left transition-all relative ${
                  selectedNode.id === node.id
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-xl shadow-emerald-950/60 scale-[1.02]'
                    : 'border-emerald-600/50 bg-slate-900/90 hover:border-emerald-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                      {getNodeIcon(node.id)}
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-white flex items-center gap-2">
                        {node.name}
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-normal">
                          Điều phối chính
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono">{node.file}</div>
                    </div>
                  </div>
                  <Badge variant="emerald">Phòng thủ 3 tầng</Badge>
                </div>
                <div className="mt-2 text-[11px] text-slate-300 line-clamp-2">
                  Fast-path 0ms &rarr; Khởi tạo TimeManager &rarr; Searcher có bọc try...except tự phục hồi &rarr; Hậu kiểm hợp lệ.
                </div>
              </button>
            ))}
          </div>

          {/* Connector to Subs */}
          <div className="flex justify-center text-slate-600 my-1">
            <div className="w-full max-w-lg border-t-2 border-slate-700 relative">
              <div className="absolute left-1/4 -top-3 w-0.5 h-3 bg-slate-700" />
              <div className="absolute left-1/2 -top-3 w-0.5 h-3 bg-slate-700" />
              <div className="absolute left-3/4 -top-3 w-0.5 h-3 bg-slate-700" />
            </div>
          </div>

          {/* Submodules Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {ARCHITECTURE_NODES.filter((n) => ['time_manager', 'searcher', 'transposition_table', 'evaluation'].includes(n.id))
              .filter((n) => filterLayer === 'all' || n.layer === filterLayer)
              .map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedNode.id === node.id
                      ? 'border-emerald-400 bg-slate-800 shadow-lg scale-[1.02]'
                      : 'border-slate-700 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                      {getNodeIcon(node.id)}
                    </div>
                    <Badge variant={getNodeBadgeColor(node.layer)} size="sm">
                      {node.layer}
                    </Badge>
                  </div>
                  <div className="text-sm font-bold text-white">{node.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{node.file}</div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                    {node.role}
                  </p>
                </button>
              ))}
          </div>
        </div>

        {/* Right Column: Node Details Inspector */}
        <div className="lg:col-span-5 bg-slate-900/95 border border-slate-700 rounded-xl p-5 shadow-2xl relative">
          <div className="flex items-start justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                {getNodeIcon(selectedNode.id)}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{selectedNode.name}</h3>
                <div className="text-xs text-emerald-400 font-mono">{selectedNode.file}</div>
              </div>
            </div>
            <Badge variant={getNodeBadgeColor(selectedNode.layer)}>{selectedNode.layer}</Badge>
          </div>

          <div className="mt-4 space-y-4 text-xs">
            <div>
              <div className="font-semibold text-slate-300 mb-1">Vai trò trong hệ thống:</div>
              <p className="text-slate-300 leading-relaxed bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                {selectedNode.role}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/30">
                <span className="text-slate-400 block font-sans font-semibold mb-1">Được gọi bởi:</span>
                {selectedNode.callers.map((c, i) => (
                  <div key={i} className="text-amber-400">• {c}</div>
                ))}
              </div>
              <div className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/30">
                <span className="text-slate-400 block font-sans font-semibold mb-1">Sử dụng:</span>
                {selectedNode.callees.map((c, i) => (
                  <div key={i} className="text-cyan-400">• {c}</div>
                ))}
              </div>
            </div>

            <div>
              <div className="font-semibold text-slate-300 mb-1">Các hàm quan trọng:</div>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {selectedNode.keyFunctions.map((fn, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                    {fn}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> Điểm mấu chốt để bảo vệ trước giảng viên:
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-slate-200 leading-relaxed">
                {selectedNode.defensePitch}
              </div>
            </div>

            <div>
              <div className="font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Code className="w-3.5 h-3.5 text-slate-400" /> Mã nguồn minh họa:
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg text-[11px] font-mono text-emerald-300 overflow-x-auto border border-slate-800 leading-relaxed">
                {selectedNode.codeSnippet}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
