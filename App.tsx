
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Filters from './components/Filters';
import ReportTable from './components/ReportTable';
import DistributionChart from './components/DistributionChart';
import DailyPerformanceChart from './components/DailyPerformanceChart';
import TrendChart from './components/TrendChart';
import TeamPerformanceTable from './components/TeamPerformanceTable';
import AgentPerformanceChart from './components/AgentPerformanceChart';
import OutcomeBreakdownChart from './components/OutcomeBreakdownChart';
import OutcomeDistributionChart from './components/OutcomeDistributionChart';
import DailyTrendChart from './components/DailyTrendChart';
import CallbackTable from './components/CallbackTable';
import LeadConversionTable from './components/LeadConversionTable';
import LeadConversionStackedBarChart from './components/LeadConversionStackedBarChart';
import LeadConversionAgentChart from './components/LeadConversionAgentChart';
import LeadConversionPieChart from './components/LeadConversionPieChart';
import ChartCustomizer from './components/ChartCustomizer';
import UniversalChart from './components/UniversalChart';
import { Plus, GripVertical, Layout } from 'lucide-react';
import { BacklogData, PerformanceData, TrendData, TeamMemberPerformance, DailyTrendData, CallbackData, LeadConversionData, ChartConfig } from './types';

interface Widget {
  id: string;
  type: string;
  gridClass: string;
}

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [editingChartId, setEditingChartId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [activeResizeMenu, setActiveResizeMenu] = useState<string | null>(null);

  const [chartConfigs, setChartConfigs] = useState<Record<string, ChartConfig>>({
    'daily-perf': {
      id: 'daily-perf',
      title: 'Daily Performance Overview',
      type: 'bar',
      xAxisKey: 'name',
      series: [
        { key: 'Eligible', name: 'Eligible Entries', color: '#6366f1' },
        { key: 'Same-day', name: 'Same-day Success', color: '#8b5cf6' },
        { key: 'Backlog Success', name: 'Backlog Success', color: '#ec4899' },
        { key: 'Total Success', name: 'Total Success', color: '#10b981' },
      ],
      showTooltip: true,
      showLegend: false
    },
    'backlog-dist': {
      id: 'backlog-dist',
      title: 'Backlog Distribution',
      type: 'pie',
      xAxisKey: 'name',
      series: [
        { key: 'On Hold', name: 'On Hold', color: '#F59E0B' },
        { key: 'Follow Up', name: 'Follow Up', color: '#10B981' },
        { key: 'Not Reachable', name: 'Not Reachable', color: '#EF4444' },
        { key: 'Pending', name: 'Pending', color: '#3B82F6' },
        { key: 'Call Drop', name: 'Call Drop', color: '#EC4899' },
        { key: 'Deferred Start', name: 'Deferred Start', color: '#8B5CF6' },
        { key: 'Miscellaneous', name: 'Miscellaneous', color: '#6B7280' },
      ],
      showTooltip: true,
      showLegend: true
    }
  });

  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'report-table', type: 'report-table', gridClass: 'lg:col-span-4' },
    { id: 'daily-perf', type: 'chart', gridClass: 'lg:col-span-4' },
    { id: 'backlog-dist', type: 'chart', gridClass: 'lg:col-span-4' },
    { id: 'trend-7-days', type: 'trend-7-days', gridClass: 'lg:col-span-12' },
    { id: 'team-performance', type: 'team-performance', gridClass: 'lg:col-span-12' },
    { id: 'agent-perf-comp', type: 'agent-perf-comp', gridClass: 'lg:col-span-4' },
    { id: 'outcome-breakdown', type: 'outcome-breakdown', gridClass: 'lg:col-span-4' },
    { id: 'outcome-dist', type: 'outcome-dist', gridClass: 'lg:col-span-4' },
    { id: 'daily-trend-analysis', type: 'daily-trend-analysis', gridClass: 'lg:col-span-12' },
    { id: 'callback-report', type: 'callback-report', gridClass: 'lg:col-span-12' },
    { id: 'lead-conversion-report', type: 'lead-conversion-report', gridClass: 'lg:col-span-12' },
    { id: 'lead-stacked-bar', type: 'lead-stacked-bar', gridClass: 'lg:col-span-4' },
    { id: 'lead-agent-metrics', type: 'lead-agent-metrics', gridClass: 'lg:col-span-4' },
    { id: 'lead-pie-attempts', type: 'lead-pie-attempts', gridClass: 'lg:col-span-4' },
  ]);

  const performanceData: PerformanceData[] = [
    { name: 'Eligible', fullLabel: 'Eligible Entries (Today)', value: 48, color: '#6366f1' },
    { name: 'Same-day', fullLabel: 'Same-day Successful Calls', value: 2, color: '#8b5cf6' },
    { name: 'Backlog Success', fullLabel: 'Successful from Backlog', value: 28, color: '#ec4899' },
    { name: 'Total Success', fullLabel: 'Total Successful Calls', value: 30, color: '#10b981' },
  ];

  const backlogData: BacklogData[] = [
    { name: 'On Hold', value: 6, color: '#F59E0B' },
    { name: 'Follow Up', value: 55, color: '#10B981' },
    { name: 'Not Reachable', value: 40, color: '#EF4444' },
    { name: 'Pending', value: 38, color: '#3B82F6' },
    { name: 'Call Drop', value: 4, color: '#EC4899' },
    { name: 'Deferred Start', value: 99, color: '#8B5CF6' },
    { name: 'Miscellaneous', value: 2, color: '#6B7280' },
  ];

  const trendData: TrendData[] = [
    { date: 'Nov 05', backlog: 265, successful: 25, eligible: 80 },
    { date: 'Nov 06', backlog: 258, successful: 22, eligible: 75 },
    { date: 'Nov 07', backlog: 260, successful: 35, eligible: 92 },
    { date: 'Nov 08', backlog: 255, successful: 28, eligible: 88 },
    { date: 'Nov 09', backlog: 250, successful: 15, eligible: 65 },
    { date: 'Nov 10', backlog: 248, successful: 32, eligible: 82 },
    { date: 'Nov 11', backlog: 244, successful: 30, eligible: 85 },
  ];

  const teamPerformanceData: TeamMemberPerformance[] = [
    { name: 'Ritu Narula', attendance: 'WO', talkTimeFormatted: '00:00:00', talkTimeMinutes: 0, gsSuccessful: 0, successful: 0, totalSuccessful: 0, attempts: 0, followUp: 0, notReachable: 0, pending: 1 },
    { name: 'Surendiranath SL', attendance: 'P', talkTimeFormatted: '06:27:06', talkTimeMinutes: 387, gsSuccessful: 0, successful: 8, totalSuccessful: 8, attempts: 38, followUp: 4, notReachable: 12, pending: 0 },
    { name: 'Mohammad Faiz', attendance: 'P', talkTimeFormatted: '01:46:55', talkTimeMinutes: 107, gsSuccessful: 0, successful: 2, totalSuccessful: 2, attempts: 10, followUp: 0, notReachable: 1, pending: 0 },
    { name: 'Sujata Trikha', attendance: 'P', talkTimeFormatted: '02:36:38', talkTimeMinutes: 156, gsSuccessful: 0, successful: 2, totalSuccessful: 2, attempts: 15, followUp: 4, notReachable: 1, pending: 7 },
    { name: 'Suganya M', attendance: 'P', talkTimeFormatted: '07:01:34', talkTimeMinutes: 421, gsSuccessful: 2, successful: 6, totalSuccessful: 8, attempts: 29, followUp: 4, notReachable: 1, pending: 0 },
    { name: 'Tanushri Srivastava', attendance: 'L', talkTimeFormatted: '00:00:00', talkTimeMinutes: 0, gsSuccessful: 0, successful: 0, totalSuccessful: 0, attempts: 0, followUp: 0, notReachable: 0, pending: 4 },
    { name: 'Ashween Middha', attendance: 'P', talkTimeFormatted: '02:48:25', talkTimeMinutes: 168, gsSuccessful: 0, successful: 5, totalSuccessful: 5, attempts: 18, followUp: 1, notReachable: 4, pending: 7 },
    { name: 'Sohini Malakar', attendance: 'P', talkTimeFormatted: '05:49:15', talkTimeMinutes: 349, gsSuccessful: 0, successful: 6, totalSuccessful: 6, attempts: 24, followUp: 1, notReachable: 9, pending: 4 },
    { name: 'Jyothi Ganta', attendance: 'P', talkTimeFormatted: '03:36:37', talkTimeMinutes: 216, gsSuccessful: 0, successful: 4, totalSuccessful: 4, attempts: 24, followUp: 7, notReachable: 2, pending: 2 },
    { name: 'Ankush Kumari', attendance: 'P', talkTimeFormatted: '05:25:19', talkTimeMinutes: 325, gsSuccessful: 0, successful: 5, totalSuccessful: 5, attempts: 20, followUp: 4, notReachable: 1, pending: 3 },
    { name: 'Durrain Shahwar', attendance: 'P', talkTimeFormatted: '04:46:25', talkTimeMinutes: 286, gsSuccessful: 0, successful: 4, totalSuccessful: 4, attempts: 14, followUp: 2, notReachable: 3, pending: 2 },
    { name: 'Mayank Mathuria', attendance: 'P', talkTimeFormatted: '04:49:41', talkTimeMinutes: 289, gsSuccessful: 1, successful: 5, totalSuccessful: 6, attempts: 20, followUp: 4, notReachable: 1, pending: 7 },
    { name: 'Adeeba Sheik', attendance: 'P', talkTimeFormatted: '04:30:59', talkTimeMinutes: 271, gsSuccessful: 0, successful: 4, totalSuccessful: 4, attempts: 31, followUp: 4, notReachable: 8, pending: 1 },
  ];

  const callbackDataRaw: CallbackData[] = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    course: [
      'Master of Corporate Law', 
      'Executive Certificate in IP', 
      'Cyber Law Specialization', 
      'Contract Drafting Course',
      'Diploma in M&A',
      'Media and Entertainment Law'
    ][i % 6],
    email: `student${i + 1}@example.com`,
    caller: teamPerformanceData[i % teamPerformanceData.length].name,
    lawSikhoTime: `${10 + (i % 8)}:${(i * 7) % 60} AM`,
    skillArbitrageTime: `${11 + (i % 8)}:${(i * 12) % 60} AM`,
  }));

  const leadConversionDataRaw: LeadConversionData[] = Array.from({ length: 20 }, (_, i) => {
    const member = teamPerformanceData[i % teamPerformanceData.length];
    return {
      id: i + 1,
      shiftTiming: '09:00-18:00',
      name: member.name,
      attendance: member.attendance,
      type: i % 3 === 0 ? 'PTE' : 'FTE',
      gsSuccessful: Math.floor(Math.random() * 5),
      successful: Math.floor(Math.random() * 10),
      totalSuccessful: Math.floor(Math.random() * 15),
      assigned: 40 + Math.floor(Math.random() * 20),
      attempted: 20 + Math.floor(Math.random() * 15),
      notAttempted: 5 + Math.floor(Math.random() * 10),
      attemptedPerc: 60 + Math.floor(Math.random() * 30),
      solvencyPerc: 10 + Math.floor(Math.random() * 20),
      abandoned: Math.floor(Math.random() * 5),
    };
  });

  const allTeamMembers = useMemo(() => Array.from(new Set(teamPerformanceData.map(item => item.name))), [teamPerformanceData]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>(['All Team Members', ...allTeamMembers]);

  const filteredTeamPerformance = useMemo(() => {
    return teamPerformanceData.filter(member => {
        if (selectedTeamMembers.includes('All Team Members')) return true;
        return selectedTeamMembers.includes(member.name);
    });
  }, [teamPerformanceData, selectedTeamMembers]);

  const dailyTrendData: DailyTrendData[] = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date('2025-11-01'); 
      date.setDate(date.getDate() + i);
      const randomMultiplier = 0.7 + Math.random() * 0.6;
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        talkTime: Math.floor(2800 * randomMultiplier),
        successful: Math.floor(28 * randomMultiplier),
        followUp: Math.floor(45 * randomMultiplier),
      };
    });
  }, []);

  const filteredCallbackData = useMemo(() => {
    return callbackDataRaw.filter(item => {
      if (selectedTeamMembers.includes('All Team Members')) return true;
      return selectedTeamMembers.includes(item.caller);
    });
  }, [selectedTeamMembers, callbackDataRaw]);

  const filteredLeadConversionData = useMemo(() => {
    return leadConversionDataRaw.filter(item => {
      if (selectedTeamMembers.includes('All Team Members')) return true;
      return selectedTeamMembers.includes(item.name);
    });
  }, [selectedTeamMembers, leadConversionDataRaw]);

  const handleApplyConfig = (newConfig: ChartConfig) => {
    setChartConfigs(prev => ({ ...prev, [newConfig.id]: newConfig }));
    setEditingChartId(null);
  };

  const handleDeleteChart = (id: string) => {
    setChartConfigs(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setWidgets(prev => prev.filter(w => w.id !== id));
  };

  const handleAddChart = () => {
    const newId = `chart-${Date.now()}`;
    const newConfig: ChartConfig = {
      id: newId,
      title: 'New Analytical Insight',
      type: 'bar',
      xAxisKey: 'name',
      yAxisKey: 'calculatedValue',
      calculatedLogic: '(successful / attempts) * 100',
      series: [{ key: 'calculatedValue', name: 'Percentage', color: '#10b981' }],
      showTooltip: true,
      showLegend: true
    };
    setChartConfigs(prev => ({ ...prev, [newId]: newConfig }));
    setWidgets(prev => [{ id: newId, type: 'custom-chart', gridClass: 'lg:col-span-4' }, ...prev]);
    setEditingChartId(newId);
  };

  const handleResizeWidget = (id: string, gridClass: string) => {
    setWidgets(prev => prev.map(w => w.id === id ? { ...w, gridClass } : w));
    setActiveResizeMenu(null);
  };

  const onDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    setDragOverIndex(index);
  };

  const onDrop = (e: React.DragEvent) => {
    if (draggedIndex === null || dragOverIndex === null) return;
    const newWidgets = [...widgets];
    const itemToMove = newWidgets.splice(draggedIndex, 1)[0];
    newWidgets.splice(dragOverIndex, 0, itemToMove);
    setWidgets(newWidgets);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case 'report-table': return <ReportTable />;
      case 'chart':
        if (widget.id === 'daily-perf') return <DailyPerformanceChart data={performanceData} config={chartConfigs['daily-perf']} onEdit={() => setEditingChartId('daily-perf')} />;
        if (widget.id === 'backlog-dist') return <DistributionChart data={backlogData} config={chartConfigs['backlog-dist']} onEdit={() => setEditingChartId('backlog-dist')} />;
        return null;
      case 'custom-chart':
        const customConfig = chartConfigs[widget.id];
        if (!customConfig) return null;
        return <UniversalChart config={customConfig} data={filteredTeamPerformance} onEdit={() => setEditingChartId(customConfig.id)} onDelete={() => handleDeleteChart(customConfig.id)} isCustom />;
      case 'trend-7-days': return <TrendChart data={trendData} />;
      case 'team-performance': return <TeamPerformanceTable data={filteredTeamPerformance} allMembers={allTeamMembers} selectedMembers={selectedTeamMembers} onMemberSelectionChange={setSelectedTeamMembers} />;
      case 'agent-perf-comp': return <AgentPerformanceChart data={filteredTeamPerformance} />;
      case 'outcome-breakdown': return <OutcomeBreakdownChart data={filteredTeamPerformance} />;
      case 'outcome-dist': return <OutcomeDistributionChart data={filteredTeamPerformance} />;
      case 'daily-trend-analysis': return <DailyTrendChart data={dailyTrendData} />;
      case 'callback-report': return <CallbackTable data={filteredCallbackData} />;
      case 'lead-conversion-report': return <LeadConversionTable data={filteredLeadConversionData} allMembers={allTeamMembers} selectedMembers={selectedTeamMembers} onMembersChange={setSelectedTeamMembers} />;
      case 'lead-stacked-bar': return <LeadConversionStackedBarChart data={filteredLeadConversionData} />;
      case 'lead-agent-metrics': return <LeadConversionAgentChart data={filteredLeadConversionData} />;
      case 'lead-pie-attempts': return <LeadConversionPieChart data={filteredLeadConversionData} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6] overflow-hidden relative" onClick={() => setActiveResizeMenu(null)}>
      <Sidebar isOpen={isSidebarOpen} />
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <div className={`flex-1 flex flex-col h-full w-full transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-auto p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Filters />
            <div className="flex justify-center mb-8">
               <button onClick={handleAddChart} className="flex items-center gap-2 px-6 py-3 bg-white border border-indigo-200 text-indigo-700 font-bold rounded-full shadow-lg hover:bg-indigo-50 transition-all transform hover:scale-105 active:scale-95">
                  <Plus className="w-5 h-5" />
                  Add custom analytics chart
               </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
              {widgets.map((widget, index) => (
                <div key={widget.id} draggable onDragStart={(e) => onDragStart(e, index)} onDragOver={(e) => onDragOver(e, index)} onDrop={onDrop}
                  className={`relative group transition-all duration-200 ${widget.gridClass} ${draggedIndex === index ? 'opacity-30' : ''} ${dragOverIndex === index ? 'border-2 border-dashed border-indigo-400 rounded-lg bg-indigo-50/50' : 'border-2 border-transparent'}`}
                >
                  <div className="absolute top-2 right-2 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative">
                      <button onClick={(e) => { e.stopPropagation(); setActiveResizeMenu(activeResizeMenu === widget.id ? null : widget.id); }} className="bg-white p-1.5 rounded border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-500 transition-colors">
                        <Layout className="w-4 h-4" />
                      </button>
                      {activeResizeMenu === widget.id && (
                        <div className="absolute top-full right-0 mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-30 overflow-hidden" onClick={e => e.stopPropagation()}>
                           {[ { label: '1/3 Width', class: 'lg:col-span-4' }, { label: '1/2 Width', class: 'lg:col-span-6' }, { label: '2/3 Width', class: 'lg:col-span-8' }, { label: 'Full Width', class: 'lg:col-span-12' } ].map((size) => (
                             <button key={size.class} onClick={() => handleResizeWidget(widget.id, size.class)} className={`w-full text-left px-3 py-1.5 text-xs hover:bg-indigo-50 transition-colors flex items-center justify-between ${widget.gridClass === size.class ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-gray-600'}`}>
                               {size.label} {widget.gridClass === size.class && <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />}
                             </button>
                           ))}
                        </div>
                      )}
                    </div>
                    <div className="bg-white p-1.5 rounded border border-gray-200 shadow-sm cursor-move text-gray-400 hover:text-indigo-600 transition-colors">
                      <GripVertical className="w-4 h-4" />
                    </div>
                  </div>
                  {renderWidget(widget)}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <ChartCustomizer isOpen={!!editingChartId} config={editingChartId ? chartConfigs[editingChartId] : null} onClose={() => setEditingChartId(null)} onApply={handleApplyConfig} />
    </div>
  );
};

export default App;
