import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Users, FileText, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { ChatBot } from './ChatBot';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { User as UserType } from '../utils/userManager';

interface CompanyDashboardProps {
  user: UserType | null;
  onLogout: () => void;
}

export function CompanyDashboard({ user, onLogout }: CompanyDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [isPostingOpen, setIsPostingOpen] = useState(false);

  const sidebarItems = [
    {
      icon: FileText,
      label: 'Overview',
      isActive: activeSection === 'overview',
      onClick: () => setActiveSection('overview')
    },
    {
      icon: Plus,
      label: 'Post Internship',
      isActive: activeSection === 'post',
      onClick: () => setActiveSection('post')
    },
    {
      icon: Users,
      label: 'View Applicants',
      isActive: activeSection === 'applicants',
      onClick: () => setActiveSection('applicants')
    },
    {
      icon: FileText,
      label: 'Manage Listings',
      isActive: activeSection === 'listings',
      onClick: () => setActiveSection('listings')
    }
  ];

  const mockApplicants = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      university: "MIT",
      major: "Computer Science",
      gpa: "3.8",
      position: "Frontend Developer Intern",
      appliedDate: "2024-01-15",
      status: "pending",
      resumeUrl: "#"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      university: "Stanford",
      major: "Data Science",
      gpa: "3.9",
      position: "Data Science Intern",
      appliedDate: "2024-01-14",
      status: "approved",
      resumeUrl: "#"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.d@email.com",
      university: "Berkeley",
      major: "Marketing",
      gpa: "3.7",
      position: "Marketing Intern",
      appliedDate: "2024-01-13",
      status: "rejected",
      resumeUrl: "#"
    }
  ];

  const mockListings = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      department: "Engineering",
      applicants: 15,
      status: "Active",
      postedDate: "2024-01-10",
      deadline: "2024-02-10"
    },
    {
      id: 2,
      title: "Data Science Intern",
      department: "Analytics",
      applicants: 23,
      status: "Active",
      postedDate: "2024-01-08",
      deadline: "2024-02-08"
    },
    {
      id: 3,
      title: "Marketing Intern",
      department: "Marketing",
      applicants: 8,
      status: "Draft",
      postedDate: "2024-01-12",
      deadline: "2024-02-12"
    }
  ];

  const handleApprove = (applicantId: number) => {
    alert(`Approved applicant ${applicantId}`);
  };

  const handleReject = (applicantId: number) => {
    alert(`Rejected applicant ${applicantId}`);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'overview':
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Company Overview</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your internship program.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Active Listings', value: '12', color: 'text-blue-600', sub: '+2 from last month', delay: 0 },
                { title: 'Total Applications', value: '156', color: 'text-green-600', sub: '+34 this week', delay: 0.1 },
                { title: 'Pending Reviews', value: '23', color: 'text-orange-600', sub: 'Needs attention', delay: 0.2 },
                { title: 'Hired Interns', value: '8', color: 'text-purple-600', sub: 'This season', delay: 0.3 }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <motion.div 
                        className={`text-2xl font-bold ${stat.color}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: stat.delay + 0.2 }}
                      >
                        {stat.value}
                      </motion.div>
                      <p className="text-xs text-gray-500">{stat.sub}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Latest candidates who applied</CardDescription>
                  </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockApplicants.slice(0, 3).map((applicant) => (
                      <div key={applicant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <p className="text-sm text-gray-600">{applicant.position}</p>
                        </div>
                        <Badge variant={applicant.status === 'pending' ? 'secondary' : 
                                      applicant.status === 'approved' ? 'default' : 'destructive'}>
                          {applicant.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => setActiveSection('applicants')}>
                    View All Applications
                  </Button>
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
                    <CardTitle>Active Internships</CardTitle>
                    <CardDescription>Currently posted positions</CardDescription>
                  </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockListings.filter(listing => listing.status === 'Active').map((listing) => (
                      <div key={listing.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{listing.title}</p>
                          <p className="text-sm text-gray-600">{listing.applicants} applications</p>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => setActiveSection('listings')}>
                    Manage All Listings
                  </Button>
                </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'post':
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Post New Internship</h1>
              <p className="text-gray-600">Create a new internship opportunity for students</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle>Internship Details</CardTitle>
                <CardDescription>Fill in the information about your internship position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" placeholder="e.g. Frontend Developer Intern" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="data">Data Science</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g. San Francisco, CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Work Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select work type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g. 3 months" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stipend">Stipend</Label>
                    <Input id="stipend" placeholder="e.g. $2000/month" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the role, responsibilities, and what the intern will learn..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the required skills, qualifications, and experience..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills (comma-separated)</Label>
                  <Input id="skills" placeholder="e.g. React, JavaScript, HTML, CSS" />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Post Internship
                  </Button>
                  <Button variant="outline">
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        );

      case 'applicants':
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Applicant Management</h1>
                <p className="text-gray-600">Review and manage internship applications</p>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Applications</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
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
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>GPA</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{applicant.name}</p>
                          <p className="text-sm text-gray-600">{applicant.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{applicant.position}</TableCell>
                      <TableCell>
                        <div>
                          <p>{applicant.university}</p>
                          <p className="text-sm text-gray-600">{applicant.major}</p>
                        </div>
                      </TableCell>
                      <TableCell>{applicant.gpa}</TableCell>
                      <TableCell>{applicant.appliedDate}</TableCell>
                      <TableCell>
                        <Badge variant={applicant.status === 'pending' ? 'secondary' : 
                                      applicant.status === 'approved' ? 'default' : 'destructive'}>
                          {applicant.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                          {applicant.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {applicant.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                          {applicant.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {applicant.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleApprove(applicant.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleReject(applicant.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
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

      case 'listings':
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Listings</h1>
                <p className="text-gray-600">View and manage your posted internships</p>
              </div>
              <Button onClick={() => setActiveSection('post')} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Post New Internship
              </Button>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-6">
              {mockListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
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
                          <h3 className="text-lg font-semibold">{listing.title}</h3>
                          <Badge variant={listing.status === 'Active' ? 'default' : 'secondary'}>
                            {listing.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{listing.department} Department</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Applications:</span>
                            <span className="font-medium ml-2">{listing.applicants}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Posted:</span>
                            <span className="font-medium ml-2">{listing.postedDate}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Deadline:</span>
                            <span className="font-medium ml-2">{listing.deadline}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          View Applications
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar
        title="Company Dashboard"
        items={sidebarItems}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderMainContent()}
        </div>
      </main>
      <ChatBot userRole="company" userName={user?.name || 'Company'} />
    </div>
  );
}