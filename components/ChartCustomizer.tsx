import React, { useState, useEffect } from 'react';
import { X, Check, Settings2, BarChart3, TrendingUp, PieChart as PieIcon, AreaChart as AreaIcon, Info, HelpCircle } from 'lucide-react';
import { ChartConfig, ChartType } from '../types';

interface Props {
  config: ChartConfig | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (config: ChartConfig) => void;
}

const AXIS_OPTIONS = [
  { value: 'name', label: 'Member Name' },
  { value: 'date', label: 'Date' },
  { value: 'talkTimeMinutes', label: 'Talk Time (Min)' },
  { value: 'gsSuccessful', label: 'GS Success' },
  { value: 'successful', label: 'Success' },
  { value: 'totalSuccessful', label: 'Total Success' },
  { value: 'attempts', label: 'Attempts' },
  { value: 'followUp', label: 'Follow Up' },
  { value: 'notReachable', label: 'Not Reachable' },
  { value: 'pending', label: 'Pending' },
  { value: 'value', label: 'Metric Value' },
  { value: 'calculatedValue', label: 'Calculated Logic' },
];

const CHART_TYPES: { value: ChartType; label: string; icon: any }[] = [
  { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
  { value: 'line', label: 'Line Chart', icon: TrendingUp },
  { value: 'pie', label: 'Pie Chart', icon: PieIcon },
  { value: 'area', label: 'Area Chart', icon: AreaIcon },
];

const ChartCustomizer: React.FC<Props> = ({ config, isOpen, onClose, onApply }) => {
  const [localConfig, setLocalConfig] = useState<ChartConfig | null>(null);

  useEffect(() => {
    if (config) setLocalConfig(JSON.parse(JSON.stringify(config)));
  }, [config, isOpen]);

  if (!isOpen || !localConfig) return null;

  const handleSeriesChange = (index: number, field: string, value: any) => {
    const updatedSeries = [...localConfig.series];
    updatedSeries[index] = { ...updatedSeries[index], [field]: value };
    setLocalConfig({ ...localConfig, series: updatedSeries });
  };

  // Logic is enabled if either X or Y axis is set to use the calculated value
  const isLogicEnabled = localConfig.xAxisKey === 'calculatedValue' || localConfig.yAxisKey === 'calculatedValue';

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Settings2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-800">Chart Settings</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar pb-32">
          {/* Section: Basic Info */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Chart Display Name</span>
              <input 
                type="text" 
                value={localConfig.title} 
                placeholder="Enter chart name..."
                onChange={(e) => setLocalConfig({...localConfig, title: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-shadow bg-gray-50"
              />
            </label>

            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Visualization Style</span>
              <div className="grid grid-cols-2 gap-2">
                {CHART_TYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setLocalConfig({...localConfig, type: type.value})}
                    className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-sm transition-all ${
                      localConfig.type === type.value 
                        ? 'bg-indigo-600 border-indigo-600 text-white font-semibold shadow-lg shadow-indigo-100' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <type.icon className={`w-4 h-4 ${localConfig.type === type.value ? 'text-white' : 'text-gray-400'}`} />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Axis Configuration */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Data Mapping</h3>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-semibold text-gray-600 mb-1.5 block">X-Axis (Label)</span>
                <select 
                  value={localConfig.xAxisKey}
                  onChange={(e) => setLocalConfig({...localConfig, xAxisKey: e.target.value})}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  {AXIS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-semibold text-gray-600 mb-1.5 block">Y-Axis (Value)</span>
                <select 
                  value={localConfig.yAxisKey || ''}
                  onChange={(e) => setLocalConfig({...localConfig, yAxisKey: e.target.value})}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                >
                  <option value="">Default (Auto)</option>
                  {AXIS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </label>
            </div>
          </div>

          {/* Section: Logic */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    Calculated Formulas
                    <HelpCircle className="w-3.5 h-3.5 text-gray-300" />
                </span>
                {!isLogicEnabled && (
                    <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium border border-amber-100">
                        Select "Calculated Logic" in Axis to enable
                    </span>
                )}
            </div>
            
            <div className="relative">
                <textarea 
                  rows={3}
                  placeholder="e.g. (successful / attempts) * 100"
                  value={localConfig.calculatedLogic}
                  disabled={!isLogicEnabled}
                  onChange={(e) => setLocalConfig({...localConfig, calculatedLogic: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-xl outline-none text-sm font-mono transition-all duration-200 ${
                    isLogicEnabled 
                      ? 'border-indigo-200 bg-indigo-50/30 focus:ring-2 focus:ring-indigo-500 text-indigo-900' 
                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                  }`}
                />
                {!isLogicEnabled && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="bg-white/80 px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-2">
                        <Info className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500 font-medium italic">Calculated field disabled</span>
                     </div>
                  </div>
                )}
            </div>
            {isLogicEnabled && (
                <div className="text-[10px] text-gray-400 font-medium bg-gray-50 p-2 rounded-lg border border-dashed border-gray-200">
                    Available variables: <code className="text-indigo-600">successful</code>, <code className="text-indigo-600">attempts</code>, <code className="text-indigo-600">talkTimeMinutes</code>, etc.
                </div>
            )}
          </div>

          {/* Section: Series Customization */}
          {localConfig.series.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Series Properties</h3>
              <div className="space-y-3">
                {localConfig.series.map((s, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl space-y-3 border border-gray-100 group transition-all hover:bg-white hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-900 truncate max-w-[200px]">{s.name || 'Untitled Series'}</span>
                      <label className="flex items-center gap-2 cursor-pointer group/toggle">
                        <span className="text-[10px] font-bold text-gray-400 group-hover/toggle:text-indigo-600 transition-colors uppercase">Active</span>
                        <input 
                          type="checkbox" 
                          checked={!s.hidden} 
                          onChange={(e) => handleSeriesChange(idx, 'hidden', !e.target.checked)}
                          className="w-4 h-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500 transition-all cursor-pointer"
                        />
                      </label>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="block text-[10px] text-gray-400 mb-1 font-bold uppercase tracking-tighter">Alias</label>
                        <input 
                          type="text" 
                          value={s.name} 
                          onChange={(e) => handleSeriesChange(idx, 'name', e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg outline-none bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                      </div>
                      <div className="w-16">
                        <label className="block text-[10px] text-gray-400 mb-1 font-bold uppercase tracking-tighter">Hex</label>
                        <div className="relative h-9 w-full">
                           <input 
                            type="color" 
                            value={s.color} 
                            onChange={(e) => handleSeriesChange(idx, 'color', e.target.value)}
                            className="absolute inset-0 w-full h-full cursor-pointer rounded-lg border border-gray-200 p-1 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Global Toggle Section */}
          <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-100">
              <input 
                type="checkbox" 
                checked={localConfig.showTooltip} 
                onChange={(e) => setLocalConfig({...localConfig, showTooltip: e.target.checked})}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-bold text-gray-700">Tooltips</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-100">
              <input 
                type="checkbox" 
                checked={localConfig.showLegend} 
                onChange={(e) => setLocalConfig({...localConfig, showLegend: e.target.checked})}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-bold text-gray-700">Legend</span>
            </label>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white fixed bottom-0 w-[420px]">
          <button 
            onClick={() => onApply(localConfig)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
          >
            <Check className="w-5 h-5" />
            Save Configuration
          </button>
        </div>
      </div>
    </>
  );
};

export default ChartCustomizer;