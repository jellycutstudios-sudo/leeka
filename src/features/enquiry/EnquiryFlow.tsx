import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import type { EnquiryData, StepNumber } from '../../types/enquiry';
import { INITIAL_ENQUIRY_DATA, STORAGE_KEY } from '../../lib/constants';
import { TopNav } from '../../components/TopNav';
import { Footer } from '../../components/Footer';
import { StepContact } from './StepContact';
import { StepCoverage } from './StepCoverage';
import { StepReview } from './StepReview';
import { StepHandoffDone } from './StepHandoffDone';

export const EnquiryFlow: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Load initial draft from sessionStorage if available
  const [data, setData] = useState<EnquiryData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_ENQUIRY_DATA, ...parsed };
      }
    } catch {
      // Ignore
    }
    return INITIAL_ENQUIRY_DATA;
  });

  const [currentStep, setCurrentStep] = useState<StepNumber>(1);

  // Persist draft whenever fields change
  useEffect(() => {
    try {
      if (data.contactName || data.whatsappNumber || data.primaryDate) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
    } catch {
      // Ignore
    }
  }, [data]);

  const updateData = (patch: Partial<EnquiryData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  };

  const goToStep = (step: StepNumber) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const animationVariants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 6,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.2 },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -6,
      transition: { duration: prefersReducedMotion ? 0 : 0.15 },
    },
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-start bg-[#FAF6F0] selection:bg-[#B59A70]/20 selection:text-[#2D251E] overflow-x-hidden">
      {/* Delicate Ambient Floral Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 sm:opacity-50 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/floral-bg.jpg')` }}
      />
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[#FAF6F0]/70 via-transparent to-[#FAF6F0]/80" />

      {/* Main Mobile-first App Shell */}
      <div className="relative z-10 w-full max-w-md min-h-screen flex flex-col px-4 pb-10 sm:py-6">
        {/* Top Navigation Bar with Step Counter & Progress Line */}
        <TopNav
          currentStep={currentStep}
          totalSteps={3}
          canGoBack={currentStep > 1}
          onBack={() => {
            if (currentStep > 1) {
              goToStep((currentStep - 1) as StepNumber);
            }
          }}
          onStepClick={(step) => {
            if (step < currentStep) {
              goToStep(step);
            }
          }}
        />

        {/* Step Views with Smooth Micro-transitions */}
        <div className="flex-1 w-full mt-3">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step-1"
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <StepContact
                  data={data}
                  onChange={updateData}
                  onNext={() => goToStep(2)}
                />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <StepCoverage
                  data={data}
                  onChange={updateData}
                  onNext={() => goToStep(3)}
                  onBack={() => goToStep(1)}
                />
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step-3"
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <StepReview
                  data={data}
                  onChange={updateData}
                  onEditStep={(step) => goToStep(step as StepNumber)}
                  onBack={() => goToStep(2)}
                  onHandoffComplete={() => goToStep(4)}
                />
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step-4"
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full"
              >
                <StepHandoffDone
                  data={data}
                  onEdit={() => goToStep(3)}
                  onReset={() => {
                    try {
                      sessionStorage.removeItem(STORAGE_KEY);
                    } catch {
                      // Ignore
                    }
                    setData(INITIAL_ENQUIRY_DATA);
                    goToStep(1);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Polished Studio Footer */}
        <Footer />
      </div>
    </div>
  );
};
