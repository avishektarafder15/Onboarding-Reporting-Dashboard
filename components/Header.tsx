import React from 'react';
import { Menu, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-[#4338ca] text-white flex items-center justify-between px-6 shadow-sm sticky top-0 z-20">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 hover:bg-indigo-700 p-1 rounded transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-medium">Reports</h1>
      </div>

      <div className="flex items-center cursor-pointer hover:bg-indigo-700 p-2 rounded-md transition-colors">
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center mr-3 border border-indigo-300">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium mr-2">Jayeeta Mo...</span>
        <ChevronDown className="w-4 h-4 text-indigo-200" />
      </div>
    </header>
  );
};

export default Header;