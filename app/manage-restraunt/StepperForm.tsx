"use client";

import React, { useState } from "react";
import { useShopStore } from "@/utils/store";
import { ArrowRight } from "lucide-react";

import useDimension, { breakpointType } from "@/hooks/useDimension";
import { Button } from "@/components/ui/button";

function getCssByBreakpoint(breakpoint: breakpointType) {
  let classname = "";
  switch (breakpoint) {
    case "sm":
      classname = "mx-8";
      break;
    case "md":
      classname = "mx-16";
      break;
    case "lg":
      classname = "mx-32";
      break;
    case "xl":
      classname = "mx-64";
      break;
    case "2xl":
      classname = "mx-80";
      break;
    default:
      break;
  }
  return classname;
}

const StepperForm = ({
  steps,
  startFrom = 0,
}: {
  steps: React.JSX.Element[];
  startFrom: number;
}) => {
  const [currentStep, setcurrentStep] = useState<number>(startFrom);

  const { shop } = useShopStore();
  const { breakpoint } = useDimension();
  const CurrentContent = steps[currentStep];

  console.log(`%c shop `, "color: green;border:1px solid green", shop);
  return (
    <div className={`${getCssByBreakpoint(breakpoint)} gap-4 flex flex-col`}>
      <div className="top-steps flex flex-row gap-3 items-center">
        {steps.map((_, i) => {
          const isLastStep = i === steps.length - 1;

          return (
            <>
              <div
                onClick={() => setcurrentStep(i)}
                className={`step-circle rounded-full h-12 w-12 
                border-[3px] text-xl flex items-center justify-center
                 border-gray-400 cursor-pointer shadow-md 
                 transition-all transition-500 ${
                   currentStep >= i ? "bg-green-100 border-green-300" : ""
                 }`}
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
            </>
          );
        })}
      </div>
      <div className="bottom-area border-[3px]">{CurrentContent}</div>
      <div className="footer flex flex-row justify-between">
        <Button>Save Details</Button>
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
