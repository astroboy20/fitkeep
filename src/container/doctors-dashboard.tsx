"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PatientRegistration } from "@/components/patient-reg";
import { Doctor_Type } from "@/lib/typing";

const DoctorsDashboard = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 7;
  const [patients, setPatients] = useState<Doctor_Type[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/patients");
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setPatients(data.data || []);
      } catch (error:any) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const totalPages = Math.ceil(patients.length / itemPerPage);
  const currentPatients = patients.slice(
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
                    <PatientRegistration />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="overflow-x-auto w-full p-4">
            {loading ? (
              <div>Loading...</div> // Loading state
            ) : error ? (
              <div className="text-red-500">{error}</div> // Error state
            ) : (
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Fullname</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Device Id</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPatients.map((patient) => (
                    <TableRow
                      key={patient.id}
                      onClick={() => router.push(`/patient/${patient.id}`)} // Navigate to patient's detail page
                      className="cursor-pointer hover:bg-gray-100" // Add hover effect
                    >
                      <TableCell className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage
                            src={patient.avatar || "/placeholder.svg"} // Default avatar if unavailable
                            alt={patient.full_name}
                          />
                          <AvatarFallback>
                            {patient.full_name
                              .split(" ")
                              .map((n:string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{patient.full_name}</span>
                      </TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.gender}</TableCell>
                      <TableCell>{patient.contact_info}</TableCell>
                      <TableCell>
                        {patient.assigned_device_id || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="p-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-2 md:mb-0">
              Showing {currentPatients.length} items out of {patients.length}{" "}
              results found
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
