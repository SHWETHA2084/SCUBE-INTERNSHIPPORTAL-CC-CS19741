import React, { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { MessageCircle, Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  userRole: 'student' | 'company' | 'admin';
  userName?: string;
}

export const ChatBot: React.FC<ChatBotProps> = ({ userRole, userName = 'User' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            toast.error('Microphone access denied. Please allow microphone access in your browser settings.');
          } else if (event.error === 'no-speech') {
            toast.error('No speech detected. Please try again.');
          } else {
            toast.error('Voice recognition error. Please try again.');
          }
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      }
    }
  }, []);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage();
      setMessages([{
        id: Date.now().toString(),
        text: welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getWelcomeMessage = () => {
    switch (userRole) {
      case 'student':
        return `Hi ${userName}! 👋 I'm your Scube assistant. I can help you find internships, guide you through applications, provide career tips, and answer questions about the platform. How can I assist you today?`;
      case 'company':
        return `Hello ${userName}! 👋 I'm your Scube assistant. I can help you post internships, manage applications, find the right candidates, and answer questions about the platform. What would you like to do today?`;
      case 'admin':
        return `Welcome ${userName}! 👋 I'm your Scube assistant. I can help you manage the platform, generate reports, oversee placement drives, and handle student/company relations. How can I help you today?`;
      default:
        return `Hello ${userName}! 👋 How can I help you today?`;
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Common responses for all roles
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! How can I assist you today?`;
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return `You're welcome! Feel free to ask if you need anything else. 😊`;
    }

    // Role-specific responses
    switch (userRole) {
      case 'student':
        if (lowerMessage.includes('internship') || lowerMessage.includes('find')) {
          return `To find internships, go to the "Browse Internships" section. You can use filters like location, duration, stipend, and skills to narrow down your search. Would you like tips on how to apply?`;
        }
        if (lowerMessage.includes('apply') || lowerMessage.includes('application')) {
          return `To apply for an internship:\n1. Browse available internships\n2. Click on an internship card to view details\n3. Click the "Apply Now" button\n4. Track your applications in the "My Applications" tab\n\nMake sure your profile is complete before applying!`;
        }
        if (lowerMessage.includes('profile')) {
          return `You can update your profile by clicking on your avatar in the sidebar. Make sure to add your skills, education, experience, and upload your resume to increase your chances of getting selected.`;
        }
        if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
          return `Tips for a great resume:\n• Keep it concise (1-2 pages)\n• Highlight relevant skills and projects\n• Include measurable achievements\n• Proofread for errors\n• Tailor it to each internship`;
        }
        if (lowerMessage.includes('skill')) {
          return `Adding relevant skills to your profile helps companies find you! Focus on:\n• Technical skills (programming languages, tools)\n• Soft skills (communication, teamwork)\n• Certifications\n• Project experience`;
        }
        return `I can help you with:\n• Finding internships\n• Application process\n• Profile optimization\n• Resume tips\n• Tracking applications\n\nWhat would you like to know more about?`;

      case 'company':
        if (lowerMessage.includes('post') || lowerMessage.includes('create internship')) {
          return `To post an internship:\n1. Go to "Post Internship" section\n2. Fill in the internship details (title, description, requirements)\n3. Set the stipend and duration\n4. Add required skills\n5. Click "Post Internship"\n\nYour internship will be visible to all students immediately!`;
        }
        if (lowerMessage.includes('applicant') || lowerMessage.includes('application')) {
          return `You can manage applications in the "Manage Applicants" tab. There you can:\n• View all applications\n• Filter by status\n• Review candidate profiles\n• Accept or reject applications\n• Contact selected candidates`;
        }
        if (lowerMessage.includes('candidate') || lowerMessage.includes('student')) {
          return `To find the right candidates:\n• Check the applicant's skills and experience\n• Review their resume and profile\n• Use filters to sort applications\n• Look for relevant projects and certifications`;
        }
        return `I can help you with:\n• Posting internships\n• Managing applications\n• Finding candidates\n• Platform features\n\nWhat would you like to know?`;

      case 'admin':
        if (lowerMessage.includes('report') || lowerMessage.includes('analytics')) {
          return `You can generate various reports:\n• Student placement statistics\n• Company engagement metrics\n• Internship applications data\n• Placement drive analytics\n\nGo to the Reports section to view detailed analytics.`;
        }
        if (lowerMessage.includes('student') || lowerMessage.includes('manage student')) {
          return `In the Student Management section, you can:\n• View all registered students\n• Verify student profiles\n• Monitor application activities\n• Export student data`;
        }
        if (lowerMessage.includes('company') || lowerMessage.includes('manage company')) {
          return `In the Company Management section, you can:\n• Approve new company registrations\n• Monitor posted internships\n• Track company activity\n• Handle company queries`;
        }
        if (lowerMessage.includes('drive') || lowerMessage.includes('placement')) {
          return `To manage placement drives:\n• Schedule new drives\n• Invite companies\n• Send notifications to students\n• Track participation and outcomes`;
        }
        return `I can help you with:\n• Platform management\n• Reports and analytics\n• Student management\n• Company relations\n• Placement drives\n\nWhat do you need assistance with?`;

      default:
        return `I'm here to help! Please ask me anything about the platform.`;
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);

      // Auto-speak bot response if synthesis is available
      if (synthesis && isSpeaking) {
        speakText(botResponse.text);
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    if (!recognition) {
      toast.error('Voice recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.start();
        setIsListening(true);
        toast.success('Listening... Speak now!');
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast.error('Could not start voice recognition.');
      }
    }
  };

  const speakText = (text: string) => {
    if (!synthesis) {
      toast.error('Text-to-speech is not supported in your browser.');
      return;
    }

    // Cancel any ongoing speech
    synthesis.cancel();

    // Remove emojis and special characters for better speech
    const cleanText = text.replace(/[😊👋•]/g, '').replace(/\n/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      setIsSpeaking(true);
    };

    synthesis.speak(utterance);
  };

  const toggleSpeech = () => {
    if (!synthesis) {
      toast.error('Text-to-speech is not supported in your browser.');
      return;
    }

    if (synthesis.speaking) {
      synthesis.cancel();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      toast.success('Text-to-speech enabled for bot responses');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[450px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <SheetTitle>Scube Assistant</SheetTitle>
                <SheetDescription className="text-sm text-gray-500">Always here to help</SheetDescription>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleSpeech}
              className="h-8 w-8"
            >
              {isSpeaking ? (
                <Volume2 className="h-4 w-4 text-blue-600" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className={message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200'}>
                    {message.sender === 'user' ? userName.charAt(0).toUpperCase() : 'S'}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isListening}
            />
            <Button
              size="icon"
              variant={isListening ? 'destructive' : 'outline'}
              onClick={toggleVoiceInput}
              disabled={!recognition}
              className="flex-shrink-0"
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="flex-shrink-0 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {isListening && (
            <p className="text-sm text-blue-600 mt-2 text-center animate-pulse">
              Listening... Speak now
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
