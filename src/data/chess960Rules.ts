export interface Chess960RuleItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'rules' | 'castling' | 'regulations' | 'tactics';
  summary: string;
  details: string[];
  illustration?: string;
  defenseNotes: string;
}

export const CHESS960_OVERVIEW = {
  name: 'Chess960 (Fischer Random Chess)',
  inventor: 'Đại kiện tướng Bobby Fischer (công bố năm 1996)',
  standardChessId: 518, // Thế cờ vua tiêu chuẩn có chess960_id = 518
  totalPositions: 960,
  coreMotivation: 'Xóa bỏ lợi thế ghi nhớ sách khai cuộc (Opening Books) hàng chục nước đi thuộc lòng, đưa cờ vua trở về đúng bản chất của tư duy sáng tạo, khả năng tính toán chiến thuật và lượng giá cờ từ nước đi đầu tiên.',
};

export const CHESS960_RULES: Chess960RuleItem[] = [
  {
    id: 'setup-rules',
    title: 'Quy tắc Sắp đặt 960 Thế cờ Xuất phát',
    subtitle: 'Nguyên lý toán học sinh 960 biến thể',
    category: 'rules',
    summary: 'Hàng quân phía sau của cả hai bên được xếp ngẫu nhiên theo một trong 960 thế cờ hợp lệ, bảo đảm tính công bằng tuyệt đối.',
    details: [
      'Hai quân Tượng (Bishops) bắt buộc phải nằm trên hai ô khác màu (1 ô màu sáng, 1 ô màu tối). Có 4 ô sáng và 4 ô tối -> 4 x 4 = 16 cách xếp.',
      'Vua (King) bắt buộc phải nằm giữa hai quân Xe (Rooks). Điều này bảo đảm luôn tồn tại một quân Xe ở cánh Vua (kingside) và một quân Xe ở cánh Hậu (queenside) để thực hiện luật nhập thành.',
      'Hàng Tốt giữ nguyên trạng thái ban đầu: Tốt Trắng ở hàng 2 (Rank 2), Tốt Đen ở hàng 7 (Rank 7).',
      'Quân Đen được xếp đối xứng gương tuyệt đối (mirror) với quân Trắng qua trục ngang bàn cờ.',
      'Mỗi thế cờ được định danh duy nhất bằng một số nguyên chess960_id từ 0 đến 959. Trong đó, chess960_id = 518 chính là thế cờ vua truyền thống tiêu chuẩn (RNBQKBNR).',
    ],
    defenseNotes: 'Giảng viên có thể hỏi: Tại sao lại là 960 thế? Trả lời: Tượng trắng có 4 cách, Tượng đen có 4 cách (16). Hậu có 6 ô trống còn lại (16*6 = 96). Hai Mã có C(5,2) = 10 cách xếp (96*10 = 960). Ba ô còn lại dành cho Xe-Vua-Xe chỉ có duy nhất 1 cách xếp hợp lệ vì Vua bắt buộc nằm giữa 2 Xe. Tổng cộng đúng 960 thế!',
  },
  {
    id: 'castling-rules',
    title: 'Quy tắc Nhập thành trong Chess960',
    subtitle: 'Vị trí đích giống hệt cờ vua tiêu chuẩn',
    category: 'castling',
    summary: 'Dù vị trí ban đầu của Vua và Xe ở bất kỳ ô nào, sau khi nhập thành, Vua và Xe luôn kết thúc ở đúng vị trí như trong cờ vua truyền thống!',
    details: [
      'Nhập thành cánh Vua (O-O / Kingside): Sau khi nhập thành, Vua Trắng luôn đứng ở ô g1 và Xe Trắng luôn đứng ở ô f1 (Vua Đen ở g8, Xe Đen ở f8).',
      'Nhập thành cánh Hậu (O-O-O / Queenside): Sau khi nhập thành, Vua Trắng luôn đứng ở ô c1 và Xe Trắng luôn đứng ở ô d1 (Vua Đen ở c8, Xe Đen ở d8).',
      'Điều kiện tiên quyết 1: Vua và quân Xe tham gia nhập thành đều chưa từng di chuyển từ đầu ván đấu.',
      'Điều kiện tiên quyết 2: Toàn bộ các ô nằm giữa ô xuất phát và ô đích của Vua, cũng như giữa ô xuất phát và ô đích của Xe, đều phải hoàn toàn trống (không có quân cờ nào khác cản trở).',
      'Điều kiện tiên quyết 3: Vua hiện tại không bị chiếu, không đi qua ô bị đối phương kiểm soát, và ô đích của Vua không bị đối phương kiểm soát.',
      'Đặc biệt trong Chess960: Có thể xảy ra trường hợp Vua hoặc Xe không cần di chuyển (nếu đã tình cờ đứng sẵn ở ô đích từ đầu), hoặc Vua và Xe hoán đổi vị trí cho nhau.',
    ],
    defenseNotes: 'Giảng viên hỏi: Thư viện python-chess xử lý nước nhập thành Chess960 như thế nào? Trả lời: python-chess biểu diễn nước đi nhập thành dưới dạng di chuyển của Vua ăn vào ô của Xe (ví dụ e1h1 hoặc b1a1). Bot của Nhóm 12 nhận diện chính xác qua board.castling_rights và các bitmask bitboard mà không tự suy đoán tọa độ.',
  },
  {
    id: 'special-moves',
    title: 'Các Nước đi Đặc biệt & Luật Cờ Vua',
    subtitle: 'Phong cấp, Bắt tốt qua đường, Chiếu hết',
    category: 'rules',
    summary: 'Toàn bộ các luật cờ vua quốc tế (FIDE) đều được giữ nguyên vẹn trong Chess960.',
    details: [
      'Bắt Tốt qua đường (En Passant): Xảy ra khi một Tốt nhảy 2 ô vượt qua ô bị kiểm soát bởi Tốt đối phương. Nước đi này chỉ có hiệu lực ngay tại lượt đi kế tiếp.',
      'Phong cấp (Pawn Promotion): Khi Tốt tiến tới hàng cuối cùng (hàng 8 với Trắng, hàng 1 với Đen), bắt buộc phải phong cấp thành Hậu, Xe, Tượng hoặc Mã.',
      'Chiếu và Chiếu hết (Checkmate): Vua bị tấn công và không có bất kỳ nước đi hợp lệ nào để giải chiếu -> Bên bị chiếu hết lập tức thua cuộc.',
      'Bí nước (Stalemate): Bên đến lượt đi không bị chiếu nhưng không có bất kỳ nước đi hợp lệ nào -> Ván cờ hòa ngay lập tức.',
      'Luật hòa 50 nước: Trong 50 nước đi liên tiếp (100 ply) không có nước đi Tốt nào và không có nước bắt quân nào -> Hòa cờ.',
      'Luật lặp cờ 3 lần (Threefold Repetition): Thế cờ cùng quyền nhập thành và quyền bắt tốt qua đường lặp lại 3 lần -> Hòa cờ.',
    ],
    defenseNotes: 'Giảng viên hỏi: Trong code, bot xử lý hòa lặp cờ và luật 50 nước ở đâu? Trả lời: Ở đầu hàm _negamax dòng 1285: if board.is_repetition(2) or board.halfmove_clock >= 100: return DRAW_SCORE. Lưu ý nhóm kiểm tra repetition(2) để tránh bị đối thủ ép hòa khi đang có ưu thế!',
  },
  {
    id: 'tournament-regulations',
    title: 'Quy định Thi đấu ChessLab & Ràng buộc Hệ thống',
    subtitle: 'Thể thức, giới hạn thời gian và tiêu chí nộp bài',
    category: 'regulations',
    summary: 'Các quy định chính thức của bài tập lớn môn Biểu diễn tri thức và tìm kiếm nâng cao (VNU-UET).',
    details: [
      'Thể thức thi đấu: Đấu vòng tròn một lượt, mỗi cặp đấu đối kháng 2 ván đổi bên (Trắng và Đen).',
      'Mỗi vòng đấu sử dụng chung một thế cờ Chess960 và cùng mức thời gian cho mọi cặp đấu. Thế cờ và thời gian được bốc thăm ngẫu nhiên sau khi đóng bài nộp.',
      'Tính điểm: Thắng được 1.0 điểm, Hòa được 0.5 điểm, Thua được 0.0 điểm.',
      'Thời gian thi đấu chính thức: Sinh ngẫu nhiên trong khoảng 180s đến 360s cho mỗi bên, không cộng thêm thời gian (No Increment +0s).',
      'Độ trễ sàn hệ thống: GameController áp dụng độ trễ ngẫu nhiên từ 500ms đến 1000ms cho mỗi nước đi (elapsed = max(search_ms, delay)).',
      'Giới hạn ván cờ: Tối đa 300 nước đi (ply). Nếu sau 300 ply chưa kết thúc, ván cờ được xử hòa.',
      'Xử thua kỹ thuật (Disqualification): Bot bị xử thua nếu phát sinh ngoại lệ không bắt được (crash), hết giờ, hoặc trả về nước đi không hợp lệ.',
      'Quy định mã nguồn: Chỉ nộp thư mục student/, team.json và AI_USAGE.md. Tổng dung lượng thư mục student/ không vượt quá 1 MiB (Nhóm 12 đạt ~154 KiB).',
      'Nghiêm cấm tuyệt đối: Không dùng Machine Learning, mạng neural, mô hình đã huấn luyện, sách khai cuộc, cơ sở dữ liệu tàn cuộc, hoặc gọi engine cờ bên ngoài.',
    ],
    defenseNotes: 'Giảng viên hỏi: Bot của nhóm có đáp ứng đúng quy định < 1 MiB và không dùng thư viện cấm không? Trả lời: Thư mục student/ của nhóm chỉ nặng 154 KiB, hoàn toàn viết bằng Python thuần túy với python-chess, không sử dụng bất kỳ file binary hay mô hình học máy nào.',
  },
  {
    id: 'chess960-tactics',
    title: 'Đặc thù Chiến thuật Khai cuộc Chess960',
    subtitle: 'Những cái bẫy chết người ở nước đi đầu tiên',
    category: 'tactics',
    summary: 'Chess960 có những thế cờ mà các ô Tốt a2/h2 không được bảo vệ ngay từ đầu, rất dễ bị bắt Hậu hoặc chiếu hết trong 2-3 nước.',
    details: [
      'Tốt không được bảo vệ: Ở một số thế cờ xuất phát, Tốt ở cột a hoặc h không có bất kỳ quân nào bảo vệ (ví dụ Xe và Tượng nằm lệch).',
      'Đòn tấn công đường chéo mở: Tượng đối phương có thể chiếu bắt Xe hoặc đe dọa trực diện Vua ngay ở nước thứ 2.',
      'Sự quan trọng của việc hoãn nhập thành: Không giống cờ vua chuẩn (thường nhập thành sớm ở nước 4-7), trong Chess960, nhiều thế cờ Vua đứng ở trung tâm hoặc cánh lại an toàn hơn là nhập thành vào vùng đang bị pháo kích.',
      'Cách Nhóm 12 thích ứng: Hàm King Ring của nhóm đánh giá an toàn Vua động theo ô thực tế, phạt nặng cột mở trước mặt Vua (phạt 36 cp cho cột mở hoàn toàn, 18 cp cho cột bán mở), giúp bot tự động củng cố phòng thủ ngay từ nước đầu tiên.',
    ],
    defenseNotes: 'Giảng viên hỏi: Tại sao không dùng Sách Khai cuộc (Opening Book) cho Chess960? Trả lời: 1. Ban tổ chức nghiêm cấm sử dụng sách khai cuộc. 2. Có tới 960 thế cờ, việc tạo sách khai cuộc cho cả 960 thế là bất khả thi trong giới hạn dung lượng 1 MiB. Do đó năng lực tính toán tìm kiếm và lượng giá vị trí ở các nước đầu là tối quan trọng.',
  },
];
