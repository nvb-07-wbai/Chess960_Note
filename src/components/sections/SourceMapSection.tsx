import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { PROJECT_METADATA, TEAM_MEMBERS } from '../../data/teamInfo';
import {
  GitCommit,
  GitBranch,
  Shield,
  FileCheck,
  CheckCircle2,
  ExternalLink,
  Award,
  Terminal,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const SourceMapSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <SectionHeader
        badge="Minh Chứng Học Thuật"
        badgeVariant="emerald"
        title="Hồ Sơ Nguồn, Commit Tham Chiếu & Khai Báo Sử Dụng AI"
        description="Minh bạch hóa toàn bộ nguồn gốc mã nguồn, phiên bản nộp bài chính thức, báo cáo sử dụng công cụ AI (AI_USAGE.md) và kết quả kiểm định đối kháng thực nghiệm của Nhóm 12."
      />

      {/* Verified Commit Card */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <GitCommit className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">Phiên bản mã nguồn tham chiếu gốc:</div>
              <div className="text-base font-extrabold text-white font-mono flex items-center gap-2">
                <span>{PROJECT_METADATA.referenceCommit}</span>
                <Badge variant="emerald">VERIFIED</Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">{PROJECT_METADATA.commitDate}</div>
            <div className="text-xs font-semibold text-emerald-400 mt-0.5">{PROJECT_METADATA.commitMessage}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/60 space-y-1">
            <span className="text-slate-400 font-medium block">Kho mã nguồn bot cờ vua (Nguồn tham chiếu):</span>
            <a
              href={PROJECT_METADATA.botRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1.5 break-all"
            >
              {PROJECT_METADATA.botRepoUrl} <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
            <p className="text-[11px] text-slate-500 pt-1">
              * Tuyệt đối không chỉnh sửa hay push bất kỳ thay đổi nào vào repo này.
            </p>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-700/60 space-y-1">
            <span className="text-slate-400 font-medium block">Kho lưu trữ Website Sổ tay Vấn đáp:</span>
            <a
              href={PROJECT_METADATA.targetRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1.5 break-all"
            >
              {PROJECT_METADATA.targetRepoUrl} <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
            <p className="text-[11px] text-slate-500 pt-1">
              * Nơi triển khai toàn bộ ứng dụng web tĩnh và cấu hình GitHub Pages.
            </p>
          </div>
        </div>
      </div>

      {/* File Integrity & Hash Audit */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            Kiểm Kê Dung Lượng & Danh Mục File trong student/
          </h3>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Tổng: ~154 KiB (&lt; 1,024 KiB)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 font-sans">
                <th className="pb-2">Tên file</th>
                <th className="pb-2">Số dòng</th>
                <th className="pb-2">Dung lượng</th>
                <th className="pb-2">Tác giả chịu trách nhiệm chính</th>
                <th className="pb-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-white">student/bot.py</td>
                <td>97 dòng</td>
                <td>4.6 KB</td>
                <td className="font-sans">Nông Văn Bách (25022782)</td>
                <td><Badge variant="emerald" size="sm">Đã nộp bài</Badge></td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">student/time_manager.py</td>
                <td>199 dòng</td>
                <td>8.1 KB</td>
                <td className="font-sans">Nông Văn Bách (25022782)</td>
                <td><Badge variant="emerald" size="sm">Đã nộp bài</Badge></td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">student/evaluation.py</td>
                <td>611 dòng</td>
                <td>23.2 KB</td>
                <td className="font-sans">Lê Văn Việt (25023069)</td>
                <td><Badge variant="emerald" size="sm">Đã nộp bài</Badge></td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">student/search.py</td>
                <td>1,938 dòng</td>
                <td>45.7 KB</td>
                <td className="font-sans">Vũ Hoàng Long (25022922) & Đỗ Thành Vương (25023079)</td>
                <td><Badge variant="emerald" size="sm">Đã nộp bài</Badge></td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-white">team.json & AI_USAGE.md</td>
                <td>189 dòng</td>
                <td>19.4 KB</td>
                <td className="font-sans">Cả 4 thành viên Nhóm 12</td>
                <td><Badge variant="emerald" size="sm">Chính thức</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Usage Transparency Table */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-5">
        <div>
          <Badge variant="indigo">Minh Bạch Học Thuật</Badge>
          <h3 className="text-lg font-bold text-white mt-1.5">
            Báo Cáo Tỷ Lệ Đóng Góp & Sử Dụng AI (Trích Lục AI_USAGE.md)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Tuân thủ tuyệt đối quy định: AI chỉ đóng vai trò tra cứu phụ trợ mức độ thấp (&lt; 15%), sinh viên làm chủ và tự viết 100% mã nguồn thuật toán.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TEAM_MEMBERS.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-700/70 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{m.name}</span>
                <span className="font-mono text-emerald-400 font-bold">Tự làm: {m.selfContribution}</span>
              </div>
              <div className="text-slate-400 text-[11px] font-mono">
                Trụ cột: {m.role} • Git: {m.github}
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: m.selfContribution }} />
              </div>
              <div className="text-[11px] text-slate-300">
                AI hỗ trợ tra cứu ({m.aiAssistance}): Cú pháp thư viện python-chess, mã lỗi traceback và gợi ý ý tưởng toán học.
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200 flex items-center justify-between">
          <span>
            <strong>Trung bình toàn dự án:</strong> Sinh viên tự làm chủ và bảo vệ <strong>86.25%</strong> (AI tra cứu phụ trợ: 13.75%).
          </span>
          <Badge variant="emerald">Cam kết trung thực 100%</Badge>
        </div>
      </div>

      {/* Headless Tournament Verification Log */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Kiểm Định Đối Kháng Thực Nghiệm (16 Ván Đấu Local)
          </h3>
          <Badge variant="amber">Tỷ lệ thắng: 78.1%</Badge>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Nhóm 12 đã tự viết runner headless đối đầu 16 ván thực tế giữa phiên bản StudentBot hoàn chỉnh và các phiên bản baseline (Minimax thường, không TT, không Move Ordering).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
            <span className="text-slate-400 block font-sans">Tổng số ván:</span>
            <span className="text-xl font-bold text-white mt-1 block">16 ván</span>
          </div>
          <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 block font-sans">Số ván thắng:</span>
            <span className="text-xl font-bold text-emerald-300 mt-1 block">12 ván</span>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
            <span className="text-slate-400 block font-sans">Hòa / Thua:</span>
            <span className="text-xl font-bold text-slate-300 mt-1 block">1 Hòa / 3 Thua</span>
          </div>
          <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-500/30">
            <span className="text-amber-400 block font-sans">Sai lầm nghiêm trọng:</span>
            <span className="text-xl font-bold text-amber-300 mt-1 block">0 Blunder</span>
          </div>
        </div>
      </div>
    </div>
  );
};
