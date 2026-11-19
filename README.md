# CHESSLAB NOTE – TEAM 12 (Chess960 Oral Defense System)

> **Hệ thống Sổ tay Học tập, Đối chiếu Mã nguồn & Luyện thi Vấn đáp Đồ án Bot Cờ vua Chess960**  
> Môn học: **Biểu diễn tri thức và tìm kiếm nâng cao (INT3401)** — Đại học Công nghệ, ĐHQGHN (VNU-UET).  
> Nhóm 12: **Tỉnh cơn say sẽ gay thằng bạn** (`nhom-12`).

[![Deploy Website to GitHub Pages](https://github.com/nvb-07-wbai/Chess960_Note/actions/workflows/deploy.yml/badge.svg)](https://github.com/nvb-07-wbai/Chess960_Note/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-blue.svg)](https://nvb-07-wbai.github.io/Chess960_Note/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.0-38b2ac.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg?logo=vite)](https://vitejs.dev/)

---

## 🎯 1. Mục tiêu Dự án

Website **CHESSLAB NOTE – TEAM 12** được xây dựng nhằm phục vụ công tác ôn tập, học hiểu mã nguồn và bảo vệ vấn đáp chuyên sâu cho tất cả các thành viên Nhóm 12:
- Nắm vững kiến trúc đa tầng của hệ thống cờ vua tự hành đối kháng.
- Giải thích cặn kẽ từng dòng code trong 4 module học viên: `bot.py`, `search.py`, `evaluation.py`, `time_manager.py`.
- Bảo vệ các quyết định kỹ thuật cốt lõi (tại sao chọn Aspiration Window, Dynamic King Safety Ring bitwise, Delay Absorption thay vì hằng số cố định).
- Trả lời tự tin 48 câu hỏi vấn đáp (lý thuyết thuật toán, truy vết mã nguồn và xử lý kịch bản thi đấu thực chiến).

---

## 🌟 2. Các Tính năng Nổi bật

### 🔍 2.1. Code Explorer 2 cột tương tác
- **Đồng bộ 100% với mã nguồn gốc:** 4 file chính với tổng cộng 2,825 dòng code (`search.py` 1,938 dòng, `evaluation.py` 611 dòng, `time_manager.py` 199 dòng, `bot.py` 97 dòng).
- Trích xuất cú pháp trực quan, số dòng chính xác, click để xem chú thích chi tiết, lý do nhóm hiện thực và góc nhìn phản biện của giảng viên.
- Nút copy nhanh từng đoạn mã phục vụ thảo luận.

### 🧠 2.2. Kho lý thuyết 15 chuyên đề thuật toán
1. **Minimax & Negamax:** Đơn giản hóa đối xứng minimax, công thức toán học và cài đặt đệ quy.
2. **Alpha-Beta Pruning:** Cắt tỉa nhánh dư thừa, điều kiện fail-high/fail-low.
3. **Iterative Deepening Search (IDS):** Tìm kiếm sâu dần từ depth 1 đến 64 kết hợp Time Limit check.
4. **Transposition Table (TT):** Bảng chuyển vị 524,288 phần tử với Zobrist hashing, 3 loại Bound và cơ chế chuẩn hóa Mate Score (`score_to_tt` / `score_from_tt`).
5. **Move Ordering (7 Tầng Ưu Tiên):** TT Move $\rightarrow$ Good Captures (MVV-LVA + SEE $\ge 0$) $\rightarrow$ Killer Moves $\rightarrow$ Counter Moves $\rightarrow$ History Heuristic $\rightarrow$ Bad Captures $\rightarrow$ Quiet Moves.
6. **Aspiration Windows:** Cửa sổ kỳ vọng hẹp $[\alpha - \delta, \beta + \delta]$ với $\delta = 40\text{ cp}$ giảm số node cần duyệt ở các depth cao.
7. **Principal Variation Search (PVS):** Duyệt nước đi đầu tiên với full-window, các nước sau duyệt Zero-Window $[-\alpha-1, -\alpha]$.
8. **Quiescence Search & Delta Pruning:** Khắc phục Horizon Effect, Stand-pat cutoffs, Delta margin 1,150 cp và bảo vệ tốt phong cấp ở hàng 7/2.
9. **Null Move Pruning (NMP):** Dự đoán nước đi vô nghĩa (R=2 hoặc 3), bảo vệ chống Zugzwang bằng `has_pieces`.
10. **Reverse Futility Pruning (RFP / Static NMP):** Cắt tỉa ở lá nông (depth $\le 2$) dựa trên Static Eval và margin $120 \times \text{depth}$.
11. **Futility Pruning:** Cắt tỉa tại depth 1 cho các nước đi không ăn quân khi eval cách xa alpha.
12. **Late Move Reductions (LMR):** Giảm độ sâu tìm kiếm 1 ply cho các nước đi yên tĩnh từ thứ 4 trở đi, re-search nếu fail-high.
13. **PeSTO Piece-Square Tables & Tapered Evaluation:** Nội suy tuyến tính điểm Middlegame / Endgame theo Game Phase (tổng trọng số 24 điểm).
14. **Dynamic Bitwise King Safety Ring:** Vành đai an toàn vua 8-hướng tính theo tọa độ thực, tính khiên tốt gần/xa và cột mở/nửa mở.
15. **Delay-Aware Time Management:** Phân bổ thời gian thông minh dựa trên việc hấp thụ 500ms server delay của nền tảng ChessLab.

### 🎮 2.3. Các Trình mô phỏng & Widget Trực quan Tương tác
- **Live Time Calculator:** Nhập thời gian còn lại và chế độ cờ (Blitz $\le 60\text{s}$ hoặc Standard $> 60\text{s}$) để xem thuật toán Nhóm 12 tính toán ngân sách thời gian thực tế, dự báo thời gian nhánh kế tiếp ($2.2\times$) và kích hoạt Panic Mode.
- **Interactive Chessboard & Heatmap Viewer:** Bàn cờ 8x8 tương tác trực quan hóa trọng số PeSTO (Middlegame / Endgame) và chế độ **King Safety Ring Bitwise** (click đặt vua để xem vành đai bảo vệ, khiên tốt và cột mở).
- **Architecture Flow Inspector:** Sơ đồ kiến trúc toàn hệ thống, click từng khối (Grader, StudentBot, TimeManager, Searcher, TranspositionTable, Evaluation) để xem API, file nguồn và vai trò.
- **8-Step Move Lifecycle Stepper:** Quy trình 8 bước bảo vệ nước đi từ lúc nhận bàn cờ đến khi gửi nước đi hợp lệ.
- **Minimax vs Alpha-Beta Visualizer:** Minh họa cơ chế cắt tỉa $\beta$-cutoff giảm số lượng node phải duyệt.
- **Move Ordering 7-Tier Simulator:** Thử nghiệm xáo trộn danh sách nước đi và mô phỏng sắp xếp với điểm đánh giá từng nước.
- **Transposition Table Simulator:** Thử nghiệm lưu trữ Zobrist key, giải thích chuẩn hóa Mate Score theo độ sâu ply.

### ❓ 2.4. Ngân hàng 48 Câu hỏi Vấn đáp & Thi thử Flashcard
- **48 Câu hỏi đầy đủ đáp án:**
  - 15 câu Tổng quan & Lý thuyết cơ bản.
  - 18 câu Đi sâu vào Mã nguồn (Code Deep-Dive).
  - 15 câu Tình huống & Khắc phục sự cố (Scenario & Edge Cases).
- **Bộ lọc thông minh:** Lọc theo chủ đề, tìm kiếm từ khóa, đánh dấu câu hỏi quan trọng (`Bookmark`).
- **Phần "Thầy cô sẽ hỏi vặn gì?":** Chuẩn bị trước các bẫy câu hỏi thường gặp khi bảo vệ đồ án.
- **Phòng thi thử Flashcard (Practice Quiz):**
  - Chế độ bấm giờ 30 giây trả lời nhanh (Elevator Pitch).
  - Lật thẻ xem phân tích chi tiết và đối chiếu code.
  - Đánh giá mức độ tự tin (Chưa thuộc / Tạm ổn / Tự tin).
  - Lưu tiến độ học tập vào `localStorage`.

---

## 🏗️ 3. Kiến trúc Mã nguồn & Công nghệ

### 3.1. Stack công nghệ
- **Core:** React 19, TypeScript 5.9, Vite 6.
- **Styling:** Tailwind CSS v4, JetBrains Mono & Be Vietnam Pro fonts.
- **Icons:** Lucide React.
- **Deployment:** GitHub Pages thông qua GitHub Actions (`deploy-pages@v4`).

### 3.2. Cấu trúc thư mục
```
web/
├── .github/workflows/deploy.yml   # CI/CD tự động deploy lên GitHub Pages
├── public/
│   └── chess-knight.svg           # Favicon biểu tượng cờ vua
├── src/
│   ├── components/
│   │   ├── common/                # UI primitives (Badge, SectionHeader, etc.)
│   │   ├── sections/              # Các trang chuyên đề chính
│   │   │   ├── OverviewSection.tsx
│   │   │   ├── ArchitectureSection.tsx
│   │   │   ├── CodeExplorerSection.tsx
│   │   │   ├── TheorySection.tsx
│   │   │   ├── Chess960Section.tsx
│   │   │   ├── QuestionsBankSection.tsx
│   │   │   ├── PracticeQuizSection.tsx
│   │   │   ├── GlossarySection.tsx
│   │   │   └── SourceMapSection.tsx
│   │   ├── widgets/               # Các công cụ tương tác & mô phỏng
│   │   │   ├── TimeCalculator.tsx
│   │   │   ├── ChessboardViewer.tsx
│   │   │   ├── ArchitectureDiagram.tsx
│   │   │   ├── MoveLifecycleStepper.tsx
│   │   │   ├── AlphaBetaVisualizer.tsx
│   │   │   ├── MoveOrderingVisualizer.tsx
│   │   │   └── TranspositionTableDemo.tsx
│   │   ├── Navbar.tsx             # Thanh điều hướng trên cùng & Search trigger
│   │   ├── Sidebar.tsx            # Menu trượt danh mục sổ tay
│   │   └── GlobalSearchModal.tsx  # Tìm kiếm nhanh toàn hệ thống (Ctrl+K)
│   ├── data/                      # Tầng dữ liệu chuẩn hóa từ mã nguồn gốc
│   │   ├── teamInfo.ts            # Thông tin nhóm 12, thành viên, commit hash
│   │   ├── systemArchitecture.ts  # Node kiến trúc & 8 bước vòng đời
│   │   ├── codeModules.ts         # Toàn bộ code & chú thích chi tiết 4 file
│   │   ├── algorithms.ts          # 15 chủ đề thuật toán chuyên sâu
│   │   ├── chess960Rules.ts       # Luật Chess960 & quy chế giải đấu
│   │   ├── questionsBank.ts       # 48 câu hỏi vấn đáp chia 3 nhóm
│   │   └── glossary.ts            # 35 thuật ngữ AI & Chess Engine
│   ├── types/index.ts             # Định nghĩa Type an toàn
│   ├── App.tsx                    # Điều hướng Router hash & State ứng dụng
│   ├── main.tsx
│   └── index.css                  # Tailwind v4 theme & code highlighting
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 4. Hướng dẫn Chạy Thử & Phát triển Local

### 4.1. Yêu cầu môi trường
- **Node.js:** Phiên bản `>= 18.x` (khuyến nghị `20.x` hoặc `22.x`).
- **NPM:** Phiên bản `>= 9.x`.

### 4.2. Cài đặt và khởi chạy
```bash
# Di chuyển vào thư mục web
cd web

# Cài đặt thư viện phụ thuộc
npm install

# Khởi chạy dev server với Hot Module Replacement
npm run dev
```
Trình duyệt sẽ mở tại `http://localhost:5173/`.

### 4.3. Kiểm tra kiểu và đóng gói production
```bash
# Biên dịch TypeScript và build bundle tối ưu
npm run build

# Xem thử bản build production
npm run preview
```

---

## 🌐 5. Cấu hình Kích hoạt GitHub Pages

Để kích hoạt website tự động chạy trên GitHub:
1. Truy cập repository [nvb-07-wbai/Chess960_Note](https://github.com/nvb-07-wbai/Chess960_Note).
2. Vào **Settings** $\rightarrow$ **Pages** (ở thanh menu bên trái).
3. Tại mục **Build and deployment**:
   - **Source:** Chọn **GitHub Actions**.
4. Khi push code lên nhánh `main`, workflow `.github/workflows/deploy.yml` sẽ tự động kích hoạt, đóng gói và phát hành website tại:  
   👉 **`https://nvb-07-wbai.github.io/Chess960_Note/`**

---

## 👥 6. Thông tin Nhóm 12 (UET)

- **Đơn vị:** Khoa Công nghệ Thông tin, Trường Đại học Công nghệ — ĐHQGHN.
- **Mã nhóm:** `nhom-12`
- **Tên hiển thị:** *Tỉnh cơn say sẽ gay thằng bạn*
- **Thành viên:**
  1. **25022782** — Nông Văn Bách (*Nhóm trưởng* - Search Engine, Quiescence, Pruning & Move Ordering)
  2. **25022922** — Vũ Hoàng Long (Time Management, Benchmark & Profiling)
  3. **25023069** — Lê Văn Việt (Evaluation Function, PeSTO & Dynamic King Safety)
  4. **25023079** — Đỗ Thành Vương (Bot Coordination, Chess960 Castling & Fallback Safety)

---
*Ghi chú: Toàn bộ nội dung lý thuyết, phân tích dòng mã và ngân hàng câu hỏi được đối chiếu trực tiếp từ phiên bản mã nguồn tham chiếu commit `a9d4b4b2f776b96f46a1c9ccf119cad38834e5d9` của repository [uetlab-ai2014-2-Nhom12](https://github.com/uetlab-ai2014-2/uetlab-ai2014-2-Nhom12).*
