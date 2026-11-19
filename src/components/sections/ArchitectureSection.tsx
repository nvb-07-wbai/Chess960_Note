import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ArchitectureDiagram } from '../widgets/ArchitectureDiagram';
import { MoveLifecycleStepper } from '../widgets/MoveLifecycleStepper';
import { ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import type { TabType } from '../../types';

interface ArchitectureSectionProps {
  onNavigate: (tab: TabType) => void;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      <SectionHeader
        badge="Kiến Trúc Hệ Thống"
        badgeVariant="emerald"
        title="Tổng Thể Kiến Trúc & Vòng Đời Lượt Đi"
        description="Mô hình phối hợp chặt chẽ giữa các module trong student/: StudentBot (Điều phối), Searcher (Cỗ máy tìm kiếm), Evaluation (Lượng giá tĩnh), Transposition Table (Bảng băm) và TimeManager (Quản trị thời gian)."
      />

      {/* Interactive Architecture Diagram */}
      <ArchitectureDiagram />

      {/* Move Lifecycle Stepper */}
      <MoveLifecycleStepper />

      {/* Defensive Architecture Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Tầng 1: Fast-Path 0ms</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Nếu bàn cờ không có nước hợp lệ &rarr; trả về Move.null(). Nếu chỉ có đúng 1 nước hợp lệ duy nhất (forced move) &rarr; trả về ngay lập tức trong 0ms, không tiêu hao một phần nghìn giây tài nguyên CPU.
          </p>
          <button
            onClick={() => onNavigate('code-bot')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            Xem mã nguồn bot.py (dòng 69-76) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <span>Tầng 2: Tìm kiếm & Tự phục hồi</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            TimeManager khởi tạo hạn chót với time.perf_counter(). Thuật toán Iterative Deepening Negamax duyệt sâu từ 1 đến 64. Toàn bộ quá trình bọc trong khối try...except Exception: nếu văng lỗi, tự động fallback về legal[0].
          </p>
          <button
            onClick={() => onNavigate('code-search')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            Xem mã nguồn search.py <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Tầng 3: Hậu kiểm 100% Hợp lệ</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Trước khi bàn giao nước đi cho GameController, StudentBot xác thực lại một lần cuối: if move not in board.legal_moves: move = legal[0]. Triệt tiêu 100% rủi ro bị xử thua do nước đi sai luật.
          </p>
          <button
            onClick={() => onNavigate('code-bot')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            Xem mã nguồn bot.py (dòng 93-97) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
