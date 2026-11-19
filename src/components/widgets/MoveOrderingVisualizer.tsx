import React, { useState } from 'react';
import { ArrowUpDown, Award, CheckCircle2, Shuffle, AlertCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

interface SampleMove {
  id: string;
  san: string;
  uci: string;
  type: string;
  tier: number;
  score: number;
  reason: string;
}

const INITIAL_MOVES: SampleMove[] = [
  {
    id: 'm1',
    san: 'Qxd4',
    uci: 'd8d4',
    type: 'Bắt quân bất lợi (Bad SEE)',
    tier: 7,
    score: 50000 - 680,
    reason: 'Hậu ăn Tốt có bảo vệ: SEE < 0 (lỗ 680 cp). Bị đẩy xuống cuối nhóm bắt quân.',
  },
  {
    id: 'm2',
    san: 'Nf3',
    uci: 'g1f3',
    type: 'TT Move (Hash Move)',
    tier: 1,
    score: 10000000,
    reason: 'Nước đi tốt nhất tìm được từ độ sâu trước lưu trong Transposition Table. Ưu tiên số 1!',
  },
  {
    id: 'm3',
    san: 'exd8=Q',
    uci: 'e7d8q',
    type: 'Phong cấp Hậu',
    tier: 2,
    score: 1200000,
    reason: 'Tốt phong cấp thành Hậu, tạo ưu thế vật chất chí mạng.',
  },
  {
    id: 'm4',
    san: 'Qd2',
    uci: 'd1d2',
    type: 'Chạy thoát quân to bị dọa',
    tier: 2,
    score: 1100000,
    reason: 'Hậu đang bị Mã đối phương tấn công, rút lui sang ô an toàn (Tầng 2b).',
  },
  {
    id: 'm5',
    san: 'Bxf7+',
    uci: 'c4f7',
    type: 'Chiếu an toàn (Safe Check)',
    tier: 5,
    score: 650000,
    reason: 'Tượng chiếu Vua sang ô không bị đối phương kiểm soát trực diện.',
  },
  {
    id: 'm6',
    san: 'Bxe5',
    uci: 'c3e5',
    type: 'Bắt quân có lợi (Good SEE + MVV-LVA)',
    tier: 3,
    score: 1000000 + 1900 + 20,
    reason: 'Tượng ăn Mã được tính SEE >= 0 kèm điểm MVV-LVA cao.',
  },
  {
    id: 'm7',
    san: 'c4',
    uci: 'c2c4',
    type: 'Killer Move 1',
    tier: 4,
    score: 900000,
    reason: 'Nước đi yên lặng từng gây Beta Cutoff ở cùng ply trong một nhánh trước.',
  },
  {
    id: 'm8',
    san: 'a3',
    uci: 'a2a3',
    type: 'Nước yên lặng (History)',
    tier: 8,
    score: 34200,
    reason: 'Nước đi yên lặng bình thường, điểm số lấy từ bảng History Heuristic.',
  },
];

export const MoveOrderingVisualizer: React.FC = () => {
  const [moves, setMoves] = useState<SampleMove[]>(INITIAL_MOVES);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const handleSort = () => {
    const sorted = [...moves].sort((a, b) => b.score - a.score);
    setMoves(sorted);
    setIsSorted(true);
  };

  const handleShuffle = () => {
    const shuffled = [...moves].sort(() => Math.random() - 0.5);
    setMoves(shuffled);
    setIsSorted(false);
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">
              Mô Phỏng Phân Tầng Sắp Xếp Nước Đi (_order_moves)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Hệ thống 7 tầng chấm điểm heuristic từ <code className="text-emerald-400">student/search.py</code> giúp tỷ lệ cắt tỉa Beta đạt &gt; 85%
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-700 text-slate-300 hover:bg-slate-600 transition flex items-center gap-1.5"
          >
            <Shuffle className="w-3.5 h-3.5" /> Xáo trộn ngẫu nhiên
          </button>
          <button
            onClick={handleSort}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md transition flex items-center gap-1.5 font-bold"
          >
            <Award className="w-3.5 h-3.5" /> Sắp xếp theo _order_moves
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {moves.map((m, index) => {
          let tierBadgeVariant: 'purple' | 'emerald' | 'cyan' | 'amber' | 'slate' | 'rose' = 'slate';
          if (m.score >= 10000000) tierBadgeVariant = 'purple';
          else if (m.score >= 1000000) tierBadgeVariant = 'emerald';
          else if (m.score >= 800000) tierBadgeVariant = 'cyan';
          else if (m.score >= 600000) tierBadgeVariant = 'amber';
          else if (m.score < 100000) tierBadgeVariant = 'slate';

          return (
            <div
              key={m.id}
              className={`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isSorted && index === 0
                  ? 'bg-purple-950/30 border-purple-500/60 shadow-lg scale-[1.01]'
                  : 'bg-slate-900/70 border-slate-700/60 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  {index + 1}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-extrabold text-white font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {m.san}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">({m.uci})</span>
                </div>
                <Badge variant={tierBadgeVariant} size="sm">
                  {m.type}
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs">
                <p className="text-slate-300 max-w-md text-[11px] leading-relaxed">
                  {m.reason}
                </p>
                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    {m.score.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">pts</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 p-3.5 bg-slate-900/90 rounded-xl border border-slate-700/80 flex items-start gap-3 text-xs text-slate-300">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Tại sao thứ tự này tối ưu?</strong> Nước <code className="text-purple-400 font-bold">Nf3</code> (TT Move) được duyệt đầu tiên vì đây là nước tốt nhất đã chứng minh ở tầng trước. Nếu nước này gây Beta Cutoff ngay lập tức, bot chỉ tốn đúng <strong>1 phép tính</strong> và bỏ qua toàn bộ 7 nước đi còn lại!
        </p>
      </div>
    </div>
  );
};
