"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Clock, BarChart2, Settings, User, HelpCircle, LogOut } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Sidebar } from "@/components/sidebar";
import { useParams } from "next/navigation";

type Appointment = {
  id: string;
  doctor: string;
  specialty: string;
  time: string;
  location: string;
};

const appointments: Appointment[] = [
  { id: "1", doctor: "Dr. Dianne Fisher", specialty: "Dentist", time: "8:00 - 8:30 AM", location: "CityMed Clinic" },
  { id: "2", doctor: "Dr. Paul Collins", specialty: "Neurologist", time: "9:00 - 9:30 AM", location: "Huston Hospital" },
  { id: "3", doctor: "Dr. Betty Woods", specialty: "Digital X-Ray", time: "18:00 - 18:30 PM", location: "CityMed Clinic" },
];

const organHealth = [
  { name: "Heart", percentage: 76 },
  { name: "Lungs", percentage: 90 },
  { name: "Stomach", percentage: 85 },
  { name: "Liver", percentage: 45 },
];

const PatientDashboard =()=> {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
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

      fetchPatientData(id as string); 
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (!patient) {
    return <div>Patient not found.</div>; // Handle case when patient is not found
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <Input type="search" placeholder="Search" className="w-64" />
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Notifications</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Mike Johnson" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{patient.full_name}</p>
              <p className="text-sm text-gray-500">{patient.contact_info}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health diagnosis */}
          <Card>
            <CardHeader>
              <CardTitle>Health diagnosis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full h-auto text-blue-400"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                  </svg>
                </div>
                <div className="w-1/2 space-y-2">
                  {organHealth.map((organ) => (
                    <div key={organ.name} className="flex items-center justify-between">
                      <span>{organ.name}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-400 h-2.5 rounded-full"
                          style={{ width: `${organ.percentage}%` }}
                        ></div>
                      </div>
                      <span>{organ.percentage}%</span>
                    </div>
                  ))}
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
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{appointment.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p>{appointment.time}</p>
                      <p className="text-sm text-gray-500">{appointment.location}</p>
                    </div>
                  </div>
                ))}
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
}

export {PatientDashboard}