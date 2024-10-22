import React, { useState } from "react";
import { Input } from "./ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const PatientRegistration = () => {

  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState(""); 
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    const patientData = {
      full_name: fullname,
      age: Number(age),
      gender: gender,
      contact_info: phoneNumber,
    };

    try {
      const response = await fetch("http://localhost:8080/add-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Patient registered successfully:", data);

      // Show success toast message
      toast.success("Patient registered successfully!");

      setFullname("");
      setAge(""); 
      setGender("");
      setPhoneNumber("");
    } catch (error) {
      console.error("Error registering patient:", error);
      // Show error toast message
      toast.error("Error registering patient. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="name">Fullname</label>
          <Input
            id="name"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="age">Age</label>
          <Input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="gender">Gender</label>
          <Input
            id="gender"
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className=""
          />
        </div>
        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="number">Phone number</label>
          <Input
            id="number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className=""
          />
        </div>
        <button type="submit" className="mt-4 btn-primary">
          Register Patient
        </button>
      </form>
    </>
  );
};

export { PatientRegistration };
