import React from "react";
import { usePathname } from "next/navigation";
import { Users, Calendar } from "lucide-react";
import Link from "next/link";
import { MdDashboard, MdDeviceHub, MdMessage } from "react-icons/md";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "bg-white text-blue-600" : "";

  return (
    <aside className="w-full md:w-64 bg-blue-600 text-white p-4 rounded-br-lg rounded-bl-lg lg:rounded-tr-lg lg:rounded-br-lg">
      <div className="text-2xl font-bold mb-8 hidden md:block">FITKEEP</div>
      <nav className="flex justify-between md:flex-col space-x-2 md:space-x-0 md:space-y-10">
        <Link href="/" className={`flex md:w-full justify-start p-2 rounded cursor-pointer ${isActive("")}`}>
          <MdDashboard  className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Dashboard</span>
        </Link>

        <Link href="/schedule" className={`flex md:w-full justify-start p-2 rounded cursor-pointer ${isActive("/schedule")}`}>
          <Calendar className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Schedule</span>
        </Link>

        <Link href="/" className={`flex md:w-full justify-start p-2 rounded cursor-pointer ${isActive("/")}`}>
          <Users className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Patients</span>
        </Link>

        <Link href="/devices" className={`flex md:w-full justify-start p-2 rounded cursor-pointer ${isActive("/devices")}`}>
          <MdDeviceHub  className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Wearable Devices</span>
        </Link>

        <Link href="/messages" className={`flex md:w-full justify-start p-2 rounded cursor-pointer ${isActive("/messages")}`}>
          <MdMessage  className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Messages</span>
        </Link>
      </nav>
    </aside>
  );
};

export { Sidebar };
