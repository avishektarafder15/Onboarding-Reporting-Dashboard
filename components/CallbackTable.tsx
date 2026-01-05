import React, { useState, useMemo, useEffect } from 'react';
import { CallbackData } from '../types';

interface Props {
  data: CallbackData[];
}

const CallbackTable: React.FC<Props> = ({ data }) => {
  const [selectedCaller, setSelectedCaller] = useState('All');

  // Get unique callers from the provided data
  // We use the full dataset passed to this component to determine available options
  // Note: if the parent filters data, this list will only show remaining callers
  const uniqueCallers = useMemo(() => {
    const callers = new Set(data.map(item => item.caller));
    return ['All', ...Array.from(callers).sort()];
  }, [data]);

  // Reset local filter if the selected option is no longer available in the new data
  useEffect(() => {
    if (selectedCaller !== 'All' && !uniqueCallers.includes(selectedCaller)) {
      setSelectedCaller('All');
    }
  }, [uniqueCallers, selectedCaller]);

  // Filter data based on local selection
  const filteredData = useMemo(() => {
    if (selectedCaller === 'All') return data;
    return data.filter(item => item.caller === selectedCaller);
  }, [data, selectedCaller]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
       {/* Top Header */}
       <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">
             Callback Report <span className="text-gray-500 font-medium text-base ml-2">11-12-2025</span>
          </h3>

          <div className="flex items-center gap-2">
             <select 
                id="caller-select"
                value={selectedCaller}
                onChange={(e) => setSelectedCaller(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block px-3 py-1.5 outline-none shadow-sm"
             >
                {uniqueCallers.map(caller => (
                    <option key={caller} value={caller}>{caller}</option>
                ))}
             </select>
          </div>
       </div>
       
       <div className="overflow-x-auto">
         {/* 
            Vertical Slider / Scroll Logic:
            Setting max-height to approx 10 rows. 
         */}
         <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
             <table className="min-w-full text-xs md:text-sm border-collapse border border-gray-200 relative">
               <thead className="sticky top-0 z-10 shadow-sm">
                 <tr className="bg-gray-100 text-gray-700 font-semibold">
                   <th className="border border-gray-200 px-3 py-3 w-16 text-center">Sr No.</th>
                   <th className="border border-gray-200 px-3 py-3 text-center min-w-[300px]">Course</th>
                   <th className="border border-gray-200 px-3 py-3 text-center">Student Email ID</th>
                   <th className="border border-gray-200 px-3 py-3 text-center whitespace-nowrap">Welcome Caller Name</th>
                   <th className="border border-gray-200 px-3 py-3 text-center whitespace-nowrap">LawSikho Callbacks Time</th>
                   <th className="border border-gray-200 px-3 py-3 text-center whitespace-nowrap">Skill Arbitrage Call Backs Time</th>
                 </tr>
               </thead>
               <tbody>
                 {filteredData.map((row, index) => (
                   <tr key={row.id} className="hover:bg-gray-50 bg-white border-b border-gray-100">
                     <td className="border border-gray-200 px-3 py-2 text-center font-medium text-gray-700">{index + 1}</td>
                     <td className="border border-gray-200 px-3 py-2 italic text-gray-600">{row.course}</td>
                     <td className="border border-gray-200 px-3 py-2 font-medium text-gray-800">{row.email}</td>
                     <td className="border border-gray-200 px-3 py-2 text-center text-gray-700">{row.caller}</td>
                     <td className="border border-gray-200 px-3 py-2 text-center font-medium text-gray-700">{row.lawSikhoTime}</td>
                     <td className="border border-gray-200 px-3 py-2 text-center font-medium text-gray-700">{row.skillArbitrageTime}</td>
                   </tr>
                 ))}
                 {filteredData.length === 0 && (
                    <tr>
                        <td colSpan={6} className="border border-gray-200 px-4 py-8 text-center text-gray-500">
                            No callback records found.
                        </td>
                    </tr>
                 )}
               </tbody>
             </table>
         </div>
       </div>
    </div>
  );
};

export default CallbackTable;