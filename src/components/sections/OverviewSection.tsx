import React from 'react';
import {
  Shield,
  Cpu,
  Layers,
  Clock,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  GitCommit,
  Users,
  Award,
  Terminal,
} from 'lucide-react';
import { PROJECT_METADATA, TEAM_MEMBERS } from '../../data/teamInfo';
import { Badge } from '../common/Badge';
import type { TabType } from '../../types';

interface OverviewSectionProps {
  onNavigate: (tab: TabType) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-10 border border-slate-700/80 shadow-2xl overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="emerald">ĐHQGHN – UET</Badge>
            <Badge variant="cyan">Môn: Biểu diễn tri thức & Tìm kiếm nâng cao</Badge>
            <Badge variant="indigo">Học kỳ 1 • 2026-2027</Badge>
            <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
              <GitCommit className="w-3 h-3 text-emerald-400" />
              Commit {PROJECT_METADATA.referenceCommit.substring(0, 7)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            SỔ TAY VẤN ĐÁP CHESSLAB
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300">
              BOT CỜ VUA CHESS960 – NHÓM 12
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Hệ thống hỗ trợ ôn tập, đào sâu mã nguồn và chuẩn bị vấn đáp bảo vệ đồ án bot cờ vua Chess960. 
            Được xây dựng trên <strong>100% mã nguồn thực tế</strong> của Nhóm 12, cung cấp giải thích chi tiết từng hàm, 
            sơ đồ luồng gọi, chứng minh thuật toán và ngân hàng 48 câu hỏi vấn đáp kèm đáp án chuẩn.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('code-bot')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-950/60 flex items-center gap-2 cursor-pointer"
            >
              <Terminal className="w-4 h-4" /> Bắt đầu học mã nguồn
            </button>
            <button
              onClick={() => onNavigate('qa')}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" /> Luyện câu hỏi vấn đáp
            </button>
            <button
              onClick={() => onNavigate('architecture')}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 transition flex items-center gap-1.5 cursor-pointer"
            >
              Xem kiến trúc hệ thống <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center">
          <div className="text-[11px] text-slate-400 font-medium">Tổng dòng code</div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">2,847</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">4 modules trong student/</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center">
          <div className="text-[11px] text-slate-400 font-medium">Tốc độ đánh giá</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">~89,000</div>
          <div className="text-[10px] text-slate-400 mt-0.5">NPS (evaluations/giây)</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center">
          <div className="text-[11px] text-slate-400 font-medium">Độ sâu tìm kiếm</div>
          <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-1">5 – 8 ply</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Iterative Deepening</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center">
          <div className="text-[11px] text-slate-400 font-medium">Bảng chuyển vị</div>
          <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono mt-1">524,288</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Mục (2^19 entries)</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center">
          <div className="text-[11px] text-slate-400 font-medium">Dung lượng thư mục</div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">154 KiB</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Thỏa chuẩn &lt; 1 MiB</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 text-center">
          <div className="text-[11px] text-slate-400 font-medium">Đối đầu thực nghiệm</div>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">0 Blunder</div>
          <div className="text-[10px] text-slate-400 mt-0.5">12W / 1D / 3L (16 ván)</div>
        </div>
      </div>

      {/* 6 Core Technological Breakthroughs */}
      <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8">
        <div className="mb-6">
          <Badge variant="cyan">Điểm Nhấn Công Nghệ</Badge>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
            6 Trụ Cột Kỹ Thuật Độc Quyền Của Nhóm 12
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Những cải tiến cốt lõi giúp StudentBot Nhóm 12 đạt độ ổn định 100% và sức mạnh tính toán chiều sâu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-emerald-500/50 transition">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Shield className="w-4 h-4 shrink-0" />
              <span>1. Kiến trúc phòng thủ 3 tầng</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fast-path đi ngay nước duy nhất trong 0ms; Khối tìm kiếm bọc try...except tự phục hồi nếu xảy ra ngoại lệ; Hậu kiểm tính hợp lệ trước khi gửi nước đi cho Grader.
            </p>
            <div className="text-[10px] text-emerald-400 font-mono">File: student/bot.py (L69-97)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-amber-500/50 transition">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Clock className="w-4 h-4 shrink-0" />
              <span>2. Hấp thụ độ trễ hệ thống 500ms</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Khai thác công thức elapsed = max(search_ms, 500ms) của máy chủ: cấp ngân sách 150-220ms ở trung cuộc để đạt Depth 6-8 mà hoàn toàn không tốn thêm thời gian thi đấu.
            </p>
            <div className="text-[10px] text-amber-400 font-mono">File: student/time_manager.py (L58-85)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-rose-500/50 transition">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Layers className="w-4 h-4 shrink-0" />
              <span>3. Bit-packing tuyến tính sửa tràn số âm</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nén PeSTO PST: val = mg + (eg &lt;&lt; 16) và giải nén số có dấu eg = (val + 0x8000) &gt;&gt; 16. Triệt tiêu dứt điểm lỗi tràn số nguyên âm Python, đạt ~89k NPS.
            </p>
            <div className="text-[10px] text-rose-400 font-mono">File: student/evaluation.py (L239-253)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-cyan-500/50 transition">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Zap className="w-4 h-4 shrink-0" />
              <span>4. Move Ordering 7 tầng & PVS</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Phân tầng: TT Move &rarr; Queen Promo &rarr; Chạy thoát quân to &rarr; Good SEE Captures &rarr; Killers &rarr; Safe Checks &rarr; History. Tỷ lệ cắt tỉa Beta ở nước đầu &gt; 85%.
            </p>
            <div className="text-[10px] text-cyan-400 font-mono">File: student/search.py (L703-916)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-indigo-500/50 transition">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Shield className="w-4 h-4 shrink-0" />
              <span>5. Dynamic Bitwise King Ring</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tính toán vành đai bảo vệ Vua theo tọa độ ô thực tế bằng bitboard 64-bit, độc lập với vị trí ban đầu. Đảm bảo an toàn Vua chính xác trên toàn bộ 960 thế cờ Chess960.
            </p>
            <div className="text-[10px] text-indigo-400 font-mono">File: student/evaluation.py (L321-360)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 space-y-2 hover:border-purple-500/50 transition">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Award className="w-4 h-4 shrink-0" />
              <span>6. Gated Mop-Up Heuristic cờ tàn</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Chỉ kích hoạt khi phase &lt;= 6 và chênh lệch &gt;= 200 cp. Thưởng điểm khi ép Vua địch ra mép và kéo Vua ta lại gần, giúp dứt điểm chiếu hết và triệt tiêu lỗi hòa 50 nước.
            </p>
            <div className="text-[10px] text-purple-400 font-mono">File: student/evaluation.py (L596-609)</div>
          </div>
        </div>
      </div>

      {/* Team Members Roster */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <Badge variant="indigo">Đội Ngũ Thực Hiện</Badge>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Thành Viên Nhóm 12 & Phân Công Nhiệm Vụ
            </h2>
          </div>
          <div className="text-xs text-slate-400 font-mono">team.json • 4 thành viên</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEAM_MEMBERS.map((member, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-slate-900/90 border border-slate-700 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-white">{member.name}</h3>
                  <div className="text-xs text-slate-400 font-mono">
                    MSV: {member.studentId} • Git: <code className="text-emerald-400">{member.github}</code>
                  </div>
                </div>
                <Badge variant={i === 0 ? 'cyan' : i === 1 ? 'rose' : i === 2 ? 'amber' : 'emerald'}>
                  {member.role}
                </Badge>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-slate-300 mb-1">Nhiệm vụ chính:</div>
                <ul className="text-xs text-slate-300 space-y-1">
                  {member.responsibilities.slice(0, 3).map((r, ri) => (
                    <li key={ri} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[11px]">
                <span className="text-slate-400">
                  Tự làm: <strong className="text-emerald-400">{member.selfContribution}</strong> (AI tra cứu: {member.aiAssistance})
                </span>
                <span className="text-slate-400 font-mono">Chịu trách nhiệm bảo vệ</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
