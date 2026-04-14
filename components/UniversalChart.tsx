import React, { useMemo } from 'react';
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, Cell, 
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { ChartConfig } from '../types';
import { Edit2, Trash2 } from 'lucide-react';

interface Props {
  config: ChartConfig;
  data: any[];
  onEdit: () => void;
  onDelete?: () => void;
  isCustom?: boolean;
}

const UniversalChart: React.FC<Props> = ({ config, data, onEdit, onDelete, isCustom }) => {
  const chartData = useMemo(() => {
    if (!config.calculatedLogic) {
      return data;
    }

    // Basic logic parser for simple expressions like (successful / attempts) * 100
    return data.map(item => {
      const newItem = { ...item };
      try {
        // Simple replace for common keys to make them accessible in the expression
        let logic = config.calculatedLogic || '';
        // Prioritize specific keys
        const keys = [
          'talkTimeMinutes', 'gsSuccessful', 'successful', 
          'totalSuccessful', 'attempts', 'followUp', 
          'notReachable', 'pending', 'value'
        ];
        
        keys.forEach(key => {
          const val = item[key] ?? 0;
          const regex = new RegExp(`\\b${key}\\b`, 'g');
          logic = logic.replace(regex, val.toString());
        });
        
        // eslint-disable-next-line no-new-func
        const result = new Function(`return ${logic}`)();
        newItem.calculatedValue = isFinite(result) ? result : 0;
      } catch (e) {
        newItem.calculatedValue = 0;
      }
      return newItem;
    });
  }, [data, config.calculatedLogic]);

  const renderChart = () => {
    const visibleSeries = config.series.filter(s => !s.hidden);
    
    // Check if we need to use 'calculatedValue' based on configuration
    const isUsingCalculated = config.xAxisKey === 'calculatedValue' || config.yAxisKey === 'calculatedValue';
    
    // Map the series keys. If using calculated logic, we override the key to the calculated field.
    const effectiveSeries = isUsingCalculated 
      ? visibleSeries.map(s => ({ ...s, key: 'calculatedValue' }))
      : visibleSeries;

    // Use the first effective series as the value source if YAxisKey is not specifically set
    const valueKey = config.yAxisKey || (effectiveSeries[0]?.key);

    switch (config.type) {
      case 'bar':
        return (
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey={config.xAxisKey} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            {config.showTooltip && <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />}
            {config.showLegend && <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />}
            {effectiveSeries.map(s => (
              <Bar key={s.key} dataKey={s.key} name={s.name} fill={s.color} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey={config.xAxisKey} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            {config.showTooltip && <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />}
            {config.showLegend && <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />}
            {effectiveSeries.map(s => (
              <Line key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            ))}
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey={config.xAxisKey} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            {config.showTooltip && <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />}
            {config.showLegend && <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />}
            {effectiveSeries.map(s => (
              <Area key={s.key} type="monotone" dataKey={s.key} name={s.name} stroke={s.color} fill={s.color} fillOpacity={0.3} />
            ))}
          </AreaChart>
        );
      case 'pie':
        // For Pie, xAxisKey is the LABEL and effectiveSeries key is the VALUE
        const pieData = chartData.map(item => ({
            name: item[config.xAxisKey] || 'N/A',
            value: Number(item[valueKey]) || 0
        })).filter(d => d.value > 0);

        return (
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
              stroke="white"
              strokeWidth={2}
            >
              {pieData.map((entry: any, index: number) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={effectiveSeries[index % effectiveSeries.length]?.color || '#6366f1'} 
                />
              ))}
            </Pie>
            {config.showTooltip && <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />}
            {config.showLegend && <Legend wrapperStyle={{ fontSize: '10px' }} />}
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full group relative transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-800 font-medium text-center flex-1">{config.title}</h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
                className="p-1.5 hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 rounded transition-colors"
                title="Edit Configuration"
            >
                <Edit2 className="w-3.5 h-3.5" />
            </button>
            {isCustom && onDelete && (
                <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded transition-colors"
                    title="Delete Chart"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
      </div>
      
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart() || <div className="flex items-center justify-center h-full text-gray-400 text-xs italic">No data to display</div>}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UniversalChart;