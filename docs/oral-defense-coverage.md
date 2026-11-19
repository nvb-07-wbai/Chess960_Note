# MA TRẬN PHỦ NỘI DUNG VẤN ĐÁP BẢO VỆ CHESSLAB – NHÓM 12

Tài liệu này xác nhận tính toàn vẹn và mức độ bao phủ 100% của hệ thống sổ tay học tập và mô phỏng vấn đáp **CHESSLAB NOTE – TEAM 12** dựa trên Báo cáo bài tập lớn `Chess960_Bot_Group12_AI2014-2.pdf` và mã nguồn thực tế tại commit `a9d4b4b`.

---

## 1. PHỦ TOÀN BỘ 25 HÀM & LỚP (BẢNG 7 & AST CHÍNH THỨC)

Mỗi hàm đều có hồ sơ chi tiết (Function Dossier): Vai trò, Input, Output, Thứ tự thực thi, Lý do thiết kế, Kịch bản lỗi và Bẫy vấn đáp của Giảng viên.

| STT | Tên Hàm / Lớp | Tệp | Phân loại | Tình trạng phủ |
|:---:|:---|:---|:---:|:---:|
| 1 | `StudentBot.__init__` | `student/bot.py` | Khởi tạo / Điều phối | Đầy đủ |
| 2 | `StudentBot.choose_move` | `student/bot.py` | Cốt lõi / Vòng đời 10 bước | Đầy đủ |
| 3 | `TimeBudget` (Dataclass) | `student/time_manager.py` | Cấu trúc dữ liệu | Đầy đủ |
| 4 | `compute_budget_ms` | `student/time_manager.py` | Cốt lõi / Tính toán ngân sách | Đầy đủ |
| 5 | `TimeManager.__init__` | `student/time_manager.py` | Khởi tạo | Đầy đủ |
| 6 | `TimeManager.should_stop` | `student/time_manager.py` | Cốt lõi / Giám sát ngắt | Đầy đủ |
| 7 | `TimeManager.can_start_next_depth` | `student/time_manager.py` | Cốt lõi / Dự báo Iterative | Đầy đủ |
| 8 | `_orient_table` | `student/evaluation.py` | Đối xứng PeSTO (XOR 56) | Đầy đủ |
| 9 | `_pk` | `student/evaluation.py` | Đóng gói 32-bit MG/EG | Đầy đủ |
| 10 | `_build_packed_pst` | `student/evaluation.py` | Tiền tính toán bảng điểm | Đầy đủ |
| 11 | `_build_king_zones` | `student/evaluation.py` | Bitboard Dynamic King Ring | Đầy đủ |
| 12 | `_popcount` | `student/evaluation.py` | Lệnh phần cứng CPU | Đầy đủ |
| 13 | `_pst_sum` | `student/evaluation.py` | Kernighan bit-trick | Đầy đủ |
| 14 | `_north_fill` & `_south_fill` | `student/evaluation.py` | Lan truyền bit Tốt thông | Đầy đủ |
| 15 | `_spread_files` | `student/evaluation.py` | Mặt nạ kiểm soát cột lân cận | Đầy đủ |
| 16 | `evaluate` | `student/evaluation.py` | Cốt lõi / Tapered Eval 4 tầng | Đầy đủ |
| 17 | `score_to_tt` | `student/search.py` | Chuẩn hóa điểm Mate độc lập ply | Đầy đủ |
| 18 | `score_from_tt` | `student/search.py` | Giải mã điểm Mate theo ply | Đầy đủ |
| 19 | `see` | `student/search.py` | Static Exchange Evaluation | Đầy đủ |
| 20 | `TTEntry` (Slots) | `student/search.py` | Cấu trúc bộ nhớ TT | Đầy đủ |
| 21 | `TranspositionTable` | `student/search.py` | Bảng băm Zobrist 524,288 mục | Đầy đủ |
| 22 | `Searcher._order_moves` | `student/search.py` | Sắp xếp nước đi 7 tầng | Đầy đủ |
| 23 | `Searcher._quiescence` | `student/search.py` | Tìm kiếm tĩnh & Delta Pruning | Đầy đủ |
| 24 | `Searcher._negamax` | `student/search.py` | Cốt lõi / 5 tầng cắt tỉa | Đầy đủ |
| 25 | `Searcher.search` | `student/search.py` | Cốt lõi / Iterative Deepening | Đầy đủ |

