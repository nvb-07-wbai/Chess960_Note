# SOURCE MAP & COMMIT AUDIT TRAIL — TEAM 12 CHESS960

## 1. Thông tin Phiên bản Mã nguồn Tham chiếu
- **Repository Nguồn (Source of Truth):** [uetlab-ai2014-2/uetlab-ai2014-2-Nhom12](https://github.com/uetlab-ai2014-2/uetlab-ai2014-2-Nhom12)
- **Local Path:** `D:\Học\BDTT\repositories\Nhom12`
- **Branch:** `main`
- **Commit Hash:** `a9d4b4b2f776b96f46a1c9ccf119cad38834e5d9`
- **Mã nhóm:** `nhom-12`
- **Tên đội:** *Tỉnh cơn say sẽ gay thằng bạn*

---

## 2. Thống kê Chi tiết Mã nguồn Học viên (`student/`)

| File | Số dòng | Số ký tự | Vai trò kiến trúc | Điểm nhấn kỹ thuật |
| :--- | :--- | :--- | :--- | :--- |
| `student/bot.py` | 97 | 3,365 | Lớp điều phối cấp cao `StudentBot` kết nối chấm điểm tự động | Phòng thủ 3 lớp, chống time out 0ms, post-validation |
| `student/time_manager.py` | 199 | 7,654 | Quản lý ngân sách thời gian thích ứng | Hấp thụ 500ms delay, hệ số rẽ nhánh 2.2x, Panic Mode |
| `student/evaluation.py` | 611 | 22,968 | Hàm đánh giá thế cờ tĩnh | PeSTO bit-packing, Dynamic King Safety Ring bitwise, Mop-Up |
| `student/search.py` | 1,938 | 72,504 | Bộ máy tìm kiếm Negamax đa kỹ thuật | TT 2^19, Aspiration Windows, PVS, Quiescence, LMR, RFP, NMP |
| **Tổng cộng** | **2,845** | **106,491** | **Toàn bộ hệ thống bot cờ vua Chess960** | **100% đối chiếu chính xác từng dòng** |

---

## 3. Bản đồ Ánh xạ Chức năng và Mã nguồn

### 3.1. `student/bot.py`
- L1-25: Khai báo import, định nghĩa class `StudentBot`.
- L26-44: `__init__`, khởi tạo `TimeManager`, `Searcher`, cờ `_last_was_forced`.
- L45-58: `choose_move` - Entry point nhận bàn cờ, bảo vệ khi bàn cờ kết thúc hoặc chỉ có 1 nước duy nhất (Forced move 0ms).
- L59-78: Gọi `time_manager.allocate()` và `searcher.search()`.
- L79-97: Bắt ngoại lệ và cơ chế dự phòng an toàn (Fallback `legal_moves[0]`).

### 3.2. `student/time_manager.py`
- L1-35: Khai báo lớp `TimeManager` và các tham số cấu hình.
- L36-95: Phương thức `allocate()`: Tính toán thời gian cho lượt đi, phân biệt Blitz ($\le 60\text{s}$) và Standard ($> 60\text{s}$).
- L96-130: Chiến lược hấp thụ 500ms server delay trong cờ chớp (150-220ms ở khai cuộc/trung cuộc).
- L131-165: Phương thức `should_stop()`: Đánh giá dừng tìm kiếm giữa các độ sâu IDS dựa trên hệ số tăng trưởng $2.2\times$.
- L166-199: Panic Mode khi thời gian còn lại $\le 1.5\text{s}$ (rút gọn còn 8-15ms).

### 3.3. `student/evaluation.py`
- L1-80: Hằng số giá trị quân cờ, bảng PeSTO (Middlegame và Endgame) đóng gói tuyến tính bit-packed `val = mg + (eg << 16)`.
- L81-165: Khởi tạo bảng đánh giá và hàm giải mã `unpack_pe_sto`.
- L166-260: Hàm đánh giá vị trí vua động `_build_king_zones` và Dynamic King Safety Ring (8 ô lân cận, khiên tốt, cột mở).
- L261-395: Đánh giá cấu trúc tốt (tốt cô lập, tốt chồng, tốt thông).
- L396-480: Cơ chế Mop-up Heuristic dồn vua đối phương ra biên ở tàn cuộc.
- L481-611: Hàm `evaluate()` tổng hợp, nội suy Tapered Eval theo Game Phase (tổng trọng số 24 điểm).

### 3.4. `student/search.py`
- L1-120: Khai báo hằng số vô cùng (`INF`), điểm chiếu hết (`MATE_SCORE`), cấu trúc `TTEntry` và lớp `TranspositionTable` ($2^{19}$ phần tử).
- L121-250: Cơ chế chuẩn hóa Mate score (`score_to_tt` và `score_from_tt`).
- L251-410: Lớp `Searcher`, khởi tạo bảng lịch sử (`history_table`), killer moves, counter moves.
- L411-580: Bộ sắp xếp nước đi `order_moves()` với 7 tầng ưu tiên (TT Move $\rightarrow$ MVV-LVA $\rightarrow$ Killer $\rightarrow$ Counter $\rightarrow$ History $\rightarrow$ Bad captures $\rightarrow$ Quiet).
- L581-720: Quiescence Search `quiescence()` với Stand-pat cutoff và Delta Pruning (1,150 cp, bảo vệ tốt hàng 7).
- L721-950: Cắt tỉa nhánh nông: Null Move Pruning (NMP, R=2/3), Reverse Futility Pruning (RFP, margin $120 \times \text{depth}$), Futility Pruning (depth 1, margin 150 cp).
- L951-1280: Late Move Reductions (LMR) cho nước đi thứ 4 trở đi và Principal Variation Search (PVS).
- L1281-1550: Đệ quy Negamax chính với Alpha-Beta Pruning và cập nhật Transposition Table.
- L1551-1780: Vòng lặp Iterative Deepening Search (IDS) kết hợp Aspiration Windows ($\delta = 40\text{ cp}$).
- L1781-1938: Hàm tìm kiếm giao diện `search()` kiểm soát timeout và bảo vệ ứng viên nước đi an toàn.

---

## 4. Minh bạch Sử dụng AI (AI_USAGE.md Summary)
- Tỷ lệ sinh viên tự nghiên cứu, thiết kế kiến trúc và gỡ lỗi: **> 85%**.
- Tỷ lệ hỗ trợ từ AI (gợi ý cú pháp, tham khảo thuật toán, tối ưu bitboard): **< 15%**.
- Thành tích thực nghiệm: Đấu 16 ván đối đầu chuẩn (Headless Benchmark), đạt kết quả **12 Thắng, 1 Hòa, 3 Thua**, tỷ lệ mắc lỗi ngớ ngẩn (blunder): **0%**.
