export interface AlgorithmDefenseQAItem {
  id: string;
  question: string;
  difficulty: 'basic' | 'medium' | 'advanced';
  categoryType: 'Lý thuyết cốt lõi' | 'Đào sâu mã nguồn' | 'Tình huống thực chiến' | 'Đánh đổi kỹ thuật';
  quickPitch: string;
  deepExplanation: string;
  codeRef?: {
    file: string;
    functionName: string;
    lines: string;
  };
  teacherFollowUp?: {
    question: string;
    answer: string;
  };
}

export const ALGORITHM_DEFENSE_QA: Record<string, AlgorithmDefenseQAItem[]> = {
  'state-space-game-tree': [
    {
      id: 'SS-01',
      question: 'Giải thích số Shannon và tại sao không thể dùng BFS / DFS vét cạn trong cờ vua?',
      difficulty: 'basic',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, số Shannon ước tính cây trò chơi cờ vua có khoảng 10^120 thế cờ khả dĩ. Với năng lực siêu máy tính hiện đại đạt 1 tỷ nút/giây, việc vét cạn bằng BFS/DFS sẽ mất 10^100 năm (vượt xa tuổi vũ trụ 10^10 năm). Hơn nữa, BFS sẽ tràn RAM ngay từ độ sâu 5 do phải lưu toàn bộ tầng cây (35^5 ≈ 5.2 x 10^7 nút). Vì vậy, bắt buộc phải dùng tìm kiếm có giới hạn độ sâu (Depth-limited Search) kết hợp hàm lượng giá Heuristic và cắt tỉa Alpha-Beta.',
      deepExplanation: 'Theo Báo cáo mục 1.1 và 2.1: Cờ vua có không gian trạng thái khoảng 10^43 và cây trò chơi b^d ≈ 35^80 ≈ 10^120. Thuật toán Minimax/Negamax dạng DFS của Nhóm 12 chỉ tiêu tốn bộ nhớ O(b * d) (vài chục kilobyte cho ngăn xếp đệ quy), trong khi BFS đòi hỏi O(b^d) gây cạn kiệt bộ nhớ ngay lập tức.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher.search',
        lines: 'L80-130'
      },
      teacherFollowUp: {
        question: 'Tại sao cờ vua lại là đồ thị có hướng (DAG) mà thuật toán lại duyệt theo dạng cây (Game Tree)?',
        answer: 'Dạ, vì các nước đi có thể hoán vị hoặc lặp lại tạo thành chu trình, nhưng thuật toán tìm kiếm mở rộng từng biến thể theo thời gian nên biểu diễn dưới dạng cây tìm kiếm; để tránh duyệt lại các nút trùng lặp trong đồ thị, nhóm sử dụng Bảng chuyển vị Transposition Table.'
      }
    },
    {
      id: 'SS-02',
      question: 'Sự khác nhau giữa ply và move trong cờ vua máy tính là gì?',
      difficulty: 'basic',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, trong cờ máy, 1 ply (half-move) là một lượt đi của một bên duy nhất (Trắng đi HOẶC Đen đi). 1 move (full-move) bao gồm 2 ply (Trắng đi xong Đen đi). Độ sâu tìm kiếm của bot luôn được đo bằng ply để kiểm soát chính xác từng lượt đổi quân.',
      deepExplanation: 'Trong giải đấu ChessLab, bot Nhóm 12 đạt độ sâu trung bình 4–5 ply, nghĩa là tính trước 2 nước đi trọn vẹn của cả hai bên. Việc phân biệt rõ ply và move giúp tránh ngộ nhận: bot đạt depth 4 nhìn xa 2 nước cờ đầy đủ chứ không phải 4 nước cờ.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._negamax',
        lines: 'L310-340'
      },
      teacherFollowUp: {
        question: 'Tại sao Quiescence Search lại không tính vào độ sâu ply cố định?',
        answer: 'Dạ, vì Quiescence Search co giãn động theo các nước ăn quân hỗn loạn để khử hiệu ứng chân trời, nó chỉ dừng lại khi bàn cờ tĩnh lặng nên không bị giới hạn bởi độ sâu ply cứng.'
      }
    },
    {
      id: 'SS-03',
      question: 'Cách Nhóm 12 đo đạc hệ số phân nhánh hiệu dụng (Effective Branching Factor - EBF)?',
      difficulty: 'advanced',
      categoryType: 'Đánh đổi kỹ thuật',
      quickPitch: 'Dạ thưa thầy, hệ số phân nhánh lý thuyết của cờ vua là b ≈ 35. Nhóm đo EBF thực tế qua tỷ số nút duyệt giữa hai độ sâu liên tiếp: EBF ≈ N(d) / N(d-1). Nhờ bộ sắp xếp nước đi Move Ordering 8 bậc Heuristic và cắt tỉa Alpha-Beta, EBF của bot giảm xuống chỉ còn khoảng 2.0 – 2.5.',
      deepExplanation: 'Ở độ sâu 4 bot duyệt ~10,000 nút, ở độ sâu 5 duyệt ~24,000 nút (24,000 / 10,000 = 2.4). Việc hạ EBF từ 35 xuống 2.4 tạo ra sự khác biệt hàm mũ: bot có thể nhìn sâu gấp đôi trong cùng một lượng tài nguyên thời gian hữu hạn.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._order_moves',
        lines: 'L120-170'
      },
      teacherFollowUp: {
        question: 'Nếu EBF = 1 thì cây tìm kiếm sẽ có hình dạng gì?',
        answer: 'Dạ, đó là cây đường thẳng đơn nhánh (trường hợp tối ưu tuyệt đối), xảy ra khi mọi nước đi đều bị cưỡng bức hoặc Move Ordering xếp đúng 100% nước đi tốt nhất lên đầu.'
      }
    }
  ],

  'zero-sum-games': [
    {
      id: 'ZS-01',
      question: 'Tại sao cờ vua lại là trò chơi có thông tin hoàn hảo và tổng bằng không (Zero-Sum)?',
      difficulty: 'basic',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, cờ vua là trò chơi Zero-Sum vì lợi ích của bên này là thiệt hại của bên kia (U_1 + U_2 = 0: Thắng = +1, Thua = -1, Hòa = 0). Cờ vua có Perfect Information vì cả hai đấu thủ đều quan sát được 100% trạng thái bàn cờ, không có yếu tố ngẫu nhiên (xúc xắc) hay thông tin ẩn giấu (như bài tây hay sương mù chiến tranh).',
      deepExplanation: 'Theo Báo cáo mục 2.1: Tính chất Zero-Sum là cơ sở toán học cho phép rút gọn thuật toán Minimax 2 hàm thành thuật toán Negamax 1 hàm duy nhất bằng công thức đối xứng max(a, b) = -min(-a, -b). Điểm số luôn mang tính tương đối (Relative Score): dương là có lợi cho bên đang đến lượt đi.',
      codeRef: {
        file: 'student/evaluation.py',
        functionName: 'evaluate',
        lines: 'L15-40'
      },
      teacherFollowUp: {
        question: 'Nếu một ván cờ hòa thì tính chất Zero-Sum có còn đúng không?',
        answer: 'Dạ vẫn đúng tuyệt đối vì 0 + 0 = 0, không có giá trị thặng dư nào tự sinh ra hay mất đi giữa hai bên.'
      }
    },
    {
      id: 'ZS-02',
      question: 'Chứng minh công thức đối xứng toán học của Negamax: max(a, b) = -min(-a, -b)?',
      difficulty: 'medium',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, lấy số đối của giá trị cực tiểu hóa số âm chính là phép cực đại hóa số dương. Nếu đối phương muốn cực tiểu hóa điểm của ta, tức là họ đang cực đại hóa điểm số của chính họ. Do đó ở mọi tầng đệ quy, hàm chỉ cần thực hiện phép tìm max(-score).',
      deepExplanation: 'Minimax gốc cần 2 hàm đệ quy riêng biệt: max_value() cho Trắng và min_value() cho Đen. Negamax gộp thành 1 hàm duy nhất: best_score = max(best_score, -negamax(child)). Điều này giúp mã nguồn ngắn hơn một nửa và loại trừ hoàn toàn nguy cơ sai lệch logic giữa hai màu quân.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._negamax',
        lines: 'L320-365'
      },
      teacherFollowUp: {
        question: 'Trong Python, việc đảo dấu số nguyên âm có bao giờ bị lỗi tràn số không?',
        answer: 'Dạ, số nguyên Python có độ dài tùy ý nên không tràn số, nhưng trong bảng PeSTO đóng gói 32-bit _pk, nhóm đã dùng kỹ thuật bù hai 0x8000 để xử lý an toàn.'
      }
    }
  ],

  'minimax-vs-negamax': [
    {
      id: 'MN-01',
      question: 'So sánh ưu điểm vượt trội của Negamax so với Minimax truyền thống trong mã nguồn cờ vua?',
      difficulty: 'basic',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, Negamax có 3 ưu điểm vượt trội: (1) Giảm 50% số dòng mã nguồn (từ 2 hàm lồng nhau thành 1 hàm duy nhất); (2) Loại bỏ hoàn toàn lỗi bất đối xứng logic giữa Trắng và Đen; (3) Tương thích tự nhiên với kỹ thuật cắt tỉa Alpha-Beta và lưu trữ Bảng chuyển vị Transposition Table.',
      deepExplanation: 'Trong Minimax, ta phải viết rẽ nhánh if is_maximizing với các phép so sánh ngược chiều (alpha ở max, beta ở min). Trong Negamax, mọi nút đều là nút MAX dưới góc nhìn của bên đang đi. Việc đổi vai trò chỉ đơn giản là đổi dấu điểm số: score = -self._negamax(board, depth - 1, -beta, -alpha, ply + 1).',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._negamax',
        lines: 'L310-360'
      },
      teacherFollowUp: {
        question: 'Tại sao cửa sổ [alpha, beta] lại bị đảo dấu và đổi vị trí thành [-beta, -alpha]?',
        answer: 'Dạ, vì khi đổi góc nhìn sang đối thủ, cận trên beta của ta biến thành cận dưới alpha của đối thủ (với dấu âm), và ngược lại cận dưới alpha của ta biến thành cận trên beta của đối thủ.'
      }
    },
    {
      id: 'MN-02',
      question: 'Trường hợp thế cờ hòa cuộc (Draw) được Negamax trả về điểm số bao nhiêu?',
      difficulty: 'basic',
      categoryType: 'Đào sâu mã nguồn',
      quickPitch: 'Dạ thưa thầy, thế cờ hòa cuộc (Stalemate, lặp lại 3 lần, luật 50 nước) luôn được trả về chính xác là 0 centipawns, phản ánh thế cân bằng tuyệt đối giữa hai bên.',
      deepExplanation: 'Nếu bot đang bị dẫn trước vật chất lớn (ví dụ -800 cp), việc đạt được điểm 0 (hòa cờ) là một thành công lớn. Ngược lại nếu bot đang hơn Hậu (+900 cp), điểm 0 sẽ bị coi là thất bại và bot sẽ né tránh các biến thể hòa cờ.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._negamax',
        lines: 'L300-315'
      },
      teacherFollowUp: {
        question: 'Tại sao điểm chiếu hết không dùng hằng số vô cùng float(\'inf\') mà dùng MATE_SCORE - ply?',
        answer: 'Dạ, để ép bot luôn chọn đường chiếu hết ngắn nhất (ít ply nhất) và kéo dài thời gian sống sót lâu nhất khi bị đối phương chiếu hết.'
      }
    }
  ],

  'alpha-beta-pruning': [
    {
      id: 'AB-01',
      question: 'Chứng minh Alpha-Beta Pruning không làm mất bất kỳ nước đi tối ưu nào so với Minimax gốc?',
      difficulty: 'medium',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, Alpha-Beta là thuật toán cắt tỉa bảo tồn (Sound Pruning). Nó chỉ cắt tỉa một nhánh khi đã chứng minh được rằng nhánh đó chắc chắn không bao giờ được chọn bởi đối thủ thông minh (vì đối phương đã có nước đi tốt hơn hoặc ta đã có nước đi tốt hơn ở nhánh trước). Giá trị trả về của Alpha-Beta bằng đúng 100% giá trị của Minimax.',
      deepExplanation: 'Điều kiện cắt tỉa alpha >= beta: alpha là điểm số tối thiểu bên đi chắc chắn đạt được, beta là điểm số tối đa bên phòng thủ cho phép bên đi đạt được. Nếu ở một nhánh con điểm số v >= beta, đối phương ở tầng trên sẽ không bao giờ cho phép ván cờ đi vào nhánh này. Do đó việc duyệt tiếp các nước còn lại của nhánh này là hoàn toàn vô nghĩa.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._negamax',
        lines: 'L340-370'
      },
      teacherFollowUp: {
        question: 'Độ phức tạp thời gian tốt nhất của Alpha-Beta là bao nhiêu và đạt được khi nào?',
        answer: 'Dạ, là O(b^(d/2)), đạt được khi nước đi tối ưu luôn được duyệt đầu tiên ở mọi nút (Move Ordering hoàn hảo).'
      }
    },
    {
      id: 'AB-02',
      question: 'Ý nghĩa trực quan của việc Alpha vượt qua Beta (Beta-cutoff / Fail-high) trong ván đấu thực tế?',
      difficulty: 'medium',
      categoryType: 'Tình huống thực chiến',
      quickPitch: 'Dạ thưa thầy, Beta-cutoff (Fail-high) xuất hiện khi bot tìm ra một nước cờ "quá tốt" khiến đối phương ở tầng trước bắt buộc phải né tránh. Bot không cần tìm hiểu xem nước đó tốt đến mức nào nữa mà cắt tỉa ngay để chuyển sang tính toán nhánh khác.',
      deepExplanation: 'Ví dụ bên Đen đang xét các nước đi của Trắng. Nếu Trắng có một nước ăn Hậu Đen (+900 cp), điểm này vượt qua ngưỡng beta mà Đen có thể chấp nhận. Đen biết ngay rằng nước đi trước đó dẫn vào thế cờ này là sai lầm và sẽ không đi nước đó. Thuật toán cắt tỉa toàn bộ các nước đi còn lại của Trắng tại nút này.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._negamax',
        lines: 'L350-365'
      },
      teacherFollowUp: {
        question: 'Hiện tượng Fail-low có nghĩa là gì?',
        answer: 'Dạ, Fail-low xảy ra khi tất cả các nước đi tại nút đều có điểm số <= alpha; nghĩa là bên đi không tìm được bất kỳ nước đi nào đáp ứng được kỳ vọng tối thiểu.'
      }
    }
  ],

  'move-ordering-heuristics': [
    {
      id: 'MO-01',
      question: 'Tại sao trong Move Ordering 8 bậc, TT Move lại được xếp ưu tiên cao nhất, vượt qua cả nước ăn Hậu?',
      difficulty: 'advanced',
      categoryType: 'Đào sâu mã nguồn',
      quickPitch: 'Dạ thưa thầy, vì TT Move là nước đi tốt nhất đã được kiểm chứng qua tìm kiếm sâu ở độ sâu trước đó (depth - 1), với độ tin cậy thực nghiệm đạt trên 90%. Nước ăn Hậu tuy hấp dẫn nhưng có thể là một cái bẫy thí Hậu đã được tính toán kỹ, trong khi TT Move đã vượt qua toàn bộ quá trình lượng giá chiến thuật sâu.',
      deepExplanation: 'Theo Báo cáo mục 4.2.4 và Bảng 11: Nhóm 12 phân tầng 8 bậc: (1) TT Move -> (2) Phong cấp Hậu -> (3) Threat Evasion -> (4) Good Captures (SEE >= 0) -> (5) Killer Moves -> (6) Safe Checks -> (7) Bad Captures (SEE < 0) -> (8) History Heuristic. Xếp TT Move lên đầu giúp tỷ lệ cắt tỉa ngay từ nhánh đầu tiên đạt hơn 75%.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._order_moves',
        lines: 'L125-175'
      },
      teacherFollowUp: {
        question: 'Tại sao Good Captures lại phân loại bằng SEE 1-ply thay vì MVV-LVA thuần túy?',
        answer: 'Dạ, vì MVV-LVA chỉ nhìn vào giá trị tĩnh của quân ăn và quân bị bắt, còn SEE 1-ply kiểm tra được ô đích có quân bảo kê hay không, tránh nhầm lẫn giữa ăn quân có lời và thí quân ngớ ngẩn.'
      }
    },
    {
      id: 'MO-02',
      question: 'Killer Moves và History Heuristic khác nhau như thế nào về phạm vi áp dụng?',
      difficulty: 'medium',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, Killer Moves mang tính chất cục bộ (Local Tactics) - lưu 2 nước đi tĩnh từng gây Beta-cutoff tại đúng độ sâu ply đó. History Heuristic mang tính chất toàn cục (Global History) - tích lũy tần suất gây cutoff của cặp (quân cờ, ô đích) trên toàn bộ cây tìm kiếm.',
      deepExplanation: 'Killer Moves giúp nhận diện các đòn phản công chiến thuật cụ thể tại cùng tầng cây (ví dụ nước chiếu giải vây). History Heuristic giúp sắp xếp thứ tự ưu tiên giữa các nước đi tĩnh bình thường khi không có nước Killer nào áp dụng được. Điểm History được chia đôi sau mỗi lượt đi (Aging/Decay) để thích ứng với thế trận mới.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._order_moves',
        lines: 'L150-180'
      },
      teacherFollowUp: {
        question: 'Tại sao không lưu 5 Killer Moves thay vì 2?',
        answer: 'Dạ, vì lưu quá nhiều Killer Moves sẽ làm loãng danh sách ưu tiên; 2 slots là con số vàng kinh điển được Stockfish và các engine hàng đầu thế giới chứng minh.'
      }
    }
  ],

  'iterative-deepening-aspiration': [
    {
      id: 'ID-01',
      question: 'Tại sao việc lặp lại từ depth 1, 2, 3.. không làm lãng phí thời gian so với nhảy thẳng vào depth 5?',
      difficulty: 'medium',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, vì cây trò chơi tăng trưởng theo cấp số nhân (b ≈ 2.5). Tổng số nút duyệt của toàn bộ các tầng trước (1 đến d-1) chỉ chiếm khoảng 30–40% số nút của tầng d. Chi phí nhỏ này được đền đáp gấp nhiều lần nhờ việc Bảng chuyển vị TT đã có sẵn dữ liệu và Move Ordering tối ưu, giúp tầng d duyệt nhanh hơn gấp bội.',
      deepExplanation: 'Nếu nhảy thẳng vào depth 5 mà không có TT từ các tầng trước, Move Ordering sẽ kém, Alpha-Beta phải duyệt gần như xấu nhất O(b^d), tốn thời gian gấp nhiều lần tổng thời gian của IDS. Ngoài ra, IDS là thuật toán Anytime: nếu hết giờ giữa chừng, bot luôn có sẵn nước đi hoàn chỉnh từ tầng d-1 để gửi đi ngay, 100% không bị timeout.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher.search',
        lines: 'L80-130'
      },
      teacherFollowUp: {
        question: 'Công thức toán học chứng minh tổng số nút các tầng trước nhỏ hơn tầng cuối là gì?',
        answer: 'Dạ, tổng cấp số nhân sum_{i=1}^{d-1} b^i = (b^d - b)/(b - 1). Với b >= 2.5, mẫu số b - 1 >= 1.5, do đó tổng các tầng trước luôn <= 2/3 tầng cuối.'
      }
    },
    {
      id: 'ID-02',
      question: 'Aspiration Windows ±40 cp hoạt động thế nào khi bị fail-low hoặc fail-high?',
      difficulty: 'advanced',
      categoryType: 'Đào sâu mã nguồn',
      quickPitch: 'Dạ thưa thầy, ở depth >= 4, thay vì tìm trong [-INF, +INF], bot tìm trong [prev_score - 40, prev_score + 40]. Nếu điểm trả về <= alpha (fail-low), bot mở rộng biên dưới ra -INF để tìm lại. Nếu điểm >= beta (fail-high), bot mở rộng biên trên ra +INF để tìm lại.',
      deepExplanation: '83.4% số thế cờ thực tế có điểm số ở tầng mới dao động trong khoảng ±40 cp của tầng cũ. Thu hẹp cửa sổ giúp Alpha-Beta cắt tỉa sâu hơn và duyệt nhanh hơn 20%. Khi bị lệch cửa sổ, lần Re-search diễn ra rất nhanh nhờ tận dụng lại các nhánh đã lưu vào TT.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher.search',
        lines: 'L100-145'
      },
      teacherFollowUp: {
        question: 'Tại sao Aspiration Windows không dùng cho depth 1, 2, 3?',
        answer: 'Dạ, vì ở các độ sâu nông, điểm số biến động rất mạnh do chưa hoàn tất chuỗi ăn quân, dùng cửa sổ hẹp sẽ gây re-search liên tục làm chậm bot.'
      }
    }
  ],

  'principal-variation-search': [
    {
      id: 'PV-01',
      question: 'Nguyên lý hoạt động của Principal Variation Search (PVS / NegaScout)?',
      difficulty: 'advanced',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, PVS giả định nước đi đầu tiên (PV-move) là nước đi tốt nhất nên duyệt với cửa sổ đầy đủ [-beta, -alpha]. Tất cả các nước đi còn lại chỉ cần chứng minh rằng chúng không thể vượt qua alpha nên được duyệt với Cửa sổ rỗng (Zero-Window: [-alpha - 1, -alpha]). Nếu một nước vượt qua alpha (fail-high), bot mới Re-search lại với cửa sổ đầy đủ.',
      deepExplanation: 'Zero-Window có độ rộng bằng 1 đơn vị, ép cây tìm kiếm phải kích hoạt Beta-cutoff với số lượng nút ít nhất. Trong thực tế giải đấu, PVS giúp Nhóm 12 giảm thêm khoảng 15-20% số nút so với Alpha-Beta cơ bản.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._negamax',
        lines: 'L325-365'
      },
      teacherFollowUp: {
        question: 'Điều gì quyết định hiệu quả của PVS?',
        answer: 'Dạ, chất lượng của Move Ordering: nếu nước đi đầu tiên thực sự là nước tốt nhất trong >85% trường hợp, PVS đạt hiệu quả tối đa.'
      }
    }
  ],

  'transposition-table-zobrist': [
    {
      id: 'TT-01',
      question: 'Bảng chuyển vị (Transposition Table) giải quyết vấn đề gì trong cờ vua?',
      difficulty: 'basic',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, trong cờ vua có hiện tượng chuyển vị (Transposition): các chuỗi nước đi khác nhau dẫn tới cùng một thế cờ (ví dụ 1. d4 Nf6 2. c4 e6 giống 1. c4 e6 2. d4 Nf6). Transposition Table lưu lại kết quả đánh giá của các thế cờ đã duyệt để tái sử dụng ngay lập tức trong O(1), tránh tính toán lại hàng triệu nút con.',
      deepExplanation: 'Bảng TT của Nhóm 12 có kích thước 2^19 = 524,288 mục (~16 MiB RAM), vừa vặn trong Cache L3 của CPU. Mỗi mục lưu: khóa Zobrist 64-bit, độ sâu depth, cờ giá trị (EXACT, LOWERBOUND, UPPERBOUND), điểm số đã chuẩn hóa và nước đi tốt nhất best_move. Tỷ lệ TT Cutoff thực tế đạt 25.4%.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'TranspositionTable',
        lines: 'L180-245'
      },
      teacherFollowUp: {
        question: 'Tại sao chỉ số băm lại tính bằng index = key & (size - 1)?',
        answer: 'Dạ, vì size = 2^19 là lũy thừa của 2, phép toán bitwise AND tương đương với phép chia lấy dư % size nhưng nhanh hơn gấp 4 lần ở mức vi xử lý.'
      }
    },
    {
      id: 'TT-02',
      question: 'Giải thích 3 loại cờ lưu trữ trong TT: EXACT, LOWERBOUND, UPPERBOUND?',
      difficulty: 'medium',
      categoryType: 'Đào sâu mã nguồn',
      quickPitch: 'Dạ thưa thầy, (1) EXACT: Điểm số chính xác nằm trong cửa sổ (alpha < score < beta); (2) LOWERBOUND: Điểm số >= beta (xảy ra fail-high / Beta-cutoff), thế cờ thực tế có thể còn tốt hơn giá trị lưu; (3) UPPERBOUND: Điểm số <= alpha (xảy ra fail-low), thế cờ thực tế không thể vượt qua giá trị lưu.',
      deepExplanation: 'Khi tra cứu lại từ TT ở một tầng tìm kiếm khác, nếu mục TT có độ sâu entry.depth >= current_depth: Với EXACT ta trả về ngay entry.score; với LOWERBOUND ta có thể nâng cận alpha = max(alpha, entry.score); với UPPERBOUND ta có thể hạ cận beta = min(beta, entry.score). Nếu alpha >= beta, ta cắt tỉa ngay mà không cần duyệt.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'TranspositionTable.probe',
        lines: 'L220-255'
      },
      teacherFollowUp: {
        question: 'Tại sao điểm chiếu hết phải chuẩn hóa qua score_to_tt và score_from_tt?',
        answer: 'Dạ, vì điểm mate phụ thuộc vào khoảng cách ply từ gốc; chuẩn hóa giúp điểm mate độc lập với vị trí trong cây tìm kiếm, tránh việc tái sử dụng sai lệch số nước chiếu hết.'
      }
    }
  ],

  'quiescence-search-see': [
    {
      id: 'QS-01',
      question: 'Hiệu ứng chân trời (Horizon Effect) là gì và Quiescence Search giải quyết nó như thế nào?',
      difficulty: 'medium',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, hiệu ứng chân trời xảy ra khi thuật toán tìm kiếm dừng ở độ sâu cố định (depth = 0) ngay giữa một cuộc tranh chấp quân cờ hỗn loạn, dẫn đến đánh giá sai lệch thế cờ (ví dụ vừa ăn Xe đối phương nhưng nước sau bị đối phương ăn lại Hậu). Quiescence Search tiếp tục mở rộng tìm kiếm các nước ăn quân và phong cấp Tốt cho đến khi bàn cờ tĩnh lặng hoàn toàn.',
      deepExplanation: 'Quiescence Search áp dụng kỹ thuật Stand-pat: tính điểm tĩnh của thế cờ hiện tại làm mốc an toàn. Nếu stand_pat >= beta, cắt tỉa ngay. Chỉ sinh các nước ăn quân bằng board.generate_legal_captures() và áp dụng Delta Pruning (1,150 cp) để loại bỏ các nước ăn quân vô vọng.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._quiescence',
        lines: 'L260-315'
      },
      teacherFollowUp: {
        question: 'Tại sao Delta Pruning lại lấy ngưỡng 1,150 cp?',
        answer: 'Dạ, vì bằng giá trị quân cờ đắt nhất là Hậu (950 cp) cộng thêm biên an toàn 200 cp. Nếu stand_pat + quân bị ăn + 1,150 cp < alpha thì ngay cả khi bắt được quân ta vẫn không thể cải thiện được alpha.'
      }
    },
    {
      id: 'QS-02',
      question: 'Thuật toán Static Exchange Evaluation (SEE 1-ply) hoạt động như thế nào?',
      difficulty: 'advanced',
      categoryType: 'Đào sâu mã nguồn',
      quickPitch: 'Dạ thưa thầy, SEE 1-ply đánh giá nhanh xem một nước ăn quân trên 1 ô cờ là có lời (Good Capture) hay lỗ (Bad Capture) mà không cần sinh đầy đủ cây tìm kiếm. Nếu giá trị quân bị ăn >= giá trị quân ăn, chắc chắn có lời (SEE >= 0). Nếu giá trị quân ăn lớn hơn, bot kiểm tra ô đích có quân đối phương bảo vệ hay không; nếu có bảo vệ thì đó là nước ăn quân lỗ (SEE < 0).',
      deepExplanation: 'SEE 1-ply chạy trong vài micro-giây, giúp hàm _order_moves phân loại chính xác các nước ăn quân vào Bậc 4 (Good Captures) hoặc Bậc 7 (Bad Captures), ngăn bot duyệt các nước thí quân ngớ ngẩn trước các nước Killer.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'see',
        lines: 'L90-120'
      },
      teacherFollowUp: {
        question: 'SEE 1-ply khác gì Full SEE?',
        answer: 'Dạ, Full SEE tính đệ quy toàn bộ chuỗi ăn quân của tất cả các quân cờ tập trung vào ô đó, tốn nhiều CPU; SEE 1-ply tối ưu hóa cho Python, giải quyết chính xác 95% tình huống thực tế.'
      }
    }
  ],

  'advanced-pruning-rfp-nmp-lmr': [
    {
      id: 'AP-01',
      question: 'Null Move Pruning (NMP) hoạt động như thế nào và điều kiện an toàn tránh bẫy Zugzwang là gì?',
      difficulty: 'advanced',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, NMP dựa trên giả định: nếu bên đi "bỏ lượt" (cho đối thủ đi 2 nước liên tiếp) mà đối thủ vẫn không thể tạo ra điểm số vượt qua beta, thì thế cờ của bên đi quá mạnh và có thể cắt tỉa nhánh này ngay lập tức. Công thức giảm sâu động của nhóm là R = 2 + floor(d / 6). Điều kiện an toàn: KHÔNG áp dụng khi đang bị chiếu hoặc trong tàn cuộc ít quân để tránh bẫy Zugzwang.',
      deepExplanation: 'Zugzwang là tình thế mà bất kỳ nước đi nào của người chơi cũng làm thế cờ của mình xấu đi (thường gặp trong tàn cuộc Vua và Tốt). Nếu áp dụng NMP trong thế Zugzwang, giả định "bỏ lượt an toàn" sẽ dẫn tới kết luận sai lầm hoàn toàn. Vì vậy, bot kiểm tra board.has_non_pawn_material(color) trước khi thực hiện Null Move.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._negamax',
        lines: 'L280-320'
      },
      teacherFollowUp: {
        question: 'Tại sao công thức NMP động là R = 2 + floor(d / 6)?',
        answer: 'Dạ, vì ở độ sâu lớn (depth >= 6), mức giảm sâu R = 3 giúp tăng tốc độ cắt tỉa mạnh hơn mà vẫn an toàn về mặt chiến thuật.'
      }
    },
    {
      id: 'AP-02',
      question: 'Reverse Futility Pruning (RFP) và Late Move Reductions (LMR) được áp dụng ở đâu?',
      difficulty: 'advanced',
      categoryType: 'Đào sâu mã nguồn',
      quickPitch: 'Dạ thưa thầy, RFP áp dụng ở tầng tiền-lá (depth <= 2): nếu evaluate(board) - 120 * depth >= beta, thế cờ quá ưu thế nên cắt tỉa ngay không cần duyệt nước đi. LMR áp dụng cho các nước tĩnh từ vị trí thứ 4 trở đi (index >= 4) ở depth >= 3: giảm độ sâu tìm kiếm thử r = 1 để tiết kiệm tài nguyên.',
      deepExplanation: 'LMR dựa trên hiệu quả của Move Ordering 8 bậc: các nước đi tĩnh xếp cuối danh sách hiếm khi là nước tốt nhất. Nếu nước bị giảm sâu gây fail-high, bot lập tức Re-search lại với độ sâu đầy đủ để đảm bảo an toàn tuyệt đối.',
      codeRef: {
        file: 'student/search.py',
        functionName: 'Searcher._negamax',
        lines: 'L290-340'
      },
      teacherFollowUp: {
        question: 'Tại sao RFP không áp dụng ở depth 5?',
        answer: 'Dạ, vì ở độ sâu lớn, các đòn phối hợp chiến thuật phức tạp có thể đảo ngược thế cờ nhanh chóng, dùng điểm tĩnh để cắt tỉa ở độ sâu lớn là cực kỳ nguy hiểm.'
      }
    }
  ],

  'pesto-tapered-evaluation': [
    {
      id: 'PE-01',
      question: 'PeSTO Tapered Evaluation hoạt động như thế nào và tại sao cần nội suy pha ván cờ (Game Phase)?',
      difficulty: 'medium',
      categoryType: 'Lý thuyết cốt lõi',
      quickPitch: 'Dạ thưa thầy, giá trị của các vị trí ô cờ thay đổi căn bản theo giai đoạn ván đấu (ví dụ ở Trung cuộc Vua cần ẩn nấp an toàn ở góc, nhưng ở Tàn cuộc Vua cần xông ra trung tâm để trợ chiến). PeSTO xây dựng 2 bảng PST riêng biệt: Midgame (MG) và Endgame (EG). Điểm số cuối cùng được nội suy tuyến tính liên tục theo Game Phase phi in [0, 24]: score = (mg * phi + eg * (24 - phi)) / 24.',
      deepExplanation: 'Bảng 8 Báo cáo quy định trọng số tính Game Phase: Mã=1, Tượng=1, Xe=2, Hậu=4 (tổng 2 bên = 24 điểm). Khi mới bắt đầu ván cờ phi = 24 (hoàn toàn MG), khi đổi hết quân nặng phi = 0 (hoàn toàn EG). Nội suy liên tục giúp hàm lượng giá không bị nhảy giật đột ngột giữa hai giai đoạn.',
      codeRef: {
        file: 'student/evaluation.py',
        functionName: 'evaluate',
        lines: 'L40-80'
      },
      teacherFollowUp: {
        question: 'Kỹ thuật bit-packing đóng gói 32-bit _pk và giải nén bù hai 0x8000 của Nhóm 12 là gì?',
        answer: 'Dạ, đóng gói 2 điểm số MG và EG vào một số nguyên 32-bit duy nhất mg + (eg << 16) + 0x8000, cho phép cộng dồn điểm vị trí của toàn bộ quân cờ trong 1 chu kỳ CPU và triệt tiêu lỗi tràn bit âm trong Python.'
      }
    },
    {
      id: 'PE-02',
      question: 'Thuật toán Dynamic King Safety Ring của Nhóm 12 giải quyết bài toán Chess960 như thế nào?',
      difficulty: 'medium',
      categoryType: 'Đào sâu mã nguồn',
      quickPitch: 'Dạ thưa thầy, trong Chess960, Vua khởi đầu ở vị trí ngẫu nhiên không cố định. Nhóm 12 xây dựng mặt nạ bitboard động (Dynamic King Ring) quét 8 ô lân cận xung quanh ô thực tế của Vua và phạt 15 cp cho mỗi cột mở hoặc nửa mở phía trước Vua, khuyến khích bot nhập thành và giữ khiên Tốt bảo vệ Vua.',
      deepExplanation: 'Kết hợp với Mop-Up Evaluation ở tàn cuộc thắng thế (phi <= 6 và |score| >= 200 cp): thưởng điểm cho việc đẩy Vua đối phương dạt ra biên/góc bàn cờ và kéo Vua ta lại gần để ép chiếu hết nhanh chóng (như đã chứng minh trong ván POS-09).',
      codeRef: {
        file: 'student/evaluation.py',
        functionName: '_build_king_zones',
        lines: 'L70-110'
      },
      teacherFollowUp: {
        question: 'Tại sao không dùng bảng điểm vị trí PST cờ chuẩn cho Chess960?',
        answer: 'Dạ, vì PST chuẩn gán điểm cao cho các ô nhập thành cố định (c1/g1); trong Chess960 nếu áp dụng máy móc sẽ phạt oan vị trí xuất phát ngẫu nhiên của quân cờ, khiến bot đi những nước vô nghĩa ở khai cuộc.'
      }
    }
  ],

  'tactical-delay-time-management': [
    {
      id: 'TM-01',
      question: 'Thuật toán quản lý thời gian compute_budget_ms hấp thụ độ trễ hệ thống 500ms như thế nào?',
      difficulty: 'advanced',
      categoryType: 'Đào sâu mã nguồn',
      quickPitch: 'Dạ thưa thầy, máy chủ ChessLab xử thua ngay lập tức nếu bot phản hồi khi đồng hồ tụt dưới ngưỡng trễ sàn 500ms. Hàm compute_budget_ms luôn trừ trước một khoảng đệm an toàn cố định, phân bổ ngân sách theo 6 phân tầng thích ứng và kích hoạt Extreme Panic Mode (< 1.5s cấp 8–15 ms) để đi ngay lập tức, giúp Nhóm 12 đạt kỷ lục 0% thua timeout trong suốt 48 ván giải đấu.',
      deepExplanation: 'Theo Báo cáo mục 4.2.7 và Bảng 9: 15 ván đấu của các đội khác đã bị xử thua timeout do không có khoảng đệm này (Nhóm 4 còn 333ms, Nhóm 11 còn 395ms ở POS-07). Lớp TimeManager giám sát thời gian ở mỗi 128 nodes (nodes & 127 == 0) và dự báo thời gian tầng sau predicted = elapsed * 2.2 để quyết định ngắt an toàn.',
      codeRef: {
        file: 'student/time_manager.py',
        functionName: 'compute_budget_ms / TimeManager',
        lines: 'L30-80'
      },
      teacherFollowUp: {
        question: 'Sự khác biệt giữa Soft Limit và Hard Limit trong quản lý thời gian là gì?',
        answer: 'Dạ, Soft Limit là ngưỡng thời gian tối ưu cho phép kết thúc tầng lặp sâu (khoảng 60-70% ngân sách); Hard Limit là trần tối đa tuyệt đối (100% ngân sách khả dụng), chạm tới là buộc phải ngắt tìm kiếm ngay lập tức.'
      }
    },
    {
      id: 'TM-02',
      question: 'Tại sao ngân sách suy nghĩ 150ms - 220ms ở trung cuộc không làm cạn kiệt thời gian của bot?',
      difficulty: 'medium',
      categoryType: 'Tình huống thực chiến',
      quickPitch: 'Dạ thưa thầy, vì ở khai cuộc và các nước đi bắt buộc (Fast-path 0ms), bot đi gần như tức thì, tích lũy được quỹ thời gian lớn. Hơn nữa ở mỗi nước đi bot nhận thêm bước nhảy thời gian (increment), kết hợp với cửa sổ trượt dự phóng số nước còn lại giúp quỹ thời gian luôn được duy trì bền bỉ tới tận nước 123.',
      deepExplanation: 'Trong ván marathon POS-08 (118 nước) và POS-09 (123 nước), công thức cửa sổ trượt moves_left = max(15, 50 - ply//2) bảo đảm mẫu số không bao giờ bằng 0, giúp bot phân bổ đều số giây còn lại và giành chiến thắng chiếu hết ở nước cuối cùng.',
      codeRef: {
        file: 'student/time_manager.py',
        functionName: 'compute_budget_ms',
        lines: 'L35-70'
      },
      teacherFollowUp: {
        question: 'Trận đấu nào ghi dấu ấn của chiến lược thắng ép giờ đối thủ?',
        answer: 'Dạ là trận short-p76-l1 gặp Nhóm 11: ở nước 75 Nhóm 12 tung Re2+ (POS-07), đối thủ chỉ còn 395ms không đủ ngưỡng trễ sàn 500ms nên bị xử thua timeout ngay lập tức.'
      }
    }
  ]
};