---

## 2. PHỦ 12 SIÊU THAM SỐ TRỌNG YẾU ("TẠI SAO LẠI LÀ CON SỐ NÀY?")

Tất cả 12 tham số đều có: Bản chất thuật toán, Lý do chọn giá trị, Hệ quả nếu tăng quá cao, Hệ quả nếu giảm quá thấp và Kịch bản 30 giây bảo vệ trước thầy cô.

1. **`TT_SIZE = 1 << 19` (524,288 mục)**: Tiêu thụ đúng ~16 MiB RAM, bitwise AND `key & (size - 1)` thay cho phép modulo `%`.
2. **`ASPIRATION_WINDOW = ±40 cp`**: Gần nửa giá trị Tốt (0.4 pawn), tỷ lệ duy trì trong cửa sổ đạt 83.4%, tránh re-search liên tục.
3. **`NULL MOVE REDUCTION: R = 2 + floor(d / 6)`**: Công thức động thích ứng, bảo vệ bot khỏi bẫy chiến thuật sâu khi depth tăng.
4. **`REVERSE FUTILITY PRUNING: margin = 120 * depth`**: Cắt tỉa tầng lá an toàn ở depth 1-2.
5. **`FUTILITY PRUNING: margin = 150 cp`**: Bỏ qua các nước tĩnh vô vọng ở tầng tiền-lá.
6. **`LATE MOVE REDUCTION (LMR): index >= 4, depth >= 3`**: Giảm 1-2 ply cho các nước tĩnh xếp cuối bảng ưu tiên.
7. **`DELTA PRUNING: 1,150 cp (Quân Hậu 950cp + Biên an toàn 200cp)`**: Tỉa sớm trong Quiescence Search, tiết kiệm 20% nút lá.
8. **`NODE CHECK FREQUENCY: nodes & 127 == 0 (Mỗi 128 nodes)`**: Bitwise 1 chu kỳ CPU, giảm overhead gọi hàm đo thời gian Python 128 lần, độ trễ phát hiện ngắt chỉ ~4-5 ms.
9. **`NGƯỠNG PANIC THỜI GIAN: 3.5s (Panic) & 1.5s (Extreme Panic)`**: Chuyển chế độ sinh tồn khi đồng hồ trận đấu chạm mức nguy hiểm.
10. **`GAME PHASE WEIGHTS: Knight=1, Bishop=1, Rook=2, Queen=4 (Tổng 24)`**: Công thức Tapered Evaluation nội suy mượt mà giữa MG và EG.
11. **`MÃ HÓA ĐÓNG GÓI PESTO 32-BIT: 0x8000 Sign Compensation`**: Cơ chế bù số âm 16-bit trong số nguyên 32-bit.
12. **`MOP-UP EVALUATION: Phase <= 6 & |score| >= 200 cp`**: Kích hoạt hàm dồn Vua đối phương vào góc và kéo Vua ta lại gần trong tàn cuộc thắng thế.

---

## 3. PHỦ 10 TÌNH HUỐNG THỰC CHIẾN (POS-01 ĐẾN POS-10 TỪ BẢNG 10 BÁO CÁO)

