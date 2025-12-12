import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TeamMemberPerformance } from '../types';

interface Props {
  data: TeamMemberPerformance[];
}

const OutcomeDistributionChart: React.FC<Props> = ({ data }) => {
  // Aggregate data for the pie chart
  const aggregatedData = data.reduce((acc, curr) => {
      acc.gsSuccessful += curr.gsSuccessful;
      acc.successful += curr.successful;
      acc.followUp += (curr.followUp || 0);
      acc.notReachable += curr.notReachable;
      acc.pending += curr.pending;
      return acc;
  }, { gsSuccessful: 0, successful: 0, followUp: 0, notReachable: 0, pending: 0 });

  const chartData = [
      { name: 'GS Success', value: aggregatedData.gsSuccessful, color: '#f59e0b' },
      { name: 'Success', value: aggregatedData.successful, color: '#10b981' },
      { name: 'Follow Up', value: aggregatedData.followUp, color: '#3b82f6' },
      { name: 'Not Reachable', value: aggregatedData.notReachable, color: '#ef4444' },
      { name: 'Pending', value: aggregatedData.pending, color: '#6b7280' },
  ].filter(item => item.value > 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <h3 className="text-gray-800 font-medium mb-4 text-center text-sm">Overall Distribution</h3>
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
    </div>
  );
};

export default OutcomeDistributionChart;