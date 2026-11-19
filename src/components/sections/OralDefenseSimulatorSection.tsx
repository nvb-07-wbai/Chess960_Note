import React, { useState, useEffect, useMemo } from 'react';
import { GENERAL_QUESTIONS } from '../../data/generalQuestions';
import { MEMBER_QUESTIONS } from '../../data/memberQuestions';
import { FUNCTION_DOSSIERS } from '../../data/functionDossiers';
import { PARAMETERS_DATA } from '../../data/parameterGuide';
import { CASE_STUDIES } from '../../data/caseStudies';
import type { DefenseQuestion, FunctionDossier, ParameterDossier, CaseStudyDossier } from '../../types';

type SimulatorMode =
  | 'general'
  | 'member-bach'
  | 'member-long'
  | 'member-viet'
  | 'member-vuong'
  | 'functions'
  | 'parameters'
  | 'cases'
  | 'exam-random';

interface QuestionItem {
  id: string;
  source: string;
  title: string;
  subtitle: string;
  prompt: string;
  answer30s: string;
  detail: string;
  traps: string[];
  checklist: string[];
}

export const OralDefenseSimulatorSection: React.FC = () => {
  const [mode, setMode] = useState<SimulatorMode>('exam-random');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [ratings, setRatings] = useState<Record<string, 'weak' | 'ok' | 'good'>>(() => {
    try {
      const saved = localStorage.getItem('chess960_defense_ratings');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Build question pool according to mode
  const questionPool: QuestionItem[] = useMemo(() => {
    switch (mode) {
      case 'general':
        return GENERAL_QUESTIONS.map((q: DefenseQuestion) => ({
          id: q.id,
          source: 'Câu hỏi chung (General Q&A)',
          title: q.question,
          subtitle: `Chủ đề: ${q.topic}`,
          prompt: q.question,
          answer30s: q.answer.quickPitch,
          detail: q.answer.deepExplanation,
          traps: q.answer.teacherFollowUps?.map((tf) => `${tf.question} -> ${tf.answer}`) || [],
          checklist: [
            'Nêu bản chất bài toán / nguyên lý thuật toán',
            'Giải thích được tại sao nhóm thiết kế như vậy',
            'Phân tích trường hợp biên hoặc nguy cơ tiềm ẩn',
            'Bảo vệ được thông số hoặc phương pháp sử dụng',
          ],
        }));

      case 'member-bach':
      case 'member-long':
      case 'member-viet':
      case 'member-vuong': {
        const memId = mode.replace('member-', '');
        return MEMBER_QUESTIONS.filter((q: DefenseQuestion) => q.memberTarget === memId).map((q: DefenseQuestion) => ({
          id: q.id,
          source: `Vấn đáp thành viên: ${memId.toUpperCase()}`,
          title: q.question,
          subtitle: `Mã: ${q.id} - ${q.memberRole || ''}`,
          prompt: q.question,
          answer30s: q.answer.quickPitch,
          detail: q.answer.deepExplanation,
          traps: q.answer.teacherFollowUps?.map((tf) => `${tf.question} -> ${tf.answer}`) || [],
          checklist: [
            'Trả lời dứt khoát không ngập ngừng trong 30 giây đầu',
            'Trình bày đúng luồng dữ liệu hoặc thuật toán liên quan',
            'Giải thích mối liên hệ giữa module này và module khác',
            'Trả lời câu hỏi mở rộng / vặn lại của giảng viên',
          ],
        }));
      }

      case 'functions':
        return FUNCTION_DOSSIERS.map((f: FunctionDossier) => ({
          id: f.id,
          source: `Hồ sơ mã nguồn: ${f.file}`,
          title: `Hàm / Lớp: ${f.name}`,
          subtitle: f.signature,
          prompt: `Hãy giải thích hàm '${f.name}': Đầu vào, đầu ra, các bước thực hiện và lý do tại sao nhóm cần hàm này?`,
          answer30s: f.memoryDefense,
          detail: `VAI TRÒ:\n${f.role}\n\nĐẦU VÀO:\n${f.inputDescription}\n\nĐẦU RA:\n${f.outputDescription}\n\nTRÌNH TỰ THỰC THI:\n${f.stepSequence.join('\n')}\n\nLÝ DO THIẾT KẾ:\n${f.whyChosen}\n\nKỊCH BẢN LỖI:\n${f.failureScenario}`,
          traps: [f.teacherTrap],
          checklist: [
            'Nêu chính xác kiểu dữ liệu đầu vào và đầu ra',
            'Trình bày các bước thực hiện theo đúng thứ tự code chạy',
            'Nêu lý do thiết kế và hậu quả nếu bỏ hàm này',
            'Trả lời câu hỏi mở rộng / vặn lại của thầy cô',
          ],
        }));

      case 'parameters':
        return PARAMETERS_DATA.map((p: ParameterDossier) => ({
          id: p.id,
          source: `Cẩm nang siêu tham số (${p.file})`,
          title: `Thông số: ${p.name} = ${p.currentValue}`,
          subtitle: `Phân loại: ${p.category}`,
          prompt: `Tại sao nhóm lại đặt giá trị '${p.name} = ${p.currentValue}'? Căn cứ vào đâu và nếu tăng hoặc giảm thì điều gì sẽ xảy ra?`,
          answer30s: p.defenseScript,
          detail: `VAI TRÒ:\n${p.roleInAlgorithm}\n\nCĂN CỨ THỰC NGHIỆM & LÝ THUYẾT:\n${p.whyChosen}\n\nNẾU TĂNG QUÁ CAO:\n${p.ifIncreased}\n\nNẾU GIẢM QUÁ THẤP:\n${p.ifDecreased}`,
          traps: [
            `Tại sao không chọn giá trị lớn hơn gấp đôi?`,
            `Nhóm đã đo đạc thông số này bằng bao nhiêu ván thực nghiệm?`,
          ],
          checklist: [
            'Giải thích bản chất vật lý / thuật toán của thông số',
            'Nêu căn cứ thực nghiệm hoặc lý thuyết',
            'Phân tích sự đánh đổi khi tăng hoặc giảm giá trị',
          ],
        }));

      case 'cases':
        return CASE_STUDIES.map((c: CaseStudyDossier) => ({
          id: c.id,
          source: `Thực nghiệm giải đấu (Bảng 10): ${c.id}`,
          title: `Tình huống ${c.matchId}`,
          subtitle: `Nước đi: ${c.movePlayed} - ID Chess960: #${c.frcId}`,
          prompt: `Trong trận ${c.matchId}, tại nước ${c.movePlayed}, bot đã đưa ra quyết định gì? Cơ chế thuật toán nào tham gia và bài học rút ra là gì?`,
          answer30s: c.teacherDefenseNotes,
          detail: `BỐI CẢNH & PHÂN TÍCH:\n${c.boardStateDesc}\n\nLÝ DO CHỌN:\n${c.botChoiceReason}\n\nTHUẬT TOÁN THAM GIA:\n${c.keyAlgorithmResponsible}\n\nBÀI HỌC RÚT RA:\n${c.ifRedoneHowToImprove}`,
          traps: [c.tacticalIssue],
          checklist: [
            'Nhớ được tình huống và nước đi then chốt',
            'Chỉ ra các thuật toán tham gia vào quyết định',
            'Giải thích tại sao bot chọn nước đi đó thay vì nước khác',
            'Thừa nhận khuyết điểm hoặc bài học kinh nghiệm',
          ],
        }));

      case 'exam-random':
      default: {
        const mixed: QuestionItem[] = [];
        GENERAL_QUESTIONS.slice(0, 10).forEach((q: DefenseQuestion) => {
          mixed.push({
            id: q.id,
            source: 'ĐỀ THI TỔNG HỢP (Chung)',
            title: q.question,
            subtitle: q.topic,
            prompt: q.question,
            answer30s: q.answer.quickPitch,
            detail: q.answer.deepExplanation,
            traps: q.answer.teacherFollowUps?.map((tf) => `${tf.question} -> ${tf.answer}`) || [],
            checklist: ['Nêu ý tưởng cốt lõi', 'Giải thích kiến trúc', 'Bảo vệ tham số'],
          });
        });
        FUNCTION_DOSSIERS.slice(0, 8).forEach((f: FunctionDossier) => {
          mixed.push({
            id: f.id,
            source: 'ĐỀ THI TỔNG HỢP (Code)',
            title: `Hàm: ${f.name}`,
            subtitle: f.file,
            prompt: `Giải thích chi tiết hàm ${f.name} trong ${f.file}: vai trò, đầu vào, đầu ra, các bước thực thi và câu hỏi mở rộng của giảng viên?`,
            answer30s: f.memoryDefense,
            detail: f.role + '\n\n' + f.stepSequence.join('\n'),
            traps: [f.teacherTrap],
            checklist: ['Đầu vào / Đầu ra', 'Các bước chạy', 'Câu hỏi mở rộng'],
          });
        });
        PARAMETERS_DATA.slice(0, 5).forEach((p: ParameterDossier) => {
          mixed.push({
            id: p.id,
            source: 'ĐỀ THI TỔNG HỢP (Tham số)',
            title: `Tham số: ${p.name}`,
            subtitle: p.currentValue,
            prompt: `Tại sao ${p.name} lại bằng ${p.currentValue}?`,
            answer30s: p.defenseScript,
            detail: p.whyChosen,
            traps: [`Nếu tăng thì sao?`, `Nếu giảm thì sao?`],
            checklist: ['Cơ sở lý thuyết', 'Tác động khi tăng/giảm'],
          });
        });
        CASE_STUDIES.slice(0, 5).forEach((c: CaseStudyDossier) => {
          mixed.push({
            id: c.id,
            source: 'ĐỀ THI TỔNG HỢP (Ván đấu)',
            title: `${c.id} (${c.matchId})`,
            subtitle: c.movePlayed,
            prompt: `Phân tích tình huống ${c.id} và câu hỏi: "${c.tacticalIssue}"`,
            answer30s: c.teacherDefenseNotes,
            detail: c.boardStateDesc,
            traps: [c.tacticalIssue],
            checklist: ['Phân tích nước đi', 'Thuật toán tham gia'],
          });
        });
        return mixed.sort(() => 0.5 - Math.random());
      }
    }
  }, [mode]);

  const currentQ = questionPool[currentIndex] || questionPool[0];

  // Reset when question or mode changes
  useEffect(() => {
    setShowAnswer(false);
    setCheckedItems({});
    setTimerSeconds(30);
    setIsTimerRunning(false);
  }, [currentIndex, mode]);

  // Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const handleNext = () => {
    if (currentIndex < questionPool.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRandom = () => {
    const nextIdx = Math.floor(Math.random() * questionPool.length);
    setCurrentIndex(nextIdx);
  };

  const handleRate = (rating: 'weak' | 'ok' | 'good') => {
    if (!currentQ) return;
    const newRatings = { ...ratings, [currentQ.id]: rating };
    setRatings(newRatings);
    try {
      localStorage.setItem('chess960_defense_ratings', JSON.stringify(newRatings));
    } catch {}
    handleNext();
  };

  const toggleChecklist = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Stats calculation
  const stats = useMemo(() => {
    let weak = 0;
    let ok = 0;
    let good = 0;
    Object.values(ratings).forEach((r) => {
      if (r === 'weak') weak++;
      if (r === 'ok') ok++;
      if (r === 'good') good++;
    });
    return { weak, ok, good, total: weak + ok + good };
  }, [ratings]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              Mô phỏng phòng thi vấn đáp thực tế (No-Code Oral Exam)
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Phòng Mô Phỏng Vấn Đáp (Oral Defense Simulator)
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Quy tắc phòng thi: <strong className="text-rose-400">Không mở mã nguồn</strong>. Thầy cô hỏi bất kỳ câu nào,
              bạn có <span className="text-white font-semibold">30 giây</span> để bắt đầu phản xạ trả lời trôi chảy trước khi lật đáp án đối chiếu.
            </p>
          </div>

          {/* Quick Scoreboard */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
            <span className="text-emerald-400">✓ Tự tin: {stats.good}</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400">~ Ổn: {stats.ok}</span>
            <span className="text-slate-600">|</span>
            <span className="text-rose-400">✕ Chưa thuộc: {stats.weak}</span>
          </div>
        </div>

        {/* Mode Selector Buttons */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
          {[
            { id: 'exam-random', label: '🎲 Thi ngẫu nhiên tổng hợp' },
            { id: 'general', label: '📖 Câu hỏi chung (32 câu)' },
            { id: 'member-bach', label: '👤 Bách (bot.py)' },
            { id: 'member-long', label: '👤 Long (search.py)' },
            { id: 'member-viet', label: '👤 Việt (eval.py)' },
            { id: 'member-vuong', label: '👤 Vương (time.py)' },
            { id: 'functions', label: '⚡ 25 Hàm cốt lõi' },
            { id: 'parameters', label: '⚖️ 12 Siêu tham số' },
            { id: 'cases', label: '♟️ 10 Ván đấu thực chiến' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id as SimulatorMode);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                mode === m.id
                  ? 'bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/30'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulator Card */}
      {currentQ && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Top Bar of Card */}
          <div className="bg-slate-950/80 p-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs font-bold">
                Câu {currentIndex + 1} / {questionPool.length}
              </span>
              <span className="text-xs text-rose-400 font-medium">{currentQ.source}</span>
            </div>

            {/* Timer Controller */}
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-xl font-mono text-xs font-bold border transition-colors ${
                  timerSeconds <= 5
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                    : 'bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                <span>⏱</span>
                <span>{timerSeconds}s</span>
              </div>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  isTimerRunning
                    ? 'bg-amber-600 text-white'
                    : 'bg-emerald-600 text-white hover:bg-emerald-500'
                }`}
              >
                {isTimerRunning ? 'Tạm dừng' : 'Bắt đầu bấm giờ (30s)'}
              </button>
              <button
                onClick={() => {
                  setTimerSeconds(30);
                  setIsTimerRunning(false);
                }}
                className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs border border-slate-700"
              >
                Đặt lại
              </button>
            </div>
          </div>

          {/* Question Prompt Area */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <span>🎯</span> Giảng viên chất vấn:
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                "{currentQ.prompt}"
              </h2>
              {currentQ.subtitle && (
                <p className="text-xs text-slate-400 font-mono">{currentQ.subtitle}</p>
              )}
            </div>

            {/* Checklist of key points to mention before revealing */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                ☑ Tự kiểm tra các ý chính bạn cần nói ra:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentQ.checklist.map((item, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-2 text-slate-300 cursor-pointer select-none hover:text-white"
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedItems[idx]}
                      onChange={() => toggleChecklist(idx)}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500/20 bg-slate-800 mt-0.5"
                    />
                    <span className={checkedItems[idx] ? 'line-through text-slate-500' : ''}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reveal Answer Button */}
            {!showAnswer ? (
              <div className="text-center py-6">
                <button
                  onClick={() => setShowAnswer(true)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-xl shadow-emerald-600/20 hover:from-emerald-500 hover:to-teal-500 transition-all transform hover:-translate-y-0.5"
                >
                  👁️ Lật Đáp Án & Kịch Bản 30 Giây Đối Chiếu
                </button>
                <p className="text-xs text-slate-500 mt-2">
                  Hãy thử nói thành lời câu trả lời của bạn trước khi bấm lật đáp án!
                </p>
              </div>
            ) : (
              /* Answer Revealed Content */
              <div className="space-y-6 pt-4 border-t border-slate-800 animate-fadeIn">
                {/* 30s Quick Script */}
                <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/20 border border-emerald-500/40 rounded-xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <span>⚡</span> Kịch bản phản xạ 30 giây (Nói tự tin, dứt khoát):
                  </div>
                  <p className="text-sm text-slate-100 font-medium italic leading-relaxed">
                    "{currentQ.answer30s}"
                  </p>
                </div>

                {/* Full Detail */}
                <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    📖 Chi tiết lập luận & Dẫn chứng:
                  </h4>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-mono">
                    {currentQ.detail}
                  </p>
                </div>

                {/* Traps */}
                {currentQ.traps && currentQ.traps.length > 0 && (
                  <div className="bg-rose-950/30 border border-rose-900/40 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
                      🎯 Câu hỏi chất vấn thêm / Vặn lại của Giảng viên:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {currentQ.traps.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Self Evaluation Buttons */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-slate-400 font-medium">
                    Tự đánh giá phần trả lời vừa rồi của bạn:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRate('weak')}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 text-rose-400 border border-rose-800 hover:bg-rose-900/60 text-xs font-semibold"
                    >
                      ✕ Chưa thuộc (Weak)
                    </button>
                    <button
                      onClick={() => handleRate('ok')}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-950/60 text-amber-400 border border-amber-800 hover:bg-amber-900/60 text-xs font-semibold"
                    >
                      ~ Tạm ổn (OK)
                    </button>
                    <button
                      onClick={() => handleRate('good')}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/60 text-xs font-semibold"
                    >
                      ✓ Tự tin (Confident)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card Navigation */}
          <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-medium text-white transition-colors"
            >
              ◀ Câu trước
            </button>
            <button
              onClick={handleRandom}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
            >
              🎲 Câu ngẫu nhiên
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white transition-colors shadow-lg shadow-rose-600/20"
            >
              Câu kế tiếp ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