| ID | Trận đấu | FRC ID | Nước cờ | Thời gian | Điểm lượng giá | Cơ chế thuật toán |
|:---:|:---|:---:|:---:|:---:|:---:|:---|
| **POS-01** | vs Nhóm 3 | 601 | 13... Rfe8 | 1.133s | -588 cp | Threat Evasion Heuristic & Cột e mở |
| **POS-02** | vs Nhóm 3 | 601 | 24... Be3# | 0.680s | -Mate in 1 | MATE_SCORE Discounting |
| **POS-03** | vs Nhóm 11 | 24 | 18. Ne7+ | 1.403s | +890 cp | Killer Move & Ngã ba bắt đôi Hậu |
| **POS-04** | vs Nhóm 11 | 24 | 26. Rd8# | 0.825s | +Mate in 1 | Iterative Deepening & Checkmate PV |
| **POS-05** | vs Nhóm 8 | 120 | 27. Rxe7 | 1.708s | +1,240 cp | SEE Pruning (Ăn quân lời 5 Tốt) |
| **POS-06** | vs Nhóm 8 | 120 | 38. Qf7+ | 1.512s | +750 cp | Mop-Up Evaluation & Giữ áp lực |
| **POS-07** | vs Nhóm 13 | 152 | 8... b5 | 1.115s | -280 cp | Phản đòn cánh Vua trong FRC bất đối xứng |
| **POS-08** | vs Nhóm 3 (Lượt về) | 499 | 118... Kh7 | 2.467s | 0 cp | Nhận diện hòa 50 nước & Kỷ lục thời gian |
| **POS-09** | vs Nhóm 4 | 780 | 19. Nd5 | 1.620s | +310 cp | Áp lực thời gian khiến đối thủ hết giờ |
| **POS-10** | vs Nhóm 2 | 340 | 15... Nc6 | 1.340s | -420 cp | Rào cản độ sâu 4-ply & Bài học cờ thế |

---

## 4. PHỦ TOÀN DIỆN NGÂN HÀNG VẤN ĐÁP (262 CÂU HỎI ĐƯỢC CHUẨN HÓA CÓ ĐÁP ÁN ĐẦY ĐỦ)

- **177 Câu hỏi Chung (General Q&A)**: Bao quát toàn diện 10 chủ đề theo chuẩn học thuật:
  - *I. Tư duy thiết kế & Kiến trúc hệ thống* (Q1 - 15): Tách biệt ChessLab Host và StudentBot, luồng dữ liệu 10 bước, giao thức JSON qua pipe stdin/stdout, cô lập lỗi và vòng đời ván đấu.
  - *II. Đọc hiểu hàm và luồng dữ liệu `student/`* (Q16 - 30): Phân biệt depth vs ply, push/pop stack, đối tượng mutable, hàm công khai vs nội bộ, quy tắc khôi phục trạng thái bàn cờ.
  - *III. Đi sâu vào `search.py`* (Q31 - 60): Negamax, Alpha-Beta, Move Ordering 8 bậc Heuristic ưu tiên, SEE 1-ply, Killer Moves, History Heuristic, Quiescence Search + Delta Pruning (1,150 cp), Transposition Table 524,288 mục, Zobrist Hash 64-bit.
  - *IV. Đi sâu vào `evaluation.py`* (Q61 - 86): PeSTO Tapered Evaluation đóng gói 32-bit `_pk` giải nén bù hai `0x8000`, bảng Piece-Square Tables (PST) hai pha trung hòa cho Chess960, an toàn Vua động (Dynamic King Safety Ring bitwise phạt 15 cp/ô mở), điểm cặp Tượng (+30 cp), Tốt thông (+20 cp) và Mop-Up Evaluation.
  - *V. Đi sâu vào `time_manager.py`* (Q87 - 100): Phân bổ ngân sách thích ứng 6 phân tầng (`compute_budget_ms`), nguyên lý hấp thụ độ trễ hệ thống 500ms (`delay absorption`), Extreme Panic Mode (< 1.5s cấp 8–15 ms), kỷ lục 0% lỗi quá giờ (0 timeouts) trong suốt giải đấu.
  - *VI. Tham số & Siêu tham số "Tại sao lại là con số này?"* (Q101 - 115): Phân biệt tham số lý thuyết vs tinh chỉnh thực nghiệm, bảo vệ kích thước TT 2^19 (~16 MiB RAM vừa vặn Cache L3), Aspiration Windows $\pm 40$ cp, Delta Pruning 1,150 cp, hệ số k_risk = 0.005, khoảng cách điểm Move Ordering.
  - *VII. Tính đúng đắn & Kiểm thử phần mềm* (Q116 - 128): Cân bằng push/pop bằng try...finally, kiểm thử đối xứng hàm lượng giá qua gương (Mirror Test), tính tất định (Determinism), kiểm thử biên trên 960 thế cờ Chess960.
  - *VIII. Phân tích kết quả thi đấu & Tình huống POS thực chiến* (Q129 - 145): Phân tích nguyên nhân đạt 49 điểm (16 thắng, 1 hòa, 31 thua, Hạng 10/13 giải đấu), độ chính xác Stockfish 85.86%, rào cản độ sâu 4-ply trước đối thủ Cython/Rust 6-8 ply, giải phẫu POS-01 (đòn ghim cột e), POS-03 (MVV-LVA), POS-05 (bỏ lỡ Qd4), POS-06 (đổi Hậu mất ưu thế), POS-07 (thắng timeout đối thủ vi phạm trễ 500ms), POS-08 & POS-09 (tàn cuộc marathon 123 nước).
  - *Tổng quan bài toán & Cơ sở lý thuyết*: Shannon number, không gian trạng thái Chess960, luật nhập thành FRC, triệt tiêu Opening Book.

