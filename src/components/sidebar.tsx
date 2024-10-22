import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Users, Calendar } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path:any) => (pathname === path ? "bg-white text-blue-600" : "");

  const navigate = (path:any) => {
    router.push(path);
  };

  return (
    <aside className="w-full md:w-64 bg-blue-600 text-white p-4 rounded-tr-lg rounded-br-lg">

      <div className="text-2xl font-bold mb-8 hidden md:block">FITKEEP</div>
      <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-10">
        <div
          className={`flex md:w-full justify-start p-2 rounded cursor-pointer`}
          onClick={() => navigate("")}
        >
          <Users className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Dashboard</span>
        </div>
        <div
          className={`flex md:w-full justify-start p-2 rounded cursor-pointer ${isActive("/schedule")}`}
          onClick={() => navigate("/schedule")}
        >
          <Calendar className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Schedule</span>
        </div>
        <div
          className={`flex md:w-full justify-start p-2 rounded cursor-pointer ${isActive("/")}`}
          onClick={() => navigate("/")}
        >
          <Users className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Patients</span>
        </div>
        <div
          className={`flex md:w-full justify-start p-2 rounded cursor-pointer ${isActive("/devices")}`}
          onClick={() => navigate("/devices")}
        >
          <Users className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Wearable Devices</span>
        </div>
        <div
          className={`flex md:w-full justify-start p-2 rounded cursor-pointer ${isActive("/messages")}`}
          onClick={() => navigate("/messages")}
        >
          <Users className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Messages</span>
        </div>
      </nav>
    </aside>
  );
};

export { Sidebar };
