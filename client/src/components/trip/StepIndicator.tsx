'use client';

import { Check, Lock } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

type StepKey = 'members' | 'expenses' | 'summary';

interface StepIndicatorProps {
  currentStep: StepKey;
  canAdvanceToExpenses: boolean;
  memberCount: number;
  stopCount: number;
  onStepClick: (step: StepKey) => void;
}

const STEPS: Array<{ key: StepKey; label: (t: any) => string }> = [
  { key: 'members', label: (t) => t.wizard.stepMembers },
  { key: 'expenses', label: (t) => t.wizard.stepExpenses },
  { key: 'summary', label: (t) => t.wizard.stepSummary },
];

export function StepIndicator({
  currentStep,
  canAdvanceToExpenses,
  memberCount,
  stopCount,
  onStepClick,
}: StepIndicatorProps) {
  const t = useTranslation();

  const isStepLocked = (stepKey: StepKey) => {
    if (stepKey === 'expenses' || stepKey === 'summary') {
      return !canAdvanceToExpenses;
    }
    return false;
  };

  const isStepReachable = (stepKey: StepKey) => {
    const currentIdx = STEPS.findIndex((s) => s.key === currentStep);
    const stepIdx = STEPS.findIndex((s) => s.key === stepKey);
    return stepIdx <= currentIdx || (stepKey === 'expenses' && canAdvanceToExpenses) || stepKey === 'members';
  };

  const getCount = (stepKey: StepKey) => {
    if (stepKey === 'members') return memberCount;
    if (stepKey === 'expenses') return stopCount;
    return null;
  };

  return (
    <div className="flex p-1 rounded-xl shadow-nm-inset bg-slate-200/30 dark:bg-slate-900/10 mb-6 gap-1">
      {STEPS.map((step, idx) => {
        const isCurrent = currentStep === step.key;
        const isLocked = isStepLocked(step.key);
        const isReachable = isStepReachable(step.key);
        const count = getCount(step.key);

        return (
          <button
            key={step.key}
            onClick={() => !isLocked && isReachable && onStepClick(step.key)}
            disabled={isLocked}
            title={isLocked ? t.wizard.locked : undefined}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              isCurrent
                ? 'shadow-nm-flat bg-background text-blue-600 dark:text-blue-400'
                : isLocked
                  ? 'opacity-40 cursor-not-allowed pointer-events-none text-muted-foreground'
                  : isReachable
                    ? 'text-muted-foreground hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer'
                    : 'opacity-50 text-muted-foreground'
            }`}
          >
            <div className="flex items-center gap-1">
              <div className={`size-4 rounded-full flex items-center justify-center text-xs font-bold ${
                isCurrent
                  ? 'bg-blue-600 text-white'
                  : idx < STEPS.findIndex((s) => s.key === currentStep) && !isLocked
                    ? 'bg-emerald-500 text-white'
                    : isLocked
                      ? 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                      : 'bg-slate-300 dark:bg-slate-700 text-slate-600'
              }`}>
                {idx < STEPS.findIndex((s) => s.key === currentStep) && !isLocked ? (
                  <Check className="size-3" />
                ) : (
                  idx + 1
                )}
              </div>
              <span className="hidden sm:inline">{step.label(t)}</span>
            </div>
            {count !== null && (
              <span className="text-xs text-muted-foreground ml-0.5">({count})</span>
            )}
            {isLocked && <Lock className="size-3" />}
          </button>
        );
      })}
    </div>
  );
}
