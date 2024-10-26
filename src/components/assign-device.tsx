import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const AssignDevice = () => {
  const [availableDevices, setAvailableDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [userId, setUserId] = useState("");

  // Fetch available devices on component mount
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:8080/available-devices");
        if (!response.ok) {
          throw new Error("Failed to fetch devices");
        }
        const data = await response.json();
        setAvailableDevices(data.data); // Assuming the response has a 'devices' array
      } catch (error) {
        console.error("Error fetching devices:", error);
        toast.error("Failed to load available devices.");
      }
    };

    fetchDevices();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const assignData = {
      assigned_device_id: parseInt(selectedDeviceId),
      id: parseInt(userId),
    };

    try {
      const response = await fetch("http://localhost:8080/assign-device", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignData),
      });

      if (!response.ok) {
        throw new Error("Failed to assign device");
      }

      const data = await response.json();
      console.log("Device assigned successfully:", data);
      toast.success("Device assigned successfully!");

      // Reset form fields
      setSelectedDeviceId("");
      setUserId("");
    } catch (error) {
      console.error("Error assigning device:", error);
      toast.error("Error assigning device. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
        {/* Device Selection */}
        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="device">Select Device</label>
          <select
            id="device"
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="" disabled>
              Choose a device
            </option>
            {availableDevices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.device_name} - {device.serial_number}
              </option>
            ))}
          </select>
        </div>

        {/* User ID Input */}
        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="userId">User ID</label>
          <Input
            id="userId"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="mt-4 btn-primary">
          Assign Device
        </button>
      </form>
    </>
  );
};

export { AssignDevice };
