import React, { useState } from 'react';
import { Shield, Sparkles, Layers } from 'lucide-react';
import { Badge } from '../common/Badge';

// PeSTO raw tables from student/evaluation.py
const PAWN_MG = [
    0,   0,   0,   0,   0,   0,   0,   0,
   98, 134,  61,  95,  68, 126,  34, -11,
   -6,   7,  26,  31,  65,  56,  25, -20,
  -14,  13,   6,  21,  23,  12,  17, -23,
  -27,  -2,  -5,  12,  17,   6,  10, -25,
  -26,  -4,  -4, -10,   3,   3,  33, -12,
  -35,  -1, -20, -23, -15,  24,  38, -22,
    0,   0,   0,   0,   0,   0,   0,   0,
];

const PAWN_EG = [
    0,   0,   0,   0,   0,   0,   0,   0,
  178, 173, 158, 134, 147, 132, 165, 187,
   94, 100,  85,  67,  56,  53,  82,  84,
   32,  24,  13,   5,  -2,   4,  17,  17,
   13,   9,  -3,  -7,  -7,  -8,   3,  -1,
    4,   7,  -6,   1,   0,  -5,  -1,  -8,
   13,   8,   8, -10,  -6,   0,   2,  -7,
    0,   0,   0,   0,   0,   0,   0,   0,
];

const KNIGHT_MG = [
 -167, -89, -34, -49,  61, -97, -15, -107,
  -73, -41,  72,  36,  23,  62,   7,  -17,
  -47,  60,  37,  65,  84, 129,  73,   44,
   -9,  17,  19,  53,  37,  69,  18,   22,
  -13,   4,  16,  13,  28,  19,  21,   -8,
  -23,  -9,  12,  10,  19,  17,  25,  -16,
  -29, -53, -12,  -3,  -1,  18, -14,  -19,
 -105, -21, -58, -33, -17, -28, -19,  -23,
];

const KNIGHT_EG = [
  -58, -38, -13, -28, -31, -27, -63,  -99,
  -25,  -8, -25,  -2,  -9, -25, -24,  -52,
  -24, -20,  10,   9,  -1,  -9, -19,  -41,
  -17,   3,  22,  22,  22,  11,   8,  -18,
  -18,  -6,  16,  25,  16,  17,   4,  -18,
  -23,  -3,  -1,  15,  10,  -3, -20,  -22,
  -42, -20, -10,  -5,  -2, -20, -23,  -44,
  -29, -51, -23, -15, -22, -18, -50,  -64,
];

const BISHOP_MG = [
  -29,   4, -82, -37, -25, -42,   7,  -8,
  -26,  16, -18, -13,  30,  59,  18, -47,
  -16,  37,  43,  40,  35,  50,  37,  -2,
   -4,   5,  19,  50,  37,  37,   7,  -2,
   -6,  13,  13,  26,  34,  12,  10,   4,
    0,  15,  15,  15,  14,  27,  18,  10,
    4,  15,  16,   0,   7,  21,  33,   1,
  -33,  -3, -14, -21, -13, -12, -39, -21,
];

const BISHOP_EG = [
  -14, -21, -11,  -8,  -7,  -9, -17, -24,
   -8,  -4,   7, -12,  -3, -13,  -4, -14,
    2,  -8,   0,  -1,  -2,   6,   0,   4,
   -3,   9,  12,   9,  14,  10,   3,   2,
   -6,   3,  13,  19,   7,  10,  -3,  -9,
  -12,  -3,   8,  10,  13,   3,  -7, -15,
  -14, -18,  -7,  -1,   4,  -9, -15, -27,
  -23,  -9, -23,  -5,  -9, -16,  -5, -17,
];

const ROOK_MG = [
   32,  42,  32,  51,  63,   9,  31,  43,
   27,  32,  58,  62,  80,  67,  26,  44,
   -5,  19,  26,  36,  17,  45,  61,  16,
  -24, -11,   7,  26,  24,  35,  -8, -20,
  -36, -26, -12,  -1,   9,  -7,   6, -23,
  -45, -25, -16, -17,   3,   0,  -5, -33,
  -44, -16, -20,  -9,  -1,  11,  -6, -71,
  -19, -13,   1,  17,  16,   7, -37, -26,
];

