import React, { useState } from "react";
import { useParams } from "next/navigation"; // Import useParams from next/navigation
import { Input } from "./ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const AddFile = () => {
  const params = useParams(); // Get params object from Next.js

  // Ensure patient_id is a string and handle edge cases
  const patientIdParam = Array.isArray(params.id) ? params.id[0] : params.id; 
  const patient_id = parseInt(patientIdParam || "0", 10); // Default to 0 if undefined

  const [resultName, setResultName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dwxs7snsz/raw/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_files");

    try {
      // Upload file to Cloudinary
      const cloudinaryResponse = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!cloudinaryResponse.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const uploadedUrl = cloudinaryData.secure_url; // Get the file URL

      console.log("Cloudinary URL:", uploadedUrl);

      // Send the Cloudinary URL, resultName, and patient_id to the backend
      const backendResponse = await fetch("http://localhost:8080/upload-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          result_name: resultName,
          result_url: uploadedUrl,
          patient_id, // Include the patient_id in the payload as an integer
        }),
      });

      if (!backendResponse.ok) {
        throw new Error("Backend request failed");
      }

      const backendData = await backendResponse.json();
      console.log("Backend response:", backendData);

      // Show success toast message
      toast.success("File uploaded successfully!");

      // Reset form inputs
      setResultName("");
      setFile(null);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading file. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="resultName">Result Name</label>
          <Input
            id="resultName"
            type="text"
            value={resultName}
            onChange={(e) => setResultName(e.target.value)}
            className=""
          />
        </div>

        <div className="grid grid-cols-1 items-center gap-1">
          <label htmlFor="file">Upload Result</label>
          <input
            type="file"
            id="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
            className=""
          />
        </div>

        <button type="submit" className="mt-4 btn-primary">
          Upload Result
        </button>
      </form>
    </>
  );
};

export { AddFile };
