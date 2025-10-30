import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Search, FileText, Bell, Filter, Upload, Eye, X, MapPin, Clock, DollarSign, Building, Calendar, Briefcase, CheckCircle2 } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { InternshipCard } from './InternshipCard';
import { ChatBot } from './ChatBot';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { User as UserType } from '../utils/userManager';
import { toast } from 'sonner@2.0.3';

interface StudentDashboardProps {
  user: UserType | null;
  onLogout: () => void;
}

interface FilterState {
  location: string[];
  duration: string[];
  stipendRange: [number, number];
  skills: string[];
  companySize: string[];
  postedWithin: string;
}

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeSection, setActiveSection] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [uploadedResume, setUploadedResume] = useState<string | null>(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [filters, setFilters] = useState<FilterState>({
    location: [],
    duration: [],
    stipendRange: [0, 5000],
    skills: [],
    companySize: [],
    postedWithin: 'all'
  });

  const handleUpdateProfile = async () => {
    setIsUpdatingProfile(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsUpdatingProfile(false);
    toast.success('Profile updated successfully!', {
      description: 'Your changes have been saved.',
    });
  };

  const sidebarItems = [
    {
      icon: User,
      label: 'Profile',
      isActive: activeSection === 'profile',
      onClick: () => setActiveSection('profile')
    },
    {
      icon: Search,
      label: 'Browse Internships',
      isActive: activeSection === 'browse',
      onClick: () => setActiveSection('browse')
    },
    {
      icon: FileText,
      label: 'My Applications',
      isActive: activeSection === 'applications',
      onClick: () => setActiveSection('applications')
    },
    {
      icon: Bell,
      label: 'Notifications',
      isActive: activeSection === 'notifications',
      onClick: () => setActiveSection('notifications')
    }
  ];

  const mockInternships = [
    {
      title: "Frontend Developer Intern",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      stipend: "$2,000/month",
      stipendAmount: 2000,
      duration: "3 months",
      durationMonths: 3,
      description: "Work on cutting-edge web applications using React, TypeScript, and modern development tools. You'll be part of a dynamic team building user interfaces for enterprise clients.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Git", "REST APIs"],
      type: "onsite" as const,
      companySize: "large",
      postedDate: "2 days ago",
      postedDaysAgo: 2
    },
    {
      title: "Data Science Intern",
      company: "Analytics Pro",
      location: "Remote",
      stipend: "$1,800/month",
      stipendAmount: 1800,
      duration: "4 months",
      durationMonths: 4,
      description: "Dive into machine learning and data analysis projects. Work with large datasets and help build predictive models for business intelligence.",
      skills: ["Python", "Machine Learning", "SQL", "Pandas", "Tableau"],
      type: "remote" as const,
      companySize: "medium",
      postedDate: "1 week ago",
      postedDaysAgo: 7
    },
    {
      title: "Marketing Intern",
      company: "Brand Builders",
      location: "New York, NY",
      stipend: "$1,500/month",
      stipendAmount: 1500,
      duration: "6 months",
      durationMonths: 6,
      description: "Support digital marketing campaigns and content creation. Learn about social media strategy, content marketing, and brand development.",
      skills: ["Social Media", "Content Creation", "Analytics", "Photoshop"],
      type: "hybrid" as const,
      companySize: "medium",
      postedDate: "3 days ago",
      postedDaysAgo: 3
    },
    {
      title: "Backend Developer Intern",
      company: "ServerWorks",
      location: "Austin, TX",
      stipend: "$2,200/month",
      stipendAmount: 2200,
      duration: "4 months",
      durationMonths: 4,
      description: "Build robust server-side applications and APIs. Work with cloud technologies and distributed systems to support millions of users.",
      skills: ["Node.js", "Python", "Docker", "AWS", "MongoDB"],
      type: "onsite" as const,
      companySize: "large",
      postedDate: "1 day ago",
      postedDaysAgo: 1
    },
    {
      title: "UX Design Intern",
      company: "DesignHub",
      location: "Remote",
      stipend: "$1,600/month",
      stipendAmount: 1600,
      duration: "3 months",
      durationMonths: 3,
      description: "Create intuitive user experiences for mobile and web applications. Conduct user research and design prototypes.",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Wireframing"],
      type: "remote" as const,
      companySize: "small",
      postedDate: "5 days ago",
      postedDaysAgo: 5
    },
    {
      title: "DevOps Intern",
      company: "CloudTech",
      location: "Seattle, WA",
      stipend: "$2,400/month",
      stipendAmount: 2400,
      duration: "6 months",
      durationMonths: 6,
      description: "Automate deployment pipelines and manage cloud infrastructure. Learn about containerization and CI/CD best practices.",
      skills: ["Docker", "Kubernetes", "Jenkins", "AWS", "Terraform"],
      type: "hybrid" as const,
      companySize: "large",
      postedDate: "4 days ago",
      postedDaysAgo: 4
    },
    {
      title: "Mobile App Developer Intern",
      company: "AppStudio",
      location: "Los Angeles, CA",
      stipend: "$1,900/month",
      stipendAmount: 1900,
      duration: "5 months",
      durationMonths: 5,
      description: "Develop native mobile applications for iOS and Android. Work on user-facing features and app optimization.",
      skills: ["React Native", "Swift", "Kotlin", "Firebase", "REST APIs"],
      type: "hybrid" as const,
      companySize: "medium",
      postedDate: "6 days ago",
      postedDaysAgo: 6
    },
    {
      title: "Cybersecurity Intern",
      company: "SecureNet",
      location: "Washington, DC",
      stipend: "$2,100/month",
      stipendAmount: 2100,
      duration: "4 months",
      durationMonths: 4,
      description: "Assist in threat analysis and security audits. Learn about network security and vulnerability assessment.",
      skills: ["Network Security", "Penetration Testing", "Python", "Linux", "SIEM"],
      type: "onsite" as const,
      companySize: "large",
      postedDate: "1 week ago",
      postedDaysAgo: 7
    }
  ];

  // Filter options
  const filterOptions = {
    location: [
      { label: 'Remote', value: 'remote' },
      { label: 'On-site', value: 'onsite' },
      { label: 'Hybrid', value: 'hybrid' }
    ],
    duration: [
      { label: '1-3 months', value: '1-3' },
      { label: '4-6 months', value: '4-6' },
      { label: '6+ months', value: '6+' }
    ],
    companySize: [
      { label: 'Startup (1-50)', value: 'small' },
      { label: 'Medium (51-500)', value: 'medium' },
      { label: 'Large (500+)', value: 'large' }
    ],
    postedWithin: [
      { label: 'All time', value: 'all' },
      { label: 'Last 24 hours', value: '1' },
      { label: 'Last 3 days', value: '3' },
      { label: 'Last week', value: '7' },
      { label: 'Last month', value: '30' }
    ]
  };

  // Get all unique skills for filter options
  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    mockInternships.forEach(internship => {
      internship.skills.forEach(skill => skillSet.add(skill));
    });
    return Array.from(skillSet).sort();
  }, []);

  // Filter internships based on current filters and search query
  const filteredInternships = useMemo(() => {
    return mockInternships.filter(internship => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          internship.title.toLowerCase().includes(query) ||
          internship.company.toLowerCase().includes(query) ||
          internship.location.toLowerCase().includes(query) ||
          internship.skills.some(skill => skill.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters.location.length > 0 && !filters.location.includes(internship.type)) {
        return false;
      }

      // Duration filter
      if (filters.duration.length > 0) {
        const matchesDuration = filters.duration.some(range => {
          if (range === '1-3') return internship.durationMonths <= 3;
          if (range === '4-6') return internship.durationMonths >= 4 && internship.durationMonths <= 6;
          if (range === '6+') return internship.durationMonths > 6;
          return false;
        });
        if (!matchesDuration) return false;
      }

      // Stipend range filter
      if (internship.stipendAmount < filters.stipendRange[0] || internship.stipendAmount > filters.stipendRange[1]) {
        return false;
      }

      // Skills filter
      if (filters.skills.length > 0) {
        const hasRequiredSkill = filters.skills.some(skill => internship.skills.includes(skill));
        if (!hasRequiredSkill) return false;
      }

      // Company size filter
      if (filters.companySize.length > 0 && !filters.companySize.includes(internship.companySize)) {
        return false;
      }

      // Posted within filter
      if (filters.postedWithin !== 'all') {
        const daysLimit = parseInt(filters.postedWithin);
        if (internship.postedDaysAgo > daysLimit) return false;
      }

      return true;
    });
  }, [mockInternships, searchQuery, filters]);

  // Helper functions for filter management
  const updateLocationFilter = (location: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      location: checked 
        ? [...prev.location, location]
        : prev.location.filter(l => l !== location)
    }));
  };

  const updateDurationFilter = (duration: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      duration: checked 
        ? [...prev.duration, duration]
        : prev.duration.filter(d => d !== duration)
    }));
  };

  const updateSkillsFilter = (skill: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      skills: checked 
        ? [...prev.skills, skill]
        : prev.skills.filter(s => s !== skill)
    }));
  };

  const updateCompanySizeFilter = (size: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      companySize: checked 
        ? [...prev.companySize, size]
        : prev.companySize.filter(s => s !== size)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      location: [],
      duration: [],
      stipendRange: [0, 5000],
      skills: [],
      companySize: [],
      postedWithin: 'all'
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    return filters.location.length + 
           filters.duration.length + 
           filters.skills.length + 
           filters.companySize.length + 
           (filters.postedWithin !== 'all' ? 1 : 0) +
           (filters.stipendRange[0] > 0 || filters.stipendRange[1] < 5000 ? 1 : 0);
  };

  const mockApplications = [
    {
      title: "Backend Developer Intern",
      company: "StartupXYZ",
      appliedDate: "2024-01-15",
      status: "Under Review",
      statusColor: "bg-yellow-100 text-yellow-800",
      location: "San Francisco, CA",
      type: "Hybrid",
      duration: "3 months",
      stipend: "$2,500/month",
      description: "Join our dynamic backend team to build scalable microservices and RESTful APIs. You'll work with Node.js, Express, and MongoDB to create robust server-side applications.",
      requirements: ["Node.js", "Express", "MongoDB", "REST APIs", "Git"],
      responsibilities: [
        "Develop and maintain backend services",
        "Write clean, maintainable code",
        "Collaborate with frontend developers",
        "Participate in code reviews"
      ],
      timeline: [
        { stage: "Application Submitted", date: "Jan 15, 2024", completed: true },
        { stage: "Resume Screening", date: "Jan 18, 2024", completed: true },
        { stage: "Technical Interview", date: "Pending", completed: false },
        { stage: "Final Decision", date: "Pending", completed: false }
      ],
      contactPerson: "Sarah Johnson",
      contactEmail: "sarah@startupxyz.com",
      nextSteps: "Technical interview scheduled for next week. Review data structures and algorithms."
    },
    {
      title: "UI/UX Design Intern",
      company: "DesignStudio",
      appliedDate: "2024-01-10",
      status: "Shortlisted",
      statusColor: "bg-blue-100 text-blue-800",
      location: "Remote",
      type: "Remote",
      duration: "4 months",
      stipend: "$2,000/month",
      description: "Create stunning user interfaces and experiences for web and mobile applications. Work alongside senior designers to deliver pixel-perfect designs.",
      requirements: ["Figma", "Adobe XD", "Sketch", "Wireframing", "Prototyping"],
      responsibilities: [
        "Design user interfaces for web and mobile",
        "Create wireframes and prototypes",
        "Conduct user research",
        "Collaborate with developers"
      ],
      timeline: [
        { stage: "Application Submitted", date: "Jan 10, 2024", completed: true },
        { stage: "Portfolio Review", date: "Jan 12, 2024", completed: true },
        { stage: "Design Challenge", date: "Jan 20, 2024", completed: true },
        { stage: "Final Interview", date: "Jan 25, 2024", completed: false }
      ],
      contactPerson: "Michael Chen",
      contactEmail: "michael@designstudio.com",
      nextSteps: "Final interview with the creative director scheduled. Prepare your portfolio presentation."
    },
    {
      title: "Mobile App Developer",
      company: "AppWorks",
      appliedDate: "2024-01-05",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800",
      location: "New York, NY",
      type: "Onsite",
      duration: "6 months",
      stipend: "$3,000/month",
      description: "Build native mobile applications for iOS and Android platforms. Experience with React Native or Flutter is a plus.",
      requirements: ["React Native", "Flutter", "JavaScript", "Mobile UI/UX", "Git"],
      responsibilities: [
        "Develop cross-platform mobile apps",
        "Implement responsive UI designs",
        "Test and debug applications",
        "Optimize app performance"
      ],
      timeline: [
        { stage: "Application Submitted", date: "Jan 5, 2024", completed: true },
        { stage: "Initial Screening", date: "Jan 8, 2024", completed: true },
        { stage: "Application Rejected", date: "Jan 12, 2024", completed: true }
      ],
      contactPerson: "David Park",
      contactEmail: "david@appworks.com",
      nextSteps: "Application was not selected. Consider gaining more mobile development experience and reapply next season."
    }
  ];

  const renderMainContent = () => {
    switch (activeSection) {
      case 'profile':
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your personal information and preferences</p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <Input value="John Doe" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input value="john.doe@email.com" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">University</label>
                    <Input placeholder="Enter your university" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Major</label>
                    <Input placeholder="Enter your major" />
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700" 
                      onClick={handleUpdateProfile}
                      disabled={isUpdatingProfile}
                    >
                      {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
                    </Button>
                  </motion.div>
                </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Resume & Documents</CardTitle>
                    <CardDescription>Upload and manage your application documents</CardDescription>
                  </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload your resume</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadedResume(file.name);
                        }
                      }}
                    />
                    <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>Choose File</Button>
                    {uploadedResume && (
                      <p className="text-sm text-green-600 mt-2">✓ {uploadedResume} selected</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">resume_john_doe.pdf</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        );

      case 'browse':
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Browse Internships</h1>
                <p className="text-gray-600">Discover opportunities that match your interests</p>
              </div>
              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {getActiveFilterCount() > 0 && (
                      <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {getActiveFilterCount()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Filter Internships</SheetTitle>
                    <SheetDescription>
                      Narrow down your search to find the perfect internship
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="mt-6 space-y-6">
                    {/* Location Filter */}
                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        Work Location
                      </h3>
                      <div className="space-y-2">
                        {filterOptions.location.map(option => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`location-${option.value}`}
                              checked={filters.location.includes(option.value)}
                              onCheckedChange={(checked) => updateLocationFilter(option.value, checked as boolean)}
                            />
                            <label htmlFor={`location-${option.value}`} className="text-sm">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Duration Filter */}
                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Duration
                      </h3>
                      <div className="space-y-2">
                        {filterOptions.duration.map(option => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`duration-${option.value}`}
                              checked={filters.duration.includes(option.value)}
                              onCheckedChange={(checked) => updateDurationFilter(option.value, checked as boolean)}
                            />
                            <label htmlFor={`duration-${option.value}`} className="text-sm">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stipend Range */}
                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Monthly Stipend Range
                      </h3>
                      <div className="px-2">
                        <Slider
                          value={filters.stipendRange}
                          onValueChange={(value) => setFilters(prev => ({ ...prev, stipendRange: value as [number, number] }))}
                          max={5000}
                          min={0}
                          step={100}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>${filters.stipendRange[0]}</span>
                          <span>${filters.stipendRange[1]}+</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills Filter */}
                    <div>
                      <h3 className="font-medium mb-3">Skills & Technologies</h3>
                      <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                        {allSkills.map(skill => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`skill-${skill}`}
                              checked={filters.skills.includes(skill)}
                              onCheckedChange={(checked) => updateSkillsFilter(skill, checked as boolean)}
                            />
                            <label htmlFor={`skill-${skill}`} className="text-sm">
                              {skill}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Company Size */}
                    <div>
                      <h3 className="font-medium mb-3 flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        Company Size
                      </h3>
                      <div className="space-y-2">
                        {filterOptions.companySize.map(option => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`company-${option.value}`}
                              checked={filters.companySize.includes(option.value)}
                              onCheckedChange={(checked) => updateCompanySizeFilter(option.value, checked as boolean)}
                            />
                            <label htmlFor={`company-${option.value}`} className="text-sm">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Posted Within */}
                    <div>
                      <h3 className="font-medium mb-3">Posted Within</h3>
                      <Select value={filters.postedWithin} onValueChange={(value) => setFilters(prev => ({ ...prev, postedWithin: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOptions.postedWithin.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Clear All Filters */}
                    <div className="pt-4 border-t">
                      <Button variant="outline" onClick={clearAllFilters} className="w-full">
                        <X className="h-4 w-4 mr-2" />
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </motion.div>
            
            {/* Search and Results Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
              <CardContent className="p-4">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search internships by title, company, location, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
                
                {/* Active Filters Display */}
                {(searchQuery || getActiveFilterCount() > 0) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-600">Active filters:</span>
                    {searchQuery && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Search: "{searchQuery}"
                        <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                      </Badge>
                    )}
                    {filters.location.map(location => (
                      <Badge key={location} variant="secondary" className="flex items-center gap-1">
                        {filterOptions.location.find(opt => opt.value === location)?.label}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => updateLocationFilter(location, false)} />
                      </Badge>
                    ))}
                    {filters.duration.map(duration => (
                      <Badge key={duration} variant="secondary" className="flex items-center gap-1">
                        {filterOptions.duration.find(opt => opt.value === duration)?.label}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => updateDurationFilter(duration, false)} />
                      </Badge>
                    ))}
                    {filters.skills.map(skill => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => updateSkillsFilter(skill, false)} />
                      </Badge>
                    ))}
                    {getActiveFilterCount() > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-blue-600 hover:text-blue-800">
                        Clear All
                      </Button>
                    )}
                  </div>
                )}
                
                {/* Results Summary */}
                <div className="text-sm text-gray-600 mt-2">
                  Showing {filteredInternships.length} of {mockInternships.length} internships
                </div>
              </CardContent>
              </Card>
            </motion.div>
            
            {/* Internship Results */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredInternships.length > 0 ? (
                  filteredInternships.map((internship, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <InternshipCard
                        {...internship}
                        onApply={() => alert(`Applied to ${internship.title} at ${internship.company}`)}
                      />
                    </motion.div>
                  ))
                ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or clearing some filters
                  </p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                </div>
                )}
              </AnimatePresence>
            </div>
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">My Applications</h1>
              <p className="text-gray-600">Track the status of your internship applications</p>
            </motion.div>
            
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Applications</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="interview">Interview</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {mockApplications.map((application, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{application.title}</h3>
                          <p className="text-gray-600 mb-2">{application.company}</p>
                          <p className="text-sm text-gray-500">Applied on {application.appliedDate}</p>
                        </div>
                        <Badge className={`${application.statusColor} border-0`}>
                          {application.status}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Application Progress
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedApplication(index)}
                            >
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Withdraw
                            </Button>
                          </div>
                        </div>
                        <Progress value={application.status === 'Rejected' ? 25 : application.status === 'Under Review' ? 50 : 75} className="mt-2" />
                      </div>
                    </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-4">
                {mockApplications.filter(app => app.status === 'Under Review').map((application, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{application.title}</h3>
                          <p className="text-gray-600 mb-2">{application.company}</p>
                          <p className="text-sm text-gray-500">Applied on {application.appliedDate}</p>
                        </div>
                        <Badge className={`${application.statusColor} border-0`}>
                          {application.status}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Application Progress
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedApplication(mockApplications.indexOf(application))}
                            >
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Withdraw
                            </Button>
                          </div>
                        </div>
                        <Progress value={50} className="mt-2" />
                      </div>
                    </CardContent>
                    </Card>
                  </motion.div>
                ))}
                {mockApplications.filter(app => app.status === 'Under Review').length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Clock className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No pending applications</h3>
                    <p className="text-gray-600">All your applications have been reviewed</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="interview" className="space-y-4">
                {mockApplications.filter(app => app.status === 'Shortlisted').map((application, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{application.title}</h3>
                          <p className="text-gray-600 mb-2">{application.company}</p>
                          <p className="text-sm text-gray-500">Applied on {application.appliedDate}</p>
                        </div>
                        <Badge className={`${application.statusColor} border-0`}>
                          {application.status}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Interview Scheduled</p>
                            <p className="text-sm text-gray-600 mt-1">Final interview with the creative director on Jan 25, 2024</p>
                            <p className="text-sm text-blue-600 mt-2">Prepare your portfolio presentation</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Application Progress
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedApplication(mockApplications.indexOf(application))}
                            >
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Withdraw
                            </Button>
                          </div>
                        </div>
                        <Progress value={75} className="mt-2" />
                      </div>
                    </CardContent>
                    </Card>
                  </motion.div>
                ))}
                {mockApplications.filter(app => app.status === 'Shortlisted').length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Calendar className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming interviews</h3>
                    <p className="text-gray-600">Keep applying and you'll hear back soon!</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="rejected" className="space-y-4">
                {mockApplications.filter(app => app.status === 'Rejected').map((application, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="border-red-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{application.title}</h3>
                          <p className="text-gray-600 mb-2">{application.company}</p>
                          <p className="text-sm text-gray-500">Applied on {application.appliedDate}</p>
                        </div>
                        <Badge className={`${application.statusColor} border-0`}>
                          {application.status}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 bg-red-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <X className="h-5 w-5 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Application Not Selected</p>
                            <p className="text-sm text-gray-600 mt-1">Your application was not selected for this position. Don't be discouraged!</p>
                            <p className="text-sm text-gray-700 mt-2 font-medium">Feedback & Tips:</p>
                            <ul className="text-sm text-gray-600 mt-1 list-disc list-inside space-y-1">
                              <li>Consider gaining more mobile development experience</li>
                              <li>Build a portfolio of relevant projects</li>
                              <li>Practice technical interview questions</li>
                              <li>Reapply next season with improved skills</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            Application Progress
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedApplication(mockApplications.indexOf(application))}
                            >
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-600">
                              Archive
                            </Button>
                          </div>
                        </div>
                        <Progress value={25} className="mt-2" />
                      </div>
                    </CardContent>
                    </Card>
                  </motion.div>
                ))}
                {mockApplications.filter(app => app.status === 'Rejected').length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <CheckCircle2 className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No rejected applications</h3>
                    <p className="text-gray-600">You're doing great!</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        );

      case 'notifications':
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
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
              <p className="text-gray-600">Stay updated with your application status and new opportunities</p>
            </motion.div>
            
            <div className="space-y-4">
              {[
                {
                  title: "Application Status Update",
                  message: "Your application for Frontend Developer Intern at TechCorp has been shortlisted!",
                  time: "2 hours ago",
                  type: "success"
                },
                {
                  title: "New Internship Match",
                  message: "3 new internships match your preferences. Check them out!",
                  time: "1 day ago",
                  type: "info"
                },
                {
                  title: "Application Deadline Reminder",
                  message: "The deadline for Data Science Intern at Analytics Pro is tomorrow.",
                  time: "2 days ago",
                  type: "warning"
                }
              ].map((notification, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
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
        title="Student Dashboard"
        items={sidebarItems}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderMainContent()}
        </div>
      </main>
      <ChatBot userRole="student" userName={user?.name || 'Student'} />
      
      {/* Application Details Dialog */}
      <Dialog open={selectedApplication !== null} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedApplication !== null && mockApplications[selectedApplication] && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{mockApplications[selectedApplication].title}</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Building className="h-4 w-4" />
                    <span className="font-medium">{mockApplications[selectedApplication].company}</span>
                    <Badge className={`${mockApplications[selectedApplication].statusColor} border-0 ml-2`}>
                      {mockApplications[selectedApplication].status}
                    </Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Job Overview */}
                <div>
                  <h3 className="font-semibold mb-3">Job Overview</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{mockApplications[selectedApplication].location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <span>{mockApplications[selectedApplication].type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>{mockApplications[selectedApplication].duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span>{mockApplications[selectedApplication].stipend}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-sm text-gray-600">{mockApplications[selectedApplication].description}</p>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockApplications[selectedApplication].requirements.map((req, idx) => (
                      <Badge key={idx} variant="secondary">{req}</Badge>
                    ))}
                  </div>
                </div>

                {/* Responsibilities */}
                <div>
                  <h3 className="font-semibold mb-2">Key Responsibilities</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    {mockApplications[selectedApplication].responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                {/* Application Timeline */}
                <div>
                  <h3 className="font-semibold mb-3">Application Timeline</h3>
                  <div className="space-y-3">
                    {mockApplications[selectedApplication].timeline.map((stage, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`mt-1 ${stage.completed ? 'text-green-600' : 'text-gray-300'}`}>
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${stage.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {stage.stage}
                          </p>
                          <p className="text-xs text-gray-500">{stage.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact & Next Steps */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Next Steps</h3>
                  <p className="text-sm text-gray-700 mb-3">{mockApplications[selectedApplication].nextSteps}</p>
                  <div className="text-sm">
                    <p className="text-gray-600">Contact Person: <span className="font-medium text-gray-900">{mockApplications[selectedApplication].contactPerson}</span></p>
                    <p className="text-gray-600">Email: <span className="font-medium text-blue-600">{mockApplications[selectedApplication].contactEmail}</span></p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Contact Recruiter
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedApplication(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}