import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TeamMemberPerformance } from '../types';

interface Props {
  data: TeamMemberPerformance[];
}

const AgentPerformanceChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <h3 className="text-gray-800 font-medium mb-4 text-center text-sm">Agent Performance Comparison</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10, fill: '#6b7280' }} 
              interval={0} 
              angle={-45} 
              textAnchor="end" 
              height={70} 
            />
            <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} 
            />
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            <Bar dataKey="talkTimeMinutes" name="Talk Time (min)" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="attempts" name="Attempts" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="totalSuccessful" name="Successful" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgentPerformanceChart;