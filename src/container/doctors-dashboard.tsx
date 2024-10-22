"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChevronRight,
  MessageSquare,
  Users,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar";

type Appointment = {
  id: string;
  patient: { name: string; avatar: string };
  date: string;
  type: string;
  clinic: string;
  ref: string;
  status: "Ongoing" | "Due" | "Postponed" | "Completed";
};

const appointments: Appointment[] = [
  {
    id: "1",
    patient: {
      name: "Janet Hoffman",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "Feb 15, 8:30am",
    type: "Telemedicine",
    clinic: "Paragon Shopping city medical",
    ref: "92831ABF23",
    status: "Ongoing",
  },
  {
    id: "2",
    patient: {
      name: "Marsha Bailey",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "Feb 15, 8:30am",
    type: "In-House",
    clinic: "Paragon Shopping city medical",
    ref: "92831ABF23",
    status: "Due",
  },
  {
    id: "3",
    patient: {
      name: "Eva Zimmerman",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "Feb 15, 8:30am",
    type: "Chamber",
    clinic: "Paragon Shopping city medical",
    ref: "92831ABF23",
    status: "Postponed",
  },
  {
    id: "4",
    patient: {
      name: "Seth Swanson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "Feb 15, 8:30am",
    type: "Medical",
    clinic: "Paragon Shopping city medical",
    ref: "92831ABF23",
    status: "Completed",
  },
  {
    id: "5",
    patient: {
      name: "Betty Schroeder",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "Feb 15, 8:30am",
    type: "Emergency",
    clinic: "Paragon Shopping city medical",
    ref: "92831ABF23",
    status: "Ongoing",
  },
  {
    id: "6",
    patient: {
      name: "Bobbie Snyder",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "Feb 15, 8:30am",
    type: "Emergency",
    clinic: "Paragon Shopping city medical",
    ref: "92831ABF23",
    status: "Completed",
  },
  {
    id: "7",
    patient: {
      name: "Thelma Andrews",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    date: "Feb 15, 8:30am",
    type: "Emergency",
    clinic: "Paragon Shopping city medical",
    ref: "92831ABF23",
    status: "Postponed",
  },
];

const DoctorsDashboard=() =>{
  const [currentTab, setCurrentTab] = useState("Current");

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
    <Sidebar/>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">My Appointments</h1>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search patients" className="w-full md:w-64" />
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Dr. Lee"
              />
              <AvatarFallback>DL</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Current", "Upcoming", "Past", "Cancelled"].map(
            (tab) => (
              <Button
                key={tab}
                variant={currentTab === tab ? "default" : "outline"}
                onClick={() => setCurrentTab(tab)}
                className="flex-1 md:flex-none"
              >
                {tab}
              </Button>
            )
          )}
        </div>

        {/* Doctor info */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
            <Avatar className="h-16 w-16 mb-4 md:mb-0">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt="Dr. Lee"
              />
              <AvatarFallback>DL</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">Dr. Lee</h2>
              <p className="text-gray-500">General Practice</p>
              <p className="text-sm text-gray-400">
                M.B.B.S, D.O, M.M.E.D, M.Sc, D.MSc
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                CURRENT WORKPLACE
              </h3>
              <p>Administrator</p>
              <p>Rails Clinic</p>
              <p>Family Clinic & Surgery</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ADDRESS</h3>
              <p>Paragon Shopping city m...</p>
              <p>Singapore</p>
            </div>
          </div>
        </div>

        {/* Appointments table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-xl font-semibold mb-2 md:mb-0">Today's Appointments</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="border rounded p-1">
                <option>Time</option>
                <option>Patient Name</option>
                <option>Type</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PATIENT</TableHead>
                  <TableHead>DATE</TableHead>
                  <TableHead>TYPE</TableHead>
                  <TableHead>CLINIC</TableHead>
                  <TableHead>REF.</TableHead>
                  <TableHead>STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage
                          src={appointment.patient.avatar}
                          alt={appointment.patient.name}
                        />
                        <AvatarFallback>
                          {appointment.patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{appointment.patient.name}</span>
                    </TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell className="hidden md:table-cell">{appointment.clinic}</TableCell>
                    <TableCell className="hidden md:table-cell">{appointment.ref}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          appointment.status === "Ongoing"
                            ? "bg-blue-100 text-blue-800"
                            : appointment.status === "Due"
                            ? "bg-red-100 text-red-800"
                            : appointment.status === "Postponed"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-2 md:mb-0">
              Showing 7 items out of 150 results found
            </p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 3 ? "default" : "outline"}
                  size="sm"
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" size="sm">
                ...
              </Button>
              <Button variant="outline" size="sm">
                60
              </Button>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export {DoctorsDashboard}