- **85 Câu hỏi Cá nhân & Chất vấn chéo (Member Q&A)** (21–22 câu / thành viên):
  - **Nông Văn Bách (MSSV: 25022782 - Trưởng nhóm - 30%)**: 21 câu chuyên sâu về kiến trúc tổng thể, luồng IPC trong `bot.py`, lớp `StudentBot` với Kiến trúc Phòng thủ 3 Tầng (`Fast-path 0ms`, `try...except`, hậu kiểm hợp lệ), phân bổ ngân sách 6 phân tầng bù trễ 500ms `compute_budget_ms` trong `time_manager.py`, bảng băm chuyển vị `TranspositionTable` ($2^{19} = 524,288$ mục) và quy trình Git review.
  - **Vũ Hoàng Long (MSSV: 25022922 - 25%)**: 21 câu chuyên sâu về Động cơ tìm kiếm đối kháng trung tâm trong `search.py`, lớp `Searcher`, hàm `_negamax`, Principal Variation Search (PVS), Tìm kiếm Lặp Sâu (IDS), Cửa sổ kỳ vọng (Aspiration Windows $\pm 40$ cp), chuẩn hóa điểm mate theo độ sâu (`score_to_tt/score_from_tt`), an toàn ngăn xếp `push/pop` trong `try...finally`.
  - **Lê Văn Việt (MSSV: 25023069 - 25%)**: 21 câu chuyên sâu về toàn bộ `evaluation.py` (611 LOC), PeSTO Tapered Evaluation với đóng gói 32-bit `_pk` và giải nén bù hai `0x8000`, nội suy pha liên tục $\phi \in [0, 24]$, Dynamic King Safety Ring bitwise cho 960 thế Chess960, lan truyền bit Tốt thông và Mop-Up Evaluation tàn cuộc.
  - **Đỗ Thành Vương (MSSV: 25023079 - 20%)**: 22 câu chuyên sâu về Move Ordering **8 bậc Heuristic ưu tiên** trong `_order_moves`, thuật toán Đánh giá Trao đổi Tĩnh 1-ply `see`, Quiescence Search `_quiescence` kết hợp **Delta Pruning (1,150 cp)**, các kỹ thuật cắt tỉa nâng cao (NMP động $R = 2 + \lfloor d/6 \rfloor$ kiểm tra Zugzwang, RFP, LMR), Killer Moves (2 slots) và mổ xẻ chiến thuật POS-05 & POS-10.

---

## 5. PHÒNG MÔ PHỎNG VẤN ĐÁP KHÔNG DÙNG CODE (ORAL DEFENSE SIMULATOR)

- **Mục tiêu**: Giúp sinh viên rèn luyện phản xạ phát biểu bằng lời không nhìn màn hình code.
- **Tính năng**:
  - 6 Chế độ thi: Thi ngẫu nhiên toàn diện, Thi theo thành viên (Bách/Long/Việt/Vương), Thi 25 hàm cốt lõi, Thi 12 tham số, Thi 10 ván đấu thực tế.
  - Đồng hồ đếm ngược 30 giây cho phản xạ ban đầu.
  - Checklist tự kiểm tra các ý chính trước khi lật đáp án.
  - Kịch bản 30 giây (Elevator Pitch) trả lời dứt khoát.
  - Đáp án chi tiết và các câu hỏi chất vấn mở rộng của giảng viên.
  - Bảng tự đánh giá (Chưa thuộc / Tạm ổn / Tự tin) lưu trữ cục bộ (localStorage).
