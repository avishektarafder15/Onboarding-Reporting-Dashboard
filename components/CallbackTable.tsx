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
       <div className="bg-[#dcfce7] border-b border-green-200 p-3 flex flex-wrap justify-between items-center px-4 gap-4">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-sm md:text-base">Call Back Date</span>
             </div>
             <div className="font-bold text-gray-900 text-sm md:text-base">11-12-2025</div>
          </div>

          <div className="flex items-center gap-2">
             <label htmlFor="caller-select" className="text-sm font-semibold text-gray-700">Welcome Caller Name:</label>
             <select 
                id="caller-select"
                value={selectedCaller}
                onChange={(e) => setSelectedCaller(e.target.value)}
                className="bg-white border border-green-400 text-gray-900 text-sm rounded focus:ring-green-500 focus:border-green-500 block px-2 py-1 outline-none shadow-sm"
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
            Row height is roughly 35-40px. 10 rows ~ 350-400px.
         */}
         <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
             <table className="min-w-full text-xs md:text-sm border-collapse border border-gray-300 relative">
               <thead className="sticky top-0 z-10 shadow-sm">
                 <tr className="bg-[#65a30d] text-white">
                   <th className="border border-gray-300 px-2 py-3 w-16 text-center bg-[#65a30d]">Sr No.</th>
                   <th className="border border-gray-300 px-2 py-3 text-center min-w-[300px] bg-[#65a30d]">Course</th>
                   <th className="border border-gray-300 px-2 py-3 text-center bg-[#65a30d]">Student Email ID</th>
                   <th className="border border-gray-300 px-2 py-3 text-center whitespace-nowrap bg-[#65a30d]">Welcome Caller Name</th>
                   <th className="border border-gray-300 px-2 py-3 text-center whitespace-nowrap bg-[#4d7c0f]">LawSikho Callbacks Time</th>
                   <th className="border border-gray-300 px-2 py-3 text-center whitespace-nowrap bg-[#4d7c0f]">Skill Arbitrage Call Backs Time</th>
                 </tr>
               </thead>
               <tbody>
                 {filteredData.map((row, index) => (
                   <tr key={row.id} className="hover:bg-gray-50 bg-white">
                     <td className="border border-gray-300 px-2 py-1.5 text-center font-bold text-gray-800">{index + 1}</td>
                     <td className="border border-gray-300 px-2 py-1.5 italic text-gray-700">{row.course}</td>
                     <td className="border border-gray-300 px-2 py-1.5 font-bold text-gray-800">{row.email}</td>
                     <td className="border border-gray-300 px-2 py-1.5 text-center text-gray-800">{row.caller}</td>
                     <td className="border border-gray-300 px-2 py-1.5 text-center font-bold text-gray-800">{row.lawSikhoTime}</td>
                     <td className="border border-gray-300 px-2 py-1.5 text-center font-bold text-gray-800">{row.skillArbitrageTime}</td>
                   </tr>
                 ))}
                 {filteredData.length === 0 && (
                    <tr>
                        <td colSpan={6} className="border border-gray-300 px-4 py-8 text-center text-gray-500">
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