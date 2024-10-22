import React, { useState } from "react";
import { Input } from "./ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const DeviceRegistration = () => {

  const [devicename, setdevicename] = useState("");
  const [devicetype, setdevicetype] = useState(""); 
  const [serialnumber, setserialnumber] = useState("");
  const [countrycode, setcountrycode] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    const deviceData = {
      device_name: devicename,
      device_type: devicetype,
      serial_number: serialnumber,
      country_code: Number(countrycode),
    };

    try {
      const response = await fetch("http://localhost:8080/add-device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deviceData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Device registered successfully:", data);

      // Show success toast message
      toast.success("Device registered successfully!");

      setdevicename("");
      setdevicetype(""); 
      setserialnumber("");
      setcountrycode("");
    } catch (error) {
      console.error("Error registering device:", error);
      // Show error toast message
      toast.error("Error registering device. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="name">Device name</label>
          <Input
            id="name"
            type="text"
            value={devicename}
            onChange={(e) => setdevicename(e.target.value)}
            className=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="age">Device type</label>
          <Input
            id="age"
            type="text"
            value={devicetype}
            onChange={(e) => setdevicetype(e.target.value)}
            className=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="gender">Serial number</label>
          <Input
            id="gender"
            type="text"
            value={serialnumber}
            onChange={(e) => setserialnumber(e.target.value)}
            className=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="number">Country code</label>
          <Input
            id="number"
            type="tel"
            value={countrycode}
            onChange={(e) => setcountrycode(e.target.value)}
            className=""
          />
        </div>
        <button type="submit" className="mt-4 btn-primary">
          Register Device
        </button>
      </form>
    </>
  );
};

export { DeviceRegistration };
