import React from 'react';
import { motion } from 'motion/react';
import { 
  OrderConfirmedIcon, 
  FreshlyPackedIcon, 
  EnRouteIcon, 
  DeliveredIcon 
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
      description: "Review cart & confirm details.",
      Icon: OrderConfirmedIcon
    },
    {
      id: 2,
      title: "Freshly Packed",
      description: "Measured & hygienically sealed.",
      Icon: FreshlyPackedIcon
    },
    {
      id: 3,
      title: "En Route",
      description: "Dispatched for courier delivery.",
      Icon: EnRouteIcon
    },
    {
      id: 4,
      title: "Delivered",
      description: "Arrived at your doorstep.",
      Icon: DeliveredIcon
    }
  ];

  const progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="w-full bg-white border border-[#E5D7C5] rounded-xl p-6 relative overflow-hidden my-6 shadow-xs">
      {/* Thin quiet connecting progress line */}
      <div className="hidden md:block absolute top-[2.75rem] left-[12%] right-[12%] h-[2px] bg-[#E5D7C5] z-0">
        <motion.div 
          className="h-full bg-[#D9542F]"
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isPending = step.id > currentStep;
          const IconComp = step.Icon;

          return (
            <div
              key={step.id}
              onClick={() => onStepClick && onStepClick(step.id)}
              className={`flex items-start md:flex-col md:items-center text-left md:text-center gap-3 transition-all ${
                onStepClick ? 'cursor-pointer' : ''
              } ${isPending ? 'opacity-40' : 'opacity-100'}`}
            >
              {/* Quiet Icon Circle */}
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 shrink-0 ${
                  isActive 
                    ? 'border-[#D9542F] bg-[#D9542F]/10 text-[#D9542F]' 
                    : isCompleted 
                      ? 'border-[#2F4F24] bg-[#2F4F24] text-white'
                      : 'border-[#E5D7C5] bg-[#FBF8F2] text-[#A0958B]'
                }`}
              >
                <IconComp className="w-5 h-5" active={isActive || isCompleted} />
              </div>

              {/* Text Meta */}
              <div className="space-y-0.5">
                <h4 className={`font-serif-heading text-xs font-bold uppercase tracking-wider ${
                  isActive ? 'text-[#D9542F]' : isCompleted ? 'text-[#2F4F24]' : 'text-[#211D18]'
                }`}>
                  {step.title}
                </h4>
                <p className="text-[11px] text-[#5A4F46] leading-tight">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
