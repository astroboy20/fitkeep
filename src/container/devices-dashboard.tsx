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
import { DeviceRegistration } from "@/components/device-reg";

const DevicesDashboard = () => {
  const router = useRouter(); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 7;
  const [devices, setDevices] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true); 
      try {
        const response = await fetch("http://localhost:8080/available-devices");
        if (!response.ok) {
          throw new Error("Failed to fetch patients");
        }
        const data = await response.json();
        setDevices(data.data || []); 
      } catch (error) {
        console.error(error);
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchPatients();
  }, []); 

  const totalPages = Math.ceil(devices.length / itemPerPage);
  const currentDevice = devices.slice(
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
          <h1 className="text-2xl font-bold mb-4 md:mb-0">Registered devices</h1>
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
            <h2 className="text-xl font-semibold mb-2 md:mb-0">Available devices</h2>
            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Register Device</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Register Device</DialogTitle>
                    <DeviceRegistration />
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
                    <TableHead>Device name</TableHead>
                    <TableHead>Device type</TableHead>
                    <TableHead>Serial number</TableHead>
                    <TableHead>Country code</TableHead>
                    <TableHead>Assigned patient</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDevice.map((device) => (
                    <TableRow
                      key={device.id}
                     
                      className="cursor-pointer hover:bg-gray-100" 
                    >
                      <TableCell className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage
                            src={device.avatar || "/placeholder.svg"} 
                            alt={device.device_name}
                          />
                          <AvatarFallback>
                            {device.device_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{device.device_name}</span>
                      </TableCell>
                      <TableCell>{device.device_type}</TableCell>
                      <TableCell>{device.serial_number}</TableCell>
                      <TableCell>{device.country_code || "N/A"}</TableCell>
                      <TableCell>{device.assigned_patient_id || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <div className="p-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-2 md:mb-0">
              Showing {currentDevice.length} items out of {devices.length} results found
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

export { DevicesDashboard };
