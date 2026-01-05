import React, { useState, useEffect, useMemo } from 'react';
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
import { BacklogData, PerformanceData, TrendData, TeamMemberPerformance, DailyTrendData, CallbackData, LeadConversionData } from './types';

const App: React.FC = () => {
  // Initialize sidebar state based on window width (desktop default open, mobile default closed)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set initial state based on current width
    handleResize();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 1. Daily Performance Overview Data (Static - Unaffected by table filter)
  const performanceData: PerformanceData[] = [
    { name: 'Eligible', fullLabel: 'Eligible Entries (Today)', value: 48, color: '#6366f1' }, // Indigo
    { name: 'Same-day', fullLabel: 'Same-day Successful Calls', value: 2, color: '#8b5cf6' }, // Violet
    { name: 'Backlog Success', fullLabel: 'Successful from Backlog', value: 28, color: '#ec4899' }, // Pink
    { name: 'Total Success', fullLabel: 'Total Successful Calls', value: 30, color: '#10b981' }, // Green
  ];

  // 2. Backlog Distribution Data (Static - Unaffected by table filter)
  const backlogData: BacklogData[] = [
    { name: 'On Hold', value: 6, color: '#F59E0B' }, // Amber
    { name: 'Follow Up', value: 55, color: '#10B981' }, // Emerald
    { name: 'Not Reachable', value: 40, color: '#EF4444' }, // Red
    { name: 'Pending', value: 38, color: '#3B82F6' }, // Blue
    { name: 'Call Drop', value: 4, color: '#EC4899' }, // Pink
    { name: 'Deferred Start', value: 99, color: '#8B5CF6' }, // Violet
    { name: 'Miscellaneous', value: 2, color: '#6B7280' }, // Gray
  ];

  // 3. Backlog Trend Data (Static - Unaffected by table filter)
  const trendData: TrendData[] = [
    { date: 'Nov 05', backlog: 265, successful: 25, eligible: 80 },
    { date: 'Nov 06', backlog: 258, successful: 22, eligible: 75 },
    { date: 'Nov 07', backlog: 260, successful: 35, eligible: 92 },
    { date: 'Nov 08', backlog: 255, successful: 28, eligible: 88 },
    { date: 'Nov 09', backlog: 250, successful: 15, eligible: 65 },
    { date: 'Nov 10', backlog: 248, successful: 32, eligible: 82 },
    { date: 'Nov 11', backlog: 244, successful: 30, eligible: 85 },
  ];

  // 4. Team Performance Data
  const teamPerformanceData: TeamMemberPerformance[] = [
    { name: 'Ritu Narula', attendance: 'WO', talkTimeFormatted: '00:00:00', talkTimeMinutes: 0, gsSuccessful: 0, successful: 0, totalSuccessful: 0, attempts: 0, followUp: null, notReachable: 0, pending: 1 },
    { name: 'Surendiranath SL', attendance: 'P', talkTimeFormatted: '06:27:06', talkTimeMinutes: 387, gsSuccessful: 0, successful: 8, totalSuccessful: 8, attempts: 38, followUp: 4, notReachable: 12, pending: 0 },
    { name: 'Mohammad Faiz', attendance: 'P', talkTimeFormatted: '01:46:55', talkTimeMinutes: 107, gsSuccessful: 0, successful: 2, totalSuccessful: 2, attempts: 10, followUp: null, notReachable: 1, pending: 0 },
    { name: 'Sujata Trikha', attendance: 'P', talkTimeFormatted: '02:36:38', talkTimeMinutes: 156, gsSuccessful: 0, successful: 2, totalSuccessful: 2, attempts: 15, followUp: 4, notReachable: 1, pending: 7 },
    { name: 'Suganya M', attendance: 'P', talkTimeFormatted: '07:01:34', talkTimeMinutes: 421, gsSuccessful: 2, successful: 6, totalSuccessful: 8, attempts: 29, followUp: 4, notReachable: 1, pending: 0 },
    { name: 'Tanushri Srivastava', attendance: 'L', talkTimeFormatted: '00:00:00', talkTimeMinutes: 0, gsSuccessful: 0, successful: 0, totalSuccessful: 0, attempts: 0, followUp: null, notReachable: 0, pending: 4 },
    { name: 'Ashween Middha', attendance: 'P', talkTimeFormatted: '02:48:25', talkTimeMinutes: 168, gsSuccessful: 0, successful: 5, totalSuccessful: 5, attempts: 18, followUp: 1, notReachable: 4, pending: 7 },
    { name: 'Sohini Malakar', attendance: 'P', talkTimeFormatted: '05:49:15', talkTimeMinutes: 349, gsSuccessful: 0, successful: 6, totalSuccessful: 6, attempts: 24, followUp: 1, notReachable: 9, pending: 4 },
    { name: 'Jyothi Ganta', attendance: 'P', talkTimeFormatted: '03:36:37', talkTimeMinutes: 216, gsSuccessful: 0, successful: 4, totalSuccessful: 4, attempts: 24, followUp: 7, notReachable: 2, pending: 2 },
    { name: 'Amol Gulabrao Khokale', attendance: 'WO', talkTimeFormatted: '00:00:00', talkTimeMinutes: 0, gsSuccessful: 0, successful: 0, totalSuccessful: 0, attempts: 0, followUp: null, notReachable: 0, pending: 0 },
    { name: 'Ankush Kumari', attendance: 'P', talkTimeFormatted: '05:25:19', talkTimeMinutes: 325, gsSuccessful: 0, successful: 5, totalSuccessful: 5, attempts: 20, followUp: 4, notReachable: 1, pending: 3 },
    { name: 'Durrain Shahwar', attendance: 'P', talkTimeFormatted: '04:46:25', talkTimeMinutes: 286, gsSuccessful: 0, successful: 4, totalSuccessful: 4, attempts: 14, followUp: 2, notReachable: 3, pending: 2 },
    { name: 'Mayank Mathuria', attendance: 'P', talkTimeFormatted: '04:49:41', talkTimeMinutes: 289, gsSuccessful: 1, successful: 5, totalSuccessful: 6, attempts: 20, followUp: 4, notReachable: 1, pending: 7 },
    { name: 'Adeeba Sheik', attendance: 'P', talkTimeFormatted: '04:30:59', talkTimeMinutes: 271, gsSuccessful: 0, successful: 4, totalSuccessful: 4, attempts: 31, followUp: 4, notReachable: 8, pending: 1 },
  ];

  // 6. Callback Data (Mock data based on screenshot)
  const callbackDataRaw: CallbackData[] = [
    { id: 1, course: 'Diploma in Business Laws for In-House Counsels', email: 'priyalmodi1503@gmail.com', caller: 'Adeeba Sheik', lawSikhoTime: '11:30:00', skillArbitrageTime: '' },
    { id: 2, course: 'Offer for Bootcamp on How To Build A Practice Around White Collar Crime As A Lawyer', email: 'bagadipinky2@gmail.com', caller: 'Adeeba Sheik', lawSikhoTime: '12:30:00', skillArbitrageTime: '' },
    { id: 3, course: 'Offer for Bootcamp on How To Build A Practice Around White Collar Crime As A Lawyer', email: 'niharikap357@gmail.com', caller: 'Adeeba Sheik', lawSikhoTime: '18:00:00', skillArbitrageTime: '' },
    { id: 4, course: 'Offer for Bootcamp on Remote work revolution for women', email: 'mayamenon81@gmail.com', caller: 'Adeeba Sheik', lawSikhoTime: '', skillArbitrageTime: '10:45:00' },
    { id: 5, course: 'Offer for Bootcamp on How can experienced professionals become Independent Directors', email: 'swati1bhatia@gmail.com', caller: 'Amol Gulabrao Khokale', lawSikhoTime: '', skillArbitrageTime: '15:00:00' },
    { id: 6, course: 'Offer for Bootcamp on How can experienced professionals become Independent Directors', email: 'mjsnrg@gmail.com', caller: 'Amol Gulabrao Khokale', lawSikhoTime: '', skillArbitrageTime: '21:00:00' },
    { id: 7, course: 'Diploma in Advanced Contract Drafting, Negotiation and Dispute Resolution', email: 'adv.ranjanbhoria@gmail.com', caller: 'Ankush Kumari', lawSikhoTime: '15:00:00', skillArbitrageTime: '' },
    { id: 8, course: 'Offer for Corporate Litigation and Arbitration Bootcamp', email: 'advnp27@gmail.com', caller: 'Ankush Kumari', lawSikhoTime: '16:00:00', skillArbitrageTime: '' },
    { id: 9, course: 'Offer for Bootcamp on Remote work revolution for women', email: 'harjeetkaur_99@yahoo.com', caller: 'Ankush Kumari', lawSikhoTime: '', skillArbitrageTime: '15:00:00' },
    { id: 10, course: 'Offer for Jumpstart your career in Tax Litigation, International Tax and Transfer Pricing', email: 'rajulbadjatya0511@gmail.com', caller: 'Ashween Middha', lawSikhoTime: '10:30:00', skillArbitrageTime: '' },
    { id: 11, course: 'Offer for Bootcamp on How can experienced professionals become Independent Directors', email: 'ravisankarpichaia@gmail.com', caller: 'Ashween Middha', lawSikhoTime: '', skillArbitrageTime: '10:30:00' },
    { id: 12, course: 'Offer for How to break into corporate finance and investment banking', email: 'sahilmore7224@gmail.com', caller: 'Ashween Middha', lawSikhoTime: '', skillArbitrageTime: '10:30:00' },
    { id: 13, course: 'Offer for Bootcamp on How Indian lawyers can Crack The Solicitors Qualifying Exam (SQE)', email: 'mahjabeenshamim@gmail.com', caller: 'Durrain Shahwar', lawSikhoTime: '15:00:00', skillArbitrageTime: '' },
    { id: 14, course: 'Offer for How Indian Accounting & Bookkeeping Professionals can Get US Jobs', email: 'susinkol@gmail.com', caller: 'Durrain Shahwar', lawSikhoTime: '', skillArbitrageTime: '20:00:00' },
    { id: 15, course: 'Offer for How to Pass the Advocate-on-Record (AoR) Exam and Establish Your Supreme Court Practice', email: 'deeptanshu.shukla@gmail.com', caller: 'Jyothi Ganta', lawSikhoTime: '10:30:00', skillArbitrageTime: '' },
    { id: 16, course: 'Offer for Bootcamp on Remote work revolution for women', email: 'arshiharis20@gmail.com', caller: 'Jyothi Ganta', lawSikhoTime: '', skillArbitrageTime: '12:00:00' },
    { id: 17, course: 'Offer for How to break into corporate finance and investment banking', email: 'mondalalamgir25@gmail.com', caller: 'Jyothi Ganta', lawSikhoTime: '', skillArbitrageTime: '13:00:00' },
    { id: 18, course: 'Offer for Bootcamp on Remote work revolution for women', email: 'namithashaffy@gmail.com', caller: 'Jyothi Ganta', lawSikhoTime: '', skillArbitrageTime: '15:00:00' },
    { id: 19, course: 'Offer for Turbocharge your Career: Start a consulting business or startup', email: 'srinivasavuppalla@gmail.com', caller: 'Jyothi Ganta', lawSikhoTime: '', skillArbitrageTime: '16:00:00' },
    { id: 20, course: 'Offer for How Indian Accounting & Bookkeeping Professionals can Get US Jobs', email: 'sahprem1208@gmail.com', caller: 'Jyothi Ganta', lawSikhoTime: '', skillArbitrageTime: '19:00:00' },
    { id: 21, course: 'Offer for How to make it big with Real Estate Law', email: '01jyotibips@gmail.com', caller: 'Mayank Mathuria', lawSikhoTime: '12:00:00', skillArbitrageTime: '' },
    { id: 22, course: 'Offer for bootcamp on Master Contract Drafting', email: 'mahimakalia72@gmail.com', caller: 'Mayank Mathuria', lawSikhoTime: '13:00:00', skillArbitrageTime: '' },
    { id: 23, course: 'Offer for How to Pass the Advocate-on-Record (AoR) Exam', email: 'sapnalin@rediffmail.com', caller: 'Mayank Mathuria', lawSikhoTime: '19:00:00', skillArbitrageTime: '' },
    { id: 24, course: 'Offer for Bootcamp on Build a global career as an academic content writer', email: 'panjkarthi@gmail.com', caller: 'Mayank Mathuria', lawSikhoTime: '', skillArbitrageTime: '11:00:00' },
    { id: 25, course: 'Offer for Bootcamp on How Indian lawyers can Crack The Solicitors Qualifying Exam', email: 'sourav1812@gmail.com', caller: 'Suganya M', lawSikhoTime: '18:00:00', skillArbitrageTime: '' },
    { id: 26, course: 'Offer for Bootcamp on Remote work revolution for women', email: 'bkbimba@gmail.com', caller: 'Suganya M', lawSikhoTime: '', skillArbitrageTime: '11:00:00' },
    { id: 27, course: 'Offer for Bootcamp on Remote work revolution for women', email: 'tahiyabacha@gmail.com', caller: 'Suganya M', lawSikhoTime: '', skillArbitrageTime: '12:00:00' },
    { id: 28, course: 'US Tax Compliance and Paralegal Work', email: 'deepanshkapila@gmail.com', caller: 'Sujata Trikha', lawSikhoTime: '11:30:00', skillArbitrageTime: '' },
    { id: 29, course: 'Offer for Bootcamp on Remote work revolution for women', email: 'singhsargams@gmail.com', caller: 'Sujata Trikha', lawSikhoTime: '', skillArbitrageTime: '12:00:00' },
    { id: 30, course: 'Offer for Bootcamp on Remote work revolution for women', email: 'indu.mukund@gmail.com', caller: 'Sujata Trikha', lawSikhoTime: '', skillArbitrageTime: '14:00:00' },
    { id: 31, course: 'Offer for How Indian Accounting & Bookkeeping Professionals can Get US Jobs', email: 'siddikafatma.siddiqui@gmail.com', caller: 'Sujata Trikha', lawSikhoTime: '', skillArbitrageTime: '15:00:00' },
    { id: 32, course: 'Offer for How you can use labour law skills to go from HR manager to business leader', email: 'gshveta018@gmail.com', caller: 'Surendiranath SL', lawSikhoTime: '10:00:00', skillArbitrageTime: '' },
    { id: 33, course: 'Offer for Bootcamp on Remote work revolution for women', email: 'ikshu.solutionz@gmail.com', caller: 'Surendiranath SL', lawSikhoTime: '', skillArbitrageTime: '20:00:00' },
  ];

  // 7. Lead Conversion Data (Match Screenshot Data)
  const leadConversionDataRaw: LeadConversionData[] = [
    { id: 1, shiftTiming: 'WO', name: 'Ritu Narula', attendance: 'WO', type: 'FTE', gsSuccessful: 0, successful: 0, totalSuccessful: 0, assigned: 1, attempted: 0, notAttempted: 0, attemptedPerc: 0, solvencyPerc: 0, abandoned: 0 },
    { id: 2, shiftTiming: '10 AM - 8 PM', name: 'Mohammad Faiz', attendance: 'P', type: 'FTE', gsSuccessful: 0, successful: 2, totalSuccessful: 2, assigned: 4, attempted: 2, notAttempted: 2, attemptedPerc: 50, solvencyPerc: 50, abandoned: 0 },
    { id: 3, shiftTiming: 'L', name: 'Jahangir Ahmad', attendance: 'L', type: 'FTE', gsSuccessful: 0, successful: 0, totalSuccessful: 0, assigned: 1, attempted: 0, notAttempted: 0, attemptedPerc: 0, solvencyPerc: 0, abandoned: 0 },
    { id: 4, shiftTiming: '2:00 PM-11:00 PM', name: 'Sujata Trikha', attendance: 'P', type: 'FTE', gsSuccessful: 0, successful: 2, totalSuccessful: 2, assigned: 16, attempted: 7, notAttempted: 9, attemptedPerc: 44, solvencyPerc: 13, abandoned: 0 },
    { id: 5, shiftTiming: '10 AM - 8 PM', name: 'Suganya M', attendance: 'P', type: 'FTE', gsSuccessful: 2, successful: 6, totalSuccessful: 8, assigned: 13, attempted: 13, notAttempted: 0, attemptedPerc: 100, solvencyPerc: 62, abandoned: 0 },
    { id: 6, shiftTiming: 'L', name: 'Tanushri Srivastava', attendance: 'L', type: 'FTE', gsSuccessful: 0, successful: 0, totalSuccessful: 0, assigned: 5, attempted: 0, notAttempted: 0, attemptedPerc: 0, solvencyPerc: 0, abandoned: 0 },
    { id: 7, shiftTiming: '10 AM - 8 PM', name: 'Ashween Middha', attendance: 'P', type: 'FTE', gsSuccessful: 0, successful: 5, totalSuccessful: 5, assigned: 19, attempted: 11, notAttempted: 8, attemptedPerc: 58, solvencyPerc: 26, abandoned: 0 },
    { id: 8, shiftTiming: '9 AM - 7 PM', name: 'Sohini Malakar', attendance: 'P', type: 'FTE', gsSuccessful: 0, successful: 6, totalSuccessful: 6, assigned: 21, attempted: 12, notAttempted: 9, attemptedPerc: 57, solvencyPerc: 29, abandoned: 0 },
    { id: 9, shiftTiming: '11 AM - 9 PM', name: 'Jyothi Ganta', attendance: 'P', type: 'FTE', gsSuccessful: 0, successful: 4, totalSuccessful: 4, assigned: 15, attempted: 13, notAttempted: 2, attemptedPerc: 87, solvencyPerc: 27, abandoned: 0 },
    { id: 10, shiftTiming: '2:00 PM-11:00 PM', name: 'Durrain Shahwar', attendance: 'P', type: 'FTE', gsSuccessful: 0, successful: 4, totalSuccessful: 4, assigned: 15, attempted: 8, notAttempted: 7, attemptedPerc: 53, solvencyPerc: 27, abandoned: 0 },
    { id: 11, shiftTiming: '2:30 PM-11:30 PM', name: 'Ankush Kumari', attendance: 'P', type: 'FTE', gsSuccessful: 0, successful: 5, totalSuccessful: 5, assigned: 13, attempted: 10, notAttempted: 3, attemptedPerc: 77, solvencyPerc: 38, abandoned: 0 },
    { id: 12, shiftTiming: '10 AM - 8 PM', name: 'Surendiranath SL', attendance: 'P', type: 'FTE', gsSuccessful: 0, successful: 8, totalSuccessful: 8, assigned: 24, attempted: 24, notAttempted: 0, attemptedPerc: 100, solvencyPerc: 33, abandoned: 0 },
    { id: 13, shiftTiming: '10 AM - 8 PM', name: 'Adeeba Sheik', attendance: 'P', type: 'FTE', gsSuccessful: 0, successful: 4, totalSuccessful: 4, assigned: 19, attempted: 16, notAttempted: 3, attemptedPerc: 84, solvencyPerc: 21, abandoned: 0 },
    { id: 14, shiftTiming: '10 AM - 8 PM', name: 'Mayank Mathuria', attendance: 'P', type: 'FTE', gsSuccessful: 1, successful: 5, totalSuccessful: 6, assigned: 18, attempted: 11, notAttempted: 7, attemptedPerc: 61, solvencyPerc: 33, abandoned: 0 },
    { id: 15, shiftTiming: 'WO', name: 'Amol Gulabrao Khokale', attendance: 'WO', type: 'FTE', gsSuccessful: 0, successful: 0, totalSuccessful: 0, assigned: 2, attempted: 0, notAttempted: 0, attemptedPerc: 0, solvencyPerc: 0, abandoned: 1 },
  ];

  // Extract unique team members names
  const allTeamMembers = useMemo(() => Array.from(new Set(teamPerformanceData.map(item => item.name))), [teamPerformanceData]);

  // State for selected team members - default to all
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>(['All Team Members', ...allTeamMembers]);

  // Filter logic for TeamPerformanceTable and the charts immediately following it
  const filteredTeamPerformance = teamPerformanceData.filter(member => {
    if (selectedTeamMembers.includes('All Team Members')) return true;
    return selectedTeamMembers.includes(member.name);
  });

  // Calculate participation ratio to scale the Daily Trend Data
  const participationRatio = useMemo(() => {
    if (selectedTeamMembers.includes('All Team Members')) return 1;
    if (allTeamMembers.length === 0) return 0;
    return selectedTeamMembers.length / allTeamMembers.length;
  }, [selectedTeamMembers, allTeamMembers]);

  // 5. Daily Trend Data (Generated for 30 days) - Responsive to Table Filter
  const dailyTrendData: DailyTrendData[] = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      // Start from Nov 1st
      const date = new Date('2025-11-01'); 
      date.setDate(date.getDate() + i);
      
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Base values that fluctuate
      let talkTime = isWeekend ? 800 : 2800;
      let successful = isWeekend ? 8 : 28;
      let followUp = isWeekend ? 15 : 45;

      // Use a pseudo-random multiplier based on index to keep the shape consistent but scalable
      const pseudoRandom = (seed: number) => {
          const x = Math.sin(seed * 9999);
          return x - Math.floor(x);
      }
      
      const randomMultiplier = 0.7 + pseudoRandom(i) * 0.6; // varies between 0.7x and 1.3x

      // Apply participationRatio to simulate filtering
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
        talkTime: Math.floor(talkTime * randomMultiplier * participationRatio),
        successful: Math.floor(successful * randomMultiplier * participationRatio),
        followUp: Math.floor(followUp * randomMultiplier * participationRatio),
      };
    });
  }, [participationRatio]);

  // Filter Callback Data based on selected team members
  const filteredCallbackData = useMemo(() => {
    return callbackDataRaw.filter(item => {
      if (selectedTeamMembers.includes('All Team Members')) return true;
      return selectedTeamMembers.includes(item.caller);
    });
  }, [selectedTeamMembers]);

  // Filter Lead Conversion Data (Global)
  const filteredLeadConversionData = useMemo(() => {
     return leadConversionDataRaw.filter(item => {
        if (selectedTeamMembers.includes('All Team Members')) return true;
        return selectedTeamMembers.includes(item.name);
     });
  }, [selectedTeamMembers]);

  // 8. Lead Conversion Table Specific Filter
  // This filter is specific to the "Last Table" and affects the table and graphs below it, but NOT above it.
  const [leadConversionSelectedMember, setLeadConversionSelectedMember] = useState('All');

  const uniqueLeadConversionMembers = useMemo(() => {
    // Get members available in the globally filtered dataset
    const members = new Set(filteredLeadConversionData.map(item => item.name));
    return Array.from(members).sort();
  }, [filteredLeadConversionData]);

  // Reset local filter if selected member is no longer in global filter
  useEffect(() => {
      if (leadConversionSelectedMember !== 'All' && !uniqueLeadConversionMembers.includes(leadConversionSelectedMember)) {
          setLeadConversionSelectedMember('All');
      }
  }, [uniqueLeadConversionMembers, leadConversionSelectedMember]);

  const finalLeadConversionData = useMemo(() => {
      if (leadConversionSelectedMember === 'All') return filteredLeadConversionData;
      return filteredLeadConversionData.filter(item => item.name === leadConversionSelectedMember);
  }, [filteredLeadConversionData, leadConversionSelectedMember]);


  return (
    <div className="flex h-screen bg-[#f3f4f6] overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col h-full w-full transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        <Header toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Top Filter Bar */}
            <Filters />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
              
              {/* Left Column: Data Table */}
              <div className="lg:col-span-4">
                <ReportTable />
              </div>

              {/* Right Column: Charts Area */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* Row 1: Daily Performance & Backlog Distribution (Static) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[400px]">
                  <DailyPerformanceChart data={performanceData} />
                  <DistributionChart data={backlogData} />
                </div>

                {/* Row 2: Trend Chart (Static) */}
                <div className="h-[400px]">
                  <TrendChart data={trendData} />
                </div>

              </div>
            </div>

            {/* Detailed Team Performance Table - Contains the Dropdown that affects graphs below */}
            <div className="pb-6">
              <TeamPerformanceTable 
                data={filteredTeamPerformance} 
                allMembers={allTeamMembers}
                selectedMembers={selectedTeamMembers}
                onMemberSelectionChange={setSelectedTeamMembers}
              />
            </div>

            {/* Team Charts (Side by Side) - Reactive to Table Filter */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 h-[400px]">
              <AgentPerformanceChart data={filteredTeamPerformance} />
              <OutcomeBreakdownChart data={filteredTeamPerformance} />
              <OutcomeDistributionChart data={filteredTeamPerformance} />
            </div>

            {/* Daily Trend Analysis Chart - Reactive to Table Filter */}
            <div className="h-[400px] mb-6">
              <DailyTrendChart data={dailyTrendData} />
            </div>
            
            {/* Call Back Data Table - Reactive to Table Filter */}
            <div className="mb-6">
              <CallbackTable data={filteredCallbackData} />
            </div>

            {/* Lead Conversion Summary Table - Reactive to Table Filter + Local Filter */}
            <div className="mb-6">
              <LeadConversionTable 
                 data={finalLeadConversionData} 
                 allMembers={uniqueLeadConversionMembers}
                 selectedMember={leadConversionSelectedMember}
                 onMemberChange={setLeadConversionSelectedMember}
              />
            </div>

            {/* Lead Conversion Charts - Reactive to Table Filter + Local Filter */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px] mb-6">
               <LeadConversionStackedBarChart data={finalLeadConversionData} />
               <LeadConversionAgentChart data={finalLeadConversionData} />
               <LeadConversionPieChart data={finalLeadConversionData} />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default App;