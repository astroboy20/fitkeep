"use client"
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronRight, MessageSquare, Users, Calendar, BookOpen, Settings, LogOut } from 'lucide-react'

type Appointment = {
  id: string
  consultant: { name: string; avatar: string }
  date: string
  type: string
  clinic: string
  ref: string
  status: 'Ongoing' | 'Due' | 'Postponed' | 'Completed'
}

const appointments: Appointment[] = [
  { id: '1', consultant: { name: 'Dr. Janet Hoffman', avatar: '/placeholder.svg?height=32&width=32' }, date: 'Feb 15, 8:30am', type: 'Telemedicine', clinic: 'Paragon Shopping city medical', ref: '92831ABF23', status: 'Ongoing' },
  { id: '2', consultant: { name: 'Dr. Marsha Bailey', avatar: '/placeholder.svg?height=32&width=32' }, date: 'Feb 15, 8:30am', type: 'In-House', clinic: 'Paragon Shopping city medical', ref: '92831ABF23', status: 'Due' },
  { id: '3', consultant: { name: 'Dr. Eva Zimmerman', avatar: '/placeholder.svg?height=32&width=32' }, date: 'Feb 15, 8:30am', type: 'Chamber', clinic: 'Paragon Shopping city medical', ref: '92831ABF23', status: 'Postponed' },
  { id: '4', consultant: { name: 'Dr. Seth Swanson', avatar: '/placeholder.svg?height=32&width=32' }, date: 'Feb 15, 8:30am', type: 'Medical', clinic: 'Paragon Shopping city medical', ref: '92831ABF23', status: 'Completed' },
  { id: '5', consultant: { name: 'Dr. Betty Schroeder', avatar: '/placeholder.svg?height=32&width=32' }, date: 'Feb 15, 8:30am', type: 'Emergency', clinic: 'Paragon Shopping city medical', ref: '92831ABF23', status: 'Ongoing' },
  { id: '6', consultant: { name: 'Dr. Bobbie Snyder', avatar: '/placeholder.svg?height=32&width=32' }, date: 'Feb 15, 8:30am', type: 'Emergency', clinic: 'Paragon Shopping city medical', ref: '92831ABF23', status: 'Completed' },
  { id: '7', consultant: { name: 'Dr. Thelma Andrews', avatar: '/placeholder.svg?height=32&width=32' }, date: 'Feb 15, 8:30am', type: 'Emergency', clinic: 'Paragon Shopping city medical', ref: '92831ABF23', status: 'Postponed' },
]

export default function AppointmentsDashboard() {
  const [currentTab, setCurrentTab] = useState('Current')

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-16 md:w-64 bg-blue-600 text-white p-4">
        <div className="text-2xl font-bold mb-8 hidden md:block">D</div>
        <nav className="space-y-4">
          <Button variant="ghost" className="w-full justify-start">
            <Users className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">All</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MessageSquare className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Previous Patients</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Rescheduled</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start bg-blue-700">
            <BookOpen className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Upcoming</span>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="h-5 w-5 mr-2" />
            <span className="hidden md:inline">Booked</span>
          </Button>
        </nav>
        <Button variant="ghost" className="w-full justify-start mt-auto">
          <LogOut className="h-5 w-5 mr-2" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search" className="w-64" />
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>JK</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {['Current', 'History', 'Lab Reports', 'Medical Reports'].map((tab) => (
            <Button
              key={tab}
              variant={currentTab === tab ? 'default' : 'ghost'}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Doctor info */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Dr. Lee" />
              <AvatarFallback>DL</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">Dr. Lee</h2>
              <p className="text-gray-500">General Practice</p>
              <p className="text-sm text-gray-400">M.B.B.S, D.O, M.M.E.D, M.Sc, D.MSc</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">CURRENT WORKPLACE</h3>
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
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">All Appointments</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="border rounded p-1">
                <option>Upcoming</option>
              </select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>CONSULTANT</TableHead>
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
                      <AvatarImage src={appointment.consultant.avatar} alt={appointment.consultant.name} />
                      <AvatarFallback>{appointment.consultant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span>{appointment.consultant.name}</span>
                  </TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.type}</TableCell>
                  <TableCell>{appointment.clinic}</TableCell>
                  <TableCell>{appointment.ref}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${appointment.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                        appointment.status === 'Due' ? 'bg-red-100 text-red-800' :
                        appointment.status === 'Postponed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                      {appointment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-4 flex justify-between items-center">
            <p className="text-sm text-gray-500">Showing 7 items out of 150 results found</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <Button key={page} variant={page === 3 ? 'default' : 'outline'} size="sm">
                  {page}
                </Button>
              ))}
              <Button variant="outline" size="sm">...</Button>
              <Button variant="outline" size="sm">60</Button>
              <Button variant="outline" size="sm"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}