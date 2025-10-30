import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Building, User, Shield, Info, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Alert, AlertDescription } from './ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { userManager, User as UserType } from '../utils/userManager';

interface AuthPageProps {
  onLogin: (user: UserType) => void;
  onBack: () => void;
}

export function AuthPage({ onLogin, onBack }: AuthPageProps) {
  const [selectedRole, setSelectedRole] = useState<'student' | 'company' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDemoUsers, setShowDemoUsers] = useState(false);

  // Get demo users for display
  const demoUsers = {
    student: userManager.getUsersByRole('student').slice(0, 3),
    company: userManager.getUsersByRole('company').slice(0, 3),
    admin: userManager.getUsersByRole('admin').slice(0, 2)
  };

  const roles = [
    {
      value: 'student' as const,
      label: 'Student',
      icon: User,
      description: 'Looking for internship opportunities'
    },
    {
      value: 'company' as const,
      label: 'Company',
      icon: Building,
      description: 'Hiring interns for your organization'
    },
    {
      value: 'admin' as const,
      label: 'Admin',
      icon: Shield,
      description: 'College placement office access'
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    const result = userManager.loginUser(email, password);
    if (result.success && result.user) {
      onLogin(result.user);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const result = userManager.registerUser({
      name,
      email,
      password,
      role: selectedRole
    });

    if (result.success && result.user) {
      onLogin(result.user);
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  const fillDemoCredentials = (user: UserType) => {
    setEmail(user.email);
    setPassword(user.password);
    setSelectedRole(user.role);
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <motion.header 
        className="border-b bg-white"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Building className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold">Scube</span>
          </motion.div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg">
            <CardHeader className="space-y-1 pb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <CardTitle className="text-2xl text-center">Welcome</CardTitle>
                <CardDescription className="text-center">
                  Sign in to your account or create a new one
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="space-y-6" onValueChange={() => { setError(''); clearForm(); }}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  {/* Demo Users Alert */}
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <div className="flex justify-between items-center">
                        <strong>Demo Users Available</strong>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowDemoUsers(!showDemoUsers)}
                          className="h-6 text-xs text-blue-600 hover:text-blue-800"
                        >
                          {showDemoUsers ? 'Hide' : 'Show'} Demo Users
                        </Button>
                      </div>
                      {showDemoUsers && (
                        <div className="mt-3 space-y-2 text-sm">
                          {Object.entries(demoUsers).map(([role, users]) => (
                            <div key={role}>
                              <div className="capitalize font-medium text-blue-900 mb-1">{role}s:</div>
                              {users.map((user) => (
                                <div key={user.id} className="flex justify-between items-center bg-white/50 p-2 rounded text-xs">
                                  <span>{user.name} - {user.email}</span>
                                  <Button 
                                    type="button" 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => fillDemoCredentials(user)}
                                    className="h-5 text-xs"
                                  >
                                    Use
                                  </Button>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>

                  <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertDescription className="text-red-800">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-3">
                      <Label>Login as</Label>
                      <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as 'student' | 'company' | 'admin')}>
                        {roles.map((role) => (
                          <div key={role.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value={role.value} id={role.value} />
                            <div className="flex items-center gap-3 flex-1">
                              <role.icon className="h-5 w-5 text-gray-600" />
                              <div>
                                <label htmlFor={role.value} className="font-medium cursor-pointer">
                                  {role.label}
                                </label>
                                <p className="text-sm text-gray-500">{role.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">
                      Create your own account with any name and credentials
                    </p>
                  </div>
                  <form onSubmit={handleRegister} className="space-y-4">
                    {error && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertDescription className="text-red-800">
                          {error}
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Full Name</Label>
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-3">
                      <Label>Register as</Label>
                      <RadioGroup value={selectedRole} onValueChange={(value) => setSelectedRole(value as 'student' | 'company' | 'admin')}>
                        {roles.map((role, index) => (
                          <motion.div 
                            key={role.value}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                              <RadioGroupItem value={role.value} id={`register-${role.value}`} />
                              <div className="flex items-center gap-3 flex-1">
                                <role.icon className="h-5 w-5 text-gray-600" />
                                <div>
                                  <label htmlFor={`register-${role.value}`} className="font-medium cursor-pointer">
                                    {role.label}
                                  </label>
                                  <p className="text-sm text-gray-500">{role.description}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </RadioGroup>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Create Account
                      </Button>
                    </motion.div>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
              </div>

              {/* Demo Users Section */}
              <div className="mt-6">
                <Collapsible open={showDemoUsers} onOpenChange={setShowDemoUsers}>
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full text-sm text-gray-600 hover:text-gray-800"
                    >
                      <Info className="h-4 w-4 mr-2" />
                      {showDemoUsers ? 'Hide Demo Users' : 'Show Demo Users (For Quick Testing)'}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4 space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border">
                      <p className="text-sm text-blue-800 mb-3 font-medium">
                        💡 You can create your own account or use these demo users for quick testing:
                      </p>
                      
                      {Object.entries(demoUsers).map(([role, users]) => (
                        <div key={role} className="mb-4">
                          <h4 className="font-medium text-gray-700 mb-2 capitalize">{role}s:</h4>
                          <div className="grid gap-2">
                            {users.map((user) => (
                              <div key={user.id} className="flex items-center justify-between p-2 bg-white rounded border">
                                <div className="text-sm">
                                  <div className="font-medium">{user.name}</div>
                                  <div className="text-gray-500">{user.email}</div>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => fillDemoCredentials(user)}
                                  className="text-xs"
                                >
                                  Use Credentials
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-xs text-blue-600 mt-3 p-2 bg-blue-100 rounded">
                        <strong>Note:</strong> These are just sample users for testing. You can register with any name and email you prefer!
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}