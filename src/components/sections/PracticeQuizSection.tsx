import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { QUESTIONS_BANK } from '../../data/questionsBank';
import type { QAQuestion, QuestionCategory, QuestionDifficulty, TabType } from '../../types';
import {
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Timer,
  Award,
  Play,
  Pause,
  Shuffle,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface PracticeQuizSectionProps {
  onNavigate: (tab: TabType, targetId?: string) => void;
}

export const PracticeQuizSection: React.FC<PracticeQuizSectionProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [isRandomMode, setIsRandomMode] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Timer states (30-second oral exam response countdown)
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // LocalStorage state for mastered / review
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chesslab_mastered_q');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [reviewIds, setReviewIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chesslab_review_q');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('chesslab_mastered_q', JSON.stringify(masteredIds));
    } catch (e) {
      console.error(e);
    }
  }, [masteredIds]);

  useEffect(() => {
    try {
      localStorage.setItem('chesslab_review_q', JSON.stringify(reviewIds));
    } catch (e) {
      console.error(e);
    }
  }, [reviewIds]);

  // Filter pool
  const activeQuestions = QUESTIONS_BANK.filter((q) => {
    const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
    const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return matchCat && matchDiff;
  });

  // Clamp current index
  useEffect(() => {
    if (currentIndex >= activeQuestions.length) {
      setCurrentIndex(0);
    }
    setShowAnswer(false);
    setShowHint(false);
    setTimerSeconds(30);
    setIsTimerRunning(false);
  }, [selectedCategory, selectedDifficulty, activeQuestions.length]);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const currentQ: QAQuestion | undefined = activeQuestions[currentIndex];

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    setShowAnswer(false);
    setShowHint(false);
    setTimerSeconds(30);
    setIsTimerRunning(false);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(activeQuestions.length - 1);
    }
    setShowAnswer(false);
    setShowHint(false);
    setTimerSeconds(30);
    setIsTimerRunning(false);
  };

  const handleRandom = () => {
    const randomIdx = Math.floor(Math.random() * activeQuestions.length);
    setCurrentIndex(randomIdx);
    setShowAnswer(false);
    setShowHint(false);
    setTimerSeconds(30);
    setIsTimerRunning(false);
  };

  const markMastered = () => {
    if (!currentQ) return;
    if (!masteredIds.includes(currentQ.id)) {
      setMasteredIds((prev) => [...prev, currentQ.id]);
    }
    setReviewIds((prev) => prev.filter((id) => id !== currentQ.id));
    handleNext();
  };

  const markNeedsReview = () => {
    if (!currentQ) return;
    if (!reviewIds.includes(currentQ.id)) {
      setReviewIds((prev) => [...prev, currentQ.id]);
    }
    setMasteredIds((prev) => prev.filter((id) => id !== currentQ.id));
    handleNext();
  };

  const isCurrentMastered = currentQ ? masteredIds.includes(currentQ.id) : false;
  const isCurrentReview = currentQ ? reviewIds.includes(currentQ.id) : false;

  return (
    <div className="space-y-8 animate-fadeIn">
      <SectionHeader
        badge="Luyện Vấn Đáp Tương Tác"
        badgeVariant="amber"
        title="Mô Phỏng Vấn Đáp (Exam Simulator & Flashcard)"
        description="Luyện trả lời câu hỏi trực tiếp dưới áp lực thời gian (đồng hồ đếm ngược 30 giây). Tự suy nghĩ câu trả lời trước, sau đó mở đối chiếu với đáp án chuẩn của nhóm và lưu tiến độ học tập vào trình duyệt."
      />

      {/* Progress & Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/70 text-center">
          <span className="text-[11px] text-slate-400 block font-medium">Tổng câu hỏi trong pool</span>
          <span className="text-2xl font-black text-white font-mono mt-1">{activeQuestions.length}</span>
        </div>
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center">
          <span className="text-[11px] text-emerald-400 block font-medium">Đã nắm vững</span>
          <span className="text-2xl font-black text-emerald-300 font-mono mt-1">
            {masteredIds.length} <span className="text-xs text-slate-400 font-normal">/ {QUESTIONS_BANK.length}</span>
          </span>
        </div>
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-center">
          <span className="text-[11px] text-amber-400 block font-medium">Cần ôn tập lại</span>
          <span className="text-2xl font-black text-amber-300 font-mono mt-1">{reviewIds.length}</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/70 text-center">
          <span className="text-[11px] text-slate-400 block font-medium">Tiến độ làm chủ</span>
          <span className="text-2xl font-black text-cyan-400 font-mono mt-1">
            {Math.round((masteredIds.length / QUESTIONS_BANK.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Filter Options */}
      <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-semibold">Chủ đề:</span>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'general', label: 'Kiến thức chung' },
            { id: 'code', label: 'Chuyên sâu Code' },
            { id: 'scenario', label: 'Tình huống' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ tiến độ đã lưu trong localStorage không?')) {
                setMasteredIds([]);
                setReviewIds([]);
                localStorage.removeItem('chesslab_mastered_q');
                localStorage.removeItem('chesslab_review_q');
              }
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 transition"
          >
            Đặt lại tiến độ
          </button>
        </div>
      </div>

      {/* Flashcard Simulator */}
      {currentQ ? (
        <div className="bg-slate-800/95 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header of Question Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700/80">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Câu {currentIndex + 1} / {activeQuestions.length}
              </span>
              <Badge variant="cyan">{currentQ.category.toUpperCase()}</Badge>
              <Badge variant={currentQ.difficulty === 'basic' ? 'emerald' : currentQ.difficulty === 'medium' ? 'amber' : 'rose'}>
                {currentQ.difficulty === 'basic' ? 'Cơ bản' : currentQ.difficulty === 'medium' ? 'Trung bình' : 'Nâng cao'}
              </Badge>
              {isCurrentMastered && (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Đã thuộc
                </span>
              )}
              {isCurrentReview && (
                <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" /> Cần xem lại
                </span>
              )}
            </div>

            {/* Response Countdown Timer */}
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs font-bold border transition-colors ${
                  timerSeconds <= 5
                    ? 'bg-rose-950/60 text-rose-400 border-rose-500/40 animate-pulse'
                    : timerSeconds <= 15
                    ? 'bg-amber-950/60 text-amber-400 border-amber-500/40'
                    : 'bg-slate-900 text-slate-300 border-slate-700'
                }`}
              >
                <Timer className="w-3.5 h-3.5" />
                <span>{timerSeconds}s</span>
              </div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:text-white"
                title={isTimerRunning ? 'Tạm dừng' : 'Bắt đầu tính giờ 30s'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setTimerSeconds(30);
                  setIsTimerRunning(false);
                }}
                className="p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:text-white"
                title="Khôi phục 30s"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="py-2">
            <div className="text-xs text-slate-400 font-medium mb-1">
              Câu hỏi vấn đáp:
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Hint Area (Collapsible) */}
          {showHint && (
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 text-xs space-y-2 animate-fadeIn">
              <div className="text-slate-400 font-semibold flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> Gợi ý trả lời:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentQ.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                    #{t}
                  </span>
                ))}
              </div>
              {currentQ.codeReference && (
                <div className="text-[11px] text-slate-400">
                  Nằm tại: <code className="text-emerald-400">{currentQ.codeReference.file}</code> ({currentQ.codeReference.functionName})
                </div>
              )}
            </div>
          )}

          {/* Answer Area (Initially Hidden) */}
          {showAnswer ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4" /> Câu trả lời ngắn (20 – 45 giây trước giảng viên):
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">Elevator Pitch</span>
                </div>
                <p className="text-slate-100 text-sm leading-relaxed font-medium">
                  {currentQ.quickAnswer}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-2 text-xs">
                <span className="font-bold text-slate-300 block">
                  Phân tích chi tiết và luận điểm chuyên sâu:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {currentQ.detailedExplanation}
                </p>
              </div>

              {currentQ.teacherFollowUp && (
                <div className="p-3.5 bg-rose-950/20 border border-rose-500/20 rounded-xl text-xs space-y-1">
                  <span className="text-rose-400 font-bold block">
                    Giảng viên có thể hỏi sâu tiếp:
                  </span>
                  <p className="text-slate-300 text-xs">
                    {currentQ.teacherFollowUp}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-10 text-center rounded-2xl bg-slate-900/50 border border-dashed border-slate-700 flex flex-col items-center justify-center space-y-3">
              <EyeOff className="w-8 h-8 text-slate-600" />
              <p className="text-xs text-slate-400 max-w-sm">
                Hãy tự trình bày câu trả lời trong khoảng 30 giây trước khi bấm xem đáp án chuẩn để rèn luyện phản xạ vấn đáp.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
                >
                  {showHint ? 'Ẩn gợi ý' : 'Hiển thị gợi ý'}
                </button>
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Xem đáp án chuẩn
                </button>
              </div>
            </div>
          )}

          {/* Flashcard Action Buttons */}
          <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Câu trước
              </button>
              <button
                onClick={handleRandom}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition flex items-center gap-1 cursor-pointer"
                title="Chọn câu ngẫu nhiên"
              >
                <Shuffle className="w-3.5 h-3.5" /> Ngẫu nhiên
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={markNeedsReview}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-950/60 text-amber-300 hover:bg-amber-900 border border-amber-500/40 transition flex items-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Cần ôn lại
              </button>
              <button
                onClick={markMastered}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 border border-emerald-500/40 transition flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Đã nắm vững
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-700 text-white hover:bg-slate-600 transition flex items-center gap-1.5 cursor-pointer"
              >
                Câu tiếp theo <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 bg-slate-900 rounded-2xl border border-slate-800">
          Không có câu hỏi nào trong danh mục đã chọn.
        </div>
      )}
    </div>
  );
};
