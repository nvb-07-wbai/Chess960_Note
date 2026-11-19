import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { GLOSSARY_ITEMS } from '../../data/glossary';
import type { GlossaryItem, TabType } from '../../types';
import { Search, BookOpen, ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '../common/Badge';

interface GlossarySectionProps {
  onNavigate: (tab: TabType, targetId?: string) => void;
  targetTermId?: string;
}

export const GlossarySection: React.FC<GlossarySectionProps> = ({ onNavigate, targetTermId }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: `Tất cả (${GLOSSARY_ITEMS.length})` },
    { id: 'search', label: 'Thuật toán tìm kiếm' },
    { id: 'evaluation', label: 'Lượng giá heuristic' },
    { id: 'chess', label: 'Luật cờ vua' },
    { id: 'optimization', label: 'Tối ưu & Thời gian' },
  ];

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchQuery =
      !searchQuery ||
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vietnamese.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDef.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const getCategoryBadgeVariant = (cat: string): 'cyan' | 'rose' | 'indigo' | 'amber' => {
    switch (cat) {
      case 'search':
        return 'cyan';
      case 'evaluation':
        return 'rose';
      case 'chess':
        return 'indigo';
      case 'optimization':
        return 'amber';
      default:
        return 'cyan';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <SectionHeader
        badge="Từ Điển Thuật Ngữ"
        badgeVariant="purple"
        title="Bảng Thuật Ngữ AI & Cờ Vua Chuyên Sâu (35+ Thuật Ngữ)"
        description="Tra cứu nhanh định nghĩa tiếng Việt, bản chất toán học, ví dụ trực quan và mối liên hệ thực tế trong mã nguồn bot Chess960 Nhóm 12."
      />

      {/* Search & Filter Bar */}
      <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm thuật ngữ tiếng Anh hoặc tiếng Việt..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-700/60 text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={`term-${item.id}`}
            className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/80 hover:border-purple-500/50 transition space-y-3 shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-white">{item.term}</h3>
                <div className="text-xs text-purple-400 font-semibold">{item.vietnamese}</div>
              </div>
              <Badge variant={getCategoryBadgeVariant(item.category)} size="sm">
                {item.category}
              </Badge>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {item.shortDef}
            </p>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-700/50 text-[11px] text-slate-300 leading-relaxed">
              {item.fullExplanation}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-[11px]">
              <span className="text-slate-400 font-mono italic">Ví dụ: {item.example}</span>
              {item.relatedTab && (
                <button
                  onClick={() => onNavigate(item.relatedTab!, item.relatedTopicId)}
                  className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  Xem chủ đề <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
