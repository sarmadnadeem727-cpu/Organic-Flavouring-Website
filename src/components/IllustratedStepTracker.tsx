import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { 
  SorterIllustration, 
  PackingIllustration, 
  RiderIllustration, 
  CustomerIllustration 
} from './Illustrations';

export interface StepTrackerProps {
  currentStep: number; // 1: Order Confirmation, 2: Freshly Packed, 3: En Route, 4: Delivered
  onStepClick?: (step: number) => void;
}

export default function IllustratedStepTracker({ currentStep = 1, onStepClick }: StepTrackerProps) {
  const steps = [
    {
      id: 1,
      title: "Order Confirmation",
      description: "Place your order, confirm payment, and get instant confirmation.",
      Illustration: SorterIllustration
    },
    {
      id: 2,
      title: "Freshly Packed",
      description: "Your spices are freshly measured and hygienically packed.",
      Illustration: PackingIllustration
    },
    {
      id: 3,
      title: "En Route",
      description: "Order dispatched — delivered across Pakistan swiftly.",
      Illustration: RiderIllustration
    },
    {
      id: 4,
      title: "Delivered",
      description: "Get ready to cook with the natural twist.",
      Illustration: CustomerIllustration
    }
  ];

  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full bg-[#FBF3E7] border border-[#EBDAC4] rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden my-8">
      {/* Background connecting progress line */}
      <div className="hidden md:block absolute top-[4.25rem] left-[10%] right-[10%] h-1 bg-[#EBDAC4] z-0">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#B33A2E] via-[#D8A72E] to-[#1F4B33]"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {steps.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isPending = step.id > currentStep;
          const IconComp = step.Illustration;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              onClick={() => onStepClick && onStepClick(step.id)}
              className={`flex items-start md:flex-col md:items-center text-left md:text-center gap-4 transition-all ${
                onStepClick ? 'cursor-pointer' : ''
              } ${isPending ? 'opacity-55' : 'opacity-100'}`}
            >
              {/* Illustrated Icon with Ring & Status Badge */}
              <div className="relative shrink-0">
                <div 
                  className={`p-1 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'ring-4 ring-[#D8A72E] ring-offset-2 ring-offset-[#FBF3E7] scale-110 shadow-lg' 
                      : isCompleted 
                        ? 'ring-2 ring-[#1F4B33] ring-offset-1 ring-offset-[#FBF3E7]'
                        : 'border border-[#DFCBB2]'
                  }`}
                >
                  <IconComp className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>

                {/* Completed Checkmark Badge */}
                {isCompleted && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[#1F4B33] text-white p-1 rounded-full shadow-md"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </motion.div>
                )}

                {/* Active Pulse Pill */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#B33A2E] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    Current
                  </span>
                )}
              </div>

              {/* Text Block */}
              <div className="space-y-1 mt-1">
                <h4 className={`font-serif text-base sm:text-lg font-bold tracking-tight ${
                  isActive ? 'text-[#B33A2E]' : isCompleted ? 'text-[#1F4B33]' : 'text-[#2A211B]'
                }`}>
                  {step.title}
                </h4>
                <p className="text-xs text-[#5E4D40] leading-relaxed max-w-[210px] mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
