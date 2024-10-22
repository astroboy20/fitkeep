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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PatientRegistration } from "@/components/patient-reg";
import { Appointment } from "../lib/typing";
import { appointments } from "@/lib/data";

const DoctorsDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 7;

  const totalPages = Math.ceil(appointments.length / itemPerPage);

  const currentAppointments = appointments.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold mb-4 md:mb-0">My Patients</h1>
          <div className="flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Search patients"
              className="w-full md:w-64"
            />
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="Dr. Lee"
              />
              <AvatarFallback>DL</AvatarFallback>
            </Avatar>
          </div>
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
            <h2 className="text-xl font-semibold mb-2 md:mb-0">
              Patients List
            </h2>
            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Patient</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Patient</DialogTitle>
                    {/* <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription> */}
                  </DialogHeader>
                  <PatientRegistration />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="overflow-x-auto w-full p-4">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Fullname</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Ref.</TableHead>
                  <TableHead>Device Id</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAppointments.map((appointment) => (
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
                    <TableCell>{appointment.patient.age}</TableCell>
                    <TableCell>{appointment.patient.gender}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {appointment.patient.contact}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {appointment.ref}
                    </TableCell>
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
              Showing {currentAppointments.length} items out of{" "}
              {appointments.length} results found
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { DoctorsDashboard };
