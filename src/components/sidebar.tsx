import React from "react";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-green-50 shadow-sm h-screen fixed w-[15%] p-5">
      <div>
        <h1>Patients</h1>
      </div>
      <div>
        <p>All</p>
        <p>Patient</p>
      </div>
    </div>
  );
};

export { Sidebar };
