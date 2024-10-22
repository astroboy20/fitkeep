import React from "react";
import { Button } from "./ui/button";
import {
  Users,
  MessageSquare,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link"

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-blue-600 text-white p-4 ">
      <div className="text-2xl font-bold mb-8 hidden md:block">FITKEEP</div>
      <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-4">
        <Link href={"/"} className="flex md:w-full justify-start">
          <Calendar className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Doctor</span>
        </Link>
        <Link href={"/patient"} className="flex md:w-full justify-start">
          <Users className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Patient</span>
        </Link>
        <Link href={"/devices"} className="flex md:w-full justify-start">
          <Users className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Weareable devices</span>
        </Link>
      </nav>
      {/* <Button
        variant="ghost"
        className="w-full justify-start mt-auto hidden md:flex"
      >
        <LogOut className="h-5 w-5 mr-2" />
        <span className="hidden md:inline">Logout</span>
      </Button> */}
    </aside>
  );
};

export { Sidebar };