const ROOK_EG = [
   13,  10,  18,  15,  12,  12,   8,   5,
   11,  13,  13,  11,  -3,   3,   8,   3,
    7,   7,   7,   5,   4,  -3,  -5,  -3,
    4,   3,  13,   1,   2,   1,  -1,   2,
    3,   5,   8,   4,  -5,  -6,  -8, -11,
   -4,   0,  -5,  -1,  -7, -12,  -8, -16,
   -6,  -6,   0,   2,  -9,  -9, -11,  -3,
   -9,   2,   3,  -1,  -5, -13,   4, -20,
];

const QUEEN_MG = [
  -28,   0,  29,  12,  59,  44,  43,  45,
  -24, -39,  -5,   1, -16,  57,  28,  54,
   -1, -16,   9,  18,  56,  60,  57,  35,
  -27, -27, -14,  -1,  12,  10,   6,  10,
  -16, -15,  -6,   4,   8,  14,  12,  -5,
  -22, -15,  -7,   6,   4,  10,   5, -17,
  -17,  20,  12,  -2,   9,  12,  46,  16,
  -33, -28, -22, -43,  -5, -32, -20, -41,
];

const QUEEN_EG = [
  -9,  22,  22,  27,  27,  19,  10,  20,
 -17,  20,  32,  41,  58,  25,  30,   0,
 -20,   6,   9,  49,  47,  35,  19,   9,
   3,  22,  24,  45,  57,  40,  57,  36,
 -18,  28,  19,  47,  31,  34,  39,  18,
 -16, -27,  15,   6,   9,  17,  10,   5,
 -22, -23, -30, -16, -16, -23, -36, -32,
 -33, -28, -22, -43,  -5, -32, -20, -41,
];

const KING_MG = [
  -65,  23,  16, -15, -56, -34,   2,  13,
   29,  -1, -20,  -7,  -8,  -4, -38, -29,
   -9,  24,   2, -16, -20,   6,  22, -22,
  -17, -20, -12, -27, -30, -25, -14, -36,
  -49,  -1, -27, -39, -46, -44, -33, -51,
  -14, -14, -22, -46, -44, -30, -15, -27,
    1,   7,  -8, -64, -43, -16,   9,   8,
  -15,  36,  12, -54,   8, -28,  24,  14,
];

const KING_EG = [
  -74, -35, -18, -18, -11,  15,   4, -17,
  -12,  17,  14,  17,  17,  38,  23,  11,
   10,  17,  23,  15,  20,  45,  44,  13,
   -8,  22,  24,  27,  26,  33,  26,   3,
  -18,  -4,  21,  24,  27,  23,   9, -11,
  -19,  -3,  11,  21,  23,  16,   7,  -9,
  -27, -11,   4,  13,  14,   4,  -5, -17,
  -53, -34,  -8, -11,  -6, -13, -24, -46,
];

