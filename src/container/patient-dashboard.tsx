"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LayoutDashboard,
  Clock,
  BarChart2,
  Settings,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Sidebar } from "@/components/sidebar";
import { useParams } from "next/navigation";
import { FaDownload, FaHeartbeat, FaTemperatureHigh } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { GiWaterDrop } from "react-icons/gi";
import { PatientRegistration } from "@/components/patient-reg";
import ChatDropdown from "@/components/chatdropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AssignDevice } from "@/components/assign-device";
import { AddFile } from "@/components/upload-checkup-result";
import { AiOutlineWechatWork } from "react-icons/ai";

type Appointment = {
  id?: string;
  doctor: string;
  specialty?: string;
  time?: string;
  location?: string;
  full_name?: string;
  contact_info?: string | any;
};

const appointments: Appointment[] = [
  {
    id: "1",
    doctor: "Dr. Dianne Fisher",
    specialty: "Dentist",
    time: "8:00 - 8:30 AM",
    location: "CityMed Clinic",
  },
  {
    id: "2",
    doctor: "Dr. Paul Collins",
    specialty: "Neurologist",
    time: "9:00 - 9:30 AM",
    location: "Huston Hospital",
  },
  {
    id: "3",
    doctor: "Dr. Betty Woods",
    specialty: "Digital X-Ray",
    time: "18:00 - 18:30 PM",
    location: "CityMed Clinic",
  },
];

const organHealth = [
  { name: "Heart", percentage: 76 },
  { name: "Lungs", percentage: 90 },
  { name: "Stomach", percentage: 85 },
  { name: "Liver", percentage: 45 },
];


const PatientDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [patientId, setPatientId] = useState("N/A");
  const [deviceId, setDeviceId] = useState("N/A");
  const [heartRate, setHeartRate] = useState("N/A");
  const [oxygenLevel, setOxygenLevel] = useState("N/A");
  const [temperature, setTemperature] = useState("N/A");
  const [bloodPressure, setBloodPressure] = useState("N/A");
  const [glucoseLevel, setGlucoseLevel] = useState("N/A");
  const [chatVisible, setChatVisible] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  // Fetch patient results
  const fetchPatientResults = async () => {
    try {
      const response = await fetch(`http://localhost:8080/patient-result/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch patient results");
      }
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Fetch patient data
  const fetchPatientData = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/patient/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch patient data");
      }
      const data = await response.json();
      setPatient(data);
    } catch (error) {
      console.error(error);
      setPatient(null);
    } finally {
      setLoading(false);
    }
  };

  // Get patient results and WebSocket connection once patient is available
  useEffect(() => {
    const getResults = async () => {
      try {
        const data = await fetchPatientResults();
        console.log(data); // Log to inspect the structure of the response
        setResults(data); // Handle the results here
      } catch {
        setResults([]); // Handle fetch failure
      } finally {
        setLoading(false); // End loading regardless of success/failure
      }
    };
    getResults();
  }, [id]);

  // Log results whenever they change
  useEffect(() => {
    console.log(results); // Logs the updated results
  }, [results]);

  useEffect(() => {
    const wsUrl = `ws://localhost:8080/ws/${id}`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      socket.send("Hello from the client!");
    };

    socket.onmessage = (event) => {
      console.log("Message received:", event.data);
      try {
        const data = JSON.parse(event.data);
        updatePatientInfo(data);
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };

    socket.onerror = (event) => {
      console.error("WebSocket error:", event);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup on unmount
    return () => {
      socket.close();
    };
  }, [id]);

  // Update patient info from WebSocket message
  const updatePatientInfo = (data: any) => {
    console.log(data)
    setPatientId(data.patient_id || "N/A");
    setDeviceId(data.device_id || "N/A");
    setHeartRate(data.heart_rate || "N/A");
    setOxygenLevel(data.oxygen_level || "N/A");
    setTemperature(data.temperature || "N/A");
    setBloodPressure(data.blood_pressure || "N/A");
    setGlucoseLevel(data.glucose_level || "N/A");
  };

  // Fetch patient data when id changes
  useEffect(() => {
    if (id) {
      fetchPatientData(id as string);
    }
  }, [id]);

  // Loading and error handling states
  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!patient) {
    return <div>Patient not found.</div>;
  }

  // Normal ranges for health metrics
  const normalRanges = {
    heartRate: { min: 60, max: 100 },
    temperature: { min: 36.1, max: 37.2 },
    bloodPressure: {
      systolic: { min: 90, max: 120 },
      diastolic: { min: 60, max: 80 },
    },
    glucoseLevel: { min: 70, max: 140 },
    oxygenLevel: { min: 90, max: 100 },
  };

  // Functions to check if values are within normal range
  const isNormalHeartRate = (rate: string) => {
    const parsedRate = parseInt(rate, 10);
    return (
      !isNaN(parsedRate) &&
      parsedRate >= normalRanges.heartRate.min &&
      parsedRate <= normalRanges.heartRate.max
    );
  };

  const isNormalTemperature = (temp: string) => {
    const parsedTemp = parseFloat(temp);
    return (
      !isNaN(parsedTemp) &&
      parsedTemp >= normalRanges.temperature.min &&
      parsedTemp <= normalRanges.temperature.max
    );
  };

  const isNormalBloodPressure = (bp: string) => {
    const [systolic, diastolic] = bp.split("/").map(Number);
    return (
      systolic >= normalRanges.bloodPressure.systolic.min &&
      systolic <= normalRanges.bloodPressure.systolic.max &&
      diastolic >= normalRanges.bloodPressure.diastolic.min &&
      diastolic <= normalRanges.bloodPressure.diastolic.max
    );
  };

  const isNormalOxygenLevel = (oxygen: string) => {
    const parsedOxygen = parseFloat(oxygen);
    return (
      !isNaN(parsedOxygen) &&
      parsedOxygen >= normalRanges.oxygenLevel.min &&
      parsedOxygen <= normalRanges.oxygenLevel.max
    );
  };

  // Blinking class for abnormal values
  const blinkingClass = (
    value: string,
    type:
      | "heartRate"
      | "temperature"
      | "bloodPressure"
      | "glucoseLevel"
      | "oxygenLevel"
  ) => {
    switch (type) {
      case "heartRate":
        return !isNormalHeartRate(value) ? "animate-blink" : "";
      case "temperature":
        return !isNormalTemperature(value) ? "animate-blink" : "";
      case "bloodPressure":
        return !isNormalBloodPressure(value) ? "animate-blink" : "";
      case "oxygenLevel":
        return !isNormalOxygenLevel(value) ? "animate-blink" : "";
      default:
        return "";
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <Input type="search" placeholder="Search" className="w-64" />
          <div className="flex items-center space-x-4">
            <div className="relative">
            <Button
  variant="ghost"
  size="icon"
  className="relative"
  onClick={() => setChatVisible(!chatVisible)}
>
  <AiOutlineWechatWork className="text-blue-500" style={{ width: "2rem", height: "2rem" }} />
</Button>


              {chatVisible && (
                <div className="absolute top-10 right-0 w-80 bg-white border border-gray-300 rounded shadow-lg z-50">
                  <ChatDropdown />
                </div>
              )}
            </div>

            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Mike Johnson"
              />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{patient.full_name}</p>
              <p className="text-sm text-gray-500">{patient.contact_info}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-5">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                {" "}
                {patient.device_id ? "Unassign device" : "Assign device"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Assign device</DialogTitle>
                <AssignDevice />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health diagnosis */}
          <Card>
            <CardHeader>
              <CardTitle>Health diagnosis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white shadow-lg rounded-lg p-4 hover:bg-blue-700 hover:text-white transition duration-300">
                  <div className="flex gap-4 items-center">
                    <FaHeartbeat className="text-red-500" />
                    <p
                      className={`font-bold text-red-500 ${blinkingClass(
                        heartRate,
                        "heartRate"
                      )}`}
                    >
                      {heartRate} bpm
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">Heart Rate</p>
                    <p>
                      {isNormalHeartRate(heartRate)
                        ? "Heart rate is normal."
                        : "Warning: Heart rate is outside the normal range!"}
                    </p>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4 hover:bg-blue-700 hover:text-white transition duration-300">
                  <div className="flex gap-4 items-center">
                    <FaTemperatureHigh className="text-blue-500" />
                    <p
                      className={`font-bold text-blue-500 ${blinkingClass(
                        temperature,
                        "temperature"
                      )}`}
                    >
                      {temperature}° C
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">Temperature</p>
                    <p>
                      {isNormalTemperature(temperature)
                        ? "Temperature is normal."
                        : "Warning: Temperature is outside the normal range!"}
                    </p>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4 hover:bg-blue-700 hover:text-white transition duration-300">
                  <div className="flex gap-4 items-center">
                    <MdBloodtype className="text-red-500" />
                    <p
                      className={`font-bold text-red-500 ${blinkingClass(
                        bloodPressure,
                        "bloodPressure"
                      )}`}
                    >
                      {bloodPressure}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">Blood Pressure</p>
                    <p>
                      {isNormalBloodPressure(bloodPressure)
                        ? "Blood pressure is normal."
                        : "Warning: Blood pressure is outside the normal range!"}
                    </p>
                  </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-4 hover:bg-blue-700 hover:text-white transition duration-300">
                  <div className="flex gap-4 items-center">
                    <GiWaterDrop className="text-yellow-500" />
                    <p
                      className={`font-bold text-yellow-500 ${blinkingClass(
                        oxygenLevel,
                        "oxygenLevel"
                      )}`}
                    >
                      {oxygenLevel} %
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">Oxygen</p>
                    <p>
                      {isNormalOxygenLevel(oxygenLevel)
                        ? "Oxygen level is normal."
                        : "Warning: Oxygen level is outside the normal range!"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {appointment.doctor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p>{appointment.time}</p>
                      <p className="text-sm text-gray-500">
                        {appointment.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patient checkup result */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">
                  Files/Document
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Upload Result</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Upload Result</DialogTitle>
                      <AddFile />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.isArray(results) && results.length > 0 ? (
                  results.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{result.result_name}</p>
                          <p className="text-sm text-gray-500">
                            Uploaded at:{" "}
                            {result.created_at && result.created_at.Time
                              ? new Date(
                                  result.created_at.Time
                                ).toLocaleDateString()
                              : "Date not available"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <a
                          href={result.result_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-500 hover:underline"
                        >
                          <FaDownload className="mr-1" /> Download
                        </a>
                        <p className="text-sm text-gray-500">
                          Result ID: {result.id}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No results available</div>
                )}
              </div>
            </CardContent>
          </Card>
          {/* Blood Pressure */}
          <Card>
            <CardHeader>
              <CardTitle>Blood Pressure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                {/* Placeholder for blood pressure chart */}
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  Blood Pressure Chart
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Your Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                {/* Placeholder for activity chart */}
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  Activity Chart
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Heart Rate */}
          <Card className="col-span-full md:col-span-1">
            <CardHeader>
              <CardTitle>Heart Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] bg-blue-400 text-white rounded-lg">
                <div className="text-center">
                  <p className="text-6xl font-bold">102</p>
                  <p className="text-2xl">bpm</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export { PatientDashboard };
