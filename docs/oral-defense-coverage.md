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

## 4. PHỦ BỘ CÂU HỎI VẤN ĐÁP (96 CÂU HỎI CÓ ĐÁP ÁN ĐẦY ĐỦ)

- **32 Câu hỏi Chung (General Q&A)**: Phân bố thành 6 nhóm: Bài toán & Chess960, Kiến trúc 10 bước & IPC, Thuật toán tìm kiếm & Alpha-Beta, Đánh giá thế cờ Tapered, Quản lý thời gian 3 lớp, Thực nghiệm giải đấu 48 ván.
- **64 Câu hỏi Cá nhân & Chất vấn chéo (Member Q&A)**: 16 câu / thành viên (8 câu chuyên trách + 8 câu chất vấn chéo).
  - **Nông Văn Bách (30% đóng góp)**: 8 câu về kiến trúc bot.py, IPC, TranspositionTable, phối hợp module + 8 câu chéo sang search/eval/move ordering.
  - **Vũ Hoàng Long (25% đóng góp)**: 8 câu về Negamax, Alpha-Beta, Aspiration Window, 5 tầng tỉa nhánh + 8 câu chéo sang bot/eval/time.
  - **Lê Văn Việt (25% đóng góp)**: 8 câu về PeSTO packed 32-bit, Bitboard King Safety Ring, Tapered Eval + 8 câu chéo sang search/time/bot.
  - **Đỗ Thành Vương (20% đóng góp)**: 8 câu về 8 tầng Move Ordering, MVV-LVA, SEE, Time Manager 3 lớp + 8 câu chéo sang eval/search/bot.

---

## 5. PHÒNG MÔ PHỎNG VẤN ĐÁP KHÔNG DÙNG CODE (ORAL DEFENSE SIMULATOR)

- **Mục tiêu**: Giúp sinh viên rèn luyện phản xạ phát biểu bằng lời không nhìn màn hình code.
- **Tính năng**:
  - 6 Chế độ thi: Thi ngẫu nhiên toàn diện, Thi theo thành viên (Bách/Long/Việt/Vương), Thi 25 hàm cốt lõi, Thi 12 tham số, Thi 10 ván đấu thực tế.
  - Đồng hồ đếm ngược 30 giây cho phản xạ ban đầu.
  - Checklist tự kiểm tra các ý chính trước khi lật đáp án.
  - Kịch bản 30 giây (Elevator Pitch) trả lời dứt khoát.
  - Đáp án chi tiết và các câu hỏi bẫy thầy cô sẽ vặn lại.
  - Bảng tự đánh giá (Chưa thuộc / Tạm ổn / Tự tin) lưu trữ cục bộ (localStorage).
