import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar, Users, Check } from 'lucide-react';

const CHANNELS = ['All Channels', 'Lawsikho', 'Skill Arbitrage'];
const TEAM_MEMBERS = ['John Doe', 'Sarah Smith', 'Michael Brown', 'Emily Davis', 'David Wilson'];
const DATE_RANGES = ['Today', 'Yesterday', 'Last 7 Days', 'Last 15 Days', 'Custom Range'];

const Filters: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Channel State
  const [selectedChannel, setSelectedChannel] = useState('All Channels');

  // Team State
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>(['All Team Members']);

  // Date State
  const [selectedDateRange, setSelectedDateRange] = useState('Today');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const handleTeamMemberToggle = (member: string) => {
    if (member === 'All Team Members') {
      if (selectedTeamMembers.includes('All Team Members')) {
        setSelectedTeamMembers([]);
      } else {
        setSelectedTeamMembers(['All Team Members', ...TEAM_MEMBERS]);
      }
    } else {
      let newSelection = [...selectedTeamMembers];
      
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
      const allMembersSelected = TEAM_MEMBERS.every(m => newSelection.includes(m));
      if (allMembersSelected) {
        newSelection.push('All Team Members');
      }

      setSelectedTeamMembers(newSelection);
    }
  };

  const getTeamButtonLabel = () => {
    if (selectedTeamMembers.includes('All Team Members')) return 'All Team Members';
    if (selectedTeamMembers.length === 0) return 'Select Team Members';
    if (selectedTeamMembers.length === 1) return selectedTeamMembers[0];
    return `${selectedTeamMembers.length} Members Selected`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4 mb-6" ref={dropdownRef}>
      <div className="flex flex-wrap gap-4">
        
        {/* Channel Filter */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('channel')}
            className="flex items-center justify-between w-40 px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span className="truncate">{selectedChannel}</span>
            <ChevronDown className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${openDropdown === 'channel' ? 'rotate-180' : ''}`} />
          </button>
          
          {openDropdown === 'channel' && (
            <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">
              {CHANNELS.map((channel) => (
                <button
                  key={channel}
                  onClick={() => {
                    setSelectedChannel(channel);
                    setOpenDropdown(null);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${selectedChannel === channel ? 'text-indigo-600 font-medium bg-indigo-50' : 'text-gray-700'}`}
                >
                  {channel}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Team Member Filter */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('team')}
            className="flex items-center justify-between w-56 px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
             <span className="flex items-center truncate">
               <Users className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
               <span className="truncate">{getTeamButtonLabel()}</span>
            </span>
            <ChevronDown className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${openDropdown === 'team' ? 'rotate-180' : ''}`} />
          </button>

          {openDropdown === 'team' && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 max-h-80 overflow-y-auto">
              <div 
                className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
                onClick={() => handleTeamMemberToggle('All Team Members')}
              >
                <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${selectedTeamMembers.includes('All Team Members') ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                  {selectedTeamMembers.includes('All Team Members') && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-gray-700 font-medium">All Team Members</span>
              </div>
              
              {TEAM_MEMBERS.map((member) => (
                <div 
                  key={member}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleTeamMemberToggle(member)}
                >
                  <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${selectedTeamMembers.includes(member) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                    {selectedTeamMembers.includes(member) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm text-gray-700">{member}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Date Filter */}
      <div className="relative">
        <button 
          onClick={() => toggleDropdown('date')}
          className="flex items-center justify-between min-w-[160px] px-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
           <span className="flex items-center">
             <Calendar className="w-4 h-4 mr-2 text-gray-400" />
             {selectedDateRange === 'Custom Range' && customStartDate && customEndDate 
                ? `${customStartDate} - ${customEndDate}` 
                : selectedDateRange}
          </span>
          <ChevronDown className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${openDropdown === 'date' ? 'rotate-180' : ''}`} />
        </button>

        {openDropdown === 'date' && (
          <div className="absolute top-full right-0 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">
            {DATE_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => {
                  if (range !== 'Custom Range') {
                    setSelectedDateRange(range);
                    setOpenDropdown(null);
                  } else {
                    setSelectedDateRange('Custom Range');
                  }
                }}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${selectedDateRange === range ? 'text-indigo-600 font-medium bg-indigo-50' : 'text-gray-700'}`}
              >
                {range}
              </button>
            ))}

            {selectedDateRange === 'Custom Range' && (
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                    <input 
                      type="date" 
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">End Date</label>
                    <input 
                      type="date" 
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                      className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                  <button 
                    onClick={() => setOpenDropdown(null)}
                    className="w-full mt-2 bg-indigo-600 text-white text-xs py-1.5 rounded hover:bg-indigo-700"
                  >
                    Apply Range
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;