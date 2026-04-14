
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronDown, Check, Users } from 'lucide-react';
import { CallbackData } from '../types';

interface Props {
  data: CallbackData[];
}

const CallbackTable: React.FC<Props> = ({ data }) => {
  const [selectedCallers, setSelectedCallers] = useState<string[]>(['All']);
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

  const uniqueCallers = useMemo(() => {
    const callers = new Set(data.map(item => item.caller));
    return Array.from(callers).sort();
  }, [data]);

  const handleToggle = (caller: string) => {
    if (caller === 'All') {
      if (selectedCallers.includes('All')) setSelectedCallers([]);
      else setSelectedCallers(['All', ...uniqueCallers]);
    } else {
      let nextSelection = [...selectedCallers];
      if (nextSelection.includes('All')) nextSelection = nextSelection.filter(c => c !== 'All');
      if (nextSelection.includes(caller)) nextSelection = nextSelection.filter(c => c !== caller);
      else nextSelection.push(caller);
      if (uniqueCallers.every(c => nextSelection.includes(c))) nextSelection.push('All');
      setSelectedCallers(nextSelection);
    }
  };

  const getLabel = () => {
    if (selectedCallers.includes('All')) return 'All Callers';
    if (selectedCallers.length === 0) return 'Select Callers';
    if (selectedCallers.length === 1) return selectedCallers[0];
    return `${selectedCallers.length} Callers`;
  };

  const filteredData = useMemo(() => {
    if (selectedCallers.includes('All')) return data;
    return data.filter(item => selectedCallers.includes(item.caller));
  }, [data, selectedCallers]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 flex flex-col h-full transition-all hover:shadow-md">
       <div className="bg-gray-50/50 border-b border-gray-200 p-4 flex justify-between items-center relative z-20 shrink-0">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
             Callback Report <span className="text-gray-400 font-medium text-xs px-2 py-0.5 bg-gray-200/50 rounded-full">11-12-2025</span>
          </h3>

          <div className="flex items-center gap-3">
             <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center justify-between min-w-[180px] max-w-[240px] px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none shadow-sm transition-all active:scale-95">
                   <span className="flex items-center truncate">
                      <Users className="w-4 h-4 mr-2 text-indigo-400 shrink-0" />
                      <span className="truncate font-semibold">{getLabel()}</span>
                   </span>
                   <ChevronDown className={`w-4 h-4 ml-2 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                   <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-1 max-h-80 overflow-y-auto custom-scrollbar border border-indigo-50">
                      <div className="flex items-center px-4 py-2.5 hover:bg-indigo-50 cursor-pointer border-b border-gray-100 group" onClick={() => handleToggle('All')}>
                         <div className={`w-4 h-4 rounded-md border mr-3 flex items-center justify-center transition-colors ${selectedCallers.includes('All') ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'}`}>
                            {selectedCallers.includes('All') && <Check className="w-3 h-3 text-white" />}
                         </div>
                         <span className="text-sm text-gray-700 font-bold">All Callers</span>
                      </div>
                      {uniqueCallers.map((caller) => (
                         <div key={caller} className="flex items-center px-4 py-2.5 hover:bg-indigo-50 cursor-pointer group" onClick={() => handleToggle(caller)}>
                            <div className={`w-4 h-4 rounded-md border mr-3 flex items-center justify-center transition-colors ${selectedCallers.includes(caller) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 group-hover:border-indigo-400'}`}>
                               {selectedCallers.includes(caller) && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm text-gray-700">{caller}</span>
                         </div>
                      ))}
                   </div>
                )}
             </div>
          </div>
       </div>
       
       <div className="overflow-x-auto">
         {/* Fixed height to show roughly 10 rows (10 * 42px = 420px approx) */}
         <div className="max-h-[420px] overflow-y-auto custom-scrollbar relative z-10 scroll-smooth">
             <table className="min-w-full text-xs md:text-sm border-separate border-spacing-0">
               <thead className="sticky top-0 z-10 bg-indigo-50 shadow-sm">
                 <tr className="text-indigo-900 font-bold uppercase tracking-tighter text-[10px]">
                   <th className="border-b border-r border-indigo-100 px-3 py-3 w-16 text-center bg-indigo-50/90 backdrop-blur-md">Sr No.</th>
                   <th className="border-b border-r border-indigo-100 px-4 py-3 text-left min-w-[300px] bg-indigo-50/90 backdrop-blur-md">Course Name</th>
                   <th className="border-b border-r border-indigo-100 px-4 py-3 text-left bg-indigo-50/90 backdrop-blur-md">Student Email</th>
                   <th className="border-b border-r border-indigo-100 px-4 py-3 text-center bg-indigo-50/90 backdrop-blur-md">Welcome Caller</th>
                   <th className="border-b border-r border-indigo-100 px-4 py-3 text-center bg-indigo-50/90 backdrop-blur-md">LawSikho Time</th>
                   <th className="border-b border-indigo-100 px-4 py-3 text-center bg-indigo-50/90 backdrop-blur-md">Skill Arbitrage Time</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                 {filteredData.map((row, index) => (
                   <tr key={row.id} className="hover:bg-indigo-50/30 bg-white transition-colors group">
                     <td className="border-r border-gray-100 px-3 py-2.5 text-center font-bold text-gray-400 group-hover:text-indigo-600">{index + 1}</td>
                     <td className="border-r border-gray-100 px-4 py-2.5 italic text-gray-600 font-medium">{row.course}</td>
                     <td className="border-r border-gray-100 px-4 py-2.5 font-semibold text-gray-800 tracking-tight">{row.email}</td>
                     <td className="border-r border-gray-100 px-4 py-2.5 text-center text-gray-600">{row.caller}</td>
                     <td className="border-r border-gray-100 px-4 py-2.5 text-center font-bold text-gray-700 bg-gray-50/50">{row.lawSikhoTime}</td>
                     <td className="px-4 py-2.5 text-center font-bold text-gray-700 bg-gray-50/50">{row.skillArbitrageTime}</td>
                   </tr>
                 ))}
                 {filteredData.length === 0 && (
                    <tr>
                        <td colSpan={6} className="px-4 py-20 text-center">
                            <div className="flex flex-col items-center justify-center opacity-40">
                                <Users className="w-12 h-12 mb-2" />
                                <p className="text-gray-500 font-medium italic">No callback records match your criteria</p>
                            </div>
                        </td>
                    </tr>
                 )}
               </tbody>
             </table>
         </div>
       </div>
       <div className="bg-gray-50 border-t border-gray-200 px-4 py-2 text-[10px] text-gray-400 font-bold uppercase flex justify-between items-center shrink-0">
          <span>Showing {filteredData.length} records</span>
          {filteredData.length > 10 && <span className="flex items-center gap-1"><div className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" /> Use slider to see more</span>}
       </div>
    </div>
  );
};

export default CallbackTable;
