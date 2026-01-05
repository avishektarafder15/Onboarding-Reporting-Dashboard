import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { LeadConversionData } from '../types';

interface Props {
  data: LeadConversionData[];
}

const LeadConversionAgentChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <h3 className="text-gray-800 font-medium mb-4 text-center text-sm">Agent Performance Metrics</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10, fill: '#6b7280' }} 
              interval={0} 
              angle={-45} 
              textAnchor="end" 
              height={70} 
            />
            {/* Left Axis: Count */}
            <YAxis 
              yAxisId="left"
              tick={{ fontSize: 10, fill: '#6b7280' }} 
              label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 12 }}
            />
            {/* Right Axis: Percentage */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10, fill: '#6b7280' }} 
              unit="%"
              domain={[0, 100]}
              label={{ value: 'Percentage', angle: 90, position: 'insideRight', fill: '#9ca3af', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} 
            />
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
            
            <Bar yAxisId="left" dataKey="totalSuccessful" name="Total Successful" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="solvencyPerc" name="Solvency %" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="attemptedPerc" name="Attempt %" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadConversionAgentChart;