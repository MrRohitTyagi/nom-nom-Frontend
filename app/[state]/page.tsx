"use client";
import React from "react";

const StatePage = ({ params }: { params: { state: string } }) => {
  console.log(params);

  return <div>Showing restraunt in {params.state} </div>;
};

export default StatePage;
