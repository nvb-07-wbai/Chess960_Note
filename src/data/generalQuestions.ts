import type { DefenseQuestion } from "../types";

export const GENERAL_QUESTIONS: DefenseQuestion[] = [
  {
    "id": "GEN-01",
    "title": "Mục tiêu bài toán và Thách thức cốt lõi của Chess960",
    "question": "Dự án giải quyết bài toán gì? Tại sao Chess960 (Fischer Random Chess) lại triệt tiêu sách khai cuộc (Opening Books) và buộc bot phải tính toán từ đầu?",
    "category": "general",
    "topic": "project-overview",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ, dự án xây dựng một động cơ cờ vua tự hành thi đấu đối kháng trong biến thể Fischer Random Chess (Chess960). Trong cờ tiêu chuẩn, các bot có thể phụ thuộc vào Opening Books khổng lồ lưu hàng triệu biến thế khai cuộc thuộc lòng. Nhưng Chess960 xáo trộn ngẫu nhiên vị trí các quân cờ ở hàng đáy thành 960 cấu hình khác nhau, khiến toàn bộ sách khai cuộc trở nên vô dụng. Bot bắt buộc phải dựa 100% vào thuật toán tìm kiếm đối kháng và hàm lượng giá vị trí động để tự suy luận nước đi ngay từ nước thứ nhất.",
      "deepExplanation": "Theo Báo cáo mục 1.1: Không gian trạng thái của Chess960 tương đương cờ tiêu chuẩn (khoảng 10^120 thế cờ, Shannon number), nhưng phân nhánh khai cuộc không còn các cấu trúc quen thuộc. Các quy tắc phát triển quân kinh điển (như đẩy Tốt e4/d4 mở đường cho Tượng và Mã) không thể áp dụng máy móc nếu Tượng nằm ở góc hoặc Xe nằm kẹp giữa Vua. Bot phải tự tìm ra các ô tiền đồn và điểm yếu cấu trúc của từng thế FRC cụ thể.",
      "executionFlow": [
        "1. Host chọn ngẫu nhiên id trong [0, 959] theo thuật toán Scharnagl",
        "2. Bot nhận thế cờ FRC ban đầu (board.chess960 = True)",
        "3. Không có Opening Books, bot kích hoạt ngay Searcher và TimeManager",
        "4. Đánh giá thế cờ bằng Dynamic Bitwise King Safety Ring thích ứng",
        "5. Tìm kiếm nước đi qua Iterative Deepening Negamax"
      ],
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "StudentBot.choose_move",
        "lines": "40-97"
      },
      "concreteExample": "Trong thế FRC #152 (trận gặp Nhóm 13), Vua Trắng ở b1, Tượng ở h1, Xe ở a1 và g1. Nếu dùng sách cờ thường, bot sẽ bị tê liệt hoàn toàn vì không có ván đấu mẫu nào có vị trí quân như vậy.",
      "teacherFollowUps": [
        {
          "question": "Tại sao gọi là Chess960? Có bao nhiêu cách xếp quân thỏa mãn luật?",
          "answer": "Dạ, 960 được tính từ tổ hợp toán học: 4 ô Tượng ô trắng * 4 ô Tượng ô đen * 6 vị trí đặt Hậu * 10 cách đặt 2 Mã trên 5 ô còn lại * 1 cách duy nhất đặt Vua kẹp giữa 2 Xe = 4 * 4 * 6 * 10 * 1 = 960 thế cờ."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng Chess960 thay đổi luật di chuyển của các quân cờ",
        "Quên mất ràng buộc 2 Tượng khác màu và Vua nằm giữa 2 Xe"
      ]
    },
    "tags": [
      "Overview",
      "Chess960",
      "FRC",
      "Opening Books",
      "Scharnagl"
    ]
  },
  {
    "id": "GEN-02",
    "title": "Tại sao không thể chọn ngẫu nhiên và Cần Thuật toán Tìm kiếm",
    "question": "Vì sao bot không thể chọn ngẫu nhiên hoặc chỉ dùng thuật toán tham lam (Greedy)? Tại sao bắt buộc phải có tìm kiếm đối kháng và hàm lượng giá?",
    "category": "general",
    "topic": "project-overview",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ thưa thầy, cờ vua là trò chơi có tổng bằng không (Zero-sum Game) có thông tin hoàn hảo với đối thủ chủ động cản trở. Một thuật toán tham lam (Greedy) chỉ biết ăn quân ở nước hiện tại sẽ ngay lập tức dính bẫy thí quân (Gambit) của đối thủ. Chọn ngẫu nhiên thì tỷ lệ thua cờ là 100%. Bắt buộc phải có Thuật toán Tìm kiếm Đối kháng (Negamax Alpha-Beta) để nhìn thấy trước phản ứng tối ưu của đối thủ sau 4-5 nước đi, và cần Hàm Lượng giá (Evaluation) để chấm điểm thế cờ tại các nút lá khi bàn cờ chưa ngã ngũ.",
      "deepExplanation": "Theo lý thuyết lý thuyết trò chơi: Minimax/Negamax cung cấp giải pháp cân bằng Nash (Nash Equilibrium) cho cây trò chơi hữu hạn. Hàm lượng giá tĩnh evaluate() đóng vai trò là một hàm heuristic ước lượng xác suất thắng/thua khi thuật toán bị chặn bởi giới hạn thời gian (không thể duyệt tới tận cùng ván cờ).",
      "executionFlow": [
        "1. Nút lá của cây tìm kiếm không thể đào sâu vô tận do giới hạn thời gian",
        "2. Hàm evaluate() gán điểm heuristic cho nút lá (PeSTO + King Safety)",
        "3. Negamax đẩy điểm số ngược lên gốc cây theo nguyên tắc tối đa hóa lợi ích của ta và tối thiểu hóa lợi ích đối phương",
        "4. Nước đi tại gốc có điểm minimax cao nhất được chọn"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1203-1280"
      },
      "concreteExample": "Nếu chơi tham lam, Trắng thấy Hậu ăn được Tốt Đen ở b7 sẽ ăn ngay. Nhưng đằng sau đó Đen có nước Xe b8 ghim Hậu Trắng vào Vua, Trắng mất trắng Hậu và thua cờ. Thuật toán Negamax nhìn thấy đòn phản công này ở ply 2 và ngăn cản nước ăn Tốt b7.",
      "teacherFollowUps": [
        {
          "question": "Hàm evaluate có thể thay thế hoàn toàn thuật toán tìm kiếm được không?",
          "answer": "Dạ không, vì hàm evaluate chỉ nhìn thấy thế cờ tĩnh tại 1 thời điểm. Nếu không có tìm kiếm, evaluate sẽ bị mù chiến thuật trước các đòn phối hợp ăn quân liên hoàn."
        }
      ],
      "commonMistakes": [
        "Nhầm lẫn giữa mục đích của Search (tìm đường đi) và Evaluation (chấm điểm đích đến)"
      ]
    },
    "tags": [
      "Game Theory",
      "Zero-sum",
      "Greedy vs Search",
      "Minimax Need",
      "Evaluation Role"
    ]
  },
  {
    "id": "GEN-03",
    "title": "Kiến trúc Tổng thể và Phân định Trách nhiệm 4 Module",
    "question": "Trình bày kiến trúc tổng thể của bot Nhóm 12? Bốn file trong student/ tương tác với nhau theo luồng dữ liệu nào?",
    "category": "general",
    "topic": "architecture",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ, hệ thống gồm 4 module phân tầng độc lập: (1) `bot.py` (StudentBot): Điểm vào tiếp nhận bàn cờ từ Host, vận hành phòng thủ 3 tầng và điều phối. (2) `time_manager.py` (TimeManager): Tính toán ngân sách thời gian thích ứng và giám sát ngắt đệ quy. (3) `search.py` (Searcher & TranspositionTable): Động cơ tìm kiếm Negamax PVS lặp sâu IDS, sắp xếp nước đi và cắt tỉa chọn lọc. (4) `evaluation.py` (evaluate): Hàm lượng giá vị trí PeSTO và Dynamic King Ring bằng Bitboard 32-bit. Luồng tương tác: Host -> bot.py -> time_manager -> search.py (liên tục gọi evaluation.py tại lá và tra cứu TT) -> trả Move về bot.py -> Host.",
      "deepExplanation": "Báo cáo Hình 5 và Bảng 6 chỉ rõ tính mô-đun hóa: bot.py hoàn toàn độc lập với thuật toán tìm kiếm; nó chỉ gọi `tm = compute_budget_ms()` rồi truyền vào `searcher.search(board, tm)`. Trong search.py, mỗi khi duyệt tới độ sâu lá hoặc Quiescence Search, hàm `evaluate(board)` được gọi để lấy điểm số static_eval. TranspositionTable hoạt động như bộ nhớ chia sẻ xuyên suốt các tầng IDS để tái sử dụng kết quả và hỗ trợ Move Ordering.",
      "executionFlow": [
        "1. Host gửi FEN & Context qua stdin",
        "2. StudentBot.choose_move() nhận board và context",
        "3. Gọi compute_budget_ms() khởi tạo TimeManager tm",
        "4. Gọi searcher.search(board, tm):",
        "   - Vòng lặp IDS từ depth 1..MAX_DEPTH",
        "   - Gọi _negamax() đệ quy kết hợp PVS, NMP, RFP, LMR",
        "   - Gọi _order_moves() sắp xếp 8 bậc ưu tiên",
        "   - Gọi evaluate(board) tại nút lá và Quiescence",
        "   - Kiểm tra tm.should_stop() ngắt an toàn",
        "5. choose_move() hậu kiểm hợp lệ và trả về chess.Move"
      ],
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "StudentBot",
        "lines": "1-97"
      },
      "concreteExample": "Khi ván đấu bước sang tàn cuộc gay cấn (nước 118, POS-08), TimeManager phát hiện còn nhiều thời gian nên cấp ngân sách lớn 2.47s. Searcher lập tức đào sâu tới depth 6, gọi hàm evaluate kích hoạt Mop-Up Heuristic dồn Vua đối thủ vào góc chết.",
      "teacherFollowUps": [
        {
          "question": "Nếu bỏ file time_manager.py thì hệ thống sẽ ra sao?",
          "answer": "Dạ, nếu không có time_manager, Searcher không biết khi nào nên dừng lại, sẽ duyệt quá sâu và bị trọng tài xử thua timeout; hoặc chỉ search ở độ sâu cố định nông làm giảm sức mạnh thi đấu."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng bot.py tự tính toán tìm kiếm",
        "Không vẽ được luồng dữ liệu giữa 4 module"
      ]
    },
    "tags": [
      "Architecture",
      "Modular Design",
      "Data Flow",
      "bot.py",
      "search.py",
      "evaluation.py"
    ]
  },
  {
    "id": "GEN-04",
    "title": "Chu trình Toàn vẹn Một Ván cờ (10 Bước Khép kín)",
    "question": "Trình bày chu trình 10 bước trong vòng đời toàn vẹn một ván cờ Chess960 theo Chương 3 của báo cáo?",
    "category": "general",
    "topic": "architecture",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, chu trình 10 bước gồm: (1) Host sinh thế FRC ngẫu nhiên S in [0, 959] theo Scharnagl. (2) Khởi tạo bàn cờ FRC với board.chess960 = True. (3) Host khởi tạo tiến trình con chạy bot và bắt tay BotConfig. (4) Cấp phát bộ nhớ: StudentBot tạo bảng TT 524,288 mục (16 MiB), nạp trước bảng PeSTO đóng gói và 64 vùng King Ring. (5) Trọng tài kích hoạt đồng hồ đơn điệu monotonic_ns. (6) Host gửi FEN và thời gian qua stdin. (7) Bot tìm kiếm qua Kiến trúc phòng thủ 3 tầng. (8) Bot gửi nước đi UCI qua stdout. (9) Trọng tài thẩm định kết thúc ván (chiếu hết, hòa, timeout). (10) Host hấp thụ trễ sàn 500-1000ms và hoán đổi lượt đi.",
      "deepExplanation": "Quy trình này được chuẩn hóa tại Hình 6 báo cáo. Điểm mấu chốt là Bước 4 diễn ra trước khi bấm giờ ván đấu: toàn bộ việc tính toán trước (pre-computation) các bảng PeSTO đóng gói 32-bit và 64 mặt nạ King Ring bitboard đều được nạp sẵn vào RAM trong Bước 4, giúp quá trình thi đấu ở Bước 7 không tốn thêm 1 mili-giây overhead nào cho khâu khởi tạo.",
      "executionFlow": [
        "Bước 1-3: Setup môi trường và IPC handshake",
        "Bước 4: Pre-allocation bộ nhớ (TT 16 MiB, Bitboard PST, King Zones)",
        "Bước 5-8: Vòng lặp từng nước đi (Đồng hồ -> Yêu cầu -> Search 3 tầng -> Phản hồi UCI)",
        "Bước 9-10: Trọng tài kiểm định và trễ sàn 500-1000ms"
      ],
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "StudentBot.__init__",
        "lines": "20-38"
      },
      "concreteExample": "Tại Bước 10, Host duy trì khoảng dừng 500-1000ms. Nhóm 12 tận dụng chính khoảng dừng này để ngân sách 150-220ms của nhóm ở Bước 7 được máy chủ nuốt trọn mà không làm hao tổn đồng hồ thi đấu.",
      "teacherFollowUps": [
        {
          "question": "Tại sao Bước 4 lại nạp sẵn 64 vùng an toàn Vua?",
          "answer": "Dạ, vì trong Chess960 Vua có thể ở bất kỳ ô nào, tính trước 64 mặt nạ bitboard giúp hàm evaluate chỉ cần tra cứu mảng KING_ZONES[king_sq] trong O(1)."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng mỗi nước đi bot phải khởi tạo lại bảng TT",
        "Không biết về bước hấp thụ trễ của Host"
      ]
    },
    "tags": [
      "Lifecycle",
      "10 Steps",
      "Pre-computation",
      "Handshake",
      "Arbitration"
    ]
  },
  {
    "id": "GEN-05",
    "title": "Phân định Rõ ràng Bốn Loại Điểm số (Score Taxonomy)",
    "question": "Trong hệ thống của Nhóm 12 có 4 loại điểm số nào? Đơn vị đo, phạm vi giá trị và ý nghĩa toán học của từng loại?",
    "category": "general",
    "topic": "architecture",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, báo cáo mục 4.4 phân định tường minh 4 loại điểm số: (1) Heuristic Evaluation Score (Điểm lượng giá tĩnh): tính tại evaluation.py, phạm vi [-30,000, +30,000] centipawns (100 cp = 1 Tốt), phản ánh tương quan vật chất PeSTO và an toàn Vua tại nút lá. (2) Search Score (Điểm Minimax): tính tại search.py (_negamax), phạm vi [-32,000, +32,000] cp, có chiết khấu khoảng cách chiếu hết (MATE_SCORE - ply). (3) Move Ordering Score (Điểm ưu tiên sắp xếp): gán tại _order_moves, phạm vi [-10^5, +10^7] không thứ nguyên, dùng để sắp xếp thứ tự duyệt nước đi. (4) Match Score (Điểm giải đấu): do trọng tài chấm, thuộc tập {0, 1, 3} điểm (Thắng=3, Hòa=1, Thua=0). Nhóm 12 đạt tổng 49 điểm sau 48 ván.",
      "deepExplanation": "Sự nhầm lẫn giữa các loại điểm số là lỗi rất nặng trong vấn đáp cờ vua: (1) Điểm Move Ordering (+10,000,000 cho Hash move, +1,000,000 cho Good capture) KHÔNG PHẢI là điểm centipawn, mà chỉ là điểm xếp hạng tương đối (relative priority ranking). (2) Điểm Search khác điểm Evaluation ở chỗ Search có cộng trừ ply cho đòn chiếu hết, và lấy giá trị Minimax qua nhiều tầng cây. (3) Điểm Match Score là kết quả cuối cùng trên bảng xếp hạng giải đấu.",
      "executionFlow": [
        "1. evaluate() -> Evaluation Score (cp)",
        "2. _order_moves() -> Move Ordering Score (không thứ nguyên: 10^5 - 10^7)",
        "3. _negamax() -> Search Score (cp có chiết khấu ply chiếu hết)",
        "4. Host Leaderboard -> Match Score ({0, 1, 3} điểm)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "score_move",
        "lines": "757-890"
      },
      "concreteExample": "Một nước ăn Tốt có điểm Move Ordering là 1,002,900 điểm, nhưng điểm Heuristic Evaluation của thế cờ sau nước đó chỉ là +120 cp, và nếu ván đó thắng thì điểm Match Score là 3 điểm. Ba con số này hoàn toàn khác nhau về bản chất!",
      "teacherFollowUps": [
        {
          "question": "Tại sao điểm Move Ordering lại lên tới 10,000,000 điểm?",
          "answer": "Dạ, để tạo các tầng phân tách tuyệt đối (Strict Tiering) giữa Hash move (10^7), Promotion (1.2*10^6), Good Captures (10^6), Killer (7*10^5) mà không bao giờ bị điểm tích lũy của History heuristic làm đảo lộn thứ tự."
        }
      ],
      "commonMistakes": [
        "Tưởng điểm Move Ordering là điểm đánh giá thế cờ",
        "Nhầm Match Score với điểm Minimax"
      ]
    },
    "tags": [
      "Score Taxonomy",
      "Evaluation Score",
      "Search Score",
      "Move Ordering Score",
      "Match Score"
    ]
  },
  {
    "id": "GEN-06",
    "title": "Các Ràng buộc Kỹ thuật và Quy chế Môn học AI2014",
    "question": "Những ràng buộc công nghệ bắt buộc của cuộc thi ChessLab là gì? Nhóm đã tuân thủ những quy chế đó như thế nào?",
    "category": "general",
    "topic": "project-overview",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ, quy chế môn học đặt ra 5 điều cấm tuyệt đối: (1) CẤM sử dụng Machine Learning / Deep Learning / Neural Networks. (2) CẤM gọi engine ngoài (như Stockfish, Komodo). (3) CẤM sử dụng Opening Books (sách khai cuộc). (4) CẤM sử dụng Endgame Tablebases (bảng tàn cuộc Syzygy). (5) CẤM các hành vi can thiệp vào máy chủ hoặc tiến trình đối thủ. Nhóm 12 đã tuân thủ 100% bằng cách tự phát triển thuần túy các thuật toán tìm kiếm đối kháng cổ điển (Negamax, PVS, IDS, Alpha-Beta) và hàm lượng giá tri thức chuyên gia PeSTO kết hợp Bitboard trong đúng 2,847 dòng mã độc lập.",
      "deepExplanation": "Bảng 1 và Bảng 2 trong báo cáo đối chiếu chi tiết: Toàn bộ mã nguồn nằm gọn trong thư mục student/ với dung lượng 81.6 KiB (rất nhỏ so với giới hạn 1.0 MiB). Môi trường chạy chuẩn hóa qua uv với Python 3.12 và thư viện python-chess mã nguồn mở. Mọi quyết định nước đi của bot đều bắt nguồn từ suy luận toán học và thuật toán tìm kiếm cây trò chơi.",
      "executionFlow": [
        "1. Không nạp bất kỳ tệp dữ liệu nhị phân (.bin, .nnue, .rtb)",
        "2. Không import các thư viện AI ngoài danh mục uv.lock",
        "3. Kiểm tra mã nguồn qua flake8 và mypy",
        "4. 100% logic tự sinh nước đi và tự lượng giá"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher",
        "lines": "609-1780"
      },
      "concreteExample": "Báo cáo mục 1.2 ghi nhận: Ở commit khởi tạo gốc ce91f22, file bot.py chỉ là bot mẫu 15 dòng chọn nước đi đầu tiên. Toàn bộ 49 điểm số trong giải đấu chính thức đều do 2,847 dòng mã tự viết của 4 thành viên tạo nên.",
      "teacherFollowUps": [
        {
          "question": "Nếu bot dùng mạng nơ-ron nhỏ tự train thì có phạm quy không?",
          "answer": "Dạ có, quy chế ghi rõ cấm Machine Learning dưới mọi hình thức, chỉ được dùng Heuristic và Search truyền thống."
        }
      ],
      "commonMistakes": [
        "Đề xuất giải pháp ML/DL khi thầy hỏi hướng nâng cấp trong phạm vi môn học",
        "Không biết các điều cấm trong quy chế thi đấu"
      ]
    },
    "tags": [
      "Rules",
      "Constraints",
      "No-ML",
      "No-Stockfish",
      "Academic Integrity"
    ]
  },
  {
    "id": "GEN-07",
    "title": "Nguyên lý Alpha-Beta Pruning và Điều kiện Beta-cutoff",
    "question": "Trình bày nguyên lý cắt tỉa Alpha-Beta? Ý nghĩa của hai tham số alpha, beta và điều kiện xảy ra Beta-cutoff?",
    "category": "general",
    "topic": "search",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ, Alpha-Beta Pruning là kỹ thuật cắt tỉa nhánh dư thừa trong cây Minimax mà không làm thay đổi giá trị tối ưu cuối cùng: Alpha là điểm số tối thiểu mà người chơi (ta) chắc chắn đạt được cho đến thời điểm hiện tại (cận dưới mong muốn). Beta là điểm số tối đa mà đối thủ cho phép ta đạt được (cận trên của đối thủ). Khi duyệt một nước đi mà đạt điểm `score >= beta`, xảy ra hiện tượng Beta-cutoff (Fail-high): đối phương chắc chắn sẽ không bao giờ cho phép ta đi vào nhánh này vì họ có lựa chọn khác tốt hơn cho họ ở tầng trên. Do đó, ta ngắt vòng lặp ngay lập tức và bỏ qua toàn bộ các nhánh con còn lại.",
      "deepExplanation": "Bản chất toán học: Cửa sổ [alpha, beta] định nghĩa dải giá trị 'có ý nghĩa'. Nếu score <= alpha (Fail-low), nước đi quá kém không cải thiện được alpha. Nếu alpha < score < beta, nước đi cải thiện cận dưới, ta cập nhật alpha = score. Nếu score >= beta, thế cờ quá tốt cho ta, đối thủ ở tầng trên sẽ chọn phương án khác để né tránh thế cờ này, nhánh tìm kiếm bị cắt đứt. Nhờ cắt tỉa, số node duyệt giảm từ b^d xuống tiệm cận b^(d/2).",
      "executionFlow": [
        "1. Khởi tạo [alpha, beta]",
        "2. Duyệt từng nước đi m:",
        "   - score = -_negamax(board, depth - 1, -beta, -alpha)",
        "   - if score >= beta: return beta (Beta-cutoff tức thì!)",
        "   - if score > alpha: alpha = score, best_move = m",
        "3. return alpha"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1530-1550"
      },
      "concreteExample": "Giả sử alpha = +100 cp, beta = +200 cp. Ta thử nước đi m1, hàm con trả về +250 cp. Vì 250 >= beta (200), ta biết ngay đối thủ ở tầng trên sẽ không bao giờ cho ta đi vào thế cờ này. Ta dừng ngay vòng lặp và trả về 250 (hoặc beta), không cần kiểm tra 20 nước đi còn lại.",
      "teacherFollowUps": [
        {
          "question": "Tại sao lại return beta hoặc score mà không cần duyệt hết các nước?",
          "answer": "Dạ, vì trong lý thuyết tìm kiếm đối kháng, ta chỉ cần chứng minh nhánh này >= beta là đủ để node cha loại bỏ nó, việc biết chính xác nó là 250 hay 500 không làm thay đổi quyết định đi cờ."
        }
      ],
      "commonMistakes": [
        "Nhầm lẫn vai trò của alpha (của ta) và beta (của đối thủ)",
        "Nghĩ rằng Alpha-Beta làm mất nước đi tối ưu (Alpha-Beta là cắt tỉa chính xác 100%)"
      ]
    },
    "tags": [
      "Alpha-Beta",
      "Beta-cutoff",
      "Fail-high",
      "Fail-low",
      "Search Tree"
    ]
  },
  {
    "id": "GEN-08",
    "title": "Vai trò của Iterative Deepening Search (IDS)",
    "question": "Tại sao bắt buộc phải dùng Tìm kiếm Lặp Sâu (Iterative Deepening Search - IDS) từ depth 1 đến MAX_DEPTH thay vì tìm kiếm thẳng ở depth 5?",
    "category": "general",
    "topic": "search",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, IDS là bắt buộc vì 3 lý do sống còn: (1) Quản lý thời gian linh hoạt (Time Control): Trong cờ chớp, ta không thể biết trước tìm kiếm ở depth 5 sẽ mất 0.5s hay 5.0s do bùng nổ rẽ nhánh. IDS duyệt tuần tự depth 1, 2, 3, 4... Nếu hết giờ ở depth 5, bot vẫn có sẵn nước đi tối ưu hoàn chỉnh của depth 4 để trả về ngay. (2) Tối ưu hóa Move Ordering: Kết quả nước tốt nhất của depth d - 1 được lưu vào Transposition Table, trở thành Hash Move ưu tiên số 1 cho depth d, giúp Alpha-Beta cắt tỉa mạnh nhất. (3) Chi phí lặp lại không đáng kể: Do cây tìm kiếm tăng theo cấp số nhân, tổng số node của toàn bộ các tầng trước (1 đến d-1) chỉ chiếm khoảng 10-15% số node của tầng d cuối cùng.",
      "deepExplanation": "Bản chất toán học: Với hệ số rẽ nhánh b ≈ 3, tổng số node duyệt từ depth 1 đến d là: S = b^1 + b^2 + ... + b^d ≈ b^d * (b / (b - 1)). Với b = 3, S ≈ 1.5 * b^d, tức là toàn bộ chi phí lặp lại từ depth 1 đến d-1 chỉ bằng một nửa tầng d. Đổi lại, nhờ có kết quả của tầng trước để làm Hash Move và Aspiration Windows, tốc độ của tầng d tăng lên gấp nhiều lần, bù đắp hoàn toàn chi phí lặp lại!",
      "executionFlow": [
        "1. For depth in range(1, MAX_DEPTH + 1):",
        "   - Chạy tìm kiếm ở depth hiện tại",
        "   - Lưu best_move của tầng hoàn chỉnh",
        "   - if time_manager.should_stop() or not can_start_next_depth(): break",
        "2. return best_move"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher.search",
        "lines": "1635-1770"
      },
      "concreteExample": "Nếu search thẳng depth 5 và bị hết giờ ở 90% tiến trình: bot không có nước đi nào và bị xử thua timeout! Với IDS, bot dừng an toàn ở depth 4 và trả về nước đi chất lượng cao.",
      "teacherFollowUps": [
        {
          "question": "Tại sao IDS lại giúp Aspiration Windows hoạt động được?",
          "answer": "Dạ, vì Aspiration Windows cần điểm số ước lượng của tầng trước (last_score) để tạo cửa sổ [score - 40, score + 40]. Không có IDS thì không thể có điểm số ước lượng này."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng IDS lãng phí thời gian vì phải duyệt lại các tầng cũ",
        "Không thấy được vai trò của IDS trong việc cấp Hash Move cho Move Ordering"
      ]
    },
    "tags": [
      "IDS",
      "Iterative Deepening",
      "Time Control",
      "Move Ordering synergy",
      "Exponential Growth"
    ]
  },
  {
    "id": "GEN-09",
    "title": "Khóa Zobrist Hashing 64-bit trong Transposition Table",
    "question": "Khóa Zobrist Hashing 64-bit được khởi tạo và cập nhật như thế nào? Xác suất va chạm băm (Hash Collision) là bao nhiêu?",
    "category": "general",
    "topic": "architecture",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, Zobrist Hashing là kỹ thuật băm thế cờ thành số nguyên 64-bit bằng phép toán XOR (^): Mỗi loại quân cờ trên mỗi ô cờ (6 loại * 2 màu * 64 ô = 768), quyền nhập thành (4 bit), cột tốt qua đường (8 cột), và lượt đi (1 bit) đều được gán trước một số ngẫu nhiên 64-bit duy nhất. Khóa băm của thế cờ là phép XOR của toàn bộ các thành phần đó. Khi đi một nước cờ, ta chỉ cần XOR quân cờ ra khỏi ô cũ và XOR vào ô mới trong O(1). Với không gian khóa 64-bit (2^64 ≈ 1.84 * 10^19), theo nghịch lý ngày sinh nhật, để có 1% xác suất va chạm cần tới khoảng 600 triệu thế cờ, trong khi một ván đấu bot chỉ duyệt vài triệu thế cờ nên va chạm băm gần như bằng 0.",
      "deepExplanation": "Trong mã nguồn của nhóm, thư viện python-chess cung cấp sẵn phương thức `chess.polyglot.zobrist_hash(board)` tối ưu bằng C. Khóa 64-bit này được dùng để: (1) Lấy chỉ số trong bảng TT: `index = key & (TT_SIZE - 1)`. (2) Kiểm tra toàn vẹn (Full key verification): Mục lưu trữ TTEntry lưu nguyên vẹn khóa 64-bit, khi đọc ra bot so sánh `if entry.key == key` để đảm bảo loại bỏ hoàn toàn việc dùng nhầm thế cờ khác.",
      "executionFlow": [
        "1. key = chess.polyglot.zobrist_hash(board)",
        "2. index = key & (524288 - 1)",
        "3. entry = table[index]",
        "4. if entry is not None and entry.key == key: (Hit TT)",
        "   - Tái sử dụng điểm số hoặc best_move"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "TranspositionTable.probe & store",
        "lines": "495-580"
      },
      "concreteExample": "Trong ván marathon 123 nước, bot thực hiện hàng chục triệu phép tra cứu băm Zobrist nhưng không xảy ra bất kỳ một sự cố sai lệch trạng thái nào, chứng minh độ tin cậy tuyệt đối của khóa 64-bit.",
      "teacherFollowUps": [
        {
          "question": "Tại sao không dùng chuỗi FEN làm key trong bảng băm?",
          "answer": "Dạ, chuỗi FEN dài khoảng 60-80 ký tự, phép so sánh chuỗi rất chậm và tốn hàng trăm byte bộ nhớ cho mỗi mục. Khóa Zobrist 64-bit chỉ tốn đúng 8 bytes và so sánh số nguyên trong 1 chu kỳ CPU."
        }
      ],
      "commonMistakes": [
        "Dùng chuỗi FEN làm khóa băm trong TT",
        "Nghĩ rằng khóa 64-bit có nguy cơ va chạm cao trong 1 ván cờ"
      ]
    },
    "tags": [
      "Zobrist Hashing",
      "64-bit",
      "Hash Collision",
      "Birthday Paradox",
      "polyglot"
    ]
  },
  {
    "id": "GEN-10",
    "title": "Nguyên lý Stand-pat trong Quiescence Search",
    "question": "Khái niệm Stand-pat trong Quiescence Search là gì? Khi nào được kích hoạt Stand-pat Cutoff và khi nào không được dùng?",
    "category": "general",
    "topic": "search",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, Stand-pat nghĩa là 'Đứng yên không làm gì cả' (The option of doing nothing). Trong Quiescence Search, bên đến lượt đi không bắt buộc phải ăn quân nếu việc ăn quân đó dẫn tới thiệt hại. Do đó, điểm sàn tối thiểu mà bên đi có thể đạt được chính là điểm lượng giá tĩnh của thế cờ hiện tại: `stand_pat = evaluate(board)`. Nếu `stand_pat >= beta`, xảy ra Stand-pat Cutoff: bên đi đã có thế cờ đủ tốt vượt qua beta mà không cần phải thực hiện thêm bất kỳ nước ăn quân mạo hiểm nào, hàm ngắt ngay lập tức và trả về beta. Trường hợp DUY NHẤT KHÔNG ĐƯỢC DÙNG Stand-pat là khi bên đi ĐANG BỊ CHIẾU (in_check), vì khi bị chiếu luật cờ bắt buộc phải tìm nước giải chiếu, không thể đứng yên.",
      "deepExplanation": "Quy trình Stand-pat: (1) Tính `stand_pat = evaluate(board)`. (2) Nếu `stand_pat >= beta`: return beta (ngắt ngay). (3) Nếu `stand_pat > alpha`: cập nhật `alpha = stand_pat` (nâng cận dưới). (4) Sau đó mới xét các nước ăn quân. Nếu tất cả các nước ăn quân đều bị lỗ (ví dụ ăn Tốt bị Xe ăn lại), thuật toán vẫn bảo toàn được điểm số alpha = stand_pat ban đầu.",
      "executionFlow": [
        "1. in_check = board.is_check()",
        "2. if not in_check:",
        "   - stand_pat = evaluate(board)",
        "   - if stand_pat >= beta: return beta (Stand-pat Cutoff)",
        "   - if stand_pat > alpha: alpha = stand_pat",
        "3. Duyệt các nước ăn quân captures..."
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._quiescence",
        "lines": "935-960"
      },
      "concreteExample": "Ta đang hơn 1 Xe (+500 cp), beta = 200 cp. Trong Quiescence Search, ta có một nước lấy Hậu ăn Tốt đối phương đang được bảo vệ. Nhờ có Stand-pat, hàm thấy stand_pat = 500 >= beta (200) nên dừng ngay và trả về 200, ngăn không cho bot thực hiện nước ăn Tốt liều mạng làm mất Hậu.",
      "teacherFollowUps": [
        {
          "question": "Nếu đang bị chiếu thì Quiescence Search làm gì tiếp theo?",
          "answer": "Dạ, nếu đang bị chiếu, bot buộc phải sinh toàn bộ các nước đi giải chiếu (kể cả nước yên tĩnh) để kiểm tra xem có bị chiếu hết hay không."
        }
      ],
      "commonMistakes": [
        "Áp dụng Stand-pat khi đang bị chiếu làm bot bỏ qua đòn chiếu hết",
        "Không cập nhật alpha bằng stand_pat"
      ]
    },
    "tags": [
      "Stand-pat",
      "Quiescence Search",
      "Stand-pat Cutoff",
      "in_check",
      "Tactical Pruning"
    ]
  },
  {
    "id": "GEN-11",
    "title": "Mô tả Luồng Thực thi của một Nước đi từ Đầu đến Cuối (End-to-End Walkthrough)",
    "question": "Giả sử bot nhận được một bàn cờ có 25 nước đi hợp lệ. Em hãy mô tả chi tiết từ đầu đến cuối luồng thực thi trong mã nguồn để tìm ra nước đi cuối cùng?",
    "category": "general",
    "topic": "architecture",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, quy trình gồm 8 bước chính xác theo mã nguồn: (1) Entry Point: StudentBot.choose_move nhận board và context. (2) Tầng 1: Trích xuất legal_moves (len=25 > 1 nên không kích hoạt fast-path). (3) Quản lý thời gian: compute_budget_ms cấp ngân sách (ví dụ 180 ms), khởi tạo TimeManager tm. (4) Khởi động Search: gọi searcher.search(board, tm). Reset nodes = 0, tăng age += 1, làm suy giảm history table. (5) Iterative Deepening: Chạy vòng lặp depth 1, 2, 3, 4... Ở depth >= 4 áp dụng Aspiration Windows [last_score - 40, last_score + 40]. (6) Tại mỗi node _negamax: kiểm tra lặp cờ, tra cứu TT, cắt tỉa RFP / NMP / Futility, gọi _order_moves xếp 8 bậc ưu tiên, đệ quy PVS (nước 1 full-window, nước sau Zero-Window kèm LMR), duyệt Quiescence tại lá. (7) Giám sát dừng: kiểm tra nodes & 127 == 0, nếu hết giờ ngắt an toàn và giữ best_move của tầng hoàn chỉnh. (8) Hậu kiểm Tầng 3: kiểm tra move in legal_moves và trả về chess.Move.",
      "deepExplanation": "Đây là câu hỏi toàn diện nhất kiểm tra việc hiểu mã nguồn: Người học phải chứng minh được sự phối hợp nhịp nhàng giữa cả 4 file mà không bị nhầm lẫn thứ tự: bot.py gọi time_manager.py -> time_manager cấp budget cho searcher.py -> searcher.py gọi evaluation.py -> kết quả trả ngược về bot.py để hậu kiểm. Toàn bộ quá trình diễn ra trong vỏn vẹn ~1.1 giây (đã bao gồm độ trễ sàn của máy chủ).",
      "executionFlow": [
        "1. choose_move() -> check len(legal) == 25",
        "2. compute_budget_ms() -> TimeBudget(150, 180, 450)",
        "3. searcher.search() -> IDS depth 1..4",
        "4. _negamax() -> Probe TT -> Order moves -> PVS loop -> Evaluate leaf",
        "5. should_stop() phát hiện chạm ngưỡng -> ngắt đệ quy",
        "6. choose_move() kiểm tra move in legal_moves -> return move"
      ],
      "codeRef": {
        "file": "student/bot.py & search.py",
        "functionName": "choose_move & search",
        "lines": "bot: 40-97, search: 1635-1770"
      },
      "concreteExample": "Trong ván gặp Nhóm 13 (POS-03), bàn cờ có 28 nước hợp lệ. Quy trình 8 bước này chạy qua depth 1, 2, 3 và hoàn tất depth 4 sau 1,191 ms, tìm ra nước tối ưu 12. bxa4 ăn Mã đi lạc với điểm đánh giá +679 cp.",
      "teacherFollowUps": [
        {
          "question": "Trong luồng trên, hàm evaluate được gọi bao nhiêu lần?",
          "answer": "Dạ, trong khoảng 180 ms, evaluate được gọi khoảng 5,000 - 8,000 lần tại các nút lá của Negamax và trong Quiescence Search."
        }
      ],
      "commonMistakes": [
        "Mô tả luồng lý thuyết chung chung không gắn với tên hàm thực tế trong code",
        "Quên bước kiểm tra an toàn Tầng 3"
      ]
    },
    "tags": [
      "End-to-End",
      "Walkthrough",
      "choose_move",
      "search",
      "Execution Flow"
    ]
  },
  {
    "id": "GEN-12",
    "title": "So sánh Lượng giá Tĩnh (Static Eval) và Điểm Tìm kiếm (Search Score)",
    "question": "Điểm lượng giá tĩnh (Static Evaluation) và Điểm tìm kiếm (Search Score) khác nhau như thế nào về bản chất? Tại sao điểm tĩnh tốt chưa chắc đã thắng?",
    "category": "general",
    "topic": "evaluation",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ, (1) Điểm lượng giá tĩnh (Static Eval): là điểm số được tính toán tại duy nhất MỘT THẾ CỜ CỤ THỂ mà không đi thử bất kỳ nước cờ nào tiếp theo. Nó chỉ nhìn thấy tương quan vật chất bề mặt và các đặc trưng vị trí tức thời (PeSTO, khiên Tốt, an toàn Vua). (2) Điểm tìm kiếm (Search Score): là giá trị Minimax động thu được sau khi đã duyệt qua hàng nghìn biến thể rẽ nhánh ở độ sâu 4-5 ply, có tính toán đầy đủ các đòn phản công, ghim quân và chiếu hết của cả hai bên. Điểm tĩnh tốt chưa chắc thắng vì thế cờ có thể chứa đòn chiến thuật tiềm ẩn (ví dụ đang hơn 1 Xe nhưng nước tiếp theo bị chiếu hết hàng đáy).",
      "deepExplanation": "Bản chất toán học: Static Eval là hàm Heuristic thô h(s). Search Score là giá trị Minimax đệ quy V(s) = max_m (-V(s')). Thuật toán tìm kiếm chính là công cụ để 'tinh lọc' và 'sửa sai' cho hàm lượng giá tĩnh: Nó đẩy hàm lượng giá xuống các nút lá ít biến động nhất (thông qua Quiescence Search), giúp hạn chế tối đa sai số của đánh giá tĩnh.",
      "executionFlow": [
        "1. Thế cờ s -> evaluate(s) cho điểm tĩnh static_eval = +300 cp (hơn 1 Mã)",
        "2. Thuật toán Searcher duyệt cây 4 ply:",
        "   - Ply 1: Đối phương chiếu Vua",
        "   - Ply 2: Vua né",
        "   - Ply 3: Đối phương ăn Hậu",
        "3. Search Score trả về: -600 cp (thực tế bị mất Hậu)",
        "4. Bot chọn nước đi khác dựa trên Search Score chứ không tin vào Static Eval"
      ],
      "codeRef": {
        "file": "student/evaluation.py & search.py",
        "functionName": "evaluate & _negamax",
        "lines": "eval: 427, search: 1280"
      },
      "concreteExample": "Trong thế cờ POS-10 gặp Nhóm 2: Nước 16... Bb5 có điểm tĩnh ban đầu rất tốt (+818 cp vì đe dọa Xe). Nhưng nếu bot search đủ sâu tới ply 5, Search Score sẽ nhìn thấy nước phản đòn Qxb5 và trả về điểm âm nặng.",
      "teacherFollowUps": [
        {
          "question": "Hàm evaluate có bao giờ nhìn thấy nước chiếu hết không?",
          "answer": "Dạ không, hàm evaluate chỉ cộng trừ điểm vị trí và vật chất. Việc phát hiện chiếu hết (board.is_checkmate()) và gán MATE_SCORE là nhiệm vụ hoàn toàn của Searcher trong _negamax."
        }
      ],
      "commonMistakes": [
        "Đánh đồng điểm evaluate với điểm Minimax",
        "Nghĩ rằng bot chọn nước đi dựa trên việc gọi trực tiếp hàm evaluate"
      ]
    },
    "tags": [
      "Static Eval",
      "Search Score",
      "Tactical Blindness",
      "Minimax",
      "Heuristic vs Search"
    ]
  },
  {
    "id": "GEN-13",
    "title": "Tại sao không dùng Bảng Tàn cuộc (Endgame Tablebases)?",
    "question": "Tại sao nhóm không tích hợp Bảng tàn cuộc (Endgame Tablebases như Syzygy 6 quân) và nhóm đã giải quyết pha tàn cuộc bằng cách nào?",
    "category": "general",
    "topic": "evaluation",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ, có 2 lý do: Thứ nhất là QUY CHẾ THI ĐẤU CẤM: Đề bài môn học cấm tuyệt đối việc sử dụng Endgame Tablebases. Thứ hai là DUNG LƯỢNG: Bảng Syzygy 6 quân có dung lượng tới 150 GB, hoàn toàn không thể đóng gói vào thư mục student/ giới hạn dưới 1.0 MiB. Để giải quyết pha tàn cuộc mà không có Tablebases, Nhóm 12 đã tích hợp 3 giải pháp chuyên gia độc lập: (1) Bảng PeSTO Endgame (EG) thưởng Vua xông ra trung tâm và thưởng Tốt thông tiến sâu. (2) Mop-Up Heuristic tự động dồn Vua đối phương vào góc khi áp đảo. (3) Theo dõi halfmove_clock chống dính hòa 50 nước.",
      "deepExplanation": "Giải pháp thay thế của nhóm hoạt động cực kỳ hiệu quả: Khi Game Phase giảm xuống dưới 6 (tàn cuộc sâu), bảng PeSTO EG chiếm 75-100% trọng số, hướng dẫn Vua làm quân tấn công. Đồng thời, Mop-Up Heuristic tính toán khoảng cách Manhattan giữa hai Vua và khoảng cách đến tâm bàn cờ, cộng điểm thưởng để ép Vua địch ra mép bàn cờ. Minh chứng là ở ván marathon 123 nước (POS-09), bot đã tự lực dồn Vua Trắng vào góc c1 và chiếu hết thành công mà không cần 1 byte Tablebase nào.",
      "executionFlow": [
        "1. Game Phase <= 6: Tapered eval chuyển 80-100% sang điểm PeSTO EG",
        "2. Vua được thưởng điểm khi chiếm các ô trung tâm d4, e4, d5, e5",
        "3. Tốt thông được thưởng tới +120..+200 cp để ưu tiên phong cấp",
        "4. Mop-Up Heuristic kích hoạt: mopup = 4.7 * cmd + 1.6 * (14 - md)",
        "5. Negamax tìm ra chuỗi nước dồn Vua và chiếu hết"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "575-605"
      },
      "concreteExample": "Trong ván POS-09, Đen có Hậu và Vua chống Vua đơn độc. Mop-Up Heuristic liên tục thưởng điểm khi khoảng cách hai Vua thu hẹp, giúp bot chiếu hết dứt điểm ở nước 123.",
      "teacherFollowUps": [
        {
          "question": "Mop-Up Heuristic có giải quyết được tàn cuộc Vua + 2 Tượng chống Vua không?",
          "answer": "Dạ có, vì công thức Mop-Up thuần túy hình học (dồn Vua ra góc và kéo Vua ta lại gần), nó áp dụng hoàn hảo cho mọi tàn cuộc áp đảo có Hậu, Xe hoặc cặp Tượng."
        }
      ],
      "commonMistakes": [
        "Không biết quy chế cấm Endgame Tablebases",
        "Nghĩ rằng không có Tablebase thì bot không biết chiếu hết ở tàn cuộc"
      ]
    },
    "tags": [
      "Endgame",
      "Tablebases",
      "Syzygy Ban",
      "Mop-Up",
      "PeSTO EG"
    ]
  },
  {
    "id": "GEN-14",
    "title": "Hiệu năng Duyệt cây 25,400 NPS và Tối ưu hóa Bộ nhớ",
    "question": "Tốc độ duyệt cây trung bình của bot là 25,400 NPS. Nhóm đã làm những gì để tối ưu hóa hiệu năng trên nền tảng ngôn ngữ Python?",
    "category": "general",
    "topic": "architecture",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, Python là ngôn ngữ thông dịch có chi phí overhead lớn, các engine Python thông thường chỉ đạt 5,000 - 8,000 NPS. Nhóm 12 đã tối ưu hóa toàn diện để nâng tốc độ lên 25,400 NPS (gấp 3-4 lần) nhờ 5 kỹ thuật: (1) Đóng gói Bitboard 32-bit trong PeSTO: cộng dồn cả MG và EG bằng 1 phép cộng số nguyên duy nhất. (2) Pre-computation: nạp sẵn 64 vùng King Ring và bảng PST lúc khởi động, không tính lại trong ván đấu. (3) Bảng TT mảng cố định 2^19: dùng bitwise index = key & (size - 1) thay cho phép chia %. (4) Giảm tần suất đọc đồng hồ bằng bitwise check `nodes & 127 == 0`. (5) Tận dụng tối đa các hàm C tối ưu của thư viện python-chess (như board.is_check(), board.attackers(), board.push/pop).",
      "deepExplanation": "Báo cáo mục 4.5 ghi nhận chi tiết: Thông lượng đánh giá độc lập của hàm evaluate() đạt xấp xỉ 100,000 evals/giây (mỗi lần evaluate chỉ mất ~10 microseconds). Trong Searcher, nhờ Move Ordering 8 bậc gây ra Beta-cutoff ở ngay nước đầu tiên trong > 80% trường hợp, cây tìm kiếm không bị phân nhánh lan man. Sự kết hợp giữa tối ưu hóa mã nguồn cấp thấp và thuật toán cắt tỉa thông minh giúp bot đạt độ sâu 4-5 ply ổn định trong thời gian Blitz 1.1s.",
      "executionFlow": [
        "1. Khởi tạo: Pre-compute bitboards -> nạp sẵn vào RAM",
        "2. Trong loop: Tránh cấp phát bộ nhớ heap (không tạo object mới)",
        "3. Đọc đồng hồ: Giảm 128 lần overhead bằng nodes & 127 == 0",
        "4. Duyệt nước: Timsort C-speed cho Move Ordering",
        "5. Duyệt lá: Bitboard 64-bit bitwise siêu tốc"
      ],
      "codeRef": {
        "file": "student/evaluation.py & search.py",
        "functionName": "evaluate & _negamax",
        "lines": "All modules"
      },
      "concreteExample": "Nếu không dùng bitwise `nodes & 127 == 0`, việc gọi time.monotonic_ns() ở mỗi node làm tốc độ tụt từ 25,400 NPS xuống còn 19,000 NPS. Nhờ tối ưu bitwise, bot lấy lại được 25% hiệu năng tính toán.",
      "teacherFollowUps": [
        {
          "question": "Tại sao nhóm không dùng thư viện multiprocessing để tìm kiếm song song đa luồng?",
          "answer": "Dạ, vì trong Python có cơ chế GIL (Global Interpreter Lock). Việc dùng multiprocessing đòi hỏi phải copy bàn cờ qua IPC giữa các tiến trình con, chi phí truyền dữ liệu (serialization overhead) lớn hơn nhiều thời gian tính toán, khiến chạy đa tiến trình trong Python cờ vua thường chậm hơn chạy đơn luồng tối ưu."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng bật multi-threading trong Python sẽ tự động tăng tốc cờ vua (bị dính GIL)",
        "Không nêu được các con số tối ưu cụ thể"
      ]
    },
    "tags": [
      "NPS",
      "Python Optimization",
      "Bitboard Speed",
      "GIL",
      "Performance Tuning"
    ]
  },
  {
    "id": "GEN-15",
    "title": "Phân tích 25 Hàm Phụ trợ và Cấu trúc Cơ sở trong Bảng 7",
    "question": "Báo cáo Bảng 7 liệt kê 25 hàm và thành phần phụ trợ cốt lõi. Em hãy giải thích vai trò của các hàm Bitboard: _popcount, _north_fill, _south_fill, _spread_files trong evaluation.py?",
    "category": "general",
    "topic": "code",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, 4 hàm bitboard này là nền tảng xử lý không gian bàn cờ 64-bit siêu tốc trong evaluation.py: (1) `_popcount(bb)`: đếm số bit 1 trong số nguyên 64-bit (sử dụng toán tử nhị phân int.bit_count()), dùng để đếm số lượng quân cờ hoặc số ô bị kiểm soát trong O(1). (2) `_north_fill(bb)`: lan truyền các bit 1 lên phía bắc (hàng trên) bằng phép dịch bit `bb |= (bb << 8)` lặp 3 lần, dùng để tạo mặt nạ vùng phía trước của Tốt Trắng. (3) `_south_fill(bb)`: lan truyền các bit 1 xuống phía nam bằng phép dịch bit `bb |= (bb >> 8)`, dùng để tạo mặt nạ vùng phía trước của Tốt Đen. (4) `_spread_files(bb)`: lan truyền các cột có Tốt bằng phép toán `_north_fill(bb) | _south_fill(bb)`, dùng để xác định các cột mở và cột bán mở trong đúng 2 phép toán bitwise.",
      "deepExplanation": "Tại sao dùng các hàm này thay vì vòng lặp? Trong cờ vua biểu diễn Bitboard 64-bit, việc kiểm tra xem một quân Tốt có phải là Tốt thông hay không bằng vòng lặp Python sẽ mất duyệt qua 8-16 ô cờ. Bằng phép toán `_north_fill(bp)`, ta tạo ra một mặt nạ toàn bộ các ô phía trước của Tốt đối phương trong đúng 3 phép dịch bit. Sau đó chỉ cần lấy `pawn_attacks & _north_fill(bp) == 0` là biết ngay có phải Tốt thông hay không trong 1 chu kỳ lệnh! Đây là bí quyết giúp hàm evaluate đạt thông lượng 100,000 evals/giây.",
      "executionFlow": [
        "1. _popcount(bb): return bb.bit_count()",
        "2. _north_fill(bb): bb |= (bb << 8); bb |= (bb << 16); bb |= (bb << 32); return bb & 0xFFFFFFFFFFFFFFFF",
        "3. _south_fill(bb): bb |= (bb >> 8); bb |= (bb >> 16); bb |= (bb >> 32); return bb",
        "4. _spread_files(bb): return _north_fill(bb) | _south_fill(bb)"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "_popcount, _north_fill, _spread_files",
        "lines": "364-425"
      },
      "concreteExample": "Để tìm các cột mở (không có bất kỳ Tốt nào của cả 2 bên): all_pawns = wp | bp. Hàm chỉ cần tính: open_files = ~_spread_files(all_pawns) & 0xFF. Chỉ 1 dòng lệnh duy nhất tìm ra toàn bộ các cột mở trên bàn cờ!",
      "teacherFollowUps": [
        {
          "question": "Toán tử bit_count() trong Python 3.12 chạy bằng C hay Python?",
          "answer": "Dạ, int.bit_count() trong Python 3.12 là hàm built-in được biên dịch trực tiếp thành lệnh phần cứng POPCNT của CPU x86/ARM, tốc độ thực thi chỉ tốn 1 chu kỳ xung nhịp."
        }
      ],
      "commonMistakes": [
        "Tưởng rằng nhóm tự viết vòng lặp while đếm từng bit",
        "Không giải thích được ứng dụng của _north_fill trong nhận diện Tốt thông"
      ]
    },
    "tags": [
      "Bitboard",
      "_popcount",
      "_north_fill",
      "_spread_files",
      "Table 7",
      "Bitwise Hacks"
    ]
  },
  {
    "id": "GEN-16",
    "title": "Hàm _pst_sum và Cách Tính Tổng Điểm Vị trí 32-bit",
    "question": "Hàm _pst_sum(bb, table) trong evaluation.py nhận vào cái gì và duyệt các quân cờ trên bàn cờ như thế nào?",
    "category": "general",
    "topic": "evaluation",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ, hàm `_pst_sum(bb: int, table: tuple[int, ...]) -> int` nhận vào bitboard 64-bit đại diện cho vị trí của một loại quân cờ (ví dụ bitboard toàn bộ Mã Trắng) và bảng điểm PeSTO đã đóng gói 32-bit tương ứng. Hàm duyệt qua từng quân cờ bằng kỹ thuật bit-twiddling kinh điển: `sq = (bb & -bb).bit_length() - 1` để lấy chỉ số ô cờ của quân cờ có trọng số thấp nhất, cộng điểm `s += table[sq]`, sau đó xóa bit đó bằng `bb &= bb - 1`. Quá trình lặp lại cho đến khi bitboard rỗng (bb == 0).",
      "deepExplanation": "Kỹ thuật `bb &= bb - 1` (Kernighan's bit-trick) có tốc độ cực nhanh: Số vòng lặp bằng đúng số lượng quân cờ thực tế có trên bàn (ví dụ chỉ có 2 quân Mã thì vòng lặp chạy đúng 2 lần), thay vì phải duyệt qua toàn bộ 64 ô cờ của bàn cờ! Hơn nữa, vì `table[sq]` là số nguyên đóng gói 32-bit chứa cả MG và EG, biến tổng `s` tích lũy đồng thời cả 2 điểm số trong cùng một vòng lặp.",
      "executionFlow": [
        "1. s = 0",
        "2. while bb:",
        "   - sq = (bb & -bb).bit_length() - 1  # Lấy ô cờ (LSB index)",
        "   - s += table[sq]  # Cộng điểm đóng gói 32-bit",
        "   - bb &= bb - 1  # Xóa bit vừa duyệt",
        "3. return s"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "_pst_sum",
        "lines": "385-405"
      },
      "concreteExample": "Trắng có 2 Xe ở a1 (sq 0) và f1 (sq 5). Bitboard bb chỉ có bit 0 và bit 5 bật. Vòng 1: sq = 0, s += table[0], bb xóa bit 0. Vòng 2: sq = 5, s += table[5], bb xóa bit 5 -> bb = 0 -> Dừng ngay. Vòng lặp chỉ chạy 2 bước là xong!",
      "teacherFollowUps": [
        {
          "question": "Tại sao (bb & -bb).bit_length() - 1 lại ra được chỉ số ô cờ?",
          "answer": "Dạ, trong bù 2, phép toán `bb & -bb` sẽ cô lập duy nhất bit 1 thấp nhất (Least Significant Bit). Hàm bit_length() trả về vị trí của bit đó từ 1 đến 64, trừ đi 1 sẽ ra chỉ số ô cờ từ 0 đến 63 chuẩn xác."
        }
      ],
      "commonMistakes": [
        "Dùng vòng lặp for i in range(64) kiểm tra từng ô làm chậm tốc độ gấp 10 lần",
        "Không giải thích được ý nghĩa của bb &= bb - 1"
      ]
    },
    "tags": [
      "_pst_sum",
      "Bit-twiddling",
      "Kernighan",
      "LSB",
      "PeSTO Accumulation"
    ]
  },
  {
    "id": "GEN-17",
    "title": "Cấu trúc Lớp Searcher và Các Trạng thái Nội bộ",
    "question": "Lớp Searcher trong search.py duy trì những biến trạng thái nội bộ (Internal States) nào giữa các lần tìm kiếm?",
    "category": "general",
    "topic": "search",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, hàm `Searcher.__init__()` khởi tạo 6 thành phần trạng thái nội bộ: (1) `self.tt = TranspositionTable(TT_SIZE)`: Bảng băm chuyển vị 524,288 mục dùng chung xuyên suốt ván đấu. (2) `self.history_table`: Mảng 3 chiều `[2][64][64]` lưu điểm History Heuristic cho từng màu và từng cặp ô (from_sq, to_sq). (3) `self.killer_moves`: Mảng 2 chiều `[MAX_DEPTH][2]` lưu tối đa 2 nước sát thủ tại mỗi tầng ply. (4) `self.nodes`: Biến đếm số node duyệt trong lượt đi hiện tại. (5) `self.age`: Biến đếm số lượt đi đã qua của bot để phục vụ chiến lược thay thế TT Aging. (6) `self._timeout`: Cờ boolean đánh dấu trạng thái bị ngắt thời gian khẩn cấp.",
      "deepExplanation": "Sự quản lý vòng đời của các biến trạng thái: Ở đầu mỗi lượt đi mới trong hàm `search()`, bot reset `self.nodes = 0` và `self._timeout = False`; tăng `self.age += 1` để các mục TT cũ bị đánh dấu lỗi thời; và gọi `self._decay_history()` để làm suy giảm bảng history 50%. Riêng bảng TT và bảng history được duy trì liên tục từ đầu đến cuối ván đấu để tận dụng tri thức đã học được từ các nước đi trước.",
      "executionFlow": [
        "1. Khởi tạo 1 lần duy nhất trong StudentBot.__init__(): self.searcher = Searcher()",
        "2. Mỗi lượt đi trong searcher.search():",
        "   - self.nodes = 0",
        "   - self._timeout = False",
        "   - self.age += 1",
        "   - self._decay_history()",
        "3. Trong _negamax: cập nhật self.nodes, history_table, killer_moves, tt"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher.__init__",
        "lines": "623-645"
      },
      "concreteExample": "Khi ván đấu kéo dài qua 70 nước, biến self.age = 70. Một mục trong TT được ghi từ nước 10 (age = 10) sẽ có độ ưu tiên thấp và sẵn sàng bị ghi đè bởi nước đi mới ở nước 70.",
      "teacherFollowUps": [
        {
          "question": "Mảng killer_moves có bị xóa trắng giữa các lượt đi không?",
          "answer": "Dạ, killer_moves được tự động ghi đè theo từng ply trong quá trình duyệt cây, không cần reset toàn bộ mảng vì các nước killer của tầng trước sẽ nhanh chóng bị thay thế bởi các nước gây cắt tỉa của thế cờ mới."
        }
      ],
      "commonMistakes": [
        "Tưởng rằng mỗi nước đi bot tạo mới một đối tượng Searcher (làm mất toàn bộ bảng TT và History)"
      ]
    },
    "tags": [
      "Searcher",
      "Internal State",
      "history_table",
      "killer_moves",
      "nodes",
      "age"
    ]
  },
  {
    "id": "GEN-18",
    "title": "Cơ chế Check Extension và Khác biệt với Quiescence Search",
    "question": "Thế nào là Check Extension? Tại sao khi bị chiếu (in_check) thuật toán tìm kiếm lại không được cắt tỉa?",
    "category": "general",
    "topic": "search",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ, Check Extension là kỹ thuật tự động mở rộng độ sâu thêm 1 ply (`depth + 1`) khi bên đi đang bị chiếu. Lý do: Khi bị chiếu, không gian nước đi hợp lệ co cụm lại rất nhỏ (trung bình chỉ còn 2-4 nước cản chiếu hoặc né Vua), do đó hệ số rẽ nhánh tại node này cực thấp, chi phí tìm kiếm thêm 1 ply là không đáng kể. Quan trọng hơn, khi bị chiếu, thế cờ đang ở đỉnh điểm rủi ro chiến thuật (có thể bị chiếu hết ngay nước sau). Nếu ta áp dụng các kỹ thuật cắt tỉa như NMP, RFP, Futility Pruning khi đang bị chiếu, bot sẽ bỏ qua các nước cản chiếu và bị chiếu hết oan uổng! Do đó, tất cả các kỹ thuật cắt tỉa trong _negamax đều có điều kiện bắt buộc: `not board.is_check()`.",
      "deepExplanation": "Sự khác biệt với Quiescence Search: Quiescence Search chỉ mở rộng cho các nước ăn quân ở nút lá. Nhưng nếu tại nút lá Vua bị chiếu, Quiescence Search bắt buộc phải sinh toàn bộ các nước giải chiếu (kể cả nước yên tĩnh) để tìm đường sống cho Vua, và tắt hoàn toàn cơ chế Stand-pat. Việc bảo đảm không cắt tỉa khi bị chiếu là nguyên tắc sống còn để bot duy trì tỷ lệ 0% blunder trong suốt giải đấu.",
      "executionFlow": [
        "1. in_check = board.is_check()",
        "2. if in_check:",
        "   - TẮT toàn bộ RFP (Reverse Futility Pruning)",
        "   - TẮT toàn bộ NMP (Null Move Pruning - không được nhường lượt khi bị chiếu)",
        "   - TẮT toàn bộ FP (Futility Pruning) và LMR",
        "   - Trong Quiescence Search: TẮT Stand-pat cutoff"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1310-1440"
      },
      "concreteExample": "Ở trận thắng Nhóm 3 (POS-02), sau khi Đen đưa Hậu vào f2 chiếu Vua, Trắng bị chiếu bắt buộc phải né Vua vào d1 (chỉ có duy nhất 1 nước). Nếu Trắng dùng NMP pass lượt, Trắng sẽ không nhận ra nước tiếp theo 24... Be3# chiếu hết ngay lập tức.",
      "teacherFollowUps": [
        {
          "question": "Tại sao trong luật cờ vua không được thực hiện Null Move khi đang bị chiếu?",
          "answer": "Dạ, vì theo luật FIDE, khi bị chiếu người chơi bắt buộc phải thực hiện nước giải chiếu hợp lệ. Nhường lượt (Null move) đồng nghĩa với việc để Vua bị ăn ở nước sau, là hành vi bất hợp lệ."
        }
      ],
      "commonMistakes": [
        "Áp dụng NMP khi đang bị chiếu làm bot bị lỗi phạm quy",
        "Cho phép Stand-pat trong Quiescence Search khi Vua đang bị chiếu"
      ]
    },
    "tags": [
      "Check Extension",
      "in_check",
      "Tactical Safety",
      "Quiescence",
      "No-Pruning Guard"
    ]
  },
  {
    "id": "GEN-19",
    "title": "Phân tích 3 Tầng Bảo vệ trong choose_move Không Nhìn Code",
    "question": "Sinh viên hãy trình bày lại 3 tầng bảo vệ trong choose_move() mà không nhìn bất kỳ tài liệu hay đoạn mã nào?",
    "category": "general",
    "topic": "architecture",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em xin trình bày thuộc lòng bằng sự hiểu biết: Tầng 1 là Kiểm tra biên & Fast-Path 0ms: lấy danh sách legal_moves. Nếu danh sách rỗng (hết cờ), trả về Move.null(). Nếu danh sách chỉ có đúng 1 nước duy nhất (bắt buộc), trả về ngay trong 0 ms để tiết kiệm 100% thời gian cho nước sau. Tầng 2 là Sandbox bọc lót ngoại lệ: toàn bộ lệnh gọi tìm kiếm `self.searcher.search(board, tm)` được đặt trong khối `try...except Exception`. Nếu xảy ra bất kỳ lỗi gì làm ngắt tìm kiếm, bot tự động gán fallback = legal[0] để không bao giờ bị crash. Tầng 3 là Hậu kiểm tính hợp lệ: trước khi gửi nước đi ra ngoài, kiểm tra `if move not in board.legal_moves: move = legal[0]`. Chốt chặn này bảo đảm nước đi gửi cho trọng tài luôn luôn hợp lệ 100%.",
      "deepExplanation": "Ba tầng này phân công nhiệm vụ rất rõ ràng: Tầng 1 bảo vệ tài nguyên thời gian; Tầng 2 bảo vệ tiến trình không bị sập đột ngột; Tầng 3 bảo vệ bot không bị truất quyền thi đấu do vi phạm luật cờ. Nhờ 3 tầng này, Nhóm 12 hoàn thành trọn vẹn 48/48 ván đấu mà không dính một lỗi kỹ thuật nào.",
      "executionFlow": [
        "Tầng 1: len == 0 -> Move.null(); len == 1 -> legal[0] (0 ms)",
        "Tầng 2: try: search() except: fallback legal[0]",
        "Tầng 3: verify move in legal_moves -> return valid move"
      ],
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "choose_move",
        "lines": "45-97"
      },
      "concreteExample": "Khi bị đối thủ chiếu rút bắt buộc phải lấy Xe ăn lại quân chiếu: Tầng 1 phát hiện len(legal) == 1, trả về nước ăn Xe ngay lập tức trong 0 ms mà không cần tốn 1 chu kỳ CPU nào cho việc chạy Negamax.",
      "teacherFollowUps": [
        {
          "question": "Nước đi trả về cho hệ thống có định dạng gì?",
          "answer": "Dạ, phương thức choose_move trả về một đối tượng `chess.Move` (ví dụ chess.Move.from_uci('e2e4')). Tiến trình vỏ bọc bot_worker sẽ chuyển đổi đối tượng này thành chuỗi JSON chuẩn để gửi cho Host."
        }
      ],
      "commonMistakes": [
        "Không nhớ thứ tự của 3 tầng bảo vệ",
        "Nghĩ rằng Tầng 3 là thừa thãi vì Tầng 2 đã bọc try...except"
      ]
    },
    "tags": [
      "Oral Recitation",
      "3-Tier Defense",
      "bot.py",
      "No-code Defense",
      "Core Architecture"
    ]
  },
  {
    "id": "GEN-20",
    "title": "Phân tích Kịch bản Bài toán Số Cụ thể về Phân bổ Ngân sách",
    "question": "Giả sử bot còn 1,200 ms thi đấu, ply hiện tại là 110. Em hãy tính toán chính xác ngân sách tìm kiếm được cấp và cách thuật toán giám sát thời gian?",
    "category": "general",
    "topic": "time-management",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em giải bài toán số như sau: (1) Kiểm tra điều kiện: Thời gian còn lại t = 1,200 ms <= 1,500 ms. Ngay lập tức điều kiện Extreme Panic Mode được kích hoạt! (2) Cấp phát ngân sách: Hàm compute_budget_ms bỏ qua toàn bộ phân tầng ply thông thường, cấp ngân sách khẩn cấp: min_ms = 8 ms, opt_ms = 12 ms, max_ms = 15 ms. (3) Giám sát đệ quy: Searcher chạy IDS depth 1. Sau mỗi 128 nodes (nodes & 127 == 0), hàm should_stop() kiểm tra thời gian đã trôi qua. Ngay khi elapsed >= 15 ms (Hard Limit), cờ self._timeout bật lên True, hàm ngắt đệ quy ngay lập tức và trả về nước đi tốt nhất của depth 1 trong vòng chưa đầy 15 ms, bảo đảm an toàn tuyệt đối trước độ trễ sàn 500 ms của máy chủ.",
      "deepExplanation": "Tại sao ply = 110 không còn ý nghĩa ở đây? Vì theo logic trong `compute_budget_ms`, điều kiện khẩn cấp `time_remaining_ms <= 1500` nằm ở nhánh IF đầu tiên, có độ ưu tiên cao nhất! Nó ghi đè lên toàn bộ các nhánh kiểm tra ply <= 62 hay ply <= 110. Ở thời khắc sinh tử khi chỉ còn 1.2 giây, ưu tiên số 1 của bot là không được để rụng kim, do đó ngân sách bị bóp nghẹt xuống đúng 8-15 ms.",
      "executionFlow": [
        "1. Nhận t = 1200 ms, ply = 110",
        "2. if t <= 1500: extreme_panic -> min_ms = 8, opt_ms = 12, max_ms = 15",
        "3. Khởi tạo TimeBudget(8, 12, 15)",
        "4. Searcher chạy depth 1",
        "5. Tại node thứ 128: elapsed >= 15 ms -> should_stop() = True",
        "6. Trả nước đi của depth 1 sau 15 ms"
      ],
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "compute_budget_ms",
        "lines": "45-55"
      },
      "concreteExample": "Trong thực tế thi đấu, nhờ nhánh Extreme Panic này mà khi ván đấu gặp Nhóm 11 bước vào nước 76 (short-p76-l2), bot vẫn ung dung đi nước g5 an toàn trong khi đối thủ còn 258 ms và bị xử thua timeout.",
      "teacherFollowUps": [
        {
          "question": "Nếu thời gian còn lại là 2,500 ms thì ngân sách được tính thế nào?",
          "answer": "Dạ, 2,500 ms rơi vào Panic Mode (<= 3,500 ms), ngân sách sẽ được cấp là min_ms = 35 ms, opt_ms = 45 ms, max_ms = 50 ms."
        }
      ],
      "commonMistakes": [
        "Áp dụng công thức ply > 55 cấp 25-40ms thay vì nhận ra ngưỡng Extreme Panic 1.5s",
        "Không nêu được Soft Limit và Hard Limit cụ thể"
      ]
    },
    "tags": [
      "Math Problem",
      "Numerical Case",
      "Extreme Panic",
      "1200ms",
      "15ms Hard Limit"
    ]
  },
  {
    "id": "GEN-21",
    "title": "Tổng kết Thành tích Thi đấu và Độ tin cậy Thực chiến (Bảng 8 và Bảng 9)",
    "question": "Trình bày tổng kết thành tích thi đấu của Nhóm 12 qua 48 ván đối đầu vòng tròn? Nhóm đạt được những chỉ số kỷ lục nào toàn giải?",
    "category": "general",
    "topic": "experiment",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, theo Bảng 8 và Bảng 9 trong báo cáo: Trong 48 ván đối đầu vòng tròn chính thức với 12 đối thủ (24 ván Trắng, 24 ván Đen), Nhóm 12 đạt thành tích: 16 ván Thắng, 1 ván Hòa, 31 ván Thua, giành tổng cộng 49 điểm số giải đấu. Nhóm xác lập 4 chỉ số kỷ lục ấn tượng: (1) Độ tin cậy tuyệt đối: 0 ván thua Timeout (0%), hoàn thành 100% số ván đấu. (2) Đội duy nhất toàn giải có 3 ván thắng trực tiếp bằng ép đối thủ hết giờ (Timeout Win). (3) Thời gian dư trung bình khi kết thúc ván đạt 48.2 giây (cao nhất toàn giải đấu). (4) Ván đấu có độ chính xác cao nhất giải: trận thắng Nhóm 3 (POS-01, POS-02) đạt 98.20% Stockfish accuracy, và ván marathon dài nhất giải 123 nước (POS-09).",
      "deepExplanation": "Phân tích kết quả theo nhóm đối thủ: (1) Nhóm ngang tầm và top dưới (Nhóm 3, 4, 6, 9, 11, 13): Nhóm 12 chiếm ưu thế áp đảo với 16 chiến thắng, khai thác triệt để sai lầm khai cuộc và tàn cuộc của đối thủ. (2) Nhóm top 5 dẫn đầu (Nhóm 1, 2, 5, 7, 10): Nhóm để thua do rào cản độ sâu 4 ply của nền tảng Python trước các engine viết bằng C++/Rust. Điều này khẳng định bot của nhóm có độ ổn định và tính thực chiến cực kỳ cao trong phân khúc engine Python.",
      "executionFlow": [
        "1. Tổng 48 ván: 16 Thắng (33.3%), 1 Hòa (2.1%), 31 Thua (64.6%)",
        "2. Tổng điểm: 16*3 + 1*1 = 49 điểm (Hạng 10/13 Leaderboard)",
        "3. Thời gian TB/nước: 1.162 giây (độ lệch chuẩn cực thấp σ = 0.429s)",
        "4. Tỷ lệ Blunder: 0% trong suốt giải đấu"
      ],
      "codeRef": {
        "file": "docs/source-map.md",
        "functionName": "Tournament Audit",
        "lines": "Table 8 & 9"
      },
      "concreteExample": "Bảng 9 chứng minh tính kỷ luật thời gian: trong khi toàn giải xảy ra tới 15 ván các đội bị xử thua rụng kim, Nhóm 12 bảo toàn 100% ván đấu không timeout, và trừng phạt các đối thủ cạn giờ như Nhóm 4 và Nhóm 11.",
      "teacherFollowUps": [
        {
          "question": "Tại sao thời gian trung bình mỗi nước là 1.162 giây trong khi ngân sách bot chỉ là 150-220 ms?",
          "answer": "Dạ, vì thời gian 1.162 giây là thời gian đo từ phía trọng tài, đã bao gồm cả độ trễ sàn ngẫu nhiên 500-1000 ms của máy chủ cộng với thời gian suy nghĩ 180 ms của bot."
        }
      ],
      "commonMistakes": [
        "Không nhớ các con số thống kê chính thức (16W, 1D, 31L, 49 pts)",
        "Không giải thích được sự khác nhau giữa thời gian bot và thời gian server"
      ]
    },
    "tags": [
      "Tournament Stats",
      "Table 8",
      "Table 9",
      "49 Points",
      "Zero Timeout",
      "Record Accuracy"
    ]
  },
  {
    "id": "GEN-22",
    "title": "Khai báo Sử dụng AI (AI Disclosure) và Phân định Đóng góp",
    "question": "Nhóm đã sử dụng AI (như Claude, ChatGPT) vào những phần việc nào và tỷ lệ đóng góp thực tế của sinh viên là bao nhiêu?",
    "category": "general",
    "topic": "project-overview",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ thưa thầy, theo Báo cáo mục 6.2 và tập tin AI_USAGE.md: Tỷ lệ sinh viên tự nghiên cứu, thiết kế kiến trúc và gỡ lỗi chiếm trên 85%. AI chỉ hỗ trợ dưới 15% trong phạm vi được môn học cho phép, bao gồm: (1) Tra cứu nhanh cú pháp các hàm Bitboard và luật Chess960 trong thư viện python-chess. (2) Gợi ý template khung kiểm thử ban đầu bằng pytest. (3) Tham khảo định dạng bảng điểm PeSTO quốc tế. Toàn bộ logic tìm kiếm Negamax PVS, kiến trúc phòng thủ 3 tầng, phân bổ ngân sách hấp thụ trễ sàn và thuật toán Dynamic King Ring đều do 4 thành viên tự tay thiết kế và tối ưu hóa.",
      "deepExplanation": "Báo cáo trình bày rất minh bạch: Mọi dòng code sinh bởi công cụ hỗ trợ đều được các thành viên đọc hiểu, kiểm thử độc lập và viết lại theo đúng cấu trúc của nhóm. Bằng chứng là trong báo cáo, nhóm giải thích cặn kẽ từng bit nhị phân, từng phép bù dấu 0x8000, từng ngưỡng thời gian và phân tích thấu đáo cả những ván thua chiến thuật (như POS-05 và POS-10), điều mà các công cụ AI thông thường không thể tự bịa ra được.",
      "executionFlow": [
        "1. Ý tưởng thuật toán & Kiến trúc: 100% sinh viên",
        "2. Cài đặt mã nguồn 2,847 dòng: > 85% sinh viên tự viết",
        "3. AI Assistance (< 15%): Tra cứu API python-chess, template pytest",
        "4. Tinh chỉnh Heuristic & Đấu thực nghiệm: 100% sinh viên"
      ],
      "codeRef": {
        "file": "AI_USAGE.md",
        "functionName": "AI Disclosure",
        "lines": "1-50"
      },
      "concreteExample": "Khi gặp lỗi bit-packing PeSTO bị mượn bit dấu số âm, chính bạn Việt đã tự nghiên cứu biểu diễn bù 2 và áp dụng phép cộng bù 0x8000 để xử lý dứt điểm lỗi tràn bit mà không phụ thuộc vào AI.",
      "teacherFollowUps": [
        {
          "question": "Sinh viên có hiểu hết 100% các dòng code nộp cho thầy không?",
          "answer": "Dạ có, toàn bộ 4 thành viên đều có thể trình bày rành mạch bất kỳ hàm nào trong cả 4 file mà không cần nhìn tài liệu hay code."
        }
      ],
      "commonMistakes": [
        "Che giấu việc dùng AI hoặc khai báo không trung thực",
        "Nói rằng AI viết hết code"
      ]
    },
    "tags": [
      "AI Disclosure",
      "Academic Honesty",
      "85% Student Work",
      "AI_USAGE.md",
      "Self-reliance"
    ]
  },
  {
    "id": "GEN-31",
    "title": "So sánh Hiệu quả Cắt tỉa: Minimax vs Alpha-Beta vs PVS vs NMP",
    "question": "Em hãy so sánh số lượng node phải duyệt trên lý thuyết giữa Minimax thuần, Alpha-Beta lý tưởng, PVS và Null Move Pruning?",
    "category": "general",
    "topic": "search",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, với hệ số rẽ nhánh tự nhiên b ≈ 35 và độ sâu d = 4: (1) Minimax thuần: duyệt toàn bộ cây b^d = 35^4 ≈ 1,500,000 nodes. (2) Alpha-Beta lý tưởng (với Move Ordering hoàn hảo): giảm xuống b^(d/2) = 35^2 ≈ 1,225 nodes (giảm hơn 1,000 lần!). (3) PVS (Principal Variation Search): nhờ Zero-Window ở các node phụ, giảm thêm khoảng 25-35% số node so với Alpha-Beta thường, còn khoảng 800-900 nodes. (4) Null Move Pruning (NMP): tại các node áp đảo, cắt tỉa sâu thêm R = 2-3 tầng, đưa số node thực tế mà bot Nhóm 12 duyệt ở depth 4 xuống chỉ còn khoảng 4,000 - 7,000 nodes cho toàn bộ quá trình IDS.",
      "deepExplanation": "Bản chất toán học: Alpha-Beta chuyển đổi độ phức tạp từ O(b^d) về O(b^(d/2)), nghĩa là với cùng một khoảng thời gian, bot có thể tìm kiếm sâu gấp đôi! PVS và NMP tiếp tục thu hẹp hằng số nhân phía trước, giúp bot viết bằng Python thuần đạt được độ sâu 4-5 ply trong 1.1s, điều mà Minimax thuần phải mất hàng tiếng đồng hồ mới chạy xong.",
      "executionFlow": [
        "1. Minimax: O(b^d) ~ 1,500,000 nodes",
        "2. Alpha-Beta tối ưu: O(b^(d/2)) ~ 1,225 nodes",
        "3. PVS (Zero-Window): Giảm thêm 30% nhánh phụ",
        "4. NMP (Null Move R=2/3): Cắt nhánh sớm ở các thế áp đảo"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1280-1550"
      },
      "concreteExample": "Nếu chạy Minimax thuần ở ván đấu 123 nước, bot sẽ cạn sạch thời gian ngay từ nước thứ 3. Nhờ có Alpha-Beta + PVS + NMP, bot thi đấu 123 nước liên tục mà không hề bị quá giờ.",
      "teacherFollowUps": [
        {
          "question": "Khi nào thì Alpha-Beta bị thoái hóa về Minimax thuần O(b^d)?",
          "answer": "Dạ, khi Move Ordering bị tồi tệ nhất (nước hay nhất luôn bị duyệt cuối cùng), Alpha-Beta sẽ không cắt tỉa được nhánh nào và phải duyệt toàn bộ cây O(b^d)."
        }
      ],
      "commonMistakes": [
        "Không nhớ công thức tiệm cận tối ưu O(b^(d/2)) của Alpha-Beta"
      ]
    },
    "tags": [
      "Big-O Complexity",
      "Minimax",
      "Alpha-Beta",
      "PVS",
      "NMP",
      "Node Reduction"
    ]
  },
  {
    "id": "GEN-32",
    "title": "Phân tích Tình huống Đòn Chiếu Tiêu biểu POS-01 (short-p32-l1)",
    "question": "Trận đấu short-p32-l1 trước Nhóm 3 (POS-01) thể hiện năng lực chiến thuật nào của bot và tại sao đạt độ chính xác kỷ lục 98.20%?",
    "category": "general",
    "topic": "experiment",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, trận POS-01 là minh chứng đỉnh cao cho sự phối hợp giữa hàm evaluate và Move Ordering: Nhóm 3 mắc sai lầm lớn khi đi 13. Bxe7 ăn Tượng Đen, làm lộ toang Vua Trắng trên cột e mở. Nhờ Threat Evasion Heuristic (+850,000 điểm) kết hợp điểm thưởng Xe cột mở (+35 cp), bot Nhóm 12 phản công tức thì bằng 13... Rfe8 chỉ sau 1,133 ms, đảo chiều thế cờ sang -588 cp cho Đen. Sau đó bot phong tỏa hoàn toàn Vua Trắng và chiếu hết ở nước 24 (POS-02). Độ chính xác đạt 98.20% vì toàn bộ 11 nước đi liên tiếp của bot đều trùng khớp với nước cờ số 1 của Stockfish.",
      "deepExplanation": "Báo cáo mục 5.4.1 khẳng định đây là ván đấu chuẩn mực nhất giải của Nhóm 12: Đen không hề vội vàng ăn lại quân mà nhìn thấy ngay đòn ghim trung tâm. Việc đưa Xe vào cột e mở đã trói chặt Vua và Xe Trắng, mở toang đường cho Hậu Đen tiến sâu vào f2 dứt điểm trận đấu.",
      "executionFlow": [
        "1. Nhóm 3 đi 13. Bxe7 (Blunder làm hở Vua)",
        "2. Nhóm 12 Move Ordering ưu tiên 13... Rfe8 (Threat Evasion)",
        "3. Searcher đánh giá thế trận chuyển sang -588 cp cho Đen",
        "4. Dứt điểm bằng đòn chiếu hết đường chéo 24... Be3# (POS-02)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._order_moves",
        "lines": "820-850"
      },
      "concreteExample": "Hình 18a trong báo cáo chụp lại thế cờ POS-01: Xe Đen chiếm lĩnh cột e mở, Vua Trắng ở e1 hoàn toàn bất lực trước đòn phối hợp của Đen.",
      "teacherFollowUps": [
        {
          "question": "Tại sao đối thủ Nhóm 3 lại mắc sai lầm Bxe7?",
          "answer": "Dạ, vì đối thủ dùng thuật toán tham lam ăn quân nhẹ mà không nhìn thấy ở độ sâu sau cột e mở sẽ khiến Vua của họ bị tấn công trực diện."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng bot thắng là do đối thủ bị timeout thay vì nhìn thấy đòn ghim chiến thuật"
      ]
    },
    "tags": [
      "Case Study",
      "POS-01",
      "Threat Evasion",
      "Pin",
      "Open e-file",
      "98.20% Accuracy"
    ]
  },
  {
    "id": "GEN-33",
    "title": "Phân tích Chiến thuật Ép Giờ Timeout Đối thủ POS-07",
    "question": "Trong trận short-p76-l1 (POS-07), tại sao bot Nhóm 12 lại ép thắng đối thủ bằng luật Timeout ở nước 75?",
    "category": "general",
    "topic": "experiment",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, đây là đòn trừng phạt đồng hồ mẫu mực của Nhóm 12: Nhóm 11 thi đấu rất chính xác (94.22% acc) nhưng tiêu hao quá nhiều thời gian ở trung cuộc, đến nước 75 chỉ còn vỏn vẹn 395 ms. Trong khi đó Nhóm 12 vẫn còn nguyên 22.2 giây dự trữ. Bot Nhóm 12 tung nước chiếu 75... Re2+ chỉ sau 501 ms. Do máy chủ ChessLab có độ trễ sàn tối thiểu 500 ms, khi quyền đi cờ chuyển sang Nhóm 11, đồng hồ của họ lập tức bị âm và trọng tài xử thua timeout ngay tức khắc!",
      "deepExplanation": "Báo cáo Bảng 9 và mục 5.4.3 nhấn mạnh: Nhóm 12 là đội duy nhất toàn giải có 3 ván thắng trực tiếp bằng ép giờ. Đây không phải là sự may mắn mà là một chiến lược thiết kế có chủ đích: TimeManager duy trì nhịp độ phản hồi đều đặn ~1.1s, vừa đủ hấp thụ trễ sàn vừa duy trì áp lực tâm lý cực lớn, khiến các đối thủ suy nghĩ lâu dần dần bị rơi vào bẫy cạn giờ.",
      "executionFlow": [
        "1. Nhóm 11 còn 395 ms (< 500 ms delay tối thiểu của server)",
        "2. Nhóm 12 còn 22.2 giây, đi 75... Re2+ sau 501 ms",
        "3. Server chuyển lượt, đồng hồ Nhóm 11 bị trừ âm",
        "4. Trọng tài xử thua Timeout ngay lập tức, Nhóm 12 thắng trọn 3 điểm"
      ],
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "compute_budget_ms",
        "lines": "37-95"
      },
      "concreteExample": "Bảng 9 ghi nhận Nhóm 12 có 3 trận ép thắng timeout: trận vs Nhóm 4 (nước 81), trận vs Nhóm 11 (nước 75, POS-07) và trận vs Nhóm 11 lượt về (nước 76).",
      "teacherFollowUps": [
        {
          "question": "Nếu nước đó bot nghĩ 2 giây thì sao?",
          "answer": "Dạ, nếu bot nghĩ 2 giây thì ván đấu vẫn tiếp diễn bình thường. Nhưng bằng cách đi cờ nhanh và đi nước chiếu bắt buộc, bot không cho đối thủ bất kỳ cơ hội nào để tích lũy thời gian."
        }
      ],
      "commonMistakes": [
        "Tưởng rằng đối thủ tự ngắt kết nối mạng thay vì thấy được vai trò của độ trễ sàn 500ms"
      ]
    },
    "tags": [
      "Case Study",
      "POS-07",
      "Timeout Win",
      "Server Delay",
      "Clock Pressure"
    ]
  },
  {
    "id": "GEN-34",
    "title": "Tại sao Hàm evaluate Luôn Chuẩn hóa theo board.turn",
    "question": "Tại sao hàm evaluate(board) bắt buộc phải nhân với color_sign (1 nếu White, -1 nếu Black) trước khi return?",
    "category": "general",
    "topic": "evaluation",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ, vì động cơ tìm kiếm của nhóm sử dụng thuật toán Negamax! Trong Negamax, hàm đệ quy luôn cố gắng tối đa hóa điểm số từ góc nhìn của bên đang đến lượt đi (board.turn). Nếu hàm evaluate trả về điểm tuyệt đối (dương cho Trắng, âm cho Đen), thì khi đến lượt Đen đi, một nước cờ có lợi cho Đen (làm điểm Trắng âm hơn) sẽ bị Negamax coi là nước cờ tồi và vứt bỏ! Bằng cách nhân với `color_sign = 1 if board.turn == chess.WHITE else -1`, một thế cờ có lợi cho Đen (+300 cp cho Đen) sẽ luôn luôn là số DƯƠNG từ góc nhìn của Đen, giúp logic tìm kiếm và cắt tỉa `if score >= beta` hoạt động chính xác 100% cho cả 2 màu quân.",
      "deepExplanation": "Bản chất toán học: Negamax chuẩn hóa cây trò chơi bằng cách đổi dấu điểm số ở mỗi tầng: `V(s) = max_m (-V(s'))`. Điểm lượng giá tại các nút lá bắt buộc phải là 'Lợi ích của bên đang có lượt đi tại nút lá đó'. Phép nhân với color_sign ở cuối hàm evaluate là cây cầu nối toán học quan trọng nhất giữa tri thức cờ vua (vốn hay tính theo điểm tuyệt đối của Trắng) và thuật toán tìm kiếm Negamax.",
      "executionFlow": [
        "1. evaluate tính điểm tổng s: Trắng hơn thì s > 0, Đen hơn thì s < 0",
        "2. color_sign = 1 if board.turn == chess.WHITE else -1",
        "3. return (score + tempo) * color_sign",
        "4. Kết quả: Bên nào đến lượt đi, nếu bên đó ưu thế thì điểm trả về luôn > 0"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "605-611"
      },
      "concreteExample": "Đen hơn 1 Xe: điểm tuyệt đối s = -500 cp. Đến lượt Đen đi: color_sign = -1. Hàm evaluate trả về: -500 * (-1) = +500 cp. Thuật toán Negamax của Đen thấy +500 cp là nước cờ tuyệt vời và chọn ngay nước đi này.",
      "teacherFollowUps": [
        {
          "question": "Nếu quên nhân với color_sign thì bot sẽ thi đấu ra sao khi cầm quân Đen?",
          "answer": "Dạ, khi cầm quân Đen, bot sẽ tự động chọn các nước cờ tệ nhất (dâng quân, tự chiếu hết) vì nó tưởng rằng điểm âm cho Trắng là điểm xấu cho chính nó!"
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng evaluate trả về điểm tuyệt đối cho Trắng",
        "Không hiểu mối liên hệ giữa color_sign và công thức Negamax"
      ]
    },
    "tags": [
      "color_sign",
      "Perspective",
      "Negamax Symmetry",
      "board.turn",
      "Evaluation Normalization"
    ]
  },
  {
    "id": "GEN-35",
    "title": "Phân tích 3 Bài học Kiến trúc Rút ra từ 48 Ván đấu (Chương 5)",
    "question": "Sau 48 ván đấu thực tế, nhóm đã rút ra 3 bài học kiến trúc quan trọng nhất nào được ghi nhận tại mục 5.5 của báo cáo?",
    "category": "general",
    "topic": "experiment",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, báo cáo tại mục 5.5 tổng kết 3 bài học kiến trúc sâu sắc: (1) Bài học 1 - Sức mạnh của Sự ổn định và Kỷ luật Thời gian: Trong cờ chớp không gia số, tính kỷ luật thời gian và khả năng phục hồi lỗi (3 tầng phòng thủ) quan trọng không kém gì độ sâu thuật toán. Nhóm 12 bảo toàn 100% ván đấu không timeout và giành 49 điểm nhờ sự bền bỉ này. (2) Bài học 2 - Giới hạn của Ngôn ngữ Thông dịch trước Rào cản Độ sâu: Tốc độ 25,400 NPS của Python khiến bot bị chặn ở depth 4-5 ply, hoàn toàn bất lực trước các đòn phối hợp tầm xa (7-8 ply) của các engine biên dịch. Muốn cạnh tranh ngôi vô địch, bắt buộc phải dùng C/C++ hoặc Rust. (3) Bài học 3 - Sự Đánh đổi giữa Heuristic Tĩnh và Độ sâu: Thêm quá nhiều tri thức cờ phức tạp vào evaluate làm giảm NPS, trong khi một hàm evaluate tinh gọn bằng Bitboard nhưng search sâu hơn 1 ply lại đem lại hiệu quả chiến thuật vượt trội hơn.",
      "deepExplanation": "Ba bài học này định hình toàn bộ tư duy kỹ thuật của nhóm: Trong môi trường thi đấu thực tế có ràng buộc thời gian và tài nguyên, một hệ thống AI hoàn hảo không phải là hệ thống có thuật toán phức tạp nhất, mà là hệ thống có sự cân bằng tối ưu giữa độ phức tạp tính toán, độ tin cậy vận hành và tốc độ phản hồi.",
      "executionFlow": [
        "Bài học 1: Phòng thủ 3 tầng + Delay Absorption -> 0% Timeout, 49 điểm",
        "Bài học 2: Python 25k NPS vs Rust 200k NPS -> Cần compiled extensions",
        "Bài học 3: Tinh gọn hàm evaluate để tối đa hóa Search Depth (Berliner's Law)"
      ],
      "codeRef": {
        "file": "docs/source-map.md",
        "functionName": "Architecture Lessons",
        "lines": "Chapter 5.5"
      },
      "concreteExample": "Thực tế chứng minh: Các đội có thuật toán rất phức tạp nhưng không tối ưu thời gian đã bị rụng kim 15 ván, trong khi bot Nhóm 12 với kiến trúc kỷ luật đã giành vị trí thứ 10/13 vững chắc.",
      "teacherFollowUps": [
        {
          "question": "Nếu thi đấu cờ tiêu chuẩn (thời gian 60 phút mỗi bên) thì các bài học này có thay đổi không?",
          "answer": "Dạ, trong cờ tiêu chuẩn khi thời gian dồi dào, hàm evaluate phức tạp và các tri thức chiến lược sâu sẽ phát huy tác dụng lớn hơn nhiều so với cờ chớp Blitz."
        }
      ],
      "commonMistakes": [
        "Chỉ kể bài học về mặt lập trình cú pháp thay vì nêu được các bài học kiến trúc hệ thống"
      ]
    },
    "tags": [
      "Architectural Lessons",
      "Chapter 5.5",
      "Stability",
      "Depth vs Eval",
      "Python Limits"
    ]
  },
  {
    "id": "GEN-36",
    "title": "So sánh Thời gian và Độ chính xác Giữa Nhóm 12 và Các Đội Khác (Bảng 9)",
    "question": "Bảng 9 chỉ ra thời gian trung bình của Nhóm 12 là 1.162s so với 4.201s của Nhóm 10 và 2.342s trung bình giải. Điều này đem lại lợi thế và bất lợi gì?",
    "category": "general",
    "topic": "time-management",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, thời gian trung bình 1.162s (thấp nhất giải đấu) đem lại 2 LỢI THẾ CỰC LỚN: (1) Tận dụng hoàn hảo độ trễ sàn 500-1000 ms của máy chủ, giúp đồng hồ thi đấu thực tế gần như không suy giảm, bảo toàn 48.2s kết thúc ván. (2) Tạo áp lực tốc độ liên tục khiến các đối thủ như Nhóm 4 và Nhóm 11 bị rụng kim thua cuộc. BẤT LỢI DUY NHẤT: Trong các thế cờ tàn cuộc cực kỳ then chốt, việc không dừng lại để suy nghĩ sâu hơn (3-5s) khiến bot đôi khi bỏ lỡ các đòn phối hợp chiến thuật 5-6 ply như ở ván POS-05 và POS-10.",
      "deepExplanation": "Bản chất chiến thuật: Đây là sự lựa chọn có tính toán của nhóm. Trong một giải đấu đường dài 48 ván cờ chớp không gia số, việc ưu tiên chống rủi ro timeout và bảo đảm 100% ván đấu hoàn chỉnh mang lại giá trị thực tế cao hơn việc mạo hiểm đào sâu ở một vài nước rồi bị xử thua rụng kim ở cuối trận.",
      "executionFlow": [
        "1. Nhóm 12: 1.162s/move -> 0 ván timeout, 49 điểm",
        "2. Nhóm 10: 4.201s/move -> Độ chính xác cao hơn nhưng chịu áp lực thời gian lớn",
        "3. Nhóm 11: 2.441s/move -> Thua timeout tới 4 ván (trong đó có 2 ván thua Nhóm 12)"
      ],
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "compute_budget_ms",
        "lines": "37-95"
      },
      "concreteExample": "Bảng 9 chứng minh rõ: Nhóm 11 có độ chính xác 94.22% (rất cao) nhưng vì nghĩ trung bình 2.44s/nước nên đã sạch đồng hồ ở nước 75 và bị Nhóm 12 bức tử timeout.",
      "teacherFollowUps": [
        {
          "question": "Tại sao nhóm không linh hoạt tăng thời gian ở những nước có nhiều biến động chiến thuật?",
          "answer": "Dạ, nhóm đã có cơ chế đó ở nước 118 trận gặp Nhóm 3 (POS-08) khi mở rộng lên 2.47s. Trong tương lai, nhóm sẽ bổ sung hàm phát hiện biến động thế cờ (Tactical Volatility Detector) để tự động tăng ngân sách cho các nước cờ phức tạp."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng chạy nhanh luôn là tốt mà không thấy được sự đánh đổi về độ sâu"
      ]
    },
    "tags": [
      "Table 9",
      "Time Comparison",
      "Time Discipline",
      "Tactical Volatility",
      "Timeout Defense"
    ]
  },
  {
    "id": "GEN-37",
    "title": "Phân tích Điểm Tempo Bonus (+9 cp) và Tính Bất đối xứng trong Lượng giá",
    "question": "Tại sao trong evaluate() nhóm lại cộng thêm TEMPO_BONUS = 9 cp cho bên có lượt đi? Con số 9 này có ý nghĩa gì?",
    "category": "general",
    "topic": "evaluation",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ, Tempo Bonus (+9 cp) phản ánh lợi thế 'được quyền hành động trước' trong cờ vua: Trong một thế cờ hoàn toàn đối xứng, bên có lượt đi luôn có lợi thế nhỏ vì họ là người chủ động tạo ra mối đe dọa trước và buộc đối phương phải phản ứng. Giá trị 9 centipawns (gần 0.1 Tốt) là hệ số chuẩn hóa quốc tế của trường phái PeSTO. Điểm thưởng này giúp hàm evaluate không bị dao động điểm số quanh mốc 0 khi hai bên đi các nước chờ đối xứng.",
      "deepExplanation": "Bản chất thuật toán: Trong cờ vua máy tính, nếu không có Tempo Bonus, khi duyệt cây tìm kiếm, bot có thể thấy việc đi trước hay đi sau trong thế cờ cân bằng có điểm số như nhau, dẫn tới việc đánh giá thụ động. Cộng 9 cp cho bên có lượt đi khuyến khích bot chủ động tìm kiếm các nước cờ gây sức ép và duy trì quyền tiên trong khai cuộc Chess960.",
      "executionFlow": [
        "1. evaluate tính toàn bộ điểm vật chất, vị trí, an toàn Vua",
        "2. Cộng điểm tempo: score += TEMPO_BONUS (9 cp)",
        "3. Nhân với color_sign: return score * color_sign"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "605-610"
      },
      "concreteExample": "Ở thế cờ xuất phát Chess960 lúc chưa ai đi cờ: nếu Trắng đi trước, đánh giá tĩnh của Trắng là +9 cp (thừa nhận Trắng có chút ưu thế đi trước).",
      "teacherFollowUps": [
        {
          "question": "Tại sao không đặt Tempo Bonus là 50 cp?",
          "answer": "Dạ, vì 50 cp bằng nửa quân Tốt, quá lớn so với thực tế và sẽ làm bot đánh giá quá lạc quan thế cờ của mình, dẫn tới việc chủ quan không phòng thủ."
        }
      ],
      "commonMistakes": [
        "Cộng Tempo Bonus nhầm vào bên không có lượt đi",
        "Không giải thích được ý nghĩa cờ vua của quyền tiên (Tempo)"
      ]
    },
    "tags": [
      "Tempo Bonus",
      "TEMPO_BONUS",
      "9 cp",
      "Initiative",
      "PeSTO Standard"
    ]
  },
  {
    "id": "GEN-38",
    "title": "Phân tích Cơ chế Thay thế TT: Depth-preferred with Aging",
    "question": "Tại sao chiến lược thay thế trong TranspositionTable lại kết hợp cả Depth và Aging? Nếu chỉ dùng Depth-preferred thì điều gì sẽ xảy ra?",
    "category": "general",
    "topic": "architecture",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, nếu CHỈ DÙNG Depth-preferred (chỉ ghi đè khi depth mới >= depth cũ): Một thế cờ ở khai cuộc được search tới depth 6 sẽ chiếm giữ vĩnh viễn ô băm đó trong suốt 100 nước đi tiếp theo của ván đấu! Khi ván cờ chuyển sang trung cuộc và tàn cuộc, một thế cờ hoàn toàn mới ở depth 4 rơi vào cùng chỉ số băm sẽ KHÔNG THỂ GHI ĐÈ mục cũ (vì depth 4 < 6), dẫn tới bảng TT bị tắc nghẽn bởi 'rác lịch sử' (Stale entries). Cơ chế Aging (kiểm tra `age != old.age`) giải quyết triệt để: mục cũ thuộc về lượt đi trước sẽ tự động bị giáng ưu tiên và cho phép ghi đè, giúp bảng TT luôn dành tài nguyên cho thế cờ hiện tại.",
      "deepExplanation": "Bản chất thuật toán: Trong `TranspositionTable.store()`: điều kiện ghi đè là `if old is None or depth >= old.depth or age != old.age`. Nhờ có điều kiện `age != old.age`, bảng băm của Nhóm 12 luôn tự động 'dọn rác' theo thời gian thực mà không cần tốn chi phí chạy thuật toán Garbage Collection hay duyệt qua 524,288 phần tử.",
      "executionFlow": [
        "1. Lấy mục cũ tại chỉ số băm: old = table[index]",
        "2. if old is None: ghi đè ngay",
        "3. elif depth >= old.depth: ghi đè vì độ sâu mới tin cậy hơn",
        "4. elif age != old.age: ghi đè vì mục cũ thuộc về nước đi trước đó trong quá khứ",
        "5. else: giữ nguyên mục cũ"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "TranspositionTable.store",
        "lines": "545-565"
      },
      "concreteExample": "Ở nước thứ 50, bảng TT không còn lưu bất kỳ mục nào của nước thứ 5, toàn bộ 16 MiB bộ nhớ tập trung tối đa cho việc tính toán các biến thể của nước 50.",
      "teacherFollowUps": [
        {
          "question": "Biến self.age được Searcher tăng lên ở đâu?",
          "answer": "Dạ, self.age được tăng lên 1 (self.age += 1) ngay dòng đầu tiên của hàm Searcher.search() ở mỗi lượt đi mới của bot."
        }
      ],
      "commonMistakes": [
        "Tưởng rằng bảng TT phải có luồng riêng để quét dọn rác",
        "Chỉ dùng Depth-preferred làm bảng băm bị tê liệt ở tàn cuộc"
      ]
    },
    "tags": [
      "TT Replacement",
      "Aging",
      "Depth-preferred",
      "Stale Entries",
      "Cache Invalidation"
    ]
  },
  {
    "id": "GEN-39",
    "title": "So sánh Hiệu năng giữa Move Ordering Có và Không có SEE",
    "question": "Nếu bỏ hàm see(board, move) trong _order_moves và chỉ dùng MVV-LVA thì cây tìm kiếm sẽ bị phình to như thế nào?",
    "category": "general",
    "topic": "search",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, nếu chỉ dùng MVV-LVA mà không có SEE: Mọi nước ăn quân đều được xếp lên đầu bất kể nó có an toàn hay không! Giả sử Hậu ta ăn một quân Tốt có Xe đối phương bảo vệ: MVV-LVA chỉ nhìn thấy 'Ăn được Tốt' và xếp nước Hậu liều mạng này lên vị trí số 1. Khi Negamax duyệt nhánh này đầu tiên, nó phải đào sâu xuống 4-5 ply mới nhận ra ta bị mất Hậu và bị lỗ nặng. Toàn bộ cây con khổng lồ dưới nước Hậu chết đó đã bị duyệt một cách vô ích! Hàm see() lọc tĩnh 1-ply phát hiện ngay SEE = -800 cp < 0, giáng nước này xuống nhóm Bad Captures để duyệt sau cùng, tiết kiệm tới 30-45% số node duyệt ở các thế cờ có nhiều va chạm ăn quân.",
      "deepExplanation": "SEE chính là bộ lọc thông minh (Pruning Filter) đứng giữa MVV-LVA và Searcher. Nó giải quyết triệt để nhược điểm 'tham lam mù quáng' của MVV-LVA. Kết hợp MVV-LVA để xếp thứ tự thô và SEE để thẩm định an toàn là chuẩn mực tối thượng của các engine cờ vua chuyên nghiệp.",
      "executionFlow": [
        "1. Nước ăn quân: tính MVV-LVA thô",
        "2. Gọi see(board, move):",
        "   - if see >= 0: Xếp vào Good Captures (+1,000,000 + mvv_lva)",
        "   - if see < 0: Giáng xuống Bad Captures (+100,000 + mvv_lva)",
        "3. Good Captures được duyệt trước Killer moves; Bad Captures bị đẩy xuống sau Killer moves"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._order_moves",
        "lines": "730-770"
      },
      "concreteExample": "Trong ván gặp Nhóm 13 (POS-03), nhờ SEE >= 0 mà nước Tốt ăn Mã đi lạc 12. bxa4 được xếp lên trước các nước ăn quân khác, giúp bot giành ưu thế hơn quân chỉ sau 1.1s.",
      "teacherFollowUps": [
        {
          "question": "Hàm see() có tốn thời gian không?",
          "answer": "Dạ, hàm see() chỉ chạy trên 1 ô cờ duy nhất và dùng tập hợp bitboard attackers, thời gian thực thi chỉ khoảng 1-2 microseconds, cực kỳ nhỏ so với việc phải chạy đệ quy 4 ply nếu không có SEE."
        }
      ],
      "commonMistakes": [
        "Đánh đồng MVV-LVA và SEE",
        "Tưởng rằng MVV-LVA đã tự biết ô cờ có bị bảo vệ hay không"
      ]
    },
    "tags": [
      "SEE vs MVV-LVA",
      "Bad Captures",
      "Search Tree Explosion",
      "Exchange Evaluation"
    ]
  },
  {
    "id": "GEN-40",
    "title": "Tại sao không dùng Thư viện Ngoài hay Mạng Nơ-ron Deep Learning",
    "question": "Nếu giảng viên hỏi: 'Tại sao nhóm không dùng AlphaZero hay mạng nơ-ron tích chập (CNN) để chơi cờ tốt hơn?', sinh viên trả lời thế nào để bảo vệ tính học thuật của đồ án?",
    "category": "general",
    "topic": "project-overview",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ thưa thầy, câu trả lời có 3 luận điểm vững chắc: (1) TUÂN THỦ QUY CHẾ: Đề tài môn học Biểu diễn tri thức và Tìm kiếm nâng cao (AI2014) yêu cầu sinh viên phải hiểu sâu và làm chủ các kỹ thuật biểu diễn tri thức và tìm kiếm đối kháng truyền thống. Quy chế cấm tuyệt đối Machine Learning và Deep Learning. (2) RÀNG BUỘC PHẦN CỨNG: Mô hình AlphaZero hay CNN đòi hỏi GPU mạnh mẽ và dung lượng hàng trăm Megabyte, không thể chạy được trong tiến trình CPU giới hạn 1 lõi và thời gian phản hồi 1 giây của máy chủ ChessLab. (3) TÍNH MINH BẠCH VÀ GIẢI THÍCH ĐƯỢC (Explainable AI): Thuật toán Minimax, Alpha-Beta, PeSTO Bitboard cho phép nhóm giải thích chính xác 100% nguyên nhân tại sao bot đi một nước cờ, từng con số centipawn và từng quyết định cắt tỉa, điều mà các mô hình 'hộp đen' (Black-box) Deep Learning không thể làm được.",
      "deepExplanation": "Bản chất môn học: Mục tiêu của đồ án không phải là tải một mô hình mạng nơ-ron có sẵn về chạy, mà là giúp sinh viên nắm vững nguyên lý toán học của cây trò chơi, các kỹ thuật tối ưu hóa bitboard, quản trị thời gian thực và kiến trúc chịu lỗi trong môi trường thực chiến.",
      "executionFlow": [
        "Luận điểm 1: Tuân thủ quy chế môn học AI2014 (Cấm ML/DL)",
        "Luận điểm 2: Ràng buộc phần cứng thi đấu (CPU 1 core, 1.0s Blitz)",
        "Luận điểm 3: Khả năng giải thích và kiểm toán mã nguồn (Explainable AI)"
      ],
      "codeRef": {
        "file": "AI_USAGE.md",
        "functionName": "Compliance",
        "lines": "1-30"
      },
      "concreteExample": "10 tình huống POS-01 đến POS-10 trong báo cáo chứng minh tính minh bạch: nhóm có thể chỉ ra chính xác dòng code nào, hằng số nào (+850,000 Threat Evasion hay PeSTO MG) đã định hướng cho nước đi của bot.",
      "teacherFollowUps": [
        {
          "question": "Nếu được phép dùng AI ở môn học khác thì nhóm sẽ chọn kiến trúc nào?",
          "answer": "Dạ, nhóm sẽ chọn kiến trúc mạng nơ-ron đánh giá vị trí cập nhật hiệu quả NNUE (như Stockfish 16), vì NNUE được tính toán cực nhanh trên CPU bằng tập lệnh SIMD/AVX2 mà không cần GPU."
        }
      ],
      "commonMistakes": [
        "Trả lời ấp úng hoặc nói rằng do nhóm không biết làm Deep Learning",
        "Không nêu được tính minh bạch và giải thích được của thuật toán cổ điển"
      ]
    },
    "tags": [
      "Defense Philosophy",
      "Explainable AI",
      "No-DeepLearning",
      "Academic Integrity",
      "AI2014"
    ]
  }
];
