import React from 'react';
import { motion } from 'motion/react';
import { MapPin, DollarSign, Calendar, Building2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

interface InternshipCardProps {
  title: string;
  company: string;
  location: string;
  stipend: string;
  duration: string;
  description: string;
  skills: string[];
  type: 'remote' | 'onsite' | 'hybrid';
  postedDate: string;
  onApply?: () => void;
  showApplyButton?: boolean;
}

export function InternshipCard({
  title,
  company,
  location,
  stipend,
  duration,
  description,
  skills,
  type,
  postedDate,
  onApply,
  showApplyButton = true
}: InternshipCardProps) {
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'remote':
        return 'bg-green-100 text-green-800';
      case 'onsite':
        return 'bg-blue-100 text-blue-800';
      case 'hybrid':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 h-full">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg mb-1">{title}</CardTitle>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">{company}</span>
              </div>
            </div>
            <Badge className={`${getTypeBadgeColor(type)} border-0`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Badge>
          </div>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>{stipend}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="mb-4 line-clamp-2">
          {description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{skills.length - 4} more
            </Badge>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Posted {postedDate}</span>
          {showApplyButton && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => {
                  toast.success('Successfully applied for the job!', {
                    description: `Your application for ${title} at ${company} has been submitted.`,
                    duration: 4000,
                  });
                  onApply?.();
                }} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Apply Now
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
      </Card>
    </motion.div>
  );
}