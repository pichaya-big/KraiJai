'use client';

import { useState } from 'react';
import { useTripStore } from '../store/useTripStore';
import { useHasHydrated } from '../hooks/useHasHydrated';
import { useTranslation } from '../i18n/useTranslation';
import { RotateCcw, Edit3, Check } from 'lucide-react';

import { StepIndicator } from '../components/trip/StepIndicator';
import { MembersStep } from '../components/trip/MembersStep';
import { ExpensesStep } from '../components/trip/ExpensesStep';
import { SummaryStep } from '../components/trip/SummaryStep';
import { QrModal } from '../components/trip/QrModal';

type StepKey = 'members' | 'expenses' | 'summary';

export default function Home() {
  const hasHydrated = useHasHydrated();
  const t = useTranslation();

  // Store state and actions
  const { title, participants, stops, setTripTitle, resetTrip } = useTripStore();

  // Local component state
  const [currentStep, setCurrentStep] = useState<StepKey>('members');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  // Modal & Toast state
  const [selectedPayee, setSelectedPayee] = useState<{ name: string; amount: number } | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Hydration fallback
  if (!hasHydrated) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="nm-panel p-8 flex flex-col items-center gap-4 max-w-sm w-full bg-slate-50/50">
          <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-500 border-t-transparent"></div>
          <p className="text-xs font-semibold text-slate-500">{t.hydrationLoading}</p>
        </div>
      </div>
    );
  }

  // Toast utility
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  // Save edited title
  const handleSaveTitle = () => {
    if (tempTitle.trim()) {
      setTripTitle(tempTitle.trim());
    }
    setIsEditingTitle(false);
  };

  // Open PromptPay QR code
  const handleOpenQr = (payeeName: string, amount: number) => {
    setSelectedPayee({ name: payeeName, amount });
    setShowQrModal(true);
  };

  // Reset trip and return to step 1
  const handleResetTrip = () => {
    if (window.confirm('Are you sure? This will clear all trip data.')) {
      resetTrip();
      setCurrentStep('members');
      setToastMessage('');
    }
  };

  // Step progression logic
  const canAdvanceToExpenses = participants.length > 0;

  const handleStepClick = (step: StepKey) => {
    // Can always go backward or stay on current step
    const currentIdx = ['members', 'expenses', 'summary'].indexOf(currentStep);
    const targetIdx = ['members', 'expenses', 'summary'].indexOf(step);

    // Allow backward navigation or forward if gates are passed
    if (targetIdx <= currentIdx) {
      setCurrentStep(step);
    } else if (step === 'expenses' && canAdvanceToExpenses) {
      setCurrentStep(step);
    } else if (step === 'summary' && currentIdx >= 1) {
      setCurrentStep(step);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 'members' && canAdvanceToExpenses) {
      setCurrentStep('expenses');
    } else if (currentStep === 'expenses') {
      setCurrentStep('summary');
    }
  };

  const handleBackStep = () => {
    if (currentStep === 'expenses') {
      setCurrentStep('members');
    } else if (currentStep === 'summary') {
      setCurrentStep('expenses');
    }
  };

  const showBackButton = currentStep !== 'members';
  const showNextButton = currentStep !== 'summary';
  const nextDisabled = (currentStep === 'members' && !canAdvanceToExpenses);

  return (
    <div className="w-full max-w-[100vw] px-4 md:px-8 py-4 pb-20 mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900/90 text-white dark:bg-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-nm-flat flex items-center gap-2 text-xs font-semibold backdrop-blur-xs border border-white/10">
            <Check className="size-4 text-green-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Unified application column matching the active cards width */}
      <div className="max-w-2xl mx-auto w-full space-y-6">
        
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/40 pb-4">
          <div className="text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    className="nm-input font-bold text-xl py-1 max-w-xs"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
                  />
                  <button
                    onClick={handleSaveTitle}
                    className="nm-btn p-1.5 text-green-600"
                  >
                    <Check className="size-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-wider bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    {title}
                  </h1>
                  <button
                    onClick={() => {
                      setIsEditingTitle(true);
                      setTempTitle(title);
                    }}
                    className="nm-btn p-1.5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    <Edit3 className="size-3.5" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {t.tripHeader.subtitle}
            </p>
          </div>

          <button
            onClick={handleResetTrip}
            className="nm-btn px-4 py-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 font-semibold flex items-center gap-2"
          >
            <RotateCcw className="size-4" />
            <span>{t.tripHeader.reset}</span>
          </button>
        </div>

        {/* Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          canAdvanceToExpenses={canAdvanceToExpenses}
          memberCount={participants.length}
          stopCount={stops.length}
          onStepClick={handleStepClick}
        />

        {/* Step Content */}
        <div>
          {currentStep === 'members' && <MembersStep showToast={showToast} />}
          {currentStep === 'expenses' && <ExpensesStep showToast={showToast} />}
          {currentStep === 'summary' && (
            <SummaryStep showToast={showToast} onOpenQr={handleOpenQr} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-between pt-2">
          {showBackButton ? (
            <button
              onClick={handleBackStep}
              className="nm-btn px-6 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 flex-1 sm:flex-none"
            >
              ← {t.wizard.back}
            </button>
          ) : (
            <div />
          )}

          {showNextButton ? (
            <button
              onClick={handleNextStep}
              disabled={nextDisabled}
              className="nm-btn-accent px-6 py-2 text-sm font-semibold flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              title={nextDisabled ? t.wizard.needAtLeastOneMember : ''}
            >
              {t.wizard.next} →
            </button>
          ) : (
            <div />
          )}
        </div>

        {/* Hint about minimum requirement */}
        {currentStep === 'members' && !canAdvanceToExpenses && (
          <div className="text-center mt-2">
            <p className="text-xs text-amber-600 dark:text-amber-400/80 font-medium">
              {t.wizard.needAtLeastOneMember}
            </p>
          </div>
        )}

      </div>

      {/* QR Modal */}
      <QrModal
        open={showQrModal}
        payee={selectedPayee}
        onClose={() => setShowQrModal(false)}
      />
    </div>
  );
}
