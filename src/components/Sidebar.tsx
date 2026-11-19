import React from 'react';
import {
  Home,
  Cpu,
  Code,
  FileCode,
  BookOpen,
  HelpCircle,
  Sparkles,
  Layers,
  Clock,
  Shield,
  FileCheck2,
  ChevronRight,
} from 'lucide-react';
import type { TabType } from '../types';

interface SidebarProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  meta?: string;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navSections: NavSection[] = [
    {
      group: 'TỔNG QUAN',
      items: [
        {
          id: 'overview' as TabType,
          label: 'Tổng quan dự án',
          icon: <Home className="w-4 h-4" />,
          badge: 'Nhóm 12',
        },
        {
          id: 'architecture' as TabType,
          label: 'Kiến trúc & Vòng đời',
          icon: <Cpu className="w-4 h-4" />,
          badge: 'Sơ đồ',
        },
      ],
    },
    {
      group: 'SỔ TAY MÃ NGUỒN (CODE EXPLORER)',
      items: [
        {
          id: 'code-bot' as TabType,
          label: 'bot.py (StudentBot)',
          icon: <Shield className="w-4 h-4 text-emerald-400" />,
          meta: '97 dòng',
        },
        {
          id: 'code-search' as TabType,
          label: 'search.py (Search Engine)',
          icon: <Code className="w-4 h-4 text-cyan-400" />,
          meta: '1,938 dòng',
        },
        {
          id: 'code-eval' as TabType,
          label: 'evaluation.py (PeSTO)',
          icon: <Layers className="w-4 h-4 text-rose-400" />,
          meta: '611 dòng',
        },
        {
          id: 'code-time' as TabType,
          label: 'time_manager.py (Thời gian)',
          icon: <Clock className="w-4 h-4 text-amber-400" />,
          meta: '199 dòng',
        },
      ],
    },
    {
      group: 'LÝ THUYẾT & THỂ THỨC',
      items: [
        {
          id: 'theory' as TabType,
          label: 'Lý thuyết thuật toán',
          icon: <BookOpen className="w-4 h-4 text-cyan-400" />,
          badge: '15 chủ đề',
        },
        {
          id: 'chess960' as TabType,
          label: 'Chess960 & Luật thi đấu',
          icon: <FileCode className="w-4 h-4 text-indigo-400" />,
          badge: '960 thế',
        },
      ],
    },
    {
      group: 'VẤN ĐÁP & LUYỆN TẬP',
      items: [
        {
          id: 'qa' as TabType,
          label: 'Ngân hàng câu hỏi',
          icon: <HelpCircle className="w-4 h-4 text-emerald-400" />,
          badge: '48 câu',
        },
        {
          id: 'practice' as TabType,
          label: 'Chế độ luyện vấn đáp',
          icon: <Sparkles className="w-4 h-4 text-amber-400" />,
          badge: 'Flashcard',
        },
        {
          id: 'glossary' as TabType,
          label: 'Bảng thuật ngữ AI',
          icon: <BookOpen className="w-4 h-4 text-purple-400" />,
          badge: '35 từ',
        },
      ],
    },
    {
      group: 'MINH CHỨNG & HỒ SƠ',
      items: [
        {
          id: 'source-map' as TabType,
          label: 'Hồ sơ mã nguồn & AI',
          icon: <FileCheck2 className="w-4 h-4 text-slate-400" />,
          meta: 'Commit a9d4b4b',
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 overflow-y-auto transition-transform duration-200 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 space-y-6">
          {navSections.map((sec, sIdx) => (
            <div key={sIdx}>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2 px-2">
                {sec.group}
              </div>
              <div className="space-y-1">
                {sec.items.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        onCloseMobile();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                            isActive
                              ? 'bg-emerald-950/80 text-emerald-200'
                              : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}

                      {item.meta && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {item.meta}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
