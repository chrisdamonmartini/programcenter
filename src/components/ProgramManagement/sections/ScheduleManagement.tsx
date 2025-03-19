import React from 'react';
import CollapsibleSection from '../common/CollapsibleSection';
import Chart from '../common/Chart';
import { ScheduleMetric, Milestone, ResourceAllocation } from '../../../mockupData/programManagementData';

interface ScheduleManagementProps {
  data: {
    scheduleMetrics: ScheduleMetric[];
    milestones: Milestone[];
    resourceAllocation: ResourceAllocation[];
    criticalPath: string[];
  };
  preferences: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse: () => void;
}

const ScheduleManagement: React.FC<ScheduleManagementProps> = ({ data, preferences, onToggleCollapse }) => {
  const { darkMode, collapsedSections } = preferences;
  const isCollapsed = collapsedSections.includes('Schedule');

  return (
    <CollapsibleSection
      id="schedule-management"
      title="Schedule Management"
      isCollapsed={isCollapsed}
      onToggle={onToggleCollapse}
      darkMode={darkMode}
    >
      <div className="space-y-6">
        {/* Schedule Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.scheduleMetrics.map((metric, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
              } shadow-sm`}
            >
              <h3 className="text-sm font-medium mb-2">{metric.name}</h3>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-sm text-gray-500">
                Target: {metric.target}
              </div>
              <div className={`text-sm ${
                metric.trend === 'On Track' ? 'text-green-500' :
                metric.trend === 'At Risk' ? 'text-yellow-500' :
                'text-red-500'
              }`}>
                {metric.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Milestones */}
        <div className={`p-4 rounded-lg ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } shadow-sm`}>
          <h3 className="text-lg font-medium mb-4">Milestones</h3>
          <div className="space-y-4">
            {data.milestones.map((milestone, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{milestone.name}</h4>
                    <p className="text-sm text-gray-500">{milestone.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    milestone.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {milestone.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Due Date: {milestone.dueDate} | Progress: {milestone.progress}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Allocation */}
        <div className={`p-4 rounded-lg ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } shadow-sm`}>
          <h3 className="text-lg font-medium mb-4">Resource Allocation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.resourceAllocation.map((resource, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">{resource.resource}</h4>
                <div className="text-sm text-gray-500">
                  Allocated: {resource.allocated}
                </div>
                <div className="text-sm text-gray-500">
                  Available: {resource.available}
                </div>
                <div className="text-sm text-gray-500">
                  Utilization: {resource.utilization}%
                </div>
                <div className="text-sm text-gray-500">
                  Planned: {resource.planned}
                </div>
                <div className="text-sm text-gray-500">
                  Actual: {resource.actual}
                </div>
                <div className="text-sm text-gray-500">
                  Availability: {resource.availability}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Path */}
        <div className={`p-4 rounded-lg ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } shadow-sm`}>
          <h3 className="text-lg font-medium mb-4">Critical Path</h3>
          <div className="space-y-2">
            {data.criticalPath.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-2">
                  {index + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  );
};

export default ScheduleManagement; 