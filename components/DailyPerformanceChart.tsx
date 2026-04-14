
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { PerformanceData, ChartConfig } from '../types';

interface Props {
  data: PerformanceData[];
  config: ChartConfig;
  onEdit: () => void;
}

const DailyPerformanceChart: React.FC<Props> = ({ data, config, onEdit }) => {
  return (
    <div 
      onClick={onEdit}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full cursor-pointer hover:border-indigo-300 transition-all hover:shadow-md group"
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-center text-gray-800 font-medium flex-1">{config.title}</h3>
      </div>
      
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            barSize={50}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey={config.xAxisKey} 
              tick={{ fontSize: 11, fill: '#6b7280' }} 
              axisLine={false} 
              tickLine={false}
              interval={0}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
            />
            {config.showTooltip && (
              <Tooltip 
                cursor={{ fill: '#f9fafb' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            )}
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => {
                const seriesConfig = config.series.find(s => s.key === entry.name);
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={seriesConfig?.color || entry.color} 
                    style={{ opacity: seriesConfig?.hidden ? 0.1 : 1 }}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyPerformanceChart;
