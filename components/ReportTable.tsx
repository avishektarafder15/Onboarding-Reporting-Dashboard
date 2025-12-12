import React from 'react';

const ReportTable: React.FC = () => {
  const data = [
    { label: 'Eligible Entries Current Day', value: 48 },
    { label: 'Same Day Successful calls', value: 2 },
    { label: 'Successful Entries from backlog', value: 28 },
    { label: 'Total Successful calls for the day', value: 30, separator: true },
    // Backlog Section
    { label: 'Backlog', isHeader: true },
    { label: 'On Hold', value: 6 },
    { label: 'Follow Up', value: 55 },
    { label: 'Not Reachable', value: 40 },
    { label: 'Pending ( Entries Allocated by System )', value: 38 },
    { label: 'Call Drop', value: 4 },
    { label: 'Deferred Start', value: 99 },
    { label: 'Miscellaneous', value: 2 },
    { label: 'Eligible Entries for 10-12-2025', value: 85, highlight: true },
    { label: 'Total', value: 244, bold: true },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="p-4 border-b border-gray-100 text-center bg-gray-50/50 rounded-t-lg">
        <h3 className="font-semibold text-gray-800 underline decoration-gray-400 underline-offset-4">Daily Backlog Report 11-12-2025</h3>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <ul className="space-y-0">
          {data.map((item, index) => {
            if (item.isHeader) {
              return (
                <li key={index} className="py-2 text-center border-b border-gray-100 mt-2 mb-2">
                  <span className="font-bold text-gray-800 underline text-sm">{item.label}</span>
                </li>
              );
            }

            return (
              <li 
                key={index} 
                className={`flex justify-between items-center py-3 px-4 text-sm 
                  ${item.separator ? 'border-b-2 border-gray-200 mb-2' : 'border-b border-gray-50'}
                  ${index % 2 === 0 && !item.separator && !item.bold ? 'bg-gray-50/30' : ''}
                  ${item.highlight ? 'text-red-500 font-medium' : 'text-gray-700'}
                  ${item.bold ? 'font-bold text-gray-900 text-base mt-2' : ''}
                `}
              >
                <span className="italic">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ReportTable;