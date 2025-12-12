import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { BacklogData } from '../types';

interface Props {
  data: BacklogData[];
}

const BreakdownChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <h3 className="text-center text-gray-800 font-medium mb-6">Backlog Breakdown</h3>
      
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: -20,
              bottom: 20,
            }}
            barSize={40}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 0 }} 
              axisLine={false} 
              tickLine={false} 
              height={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#9ca3af' }}
            />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom X Axis Labels / Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-center">
         {data.map((entry, index) => (
          <div key={index} className="flex items-center justify-center">
             <span 
              className="w-2 h-2 rounded-full mr-1 lg:hidden" 
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-[10px] md:text-xs text-gray-500 whitespace-nowrap">{entry.name}</span>
          </div>
        ))}
      </div>
      
       <div className="mt-2 flex justify-center gap-3">
         {/* Additional legend row for visual balance matching screenshot */}
         <div className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-1 bg-[#3b82f6]"></span>
            <span className="text-xs text-gray-500">Deferred Start</span>
         </div>
         <div className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-1 bg-[#a855f7]"></span>
            <span className="text-xs text-gray-500">Miscellaneous</span>
         </div>
       </div>

    </div>
  );
};

export default BreakdownChart;