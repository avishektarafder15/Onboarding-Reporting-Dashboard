
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Users } from 'lucide-react';
import { LeadConversionData } from '../types';

interface Props {
  data: LeadConversionData[];
  allMembers: string[];
  selectedMembers: string[];
  onMembersChange: (members: string[]) => void;
}

const LeadConversionTable: React.FC<Props> = ({ 
  data, 
  allMembers,
  selectedMembers,
  onMembersChange
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (member: string) => {
    if (member === 'All') {
      if (selectedMembers.includes('All')) onMembersChange([]);
      else onMembersChange(['All', ...allMembers]);
    } else {
      let nextSelection = [...selectedMembers];
      if (nextSelection.includes('All')) nextSelection = nextSelection.filter(m => m !== 'All');
      if (nextSelection.includes(member)) nextSelection = nextSelection.filter(m => m !== member);
      else nextSelection.push(member);
      if (allMembers.every(m => nextSelection.includes(m))) nextSelection.push('All');
      onMembersChange(nextSelection);
    }
  };

  const getLabel = () => {
    if (selectedMembers.includes('All')) return 'All Callers';
    if (selectedMembers.length === 0) return 'Select Callers';
    if (selectedMembers.length === 1) return selectedMembers[0];
    return `${selectedMembers.length} Callers`;
  };

  const totals = data.reduce((acc, curr) => ({
    gsSuccessful: acc.gsSuccessful + curr.gsSuccessful,
    successful: acc.successful + curr.successful,
    totalSuccessful: acc.totalSuccessful + curr.totalSuccessful,
    assigned: acc.assigned + curr.assigned,
    attempted: acc.attempted + curr.attempted,
    notAttempted: acc.notAttempted + curr.notAttempted,
    abandoned: acc.abandoned + curr.abandoned,
  }), {
    gsSuccessful: 0,
    successful: 0,
    totalSuccessful: 0,
    assigned: 0,
    attempted: 0,
    notAttempted: 0,
    abandoned: 0,
  });

  const totalAttemptedPerc = totals.assigned > 0 ? Math.round((totals.attempted / totals.assigned) * 100) : 0;
  const totalSolvencyPerc = totals.assigned > 0 ? Math.round((totals.totalSuccessful / totals.assigned) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 flex flex-col h-full transition-all hover:shadow-md">
      <div className="bg-indigo-900 border-b border-indigo-800 p-4 flex justify-between items-center relative z-20 shrink-0">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            Lead Conversion Report
            <span className="text-indigo-300 font-medium text-xs px-2 py-0.5 bg-indigo-950/50 rounded-full border border-indigo-700/50 tracking-wider">REALTIME</span>
          </h3>
          
          <div className="relative" ref={dropdownRef}>
             <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center justify-between min-w-[180px] max-w-[240px] px-3 py-2 text-sm text-indigo-100 bg-indigo-950/40 border border-indigo-700 rounded-lg hover:bg-indigo-950/60 focus:outline-none shadow-sm transition-all active:scale-95">
                <span className="flex items-center truncate">
                   <Users className="w-4 h-4 mr-2 text-indigo-400 shrink-0" />
                   <span className="truncate font-semibold">{getLabel()}</span>
                </span>
                <ChevronDown className={`w-4 h-4 ml-2 text-indigo-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
             </button>

             {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-1 max-h-80 overflow-y-auto custom-scrollbar border border-indigo-50">
                   <div className="flex items-center px-4 py-2.5 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 group" onClick={() => handleToggle('All')}>
                      <div className={`w-4 h-4 rounded-md border mr-3 flex items-center justify-center transition-colors ${selectedMembers.includes('All') ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'}`}>
                         {selectedMembers.includes('All') && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm text-gray-700 font-bold">All Callers</span>
                   </div>
                   {allMembers.map((member) => (
                      <div key={member} className="flex items-center px-4 py-2.5 hover:bg-indigo-50 cursor-pointer group" onClick={() => handleToggle(member)}>
                         <div className={`w-4 h-4 rounded-md border mr-3 flex items-center justify-center transition-colors ${selectedMembers.includes(member) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'}`}>
                            {selectedMembers.includes(member) && <Check className="w-3 h-3 text-white" />}
                         </div>
                         <span className="text-sm text-gray-700">{member}</span>
                      </div>
                   ))}
                </div>
             )}
          </div>
      </div>

      <div className="overflow-x-auto">
        {/* Fixed height to show approx 10 rows (10 * 42px approx + headers) */}
        <div className="max-h-[480px] overflow-y-auto custom-scrollbar relative z-10 scroll-smooth">
          <table className="min-w-full text-[11px] md:text-xs border-separate border-spacing-0">
            <thead className="sticky top-0 z-10">
              <tr className="bg-indigo-800 text-white font-bold uppercase tracking-widest text-[10px]">
                <th colSpan={3} className="border-b border-r border-indigo-700 p-2 text-left bg-indigo-800">Agent Details</th>
                <th className="border-b border-r border-indigo-700 py-2 text-center bg-indigo-800">Date Ref</th>
                <th className="border-b border-r border-indigo-700 py-2 text-center bg-indigo-800">Shift</th>
                <th colSpan={3} className="border-b border-r border-indigo-700 py-2 text-center text-sm bg-indigo-800/90 backdrop-blur-sm">Success Metrics</th>
                <th colSpan={5} className="border-b border-r border-indigo-700 py-2 text-center text-sm bg-indigo-800/90 backdrop-blur-sm">Conversion / Solvency</th>
                <th className="border-b border-indigo-700 p-2 bg-indigo-800">Loss</th>
              </tr>
              <tr className="bg-indigo-700 text-white text-center font-bold uppercase tracking-tight text-[10px] leading-tight">
                <th className="border-b border-r border-indigo-600 p-2 w-10 sticky top-[42px] z-20 bg-indigo-700">#</th>
                <th className="border-b border-r border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">Timing</th>
                <th className="border-b border-r border-indigo-600 p-2 min-w-[140px] sticky top-[42px] z-20 bg-indigo-700 text-left">Agent Name</th>
                <th className="border-b border-r border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">Attnd's</th>
                <th className="border-b border-r border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">Type</th>
                <th className="border-b border-r border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">GS Success</th>
                <th className="border-b border-r border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">Success</th>
                <th className="border-b border-r border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">Total</th>
                <th className="border-b border-r border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">Assigned</th>
                <th className="border-b border-r border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">Attempted</th>
                <th className="border-b border-r border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">Not Att.</th>
                <th className="border-b border-r border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">Att %</th>
                <th className="border-b border-r border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">Solv %</th>
                <th className="border-b border-indigo-600 p-2 sticky top-[42px] z-20 bg-indigo-700">Aband.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-50">
              {data.map((row, index) => (
                <tr key={row.id} className="text-center text-gray-800 font-medium bg-white hover:bg-indigo-50/50 transition-colors group">
                  <td className="border-r border-gray-100 p-2.5 font-bold text-gray-400 group-hover:text-indigo-600">{index + 1}</td>
                  <td className="border-r border-gray-100 p-2.5 text-[10px] text-gray-500">{row.shiftTiming}</td>
                  <td className="border-r border-gray-100 p-2.5 text-left font-bold tracking-tight text-gray-900">{row.name}</td>
                  <td className="border-r border-gray-100 p-2.5">
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${row.attendance === 'P' ? 'bg-green-100 text-green-700 font-bold' : 'bg-red-100 text-red-700 font-bold'}`}>{row.attendance}</span>
                  </td>
                  <td className="border-r border-gray-100 p-2.5 italic text-gray-500">{row.type}</td>
                  <td className="border-r border-gray-100 p-2.5 font-bold text-indigo-600 bg-indigo-50/20">{row.gsSuccessful}</td>
                  <td className="border-r border-gray-100 p-2.5 font-bold text-indigo-600 bg-indigo-50/20">{row.successful}</td>
                  <td className="border-r border-gray-100 p-2.5 font-bold text-indigo-900 bg-indigo-100/30">{row.totalSuccessful}</td>
                  <td className="border-r border-gray-100 p-2.5 text-gray-600">{row.assigned}</td>
                  <td className="border-r border-gray-100 p-2.5 text-gray-600">{row.attempted}</td>
                  <td className="border-r border-gray-100 p-2.5 text-red-400 font-bold">{row.notAttempted}</td>
                  <td className="border-r border-gray-100 p-2.5 font-bold text-indigo-500">{row.attemptedPerc}%</td>
                  <td className="border-r border-gray-100 p-2.5 font-bold text-emerald-600">{row.solvencyPerc}%</td>
                  <td className="p-2.5 text-amber-600 font-bold">{row.abandoned}</td>
                </tr>
              ))}
              {data.length === 0 && (
                  <tr><td colSpan={14} className="p-20 text-center text-gray-400 font-medium italic">No performance data found for selected callers.</td></tr>
              )}
            </tbody>
            <tfoot className="font-bold text-white sticky bottom-0 z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] backdrop-blur-md">
              <tr className="bg-indigo-900/95">
                 <td className="p-2 text-center text-[9px] opacity-40">#</td>
                 <td className="p-2 text-center text-[9px] opacity-40">#</td>
                 <td className="border-r border-indigo-800 p-2 text-left uppercase text-[10px] tracking-wider">TEAM AGGREGATE</td>
                 <td className="border-r border-indigo-800 p-2"></td>
                 <td className="border-r border-indigo-800 p-2"></td>
                 <td className="border-r border-indigo-800 p-2 text-center text-indigo-200">{totals.gsSuccessful}</td>
                 <td className="border-r border-indigo-800 p-2 text-center text-indigo-200">{totals.successful}</td>
                 <td className="border-r border-indigo-800 p-2 text-center text-white text-sm">{totals.totalSuccessful}</td>
                 <td className="border-r border-indigo-800 p-2 text-center">{totals.assigned}</td>
                 <td className="border-r border-indigo-800 p-2 text-center">{totals.attempted}</td>
                 <td className="border-r border-indigo-800 p-2 text-center text-red-300">{totals.notAttempted}</td>
                 <td className="border-r border-indigo-800 p-2 text-center text-indigo-300">{totalAttemptedPerc}%</td>
                 <td className="border-r border-indigo-800 p-2 text-center text-emerald-400">{totalSolvencyPerc}%</td>
                 <td className="p-2 text-center text-amber-300">{totals.abandoned}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-[10px] text-gray-400 font-bold uppercase flex justify-between items-center shrink-0">
          <span>Active Dataset: {data.length} Agents</span>
          {data.length > 10 && <span className="flex items-center gap-1">Drag slider for more data <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" /></span>}
      </div>
    </div>
  );
};

export default LeadConversionTable;
