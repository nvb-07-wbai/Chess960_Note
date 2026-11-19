import React, { useState } from 'react';
import { Database, Hash, Check, RefreshCw, KeyRound, ShieldAlert } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TranspositionTableDemo: React.FC = () => {
  const [mateScore, setMateScore] = useState<number>(29995);
  const [storePly, setStorePly] = useState<number>(3);
  const [retrievePly, setRetrievePly] = useState<number>(7);

  // Mate normalization formulas from search.py:
  // score_to_tt(score, ply): if score >= 29000 return score + ply
  const normalizedStoredScore = mateScore >= 29000 ? mateScore + storePly : mateScore <= -29000 ? mateScore - storePly : mateScore;

  // score_from_tt(score, ply): if score >= 29000 return score - ply
  const reconstructedScore = normalizedStoredScore >= 29000 ? normalizedStoredScore - retrievePly : normalizedStoredScore <= -29000 ? normalizedStoredScore + retrievePly : normalizedStoredScore;

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">
              Cơ Chế Bảng Chuyển Vị (Transposition Table) & Chuẩn Hóa Điểm Chiếu Hết
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Bảng băm 524,288 mục, Zobrist Hash O(1) và thuật toán <code className="text-purple-400">score_to_tt</code> / <code className="text-purple-400">score_from_tt</code>
          </p>
        </div>
        <Badge variant="purple">2^19 = 524,288 Mục</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Left: 3 Bound Types & Replacement Rules */}
        <div className="space-y-4">
          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700 space-y-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              Ba Loại Cận (Bound Flags) trong Transposition Table:
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-2.5">
                <span className="font-mono px-1.5 py-0.5 rounded bg-emerald-500 text-slate-950 font-bold text-[10px]">
                  TT_EXACT = 0
                </span>
                <div>
                  <div className="font-bold text-white">Điểm chính xác (PV-Node)</div>
                  <div className="text-[11px] text-slate-300">
                    Điểm số nằm trọn vẹn trong khoảng (alpha &lt; score &lt; beta). Được sử dụng trực tiếp vô điều kiện.
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-2.5">
                <span className="font-mono px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[10px]">
                  TT_LOWER = 1
                </span>
                <div>
                  <div className="font-bold text-white">Cận dưới (Cut-Node / Fail-High)</div>
                  <div className="text-[11px] text-slate-300">
                    Nước đi quá mạnh (score &gt;= beta). Chỉ được sử dụng lại khi điểm số lưu trữ &gt;= beta hiện tại.
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5">
                <span className="font-mono px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px]">
                  TT_UPPER = 2
                </span>
                <div>
                  <div className="font-bold text-white">Cận trên (All-Node / Fail-Low)</div>
                  <div className="text-[11px] text-slate-300">
                    Mọi nước đi đều yếu (score &lt;= alpha). Chỉ được sử dụng lại khi điểm số lưu trữ &lt;= alpha hiện tại.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-700/60 text-xs text-slate-300">
            <div className="font-bold text-white mb-1.5">Chính sách thay thế 4 điều kiện:</div>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-400 font-mono">
              <li>Ô băm còn trống (existing is None)</li>
              <li>Trùng khóa băm (existing.key == key) &rarr; cập nhật thông tin</li>
              <li>Mục cũ thuộc thế hệ nước đi trước (existing.age != age)</li>
              <li>Lượt tìm kiếm mới sâu hơn hoặc bằng (depth &gt;= existing.depth)</li>
            </ol>
          </div>
        </div>

        {/* Right: Interactive Mate Normalization Calculator */}
        <div className="bg-slate-900/90 rounded-xl p-5 border border-purple-500/40 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-purple-400" />
              Mô phỏng Chuẩn hóa Điểm Chiếu Hết (Mate Normalization)
            </h3>
            <Badge variant="purple">score_to_tt & score_from_tt</Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">
                Điểm chiếu hết tìm thấy tại nút hiện tại (centipawns):
              </label>
              <input
                type="number"
                value={mateScore}
                onChange={(e) => setMateScore(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-1.5 text-white font-mono font-bold"
              />
              <span className="text-[10px] text-slate-500">
                (30,000 là chiếu hết ngay; 29,995 tương đương chiếu hết sau 5 ply nữa)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Ply lúc tìm thấy (store ply):</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={storePly}
                  onChange={(e) => setStorePly(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Ply lúc tra cứu lại (probe ply):</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={retrievePly}
                  onChange={(e) => setRetrievePly(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-purple-500/30 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">1. Lưu vào TT qua score_to_tt():</span>
                <span className="text-purple-400 font-bold">
                  {normalizedStoredScore.toLocaleString()}
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Công thức: {mateScore} + {storePly} = {normalizedStoredScore} (Điểm độc lập với vị trí cây)
              </div>

              <div className="border-t border-slate-800 pt-2 flex justify-between items-center">
                <span className="text-slate-400">2. Lấy ra tại ply={retrievePly} qua score_from_tt():</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {reconstructedScore.toLocaleString()}
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Công thức: {normalizedStoredScore} - {retrievePly} = {reconstructedScore} (Tái tạo đúng số nước chiếu hết từ gốc mới)
              </div>
            </div>

            <div className="p-3 bg-purple-950/30 border border-purple-500/20 rounded-lg text-[11px] text-purple-200 leading-relaxed">
              <strong>Tại sao bắt buộc?</strong> Nếu không chuẩn hóa, một đòn chiếu hết ở ply 3 (còn 2 nước) khi được lấy ra ở một nhánh khác tại ply 7 sẽ bị bot hiểu nhầm là vẫn còn 5 nước nữa mới chiếu hết, dẫn đến việc chọn sai chuỗi nước đi ngắn nhất!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
