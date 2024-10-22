import React from "react";
import { Input } from "./ui/input";

const PatientRegistration = () => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 items-center gap-1">
        <label htmlFor="name" className="">
          Fullname
        </label>
        <Input id="name" type="text" value={""} className="" />
      </div>
      <div className="grid grid-cols-1 items-center gap-1">
        <label htmlFor="age" className="">
          Age
        </label>
        <Input id="age" type="number" value="" className="" />
      </div>
      <div className="grid grid-cols-1 items-center gap-1">
        <label htmlFor="gender" className="">
          Gender
        </label>
        <Input id="gender" type="text" value="" className="" />
      </div>
      <div className="grid grid-cols-1 items-center gap-1">
        <label htmlFor="number" className="">
          Phone number
        </label>
        <Input id="number" type="tel" value="" className="" />
      </div>
    </div>
  );
};

export { PatientRegistration };
