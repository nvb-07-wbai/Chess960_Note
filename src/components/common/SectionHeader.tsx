import React from 'react';
import { Badge } from './Badge';

interface SectionHeaderProps {
  badge: string;
  badgeVariant?: 'emerald' | 'cyan' | 'amber' | 'rose' | 'indigo' | 'purple';
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeVariant = 'emerald',
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-700/60 dark:border-slate-800">
      <div>
        <div className="mb-2">
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {title}
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
