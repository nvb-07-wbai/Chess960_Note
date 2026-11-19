import React, { useState } from 'react';
import { Clock, AlertTriangle, ShieldCheck, Zap, Gauge } from 'lucide-react';
import { Badge } from '../common/Badge';

export const TimeCalculator: React.FC = () => {
  const [initialTimeMs, setInitialTimeMs] = useState<number>(45000); // 45s blitz default
  const [timeRemainingMs, setTimeRemainingMs] = useState<number>(38000);
  const [ply, setPly] = useState<number>(14);
  const [lastIterationMs, setLastIterationMs] = useState<number>(45);
  const [elapsedCurrentDepthMs, setElapsedCurrentDepthMs] = useState<number>(30);

  // Exact Team 12 formula calculation:
  const safeRemaining = Math.max(0, timeRemainingMs - 50);
  const isBlitz = initialTimeMs <= 60000;
  const movesPlayed = Math.floor(ply / 2);

  let softMs = 0;
  let hardMs = 0;
  let phaseName = '';
  let phaseDescription = '';
  let badgeVariant: 'emerald' | 'cyan' | 'amber' | 'rose' | 'indigo' = 'emerald';

  if (isBlitz) {
    if (safeRemaining <= 1500) {
      softMs = 8;
      hardMs = 15;
      phaseName = '1. Cực hạn sinh tồn (Panic Extreme)';
      phaseDescription = 'Dưới 1.5s còn lại. Tìm kiếm 8ms/15ms ở depth 1-2 để triệt tiêu 100% nguy cơ rụng cờ.';
      badgeVariant = 'rose';
    } else if (safeRemaining <= 3500) {
      softMs = 15;
      hardMs = 25;
      phaseName = '2. Chế độ khẩn cấp (Emergency Mode)';
      phaseDescription = 'Dưới 3.5s còn lại. Rút ngắn thời gian để giữ đồng hồ sinh tồn.';
      badgeVariant = 'rose';
    } else if (movesPlayed >= 55) {
      softMs = 25;
      hardMs = 40;
      phaseName = '3. Tàn cuộc siêu dài (Marathon Endgame)';
      phaseDescription = 'Sau nước 55 (ply >= 110). Duy trì ngân sách 25ms-40ms để hoàn tất Depth 3 trong các ván cờ cực dài.';
      badgeVariant = 'amber';
    } else if (movesPlayed >= 40 || safeRemaining <= 10000) {
      softMs = 35;
      hardMs = 55;
      phaseName = '4. Tàn cuộc sâu (Deep Endgame)';
      phaseDescription = 'Sau nước 40 hoặc đồng hồ <= 10s. Với 90k NPS, duyệt 3,500-5,000 nodes, hoàn tất Depth 3-4, được hấp thụ bởi trễ sàn 500ms.';
      badgeVariant = 'cyan';
    } else if (movesPlayed >= 32 || safeRemaining <= 18000) {
      softMs = 60;
      hardMs = 90;
      phaseName = '5. Giai đoạn chuyển tiếp (Transition)';
      phaseDescription = 'Nước 32-39 hoặc thời gian <= 18s. Bước đệm cân bằng giữa trung cuộc và cờ tàn.';
      badgeVariant = 'indigo';
    } else {
      softMs = 150;
      hardMs = 220;
      phaseName = '6. Khai cuộc & Trung cuộc (Opening & Midgame)';
      phaseDescription = 'Nước 1-31. Ngân sách 150ms-220ms được "hấp thụ" hoàn toàn bởi độ trễ tối thiểu 500ms của GameController!';
      badgeVariant = 'emerald';
    }
  } else {
    // Standard mode (180s - 360s)
    const safePly = Math.max(0, ply);
    const movesLeft = Math.max(1, Math.floor((301 - safePly) / 2));
    const usableMs = Math.max(0, timeRemainingMs - 1000);

    if (usableMs <= 3000) {
      softMs = 15;
      hardMs = 25;
      phaseName = 'Standard: Khẩn cấp cực hạn (<= 3s)';
      phaseDescription = 'Thời gian khả dụng dưới 3s. Tìm kiếm nhanh để bảo toàn đồng hồ.';
      badgeVariant = 'rose';
    } else if (usableMs <= 10000) {
      softMs = 50;
      hardMs = 100;
      phaseName = 'Standard: Khẩn cấp trung bình (<= 10s)';
      phaseDescription = 'Ngân sách 50ms - 100ms, ưu tiên hoàn thành Depth 4.';
      badgeVariant = 'amber';
    } else if (usableMs <= 25000) {
      softMs = 120;
      hardMs = 200;
      phaseName = 'Standard: Chuyển tiếp (<= 25s)';
      phaseDescription = 'Ngân sách 120ms - 200ms, duy trì độ sâu 5-6 ply.';
      badgeVariant = 'cyan';
    } else {
      const perMove = Math.floor(usableMs / (movesLeft + 10));
      hardMs = Math.min(perMove, Math.floor(timeRemainingMs * 0.15));
      hardMs = Math.max(hardMs, Math.min(1500, usableMs));
      softMs = Math.floor(hardMs * 0.7);
      phaseName = 'Standard: Thi đấu bình thường';
      phaseDescription = `Phân bổ đều cho ${movesLeft} nước còn lại (+10 nước đệm), tối đa 15% quỹ thời gian.`;
      badgeVariant = 'emerald';
    }
  }

  // Branching prediction:
  const predictedNextDepthMs = Math.floor(lastIterationMs * 2.2);
  const exceedsSoft = elapsedCurrentDepthMs >= softMs;
  const exceedsPredictedHard = elapsedCurrentDepthMs + predictedNextDepthMs >= hardMs;
  const canStartNextDepth = !exceedsSoft && !exceedsPredictedHard;

  // Delay absorption calculation:
  // Server delay is at least 500ms
  const serverDelayMs = 500;
  const absorbedByServer = Math.min(hardMs, serverDelayMs);
  const freeCpuPercent = Math.min(100, Math.round((absorbedByServer / serverDelayMs) * 100));

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">
              Máy Tính Ngân Sách Thời Gian Thích Ứng (Time Manager)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Mô phỏng công thức toán học thực tế từ <code className="text-emerald-400">student/time_manager.py</code> của Nhóm 12
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setInitialTimeMs(45000);
              setTimeRemainingMs(38000);
              setPly(14);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isBlitz
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Blitz (45s)
          </button>
          <button
            onClick={() => {
              setInitialTimeMs(180000);
              setTimeRemainingMs(150000);
              setPly(24);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !isBlitz
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Standard (180s)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Controls Column */}
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
              <span>Thời gian còn lại trên đồng hồ</span>
              <span className="text-emerald-400 font-mono font-bold">
                {(timeRemainingMs / 1000).toFixed(1)}s ({timeRemainingMs.toLocaleString()} ms)
              </span>
            </div>
            <input
              type="range"
              min="500"
              max={initialTimeMs}
              step="500"
              value={timeRemainingMs}
              onChange={(e) => setTimeRemainingMs(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0.5s (Cực hạn)</span>
              <span>{(initialTimeMs / 2000).toFixed(0)}s</span>
              <span>{(initialTimeMs / 1000).toFixed(0)}s (Ban đầu)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
              <span>Số nửa nước đi đã chơi (Ply)</span>
              <span className="text-emerald-400 font-mono font-bold">
                {ply} ply (Nước thứ {movesPlayed})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="2"
              value={ply}
              onChange={(e) => setPly(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>0 ply (Khai cuộc)</span>
              <span>80 ply (Nước 40)</span>
              <span>110 ply (Nước 55)</span>
              <span>200 ply (Tàn cuộc sâu)</span>
            </div>
          </div>

          {/* Branching Prediction Inputs */}
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Dự đoán tăng trưởng thời gian tầng kế tiếp (Branching x2.2)</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
                  Thời gian tầng trước (ms):
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={lastIterationMs}
                  onChange={(e) => setLastIterationMs(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">
                  Đã tiêu ở tầng này (ms):
                </label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={elapsedCurrentDepthMs}
                  onChange={(e) => setElapsedCurrentDepthMs(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-700/90 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Giai đoạn nhận diện:</span>
              <Badge variant={badgeVariant}>{isBlitz ? 'Blitz Mode' : 'Standard Mode'}</Badge>
            </div>
            <div className="text-sm font-bold text-white">{phaseName}</div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/40">
              {phaseDescription}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3">
                <div className="text-[11px] text-emerald-400 font-medium">Giới hạn mềm (Soft Limit)</div>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  {softMs} <span className="text-xs font-normal text-slate-400">ms</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Ngưỡng quyết định có mở tầng mới hay dừng
                </div>
              </div>

              <div className="bg-rose-950/40 border border-rose-500/30 rounded-xl p-3">
                <div className="text-[11px] text-rose-400 font-medium">Giới hạn cứng (Hard Limit)</div>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  {hardMs} <span className="text-xs font-normal text-slate-400">ms</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Ngắt khẩn cấp ngay nếu vượt quá hạn chót
                </div>
              </div>
            </div>
          </div>

          {/* Decision Simulation */}
          <div className="p-4 bg-slate-900/70 rounded-xl border border-slate-700/70">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-cyan-400" />
                Hàm can_start_next_depth() kết luận:
              </span>
              {canStartNextDepth ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> CHO PHÉP MỞ TẦNG
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" /> DỪNG TÌM KIẾM
                </span>
              )}
            </div>

            <div className="text-[11px] text-slate-400 space-y-1 font-mono">
              <div>
                • Thời gian ước tính tầng sau: {lastIterationMs}ms × 2.2 ={' '}
                <span className="text-amber-400 font-bold">{predictedNextDepthMs}ms</span>
              </div>
              <div>
                • Tổng thời gian dự kiến: {elapsedCurrentDepthMs}ms + {predictedNextDepthMs}ms ={' '}
                <span className={elapsedCurrentDepthMs + predictedNextDepthMs >= hardMs ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                  {elapsedCurrentDepthMs + predictedNextDepthMs}ms
                </span>{' '}
                (Hard limit: {hardMs}ms)
              </div>
              {exceedsSoft && (
                <div className="text-rose-400">
                  ⚠️ Đã vượt Soft limit ({elapsedCurrentDepthMs}ms &gt;= {softMs}ms)
                </div>
              )}
              {exceedsPredictedHard && (
                <div className="text-rose-400">
                  ⚠️ Dự kiến sẽ vượt Hard limit ({elapsedCurrentDepthMs + predictedNextDepthMs}ms &gt;= {hardMs}ms)
                </div>
              )}
            </div>
          </div>

          {/* Delay Absorption Gauge */}
          <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-300 font-medium">Tỷ lệ hấp thụ độ trễ sàn 500ms của máy chủ:</span>
              <span className="text-emerald-400 font-mono font-bold">{freeCpuPercent}%</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-300"
                style={{ width: `${freeCpuPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Ngân sách {hardMs}ms được độ trễ sàn {serverDelayMs}ms bảo trợ hoàn toàn, không tiêu hao thời gian thực.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
