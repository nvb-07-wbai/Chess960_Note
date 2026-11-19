import type { FunctionDossier } from '../types';

export const FUNCTION_DOSSIERS: FunctionDossier[] = [
  {
    "id": "FN-BOT-01",
    "name": "StudentBot.__init__",
    "file": "student/bot.py",
    "signature": "StudentBot.__init__(...)",
    "role": "Khởi tạo đối tượng StudentBot, thiết lập cấu hình giải đấu, khởi tạo bộ nhớ động cơ và hạt giống ngẫu nhiên.",
    "isCore": false,
    "inputDescription": "config (BotConfig): Đối tượng cấu hình do Host truyền vào qua handshake, chứa color, chess960_id, initial_time_ms, seed.",
    "outputDescription": "None: Khởi tạo thành công các thuộc tính nội bộ của StudentBot. (Biên: Nếu config thiếu thuộc tính, có thể gây AttributeError trong quá trình gán biến.)",
    "stepSequence": [
      "1. Lưu cấu hình: self.config = config",
      "2. Lưu màu quân: self.color = config.color",
      "3. Thiết lập hạt giống ngẫu nhiên: if config.seed is not None: random.seed(config.seed)",
      "4. Khởi tạo động cơ tìm kiếm trung tâm: self.searcher = Searcher()",
      "5. Khởi tạo cờ nhớ nước đi bắt buộc: self._last_was_forced = False"
    ],
    "whyChosen": "Cổng khởi tạo duy nhất tuân thủ đúng giao diện bắt buộc StudentBot(config) của nền tảng ChessLab.",
    "failureScenario": "Host không thể nạp được bot, văng ngoại lệ TypeError ngay lập tức.",
    "teacherTrap": "Biến self._last_was_forced dùng để làm gì?",
    "memoryDefense": "Dạ, biến này ghi nhớ xem lượt đi trước đó của bot có phải là nước đi bắt buộc 0ms (len=1) hay không, giúp TimeManager nắm được lịch sử tiêu hao thời gian."
  },
  {
    "id": "FN-BOT-02",
    "name": "StudentBot.choose_move",
    "file": "student/bot.py",
    "signature": "StudentBot.choose_move(...)",
    "role": "Cổng giao tiếp duy nhất ra quyết định nước đi, vận hành Kiến trúc phòng thủ 3 tầng bảo đảm 100% không thua kỹ thuật.",
    "isCore": true,
    "inputDescription": "board (chess.Board): Trạng thái bàn cờ hiện tại hỗ trợ biến thể FRC (board.chess960 = True)., context (SearchContext): Ngữ cảnh thời gian còn lại (time_left_ms, opp_time_left_ms) và số nửa nước đi (ply).",
    "outputDescription": "chess.Move: Nước đi tối ưu được chọn. (Biên: Nếu bàn cờ hết nước: trả về chess.Move.null(). Nếu xảy ra exception trong search: trả về legal[0]. Nếu nước trả về không hợp lệ: ép về legal[0].)",
    "stepSequence": [
      "1. Tầng 1: Trích xuất legal = list(board.legal_moves)",
      "2. Kiểm tra len(legal) == 0 -> return chess.Move.null()",
      "3. Kiểm tra len(legal) == 1 -> self._last_was_forced = True; return legal[0] (0 ms Fast-path)",
      "4. Tầng 2: Tính budget qua compute_budget_ms; bọc khối try: move = self.searcher.search(board, tm) except: move = legal[0]",
      "5. Tầng 3: if move is None or move not in board.legal_moves: move = legal[0]",
      "6. return move"
    ],
    "whyChosen": "Loại bỏ 100% các rủi ro thua kỹ thuật (timeout, crash, illegal moves).",
    "failureScenario": "Bot không thể nhận diện bàn cờ và không thể thi đấu.",
    "teacherTrap": "Tại sao phải có cả Tầng 2 (try...except) lẫn Tầng 3 (hậu kiểm)?",
    "memoryDefense": "Dạ, Tầng 2 bảo vệ trước lỗi sập code (runtime crash). Tầng 3 bảo vệ trước lỗi logic thuật toán (ví dụ do va chạm băm trong TT trả về nước đi không hợp lệ của thế cờ khác mà không văng exception)."
  },
  {
    "id": "FN-TIME-01",
    "name": "TimeBudget (Dataclass)",
    "file": "student/time_manager.py",
    "signature": "TimeBudget (Dataclass)(...)",
    "role": "Cấu trúc dữ liệu chứa 3 thông số ngân sách thời gian: min_ms, opt_ms, max_ms.",
    "isCore": false,
    "inputDescription": "min_ms (int): Thời gian tối thiểu phải suy nghĩ (ms), opt_ms (int): Ngân sách tối ưu mong muốn - Soft Limit (ms), max_ms (int): Thời gian tối đa tuyệt đối cho phép - Hard Limit (ms)",
    "outputDescription": "TimeBudget: Đối tượng ngân sách. (Biên: None)",
    "stepSequence": [
      "1. Lưu min_ms, opt_ms, max_ms."
    ],
    "whyChosen": "Đóng gói tường minh 3 tham số thời gian, phân biệt rõ Soft Limit và Hard Limit.",
    "failureScenario": "Phải dùng tuple hoặc 3 tham số rời rạc dễ gây nhầm lẫn.",
    "teacherTrap": "opt_ms và max_ms khác nhau thế nào?",
    "memoryDefense": "Dạ, opt_ms (Soft limit) dùng trong can_start_next_depth để quyết định mở tầng IDS mới. max_ms (Hard limit) dùng trong should_stop để ngắt đệ quy khẩn cấp."
  },
  {
    "id": "FN-TIME-02",
    "name": "compute_budget_ms",
    "file": "student/time_manager.py",
    "signature": "compute_budget_ms(...)",
    "role": "Tính toán ngân sách thời gian thích ứng 6 phân tầng dựa trên thời gian còn lại, ply và chế độ thi đấu.",
    "isCore": true,
    "inputDescription": "time_remaining_ms (int): Thời gian còn lại trên đồng hồ thi đấu của bot (ms), ply (int): Số nửa nước đi đã qua của ván cờ, initial_time_ms (int): Tổng quỹ thời gian ban đầu của ván đấu",
    "outputDescription": "TimeBudget: Đối tượng TimeBudget chứa min, opt, max ms. (Biên: Khi time_remaining <= 1500 ms -> Extreme Panic (8-15 ms). Khi time <= 3500 ms -> Panic (35-50 ms).)",
    "stepSequence": [
      "1. Kiểm tra khẩn cấp: if t <= 1500 -> return TimeBudget(8, 12, 15)",
      "2. Kiểm tra Panic: elif t <= 3500 -> return TimeBudget(35, 45, 50)",
      "3. Kiểm tra Blitz (initial <= 60,000):",
      "   - if ply <= 62 (nước 1-31): opt = 180 (min 150, max 220 ms) - Hấp thụ trễ sàn 500ms",
      "   - elif ply <= 110 (nước 32-55): opt = 45 (min 35, max 55 ms)",
      "   - else (sau nước 55): opt = 30 (min 25, max 40 ms)",
      "4. Chế độ Standard: budget = t / 30; opt = budget; max = min(budget * 2.5, t - 2000)",
      "5. return TimeBudget(min_ms, opt_ms, max_ms)"
    ],
    "whyChosen": "Hiện thực hóa nguyên lý hấp thụ độ trễ sàn 500ms của máy chủ và bảo vệ bot trước rụng kim.",
    "failureScenario": "Bot sẽ chia đều thời gian và bị thua timeout sau 25 nước.",
    "teacherTrap": "Tại sao nước 1-31 lại cấp 150-220ms?",
    "memoryDefense": "Dạ, vì máy chủ có delay tối thiểu 500ms. Ngân sách 180ms cộng overhead nằm gọn trong 500ms này, đồng hồ thực tế không bị trừ mà bot vẫn đạt depth 4-5."
  },
  {
    "id": "FN-TIME-03",
    "name": "TimeManager.__init__",
    "file": "student/time_manager.py",
    "signature": "TimeManager.__init__(...)",
    "role": "Khởi tạo bộ giám sát thời gian với ngân sách TimeBudget.",
    "isCore": false,
    "inputDescription": "budget (TimeBudget | int): Ngân sách tính toán hoặc số mili-giây nguyên.",
    "outputDescription": "None: Khởi tạo thuộc tính TimeManager. (Biên: Nếu truyền vào int, tự bọc thành TimeBudget(0, budget, budget * 2).)",
    "stepSequence": [
      "1. Chuẩn hóa budget thành đối tượng TimeBudget",
      "2. self.budget = budget",
      "3. self.start_time = None",
      "4. self._stopped = False"
    ],
    "whyChosen": "Tạo đối tượng giám sát đồng hồ đơn điệu.",
    "failureScenario": "Searcher không có phương tiện đo thời gian.",
    "teacherTrap": "Đồng hồ bắt đầu đếm từ lúc nào?",
    "memoryDefense": "Dạ, từ lúc gọi tm.start() ngay trước khi bước vào vòng lặp IDS trong Searcher.search()."
  },
  {
    "id": "FN-TIME-04",
    "name": "TimeManager.should_stop",
    "file": "student/time_manager.py",
    "signature": "TimeManager.should_stop(...)",
    "role": "Kiểm tra xem thời gian thực thi đã vượt qua Hard Limit hay chưa để ngắt đệ quy khẩn cấp.",
    "isCore": true,
    "inputDescription": "Không có tham số đầu vào (tính toán dựa trên hằng số nội bộ hoặc trạng thái khởi tạo).",
    "outputDescription": "bool: True nếu phải dừng ngay lập tức, False nếu tiếp tục. (Biên: Nếu self._stopped đã là True, trả về True ngay mà không cần đọc đồng hồ.)",
    "stepSequence": [
      "1. if self._stopped: return True",
      "2. if self.elapsed_ms() >= self.budget.max_ms:",
      "   - self._stopped = True",
      "   - return True",
      "3. return False"
    ],
    "whyChosen": "Cắt đứt đệ quy ngay tức khắc khi chạm ngưỡng Hard Limit.",
    "failureScenario": "Bot sẽ duyệt cây vô tận và bị xử thua timeout.",
    "teacherTrap": "Tại sao không so sánh với opt_ms mà lại so sánh với max_ms?",
    "memoryDefense": "Dạ, vì khi đang duyệt dở một nhánh, ta cho phép co giãn tới max_ms (Hard Limit) để cố gắng hoàn tất nốt nhánh đó, tránh lãng phí công sức."
  },
  {
    "id": "FN-TIME-05",
    "name": "TimeManager.can_start_next_depth",
    "file": "student/time_manager.py",
    "signature": "TimeManager.can_start_next_depth(...)",
    "role": "Đánh giá xem có đủ thời gian để mở tầng tìm kiếm IDS tiếp theo hay không dựa trên hệ số 2.2x.",
    "isCore": true,
    "inputDescription": "last_iter_ms (int): Thời gian (ms) chạy của tầng độ sâu vừa hoàn thành.",
    "outputDescription": "bool: True nếu được phép mở tầng mới, False nếu dừng lại. (Biên: Nếu last_iter_ms <= 0, dự báo bằng 0.)",
    "stepSequence": [
      "1. Tính thời gian đã trôi qua: elapsed = self.elapsed_ms()",
      "2. Dự báo thời gian tầng tiếp theo: estimated = last_iter_ms * 2.2",
      "3. So sánh với Soft Limit: if elapsed + estimated > self.budget.opt_ms: return False",
      "4. return True"
    ],
    "whyChosen": "Dự báo thông minh dựa trên Hệ số rẽ nhánh hiệu dụng (EBF = 2.2x).",
    "failureScenario": "Bot sẽ mù quáng mở tầng tiếp theo và bị timeout giữa chừng.",
    "teacherTrap": "Hệ số 2.2x lấy từ đâu?",
    "memoryDefense": "Dạ, từ đo đạc thực nghiệm cây tìm kiếm Alpha-Beta kết hợp PVS, NMP, LMR của nhóm, mỗi tầng tốn gấp trung bình 2.0 - 2.5 lần tầng trước."
  },
  {
    "id": "FN-EVAL-01",
    "name": "_orient_table",
    "file": "student/evaluation.py",
    "signature": "_orient_table(...)",
    "role": "Lật ngược bảng điểm PeSTO đối xứng theo hàng cho quân Đen.",
    "isCore": false,
    "inputDescription": "raw (list[int]): Mảng 64 số nguyên điểm PeSTO của quân Trắng.",
    "outputDescription": "list[int]: Mảng 64 số nguyên đối xứng theo hàng. (Biên: None)",
    "stepSequence": [
      "1. Duyệt qua từng ô sq từ 0 đến 63",
      "2. Tính ô đối xứng qua hàng bằng phép XOR bitwise: sq ^ 56",
      "3. Trả về mảng mới [raw[sq ^ 56] for sq in range(64)]"
    ],
    "whyChosen": "Quân Đen ở hàng 8 có vị thế giống hệt quân Trắng ở hàng 1.",
    "failureScenario": "Quân Đen sẽ bị đánh giá ngược (Tốt càng tiến về sân nhà điểm càng cao), bot cầm Đen sẽ tự thua.",
    "teacherTrap": "Tại sao lại là phép toán sq ^ 56?",
    "memoryDefense": "Dạ, 56 trong nhị phân là 0b111000 (đảo 3 bit cao nhất đại diện cho chỉ số hàng rank, giữ nguyên 3 bit thấp đại diện cho cột file). Phép XOR 56 lật ngược hàng 1 thành hàng 8, hàng 2 thành hàng 7 mà không làm lệch cột."
  },
  {
    "id": "FN-EVAL-02",
    "name": "_pk",
    "file": "student/evaluation.py",
    "signature": "_pk(...)",
    "role": "Đóng gói hai điểm số Trung cuộc (MG) và Tàn cuộc (EG) vào 1 số nguyên 32-bit.",
    "isCore": false,
    "inputDescription": "mg (int): Điểm số PeSTO Trung cuộc (16-bit signed int), eg (int): Điểm số PeSTO Tàn cuộc (16-bit signed int)",
    "outputDescription": "int: Số nguyên 32-bit đóng gói. (Biên: Xử lý số âm qua phép & 0xFFFF.)",
    "stepSequence": [
      "1. Ép phần mg vào 16-bit thấp: mg_part = mg & 0xFFFF",
      "2. Dịch phần eg lên 16-bit cao: eg_part = eg << 16",
      "3. Kết hợp bằng phép OR bitwise: return mg_part | eg_part"
    ],
    "whyChosen": "Cộng dồn MG và EG trong đúng 1 chu kỳ CPU duy nhất.",
    "failureScenario": "Phải chạy 2 vòng lặp riêng hoặc dùng tuple làm giảm 50% tốc độ.",
    "teacherTrap": "Tại sao phải có phép & 0xFFFF cho mg?",
    "memoryDefense": "Dạ, vì trong Python số nguyên có độ dài vô hạn, nếu mg là số âm thì các bit phía trên toàn là 1 (dấu âm), phép & 0xFFFF sẽ cắt đúng 16 bit thấp để không đè lên phần eg phía trên."
  },
  {
    "id": "FN-EVAL-03",
    "name": "_build_packed_pst",
    "file": "student/evaluation.py",
    "signature": "_build_packed_pst(...)",
    "role": "Khởi tạo trước toàn bộ mảng PST đã đóng gói 32-bit cho từng loại quân và từng màu.",
    "isCore": false,
    "inputDescription": "color_white (bool): True nếu là quân Trắng, False nếu là quân Đen., pt (chess.PieceType): Loại quân cờ (PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING).",
    "outputDescription": "tuple[int, ...]: Tuple 64 số nguyên 32-bit đóng gói. (Biên: None)",
    "stepSequence": [
      "1. Lấy mảng raw_mg và raw_eg theo loại quân pt",
      "2. Nếu là quân Đen: lật mảng bằng _orient_table",
      "3. Đóng gói từng ô: [_pk(mg, eg) for mg, eg in zip(table_mg, table_eg)]",
      "4. Ép kiểu thành tuple bất biến để tối ưu tốc độ đọc."
    ],
    "whyChosen": "Pre-computation: Tính toán trước 1 lần duy nhất lúc nạp module.",
    "failureScenario": "Mỗi lần evaluate phải đóng gói lại sẽ làm giảm 90% tốc độ.",
    "teacherTrap": "Tuple này tốn bao nhiêu RAM?",
    "memoryDefense": "Dạ, 12 tuple * 64 số nguyên * 4 bytes ≈ 3 KiB RAM, hoàn toàn không đáng kể."
  },
  {
    "id": "FN-EVAL-04",
    "name": "_build_king_zones",
    "file": "student/evaluation.py",
    "signature": "_build_king_zones(...)",
    "role": "Tính toán trước 64 mặt nạ bitboard vùng an toàn Vua (Dynamic King Safety Ring) cho mọi ô cờ trên bàn.",
    "isCore": false,
    "inputDescription": "Không có tham số đầu vào (tính toán dựa trên hằng số nội bộ hoặc trạng thái khởi tạo).",
    "outputDescription": "tuple[KingZone, ...]: Tuple 64 đối tượng KingZone (inner_ring, outer_ring, shield_mask, files). (Biên: None)",
    "stepSequence": [
      "1. Duyệt qua 64 ô cờ sq từ 0 đến 63",
      "2. Tính 8 ô lân cận (inner_ring) bằng mặt nạ Vua",
      "3. Tính hàng phía trước Vua để làm mặt nạ khiên Tốt shield_mask",
      "4. Tính các cột lân cận để làm mặt nạ kiểm tra cột mở files",
      "5. Đóng gói thành tuple 64 phần tử."
    ],
    "whyChosen": "Chess960 Vua có thể ở bất kỳ ô nào, tính trước giúp tra cứu O(1).",
    "failureScenario": "Hàm evaluate sẽ mù tịt về vị trí an toàn của Vua trong FRC.",
    "teacherTrap": "Làm sao tránh hiện tượng bit tràn từ cột h sang cột a khi dịch bit?",
    "memoryDefense": "Dạ, nhóm sử dụng hàm _row_mask có cắt cột theo fl_i (cột trái) và fr_i (cột phải), bảo đảm mặt nạ chỉ nằm gọn trong các cột lân cận hợp lệ."
  },
  {
    "id": "FN-EVAL-05",
    "name": "_popcount",
    "file": "student/evaluation.py",
    "signature": "_popcount(...)",
    "role": "Đếm số bit 1 trong bitboard 64-bit bằng lệnh CPU POPCNT.",
    "isCore": false,
    "inputDescription": "bb (int): Số nguyên 64-bit đại diện cho bitboard.",
    "outputDescription": "int: Số lượng bit 1 (0 đến 64). (Biên: bb == 0 -> return 0.)",
    "stepSequence": [
      "1. return bb.bit_count()"
    ],
    "whyChosen": "Tận dụng tập lệnh phần cứng CPU nhanh nhất.",
    "failureScenario": "Phải dùng vòng lặp while bb làm giảm tốc độ 5 lần.",
    "teacherTrap": "bit_count() có từ phiên bản Python nào?",
    "memoryDefense": "Dạ, từ Python 3.10 trở lên, được tích hợp thẳng vào kiểu int và chạy bằng lệnh phần cứng của CPU."
  },
  {
    "id": "FN-EVAL-06",
    "name": "_pst_sum",
    "file": "student/evaluation.py",
    "signature": "_pst_sum(...)",
    "role": "Tính tổng điểm PeSTO đóng gói 32-bit của một tập hợp quân cờ bằng Kernighan bit-trick.",
    "isCore": false,
    "inputDescription": "bb (int): Bitboard vị trí của các quân cờ cùng loại, table (tuple[int, ...]): Bảng PeSTO đóng gói 32-bit của quân đó",
    "outputDescription": "int: Tổng điểm số 32-bit tích lũy. (Biên: bb == 0 -> return 0.)",
    "stepSequence": [
      "1. s = 0",
      "2. while bb: sq = (bb & -bb).bit_length() - 1; s += table[sq]; bb &= bb - 1",
      "3. return s"
    ],
    "whyChosen": "Vòng lặp chỉ chạy đúng số lần bằng số quân cờ trên bàn (O(k) với k <= 8 thay vì O(64)).",
    "failureScenario": "Duyệt for i in range(64) làm chậm evaluate 8 lần.",
    "teacherTrap": "Tại sao không dùng _pst_sum cho Vua?",
    "memoryDefense": "Dạ, vì mỗi bên chỉ có duy nhất 1 quân Vua, vị trí Vua đã có sẵn trong wk và bk, chỉ cần lấy trực tiếp _WK[wk] và _BK[bk] trong O(1) mà không cần vòng lặp."
  },
  {
    "id": "FN-EVAL-07",
    "name": "_north_fill & _south_fill",
    "file": "student/evaluation.py",
    "signature": "_north_fill & _south_fill(...)",
    "role": "Lan truyền bitboard lên phía bắc (Trắng) hoặc phía nam (Đen) để tạo mặt nạ vùng kiểm soát và nhận diện Tốt thông.",
    "isCore": false,
    "inputDescription": "bb (int): Bitboard đầu vào",
    "outputDescription": "int: Bitboard đã lan truyền dọc toàn bộ các hàng tương ứng. (Biên: None)",
    "stepSequence": [
      "1. bb |= (bb << 8) (hoặc >> 8)",
      "2. bb |= (bb << 16) (hoặc >> 16)",
      "3. bb |= (bb << 32) (hoặc >> 32)",
      "4. return bb & 0xFFFFFFFFFFFFFFFF"
    ],
    "whyChosen": "Duyệt toàn bộ chiều dọc 8 ô chỉ bằng đúng 3 phép dịch bit song song (Parallel Prefix Algorithm).",
    "failureScenario": "Phải dùng vòng lặp duyệt từng ô hàng phía trước.",
    "teacherTrap": "Tại sao dịch 8, 16 rồi 32 là đủ phủ kín 8 hàng?",
    "memoryDefense": "Dạ, vì sau bước << 8 ta phủ 2 hàng, bước << 16 nhân đôi thành 4 hàng, bước << 32 nhân đôi thành 8 hàng (toàn bộ chiều cao bàn cờ)."
  },
  {
    "id": "FN-EVAL-08",
    "name": "_spread_files",
    "file": "student/evaluation.py",
    "signature": "_spread_files(...)",
    "role": "Lan truyền bitboard theo cả hai hướng bắc nam để tạo mặt nạ toàn bộ các cột có quân cờ xuất hiện.",
    "isCore": false,
    "inputDescription": "bb (int): Bitboard quân cờ",
    "outputDescription": "int: Bitboard phủ kín toàn bộ chiều dọc của các cột tương ứng. (Biên: None)",
    "stepSequence": [
      "1. return _north_fill(bb) | _south_fill(bb)"
    ],
    "whyChosen": "Tìm các cột mở chỉ trong 1 dòng lệnh.",
    "failureScenario": "Phải dùng vòng lặp kiểm tra từng cột từ a đến h.",
    "teacherTrap": "Làm sao tìm cột mở hoàn toàn cho Xe bằng hàm này?",
    "memoryDefense": "Dạ, lấy `open_files = ~_spread_files(wp | bp) & 0xFF`, các bit 1 trong open_files chính là các cột không có bất kỳ quân Tốt nào của cả 2 bên."
  },
  {
    "id": "FN-EVAL-09",
    "name": "evaluate",
    "file": "student/evaluation.py",
    "signature": "evaluate(...)",
    "role": "Động cơ lượng giá thế cờ tĩnh trung tâm, tổng hợp 11 bước tri thức chuyên gia, nội suy Tapered Eval và Dynamic King Ring.",
    "isCore": true,
    "inputDescription": "board (chess.Board): Trạng thái bàn cờ hiện tại",
    "outputDescription": "int: Điểm lượng giá tính bằng centipawns theo góc nhìn của bên có lượt đi (board.turn). (Biên: Nếu thiếu Vua (wk is None or bk is None): return 0.)",
    "stepSequence": [
      "1. Game Phase calculation (0-24)",
      "2. Material & PST 32-bit accumulation via _pst_sum",
      "3. Bishop Pair bonus (+30 cp)",
      "4. Pawn Structure (Passed, Doubled, Isolated)",
      "5. Rook activity (Open, Semi-open, 7th rank)",
      "6. Knight Outposts (+25 cp)",
      "7. Dynamic King Safety Ring via KING_ZONES",
      "8. Castling rights bonus (+20 cp/side)",
      "9. Tapered Evaluation interpolation: (mg * phase + eg * (24 - phase)) // 24",
      "10. Mop-Up Heuristic in deep endgame (phase <= 6 & abs >= 200)",
      "11. Tempo bonus (+9 cp) and color_sign normalization"
    ],
    "whyChosen": "Cung cấp điểm số đánh giá khi cây tìm kiếm không thể duyệt tới tận cùng ván cờ.",
    "failureScenario": "Bot không có khả năng phân biệt thế cờ tốt xấu và đi cờ mù quáng.",
    "teacherTrap": "Tại sao evaluate đạt được tốc độ 100,000 evals/giây trên Python?",
    "memoryDefense": "Dạ, nhờ kết hợp 3 kỹ thuật: (1) Toàn bộ thao tác trên Bitboard 64-bit nhị phân. (2) Đóng gói tuyến tính 32-bit cộng dồn cả MG và EG trong 1 phép toán. (3) Nạp sẵn trước toàn bộ mảng dữ liệu trong RAM lúc khởi động."
  },
  {
    "id": "search-score-to-tt",
    "name": "score_to_tt",
    "file": "student/search.py",
    "signature": "score_to_tt(score: int, ply: int) -> int",
    "role": "Mã hóa điểm Mate tương đối theo ply hiện tại thành khoảng cách từ nút gốc để lưu vào TT",
    "isCore": true,
    "inputDescription": "score (int): Điểm số đánh giá từ góc nhìn bên đi. ply (int): Khoảng cách từ nút gốc tìm kiếm đến nút hiện tại.",
    "outputDescription": "int: Điểm số đã chuẩn hóa độc lập với ply (Mate score chuẩn).",
    "stepSequence": [
      "1. Kiểm tra nếu score > 20000 - 100: Đây là thế thắng chiếu hết (Mate win), chuyển đổi: return score + ply.",
      "2. Kiểm tra nếu score < -20000 + 100: Đây là thế thua chiếu hết (Mate loss), chuyển đổi: return score - ply.",
      "3. Nếu điểm nằm ngoài vùng Mate: Giữ nguyên điểm trả về score."
    ],
    "whyChosen": "Nếu lưu trực tiếp điểm Mate tại ply = 4 (ví dụ M3 = 19997), khi một nhánh khác ở ply = 1 tra cứu bảng TT gặp thế cờ tương tự, nó sẽ hiểu sai khoảng cách chiếu hết. Chuyển đổi score_to_tt biến điểm Mate thành độc lập với vị trí cây tìm kiếm.",
    "failureScenario": "Nếu bỏ qua bước này, bảng băm TT sẽ gây ra lỗi nghiêm trọng: lặp lại nước đi dẫn tới hòa dù có thể thắng cờ trong 1 nước, hoặc báo chiếu hết sai ply.",
    "teacherTrap": "Tại sao phải cộng ply cho điểm dương và trừ ply cho điểm âm? Nếu không có hàm này bot bị hiện tượng gì?",
    "memoryDefense": "Để lưu vào TT mà tái sử dụng được ở các tầng khác nhau, điểm Mate phải độc lập với ply hiện tại. Với thế thắng (score > 19900), score = 20000 - steps_to_mate. Ở ply hiện tại, steps_to_mate_from_root = steps_to_mate + ply. Do đó score_to_tt cộng ply để lưu khoảng cách thực tế từ root. Ngược lại với điểm âm thì trừ ply."
  },
  {
    "id": "search-score-from-tt",
    "name": "score_from_tt",
    "file": "student/search.py",
    "signature": "score_from_tt(score: int, ply: int) -> int",
    "role": "Giải mã điểm Mate được lưu trong TT thành điểm số tương đối tương ứng với ply hiện tại",
    "isCore": true,
    "inputDescription": "score (int): Điểm số lấy từ bảng băm TT. ply (int): Độ sâu hiện tại tính từ gốc cây tìm kiếm.",
    "outputDescription": "int: Điểm số đã điều chỉnh chính xác theo ply hiện tại.",
    "stepSequence": [
      "1. Kiểm tra nếu score > 20000 - 100: Điểm Mate thắng, giải mã: return score - ply.",
      "2. Kiểm tra nếu score < -20000 + 100: Điểm Mate thua, giải mã: return score + ply.",
      "3. Ngược lại: Trả về chính giá trị score."
    ],
    "whyChosen": "Đây là hàm nghịch đảo của score_to_tt. Khi tra cứu TT thành công, điểm Mate chuẩn hóa từ gốc phải được ánh xạ lại theo số ply của nhánh đang duyệt.",
    "failureScenario": "Nếu đọc điểm TT ra mà không gọi score_from_tt, thuật toán Negamax sẽ so sánh khập khiễng điểm Mate của nhánh ngắn với nhánh dài, dẫn đến chọn đường đi chiếu hết xa hơn hoặc bỏ lỡ đòn kết liễu nhanh nhất.",
    "teacherTrap": "Ngưỡng 20000 - 100 từ đâu ra? Tại sao là số 100?",
    "memoryDefense": "Hằng số 20000 là điểm định danh Mate (CHECKMATE_SCORE). Giới hạn độ sâu tối đa của cờ vua thực chiến hiếm khi vượt 100 ply, do đó vùng [20000 - 100, 20000] đại diện an toàn cho mọi tình huống chiếu hết (Mate in 1..50). 100 ply là cận trên độ sâu tìm kiếm."
  },
  {
    "id": "search-see",
    "name": "see",
    "file": "student/search.py",
    "signature": "see(board: chess.Board, move: chess.Move) -> int",
    "role": "Static Exchange Evaluation (SEE) - Đánh giá tĩnh chuỗi đổi quân tại ô đích để phân loại nước ăn quân tốt hay lỗ",
    "isCore": true,
    "inputDescription": "board (chess.Board): Thế cờ hiện tại. move (chess.Move): Nước đi ăn quân (capture) cần lượng giá.",
    "outputDescription": "int: Lợi thế vật chất tối đa ước lượng (centipawn) thu được sau chuỗi đổi quân.",
    "stepSequence": [
      "1. Xác định ô đích to_square và quân bị bắt ban đầu.",
      "2. Khởi tạo mảng d gains lưu trữ chuỗi vật chất thay đổi sau từng lượt bắt.",
      "3. Lặp tìm quân tấn công có giá trị nhỏ nhất (Least Valuable Attacker) của bên đối phương tại ô to_square.",
      "4. Cập nhật lượt đi và tính lượng quân có thể bắt lại (Minimax trên chuỗi đổi quân 1 ô).",
      "5. Áp dụng quy tắc Minimax lùi từ cuối chuỗi để xác định bên bị lỗ có dừng ăn quân không.",
      "6. Trả về gains[0]."
    ],
    "whyChosen": "SEE giúp Move Ordering đưa nước ăn quân lời lên trước (Good Captures) và đẩy nước ăn quân lỗ (Bad Captures: ví dụ Hậu ăn Tốt có Xe bảo vệ) xuống cuối. Trong Quiescence Search, SEE < 0 lập tức bị tỉa bỏ, giảm 40% số nút nổ ở tầng bắt quân.",
    "failureScenario": "Nếu SEE tính toán quá nặng (như clone bàn cờ), thời gian tìm kiếm sẽ tăng gấp bội. Do đó SEE của Nhóm 12 tận dụng bitboard tấn công mà không clone board.",
    "teacherTrap": "Tại sao nhóm chỉ dùng SEE cho Move Ordering và Quiescence Search mà không dùng trong Negamax chính?",
    "memoryDefense": "SEE là đánh giá tĩnh trên một ô đơn lẻ, bỏ qua các yếu tố chiến thuật khác như chiếu, ghim quân hay quá tải. Dùng SEE ở Negamax dễ bỏ sót đòn hy sinh quân phối hợp. Vì vậy nhóm chỉ dùng SEE để sắp xếp nước đi và tỉa nước bắt quân rõ ràng lỗ trong Quiescence Search."
  },
  {
    "id": "search-ttentry",
    "name": "TTEntry",
    "file": "student/search.py",
    "signature": "TTEntry(key: int, depth: int, flag: int, score: int, best_move: chess.Move | None)",
    "role": "Cấu trúc dữ liệu đại diện cho một bản ghi trong bảng chuyển vị (Transposition Table)",
    "isCore": true,
    "inputDescription": "key: 64-bit Zobrist hash; depth: độ sâu đã duyệt; flag: EXACT (0), LOWERBOUND (1), UPPERBOUND (2); score: điểm số đã chuẩn hóa; best_move: nước đi tối ưu.",
    "outputDescription": "Đối tượng lưu trữ gọn nhẹ (sử dụng __slots__ để tối ưu RAM).",
    "stepSequence": [
      "1. Khởi tạo thuộc tính với __slots__ = ('key', 'depth', 'flag', 'score', 'best_move').",
      "2. Tiết kiệm bộ nhớ tối đa, không phát sinh __dict__ cho hàng trăm nghìn entry."
    ],
    "whyChosen": "__slots__ giảm thiểu 60% overhead bộ nhớ của Python objects. Với bảng băm 524,288 phần tử, việc này giữ RAM bot chỉ dưới 150MB, tuyệt đối tuân thủ giới hạn 1GB của cuộc thi.",
    "failureScenario": "Nếu dùng dict thông thường, bộ nhớ sẽ phình to gấp 3-4 lần và gây hiện tượng Garbage Collection lag dẫn đến quá giờ.",
    "teacherTrap": "Cờ flag có 3 loại là gì? Khi nào lưu flag nào?",
    "memoryDefense": "Flag EXACT: Điểm nằm trong khoảng (alpha, beta), là điểm chính xác. Flag LOWERBOUND: Điểm >= beta (xảy ra hiện tượng Beta-cutoff), thế cờ ít nhất tốt bằng score. Flag UPPERBOUND: Điểm <= alpha (All-node), không nước nào vượt qua alpha."
  },
  {
    "id": "search-transposition-table",
    "name": "TranspositionTable",
    "file": "student/search.py",
    "signature": "TranspositionTable(size: int = 524288)",
    "role": "Lớp quản lý bảng băm chuyển vị với cơ chế Replace if Depth >= Old Depth",
    "isCore": true,
    "inputDescription": "size: Số lượng entry (mặc định 2^19 = 524,288).",
    "outputDescription": "Đối tượng TranspositionTable với 2 phương thức chính: store() và probe().",
    "stepSequence": [
      "1. Khởi tạo mảng table có kích thước cố định bằng size (None * size).",
      "2. probe(key): Tính index = key & (size - 1). Nếu table[index] tồn tại và match key, trả về entry.",
      "3. store(key, depth, flag, score, best_move): Tính index. Nếu entry cũ trống hoặc depth mới >= entry cũ.depth thì ghi đè."
    ],
    "whyChosen": "Kích thước lũy thừa của 2 cho phép dùng phép toán bitwise AND (key & mask) thay vì phép chia lấy dư modulo (%) chậm chạp. Cơ chế thay thế ưu tiên độ sâu lớn (depth-preferred) bảo tồn thông tin giá trị nhất của cây tìm kiếm.",
    "failureScenario": "Nếu chọn size quá lớn (> 2^21), thời gian cấp phát bộ nhớ ban đầu lớn; nếu quá nhỏ (< 2^17), tỉ lệ va chạm băm (hash collision) cao làm giảm hiệu suất cắt tỉa tỉa cây.",
    "teacherTrap": "Làm sao phát hiện Hash Collision giữa 2 thế cờ khác nhau có cùng chỉ số index?",
    "memoryDefense": "Mỗi entry lưu trữ toàn bộ 64-bit Zobrist key. Khi probe, bot so sánh entry.key == key. Nếu khác key, dù cùng index bot coi như không tìm thấy (cache miss), triệt tiêu hoàn toàn rủi ro va chạm băm."
  },
  {
    "id": "search-order-moves",
    "name": "Searcher._order_moves",
    "file": "student/search.py",
    "signature": "Searcher._order_moves(self, board: chess.Board, moves: list[chess.Move], tt_move: chess.Move | None, ply: int) -> list[tuple[int, chess.Move]]",
    "role": "Sắp xếp thứ tự các nước đi hợp lệ theo điểm ưu tiên chiến thuật đa tầng để tối đa hóa Beta-cutoff",
    "isCore": true,
    "inputDescription": "board: Bàn cờ hiện tại; moves: Danh sách nước đi hợp lệ; tt_move: Nước đi tốt nhất lấy từ TT; ply: Khoảng cách từ root.",
    "outputDescription": "Danh sách tuple (priority_score, move) được gán điểm để sort giảm dần.",
    "stepSequence": [
      "1. TT Move: Nếu move == tt_move, gán điểm tuyệt đối cao nhất: 1,000,000.",
      "2. Good Captures & Promoted Captures: Sử dụng MVV-LVA kết hợp kiểm tra SEE >= 0: gán điểm 100,000 + MVV_LVA.",
      "3. Killer Moves: Kiểm tra killer_table[ply][0] và [1]: gán điểm 9,000 và 8,000.",
      "4. Countermoves: Kiểm tra countermove_table[prev_move]: gán điểm 7,000.",
      "5. History Heuristic: Gán điểm theo lịch sử history_table[color][from][to] (tối đa ~6,000).",
      "6. Bad Captures: Nước ăn quân có SEE < 0 bị đẩy lùi xuống sau các nước tĩnh: gán điểm âm.",
      "7. Trả về danh sách đã gán điểm để duyệt ưu tiên."
    ],
    "whyChosen": "Trong Alpha-Beta, nếu duyệt nước đi tốt nhất đầu tiên, độ phức tạp giảm từ O(b^d) xuống O(b^(d/2)), tương đương tăng gấp đôi độ sâu tìm kiếm trong cùng một khoảng thời gian.",
    "failureScenario": "Nếu hàm sắp xếp nước đi chạy quá chậm (do gọi hàm nặng), chi phí overhead của việc sort sẽ triệt tiêu lợi ích của việc cắt tỉa cây.",
    "teacherTrap": "Thứ tự ưu tiên cụ thể giữa TT move, Killer move, MVV-LVA và History là gì? Tại sao Killer move lại ưu tiên hơn History?",
    "memoryDefense": "Thứ tự ưu tiên từ cao xuống thấp: TT move (1,000,000) > Good Captures MVV-LVA (100,000+) > Killer 1 (9,000) > Killer 2 (8,000) > Countermove (7,000) > History Heuristic (>0) > Quiet Moves (0) > Bad Captures (<0). Killer move là nước đi tĩnh đã gây ra beta-cutoff ở cùng độ sâu ply ở nhánh bên cạnh, có tính chính xác cục bộ cao hơn History vốn là thống kê toàn cục."
  },
  {
    "id": "search-quiescence",
    "name": "Searcher._quiescence",
    "file": "student/search.py",
    "signature": "Searcher._quiescence(self, board: chess.Board, alpha: int, beta: int, depth_q: int = 0) -> int",
    "role": "Tìm kiếm tĩnh (Quiescence Search) mở rộng các nước ăn quân để giải quyết hiện tượng mù đường chân trời (Horizon Effect)",
    "isCore": true,
    "inputDescription": "board: Bàn cờ; alpha, beta: Cửa sổ điểm; depth_q: Độ sâu tìm kiếm tĩnh.",
    "outputDescription": "int: Điểm số lượng giá ổn định không còn biến động chiến thuật ăn quân lớn.",
    "stepSequence": [
      "1. Stand-pat: Tính điểm đánh giá tĩnh ban đầu stand_pat = evaluate(board).",
      "2. Beta-cutoff: Nếu stand_pat >= beta, đối phương sẽ không chọn nhánh này -> return beta.",
      "3. Cập nhật alpha: alpha = max(alpha, stand_pat).",
      "4. Delta Pruning: Nếu stand_pat + 1150 (giá trị Hậu + margin) < alpha -> return alpha (tỉa sớm vì dù ăn được quân to nhất vẫn không bằng alpha).",
      "5. Lấy danh sách nước ăn quân hợp lệ (captures) và sắp xếp bằng MVV-LVA.",
      "6. SEE Pruning: Nếu see(board, move) < 0, bỏ qua không duyệt nước ăn quân lỗ.",
      "7. Duyệt đệ quy: val = -self._quiescence(board, -beta, -alpha), cập nhật alpha.",
      "8. Trả về alpha."
    ],
    "whyChosen": "Nếu dừng tìm kiếm ở depth = 0 ngay sau khi Hậu ăn Tốt mà không thấy nước tiếp theo Xe ăn Hậu, bot sẽ đánh giá sai lệch thế cờ trầm trọng (Horizon Effect). Quiescence Search đảm bảo bàn cờ hoàn toàn 'yên tĩnh' mới kết luận điểm.",
    "failureScenario": "Nếu Quiescence Search duyệt cả nước đi tĩnh (quiet moves) hoặc sinh ra chuỗi bắt quân vô tận, cây tìm kiếm sẽ bùng nổ số nút (Search Explosion).",
    "teacherTrap": "Delta Pruning là gì? Tại sao con số là 1150 centipawn?",
    "memoryDefense": "Delta Pruning là kỹ thuật tối ưu trong tìm kiếm tĩnh: nếu điểm đánh giá tĩnh hiện tại cộng với giá trị lớn nhất của quân có thể ăn (Quân Hậu = 950cp) cộng thêm một biên độ an toàn (200cp) mà vẫn không vượt qua alpha, thì nhánh này chắc chắn không thể cải thiện alpha. 950 + 200 = 1150cp. Tỉa bỏ ngay giúp tiết kiệm 20% nút ở tầng lá."
  },
  {
    "id": "search-negamax",
    "name": "Searcher._negamax",
    "file": "student/search.py",
    "signature": "Searcher._negamax(self, board: chess.Board, depth: int, alpha: int, beta: int, ply: int, can_null: bool = True) -> int",
    "role": "Bộ máy đệ quy cốt lõi tích hợp Alpha-Beta và 5 tầng cắt tỉa chiến lược (TT, NMP, RFP, FP, LMR)",
    "isCore": true,
    "inputDescription": "board: Bàn cờ; depth: Độ sâu còn lại; alpha, beta: Biên cắt tỉa; ply: Độ sâu từ gốc; can_null: Cờ cho phép Null Move.",
    "outputDescription": "int: Điểm số Minimax tối ưu từ góc nhìn người chơi hiện tại.",
    "stepSequence": [
      "1. Kiểm tra giới hạn thời gian (Node check mỗi 128 nodes): Nếu stop_event set hoặc time_up -> raise SearchTimeout.",
      "2. Xử lý hòa cờ (Repetition 2 lần, 50-move rule): Trả về 0 (hoặc điểm tránh hòa).",
      "3. Tra cứu Transposition Table (TT probe): Nếu depth đủ sâu và cờ thỏa mãn -> return score_from_tt.",
      "4. Kiểm tra Chiếu (In-check extension): Nếu vua bị chiếu, tăng depth += 1, bỏ qua các kỹ thuật tỉa nhánh nguy hiểm.",
      "5. Đạt tầng lá (depth <= 0): Chuyển tiếp sang self._quiescence(board, alpha, beta).",
      "6. Reverse Futility Pruning (RFP): Ở depth thấp (<= 2), nếu static_eval - 120 * depth >= beta -> return beta.",
      "7. Null Move Pruning (NMP): Thử nhường lượt (depth >= 3, không bị chiếu, còn quân nặng), giảm sâu R = 2 + floor(depth/6). Nếu vẫn >= beta -> return beta.",
      "8. Sắp xếp nước đi (Move Ordering) bằng _order_moves.",
      "9. Futility Pruning (FP): Ở depth <= 2, bỏ qua nước tĩnh không cải thiện được alpha + 150.",
      "10. Vòng lặp duyệt nước đi: Late Move Reductions (LMR) cho các nước tĩnh từ vị trí thứ 4 trở đi.",
      "11. Đệ quy Negamax: score = -self._negamax(board, new_depth, -beta, -alpha, ply + 1).",
      "12. Cập nhật Killer Table, History Table và lưu kết quả vào TT với cờ thích hợp.",
      "13. Trả về alpha."
    ],
    "whyChosen": "Thuật toán Negamax tinh gọn hóa Minimax dựa trên tính đối xứng hai người chơi: max(a, b) = -min(-a, -b). Tích hợp toàn diện các kỹ thuật cắt tỉa giúp bot mở rộng độ sâu thực tế từ 4 lên 7-9 ply.",
    "failureScenario": "Nếu không có cơ chế timeout check ngắt quãng hoặc không cẩn trọng với Zugzwang trong Null Move Pruning, bot có thể rơi vào bẫy cờ hoặc sụp đổ thời gian.",
    "teacherTrap": "Giải thích chi tiết 5 tầng cắt tỉa: TT Cutoff, RFP, NMP, FP, LMR diễn ra ở bước nào trong hàm?",
    "memoryDefense": "1. TT Cutoff diễn ra ngay đầu hàm trước khi sinh nước đi. 2. RFP (Reverse Futility) diễn ra trước sinh nước đi ở depth 1-2 dựa vào static_eval. 3. NMP (Null Move) thử nhường nước đi ở depth >= 3 trước sinh nước đi. 4. FP (Futility Pruning) diễn ra bên trong vòng lặp nước đi, bỏ qua các nước tĩnh vô vọng. 5. LMR (Late Move Reduction) giảm 1-2 ply cho các nước tĩnh xếp cuối bảng ưu tiên."
  },
  {
    "id": "search-search",
    "name": "Searcher.search",
    "file": "student/search.py",
    "signature": "Searcher.search(self, board: chess.Board, time_limit: float = 3.0, hard_limit: float = 4.5) -> chess.Move",
    "role": "Điều phối tìm kiếm lặp sâu dần (Iterative Deepening) kết hợp cửa sổ kỳ vọng (Aspiration Window) và bảo hiểm nước đi",
    "isCore": true,
    "inputDescription": "board: Bàn cờ hiện tại; time_limit: Thời gian mục tiêu cho nước đi; hard_limit: Thời gian tối đa tuyệt đối cho phép.",
    "outputDescription": "chess.Move: Nước đi tối ưu nhất tìm được sau khi hết thời gian.",
    "stepSequence": [
      "1. Thiết lập stop_event = False và tính mốc thời gian timeout.",
      "2. Lấy danh sách nước hợp lệ, gán default move dự phòng (nước hợp lệ đầu tiên hoặc TT move).",
      "3. Vòng lặp Iterative Deepening: depth tăng dần từ 1 đến 64.",
      "4. Thiết lập Aspiration Window: [prev_score - 40, prev_score + 40].",
      "5. Gọi _negamax(board, depth, alpha, beta, ply=0).",
      "6. Nếu trượt cửa sổ (Fails-low hoặc Fails-high), mở rộng cửa sổ vô hạn [-INFINITY, +INFINITY] và tìm kiếm lại.",
      "7. Cập nhật best_move của tầng sâu nhất đã hoàn tất, decay_history_table().",
      "8. Bắt ngoại lệ SearchTimeout: Dừng khẩn cấp và trả về ngay best_move của tầng trước đó đã hoàn tất."
    ],
    "whyChosen": "Iterative Deepening kết hợp bắt SearchTimeout đảm bảo bot luôn luôn có một nước đi hợp lệ tốt nhất trong tay bất kể bị ngắt ở mili-giây nào, loại bỏ 100% rủi ro Timeout Loss.",
    "failureScenario": "Nếu Aspiration Window đặt quá hẹp (< 25cp), số lần tìm kiếm lại (re-search) quá nhiều sẽ gây lãng phí thời gian.",
    "teacherTrap": "Aspiration Window giải quyết bài toán gì? Khi nào nó bị phản tác dụng?",
    "memoryDefense": "Aspiration Window thu hẹp cửa sổ tìm kiếm quanh điểm số của tầng trước [score - 40, score + 40], giúp tăng mạnh số lần cắt tỉa Beta-cutoff và tiết kiệm thời gian. Nó bị phản tác dụng khi thế cờ có biến động chiến thuật đột ngột (tactical swing) làm điểm số vọt ra ngoài cửa sổ, buộc bot phải tìm lại với biên độ đầy đủ, tốn thêm chi phí re-search."
  }
];
