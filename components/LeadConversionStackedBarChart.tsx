import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { LeadConversionData } from '../types';

interface Props {
  data: LeadConversionData[];
}

const LeadConversionStackedBarChart: React.FC<Props> = ({ data }) => {
  // Transform data to ensure segments sum up to Total Assigned
  // Order of stack (bottom to top): GS Success -> Success -> Attempted (No Success) -> Not Attempted
  const chartData = data.map(item => ({
    name: item.name,
    gsSuccessful: item.gsSuccessful,
    successful: item.successful,
    // Attempts that didn't result in a "success" metric
    attemptedNoSuccess: Math.max(0, item.attempted - item.totalSuccessful), 
    notAttempted: item.notAttempted,
    assigned: item.assigned
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <h3 className="text-gray-800 font-medium mb-4 text-center text-sm">Lead Assignment Breakdown</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10, fill: '#6b7280' }} 
              interval={0} 
              angle={-45} 
              textAnchor="end" 
              height={70} 
            />
            <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} label={{ value: 'Leads', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 12 }}/>
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} 
            />
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            
            {/* Stacked Bars */}
            <Bar dataKey="gsSuccessful" stackId="a" name="GS Success" fill="#15803d" />
            <Bar dataKey="successful" stackId="a" name="Success" fill="#22c55e" />
            <Bar dataKey="attemptedNoSuccess" stackId="a" name="Attempted (No Success)" fill="#60a5fa" />
            <Bar dataKey="notAttempted" stackId="a" name="Not Attempted" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadConversionStackedBarChart;