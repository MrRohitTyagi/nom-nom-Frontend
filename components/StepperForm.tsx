"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const StepperForm = ({
  steps,
  setcurrentStep,
  currentStep,
}: {
  steps: React.JSX.Element[];
  setcurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
}) => {
  const CurrentContent = steps[currentStep];

  return (
    <div
      className={`gap-4 flex flex-col sm: mx-2 md:mx-16 lg:mx-32 xl:mx-64 2xl:mx-80`}
    >
      <div className="top-steps flex flex-row gap-3 items-center pt-6 sm: mx-8">
        {steps.map((_, i) => {
          const isLastStep = i === steps.length - 1;

          return (
            <React.Fragment key={i + "bar"}>
              <div
                onClick={() => setcurrentStep(i)}
                className={`step-circle rounded-full 
                border-[3px] text-xl flex items-center justify-center
                 border-gray-400 cursor-pointer shadow-md 
                 transition-all transition-500 ${
                   currentStep >= i ? "bg-green-100 border-green-300" : ""
                 } sm:h-12 sm:w-12 h-8 w-8 `}
              >
                {i + 1}
              </div>
              {!isLastStep && (
                <div
                  className={`relative rounded
                  flex-grow border-[2px] border-gray-400 shadow-md 
                   transition-all transition-500 ${
                     currentStep > i ? "border-green-300" : ""
                   }`}
                >
                  <ArrowRight
                    className={`absolute right-[-9px] top-[-12px] text-gray-400 ${
                      currentStep > i ? "text-green-300" : ""
                    }`}
                    size={24}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="bottom-area ">{CurrentContent}</div>
      <div className=" pt-2 pr-2 pl-2 footer flex flex-row justify-between">
        <div></div>
        <div className="gap-2 flex flex-row">
          <Button
            disabled={currentStep == 0}
            onClick={() => setcurrentStep((prev) => prev - 1)}
          >
            Previous Step
          </Button>
          <Button
            disabled={currentStep === steps.length - 1}
            onClick={() => setcurrentStep((prev) => prev + 1)}
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepperForm;
