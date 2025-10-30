import React from 'react';
import { motion } from 'motion/react';
import { Building, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  title: string;
  items: SidebarItem[];
  onLogout: () => void;
}

export function Sidebar({ title, items, onLogout }: SidebarProps) {
  return (
    <motion.div 
      className="w-64 bg-white border-r border-gray-200 h-full flex flex-col"
      initial={{ x: -264, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Header */}
      <motion.div 
        className="p-6 border-b border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Building className="h-8 w-8 text-blue-600" />
          </motion.div>
          <span className="text-xl font-semibold">Scube</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{title}</p>
      </motion.div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            >
              <motion.button
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  item.isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className={`h-5 w-5 ${item.isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <motion.div 
        className="p-4 border-t border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="ghost"
            onClick={onLogout}
            className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}