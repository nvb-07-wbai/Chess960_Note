import type { AlgorithmTopic } from '../types';

export const ALGORITHM_TOPICS: AlgorithmTopic[] = [
  {
    id: 'state-space-game-tree',
    title: 'Không gian Trạng thái & Cây Trò chơi (Game Tree)',
    category: 'Cơ sở lý thuyết',
    definition: 'Cây trò chơi là một đồ thị có hướng không chu trình (DAG) trong đó mỗi nút biểu diễn một trạng thái bàn cờ, các cạnh biểu diễn các nước đi hợp lệ chuyển đổi giữa các trạng thái. Gốc của cây là thế cờ hiện tại.',
    principle: 'Số lượng trạng thái trong cờ vua ước tính đạt số Shannon (khoảng 10^120 trạng thái), với hệ số phân nhánh trung bình b ≈ 35 và độ dài ván đấu trung bình d ≈ 80. Do đó, việc duyệt toàn bộ cây trò chơi là bất khả thi về mặt tính toán. Mọi bot cờ vua thực tế phải giới hạn độ sâu tìm kiếm d và sử dụng hàm heuristic để xấp xỉ giá trị của các nút lá.',
    formula: 'Số lượng nút tại độ sâu d: N(d) = b^d (trong đó b là hệ số phân nhánh, d là độ sâu ply)',
    pseudocode: `function TraverseGameTree(state, depth):
    if depth == 0 or state.is_terminal():
        return evaluate(state)
    for move in state.legal_moves():
        child = state.apply(move)
        TraverseGameTree(child, depth - 1)`,
    team12Implementation: {
      file: 'student/search.py',
      functionName: '_negamax & search',
      lines: '1203 – 1938',
      description: 'Nhóm 12 giới hạn độ sâu theo thời gian thực (Time-limited Search) thông qua kỹ thuật Đào sâu lặp (Iterative Deepening Search). Thay vì duyệt b^d mù quáng, bot sử dụng Alpha-Beta, Move Ordering và các tầng cắt tỉa toán học để giảm b hiệu dụng từ 35 xuống còn ~2.2.',
      rationale: 'Hạn chế bùng nổ tổ hợp trong quỹ thời gian thi đấu có hạn của giải đấu ChessLab (45s - 360s).',
      limitations: 'Do giới hạn thời gian thực tế, bot thường đạt độ sâu 5 - 8 ply ở trung cuộc, có thể gặp khó khăn nếu gặp đòn phối hợp chiến thuật sâu trên 10 ply không nằm trong Quiescence Search.',
    },
    defensePoints: [
      'Giải thích số Shannon và tại sao không thể dùng BFS / DFS vét cạn trong cờ vua.',
      'Sự khác nhau giữa ply (nửa nước đi của một bên) và move (nước đi đầy đủ gồm Trắng đi và Đen đi).',
      'Cách Nhóm 12 đo đạc hệ số phân nhánh hiệu dụng (EBF ≈ 2.2).',
    ],
    widgetType: 'tree',
  },
  {
    id: 'zero-sum-games',
    title: 'Trò chơi Đối kháng Tổng bằng Không (Zero-Sum Games)',
    category: 'Cơ sở lý thuyết',
    definition: 'Cờ vua là một trò chơi đối kháng 2 người chơi có thông tin hoàn hảo (perfect information) và tổng bằng không (zero-sum). Lợi ích của người chơi này chính là thiệt hại tương ứng của người chơi kia: Điểm(Trắng) + Điểm(Đen) = 0.',
    principle: 'Trong mọi trạng thái, mục tiêu của bên đang đi là tối đa hóa điểm số của mình (Max), đồng nghĩa với việc tối thiểu hóa điểm số của đối thủ (Min). Tính chất đối xứng này cho phép chuyển đổi thuật toán Minimax 2 pha phức tạp thành một thuật toán Negamax đơn nhất duy nhất.',
    formula: 'max(A, B) == -min(-A, -B) hay Score(Turn) = -Score(Opponent)',
    pseudocode: `function EvaluateZeroSum(state, perspective):
    score = static_eval(state) # Luôn tính theo góc nhìn Trắng
    if perspective == BLACK:
        return -score
    return score`,
    team12Implementation: {
      file: 'student/evaluation.py',
      functionName: 'evaluate',
      lines: '610 – 611',
      description: 'Dòng cuối cùng của hàm evaluate luôn chuẩn hóa điểm số trả về theo góc nhìn của bên đang đến lượt đi: return score + TEMPO_BONUS if board.turn else TEMPO_BONUS - score. Điều này đảm bảo tính tương thích toán học tuyệt đối với Negamax.',
      rationale: 'Đơn giản hóa mã nguồn, triệt tiêu mã lặp và giảm 50% nguy cơ nhầm lẫn dấu âm/dương khi viết thuật toán đệ quy.',
      limitations: 'Phải cẩn trọng tuyệt đối khi tính điểm hòa cờ (DRAW_SCORE = 0) và điểm chiếu hết (MATE_SCORE) để không bị đảo dấu sai ở các tầng chẵn/lẻ.',
    },
    defensePoints: [
      'Tại sao cờ vua lại là trò chơi có thông tin hoàn hảo? (Cả 2 bên đều nhìn thấy toàn bộ bàn cờ, không có yếu tố ngẫu nhiên như xúc xắc hay sương mù chiến tranh).',
      'Chứng minh công thức đối xứng toán học: max(a, b) = -min(-a, -b).',
    ],
  },
  {
    id: 'minimax-vs-negamax',
    title: 'Thuật toán Minimax & Biến thể Negamax',
    category: 'Thuật toán tìm kiếm',
    definition: 'Minimax là thuật toán ra quyết định kinh điển trong lý thuyết trò chơi. Negamax là một biến thể viết ngắn gọn của Minimax dựa trên tính chất zero-sum: giá trị tốt nhất cho người chơi hiện tại bằng phủ định của giá trị tốt nhất cho người chơi tiếp theo.',
    principle: 'Thay vì viết 2 hàm maximize() và minimize() riêng biệt, Negamax chỉ cần đúng 1 hàm duy nhất. Tại mỗi bước đệ quy, điểm số trả về từ tầng con được đổi dấu (-) và khoảng tìm kiếm [alpha, beta] được đảo ngược thành [-beta, -alpha].',
    formula: 'Negamax(node) = max_{child} (-Negamax(child))',
    pseudocode: `function Negamax(state, depth, alpha, beta):
    if depth == 0 or state.is_terminal():
        return evaluate(state) # Theo góc nhìn state.turn
    max_eval = -INFINITY
    for move in state.legal_moves():
        state.push(move)
        score = -Negamax(state, depth - 1, -beta, -alpha)
        state.pop()
        max_eval = max(max_eval, score)
        alpha = max(alpha, score)
        if alpha >= beta:
            break # Beta Cutoff
    return max_eval`,
    team12Implementation: {
      file: 'student/search.py',
      functionName: 'Searcher._negamax',
      lines: '1203 – 1625',
      description: 'Triển khai Negamax chuẩn mực, gọi đệ quy score = -self._negamax(board, depth - 1, -beta, -alpha, ply + 1, tm, True). Toàn bộ điểm số trong cây tìm kiếm luôn nhất quán theo góc nhìn của bên đang đi tại node đó.',
      rationale: 'Loại bỏ hoàn toàn sự cồng kềnh của Minimax, giảm dung lượng mã nguồn, dễ dàng tích hợp Alpha-Beta và PVS.',
      limitations: 'Đòi hỏi hàm evaluate() và điểm chiếu hết bắt buộc phải đổi dấu chính xác theo board.turn, nếu nhầm lẫn dù chỉ một dấu trừ thì bot sẽ chọn nước tự sát.',
    },
    defensePoints: [
      'So sánh ưu điểm của Negamax so với Minimax truyền thống.',
      'Tại sao khoảng alpha-beta lại biến thành [-beta, -alpha] khi gọi đệ quy?',
      'Trình bày luồng đổi dấu điểm số khi bot chơi quân Đen.',
    ],
    widgetType: 'tree',
  },
  {
    id: 'alpha-beta-pruning',
    title: 'Cắt tỉa Alpha-Beta (Alpha-Beta Pruning)',
    category: 'Kỹ thuật cắt tỉa',
    definition: 'Alpha-Beta Pruning là kỹ thuật tối ưu hóa thuật toán Minimax/Negamax bằng cách loại bỏ các nhánh cây tìm kiếm mà chắc chắn không thể ảnh hưởng đến quyết định cuối cùng.',
    principle: 'Duy trì hai giá trị biên trong suốt quá trình duyệt: Alpha (điểm số tối thiểu mà bên đi chắc chắn đạt được) và Beta (điểm số tối đa mà đối thủ cho phép bên đi đạt được). Khi một nước đi mang lại điểm số >= Beta, điều đó có nghĩa là đối thủ ở tầng trước sẽ không bao giờ cho phép thế cờ này xảy ra => Ngắt duyệt các nhánh còn lại ngay lập tức (Beta Cutoff / Fail-High).',
    formula: 'Điều kiện cắt tỉa: \\alpha \\ge \\beta',
    pseudocode: `if score > alpha:
    alpha = score
if alpha >= beta:
    # Beta cutoff: Đối thủ có lựa chọn tốt hơn ở tầng trên
    break`,
    team12Implementation: {
      file: 'student/search.py',
      functionName: 'Searcher._negamax',
      lines: '1581 – 1599',
      description: 'Cắt tỉa Alpha-Beta được triển khai tại mọi nút trong _negamax và _quiescence. Khi xảy ra Beta Cutoff trên một nước đi yên lặng, bot lập tức lưu nước đi vào Killer Moves và cộng điểm vào History Heuristic.',
      rationale: 'Nếu sắp xếp nước đi hoàn hảo, Alpha-Beta giảm số nút cần duyệt từ O(b^d) xuống O(b^(d/2)), cho phép tìm kiếm sâu gấp đôi trong cùng một lượng thời gian.',
      limitations: 'Hiệu quả cắt tỉa phụ thuộc hoàn toàn vào Move Ordering. Nếu sắp xếp nước đi tồi tệ (nước xấu duyệt trước), Alpha-Beta sẽ phải duyệt toàn bộ O(b^d) nút không khác gì Minimax!',
    },
    defensePoints: [
      'Chứng minh Alpha-Beta Pruning không làm mất bất kỳ nước đi tối ưu nào so với Minimax gốc.',
      'Độ phức tạp tính toán tốt nhất (Best-case) và xấu nhất (Worst-case) của Alpha-Beta là gì?',
      'Ý nghĩa trực quan của việc Alpha vượt qua Beta trong ván đấu thực tế.',
    ],
    widgetType: 'tree',
  },
  {
    id: 'move-ordering-heuristics',
    title: 'Sắp xếp Nước đi Heuristic (Move Ordering)',
    category: 'Tối ưu hóa tìm kiếm',
    definition: 'Move Ordering là kỹ thuật sắp xếp danh sách các nước đi hợp lệ theo xác suất giảm dần về độ mạnh chiến thuật trước khi đưa vào vòng lặp tìm kiếm.',
    principle: 'Alpha-Beta chỉ phát huy sức mạnh tối đa khi nước đi tốt nhất được duyệt đầu tiên. Nếu nước đầu tiên gây ra Beta Cutoff ngay lập tức (Fail-High), ta chỉ tốn đúng 1 phép tính thay vì phải duyệt 35 nước đi.',
    formula: 'Tỷ lệ cắt tỉa tại nước đầu tiên: CutoffRate = N_{cutoff\\_first} / N_{total\\_cutoffs} (Nhóm 12 đạt > 85%)',
    pseudocode: `function OrderMoves(board, moves, tt_move, killers, history):
    for move in moves:
        score = 0
        if move == tt_move: score += 10_000_000
        elif move.is_queen_promo(): score += 1_200_000
        elif is_threatened_escape(move): score += 1_100_000
        elif is_capture(move): score += 1_000_000 + MVV_LVA + SEE
        elif move == killers[0]: score += 900_000
        elif move == killers[1]: score += 800_000
        elif is_safe_check(move): score += 650_000
        else: score += min(history[move], 500_000)
    sort(moves, descending)`,
    team12Implementation: {
      file: 'student/search.py',
      functionName: 'Searcher._order_moves',
      lines: '703 – 916',
      description: 'Nhóm 12 xây dựng hệ thống phân tầng 7 mức: TT Move (10M) > Queen Promo (1.2M) > Escape threatened piece (1.1M) > Good Captures SEE >= 0 (1M) > Killer 1/2 (900k/800k) > Safe Check (650k) > Bad Captures (50k) > History Heuristic (500k).',
      rationale: 'Đảm bảo nước đi chiến lược nhất luôn đứng đầu danh sách, nâng tỷ lệ cắt tỉa Beta ở nước đầu tiên lên trên 85%.',
      limitations: 'Hàm sắp xếp cần chạy nhanh. Nếu tính toán quá nhiều thuộc tính nặng (như SEE đa tầng hay kiểm tra ghim quân phức tạp), chi phí sắp xếp sẽ vượt quá lợi ích tiết kiệm được.',
    },
    defensePoints: [
      'Tại sao TT Move lại được xếp ưu tiên cao nhất, vượt qua cả ăn Hậu?',
      'MVV-LVA là gì và tại sao Tốt ăn Hậu lại được ưu tiên hơn Hậu ăn Tốt?',
      'Killer Moves và History Heuristic khác nhau như thế nào về phạm vi áp dụng?',
    ],
    widgetType: 'move-order',
  },
  {
    id: 'iterative-deepening-aspiration',
    title: 'Đào sâu Lặp (IDS) & Cửa sổ Kỳ vọng (Aspiration Windows)',
    category: 'Chiến lược tìm kiếm',
    definition: 'Iterative Deepening Search (IDS) là kỹ thuật tìm kiếm theo độ sâu tăng dần từ 1, 2, 3... đến độ sâu tối đa. Aspiration Windows là kỹ thuật thu hẹp khoảng tìm kiếm [prev - delta, prev + delta] thay vì mở rộng vô hạn [-inf, +inf].',
    principle: '1. IDS giải quyết bài toán thời gian thực: luôn có sẵn kết quả tốt nhất của tầng trước khi hết giờ. Ngoài ra, cây tìm kiếm của tầng trước cung cấp TT Move cho tầng sau, giúp Move Ordering cực kỳ chính xác. 2. Aspiration Windows dựa trên quan sát: điểm số đánh giá giữa 2 độ sâu liên tiếp hiếm khi thay đổi quá 40 centipawns. Thu hẹp cửa sổ giúp Alpha-Beta cắt tỉa nhanh hơn 15 - 20%.',
    formula: 'Alpha = max(-MATE, prev - \\delta), Beta = min(MATE, prev + \\delta) với \\delta = 40\\text{ cp}',
    pseudocode: `best_move = legal[0]
prev_score = 0
for depth = 1 to MAX_DEPTH:
    if not tm.can_start_next_depth(): break
    alpha = prev_score - 40; beta = prev_score + 40
    while True:
        score, move = search_root(depth, alpha, beta)
        if score <= alpha: alpha = -INFINITY # Fail-low
        elif score >= beta: beta = +INFINITY # Fail-high
        else: break
    if not timeout:
        best_move = move; prev_score = score`,
    team12Implementation: {
      file: 'student/search.py',
      functionName: 'Searcher.search',
      lines: '1635 – 1938',
      description: 'Nhóm 12 triển khai IDS từ depth 1..64. Kích hoạt Aspiration Windows tại depth >= 4 với delta = 40 cp. Nếu bị fail-low hoặc fail-high, hệ thống mở rộng cửa sổ về toàn dải [-MATE_SCORE-1, MATE_SCORE+1] và tìm kiếm lại.',
      rationale: 'Kiểm soát thời gian tuyệt đối và tăng tốc độ tìm kiếm ở các tầng sâu.',
      limitations: 'Nếu thế cờ có biến động chiến thuật đột ngột (blunder hoặc đòn thí quân), điểm số sẽ nhảy ra ngoài cửa sổ, buộc bot phải search lại 2 lần (re-search penalty).',
    },
    defensePoints: [
      'Tại sao việc lặp lại từ depth 1, 2, 3.. không làm lãng phí thời gian so với nhảy thẳng vào depth 6?',
      'Cơ chế xử lý khi Aspiration Window bị fail-low hoặc fail-high trong code Nhóm 12.',
      'Tại sao chỉ cập nhật best_move khi tầng lặp hoàn thành trọn vẹn?',
    ],
  },
  {
    id: 'principal-variation-search',
    title: 'Principal Variation Search (PVS / NegaScout)',
    category: 'Thuật toán tìm kiếm nâng cao',
    definition: 'PVS là thuật toán tối ưu hóa của Alpha-Beta dựa trên giả định rằng nước đi đầu tiên (nước PV) chính là nước đi tốt nhất.',
    principle: 'Nước đi đầu tiên được tìm kiếm với cửa sổ đầy đủ [alpha, beta]. Vì ta tin rằng nước đầu tiên đã là tốt nhất, tất cả các nước đi còn lại chỉ cần kiểm tra xem chúng có thực sự kém hơn alpha hay không bằng một cửa sổ hẹp Zero-Window: [-alpha - 1, -alpha]. Cửa sổ hẹp này gây ra cắt tỉa cực nhanh. Chỉ khi một nước đi xếp sau bất ngờ vượt qua alpha (fail-high), ta mới mở rộng cửa sổ để tìm kiếm lại toàn dải.',
    formula: 'Zero\\text{-}Window: [\\alpha, \\alpha + 1] \\implies \\text{Cắt tỉa cực đại}',
    pseudocode: `if move_count == 1:
    score = -negamax(depth - 1, -beta, -alpha)
else:
    # Tìm kiếm thăm dò với Zero-Window
    score = -negamax(depth - 1, -alpha - 1, -alpha)
    if score > alpha and score < beta:
        # Giả định sai -> Tìm lại toàn dải
        score = -negamax(depth - 1, -beta, -alpha)`,
    team12Implementation: {
      file: 'student/search.py',
      functionName: 'Searcher._negamax',
      lines: '1527 – 1560',
      description: 'Nhóm 12 triển khai PVS kết hợp Late Move Reductions (LMR): nước 1 tìm dải đủ; các nước sau tìm Zero-Window [-alpha-1, -alpha] kết hợp giảm độ sâu. Nếu vượt alpha thì re-search dải đủ.',
      rationale: 'Tiết kiệm 10 - 25% số nút duyệt so với Alpha-Beta truyền thống trên các tầng có Move Ordering chuẩn.',
      limitations: 'Nếu Move Ordering kém, việc liên tục phải re-search sẽ làm bot chạy chậm hơn Alpha-Beta thuần.',
    },
    defensePoints: [
      'Tại sao cửa sổ [-alpha - 1, -alpha] lại gọi là Zero-Window / Null-Window?',
      'Tần suất re-search trong PVS của Nhóm 12 là bao nhiêu?',
      'PVS phối hợp với Move Ordering như thế nào?',
    ],
    widgetType: 'tree',
  },
  {
    id: 'transposition-table-zobrist',
    title: 'Bảng Chuyển vị (Transposition Table) & Khóa Băm Zobrist',
    category: 'Bộ nhớ & Quản trị trạng thái',
    definition: 'Bảng chuyển vị (TT) là một bảng băm lưu lại kết quả đánh giá của các trạng thái bàn cờ đã từng duyệt. Trong cờ vua, các thứ tự nước đi khác nhau có thể dẫn tới cùng một thế cờ (transposition).',
    principle: 'Sử dụng khóa băm Zobrist 64-bit độc nhất cho mỗi thế cờ (board._transposition_key()). Bảng gồm 2^19 = 524,288 mục. Mỗi mục lưu: key, depth, score (đã chuẩn hóa), flag (EXACT, LOWER, UPPER), best_move, age. Khi gặp lại thế cờ cũ với độ sâu >= độ sâu cần tìm, bot sử dụng lại ngay kết quả mà không cần tính lại!',
    formula: 'Index = hash(key) \\& (2^{19} - 1) \\implies \\text{Tra cứu O(1)}',
    pseudocode: `entry = tt.probe(board.key)
if entry and entry.depth >= depth:
    if entry.flag == EXACT: return entry.score
    elif entry.flag == LOWER and entry.score >= beta: return entry.score
    elif entry.flag == UPPER and entry.score <= alpha: return entry.score`,
    team12Implementation: {
      file: 'student/search.py',
      functionName: 'TranspositionTable.probe & store',
      lines: '477 – 595',
      description: 'Triển khai bảng băm 524,288 mục. Chính sách thay thế 4 điều kiện: ô trống, trùng khóa, thế hệ cũ (age != existing.age), hoặc độ sâu mới lớn hơn bằng (depth >= existing.depth). Chuẩn hóa điểm chiếu hết qua score_to_tt / score_from_tt.',
      rationale: 'Tiết kiệm hàng triệu phép tính lặp lại và cung cấp Hash Move hạt giống cho Move Ordering.',
      limitations: 'Có xác suất cực nhỏ xảy ra va chạm băm (hash collision), được Nhóm 12 bảo vệ bằng kiểm tra trùng key và tầng hậu kiểm Tầng 3 trong StudentBot.',
    },
    defensePoints: [
      'Zobrist Hashing hoạt động như thế nào? (XOR các số ngẫu nhiên 64-bit cho mỗi quân cờ trên mỗi ô).',
      'Giải thích 3 loại cờ cận TT_EXACT, TT_LOWER, TT_UPPER.',
      'Tại sao cần chuẩn hóa điểm chiếu hết cộng trừ ply khi lưu vào TT?',
    ],
    widgetType: 'tt-table',
  },
  {
    id: 'quiescence-search-see',
    title: 'Tìm kiếm Tĩnh lặng (Quiescence Search) & SEE 1-ply',
    category: 'Cắt tỉa & Xử lý biên',
    definition: 'Quiescence Search (QS) là phần mở rộng tại các nút lá (depth <= 0) chỉ duyệt các nước đi chiến thuật (bắt quân, phong cấp, thoát chiếu) để triệt tiêu hiệu ứng chân trời.',
    principle: '1. Stand-pat: Sử dụng điểm tĩnh evaluate(board) làm ngưỡng sàn; nếu bên đi đã đạt >= beta thì cắt tỉa ngay. 2. Delta Pruning: Nếu điểm tĩnh + 1150 cp (giá trị Hậu) vẫn < alpha, cắt tỉa ngay vì bắt quân bình thường không cứu vãn được thế cờ. 3. SEE 1-ply: Lọc bỏ các nước thí quân lỗ vốn (SEE < 0).',
    formula: '\\text{Delta Pruning: } \\text{stand\\_pat} + 1150 < \\alpha \\implies \\text{Cắt tỉa}',
    pseudocode: `function Quiescence(alpha, beta, qdepth):
    stand_pat = evaluate(board)
    if stand_pat >= beta: return beta
    if stand_pat + 1150 < alpha and not promotion_risk: return alpha
    if stand_pat > alpha: alpha = stand_pat
    for move in generate_captures():
        if see(board, move) >= 0:
            board.push(move)
            score = -Quiescence(-beta, -alpha, qdepth + 1)
            board.pop()
            if score >= beta: return beta
            if score > alpha: alpha = score
    return alpha`,
    team12Implementation: {
      file: 'student/search.py',
      functionName: 'Searcher._quiescence & see',
      lines: '280 – 435, 925 – 1195',
      description: 'Nhóm 12 tích hợp Stand-pat, Delta Pruning (có kiểm tra bitboard Tốt ở hàng 7 để tránh cắt nhầm phong cấp), lọc bắt quân có lợi qua see() 1-ply, và giới hạn MAX_QSEARCH_DEPTH = 8 để tránh bùng nổ chuỗi đổi quân.',
      rationale: 'Ngăn chặn hiện tượng mù chiến thuật (tactical blindness) khi cắt ngang chuỗi đổi quân.',
      limitations: 'SEE 1-ply chỉ nhìn trước 1 nước, có thể không thấy được đòn phản công tia X phức tạp phía sau, nhưng bù lại chạy nhanh gấp 6 lần.',
    },
    defensePoints: [
      'Hiệu ứng chân trời (Horizon Effect) là gì và hậu quả nếu không có Quiescence Search?',
      'Tại sao khi bị chiếu (in_check) thì Quiescence Search bắt buộc phải duyệt mọi nước đi hợp lệ chứ không chỉ nước bắt quân?',
      'Cách Delta Pruning của Nhóm 12 bảo vệ an toàn cho nước phong cấp Tốt.',
    ],
  },
  {
    id: 'advanced-pruning-rfp-nmp-lmr',
    title: 'Cắt tỉa Nâng cao: RFP, NMP, Futility Pruning & LMR',
    category: 'Kỹ thuật cắt tỉa nâng cao',
    definition: 'Tập hợp các kỹ thuật cắt tỉa dựa trên heuristic nhằm loại bỏ các nhánh cây tìm kiếm kém triển vọng trước khi duyệt sâu.',
    principle: '1. Reverse Futility Pruning (RFP): Ở depth 1-2, nếu static_eval - 120*depth >= beta -> cắt tỉa ngay. 2. Null Move Pruning (NMP): Ở depth >= 3, nhường 1 nước đi cho đối thủ với độ giảm R = 2-3; nếu đối thủ vẫn không vượt được beta -> thế cờ quá mạnh, cắt tỉa Beta Cutoff. 3. Futility Pruning (FP): Ở depth 1, bỏ qua các nước yên lặng nếu static_eval + 150 <= alpha. 4. Late Move Reductions (LMR): Giảm độ sâu tìm kiếm (depth - 2) đối với các nước yên lặng xếp sau (từ nước thứ 4 trở đi).',
    formula: 'NMP: R = 2 \\text{ (depth } \\le 4) \\text{ hoặc } 3 \\text{ (depth } \\ge 5); \\quad \\text{RFP Margin} = 120 \\times \\text{depth}',
    pseudocode: `# RFP
if depth <= 2 and static_eval - 120 * depth >= beta:
    return static_eval - 120 * depth

# NMP
if depth >= 3 and has_pieces and static_eval >= beta:
    board.push(NullMove)
    score = -negamax(depth - 1 - R, -beta, -beta + 1)
    board.pop()
    if score >= beta: return beta

# LMR
if moves_searched >= 4 and depth >= 3 and is_quiet:
    score = -negamax(depth - 2, -alpha - 1, -alpha) # Giảm 1 ply`,
    team12Implementation: {
      file: 'student/search.py',
      functionName: 'Searcher._negamax',
      lines: '1371 – 1555',
      description: 'Nhóm 12 kết hợp đồng bộ 4 kỹ thuật cắt tỉa hiện đại: RFP ở depth 1-2, NMP ở depth >= 3 (có kiểm tra has_pieces chống Zugzwang), Futility Pruning ở depth 1, và LMR ở các nước yên lặng >= 4. Mọi trường hợp fail-high của LMR đều được re-search ở độ sâu đủ.',
      rationale: 'Tăng tốc độ tìm kiếm gấp 3 - 5 lần, cho phép bot đạt độ sâu 7 - 8 ply trong trung cuộc.',
      limitations: 'Có rủi ro lý thuyết về việc cắt nhầm nước đi kỳ lạ (tactical sacrifice), nhưng các điều kiện biên của Nhóm 12 (kiểm tra chiếu, phong cấp, quân lớn) đã giảm rủi ro này về gần 0.',
    },
    defensePoints: [
      'Zugzwang là gì và tại sao NMP không được áp dụng khi chỉ còn Vua và Tốt?',
      'Cách khôi phục lại khi LMR bị fail-high (nước đi bị giảm sâu nhưng lại bất ngờ vượt alpha)?',
      'Tại sao RFP chỉ áp dụng ở depth 1 và 2 mà không dùng ở depth 5?',
    ],
  },
  {
    id: 'pesto-tapered-evaluation',
    title: 'Hàm Lượng giá Heuristic & PeSTO Tapered Evaluation',
    category: 'Biểu diễn tri thức & Lượng giá',
    definition: 'PeSTO Piece-Square Tables là hệ thống bảng điểm vị trí ô cho từng loại quân cờ ở cả trung cuộc (Middlegame - MG) và tàn cuộc (Endgame - EG). Tapered Evaluation là phương pháp nội suy mượt mà điểm số theo giai đoạn trận đấu.',
    principle: 'Giá trị của một quân cờ thay đổi liên tục theo thời gian: Mã mạnh ở trung tâm lúc trung cuộc nhưng yếu hơn ở tàn cuộc; Tốt tiến xa và Xe ở hàng 7 có giá trị khổng lồ ở tàn cuộc. Hàm tính toán trọng số pha cờ (Game Phase từ 0..24) dựa trên số quân lớn còn lại và nội suy tuyến tính: score = (mg * phase + eg * (24 - phase)) / 24.',
    formula: '\\text{Score} = \\frac{\\text{MG} \\times \\text{Phase} + \\text{EG} \\times (24 - \\text{Phase})}{24}',
    pseudocode: `phase = count_pieces_weighted(board) # 0..24
mg_score, eg_score = compute_pesto_pst(board)
final_score = (mg_score * phase + eg_score * (24 - phase)) // 24`,
    team12Implementation: {
      file: 'student/evaluation.py',
      functionName: 'evaluate & _pk',
      lines: '1 – 320, 589 – 595',
      description: 'Nhóm 12 sử dụng bảng PeSTO chuẩn quốc tế, đóng gói sẵn bằng bit-packing tuyến tính mg + (eg << 16). Giải nén số có dấu eg = (s + 0x8000) >> 16, mg = s - (eg << 16). Tốc độ đánh giá đạt ~89,000 evals/giây.',
      rationale: 'Cung cấp tri thức vị trí cờ vua chuyên sâu mà không làm giảm tốc độ tính toán.',
      limitations: 'Bảng PeSTO được tối ưu cho cờ vua tiêu chuẩn. Tuy nhiên các đặc trưng vị trí (chiếm tâm, hàng 7, tốt thông) vẫn hoàn toàn chính xác trong Chess960 sau khi khai cuộc triển khai quân.',
    },
    defensePoints: [
      'Giải thích công thức đóng gói tuyến tính và cách xử lý không bị tràn số âm trong Python.',
      'Tại sao không dùng hàm đánh giá vật chất đơn giản (Hậu=9, Xe=5, Tượng=3, Mã=3, Tốt=1)?',
      'Game Phase được tính từ những quân cờ nào?',
    ],
    widgetType: 'chessboard',
  },
  {
    id: 'tactical-delay-time-management',
    title: 'Quản trị Thời gian Thích ứng Bù trừ Độ trễ (Delay-Aware)',
    category: 'Quản trị hệ thống',
    definition: 'Mô hình phân bổ ngân sách thời gian thi đấu dựa trên cơ chế hấp thụ độ trễ sàn của máy chủ GameController (500ms - 1000ms) kết hợp kiểm soát Soft Limit / Hard Limit và dự đoán tăng trưởng nhánh.',
    principle: 'Máy chủ tính thời gian mỗi nước theo công thức: elapsed = max(search_time, delay_500_1000ms). Nhóm 12 nhận ra rằng nếu bot tìm kiếm dưới 220ms ở trung cuộc, thời gian đó hoàn toàn miễn phí vì bị độ trễ sàn 500ms hấp thụ! Ở tàn cuộc sâu, bot duy trì ngân sách 35ms - 55ms để duyệt 3,500 - 5,000 nodes, hoàn tất Depth 3-4, và hạ xuống 8ms - 15ms khi còn dưới 1.5s để triệt tiêu 100% nguy cơ rụng cờ.',
    formula: '\\text{Elapsed} = \\max(\\text{BotSearchTime}, \\text{ServerDelay}_{500\\text{--}1000\\text{ms}})',
    pseudocode: `if time_remaining <= 1500: return TimeBudget(soft=8, hard=15)
elif moves_played >= 40 or time_remaining <= 10000: return TimeBudget(soft=35, hard=55)
elif moves_played >= 32 or time_remaining <= 18000: return TimeBudget(soft=60, hard=90)
else: return TimeBudget(soft=150, hard=220) # Bị hấp thụ bởi 500ms`,
    team12Implementation: {
      file: 'student/time_manager.py',
      functionName: 'compute_budget_ms & TimeManager',
      lines: '37 – 199',
      description: 'Nhóm 12 phân tầng thời gian chi tiết cho cả 2 thể thức Blitz (45s) và Standard (180s - 360s). Đo đạc nano-giây bằng time.perf_counter(). Dự đoán mở tầng kế tiếp bằng predicted_ms = last * 2.2.',
      rationale: 'Tối đa hóa độ sâu tìm kiếm trong vùng an toàn và loại trừ hoàn toàn nguy cơ thua do hết giờ.',
      limitations: 'Cần đồng bộ chặt chẽ với tốc độ xử lý của CPU. Khi chạy trên máy chủ yếu, số nút duyệt được trong cùng một khoảng mili-giây có thể giảm nhẹ.',
    },
    defensePoints: [
      'Chứng minh tại sao ngân sách 150ms - 220ms ở trung cuộc không làm tốn thêm thời gian thi đấu của bot.',
      'Sự khác nhau giữa Soft Limit và Hard Limit.',
      'Cơ chế Panic Mode xử lý như thế nào khi đồng hồ chỉ còn dưới 1.5 giây?',
    ],
    widgetType: 'time-calculator',
  },
];
