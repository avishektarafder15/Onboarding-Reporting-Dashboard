import React from 'react';
import { TeamMemberPerformance } from '../types';
import TeamMemberSelector from './TeamMemberSelector';

interface Props {
  data: TeamMemberPerformance[];
  allMembers: string[];
  selectedMembers: string[];
  onMemberSelectionChange: (members: string[]) => void;
}

const TeamPerformanceTable: React.FC<Props> = ({ 
  data, 
  allMembers, 
  selectedMembers, 
  onMemberSelectionChange
}) => {
  // Calculate totals for footer
  const totals = data.reduce((acc, curr) => ({
    talkTimeMinutes: acc.talkTimeMinutes + curr.talkTimeMinutes,
    gsSuccessful: acc.gsSuccessful + curr.gsSuccessful,
    successful: acc.successful + curr.successful,
    totalSuccessful: acc.totalSuccessful + curr.totalSuccessful,
    attempts: acc.attempts + curr.attempts,
    followUp: acc.followUp + (curr.followUp || 0),
    notReachable: acc.notReachable + curr.notReachable,
    pending: acc.pending + curr.pending
  }), {
    talkTimeMinutes: 0,
    gsSuccessful: 0,
    successful: 0,
    totalSuccessful: 0,
    attempts: 0,
    followUp: 0,
    notReachable: 0,
    pending: 0
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-200 bg-gray-50 gap-4">
           <div className="flex items-center gap-8">
               <div className="flex items-center gap-2">
                   <span className="font-bold text-gray-900">Report Date</span>
               </div>
               <div className="flex items-center gap-2">
                   <span className="font-bold text-gray-900">10-12-2025</span>
               </div>
           </div>
           
           <div className="flex items-center gap-3">
             <TeamMemberSelector 
                members={allMembers}
                selectedMembers={selectedMembers}
                onChange={onMemberSelectionChange}
             />
           </div>
       </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-300">
              <th className="px-4 py-2 text-center font-bold text-gray-900 border-r border-gray-200 min-w-[150px]">Name</th>
              <th className="px-4 py-2 text-center font-bold text-gray-900 border-r border-gray-200">Attendance</th>
              <th className="px-4 py-2 text-center font-bold text-gray-900 border-r border-gray-200">Talk Time ( in Time Format )</th>
              <th className="px-4 py-2 text-center font-bold text-gray-900 border-r border-gray-200">Talk Time ( in Minutes )</th>
              <th className="px-4 py-2 text-center font-bold text-gray-900 border-r border-gray-200">GS-Successful</th>
              <th className="px-4 py-2 text-center font-bold text-gray-900 border-r border-gray-200">Successful</th>
              <th className="px-4 py-2 text-center font-bold text-gray-900 border-r border-gray-200">Total Successful Call</th>
              <th className="px-4 py-2 text-center font-bold text-gray-900 border-r border-gray-200">Attempts</th>
              <th className="px-4 py-2 text-center font-bold text-gray-900 border-r border-gray-200">Follow Up</th>
              <th className="px-4 py-2 text-center font-bold text-gray-900 border-r border-gray-200">Not Reachable</th>
              <th className="px-4 py-2 text-center font-bold text-gray-900">Pending</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, index) => {
              const isAbsent = row.attendance !== 'P';
              const rowClass = isAbsent ? 'bg-[#ff8080] text-black' : 'bg-white text-gray-900 hover:bg-gray-50';
              
              return (
                <tr key={index} className={`${rowClass} border-b border-gray-200`}>
                  <td className="px-4 py-1.5 text-center border-r border-gray-200/50">{row.name}</td>
                  <td className="px-4 py-1.5 text-center border-r border-gray-200/50">{row.attendance}</td>
                  <td className="px-4 py-1.5 text-center border-r border-gray-200/50">{row.talkTimeFormatted}</td>
                  <td className="px-4 py-1.5 text-center border-r border-gray-200/50">{row.talkTimeMinutes}</td>
                  <td className="px-4 py-1.5 text-center border-r border-gray-200/50">{row.gsSuccessful}</td>
                  <td className="px-4 py-1.5 text-center border-r border-gray-200/50">{row.successful}</td>
                  <td className="px-4 py-1.5 text-center border-r border-gray-200/50">{row.totalSuccessful}</td>
                  <td className="px-4 py-1.5 text-center border-r border-gray-200/50">{row.attempts}</td>
                  <td className="px-4 py-1.5 text-center border-r border-gray-200/50">{row.followUp}</td>
                  <td className="px-4 py-1.5 text-center border-r border-gray-200/50">{row.notReachable}</td>
                  <td className="px-4 py-1.5 text-center">{row.pending}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-white font-bold text-gray-900 border-t-2 border-gray-300">
             <tr>
                <td className="px-4 py-2 text-center border-r border-gray-200">Team Total</td>
                <td className="px-4 py-2 border-r border-gray-200"></td>
                <td className="px-4 py-2 text-center border-r border-gray-200">49:38:54</td> 
                <td className="px-4 py-2 text-center border-r border-gray-200">{totals.talkTimeMinutes}</td>
                <td className="px-4 py-2 text-center border-r border-gray-200">{totals.gsSuccessful}</td>
                <td className="px-4 py-2 text-center border-r border-gray-200">{totals.successful}</td>
                <td className="px-4 py-2 text-center border-r border-gray-200">{totals.totalSuccessful}</td>
                <td className="px-4 py-2 text-center border-r border-gray-200">{totals.attempts}</td>
                <td className="px-4 py-2 text-center border-r border-gray-200">{totals.followUp}</td>
                <td className="px-4 py-2 text-center border-r border-gray-200">{totals.notReachable}</td>
                <td className="px-4 py-2 text-center">{totals.pending}</td>
             </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default TeamPerformanceTable;