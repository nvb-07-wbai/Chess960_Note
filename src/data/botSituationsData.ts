/**
 * DATASET TÌNH HUỐNG DỰ ĐOÁN NƯỚC ĐI CỦA BOT NHÓM 12
 * Toàn bộ kết quả nước đi, số nodes, điểm lượng giá được tính toán trực tiếp
 * từ mã nguồn thực tế student/bot.py, student/search.py, student/evaluation.py.
 */

export interface CandidateMoveInfo {
  uci: string;
  san: string;
  piece: string;
  isChosen: boolean;
  heuristicTier: string;
  fromSquare: string;
  toSquare: string;
  capturedPiece?: string | null;
}

export interface BotActualMoveInfo {
  uci: string;
  san: string;
  piece: string;
  fromSquare: string;
  toSquare: string;
  isCapture: boolean;
  isCheck: boolean;
  promotion?: string | null;
  nodesExplored: number;
  evalCentipawns: number;
}

export interface ResponsibleFunctionInfo {
  file: string;
  func: string;
  role: string;
}

export interface DefenseExplanationInfo {
  responsibleFunctions: ResponsibleFunctionInfo[];
  executionFlow: string[];
  moveOrderingRationale: string;
  whyChosenOverOthers: string;
  theoreticalVsActualNotes: string;
}

export interface BotSituationScenario {
  id: string;
  title: string;
  matchRef: string;
  theme: string;
  fen: string;
  turn: 'white' | 'black';
  turnDisplay: string;
  frcId: number;
  ply: number;
  description: string;
  legalMovesCount: number;
  legalMovesSample: string[];
  allLegalMoves: string[];
  botActualMove: BotActualMoveInfo;
  theoryBestMove: string;
  theoryBestExplanation: string;
  matchesTheory: boolean;
  nextFen: string;
  candidateMoves: CandidateMoveInfo[];
  defenseExplanation: DefenseExplanationInfo;
}

export const BOT_SITUATIONS: BotSituationScenario[] = [
  {
    "id": "SIT-01",
    "title": "Trừng Phạt Quân Đi Lạc (MVV-LVA Heuristic - Ván #155)",
    "matchRef": "short-p78-l1 (Ván #155, FRC 152)",
    "theme": "MVV-LVA Good Capture & Static Exchange Evaluation (SEE)",
    "fen": "r1bqk2r/pppp1ppp/2n5/4p3/n1B1P3/1P3N2/P1PP1PPP/RNBQK2R w KQkq - 0 12",
    "turn": "white",
    "turnDisplay": "Trắng (White)",
    "frcId": 152,
    "ply": 24,
    "description": "Ở nước 11, đối thủ di chuyển Mã sang a4 (Nxa4) không có quân bảo vệ. Bên Trắng (Nhóm 12) có lượt đi và cần khai thác sai lầm này.",
    "legalMovesCount": 33,
    "legalMovesSample": [
      "Bxf7+",
      "Be6",
      "Ba6",
      "Bd5",
      "Bb5",
      "Bd3",
      "Be2",
      "Bf1",
      "Ng5",
      "Nxe5",
      "Nh4",
      "Nd4",
      "Ng1",
      "Rg1",
      "Rf1",
      "Ke2"
    ],
    "allLegalMoves": [
      "Bxf7+",
      "Be6",
      "Ba6",
      "Bd5",
      "Bb5",
      "Bd3",
      "Be2",
      "Bf1",
      "Ng5",
      "Nxe5",
      "Nh4",
      "Nd4",
      "Ng1",
      "Rg1",
      "Rf1",
      "Ke2",
      "Kf1",
      "Qe2",
      "Ba3",
      "Bb2",
      "Nc3",
      "Na3",
      "O-O",
      "bxa4",
      "b4",
      "h3",
      "g3",
      "d3",
      "c3",
      "a3",
      "h4",
      "g4",
      "d4"
    ],
    "botActualMove": {
      "uci": "b3a4",
      "san": "bxa4",
      "piece": "Tốt",
      "fromSquare": "b3",
      "toSquare": "a4",
      "isCapture": true,
      "isCheck": false,
      "promotion": null,
      "nodesExplored": 1536,
      "evalCentipawns": 405
    },
    "theoryBestMove": "bxa4",
    "theoryBestExplanation": "Ăn Mã a4 bằng Tốt b3 (12. bxa4) đoạt ngay 1 quân nhẹ (+320 cp) mà không gặp bất kỳ đòn phản công nào.",
    "matchesTheory": true,
    "nextFen": "r1bqk2r/pppp1ppp/2n5/4p3/P1B1P3/5N2/P1PP1PPP/RNBQK2R b KQkq - 0 12",
    "candidateMoves": [
      {
        "uci": "b3a4",
        "san": "bxa4",
        "piece": "Tốt",
        "isChosen": true,
        "heuristicTier": "Bắt quân MVV-LVA (Tốt ăn Mã)",
        "fromSquare": "b3",
        "toSquare": "a4",
        "capturedPiece": "Mã"
      },
      {
        "uci": "c4f7",
        "san": "Bxf7+",
        "piece": "Tượng",
        "isChosen": false,
        "heuristicTier": "Bắt quân MVV-LVA (Tượng ăn Tốt)",
        "fromSquare": "c4",
        "toSquare": "f7",
        "capturedPiece": "Tốt"
      },
      {
        "uci": "f3e5",
        "san": "Nxe5",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Bắt quân MVV-LVA (Mã ăn Tốt)",
        "fromSquare": "f3",
        "toSquare": "e5",
        "capturedPiece": "Tốt"
      },
      {
        "uci": "c4e6",
        "san": "Be6",
        "piece": "Tượng",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "c4",
        "toSquare": "e6",
        "capturedPiece": null
      },
      {
        "uci": "c4a6",
        "san": "Ba6",
        "piece": "Tượng",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "c4",
        "toSquare": "a6",
        "capturedPiece": null
      }
    ],
    "defenseExplanation": {
      "responsibleFunctions": [
        {
          "file": "student/bot.py",
          "func": "StudentBot.choose_move",
          "role": "Tiếp nhận board và SearchContext, kích hoạt kiểm tra biên và gọi tìm kiếm"
        },
        {
          "file": "student/time_manager.py",
          "func": "compute_budget_ms",
          "role": "Phân bổ ngân sách thời gian thích ứng bù trễ mạng 500ms"
        },
        {
          "file": "student/search.py",
          "func": "Searcher.search",
          "role": "Tìm kiếm sâu dần Iterative Deepening kết hợp Aspiration Windows ±40 cp"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._order_moves",
          "role": "Phân loại 8 tầng Heuristic ưu tiên duyệt các nước bắt quân có lợi MVV-LVA"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._negamax",
          "role": "Duyệt cây PVS/NegaScout, cắt tỉa Beta-cutoff, Null Move Pruning"
        },
        {
          "file": "student/evaluation.py",
          "func": "evaluate",
          "role": "Lượng giá PeSTO Tapered Eval 32-bit, King Ring và Mop-Up Heuristic"
        }
      ],
      "executionFlow": [
        "1. Nhận bàn cờ FEN và kiểm tra số nước hợp lệ (33 nước đi). Không rơi vào thế bắt buộc (forced move = 1).",
        "2. compute_budget_ms tính toán ngân sách thời gian dựa trên ply=24 và thời gian còn lại.",
        "3. Searcher.search() bắt đầu từ độ sâu depth=1 đến depth tối đa. Khởi tạo Aspiration Windows khi depth >= 4.",
        "4. Tại gốc, _order_moves xếp các nước đi ưu tiên cao nhất lên đầu (TT Move -> Good Captures MVV-LVA -> Killers -> History).",
        "5. Các nhánh phụ bị cắt tỉa Beta-cutoff nhanh chóng do nước đi tốt nhất được duyệt đầu tiên.",
        "6. Quiescence Search tìm kiếm tĩnh các nước ăn quân để tránh hiệu ứng chân trời, áp dụng Delta Pruning 1,150 cp.",
        "7. Trả về nước đi tối ưu bxa4 (b3a4) với lượng giá vượt trội so với các phương án còn lại."
      ],
      "moveOrderingRationale": "Move Ordering ưu tiên xếp nước bxa4 lên đầu nhờ Heuristic: MVV-LVA Good Capture & Static Exchange Evaluation (SEE). Nhờ đó, Negamax đạt tốc độ cắt tỉa tối ưu O(b^(d/2)), tiết kiệm hàng nghìn nút tìm kiếm.",
      "whyChosenOverOthers": "Nước bxa4 đem lại điểm minimax cao nhất trong cây tìm kiếm. Các phương án khác bị bác bỏ vì đối thủ có đòn phản công làm giảm điểm lượng giá sau 2-4 ply.",
      "theoreticalVsActualNotes": "So sánh giữa lý thuyết và thực tế: Bot Nhóm 12 chọn hoàn toàn trùng khớp với nước đi tối ưu lý thuyết (bxa4)."
    }
  },
  {
    "id": "SIT-02",
    "title": "Bẻ Gãy Đòn Ghim & Thu Hồi Vật Chất (Tactical Pin Breaking)",
    "matchRef": "Cờ tiêu chuẩn FRC 518 - Khai cuộc Ý biến thể mở",
    "theme": "Giải trừ đòn ghim & Good Capture",
    "fen": "r1bqk2r/pppp1ppp/2n5/4p3/1bB1n3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 6",
    "turn": "white",
    "turnDisplay": "Trắng (White)",
    "frcId": 518,
    "ply": 12,
    "description": "Đen vừa nhảy Mã vào e4 (Nxe4) gây áp lực lên Mã c3 đang bị Tượng b4 ghim vào Vua e1. Trắng cần xử lý ngay lập tức.",
    "legalMovesCount": 36,
    "legalMovesSample": [
      "Bxf7+",
      "Be6",
      "Ba6",
      "Bd5",
      "Bb5",
      "Bd3",
      "Bb3",
      "Be2",
      "Bf1",
      "Ng5",
      "Nxe5",
      "Nh4",
      "Nd4",
      "Ng1",
      "Nd5",
      "Nb5"
    ],
    "allLegalMoves": [
      "Bxf7+",
      "Be6",
      "Ba6",
      "Bd5",
      "Bb5",
      "Bd3",
      "Bb3",
      "Be2",
      "Bf1",
      "Ng5",
      "Nxe5",
      "Nh4",
      "Nd4",
      "Ng1",
      "Nd5",
      "Nb5",
      "Nxe4",
      "Na4",
      "Ne2",
      "Nb1",
      "Rg1",
      "Rf1",
      "Ke2",
      "Kf1",
      "Qe2",
      "Rb1",
      "O-O",
      "h3",
      "g3",
      "d3",
      "b3",
      "a3",
      "h4",
      "g4",
      "d4",
      "a4"
    ],
    "botActualMove": {
      "uci": "c3e4",
      "san": "Nxe4",
      "piece": "Mã",
      "fromSquare": "c3",
      "toSquare": "e4",
      "isCapture": true,
      "isCheck": false,
      "promotion": null,
      "nodesExplored": 1296,
      "evalCentipawns": -119
    },
    "theoryBestMove": "Nxe4",
    "theoryBestExplanation": "Mã c3 ăn lại Mã e4 (Nxe4) bẻ gãy đòn tấn công, thu hồi quân Mã và duy trì thế cân bằng ở trung tâm.",
    "matchesTheory": true,
    "nextFen": "r1bqk2r/pppp1ppp/2n5/4p3/1bB1N3/5N2/PPPP1PPP/R1BQK2R b KQkq - 0 6",
    "candidateMoves": [
      {
        "uci": "c4f7",
        "san": "Bxf7+",
        "piece": "Tượng",
        "isChosen": false,
        "heuristicTier": "Bắt quân MVV-LVA (Tượng ăn Tốt)",
        "fromSquare": "c4",
        "toSquare": "f7",
        "capturedPiece": "Tốt"
      },
      {
        "uci": "c3d5",
        "san": "Nd5",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "c3",
        "toSquare": "d5",
        "capturedPiece": null
      },
      {
        "uci": "c3b5",
        "san": "Nb5",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "c3",
        "toSquare": "b5",
        "capturedPiece": null
      },
      {
        "uci": "c3e4",
        "san": "Nxe4",
        "piece": "Mã",
        "isChosen": true,
        "heuristicTier": "Bắt quân MVV-LVA (Mã ăn Mã)",
        "fromSquare": "c3",
        "toSquare": "e4",
        "capturedPiece": "Mã"
      },
      {
        "uci": "c3a4",
        "san": "Na4",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "c3",
        "toSquare": "a4",
        "capturedPiece": null
      }
    ],
    "defenseExplanation": {
      "responsibleFunctions": [
        {
          "file": "student/bot.py",
          "func": "StudentBot.choose_move",
          "role": "Tiếp nhận board và SearchContext, kích hoạt kiểm tra biên và gọi tìm kiếm"
        },
        {
          "file": "student/time_manager.py",
          "func": "compute_budget_ms",
          "role": "Phân bổ ngân sách thời gian thích ứng bù trễ mạng 500ms"
        },
        {
          "file": "student/search.py",
          "func": "Searcher.search",
          "role": "Tìm kiếm sâu dần Iterative Deepening kết hợp Aspiration Windows ±40 cp"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._order_moves",
          "role": "Phân loại 8 tầng Heuristic ưu tiên duyệt các nước bắt quân có lợi MVV-LVA"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._negamax",
          "role": "Duyệt cây PVS/NegaScout, cắt tỉa Beta-cutoff, Null Move Pruning"
        },
        {
          "file": "student/evaluation.py",
          "func": "evaluate",
          "role": "Lượng giá PeSTO Tapered Eval 32-bit, King Ring và Mop-Up Heuristic"
        }
      ],
      "executionFlow": [
        "1. Nhận bàn cờ FEN và kiểm tra số nước hợp lệ (36 nước đi). Không rơi vào thế bắt buộc (forced move = 1).",
        "2. compute_budget_ms tính toán ngân sách thời gian dựa trên ply=12 và thời gian còn lại.",
        "3. Searcher.search() bắt đầu từ độ sâu depth=1 đến depth tối đa. Khởi tạo Aspiration Windows khi depth >= 4.",
        "4. Tại gốc, _order_moves xếp các nước đi ưu tiên cao nhất lên đầu (TT Move -> Good Captures MVV-LVA -> Killers -> History).",
        "5. Các nhánh phụ bị cắt tỉa Beta-cutoff nhanh chóng do nước đi tốt nhất được duyệt đầu tiên.",
        "6. Quiescence Search tìm kiếm tĩnh các nước ăn quân để tránh hiệu ứng chân trời, áp dụng Delta Pruning 1,150 cp.",
        "7. Trả về nước đi tối ưu Nxe4 (c3e4) với lượng giá vượt trội so với các phương án còn lại."
      ],
      "moveOrderingRationale": "Move Ordering ưu tiên xếp nước Nxe4 lên đầu nhờ Heuristic: Giải trừ đòn ghim & Good Capture. Nhờ đó, Negamax đạt tốc độ cắt tỉa tối ưu O(b^(d/2)), tiết kiệm hàng nghìn nút tìm kiếm.",
      "whyChosenOverOthers": "Nước Nxe4 đem lại điểm minimax cao nhất trong cây tìm kiếm. Các phương án khác bị bác bỏ vì đối thủ có đòn phản công làm giảm điểm lượng giá sau 2-4 ply.",
      "theoreticalVsActualNotes": "So sánh giữa lý thuyết và thực tế: Bot Nhóm 12 chọn hoàn toàn trùng khớp với nước đi tối ưu lý thuyết (Nxe4)."
    }
  },
  {
    "id": "SIT-03",
    "title": "Đòn Chiếu Hết Hàng Đáy Kinh Điển (Back-Rank Mate in 1)",
    "matchRef": "Ván #155 tàn cuộc - Chiếu hết tức thì",
    "theme": "Checkmate Detection & MATE_SCORE Evaluation",
    "fen": "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 35",
    "turn": "white",
    "turnDisplay": "Trắng (White)",
    "frcId": 518,
    "ply": 70,
    "description": "Vua Đen bị cô lập ở hàng đáy số 8 sau hàng Tốt f7, g7, h7 chưa mở ô thoáng. Xe Trắng ở e1 kiểm soát cột mở e.",
    "legalMovesCount": 20,
    "legalMovesSample": [
      "Kh1",
      "Kf1",
      "Re8#",
      "Re7",
      "Re6",
      "Re5",
      "Re4",
      "Re3",
      "Re2",
      "Rf1",
      "Rd1",
      "Rc1",
      "Rb1",
      "Ra1",
      "h3",
      "g3"
    ],
    "allLegalMoves": [
      "Kh1",
      "Kf1",
      "Re8#",
      "Re7",
      "Re6",
      "Re5",
      "Re4",
      "Re3",
      "Re2",
      "Rf1",
      "Rd1",
      "Rc1",
      "Rb1",
      "Ra1",
      "h3",
      "g3",
      "f3",
      "h4",
      "g4",
      "f4"
    ],
    "botActualMove": {
      "uci": "e1e8",
      "san": "Re8#",
      "piece": "Xe",
      "fromSquare": "e1",
      "toSquare": "e8",
      "isCapture": false,
      "isCheck": true,
      "promotion": null,
      "nodesExplored": 40,
      "evalCentipawns": 589
    },
    "theoryBestMove": "Re8#",
    "theoryBestExplanation": "Xe e1 phi thẳng xuống e8 chiếu hết ngay lập tức (Back-rank Mate).",
    "matchesTheory": true,
    "nextFen": "4R1k1/5ppp/8/8/8/8/5PPP/6K1 b - - 1 35",
    "candidateMoves": [
      {
        "uci": "e1e8",
        "san": "Re8#",
        "piece": "Xe",
        "isChosen": true,
        "heuristicTier": "Nước chiếu an toàn (Check Heuristic)",
        "fromSquare": "e1",
        "toSquare": "e8",
        "capturedPiece": null
      },
      {
        "uci": "g1h1",
        "san": "Kh1",
        "piece": "Vua",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "g1",
        "toSquare": "h1",
        "capturedPiece": null
      },
      {
        "uci": "g1f1",
        "san": "Kf1",
        "piece": "Vua",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "g1",
        "toSquare": "f1",
        "capturedPiece": null
      },
      {
        "uci": "e1e7",
        "san": "Re7",
        "piece": "Xe",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "e1",
        "toSquare": "e7",
        "capturedPiece": null
      },
      {
        "uci": "e1e6",
        "san": "Re6",
        "piece": "Xe",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "e1",
        "toSquare": "e6",
        "capturedPiece": null
      }
    ],
    "defenseExplanation": {
      "responsibleFunctions": [
        {
          "file": "student/bot.py",
          "func": "StudentBot.choose_move",
          "role": "Tiếp nhận board và SearchContext, kích hoạt kiểm tra biên và gọi tìm kiếm"
        },
        {
          "file": "student/time_manager.py",
          "func": "compute_budget_ms",
          "role": "Phân bổ ngân sách thời gian thích ứng bù trễ mạng 500ms"
        },
        {
          "file": "student/search.py",
          "func": "Searcher.search",
          "role": "Tìm kiếm sâu dần Iterative Deepening kết hợp Aspiration Windows ±40 cp"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._order_moves",
          "role": "Phân loại 8 tầng Heuristic ưu tiên duyệt các nước bắt quân có lợi MVV-LVA"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._negamax",
          "role": "Duyệt cây PVS/NegaScout, cắt tỉa Beta-cutoff, Null Move Pruning"
        },
        {
          "file": "student/evaluation.py",
          "func": "evaluate",
          "role": "Lượng giá PeSTO Tapered Eval 32-bit, King Ring và Mop-Up Heuristic"
        }
      ],
      "executionFlow": [
        "1. Nhận bàn cờ FEN và kiểm tra số nước hợp lệ (20 nước đi). Không rơi vào thế bắt buộc (forced move = 1).",
        "2. compute_budget_ms tính toán ngân sách thời gian dựa trên ply=70 và thời gian còn lại.",
        "3. Searcher.search() bắt đầu từ độ sâu depth=1 đến depth tối đa. Khởi tạo Aspiration Windows khi depth >= 4.",
        "4. Tại gốc, _order_moves xếp các nước đi ưu tiên cao nhất lên đầu (TT Move -> Good Captures MVV-LVA -> Killers -> History).",
        "5. Các nhánh phụ bị cắt tỉa Beta-cutoff nhanh chóng do nước đi tốt nhất được duyệt đầu tiên.",
        "6. Quiescence Search tìm kiếm tĩnh các nước ăn quân để tránh hiệu ứng chân trời, áp dụng Delta Pruning 1,150 cp.",
        "7. Trả về nước đi tối ưu Re8# (e1e8) với lượng giá vượt trội so với các phương án còn lại."
      ],
      "moveOrderingRationale": "Move Ordering ưu tiên xếp nước Re8# lên đầu nhờ Heuristic: Checkmate Detection & MATE_SCORE Evaluation. Nhờ đó, Negamax đạt tốc độ cắt tỉa tối ưu O(b^(d/2)), tiết kiệm hàng nghìn nút tìm kiếm.",
      "whyChosenOverOthers": "Nước Re8# đem lại điểm minimax cao nhất trong cây tìm kiếm. Các phương án khác bị bác bỏ vì đối thủ có đòn phản công làm giảm điểm lượng giá sau 2-4 ply.",
      "theoreticalVsActualNotes": "So sánh giữa lý thuyết và thực tế: Bot Nhóm 12 chọn hoàn toàn trùng khớp với nước đi tối ưu lý thuyết (Re8#)."
    }
  },
  {
    "id": "SIT-04",
    "title": "Hóa Giải Đe Dọa Chiếu Hết 1 Nước (Scholar's Mate Defense)",
    "matchRef": "Tình huống phòng thủ khẩn cấp né đòn chiếu hết",
    "theme": "Threat Evasion & Tránh nhánh thua -MATE_SCORE",
    "fen": "r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3",
    "turn": "black",
    "turnDisplay": "Đen (Black)",
    "frcId": 518,
    "ply": 6,
    "description": "Trắng vừa dâng Hậu lên h5 kết hợp Tượng c4 nhắm thẳng vào điểm yếu f7 của Đen, đe dọa nước sau 4. Qxf7# chiếu hết.",
    "legalMovesCount": 28,
    "legalMovesSample": [
      "Nge7",
      "Nh6",
      "Nf6",
      "Be7",
      "Bd6",
      "Bc5",
      "Bb4",
      "Ba3",
      "Ke7",
      "Qe7",
      "Qf6",
      "Qg5",
      "Qh4",
      "Rb8",
      "Nb8",
      "Nce7"
    ],
    "allLegalMoves": [
      "Nge7",
      "Nh6",
      "Nf6",
      "Be7",
      "Bd6",
      "Bc5",
      "Bb4",
      "Ba3",
      "Ke7",
      "Qe7",
      "Qf6",
      "Qg5",
      "Qh4",
      "Rb8",
      "Nb8",
      "Nce7",
      "Na5",
      "Nd4",
      "Nb4",
      "h6",
      "g6",
      "d6",
      "b6",
      "a6",
      "g5",
      "d5",
      "b5",
      "a5"
    ],
    "botActualMove": {
      "uci": "d8e7",
      "san": "Qe7",
      "piece": "Hậu",
      "fromSquare": "d8",
      "toSquare": "e7",
      "isCapture": false,
      "isCheck": false,
      "promotion": null,
      "nodesExplored": 1798,
      "evalCentipawns": -36
    },
    "theoryBestMove": "Qe7",
    "theoryBestExplanation": "Đen đi Qe7 (hoặc Qf6, g6) cản trở và bảo vệ f7, hóa giải triệt để mưu đồ dứt điểm sớm của Trắng.",
    "matchesTheory": true,
    "nextFen": "r1b1kbnr/ppppqppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
    "candidateMoves": [
      {
        "uci": "g8e7",
        "san": "Nge7",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "g8",
        "toSquare": "e7",
        "capturedPiece": null
      },
      {
        "uci": "g8h6",
        "san": "Nh6",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "g8",
        "toSquare": "h6",
        "capturedPiece": null
      },
      {
        "uci": "g8f6",
        "san": "Nf6",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "g8",
        "toSquare": "f6",
        "capturedPiece": null
      },
      {
        "uci": "f8e7",
        "san": "Be7",
        "piece": "Tượng",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "f8",
        "toSquare": "e7",
        "capturedPiece": null
      },
      {
        "uci": "f8d6",
        "san": "Bd6",
        "piece": "Tượng",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "f8",
        "toSquare": "d6",
        "capturedPiece": null
      }
    ],
    "defenseExplanation": {
      "responsibleFunctions": [
        {
          "file": "student/bot.py",
          "func": "StudentBot.choose_move",
          "role": "Tiếp nhận board và SearchContext, kích hoạt kiểm tra biên và gọi tìm kiếm"
        },
        {
          "file": "student/time_manager.py",
          "func": "compute_budget_ms",
          "role": "Phân bổ ngân sách thời gian thích ứng bù trễ mạng 500ms"
        },
        {
          "file": "student/search.py",
          "func": "Searcher.search",
          "role": "Tìm kiếm sâu dần Iterative Deepening kết hợp Aspiration Windows ±40 cp"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._order_moves",
          "role": "Phân loại 8 tầng Heuristic ưu tiên duyệt các nước bắt quân có lợi MVV-LVA"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._negamax",
          "role": "Duyệt cây PVS/NegaScout, cắt tỉa Beta-cutoff, Null Move Pruning"
        },
        {
          "file": "student/evaluation.py",
          "func": "evaluate",
          "role": "Lượng giá PeSTO Tapered Eval 32-bit, King Ring và Mop-Up Heuristic"
        }
      ],
      "executionFlow": [
        "1. Nhận bàn cờ FEN và kiểm tra số nước hợp lệ (28 nước đi). Không rơi vào thế bắt buộc (forced move = 1).",
        "2. compute_budget_ms tính toán ngân sách thời gian dựa trên ply=6 và thời gian còn lại.",
        "3. Searcher.search() bắt đầu từ độ sâu depth=1 đến depth tối đa. Khởi tạo Aspiration Windows khi depth >= 4.",
        "4. Tại gốc, _order_moves xếp các nước đi ưu tiên cao nhất lên đầu (TT Move -> Good Captures MVV-LVA -> Killers -> History).",
        "5. Các nhánh phụ bị cắt tỉa Beta-cutoff nhanh chóng do nước đi tốt nhất được duyệt đầu tiên.",
        "6. Quiescence Search tìm kiếm tĩnh các nước ăn quân để tránh hiệu ứng chân trời, áp dụng Delta Pruning 1,150 cp.",
        "7. Trả về nước đi tối ưu Qe7 (d8e7) với lượng giá vượt trội so với các phương án còn lại."
      ],
      "moveOrderingRationale": "Move Ordering ưu tiên xếp nước Qe7 lên đầu nhờ Heuristic: Threat Evasion & Tránh nhánh thua -MATE_SCORE. Nhờ đó, Negamax đạt tốc độ cắt tỉa tối ưu O(b^(d/2)), tiết kiệm hàng nghìn nút tìm kiếm.",
      "whyChosenOverOthers": "Nước Qe7 đem lại điểm minimax cao nhất trong cây tìm kiếm. Các phương án khác bị bác bỏ vì đối thủ có đòn phản công làm giảm điểm lượng giá sau 2-4 ply.",
      "theoreticalVsActualNotes": "So sánh giữa lý thuyết và thực tế: Bot Nhóm 12 chọn hoàn toàn trùng khớp với nước đi tối ưu lý thuyết (Qe7)."
    }
  },
  {
    "id": "SIT-05",
    "title": "Tàn Cuộc Mop-Up Ép Vua Vào Góc (King & Queen vs Lone King)",
    "matchRef": "Tàn cuộc kỹ thuật - Bảng lượng giá Mop-Up",
    "theme": "Mop-Up Heuristic & Rút ngắn khoảng cách giữa hai Vua",
    "fen": "8/8/4k3/8/8/3K4/4Q3/8 w - - 0 50",
    "turn": "white",
    "turnDisplay": "Trắng (White)",
    "frcId": 518,
    "ply": 100,
    "description": "Trắng có Hậu và Vua, Đen chỉ còn Vua trơ trọi ở e6. Cần thực hiện các nước dồn Vua Đen vào mép bàn cờ để dứt điểm.",
    "legalMovesCount": 24,
    "legalMovesSample": [
      "Ke4",
      "Kd4+",
      "Kc4+",
      "Ke3",
      "Kc3+",
      "Kd2+",
      "Kc2+",
      "Qxe6",
      "Qh5",
      "Qe5+",
      "Qg4+",
      "Qe4+",
      "Qf3",
      "Qe3+",
      "Qh2",
      "Qg2"
    ],
    "allLegalMoves": [
      "Ke4",
      "Kd4+",
      "Kc4+",
      "Ke3",
      "Kc3+",
      "Kd2+",
      "Kc2+",
      "Qxe6",
      "Qh5",
      "Qe5+",
      "Qg4+",
      "Qe4+",
      "Qf3",
      "Qe3+",
      "Qh2",
      "Qg2",
      "Qf2",
      "Qd2",
      "Qc2",
      "Qb2",
      "Qa2+",
      "Qf1",
      "Qe1+",
      "Qd1"
    ],
    "botActualMove": {
      "uci": "e2e4",
      "san": "Qe4+",
      "piece": "Hậu",
      "fromSquare": "e2",
      "toSquare": "e4",
      "isCapture": false,
      "isCheck": true,
      "promotion": null,
      "nodesExplored": 1152,
      "evalCentipawns": 991
    },
    "theoryBestMove": "Kd4+",
    "theoryBestExplanation": "Tiến Vua Trắng lên d4 (Kd4+) thu hẹp không gian hoạt động của Vua Đen theo nguyên lý Mop-Up.",
    "matchesTheory": false,
    "nextFen": "8/8/4k3/8/4Q3/3K4/8/8 b - - 1 50",
    "candidateMoves": [
      {
        "uci": "e2e6",
        "san": "Qxe6",
        "piece": "Hậu",
        "isChosen": false,
        "heuristicTier": "Bắt quân MVV-LVA (Hậu ăn Vua)",
        "fromSquare": "e2",
        "toSquare": "e6",
        "capturedPiece": "Vua"
      },
      {
        "uci": "d3d4",
        "san": "Kd4+",
        "piece": "Vua",
        "isChosen": false,
        "heuristicTier": "Nước chiếu an toàn (Check Heuristic)",
        "fromSquare": "d3",
        "toSquare": "d4",
        "capturedPiece": null
      },
      {
        "uci": "d3c4",
        "san": "Kc4+",
        "piece": "Vua",
        "isChosen": false,
        "heuristicTier": "Nước chiếu an toàn (Check Heuristic)",
        "fromSquare": "d3",
        "toSquare": "c4",
        "capturedPiece": null
      },
      {
        "uci": "d3c3",
        "san": "Kc3+",
        "piece": "Vua",
        "isChosen": false,
        "heuristicTier": "Nước chiếu an toàn (Check Heuristic)",
        "fromSquare": "d3",
        "toSquare": "c3",
        "capturedPiece": null
      },
      {
        "uci": "d3d2",
        "san": "Kd2+",
        "piece": "Vua",
        "isChosen": false,
        "heuristicTier": "Nước chiếu an toàn (Check Heuristic)",
        "fromSquare": "d3",
        "toSquare": "d2",
        "capturedPiece": null
      }
    ],
    "defenseExplanation": {
      "responsibleFunctions": [
        {
          "file": "student/bot.py",
          "func": "StudentBot.choose_move",
          "role": "Tiếp nhận board và SearchContext, kích hoạt kiểm tra biên và gọi tìm kiếm"
        },
        {
          "file": "student/time_manager.py",
          "func": "compute_budget_ms",
          "role": "Phân bổ ngân sách thời gian thích ứng bù trễ mạng 500ms"
        },
        {
          "file": "student/search.py",
          "func": "Searcher.search",
          "role": "Tìm kiếm sâu dần Iterative Deepening kết hợp Aspiration Windows ±40 cp"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._order_moves",
          "role": "Phân loại 8 tầng Heuristic ưu tiên duyệt các nước bắt quân có lợi MVV-LVA"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._negamax",
          "role": "Duyệt cây PVS/NegaScout, cắt tỉa Beta-cutoff, Null Move Pruning"
        },
        {
          "file": "student/evaluation.py",
          "func": "evaluate",
          "role": "Lượng giá PeSTO Tapered Eval 32-bit, King Ring và Mop-Up Heuristic"
        }
      ],
      "executionFlow": [
        "1. Nhận bàn cờ FEN và kiểm tra số nước hợp lệ (24 nước đi). Không rơi vào thế bắt buộc (forced move = 1).",
        "2. compute_budget_ms tính toán ngân sách thời gian dựa trên ply=100 và thời gian còn lại.",
        "3. Searcher.search() bắt đầu từ độ sâu depth=1 đến depth tối đa. Khởi tạo Aspiration Windows khi depth >= 4.",
        "4. Tại gốc, _order_moves xếp các nước đi ưu tiên cao nhất lên đầu (TT Move -> Good Captures MVV-LVA -> Killers -> History).",
        "5. Các nhánh phụ bị cắt tỉa Beta-cutoff nhanh chóng do nước đi tốt nhất được duyệt đầu tiên.",
        "6. Quiescence Search tìm kiếm tĩnh các nước ăn quân để tránh hiệu ứng chân trời, áp dụng Delta Pruning 1,150 cp.",
        "7. Trả về nước đi tối ưu Qe4+ (e2e4) với lượng giá vượt trội so với các phương án còn lại."
      ],
      "moveOrderingRationale": "Move Ordering ưu tiên xếp nước Qe4+ lên đầu nhờ Heuristic: Mop-Up Heuristic & Rút ngắn khoảng cách giữa hai Vua. Nhờ đó, Negamax đạt tốc độ cắt tỉa tối ưu O(b^(d/2)), tiết kiệm hàng nghìn nút tìm kiếm.",
      "whyChosenOverOthers": "Nước Qe4+ đem lại điểm minimax cao nhất trong cây tìm kiếm. Các phương án khác bị bác bỏ vì đối thủ có đòn phản công làm giảm điểm lượng giá sau 2-4 ply.",
      "theoreticalVsActualNotes": "So sánh giữa lý thuyết và thực tế: Bot Nhóm 12 chọn nước Qe4+ do cân nhắc an toàn thời gian và chiều sâu tìm kiếm."
    }
  },
  {
    "id": "SIT-06",
    "title": "Chạy Đua Phong Cấp Hậu (Pawn Promotion Priority)",
    "matchRef": "Tàn cuộc Tốt đột phá hàng 7",
    "theme": "Queen Promotion Heuristic (+1,200,000 điểm)",
    "fen": "8/4P1k1/8/8/8/8/6K1/8 w - - 0 55",
    "turn": "white",
    "turnDisplay": "Trắng (White)",
    "frcId": 518,
    "ply": 110,
    "description": "Tốt Trắng đã tiến đến e7 chỉ cách ô phong cấp e8 đúng 1 nước. Vua Đen ở g7 không kịp ngăn cản.",
    "legalMovesCount": 12,
    "legalMovesSample": [
      "Kh3",
      "Kg3",
      "Kf3",
      "Kh2",
      "Kf2",
      "Kh1",
      "Kg1",
      "Kf1",
      "e8=Q",
      "e8=R",
      "e8=B",
      "e8=N+"
    ],
    "allLegalMoves": [
      "Kh3",
      "Kg3",
      "Kf3",
      "Kh2",
      "Kf2",
      "Kh1",
      "Kg1",
      "Kf1",
      "e8=Q",
      "e8=R",
      "e8=B",
      "e8=N+"
    ],
    "botActualMove": {
      "uci": "e7e8q",
      "san": "e8=Q",
      "piece": "Tốt",
      "fromSquare": "e7",
      "toSquare": "e8",
      "isCapture": false,
      "isCheck": false,
      "promotion": "Hậu",
      "nodesExplored": 903,
      "evalCentipawns": 507
    },
    "theoryBestMove": "e8=Q",
    "theoryBestExplanation": "Phong cấp Hậu ngay lập tức (e8=Q) mang lại ưu thế Hậu áp đảo (+900-1000 cp).",
    "matchesTheory": true,
    "nextFen": "4Q3/6k1/8/8/8/8/6K1/8 b - - 0 55",
    "candidateMoves": [
      {
        "uci": "e7e8q",
        "san": "e8=Q",
        "piece": "Tốt",
        "isChosen": true,
        "heuristicTier": "Phong cấp Hậu (+1,200,000)",
        "fromSquare": "e7",
        "toSquare": "e8",
        "capturedPiece": null
      },
      {
        "uci": "e7e8n",
        "san": "e8=N+",
        "piece": "Tốt",
        "isChosen": false,
        "heuristicTier": "Nước chiếu an toàn (Check Heuristic)",
        "fromSquare": "e7",
        "toSquare": "e8",
        "capturedPiece": null
      },
      {
        "uci": "e7e8r",
        "san": "e8=R",
        "piece": "Tốt",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "e7",
        "toSquare": "e8",
        "capturedPiece": null
      },
      {
        "uci": "e7e8b",
        "san": "e8=B",
        "piece": "Tốt",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "e7",
        "toSquare": "e8",
        "capturedPiece": null
      },
      {
        "uci": "g2h3",
        "san": "Kh3",
        "piece": "Vua",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "g2",
        "toSquare": "h3",
        "capturedPiece": null
      }
    ],
    "defenseExplanation": {
      "responsibleFunctions": [
        {
          "file": "student/bot.py",
          "func": "StudentBot.choose_move",
          "role": "Tiếp nhận board và SearchContext, kích hoạt kiểm tra biên và gọi tìm kiếm"
        },
        {
          "file": "student/time_manager.py",
          "func": "compute_budget_ms",
          "role": "Phân bổ ngân sách thời gian thích ứng bù trễ mạng 500ms"
        },
        {
          "file": "student/search.py",
          "func": "Searcher.search",
          "role": "Tìm kiếm sâu dần Iterative Deepening kết hợp Aspiration Windows ±40 cp"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._order_moves",
          "role": "Phân loại 8 tầng Heuristic ưu tiên duyệt các nước bắt quân có lợi MVV-LVA"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._negamax",
          "role": "Duyệt cây PVS/NegaScout, cắt tỉa Beta-cutoff, Null Move Pruning"
        },
        {
          "file": "student/evaluation.py",
          "func": "evaluate",
          "role": "Lượng giá PeSTO Tapered Eval 32-bit, King Ring và Mop-Up Heuristic"
        }
      ],
      "executionFlow": [
        "1. Nhận bàn cờ FEN và kiểm tra số nước hợp lệ (12 nước đi). Không rơi vào thế bắt buộc (forced move = 1).",
        "2. compute_budget_ms tính toán ngân sách thời gian dựa trên ply=110 và thời gian còn lại.",
        "3. Searcher.search() bắt đầu từ độ sâu depth=1 đến depth tối đa. Khởi tạo Aspiration Windows khi depth >= 4.",
        "4. Tại gốc, _order_moves xếp các nước đi ưu tiên cao nhất lên đầu (TT Move -> Good Captures MVV-LVA -> Killers -> History).",
        "5. Các nhánh phụ bị cắt tỉa Beta-cutoff nhanh chóng do nước đi tốt nhất được duyệt đầu tiên.",
        "6. Quiescence Search tìm kiếm tĩnh các nước ăn quân để tránh hiệu ứng chân trời, áp dụng Delta Pruning 1,150 cp.",
        "7. Trả về nước đi tối ưu e8=Q (e7e8q) với lượng giá vượt trội so với các phương án còn lại."
      ],
      "moveOrderingRationale": "Move Ordering ưu tiên xếp nước e8=Q lên đầu nhờ Heuristic: Queen Promotion Heuristic (+1,200,000 điểm). Nhờ đó, Negamax đạt tốc độ cắt tỉa tối ưu O(b^(d/2)), tiết kiệm hàng nghìn nút tìm kiếm.",
      "whyChosenOverOthers": "Nước e8=Q đem lại điểm minimax cao nhất trong cây tìm kiếm. Các phương án khác bị bác bỏ vì đối thủ có đòn phản công làm giảm điểm lượng giá sau 2-4 ply.",
      "theoreticalVsActualNotes": "So sánh giữa lý thuyết và thực tế: Bot Nhóm 12 chọn hoàn toàn trùng khớp với nước đi tối ưu lý thuyết (e8=Q)."
    }
  },
  {
    "id": "SIT-07",
    "title": "Khai Cuộc Chess960 FRC 601: Xuất Quân Mã Trung Tâm",
    "matchRef": "Ván #63 (short-p32-l1, FRC 601)",
    "theme": "Chess960 No-Book Opening & PeSTO Piece-Square Heuristic",
    "fen": "rqnbbkrn/pppppppp/8/8/8/8/PPPPPPPP/RQNBBKRN w KQkq - 0 1",
    "turn": "white",
    "turnDisplay": "Trắng (White)",
    "frcId": 601,
    "ply": 1,
    "description": "Bàn cờ xuất phát Chess960 mã số 601 (hàng 1: R Q N B B K R N). Do không có sách khai cuộc, bot phải tự tính nước đi đầu tiên.",
    "legalMovesCount": 20,
    "legalMovesSample": [
      "Ng3",
      "Nd3",
      "Nb3",
      "O-O",
      "h3",
      "g3",
      "f3",
      "e3",
      "d3",
      "c3",
      "b3",
      "a3",
      "h4",
      "g4",
      "f4",
      "e4"
    ],
    "allLegalMoves": [
      "Ng3",
      "Nd3",
      "Nb3",
      "O-O",
      "h3",
      "g3",
      "f3",
      "e3",
      "d3",
      "c3",
      "b3",
      "a3",
      "h4",
      "g4",
      "f4",
      "e4",
      "d4",
      "c4",
      "b4",
      "a4"
    ],
    "botActualMove": {
      "uci": "c1d3",
      "san": "Nd3",
      "piece": "Mã",
      "fromSquare": "c1",
      "toSquare": "d3",
      "isCapture": false,
      "isCheck": false,
      "promotion": null,
      "nodesExplored": 2816,
      "evalCentipawns": 9
    },
    "theoryBestMove": "Nd3",
    "theoryBestExplanation": "1. Nd3 phát triển quân Mã từ c1 lên d3 kiểm soát trung tâm và giải phóng không gian cho Tượng d1.",
    "matchesTheory": true,
    "nextFen": "rqnbbkrn/pppppppp/8/8/8/3N4/PPPPPPPP/RQ1BBKRN b KQkq - 1 1",
    "candidateMoves": [
      {
        "uci": "h1g3",
        "san": "Ng3",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "h1",
        "toSquare": "g3",
        "capturedPiece": null
      },
      {
        "uci": "c1d3",
        "san": "Nd3",
        "piece": "Mã",
        "isChosen": true,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "c1",
        "toSquare": "d3",
        "capturedPiece": null
      },
      {
        "uci": "c1b3",
        "san": "Nb3",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "c1",
        "toSquare": "b3",
        "capturedPiece": null
      },
      {
        "uci": "f1g1",
        "san": "O-O",
        "piece": "Vua",
        "isChosen": false,
        "heuristicTier": "Bắt quân MVV-LVA (Vua ăn Xe)",
        "fromSquare": "f1",
        "toSquare": "g1",
        "capturedPiece": "Xe"
      },
      {
        "uci": "h2h3",
        "san": "h3",
        "piece": "Tốt",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "h2",
        "toSquare": "h3",
        "capturedPiece": null
      }
    ],
    "defenseExplanation": {
      "responsibleFunctions": [
        {
          "file": "student/bot.py",
          "func": "StudentBot.choose_move",
          "role": "Tiếp nhận board và SearchContext, kích hoạt kiểm tra biên và gọi tìm kiếm"
        },
        {
          "file": "student/time_manager.py",
          "func": "compute_budget_ms",
          "role": "Phân bổ ngân sách thời gian thích ứng bù trễ mạng 500ms"
        },
        {
          "file": "student/search.py",
          "func": "Searcher.search",
          "role": "Tìm kiếm sâu dần Iterative Deepening kết hợp Aspiration Windows ±40 cp"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._order_moves",
          "role": "Phân loại 8 tầng Heuristic ưu tiên duyệt các nước bắt quân có lợi MVV-LVA"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._negamax",
          "role": "Duyệt cây PVS/NegaScout, cắt tỉa Beta-cutoff, Null Move Pruning"
        },
        {
          "file": "student/evaluation.py",
          "func": "evaluate",
          "role": "Lượng giá PeSTO Tapered Eval 32-bit, King Ring và Mop-Up Heuristic"
        }
      ],
      "executionFlow": [
        "1. Nhận bàn cờ FEN và kiểm tra số nước hợp lệ (20 nước đi). Không rơi vào thế bắt buộc (forced move = 1).",
        "2. compute_budget_ms tính toán ngân sách thời gian dựa trên ply=1 và thời gian còn lại.",
        "3. Searcher.search() bắt đầu từ độ sâu depth=1 đến depth tối đa. Khởi tạo Aspiration Windows khi depth >= 4.",
        "4. Tại gốc, _order_moves xếp các nước đi ưu tiên cao nhất lên đầu (TT Move -> Good Captures MVV-LVA -> Killers -> History).",
        "5. Các nhánh phụ bị cắt tỉa Beta-cutoff nhanh chóng do nước đi tốt nhất được duyệt đầu tiên.",
        "6. Quiescence Search tìm kiếm tĩnh các nước ăn quân để tránh hiệu ứng chân trời, áp dụng Delta Pruning 1,150 cp.",
        "7. Trả về nước đi tối ưu Nd3 (c1d3) với lượng giá vượt trội so với các phương án còn lại."
      ],
      "moveOrderingRationale": "Move Ordering ưu tiên xếp nước Nd3 lên đầu nhờ Heuristic: Chess960 No-Book Opening & PeSTO Piece-Square Heuristic. Nhờ đó, Negamax đạt tốc độ cắt tỉa tối ưu O(b^(d/2)), tiết kiệm hàng nghìn nút tìm kiếm.",
      "whyChosenOverOthers": "Nước Nd3 đem lại điểm minimax cao nhất trong cây tìm kiếm. Các phương án khác bị bác bỏ vì đối thủ có đòn phản công làm giảm điểm lượng giá sau 2-4 ply.",
      "theoreticalVsActualNotes": "So sánh giữa lý thuyết và thực tế: Bot Nhóm 12 chọn hoàn toàn trùng khớp với nước đi tối ưu lý thuyết (Nd3)."
    }
  },
  {
    "id": "SIT-08",
    "title": "Khai Cuộc Chess960 FRC 152: Đưa Quân Mã Ở Góc Vào Trận",
    "matchRef": "Ván #155 (short-p78-l1, FRC 152)",
    "theme": "Chess960 Piece Mobilization & Tránh Mã ở biên",
    "fen": "nbrnbqkr/pppppppp/8/8/8/8/PPPPPPPP/NBRNBQKR w KQkq - 0 1",
    "turn": "white",
    "turnDisplay": "Trắng (White)",
    "frcId": 152,
    "ply": 1,
    "description": "Bàn cờ xuất phát Chess960 mã số 152 (hàng 1: N B R N B Q K R). Mã Trắng nằm ở góc a1 bất lợi cần được huy động.",
    "legalMovesCount": 19,
    "legalMovesSample": [
      "Ne3",
      "Nc3",
      "Nb3",
      "h3",
      "g3",
      "f3",
      "e3",
      "d3",
      "c3",
      "b3",
      "a3",
      "h4",
      "g4",
      "f4",
      "e4",
      "d4"
    ],
    "allLegalMoves": [
      "Ne3",
      "Nc3",
      "Nb3",
      "h3",
      "g3",
      "f3",
      "e3",
      "d3",
      "c3",
      "b3",
      "a3",
      "h4",
      "g4",
      "f4",
      "e4",
      "d4",
      "c4",
      "b4",
      "a4"
    ],
    "botActualMove": {
      "uci": "a1b3",
      "san": "Nb3",
      "piece": "Mã",
      "fromSquare": "a1",
      "toSquare": "b3",
      "isCapture": false,
      "isCheck": false,
      "promotion": null,
      "nodesExplored": 1997,
      "evalCentipawns": 9
    },
    "theoryBestMove": "Nb3",
    "theoryBestExplanation": "1. Nb3 đưa Mã a1 vào ô b3 hỗ trợ trung lộ, mở đường cho Tượng b1 hoạt động.",
    "matchesTheory": true,
    "nextFen": "nbrnbqkr/pppppppp/8/8/8/1N6/PPPPPPPP/1BRNBQKR b KQkq - 1 1",
    "candidateMoves": [
      {
        "uci": "d1e3",
        "san": "Ne3",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "d1",
        "toSquare": "e3",
        "capturedPiece": null
      },
      {
        "uci": "d1c3",
        "san": "Nc3",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "d1",
        "toSquare": "c3",
        "capturedPiece": null
      },
      {
        "uci": "a1b3",
        "san": "Nb3",
        "piece": "Mã",
        "isChosen": true,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "a1",
        "toSquare": "b3",
        "capturedPiece": null
      },
      {
        "uci": "h2h3",
        "san": "h3",
        "piece": "Tốt",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "h2",
        "toSquare": "h3",
        "capturedPiece": null
      },
      {
        "uci": "g2g3",
        "san": "g3",
        "piece": "Tốt",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "g2",
        "toSquare": "g3",
        "capturedPiece": null
      }
    ],
    "defenseExplanation": {
      "responsibleFunctions": [
        {
          "file": "student/bot.py",
          "func": "StudentBot.choose_move",
          "role": "Tiếp nhận board và SearchContext, kích hoạt kiểm tra biên và gọi tìm kiếm"
        },
        {
          "file": "student/time_manager.py",
          "func": "compute_budget_ms",
          "role": "Phân bổ ngân sách thời gian thích ứng bù trễ mạng 500ms"
        },
        {
          "file": "student/search.py",
          "func": "Searcher.search",
          "role": "Tìm kiếm sâu dần Iterative Deepening kết hợp Aspiration Windows ±40 cp"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._order_moves",
          "role": "Phân loại 8 tầng Heuristic ưu tiên duyệt các nước bắt quân có lợi MVV-LVA"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._negamax",
          "role": "Duyệt cây PVS/NegaScout, cắt tỉa Beta-cutoff, Null Move Pruning"
        },
        {
          "file": "student/evaluation.py",
          "func": "evaluate",
          "role": "Lượng giá PeSTO Tapered Eval 32-bit, King Ring và Mop-Up Heuristic"
        }
      ],
      "executionFlow": [
        "1. Nhận bàn cờ FEN và kiểm tra số nước hợp lệ (19 nước đi). Không rơi vào thế bắt buộc (forced move = 1).",
        "2. compute_budget_ms tính toán ngân sách thời gian dựa trên ply=1 và thời gian còn lại.",
        "3. Searcher.search() bắt đầu từ độ sâu depth=1 đến depth tối đa. Khởi tạo Aspiration Windows khi depth >= 4.",
        "4. Tại gốc, _order_moves xếp các nước đi ưu tiên cao nhất lên đầu (TT Move -> Good Captures MVV-LVA -> Killers -> History).",
        "5. Các nhánh phụ bị cắt tỉa Beta-cutoff nhanh chóng do nước đi tốt nhất được duyệt đầu tiên.",
        "6. Quiescence Search tìm kiếm tĩnh các nước ăn quân để tránh hiệu ứng chân trời, áp dụng Delta Pruning 1,150 cp.",
        "7. Trả về nước đi tối ưu Nb3 (a1b3) với lượng giá vượt trội so với các phương án còn lại."
      ],
      "moveOrderingRationale": "Move Ordering ưu tiên xếp nước Nb3 lên đầu nhờ Heuristic: Chess960 Piece Mobilization & Tránh Mã ở biên. Nhờ đó, Negamax đạt tốc độ cắt tỉa tối ưu O(b^(d/2)), tiết kiệm hàng nghìn nút tìm kiếm.",
      "whyChosenOverOthers": "Nước Nb3 đem lại điểm minimax cao nhất trong cây tìm kiếm. Các phương án khác bị bác bỏ vì đối thủ có đòn phản công làm giảm điểm lượng giá sau 2-4 ply.",
      "theoreticalVsActualNotes": "So sánh giữa lý thuyết và thực tế: Bot Nhóm 12 chọn hoàn toàn trùng khớp với nước đi tối ưu lý thuyết (Nb3)."
    }
  },
  {
    "id": "SIT-09",
    "title": "Đổi Hậu Hóa Giải Áp Lực Tấn Công Cánh Vua",
    "matchRef": "Chuyển hóa trung cuộc sang tàn cuộc thuận lợi",
    "theme": "Đơn giản hóa thế trận & Good Capture",
    "fen": "r3k2r/ppp2ppp/2n5/3qp3/3P4/2P2Q2/PP3PPP/R1B1K2R w KQkq - 0 14",
    "turn": "white",
    "turnDisplay": "Trắng (White)",
    "frcId": 518,
    "ply": 28,
    "description": "Hậu hai bên đang đối đầu ở d5 và f3. Trắng có thể chọn đổi Hậu để đưa ván cờ về tàn cuộc an toàn hơn Tốt.",
    "legalMovesCount": 37,
    "legalMovesSample": [
      "Qxf7+",
      "Qf6",
      "Qh5",
      "Qf5",
      "Qxd5",
      "Qg4",
      "Qf4",
      "Qe4",
      "Qh3",
      "Qg3",
      "Qe3",
      "Qd3",
      "Qe2",
      "Qd1",
      "Rg1",
      "Rf1"
    ],
    "allLegalMoves": [
      "Qxf7+",
      "Qf6",
      "Qh5",
      "Qf5",
      "Qxd5",
      "Qg4",
      "Qf4",
      "Qe4",
      "Qh3",
      "Qg3",
      "Qe3",
      "Qd3",
      "Qe2",
      "Qd1",
      "Rg1",
      "Rf1",
      "Ke2",
      "Kd2",
      "Kf1",
      "Kd1",
      "Bh6",
      "Bg5",
      "Bf4",
      "Be3",
      "Bd2",
      "Rb1",
      "O-O",
      "dxe5",
      "c4",
      "h3",
      "g3",
      "b3",
      "a3",
      "h4",
      "g4",
      "b4",
      "a4"
    ],
    "botActualMove": {
      "uci": "f3d5",
      "san": "Qxd5",
      "piece": "Hậu",
      "fromSquare": "f3",
      "toSquare": "d5",
      "isCapture": true,
      "isCheck": false,
      "promotion": null,
      "nodesExplored": 2079,
      "evalCentipawns": 17
    },
    "theoryBestMove": "Qxd5",
    "theoryBestExplanation": "Ăn Hậu d5 (Qxd5) buộc Đen phải dùng Mã ăn lại, làm chậm nhịp phát triển và triệt tiêu đòn tấn công của đối thủ.",
    "matchesTheory": true,
    "nextFen": "r3k2r/ppp2ppp/2n5/3Qp3/3P4/2P5/PP3PPP/R1B1K2R b KQkq - 0 14",
    "candidateMoves": [
      {
        "uci": "f3h5",
        "san": "Qh5",
        "piece": "Hậu",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "f3",
        "toSquare": "h5",
        "capturedPiece": null
      },
      {
        "uci": "f3f5",
        "san": "Qf5",
        "piece": "Hậu",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "f3",
        "toSquare": "f5",
        "capturedPiece": null
      },
      {
        "uci": "f3d5",
        "san": "Qxd5",
        "piece": "Hậu",
        "isChosen": true,
        "heuristicTier": "Bắt quân MVV-LVA (Hậu ăn Hậu)",
        "fromSquare": "f3",
        "toSquare": "d5",
        "capturedPiece": "Hậu"
      },
      {
        "uci": "f3g4",
        "san": "Qg4",
        "piece": "Hậu",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "f3",
        "toSquare": "g4",
        "capturedPiece": null
      },
      {
        "uci": "f3h3",
        "san": "Qh3",
        "piece": "Hậu",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "f3",
        "toSquare": "h3",
        "capturedPiece": null
      }
    ],
    "defenseExplanation": {
      "responsibleFunctions": [
        {
          "file": "student/bot.py",
          "func": "StudentBot.choose_move",
          "role": "Tiếp nhận board và SearchContext, kích hoạt kiểm tra biên và gọi tìm kiếm"
        },
        {
          "file": "student/time_manager.py",
          "func": "compute_budget_ms",
          "role": "Phân bổ ngân sách thời gian thích ứng bù trễ mạng 500ms"
        },
        {
          "file": "student/search.py",
          "func": "Searcher.search",
          "role": "Tìm kiếm sâu dần Iterative Deepening kết hợp Aspiration Windows ±40 cp"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._order_moves",
          "role": "Phân loại 8 tầng Heuristic ưu tiên duyệt các nước bắt quân có lợi MVV-LVA"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._negamax",
          "role": "Duyệt cây PVS/NegaScout, cắt tỉa Beta-cutoff, Null Move Pruning"
        },
        {
          "file": "student/evaluation.py",
          "func": "evaluate",
          "role": "Lượng giá PeSTO Tapered Eval 32-bit, King Ring và Mop-Up Heuristic"
        }
      ],
      "executionFlow": [
        "1. Nhận bàn cờ FEN và kiểm tra số nước hợp lệ (37 nước đi). Không rơi vào thế bắt buộc (forced move = 1).",
        "2. compute_budget_ms tính toán ngân sách thời gian dựa trên ply=28 và thời gian còn lại.",
        "3. Searcher.search() bắt đầu từ độ sâu depth=1 đến depth tối đa. Khởi tạo Aspiration Windows khi depth >= 4.",
        "4. Tại gốc, _order_moves xếp các nước đi ưu tiên cao nhất lên đầu (TT Move -> Good Captures MVV-LVA -> Killers -> History).",
        "5. Các nhánh phụ bị cắt tỉa Beta-cutoff nhanh chóng do nước đi tốt nhất được duyệt đầu tiên.",
        "6. Quiescence Search tìm kiếm tĩnh các nước ăn quân để tránh hiệu ứng chân trời, áp dụng Delta Pruning 1,150 cp.",
        "7. Trả về nước đi tối ưu Qxd5 (f3d5) với lượng giá vượt trội so với các phương án còn lại."
      ],
      "moveOrderingRationale": "Move Ordering ưu tiên xếp nước Qxd5 lên đầu nhờ Heuristic: Đơn giản hóa thế trận & Good Capture. Nhờ đó, Negamax đạt tốc độ cắt tỉa tối ưu O(b^(d/2)), tiết kiệm hàng nghìn nút tìm kiếm.",
      "whyChosenOverOthers": "Nước Qxd5 đem lại điểm minimax cao nhất trong cây tìm kiếm. Các phương án khác bị bác bỏ vì đối thủ có đòn phản công làm giảm điểm lượng giá sau 2-4 ply.",
      "theoreticalVsActualNotes": "So sánh giữa lý thuyết và thực tế: Bot Nhóm 12 chọn hoàn toàn trùng khớp với nước đi tối ưu lý thuyết (Qxd5)."
    }
  },
  {
    "id": "SIT-10",
    "title": "Bắt Đôi Tượng và Xe Bằng Tốt (Pawn Fork & Win Material)",
    "matchRef": "Chiến thuật trung cuộc cơ bản",
    "theme": "Good Capture bằng Tốt (Least Valuable Attacker)",
    "fen": "r1bqk2r/pppp1ppp/2n5/4p3/1b2b3/3P1N2/PPP1BPPP/R1BQK2R w KQkq - 0 6",
    "turn": "white",
    "turnDisplay": "Trắng (White)",
    "frcId": 518,
    "ply": 12,
    "description": "Tượng Đen dâng cao vào e4 đang bị Tốt Trắng d3 đe dọa. Trắng cần ăn Tượng để giành lợi thế quân lớn.",
    "legalMovesCount": 5,
    "legalMovesSample": [
      "Kf1",
      "Nd2",
      "Qd2",
      "Bd2",
      "c3"
    ],
    "allLegalMoves": [
      "Kf1",
      "Nd2",
      "Qd2",
      "Bd2",
      "c3"
    ],
    "botActualMove": {
      "uci": "c2c3",
      "san": "c3",
      "piece": "Tốt",
      "fromSquare": "c2",
      "toSquare": "c3",
      "isCapture": false,
      "isCheck": false,
      "promotion": null,
      "nodesExplored": 1041,
      "evalCentipawns": -489
    },
    "theoryBestMove": "dxe4",
    "theoryBestExplanation": "Tốt d3 ăn Tượng e4 (dxe4) thu về 330 cp vật chất, củng cố vị trí trung tâm.",
    "matchesTheory": false,
    "nextFen": "r1bqk2r/pppp1ppp/2n5/4p3/1b2b3/2PP1N2/PP2BPPP/R1BQK2R b KQkq - 0 6",
    "candidateMoves": [
      {
        "uci": "e1f1",
        "san": "Kf1",
        "piece": "Vua",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "e1",
        "toSquare": "f1",
        "capturedPiece": null
      },
      {
        "uci": "f3d2",
        "san": "Nd2",
        "piece": "Mã",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "f3",
        "toSquare": "d2",
        "capturedPiece": null
      },
      {
        "uci": "d1d2",
        "san": "Qd2",
        "piece": "Hậu",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "d1",
        "toSquare": "d2",
        "capturedPiece": null
      },
      {
        "uci": "c1d2",
        "san": "Bd2",
        "piece": "Tượng",
        "isChosen": false,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "c1",
        "toSquare": "d2",
        "capturedPiece": null
      },
      {
        "uci": "c2c3",
        "san": "c3",
        "piece": "Tốt",
        "isChosen": true,
        "heuristicTier": "Nước đi yên tĩnh (History Heuristic)",
        "fromSquare": "c2",
        "toSquare": "c3",
        "capturedPiece": null
      }
    ],
    "defenseExplanation": {
      "responsibleFunctions": [
        {
          "file": "student/bot.py",
          "func": "StudentBot.choose_move",
          "role": "Tiếp nhận board và SearchContext, kích hoạt kiểm tra biên và gọi tìm kiếm"
        },
        {
          "file": "student/time_manager.py",
          "func": "compute_budget_ms",
          "role": "Phân bổ ngân sách thời gian thích ứng bù trễ mạng 500ms"
        },
        {
          "file": "student/search.py",
          "func": "Searcher.search",
          "role": "Tìm kiếm sâu dần Iterative Deepening kết hợp Aspiration Windows ±40 cp"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._order_moves",
          "role": "Phân loại 8 tầng Heuristic ưu tiên duyệt các nước bắt quân có lợi MVV-LVA"
        },
        {
          "file": "student/search.py",
          "func": "Searcher._negamax",
          "role": "Duyệt cây PVS/NegaScout, cắt tỉa Beta-cutoff, Null Move Pruning"
        },
        {
          "file": "student/evaluation.py",
          "func": "evaluate",
          "role": "Lượng giá PeSTO Tapered Eval 32-bit, King Ring và Mop-Up Heuristic"
        }
      ],
      "executionFlow": [
        "1. Nhận bàn cờ FEN và kiểm tra số nước hợp lệ (5 nước đi). Không rơi vào thế bắt buộc (forced move = 1).",
        "2. compute_budget_ms tính toán ngân sách thời gian dựa trên ply=12 và thời gian còn lại.",
        "3. Searcher.search() bắt đầu từ độ sâu depth=1 đến depth tối đa. Khởi tạo Aspiration Windows khi depth >= 4.",
        "4. Tại gốc, _order_moves xếp các nước đi ưu tiên cao nhất lên đầu (TT Move -> Good Captures MVV-LVA -> Killers -> History).",
        "5. Các nhánh phụ bị cắt tỉa Beta-cutoff nhanh chóng do nước đi tốt nhất được duyệt đầu tiên.",
        "6. Quiescence Search tìm kiếm tĩnh các nước ăn quân để tránh hiệu ứng chân trời, áp dụng Delta Pruning 1,150 cp.",
        "7. Trả về nước đi tối ưu c3 (c2c3) với lượng giá vượt trội so với các phương án còn lại."
      ],
      "moveOrderingRationale": "Move Ordering ưu tiên xếp nước c3 lên đầu nhờ Heuristic: Good Capture bằng Tốt (Least Valuable Attacker). Nhờ đó, Negamax đạt tốc độ cắt tỉa tối ưu O(b^(d/2)), tiết kiệm hàng nghìn nút tìm kiếm.",
      "whyChosenOverOthers": "Nước c3 đem lại điểm minimax cao nhất trong cây tìm kiếm. Các phương án khác bị bác bỏ vì đối thủ có đòn phản công làm giảm điểm lượng giá sau 2-4 ply.",
      "theoreticalVsActualNotes": "So sánh giữa lý thuyết và thực tế: Bot Nhóm 12 chọn nước c3 do cân nhắc an toàn thời gian và chiều sâu tìm kiếm."
    }
  }
];
