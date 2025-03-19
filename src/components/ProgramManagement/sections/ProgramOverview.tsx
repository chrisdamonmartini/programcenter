import React from 'react';
import { ProgramOverview as ProgramOverviewType } from '../../../mockupData/programManagementData';

interface ProgramOverviewProps {
  data: ProgramOverviewType;
}

const ProgramOverview: React.FC<ProgramOverviewProps> = ({ data }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track':
        return 'bg-green-100 text-green-800';
      case 'At Risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'Behind Schedule':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{data.programName}</h2>
          <p className="text-gray-600">Phase: {data.programPhase}</p>
        </div>
        <div className={`px-4 py-2 rounded-full ${getStatusColor(data.status)}`}>
          {data.status}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Timeline Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Program Timeline</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Start Date:</span>
              <span className="font-medium">{new Date(data.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">End Date:</span>
              <span className="font-medium">{new Date(data.endDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Budget Status */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Budget Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Budget:</span>
              <span className="font-medium">${(data.budgetStatus.totalBudget / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Spent:</span>
              <span className="font-medium">${(data.budgetStatus.spent / 1000000).toFixed(1)}M</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining:</span>
              <span className="font-medium">${(data.budgetStatus.remaining / 1000000).toFixed(1)}M</span>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${data.budgetStatus.percentageComplete}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-gray-600 mt-1">
                {data.budgetStatus.percentageComplete}% Complete
              </div>
            </div>
          </div>
        </div>

        {/* Key Milestones */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Key Milestones</h3>
          <div className="space-y-4">
            {data.keyMilestones.map((milestone, index) => (
              <div key={index} className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {new Date(milestone.date).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {milestone.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramOverview; 