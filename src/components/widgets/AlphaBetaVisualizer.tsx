import React, { useState } from 'react';
import { GitBranch, Scissors, Check, RefreshCw } from 'lucide-react';
import { Badge } from '../common/Badge';

export const AlphaBetaVisualizer: React.FC = () => {
  const [pruningEnabled, setPruningEnabled] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Pre-defined sample tree:
  // Root (MAX)
  //   Child A (MIN)
  //     Leaf A1 = 3
  //     Leaf A2 = 5
  //   Child B (MIN)
  //     Leaf B1 = 2 (Causes Beta Cutoff! because root alpha is 3, child B sees 2 <= 3)
  //     Leaf B2 = 9 (PRUNED when alpha-beta active!)
  //   Child C (MIN)
  //     Leaf C1 = 0
  //     Leaf C2 = 7 (PRUNED if first move was already <= alpha)

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">
              Mô Phỏng Trực Quan Cắt Tỉa Alpha-Beta vs Minimax
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            So sánh trực tiếp số lượng nhánh cần duyệt và cơ chế ngắt nhánh (Beta Cutoff)
          </p>
        </div>

        {/* Toggle Mode */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPruningEnabled(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !pruningEnabled
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Minimax Thuần Túy (Duyệt hết)
          </button>
          <button
            onClick={() => setPruningEnabled(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              pruningEnabled
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Alpha-Beta Pruning (Có cắt tỉa)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Tree Visualizer SVG/HTML Canvas */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-xl p-5 border border-slate-700 relative overflow-x-auto">
          <div className="min-w-[480px] flex flex-col items-center space-y-6 py-2">
            {/* Level 0: Root (MAX - Bên Ta) */}
            <div className="flex flex-col items-center">
              <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg border border-emerald-400/50 flex items-center gap-2">
                <span>NÚT GỐC (MAX)</span>
                <span className="font-mono bg-emerald-950/60 px-1.5 py-0.5 rounded text-[11px]">
                  {pruningEnabled ? 'α=3, β=+∞ → Điểm: 3' : 'Điểm: 3'}
                </span>
              </div>
            </div>

            {/* Connecting Lines L0 -> L1 */}
            <div className="w-full flex justify-around px-8 text-slate-600 text-[10px] font-mono">
              <span className="text-emerald-400 font-bold">Nước A</span>
              <span className={pruningEnabled ? 'text-rose-400 font-bold' : 'text-slate-400'}>Nước B</span>
              <span className={pruningEnabled ? 'text-rose-400 font-bold' : 'text-slate-400'}>Nước C</span>
            </div>

            {/* Level 1: Min Nodes (Đối thủ) */}
            <div className="w-full grid grid-cols-3 gap-4">
              {/* Branch A */}
              <div className="flex flex-col items-center p-3 rounded-xl bg-slate-800 border border-emerald-500/40">
                <div className="text-xs font-bold text-slate-200">Nhánh A (MIN)</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5">min(3, 5) = 3</div>
                <div className="grid grid-cols-2 gap-2 mt-3 w-full">
                  <div className="bg-slate-900 p-2 rounded text-center border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">Lá A1</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">3</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded text-center border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">Lá A2</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">5</span>
                  </div>
                </div>
              </div>

              {/* Branch B */}
              <div className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                pruningEnabled
                  ? 'bg-rose-950/20 border-rose-500/50'
                  : 'bg-slate-800 border-slate-700'
              }`}>
                <div className="text-xs font-bold text-slate-200">Nhánh B (MIN)</div>
                <div className="text-[10px] font-mono mt-0.5 text-rose-400">
                  {pruningEnabled ? 'Beta Cutoff! (2 <= α=3)' : 'min(2, 9) = 2'}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 w-full">
                  <div className="bg-slate-900 p-2 rounded text-center border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">Lá B1</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">2</span>
                  </div>
                  {pruningEnabled ? (
                    <div className="bg-rose-950/40 p-2 rounded text-center border border-dashed border-rose-500/60 flex flex-col items-center justify-center">
                      <Scissors className="w-3.5 h-3.5 text-rose-400 mb-0.5" />
                      <span className="text-[9px] text-rose-300 font-bold uppercase">BỊ CẮT TỈA</span>
                      <span className="text-[8px] text-slate-500 line-through">Lá B2 (9)</span>
                    </div>
                  ) : (
                    <div className="bg-slate-900 p-2 rounded text-center border border-slate-700">
                      <span className="text-[10px] text-slate-400 block">Lá B2</span>
                      <span className="text-sm font-bold text-slate-300 font-mono">9</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Branch C */}
              <div className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                pruningEnabled
                  ? 'bg-rose-950/20 border-rose-500/50'
                  : 'bg-slate-800 border-slate-700'
              }`}>
                <div className="text-xs font-bold text-slate-200">Nhánh C (MIN)</div>
                <div className="text-[10px] font-mono mt-0.5 text-rose-400">
                  {pruningEnabled ? 'Beta Cutoff! (0 <= α=3)' : 'min(0, 7) = 0'}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 w-full">
                  <div className="bg-slate-900 p-2 rounded text-center border border-slate-700">
                    <span className="text-[10px] text-slate-400 block">Lá C1</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">0</span>
                  </div>
                  {pruningEnabled ? (
                    <div className="bg-rose-950/40 p-2 rounded text-center border border-dashed border-rose-500/60 flex flex-col items-center justify-center">
                      <Scissors className="w-3.5 h-3.5 text-rose-400 mb-0.5" />
                      <span className="text-[9px] text-rose-300 font-bold uppercase">BỊ CẮT TỈA</span>
                      <span className="text-[8px] text-slate-500 line-through">Lá C2 (7)</span>
                    </div>
                  ) : (
                    <div className="bg-slate-900 p-2 rounded text-center border border-slate-700">
                      <span className="text-[10px] text-slate-400 block">Lá C2</span>
                      <span className="text-sm font-bold text-slate-300 font-mono">7</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Explanation Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-700 space-y-3">
            <div className="text-xs font-bold text-white flex items-center justify-between">
              <span>Thống kê số nút duyệt:</span>
              <Badge variant={pruningEnabled ? 'emerald' : 'amber'}>
                {pruningEnabled ? 'Tiết kiệm 33.3% số nút' : 'Duyệt 100% vét cạn'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                <span className="text-[11px] text-slate-400 block">Số lá cần tính:</span>
                <span className="text-2xl font-black text-white font-mono mt-1">
                  {pruningEnabled ? '4 lá' : '6 lá'}
                </span>
              </div>
              <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                <span className="text-[11px] text-slate-400 block">Nhánh bị cắt:</span>
                <span className="text-2xl font-black text-rose-400 font-mono mt-1">
                  {pruningEnabled ? '2 nhánh' : '0 nhánh'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/40">
              {pruningEnabled ? (
                <>
                  Tại <strong>Nhánh B</strong>, sau khi duyệt lá B1 = 2, đối thủ đã có thể ép điểm xuống mức 2. Vì bên ta đã có lựa chọn A = 3 (ngưỡng α = 3), ta chắc chắn không bao giờ chọn đi vào B. Do đó lá B2 (dù có điểm bằng 9 cực lớn) cũng hoàn toàn vô nghĩa và bị cắt tỉa ngay!
                </>
              ) : (
                <>
                  Minimax thuần túy không biết về ngưỡng α = 3, buộc phải tốn công tính toán toàn bộ các lá B2 và C2 dù kết quả cuối cùng vẫn chọn Nhánh A.
                </>
              )}
            </p>
          </div>

          <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Ý nghĩa thực tiễn:</span> Trên cây cờ vua thực tế với b ≈ 35 và d = 6, Alpha-Beta giúp bot chỉ phải duyệt khoảng <strong>40,000 nút</strong> thay vì <strong>1,800,000,000 nút</strong> của Minimax!
          </div>
        </div>
      </div>
    </div>
  );
};
