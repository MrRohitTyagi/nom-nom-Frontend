import React from "react";
import StepperForm from "./StepperForm";

const ManageRestraunt = () => {
  const steps = [
    <FirstStep key={1} />,
    <SecondStep key={2} />,
    <ThirdStep key={3} />,
  ];
  return (
    <div>
      <StepperForm steps={steps} startFrom={0} />
    </div>
  );
};
const FirstStep = () => {
  return (
    <div className="first flex flex-col gap-4">
      <h1 className="opacity-70 text-center text-2xl">Restraunt information</h1>
      <div className="main-content"></div>
    </div>
  );
};
const SecondStep = () => {
  return (
    <div className="first flex flex-col gap-4">
      <h1 className="opacity-70 text-center text-2xl">
        Menu, Prices, Food images
      </h1>
      <div className="main-content"></div>
    </div>
  );
};
const ThirdStep = () => {
  return (
    <div className="first flex flex-col gap-4">
      <h1 className="opacity-70 text-center text-2xl">
        Additional Information
      </h1>
      <div className="main-content"></div>
    </div>
  );
};

export default ManageRestraunt;
