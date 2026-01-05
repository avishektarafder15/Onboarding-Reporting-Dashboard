import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LeadConversionData } from '../types';

interface Props {
  data: LeadConversionData[];
}

const LeadConversionPieChart: React.FC<Props> = ({ data }) => {
  // Aggregate data
  const totals = data.reduce((acc, curr) => ({
    attempted: acc.attempted + curr.attempted,
    notAttempted: acc.notAttempted + curr.notAttempted,
  }), { attempted: 0, notAttempted: 0 });

  const chartData = [
    { name: 'Attempted', value: totals.attempted, color: '#3b82f6' },
    { name: 'Not Attempted', value: totals.notAttempted, color: '#ef4444' },
  ].filter(item => item.value > 0);

  // Calculate percentages for custom label
  const total = totals.attempted + totals.notAttempted;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <h3 className="text-gray-800 font-medium mb-4 text-center text-sm">Overall Attempts vs Not Attempted</h3>
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="white"
              strokeWidth={2}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                // Custom label logic for percentage inside/near pie
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                return (
                  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10} fontWeight="bold">
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} 
            />
            <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-2">
         <span className="text-xs text-gray-500">Total Assigned: {total}</span>
      </div>
    </div>
  );
};

export default LeadConversionPieChart;