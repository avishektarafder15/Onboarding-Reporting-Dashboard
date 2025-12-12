import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DailyTrendData } from '../types';

interface Props {
  data: DailyTrendData[];
}

const DailyTrendChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <h3 className="text-center text-gray-800 font-medium mb-6">Daily Trend Analysis</h3>
      
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#6b7280' }} 
              axisLine={false} 
              tickLine={false}
              padding={{ left: 20, right: 20 }}
            />
            {/* Left Y-Axis for Counts (Successful, Follow-up) */}
            <YAxis 
              yAxisId="left"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              label={{ value: 'Count', angle: -90, position: 'insideLeft', offset: 0, style: { fill: '#9ca3af', fontSize: 12 } }}
            />
            {/* Right Y-Axis for Talk Time */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              label={{ value: 'Talk Time (min)', angle: 90, position: 'insideRight', offset: 10, style: { fill: '#9ca3af', fontSize: 12 } }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="talkTime" 
              name="Talk Time (min)" 
              stroke="#6366f1" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="successful" 
              name="Successful Calls" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
             <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="followUp" 
              name="Follow Up" 
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyTrendChart;