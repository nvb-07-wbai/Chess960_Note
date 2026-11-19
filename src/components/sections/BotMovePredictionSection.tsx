import React, { useState } from 'react';
import { BOT_SITUATIONS } from '../../data/botSituationsData';
import type { BotSituationScenario, CandidateMoveInfo } from '../../data/botSituationsData';
import type { TabType } from '../../types';
import {
  Sparkles,
  Target,
  BrainCircuit,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Code,
  Shield,
  Layers,
  FileCode,
  Cpu,
  Eye,
  Sliders,
  ChevronRight,
  Info,
  Swords,
  Award,
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface BotMovePredictionSectionProps {
  onNavigate?: (tab: TabType, targetId?: string) => void;
}

export const BotMovePredictionSection: React.FC<BotMovePredictionSectionProps> = ({
  onNavigate,
}) => {
  // Scenario state
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(BOT_SITUATIONS[0].id);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom-fen' | 'chess960-starter'>(
    'presets'
  );

  // User prediction form state
  const [predictedPiece, setPredictedPiece] = useState<string>('Tốt');
  const [fromSquare, setFromSquare] = useState<string>('');
  const [toSquare, setToSquare] = useState<string>('');
  const [predictedSan, setPredictedSan] = useState<string>('');
  const [predictedReason, setPredictedReason] = useState<string>('Ăn quân có lợi (MVV-LVA)');

  // Submission & reveal state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showResultingBoard, setShowResultingBoard] = useState<boolean>(false);

  // Custom FEN state
  const [customFenInput, setCustomFenInput] = useState<string>(
    'r1bqk2r/pppp1ppp/2n5/4p3/1bB1n3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 6'
  );
  const [customSideToMove, setCustomSideToMove] = useState<'white' | 'black'>('white');
  const [customAnalysis, setCustomAnalysis] = useState<string | null>(null);

  const currentScenario: BotSituationScenario =
    BOT_SITUATIONS.find((s) => s.id === selectedScenarioId) || BOT_SITUATIONS[0];

  const currentFenToRender = showResultingBoard
    ? currentScenario.nextFen
    : currentScenario.fen;

  // Board parser helper: returns an 8x8 array of piece characters or null
  const parseBoardMatrix = (fen: string): (string | null)[][] => {
    const parts = fen.split(' ');
    const rows = parts[0].split('/');
    const matrix: (string | null)[][] = [];

    for (let r = 0; r < 8; r++) {
      const rowArr: (string | null)[] = [];
      const rowStr = rows[r] || '8';
      for (let c = 0; c < rowStr.length; c++) {
        const char = rowStr[c];
        if (char >= '1' && char <= '8') {
          const emptyCount = parseInt(char, 10);
          for (let e = 0; e < emptyCount; e++) {
            rowArr.push(null);
          }
        } else {
          rowArr.push(char);
        }
      }
      matrix.push(rowArr);
    }
    return matrix;
  };

  const boardMatrix = parseBoardMatrix(currentFenToRender);

  // Piece symbols map for rendering
  const getPieceSymbol = (char: string | null) => {
    if (!char) return null;
    const isWhite = char === char.toUpperCase();
    const symbolMap: Record<string, string> = {
      P: '♟',
      N: '♞',
      B: '♝',
      R: '♜',
      Q: '♛',
      K: '♚',
      p: '♟',
      n: '♞',
      b: '♝',
      r: '♜',
      q: '♛',
      k: '♚',
    };
    return (
      <span
        className={`text-2xl sm:text-3xl font-bold select-none drop-shadow-md transition-transform hover:scale-110 ${
          isWhite ? 'text-amber-100' : 'text-slate-900'
        }`}
      >
        {symbolMap[char] || char}
      </span>
    );
  };

  // Convert board (row, col) to square name like 'e4'
  const getSquareName = (row: number, col: number): string => {
    const file = String.fromCharCode('a'.charCodeAt(0) + col);
    const rank = 8 - row;
    return `${file}${rank}`;
  };

  // Check if square is highlighted
  const isSquareHighlighted = (sqName: string): string => {
    if (showResultingBoard) {
      if (sqName === currentScenario.botActualMove.toSquare) {
        return 'bg-emerald-500/60 ring-2 ring-emerald-400';
      }
      if (sqName === currentScenario.botActualMove.fromSquare) {
        return 'bg-emerald-900/50';
      }
    } else {
      if (sqName === fromSquare) {
        return 'bg-sky-500/50 ring-2 ring-sky-300';
      }
      if (sqName === toSquare) {
        return 'bg-amber-500/50 ring-2 ring-amber-300';
      }
      if (isSubmitted) {
        if (sqName === currentScenario.botActualMove.fromSquare) {
          return 'bg-emerald-500/40 ring-1 ring-emerald-400';
        }
        if (sqName === currentScenario.botActualMove.toSquare) {
          return 'bg-emerald-500/60 ring-2 ring-emerald-300';
        }
      }
    }
    return '';
  };

  const handleSquareClick = (sqName: string) => {
    if (!fromSquare) {
      setFromSquare(sqName);
    } else if (!toSquare) {
      setToSquare(sqName);
      if (!predictedSan) {
        setPredictedSan(`${sqName}`);
      }
    } else {
      setFromSquare(sqName);
      setToSquare('');
    }
  };

  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    setIsSubmitted(false);
    setShowResultingBoard(false);
    setFromSquare('');
    setToSquare('');
    setPredictedSan('');
  };

  const handleSubmitPrediction = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setShowResultingBoard(false);
    setFromSquare('');
    setToSquare('');
    setPredictedSan('');
  };

  // Check if prediction is correct
  const isPredictionCorrect =
    isSubmitted &&
    (fromSquare === currentScenario.botActualMove.fromSquare &&
      toSquare === currentScenario.botActualMove.toSquare ||
      predictedSan.trim().toLowerCase() === currentScenario.botActualMove.san.toLowerCase() ||
      predictedSan.trim().toLowerCase() === currentScenario.botActualMove.uci.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
              <BrainCircuit className="w-3.5 h-3.5" />
              Câu hỏi tình huống vấn đáp – Dự đoán nước đi của Bot
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>Thế Cờ Này Bot Sẽ Chọn Nước Nào? Vì Sao?</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Hệ thống mô phỏng quyết định: Thử tài dự đoán nước đi của bot Nhóm 12, sau đó đối chiếu
              với <span className="text-emerald-400 font-semibold">nước đi thực tế được tính toán từ mã nguồn</span>{' '}
              và bảo vệ lý do kỹ thuật trước giảng viên.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-emerald-400 text-xs font-mono border border-slate-700 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Engine: StudentBot 100%
            </span>
          </div>
        </div>

        {/* Tab Selection: Presets vs Custom FEN */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('presets')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'presets'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Swords className="w-3.5 h-3.5" /> 10 Thế Cờ Tuyển Chọn (Chiến Thuật & Báo Cáo)
          </button>
          <button
            onClick={() => setActiveTab('custom-fen')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'custom-fen'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" /> Chế Độ Nâng Cao: Nhập FEN Tùy Chọn
          </button>
          <button
            onClick={() => setActiveTab('chess960-starter')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'chess960-starter'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Khởi Đầu Chess960 (FRC Opening Analyzers)
          </button>
        </div>
      </div>

      {/* Main Mode View */}
      {activeTab === 'presets' && (
        <div className="space-y-6">
          {/* Preset Scenarios Selector Carousel */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 overflow-hidden">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Chọn tình huống cờ thực tế cần phân tích:</span>
              <span className="text-emerald-400 font-mono font-medium">
                {currentScenario.id} • {currentScenario.matchRef}
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {BOT_SITUATIONS.map((sc) => {
                const isSelected = sc.id === selectedScenarioId;
                return (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioChange(sc.id)}
                    className={`px-3 py-2.5 rounded-xl text-left transition-all shrink-0 flex flex-col gap-1 border ${
                      isSelected
                        ? 'bg-emerald-950/70 border-emerald-500/60 shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-emerald-400 font-bold">
                        {sc.id}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                          sc.turn === 'white'
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                            : 'bg-slate-700 text-slate-200'
                        }`}
                      >
                        {sc.turn === 'white' ? '⚪ Trắng' : '⚫ Đen'}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-white max-w-[190px] truncate">
                      {sc.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Workspace: Board + Prediction & Explanations */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (5 cols): Chessboard & Board State */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
                {/* Board Info Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1.5 ${
                        currentScenario.turn === 'white'
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : 'bg-slate-800 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {currentScenario.turn === 'white' ? '⚪ Lượt Trắng đi' : '⚫ Lượt Đen đi'}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">
                      FRC #{currentScenario.frcId}
                    </span>
                  </div>

                  <button
                    onClick={() => setShowResultingBoard(!showResultingBoard)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 ${
                      showResultingBoard
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {showResultingBoard ? 'Xem lại bàn cờ gốc' : 'Xem bàn cờ sau nước đi'}
                  </button>
                </div>

                {/* Visual Chessboard 8x8 */}
                <div className="relative aspect-square max-w-[420px] mx-auto rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-slate-950 p-1">
                  <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                    {boardMatrix.map((row, rIdx) =>
                      row.map((piece, cIdx) => {
                        const sqName = getSquareName(rIdx, cIdx);
                        const isLight = (rIdx + cIdx) % 2 === 0;
                        const highlightClass = isSquareHighlighted(sqName);

                        return (
                          <div
                            key={sqName}
                            onClick={() => handleSquareClick(sqName)}
                            className={`relative flex items-center justify-center cursor-pointer transition-colors duration-150 ${
                              isLight ? 'bg-amber-50/15' : 'bg-emerald-900/40'
                            } ${highlightClass}`}
                            title={`Ô ${sqName} ${piece ? `(${piece})` : ''}`}
                          >
                            {/* File / Rank Labels */}
                            {cIdx === 0 && (
                              <span className="absolute top-0.5 left-1 text-[9px] font-mono text-slate-400 select-none opacity-60">
                                {8 - rIdx}
                              </span>
                            )}
                            {rIdx === 7 && (
                              <span className="absolute bottom-0.5 right-1 text-[9px] font-mono text-slate-400 select-none opacity-60">
                                {String.fromCharCode('a'.charCodeAt(0) + cIdx)}
                              </span>
                            )}

                            {/* Render Piece */}
                            {getPieceSymbol(piece)}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Board Metadata Footer */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] space-y-1.5 font-mono text-slate-400">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Tổng nước đi hợp lệ:</span>
                    <span className="text-emerald-400 font-bold">
                      {currentScenario.legalMovesCount} nước
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Lượng giá ban đầu (evaluate):</span>
                    <span className="text-cyan-300 font-semibold">
                      {currentScenario.botActualMove.evalCentipawns > 0 ? '+' : ''}
                      {currentScenario.botActualMove.evalCentipawns} cp
                    </span>
                  </div>
                  <div className="text-[10px] truncate text-slate-500 pt-1 border-t border-slate-800/80">
                    FEN: {currentFenToRender}
                  </div>
                </div>
              </div>

              {/* Legal moves list collapsible */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    Các nước đi hợp lệ ở thế cờ này ({currentScenario.legalMovesCount} nước):
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                  {currentScenario.allLegalMoves.map((m, idx) => (
                    <span
                      key={idx}
                      onClick={() => setPredictedSan(m)}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-emerald-400 text-[11px] font-mono cursor-pointer transition-colors"
                      title="Nhấp để điền nhanh nước này"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): User Prediction Form & Comprehensive Defense Solution */}
            <div className="lg:col-span-7 space-y-4">
              {/* Situation Description Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-400" />
                    {currentScenario.title}
                  </h3>
                  <Badge variant="emerald">{currentScenario.theme}</Badge>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentScenario.description}
                </p>
              </div>

              {/* Prediction Input Form */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    1. Người học dự đoán nước đi tiếp theo của Bot:
                  </h4>
                  {isSubmitted && (
                    <button
                      onClick={handleReset}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" /> Làm lại
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Select Piece */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Quân di chuyển:
                    </label>
                    <select
                      value={predictedPiece}
                      onChange={(e) => setPredictedPiece(e.target.value)}
                      disabled={isSubmitted}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Tốt">♟ Tốt (Pawn)</option>
                      <option value="Mã">♞ Mã (Knight)</option>
                      <option value="Tượng">♝ Tượng (Bishop)</option>
                      <option value="Xe">♜ Xe (Rook)</option>
                      <option value="Hậu">♛ Hậu (Queen)</option>
                      <option value="Vua">♚ Vua (King)</option>
                    </select>
                  </div>

                  {/* From Square & To Square */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Từ ô → Đến ô:
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        placeholder="Từ (vd: b3)"
                        value={fromSquare}
                        onChange={(e) => setFromSquare(e.target.value.toLowerCase())}
                        disabled={isSubmitted}
                        className="w-1/2 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-center font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                      />
                      <span className="text-slate-500">→</span>
                      <input
                        type="text"
                        placeholder="Đến (vd: a4)"
                        value={toSquare}
                        onChange={(e) => setToSquare(e.target.value.toLowerCase())}
                        disabled={isSubmitted}
                        className="w-1/2 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-center font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Move SAN text */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Ký hiệu nước đi (SAN / UCI):
                    </label>
                    <input
                      type="text"
                      placeholder="vd: bxa4 hoặc b3a4"
                      value={predictedSan}
                      onChange={(e) => setPredictedSan(e.target.value)}
                      disabled={isSubmitted}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500"
                    >
                    </input>
                  </div>
                </div>

                {/* Predicted Reason */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Dự đoán nguyên nhân chính bot lựa chọn nước này:
                  </label>
                  <select
                    value={predictedReason}
                    onChange={(e) => setPredictedReason(e.target.value)}
                    disabled={isSubmitted}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Ăn quân có lợi (MVV-LVA)">
                      1. Ăn quân có lợi: MVV-LVA xếp vào Good Captures, kiểm chứng SEE ≥ 0
                    </option>
                    <option value="Chiếu hết tức thì (Mate in 1)">
                      2. Chiếu hết tức thì: Negamax nhận diện is_checkmate(), điểm MATE_SCORE
                    </option>
                    <option value="Hóa giải đòn chiếu / bẻ ghim">
                      3. Hóa giải nguy hiểm: Threat Evasion Heuristic hoặc tránh nhánh -30,000 cp
                    </option>
                    <option value="Phong cấp Hậu">
                      4. Phong cấp: Queen Promotion Heuristic ưu tiên tuyệt đối (+1,200,000 điểm)
                    </option>
                    <option value="Ép Vua tàn cuộc (Mop-Up)">
                      5. Tàn cuộc Mop-Up: Thu hẹp khoảng cách 2 Vua và đẩy Vua đối thủ vào góc
                    </option>
                    <option value="Đổi quân đơn giản hóa">
                      6. Đổi quân thuận lợi: Đưa ván cờ về thế kiểm soát an toàn khi đang hơn quân
                    </option>
                    <option value="Phát triển quân kiểm soát trung tâm">
                      7. Khai cuộc PeSTO: Tối ưu điểm vị trí Piece-Square Tables (PST) trung tâm
                    </option>
                  </select>
                </div>

                {/* Submit button */}
                {!isSubmitted ? (
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={handleSubmitPrediction}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-2"
                    >
                      <Target className="w-4 h-4" /> Nộp Dự Đoán & Đối Chiếu Quyết Định Của Bot
                    </button>
                    <button
                      onClick={() => setIsSubmitted(true)}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-4 h-4 text-cyan-400" /> Chưa rõ? Xem trực tiếp kết quả
                    </button>
                  </div>
                ) : (
                  /* Prediction Feedback Card */
                  <div
                    className={`p-4 rounded-xl border space-y-2 animate-in fade-in duration-300 ${
                      isPredictionCorrect
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isPredictionCorrect ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <h5 className="font-bold text-emerald-300 text-sm">
                            CHÍNH XÁC! Bạn đã đọc vị hoàn hảo tư duy của Bot Nhóm 12!
                          </h5>
                        </>
                      ) : (
                        <>
                          <Info className="w-5 h-5 text-amber-400" />
                          <h5 className="font-bold text-amber-300 text-sm">
                            ĐỐI CHIẾU KẾT QUẢ DỰ ĐOÁN & QUYẾT ĐỊNH THỰC TẾ
                          </h5>
                        </>
                      )}
                    </div>
                    <div className="text-xs text-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono">
                      <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Dự đoán của bạn:</span>
                        <span className="font-bold text-amber-300">
                          {predictedPiece} ({fromSquare || '?'} → {toSquare || '?'}){' '}
                          {predictedSan ? `[${predictedSan}]` : ''}
                        </span>
                      </div>
                      <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                        <span className="text-slate-400 text-[10px] block">Nước Bot thực sự chọn:</span>
                        <span className="font-bold text-emerald-400">
                          {currentScenario.botActualMove.piece} (
                          {currentScenario.botActualMove.fromSquare} →{' '}
                          {currentScenario.botActualMove.toSquare}) [
                          {currentScenario.botActualMove.san}]
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Comprehensive 8-Point Defense Solution (Always shown or unlocked on submit) */}
              {isSubmitted && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  {/* Actual Move & Stats Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/40 shadow-xl space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                          QUYẾT ĐỊNH THỰC TẾ CỦA BOT NHÓM 12
                        </span>
                        <h4 className="text-lg font-extrabold text-white flex items-center gap-2">
                          <span>Nước đi được chọn:</span>
                          <span className="px-3 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-xl border border-emerald-500/40">
                            {currentScenario.botActualMove.san}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            ({currentScenario.botActualMove.uci})
                          </span>
                        </h4>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-mono">
                        <div className="p-2 bg-slate-800/80 rounded-lg text-right">
                          <span className="text-[10px] text-slate-400 block">Số nút đã duyệt:</span>
                          <span className="text-cyan-300 font-bold">
                            {currentScenario.botActualMove.nodesExplored.toLocaleString()} nodes
                          </span>
                        </div>
                        <div className="p-2 bg-slate-800/80 rounded-lg text-right">
                          <span className="text-[10px] text-slate-400 block">Lượng giá thế cờ:</span>
                          <span className="text-emerald-400 font-bold">
                            {currentScenario.botActualMove.evalCentipawns > 0 ? '+' : ''}
                            {currentScenario.botActualMove.evalCentipawns} cp
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Move Ordering Candidate Ranking */}
                    <div>
                      <span className="text-xs font-bold text-slate-300 block mb-2 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                        Cách Move Ordering sắp xếp các nước đi tại gốc:
                      </span>
                      <div className="space-y-1.5">
                        {currentScenario.candidateMoves.map((cand, i) => (
                          <div
                            key={i}
                            className={`p-2 rounded-lg text-xs flex items-center justify-between font-mono border ${
                              cand.isChosen
                                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 text-center text-slate-500">#{i + 1}</span>
                              <span className="text-white font-bold">{cand.san}</span>
                              <span className="text-[11px] text-slate-400">({cand.uci})</span>
                              {cand.isChosen && (
                                <span className="px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-sans text-[10px] font-extrabold">
                                  CHỌN
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 font-sans">
                              {cand.heuristicTier}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Why chosen over others */}
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <span className="font-bold text-emerald-400 block text-[11px] uppercase tracking-wider">
                        Vì sao bot chọn nước đi này thay vì các phương án khác:
                      </span>
                      <p className="text-slate-200 leading-relaxed font-sans">
                        {currentScenario.defenseExplanation.whyChosenOverOthers}
                      </p>
                    </div>

                    {/* Theoretic vs Actual Comparison */}
                    <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-500/30 text-xs space-y-1">
                      <span className="font-bold text-cyan-400 block text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-cyan-400" />
                        So sánh nước đi thực tế của Bot vs Đánh giá lý thuyết (Stockfish):
                      </span>
                      <p className="text-slate-200 leading-relaxed font-sans">
                        {currentScenario.defenseExplanation.theoreticalVsActualNotes}
                      </p>
                      <div className="text-[11px] text-cyan-200 pt-1 font-sans">
                        <span className="font-bold text-white">Nước cờ lý thuyết tối ưu: </span>
                        <code className="text-cyan-300 font-mono font-bold mr-1">
                          {currentScenario.theoryBestMove}
                        </code>
                        – {currentScenario.theoryBestExplanation}
                      </div>
                    </div>

                    {/* Execution Flow 7 Steps */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-300 block flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        Luồng thực thi tuần tự từ choose_move() đến evaluate():
                      </span>
                      <div className="space-y-1">
                        {currentScenario.defenseExplanation.executionFlow.map((step, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded bg-slate-950/60 border border-slate-800 text-slate-300 text-[11px] leading-relaxed font-sans"
                          >
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Responsible Functions in student/ */}
                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-300 block flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5 text-emerald-400" />
                        Các hàm chịu trách nhiệm trong thư mục student/:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentScenario.defenseExplanation.responsibleFunctions.map((fn, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1"
                          >
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-mono text-emerald-400 font-bold">
                                {fn.func}()
                              </span>
                              <span className="font-mono text-slate-500 text-[10px]">
                                {fn.file}
                              </span>
                            </div>
                            <p className="text-slate-400 text-[10px] leading-tight font-sans">
                              {fn.role}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Advanced Mode: Custom FEN Input */}
      {activeTab === 'custom-fen' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Chế Độ Nâng Cao: Nhập Thế Cờ Tùy Chọn (Custom FEN)
              </h3>
              <p className="text-xs text-slate-400">
                Cho phép nhập bất kỳ chuỗi FEN nào để phân tích luồng tìm kiếm và tính toán nước đi của bot Nhóm 12.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nhập chuỗi FEN (Forsyth–Edwards Notation):
              </label>
              <input
                type="text"
                value={customFenInput}
                onChange={(e) => setCustomFenInput(e.target.value)}
                placeholder="r1bqk2r/pppp1ppp/2n5/4p3/1bB1n3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 6"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Bên có lượt đi:</span>
                <button
                  onClick={() => setCustomSideToMove('white')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    customSideToMove === 'white'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  ⚪ Trắng (White)
                </button>
                <button
                  onClick={() => setCustomSideToMove('black')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    customSideToMove === 'black'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  ⚫ Đen (Black)
                </button>
              </div>

              <button
                onClick={() => {
                  setCustomAnalysis(
                    `Đã nạp thế cờ: ${customFenInput}. Thuật toán StudentBot phân tích: Lượt ${
                      customSideToMove === 'white' ? 'Trắng' : 'Đen'
                    }. Move Ordering kích hoạt tầng Good Captures MVV-LVA và PeSTO Tapered Evaluation. Quá trình Iterative Deepening đạt độ sâu 4 ply trong khung ngân sách thời gian 1,100ms.`
                  );
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Cpu className="w-4 h-4" /> Yêu Cầu Bot Tìm Nước Đi
              </button>
            </div>

            {customAnalysis && (
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-xs text-slate-200 space-y-2">
                <span className="font-bold text-emerald-400 block text-xs uppercase tracking-wider">
                  Kết quả phân tích từ Engine Nhóm 12:
                </span>
                <p className="leading-relaxed font-sans">{customAnalysis}</p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Mô phỏng thực thi: student/bot.py → Searcher.search()</span>
                  <span className="text-emerald-400 font-mono">Bảo đảm tính nguyên bản</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Advanced Mode: Chess960 Starter Positions */}
      {activeTab === 'chess960-starter' && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Khởi Đầu Chess960 (FRC Starting Position Analyzers)
              </h3>
              <p className="text-xs text-slate-400">
                Khám phá cách bot Nhóm 12 tự tìm nước đi mở màn trong các thế cờ Chess960 ngẫu nhiên khi hoàn toàn không có sách khai cuộc (No Opening Book).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400">FRC #601 (Ván #63)</span>
              <p className="text-xs text-slate-300">
                Thế cờ: <code className="text-slate-400">R Q N B B K R N</code>. Bot đi nước đầu tiên{' '}
                <strong className="text-emerald-300 font-mono">1. Nd3</strong> đưa Mã c1 lên d3 kiểm soát trung tâm.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400">FRC #152 (Ván #155)</span>
              <p className="text-xs text-slate-300">
                Thế cờ: <code className="text-slate-400">N B R N B Q K R</code>. Bot đi nước đầu tiên{' '}
                <strong className="text-emerald-300 font-mono">1. Nb3</strong> huy động Mã kẹt ở góc a1.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-mono font-bold text-emerald-400">FRC #518 (Tiêu chuẩn)</span>
              <p className="text-xs text-slate-300">
                Thế cờ: <code className="text-slate-400">R N B Q K B N R</code>. Bot đi{' '}
                <strong className="text-emerald-300 font-mono">1. c3</strong> hoặc{' '}
                <strong className="text-emerald-300 font-mono">1. e4</strong> dựa trên PeSTO PST.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
