import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Building, FileText, BarChart3, CheckCircle, XCircle, Eye, Shield, Calendar, GraduationCap, Award } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { ChatBot } from './ChatBot';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { User as UserType } from '../utils/userManager';

interface AdminPanelProps {
  user: UserType | null;
  onLogout: () => void;
}

export function AdminPanel({ user, onLogout }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarItems = [
    {
      icon: BarChart3,
      label: 'Dashboard',
      isActive: activeSection === 'dashboard',
      onClick: () => setActiveSection('dashboard')
    },
    {
      icon: Users,
      label: 'Student Management',
      isActive: activeSection === 'students',
      onClick: () => setActiveSection('students')
    },
    {
      icon: FileText,
      label: 'Placement Applications',
      isActive: activeSection === 'applications',
      onClick: () => setActiveSection('applications')
    },
    {
      icon: Building,
      label: 'Company Relations',
      isActive: activeSection === 'companies',
      onClick: () => setActiveSection('companies')
    },
    {
      icon: Calendar,
      label: 'Placement Drives',
      isActive: activeSection === 'drives',
      onClick: () => setActiveSection('drives')
    },
    {
      icon: Award,
      label: 'Reports & Analytics',
      isActive: activeSection === 'reports',
      onClick: () => setActiveSection('reports')
    }
  ];

  const mockStudents = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.j@college.edu",
      rollNumber: "CS2021001",
      major: "Computer Science",
      year: "Final Year",
      cgpa: "8.5",
      status: "Placement Ready",
      placementStatus: "Applied",
      appliedCompanies: 5
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.s@college.edu",
      rollNumber: "CS2021002",
      major: "Information Technology",
      year: "Final Year",
      cgpa: "9.1",
      status: "Placed",
      placementStatus: "Selected",
      appliedCompanies: 3
    },
    {
      id: 3,
      name: "Carol Williams",
      email: "carol.w@college.edu",
      rollNumber: "EC2021003",
      major: "Electronics",
      year: "Pre-Final Year",
      cgpa: "7.8",
      status: "Not Eligible",
      placementStatus: "Not Applied",
      appliedCompanies: 0
    }
  ];

  const mockCompanies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      email: "hr@techcorp.com",
      industry: "Technology",
      package: "8-12 LPA",
      status: "Active Partner",
      lastVisit: "2024-01-10",
      studentsHired: 12,
      upcomingDrive: "2024-02-15"
    },
    {
      id: 2,
      name: "StartupXYZ",
      email: "careers@startupxyz.com",
      industry: "FinTech",
      package: "6-10 LPA",
      status: "Scheduled",
      lastVisit: "2023-12-05",
      studentsHired: 0,
      upcomingDrive: "2024-02-20"
    },
    {
      id: 3,
      name: "Global Consulting",
      email: "recruitment@globalconsult.com",
      industry: "Consulting",
      package: "10-15 LPA",
      status: "Completed",
      lastVisit: "2024-01-08",
      studentsHired: 8,
      upcomingDrive: null
    }
  ];

  const mockApplications = [
    {
      id: 1,
      studentName: "Alice Johnson",
      rollNumber: "CS2021001",
      company: "TechCorp Solutions",
      position: "Software Engineer",
      package: "12 LPA",
      applicationDate: "2024-01-14",
      status: "Shortlisted",
      round: "Technical Interview"
    },
    {
      id: 2,
      studentName: "Bob Smith",
      rollNumber: "CS2021002",
      company: "Global Consulting",
      position: "Business Analyst",
      package: "10 LPA",
      applicationDate: "2024-01-12",
      status: "Selected",
      round: "Final Offer"
    },
    {
      id: 3,
      studentName: "Carol Williams",
      rollNumber: "EC2021003",
      company: "StartupXYZ",
      position: "Product Intern",
      package: "6 LPA",
      applicationDate: "2024-01-10",
      status: "Rejected",
      round: "HR Interview"
    }
  ];

  const mockDrives = [
    {
      id: 1,
      company: "TechCorp Solutions",
      date: "2024-02-15",
      time: "10:00 AM",
      venue: "Main Auditorium",
      positions: ["Software Engineer", "Frontend Developer"],
      eligibleStudents: 45,
      registeredStudents: 38,
      status: "Scheduled"
    },
    {
      id: 2,
      company: "StartupXYZ",
      date: "2024-02-20",
      time: "2:00 PM",
      venue: "Conference Hall",
      positions: ["Product Intern", "Marketing Intern"],
      eligibleStudents: 32,
      registeredStudents: 25,
      status: "Open for Registration"
    },
    {
      id: 3,
      company: "Global Consulting",
      date: "2024-01-08",
      time: "9:00 AM",
      venue: "Main Auditorium",
      positions: ["Business Analyst"],
      eligibleStudents: 28,
      registeredStudents: 28,
      status: "Completed"
    }
  ];

  const handleApproveStudent = (studentId: number) => {
    alert(`Approved student ${studentId}`);
  };

  const handleApproveCompany = (companyId: number) => {
    alert(`Approved company ${companyId}`);
  };

  const handleApproveInternship = (internshipId: number) => {
    alert(`Approved internship ${internshipId}`);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">College Placement Dashboard</h1>
              <p className="text-gray-600">Welcome to the central hub for managing college placements and student opportunities</p>
            </motion.div>
            
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: GraduationCap, title: 'Final Year Students', value: '247', sub: 'Eligible for placement', color: 'text-blue-600', delay: 0 },
                { icon: Award, title: 'Students Placed', value: '128', sub: 'Placement rate: 52%', color: 'text-green-600', delay: 0.1 },
                { icon: Building, title: 'Partner Companies', value: '45', sub: 'Active partnerships', color: 'text-purple-600', delay: 0.2 },
                { icon: Calendar, title: 'Upcoming Drives', value: '8', sub: 'This month', color: 'text-orange-600', delay: 0.3 }
              ].map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: metric.delay }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <metric.icon className="h-4 w-4" />
                        {metric.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className={`text-2xl font-bold ${metric.color}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: metric.delay + 0.2 }}
                      >
                        {metric.value}
                      </motion.div>
                      <p className="text-xs text-gray-600">{metric.sub}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Placements</CardTitle>
                    <CardDescription>Latest student placement updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Bob Smith", company: "Global Consulting", package: "10 LPA", time: "2 hours ago", status: "Selected" },
                      { name: "Alice Johnson", company: "TechCorp Solutions", package: "12 LPA", time: "4 hours ago", status: "Shortlisted" },
                      { name: "David Wilson", company: "StartupXYZ", package: "8 LPA", time: "6 hours ago", status: "Interview" },
                      { name: "Emma Davis", company: "Design Labs", package: "9 LPA", time: "1 day ago", status: "Applied" }
                    ].map((placement, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{placement.name}</p>
                          <p className="text-sm text-gray-600">{placement.company} - {placement.package}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={placement.status === 'Selected' ? 'default' : 'secondary'}>
                            {placement.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{placement.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Drives</CardTitle>
                    <CardDescription>Scheduled placement drives requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium">TechCorp Solutions</p>
                        <p className="text-sm text-gray-600">Feb 15, 2024 - 38 registered</p>
                      </div>
                      <Button size="sm" onClick={() => setActiveSection('drives')}>
                        Manage
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium">StartupXYZ</p>
                        <p className="text-sm text-gray-600">Feb 20, 2024 - Registration open</p>
                      </div>
                      <Button size="sm" onClick={() => setActiveSection('drives')}>
                        View Details
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                      <div>
                        <p className="font-medium">Student Eligibility</p>
                        <p className="text-sm text-gray-600">15 students need profile updates</p>
                      </div>
                      <Button size="sm" onClick={() => setActiveSection('students')}>
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'students':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Student Management</h1>
                <p className="text-gray-600">Manage student profiles and placement eligibility</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Users className="h-4 w-4 mr-2" />
                Export Student Data
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Details</TableHead>
                    <TableHead>Roll Number</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>CGPA</TableHead>
                    <TableHead>Placement Status</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.major}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${parseFloat(student.cgpa) >= 8.0 ? 'text-green-600' : parseFloat(student.cgpa) >= 7.0 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {student.cgpa}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          student.placementStatus === 'Selected' ? 'default' : 
                          student.placementStatus === 'Applied' ? 'secondary' : 'outline'
                        }>
                          {student.placementStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.appliedCompanies}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </Card>
            </motion.div>
          </motion.div>
        );

      case 'companies':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Relations</h1>
                <p className="text-gray-600">Manage recruitment partners and company relationships</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Building className="h-4 w-4 mr-2" />
                Add New Company
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Package Range</TableHead>
                    <TableHead>Students Hired</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-sm text-gray-600">{company.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>{company.package}</TableCell>
                      <TableCell>{company.studentsHired}</TableCell>
                      <TableCell>{company.lastVisit}</TableCell>
                      <TableCell>
                        <Badge variant={
                          company.status === 'Active Partner' ? 'default' : 
                          company.status === 'Scheduled' ? 'secondary' : 'outline'
                        }>
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </Card>
            </motion.div>
          </motion.div>
        );

      case 'applications':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Placement Applications</h1>
              <p className="text-gray-600">Monitor student applications and placement progress</p>
            </motion.div>
            
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Applications</TabsTrigger>
                <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                <TabsTrigger value="selected">Selected</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Package</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Current Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockApplications.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{application.studentName}</p>
                              <p className="text-sm text-gray-600">{application.rollNumber}</p>
                            </div>
                          </TableCell>
                          <TableCell>{application.company}</TableCell>
                          <TableCell>{application.position}</TableCell>
                          <TableCell>{application.package}</TableCell>
                          <TableCell>{application.applicationDate}</TableCell>
                          <TableCell>
                            <div>
                              <Badge variant={
                                application.status === 'Selected' ? 'default' : 
                                application.status === 'Shortlisted' ? 'secondary' : 'outline'
                              }>
                                {application.status}
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">{application.round}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                Track
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>
              
              <TabsContent value="shortlisted">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Shortlisted applications will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="selected">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Successfully placed students will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="rejected">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-600">Rejected applications will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        );

      case 'drives':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex justify-between items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Placement Drives</h1>
                <p className="text-gray-600">Schedule and manage company placement drives</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New Drive
              </Button>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-6">
              {mockDrives.map((drive, index) => (
                <motion.div
                  key={drive.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Card>
                    <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{drive.company}</h3>
                          <Badge variant={
                            drive.status === 'Completed' ? 'outline' : 
                            drive.status === 'Scheduled' ? 'default' : 'secondary'
                          }>
                            {drive.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <span className="text-gray-600">Date & Time:</span>
                            <p className="font-medium">{drive.date} at {drive.time}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Venue:</span>
                            <p className="font-medium">{drive.venue}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Positions:</span>
                            <p className="font-medium">{drive.positions.join(', ')}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Registration:</span>
                            <p className="font-medium">{drive.registeredStudents}/{drive.eligibleStudents}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Students
                        </Button>
                        {drive.status !== 'Completed' && (
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'reports':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
              <p className="text-gray-600">Comprehensive placement statistics and insights</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Placement Statistics
                    </CardTitle>
                  </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overall Rate:</span>
                      <span className="font-medium">36%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CS Department:</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">IT Department:</span>
                      <span className="font-medium">38%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">EC Department:</span>
                      <span className="font-medium">28%</span>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Package Analysis
                    </CardTitle>
                  </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Highest:</span>
                      <span className="font-medium">15 LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average:</span>
                      <span className="font-medium">8.5 LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Median:</span>
                      <span className="font-medium">7.5 LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lowest:</span>
                      <span className="font-medium">4.5 LPA</span>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Top Recruiters
                    </CardTitle>
                  </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">TechCorp:</span>
                      <span className="font-medium">12 hires</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Global Consulting:</span>
                      <span className="font-medium">8 hires</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">StartupXYZ:</span>
                      <span className="font-medium">6 hires</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Design Labs:</span>
                      <span className="font-medium">4 hires</span>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                  <CardDescription>Download detailed placement reports for administration</CardDescription>
                </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Student Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Building className="h-4 w-4 mr-2" />
                    Company Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Award className="h-4 w-4 mr-2" />
                    Placement Report
                  </Button>
                </div>
              </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar
        title="College Placement Office"
        items={sidebarItems}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderMainContent()}
        </div>
      </main>
      <ChatBot userRole="admin" userName={user?.name || 'Admin'} />
    </div>
  );
}