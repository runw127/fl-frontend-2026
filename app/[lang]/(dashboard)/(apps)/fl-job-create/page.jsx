"use client";
import React, { useState } from "react";
import CustomWizard from "./create-job.jsx";


const DataPage = () => {
  return (
    <div className=" ">
      <div className="bg-background  p-10 shadow-md rounded-lg space-y-5">
        <CustomWizard />
        </div>
    </div>
  );
};

export default DataPage;
