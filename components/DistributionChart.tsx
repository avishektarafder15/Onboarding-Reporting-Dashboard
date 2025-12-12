import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { BacklogData } from '../types';

interface Props {
  data: BacklogData[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
        <div className="flex items-center mb-1">
          <div 
            className="w-2 h-2 rounded-full mr-2" 
            style={{ backgroundColor: data.color }}
          />
          <span className="text-sm font-medium text-gray-900">{data.name}</span>
        </div>
        <div className="text-xs text-gray-500 pl-4">
          Count: <span className="font-semibold text-gray-700">{data.value}</span>
        </div>
      </div>
    );
  }
  return null;
};

const DistributionChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <h3 className="text-center text-gray-800 font-medium mb-6">Backlog Distribution</h3>
      
      <div className="flex-1 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="white"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center">
            <span 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-xs text-gray-500">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributionChart;