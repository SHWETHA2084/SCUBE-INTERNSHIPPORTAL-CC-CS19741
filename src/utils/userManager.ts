export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'company' | 'admin';
  createdAt: string;
  // Additional role-specific data
  studentData?: {
    university?: string;
    major?: string;
    year?: string;
    gpa?: string;
  };
  companyData?: {
    companyName?: string;
    position?: string;
    companySize?: string;
  };
  adminData?: {
    collegeName?: string;
    department?: string;
  };
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

class UserManager {
  private storageKey = 'scube_users';
  private currentUserKey = 'scube_current_user';

  constructor() {
    this.initializeWithDemoUsers();
  }

  private initializeWithDemoUsers() {
    const existingUsers = this.getAllUsers();
    if (existingUsers.length === 0) {
      // Add diverse demo users
      const demoUsers: User[] = [
        // Students
        {
          id: '1',
          name: 'Priya Sharma',
          email: 'priya.sharma@university.edu',
          password: 'priya2024',
          role: 'student',
          createdAt: new Date().toISOString(),
          studentData: {
            university: 'Tech University',
            major: 'Computer Science',
            year: '3rd Year',
            gpa: '3.8'
          }
        },
        {
          id: '2',
          name: 'Marcus Thompson',
          email: 'marcus.t@university.edu',
          password: 'marcus123',
          role: 'student',
          createdAt: new Date().toISOString(),
          studentData: {
            university: 'State College',
            major: 'Software Engineering',
            year: '4th Year',
            gpa: '3.7'
          }
        },
        {
          id: '3',
          name: 'Mei Lin Wang',
          email: 'meilin.wang@university.edu',
          password: 'meilin2024',
          role: 'student',
          createdAt: new Date().toISOString(),
          studentData: {
            university: 'Tech University',
            major: 'Data Science',
            year: '2nd Year',
            gpa: '3.9'
          }
        },
        {
          id: '4',
          name: 'Ahmed Hassan',
          email: 'ahmed.hassan@university.edu',
          password: 'ahmed123',
          role: 'student',
          createdAt: new Date().toISOString(),
          studentData: {
            university: 'Engineering College',
            major: 'Information Technology',
            year: '3rd Year',
            gpa: '3.6'
          }
        },
        {
          id: '5',
          name: 'Sofia Rodriguez',
          email: 'sofia.rodriguez@university.edu',
          password: 'sofia2024',
          role: 'student',
          createdAt: new Date().toISOString(),
          studentData: {
            university: 'State College',
            major: 'Cybersecurity',
            year: '4th Year',
            gpa: '3.8'
          }
        },
        {
          id: '6',
          name: 'Kwame Asante',
          email: 'kwame.asante@university.edu',
          password: 'kwame123',
          role: 'student',
          createdAt: new Date().toISOString(),
          studentData: {
            university: 'Tech University',
            major: 'Artificial Intelligence',
            year: '2nd Year',
            gpa: '3.9'
          }
        },
        // Company Representatives
        {
          id: '7',
          name: 'Jennifer Martinez',
          email: 'jennifer.m@techcorp.com',
          password: 'jennifer2024',
          role: 'company',
          createdAt: new Date().toISOString(),
          companyData: {
            companyName: 'TechCorp Solutions',
            position: 'HR Manager',
            companySize: '500-1000 employees'
          }
        },
        {
          id: '8',
          name: 'David Kim',
          email: 'david.kim@innovate.io',
          password: 'david123',
          role: 'company',
          createdAt: new Date().toISOString(),
          companyData: {
            companyName: 'Innovate Solutions',
            position: 'Talent Acquisition Lead',
            companySize: '100-500 employees'
          }
        },
        {
          id: '9',
          name: 'Elena Petrov',
          email: 'elena.petrov@globaltech.com',
          password: 'elena2024',
          role: 'company',
          createdAt: new Date().toISOString(),
          companyData: {
            companyName: 'GlobalTech Industries',
            position: 'Recruitment Director',
            companySize: '1000+ employees'
          }
        },
        {
          id: '10',
          name: 'Aisha Okonkwo',
          email: 'aisha.o@startuptech.io',
          password: 'aisha123',
          role: 'company',
          createdAt: new Date().toISOString(),
          companyData: {
            companyName: 'StartupTech',
            position: 'People Operations Manager',
            companySize: '50-100 employees'
          }
        },
        {
          id: '11',
          name: 'Robert Anderson',
          email: 'robert.anderson@megacorp.com',
          password: 'robert2024',
          role: 'company',
          createdAt: new Date().toISOString(),
          companyData: {
            companyName: 'MegaCorp Enterprise',
            position: 'Senior HR Business Partner',
            companySize: '1000+ employees'
          }
        },
        // College Administrators
        {
          id: '12',
          name: 'Dr. Sarah Chen',
          email: 'sarah.chen@university.edu',
          password: 'sarah2024',
          role: 'admin',
          createdAt: new Date().toISOString(),
          adminData: {
            collegeName: 'Tech University',
            department: 'Career Services'
          }
        },
        {
          id: '13',
          name: 'Prof. Michael O\'Brien',
          email: 'michael.obrien@statecollege.edu',
          password: 'michael123',
          role: 'admin',
          createdAt: new Date().toISOString(),
          adminData: {
            collegeName: 'State College',
            department: 'Placement Office'
          }
        },
        {
          id: '14',
          name: 'Dr. Fatima Al-Zahra',
          email: 'fatima.alzahra@engineeringcollege.edu',
          password: 'fatima2024',
          role: 'admin',
          createdAt: new Date().toISOString(),
          adminData: {
            collegeName: 'Engineering College',
            department: 'Industry Relations'
          }
        },
        {
          id: '15',
          name: 'Dean Patricia Williams',
          email: 'patricia.williams@university.edu',
          password: 'patricia123',
          role: 'admin',
          createdAt: new Date().toISOString(),
          adminData: {
            collegeName: 'Tech University',
            department: 'Student Affairs'
          }
        }
      ];

      localStorage.setItem(this.storageKey, JSON.stringify(demoUsers));
    }
  }

