import React, { useState } from 'react';
import { MOVE_LIFECYCLE_STEPS } from '../../data/systemArchitecture';
import { CheckCircle2, ChevronRight, Shield, ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const MoveLifecycleStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const currentStep = MOVE_LIFECYCLE_STEPS.find((s) => s.step === activeStep) || MOVE_LIFECYCLE_STEPS[0];

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">
              Vòng Đời Một Lượt Đi (Move Lifecycle – 8 Bước Phòng Thủ)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Quy trình khép kín từ khi nhận bàn cờ từ Grader đến khi bàn giao nước đi hợp lệ tuyệt đối
          </p>
        </div>
        <Badge variant="emerald">Chu trình 100% An toàn</Badge>
      </div>

      {/* Stepper Progress Bar */}
      <div className="mt-6 overflow-x-auto pb-2">
        <div className="flex items-center min-w-[700px] justify-between relative">
          <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-700 -z-0" />
          {MOVE_LIFECYCLE_STEPS.map((s) => {
            const isActive = s.step === activeStep;
            const isPassed = s.step < activeStep;

            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className="flex flex-col items-center relative z-10 group cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30 scale-110 shadow-lg'
                      : isPassed
                      ? 'bg-emerald-700 text-white'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 group-hover:border-slate-500'
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                </div>
                <span
                  className={`text-[11px] mt-2 font-medium max-w-[80px] text-center line-clamp-1 ${
                    isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'
                  }`}
                >
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Detail Card */}
      <div className="mt-6 bg-slate-900/90 rounded-xl p-5 border border-slate-700/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="text-xs text-emerald-400 font-mono font-semibold">
              BƯỚC {currentStep.step} / 8 • {currentStep.subTitle}
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">{currentStep.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">
              {currentStep.module} ({currentStep.lines})
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-8 space-y-3">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentStep.description}
            </p>
            <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-lg flex items-center gap-2 text-xs text-emerald-300">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Bảo chứng an toàn:</strong> {currentStep.safety}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-row md:flex-col justify-end gap-2">
            <button
              onClick={() => setActiveStep((prev) => (prev > 1 ? prev - 1 : 8))}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
            >
              Bước trước
            </button>
            <button
              onClick={() => setActiveStep((prev) => (prev < 8 ? prev + 1 : 1))}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500 shadow-md flex items-center justify-center gap-1.5 transition"
            >
              Bước tiếp theo <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
