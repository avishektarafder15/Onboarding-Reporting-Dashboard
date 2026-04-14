
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { BacklogData, ChartConfig } from '../types';

interface Props {
  data: BacklogData[];
  config: ChartConfig;
  onEdit: () => void;
}

const DistributionChart: React.FC<Props> = ({ data, config, onEdit }) => {
  const visibleSeriesKeys = config.series.filter(s => !s.hidden).map(s => s.key);
  const filteredData = data.filter(d => visibleSeriesKeys.includes(d.name));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      const s = config.series.find(ser => ser.key === d.name);
      return (
        <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-lg">
          <div className="flex items-center mb-1">
            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: s?.color || d.color }} />
            <span className="text-sm font-medium text-gray-900">{s?.name || d.name}</span>
          </div>
          <div className="text-xs text-gray-500 pl-4">
            Count: <span className="font-semibold text-gray-700">{d.value}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      onClick={onEdit}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full cursor-pointer hover:border-indigo-300 transition-all hover:shadow-md"
    >
      <h3 className="text-center text-gray-800 font-medium mb-6">{config.title}</h3>
      
      <div className="flex-1 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="white"
              strokeWidth={2}
            >
              {filteredData.map((entry, index) => {
                const s = config.series.find(ser => ser.key === entry.name);
                return <Cell key={`cell-${index}`} fill={s?.color || entry.color} />;
              })}
            </Pie>
            {config.showTooltip && <Tooltip content={<CustomTooltip />} />}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {config.showLegend && (
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {filteredData.map((entry, index) => {
            const s = config.series.find(ser => ser.key === entry.name);
            return (
              <div key={index} className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: s?.color || entry.color }}></span>
                <span className="text-xs text-gray-500">{s?.name || entry.name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DistributionChart;