  getAllUsers(): User[] {
    const users = localStorage.getItem(this.storageKey);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  registerUser(userData: Omit<User, 'id' | 'createdAt'>): AuthResult {
    const users = this.getAllUsers();
    
    // Check if email already exists
    if (users.find(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return {
        success: false,
        error: 'An account with this email already exists'
      };
    }

    // Create new user
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    return {
      success: true,
      user: newUser
    };
  }

  loginUser(email: string, password: string): AuthResult {
    const users = this.getAllUsers();
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );

    if (user) {
      this.setCurrentUser(user);
      return {
        success: true,
        user
      };
    }

    return {
      success: false,
      error: 'Invalid email or password'
    };
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem(this.currentUserKey);
    return userData ? JSON.parse(userData) : null;
  }

  setCurrentUser(user: User) {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.currentUserKey);
  }

  updateUser(userId: string, updates: Partial<User>): boolean {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) return false;

    users[userIndex] = { ...users[userIndex], ...updates };
    this.saveUsers(users);

    // Update current user if it's the same user
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      this.setCurrentUser(users[userIndex]);
    }

    return true;
  }

  getUsersByRole(role: 'student' | 'company' | 'admin'): User[] {
    return this.getAllUsers().filter(u => u.role === role);
  }

  deleteUser(userId: string): boolean {
    const users = this.getAllUsers();
    const filteredUsers = users.filter(u => u.id !== userId);
    
    if (filteredUsers.length === users.length) return false;
    
    this.saveUsers(filteredUsers);
    
    // Logout if current user was deleted
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      this.logout();
    }
    
    return true;
  }
}

export const userManager = new UserManager();