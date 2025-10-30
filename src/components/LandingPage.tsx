import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, DollarSign, Users, Building, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { CurrentPage } from '../App';

interface LandingPageProps {
  onNavigate: (page: CurrentPage) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [stipend, setStipend] = useState('');

  const features = [
    {
      icon: Users,
      title: "Connect with Top Companies",
      description: "Access internships from leading companies across various industries"
    },
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      description: "Monitor your applications and get real-time updates on your status"
    },
    {
      icon: CheckCircle,
      title: "Easy Application Process",
      description: "Apply to multiple internships with just a few clicks"
    }
  ];

  const stats = [
    { label: "Active Students", value: "10,000+" },
    { label: "Partner Companies", value: "500+" },
    { label: "Internships Posted", value: "2,500+" },
    { label: "Success Rate", value: "85%" }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        className="border-b bg-white"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Building className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold">Scube</span>
          </motion.div>
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={() => onNavigate('auth')}>
                Login
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={() => onNavigate('auth')} className="bg-blue-600 hover:bg-blue-700">
                Register
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-white py-30 bg-[rgba(255,0,0,0)]">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl font-bold text-black-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            FIND YOUR PERFECT INTERNSHIP HERE
          </motion.h1>
          <motion.p 
            className="text-xl text-black-600 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Connect with top COMPANIES, discover amazing OPPERTUNITIE, and kickstart your career with our comprehensive internship platform.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="max-w-4xl mx-auto shadow-lg">
              <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                  <Search className="h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Domain or keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 p-0 focus-visible:ring-0"
                  />
                </div>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border-0 p-0 focus-visible:ring-0"
                  />
                </div>
                <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Min stipend"
                    value={stipend}
                    onChange={(e) => setStipend(e.target.value)}
                    className="border-0 p-0 focus-visible:ring-0"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-blue-600 hover:bg-blue-700 py-2">
                    Search Internships
                  </Button>
                </motion.div>
              </div>
            </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div 
                  className="text-3xl font-bold text-blue-600 mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Scube?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to find and secure the perfect internship opportunity.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Card className="text-center border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardHeader>
                    <motion.div 
                      className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of students who have found their dream internships through our platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate('auth')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-semibold text-white">Scube</span>
              </div>
              <p className="text-sm">
                Connecting students with their dream internships and helping companies find top talent.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">For Students</h3>
              <ul className="space-y-2 text-sm">
                <li>Browse Internships</li>
                <li>Application Tracking</li>
                <li>Resume Builder</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">For Companies</h3>
              <ul className="space-y-2 text-sm">
                <li>Post Internships</li>
                <li>Candidate Management</li>
                <li>Analytics Dashboard</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 Scube. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}