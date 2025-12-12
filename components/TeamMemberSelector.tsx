import React, { useState, useRef, useEffect } from 'react';
import { Users, ChevronDown, Check } from 'lucide-react';

interface Props {
  members: string[];
  selectedMembers: string[];
  onChange: (members: string[]) => void;
}

const TeamMemberSelector: React.FC<Props> = ({ members, selectedMembers, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = (member: string) => {
    if (member === 'All Team Members') {
      if (selectedMembers.includes('All Team Members')) {
        onChange([]);
      } else {
        onChange(['All Team Members', ...members]);
      }
    } else {
      let newSelection = [...selectedMembers];
      
      // If "All" was previously selected and we are deselecting a specific member, remove "All"
      if (newSelection.includes('All Team Members')) {
        newSelection = newSelection.filter(m => m !== 'All Team Members');
      }

      if (newSelection.includes(member)) {
        newSelection = newSelection.filter(m => m !== member);
      } else {
        newSelection.push(member);
      }

      // Check if all members are selected manually
      const allMembersSelected = members.every(m => newSelection.includes(m));
      if (allMembersSelected) {
        newSelection.push('All Team Members');
      }

      onChange(newSelection);
    }
  };

  const getButtonLabel = () => {
    if (selectedMembers.includes('All Team Members')) return 'All Team Members';
    if (selectedMembers.length === 0) return 'Select Team Members';
    if (selectedMembers.length === 1) return selectedMembers[0];
    return `${selectedMembers.length} Members Selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-56 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
      >
         <span className="flex items-center truncate">
           <Users className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
           <span className="truncate">{getButtonLabel()}</span>
        </span>
        <ChevronDown className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 max-h-80 overflow-y-auto">
          <div 
            className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
            onClick={() => handleToggle('All Team Members')}
          >
            <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${selectedMembers.includes('All Team Members') ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
              {selectedMembers.includes('All Team Members') && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm text-gray-700 font-medium">All Team Members</span>
          </div>
          
          {members.map((member) => (
            <div 
              key={member}
              className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleToggle(member)}
            >
              <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${selectedMembers.includes(member) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                {selectedMembers.includes(member) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm text-gray-700">{member}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamMemberSelector;