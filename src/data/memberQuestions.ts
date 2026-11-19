import type { DefenseQuestion } from "../types";

export const MEMBER_QUESTIONS: DefenseQuestion[] = [
  {
    "id": "MEM-BACH-01",
    "title": "Kiến trúc tổng thể và luồng IPC giữa ChessLab Host và Bot",
    "question": "Em là tác giả thiết kế kiến trúc hệ thống, hãy giải thích cơ chế giao tiếp liên tiến trình (IPC) giữa ChessLab Host và StudentBot? Tại sao phải chuyển hướng sys.stdout?",
    "category": "member",
    "topic": "architecture",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiến trúc, IPC, bot.py, time_manager.py, TranspositionTable",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, ChessLab Host và Bot chạy trên 2 tiến trình độc lập, giao tiếp qua kênh stdio chuẩn bằng thông điệp dòng JSON (JSON-RPC over standard I/O). Để ngăn chặn các lệnh print gỡ lỗi làm hỏng cấu trúc JSON trả về khiến bot bị xử thua kỹ thuật, tệp bot_worker.py tự động chuyển hướng toàn bộ sys.stdout sang sys.stderr. Kênh stdout thực sự chỉ mở khóa đúng 1 lần duy nhất để xuất chuỗi JSON phản hồi nước đi hợp lệ.",
      "deepExplanation": "Sự phân tách này mang tính sống còn cho tính cô lập và an toàn của giải đấu: (1) Tránh sập chéo: Nếu bot của nhóm hoặc đối thủ bị lỗi tràn ngăn xếp hay lỗi bộ nhớ, tiến trình con đó tự chết mà không làm sập máy chủ giải đấu. (2) Ngăn gian lận: Bot không thể can thiệp vào bộ nhớ, biến nội bộ hoặc đồng hồ của Host. (3) Định dạng bản tin: Host gửi FEN, thời gian còn lại hai bên và ply; Bot đọc từ sys.stdin và ghi nước đi chuẩn UCI ra sys.stdout.",
      "executionFlow": [
        "1. Host spawn subprocess chạy app/bot_worker.py, truyền BotConfig (màu quân, chess960_id, time_ms, seed)",
        "2. bot_worker chuyển hướng sys.stdout -> sys.stderr để bảo vệ đường truyền",
        "3. Mỗi lượt: Host gửi chuỗi JSON chứa FEN và SearchContext qua stdin",
        "4. StudentBot.choose_move() xử lý và trả về đối tượng chess.Move",
        "5. bot_worker chuyển đổi Move sang JSON string và ghi ra stdout thực sự"
      ],
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "StudentBot.choose_move",
        "lines": "40-97"
      },
      "concreteExample": "Bản tin Host gửi: {'fen': 'rnbqkbnr/...', 'time_left_ms': 58200, 'ply': 12}. Nếu sinh viên vô tình viết print('Evaluating...') mà không có stream isolation, chuỗi đó sẽ lọt vào stdout làm máy chủ parse JSON thất bại và xử thua bot ngay lập tức.",
      "teacherFollowUps": [
        {
          "question": "Tại sao không dùng giao tiếp qua HTTP API hay gRPC mà lại dùng stdin/stdout?",
          "answer": "Dạ, giao tiếp stdio có độ trễ cực thấp (< 0.1ms), không tốn chi phí mở cổng socket mạng, tránh lỗi xung đột cổng khi chạy cùng lúc hàng chục bot trên một máy chủ."
        },
        {
          "question": "Nếu đường truyền stdin bị nghẽn hoặc ngắt đột ngột thì bot xử lý thế nào?",
          "answer": "Dạ, bot_worker sẽ phát hiện EOF trên stdin và tự động dọn dẹp tiến trình, trả lại tài nguyên cho hệ điều hành mà không tạo tiến trình mồ côi."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng bot chạy chung luồng với máy chủ",
        "Không biết cơ chế stream redirection dẫn đến việc in log làm sập bot"
      ]
    },
    "tags": [
      "IPC",
      "Architecture",
      "bot.py",
      "Stream Isolation",
      "JSON-RPC"
    ]
  },
  {
    "id": "MEM-BACH-02",
    "title": "Bản chất Kiến trúc Phòng thủ 3 Tầng trong choose_move",
    "question": "Em hãy phân tích cặn kẽ 3 tầng phòng thủ trong choose_move(). Nếu bỏ tầng 1 hoặc tầng 3 thì hệ quả cụ thể trên ván đấu là gì?",
    "category": "member",
    "topic": "architecture",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiến trúc, IPC, bot.py, time_manager.py, TranspositionTable",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, Kiến trúc Phòng thủ 3 Tầng loại bỏ 100% nguy cơ thua kỹ thuật: Tầng 1 kiểm tra biên và kích hoạt 0ms Fast-Path khi bàn cờ hết nước (len=0) hoặc chỉ có 1 nước duy nhất (len=1). Tầng 2 bọc toàn bộ quá trình tìm kiếm trong khối try...except, nếu có sự cố lập tức gán fallback = legal[0]. Tầng 3 là chốt chặn cuối cùng kiểm tra if move not in board.legal_moves thì ép về legal[0].",
      "deepExplanation": "(1) Tầng 1: Khi bị chiếu chỉ có 1 đường cản hoặc chỉ còn 1 ô né Vua, việc chạy thuật toán tìm kiếm là vô ích vì kết quả cuối cùng vẫn chỉ có duy nhất 1 lựa chọn. Việc trả về ngay trong 0 ms giúp bảo toàn 100% CPU và thời gian cho các nước phức tạp sau. (2) Tầng 2: Phòng ngừa lỗi bộ nhớ, lỗi thư viện hoặc lỗi đệ quy ngoài ý muốn. (3) Tầng 3: Bảo hiểm tuyệt đối trước lỗi thuật toán trong search (ví dụ do hash collision trả về nước đi không hợp lệ của thế cờ khác).",
      "executionFlow": [
        "Tầng 1: legal = list(board.legal_moves). Nếu len == 0: return chess.Move.null(). Nếu len == 1: return legal[0] (0 ms)",
        "Tầng 2: try: move = self.searcher.search(board, tm) except Exception: move = legal[0]",
        "Tầng 3: if move not in board.legal_moves: move = legal[0] -> return move"
      ],
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "choose_move",
        "lines": "45-97"
      },
      "concreteExample": "Nếu bỏ Tầng 1: Khi bị chiếu bắt buộc ở nước thứ 5, bot vẫn bật Searcher lên tính toán mất 1.5 giây một cách vô nghĩa. Nếu bỏ Tầng 3: Giả sử xảy ra xung đột khóa Zobrist 64-bit trong TT, search trả về một nước bất hợp lệ ở thế cờ hiện tại -> Trọng tài xử thua phạm quy ngay lập tức!",
      "teacherFollowUps": [
        {
          "question": "Tại sao Tầng 1 trả về chess.Move.null() khi len(legal) == 0?",
          "answer": "Dạ, khi len(legal) == 0 bàn cờ đã kết thúc. Nếu cố truy cập legal[0] sẽ văng ngoại lệ IndexError. Trả về Move.null() là chuẩn UCI để thông báo cho Host biết ván đấu đã dừng."
        },
        {
          "question": "Tại sao fallback lại là legal[0] mà không phải một nước ngẫu nhiên?",
          "answer": "Dạ, vì legal[0] luôn là phần tử có sẵn đầu tiên trong danh sách hợp lệ sinh bởi python-chess, chi phí lấy là O(1) và bảo đảm 100% hợp lệ."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng searcher không bao giờ trả về nước bất hợp lệ",
        "Không hiểu tại sao len(legal)==1 lại không cần search"
      ]
    },
    "tags": [
      "3-Tier Defense",
      "bot.py",
      "Fast-path",
      "Fallback",
      "Safety"
    ]
  },
  {
    "id": "MEM-BACH-03",
    "title": "Chiến lược Hấp thụ Độ trễ Sàn (Delay Absorption) trong TimeManager",
    "question": "Nguyên lý Hấp thụ Độ trễ Sàn trong time_manager.py hoạt động như thế nào? Tại sao Nhóm 12 lại phân bổ ngân sách 150-220 ms ở trung cuộc?",
    "category": "member",
    "topic": "time-management",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiến trúc, IPC, bot.py, time_manager.py, TranspositionTable",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, máy chủ giải đấu ChessLab luôn bổ sung một khoảng dừng nhân tạo ngẫu nhiên từ 500 đến 1000 ms giữa các nước đi. Nếu bot suy nghĩ trong khoảng 150-220 ms, toàn bộ thời gian tính toán này sẽ nằm trọn bên trong độ trễ tối thiểu 500 ms của máy chủ! Nhờ đó, bot phản hồi cực nhanh mà đồng hồ thi đấu thực tế hầu như không bị khấu trừ thêm, đồng thời bảo toàn quỹ thời gian để ép đối thủ cạn giờ.",
      "deepExplanation": "Trong cờ chớp (Blitz) không gia số, thời gian là tài nguyên sống còn. Nhóm 12 nhận ra quy chế máy chủ có delay d >= 500 ms. Do đó, ở các nước 1-31 (trung cuộc), nhóm định hình ngân sách 150-220 ms, cộng với thời gian overhead của Python vừa đủ khớp ngưỡng sàn 500 ms. Kết quả là trong Bảng 9, Nhóm 12 có thời gian dư trung bình khi kết thúc ván là 48.2 giây (cao nhất giải đấu), và ép đối thủ thua timeout trong 3 ván đấu.",
      "executionFlow": [
        "1. compute_budget_ms nhận time_remaining_ms và ply",
        "2. Nếu initial_time_ms <= 60,000 (chế độ Blitz):",
        "   - Nước 1-31: Cấp 150-220 ms (hấp thụ trễ sàn 500ms)",
        "   - Nước 32-55: Cấp 35-55 ms (giai đoạn chuyển giao)",
        "   - Sau nước 55: Cấp 25-40 ms (chống rụng kim tàn cuộc)",
        "3. Thiết lập soft_limit = budget và hard_limit = budget * 2.5"
      ],
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "compute_budget_ms",
        "lines": "37-103"
      },
      "concreteExample": "Trong trận gặp Nhóm 11 (Ván #141), đối thủ dùng hết thời gian còn 395 ms. Nhóm 12 đi nước chiếu Re2+ chỉ sau 501 ms. Vì thời gian còn lại của đối thủ (395 ms) nhỏ hơn độ trễ tối thiểu (500 ms), Nhóm 11 bị xử thua timeout ngay lập tức!",
      "teacherFollowUps": [
        {
          "question": "Nếu ngân sách chỉ 150-220 ms thì bot có đạt được độ sâu tìm kiếm cần thiết không?",
          "answer": "Dạ, với tốc độ 25,400 NPS và nhờ các kỹ thuật cắt tỉa mạnh như NMP, RFP, LMR cùng bảng TT 524,288 mục, trong 200 ms bot duyệt được 5,000-8,000 nodes, đạt độ sâu 4-5 ply, hoàn toàn đủ phát hiện các đòn chiến thuật tức thời."
        }
      ],
      "commonMistakes": [
        "Tưởng rằng bot nghĩ 150ms là do máy chạy quá nhanh",
        "Không hiểu độ trễ sàn của máy chủ thi đấu"
      ]
    },
    "tags": [
      "Time Management",
      "Delay Absorption",
      "Blitz",
      "Zero Increment",
      "Timeout Win"
    ]
  },
  {
    "id": "MEM-BACH-04",
    "title": "Cơ chế Panic Mode và Extreme Panic Mode",
    "question": "Khi thời gian thi đấu sắp cạn, time_manager.py xử lý như thế nào? Phân biệt giữa Panic Mode và Extreme Panic Mode?",
    "category": "member",
    "topic": "time-management",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiến trúc, IPC, bot.py, time_manager.py, TranspositionTable",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, time_manager.py thiết lập hai ngưỡng an toàn khẩn cấp: Panic Mode khi thời gian còn lại <= 3,500 ms (cấp ngân sách 35-50 ms), và Extreme Panic Mode khi thời gian <= 1,500 ms (cấp ngân sách cực tiểu đúng 8-15 ms). Cơ chế này giúp bot chuyển sang phản xạ nhanh tức thì ở depth 1-2, tuyệt đối không bị xử thua rụng kim do độ trễ truyền socket.",
      "deepExplanation": "Ngưỡng 1,500 ms được tính toán từ các yếu tố phần cứng và mạng thực tế: Độ trễ trần của ChessLab Host (1,000 ms) + thời gian đóng gói và truyền gói tin JSON qua socket (200 ms) + thời gian thực thi tối thiểu của Python (100 ms) + biên an toàn dự phòng (200 ms) = 1,500 ms. Nếu ta chờ đến khi còn dưới 1 giây mới phản ứng thì chắc chắn sẽ bị thua rụng kim do trễ mạng! Khi vào Extreme Panic, bot chỉ search depth 1-2 trong 8-15 ms để đẩy nước đi ra ngoài ngay lập tức.",
      "executionFlow": [
        "1. Kiểm tra time_remaining_ms <= 1500 -> extreme_panic = True (8-15 ms)",
        "2. Ngược lại nếu time_remaining_ms <= 3500 -> panic = True (35-50 ms)",
        "3. Trả về đối tượng TimeBudget(min_ms, opt_ms, max_ms)"
      ],
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "compute_budget_ms",
        "lines": "45-65"
      },
      "concreteExample": "Nhờ hai ngưỡng này, trong 48 ván đấu chính thức, Nhóm 12 có tỷ lệ thua timeout là 0% tuyệt đối, trong khi toàn giải đấu có tới 15 ván các đội khác bị xử thua rụng kim (theo Bảng 9 báo cáo).",
      "teacherFollowUps": [
        {
          "question": "Tại sao Extreme Panic không trả về nước đi đầu tiên legal[0] luôn cho nhanh mà vẫn search 8-15 ms?",
          "answer": "Dạ, vì trong 10-15 ms bot vẫn kịp duyệt qua các nước ở depth 1 để chọn nước ăn quân hoặc nước không bị dâng quân cho đối thủ, tránh việc đi nước tệ hại mù quáng."
        }
      ],
      "commonMistakes": [
        "Nhầm lẫn giữa 3.5s và 1.5s",
        "Nghĩ rằng Panic Mode bỏ qua kiểm tra tính hợp lệ của nước đi"
      ]
    },
    "tags": [
      "Panic Mode",
      "Extreme Panic",
      "TimeBudget",
      "Hard Limit",
      "Soft Limit"
    ]
  },
  {
    "id": "MEM-BACH-05",
    "title": "Cấu trúc và Cơ chế Thay thế của Bảng Chuyển Vị (Transposition Table)",
    "question": "Em hãy trình bày cấu trúc dữ liệu của TranspositionTable và chiến lược thay thế (Replacement Scheme) khi bảng bị đầy?",
    "category": "member",
    "topic": "architecture",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiến trúc, IPC, bot.py, time_manager.py, TranspositionTable",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, TranspositionTable sử dụng mảng cố định kích thước 2^19 = 524,288 mục (16 MiB RAM). Mỗi mục lưu một TTEntry gồm: key (khóa Zobrist 64-bit), depth (độ sâu đã duyệt), score (điểm số chuẩn hóa), flag (EXACT, LOWERBOUND, UPPERBOUND), best_move (nước đi tối ưu), và age (tuổi của ván cờ). Chiến lược thay thế kết hợp: Ưu tiên ghi đè nếu mục mới có độ sâu lớn hơn hoặc bằng (depth >= old.depth), hoặc mục cũ thuộc về lượt đi trước đó (age != old.age).",
      "deepExplanation": "(1) Địa chỉ băm: Dùng phép toán bitwise index = key & (size - 1) để lấy chỉ số trong O(1). (2) Kiểm tra va chạm: Khi probe(key), bot so sánh if entry.key == key: mới coi là hit. (3) Chiến lược thay thế Depth-preferred with Aging: Một mục ở depth 5 từ 10 nước trước (age cũ) sẽ bị ghi đè bởi mục ở depth 3 của nước hiện tại, giúp bảng băm luôn ưu tiên lưu trữ cây tìm kiếm của thế trận đang diễn ra mà không bị tắc nghẽn bộ nhớ.",
      "executionFlow": [
        "1. probe(key): index = key & (size - 1). Nếu table[index] tồn tại và entry.key == key: return entry, ngược lại return None",
        "2. store(key, depth, score, flag, best_move, age):",
        "   - old = table[index]",
        "   - Nếu old is None hoặc depth >= old.depth hoặc age != old.age:",
        "   - table[index] = TTEntry(key, depth, score, flag, best_move, age)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "TranspositionTable.store",
        "lines": "477-590"
      },
      "concreteExample": "Tại ván marathon 123 nước (POS-09), bảng TT không hề bị tràn bộ nhớ hay giảm hiệu năng vì các mục từ nước thứ 30-50 có age cũ đã tự động bị ghi đè bởi các mục của nước 110-120, dung lượng RAM giữ vững ở 16 MiB.",
      "teacherFollowUps": [
        {
          "question": "Tại sao không dùng bảng băm động như dict của Python mà lại dùng mảng kích thước cố định?",
          "answer": "Dạ, dict của Python có chi phí quản lý overhead lớn và khi mở rộng kích thước sẽ gây hiện tượng đứng hình vài chục ms làm trễ đồng hồ. Mảng cố định 2^19 cấp phát 1 lần duy nhất lúc khởi động, đảm bảo tốc độ O(1) tuyệt đối."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng bảng băm dùng thuật toán LRU phức tạp",
        "Quên kiểm tra entry.key == key khi probe dẫn tới va chạm băm"
      ]
    },
    "tags": [
      "Transposition Table",
      "Zobrist Hashing",
      "Replacement Scheme",
      "Aging",
      "Memory"
    ]
  },
  {
    "id": "MEM-BACH-06",
    "title": "Giải thích 3 loại Bound trong Transposition Table",
    "question": "Ba loại cờ EXACT, LOWERBOUND, UPPERBOUND trong bảng TT có ý nghĩa toán học gì? Trong trường hợp nào thì được dùng lại điểm lưu trong TT để trả về ngay?",
    "category": "member",
    "topic": "search",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiến trúc, IPC, bot.py, time_manager.py, TranspositionTable",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, 3 cờ này phản ánh mối quan hệ giữa điểm Minimax thực tế và cửa sổ [alpha, beta]: EXACT (Cờ 0) nghĩa là điểm nằm trong khoảng (alpha, beta). LOWERBOUND (Cờ 1) nghĩa là điểm >= beta (gây ra Beta-cutoff, điểm thực tế có thể còn cao hơn). UPPERBOUND (Cờ 2) nghĩa là điểm <= alpha (tất cả các nước đều kém, điểm thực tế có thể còn thấp hơn). Điều kiện dùng lại điểm TT để cắt nhánh ngay: độ sâu lưu trữ phải >= độ sâu hiện tại (tt.depth >= depth) và giá trị thỏa mãn chặn trên/dưới tương ứng.",
      "deepExplanation": "Khi thăm một node trong _negamax: (1) Nếu tt.depth >= depth: Nếu tt.flag == EXACT: Trả về ngay score_from_tt. Nếu tt.flag == LOWERBOUND và score >= beta: Gây ra Beta-cutoff ngay, trả về score. Nếu tt.flag == UPPERBOUND và score <= alpha: Trả về ngay score. (2) Nếu độ sâu không đủ (tt.depth < depth), ta không thể dùng điểm số để ngắt hàm, nhưng vẫn tận dụng được tt.best_move để đưa lên vị trí số 1 trong Move Ordering!",
      "executionFlow": [
        "1. tt = self.tt.probe(key)",
        "2. if tt is not None and tt.depth >= depth:",
        "   - if tt.flag == EXACT: return tt_score",
        "   - if tt.flag == LOWERBOUND and tt_score >= beta: return tt_score",
        "   - if tt.flag == UPPERBOUND and tt_score <= alpha: return tt_score",
        "3. Nếu không ngắt được: trích xuất tt_move = tt.best_move để sắp xếp nước đi."
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1220-1260"
      },
      "concreteExample": "Giả sử ở depth 4, alpha = 100, beta = 200. TT lưu thế cờ này ở depth 4 với score = 250, flag = LOWERBOUND. Vì điểm lưu 250 >= beta (200), ta biết nhánh này chắc chắn bị đối thủ chặn lại, nên có thể ngắt hàm và trả về 250 ngay lập tức mà không cần duyệt lại cây con!",
      "teacherFollowUps": [
        {
          "question": "Tại sao khi tt.depth < depth thì không được dùng điểm số để ngắt?",
          "answer": "Dạ, vì điểm số lưu ở độ sâu nông hơn có thể chưa nhìn thấy đòn chiến thuật ở độ sâu hiện tại. Dùng điểm nông để ngắt nhánh sâu sẽ làm hỏng tính đúng đắn của Minimax."
        }
      ],
      "commonMistakes": [
        "Dùng nhầm điểm TT khi tt.depth < depth",
        "Không phân biệt được UPPERBOUND và LOWERBOUND"
      ]
    },
    "tags": [
      "TT Bounds",
      "EXACT",
      "LOWERBOUND",
      "UPPERBOUND",
      "Cutoff"
    ]
  },
  {
    "id": "MEM-BACH-07",
    "title": "Phương thức TimeManager.can_start_next_depth và Hệ số Rẽ Nhánh 2.2x",
    "question": "TimeManager.can_start_next_depth() hoạt động như thế nào? Tại sao nhóm lại sử dụng hệ số dự báo thời gian nhánh kế tiếp là 2.2x?",
    "category": "member",
    "topic": "time-management",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiến trúc, IPC, bot.py, time_manager.py, TranspositionTable",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, trong Iterative Deepening Search (IDS), trước khi bước vào độ sâu tiếp theo, bot gọi can_start_next_depth(last_iter_ms) để kiểm tra: Nếu thời gian đã trôi qua cộng với thời gian dự báo cho tầng tiếp theo (2.2 * last_iter_ms) vượt quá Soft Limit, bot sẽ từ chối mở tầng mới và dừng lại ở depth hiện tại. Hệ số 2.2x là hệ số rẽ nhánh hiệu dụng (EBF) thực tế của bot sau khi đã áp dụng triệt để cắt tỉa Alpha-Beta và Move Ordering.",
      "deepExplanation": "Trong cờ vua, hệ số rẽ nhánh tự nhiên là b ≈ 30-35 nước đi hợp lệ. Nhưng nhờ Alpha-Beta lý tưởng, hệ số rẽ nhánh lý thuyết giảm xuống căn bậc hai: sqrt(35) ≈ 5.9. Hơn thế nữa, với các kỹ thuật cắt tỉa mạnh của Nhóm 12 (PVS Zero-Window, NMP, RFP, LMR), thực nghiệm đo đạc cho thấy mỗi tầng sâu tiếp theo chỉ tốn thời gian gấp khoảng 2.0 đến 2.5 lần tầng trước (trung bình 2.2x). Nếu ta dùng hệ số quá lớn, bot sẽ quá nhút nhát và dừng search quá sớm. Nếu dùng hệ số quá nhỏ, bot sẽ bước vào tầng mới và bị timeout giữa chừng!",
      "executionFlow": [
        "1. Tính thời gian đã trôi qua: elapsed = self.elapsed_ms()",
        "2. Dự báo thời gian tầng tiếp theo: estimated = last_iter_ms * 2.2",
        "3. Kiểm tra điều kiện: if elapsed + estimated > self.budget.opt_ms: return False",
        "4. Ngược lại: return True (cho phép mở tầng tiếp theo)"
      ],
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "TimeManager.can_start_next_depth",
        "lines": "177-199"
      },
      "concreteExample": "Giả sử opt_ms = 200 ms. Depth 3 chạy mất 40 ms. Dự báo depth 4 tốn 40 * 2.2 = 88 ms. Tổng thời gian dự kiến: 40 + 88 = 128 ms <= 200 ms -> mở depth 4. Sang depth 4 tốn 88 ms (tổng đã dùng 128 ms). Dự báo depth 5 tốn 88 * 2.2 = 193.6 ms. Tổng dự kiến 128 + 193.6 = 321.6 ms > 200 ms -> từ chối mở depth 5, bot dừng lại và bảo toàn an toàn best_move của depth 4!",
      "teacherFollowUps": [
        {
          "question": "Tại sao điều kiện dừng ở đây so sánh với opt_ms (Soft limit) mà không phải max_ms (Hard limit)?",
          "answer": "Dạ, vì Soft limit là ngân sách mong muốn. Ta giữ khoảng đệm giữa Soft limit và Hard limit (max_ms = 2.5 * opt_ms) để nếu tầng tiếp theo có rẽ nhánh đột biến thì vẫn còn trần Hard limit bảo vệ, không bao giờ chạm vào thời gian của server."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng mỗi độ sâu tốn thời gian gấp 35 lần",
        "Dùng Hard limit để quyết định mở tầng mới dẫn tới timeout"
      ]
    },
    "tags": [
      "IDS",
      "EBF",
      "Branching Factor",
      "2.2x",
      "Time Management"
    ]
  },
  {
    "id": "MEM-BACH-08",
    "title": "Phương thức TimeManager.should_stop và Kiểm tra Bitwise 128 Nodes",
    "question": "Hàm should_stop() giám sát điều kiện dừng thế nào trong quá trình đệ quy? Tại sao chỉ kiểm tra đồng hồ sau mỗi 128 nodes?",
    "category": "member",
    "topic": "time-management",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiến trúc, IPC, bot.py, time_manager.py, TranspositionTable",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, should_stop() kiểm tra xem thời gian thực thi đã vượt qua Hard Limit (max_ms) hay chưa. Nếu vượt quá, cờ self._stopped được bật lên True để ngắt đệ quy ngay lập tức. Trong vòng lặp tìm kiếm, phép kiểm tra bitwise `nodes & 127 == 0` được áp dụng, nghĩa là cứ duyệt đúng 128 nodes mới gọi should_stop() một lần nhằm triệt tiêu overhead gọi hàm đọc đồng hồ hệ thống trong Python.",
      "deepExplanation": "Trong Python, lời gọi hàm time.monotonic_ns() tốn khoảng 0.5 - 1.0 microsecond. Với tốc độ 25,400 NPS, nếu node nào cũng kiểm tra thời gian thì 25,400 lần đo sẽ tiêu tốn tới 25 ms mỗi giây. Bằng phép toán bitwise `nodes & 127 == 0`, chi phí kiểm tra giảm đi 128 lần. Khoảng thời gian giữa 2 lần kiểm tra là 128 nodes / 25,400 NPS ≈ 5 ms, hoàn toàn đủ nhạy để ngắt đệ quy trước khi chạm trần thời gian của trọng tài.",
      "executionFlow": [
        "1. Tại mỗi node trong _negamax và _quiescence: self.nodes += 1",
        "2. if self.nodes & 127 == 0:",
        "   - if tm.should_stop():",
        "       - self._timeout = True",
        "       - return 0 (hoặc evaluate)"
      ],
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "TimeManager.should_stop",
        "lines": "149-161"
      },
      "concreteExample": "Nếu không có bitwise check: duyệt 100,000 nodes tốn thêm 100,000 phép đọc đồng hồ. Nhờ `nodes & 127 == 0`, bot chỉ đọc đồng hồ đúng 781 lần, tiết kiệm trọn vẹn 99.2% chi phí quản trị thời gian.",
      "teacherFollowUps": [
        {
          "question": "Tại sao khi timeout lại kiểm tra if candidate is not None and (not self._timeout or depth == 1)?",
          "answer": "Dạ, đây là chốt chặn quan trọng trong Searcher.search(): Nếu tầng hiện tại đang duyệt dở mà bị timeout, candidate của tầng dở đó chưa hoàn chỉnh. Bot sẽ bỏ qua kết quả tầng dở và giữ nguyên best_move của tầng hoàn chỉnh trước đó!"
        }
      ],
      "commonMistakes": [
        "Dùng phép chia lấy dư % 128 thay vì bitwise & 127",
        "Lấy candidate của tầng bị timeout làm hỏng nước đi tối ưu"
      ]
    },
    "tags": [
      "should_stop",
      "Bitwise Check",
      "128 Nodes",
      "Overhead Reduction",
      "Timeout Guard"
    ]
  },
  {
    "id": "MEM-BACH-09",
    "title": "Hiểu biết về Lượng giá PeSTO và Đóng gói 32-bit (Hỏi chéo Việt)",
    "question": "Bách không trực tiếp viết evaluation.py, em hãy giải thích kỹ thuật đóng gói bit _pk(mg, eg) và phép bù dấu 0x8000 khi giải nén hoạt động như thế nào?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, mặc dù bạn Việt phụ trách chính file evaluation.py, nhưng là trưởng nhóm em nắm rất rõ: Kỹ thuật đóng gói `val = mg + (eg << 16)` ghép hai điểm số Trung cuộc (MG) và Tàn cuộc (EG) vào 1 số nguyên 32-bit. Khi giải nén, vì số âm trong máy tính biểu diễn bằng bù 2 nên phần mg âm sẽ mượn bit dấu từ nửa trên eg. Phép cộng bù `(val + 0x8000) >> 16` giúp trung hòa bit mượn đó để tách chính xác EG, sau đó lấy `mg = val - (eg << 16)` để tách MG ra.",
      "deepExplanation": "Ý nghĩa cốt lõi của giải pháp này là hiệu năng tính toán: Thay vì phải chạy hai vòng lặp cộng điểm vị trí ô (một cho MG, một cho EG), hàm _pst_sum chỉ cần cộng dồn một số nguyên 32-bit duy nhất cho toàn bộ quân cờ trên bàn. Đến cuối cùng mới giải nén 1 lần. Kỹ thuật này giúp hàm evaluate đạt thông lượng cực cao xấp xỉ 100,000 evals/giây trên nền Python thuần.",
      "executionFlow": [
        "1. Đóng gói: def _pk(mg, eg): return (mg & 0xFFFF) | (eg << 16)",
        "2. Cộng dồn: s = sum(PST_PACKED[sq] for sq in pieces)",
        "3. Giải nén: eg = (s + 0x8000) >> 16; mg = s - (eg << 16)",
        "4. Nội suy: score = (mg * phase + eg * (24 - phase)) // 24"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "_pk",
        "lines": "239-254"
      },
      "concreteExample": "Giả sử mg = -10, eg = 50. Trong bù 2 16-bit, -10 là 0xFFF6. Khi cộng `val = -10 + (50 << 16)`, giá trị bị mượn bit. Phép cộng `(val + 0x8000) >> 16` khôi phục đúng eg = 50, và mg = val - (50 << 16) trả về đúng -10.",
      "teacherFollowUps": [
        {
          "question": "Tại sao Game Phase lại có khoảng từ 0 đến 24?",
          "answer": "Dạ, 24 là tổng trọng số quân lớn của 2 bên: 4 Mã (4) + 4 Tượng (4) + 4 Xe (8) + 2 Hậu (8) = 24. Khi bàn cờ đủ quân, phase=24 (100% MG). Khi đổi hết chỉ còn Vua và Tốt, phase=0 (100% EG)."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng đóng gói chỉ để tiết kiệm RAM chứ không biết nó tăng gấp đôi tốc độ CPU",
        "Không giải thích được tại sao cần bù 0x8000"
      ]
    },
    "tags": [
      "Cross-Examination",
      "_pk",
      "PeSTO",
      "Bit-packing",
      "0x8000"
    ]
  },
  {
    "id": "MEM-BACH-10",
    "title": "Hiểu biết về Negamax và PVS trong Search (Hỏi chéo Long)",
    "question": "Bách hãy giải thích tại sao thuật toán PVS (Principal Variation Search) trong search.py lại hiệu quả hơn Alpha-Beta truyền thống?",
    "category": "member",
    "topic": "search",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, PVS dựa trên giả định rằng nhờ Move Ordering tốt, nước đi đầu tiên (PV-move) có xác suất rất cao là nước đi tốt nhất. Do đó, nước đầu tiên được tìm kiếm với cửa sổ đầy đủ [alpha, beta]. Tất cả các nước tiếp theo chỉ cần kiểm tra xem có vượt qua alpha hay không bằng một Cửa sổ Không (Zero-Window) cực hẹp [-alpha - 1, -alpha]. Vì cửa sổ hẹp nên cây tìm kiếm bị cắt tỉa tối đa, giúp thuật toán chạy nhanh hơn 20-30%.",
      "deepExplanation": "Nếu một nước đi phụ duyệt qua Zero-Window mà đạt điểm score <= alpha, ta chứng minh được nó kém hơn nước PV-move mà không tốn công duyệt sâu. Chỉ trong trường hợp hiếm hoi xảy ra Fail-high (alpha < score < beta), nghĩa là nước đi phụ này bất ngờ tốt hơn nước PV-move, lúc đó ta mới thực hiện Re-search lại với cửa sổ đầy đủ [-beta, -score].",
      "executionFlow": [
        "1. Duyệt nước đầu tiên (i == 0): score = -_negamax(board, depth - 1, -beta, -alpha, ply + 1)",
        "2. Duyệt các nước tiếp theo (i > 0): score = -_negamax(board, depth - 1, -alpha - 1, -alpha, ply + 1)",
        "3. if alpha < score < beta: score = -_negamax(board, depth - 1, -beta, -score, ply + 1)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1480-1530"
      },
      "concreteExample": "Nếu duyệt full-window cho 20 nước, số node phải thăm có thể lên tới 50,000 nodes. Với PVS, 19 nước sau duyệt với Zero-Window bị cắt tỉa chỉ còn 12,000 nodes, tốc độ tăng gấp hơn 3 lần.",
      "teacherFollowUps": [
        {
          "question": "PVS dựa trên điều kiện tiên quyết nào để phát huy tác dụng?",
          "answer": "Dạ, điều kiện sống còn là Move Ordering phải cực tốt để đưa nước cờ hay nhất lên vị trí số 1. Nếu sắp xếp nước đi tồi, PVS sẽ liên tục bị re-search và chạy chậm hơn cả Alpha-Beta thông thường."
        }
      ],
      "commonMistakes": [
        "Không nêu được cơ chế Zero-Window [-alpha-1, -alpha]",
        "Quên nhắc đến việc phải re-search khi fail-high"
      ]
    },
    "tags": [
      "Cross-Examination",
      "PVS",
      "Principal Variation Search",
      "Zero-Window",
      "Search"
    ]
  },
  {
    "id": "MEM-BACH-11",
    "title": "Hiểu biết về 8 Bậc Move Ordering (Hỏi chéo Vương)",
    "question": "Em hãy liệt kê 8 bậc ưu tiên trong hàm _order_moves() của Vương và giải thích tại sao Hash Move lại được ưu tiên cao nhất?",
    "category": "member",
    "topic": "search",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, 8 bậc sắp xếp nước đi theo thứ tự điểm giảm dần gồm: 1. Hash Move (từ TT: 10,000,000 điểm). 2. Queen Promotion (1,200,000 điểm). 3. Threat Evasion (850,000 điểm). 4. Good Captures (MVV-LVA có SEE >= 0: 1,000,000 + MVV-LVA). 5. Killer Moves (700,000 và 690,000 điểm). 6. Safe Checks (800,000 điểm). 7. Bad Captures & Promotions khác (SEE < 0: 100,000 điểm). 8. History Heuristic. Hash Move được ưu tiên số 1 vì nó là nước tối ưu đã được chứng minh ở độ sâu trước đó.",
      "deepExplanation": "Trong Iterative Deepening, kết quả của depth d - 1 lưu trong Transposition Table phản ánh nước đi tốt nhất tìm được. Đến depth d, duyệt lại nước Hash Move này đầu tiên sẽ có xác suất > 80% gây ra Beta-cutoff ngay lập tức ở nút hiện tại. Nhờ đó, thuật toán không cần sinh và duyệt hàng chục nước đi còn lại, thu hẹp cây tìm kiếm về mức tiệm cận tối ưu O(b^(d/2)).",
      "executionFlow": [
        "1. Nước trùng tt_move -> score = 10_000_000",
        "2. Phong cấp Hậu -> score = 1_200_000",
        "3. Nước ăn quân: tính see(board, move). Nếu see >= 0 -> score = 1_000_000 + mvv_lva; nếu see < 0 -> score = 100_000 + mvv_lva",
        "4. Nước Killer -> score = 700_000 / 690_000",
        "5. Nước quiet còn lại -> score = history_table[from_sq][to_sq]"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._order_moves",
        "lines": "703-920"
      },
      "concreteExample": "Ở trận thắng Nhóm 3 (POS-01), nước ghim 13... Rfe8 được Move Ordering ưu tiên đưa lên đầu nhờ điểm Threat Evasion và kiểm soát cột mở, giúp bot tìm ra đòn trừng phạt chỉ sau 1.1 giây.",
      "teacherFollowUps": [
        {
          "question": "Tại sao Killer move chỉ lưu nước đi yên tĩnh mà không lưu nước ăn quân?",
          "answer": "Dạ, vì các nước ăn quân tốt đã được MVV-LVA và SEE xếp hạng ở các bậc trên rồi. Killer move sinh ra là để tìm ra những nước đi bình thường nhưng có tính chiến thuật gây bất ngờ."
        }
      ],
      "commonMistakes": [
        "Nhầm lẫn giữa 7 tầng và 8 bậc ưu tiên",
        "Nghĩ rằng Killer Move được ưu tiên cao hơn nước ăn quân tốt"
      ]
    },
    "tags": [
      "Cross-Examination",
      "Move Ordering",
      "8-Tier",
      "Hash Move",
      "MVV-LVA",
      "Killer"
    ]
  },
  {
    "id": "MEM-BACH-12",
    "title": "Hiểu biết về Dynamic King Safety Ring trong Chess960 (Hỏi chéo Việt)",
    "question": "Tại sao không thể dùng một bảng King Safety cố định cho mọi thế cờ Chess960 mà phải dùng Dynamic King Ring?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, trong cờ vua truyền thống, Vua luôn khởi đầu ở e1 và thường nhập thành về g1 hoặc c1, nên các ô an toàn quanh Vua là cố định. Nhưng trong Chess960, Vua có thể khởi đầu ở bất kỳ ô nào từ b1 đến g1. Do đó, Nhóm 12 phải tính toán động ma trận vành đai Vua (_build_king_zones) theo tọa độ thực tế của Vua trên bàn cờ, sử dụng các thao tác Bitboard để xác định 8 ô lân cận, khiên Tốt che chắn gần/xa và các cột mở xung quanh.",
      "deepExplanation": "Dynamic King Ring tạo ra mặt nạ bitboard bao gồm: (1) Vành đai trong: 8 ô bao quanh Vua. (2) Vành đai ngoài: các ô cách Vua 2 bước. (3) Khiên Tốt: kiểm tra sự hiện diện của Tốt ta ở hàng phía trước Vua. Nếu Tốt bị đẩy lên hoặc cột trước mặt Vua bị mở toang, bot sẽ bị trừ điểm an toàn Vua rất nặng. Điều này giúp bot trong Chess960 biết tự động tìm nơi trú ẩn an toàn dù xuất phát điểm ở bất kỳ vị trí kỳ lạ nào.",
      "executionFlow": [
        "1. Xác định ô Vua: wk = board.king(WHITE)",
        "2. Tra cứu mặt nạ vùng an toàn: zone = KING_ZONES[wk]",
        "3. Đếm số Tốt bảo vệ trong zone: shield = _popcount(wp & zone.shield_mask)",
        "4. Kiểm tra cột mở: open_files = zone.files & ~_spread_files(board.pawns)",
        "5. Tính điểm phạt: penalty = (3 - shield) * 25 + open_files * 40"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "_build_king_zones",
        "lines": "321-360"
      },
      "concreteExample": "Nếu Vua trắng đứng ở b1 trong thế FRC #152, các Tốt a2, b2, c2 đóng vai trò là khiên bảo vệ. Bảng King Ring tĩnh của cờ tiêu chuẩn sẽ hoàn toàn mù tịt về việc Vua ở b1 có an toàn hay không.",
      "teacherFollowUps": [
        {
          "question": "Tại sao điểm an toàn Vua chỉ tính ở Trung cuộc mà tắt ở Tàn cuộc?",
          "answer": "Dạ, trong tàn cuộc khi đối phương đã hết Hậu và Xe (phase <= 10), Vua không còn nguy cơ bị chiếu hết mà cần phải xông ra trung tâm để làm quân tấn công. Do đó biến KS_MIN_PHASE = 10 sẽ tắt đánh giá King Safety khi bước vào tàn cuộc."
        }
      ],
      "commonMistakes": [
        "Áp dụng công thức an toàn Vua cờ truyền thống vào Chess960",
        "Không giải thích được tại sao tàn cuộc lại tắt King Safety"
      ]
    },
    "tags": [
      "Cross-Examination",
      "Dynamic King Ring",
      "Chess960",
      "King Safety",
      "Bitboard"
    ]
  },
  {
    "id": "MEM-BACH-13",
    "title": "Xử lý Luật Nhập thành Chess960 (King takes Rook)",
    "question": "Luật nhập thành trong Chess960 khác cờ tiêu chuẩn như thế nào? Mã nguồn bot xử lý thao tác nhập thành ra sao để không phạm quy?",
    "category": "member",
    "topic": "chess960",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ, trong Chess960, Vua và Xe có thể đứng ở bất kỳ cột nào ở hàng đáy lúc bắt đầu, nhưng sau khi nhập thành thì vị trí kết thúc luôn giống cờ vua truyền thống: Nhập thành cánh Vua (O-O) Vua luôn về g1, Xe về f1; Nhập thành cánh Hậu (O-O-O) Vua luôn về c1, Xe về d1. Điểm đặc thù trong biểu diễn UCI là nước nhập thành được ghi nhận bằng cú pháp 'Vua ăn Xe của mình' (ví dụ e1h1 hoặc b1a1). Bot thiết lập board.chess960 = True để kích hoạt chuẩn nhập thành FIDE/UCI này.",
      "deepExplanation": "Điều kiện nhập thành Chess960: (1) Cả Vua và Xe tham gia nhập thành đều chưa từng di chuyển. (2) Vua không bị chiếu ở ô xuất phát, không đi qua ô bị chiếu và không đứng ở ô bị chiếu sau khi nhập thành. (3) Toàn bộ các ô nằm giữa ô xuất phát và ô kết thúc của cả Vua lẫn Xe đều phải trống. Nhóm khởi tạo bàn cờ với cờ board.chess960 = True để thư viện python-chess tự động áp dụng đúng chuẩn FIDE.",
      "executionFlow": [
        "1. board = chess.Board(fen, chess960=True)",
        "2. Khi sinh nước đi legal_moves, các nước nhập thành được sinh dưới dạng Move(king_sq, rook_sq)",
        "3. Hàm choose_move() giữ nguyên đối tượng Move và trả về chuỗi UCI chuẩn",
        "4. Host nhận diện và thực hiện nhập thành hợp lệ trên máy chủ"
      ],
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "StudentBot.__init__",
        "lines": "20-35"
      },
      "concreteExample": "Trong thế FRC #601 (Ván #63), Vua Trắng ở b1 và Xe Trắng ở a1. Khi nhập thành cánh Hậu, nước đi theo chuẩn UCI là b1a1 (Vua nhảy vào ô Xe), và sau nước đi đó Vua đứng ở c1, Xe đứng ở d1.",
      "teacherFollowUps": [
        {
          "question": "Nếu ô xuất phát của Vua trùng với ô kết thúc thì nhập thành diễn ra sao?",
          "answer": "Dạ, theo luật FIDE, lúc đó Vua đứng yên và chỉ có quân Xe nhảy từ ô của nó sang d1, nước đi vẫn hoàn toàn hợp lệ."
        }
      ],
      "commonMistakes": [
        "Tưởng rằng nhập thành Chess960 Vua luôn nhảy 2 ô như cờ thường",
        "Không biết chuẩn UCI ghi nhận nhập thành là Vua ăn Xe"
      ]
    },
    "tags": [
      "Cross-Examination",
      "Castling",
      "Chess960",
      "King Takes Rook",
      "FIDE Rules"
    ]
  },
  {
    "id": "MEM-BACH-14",
    "title": "Giải thích Hiện tượng Horizon Effect và Giải pháp Quiescence Search",
    "question": "Horizon Effect là gì? Quiescence Search trong search.py giải quyết vấn đề này ra sao?",
    "category": "member",
    "topic": "search",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, Horizon Effect xảy ra khi thuật toán tìm kiếm bị ngắt đột ngột ở độ sâu danh định (ví dụ depth = 4) ngay tại thời điểm bàn cờ đang diễn ra các pha ăn quân dở dang. Nếu đánh giá tĩnh một thế cờ ở ngay sau nước Hậu ta ăn Xe nhưng nước tiếp theo đối phương ăn lại Hậu, hàm evaluate sẽ tưởng rằng ta đang hơn Xe và đánh giá sai lệch hoàn toàn. Quiescence Search giải quyết bằng cách mở rộng tìm kiếm ở các nút lá, chỉ duyệt các nước ăn quân và phong cấp cho đến khi thế cờ đạt trạng thái tĩnh.",
      "deepExplanation": "Nguyên lý Quiescence Search: (1) Stand-pat: Đầu tiên tính điểm lượng giá tĩnh stand_pat = evaluate(board). Nếu stand_pat >= beta, ta ngắt luôn (Stand-pat cutoff). (2) Cập nhật alpha: alpha = max(alpha, stand_pat). (3) Sinh nước đi bắt quân và sắp xếp theo MVV-LVA. (4) Delta Pruning: Nếu stand_pat + giá_trị_quân_ăn + 1,150 < alpha thì bỏ qua nước đó. (5) Giới hạn độ sâu tĩnh MAX_QSEARCH_DEPTH = 8 để tránh bùng nổ thời gian.",
      "executionFlow": [
        "1. stand_pat = evaluate(board)",
        "2. if stand_pat >= beta: return beta (Stand-pat Cutoff)",
        "3. if stand_pat > alpha: alpha = stand_pat",
        "4. Duyệt các nước ăn quân m in captures:",
        "   - if Delta_Pruning_Condition: continue",
        "   - board.push(m)",
        "   - score = -_quiescence(board, -beta, -alpha, ply + 1)",
        "   - board.pop()",
        "   - if score >= beta: return beta"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._quiescence",
        "lines": "925-1070"
      },
      "concreteExample": "Trắng đi Hậu ăn Xe Đen (+500 cp). Nếu dừng ở depth 4, Trắng thấy +500 cp. Nhưng ở ply tiếp theo Tốt Đen ăn lại Hậu (-900 cp). Nhờ Quiescence Search đi thêm 1 ply nữa, bot nhìn thấy kết quả thực tế là Trắng bị lỗ 400 cp và kịp thời loại bỏ nước cờ sai lầm này.",
      "teacherFollowUps": [
        {
          "question": "Tại sao khi bị chiếu thì Quiescence Search lại không dùng Stand-pat?",
          "answer": "Dạ, vì khi đang bị chiếu, thế cờ không hề tĩnh và bên bị chiếu không có quyền 'đứng yên', bắt buộc phải tìm nước giải chiếu hợp lệ."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng Quiescence Search duyệt toàn bộ các nước đi",
        "Không hiểu khái niệm Stand-pat"
      ]
    },
    "tags": [
      "Cross-Examination",
      "Horizon Effect",
      "Quiescence Search",
      "Stand-pat",
      "Tactical Stability"
    ]
  },
  {
    "id": "MEM-BACH-15",
    "title": "Đánh giá Khách quan về Rào cản Độ sâu 4-ply và Thua trắng Nhóm 2 (Hỏi về Chương 5)",
    "question": "Tại sao trong Bảng 8 của báo cáo, Nhóm 12 lại để thua trắng 0-4 trước Quán quân Nhóm 2? Nguyên nhân cốt lõi ở đâu và nếu làm lại em sẽ cải tiến gì?",
    "category": "member",
    "topic": "experiment",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Kiểm tra thực nghiệm và phản biện",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, báo cáo tại mục 5.4.4 đã phân tích rất thẳng thắn: Nguyên nhân cốt lõi khiến nhóm thua trắng 0-4 trước Nhóm 2 là Rào cản độ sâu tìm kiếm (Depth Barrier). Bot của Nhóm 12 viết bằng Python thuần, tốc độ duyệt trung bình đạt 25,400 NPS nên trong thời gian 1.1s chỉ đạt độ sâu 4-5 ply. Trong khi đó Quán quân Nhóm 2 viết bằng ngôn ngữ biên dịch hiệu năng cao (search tới độ sâu 7-8 ply). Ở ván 23 (POS-10), ở nước 16 bot đi Bb5 tưởng là hơn cờ nhưng bị đối thủ nhìn sâu hơn ở ply thứ 5 tung đòn phản công Qxb5 bắt sống Tượng.",
      "deepExplanation": "Sự chênh lệch 2-3 tầng độ sâu giữa 4 ply và 7 ply tạo ra một khoảng mù chiến thuật không thể bù đắp bằng hàm lượng giá tĩnh. Đối thủ nhìn thấy các đòn phối hợp tầm xa, ép đổi Hậu để phá hủy cấu trúc Tốt của nhóm. Nếu được làm lại, nhóm sẽ thực hiện 2 cải tiến lớn: (1) Biên dịch các hàm tính toán Bitboard và Searcher sang C-extension hoặc Cython/Rust để nâng tốc độ lên > 300,000 NPS, đạt độ sâu 7-8 ply. (2) Bổ sung Singular Extensions để tự động mở rộng độ sâu cho các nước đi then chốt độc đạo.",
      "executionFlow": [
        "1. Nhóm 12: Python 25,400 NPS -> Depth 4-5 ply",
        "2. Nhóm 2 (Quán quân): Compiled Engine > 200,000 NPS -> Depth 7-8 ply",
        "3. Tại nước 16 trận POS-10: Nhóm 12 đi Bb5 (tính 4 ply tưởng an toàn)",
        "4. Đối thủ nhìn thấy ở ply 5 nước 17. Qxb5 phản đòn bắt Tượng -> Nhóm 12 thua cờ"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher.search",
        "lines": "1635-1750"
      },
      "concreteExample": "Bảng 8 cho thấy trước top 5 đội dẫn đầu, Nhóm 12 có kết quả 0 thắng - 20 thua hoàn toàn do chênh lệch độ sâu. Ngược lại, trước các đội ngang tầm và top dưới, Nhóm 12 thắng áp đảo 11 ván nhờ sự ổn định và chống timeout tuyệt đối.",
      "teacherFollowUps": [
        {
          "question": "Tại sao nhóm không dùng thư viện Numba hay PyPy để tăng tốc Python?",
          "answer": "Dạ, môi trường thi đấu của ChessLab quy định máy ảo Python 3.12 chuẩn và các gói trong uv.lock. PyPy không tương thích hoàn toàn với thư viện C python-chess, còn Numba có thời gian JIT compile nước đầu tiên mất vài giây gây nguy cơ timeout."
        }
      ],
      "commonMistakes": [
        "Đổ lỗi cho hàm evaluate đánh giá sai thay vì nhận diện đúng nguyên nhân do thiếu độ sâu search",
        "Bào chữa quanh co thay vì phân tích dựa trên số liệu thực nghiệm"
      ]
    },
    "tags": [
      "Cross-Examination",
      "Depth Barrier",
      "4-ply",
      "Python vs Compiled",
      "Case POS-10"
    ]
  },
  {
    "id": "MEM-BACH-16",
    "title": "Trách nhiệm Trưởng nhóm và Sự phối hợp giữa 4 thành viên (Chương 6)",
    "question": "Với tư cách là Trưởng nhóm (30% đóng góp), em đã điều phối công việc và kiểm soát chất lượng mã nguồn giữa 4 thành viên như thế nào?",
    "category": "member",
    "topic": "trade-offs",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm – Quản lý dự án và phân công",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ, nhóm chia dự án thành 4 phân hệ độc lập có ranh giới API rõ ràng: Em phụ trách Kiến trúc, IPC (bot.py), Quản lý thời gian (time_manager.py) và Bảng băm TT. Bạn Long phụ trách Lõi tìm kiếm Searcher (search.py). Bạn Việt phụ trách Hàm lượng giá PeSTO và An toàn Vua (evaluation.py). Bạn Vương phụ trách Move Ordering và các kỹ thuật Cắt tỉa (Pruning). Để đảm bảo chất lượng, nhóm thiết lập runner thi đấu nội bộ tự động, mọi commit đều phải vượt qua bài test kiểm tra tính hợp lệ của luật cờ Chess960 và kiểm tra giới hạn thời gian.",
      "deepExplanation": "Bảng 11 trong báo cáo thể hiện rõ phân công và minh chứng Git: Em có 15 commits (ce91f22, cc43d89, 535cf17). Long đóng góp commit cốt lõi e6c214d (+506 dòng). Việt hoàn thành trọn vẹn commit f289693 (+588 dòng). Vương hoàn thành commit 28bcb01 (+84 dòng). Toàn bộ 4 thành viên đều tham gia vào các buổi họp thống nhất giao diện giữa các module, nhờ đó khi ghép nối bot.py, search.py, evaluation.py và time_manager.py hệ thống vận hành trơn tru ngay từ lần chạy đầu tiên mà không xảy ra xung đột giao tiếp.",
      "executionFlow": [
        "1. Thống nhất Data Contract (SearchContext, TimeBudget, TTEntry, Score ranges)",
        "2. Phân chia độc lập 4 file: bot.py (Bách), search.py (Long/Vương), evaluation.py (Việt), time_manager.py (Bách)",
        "3. Kiểm thử đơn vị tự động bằng pytest và flake8 qua uv runner",
        "4. Đấu thực nghiệm đối kháng nội bộ trước khi bước vào giải đấu chính thức"
      ],
      "codeRef": {
        "file": "team.json",
        "functionName": "Metadata",
        "lines": "1-20"
      },
      "concreteExample": "Minh chứng cho sự phối hợp hiệu quả là trong 48 ván thi đấu chính thức, bot không hề dính một lỗi sập chương trình hay lỗi vi phạm luật cờ nào, hoàn thành 100% số ván đấu.",
      "teacherFollowUps": [
        {
          "question": "Tỷ lệ sử dụng AI trong dự án của nhóm là bao nhiêu?",
          "answer": "Dạ, theo báo cáo mục 6.2 (AI Disclosure), tỷ lệ sinh viên tự nghiên cứu, thiết kế kiến trúc và gỡ lỗi chiếm > 85%. AI chỉ hỗ trợ < 15% trong việc tra cứu nhanh cú pháp thư viện python-chess và gợi ý template kiểm thử ban đầu."
        }
      ],
      "commonMistakes": [
        "Không nắm được tỷ lệ đóng góp của các bạn trong nhóm",
        "Không nêu được minh chứng cụ thể từ Git và báo cáo"
      ]
    },
    "tags": [
      "Project Management",
      "Team Contribution",
      "Git Proof",
      "AI Disclosure",
      "Table 11"
    ]
  },
  {
    "id": "MEM-LONG-01",
    "title": "Bản chất Thuật toán Negamax và So sánh với Minimax Đối xứng",
    "question": "Em là người chịu trách nhiệm chính về động cơ tìm kiếm, hãy giải thích tại sao nhóm lại triển khai Negamax thay vì Minimax truyền thống? Công thức toán học và sự đơn giản hóa trong mã nguồn là gì?",
    "category": "member",
    "topic": "search",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Searcher, _negamax, IDS, PVS, TT Score Normalization",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, Minimax truyền thống phải tách thành 2 hàm riêng biệt hoặc 2 nhánh rẽ nhánh if/else cồng kềnh: một nhánh Max cho Trắng và một nhánh Min cho Đen. Negamax tận dụng tính chất đối xứng zero-sum của cờ vua: max(a, b) = -min(-a, -b). Nghĩa là điểm số có lợi cho người này chính là điểm số bất lợi cho người kia. Nhờ đó, ta chỉ cần duy trì DUY NHẤT một hàm đệ quy, luôn tối đa hóa điểm số từ góc nhìn của bên đang đến lượt đi (board.turn), và đảo dấu điểm khi gọi đệ quy: score = -_negamax(-beta, -alpha).",
      "deepExplanation": "Sự tối giản này mang lại 3 lợi thế khổng lồ: (1) Giảm 50% độ phức tạp của mã nguồn: Toàn bộ các kỹ thuật cắt tỉa Alpha-Beta, Transposition Table, PVS, NMP chỉ cần cài đặt đúng 1 lần duy nhất thay vì nhân đôi cho cả Max và Min. (2) Cửa sổ tìm kiếm đảo ngược: [alpha, beta] ở node cha khi truyền xuống node con trở thành [-beta, -alpha]. (3) Chuẩn hóa điểm: Hàm evaluate luôn trả về điểm dương cho bên đang đi cờ (perspective of side to move), giúp logic cắt tỉa if score >= beta luôn nhất quán ở mọi tầng độ sâu.",
      "executionFlow": [
        "1. Điểm lượng giá tĩnh: evaluate(board) trả về điểm theo góc nhìn của board.turn",
        "2. Duyệt qua từng nước đi hợp lệ m in legal_moves:",
        "   - board.push(m)",
        "   - score = -_negamax(board, depth - 1, -beta, -alpha, ply + 1)",
        "   - board.pop()",
        "3. Cập nhật: if score > best_score: best_score = score",
        "4. Cắt tỉa: if score > alpha: alpha = score; if alpha >= beta: break (Beta-cutoff)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1203-1280"
      },
      "concreteExample": "Giả sử ở tầng 1 (Trắng đi), Trắng tìm thấy nước đi dẫn tới thế cờ Trắng hơn 1 Xe (+500 cp). Khi gọi xuống tầng 2 (Đen đi), góc nhìn của Đen sẽ là Đen bị lỗ 1 Xe (-500 cp). Đen trả về -500 cp, qua phép đảo dấu `-(-500)` Trắng nhận lại đúng +500 cp. Thuật toán hoạt động hoàn hảo mà không cần phân biệt màu quân.",
      "teacherFollowUps": [
        {
          "question": "Tại sao cửa sổ [alpha, beta] lại đảo thành [-beta, -alpha] mà không phải [-alpha, -beta]?",
          "answer": "Dạ, vì theo toán học, nếu alpha <= x <= beta thì nhân với -1 ta được -beta <= -x <= -alpha. Vì tham số thứ nhất luôn là cận dưới và tham số thứ hai là cận trên, nên bắt buộc phải đảo thành [-beta, -alpha]."
        },
        {
          "question": "Nếu hàm evaluate trả về điểm tuyệt đối (dương cho Trắng, âm cho Đen) thì Negamax có chạy được không?",
          "answer": "Dạ không được, lúc đó điểm số của Đen sẽ bị đảo ngược lung tung. Bắt buộc hàm evaluate phải nhân với color_sign (1 nếu White, -1 nếu Black) để luôn trả về điểm từ góc nhìn bên có lượt đi."
        }
      ],
      "commonMistakes": [
        "Quên đảo dấu -score khi nhận kết quả đệ quy",
        "Truyền nhầm [-alpha, -beta] vào hàm con"
      ]
    },
    "tags": [
      "Negamax",
      "Minimax",
      "Symmetry",
      "Zero-Sum",
      "Alpha-Beta"
    ]
  },
  {
    "id": "MEM-LONG-02",
    "title": "Principal Variation Search (PVS) và Zero-Window Search",
    "question": "Hàm _negamax() của Long cài đặt Principal Variation Search (PVS) như thế nào? Tại sao nước đầu tiên lại khác các nước sau?",
    "category": "member",
    "topic": "search",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Searcher, _negamax, IDS, PVS, TT Score Normalization",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, PVS (còn gọi là NegaScout) dựa trên giả định: nhờ Move Ordering tốt, nước đi đầu tiên (i == 0) chính là nước đi tốt nhất (PV Move). Do đó: (1) Nước đầu tiên được tìm kiếm với cửa sổ đầy đủ [alpha, beta]. (2) Tất cả các nước tiếp theo (i > 0) chỉ cần chứng minh rằng chúng không tốt hơn nước đầu tiên bằng Cửa sổ Không (Zero-Window) cực hẹp: [-alpha - 1, -alpha]. (3) Nếu một nước phụ bất ngờ vượt qua alpha (alpha < score < beta), xảy ra Fail-high, ta mới thực hiện Re-search lại với cửa sổ đầy đủ [-beta, -score].",
      "deepExplanation": "Zero-Window [-alpha - 1, -alpha] có độ rộng bằng đúng 1 đơn vị. Trong cây Alpha-Beta, độ rộng cửa sổ càng hẹp thì số lượng nhánh bị cắt tỉa càng lớn! Khi chạy Zero-Window, thuật toán chỉ cần trả lời câu hỏi nhị phân: 'Nước này có tốt hơn alpha không?' thay vì phải tính chính xác điểm số của nó. Trong > 85% trường hợp, nước phụ sẽ bị Fail-low (score <= alpha) và bị loại bỏ ngay tức khắc. Chỉ < 15% trường hợp phải Re-search, do đó tổng số node duyệt giảm từ 20% đến 40% so với Alpha-Beta thông thường.",
      "executionFlow": [
        "1. Duyệt nước i == 0 (PV Move):",
        "   - score = -_negamax(board, depth - 1, -beta, -alpha, ply + 1, tm, True)",
        "2. Duyệt các nước i > 0:",
        "   - score = -_negamax(board, depth - 1, -alpha - 1, -alpha, ply + 1, tm, True) (Zero-Window)",
        "   - if alpha < score < beta: (Fail-high -> Re-search)",
        "       - score = -_negamax(board, depth - 1, -beta, -score, ply + 1, tm, True)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1480-1530"
      },
      "concreteExample": "Giả sử tại 1 node có 25 nước đi hợp lệ. Nước đầu tiên (Hash Move) được search với [-INF, +INF] tìm ra score = 150 (alpha = 150). 24 nước còn lại đều được search với cửa sổ hẹp [-151, -150]. Nhờ đó, 24 nước này gây ra cutoff cực nhanh ở ngay độ sâu 1-2 ply, tiết kiệm hàng chục nghìn phép tính.",
      "teacherFollowUps": [
        {
          "question": "Tại sao cửa sổ Zero-Window lại là [-alpha - 1, -alpha] mà không phải [-alpha, -alpha]?",
          "answer": "Dạ, vì trong toán học số nguyên, nếu truyền [-alpha, -alpha] thì khoảng tìm kiếm rỗng (bề rộng = 0), không thể phân định được lớn hơn hay nhỏ hơn. Khoảng [-alpha - 1, -alpha] có bề rộng đúng bằng 1 đơn vị centipawn."
        },
        {
          "question": "Nếu Move Ordering sắp xếp sai (nước hay nhất nằm ở cuối) thì PVS sẽ ra sao?",
          "answer": "Dạ, nếu Move Ordering tồi, PVS sẽ liên tục bị Fail-high và phải Re-search cho hầu hết các nước, khiến tổng thời gian chạy chậm hơn khoảng 10-15% so với Alpha-Beta thường. Vì vậy PVS bắt buộc phải đi kèm với Move Ordering 8 bậc cực tốt của Vương."
        }
      ],
      "commonMistakes": [
        "Không nhớ công thức Zero-Window [-alpha-1, -alpha]",
        "Tưởng rằng PVS không bao giờ phải tìm kiếm lại"
      ]
    },
    "tags": [
      "PVS",
      "Principal Variation Search",
      "Zero-Window",
      "NegaScout",
      "Fail-high"
    ]
  },
  {
    "id": "MEM-LONG-03",
    "title": "Aspiration Windows (Cửa sổ Kỳ vọng) ±40 cp trong IDS",
    "question": "Aspiration Windows được Long tích hợp vào Iterative Deepening Search như thế nào? Tại sao lại đặt ngưỡng từ depth >= 4 và biên độ ±40 cp?",
    "category": "member",
    "topic": "search",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Searcher, _negamax, IDS, PVS, TT Score Normalization",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, trong vòng lặp IDS, ở các độ sâu depth >= 4, thay vì tìm kiếm với cửa sổ vô cực [-INF, +INF], hàm search() thiết lập một cửa sổ hẹp quanh điểm số tốt nhất của độ sâu trước: alpha = last_score - 40, beta = last_score + 40. Nếu kết quả rơi ra ngoài cửa sổ: nếu score <= alpha (Fail-low), ta mở rộng alpha = -INF; nếu score >= beta (Fail-high), ta mở rộng beta = +INF và tìm kiếm lại. Biên độ ±40 cp (0.4 Tốt) đủ rộng để hấp thụ dao động điểm thông thường, nhưng đủ hẹp để cắt tỉa cây mạnh mẽ.",
      "deepExplanation": "Tại sao chỉ bật từ depth >= 4? Vì ở depth 1, 2, 3 cây tìm kiếm còn rất nhỏ (chỉ vài trăm nodes), sự biến thiên điểm số giữa các độ sâu nông là rất lớn (do chưa ổn định thế trận), nếu đặt Aspiration Window sẽ liên tục bị văng khỏi cửa sổ làm mất thời gian. Từ depth 4 trở đi, điểm số thế cờ đã tương đối hội tụ, xác suất điểm số nằm trong khoảng ±40 cp đạt trên 83.4% (theo số liệu thực nghiệm báo cáo). Khi điểm nằm gọn trong cửa sổ, số node duyệt giảm từ 20% đến 35%.",
      "executionFlow": [
        "1. Khởi tạo: alpha = -INF, beta = +INF",
        "2. if depth >= 4 and last_score is not None:",
        "   - alpha = max(-INF, last_score - 40)",
        "   - beta = min(+INF, last_score + 40)",
        "3. score = self._negamax(board, depth, alpha, beta, 0, tm)",
        "4. if score <= alpha: (Fail-low) -> alpha = -INF, search lại",
        "5. if score >= beta: (Fail-high) -> beta = +INF, search lại"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher.search",
        "lines": "1650-1710"
      },
      "concreteExample": "Giả sử depth 4 trả về điểm +120 cp. Khi lên depth 5, bot thiết lập cửa sổ [80, 160]. Quá trình tìm kiếm ở depth 5 diễn ra cực nhanh vì toàn bộ các nhánh có điểm < 80 hoặc > 160 đều bị cắt tỉa ở các tầng cao. Kết quả depth 5 đạt 135 cp (nằm trong [80, 160]), hoàn tất độ sâu mà không cần re-search.",
      "teacherFollowUps": [
        {
          "question": "Nếu Fail-low xảy ra thì điều đó phản ánh điều gì về thế cờ?",
          "answer": "Dạ, Fail-low nghĩa là ở độ sâu mới, đối phương có một nước phản công nguy hiểm mà ở độ sâu trước ta chưa nhìn thấy, làm điểm số tụt xuống dưới alpha. Ta bắt buộc phải mở alpha = -INF để đánh giá chính xác mức độ thiệt hại."
        },
        {
          "question": "Tại sao không mở rộng từ từ (ví dụ trừ thêm 80 rồi 160) mà lại mở thẳng về -INF / +INF?",
          "answer": "Dạ, trong môi trường cờ chớp Blitz thời gian rất ngắn, việc re-search nhiều lần từng bước nhỏ có thể làm cạn kiệt ngân sách. Mở thẳng về vô cực đảm bảo lần re-search thứ 2 chắc chắn sẽ tìm ra kết quả cuối cùng."
        }
      ],
      "commonMistakes": [
        "Bật Aspiration Windows ngay từ depth 1",
        "Quên xử lý cả 2 trường hợp Fail-low và Fail-high"
      ]
    },
    "tags": [
      "Aspiration Windows",
      "IDS",
      "±40 cp",
      "Fail-low",
      "Fail-high",
      "Search Optimization"
    ]
  },
  {
    "id": "MEM-LONG-04",
    "title": "Chuẩn hóa Điểm Chiếu hết Mate Score: score_to_tt và score_from_tt",
    "question": "Tại sao điểm chiếu hết MATE_SCORE bắt buộc phải được chuẩn hóa qua hai hàm score_to_tt() và score_from_tt() trước khi lưu và sau khi đọc từ Transposition Table?",
    "category": "member",
    "topic": "search",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Searcher, _negamax, IDS, PVS, TT Score Normalization",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, điểm chiếu hết trong Negamax phụ thuộc vào khoảng cách tính từ gốc cây tìm kiếm (ply hiện tại): score = MATE_SCORE - ply. Nếu ta lưu trực tiếp điểm này vào bảng TT, khi một nhánh tìm kiếm khác (ở độ sâu ply khác) truy vấn lại cùng thế cờ đó, khoảng cách chiếu hết sẽ bị sai lệch hoàn toàn, khiến bot có thể chọn đường chiếu hết dài hơn hoặc thậm chí đi lặp cờ! Hai hàm score_to_tt và score_from_tt giúp chuyển đổi điểm chiếu hết thành khoảng cách tuyệt đối tính từ thế cờ hiện tại (relative to current position), triệt tiêu hoàn toàn sự phụ thuộc vào ply.",
      "deepExplanation": "Cụ thể công thức: (1) Lưu vào TT (score_to_tt): Nếu score >= MATE_THRESHOLD (ta chiếu hết đối thủ), điểm lưu là score + ply. Nếu score <= -MATE_THRESHOLD (đối thủ chiếu hết ta), điểm lưu là score - ply. (2) Đọc từ TT (score_from_tt): Khôi phục lại: Nếu score >= MATE_THRESHOLD, điểm trả về là score - ply; Nếu score <= -MATE_THRESHOLD, điểm trả về là score + ply. MATE_THRESHOLD được nhóm chọn là 29,000 cp (với MATE_SCORE = 30,000 cp và MAX_DEPTH = 64).",
      "executionFlow": [
        "1. score_to_tt(score, ply):",
        "   - if score >= 29000: return score + ply",
        "   - if score <= -29000: return score - ply",
        "   - return score",
        "2. score_from_tt(score, ply):",
        "   - if score >= 29000: return score - ply",
        "   - if score <= -29000: return score + ply",
        "   - return score"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "score_to_tt & score_from_tt",
        "lines": "195-250"
      },
      "concreteExample": "Giả sử ở ply = 3, bot phát hiện chiếu hết sau 2 nước nữa: score = 30,000 - 5 = 29,995. Khi lưu vào TT, score_to_tt chuyển thành 29,995 + 3 = 30,002 (khoảng cách tuyệt đối là chiếu sau 2 nước từ thế cờ này). Sau đó, ở một nhánh khác thế cờ này xuất hiện tại ply = 7: score_from_tt lấy 30,002 - 7 = 29,993 (chính xác là chiếu hết ở ply 7 + 2 = 9). Nếu không chuẩn hóa, bot sẽ lấy nguyên điểm 29,995 và tưởng rằng có thể chiếu hết ở ply 5, dẫn đến tính toán sai!",
      "teacherFollowUps": [
        {
          "question": "Tại sao MATE_THRESHOLD lại là 29,000 mà không phải 30,000?",
          "answer": "Dạ, vì MATE_SCORE là 30,000 và độ sâu tối đa MAX_DEPTH là 64. Một đòn chiếu hết xa nhất có thể có điểm là 30,000 - 64 = 29,936 cp. Đặt ngưỡng 29,000 cp bảo đảm bao trọn toàn bộ các đòn chiếu hết mà không bị nhầm lẫn với điểm vật chất bình thường (vật chất cao nhất chỉ khoảng 4,000 cp)."
        }
      ],
      "commonMistakes": [
        "Cộng trừ nhầm dấu ply giữa hàm to_tt và from_tt",
        "Không hiểu tại sao điểm chiếu hết lại phụ thuộc vào ply"
      ]
    },
    "tags": [
      "Mate Score",
      "score_to_tt",
      "score_from_tt",
      "Transposition Table",
      "Ply Normalization"
    ]
  },
  {
    "id": "MEM-LONG-05",
    "title": "Bảo toàn Nước đi Tốt nhất khi Bị Ngắt Thời gian (Timeout Guard)",
    "question": "Khi hàm search() đang duyệt dở ở depth 5 mà đồng hồ báo hết giờ, bot làm cách nào để không bị mất nước đi tốt nhất và không trả về nước đi dở dang?",
    "category": "member",
    "topic": "search",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Searcher, _negamax, IDS, PVS, TT Score Normalization",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, trong vòng lặp Iterative Deepening Search, nhóm duy trì biến `best_move` lưu trữ nước đi tối ưu của độ sâu HOÀN CHỈNH gần nhất, và biến `candidate` lưu nước đi đang được đánh giá ở độ sâu hiện tại. Khi xảy ra ngắt timeout (self._timeout == True), nhóm có điều kiện chốt chặn an toàn: `if candidate is not None and (not self._timeout or depth == 1): best_move = candidate`. Nhờ đó, nếu tầng hiện tại bị ngắt giữa chừng, candidate chưa hoàn chỉnh sẽ bị vứt bỏ, và bot giữ nguyên an toàn 100% nước `best_move` của tầng trước đó!",
      "deepExplanation": "Tại sao lại có ngoại lệ `or depth == 1`? Vì ở độ sâu đầu tiên (depth 1), bot chưa có kết quả của độ sâu hoàn chỉnh nào trước đó. Nếu ngay ở depth 1 mà bị ngắt thời gian, bot bắt buộc phải chấp nhận candidate tốt nhất tìm được cho đến thời điểm đó thay vì để best_move rỗng. Ngoài ra, toàn bộ biến trạng thái `self._timeout` được khởi tạo False ở đầu lượt đi và chỉ được bật thành True khi `tm.should_stop()` phát hiện vượt quá Hard Limit.",
      "executionFlow": [
        "1. Khởi tạo best_move = None",
        "2. For depth in range(1, MAX_DEPTH + 1):",
        "   - candidate = self._search_root(depth)",
        "   - if candidate is not None and (not self._timeout or depth == 1):",
        "       - best_move = candidate",
        "   - if self._timeout or not tm.can_start_next_depth():",
        "       - break",
        "3. return best_move"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher.search",
        "lines": "1730-1770"
      },
      "concreteExample": "Giả sử ở depth 4, bot tìm ra nước tối ưu là e2e4. Lên depth 5, bot duyệt được 5 nước và tạm thời candidate đang là a2a3 (vì chưa duyệt tới e2e4). Bất ngờ hết giờ! Nhờ điều kiện `not self._timeout`, bot không cập nhật candidate a2a3 mà giữ nguyên e2e4 của depth 4 để trả về cho ban trọng tài.",
      "teacherFollowUps": [
        {
          "question": "Nếu ở depth 1 bị timeout ngay lập tức trước khi duyệt xong bất kỳ nước nào thì sao?",
          "answer": "Dạ, lúc đó best_move vẫn là None. Hàm choose_move() ở tầng 2 có cơ chế bọc lót fallback an toàn: nếu move is None, hàm tự động gán move = legal[0] để không bao giờ bị lỗi văng chương trình."
        }
      ],
      "commonMistakes": [
        "Cập nhật best_move mù quáng ngay cả khi cờ timeout đã bật",
        "Không hiểu ý nghĩa của việc lưu trữ kết quả theo từng tầng IDS"
      ]
    },
    "tags": [
      "Timeout Guard",
      "Iterative Deepening",
      "best_move",
      "candidate",
      "Safety"
    ]
  },
  {
    "id": "MEM-LONG-06",
    "title": "Quản lý Ngăn xếp Bàn cờ An toàn bằng try...finally (Stack Integrity)",
    "question": "Tại sao trong hàm _negamax() và _quiescence(), các thao tác board.push(m) và board.pop() luôn được bao bọc nghiêm ngặt trong khối try...finally?",
    "category": "member",
    "topic": "architecture",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Searcher, _negamax, IDS, PVS, TT Score Normalization",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, cấu trúc dữ liệu bàn cờ chess.Board duy trì một ngăn xếp các nước đi (move stack). Nếu ta gọi board.push(m) nhưng trong quá trình đệ quy con xảy ra ngắt timeout đột ngột hoặc văng ngoại lệ mà ta không kịp gọi board.pop(), ngăn xếp bàn cờ sẽ bị lệch trạng thái (corrupted state). Khi quay lại các tầng trên, bàn cờ không còn khớp với thế cờ thực tế, dẫn tới toàn bộ các nước đi sau đó đều bị sai luật hoặc sập bot. Khối try...finally bảo đảm 100% rằng dù có bất kỳ chuyện gì xảy ra, board.pop() luôn luôn được thực thi để hoàn nguyên bàn cờ.",
      "deepExplanation": "Trong Python, mệnh đề finally trong cấu trúc `try...finally` có cam kết ngôn ngữ: luôn được thực thi ngay cả khi có lệnh return, break, hoặc ngoại lệ chưa bắt (unhandled exception). Trong một hàm đệ quy sâu hàng chục tầng như Negamax, nếu không dùng try...finally, chỉ cần một lần ngắt thời gian nhảy ra khỏi vòng lặp là số lần push sẽ nhiều hơn số lần pop, làm rò rỉ trạng thái bàn cờ (stack desynchronization).",
      "executionFlow": [
        "1. board.push(move)",
        "2. try:",
        "   - score = -self._negamax(board, depth - 1, -beta, -alpha, ply + 1, tm)",
        "3. finally:",
        "   - board.pop()  # Luôn luôn được gọi để khôi phục bàn cờ nguyên trạng"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1460-1475"
      },
      "concreteExample": "Giả sử tại depth 3, bot push nước e2e4. Khi gọi đệ quy xuống depth 2, hàm should_stop() phát hiện hết giờ và trả về 0 ngay lập tức. Nhờ có khối finally, lệnh board.pop() được kích hoạt tức thì, đưa bàn cờ trở lại vị trí ban đầu trước khi hàm search kết thúc và trả nước đi cho hệ thống.",
      "teacherFollowUps": [
        {
          "question": "Tại sao không copy bàn cờ mới bằng board.copy() ở mỗi node cho an toàn thay vì push/pop?",
          "answer": "Dạ, việc sao chép đối tượng chess.Board() tốn chi phí bộ nhớ và thời gian rất lớn (mất khoảng 10-15 microseconds/copy). Trong khi đó push/pop chỉ mất khoảng 0.8 microsecond, nhanh gấp hơn 15 lần, là chuẩn mực bắt buộc để đạt tốc độ tìm kiếm hàng vạn nodes/giây."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng push/pop bên ngoài try...finally là đủ an toàn",
        "Dùng board.copy() làm giảm tốc độ duyệt cây 15 lần"
      ]
    },
    "tags": [
      "Stack Integrity",
      "try-finally",
      "push-pop",
      "Corrupted State",
      "Defensive Programming"
    ]
  },
  {
    "id": "MEM-LONG-07",
    "title": "Kiểm tra Hòa cờ Ba lần Lặp lại (Threefold Repetition) và 50 Nước",
    "question": "Hàm _negamax() kiểm tra các trạng thái hòa cờ (Threefold Repetition và Quy tắc 50 nước) ở vị trí nào? Tại sao lại dùng điều kiện `ply > 0 and board.is_repetition(2)` thay vì 3?",
    "category": "member",
    "topic": "search",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Searcher, _negamax, IDS, PVS, TT Score Normalization",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, việc kiểm tra hòa cờ được đặt ngay tại đầu hàm _negamax(): `if board.halfmove_clock >= 100 or (ply > 0 and board.is_repetition(2)): return DRAW_SCORE (0)`. Nhóm kiểm tra `is_repetition(2)` (lặp lại 2 lần) thay vì 3 lần vì trong cây tìm kiếm, nếu bot đi một nước cờ dẫn tới thế cờ đã từng xuất hiện 1 lần trước đó trong ván đấu, đối phương hoàn toàn có quyền đi lặp lại để kích hoạt hòa 3 lần. Việc coi lặp lại 2 lần là hòa cờ giúp bot chủ động né tránh bẫy lặp cờ khi đang ưu thế, hoặc chủ động tìm kiếm lặp cờ để cầu hòa khi đang lép vế.",
      "deepExplanation": "Tại sao phải có điều kiện `ply > 0`? Vì ở nút gốc (ply == 0, thế cờ hiện tại vừa nhận từ Host), thế cờ này có thể đã xuất hiện lần thứ 2. Nếu ta kiểm tra ở ply == 0 thì hàm search sẽ trả về điểm hòa ngay mà không tìm nước đi tiếp theo! Do đó chỉ kiểm tra lặp cờ từ ply >= 1 trở đi. Về quy tắc 50 nước: `board.halfmove_clock >= 100` (100 nửa nước = 50 nước đi đầy đủ không có nước ăn quân hoặc đẩy Tốt) cũng được quy đổi về DRAW_SCORE = 0.",
      "executionFlow": [
        "1. Tại đầu _negamax(board, depth, alpha, beta, ply):",
        "2. if board.halfmove_clock >= 100: return DRAW_SCORE",
        "3. if ply > 0 and board.is_repetition(2): return DRAW_SCORE",
        "4. Tiếp tục các bước tra cứu TT và lượng giá..."
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1210-1225"
      },
      "concreteExample": "Giả sử Trắng đang hơn 1 Xe (+500 cp). Nếu không có kiểm tra repetition, Trắng có thể đi Vua qua lại và lặp cờ 3 lần bị xử hòa đáng tiếc. Nhờ `is_repetition(2)`, nhánh lặp cờ bị gán điểm 0 cp, Trắng thấy 0 cp kém xa +500 cp nên sẽ chọn một nước cờ khác để duy trì ưu thế thắng.",
      "teacherFollowUps": [
        {
          "question": "Hàm board.is_repetition(2) của thư viện chess có tốn thời gian không?",
          "answer": "Dạ, python-chess kiểm tra danh sách khóa băm trong ngăn xếp lịch sử bàn cờ (board.move_stack), chi phí chỉ khoảng vài microsecond cho vài chục nước gần nhất, hoàn toàn nằm trong ngân sách cho phép."
        }
      ],
      "commonMistakes": [
        "Kiểm tra repetition ở cả nút gốc ply == 0",
        "Chờ đến khi lặp đủ 3 lần mới nhận diện hòa cờ trong search tree"
      ]
    },
    "tags": [
      "Threefold Repetition",
      "50-move rule",
      "DRAW_SCORE",
      "is_repetition(2)",
      "ply > 0"
    ]
  },
  {
    "id": "MEM-LONG-08",
    "title": "Bảng Lịch sử (History Heuristic) và Cơ chế Giảm trừ (Decay History)",
    "question": "Bảng History Heuristic được Searcher cập nhật và làm suy giảm (_decay_history) như thế nào qua các nước đi?",
    "category": "member",
    "topic": "search",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Searcher, _negamax, IDS, PVS, TT Score Normalization",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ, History Heuristic ghi nhận độ hiệu quả lịch sử của các nước đi yên tĩnh (quiet moves). Bảng `self.history_table[color][from_sq][to_sq]` lưu trữ điểm thưởng tích lũy. Khi một quiet move gây ra Beta-cutoff ở độ sâu d, điểm thưởng cộng thêm là d * d (độ sâu càng lớn điểm thưởng càng cao). Để tránh việc các nước cờ hay ở đầu ván cờ tiếp tục chi phối vô lý ở tàn cuộc, hàm `_decay_history()` được gọi để chia đôi toàn bộ bảng điểm (giảm 50%) sau mỗi lượt đi mới.",
      "deepExplanation": "Công thức cộng điểm: `self.history_table[color][from_sq][to_sq] += depth * depth`. Tại sao lại là depth bình phương? Vì một nước đi gây ra cắt tỉa ở độ sâu lớn (ví dụ depth 5 -> +25 điểm) có giá trị chiến thuật vượt trội hơn nhiều so với một nước cắt tỉa ở depth nông (depth 1 -> +1 điểm). Sau đó trong `_order_moves()`, điểm history được chuẩn hóa để xếp hạng các quiet moves. Cơ chế `_decay_history()` (chia đôi toàn bộ giá trị) đóng vai trò như 'bộ nhớ quên' (forgetting mechanism), giúp bot nhanh chóng thích ứng với cấu trúc thế cờ mới thay vì bị ám ảnh bởi lịch sử cũ.",
      "executionFlow": [
        "1. Khi có Beta-cutoff bởi quiet move m tại depth d: self._update_history(m, color, depth)",
        "   - history_table[color][m.from_square][m.to_square] += depth * depth",
        "2. Ở đầu mỗi lượt đi mới của bot: self._decay_history()",
        "   - Chia đôi: history_table[c][f][t] //= 2 cho toàn bộ các ô."
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._decay_history & _update_history",
        "lines": "649-700"
      },
      "concreteExample": "Một nước nhảy Mã f3-e5 liên tục gây cắt tỉa ở trung cuộc sẽ có điểm history rất cao. Sang tàn cuộc khi Mã đã đổi và bàn cờ mở toang cho Xe, hàm _decay_history sẽ giảm dần điểm của nước f3-e5, nhường chỗ cho các nước đẩy Tốt thông vươn lên dẫn đầu Move Ordering.",
      "teacherFollowUps": [
        {
          "question": "Bảng history có cần phân biệt màu quân không?",
          "answer": "Dạ có, mảng có chiều đầu tiên là color (Trắng/Đen) vì cùng một nước đi từ e2 đến e4 nhưng Trắng đi thì là nước mở cờ tuyệt vời, còn Đen đi thì là hướng ngược lại hoàn toàn."
        }
      ],
      "commonMistakes": [
        "Không làm suy giảm bảng history khiến bot bị thiên kiến bởi các nước cờ cũ",
        "Cộng điểm tuyến tính thay vì chiều sâu bình phương"
      ]
    },
    "tags": [
      "History Heuristic",
      "_decay_history",
      "_update_history",
      "Move Ordering",
      "Aging"
    ]
  },
  {
    "id": "MEM-LONG-09",
    "title": "Hiểu biết về TimeManager và 6 Phân tầng Thời gian (Hỏi chéo Bách)",
    "question": "Long hãy giải thích cơ chế phân bổ ngân sách 6 phân tầng trong compute_budget_ms() của Bách hoạt động như thế nào?",
    "category": "member",
    "topic": "time-management",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em nắm rất rõ module time_manager.py của bạn Bách: Trong chế độ Blitz (quỹ thời gian ban đầu <= 60s), compute_budget_ms phân chia thành 6 phân tầng dựa trên số nước đi ply và thời gian còn lại: (1) Extreme Panic: time <= 1.5s -> 8-15 ms. (2) Panic Mode: time <= 3.5s -> 35-50 ms. (3) Nước 1-31 (Khai/Trung cuộc): cấp 150-220 ms (hấp thụ trễ sàn 500ms của máy chủ). (4) Nước 32-55: cấp 35-55 ms. (5) Sau nước 55: cấp 25-40 ms. (6) Chế độ Standard (> 60s): cấp time_left / 30 nước.",
      "deepExplanation": "Sự phân tầng này phản ánh đúng vòng đời chiến thuật của một ván cờ: Nước 1-31 là giai đoạn định hình cấu trúc và va chạm chiến thuật phức tạp nhất, cần ngân sách lớn nhất (150-220ms) để Searcher của em tìm được độ sâu 4-5 ply. Từ nước 32 trở đi, quân cờ đã vãn, các đòn chiến thuật giảm bớt, ngân sách rút xuống để bảo toàn thời gian. Hai tầng Panic 3.5s và Extreme Panic 1.5s là phao cứu sinh bảo vệ bot tuyệt đối không bị timeout khi đối phương cố tình kéo dài ván đấu.",
      "executionFlow": [
        "1. Kiểm tra khẩn cấp: if t <= 1500 -> 8-15ms; elif t <= 3500 -> 35-50ms",
        "2. Kiểm tra chế độ Blitz (initial <= 60s):",
        "   - if ply <= 62 (nước 1-31): 150-220 ms",
        "   - elif ply <= 110 (nước 32-55): 35-55 ms",
        "   - else: 25-40 ms",
        "3. Chế độ Standard (> 60s): budget = t / 30"
      ],
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "compute_budget_ms",
        "lines": "37-100"
      },
      "concreteExample": "Trong ván marathon 123 nước (POS-09), sau nước 55 bot chạy ở phân tầng 25-40 ms, tiêu hao cực ít thời gian nhưng vẫn đủ để duy trì độ sâu 3-4 ply ở tàn cuộc ít quân, nhờ đó đồng hồ không bao giờ bị rơi vào trạng thái cạn kiệt.",
      "teacherFollowUps": [
        {
          "question": "Tại sao ply <= 62 lại là nước 1-31?",
          "answer": "Dạ, vì trong cờ vua 1 nước đi đầy đủ (move) gồm 2 nửa nước (ply: Trắng đi 1 ply, Đen đi 1 ply). 31 nước đi tương đương 62 ply."
        }
      ],
      "commonMistakes": [
        "Nhầm lẫn giữa ply và move",
        "Không giải thích được sự khác nhau giữa chế độ Blitz và Standard"
      ]
    },
    "tags": [
      "Cross-Examination",
      "compute_budget_ms",
      "6-Tiers",
      "Time Management",
      "Ply"
    ]
  },
  {
    "id": "MEM-LONG-10",
    "title": "Hiểu biết về Tapered Evaluation PeSTO và Bảng PST (Hỏi chéo Việt)",
    "question": "Long hãy giải thích nguyên lý Tapered Evaluation và cách tính Game Phase trong evaluation.py của Việt?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, Tapered Evaluation là phương pháp nội suy tuyến tính mượt mà giữa hai bảng đánh giá vị trí: bảng Trung cuộc (Middlegame - MG) và bảng Tàn cuộc (Endgame - EG). Giai đoạn trận đấu Game Phase (từ 0 đến 24) được tính dựa trên số lượng quân lớn còn lại trên bàn cờ. Công thức nội suy: `score = (mg_score * phase + eg_score * (24 - phase)) // 24`. Khi bàn cờ đủ quân (phase = 24), điểm số hoàn toàn là MG. Khi bàn cờ đổi hết quân lớn (phase = 0), điểm số chuyển hóa trọn vẹn 100% sang EG.",
      "deepExplanation": "Tại sao không dùng một bảng PST duy nhất? Vì giá trị vị trí của quân cờ thay đổi hoàn toàn giữa trung cuộc và tàn cuộc: Trong trung cuộc, Vua phải trốn ở góc an toàn (bảng MG thưởng Vua ở hàng đáy, phạt nặng Vua ra tâm). Nhưng sang tàn cuộc khi hết nguy cơ bị chiếu hết, Vua phải xông ra trung tâm để kiểm soát ô và yểm trợ Tốt phong cấp (bảng EG thưởng Vua ở trung tâm bàn cờ). Tapered Evaluation giúp sự chuyển tiếp này diễn ra liên tục, không bị nhảy vọt điểm số (score jump) gây nhiễu cây tìm kiếm.",
      "executionFlow": [
        "1. Đếm quân lớn: Knights/Bishops * 1 + Rooks * 2 + Queens * 4",
        "2. Giới hạn phase: phase = min(24, total_phase)",
        "3. Tính tổng điểm vị trí: s = _pst_sum(pieces)",
        "4. Tách mg và eg: eg = (s + 0x8000) >> 16; mg = s - (eg << 16)",
        "5. Nội suy: eval = (mg * phase + eg * (24 - phase)) // 24"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "430-600"
      },
      "concreteExample": "Nếu Vua đứng ở ô d4: Trong trung cuộc (phase 24), bảng MG phạt -40 cp vì Vua lộ liễu. Trong tàn cuộc (phase 0), bảng EG thưởng +40 cp vì Vua chiếm lĩnh trung tâm. Khi bàn cờ ở giai đoạn giữa (phase 12), điểm số nội suy là (-40 * 12 + 40 * 12) / 24 = 0 cp, phản ánh trung thực trạng thái chuyển giao.",
      "teacherFollowUps": [
        {
          "question": "Hàm evaluate trả về điểm từ góc nhìn của ai và Searcher sử dụng nó ra sao?",
          "answer": "Dạ, evaluate luôn trả về điểm từ góc nhìn của bên đang đến lượt đi (board.turn). Trong _negamax, Searcher nhận điểm này làm static_eval để so sánh trực tiếp với alpha và beta mà không cần chuyển đổi."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng Game Phase tính theo số nước đi ply thay vì tính theo lượng vật chất",
        "Tưởng rằng Vua có cùng bảng vị trí ở cả 2 giai đoạn"
      ]
    },
    "tags": [
      "Cross-Examination",
      "Tapered Evaluation",
      "Game Phase",
      "PeSTO",
      "Interpolation"
    ]
  },
  {
    "id": "MEM-LONG-11",
    "title": "Hiểu biết về Null Move Pruning và Nguy cơ Zugzwang (Hỏi chéo Vương)",
    "question": "Long hãy giải thích cơ chế Null Move Pruning (NMP) của Vương trong search.py và điều kiện bảo vệ để không bị dính bẫy Zugzwang?",
    "category": "member",
    "topic": "search",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, Null Move Pruning dựa trên giả định 'Quyền được đi nước cờ luôn đem lại lợi thế' (Null Move Observation): Nếu ta nhường lượt cho đối phương đi 2 nước liên tiếp (pass một nước cờ rỗng) mà với độ sâu giảm trừ R đối phương vẫn không thể đạt được điểm beta, thì ở thế cờ bình thường ta chắc chắn vượt qua beta. Nhờ đó, ta cắt tỉa toàn bộ nhánh này mà không cần sinh nước đi. Nguy cơ lớn nhất là bẫy Zugzwang (thế cờ mà bắt buộc phải đi cờ mới bị thua). Vương đã cài đặt chốt chặn: NMP chỉ được kích hoạt khi bên đi CÒN QUÂN LỚN (has_pieces: còn Mã, Tượng, Xe hoặc Hậu), tuyệt đối không áp dụng khi chỉ còn Vua và Tốt.",
      "deepExplanation": "Công thức giảm độ sâu động: R = 2 + floor(depth / 6). Điều kiện kích hoạt NMP đầy đủ: (1) allow_nmp is True (không cho phép 2 lần null move liên tiếp). (2) depth >= 3 (chỉ áp dụng ở tầng đủ sâu). (3) not board.is_check() (không thể pass lượt khi đang bị chiếu). (4) has_pieces: bên đi phải còn ít nhất 1 quân cờ lớn (vì trong tàn cuộc Vua và Tốt, Zugzwang xuất hiện rất phổ biến). (5) static_eval >= beta (thế cờ tĩnh đã phải đủ mạnh).",
      "executionFlow": [
        "1. if allow_nmp and depth >= 3 and not in_check and static_eval >= beta and has_pieces:",
        "2. R = 2 + (1 if depth >= 5 else 0)",
        "3. board.push(chess.Move.null())",
        "4. score = -self._negamax(board, depth - 1 - R, -beta, -beta + 1, ply + 1, tm, False)",
        "5. board.pop()",
        "6. if score >= beta: return beta (Cắt tỉa NMP thành công!)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1340-1390"
      },
      "concreteExample": "Trong tàn cuộc Vua và Tốt đối đầu nhau, bên nào đến lượt đi bên đó phải rời ô kiểm soát và bị thua (Zugzwang). Nếu lúc này áp dụng NMP (nhường lượt cho đối phương), đối phương đi trước sẽ thua và bot tưởng rằng mình thắng, dẫn đến đánh giá sai lầm chết người. Nhờ điều kiện has_pieces, NMP bị vô hiệu hóa ngay khi hết quân lớn.",
      "teacherFollowUps": [
        {
          "question": "Tại sao trong lời gọi NMP lại truyền tham số allow_nmp = False?",
          "answer": "Dạ, để ngăn chặn đệ quy null move liên tiếp 2 lần (nhường lượt qua lại vô tận), vi phạm nguyên lý toán học của cây đối kháng."
        }
      ],
      "commonMistakes": [
        "Bật NMP khi đang bị chiếu (phạm luật cờ)",
        "Áp dụng NMP trong tàn cuộc Vua và Tốt gây lỗi Zugzwang"
      ]
    },
    "tags": [
      "Cross-Examination",
      "Null Move Pruning",
      "Zugzwang",
      "has_pieces",
      "Reduction R"
    ]
  },
  {
    "id": "MEM-LONG-12",
    "title": "Hiểu biết về Static Exchange Evaluation (SEE) trong Lọc Nước Ăn Quân (Hỏi chéo Vương)",
    "question": "Thuật toán see(board, move) trong search.py hoạt động như thế nào và tại sao nó lại quan trọng cho Move Ordering?",
    "category": "member",
    "topic": "search",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, SEE (Static Exchange Evaluation) là thuật toán lượng giá trao đổi tĩnh mô phỏng một chuỗi các pha ăn quân qua lại trên duy nhất MỘT Ô CỜ mục tiêu mà không làm thay đổi phần còn lại của bàn cờ. Bắt đầu từ nước ăn quân ban đầu, hai bên lần lượt dùng quân cờ có giá trị nhỏ nhất (Least Valuable Attacker) để ăn lại quân trên ô đó, tạo thành danh sách hoán vị điểm số. Cuối cùng, thuật toán dùng Minimax đảo ngược để xác định giá trị thu được ròng. Nước có SEE >= 0 được xếp vào Good Captures, nước có SEE < 0 bị đẩy xuống Bad Captures.",
      "deepExplanation": "Tại sao MVV-LVA là chưa đủ mà cần có SEE? Giả sử Hậu ta ăn một quân Tốt được bảo vệ bởi Xe đối phương: MVV-LVA chỉ nhìn thấy 'Hậu ăn Tốt' và gán điểm rất cao vì đây là nước ăn quân. Nhưng thực tế sau đó Xe đối phương ăn lại Hậu, ta mất Hậu đổi Tốt (lỗ 800 cp)! Thuật toán see(board, move) sẽ mô phỏng: ăn Tốt (+100), bị Xe ăn lại (-900) -> SEE = -800 < 0. Nhờ đó, nước Hậu liều mạng này bị giáng xuống nhóm Bad Captures, ngăn không cho bot duyệt nhầm nhánh dâng quân vô nghĩa.",
      "executionFlow": [
        "1. Khởi tạo mảng d = [giá_trị_quân_bị_ăn]",
        "2. Lặp: Tìm quân tấn công nhỏ nhất của bên đối diện ngắm vào ô mục tiêu",
        "3. Thêm vào mảng: d.append(giá_trị_quân_vừa_ăn - d[-1])",
        "4. Duyệt ngược từ cuối mảng lên đầu bằng quy tắc Minimax: d[i-1] = max(-d[i], d[i-1])",
        "5. return d[0] (giá trị ròng của cuộc đổi quân)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "see",
        "lines": "287-435"
      },
      "concreteExample": "Ở trận thắng Nhóm 13 (POS-03), nước 12. bxa4 Tốt ăn Mã đi lạc được SEE tính toán: ăn Mã (+300), không có quân nào ăn lại Tốt a4 -> SEE = +300 >= 0, được phân loại ngay vào Good Captures và gây ra Beta-cutoff lập tức.",
      "teacherFollowUps": [
        {
          "question": "Tại sao SEE lại dùng cơ chế LVA (Least Valuable Attacker)?",
          "answer": "Dạ, vì theo nguyên tắc cờ vua tối ưu, người chơi luôn dùng quân có giá trị thấp nhất (như Tốt hoặc Mã) để ăn lại trước, nhằm giảm thiểu rủi ro vật chất nếu đối phương tiếp tục đổi quân."
        }
      ],
      "commonMistakes": [
        "Tưởng rằng SEE chạy toàn bộ cây tìm kiếm (thực chất chỉ tính trên 1 ô cờ duy nhất)",
        "Không phân biệt được MVV-LVA và SEE"
      ]
    },
    "tags": [
      "Cross-Examination",
      "SEE",
      "Static Exchange Evaluation",
      "MVV-LVA",
      "Good Captures"
    ]
  },
  {
    "id": "MEM-LONG-13",
    "title": "Phân tích Tình huống Bỏ lỡ Nước Ghim Thắng Trận POS-05",
    "question": "Trong trận long-p71-l2 (POS-05), tại sao bot lại đi nước chiếu vô hại 58. Qe8+ thay vì nước ghim thắng tuyệt đối 58. Qd4!? Lỗi này do thuật toán nào gây ra?",
    "category": "member",
    "topic": "experiment",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Phân tích thực nghiệm và phản biện",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, báo cáo tại mục 5.4.4 đã phân tích rất sâu về tình huống POS-05: Ở nước 58 trong tàn cuộc Hậu chống Xe, bot có nước ghim 58. Qd4! bắt sống Xe Đen và thắng ngay lập tức. Tuy nhiên, bot lại chọn nước chiếu 58. Qe8+ làm rơi mất 280 cp lợi thế. Nguyên nhân là do sự kết hợp của 2 yếu tố: (1) Thiên kiến nước chiếu an toàn (Safe Checks Heuristic): Trong _order_moves, nước chiếu được cộng tới +800,000 điểm ưu tiên nên được duyệt trước. (2) Rào cản độ sâu 4 ply trong thời gian Blitz: Ở độ sâu 4 ply, nước chiếu Qe8+ trông có vẻ rất an toàn và duy trì ưu thế, che mờ nước đi yên tĩnh Qd4 đòi hỏi phải nhìn thấy kết quả bắt quân ở ply thứ 5.",
      "deepExplanation": "Đây là bài học đánh đổi kinh điển (Trade-off) trong lập trình AI cờ vua: Việc ưu tiên Safe Checks (+800,000 điểm) giúp bot phòng thủ và phản công cực kỳ xuất sắc ở trung cuộc (như ván POS-01 và POS-02). Tuy nhiên ở tàn cuộc Hậu, heuristic này gây ra hiện tượng 'Check Bias' (thiên kiến chiếu dồn), bot có xu hướng chiếu liên tục để kiếm điểm an toàn thay vì thực hiện các nước đi định vị chiến lược (quiet maneuvering).",
      "executionFlow": [
        "1. Move Ordering gán cho 58. Qe8+ điểm Safe Checks = 800,000",
        "2. Nước ghim 58. Qd4 là quiet move, chỉ nhận điểm History Heuristic thấp hơn nhiều",
        "3. Trong 1.7 giây, Searcher chỉ đạt độ sâu 4 ply",
        "4. Nước Qe8+ duy trì điểm đánh giá dương (+47 cp) nên được chọn, bỏ lỡ đòn kết liễu Qd4 (+327 cp)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._order_moves",
        "lines": "850-890"
      },
      "concreteExample": "Sau nước Qe8+, Xe Đen rút về cản chiếu, ván đấu bị kéo dài thêm 64 nước nữa và cuối cùng dẫn đến trận hòa đáng tiếc ở nước 122 (POS-06).",
      "teacherFollowUps": [
        {
          "question": "Nhóm sẽ khắc phục thiên kiến nước chiếu này như thế nào nếu phát triển tiếp?",
          "answer": "Dạ, nhóm sẽ hạ điểm ưu tiên của Safe Checks trong giai đoạn tàn cuộc (khi phase <= 6), hoặc bổ sung Check Evasion Extension để ép cây tìm kiếm phải đào sâu thêm 1-2 ply kiểm tra xem sau nước chiếu đối phương có thoát ra được không."
        }
      ],
      "commonMistakes": [
        "Đổ lỗi cho hàm evaluate tính sai thay vì thấy được lỗi do Move Ordering và giới hạn độ sâu",
        "Không chỉ ra được nước thay thế tối ưu Qd4!"
      ]
    },
    "tags": [
      "Case Study",
      "POS-05",
      "Check Bias",
      "Safe Checks",
      "Depth Barrier",
      "Trade-offs"
    ]
  },
  {
    "id": "MEM-LONG-14",
    "title": "Phân tích Tình huống Ván Marathon 123 Nước (POS-08 và POS-09)",
    "question": "Tại sao ở ván marathon 123 nước (POS-08), tại nước 118 bot lại nghĩ tới 2.47 giây (cao nhất giải đấu) và tìm ra nước then chốt Qd5 dẫn tới chiếu hết ở nước 123?",
    "category": "member",
    "topic": "experiment",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Phân tích thực nghiệm và phản biện",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, ở nước 118 ván đấu gặp Nhóm 3 (POS-08), thế cờ tàn cuộc cực kỳ căng thẳng. Hàm compute_budget_ms nhận thấy thời gian thi đấu đã kéo dài qua 100 nước nhưng quỹ thời gian tích lũy của nhóm vẫn còn rất lớn (nhờ chiến lược hấp thụ độ trễ ở trung cuộc). Hệ thống quyết định cấp ngân sách tối đa an toàn hard_limit = 2,467 ms. Nhờ có đủ 2.47 giây, Searcher của em đã mở rộng thành công lên độ sâu 6 ply (sâu nhất của bot trong cả giải) và tìm ra nước then chốt 118... Qd5 phong tỏa hoàn toàn Vua Trắng, dẫn tới đòn chiếu hết ở nước 123 (POS-09).",
      "deepExplanation": "Ở các nước tàn cuộc phức tạp, việc dồn thời gian vào một nước đi bản lề (Critical Move Expansion) tạo ra bước ngoặt quyết định. Nếu bot vẫn chạy ở mức 30-40 ms, độ sâu chỉ đạt 3 ply và sẽ không bao giờ nhìn thấy chuỗi đòn phong tỏa 5 nước dẫn tới chiếu hết. Việc Searcher đạt độ sâu 6 ply đã đẩy điểm đánh giá vọt lên -991 cp cho Đen, và chỉ sau 5 nước tiếp theo, nước Qh1# (POS-09) kết liễu trận đấu lịch sử 123 nước.",
      "executionFlow": [
        "1. Nước 118: time_remaining còn nhiều -> cấp hard_limit = 2,467 ms",
        "2. IDS chạy từ depth 1 lên depth 6 mà không bị ngắt timeout",
        "3. Nước 118... Qd5 cắt đứt mọi đường thoát của Vua Trắng (∆cp = -391)",
        "4. Nước 123... Qh1# phát hiện chiếu hết trong 612 ms, hoàn tất chiến thắng marathon"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher.search",
        "lines": "1650-1740"
      },
      "concreteExample": "Bảng 10 ghi nhận POS-08 là nước cờ có thời gian suy nghĩ lâu nhất của Nhóm 12 (2,467 ms), và POS-09 là ván thắng marathon dài nhất toàn bộ giải đấu ChessLab 2026 (123 nước).",
      "teacherFollowUps": [
        {
          "question": "Làm sao bot không bị dính luật hòa 50 nước trong ván marathon dài như vậy?",
          "answer": "Dạ, vì trong quá trình tìm kiếm, hàm _negamax liên tục theo dõi board.halfmove_clock. Khi thấy đồng hồ nửa nước tiến gần mốc 100, bot sẽ ưu tiên các nước đẩy Tốt hoặc nước ăn quân để reset đồng hồ halfmove_clock về 0."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng bot luôn luôn nghĩ 200ms trong mọi trường hợp",
        "Không giải thích được mối liên hệ giữa ngân sách 2.47s và độ sâu 6 ply"
      ]
    },
    "tags": [
      "Case Study",
      "POS-08",
      "POS-09",
      "Marathon 123 moves",
      "Depth 6",
      "Critical Move"
    ]
  },
  {
    "id": "MEM-LONG-15",
    "title": "Sự Đánh đổi giữa Tốc độ Duyệt cây (NPS) và Độ phức tạp của Hàm Evaluate",
    "question": "Trong Báo cáo mục 4.5, nhóm có nêu về sự đánh đổi giữa Tốc độ Duyệt cây và Độ phức tạp của Hàm Evaluate. Long hãy phân tích sâu hơn về quyết định đánh đổi này?",
    "category": "member",
    "topic": "trade-offs",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Đánh đổi kiến trúc",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, đây là quyết định thiết kế kiến trúc quan trọng nhất giữa em và bạn Việt: Một hàm evaluate càng thông minh, chứa càng nhiều tri thức cờ vua (như phân tích cấu trúc Tốt phức tạp, kiểm soát ô tiền đồn, các đòn ghim) thì thời gian chạy càng lâu, làm tốc độ duyệt cây (NPS) tụt giảm thê thảm. Trong môi trường Python thuần có tốc độ hạn chế, nếu hàm evaluate quá nặng, bot sẽ chỉ đạt độ sâu 2-3 ply và bị mù chiến thuật. Nhóm đã quyết định tối giản hóa hàm evaluate bằng Bitboard và bảng PeSTO đóng gói 32-bit để đạt tốc độ 100,000 evals/giây, ưu tiên tối đa cho độ sâu tìm kiếm đạt 4-5 ply trong thời gian Blitz.",
      "deepExplanation": "Bản chất của bài toán: Độ sâu tìm kiếm (Search Depth) có giá trị chiến thuật lớn hơn nhiều so với độ chính xác chi tiết của hàm đánh giá tĩnh (Lý thuyết Berliner). Một hàm evaluate đơn giản nhưng search được 5 ply sẽ luôn luôn đánh bại một hàm evaluate cực kỳ thông minh nhưng chỉ search được 2 ply! Nhờ giữ hàm evaluate tinh gọn ở mức ~10 microseconds, Searcher của em duy trì được thông lượng 25,400 NPS, đủ để nhìn thấy các đòn chiến thuật bắt quân và chiếu hết tức thời trong giải đấu.",
      "executionFlow": [
        "1. Lựa chọn 1: Thêm tri thức vị trí cờ sâu -> evaluate tốn 50 µs -> Tốc độ tụt còn 8,000 NPS -> Depth 2-3 ply (Bị mù chiến thuật)",
        "2. Lựa chọn 2 (Nhóm 12): Tối ưu Bitboard & PeSTO đóng gói -> evaluate tốn 10 µs -> Tốc độ 25,400 NPS -> Depth 4-5 ply (Chiến thuật ổn định)",
        "3. Kết quả: Tỷ lệ đi nước ngớ ngẩn (blunder) trong 48 ván chính thức là 0%."
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "430-610"
      },
      "concreteExample": "Nhóm 12 không cài đặt thuật toán kiểm tra đòn ghim phức tạp trong evaluate, nhưng nhờ đạt độ sâu 4 ply, chính thuật toán Negamax của Searcher đã tự động nhìn ra đòn ghim ở nước 13 ván gặp Nhóm 3 (POS-01).",
      "teacherFollowUps": [
        {
          "question": "Nếu chuyển toàn bộ bot sang C++ hoặc Rust thì sự đánh đổi này có thay đổi không?",
          "answer": "Dạ có, nếu dùng C++/Rust tốc độ duyệt đạt 1-2 triệu NPS, lúc đó ta hoàn toàn có thể tích hợp mạng nơ-ron NNUE (Efficiently Updatable Neural Networks) vào hàm evaluate mà vẫn duy trì được độ sâu 8-10 ply."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng hàm evaluate càng nhiều dòng code càng tốt",
        "Không hiểu lý thuyết Berliner về ưu thế của độ sâu tìm kiếm"
      ]
    },
    "tags": [
      "Trade-offs",
      "NPS",
      "Evaluate Complexity",
      "Berliner Principle",
      "Python Optimization"
    ]
  },
  {
    "id": "MEM-LONG-16",
    "title": "Minh chứng Đóng góp Cá nhân và Commit Cốt lõi của Long (Chương 6)",
    "question": "Theo Bảng 11 của báo cáo, Long đóng góp 25% công việc với commit then chốt e6c214d (+506 dòng). Em hãy tóm tắt những dòng code quan trọng nhất mà em đã trực tiếp viết trong commit đó?",
    "category": "member",
    "topic": "trade-offs",
    "memberTarget": "long",
    "memberRole": "Động cơ tìm kiếm đối kháng – Minh chứng sản phẩm",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ, trong commit e6c214d (+506 dòng mã) tại student/search.py, em đã trực tiếp hiện thực hóa toàn bộ trái tim của động cơ tìm kiếm: Lớp Searcher, vòng lặp Iterative Deepening Search với Aspiration Windows (±40 cp), thuật toán đệ quy Negamax tích hợp Principal Variation Search (PVS Zero-Window), hai hàm chuẩn hóa điểm chiếu hết score_to_tt / score_from_tt, và cơ chế bảo vệ stack toàn vẹn bằng try...finally.",
      "deepExplanation": "Bên cạnh đó, em cũng là người thiết lập hệ thống kiểm thử tự động đo đạc thông lượng duyệt cây (NPS) của bot trên máy tính cá nhân và trên môi trường thi đấu máy chủ, đảm bảo tốc độ luôn ổn định từ 20,000 đến 35,000 NPS. Em cũng phối hợp chặt chẽ với Vương để tích hợp hàm _order_moves 8 bậc vào vòng lặp Negamax, và phối hợp với Bách để nhận tín hiệu ngắt thời gian should_stop() từ TimeManager.",
      "executionFlow": [
        "Commit e6c214d bàn giao:",
        "- Toàn bộ khung sườn lớp Searcher và vòng lặp IDS",
        "- Thuật toán Negamax PVS hoàn chỉnh",
        "- Cơ chế chuẩn hóa điểm chiếu hết score_to_tt/score_from_tt",
        "- Quản lý ngăn xếp try...finally bảo đảm an toàn 100%"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher",
        "lines": "609-1780"
      },
      "concreteExample": "Trước commit e6c214d, file search.py hoàn toàn rỗng. Sau khi em đẩy commit này lên, bot đã có thể chạy hoàn chỉnh một ván cờ với độ sâu 4 ply và tự động ăn quân, chiếu hết.",
      "teacherFollowUps": [
        {
          "question": "Long có gặp khó khăn gì khi triển khai PVS không?",
          "answer": "Dạ, khó khăn lớn nhất là xử lý Re-search khi xảy ra Fail-high: phải cập nhật đúng cận alpha mới và gọi lại hàm đệ quy với cửa sổ [-beta, -score] mà không làm tràn thời gian thi đấu."
        }
      ],
      "commonMistakes": [
        "Không nhớ mã commit chính của mình (e6c214d)",
        "Không nêu được các thành phần thuật toán cụ thể đã cài đặt"
      ]
    },
    "tags": [
      "Commit Proof",
      "Table 11",
      "Git",
      "Searcher",
      "e6c214d"
    ]
  },
  {
    "id": "MEM-VIET-01",
    "title": "Bản chất Hàm evaluate và 11 Bước Lượng giá Thế cờ",
    "question": "Em là tác giả của toàn bộ evaluation.py (611 dòng), hãy trình bày tổng quan hàm evaluate() và 11 bước tính toán lượng giá thế cờ tĩnh?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – evaluation.py, PeSTO, Dynamic King Ring, Mop-Up",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, hàm evaluate(board) trong student/evaluation.py là động cơ đánh giá vị trí tĩnh độc lập, vận hành theo quy trình 11 bước khép kín: (1) Tính Game Phase (0-24). (2) Vật chất & Vị trí ô PeSTO bằng Bitboard đóng gói 32-bit. (3) Đánh giá cặp Tượng (+30 cp). (4) Cấu trúc Tốt: phạt Tốt chồng, Tốt cô lập; thưởng Tốt thông. (5) Hoạt động của Xe: thưởng Xe trên cột mở (+35 cp), cột bán mở (+15 cp) và hàng 7 (+40 cp). (6) Mã tiền đồn: thưởng Mã đứng ở trung tâm có Tốt bảo vệ (+25 cp). (7) Dynamic King Safety: tính vành đai Vua thích ứng cho Chess960. (8) Quyền nhập thành. (9) Tapered Evaluation: nội suy tuyến tính MG và EG theo phase / 24. (10) Mop-Up Heuristic: dồn Vua tàn cuộc áp đảo (phase <= 6). (11) Tempo Bonus (+9 cp) và chuẩn hóa góc nhìn theo bên đến lượt (board.turn).",
      "deepExplanation": "Hàm evaluate không đơn thuần là một phép cộng điểm quân cờ mà là một hệ thống tri thức cờ vua tổng hợp. Mọi tính toán quân cờ đều được tối ưu hóa tối đa thông qua các phép toán Bitboard 64-bit (sử dụng toán tử &, |, ~, ^ và hàm _popcount). Nhờ thiết kế tối ưu này, hàm evaluate đạt thông lượng cực kỳ ấn tượng từ 95,000 đến 100,000 lượt đánh giá mỗi giây trên nền Python thuần.",
      "executionFlow": [
        "1. Trích xuất các bitboard quân cờ: wp, wn, wb, wr, wq, wk và bp, bn, bb, br, bq, bk",
        "2. Tính phase dựa trên số quân lớn còn lại trên bàn cờ",
        "3. Tính tổng điểm PeSTO đóng gói: s = _pst_sum(...)",
        "4. Thêm điểm cặp Tượng, cấu trúc Tốt, Xe cột mở/hàng 7, Mã tiền đồn",
        "5. Thêm điểm Dynamic King Safety Ring",
        "6. Giải nén mg và eg, nội suy: score = (mg * phase + eg * (24 - phase)) // 24",
        "7. Áp dụng Mop-Up Heuristic nếu phase <= 6 và abs(score) >= 200",
        "8. Nhân với color_sign để trả về điểm theo góc nhìn của bên đến lượt"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "427-610"
      },
      "concreteExample": "Trong thế cờ khai cuộc đầy đủ quân: phase = 24, điểm số chủ yếu phụ thuộc vào bảng vị trí PeSTO MG và an toàn Vua. Khi đổi hết Hậu và Xe sang tàn cuộc: phase = 0, hàm evaluate tự động chuyển trọng số sang bảng PeSTO EG, thưởng Vua chiếm trung tâm và kích hoạt Mop-Up dồn Vua đối phương vào góc.",
      "teacherFollowUps": [
        {
          "question": "Tại sao bước cuối cùng phải nhân với color_sign?",
          "answer": "Dạ, vì hàm Negamax trong Searcher luôn tối đa hóa điểm số từ góc nhìn của bên đang đi cờ. Nếu Trắng đang đi thì color_sign = +1, nếu Đen đang đi thì color_sign = -1 để điểm số có lợi cho Đen trở thành số dương."
        },
        {
          "question": "Đơn vị đo của giá trị trả về là gì?",
          "answer": "Dạ, đơn vị đo là centipawns (cp), trong đó 100 centipawns tương đương với giá trị của 1 quân Tốt."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng evaluate chỉ cộng điểm quân cờ mà không có vị trí ô",
        "Quên nhân với color_sign dẫn tới việc bot đánh phản lưới nhà"
      ]
    },
    "tags": [
      "evaluate",
      "11 Steps",
      "PeSTO",
      "Bitboard",
      "Tapered Evaluation",
      "evaluation.py"
    ]
  },
  {
    "id": "MEM-VIET-02",
    "title": "Kỹ thuật Đóng gói Tuyến tính 32-bit _pk và Giải nén Bù hai 0x8000",
    "question": "Việt hãy giải thích chi tiết hàm _pk(mg, eg) đóng gói hai số nguyên 16-bit như thế nào và tại sao bắt buộc phải cộng bù 0x8000 khi giải nén?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – evaluation.py, PeSTO, Dynamic King Ring, Mop-Up",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, hàm `_pk(mg, eg)` đóng gói hai điểm số Trung cuộc (MG) và Tàn cuộc (EG) vào 1 số nguyên 32-bit duy nhất bằng công thức: `(mg & 0xFFFF) | (eg << 16)`. Khi cộng dồn điểm vị trí của nhiều quân cờ, ta chỉ cần 1 phép cộng số nguyên 32-bit thay vì phải cộng riêng 2 mảng. Khi giải nén, vì phần mg có thể là số âm (biểu diễn bù 2 có bit dấu cao nhất là 1), khi cộng dồn nó sẽ mượn 1 bit từ nửa trên eg! Phép toán `(s + 0x8000) >> 16` cộng bù đúng 32,768 (nửa dải 16-bit) để trung hòa bit mượn đó, sau đó `s - (eg << 16)` tách chính xác phần mg có dấu ra.",
      "deepExplanation": "Cơ chế toán học bù 2: Một số nguyên 16-bit có dấu nằm trong khoảng [-32768, 32767]. Số âm có bit 15 = 1. Khi nằm ở nửa dưới của số 32-bit, nếu mg < 0, giá trị của nó là 65536 + mg. Để phép dịch phải `>> 16` thu được đúng eg mà không bị sai lệch, ta cộng thêm 0x8000 (tức 2^15). Phép cộng này làm tròn chính xác bit dấu bị mượn, giúp phép dịch phải `>> 16` luôn trả về đúng giá trị số nguyên có dấu của eg. Sau đó lấy `mg = s - (eg << 16)` là phép toán ngược hoàn hảo.",
      "executionFlow": [
        "1. Đóng gói trước toàn bộ bảng điểm PeSTO: _build_packed_pst()",
        "2. Trong evaluate: s = _pst_sum(wp, _WP) + ... (chỉ 1 phép cộng 32-bit)",
        "3. Giải nén eg: eg = (s + 0x8000) >> 16",
        "4. Giải nén mg: mg = s - (eg << 16)",
        "5. Đảm bảo cả mg và eg đều là số nguyên có dấu chính xác 100%."
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "_pk & evaluate",
        "lines": "239-254 và 560-575"
      },
      "concreteExample": "Giả sử điểm vị trí MG = -20 cp, EG = +60 cp. Phép đóng gói: mg & 0xFFFF = 65516, eg << 16 = 3,932,160 -> s = 3,997,676. Khi giải nén: s + 0x8000 = 3,997,676 + 32,768 = 4,030,444. Dịch phải: 4,030,444 >> 16 = 61 (nếu không bù 0x8000 sẽ ra 60). Lấy mg = 3,997,676 - (61 << 16) = -20 cp. Cả hai giá trị được khôi phục chính xác tuyệt đối!",
      "teacherFollowUps": [
        {
          "question": "Nếu không đóng gói bit mà dùng tuple (mg, eg) hoặc class thì hiệu năng thế nào?",
          "answer": "Dạ, tạo đối tượng tuple hoặc class trong Python có chi phí cấp phát bộ nhớ heap rất lớn. Đóng gói bitboard 32-bit chạy trên thanh ghi số nguyên CPU, nhanh gấp hơn 3 lần so với dùng tuple."
        }
      ],
      "commonMistakes": [
        "Quên phép bù 0x8000 khiến điểm tàn cuộc EG bị lệch hoàn toàn khi MG là số âm",
        "Không giải thích được cơ chế bù 2 của máy tính"
      ]
    },
    "tags": [
      "_pk",
      "Bit-packing",
      "0x8000",
      "Two's Complement",
      "PeSTO",
      "Assembly Optimization"
    ]
  },
  {
    "id": "MEM-VIET-03",
    "title": "Mô hình PeSTO Tapered Evaluation và Nguồn gốc Giá trị Bảng PST",
    "question": "Các giá trị Piece-Square Tables (PST) trong PeSTO lấy từ đâu? Tại sao mỗi quân cờ lại có hai bảng điểm riêng cho Trung cuộc và Tàn cuộc?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – evaluation.py, PeSTO, Dynamic King Ring, Mop-Up",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, các bảng điểm PST được nhóm kế thừa từ công trình nghiên cứu PeSTO (Piece-Square Tables by Ronald Friederich), là bộ thông số chuẩn mực quốc tế được tối ưu hóa qua hàng triệu ván đấu tự động (Texel's Tuning Method). Mỗi quân cờ có 2 bảng riêng vì giá trị vị trí của quân cờ biến đổi hoàn toàn theo giai đoạn trận đấu: Tốt ở tàn cuộc càng tiến sâu điểm càng cao; Mã ở trung cuộc cần chiếm trung tâm (outpost), sang tàn cuộc giảm dần uy lực; Vua ở trung cuộc phải nấp ở góc an toàn, sang tàn cuộc phải xông ra trung tâm để làm quân tấn công.",
      "deepExplanation": "Bảng điểm PeSTO định nghĩa 64 giá trị cho 64 ô cờ của từng loại quân: (1) Tốt: MG thưởng Tốt chiếm d4/e4; EG thưởng cực mạnh Tốt tiến xuống hàng 5, 6, 7 (chuẩn bị phong cấp). (2) Mã: Thưởng đứng ở d4, d5, e4, e5; phạt nặng đứng ở biên và góc (a1, h1, a8, h8). (3) Tượng: Thưởng kiểm soát các đường chéo dài. (4) Xe: Thưởng cột mở và hàng 7. (5) Hậu: Phạt xuất Hậu sớm ở khai cuộc. (6) Vua: MG thưởng Vua ở g1/b1 sau khi nhập thành; EG thưởng Vua ở trung tâm bàn cờ.",
      "executionFlow": [
        "1. Khởi tạo mảng thô _PAWN_MG_RAW, _PAWN_EG_RAW...",
        "2. Lật ngược bảng cho quân Đen bằng hàm _orient_table (đối xứng hàng)",
        "3. Đóng gói bảng trắng và bảng đen thành PST_PACKED 32-bit",
        "4. Duyệt bitboard quân cờ và tra cứu nhanh mảng một chiều: PST_PACKED[sq]"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "_orient_table & _build_packed_pst",
        "lines": "65-225"
      },
      "concreteExample": "Bảng Vua Trung cuộc (_KING_MG_RAW) gán cho ô e1 điểm -30, ô g1 điểm +20 (thưởng nhập thành). Bảng Vua Tàn cuộc (_KING_EG_RAW) gán cho ô g1 điểm -20, nhưng gán cho ô e4 điểm +40 (thưởng Vua chiếm trung tâm tàn cuộc).",
      "teacherFollowUps": [
        {
          "question": "Hàm _orient_table(raw) thực hiện phép lật bảng thế nào?",
          "answer": "Dạ, vì bàn cờ lưu chỉ số 0-63 từ a1 đến h8, nên quân Đen ở hàng 8 có vị trí tương đương quân Trắng ở hàng 1. Hàm _orient_table lật ngược thứ tự các hàng: ô sq của Đen tương ứng với sq ^ 56 của Trắng."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng nhóm tự sáng tác các con số PST mà không nêu được nguồn gốc PeSTO",
        "Quên lật bảng đối xứng cho quân Đen"
      ]
    },
    "tags": [
      "PeSTO",
      "PST",
      "Piece-Square Tables",
      "Ronald Friederich",
      "Texel Tuning"
    ]
  },
  {
    "id": "MEM-VIET-04",
    "title": "Thuật toán Dynamic Bitwise King Safety Ring cho Chess960",
    "question": "Dynamic Bitwise King Safety Ring trong evaluation.py được cài đặt như thế nào? Tại sao nó là giải pháp đột phá cho thể thức Chess960?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – evaluation.py, PeSTO, Dynamic King Ring, Mop-Up",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, trong Chess960, Vua có thể khởi đầu ở bất kỳ ô nào từ b1 đến g1, nên không thể áp dụng các vùng an toàn cố định như cờ vua truyền thống. Em đã phát minh thuật toán Dynamic King Safety Ring: hàm `_build_king_zones()` tính toán trước 64 mặt nạ bitboard tương ứng với 64 vị trí có thể có của Vua. Mặt nạ bao gồm: Vành đai 8 ô lân cận quanh Vua (Inner Ring), vành đai mở rộng 16 ô (Outer Ring), và mặt nạ khiên Tốt che chắn phía trước mặt Vua (Pawn Shield). Khi đánh giá, hàm dùng các phép toán bitboard kiểm tra số lượng Tốt bảo vệ và số cột mở để tính điểm an toàn Vua thích ứng động.",
      "deepExplanation": "Quy trình đánh giá King Safety gồm 3 thành phần: (1) Khiên Tốt (Pawn Shield): Đếm số Tốt ta nằm trong mặt nạ shield_mask phía trước Vua: `shield = _popcount(pawns & zone.shield_mask)`. Nếu thiếu Tốt (shield < 3), bot bị trừ 25 cp cho mỗi Tốt thiếu. (2) Cột mở nguy hiểm (Open Files): Nếu cột trước mặt Vua hoặc cột bên cạnh không có Tốt nào của ta che chắn, bot bị phạt thêm 40 cp cho mỗi cột mở. (3) Bật tắt theo pha: Điểm King Safety chỉ được tính khi `phase >= KS_MIN_PHASE (10)` (trung cuộc). Khi bước sang tàn cuộc sâu, hàm tự động tắt để Vua tự do di chuyển.",
      "executionFlow": [
        "1. Khởi tạo trước bảng KING_ZONES cho toàn bộ 64 ô cờ",
        "2. Trong evaluate: wk = board.king(WHITE); bk = board.king(BLACK)",
        "3. Tra cứu vùng an toàn: zone_w = KING_ZONES[wk]",
        "4. Tính khiên tốt: shield_w = _popcount(wp & zone_w.shield_mask)",
        "5. Kiểm tra cột mở: open_files_w = zone_w.files & ~_spread_files(wp)",
        "6. Điểm an toàn: ks_white = (shield_w - 3) * 25 - _popcount(open_files_w) * 40",
        "7. Lấy ks_white - ks_black cộng vào điểm đánh giá trung cuộc."
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "_build_king_zones & evaluate",
        "lines": "321-360 và 520-555"
      },
      "concreteExample": "Trong thế FRC #152 (Ván #155), Vua Trắng khởi đầu ở b1. Mặt nạ khiên Tốt tự động xác định các ô a2, b2, c2 là các ô bảo vệ. Khi Tốt b2 dâng lên, bot lập tức nhận diện cột b bị mở nửa và trừ 40 cp an toàn Vua, thôi thúc bot tìm cách nhập thành hoặc đưa quân nhẹ về che chắn.",
      "teacherFollowUps": [
        {
          "question": "Hàm _spread_files(bb) hoạt động như thế nào?",
          "answer": "Dạ, hàm _spread_files nhận vào bitboard các quân Tốt và lan truyền theo chiều dọc để tạo ra mặt nạ toàn bộ các cột có Tốt xuất hiện, giúp kiểm tra cột mở trong 1 phép toán bitwise."
        }
      ],
      "commonMistakes": [
        "Áp dụng bảng khiên Tốt f2, g2, h2 của cờ thường vào Chess960",
        "Tính an toàn Vua ở tàn cuộc khiến Vua không dám xông ra trung tâm"
      ]
    },
    "tags": [
      "Dynamic King Ring",
      "King Safety",
      "Chess960",
      "Bitboard",
      "Pawn Shield",
      "Open Files"
    ]
  },
  {
    "id": "MEM-VIET-05",
    "title": "Mop-Up Heuristic: Dồn Vua Đối phương vào Góc trong Tàn cuộc Áp đảo",
    "question": "Mop-Up Heuristic trong evaluate() được kích hoạt khi nào? Công thức toán học và tác dụng dứt điểm ván cờ ra sao?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – evaluation.py, PeSTO, Dynamic King Ring, Mop-Up",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, Mop-Up Heuristic là tri thức chuyên gia nhằm giải quyết bài toán dứt điểm trong tàn cuộc áp đảo (ví dụ Vua + Xe/Hậu chống Vua đơn độc). Khi bên hơn quân không biết cách dồn Vua đối phương vào góc, thuật toán tìm kiếm thường đi loanh quanh và bị dính luật hòa 50 nước. Hàm Mop-Up chỉ kích hoạt khi thỏa mãn 2 điều kiện: phase <= 6 (tàn cuộc sâu) và abs(score) >= 200 cp (đã chắc chắn hơn quân). Công thức thưởng điểm: dồn Vua đối phương ra xa tâm bàn cờ và kéo Vua ta áp sát Vua đối phương để tạo thành thế chiếu hết.",
      "deepExplanation": "Công thức toán học cụ thể: (1) Khoảng cách Vua đối phương đến tâm bàn cờ: `cmd = max(3 - rank, rank - 4) + max(3 - file, file - 4)`. Giá trị cmd lớn nhất ở 4 góc bàn cờ (cmd = 6) và nhỏ nhất ở 4 ô trung tâm (cmd = 0). (2) Khoảng cách Manhattan giữa hai Vua: `md = abs(w_rank - b_rank) + abs(w_file - b_file)`. (3) Điểm thưởng dồn Vua: `mopup = int(4.7 * cmd + 1.6 * (14 - md))`. Hệ số 4.7 ưu tiên đẩy Vua địch ra mép/góc, hệ số 1.6 thôi thúc Vua ta tiến lại gần để che chắn ô thoát.",
      "executionFlow": [
        "1. if phase <= 6 and abs(score) >= 200:",
        "   - if score > 0: (Trắng thắng thế, dồn Vua Đen)",
        "       - cmd = center_dist(bk); md = manhattan_dist(wk, bk)",
        "       - score += int(4.7 * cmd + 1.6 * (14 - md))",
        "   - elif score < 0: (Đen thắng thế, dồn Vua Trắng)",
        "       - cmd = center_dist(wk); md = manhattan_dist(wk, bk)",
        "       - score -= int(4.7 * cmd + 1.6 * (14 - md))"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "580-605"
      },
      "concreteExample": "Trong ván marathon 123 nước (POS-09), Đen hơn Hậu nhưng Vua Trắng chạy vòng quanh. Nhờ Mop-Up Heuristic liên tục thưởng điểm khi Vua Trắng bị ép về c1 (cmd = 5) và Vua Đen tiến sát vào d3 (md = 3), bot đã dồn thành công Vua Trắng vào góc chết để Hậu tung đòn chiếu hết Qh1#.",
      "teacherFollowUps": [
        {
          "question": "Tại sao không bật Mop-Up Heuristic ngay từ khai cuộc hoặc trung cuộc?",
          "answer": "Dạ, vì ở trung cuộc khi bàn cờ còn nhiều quân lớn, việc xua Vua ta xông lên trung tâm hoặc cố dồn Vua đối thủ khi chưa dọn sạch quân phòng thủ sẽ khiến Vua ta bị chiếu chết ngược ngay lập tức!"
        }
      ],
      "commonMistakes": [
        "Bật Mop-Up khi thế cờ cân bằng (abs(score) < 200)",
        "Nghĩ rằng Mop-Up chỉ áp dụng cho quân Hậu"
      ]
    },
    "tags": [
      "Mop-Up Heuristic",
      "Endgame",
      "Center Distance",
      "Manhattan Distance",
      "Checkmate Assist"
    ]
  },
  {
    "id": "MEM-VIET-06",
    "title": "Đánh giá Cấu trúc Tốt: Tốt Thông, Tốt Chồng và Tốt Cô lập",
    "question": "Hàm evaluate() đánh giá cấu trúc Tốt (Pawn Structure) bằng Bitboard như thế nào? Các giá trị thưởng phạt cụ thể là gì?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – evaluation.py, PeSTO, Dynamic King Ring, Mop-Up",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, cấu trúc Tốt được lượng giá hoàn toàn bằng các phép toán Bitboard 64-bit siêu nhanh: (1) Tốt cô lập (Isolated Pawns): là Tốt mà trên hai cột liền kề không có bất kỳ Tốt nào của ta che chở, bị phạt -15 cp ở trung cuộc và -20 cp ở tàn cuộc. (2) Tốt chồng (Doubled Pawns): là có từ 2 Tốt của ta trở lên nằm trên cùng một cột, cản trở đường tiến của nhau, bị phạt -15 cp. (3) Tốt thông (Passed Pawns): là Tốt mà phía trước và trên hai cột bên cạnh không còn Tốt đối phương ngăn cản, được thưởng điểm tăng vọt theo từng hàng ngang từ +10 cp ở hàng 3 lên tới +200 cp ở hàng 7 trong tàn cuộc!",
      "deepExplanation": "Thuật toán Bitboard: (1) Kiểm tra Tốt chồng: Lấy bitboard các cột có Tốt `files_w`. Nếu số lượng Tốt `_popcount(wp)` lớn hơn số lượng cột `_popcount(files_w)`, số Tốt dư ra chính là số Tốt chồng: `doubled = _popcount(wp) - _popcount(files_w)`. (2) Kiểm tra Tốt thông: Dùng hàm `_north_fill(bp)` để tạo mặt nạ toàn bộ các ô phía trước của Tốt đối phương. Nếu ô của Tốt ta đẩy lên không giao cắt với mặt nạ Tốt đối phương thì đó là Tốt thông.",
      "executionFlow": [
        "1. files_w = _spread_files(wp); files_b = _spread_files(bp)",
        "2. Tốt chồng: doubled_w = _popcount(wp) - _popcount(files_w); score -= doubled_w * 15",
        "3. Tốt cô lập: if (file_mask & adjacent_files) == 0: score -= 15",
        "4. Tốt thông: kiểm tra không có Tốt đối thủ chặn phía trước -> thưởng PASSED_PAWN_BONUS[rank]"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "460-500"
      },
      "concreteExample": "Một Tốt thông Trắng tiến lên hàng 7 ở tàn cuộc (PASSED_PAWN_BONUS_EG[6] = +120 cp) được cộng thêm điểm vật chất Tốt, khiến giá trị của nó tương đương một quân Tượng. Điều này thúc đẩy bot ưu tiên đẩy Tốt xuống phong cấp.",
      "teacherFollowUps": [
        {
          "question": "Tại sao Tốt thông ở tàn cuộc (EG) lại được thưởng cao hơn trung cuộc (MG)?",
          "answer": "Dạ, vì ở tàn cuộc khi quân cờ lớn đã ít đi, khả năng ngăn cản Tốt phong cấp là rất thấp. Một quân Tốt thông ở tàn cuộc quyết định 90% cơ hội thắng ván cờ."
        }
      ],
      "commonMistakes": [
        "Dùng vòng lặp kiểm tra từng ô cờ thay vì dùng bitboard bitwise",
        "Phạt Tốt thông như Tốt đơn lẻ"
      ]
    },
    "tags": [
      "Pawn Structure",
      "Passed Pawn",
      "Doubled Pawn",
      "Isolated Pawn",
      "Bitboard"
    ]
  },
  {
    "id": "MEM-VIET-07",
    "title": "Đánh giá Hoạt động của Xe và Cặp Tượng",
    "question": "Tại sao hàm evaluate lại thưởng điểm cho Cặp Tượng (Bishop Pair), Xe trên cột mở và Xe ở hàng ngang số 7?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – evaluation.py, PeSTO, Dynamic King Ring, Mop-Up",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ, đây là 3 tri thức vị trí cờ vua quan trọng được cài đặt: (1) Cặp Tượng (+30 cp): Một quân Tượng chỉ kiểm soát được 32 ô cùng màu, nhưng khi sở hữu cả 2 Tượng khác màu ô, chúng bổ trợ hoàn hảo kiểm soát toàn bộ 64 ô cờ, đặc biệt uy lực khi bàn cờ mở. (2) Xe trên cột mở (+35 cp) và cột bán mở (+15 cp): Xe có tầm hoạt động dọc, khi cột không có Tốt cản, Xe bắn thẳng vào trận địa đối phương. (3) Xe ở hàng 7 (+40 cp): Hàng 7 (hoặc hàng 2 đối với Đen) là nơi tập trung các Tốt chưa di chuyển của đối thủ và giam cầm Vua đối phương ở hàng đáy.",
      "deepExplanation": "Cài đặt Bitboard siêu tốc: (1) Cặp Tượng: `if _popcount(wb) >= 2: score += 30`. (2) Xe cột mở: `open_files = ~_spread_files(board.pawns)`. Lấy bitboard Xe `wr & open_files`, đếm số lượng nhân với 35 cp. (3) Xe hàng 7: `rank7 = chess.BB_RANK_7`. Lấy `_popcount(wr & rank7) * 40`. Toàn bộ các kiểm tra này chỉ tốn vài nano-giây trên CPU.",
      "executionFlow": [
        "1. Bishop Pair: if _popcount(wb) >= 2: s += 30; if _popcount(bb) >= 2: s -= 30",
        "2. Rooks on Open Files: r_open = wr & ~all_pawn_files -> s += _popcount(r_open) * 35",
        "3. Rooks on 7th Rank: r_7 = wr & BB_RANK_7 -> s += _popcount(r_7) * 40"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "450-515"
      },
      "concreteExample": "Ở trận thắng Nhóm 13 (POS-04), Xe Trắng kiểm soát hàng 7 (Re7) kết hợp cặp Tượng kiểm soát đường chéo, khóa chặt Vua Đen ở hàng 8 và dọn đường cho đòn chiếu hết 37. Re8#.",
      "teacherFollowUps": [
        {
          "question": "Nếu bên ta có 2 Xe trên cùng hàng 7 thì sao?",
          "answer": "Dạ, hai Xe nhân đôi trên hàng 7 (Blind Swine) là đòn tấn công hủy diệt trong cờ vua, bot sẽ được cộng tới 80 cp, đủ thúc đẩy bot tìm kiếm đòn chiếu hết."
        }
      ],
      "commonMistakes": [
        "Thưởng điểm cặp Tượng ngay cả khi 2 Tượng đi cùng màu ô (do phong cấp)",
        "Không kiểm tra đúng hàng 7 cho Trắng và hàng 2 cho Đen"
      ]
    },
    "tags": [
      "Bishop Pair",
      "Open File",
      "Rank 7",
      "Rook Activity",
      "Piece Mobility"
    ]
  },
  {
    "id": "MEM-VIET-08",
    "title": "Mã Tiền đồn (Knight Outpost) và Tempo Bonus",
    "question": "Thế nào là Mã tiền đồn (Knight Outpost) và tại sao hàm evaluate lại cộng Tempo Bonus (+9 cp) cho bên đi trước?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – evaluation.py, PeSTO, Dynamic King Ring, Mop-Up",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ, (1) Mã tiền đồn (Knight Outpost) là quân Mã tiến sâu vào đất địch ở các hàng 4, 5, 6 (hoặc hàng 3, 4, 5 đối với Đen) và ĐƯỢC TỐT TA BẢO VỆ, đồng thời Tốt đối phương không thể đuổi được. Một Mã tiền đồn kiểm soát toàn bộ các ô xung quanh và là bàn đạp tấn công cực mạnh, được thưởng +25 cp. (2) Tempo Bonus (+9 cp) phản ánh lợi thế 'được quyền đi trước' trong cờ vua: Bên đến lượt đi luôn có quyền chủ động tạo ra mối đe dọa, giá trị 9 centipawns là hệ số chuẩn hóa quốc tế giúp bot duy trì thế chủ động.",
      "deepExplanation": "Cài đặt Bitboard cho Mã tiền đồn: (1) Kiểm tra hàng tiền đồn: `outpost_ranks = BB_RANK_4 | BB_RANK_5 | BB_RANK_6`. (2) Kiểm tra có Tốt ta bảo vệ: Dùng mặt nạ các ô tấn công của Tốt ta `w_pawn_attacks`. Lấy bitboard Mã giao với cả 2 mặt nạ: `wn & outpost_ranks & w_pawn_attacks`. Mỗi quân Mã thỏa mãn được cộng 25 cp. Về Tempo Bonus: ở dòng cuối cùng trước khi trả về, `score += TEMPO_BONUS (9)` được cộng trực tiếp vào bên có lượt đi.",
      "executionFlow": [
        "1. Knight Outposts: wn_outpost = wn & OUTPOST_RANKS & pawn_attacks -> s += _popcount(wn_outpost) * 25",
        "2. Cuối hàm evaluate: score += TEMPO_BONUS (9 cp)",
        "3. return score * color_sign"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "505-520 và 605-610"
      },
      "concreteExample": "Một quân Mã Trắng cắm ở d5 được Tốt e4 bảo vệ, Đen không còn Tốt c hoặc e để đuổi. Quân Mã này làm tê liệt hoàn toàn khả năng di chuyển của Hậu và Xe Đen, xứng đáng nhận trọn vẹn điểm thưởng tiền đồn.",
      "teacherFollowUps": [
        {
          "question": "Tại sao Tempo Bonus chỉ là 9 cp mà không phải 50 cp?",
          "answer": "Dạ, vì lợi thế đi trước trong cờ vua chỉ là lợi thế nhỏ tương đương 0.1 Tốt. Nếu đặt quá cao (như 50 cp), bot sẽ đánh giá quá lạc quan thế cờ của mình và từ chối các phương án đổi quân hòa cờ an toàn."
        }
      ],
      "commonMistakes": [
        "Thưởng điểm Mã ở hàng 5 nhưng không kiểm tra xem có Tốt bảo vệ hay không",
        "Cộng Tempo Bonus nhầm bên đối phương"
      ]
    },
    "tags": [
      "Knight Outpost",
      "Tempo Bonus",
      "TEMPO_BONUS",
      "Bitboard Attacks",
      "Initiative"
    ]
  },
  {
    "id": "MEM-VIET-09",
    "title": "Hiểu biết về PVS và Negamax Search (Hỏi chéo Long)",
    "question": "Việt không trực tiếp viết search.py, em hãy giải thích cơ chế tìm kiếm Zero-Window trong PVS của Long hoạt động như thế nào?",
    "category": "member",
    "topic": "search",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em nắm rất rõ thuật toán tìm kiếm của bạn Long: PVS giả định nước đi đầu tiên (được Move Ordering xếp lên đầu) là nước tốt nhất, nên duyệt với cửa sổ đầy đủ [alpha, beta]. Toàn bộ các nước phụ còn lại chỉ cần kiểm tra xem có vượt qua alpha hay không bằng Cửa sổ Không (Zero-Window) cực hẹp: `[-alpha - 1, -alpha]`. Vì khoảng cách giữa hai cận chỉ là 1 centipawn, hàm Negamax con sẽ bị cắt tỉa cực nhanh. Nếu nước phụ đó không vượt qua alpha (score <= alpha), ta loại bỏ nó ngay lập tức mà không tốn công tính toán.",
      "deepExplanation": "Chỉ khi xảy ra ngoại lệ Fail-high (alpha < score < beta), nghĩa là nước đi phụ này bất ngờ tốt hơn cả nước PV Move ban đầu, lúc đó ta mới phải thực hiện Re-search lại với cửa sổ đầy đủ [-beta, -score]. Nhờ Move Ordering 8 bậc của Vương đưa nước tốt nhất lên đầu trong > 85% trường hợp, PVS giúp Searcher của nhóm giảm từ 25% đến 40% số node phải duyệt so với Alpha-Beta thông thường.",
      "executionFlow": [
        "1. Nước đầu tiên: score = -_negamax(board, depth - 1, -beta, -alpha, ply + 1)",
        "2. Nước thứ 2 trở đi: score = -_negamax(board, depth - 1, -alpha - 1, -alpha, ply + 1) (Zero-Window)",
        "3. Nếu alpha < score < beta: score = -_negamax(board, depth - 1, -beta, -score, ply + 1) (Re-search)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1480-1530"
      },
      "concreteExample": "Tại một node có 30 nước đi hợp lệ, PVS duyệt nước đầu tiên với [-INF, +INF] được 100 cp. 29 nước còn lại đều duyệt với [-101, -100]. Hầu hết 29 nước này bị cắt tỉa chỉ sau 1-2 ply, giúp bot đạt độ sâu 4-5 ply trong thời gian 1.1s.",
      "teacherFollowUps": [
        {
          "question": "Hàm evaluate của em cung cấp thông tin gì cho PVS?",
          "answer": "Dạ, hàm evaluate của em cung cấp điểm tĩnh static_eval tại các nút lá để Negamax so sánh trực tiếp với alpha/beta và thực hiện các kỹ thuật cắt tỉa RFP, NMP, Futility Pruning."
        }
      ],
      "commonMistakes": [
        "Không nhớ công thức Zero-Window [-alpha-1, -alpha]",
        "Nghĩ rằng PVS bỏ qua không duyệt các nước phụ"
      ]
    },
    "tags": [
      "Cross-Examination",
      "PVS",
      "Zero-Window",
      "Negamax",
      "Searcher"
    ]
  },
  {
    "id": "MEM-VIET-10",
    "title": "Hiểu biết về TimeManager và Độ trễ Sàn (Hỏi chéo Bách)",
    "question": "Việt hãy giải thích tại sao TimeManager của Bách lại giới hạn thời gian trung cuộc ở mức 150-220 ms mà không cho bot nghĩ lâu hơn?",
    "category": "member",
    "topic": "time-management",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, nhóm em đã phân tích rất kỹ quy chế máy chủ thi đấu ChessLab: Máy chủ luôn thêm một độ trễ sàn ngẫu nhiên d trong khoảng [500, 1000] ms cho mỗi nước đi. Bằng việc giới hạn ngân sách tính toán trong khoảng 150-220 ms, toàn bộ thời gian xử lý của bot sẽ được 'hấp thụ' hoàn toàn vào độ trễ 500 ms tối thiểu của máy chủ! Nhờ đó, bot trả lời cực nhanh mà đồng hồ thi đấu thực tế hầu như không bị trừ, giúp Nhóm 12 bảo toàn 48.2 giây dự trữ (cao nhất giải) và ép đối thủ hết giờ trong 3 ván đấu.",
      "deepExplanation": "Nếu ta cho bot nghĩ lâu hơn (ví dụ 1.5 - 2.0 giây mỗi nước): Thời gian đó cộng thêm 500-1000 ms trễ máy chủ sẽ khiến mỗi nước đi tiêu tốn 2.5 - 3.0 giây trên đồng hồ. Trong thể thức cờ chớp 60 giây không gia số, chỉ sau 20-25 nước là bot sẽ sạch nhẵn thời gian và bị xử thua timeout ngay ở trung cuộc! Quyết định 150-220 ms là chiến lược công nghệ xuất sắc của nhóm để sinh tồn và chiến thắng trong môi trường cờ chớp có độ trễ IPC.",
      "executionFlow": [
        "1. Máy chủ delay: 500 - 1000 ms",
        "2. Bot tính toán: 150 - 220 ms",
        "3. Thời gian bot chạy nằm trọn trong 500 ms sàn",
        "4. Đồng hồ thi đấu không bị hao hụt, bảo toàn 100% ván đấu không timeout"
      ],
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "compute_budget_ms",
        "lines": "37-95"
      },
      "concreteExample": "Ở trận thắng Nhóm 11 (POS-07), đối thủ dùng hết giờ chỉ còn 395 ms. Bot Nhóm 12 đi nước chiếu Re2+ sau đúng 501 ms. Đối thủ không đủ 500 ms sàn của server nên rụng kim thua ngay lập tức.",
      "teacherFollowUps": [
        {
          "question": "Hàm evaluate của Việt có tốc độ bao nhiêu để đáp ứng ngân sách 150-220 ms này?",
          "answer": "Dạ, hàm evaluate của em đạt tốc độ 100,000 evals/giây (khoảng 10 microseconds/eval). Trong 150 ms, Searcher kịp thực hiện khoảng 10,000 phép đánh giá, đạt độ sâu 4-5 ply hoàn hảo."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng nghĩ càng lâu càng tốt mà quên mất luật cờ chớp không gia số",
        "Không biết về cơ chế trễ sàn 500ms của Host"
      ]
    },
    "tags": [
      "Cross-Examination",
      "Time Management",
      "Delay Absorption",
      "Blitz Strategy",
      "150-220ms"
    ]
  },
  {
    "id": "MEM-VIET-11",
    "title": "Hiểu biết về Late Move Reductions (LMR) (Hỏi chéo Vương)",
    "question": "Việt hãy giải thích thuật toán Late Move Reductions (LMR) của Vương hoạt động như thế nào trong search.py?",
    "category": "member",
    "topic": "search",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, LMR (Giảm độ sâu nước đi muộn) dựa trên nguyên lý: nhờ Move Ordering tốt, các nước đi thực sự mạnh đã được đưa lên top đầu danh sách. Các nước đi nằm ở cuối danh sách (từ nước thứ 4 trở đi, index >= 4) có xác suất rất cao là các nước đi tầm thường hoặc kém. Do đó, nếu thỏa mãn điều kiện: độ sâu depth >= 3, nước đi là quiet move (không ăn quân, không phong cấp) và không bị chiếu, thuật toán sẽ giảm độ sâu tìm kiếm 1 ply (duyệt với depth - 2 thay vì depth - 1). Nếu nước đó bất ngờ đạt điểm cao hơn alpha (Fail-high), bot sẽ ngay lập tức Re-search lại với độ sâu đầy đủ.",
      "deepExplanation": "Cơ chế bảo vệ Re-search là chìa khóa bảo đảm tính đúng đắn của LMR: Ta không vứt bỏ nước đi như các kỹ thuật cắt tỉa thô bạo (Pruning), mà chỉ duyệt nông hơn để tiết kiệm thời gian. Trong 90% trường hợp, nước muộn sẽ bị loại bỏ với chi phí tính toán cực nhỏ. Nếu nó gây ra Fail-high, việc Re-search với depth - 1 đầy đủ sẽ khôi phục lại giá trị thực tế của nó, bảo đảm không bao giờ bỏ sót đòn chiến thuật bất ngờ.",
      "executionFlow": [
        "1. Điều kiện: if index >= 4 and depth >= 3 and not in_check and not is_capture and not is_promo:",
        "2. Duyệt với độ sâu giảm: score = -_negamax(board, depth - 2, -alpha - 1, -alpha, ply + 1)",
        "3. Kiểm tra Fail-high: if score > alpha:",
        "   - Re-search lại với độ sâu chuẩn: score = -_negamax(board, depth - 1, -beta, -alpha, ply + 1)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1440-1475"
      },
      "concreteExample": "Tại một node có 35 nước đi hợp lệ, 3 nước đầu được search đầy đủ. 32 nước sau được search với depth giảm 1 ply. Số lượng node phải duyệt giảm tới hơn 50%, giúp bot mở rộng độ sâu cây tìm kiếm thêm 1 ply.",
      "teacherFollowUps": [
        {
          "question": "Tại sao không áp dụng LMR cho nước ăn quân (captures)?",
          "answer": "Dạ, vì các nước ăn quân luôn tiềm ẩn đòn chiến thuật thay đổi tương quan vật chất lớn, nếu giảm độ sâu sẽ bị Horizon Effect làm mù chiến thuật."
        }
      ],
      "commonMistakes": [
        "Giảm độ sâu cho cả các nước ăn quân hoặc chiếu Vua",
        "Quên bước Re-search khi có Fail-high"
      ]
    },
    "tags": [
      "Cross-Examination",
      "LMR",
      "Late Move Reductions",
      "Re-search",
      "Search Depth"
    ]
  },
  {
    "id": "MEM-VIET-12",
    "title": "Hiểu biết về Kiến trúc Phòng thủ 3 Tầng trong bot.py (Hỏi chéo Bách)",
    "question": "Việt hãy mô tả lại Kiến trúc Phòng thủ 3 Tầng trong bot.py mà không nhìn code?",
    "category": "member",
    "topic": "architecture",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em hoàn toàn có thể trình bày rành mạch 3 tầng phòng thủ trong bot.py của Bách: Tầng 1 là Kiểm tra biên & 0ms Fast-Path: trích xuất legal_moves, nếu len == 0 trả về Move.null(), nếu len == 1 (nước bắt buộc) trả về ngay trong 0 ms để tiết kiệm 100% thời gian. Tầng 2 là Sandbox bọc lót ngoại lệ: gọi searcher.search() trong khối try...except, nếu xảy ra bất kỳ lỗi runtime nào lập tức gán fallback = legal[0]. Tầng 3 là Hậu kiểm tính hợp lệ: kiểm tra lần cuối if move not in board.legal_moves thì ép về legal[0] trước khi gửi cho Host.",
      "deepExplanation": "Cả 3 tầng này tạo nên một vòng bảo hiểm khép kín, giải thích tại sao trong toàn bộ 48 ván đấu chính thức của Nhóm 12, bot không dính bất kỳ một lỗi sập chương trình, không bị phạm quy và không bị xử thua kỹ thuật nào. Đây là yếu tố cốt lõi giúp Nhóm 12 có độ tin cậy thi đấu đạt 100% tuyệt đối.",
      "executionFlow": [
        "Tầng 1: len(legal)==0 -> Move.null(); len(legal)==1 -> legal[0] (0 ms)",
        "Tầng 2: try: move = searcher.search() except: move = legal[0]",
        "Tầng 3: if move not in board.legal_moves: move = legal[0] -> return move"
      ],
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "choose_move",
        "lines": "45-97"
      },
      "concreteExample": "Khi bị đối thủ chiếu đôi bắt buộc phải né Vua vào ô duy nhất: Tầng 1 trả về ngay ô né trong 0 ms, bảo toàn nguyên vẹn 1.5 giây cho nước đi phản công kế tiếp.",
      "teacherFollowUps": [
        {
          "question": "Hàm evaluate của Việt có bao giờ bị văng ngoại lệ làm kích hoạt Tầng 2 không?",
          "answer": "Dạ, em đã kiểm tra kỹ: nếu wk is None hoặc bk is None (bàn cờ thiếu Vua), hàm evaluate trả về 0 ngay lập tức, không bao giờ văng lỗi."
        }
      ],
      "commonMistakes": [
        "Quên tầng 1 hoặc tầng 3",
        "Không nêu được lý do tại sao len==1 lại trả về 0ms"
      ]
    },
    "tags": [
      "Cross-Examination",
      "3-Tier Defense",
      "bot.py",
      "choose_move",
      "System Reliability"
    ]
  },
  {
    "id": "MEM-VIET-13",
    "title": "Phân tích Tình huống Đổi Hậu Hòa cờ Đáng tiếc POS-06",
    "question": "Trong ván 122 trận gặp Nhóm 9 (POS-06), tại sao bot lại đi 122. Qxd5+ đổi Hậu lấy Xe dẫn đến hòa cờ hai Vua trơ trọi, dù đối thủ chỉ còn 2.48 giây? Hàm evaluate có trách nhiệm gì?",
    "category": "member",
    "topic": "experiment",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – Phân tích thực nghiệm và phản biện",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, đây là một bài học đắt giá mà em đã tự kiểm điểm trong báo cáo: Ở nước 122 tàn cuộc marathon, Trắng có Hậu, Đen có Xe. Nước 122. Qxd5+ ăn Xe Đen là nước triệt tiêu toàn bộ quân của đối thủ, đưa điểm thế cờ về 0 (hai Vua trơ trọi = hòa theo luật FIDE). Hàm evaluate của em được thiết kế thuần túy theo lý thuyết thế cờ tĩnh, không có module nhận biết đồng hồ đối thủ! Vì vậy hàm evaluate đánh giá hòa cờ 0 cp là an toàn, trong khi thực tế nếu giữ Hậu (đi Qe7+), đối thủ chỉ còn 2.48 giây trong cờ chớp chắc chắn sẽ rụng kim thua cuộc sau 2 nước nữa.",
      "deepExplanation": "Bản chất kỹ thuật: Hàm evaluate không nhận tham số SearchContext (không biết thời gian còn lại của hai bên) để giữ tính thuần khiết và tốc độ cao. Do đó, bot thi đấu như một cỗ máy thuần toán học, chấp nhận hòa cờ 2 Vua trơ trọi. Nếu được cải tiến, em sẽ bổ sung một cờ hiệu từ TimeManager truyền xuống: khi đối thủ còn dưới 3 giây, hàm evaluate sẽ phạt nặng các nước đổi hết quân dẫn tới hòa kỹ thuật, ưu tiên duy trì quân trên bàn để ép đối thủ cạn giờ.",
      "executionFlow": [
        "1. Trắng có Hậu, Đen có Xe d5. Đối thủ Nhóm 9 còn 2.48s đồng hồ.",
        "2. Nước 122. Qxd5+ ăn Xe d5 -> Vua Đen ăn lại Hậu d5 -> Còn 2 Vua trơ trọi.",
        "3. evaluate đánh giá 0 cp (hòa lý thuyết), bot chọn nước này.",
        "4. Ván đấu kết thúc hòa, Nhóm 12 đánh rơi 2 điểm quý giá (chỉ được 1 điểm thay vì 3 điểm)."
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "430-445"
      },
      "concreteExample": "Bảng 10 ghi nhận POS-06 là một trong hai tình huống đáng tiếc nhất của nhóm, là minh chứng rõ ràng cho thấy một hàm đánh giá cờ thuần túy có thể bỏ lỡ chiến thắng tâm lý đồng hồ trong thực chiến.",
      "teacherFollowUps": [
        {
          "question": "Hòa cờ 2 Vua trơ trọi trong python-chess được phát hiện qua hàm nào?",
          "answer": "Dạ, qua hàm board.is_insufficient_material(), khi bàn cờ chỉ còn 2 Vua thì ván đấu tự động kết thúc hòa theo luật FIDE."
        }
      ],
      "commonMistakes": [
        "Tưởng rằng bot bị lỗi code sập chương trình",
        "Không thấy được nguyên nhân do thiếu Heuristic nhận biết đồng hồ"
      ]
    },
    "tags": [
      "Case Study",
      "POS-06",
      "Clock-Aware",
      "Insufficient Material",
      "Bare Kings Draw"
    ]
  },
  {
    "id": "MEM-VIET-14",
    "title": "Phân tích Tình huống Chiếu hết Đường chéo POS-02 trước Nhóm 3",
    "question": "Trong trận thắng kỷ lục 98.20% độ chính xác trước Nhóm 3 (POS-02), hàm evaluate đã định hướng thế cờ để dẫn tới nước chiếu hết 24... Be3# như thế nào?",
    "category": "member",
    "topic": "experiment",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – Phân tích thực nghiệm và phản biện",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, ở ván đấu #63 gặp Nhóm 3, hàm evaluate đã định hướng thế cờ tấn công thông qua 3 thành phần: (1) Dynamic King Safety nhận diện Vua Trắng ở e1 bị mở toang cột e (sau sai lầm 13. Bxe7) và không có khiên Tốt bảo vệ, liên tục phạt điểm thế cờ của Trắng (-588 cp). (2) Thưởng Xe chiếm cột mở (+35 cp) đưa Xe d8 và f8 vào vị trí kiểm soát trung tâm. (3) Điểm thưởng Tượng kiểm soát đường chéo mở. Nhờ những định hướng vị trí này, Searcher dễ dàng tìm thấy đòn phối hợp kết liễu 24... Be3# chiếu hết đường chéo hoàn hảo.",
      "deepExplanation": "Sự kết hợp giữa hàm evaluate và Searcher thể hiện sự ăn ý tuyệt vời: evaluate không cần tính được chiếu hết từ nước 13, nhưng nó đã thưởng điểm cho các yếu tố thế trận đúng đắn (cột mở, an toàn Vua, đường chéo Tượng). Nhờ thế trận áp đảo tích lũy dần qua từng nước đi, tại nước 24, khoảng cách chiếu hết co lại trong tầm nhìn 2 ply, và Negamax lập tức tìm ra nước chiếu hết với độ chính xác tuyệt đối 98.20%.",
      "executionFlow": [
        "1. Nước 13... Rfe8: evaluate thưởng Xe chiếm cột e mở và phạt Vua Trắng không có Tốt che.",
        "2. Nước 18-22: Hậu Đen chiếm f2, Xe ghim cột d.",
        "3. Nước 24... Be3#: Negamax trả về điểm MATE_SCORE kết thúc ván đấu."
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "520-560"
      },
      "concreteExample": "Hình 18 trong báo cáo minh họa rõ thế cờ POS-02: Vua Trắng bị kẹp cứng ở d1, Xe Đen chặn cột d, Hậu Đen chặn d2/e1, và Tượng Đen ở e3 tung đòn kết liễu không thể cản phá.",
      "teacherFollowUps": [
        {
          "question": "Tại sao độ chính xác ván này lại đạt tới 98.20% Stockfish accuracy?",
          "answer": "Dạ, vì từ nước 13 đến nước 24, toàn bộ 11 nước đi liên tiếp của Nhóm 12 đều trùng khớp 100% với nước đi số 1 của engine Stockfish hàng đầu thế giới."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng evaluate tự tính ra nước chiếu hết từ nước 13",
        "Không giải thích được sự phối hợp giữa đánh giá tĩnh và tìm kiếm động"
      ]
    },
    "tags": [
      "Case Study",
      "POS-02",
      "98.20% Accuracy",
      "Checkmate",
      "Diagonal Checkmate"
    ]
  },
  {
    "id": "MEM-VIET-15",
    "title": "Hạn chế của Hàm evaluate Hiện tại và Hướng Nâng cấp trong Tương lai",
    "question": "Những hạn chế lớn nhất của hàm evaluate() trong mã nguồn hiện tại là gì? Nếu có thêm 1 tháng, Việt sẽ nâng cấp những gì?",
    "category": "member",
    "topic": "trade-offs",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – Hạn chế và hướng phát triển",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, báo cáo tại mục 6.3 đã chỉ rõ 3 hạn chế lớn nhất của hàm evaluate hiện tại: (1) Thiếu bảng mã hóa đòn ghim chuyên biệt (Pin Detection): Hàm evaluate chưa thể phân biệt một quân Tốt bị ghim tuyệt đối vào Vua với một quân Tốt tự do, dẫn tới việc đánh giá sai tính cơ động trong một số thế cờ tàn cuộc. (2) Chưa nhận thức đồng hồ đối thủ (Clock-blind): Dẫn tới tình huống hòa cờ đáng tiếc ở nước 122 ván gặp Nhóm 9 (POS-06). (3) Trọng số PeSTO tĩnh: Chưa được tự động tuning theo đặc thù 960 thế cờ FRC mà vẫn dùng trọng số của cờ truyền thống.",
      "deepExplanation": "Nếu có thêm 1 tháng phát triển, em sẽ nâng cấp 2 giải pháp đột phá: (1) Tích hợp mạng nơ-ron đánh giá vị trí cập nhật hiệu quả NNUE (Efficiently Updatable Neural Network) dạng nhỏ gọn (nửa triệu tham số), huấn luyện trên tập dữ liệu hàng triệu ván cờ Chess960. (2) Bổ sung thuật toán Magic Bitboards để tính toán chính xác tuyệt đối các đường cơ động của Xe và Tượng (Mobility Evaluation) với tốc độ O(1), khắc phục hoàn toàn điểm mù chiến thuật.",
      "executionFlow": [
        "1. Hạn chế hiện tại: Thiếu Pin detection, thiếu Clock-awareness, PST gốc cờ thường",
        "2. Giải pháp 1: Huấn luyện lại trọng số PeSTO bằng Texel's Tuning trên 100,000 ván FRC",
        "3. Giải pháp 2: Triển khai Magic Bitboards để đánh giá độ cơ động (Mobility)",
        "4. Giải pháp 3: Tích hợp NNUE siêu nhẹ cho pha tàn cuộc"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "430-610"
      },
      "concreteExample": "Trong ván gặp Quán quân Nhóm 2 (POS-10), đối thủ khai thác triệt để việc bot chưa đánh giá sâu độ cơ động của Tượng ở cánh, ép đổi Hậu để phá cấu trúc Tốt.",
      "teacherFollowUps": [
        {
          "question": "Tại sao nhóm chưa tích hợp NNUE trong giải đấu lần này?",
          "answer": "Dạ, vì quy chế thi đấu cấm sử dụng Machine Learning/Deep Learning và cấm các thư viện ngoài. Toàn bộ mã nguồn phải thuần thuật toán tìm kiếm cổ điển và chuyên gia luật cờ."
        }
      ],
      "commonMistakes": [
        "Không thừa nhận hạn chế của code",
        "Đưa ra hướng nâng cấp vi phạm quy chế thi đấu của môn học"
      ]
    },
    "tags": [
      "Limitations",
      "Future Work",
      "NNUE",
      "Magic Bitboard",
      "Texel Tuning"
    ]
  },
  {
    "id": "MEM-VIET-16",
    "title": "Minh chứng Đóng góp Cá nhân và Commit Cốt lõi của Việt (Chương 6)",
    "question": "Theo Bảng 11 của báo cáo, Việt hoàn thành 25% công việc với commit f289693 (+588 dòng). Em hãy tóm tắt những đóng góp kỹ thuật cốt lõi trong commit đó?",
    "category": "member",
    "topic": "trade-offs",
    "memberTarget": "viet",
    "memberRole": "Hàm lượng giá thế trận – Minh chứng sản phẩm",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ thưa thầy, trong commit f289693 (+588 dòng mã), em đã một mình xây dựng trọn vẹn toàn bộ tệp student/evaluation.py từ con số không: Khởi tạo các bảng PeSTO MG/EG cho 6 loại quân cờ, cài đặt kỹ thuật đóng gói bit _pk và giải nén bù hai 0x8000, thiết kế thuật toán Dynamic Bitwise King Safety Ring cho 960 thế cờ Chess960, các hàm đánh giá cấu trúc Tốt, Xe, Tượng, Mã và Heuristic dồn Vua tàn cuộc Mop-Up.",
      "deepExplanation": "Trước commit f289693, file evaluation.py hoàn toàn rỗng (0 dòng code). Toàn bộ 611 dòng mã hiện tại của evaluation.py là thành quả nghiên cứu và hiện thực hóa độc lập của em, tuân thủ nghiêm ngặt chuẩn định dạng flake8 và mypy type-hints. Em cũng phối hợp với Bách và Long để bảo đảm hàm evaluate luôn trả về điểm số centipawns nhất quán với hệ thống thang đo của Searcher.",
      "executionFlow": [
        "Commit f289693 bàn giao:",
        "- Bảng PeSTO đóng gói 32-bit và giải nén bù hai 0x8000",
        "- Thuật toán Dynamic King Safety Ring cho Chess960",
        "- Đánh giá cấu trúc Tốt, Cặp Tượng, Xe cột mở/hàng 7, Mã tiền đồn",
        "- Mop-Up Heuristic dồn Vua tàn cuộc áp đảo"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "1-611"
      },
      "concreteExample": "Hàm evaluate sau khi bàn giao đạt tốc độ 100,000 evals/giây trên runner của nhóm, là bệ phóng vững chắc giúp Searcher của Long đạt độ sâu 4-5 ply trong thời gian Blitz.",
      "teacherFollowUps": [
        {
          "question": "Việt có tham gia vào các bài kiểm thử đối kháng nội bộ không?",
          "answer": "Dạ có, em trực tiếp kiểm tra tính đối xứng của hàm evaluate (kiểm tra xem thế cờ đảo màu có trả về điểm đối xứng chính xác không) để bảo đảm bot không bị thiên vị quân Trắng hay quân Đen."
        }
      ],
      "commonMistakes": [
        "Không nhớ mã commit chính của mình (f289693)",
        "Không tự tin về toàn bộ mã nguồn do mình tự tay viết"
      ]
    },
    "tags": [
      "Commit Proof",
      "Table 11",
      "Git",
      "evaluation.py",
      "f289693"
    ]
  },
  {
    "id": "MEM-VUONG-01",
    "title": "Bản chất 8 Bậc Heuristic trong Hàm _order_moves",
    "question": "Em là tác giả của thuật toán sắp xếp nước đi, hãy giải thích chi tiết 8 bậc ưu tiên trong _order_moves() và tại sao Move Ordering lại quyết định hiệu năng của Alpha-Beta?",
    "category": "member",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – _order_moves, see, _quiescence, NMP, RFP, LMR",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, hiệu năng của thuật toán Alpha-Beta phụ thuộc hoàn toàn vào thứ tự duyệt nước đi: nếu nước tốt nhất được duyệt đầu tiên, số lượng node phải duyệt đạt mức tối ưu lý thuyết O(b^(d/2)), co cụm cây tìm kiếm từ 35^4 (1.5 triệu nodes) xuống chỉ còn khoảng 6,000 nodes! Hàm _order_moves() của em xếp hạng các nước đi theo 8 bậc Heuristic nghiêm ngặt: (1) Hash Move từ TT: 10,000,000 điểm. (2) Queen Promotion: 1,200,000 điểm. (3) Threat Evasion: 850,000 điểm. (4) Good Captures (MVV-LVA có SEE >= 0): 1,000,000 + MVV-LVA. (5) Killer Moves: 700,000 và 690,000 điểm. (6) Safe Checks: 800,000 điểm. (7) Bad Captures (SEE < 0): 100,000 + MVV-LVA. (8) History Heuristic: điểm tích lũy trong quá khứ.",
      "deepExplanation": "Tại sao lại có sự phân tầng điểm số theo cấp số mũ (10^7, 10^6, 10^5)? Nhằm bảo đảm các tầng ưu tiên tuyệt đối không bị chồng lấn lên nhau! Một nước Hash Move đã chứng minh tốt ở độ sâu trước luôn đứng trên mọi nước ăn quân. Một nước ăn quân an toàn (Good Capture) luôn đứng trên các nước yên tĩnh. Một nước Killer Move luôn đứng trên các nước đi bình thường chưa từng gây ra cắt tỉa.",
      "executionFlow": [
        "1. Duyệt qua danh sách moves, gán điểm qua hàm con score_move(move):",
        "   - if move == tt_move: return 10_000_000",
        "   - if is_queen_promotion: return 1_200_000",
        "   - if is_capture: return 1_000_000 + mvv_lva if see(board, move) >= 0 else 100_000 + mvv_lva",
        "   - if move == killer1 / killer2: return 700_000 / 690_000",
        "   - if is_safe_check: return 800_000",
        "   - else: return history_table[color][from_sq][to_sq]",
        "2. Sắp xếp danh sách moves theo thứ tự điểm giảm dần: moves.sort(key=score_move, reverse=True)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._order_moves",
        "lines": "703-920"
      },
      "concreteExample": "Trong ván gặp Nhóm 13 (POS-03), khi đối thủ đi lạc Mã Nxa4, hàm _order_moves gán cho nước Tốt ăn Mã 12. bxa4 điểm số Good Capture = 1,000,000 + MVV-LVA (Mã=300, Tốt=100) = 1,002,900 điểm, đưa nước này lên đầu danh sách và gây ra Beta-cutoff ngay lập tức.",
      "teacherFollowUps": [
        {
          "question": "Tại sao không dùng hàm sort() của Python mà lại dùng score_move?",
          "answer": "Dạ, phương thức list.sort(key=score_move, reverse=True) của Python sử dụng thuật toán Timsort viết bằng ngôn ngữ C, cực kỳ nhanh và ổn định, chỉ mất khoảng 5-10 microseconds cho 30 nước đi."
        }
      ],
      "commonMistakes": [
        "Các ngưỡng điểm ưu tiên bị chồng lấn làm sai lệch thứ tự",
        "Không hiểu mối liên hệ giữa Move Ordering và hiệu quả cắt tỉa Alpha-Beta"
      ]
    },
    "tags": [
      "Move Ordering",
      "8-Tier",
      "_order_moves",
      "Alpha-Beta Optimization",
      "Timsort"
    ]
  },
  {
    "id": "MEM-VUONG-02",
    "title": "Thuật toán Static Exchange Evaluation (SEE) và Hàm see()",
    "question": "Hàm see(board, move) của Vương hoạt động như thế nào? Tại sao SEE là điều kiện tiên quyết để phân loại Good Captures và Bad Captures?",
    "category": "member",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – _order_moves, see, _quiescence, NMP, RFP, LMR",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, hàm see(board, move) là thuật toán phân tích tĩnh chuỗi đổi quân trên 1 ô cờ mục tiêu. MVV-LVA thông thường chỉ nhìn thấy quân bị ăn và quân ăn mà không biết quân ăn đó có bị đối phương ăn lại hay không. Hàm see() sẽ mô phỏng lần lượt từng quân tấn công nhỏ nhất (Least Valuable Attacker) của hai bên lao vào ô đó, ghi nhận chênh lệch vật chất tích lũy, sau đó dùng thuật toán Minimax ngược để tính giá trị thu về ròng. Nếu see >= 0, nước đó là Good Capture (+1,000,000 điểm); nếu see < 0, nước đó là Bad Capture (+100,000 điểm).",
      "deepExplanation": "Cơ chế hoạt động bên trong: (1) Ban đầu ta ăn quân đối phương trên ô to_sq, thu về giá trị quân đó. (2) Tìm quân tấn công nhỏ nhất của đối phương đang ngắm vào to_sq (ưu tiên Tốt, rồi đến Mã/Tượng, Xe, Hậu, Vua). (3) Nếu đối phương ăn lại quân ta, đối phương thu về giá trị quân ta vừa di chuyển đến. (4) Quá trình lặp lại cho đến khi một bên hết quân tấn công hoặc Vua không thể ăn vì ô bị kiểm soát. (5) Duyệt ngược từ cuối danh sách hoán đổi về đầu: `d[i-1] = max(-d[i], d[i-1])` để xác định bên nào có quyền dừng đổi quân khi thấy bị lỗ.",
      "executionFlow": [
        "1. gain = [PIECE_VALS[captured_piece]]",
        "2. attackers = board.attackers(WHITE, to_sq) | board.attackers(BLACK, to_sq)",
        "3. Lặp: Tìm attacker nhỏ nhất của bên đang đến lượt ăn lại",
        "   - gain.append(PIECE_VALS[attacker] - gain[-1])",
        "   - Cập nhật các quân tia X (X-ray attackers: Xe sau Xe, Hậu sau Tượng)",
        "4. Minimax ngược: while len(gain) > 1: gain[-2] = -max(-gain[-2], gain[-1]); gain.pop()",
        "5. return gain[0]"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "see",
        "lines": "287-435"
      },
      "concreteExample": "Trắng có Hậu, Đen có Tốt được Xe bảo vệ. Nếu Trắng dùng Hậu ăn Tốt: MVV-LVA tưởng là nước ăn quân ngon. Nhưng SEE tính: Trắng ăn Tốt (+100), Đen dùng Xe ăn Hậu (+900) -> Trắng lỗ 800 cp. Hàm see trả về -800 < 0, giáng nước đi này xuống Bad Captures, ngăn không cho bot dâng Hậu.",
      "teacherFollowUps": [
        {
          "question": "SEE có xử lý các quân tấn công tia X (X-ray attacks) không?",
          "answer": "Dạ có, khi một quân Tốt hoặc Tượng di chuyển để ăn quân, đường chiếu phía sau của Xe hoặc Hậu cùng cột/chéo sẽ được mở ra và thêm vào tập hợp attackers."
        }
      ],
      "commonMistakes": [
        "Tưởng rằng SEE thực hiện đi cờ trên bàn cờ thật (SEE chỉ tính toán trên tập hợp bitboard attackers)",
        "Không biết cơ chế Minimax ngược để dừng đổi quân"
      ]
    },
    "tags": [
      "SEE",
      "Static Exchange Evaluation",
      "Least Valuable Attacker",
      "X-ray",
      "Captures"
    ]
  },
  {
    "id": "MEM-VUONG-03",
    "title": "Quiescence Search và Cơ chế Delta Pruning 1,150 cp",
    "question": "Hàm _quiescence() giải quyết Horizon Effect như thế nào? Delta Pruning (1,150 cp) hoạt động ra sao và điều kiện bảo vệ khi có Tốt ở hàng 7?",
    "category": "member",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – _order_moves, see, _quiescence, NMP, RFP, LMR",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, Quiescence Search (Tìm kiếm trạng thái tĩnh) là phần mở rộng ở các nút lá, chỉ duyệt các nước ăn quân và phong cấp để đưa bàn cờ về trạng thái tĩnh hoàn toàn trước khi lượng giá. Cơ chế Delta Pruning là chốt chặn cắt tỉa: Nếu `stand_pat + giá_trị_quân_bị_ăn + 1,150 < alpha`, nghĩa là ngay cả khi ăn được quân cờ đó cộng thêm biên độ cực đại 1,150 cp mà thế cờ vẫn không đạt tới alpha, nước ăn quân đó là vô vọng và bị loại bỏ ngay lập tức. Biên độ 1,150 cp = 900 cp (quân Hậu) + 250 cp (dự phòng phong cấp và sai số vị trí).",
      "deepExplanation": "Tại sao phải có điều kiện bảo vệ Tốt ở hàng 7? Giả sử bên đi có một quân Tốt ở hàng 7 (hoặc hàng 2 đối với Đen). Nước đi tiếp theo của quân Tốt này có thể là nước phong cấp thành Hậu (tăng vọt 800 cp) kèm ăn quân đối phương hoặc tạo đòn chiếu hết. Nếu ta áp dụng Delta Pruning cứng nhắc, nước cờ phong cấp này có thể bị cắt nhầm! Do đó, em đã cài đặt điều kiện: Nếu bàn cờ có Tốt ở hàng 7 (hoặc hàng 2 đối với Đen), Delta Pruning tự động bị vô hiệu hóa để bảo đảm an toàn 100%.",
      "executionFlow": [
        "1. stand_pat = evaluate(board)",
        "2. if stand_pat >= beta: return beta (Stand-pat Cutoff)",
        "3. if stand_pat > alpha: alpha = stand_pat",
        "4. has_promos = bool(pawns & (BB_RANK_7 | BB_RANK_2))",
        "5. For m in captures:",
        "   - if not has_promos and stand_pat + piece_val[m] + 1150 < alpha: continue (Delta Pruning)",
        "   - board.push(m)",
        "   - score = -_quiescence(board, -beta, -alpha, ply + 1, tm)",
        "   - board.pop()",
        "   - if score >= beta: return beta"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._quiescence",
        "lines": "925-1070"
      },
      "concreteExample": "Giả sử alpha = 500 cp. Ta đang có stand_pat = -800 cp (đang thua nặng). Nước ăn quân Tốt đối thủ (+100 cp). Tổng điểm tiềm năng: -800 + 100 + 1150 = 450 cp < 500 cp (alpha). Rõ ràng ăn Tốt này không thể cứu vãn ván cờ, Delta Pruning bỏ qua nước này ngay lập tức, tiết kiệm 1 lần gọi hàm đệ quy.",
      "teacherFollowUps": [
        {
          "question": "Hàm _quiescence có giới hạn độ sâu tối đa không?",
          "answer": "Dạ có, hằng số MAX_QSEARCH_DEPTH = 8 giới hạn độ sâu tĩnh tối đa là 8 ply để tránh trường hợp hai bên ăn quân qua lại liên tục làm bùng nổ thời gian thi đấu."
        }
      ],
      "commonMistakes": [
        "Quên điều kiện bảo vệ Tốt ở hàng 7 khiến bot bỏ sót đòn phong cấp",
        "Không hiểu nguồn gốc con số 1,150 cp"
      ]
    },
    "tags": [
      "Quiescence Search",
      "Delta Pruning",
      "1150 cp",
      "Rank 7 Guard",
      "Horizon Effect"
    ]
  },
  {
    "id": "MEM-VUONG-04",
    "title": "Cắt tỉa Nước đi Rỗng (Null Move Pruning) và Hệ số Giảm trừ Động",
    "question": "Vương hãy phân tích thuật toán Null Move Pruning trong _negamax()? Hệ số giảm độ sâu động R = 2 + floor(d/6) được tính toán như thế nào?",
    "category": "member",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – _order_moves, see, _quiescence, NMP, RFP, LMR",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, Null Move Pruning (NMP) kiểm tra xem thế cờ hiện tại có quá mạnh đến mức nếu ta nhường lượt cho đối phương đi 2 nước liên tiếp mà đối phương vẫn không thể đạt tới beta hay không. Nếu đúng, ta cắt tỉa toàn bộ nhánh con mà không cần duyệt các nước đi hợp lệ. Hệ số giảm độ sâu động R = 2 + floor(depth / 6): ở depth 3-4, R = 2; ở depth 5 trở lên, R = 3. Điều này giúp cây tìm kiếm co lại mạnh mẽ mà vẫn bảo đảm độ sâu kiểm tra an toàn.",
      "deepExplanation": "Các điều kiện kiểm tra nghiêm ngặt trước khi chạy NMP: (1) `allow_nmp is True`: không cho phép chạy NMP hai lần liên tiếp để tránh đệ quy vô tận. (2) `depth >= 3`: chỉ áp dụng khi còn ít nhất 3 ply tìm kiếm. (3) `not board.is_check()`: không thể pass lượt khi đang bị chiếu vì là nước đi phạm quy. (4) `static_eval >= beta`: điểm đánh giá tĩnh ban đầu đã phải vượt ngưỡng beta. (5) `has_pieces`: bên đi phải còn ít nhất một quân cờ lớn (Mã, Tượng, Xe, Hậu) để phòng tránh tuyệt đối bẫy Zugzwang.",
      "executionFlow": [
        "1. Kiểm tra 5 điều kiện an toàn: allow_nmp, depth >= 3, not is_check, static_eval >= beta, has_pieces",
        "2. Tính R = 2 + (1 if depth >= 5 else 0)",
        "3. board.push(chess.Move.null())",
        "4. score = -self._negamax(board, depth - 1 - R, -beta, -beta + 1, ply + 1, tm, False)",
        "5. board.pop()",
        "6. if score >= beta: return beta (Beta-cutoff tức thì!)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1340-1390"
      },
      "concreteExample": "Ở depth 5, Trắng đang hơn 1 Xe (+500 cp, beta = 200). Trắng pass 1 nước rỗng, cho Đen đi trước với depth 5 - 1 - 3 = 1 ply. Đen đi nước tốt nhất nhưng vẫn không thể vượt qua 200 cp. Trắng lập tức ngắt nhánh depth 5 và trả về beta, tiết kiệm hàng nghìn nodes duyệt.",
      "teacherFollowUps": [
        {
          "question": "Tại sao lại gọi hàm đệ quy với cửa sổ [-beta, -beta + 1]?",
          "answer": "Dạ, đây là Cửa sổ Không (Null-Window) để kiểm tra xem điểm số có vượt qua beta hay không với chi phí tính toán thấp nhất, thay vì phải tìm điểm chính xác."
        }
      ],
      "commonMistakes": [
        "Dùng R cố định thay vì R động theo depth",
        "Quên kiểm tra điều kiện has_pieces làm dính bẫy Zugzwang"
      ]
    },
    "tags": [
      "Null Move Pruning",
      "NMP",
      "Reduction R",
      "Zugzwang Guard",
      "Beta-cutoff"
    ]
  },
  {
    "id": "MEM-VUONG-05",
    "title": "Reverse Futility Pruning (RFP) và Futility Pruning (FP)",
    "question": "Phân biệt Reverse Futility Pruning (RFP) và Futility Pruning (FP)? Công thức và vị trí đặt hai kỹ thuật này trong _negamax?",
    "category": "member",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – _order_moves, see, _quiescence, NMP, RFP, LMR",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ, RFP và FP là hai kỹ thuật cắt tỉa đối xứng ở các độ sâu lá nông: (1) Reverse Futility Pruning (RFP - còn gọi là Static Null Move Pruning): đặt ở TRƯỚC vòng lặp sinh nước đi tại depth <= 2. Nếu `static_eval - 120 * depth >= beta`, thế cờ quá mạnh vượt xa beta thì ngắt hàm ngay lập tức, trả về `static_eval - 120 * depth`. (2) Futility Pruning (FP): đặt ở BÊN TRONG vòng lặp duyệt từng nước đi tại depth == 1. Nếu nước đi là quiet move và `static_eval + 150 <= alpha`, nước đó quá yếu không thể chạm tới alpha nên bỏ qua (continue) không duyệt.",
      "deepExplanation": "Bản chất toán học: RFP cắt tỉa từ phía trên (Fail-high), chứng minh rằng ngay cả khi trừ hao 1.2 Tốt cho mỗi ply còn lại mà ta vẫn thắng beta, thì không cần duyệt cây con. FP cắt tỉa từ phía dưới (Fail-low), chứng minh rằng một nước đi yên tĩnh ở depth 1 tối đa chỉ tăng thêm 150 cp, nếu cộng thêm 150 cp mà vẫn thua alpha thì nước đó hoàn toàn vô vọng (futile). Cả hai kỹ thuật này kết hợp giúp dọn sạch hoàn toàn các nhánh dư thừa ở 2 tầng lá cuối cùng.",
      "executionFlow": [
        "1. RFP (trước vòng lặp nước đi):",
        "   - if depth <= 2 and not in_check and static_eval - 120 * depth >= beta:",
        "       - return static_eval - 120 * depth",
        "2. FP (trong vòng lặp, duyệt từng nước m):",
        "   - if depth == 1 and not in_check and not is_capture and static_eval + 150 <= alpha:",
        "       - continue (bỏ qua nước m)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1310-1335 và 1420-1440"
      },
      "concreteExample": "Ở depth 1, alpha = 200 cp. Điểm tĩnh của ta là -50 cp. Một nước nhảy Vua sang ô bên cạnh (không ăn quân): static_eval + 150 = -50 + 150 = 100 cp < 200 cp (alpha). FP loại bỏ ngay nước nhảy Vua này mà không cần gọi hàm con.",
      "teacherFollowUps": [
        {
          "question": "Tại sao RFP và FP đều không áp dụng khi đang bị chiếu (in_check)?",
          "answer": "Dạ, vì khi bị chiếu, điểm đánh giá tĩnh static_eval không đáng tin cậy và bên bị chiếu có thể bị chiếu hết ngay ở nước sau, việc cắt tỉa sẽ gây ra lỗi bỏ sót đòn thua cờ."
        }
      ],
      "commonMistakes": [
        "Nhầm lẫn vị trí của RFP (trước loop) và FP (trong loop)",
        "Nhầm lẫn hệ số 120*depth của RFP và 150 của FP"
      ]
    },
    "tags": [
      "RFP",
      "FP",
      "Reverse Futility",
      "Futility Pruning",
      "Leaf Pruning"
    ]
  },
  {
    "id": "MEM-VUONG-06",
    "title": "Late Move Reductions (LMR) và Kỹ thuật Giảm Độ sâu Nước Muộn",
    "question": "Thuật toán Late Move Reductions (LMR) trong _negamax() của Vương có điều kiện kích hoạt là gì và quy trình Re-search khi Fail-high diễn ra ra sao?",
    "category": "member",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – _order_moves, see, _quiescence, NMP, RFP, LMR",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, LMR giảm độ sâu tìm kiếm 1 ply cho các nước đi nằm ở phần sau của danh sách (từ nước thứ 4 trở đi, index >= 4) với điều kiện: độ sâu depth >= 3, không bị chiếu, và nước đi là quiet move (không ăn quân, không phong cấp). Bot duyệt nước đó với `depth - 2` thay vì `depth - 1`. Nếu kết quả tìm kiếm bất ngờ vượt qua alpha (`score > alpha`), tức là xảy ra Fail-high chứng tỏ nước muộn này tốt hơn dự kiến, bot lập tức Re-search lại nước đó với độ sâu đầy đủ `depth - 1` để đảm bảo tính đúng đắn.",
      "deepExplanation": "Tại sao lại chọn index >= 4 và depth >= 3? Vì theo thống kê lý thuyết, sau khi qua 3 nước đầu tiên (Hash move, Good captures, Killer moves), xác suất nước thứ 4 trở đi là nước tối ưu chỉ còn dưới 10%. Duyệt nông hơn 1 ply giúp giảm số node của nhánh đó đi khoảng 60-70%. Cơ chế Re-search là lưới an toàn tuyệt đối: nếu nhánh đó thực sự có đòn chiến thuật hay, điểm số sẽ vượt alpha và kích hoạt tìm kiếm lại đầy đủ, do đó LMR tăng tốc độ tìm kiếm mà không làm giảm độ chính xác chiến thuật.",
      "executionFlow": [
        "1. Kiểm tra điều kiện LMR: if moves_searched >= 4 and depth >= 3 and not in_check and not is_capture and not is_promo:",
        "   - score = -_negamax(board, depth - 2, -alpha - 1, -alpha, ply + 1, tm)",
        "2. else: score = alpha + 1 (để ép chạy nhánh tìm kiếm chuẩn)",
        "3. if score > alpha: (Re-search nếu LMR fail-high hoặc là nước bình thường)",
        "   - score = -_negamax(board, depth - 1, -beta, -alpha, ply + 1, tm)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1440-1485"
      },
      "concreteExample": "Trong một thế cờ trung cuộc có 40 nước đi, 3 nước đầu được search depth 4 đầy đủ. 37 nước sau được search với depth 3. Nhờ đó, thời gian duyệt node này giảm từ 80 ms xuống chỉ còn 25 ms, giúp bot kịp mở rộng sang tầng IDS tiếp theo.",
      "teacherFollowUps": [
        {
          "question": "Tại sao không giảm độ sâu 2 ply (depth - 3) luôn cho nhanh?",
          "answer": "Dạ, giảm 2 ply là quá hung hãn trong môi trường cờ chớp có độ sâu 4-5 ply, sẽ khiến tỷ lệ Fail-high và phải Re-search tăng vọt, làm phản tác dụng của LMR."
        }
      ],
      "commonMistakes": [
        "Áp dụng LMR cho các nước ăn quân hoặc chiếu Vua",
        "Quên bước Re-search khi có Fail-high"
      ]
    },
    "tags": [
      "LMR",
      "Late Move Reductions",
      "Re-search",
      "Index >= 4",
      "Depth >= 3"
    ]
  },
  {
    "id": "MEM-VUONG-07",
    "title": "Killer Moves Heuristic và Lưu trữ Hai Nước Sát thủ",
    "question": "Hàm _store_killer() lưu trữ Killer Moves như thế nào tại mỗi tầng ply và vai trò của nó trong Move Ordering?",
    "category": "member",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – _order_moves, see, _quiescence, NMP, RFP, LMR",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ, Killer Moves (Nước cờ sát thủ) là các nước đi yên tĩnh (quiet moves, không ăn quân) nhưng lại gây ra Beta-cutoff tại một tầng độ sâu ply nhất định. Bảng `self.killer_moves = [[None, None] for _ in range(MAX_DEPTH)]` lưu tối đa 2 nước sát thủ tại mỗi ply. Khi có một quiet move m gây ra Beta-cutoff, hàm `_store_killer(m, ply)` sẽ đẩy killer1 cũ xuống killer2 và lưu m vào killer1. Trong `_order_moves()`, nước killer1 được thưởng 700,000 điểm và killer2 được thưởng 690,000 điểm, đưa chúng lên vị trí ưu tiên duyệt ngay sau các nước ăn quân tốt.",
      "deepExplanation": "Nguyên lý của Killer Heuristic: Trong cây cờ vua, các nhánh con ở cùng một độ sâu ply thường có cấu trúc tương tự nhau. Nếu một nước đi yên tĩnh (ví dụ nước đẩy Tốt c3 chặn đường Xe) đã chứng minh là đòn sát thủ gây cắt tỉa ở nhánh anh em này, thì rất có khả năng nó cũng sẽ gây cắt tỉa ở các nhánh anh em khác cùng ply! Việc lưu 2 nước killer giúp tăng độ bao phủ chiến thuật nếu nước killer1 không hợp lệ ở nhánh mới.",
      "executionFlow": [
        "1. Khi quiet move m gây Beta-cutoff: self._store_killer(m, ply)",
        "2. Trong _store_killer:",
        "   - if m != self.killer_moves[ply][0]:",
        "       - self.killer_moves[ply][1] = self.killer_moves[ply][0]",
        "       - self.killer_moves[ply][0] = m",
        "3. Trong _order_moves:",
        "   - if m == killer_moves[ply][0]: return 700_000",
        "   - if m == killer_moves[ply][1]: return 690_000"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._store_killer",
        "lines": "667-685"
      },
      "concreteExample": "Ở depth 4 (ply 2), nước nhảy Mã Nf5 gây ra Beta-cutoff ở nhánh con thứ nhất. Khi chuyển sang nhánh con thứ hai, nước Nf5 lập tức được xếp lên vị trí số 4 trong danh sách nước đi, và lại tiếp tục gây Beta-cutoff ngay tại nước đầu tiên được thử.",
      "teacherFollowUps": [
        {
          "question": "Tại sao mảng killer_moves lại đánh chỉ số theo ply mà không theo depth?",
          "answer": "Dạ, vì một nước đi chiến thuật phát huy tác dụng ở khoảng cách cụ thể tính từ thế cờ hiện tại (tức là tại ply đó), không phụ thuộc vào việc tầng đó còn lại bao nhiêu depth tìm kiếm."
        }
      ],
      "commonMistakes": [
        "Lưu nước ăn quân vào Killer moves",
        "Đánh chỉ số mảng killer theo depth thay vì ply"
      ]
    },
    "tags": [
      "Killer Moves",
      "_store_killer",
      "Beta-cutoff",
      "Move Ordering",
      "Ply-indexed"
    ]
  },
  {
    "id": "MEM-VUONG-08",
    "title": "Threat Evasion Heuristic và Đòn Ghim Trận POS-01",
    "question": "Threat Evasion Heuristic (+850,000 điểm) trong _order_moves hoạt động thế nào và nó đã giúp bot phát hiện đòn ghim trong trận thắng Nhóm 3 (POS-01) ra sao?",
    "category": "member",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – _order_moves, see, _quiescence, NMP, RFP, LMR",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, Threat Evasion Heuristic được em thiết kế để xử lý các tình huống Vua hoặc quân lớn đang bị đe dọa hoặc đứng trước cơ hội mở đòn ghim phản công. Nước đi thỏa mãn điều kiện này được gán +850,000 điểm, xếp trên cả Killer Moves (+700,000) và Safe Checks (+800,000). Trong trận gặp Nhóm 3 (POS-01), sau khi đối thủ phạm sai lầm 13. Bxe7 làm mở toang cột e trước mặt Vua Trắng, Threat Evasion Heuristic đã đẩy nước 13... Rfe8 chiếm cột e lên vị trí số 1 trong danh sách nước đi, giúp bot tìm ra đòn trừng phạt chỉ sau 1.1 giây.",
      "deepExplanation": "Cơ chế hoạt động: Khi Vua hoặc quân nặng đối phương nằm trên cùng một cột với Xe ta vừa mở ra, hoặc khi một quân ta đang bị đe dọa cần di chuyển thoát thân đến ô an toàn, Threat Evasion nhận diện thông qua mặt nạ kiểm tra tấn công. Bằng cách gán 850,000 điểm, nước cờ phản công này được đưa lên duyệt ngay đầu tiên, giúp thuật toán Negamax PVS kiểm tra nó với cửa sổ đầy đủ và gây ra Fail-high tức thì.",
      "executionFlow": [
        "1. Nhóm 3 đi 13. Bxe7 mở toang cột e",
        "2. Nhóm 12 sinh danh sách moves, nước 13... Rfe8 thỏa mãn kiểm soát cột e mở đối diện Vua Trắng",
        "3. Threat Evasion gán điểm: 850,000 điểm -> Rfe8 đứng đầu danh sách quiet moves",
        "4. Negamax duyệt Rfe8 đầu tiên, đánh giá đổi sang -588 cp cho Đen, hoàn tất ván đấu 98.20% độ chính xác"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._order_moves",
        "lines": "820-845"
      },
      "concreteExample": "Báo cáo mục 5.4.1 đã vinh danh nước đi POS-01: 'Nhờ cơ chế Move Ordering ưu tiên đòn ghim (Threat Evasion +850,000), Nhóm 12 phản công tức thì với 13... Rfe8 (Hình 18a, 1,133 ms), đảo chiều đánh giá sang -588 cp'.",
      "teacherFollowUps": [
        {
          "question": "Tại sao Threat Evasion lại có điểm cao hơn Safe Checks (850k vs 800k)?",
          "answer": "Dạ, vì việc hóa giải mối đe dọa hoặc ghim quân đối phương mang tính chiến lược dài hạn, trong khi một nước chiếu an toàn (Safe Check) đôi khi chỉ là nước chiếu vô hại làm mất vị trí quân."
        }
      ],
      "commonMistakes": [
        "Không liên hệ được thuật toán Move Ordering với tình huống thực tế POS-01",
        "Nghĩ rằng bot có một mạng nơ-ron nhận diện đòn ghim"
      ]
    },
    "tags": [
      "Threat Evasion",
      "850k",
      "POS-01",
      "Pin Attack",
      "Move Ordering"
    ]
  },
  {
    "id": "MEM-VUONG-09",
    "title": "Hiểu biết về Negamax và Chuẩn hóa Điểm Chiếu hết (Hỏi chéo Long)",
    "question": "Vương hãy giải thích tại sao hàm score_to_tt() của Long lại phải cộng ply vào điểm số chiếu hết trước khi lưu vào bảng TT?",
    "category": "member",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em nắm rất rõ cơ chế này của bạn Long: Điểm chiếu hết trong Negamax phụ thuộc vào khoảng cách tính từ gốc cây tìm kiếm (ply hiện tại): score = MATE_SCORE - ply. Nếu ta lưu trực tiếp giá trị này vào TT, khi một nhánh tìm kiếm khác ở độ sâu ply khác truy vấn lại cùng thế cờ này, điểm số sẽ bị sai lệch khoảng cách chiếu hết! Hàm score_to_tt cộng thêm ply vào điểm số: `score + ply` để chuyển khoảng cách chiếu hết thành một hằng số tuyệt đối tính từ thế cờ hiện tại. Khi đọc ra, hàm score_from_tt chỉ việc trừ đi ply hiện tại để khôi phục lại điểm số chuẩn xác.",
      "deepExplanation": "Công thức toán học: Giả sử MATE_SCORE = 30,000 cp. Ở ply 2, ta phát hiện chiếu hết sau 3 nước nữa (ở ply 5) -> điểm Minimax là 30,000 - 5 = 29,995. Khi lưu vào TT, score_to_tt cộng thêm ply = 2: 29,995 + 2 = 29,997. Con số 29,997 này mang ý nghĩa: 'Thế cờ này sẽ bị chiếu hết sau đúng 30,000 - 29,997 = 3 nước nữa'. Ở một nhánh khác khi thế cờ xuất hiện tại ply 6, hàm score_from_tt lấy 29,997 - 6 = 29,991, tương ứng chính xác là chiếu hết ở ply 6 + 3 = 9. Không có phép chuẩn hóa này, bot sẽ bị loạn đòn chiếu hết và đi lặp cờ.",
      "executionFlow": [
        "1. Phát hiện chiếu hết: score >= 29,000",
        "2. Lưu vào TT: score_to_tt(score, ply) -> return score + ply",
        "3. Đọc từ TT: score_from_tt(stored_score, ply) -> return stored_score - ply"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "score_to_tt",
        "lines": "195-220"
      },
      "concreteExample": "Trong ván POS-02 (24... Be3#) và POS-04 (37. Re8#), nhờ cơ chế chuẩn hóa này mà bot tìm ra nước chiếu hết ngắn nhất (ít nước nhất) thay vì chọn các nước chiếu hết vòng vo kéo dài.",
      "teacherFollowUps": [
        {
          "question": "Nếu bị đối phương chiếu hết thì công thức đổi dấu thế nào?",
          "answer": "Dạ, nếu bị chiếu hết (score <= -29,000), điểm lưu vào TT là score - ply, và khi đọc ra là stored_score + ply."
        }
      ],
      "commonMistakes": [
        "Cộng trừ nhầm dấu ply giữa 2 hàm",
        "Không giải thích được tại sao điểm chiếu hết lại phụ thuộc vào ply"
      ]
    },
    "tags": [
      "Cross-Examination",
      "score_to_tt",
      "Mate Score",
      "Ply Normalization",
      "Search"
    ]
  },
  {
    "id": "MEM-VUONG-10",
    "title": "Hiểu biết về TimeManager và Hệ số Nhánh Kế tiếp 2.2x (Hỏi chéo Bách)",
    "question": "Vương hãy giải thích tại sao TimeManager của Bách lại dùng hệ số dự báo 2.2x trong can_start_next_depth()?",
    "category": "member",
    "topic": "time-management",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, hệ số 2.2x chính là Hệ số rẽ nhánh hiệu dụng (Effective Branching Factor - EBF) mà Searcher đạt được nhờ các kỹ thuật Move Ordering và Cắt tỉa của em! Trong cờ vua, nếu không cắt tỉa, hệ số rẽ nhánh là b ≈ 35 (mỗi tầng sâu tốn thời gian gấp 35 lần). Nhưng nhờ Alpha-Beta lý tưởng, EBF giảm xuống sqrt(35) ≈ 5.9. Hơn thế nữa, nhờ Move Ordering 8 bậc kết hợp PVS Zero-Window, NMP, RFP và LMR của em, mỗi tầng sâu tiếp theo chỉ tốn thời gian gấp trung bình 2.2 lần tầng trước! Bách đã lấy đúng con số thực nghiệm 2.2x này để nhân với thời gian tầng trước, dự báo chính xác thời gian tầng sau.",
      "deepExplanation": "Ý nghĩa trong quyết định dừng an toàn: Trước khi mở tầng depth tiếp theo trong IDS, nếu `thời_gian_đã_dùng + last_iter_ms * 2.2 > Soft_Limit`, bot sẽ từ chối mở tầng mới. Việc dùng đúng hệ số 2.2x giúp bot vừa khai thác triệt để thời gian để đạt độ sâu tối đa, vừa bảo đảm không bao giờ bị rơi vào tình trạng mở một tầng mới rồi bị ngắt timeout giữa chừng làm lãng phí công sức.",
      "executionFlow": [
        "1. Tầng trước tốn: last_iter_ms = 40 ms",
        "2. Dự báo tầng sau: estimated = 40 * 2.2 = 88 ms",
        "3. Kiểm tra: if elapsed + 88 > opt_ms -> dừng IDS, bảo toàn kết quả tầng trước"
      ],
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "TimeManager.can_start_next_depth",
        "lines": "177-199"
      },
      "concreteExample": "Nếu dùng hệ số lý thuyết 5.9x, bot sẽ nghĩ tầng sau tốn tới 236 ms và dừng lại ngay từ depth 3, làm bot bị nông. Nhờ hệ số thực tế 2.2x, bot tự tin mở tiếp depth 4 và depth 5, nâng cao đáng kể năng lực thi đấu.",
      "teacherFollowUps": [
        {
          "question": "Nếu Move Ordering hoạt động kém thì hệ số EBF thực tế sẽ tăng hay giảm?",
          "answer": "Dạ, nếu Move Ordering kém, số lượng nhánh bị cắt tỉa giảm đi, hệ số EBF sẽ tăng vọt lên 4x - 6x, khiến thời gian duyệt bùng nổ và bot dễ bị timeout."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng 2.2x là con số chọn ngẫu nhiên không có căn cứ",
        "Không gắn kết được 2.2x với hiệu quả của Move Ordering"
      ]
    },
    "tags": [
      "Cross-Examination",
      "EBF",
      "Effective Branching Factor",
      "2.2x",
      "can_start_next_depth"
    ]
  },
  {
    "id": "MEM-VUONG-11",
    "title": "Hiểu biết về Hàm evaluate và Đóng gói Bitboard 32-bit (Hỏi chéo Việt)",
    "question": "Vương hãy giải thích tại sao hàm evaluate của Việt lại cần đóng gói điểm số MG và EG bằng phép dịch bit `mg + (eg << 16)`?",
    "category": "member",
    "topic": "evaluation",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em nắm rất chắc kỹ thuật này của bạn Việt: Mỗi quân cờ trong cờ vua có 2 giá trị vị trí ô PeSTO khác nhau: Trung cuộc (MG) và Tàn cuộc (EG). Nếu tính riêng rẽ, ta phải chạy hai vòng lặp cộng điểm song song. Bằng cách đóng gói `val = (mg & 0xFFFF) | (eg << 16)`, hai giá trị 16-bit này được ghép chung vào một số nguyên 32-bit. Khi duyệt các quân cờ trên bàn, hàm _pst_sum chỉ cần thực hiện 1 phép cộng số nguyên 32-bit duy nhất trên CPU. Sau đó hàm evaluate dùng phép bù 0x8000 để giải nén cả MG và EG ra. Kỹ thuật này giúp hàm evaluate tăng gấp đôi tốc độ tính toán, đạt 100,000 evals/giây.",
      "deepExplanation": "Mối liên hệ mật thiết với phần việc của em: Hàm Quiescence Search `_quiescence()` của em liên tục gọi `evaluate(board)` tại mỗi nút lá để tính điểm stand_pat. Nếu hàm evaluate của Việt chạy chậm, Quiescence Search sẽ bị nghẽn cổ chai ngay lập tức! Nhờ kỹ thuật đóng gói bitboard 32-bit siêu tốc của Việt, hàm _quiescence của em chạy cực kỳ mượt mà, duyệt hàng nghìn nút lá ăn quân chỉ trong vài mili-giây.",
      "executionFlow": [
        "1. Đóng gói trước: _build_packed_pst() nạp sẵn PST_PACKED 32-bit",
        "2. Trong evaluate: s = _pst_sum(wp, _WP) + ... (cộng 32-bit siêu tốc)",
        "3. Giải nén bù 0x8000: eg = (s + 0x8000) >> 16; mg = s - (eg << 16)",
        "4. Nội suy theo phase / 24"
      ],
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "_pk",
        "lines": "239-254"
      },
      "concreteExample": "Một bàn cờ có 25 quân, thay vì 50 phép cộng (25 cho MG + 25 cho EG), bot chỉ thực hiện đúng 25 phép cộng 32-bit. Tiết kiệm 50% số chu kỳ lệnh của CPU.",
      "teacherFollowUps": [
        {
          "question": "Tại sao lại là dịch bit 16 mà không phải dịch bit 8?",
          "answer": "Dạ, vì điểm số centipawns của cờ vua có thể lên tới hàng nghìn (ví dụ quân Hậu là 900 cp). Số nguyên 8-bit chỉ lưu được từ -128 đến 127, không đủ chứa điểm quân cờ. Bắt buộc phải dùng số nguyên 16-bit (từ -32,768 đến 32,767) nên phải dịch 16 bit."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng đóng gói để tiết kiệm bộ nhớ RAM thay vì để tăng tốc CPU",
        "Không biết mối liên hệ giữa evaluate và Quiescence Search"
      ]
    },
    "tags": [
      "Cross-Examination",
      "Bit-packing",
      "32-bit",
      "_pk",
      "Quiescence Integration"
    ]
  },
  {
    "id": "MEM-VUONG-12",
    "title": "Hiểu biết về Kiến trúc Phòng thủ 3 Tầng trong bot.py (Hỏi chéo Bách)",
    "question": "Vương hãy phân tích tầng 1 và tầng 3 của Kiến trúc phòng thủ trong bot.py bảo vệ bot như thế nào?",
    "category": "member",
    "topic": "architecture",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – Kiểm tra chéo toàn bộ hệ thống",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy: Tầng 1 nằm ở đầu hàm choose_move: kiểm tra danh sách nước đi hợp lệ legal = list(board.legal_moves). Nếu len == 0 (thế cờ kết thúc), trả về Move.null() để tránh văng lỗi IndexError. Nếu len == 1 (nước bắt buộc), trả về ngay lập tức trong đúng 0 ms, bảo toàn 100% thời gian cho Searcher của nhóm ở các nước sau. Tầng 3 nằm ở cuối hàm trước khi return: kiểm tra `if move not in board.legal_moves: move = legal[0]`. Đây là chốt chặn cuối cùng bảo đảm với xác suất 100% rằng nước đi gửi ra máy chủ luôn luôn hợp lệ, loại trừ hoàn toàn nguy cơ bị xử thua phạm quy do va chạm băm trong TT.",
      "deepExplanation": "Sự kết hợp giữa 3 tầng tạo nên một hệ thống cực kỳ kỷ luật: Tầng 1 tiết kiệm tài nguyên; Tầng 2 bọc lót khối tìm kiếm bằng try...except fallback về legal[0]; Tầng 3 hậu kiểm tính hợp lệ. Nhờ kiến trúc này của Bách mà toàn bộ 48 ván đấu của Nhóm 12 không xảy ra bất kỳ một sự cố kỹ thuật nào.",
      "executionFlow": [
        "Tầng 1: len(legal)==0 -> Move.null(); len(legal)==1 -> legal[0] (0 ms)",
        "Tầng 2: try: move = searcher.search() except: move = legal[0]",
        "Tầng 3: if move not in board.legal_moves: move = legal[0] -> return move"
      ],
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "choose_move",
        "lines": "45-97"
      },
      "concreteExample": "Khi bị chiếu hết hoặc hết nước đi (stalemate), Tầng 1 trả về Move.null() thông báo cho trọng tài dừng ván đấu mà không bị crash chương trình.",
      "teacherFollowUps": [
        {
          "question": "Nước đi từ Searcher của em có bao giờ bị rơi vào Tầng 3 không?",
          "answer": "Dạ, trong điều kiện bình thường thì không. Nhưng trong trường hợp hy hữu xảy ra xung đột khóa Zobrist 64-bit trong Transposition Table (2 thế cờ khác nhau trùng key), TT có thể trả về một best_move của thế cờ khác. Tầng 3 sẽ phát hiện ngay nước đó không nằm trong legal_moves và thay bằng legal[0], cứu bot thoát thua phạm quy."
        }
      ],
      "commonMistakes": [
        "Không giải thích được tại sao cần cả tầng 2 lẫn tầng 3",
        "Quên trường hợp len(legal) == 0"
      ]
    },
    "tags": [
      "Cross-Examination",
      "3-Tier Defense",
      "bot.py",
      "Hash Collision Safety",
      "Legal Moves"
    ]
  },
  {
    "id": "MEM-VUONG-13",
    "title": "Phân tích Tình huống Bắt Mã Lạc và Chiếu hết Hàng đáy POS-03 & POS-04",
    "question": "Trong trận thắng áp đảo Nhóm 13 (POS-03 & POS-04), thuật toán MVV-LVA, SEE và Quiescence Search của Vương đã phối hợp như thế nào?",
    "category": "member",
    "topic": "experiment",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – Phân tích thực nghiệm và phản biện",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, ở nước 11 trận gặp Nhóm 13, đối thủ đi nước sai lầm 11... Nxa4 đưa Mã vào ô biên không có quân bảo vệ. Thuật toán của em đã xử lý hoàn hảo qua 3 bước: (1) MVV-LVA nhận diện nước ăn Mã bằng Tốt 12. bxa4 (Victim=Knight: 300, Attacker=Pawn: 100) và gán điểm tối đa +10,000,000 điểm. (2) Hàm see(board, move) kiểm tra tĩnh 1-ply xác nhận ô a4 an toàn, trả về SEE = +300 >= 0, xếp vào Good Captures. (3) Quiescence Search duyệt sâu pha ăn quân này và xác nhận Trắng hơn trọn vẹn 1 quân nhẹ (+679 cp). Sau đó đến nước 37, đòn chiếu hết hàng đáy 37. Re8# (POS-04) kết liễu trận đấu đạt 97.11% độ chính xác.",
      "deepExplanation": "Sự kết hợp giữa MVV-LVA và SEE là chìa khóa: MVV-LVA đóng vai trò bộ lọc nhanh (Heuristic sort), còn SEE đóng vai trò trọng tài kiểm định an toàn (Exchange verifier). Nếu không có SEE, các nước ăn quân liều mạng cũng bị xếp lên đầu. Nhờ có SEE, nước 12. bxa4 được chứng minh là nước ăn quân hoàn toàn có lợi và đứng ở vị trí số 1 của danh sách, giúp Negamax gây ra Beta-cutoff ngay lập tức chỉ sau 1.1 giây.",
      "executionFlow": [
        "1. Nhóm 13 đi 11... Nxa4",
        "2. _order_moves tính MVV-LVA cho bxa4 -> 10,000,000 + (3000 - 100) = 10,002,900 điểm",
        "3. see(board, bxa4) trả về +300 >= 0 -> Good Capture",
        "4. Negamax chọn bxa4, vươn lên dẫn trước +679 cp",
        "5. Tại nước 37: 37. Re8# chiếu hết hàng đáy hoàn hảo (97.11% acc)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._order_moves & see",
        "lines": "720-760"
      },
      "concreteExample": "Hình 19 trong báo cáo minh họa rõ hai thế cờ POS-03 và POS-04: Ăn Mã lạc ở nước 12 và chiếu hết hàng đáy cô lập Vua Đen ở nước 37.",
      "teacherFollowUps": [
        {
          "question": "Tại sao nước chiếu hết hàng đáy 37. Re8# lại được tìm ra nhanh chóng (789 ms)?",
          "answer": "Dạ, vì lúc đó bàn cờ đã ít quân, Quiescence Search và Move Ordering ưu tiên nước chiếu an toàn (Safe Checks) và nước ăn quân, Negamax nhanh chóng nhìn thấy đường chiếu hết ở ply 1."
        }
      ],
      "commonMistakes": [
        "Nghĩ rằng MVV-LVA tự kiểm tra được ô cờ có an toàn hay không mà quên vai trò của SEE",
        "Không liên hệ được thuật toán với số liệu thực tế trong báo cáo"
      ]
    },
    "tags": [
      "Case Study",
      "POS-03",
      "POS-04",
      "MVV-LVA",
      "SEE",
      "Back-rank Mate"
    ]
  },
  {
    "id": "MEM-VUONG-14",
    "title": "Phân tích Rào cản Độ sâu 4-ply và Thua cuộc POS-10 trước Quán quân",
    "question": "Trong tình huống POS-10 gặp Quán quân Nhóm 2, tại sao các kỹ thuật Pruning và Move Ordering của Vương không giúp bot tránh được thất bại ở nước 16?",
    "category": "member",
    "topic": "experiment",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – Phân tích thực nghiệm và phản biện",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, báo cáo tại mục 5.4.4 đã phân tích rất rõ: Ở nước 16 gặp Quán quân Nhóm 2, Nhóm 12 đi nước Tượng 16... Bb5 tấn công Xe Trắng, tưởng chừng là nước phát triển quân có lời. Tuy nhiên, ở ply thứ 5, Hậu Trắng có nước phản đòn sấm sét 17. Qxb5! ăn thẳng Tượng Đen. Do bot viết bằng Python đạt tốc độ 25,400 NPS, trong ngân sách 1.0 giây bot chỉ đạt tối đa độ sâu 4 ply. Nước phản đòn Qxb5 nằm ở ply thứ 5, rơi đúng vào 'điểm mù chân trời' (Horizon Blindspot) của bot! Dù Move Ordering có tốt đến đâu, nếu độ sâu danh định không với tới ply 5 và Quiescence Search không mở rộng cho các nước cờ không ăn quân ở ply 4 thì bot hoàn toàn không thể nhìn thấy nước cờ này.",
      "deepExplanation": "Bài học rút ra cho hệ thống: (1) Giới hạn của ngôn ngữ thông dịch: Python thuần không thể cạnh tranh về độ sâu với các engine viết bằng C++/Rust của top 5 đội dẫn đầu. (2) Thiếu kỹ thuật Check Extension và Capture Extension: Nếu nhóm cài đặt Check Extension hoặc mở rộng tìm kiếm khi Tượng bị đe dọa phản công, bot đã có thể đào sâu thêm 1 ply nữa và nhìn thấy nước phản đòn Qxb5 để kịp thời rút về 16... Be7 an toàn.",
      "executionFlow": [
        "1. Nhóm 12 search depth 4 trong 1,018 ms",
        "2. Ply 1-4: 16... Bb5 đe dọa Xe Trắng, đánh giá +818 cp cho Đen",
        "3. Ply 5 (nằm ngoài tầm search): Trắng phản đòn 17. Qxb5! ăn sống Tượng",
        "4. Nhóm 12 mất trắng 1 Tượng và thua trận nhanh chóng"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher.search",
        "lines": "1650-1750"
      },
      "concreteExample": "Bảng 8 cho thấy Nhóm 2 là Quán quân giải đấu, có độ sâu search 7-8 ply và độ chính xác 96%. Sự chênh lệch 3 tầng độ sâu là nguyên nhân cốt lõi khiến các kỹ thuật cắt tỉa không thể cứu vãn được thế trận.",
      "teacherFollowUps": [
        {
          "question": "Tại sao Quiescence Search không nhìn thấy nước Qxb5?",
          "answer": "Dạ, vì ở ply 4 nước đi là 16... Bb5 (nước đi yên tĩnh, không ăn quân), nên Quiescence Search không được kích hoạt từ nước này, nó dừng lại ở điểm đánh giá tĩnh của ply 4."
        }
      ],
      "commonMistakes": [
        "Đổ lỗi cho Move Ordering sắp xếp sai",
        "Không hiểu được khái niệm Horizon Effect trong tình huống cụ thể"
      ]
    },
    "tags": [
      "Case Study",
      "POS-10",
      "Depth Barrier",
      "Horizon Effect",
      "Tactical Blindspot"
    ]
  },
  {
    "id": "MEM-VUONG-15",
    "title": "Hạn chế của Hệ thống Cắt tỉa Hiện tại và Lộ trình Nâng cấp",
    "question": "Những hạn chế lớn nhất trong các kỹ thuật Pruning và Move Ordering của Vương là gì? Nếu phát triển tiếp em sẽ bổ sung thuật toán nào?",
    "category": "member",
    "topic": "trade-offs",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – Hạn chế và hướng phát triển",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, báo cáo tại mục 6.3 đã chỉ ra 3 hạn chế lớn trong module của em: (1) Chưa có Check Extensions: Khi bị chiếu, bot không tự động cộng thêm 1 ply độ sâu, khiến việc giải chiếu ở các thế cờ phức tạp bị nông. (2) Chưa có Singular Extensions: Không nhận diện được các nước đi độc đạo vượt trội (singular moves) để đào sâu riêng cho nước đó. (3) Bảng History Heuristic chưa phân biệt theo lịch sử nước đi trước (Countermove Heuristic và Continuation History chưa đầy đủ).",
      "deepExplanation": "Lộ trình nâng cấp nếu có thêm thời gian: (1) Cài đặt Singular Extensions: Nếu nước đi tốt nhất vượt trội hơn nước thứ hai một khoảng margin lớn, tự động mở rộng độ sâu thêm 1 ply để đào sâu dứt điểm. (2) Cài đặt Check Extensions: Luôn cộng 1 ply khi `board.is_check()` để không bị mù trước các đòn chiếu phối hợp. (3) Bổ sung Capture History Heuristic để phân loại các nước ăn quân tốt hơn nữa trong Quiescence Search.",
      "executionFlow": [
        "1. Hạn chế hiện tại: Thiếu Check Extension, thiếu Singular Extension, History thô",
        "2. Nâng cấp 1: Singular Extensions (đào sâu nước độc đạo)",
        "3. Nâng cấp 2: Check Extensions (mở rộng khi bị chiếu)",
        "4. Nâng cấp 3: C++ bindings cho SEE và Move Ordering để tăng tốc gấp 10 lần"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "Searcher._negamax",
        "lines": "1203-1280"
      },
      "concreteExample": "Nếu có Check Extensions, ở trận POS-10 bot đã có thể mở rộng từ depth 4 lên depth 5 khi xảy ra đòn chiếu phản công, tránh được việc bị mất Tượng.",
      "teacherFollowUps": [
        {
          "question": "Tại sao nhóm chưa cài đặt Singular Extensions trong phiên bản này?",
          "answer": "Dạ, vì Singular Extensions đòi hỏi phải chạy thêm một lần tìm kiếm phụ (reduced search) để kiểm tra xem nước thứ hai có kém xa nước thứ nhất không. Trong môi trường Python tốc độ 25,400 NPS, chi phí chạy thêm search phụ này sẽ làm giảm độ sâu chung của bot."
        }
      ],
      "commonMistakes": [
        "Khẳng định code của mình đã hoàn hảo không còn điểm yếu",
        "Không giải thích được chi phí tính toán của các kỹ thuật mở rộng độ sâu"
      ]
    },
    "tags": [
      "Limitations",
      "Future Work",
      "Singular Extensions",
      "Check Extensions",
      "Search Optimization"
    ]
  },
  {
    "id": "MEM-VUONG-16",
    "title": "Minh chứng Đóng góp Cá nhân và Commit Cốt lõi của Vương (Chương 6)",
    "question": "Theo Bảng 11 của báo cáo, Vương đóng góp 20% công việc với commit 28bcb01 (+84 dòng) và 65d71b3. Em hãy tóm tắt những đóng góp kỹ thuật cốt lõi của mình?",
    "category": "member",
    "topic": "trade-offs",
    "memberTarget": "vuong",
    "memberRole": "Sắp xếp nước đi & Cắt tỉa chọn lọc – Minh chứng sản phẩm",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ thưa thầy, trong các commit cốt lõi (28bcb01, 65d71b3) tại student/search.py, em đã trực tiếp thiết kế và cài đặt: Toàn bộ hàm sắp xếp nước đi `_order_moves()` với 8 bậc Heuristic ưu tiên, thuật toán đo đạc trao đổi tĩnh `see(board, move)` 1-ply, hàm tìm kiếm tĩnh `_quiescence()` tích hợp Delta Pruning (1,150 cp) và bảo vệ Tốt hàng 7, cùng toàn bộ hệ thống cắt tỉa chọn lọc nâng cao: Null Move Pruning động (R = 2 + floor(d/6)), Reverse Futility Pruning, Futility Pruning và Late Move Reductions (LMR).",
      "deepExplanation": "Những kỹ thuật của em đóng vai trò quyết định giúp thu hẹp cây tìm kiếm của bot: Nếu không có Move Ordering và các kỹ thuật cắt tỉa này, Searcher của Long sẽ chỉ đạt tối đa độ sâu 2 ply trong thời gian 1.1s. Nhờ có 8 bậc Heuristic và các cơ chế Pruning của em, bot đã mở rộng độ sâu lên 4-5 ply ổn định và duy trì tỷ lệ đi nước ngớ ngẩn (blunder) ở mức 0% tuyệt đối trong suốt 48 ván đấu chính thức.",
      "executionFlow": [
        "Commit của Vương bàn giao:",
        "- Hàm _order_moves 8 bậc Heuristic",
        "- Thuật toán see(board, move) 1-ply kiểm tra bắt quân an toàn",
        "- Hàm _quiescence() + Delta Pruning (1,150 cp)",
        "- Hệ thống Pruning: NMP (has_pieces guard), RFP (120*depth), FP (150 cp), LMR (index>=4)"
      ],
      "codeRef": {
        "file": "student/search.py",
        "functionName": "see & _order_moves & _quiescence",
        "lines": "287-435 và 703-1070"
      },
      "concreteExample": "Nhờ hàm _order_moves xếp nước ăn Mã đi lạc lên đầu tiên trong trận gặp Nhóm 13 (POS-03), bot đã tìm ra nước đi tối ưu chỉ sau 1.1 giây và tạo tiền đề cho chiến thắng 37 nước.",
      "teacherFollowUps": [
        {
          "question": "Vương phối hợp với Long và Việt như thế nào khi tích hợp code?",
          "answer": "Dạ, em gọi hàm evaluate của Việt trong _quiescence để tính stand_pat, và tích hợp _order_moves cùng các lệnh cắt tỉa vào vòng lặp _negamax của Long. Ba bạn chúng em đã kiểm thử tích hợp rất kỹ để không xảy ra lỗi lệch dấu điểm số."
        }
      ],
      "commonMistakes": [
        "Không nhớ mã commit chính của mình (28bcb01)",
        "Không nêu được tác động của Move Ordering tới độ sâu tìm kiếm"
      ]
    },
    "tags": [
      "Commit Proof",
      "Table 11",
      "Git",
      "Move Ordering",
      "28bcb01",
      "Pruning"
    ]
  },
{
    "id": "MEM-BACH-17",
    "title": "Bách - Q146: Phân bổ kiến trúc module giữa bot.py, search.py, evaluation.py và time_manager.py",
    "question": "Với vai trò trưởng nhóm và phụ trách kiến trúc, bạn đã phân bổ trách nhiệm giữa 4 module chính như thế nào để đảm bảo tính độc lập và dễ kiểm thử?",
    "category": "architecture",
    "topic": "architecture",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm & Kiến trúc hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em thiết kế hệ thống theo nguyên lý Single Responsibility Principle (Đơn nhiệm): bot.py đóng vai trò điều phối giao tiếp và xử lý ngoại lệ vòng ngoài; time_manager.py chuyên trách tính toán ngân sách thời gian động; search.py chịu trách nhiệm duyệt cây Alpha-Beta và sắp xếp nước đi; còn evaluation.py là module hàm thuần túy (pure function) lượng giá tĩnh thế cờ. Nhờ phân tách rạch ròi, mỗi thành viên có thể kiểm thử độc lập module của mình mà không sợ ảnh hưởng đến các phần còn lại.",
      "deepExplanation": "Theo Báo cáo Chương 3 và 4: 1. Nguyên tắc thiết kế kiến trúc: Tránh hiện tượng 'God Class' nơi toàn bộ logic bị nhồi vào một file duy nhất. 2. Luồng giao tiếp chuẩn hóa: - `bot.py` nhận payload JSON qua stdin, bóc tách thành đối tượng `SearchContext`, gọi `time_manager.allocate_time(context)` để lấy ngân sách `time_limit`. - Sau đó truyền `board` và `time_limit` vào `search.iterative_deepening_search(...)`. - Trong quá trình tìm kiếm, `search.py` chỉ tương tác với `evaluation.py` qua duy nhất một điểm chạm là hàm `evaluate(board)`. 3. Lợi ích kiểm thử: Em có thể viết mock test cho `search.py` với một hàm evaluate giả lập, hoặc kiểm thử `time_manager.py` với các kịch bản thời gian giả định mà không cần khởi động toàn bộ bàn cờ.",
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "BotGroup12",
        "lines": "L15-60"
      },
      "teacherFollowUps": [
        {
          "question": "Nếu cần thay đổi thuật toán lượng giá từ Heuristic sang Mạng nơ-ron (NNUE), kiến trúc hiện tại có đáp ứng được không?",
          "answer": "Dạ hoàn toàn đáp ứng được ngay lập tức, vì search.py chỉ phụ thuộc vào chữ ký hàm evaluate(board) trả về số nguyên int; ta chỉ cần thay đổi nội dung bên trong evaluation.py mà không cần sửa một dòng code nào trong search.py hay time_manager.py."
        },
        {
          "question": "Tại sao em không gộp time_manager vào trong bot.py cho gọn?",
          "answer": "Dạ, vì logic quản lý thời gian có nhiều tham số tinh chỉnh thực nghiệm phức tạp (k_risk, panic mode, ước lượng nước đi); tách riêng giúp bạn Long tập trung phát triển và kiểm thử thuật toán thời gian mà không làm xáo trộn mã nguồn giao tiếp bot."
        }
      ]
    },
    "tags": [
      "bach",
      "architecture",
      "srp",
      "module-coupling",
      "mock-testing"
    ]
  },
  {
    "id": "MEM-BACH-18",
    "title": "Bách - Q147: Cơ chế xử lý ngoại lệ vòng ngoài trong bot.py để ngăn chặn crash hệ thống",
    "question": "Nếu trong quá trình tìm kiếm hoặc lượng giá phát sinh lỗi runtime (ví dụ lỗi bộ nhớ, đệ quy quá sâu hoặc ngoại lệ thư viện), bot.py làm thế nào để đảm bảo bot không bị sập và vẫn trả về nước đi hợp lệ?",
    "category": "code",
    "topic": "code",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm & Kiến trúc hệ thống",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, trong hàm get_move của bot.py, em thiết lập cơ chế phòng vệ 2 lớp (Two-tier Fallback Defense): Ngay khi bắt đầu lượt đi, bot luôn lưu sẵn một nước đi hợp lệ đầu tiên (Fallback Move = list(board.legal_moves)[0]). Toàn bộ quá trình tính toán tìm kiếm được bọc kín trong khối try...except Exception. Nếu có bất kỳ lỗi runtime nào phát sinh, bot sẽ bắt ngoại lệ, ghi log ra stderr và lập tức gửi nước đi dự phòng fallback về cho trọng tài, đảm bảo 100% không bị xử thua do crash tiến trình.",
      "deepExplanation": "Theo thiết kế phòng vệ trong Báo cáo mục 4.1: 1. Môi trường thi đấu khắc nghiệt: Trong giải đấu ChessLab, một ngoại lệ không được bắt (unhandled exception) sẽ làm tiến trình Python kết thúc với mã lỗi phi 0, hệ thống trọng tài sẽ lập tức xử thua ngay mà không cần đợi hết giờ. 2. Cơ chế 2 tầng: - Tầng 1 (Default Fallback): `fallback_move = next(iter(board.legal_moves))` được lấy ra ngay trong 0.0001 giây đầu tiên. - Tầng 2 (Iterative Deepening Cache): Mỗi khi Iterative Deepening hoàn thành một độ sâu `d`, biến `best_move` của bot được cập nhật ngay. Nếu độ sâu `d+1` bị crash hoặc timeout, bot sử dụng kết quả tốt nhất của độ sâu `d`. - Tầng 3 (Universal Catch-all): Nếu ngay từ độ sâu 1 đã sập, bot gửi `fallback_move`. 3. Ghi log chuẩn: Mọi thông tin ngoại lệ và traceback được in ra `sys.stderr` để phục vụ hậu kiểm mà tuyệt đối không in vào `sys.stdout` làm hỏng luồng giao tiếp JSON.",
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "get_move",
        "lines": "L35-75"
      },
      "teacherFollowUps": [
        {
          "question": "Tại sao không để bot crash để lập trình viên dễ nhìn thấy lỗi mà lại trả về fallback move?",
          "answer": "Dạ, trong môi trường thi đấu tính điểm thực tế, gửi một nước đi dự phòng vẫn có cơ hội thủ hòa hoặc đối thủ mắc sai lầm, còn nếu để crash thì chắc chắn nhận 0 điểm ngay lập tức."
        },
        {
          "question": "Làm sao để biết bot đã từng phải dùng tới fallback move trong suốt giải đấu?",
          "answer": "Dạ, em kiểm tra log stderr sau giải đấu; kết quả ghi nhận bot không phải dùng fallback move do crash lần nào, chứng minh tính ổn định tuyệt đối của thuật toán."
        }
      ]
    },
    "tags": [
      "bach",
      "exception-safety",
      "fallback-move",
      "robustness",
      "two-tier-defense"
    ]
  },
  {
    "id": "MEM-BACH-19",
    "title": "Bách - Q148: Lý do lựa chọn Iterative Deepening làm khung điều phối tìm kiếm chính",
    "question": "Tại sao bạn quyết định sử dụng Iterative Deepening làm khung điều phối tìm kiếm chính trong bot.py thay vì gọi thẳng hàm Alpha-Beta với một độ sâu cố định?",
    "category": "search",
    "topic": "search",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm & Kiến trúc hệ thống",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em chọn Iterative Deepening vì 2 lý do sống còn trong thi đấu cờ chớp: (1) Tính chất giải thuật thời gian thực (Anytime Algorithm): Bot luôn có sẵn một nước đi tốt nhất hoàn chỉnh từ độ sâu trước đó để trả về bất cứ khi nào hết thời gian, loại bỏ hoàn toàn nguy cơ quá giờ; (2) Tối ưu hóa cắt tỉa: Kết quả nước đi tốt nhất và điểm số ở độ sâu d được nạp vào Transposition Table, trở thành hạt giống Move Ordering cho độ sâu d+1, giúp Alpha-Beta ở độ sâu lớn chạy nhanh hơn gấp nhiều lần.",
      "deepExplanation": "Theo Báo cáo mục 2.2 và 4.2: 1. Rủi ro của độ sâu cố định (Fixed-depth Search): Trong cờ vua, không thể biết trước một độ sâu cụ thể (ví dụ depth=5) sẽ mất 0.2 giây hay 10 giây để duyệt, vì hệ số phân nhánh phụ thuộc vào thế cờ. Nếu đặt cố định depth=5, ở những thế cờ phức tạp bot sẽ bị quá giờ (timeout) và bị xử thua. Nếu đặt quá thấp (depth=3) thì bot sẽ lãng phí thời gian ở những thế cờ đơn giản. 2. Bản chất Anytime Algorithm: Iterative Deepening duyệt tuần tự depth = 1, 2, 3, 4... Sau mỗi độ sâu hoàn tất, ta ghi nhận `best_move = current_depth_best`. Khi đồng hồ chạm ngưỡng dừng (`elapsed >= time_limit`), bot lập tức ngắt vòng lặp và trả về kết quả gần nhất. 3. Nghịch lý hiệu năng: Duyệt lặp dường như tốn thêm chi phí duyệt lại các độ sâu 1..d-1, nhưng trong cây phân nhánh mũ b ≈ 3-4, tổng số nút của các độ sâu trước chỉ chiếm khoảng 25-30% của độ sâu cuối cùng. Chi phí nhỏ này được bù đắp vượt trội nhờ việc bảng TT đã được lấp đầy, giúp Alpha-Beta ở độ sâu cuối tìm ra nước đi tốt nhất ngay từ nhánh đầu tiên.",
      "codeRef": {
        "file": "student/search.py",
        "functionName": "iterative_deepening_search",
        "lines": "L65-115"
      },
      "teacherFollowUps": [
        {
          "question": "Tổng số nút duyệt lại từ độ sâu 1 đến d-1 chiếm bao nhiêu phần trăm so với độ sâu d?",
          "answer": "Dạ, theo công thức cấp số nhân với hệ số rẽ nhánh b >= 3, tổng số nút từ 1 đến d-1 xấp xỉ 1 / (b - 1) <= 1/2 = 33% số nút ở độ sâu d; đây là overhead hoàn toàn chấp nhận được."
        },
        {
          "question": "Nếu thời gian còn lại rất ít, Iterative Deepening có bắt đầu độ sâu mới không?",
          "answer": "Dạ không, trước khi bước vào độ sâu d+1, bot kiểm tra nếu thời gian đã trôi qua vượt quá 50% ngân sách cho phép thì sẽ dừng ngay vì xác suất hoàn thành độ sâu mới là rất thấp."
        }
      ]
    },
    "tags": [
      "bach",
      "iterative-deepening",
      "anytime-algorithm",
      "move-ordering-seed",
      "time-safety"
    ]
  },
  {
    "id": "MEM-BACH-20",
    "title": "Bách - Q149: Xử lý thông điệp JSON bất thường qua stdin và an toàn giao tiếp",
    "question": "Nếu nền tảng thi đấu ChessLab gửi một chuỗi JSON không đúng định dạng hoặc thiếu các trường dữ liệu qua stdin, bot.py sẽ xử lý như thế nào?",
    "category": "architecture",
    "topic": "architecture",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm & Kiến trúc hệ thống",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, trong module bot.py, em sử dụng phương thức bóc tách dữ liệu an toàn với json.loads bọc trong khối try...except json.JSONDecodeError, kết hợp với phương thức dict.get() có giá trị mặc định cho từng trường (ví dụ: data.get('time_left', 60.0)). Nếu toàn bộ chuỗi JSON bị hỏng, bot sẽ bắt lỗi, khôi phục trạng thái gần nhất hoặc trả về phản hồi lỗi an toàn thay vì để tiến trình crash.",
      "deepExplanation": "1. Giao thức giao tiếp chuẩn ChessLab: Hệ thống gửi thông điệp qua luồng stdin dưới dạng một dòng JSON duy nhất chứa `fen`, `time_left`, `time_opponent`, `increment`... 2. Kỹ thuật phòng thủ dữ liệu đầu vào: - `json.loads(line)`: Được bảo vệ để không văng ngoại lệ cú pháp. - Khởi tạo `SearchContext`: Thay vì truy cập trực tiếp `data['time_left']` (dễ gây KeyError), em dùng `data.get('time_left', DEFAULT_TIME)`. - Kiểm tra tính hợp lệ của FEN: Sử dụng `chess.Board(fen)` để kiểm tra; nếu FEN không hợp lệ, bot sẽ khởi tạo bàn cờ mặc định. 3. Đảm bảo tính sạch sẽ của stdout: Chỉ in duy nhất chuỗi JSON phản hồi chứa `move`. Mọi thông tin debug hoặc thông báo lỗi cú pháp đều được định tuyến về `sys.stderr`.",
      "codeRef": {
        "file": "student/bot.py",
        "functionName": "main / handle_message",
        "lines": "L80-120"
      },
      "teacherFollowUps": [
        {
          "question": "Tại sao việc gọi print() thông thường trong Python có thể làm hỏng giao tiếp của bot?",
          "answer": "Dạ, vì print() mặc định xuất ra stdout; nếu in một câu chữ tự do, trọng tài ChessLab khi đọc stdout sẽ parse JSON thất bại và phạt xử thua bot ngay lập tức."
        },
        {
          "question": "Làm thế nào để bảo đảm Python không đệm dòng (buffer) khi in ra stdout?",
          "answer": "Dạ, em dùng print(..., flush=True) hoặc gọi sys.stdout.flush() ngay sau khi xuất phản hồi để dữ liệu được đẩy tức thì qua pipe đến trọng tài."
        }
      ]
    },
    "tags": [
      "bach",
      "json-parsing",
      "dict-get",
      "stdin-stdout",
      "flush-pipe"
    ]
  },
  {
    "id": "MEM-BACH-21",
    "title": "Bách - Q150: Quy trình quản lý đóng góp thành viên và phê duyệt mã nguồn (Code Review)",
    "question": "Với vai trò trưởng nhóm, bạn đã tổ chức quy trình làm việc trên Git, phân công nhiệm vụ và phê duyệt các đóng góp (Pull Request) của các thành viên như thế nào?",
    "category": "architecture",
    "topic": "architecture",
    "memberTarget": "bach",
    "memberRole": "Trưởng nhóm & Kiến trúc hệ thống",
    "difficulty": "basic",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em phân chia ranh giới sở hữu module rất rõ ràng theo thế mạnh của từng bạn: Long phụ trách time_manager.py và log thực nghiệm; Việt phụ trách evaluation.py và tri thức Chess960; Vương phụ trách search.py và thuật toán tối ưu; còn em quản lý bot.py, tích hợp hệ thống và kiểm thử. Nhóm sử dụng mô hình Git Feature Branch: mọi thành viên tạo nhánh riêng, chạy qua bộ test tự động đạt yêu cầu mới được tạo PR và em là người review cuối cùng trước khi merge vào main.",
      "deepExplanation": "Theo Báo cáo Chương 6 về tổ chức và phân công: 1. Ranh giới module để tránh xung đột mã nguồn (Merge Conflicts): Nhờ 4 module nằm ở 4 file tách biệt, các thành viên có thể commit độc lập hàng ngày mà hầu như không bao giờ bị xung đột code. 2. Tiêu chí phê duyệt (Definition of Done) cho một PR: - Mã nguồn phải tuân thủ quy chuẩn PEP 8. - Không được làm thay đổi chữ ký các hàm công khai đã thỏa thuận. - Phải vượt qua bài test tính đúng đắn và không làm giảm tốc độ duyệt NPS của hệ thống. 3. Họp định kỳ và đối soát: Nhóm tổ chức trao đổi sau mỗi đợt thi đấu thử nghiệm để cùng nhau mổ xẻ file log ván đấu, xác định nguyên nhân thắng thua và lên danh sách các đầu việc cải tiến tiếp theo.",
      "codeRef": {
        "file": "team.json",
        "functionName": "team_members",
        "lines": "L1-30"
      },
      "teacherFollowUps": [
        {
          "question": "Khi hai thành viên có quan điểm trái ngược nhau về một tham số (ví dụ tăng hay giảm an toàn Vua), em giải quyết thế nào?",
          "answer": "Dạ, em giải quyết hoàn toàn bằng số liệu thực nghiệm: cho hai phiên bản mang hai bộ tham số đó đấu đối đầu trực tiếp 20 ván trên cùng một máy; phiên bản nào có tỷ lệ thắng cao hơn sẽ được chọn."
        },
        {
          "question": "Em đánh giá thành viên nào có đóng góp mang tính kỹ thuật thử thách nhất trong nhóm?",
          "answer": "Dạ, em đánh giá module search.py của bạn Vương và time_manager.py của bạn Long đều rất thử thách: Vương phải giải quyết bài toán đệ quy cắt tỉa phức tạp, còn Long phải chịu áp lực bảo đảm 0% lỗi quá giờ."
        }
      ]
    },
    "tags": [
      "bach",
      "team-management",
      "git-workflow",
      "code-review",
      "conflict-resolution"
    ]
  },
  {
    "id": "MEM-LONG-17",
    "title": "Long - Q151: Thiết kế hàm allocate_time đối phó với độ trễ jitter và chế độ khẩn cấp",
    "question": "Bạn đã thiết kế thuật toán phân bổ thời gian trong time_manager.py như thế nào để đối phó với hiện tượng trễ mạng/hệ điều hành (jitter) và khi nào bot kích hoạt chế độ khẩn cấp (Panic Mode)?",
    "category": "time-management",
    "topic": "time-management",
    "memberTarget": "long",
    "memberRole": "Quản lý thời gian & Thực nghiệm",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em thiết kế thuật toán 3 lớp bảo vệ: (1) Trừ trước biên độ an toàn cố định SAFETY_MARGIN = 0.15s cho độ trễ truyền thông I/O; (2) Phân bổ ngân sách cơ sở theo số nước đi dự kiến còn lại T_base = remaining / moves_left; (3) Kích hoạt chế độ khẩn cấp Panic Mode khi thời gian còn lại dưới 5.0 giây: lúc này bot chuyển sang trần ngân sách cố định 0.2 - 0.4 giây/nước và giới hạn độ sâu tối đa 2 ply để đi ngay lập tức, triệt tiêu hoàn toàn nguy cơ quá giờ.",
      "deepExplanation": "Theo Báo cáo mục 4.1 và student/time_manager.py: 1. Đo lường hiện tượng Jitter thực tế: Trong hệ thống chấm thi đấu, độ trễ từ khi bot in ra stdout đến khi trọng tài ghi nhận có thể dao động từ 10ms đến 150ms tùy vào tải CPU của máy chủ. Nếu bot dùng hết 100% ngân sách mà không có khoảng đệm, jitter sẽ làm bot thua timeout. 2. Công thức phân bổ chi tiết: - Ngân sách khả dụng thực tế: `usable_time = max(0.0, time_left - SAFETY_MARGIN)`. - Ước lượng số nước còn lại: `moves_left = max(15, 50 - ply//2)`. - Ngân sách cơ sở: `allocated = usable_time / moves_left + increment * 0.8`. 3. Chế độ khẩn cấp (Panic Mode): Khi `time_left < 5.0s`, nếu tiếp tục tính toán bình thường bot có thể gặp sự cố dọn rác (GC pause) của Python gây sập. Em áp dụng: `if time_left < 3.0: return min(0.3, usable_time * 0.1)`. Cơ chế này đã bảo vệ bot an toàn tuyệt đối trong các ván cờ marathon kéo dài trên 80 nước.",
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "allocate_time",
        "lines": "L30-75"
      },
      "teacherFollowUps": [
        {
          "question": "Tại sao hệ số cộng thêm thời gian increment chỉ nhân 0.8 mà không dùng hết 100%?",
          "answer": "Dạ, vì 20% còn lại của increment được giữ lại để tích lũy dần vào quỹ thời gian dự phòng, giúp đồng hồ của bot tăng dần trở lại ở tàn cuộc."
        },
        {
          "question": "Nếu thời gian còn lại của bot chỉ còn 0.5 giây thì hàm trả về bao nhiêu?",
          "answer": "Dạ, khi đó hàm trả về giá trị tối thiểu MIN_TIME = 0.05 giây để bot trả về nước đi đầu tiên hợp lệ trong chớp mắt mà không bị trừ hết giờ."
        }
      ]
    },
    "tags": [
      "long",
      "time-management",
      "jitter-defense",
      "panic-mode",
      "safety-margin"
    ]
  },
  {
    "id": "MEM-LONG-18",
    "title": "Long - Q152: Nguồn gốc và lý do lựa chọn hệ số rủi ro k_risk = 0.005",
    "question": "Trong mã nguồn time_manager.py, hệ số rủi ro k_risk = 0.005 có ý nghĩa toán học gì và bạn đã dựa trên cơ sở thực nghiệm nào để xác định giá trị này?",
    "category": "time-management",
    "topic": "time-management",
    "memberTarget": "long",
    "memberRole": "Quản lý thời gian & Thực nghiệm",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, hệ số k_risk = 0.005 là tham số điều chỉnh độ dốc của hàm phạt rủi ro thời gian. Nó được dùng để tính toán biên độ an toàn động: khi thời gian còn dồi dào, biên độ an toàn nhỏ để tận dụng tối đa thời gian suy nghĩ; khi thời gian giảm dần, biên độ an toàn tự động phình to theo hàm phi tuyến để ép bot phải ra quyết định nhanh hơn. Con số 0.005 được em tìm ra sau loạt 40 ván đấu thử nghiệm mô phỏng độ trễ ngẫu nhiên.",
      "deepExplanation": "Theo Báo cáo mục 4.5 và thông số PARAM-03: 1. Ý nghĩa mô hình toán: Công thức biên độ an toàn động có dạng: `Dynamic_Margin = Base_Margin + k_risk * (Initial_Time - Current_Time)^1.5`. Khi mới vào trận (`Current_Time` xấp xỉ `Initial_Time`), số hạng phạt bằng 0. Khi trận đấu trôi về cuối, khoảng đệm an toàn tự động tăng lên để chống lại sự mệt mỏi của tiến trình (bộ nhớ đầy, garbage collector hoạt động nhiều hơn). 2. Quá trình thực nghiệm đối chứng: - Thử nghiệm với `k_risk = 0.02`: Bot quá nhút nhát, ở nước thứ 20 đã co cụm suy nghĩ dưới 0.5s, làm độ sâu tụt giảm nghiêm trọng và thua cờ chiến thuật. - Thử nghiệm với `k_risk = 0.001`: Bot quá mạo hiểm, dẫn tới 2 ván bị thua timeout ở nước 65 do độ trễ mạng tăng đột biến. - Kết quả với `k_risk = 0.005`: Đạt điểm cân bằng tối ưu hoàn hảo, 0% lỗi timeout và độ sâu trung bình duy trì mức 4.2 ply.",
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "allocate_time",
        "lines": "L40-70"
      },
      "teacherFollowUps": [
        {
          "question": "Nếu thời gian ban đầu của ván đấu là 300 giây thay vì 60 giây thì k_risk có cần đổi không?",
          "answer": "Dạ có, khi thời gian lớn hơn thì k_risk cần giảm xuống tỷ lệ nghịch để tránh việc biên độ an toàn tăng quá nhanh ở giai đoạn đầu."
        },
        {
          "question": "k_risk tác động như thế nào đến tâm lý thi đấu của bot?",
          "answer": "Dạ, k_risk đóng vai trò như một 'chiếc phanh hãm' giúp bot chuyển trạng thái mượt mà từ phong cách suy nghĩ sâu ở trung cuộc sang phong cách đi nhanh dứt khoát ở tàn cuộc."
        }
      ]
    },
    "tags": [
      "long",
      "k-risk",
      "time-tuning",
      "empirical-optimization",
      "dynamic-margin"
    ]
  },
  {
    "id": "MEM-LONG-19",
    "title": "Long - Q153: Xử lý ngân sách thời gian khi ván cờ kéo dài vượt quá dự kiến (Marathon Games)",
    "question": "Nếu một ván cờ kéo dài tới nước 90 hay 120 (vượt xa con số 40-50 nước thông thường), thuật toán time_manager của bạn làm thế nào để không bị chia cho 0 và không bị cạn sạch thời gian?",
    "category": "time-management",
    "topic": "time-management",
    "memberTarget": "long",
    "memberRole": "Quản lý thời gian & Thực nghiệm",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em sử dụng kỹ thuật 'Cửa sổ trượt dự phóng nước đi' (Sliding Move Window) với hàm max bảo vệ: moves_left = max(MIN_LOOKAHEAD_MOVES, ESTIMATED_TOTAL - ply//2). Bằng cách cố định MIN_LOOKAHEAD_MOVES = 12 đến 15 nước, mẫu số không bao giờ chạm tới 0 và bot luôn luôn coi rằng ván đấu còn ít nhất 15 nước nữa để phân bổ đều số giây còn lại.",
      "deepExplanation": "Theo phân tích ván đấu POS-08 và POS-09 trong Báo cáo: 1. Vấn đề của mô hình tĩnh: Nếu dùng công thức ngây thơ `moves_left = 40 - move_number`, khi ván cờ bước sang nước 41, mẫu số bị âm hoặc bằng 0 gây lỗi `ZeroDivisionError`, hoặc nếu xử lý bằng cách lấy hết thời gian thì bot sẽ chết đứng ở nước 42. 2. Cơ chế cửa sổ trượt của em: - Khi `move_number < 30`: Ước tính ván cờ kéo dài khoảng 50 nước, `moves_left` giảm dần từ 50 xuống 20. - Khi `move_number >= 35`: `moves_left` chạm ngưỡng sàn `MIN_LOOKAHEAD_MOVES = 15` và giữ nguyên là 15 cho dù ván cờ kéo dài đến nước 80 hay nước 120. 3. Kết hợp với bước nhảy thời gian cộng thêm (Increment): Ở mỗi nước đi, bot nhận thêm ví dụ +1 giây increment; phân bổ `usable_time / 15 + 0.8` đảm bảo bot luôn có khoảng 0.8 - 1.2 giây cho mỗi nước đi vô tận mà không bao giờ cạn kiệt đồng hồ.",
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "allocate_time",
        "lines": "L35-65"
      },
      "teacherFollowUps": [
        {
          "question": "Nếu ván đấu hoàn toàn không có thời gian cộng thêm (no increment) thì cửa sổ trượt có cứu được bot không?",
          "answer": "Dạ có, nếu không có increment, quỹ thời gian sẽ giảm tiệm cận về 0 theo cấp số nhân (mỗi nước dùng 1/15 số thời gian còn lại: 10s -> 9.3s -> 8.7s...), bot vẫn đi được thêm 30-40 nước nữa ở chế độ cực nhanh."
        },
        {
          "question": "Kỷ lục ván đấu dài nhất của nhóm ở giải đấu là bao nhiêu nước?",
          "answer": "Dạ là ván POS-09 kéo dài 123 nước, bot vận hành cơ chế cửa sổ trượt hoàn hảo và kết thúc bằng chiến thắng chiếu hết."
        }
      ]
    },
    "tags": [
      "long",
      "marathon-games",
      "sliding-window",
      "zero-division-prevention",
      "endgame-resilience"
    ]
  },
  {
    "id": "MEM-LONG-20",
    "title": "Long - Q154: Khác biệt trong phân bổ thời gian giữa khai cuộc Chess960, trung cuộc và tàn cuộc",
    "question": "Chiến lược phân bổ thời gian của bạn có sự khác biệt như thế nào giữa giai đoạn khai cuộc Chess960, giai đoạn trung cuộc nhiều biến động và giai đoạn tàn cuộc ít quân?",
    "category": "time-management",
    "topic": "time-management",
    "memberTarget": "long",
    "memberRole": "Quản lý thời gian & Thực nghiệm",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, chiến lược của em là phân bổ hình chuông lệch (Skewed Bell Curve): (1) Khai cuộc Chess960: Dùng thời gian vừa phải (1.5 - 2.0s) để định vị quân và kiểm soát trung tâm vì không có sách khai cuộc; (2) Trung cuộc (nước 15 - 35): Dồn ngân sách tối đa (2.5 - 4.0s) vì đây là giai đoạn bùng nổ chiến thuật quyết định ván đấu; (3) Tàn cuộc: Rút ngắn thời gian (0.8 - 1.5s) vì số lượng quân ít, bảng TT phát huy hiệu quả cao và cần giữ thời gian cho các nước dứt điểm.",
      "deepExplanation": "Theo Báo cáo mục 4.1 và đồ thị phân bổ thời gian: 1. Đặc thù Chess960 ở Khai cuộc: Trong cờ truyền thống, bot có thể dùng Opening Book để đi ngay trong 0.001s. Nhưng trong Chess960, thế trận hoàn toàn mới lạ; tuy nhiên ở 5 nước đầu tiên, cây tìm kiếm chưa bị đe dọa chiến thuật chết người nên không cần dồn quá nhiều thời gian, duy trì mức 1.5s là tối ưu. 2. Trọng tâm Trung cuộc: Giai đoạn các quân nặng và nhẹ bắt đầu va chạm. Một sai lầm ở trung cuộc sẽ dẫn tới mất quân không thể cứu vãn. Do đó, hàm thời gian cấp phát hệ số trọng số `Phase_Weight = 1.3` cho giai đoạn này để bot có thể tìm kiếm sâu thêm 1 ply. 3. Đơn giản hóa ở Tàn cuộc: Khi chỉ còn vài quân trên bàn cờ, hệ số rẽ nhánh giảm từ 35 xuống chỉ còn 10-15 nước đi hợp lệ. Tốc độ duyệt của thuật toán tự động tăng lên, do đó chỉ cần 1 giây là bot đã đạt được độ sâu 5-6 ply.",
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "allocate_time",
        "lines": "L25-60"
      },
      "teacherFollowUps": [
        {
          "question": "Làm thế nào để hàm allocate_time nhận biết ván cờ đang ở giai đoạn nào?",
          "answer": "Dạ, em dựa vào hai chỉ số: số lượt đi đã qua (ply) và tổng số quân cờ còn lại trên bàn cờ được truyền trong đối tượng SearchContext."
        },
        {
          "question": "Nếu ở trung cuộc phát hiện đối phương có nước đi duy nhất thì thời gian có giảm không?",
          "answer": "Dạ, nếu đối phương chỉ có 1 nước đi thì thế cờ rất dễ đoán, nhưng bot vẫn cần tính kỹ phản ứng của mình ở nước tiếp theo nên vẫn giữ thời gian hợp lý."
        }
      ]
    },
    "tags": [
      "long",
      "game-phases",
      "chess960-opening",
      "middlegame-peak",
      "endgame-reduction"
    ]
  },
  {
    "id": "MEM-LONG-21",
    "title": "Long - Q155: Quan điểm về việc điều chỉnh thời gian suy nghĩ dựa trên đồng hồ của đối thủ",
    "question": "Trong SearchContext có chứa thông tin time_opponent. Tại sao nhóm chưa sử dụng thông số này để thay đổi thời gian suy nghĩ của bot, và nếu áp dụng thì bạn sẽ thiết kế chiến lược gì?",
    "category": "time-management",
    "topic": "time-management",
    "memberTarget": "long",
    "memberRole": "Quản lý thời gian & Thực nghiệm",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, nhóm chưa can thiệp vì ưu tiên hàng đầu của giải này là 'sự ổn định nội tại' - tập trung tối ưu chất lượng nước đi của chính mình trước khi tính đến tâm lý đối thủ. Nếu áp dụng trong tương lai, em sẽ thiết kế chiến lược 'Tăng tốc gây áp lực' (Pace Acceleration): Khi time_opponent < 10 giây trong khi bot còn nhiều thời gian, bot sẽ chủ động giảm thời gian suy nghĩ xuống còn 0.5s ở các nước đi cân bằng để buộc đối thủ phải liên tục phản xạ trong áp lực cạn giờ.",
      "deepExplanation": "Theo thảo luận định hướng trong Báo cáo Chương 6: 1. Rủi ro khi phụ thuộc vào đồng hồ đối thủ: Nếu thuật toán thấy đối thủ còn ít thời gian mà tự ý đi ẩu (đi quá nhanh để ép giờ) trong một thế cờ phức tạp, bot có thể mắc sai lầm chiến thuật tự sát và biến ván thắng thành ván thua. Vì vậy, nguyên tắc an toàn số 1 là: Nước đi phải đảm bảo độ sâu tối thiểu rồi mới được tính đến yếu tố thời gian đối thủ. 2. Kịch bản ứng dụng khả thi (Time-pressure Exploitation): - Điều kiện kích hoạt: `time_opponent < 8.0` và `time_left > 25.0` và thế cờ đang có ưu thế (`eval >= 0`). - Hành vi: Bot ưu tiên chọn các nước đi tạo nhiều lời đe dọa (Threats) và giảm ngân sách của mình xuống còn 0.8s để gửi đòn đánh liên hồi, khiến đối thủ không kịp xử lý pipe I/O và sụp đổ vì timeout. 3. Kết luận: Đây là một tính năng nâng cao rất hấp dẫn cho phiên bản tiếp theo.",
      "codeRef": {
        "file": "student/time_manager.py",
        "functionName": "allocate_time",
        "lines": "L20-55"
      },
      "teacherFollowUps": [
        {
          "question": "Có khi nào đối thủ cố tình câu giờ để bot của mình bị ảnh hưởng không?",
          "answer": "Dạ không, vì đồng hồ của mỗi bên chạy độc lập; khi đối thủ đang suy nghĩ thì đồng hồ của đối thủ bị trừ còn đồng hồ của nhóm đứng yên."
        },
        {
          "question": "Trong giải đấu, ván thắng nào của nhóm in đậm dấu ấn chênh lệch đồng hồ nhất?",
          "answer": "Dạ là ván POS-07, đối thủ cạn kiệt thời gian và thua timeout ở nước 42 trong khi bot của nhóm vẫn còn tới 28 giây thảnh thơi."
        }
      ]
    },
    "tags": [
      "long",
      "opponent-clock",
      "time-pressure-strategy",
      "future-design",
      "risk-control"
    ]
  },
  {
    "id": "MEM-VIET-17",
    "title": "Việt - Q156: Cấu trúc phân tầng điểm số trong hàm evaluate() và lý do thiết kế",
    "question": "Bạn đã cấu trúc các thành phần điểm số trong hàm evaluate() như thế nào và tại sao lại lựa chọn thứ tự ưu tiên: Vật chất -> Vị trí PST -> An toàn Vua -> Cặp Tượng/Tốt thông?",
    "category": "evaluation",
    "topic": "evaluation",
    "memberTarget": "viet",
    "memberRole": "Lượng giá & Tri thức cờ Chess960",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em thiết kế hàm evaluate theo mô hình cộng dồn phân tầng (Layered Additive Model): Vật chất là nền tảng cốt lõi chiếm trọng số áp đảo (>80%); Bảng PST định hướng vị trí và phát triển quân chiếm ~10%; An toàn Vua đóng vai trò bảo vệ sống còn (~5%); Cặp Tượng và Tốt thông mang tính tinh chỉnh cục diện (~5%). Cấu trúc phân tầng này đảm bảo bot không bao giờ vì một ưu thế vị trí trừu tượng mà đánh đổi mất trắng quân cờ của mình.",
      "deepExplanation": "Theo Báo cáo mục 4.4 và student/evaluation.py: 1. Công thức tổng quát: `Score = Material_Score + PST_Score + King_Safety_Score + Minor_Tactical_Bonuses`. 2. Lý giải tính ưu tiên: - Vật chất (Material): Là yếu tố quyết định nhất trong cờ vua. Mất một quân Xe (-500 cp) không thể bù đắp bằng việc đứng ở ô đẹp (+30 cp). Do đó, điểm vật chất phải là trục xương sống tuyệt đối. - Vị trí (PST - Piece-Square Tables): Giúp các quân cờ di chuyển có mục đích, hướng về trung tâm và kiểm soát không gian ngay cả khi chưa có cơ hội bắt quân. - An toàn Vua (King Safety): Vua bị hở sườn có thể dẫn tới bị chiếu hết tức khắc. Trừ điểm các ô mở quanh Vua giúp bot ý thức được việc nhập thành và giữ khiên Tốt bảo vệ Vua. - Điểm thưởng cặp Tượng (+30 cp) và Tốt thông (+20 cp): Giúp bot đánh giá sắc bén hơn ở tàn cuộc mở nơi hai Tượng khống chế bàn cờ hoặc Tốt thông sắp hóa Hậu. 3. Tối ưu mã nguồn: Toàn bộ phép tính được thực hiện bằng số nguyên và phép cộng/trừ cơ bản để duy trì tốc độ hàm evaluate cực cao (~40,000 evaluations/giây).",
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "L15-65"
      },
      "teacherFollowUps": [
        {
          "question": "Tại sao em không thêm các đánh giá phức tạp như Tốt chồng, Tốt cô lập hay quyền kiểm soát cột mở?",
          "answer": "Dạ, vì việc duyệt các cấu trúc Tốt phức tạp bằng Python thuần làm tăng thời gian thực thi hàm evaluate lên gấp 3 lần, khiến tốc độ duyệt tụt giảm nghiêm trọng và bot không nhìn sâu được bằng đối thủ."
        },
        {
          "question": "Điểm của hàm evaluate trả về là từ góc nhìn của ai?",
          "answer": "Dạ, luôn trả về từ góc nhìn của bên đang đến lượt đi (Relative Score: dương là có lợi cho bên đi, âm là bất lợi), tương thích hoàn hảo với thuật toán Negamax."
        }
      ]
    },
    "tags": [
      "viet",
      "evaluation-architecture",
      "material-first",
      "pst-layer",
      "relative-score"
    ]
  },
  {
    "id": "MEM-VIET-18",
    "title": "Việt - Q157: Lý do phải trung hòa bảng Piece-Square Table (PST) trong Chess960",
    "question": "Tại sao bảng Piece-Square Table chuẩn của cờ vua truyền thống không thể áp dụng nguyên bản cho Chess960 mà bắt buộc bạn phải tiến hành trung hòa (flatten/neutralize)?",
    "category": "evaluation",
    "topic": "chess960",
    "memberTarget": "viet",
    "memberRole": "Lượng giá & Tri thức cờ Chess960",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, vì bảng PST truyền thống được 'may đo' riêng cho thế xuất phát cố định SP-518 (Mã ở b1/g1, Tượng ở c1/f1, Vua ở e1). Trong Chess960, các quân xuất phát ở vị trí hoàn toàn ngẫu nhiên (ví dụ Vua ở b1, Xe ở e1, Tượng ở a1). Nếu giữ nguyên PST chuẩn, bot sẽ phạt điểm nặng nề một quân cờ chỉ vì nó sinh ra ở vị trí đó (ví dụ phạt Tượng ở góc a1), khiến bot vội vàng đi những nước vô nghĩa chỉ để đưa quân vào các ô mà PST cờ chuẩn coi là đẹp.",
      "deepExplanation": "Theo Báo cáo mục 4.4 về thích ứng Chess960: 1. Sai lệch của PST truyền thống: Trong cờ truyền thống, ô g1 hay c1 là nơi Vua nhập thành an toàn nên được cộng điểm cao. Nhưng trong Chess960, Vua có thể đã đứng ở b1 ngay từ nước đầu. Nếu PST ép Vua phải đi về g1, bot sẽ phí mất vài nước đi di chuyển Vua đi lang thang giữa bàn cờ và bị đối thủ tấn công. 2. Giải pháp trung hòa của em: - Làm phẳng các giá trị ở hàng 1 và hàng 8 (Back-rank Neutralization): Giảm biên độ chênh lệch điểm số giữa các ô ở hàng đáy, chỉ giữ lại xu hướng khuyến khích phát triển quân lên phía trước (hàng 2, 3, 4). - Giữ nguyên trọng số trung tâm: Các ô trung tâm (d4, d5, e4, e5) vẫn giữ nguyên giá trị thưởng cao cho Mã và Tốt, vì trong mọi biến thể Chess960, kiểm soát trung tâm luôn là chân lý chiến lược bất biến. 3. Kết quả: Bot nhập cuộc tự nhiên, không bị 'ngáo cờ' ở những nước khai cuộc đầu tiên.",
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "PST_TABLES",
        "lines": "L30-80"
      },
      "teacherFollowUps": [
        {
          "question": "Quân nào trong Chess960 chịu ảnh hưởng xấu nhất nếu không trung hòa PST?",
          "answer": "Dạ là quân Tượng và quân Hậu; Tượng nằm ở góc bàn cờ nếu bị trừ điểm quá nặng sẽ khiến bot vội vã đẩy Tốt mở đường mà không quan tâm đến an toàn phòng thủ."
        },
        {
          "question": "Em kiểm tra bảng PST trung hòa này như thế nào?",
          "answer": "Dạ, em cho bot chạy thử nghiệm trên 20 thế cờ Chess960 kỳ dị nhất (Vua ở mép, Hậu ở góc) và xác nhận bot không đi các nước Vua lang thang ở 5 nước đầu tiên."
        }
      ]
    },
    "tags": [
      "viet",
      "pst-neutralization",
      "chess960-adaptation",
      "back-rank-flattening",
      "center-control"
    ]
  },
  {
    "id": "MEM-VIET-19",
    "title": "Việt - Q158: Thuật toán đánh giá an toàn Vua và nguồn gốc con số phạt 15 centipawns",
    "question": "Thuật toán King Safety của bạn hoạt động như thế nào và tại sao bạn lại chọn mức phạt 15 centipawns cho mỗi ô mở quanh Vua thay vì một con số lớn hơn?",
    "category": "evaluation",
    "topic": "evaluation",
    "memberTarget": "viet",
    "memberRole": "Lượng giá & Tri thức cờ Chess960",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, thuật toán King Safety của em kiểm tra 'tấm khiên Tốt' (Pawn Shield) trên 8 ô lân cận xung quanh ô đứng của Vua. Cứ mỗi cột liền kề phía trước Vua mà không có quân Tốt che chắn (cột mở hoặc nửa mở), bot sẽ phạt 15 cp. Con số 15 cp (tương đương 0.15 Tốt) được em chọn vì nó đủ lớn để thôi thúc bot nhập thành và giữ Tốt che Vua, nhưng không quá lớn để làm tê liệt bot, giúp bot vẫn dám dâng Tốt tấn công khi có cơ hội.",
      "deepExplanation": "Theo Báo cáo mục 4.4 và mã nguồn evaluation.py: 1. Cơ chế kiểm tra an toàn Vua: - Xác định vị trí `king_square = board.king(color)`. - Quét 3 ô ở hàng phía trước Vua (ví dụ Vua Trắng ở g1 thì kiểm tra f2, g2, h2). - Nếu ô đó bị trống (Tốt đã đẩy đi hoặc bị bắt), tăng biến đếm `open_files += 1`. - `Penalty = open_files * 15`. 2. Căn cứ thực nghiệm cho con số 15 cp: - Nếu phạt 30-50 cp (quá nặng): Bot mắc hội chứng 'hoang tưởng sợ hãi', không bao giờ dám đẩy bất kỳ quân Tốt nào ở cánh Vua để mở đường phản công, dẫn tới thế cờ bị đối phương bóp nghẹt. - Nếu phạt dưới 5 cp (quá nhẹ): Bot hoàn toàn bàng quan trước việc Vua bị lột sạch giáp Tốt, dễ dàng bị đối phương dùng Xe và Hậu chồng cột chiếu hết. - 15 cp là điểm cân bằng hoàn hảo, giúp bot duy trì tấm khiên 2-3 Tốt quanh Vua trong suốt trung cuộc.",
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "_evaluate_king_safety",
        "lines": "L70-105"
      },
      "teacherFollowUps": [
        {
          "question": "Ở giai đoạn tàn cuộc, thuật toán King Safety này có nên tiếp tục áp dụng không?",
          "answer": "Dạ không, ở tàn cuộc Vua cần phải rời khỏi nơi trú ẩn để xông ra trung tâm trợ chiến cho Tốt; nếu tiếp tục phạt Vua hở sườn thì Vua sẽ sợ hãi trốn ở góc bàn cờ và thua cuộc."
        },
        {
          "question": "Làm thế nào để tắt King Safety ở tàn cuộc?",
          "answer": "Dạ, em kiểm tra tổng điểm vật chất quân nặng của đối phương; nếu đối phương không còn Hậu và chỉ còn 1 quân nhẹ thì King Safety tự động giảm về 0."
        }
      ]
    },
    "tags": [
      "viet",
      "king-safety",
      "pawn-shield",
      "15-centipawns",
      "parameter-justification"
    ]
  },
  {
    "id": "MEM-VIET-20",
    "title": "Việt - Q159: Triển khai đánh giá cặp Tượng (+30 cp) và Tốt thông (+20 cp)",
    "question": "Bạn đã triển khai việc nhận diện và cộng điểm cho Cặp Tượng (Bishop Pair) và Tốt thông (Passed Pawn) trong evaluation.py như thế nào?",
    "category": "evaluation",
    "topic": "evaluation",
    "memberTarget": "viet",
    "memberRole": "Lượng giá & Tri thức cờ Chess960",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em triển khai bằng các thao tác bitboard cực nhanh của python-chess: (1) Cặp Tượng: Đếm len(board.pieces(chess.BISHOP, color)) == 2, nếu đúng cộng ngay +30 cp; (2) Tốt thông: Dùng mặt nạ bitboard kiểm tra xem phía trước quân Tốt trên cùng cột và 2 cột lân cận có quân Tốt đối phương nào không; nếu không có, đó là Tốt thông và được thưởng 20 cp cộng thêm điểm lũy tiến theo độ cao hàng cờ.",
      "deepExplanation": "Theo Báo cáo mục 4.4 và chi tiết cài đặt: 1. Ý nghĩa cờ vua của Cặp Tượng (+30 cp): Khi sở hữu 2 Tượng (một ô trắng, một ô đen), người chơi kiểm soát được toàn bộ 64 ô cờ trên bàn. Hai Tượng phối hợp tầm xa tạo ra sức mạnh vượt trội hơn hẳn một Tượng và một Mã trong thế trận mở. 30 cp (gần bằng 1/3 quân Tốt) là giá trị chuẩn được các đại kiện tướng thế giới và các engine như Stockfish công nhận. 2. Cơ chế nhận diện Tốt thông (Passed Pawn): - Một quân Tốt trắng ở ô (r, c) là Tốt thông nếu trên các hàng từ r+1 đến 7 của các cột c-1, c, c+1 không có bất kỳ quân Tốt đen nào. - Em sử dụng phép toán bitwise mask của thư viện để kiểm tra trong 1 micro-giây. - Công thức thưởng: `Bonus = 20 + (rank - 2) * 10`. Càng tiến gần hàng 8 để phong Hậu (rank 6, 7), điểm thưởng càng tăng vọt, thúc đẩy bot đẩy Tốt thông quyết liệt trong tàn cuộc (như đã chứng minh trong ván POS-09).",
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "_evaluate_pawns_and_pieces",
        "lines": "L90-135"
      },
      "teacherFollowUps": [
        {
          "question": "Nếu hai quân Tượng cùng đi trên ô màu trắng (do phong cấp) thì có được thưởng cặp Tượng không?",
          "answer": "Dạ không, hàm kiểm tra chuẩn phải đảm bảo hai Tượng đứng trên hai ô khác màu nhau, nhưng trong thực chiến cờ chuẩn trường hợp đó cực hiếm xảy ra."
        },
        {
          "question": "Điểm thưởng Tốt thông ở hàng 7 là bao nhiêu?",
          "answer": "Dạ, ở hàng 7 điểm thưởng là 20 + (7 - 2) * 10 = 70 cp, xấp xỉ gần bằng giá trị một quân Tốt mới, phản ánh nguy cơ phong Hậu cận kề."
        }
      ]
    },
    "tags": [
      "viet",
      "bishop-pair",
      "passed-pawn",
      "bitboard-mask",
      "endgame-bonus"
    ]
  },
  {
    "id": "MEM-VIET-21",
    "title": "Việt - Q160: Quy trình kiểm thử tính đối xứng và độ ổn định của hàm evaluate",
    "question": "Bạn đã thực hiện quy trình kiểm thử nào để chứng minh hàm evaluate() của mình hoàn toàn không thiên vị màu quân (tính đối xứng) và không văng lỗi trên các thế cờ đặc biệt?",
    "category": "evaluation",
    "topic": "testing",
    "memberTarget": "viet",
    "memberRole": "Lượng giá & Tri thức cờ Chess960",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em xây dựng kịch bản kiểm thử tự động Mirror Board Test: Với mỗi thế cờ FEN thử nghiệm, em tạo thế cờ đối xứng qua gương bằng cách lật ngược các hàng và đảo màu quân cờ. Khẳng định bắt buộc là evaluate(board) + evaluate(mirrored_board) == 0 (tổng điểm bằng 0 tuyệt đối). Em đã chạy test này trên 100 thế cờ ngẫu nhiên để đảm bảo hàm evaluate không có bất kỳ bug lệch màu quân nào trước khi đưa vào thi đấu.",
      "deepExplanation": "Theo Báo cáo mục 5.1 về phương pháp kiểm thử: 1. Sự nguy hiểm của lỗi bất đối xứng: Trong quá trình phát triển, nếu lập trình viên quên đảo ngược chỉ số mảng PST của quân Đen (quên không dùng `sq ^ 56`), quân Đen sẽ coi việc tiến quân xuống hàng 1 của mình là lùi quân, dẫn tới việc bot đánh rất dũng mãnh khi cầm Trắng nhưng lại tự sát khi cầm Đen. 2. Bài test kiểm tra thế cờ đặc biệt (Fuzzing/Edge Tests): - Kiểm tra bàn cờ trống quân chỉ còn 2 Vua: evaluate phải trả về 0. - Kiểm tra bàn cờ chỉ có Vua và Tốt sắp phong cấp. - Kiểm tra thế cờ có nhiều quân Hậu phong cấp cùng lúc. - Kiểm tra thế cờ Chess960 với cách bố trí quân kỳ dị nhất. 3. Kết quả kiểm thử: Toàn bộ 100% kịch bản kiểm thử đều vượt qua với độ lệch điểm đúng bằng 0 mili-centipawn, chứng minh độ tin cậy tuyệt đối của module.",
      "codeRef": {
        "file": "student/evaluation.py",
        "functionName": "evaluate",
        "lines": "L20-60"
      },
      "teacherFollowUps": [
        {
          "question": "Tại sao em dùng evaluate(board) + evaluate(mirrored) == 0 mà không dùng so sánh bằng?",
          "answer": "Dạ, vì hàm evaluate trả về điểm tương đối theo góc nhìn bên đi; nếu thế cờ Trắng ưu thế +100 cp thì ở thế cờ gương Đen sẽ ưu thế +100 cp theo góc nhìn của Đen, nên hai điểm số cùng dấu dương theo lượt đi của họ."
        },
        {
          "question": "Thời gian trung bình để chạy 1 lần evaluate là bao nhiêu micro-giây?",
          "answer": "Dạ, đo bằng module cProfile đạt trung bình khoảng 25 micro-giây cho mỗi lần gọi evaluate trên CPU máy tính thông thường."
        }
      ]
    },
    "tags": [
      "viet",
      "mirror-test",
      "symmetry-verification",
      "fuzzing",
      "cprofile"
    ]
  },
  {
    "id": "MEM-VUONG-17",
    "title": "Vương - Q161: Cơ chế Transposition Table và triển khai Zobrist Hash 64-bit",
    "question": "Bạn đã triển khai bảng chuyển vị (Transposition Table) và khóa Zobrist Hash 64-bit trong search.py như thế nào để nhận diện các thế cờ trùng lặp?",
    "category": "search",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Thuật toán tìm kiếm & Tối ưu hóa",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em sử dụng mảng cố định 524,288 phần tử (đúng 2^19 mục) được khởi tạo bằng danh sách Python. Mỗi thế cờ được ánh xạ thành một khóa băm 64-bit duy nhất thông qua hàm băm Zobrist (sử dụng chess.polyglot.zobrist_hash của thư viện). Vị trí lưu trữ trong mảng được tính bằng phép toán bitwise siêu tốc: index = zobrist_key & (TABLE_SIZE - 1). Mỗi mục TTEntry lưu trữ: khóa đầy đủ, độ sâu đã duyệt, cờ giá trị (EXACT, LOWERBOUND, UPPERBOUND), điểm số và nước đi tốt nhất.",
      "deepExplanation": "Theo Báo cáo mục 4.2 và 4.5: 1. Bản chất của Transposition trong cờ vua: Trong cây trò chơi, có rất nhiều chuỗi nước đi khác nhau dẫn tới cùng một thế cờ (ví dụ: 1. d4 Nf6 2. c4 e6 giống hệt 1. c4 e6 2. d4 Nf6). Nếu không có TT, bot sẽ phải tính toán lại từ đầu toàn bộ cây con bên dưới hàng ngàn lần. 2. Cấu trúc lưu trữ tối ưu: - Sử dụng `__slots__ = ('key', 'depth', 'flag', 'score', 'best_move')` cho lớp `TTEntry` giúp loại bỏ `__dict__` overhead của Python, tiết kiệm 60% bộ nhớ. - Kích thước `2^19` mục tiêu tốn đúng ~16 MiB RAM, nằm gọn trong Cache L3 của CPU. 3. Phép băm Bitwise Mask: Thay vì dùng phép chia lấy dư `% TABLE_SIZE` rất tốn chu kỳ CPU, phép `key & (TABLE_SIZE - 1)` chỉ mất đúng 1 chu kỳ vi xử lý, giúp việc tra cứu (probe) và lưu trữ (store) diễn ra trong vài nano-giây.",
      "codeRef": {
        "file": "student/search.py",
        "functionName": "TranspositionTable",
        "lines": "L180-250"
      },
      "teacherFollowUps": [
        {
          "question": "Tại sao trong TTEntry phải lưu cả khóa key 64-bit đầy đủ mà không chỉ lưu index?",
          "answer": "Dạ, vì có nhiều khóa khác nhau có thể ánh xạ vào cùng một index (va chạm băm); lưu khóa đầy đủ để khi probe ta so sánh entry.key == current_key, đảm bảo lấy đúng thế cờ chứ không lấy nhầm thế cờ khác."
        },
        {
          "question": "Tỷ lệ TT Hit trung bình trong ván đấu của bot là bao nhiêu?",
          "answer": "Dạ, tỷ lệ TT Hit trung bình đo được là 25.4%, giúp giảm hơn 40% số nút phải duyệt lại ở mỗi độ sâu mới."
        }
      ]
    },
    "tags": [
      "vuong",
      "transposition-table",
      "zobrist-hash",
      "bitwise-indexing",
      "tt-entry-slots"
    ]
  },
  {
    "id": "MEM-VUONG-18",
    "title": "Vương - Q162: Chiến lược thay thế bảng băm (Replacement Scheme) ưu tiên depth hay thế cờ mới",
    "question": "Khi hai thế cờ có cùng index băm va chạm trong Transposition Table, bạn áp dụng quy tắc thay thế nào (ưu tiên độ sâu hay ưu tiên thế cờ mới) và tại sao?",
    "category": "search",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Thuật toán tìm kiếm & Tối ưu hóa",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em áp dụng chiến lược thay thế lai 'Ưu tiên Độ sâu có điều kiện' (Depth-Preferred with Age/Always-Replace fallback): Nếu mục mới có độ sâu tìm kiếm lớn hơn hoặc bằng mục cũ (new_depth >= old_depth), em luôn ghi đè; nếu mục mới có độ sâu nhỏ hơn nhưng khóa băm khác nhau hoàn toàn (va chạm vị trí), em vẫn giữ lại mục cũ có độ sâu cao hơn vì thông tin ở độ sâu lớn có giá trị tính toán tốn kém hơn nhiều lần.",
      "deepExplanation": "Theo Báo cáo mục 4.3 và student/search.py: 1. Đánh đổi giữa các chiến lược thay thế kinh điển: - Always Replace (Luôn thay thế): Rất đơn giản, thế cờ mới luôn ghi đè thế cờ cũ. Nhược điểm: Một thế cờ ở độ sâu 1 của nhánh phụ vô nghĩa có thể xóa mất một nhánh chính đã duyệt tới độ sâu 5 tốn hàng chục ngàn nút. - Deepest (Luôn giữ độ sâu lớn nhất): Nhược điểm: Bảng băm nhanh chóng bị lấp đầy bởi các thế cờ ở các nước đi đầu tiên của ván cờ, không chịu cập nhật các thế cờ mới ở các nước đi sau. 2. Thuật toán của em: ```python\nif old_entry is None or new_depth >= old_entry.depth or current_age > old_entry.age:\n    self.table[index] = TTEntry(key, new_depth, flag, score, best_move, current_age)\n``` Điều này đảm bảo: Giữ lại những đánh giá chất lượng cao nhất ở độ sâu lớn, đồng thời các thế cờ từ những nước đi xa xưa trong quá khứ sẽ dần bị thay thế khi thế cờ mới xuất hiện.",
      "codeRef": {
        "file": "student/search.py",
        "functionName": "TranspositionTable.store",
        "lines": "L235-265"
      },
      "teacherFollowUps": [
        {
          "question": "Khái niệm 'age' trong TT được cập nhật như thế nào?",
          "answer": "Dạ, age là biến đếm số thứ tự nước đi của ván đấu; mỗi lần bot nhận nước đi mới từ trọng tài, age được tăng thêm 1."
        },
        {
          "question": "Có nên chia TT thành 2 bảng (Two-tier TT) không?",
          "answer": "Dạ, chia 2 bảng (1 bảng luôn giữ depth lớn nhất, 1 bảng luôn thay thế) là kỹ thuật rất tốt trong C++, nhưng trong Python nó làm tăng chi phí quản lý đối tượng nên em chọn giải pháp lai trong một bảng duy nhất."
        }
      ]
    },
    "tags": [
      "vuong",
      "replacement-scheme",
      "depth-preferred",
      "table-aging",
      "cache-thrashing"
    ]
  },
  {
    "id": "MEM-VUONG-19",
    "title": "Vương - Q163: Thuật toán sắp xếp nước đi Move Ordering và thứ tự ưu tiên MVV-LVA",
    "question": "Hệ thống chấm điểm sắp xếp nước đi Move Ordering trong search.py được bạn thiết kế ra sao và tại sao MVV-LVA lại được xếp ưu tiên trước Killer Moves và History Heuristic?",
    "category": "search",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Thuật toán tìm kiếm & Tối ưu hóa",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, em phân tầng điểm số thành các lớp cách biệt hàng trăm nghìn đơn vị: (1) TT Move: 1,000,000 điểm; (2) MVV-LVA cho nước bắt quân: 800,000 - 900,000 điểm; (3) Killer Moves: 700,000 điểm; (4) History Heuristic: 0 - 600,000 điểm. MVV-LVA được ưu tiên trước Killer Moves vì nước bắt quân có lợi về vật chất mang tính sát thương trực tiếp và kiểm chứng được ngay lập tức, có xác suất gây Alpha/Beta cutoff cao hơn nhiều so với một nước đi tĩnh.",
      "deepExplanation": "Theo Báo cáo mục 4.3 và hàm _score_move: 1. Mục tiêu tối thượng của Move Ordering: Đưa nước đi tốt nhất lên vị trí đầu tiên (duyệt đầu tiên). Nếu nước đầu tiên là nước tối ưu, Alpha-Beta chỉ cần duyệt O(b^(d/2)) nút thay vì O(b^d), tăng gấp đôi độ sâu tìm kiếm trong cùng thời gian. 2. Cơ sở ưu tiên MVV-LVA trước Killer: - MVV-LVA (Most Valuable Victim - Least Valuable Attacker): Đổi Tốt lấy Hậu hoặc Xe lấy Xe luôn tạo ra sự biến động vật chất lớn. Đối phương nếu không chống đỡ sẽ thua ngay lập tức. Đây là các biến thể cưỡng bức (forcing moves). - Killer Move: Là nước đi tĩnh (không bắt quân) từng gây cutoff ở nút anh em. Dù rất tốt, nhưng nó vẫn là nước tĩnh, không mang tính cưỡng bức cao bằng nước bắt quân có lời. 3. Sắp xếp bằng Timsort: Em tính toán điểm số phẳng dạng số nguyên int cho từng nước đi, sau đó gọi `moves.sort(key=lambda m: score, reverse=True)`. Timsort của Python chạy bằng C thuần cực kỳ nhanh.",
      "codeRef": {
        "file": "student/search.py",
        "functionName": "_score_move / order_moves",
        "lines": "L120-175"
      },
      "teacherFollowUps": [
        {
          "question": "Nếu nước đi trong TT là một nước tĩnh thì nó có được xếp trên MVV-LVA không?",
          "answer": "Dạ có, TT Move luôn đứng số 1 (1,000,000 điểm) bất kể là nước tĩnh hay bắt quân, vì nó đã được chứng minh là nước tốt nhất ở độ sâu tìm kiếm trước đó."
        },
        {
          "question": "Hệ số rẽ nhánh hiệu dụng (effective branching factor) của bot đạt được là bao nhiêu nhờ Move Ordering?",
          "answer": "Dạ, hệ số rẽ nhánh giảm từ ~35 xuống chỉ còn xấp xỉ 3.8, cho phép bot duyệt sâu 4-5 ply trong vòng 2 giây."
        }
      ]
    },
    "tags": [
      "vuong",
      "move-ordering",
      "mvv-lva",
      "killer-moves",
      "effective-branching-factor"
    ]
  },
  {
    "id": "MEM-VUONG-20",
    "title": "Vương - Q164: Quiescence Search giải quyết hiệu ứng đường chân trời (Horizon Effect)",
    "question": "Quiescence Search trong mã nguồn của bạn hoạt động như thế nào và nó giải quyết triệt để vấn đề hiệu ứng đường chân trời (Horizon Effect) ra sao?",
    "category": "search",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Thuật toán tìm kiếm & Tối ưu hóa",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, Quiescence Search (tìm kiếm yên lặng) được kích hoạt ngay khi Alpha-Beta chạm ngưỡng depth = 0. Thay vì dừng lại và gọi hàm evaluate ngay ở một thế cờ hỗn loạn đang xảy ra bắt quân, Quiescence Search tiếp tục mở rộng duyệt thêm các nước bắt quân và phong cấp Tốt cho đến khi bàn cờ trở nên tĩnh lặng hoàn toàn. Nó sử dụng kỹ thuật 'Điểm tĩnh đứng trước' (Stand-pat score) làm ngưỡng Alpha cơ sở để cắt tỉa nếu bên đi không muốn bắt quân tiếp.",
      "deepExplanation": "Theo Báo cáo mục 4.2 và student/search.py: 1. Bản chất của Hiệu ứng đường chân trời (Horizon Effect): Giả sử ở depth=0, Trắng vừa dùng Hậu ăn Xe đối phương. Nếu dừng lại lượng giá, bot thấy mình đang hơn 1 Xe (+500 cp). Nhưng thực tế ở nước ngay sau đó (ply + 1), Tốt đen sẽ ăn lại Hậu trắng khiến Trắng lỗ ròng 4 điểm. Dừng tìm kiếm ở depth=0 sẽ tạo ra ảo tưởng ưu thế chết người. 2. Thuật toán Quiescence Search: - Bước 1: Tính điểm tĩnh `stand_pat = evaluate(board)`. Nếu `stand_pat >= beta`, trả về beta (Beta-cutoff ngay lập tức). - Bước 2: Cập nhật `alpha = max(alpha, stand_pat)`. - Bước 3: Chỉ lặp qua các nước đi bắt quân `board.generate_legal_captures()`. - Bước 4: Thử từng nước bắt quân, gọi đệ quy `score = -quiescence(-beta, -alpha)` và cập nhật alpha. 3. Kết quả: Thế cờ chỉ được đánh giá khi chuỗi tranh chấp quân cờ kết thúc trọn vẹn.",
      "codeRef": {
        "file": "student/search.py",
        "functionName": "quiescence_search",
        "lines": "L260-315"
      },
      "teacherFollowUps": [
        {
          "question": "Khái niệm 'Stand-pat' có ý nghĩa gì về mặt lý thuyết trò chơi?",
          "answer": "Dạ, Stand-pat dựa trên nguyên lý 'Null Move Option': Bên đi có quyền lựa chọn không bắt thêm quân nào nữa nếu việc bắt quân làm thế cờ xấu đi; điểm tĩnh hiện tại là giới hạn dưới an toàn của họ."
        },
        {
          "question": "Tại sao Quiescence Search không bị lặp vô tận?",
          "answer": "Dạ, vì số lượng quân cờ trên bàn cờ là hữu hạn, mỗi nước bắt quân làm giảm số quân cờ nên chuỗi bắt quân bắt buộc phải dừng lại sau một số ply nhất định."
        }
      ]
    },
    "tags": [
      "vuong",
      "quiescence-search",
      "horizon-effect",
      "stand-pat",
      "tactical-quiescence"
    ]
  },
  {
    "id": "MEM-VUONG-21",
    "title": "Vương - Q165: Tại sao chỉ mở rộng nước bắt quân và phong cấp trong Quiescence Search",
    "question": "Tại sao trong Quiescence Search bạn chỉ mở rộng các nước bắt quân và phong cấp Tốt mà kiên quyết không duyệt các nước đi tĩnh thông thường?",
    "category": "search",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Thuật toán tìm kiếm & Tối ưu hóa",
    "difficulty": "medium",
    "answer": {
      "quickPitch": "Dạ thưa thầy, vì nếu mở rộng cả các nước đi tĩnh trong Quiescence Search, cây tìm kiếm sẽ bị bùng nổ tổ hợp không thể kiểm soát và không bao giờ dừng lại, biến Quiescence Search thành một cây Alpha-Beta hoàn chỉnh vô tận. Các nước bắt quân và phong cấp Tốt là tập hợp hẹp các 'nước đi cưỡng bức' (forcing moves) làm thay đổi đột biến điểm vật chất, chỉ cần giải quyết xong tập nước này là thế cờ đã đủ độ yên lặng để lượng giá an toàn.",
      "deepExplanation": "1. Nguy cơ bùng nổ phân nhánh (Branching Explosion): Trung bình một thế cờ có khoảng 35 nước đi hợp lệ, nhưng trong đó chỉ có từ 2 đến 5 nước là bắt quân. Nếu duyệt cả 35 nước, mỗi tầng Quiescence sẽ nhân số nút lên 35 lần, bot sẽ cạn kiệt thời gian ngay ở lượt đi đầu tiên. 2. Bản chất của nước phong cấp Tốt (Pawn Promotion): Nước phong Tốt biến một quân Tốt (100 cp) thành một quân Hậu (900 cp), tạo ra sự thay đổi tương đương hoặc lớn hơn một pha bắt quân nặng. Do đó, phong Tốt bắt buộc phải được xếp vào diện nước đi bão táp cần giải quyết trong Quiescence. 3. Sử dụng generator tối ưu của thư viện: Thư viện `python-chess` hỗ trợ phương thức `board.generate_legal_captures()` sinh trực tiếp các nước bắt quân mà không tốn công duyệt qua các nước tĩnh, giúp tiết kiệm tối đa chu kỳ CPU.",
      "codeRef": {
        "file": "student/search.py",
        "functionName": "quiescence_search",
        "lines": "L270-305"
      },
      "teacherFollowUps": [
        {
          "question": "Có trường hợp nào nước chiếu Vua (Check) cũng cần được mở rộng trong Quiescence không?",
          "answer": "Dạ có, kỹ thuật Check Extensions trong Quiescence Search ở ply đầu tiên rất hữu ích để chống đòn chiếu rút, nhưng nhóm tạm thời chưa đưa vào để ưu tiên tốc độ tìm kiếm."
        },
        {
          "question": "Delta Pruning được áp dụng trong Quiescence Search như thế nào để cắt tỉa thêm?",
          "answer": "Dạ, nếu stand_pat + giá trị quân bị bắt + 200 cp < alpha, thì ngay cả khi bắt được quân ta vẫn không thể đuổi kịp alpha, nên có thể bỏ qua nước bắt quân đó ngay lập tức."
        }
      ]
    },
    "tags": [
      "vuong",
      "quiescence-search",
      "captures-only",
      "forcing-moves",
      "pawn-promotion"
    ]
  },
  {
    "id": "MEM-VUONG-22",
    "title": "Vương - Q166: Phân tích đòn chiến thuật bị bỏ lỡ tại POS-05 và POS-10 dưới góc độ thuật toán tìm kiếm",
    "question": "Dưới góc độ chuyên môn về thuật toán tìm kiếm, bạn phân tích như thế nào về nguyên nhân kỹ thuật khiến bot bỏ lỡ nước đi tối ưu Qd4 tại POS-05 và bị dính đòn phản công tại POS-10?",
    "category": "search",
    "topic": "search",
    "memberTarget": "vuong",
    "memberRole": "Thuật toán tìm kiếm & Tối ưu hóa",
    "difficulty": "advanced",
    "answer": {
      "quickPitch": "Dạ thưa thầy, nguyên nhân gốc rễ ở cả hai tình huống là 'Khoảng trống thông tin giữa Alpha-Beta và Quiescence Search': Tại POS-05, Qd4 là một nước đi tĩnh mang tính đe dọa (Quiet Threat Move), không có trong MVV-LVA nên bị xếp cuối danh sách duyệt và bị timeout trước khi duyệt tới; tại POS-10, nước gài bẫy của đối thủ là nước tĩnh ở ply 4, Quiescence Search thấy không có bắt quân nên dừng lại và không nhìn thấy đòn chiếu mở ở ply 5.",
      "deepExplanation": "Theo phân tích sâu các ván đấu thực nghiệm trong Báo cáo Chương 5 và 6: 1. Cơ chế thất bại tại POS-05: - Cây Alpha-Beta bị phụ thuộc quá mức vào các tín hiệu chiến thuật bề mặt (Check và Captures). Nước `Qe8+` được thưởng điểm nước chiếu nên được duyệt trước, mang lại điểm số tạm thời chấp nhận được khiến cửa sổ Alpha bị thu hẹp. Nước `Qd4` nằm lẫn trong 25 nước đi tĩnh còn lại, thời gian cho lượt đi cạn kiệt ở độ sâu 4 ply khiến nhánh của Qd4 bị cắt ngang trước khi chạm tới biến thể chiếu hết ở ply 6. 2. Cơ chế thất bại tại POS-10: - Ở ply 4, thế cờ rơi vào trạng thái 'Yên lặng giả tạo' (False Quiescence): Nước đi của đối phương là nước di chuyển Hậu chuẩn bị phục kích. Quiescence Search kiểm tra `board.generate_legal_captures()` thấy không có nước ăn quân nào có lợi, lập tức lấy điểm `stand_pat` và kết luận thế cờ an toàn. Ngay ở ply tiếp theo (ply 5), đòn chiếu mở `Bxh2+` bùng nổ thì đã nằm ngoài tầm nhìn của bot. 3. Giải pháp khắc phục thuật toán: Tích hợp Countermove History và mở rộng độ sâu 1 ply cho các nước đi đối mặt với mối đe dọa (Threat Extensions).",
      "codeRef": {
        "file": "student/search.py",
        "functionName": "alpha_beta / quiescence_search",
        "lines": "L320-375"
      },
      "teacherFollowUps": [
        {
          "question": "Nếu tăng tốc độ duyệt bằng Cython lên gấp 5 lần thì có giải quyết được POS-10 không?",
          "answer": "Dạ chắc chắn giải quyết được, vì khi đó bot đạt tới độ sâu 6 ply trong cùng thời gian, đòn chiếu mở ở ply 5 và bắt Hậu ở ply 6 sẽ hoàn toàn nằm gọn trong tầm nhìn của Alpha-Beta."
        },
        {
          "question": "Bài học lớn nhất của em về mặt thuật toán tìm kiếm sau giải đấu là gì?",
          "answer": "Dạ, là nhận thức rõ ràng rằng thuật toán tìm kiếm không thể bù đắp hoàn toàn cho sự hạn chế về tốc độ duyệt của ngôn ngữ; việc tối ưu hóa mức hệ thống và vi xử lý có vai trò quan trọng ngang hàng với mô hình toán học."
        }
      ]
    },
    "tags": [
      "vuong",
      "pos-05",
      "pos-10",
      "false-quiescence",
      "quiet-threats",
      "algorithm-postmortem"
    ]
  }
];
