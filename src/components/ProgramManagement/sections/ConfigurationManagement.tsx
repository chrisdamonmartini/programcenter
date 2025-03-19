import React from 'react';
import { ConfigurationManagement as ConfigurationManagementType } from '../../../mockupData/programManagementData';
import CollapsibleSection from '../common/CollapsibleSection';
import Chart from '../common/Chart';

interface ConfigurationItem {
  id: string;
  name: string;
  type: 'Hardware' | 'Software' | 'Documentation';
  version: string;
  status: 'Current' | 'Pending' | 'Deprecated';
  lastUpdated: string;
  owner: string;
  dependencies: string[];
}

interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'Approved' | 'Rejected' | 'Implemented';
  impact: 'High' | 'Medium' | 'Low';
  date: string;
  requester: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  affectedItems: string[];
  comments: {
    date: string;
    author: string;
    content: string;
  }[];
}

interface ConfigurationTrend {
  date: string;
  changes: number;
  approvals: number;
  rejections: number;
}

interface ConfigurationManagementProps {
  data: {
    items: ConfigurationItem[];
    changeRequests: ChangeRequest[];
    configurationTrends: ConfigurationTrend[];
    baselines: {
      name: string;
      date: string;
      items: string[];
      status: 'Active' | 'Archived';
    }[];
  };
  preferences: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse: () => void;
}

const ConfigurationManagement: React.FC<ConfigurationManagementProps> = ({
  data,
  preferences,
  onToggleCollapse,
}) => {
  const { darkMode } = preferences;

  const getItemStatusColor = (status: string) => {
    switch (status) {
      case 'Current':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'Pending':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Deprecated':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getChangeRequestStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'Rejected':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      case 'Implemented':
        return darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Configuration Overview */}
      <CollapsibleSection
        id="configuration-overview"
        title="Configuration Overview"
        icon="⚙️"
        isCollapsed={preferences.collapsedSections.includes('configuration-overview')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Chart
            type="line"
            data={data.configurationTrends}
            xKey="date"
            yKeys={['changes', 'approvals', 'rejections']}
            title="Configuration Changes"
            darkMode={darkMode}
            height={300}
          />
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h4 className={`font-medium mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Configuration Baselines</h4>
            <div className="space-y-4">
              {data.baselines.map((baseline, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{baseline.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      baseline.status === 'Active'
                        ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                        : darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {baseline.status}
                    </span>
                  </div>
                  <div className="text-sm mb-2">
                    <span className={`${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Date: </span>
                    <span className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{new Date(baseline.date).toLocaleDateString()}</span>
                  </div>
                  <div className="text-sm">
                    <span className={`${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>Items: </span>
                    <span className={`${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>{baseline.items.length}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Configuration Items */}
      <CollapsibleSection
        id="configuration-items"
        title="Configuration Items"
        icon="📦"
        isCollapsed={preferences.collapsedSections.includes('configuration-items')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="space-y-4">
          {data.items.map((item: ConfigurationItem) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{item.name}</h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{item.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${getItemStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>v{item.version}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Last Updated: {new Date(item.lastUpdated).toLocaleDateString()}
                </span>
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Owner: {item.owner}
                </span>
              </div>
              {item.dependencies.length > 0 && (
                <div className="mt-2">
                  <h5 className={`text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Dependencies:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {item.dependencies.map((dep, idx) => (
                      <li key={idx} className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{dep}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Change Requests */}
      <CollapsibleSection
        id="change-requests"
        title="Change Requests"
        icon="📝"
        isCollapsed={preferences.collapsedSections.includes('change-requests')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="space-y-4">
          {data.changeRequests.map((request: ChangeRequest) => (
            <div
              key={request.id}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {request.title}
                  </h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Impact: {request.impact} | Priority: {request.priority}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${getChangeRequestStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>
              </div>
              <p className={`text-sm mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>{request.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Requested by: {request.requester} on {new Date(request.date).toLocaleDateString()}
                </span>
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Assigned to: {request.assignedTo}
                </span>
              </div>
              {request.comments.length > 0 && (
                <div className="mt-4">
                  <h5 className={`text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Comments</h5>
                  <div className="space-y-2">
                    {request.comments.map((comment, idx) => (
                      <div key={idx} className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <div className="flex justify-between">
                          <span className="font-medium">{comment.author}</span>
                          <span>{new Date(comment.date).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-1">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default ConfigurationManagement; 