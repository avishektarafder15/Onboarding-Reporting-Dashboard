import React from 'react';
import { 
  Phone, 
  Users, 
  Settings, 
  BarChart2, 
  List, 
  Headphones
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { icon: Phone, label: 'Call Allocations', active: false },
    { icon: Users, label: 'Caller Master', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: BarChart2, label: 'Reports', active: true },
    { icon: List, label: 'All Interactions', active: false },
  ];

  return (
    <div 
      className={`w-64 bg-[#4338ca] text-white flex flex-col h-screen fixed left-0 top-0 z-40 shadow-xl transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-indigo-500/30">
        <Headphones className="w-6 h-6 mr-3" />
        <span className="text-lg font-semibold tracking-wide">Welcome Call</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center px-6 py-3 cursor-pointer transition-colors ${
              item.active 
                ? 'bg-[#3730a3] border-l-4 border-green-400' 
                : 'hover:bg-[#3730a3] border-l-4 border-transparent'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 ${item.active ? 'text-green-400' : 'text-indigo-200'}`} />
            <span className={`text-sm font-medium ${item.active ? 'text-white' : 'text-indigo-100'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;