export const ChessboardViewer: React.FC = () => {
  const [selectedPiece, setSelectedPiece] = useState<'P' | 'N' | 'B' | 'R' | 'Q' | 'K'>('N');
  const [selectedPhase, setSelectedPhase] = useState<'MG' | 'EG'>('MG');
  const [kingSafetyMode, setKingSafetyMode] = useState<boolean>(false);
  const [kingSq, setKingSq] = useState<number>(6); // Default g1 (square index 6)

  const tables: Record<string, { MG: number[]; EG: number[] }> = {
    P: { MG: PAWN_MG, EG: PAWN_EG },
    N: { MG: KNIGHT_MG, EG: KNIGHT_EG },
    B: { MG: BISHOP_MG, EG: BISHOP_EG },
    R: { MG: ROOK_MG, EG: ROOK_EG },
    Q: { MG: QUEEN_MG, EG: QUEEN_EG },
    K: { MG: KING_MG, EG: KING_EG },
  };

  const currentTable = tables[selectedPiece][selectedPhase];

  // Helper to get square name like a1, h8
  const getSquareName = (rankIdx: number, fileIdx: number) => {
    const fileChar = String.fromCharCode('a'.charCodeAt(0) + fileIdx);
    const rankNum = 8 - rankIdx;
    return `${fileChar}${rankNum}`;
  };

  // Heatmap color generator
  const getScoreColor = (score: number) => {
    if (score > 40) return 'bg-emerald-600/70 text-white font-bold';
    if (score > 15) return 'bg-emerald-700/50 text-emerald-200';
    if (score > 0) return 'bg-teal-800/40 text-teal-200';
    if (score === 0) return 'bg-slate-800/40 text-slate-400';
    if (score > -20) return 'bg-amber-900/40 text-amber-300';
    if (score > -50) return 'bg-rose-900/40 text-rose-300';
    return 'bg-rose-950/70 text-rose-200 font-bold';
  };

  // King safety zone calculations for selected king square
  // kingSq is in 0..63 where 0=a1, 7=h1, 56=a8, 63=h8
  const kingFile = kingSq & 7;
  const kingRank = kingSq >> 3;
  const fileLeft = Math.max(0, kingFile - 1);
  const fileRight = Math.min(7, kingFile + 1);

  // Near shield for White king: rank = kingRank + 1
  // Far shield for White king: rank = kingRank + 2
  const isNearShield = (r: number, f: number) => {
    return r === kingRank + 1 && f >= fileLeft && f <= fileRight;
  };

  const isFarShield = (r: number, f: number) => {
    return r === kingRank + 2 && f >= fileLeft && f <= fileRight;
  };

  const isInAdjacentFiles = (f: number) => {
    return f >= fileLeft && f <= fileRight;
  };

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">
              Bàn Cờ Trực Quan: PeSTO Piece-Square Tables & King Ring
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Minh họa trực quan điểm vị trí 64 ô cờ và vành đai bảo vệ Vua động từ{' '}
            <code className="text-emerald-400">student/evaluation.py</code>
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setKingSafetyMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              !kingSafetyMode
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Bảng điểm PeSTO
          </button>
          <button
            onClick={() => setKingSafetyMode(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              kingSafetyMode
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/40'
                : 'bg-slate-700/70 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> An toàn Vua động (Chess960)
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      {!kingSafetyMode ? (
        <div className="flex flex-wrap items-center justify-between gap-3 my-4 p-3 bg-slate-900/60 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium mr-1">Quân cờ:</span>
            {[
              { id: 'P', name: 'Tốt (P)' },
              { id: 'N', name: 'Mã (N)' },
              { id: 'B', name: 'Tượng (B)' },
              { id: 'R', name: 'Xe (R)' },
              { id: 'Q', name: 'Hậu (Q)' },
              { id: 'K', name: 'Vua (K)' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPiece(p.id as any)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  selectedPiece === p.id
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Giai đoạn:</span>
            <div className="inline-flex rounded-lg p-0.5 bg-slate-800 border border-slate-700">
              <button
                onClick={() => setSelectedPhase('MG')}
                className={`px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                  selectedPhase === 'MG' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Trung cuộc (MG)
              </button>
              <button
                onClick={() => setSelectedPhase('EG')}
                className={`px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                  selectedPhase === 'EG' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tàn cuộc (EG)
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="my-4 p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/30 text-xs text-cyan-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Chế độ An toàn Vua:</strong> Nhấp vào bất kỳ ô nào ở hàng 1-3 để đặt vị trí Vua Trắng và xem vùng vành đai bảo vệ được tính tự động!
            </span>
          </div>
          <Badge variant="cyan">Vua đang ở: ô {String.fromCharCode('a'.charCodeAt(0) + (kingSq & 7))}{((kingSq >> 3) + 1)}</Badge>
        </div>
      )}

      {/* Chessboard Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-2">
        {/* Left: 8x8 Board */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="inline-block p-2 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl">
            <div className="grid grid-cols-8 gap-0.5 w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">
              {Array.from({ length: 64 }).map((_, idx) => {
                const rankIdx = Math.floor(idx / 8); // 0 (rank 8) to 7 (rank 1)
                const fileIdx = idx % 8; // 0 (file a) to 7 (file h)
                const r = 7 - rankIdx; // standard rank 0..7
                const f = fileIdx; // standard file 0..7
                const sqIndex = r * 8 + f; // standard python-chess index 0..63

                const score = currentTable[idx];
                const squareName = getSquareName(rankIdx, fileIdx);
                const isLightSquare = (rankIdx + fileIdx) % 2 === 0;

                if (kingSafetyMode) {
                  const isKing = sqIndex === kingSq;
                  const isNear = isNearShield(r, f);
                  const isFar = isFarShield(r, f);
                  const isCol = isInAdjacentFiles(f);

                  let cellBg = isLightSquare ? 'bg-slate-700/40' : 'bg-slate-800/80';
                  let borderStyle = 'border-transparent';

                  if (isKing) {
                    cellBg = 'bg-cyan-500 text-slate-950 font-black shadow-lg animate-pulse';
                  } else if (isNear) {
                    cellBg = 'bg-emerald-600/70 text-white font-bold';
                  } else if (isFar) {
                    cellBg = 'bg-emerald-900/50 text-emerald-200';
                  } else if (isCol && r > kingRank) {
                    cellBg = 'bg-slate-700/60 text-slate-300';
                    borderStyle = 'border-cyan-500/30 border-dashed';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        // Allow clicking on ranks 1-3 for white king
                        if (r <= 2) {
                          setKingSq(sqIndex);
                        }
                      }}
                      className={`relative flex flex-col items-center justify-center p-0.5 border ${borderStyle} ${cellBg} rounded transition-all hover:scale-105 hover:z-10`}
                      title={`${squareName} - ${isKing ? 'Vị trí Vua' : isNear ? 'Lá chắn Tốt gần (+18cp)' : isFar ? 'Lá chắn Tốt xa (+9cp)' : 'Ô cờ'}`}
                    >
                      <span className="text-[9px] absolute top-0.5 left-1 opacity-60 font-mono">
                        {squareName}
                      </span>
                      {isKing && <span className="text-xl">♔</span>}
                      {isNear && <span className="text-[10px] font-bold text-emerald-200">+18</span>}
                      {isFar && <span className="text-[10px] font-bold text-emerald-300">+9</span>}
                    </button>
                  );
                }

                // PeSTO heatmap mode:
                const colorClass = getScoreColor(score);

                return (
                  <div
                    key={idx}
                    className={`relative flex flex-col items-center justify-center p-0.5 rounded ${colorClass} transition-all hover:scale-105 hover:z-10 shadow-sm`}
                    title={`${squareName}: ${score > 0 ? '+' : ''}${score} centipawns`}
                  >
                    <span className="text-[9px] absolute top-0.5 left-1 opacity-50 font-mono">
                      {squareName}
                    </span>
                    <span className="text-xs sm:text-sm font-mono mt-1">
                      {score > 0 ? `+${score}` : score}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Board Coordinates Label */}
            <div className="flex justify-between px-2 pt-1 text-[10px] text-slate-500 font-mono">
              <span>a</span>
              <span>b</span>
              <span>c</span>
              <span>d</span>
              <span>e</span>
              <span>f</span>
              <span>g</span>
              <span>h</span>
            </div>
          </div>
        </div>

        {/* Right: Technical Explanation */}
        <div className="lg:col-span-5 space-y-4">
          {!kingSafetyMode ? (
            <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Ý nghĩa chiến thuật của {selectedPiece === 'P' ? 'Tốt' : selectedPiece === 'N' ? 'Mã' : selectedPiece === 'B' ? 'Tượng' : selectedPiece === 'R' ? 'Xe' : selectedPiece === 'Q' ? 'Hậu' : 'Vua'} ({selectedPhase})
                </span>
                <Badge variant={selectedPhase === 'MG' ? 'indigo' : 'amber'}>
                  {selectedPhase === 'MG' ? 'Trung cuộc (MG)' : 'Tàn cuộc (EG)'}
                </Badge>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                {selectedPiece === 'N' && selectedPhase === 'MG' && (
                  <p>
                    <strong>Mã ở Trung cuộc:</strong> Được thưởng điểm cực cao tại các ô trung tâm d4, e4, d5, e5 (+53 đến +69 cp) và bị phạt nặng nếu đứng ở góc a1, h1 (-105 đến -167 cp) theo châm ngôn kinh điển "A knight on the rim is dim".
                  </p>
                )}
                {selectedPiece === 'P' && selectedPhase === 'EG' && (
                  <p>
                    <strong>Tốt ở Tàn cuộc:</strong> Điểm số tăng vọt theo từng bước tiến về hàng 7 (+134 đến +187 cp), khuyến khích bot đẩy Tốt thông phong cấp thành Hậu.
                  </p>
                )}
                {selectedPiece === 'K' && selectedPhase === 'MG' && (
                  <p>
                    <strong>Vua ở Trung cuộc:</strong> Được thưởng điểm khi ẩn nấp ở góc an toàn g1 (+24 cp) sau khi nhập thành, và bị phạt rất nặng nếu lang thang ở trung tâm e4 (-46 cp).
                  </p>
                )}
                {selectedPiece === 'K' && selectedPhase === 'EG' && (
                  <p>
                    <strong>Vua ở Tàn cuộc:</strong> Đảo ngược hoàn toàn! Vua được thưởng điểm cao khi tiến vào trung tâm d4, e4, d5, e5 (+24 đến +45 cp) để hỗ trợ phong cấp Tốt và dồn Vua đối phương.
                  </p>
                )}
                {selectedPiece === 'R' && (
                  <p>
                    <strong>Xe:</strong> Luôn được thưởng điểm cao ở hàng 7/2 (+26 đến +80 cp) để tấn công hàng Tốt của đối phương và cắt đường Vua.
                  </p>
                )}
                {selectedPiece === 'B' && (
                  <p>
                    <strong>Tượng:</strong> Được định hướng kiểm soát các đường chéo dài trung tâm (+37 đến +59 cp) và tránh bị cản trở bởi hàng Tốt của mình.
                  </p>
                )}
                {selectedPiece === 'Q' && (
                  <p>
                    <strong>Hậu:</strong> Hạn chế xuất quân quá sớm ở trung cuộc để tránh bị tấn công (-28 đến -43 cp ở hàng 1-2), nhưng chiếm lĩnh bàn cờ ở tàn cuộc.
                  </p>
                )}
              </div>

              {/* Heatmap Legend */}
              <div className="pt-2 border-t border-slate-700/60">
                <div className="text-[11px] text-slate-400 mb-1.5 font-medium">Chú giải màu sắc nhiệt (Heatmap):</div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-600/70 shrink-0" />
                    <span className="text-slate-300">&gt; +40 cp (Vị trí đắc địa)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-teal-800/40 shrink-0" />
                    <span className="text-slate-300">0..+40 cp (Có lợi)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-amber-900/40 shrink-0" />
                    <span className="text-slate-300">-20..0 cp (Kém ưu thế)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-rose-950/70 shrink-0" />
                    <span className="text-slate-300">&lt; -50 cp (Ô xấu/nguy hiểm)</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-cyan-950/30 rounded-xl p-4 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-300">
                  Cơ chế Dynamic Bitwise King Ring (Nhóm 12)
                </span>
                <Badge variant="cyan">An toàn 960 thế</Badge>
              </div>

              <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
                <p>
                  Trong <strong>Chess960</strong>, Vua không cố định ở e1 mà có thể xuất phát ở bất kỳ ô nào từ b1 đến g1.
                </p>
                <div className="space-y-1 font-mono text-[11px] bg-slate-900/80 p-2.5 rounded-lg border border-cyan-500/20">
                  <div className="text-emerald-400">• Lá chắn gần (Near Shield): +18 cp cho mỗi Tốt bảo vệ trực diện (hàng {kingRank + 2})</div>
                  <div className="text-emerald-300">• Lá chắn xa (Far Shield): +9 cp cho mỗi Tốt ở hàng {kingRank + 3}</div>
                  <div className="text-rose-400">• Cột mở trước mặt Vua: Phạt -36 cp nếu cả 2 bên không có Tốt</div>
                  <div className="text-amber-400">• Cột bán mở trước mặt Vua: Phạt -18 cp nếu bên ta không có Tốt</div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Hàm <code className="text-cyan-400">_build_king_zones()</code> tính sẵn 5 tuple mặt nạ 64-bit cho toàn bộ 64 ô cờ ngay lúc import, đạt tốc độ kiểm tra O(1) bằng bitwise AND mà không tốn chu kỳ lặp.
                </p>
              </div>
            </div>
          )}

          {/* Code Reference Card */}
          <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">File tham chiếu:</span>{' '}
            <code className="text-emerald-400">student/evaluation.py</code> (dòng 66-237 và 321-360)
          </div>
        </div>
      </div>
    </div>
  );
};
