import React from 'react';
import { LeadConversionData } from '../types';

interface Props {
  data: LeadConversionData[];
  allMembers: string[];
  selectedMember: string;
  onMemberChange: (member: string) => void;
}

const LeadConversionTable: React.FC<Props> = ({ 
  data, 
  allMembers,
  selectedMember,
  onMemberChange
}) => {
  // Calculate Totals based on filtered data
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-6">
      {/* Header with Filter */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">Lead Conversion Report</h3>
          
          <div className="flex items-center gap-2">
             <label htmlFor="lead-caller-select" className="text-sm font-medium text-gray-700">Caller Name:</label>
             <select 
                id="lead-caller-select"
                value={selectedMember}
                onChange={(e) => onMemberChange(e.target.value)}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 block px-3 py-1.5 outline-none shadow-sm"
             >
                <option value="All">All</option>
                {allMembers.map(member => (
                    <option key={member} value={member}>{member}</option>
                ))}
             </select>
          </div>
      </div>

      <div className="overflow-x-auto">
        {/* Scrollable Container (approx 10 rows height) */}
        <div className="max-h-[450px] overflow-y-auto custom-scrollbar relative">
          <table className="min-w-full text-xs border-collapse border border-gray-200">
            <thead className="sticky top-0 z-10 shadow-sm">
              {/* Top Header Row */}
              <tr className="bg-indigo-800 text-white font-bold">
                <th colSpan={3} className="border border-indigo-700 p-1"></th>
                <th className="border border-indigo-700 py-1 text-center">10-12-2025</th>
                <th className="border border-indigo-700 py-1 text-center">-</th>
                <th colSpan={3} className="border border-indigo-700 py-1 text-center text-sm">Successful Calls</th>
                <th colSpan={5} className="border border-indigo-700 py-1 text-center text-sm">
                  Total Leads Assigned & Conversion / Solvency %
                </th>
                <th className="border border-indigo-700 p-1"></th>
              </tr>
              
              {/* Column Headers */}
              <tr className="bg-indigo-700 text-white text-center font-semibold text-[10px] md:text-xs leading-tight">
                <th className="border border-indigo-600 p-2 w-10">S.N</th>
                <th className="border border-indigo-600 p-2">Shift Timing</th>
                <th className="border border-indigo-600 p-2 min-w-[120px]">Name</th>
                <th className="border border-indigo-600 p-2">Attnd's</th>
                <th className="border border-indigo-600 p-2">FTE/PTE</th>
                
                <th className="border border-indigo-600 p-2">GS Successful Calls</th>
                <th className="border border-indigo-600 p-2">Successful Call</th>
                <th className="border border-indigo-600 p-2">Total Successful Call</th>
                
                <th className="border border-indigo-600 p-2">Total Entries Assigned (in Individual's Bucket)</th>
                <th className="border border-indigo-600 p-2">Total Entries Attempted / Day</th>
                <th className="border border-indigo-600 p-2">Total Entries Not Attempted / Day</th>
                <th className="border border-indigo-600 p-2">Total Entries Attempted %</th>
                <th className="border border-indigo-600 p-2">Successful Call Solvency %</th>
                
                <th className="border border-indigo-600 p-2">Abandoned/Missed Follow Up Calls till Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id} className="text-center text-gray-800 font-medium odd:bg-white even:bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                  <td className="border border-gray-200 p-2">{index + 1}</td>
                  <td className="border border-gray-200 p-2">{row.shiftTiming}</td>
                  <td className="border border-gray-200 p-2 text-left">{row.name}</td>
                  <td className="border border-gray-200 p-2">{row.attendance}</td>
                  <td className="border border-gray-200 p-2">{row.type}</td>
                  
                  <td className="border border-gray-200 p-2">{row.gsSuccessful}</td>
                  <td className="border border-gray-200 p-2">{row.successful}</td>
                  <td className="border border-gray-200 p-2 font-semibold text-indigo-700">{row.totalSuccessful}</td>
                  
                  <td className="border border-gray-200 p-2">{row.assigned}</td>
                  <td className="border border-gray-200 p-2">{row.attempted}</td>
                  <td className="border border-gray-200 p-2">{row.notAttempted}</td>
                  <td className="border border-gray-200 p-2">{row.attemptedPerc}%</td>
                  <td className="border border-gray-200 p-2">{row.solvencyPerc}%</td>
                  
                  <td className="border border-gray-200 p-2">{row.abandoned}</td>
                </tr>
              ))}
              {data.length === 0 && (
                  <tr><td colSpan={14} className="p-4 text-center text-gray-500">No data available for selected filter.</td></tr>
              )}
            </tbody>
            {/* Footer Totals */}
            <tfoot className="font-bold text-white sticky bottom-0 z-10 shadow-md">
              <tr className="bg-indigo-800">
                 <td className="border border-indigo-700 p-2 text-center">#</td>
                 <td className="border border-indigo-700 p-2 text-center">#</td>
                 <td className="border border-indigo-700 p-2 text-center">Team Total</td>
                 <td className="border border-indigo-700 p-2"></td>
                 <td className="border border-indigo-700 p-2"></td>
                 
                 <td className="border border-indigo-700 p-2 text-center">{totals.gsSuccessful}</td>
                 <td className="border border-indigo-700 p-2 text-center">{totals.successful}</td>
                 <td className="border border-indigo-700 p-2 text-center">{totals.totalSuccessful}</td>
                 
                 <td className="border border-indigo-700 p-2 text-center">{totals.assigned}</td>
                 <td className="border border-indigo-700 p-2 text-center">{totals.attempted}</td>
                 <td className="border border-indigo-700 p-2 text-center">{totals.notAttempted}</td>
                 <td className="border border-indigo-700 p-2 text-center">{totalAttemptedPerc}%</td>
                 <td className="border border-indigo-700 p-2 text-center">{totalSolvencyPerc}%</td>
                 
                 <td className="border border-indigo-700 p-2 text-center">{totals.abandoned}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeadConversionTable;