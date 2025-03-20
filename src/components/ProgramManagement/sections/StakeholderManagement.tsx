import React, { useState } from 'react';
import { StakeholderManagement as StakeholderManagementType, Stakeholder as StakeholderDataModel } from '../../../mockupData/programManagementData';
import CollapsibleSection from '../common/CollapsibleSection';
import Chart from '../common/Chart';
import { motion } from 'framer-motion';

interface Stakeholder extends StakeholderDataModel {
  communicationPreferences?: {
    preferredChannel: 'Email' | 'Phone' | 'Meeting' | 'Report';
    frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
    bestTime: string;
  };
  satisfaction?: number;
  impact?: 'Critical' | 'High' | 'Medium' | 'Low';
  actionItems?: {
    id: string;
    title: string;
    status: 'Open' | 'In Progress' | 'Completed';
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
}

interface EngagementActivity {
  id: string;
  title: string;
  date: string;
  type: 'Meeting' | 'Review' | 'Workshop' | 'Presentation';
  attendees: string[];
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  outcome: string;
  nextSteps: string;
  location: string;
  duration: string;
  agenda: string[];
  satisfaction?: number;
  followUpActions?: {
    id: string;
    description: string;
    assignedTo: string;
    dueDate: string;
    status: 'Open' | 'In Progress' | 'Completed';
  }[];
}

interface StakeholderManagementProps {
  data: {
    stakeholders: Stakeholder[];
    engagementActivities: EngagementActivity[];
    engagementTrends: {
      date: string;
      active: number;
      neutral: number;
      resistant: number;
    }[];
  };
  preferences: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse: () => void;
}

const StakeholderManagement: React.FC<StakeholderManagementProps> = ({
  data,
  preferences,
  onToggleCollapse,
}) => {
  const { darkMode } = preferences;
  const [selectedStakeholder, setSelectedStakeholder] = useState<string | null>(null);

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'High':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      case 'Medium':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'Active':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'Neutral':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Resistant':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical':
        return darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-800';
      case 'High':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      case 'Medium':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'In Progress':
        return darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800';
      case 'Open':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return darkMode ? 'text-red-400' : 'text-red-600';
      case 'Medium':
        return darkMode ? 'text-yellow-400' : 'text-yellow-600';
      case 'Low':
        return darkMode ? 'text-green-400' : 'text-green-600';
      default:
        return darkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const renderStakeholderMatrix = () => {
    const matrixData = {
      'High Interest': {
        'High Influence': data.stakeholders.filter(s => s.interest === 'High' && s.influence === 'High'),
        'Medium Influence': data.stakeholders.filter(s => s.interest === 'High' && s.influence === 'Medium'),
        'Low Influence': data.stakeholders.filter(s => s.interest === 'High' && s.influence === 'Low'),
      },
      'Medium Interest': {
        'High Influence': data.stakeholders.filter(s => s.interest === 'Medium' && s.influence === 'High'),
        'Medium Influence': data.stakeholders.filter(s => s.interest === 'Medium' && s.influence === 'Medium'),
        'Low Influence': data.stakeholders.filter(s => s.interest === 'Medium' && s.influence === 'Low'),
      },
      'Low Interest': {
        'High Influence': data.stakeholders.filter(s => s.interest === 'Low' && s.influence === 'High'),
        'Medium Influence': data.stakeholders.filter(s => s.interest === 'Low' && s.influence === 'Medium'),
        'Low Influence': data.stakeholders.filter(s => s.interest === 'Low' && s.influence === 'Low'),
      },
    };

    return (
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(matrixData).map(([interest, influences]) => (
          <div key={interest} className="space-y-4">
            <h4 className={`font-medium text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {interest}
            </h4>
            {Object.entries(influences).map(([influence, stakeholders]) => (
              <div
                key={influence}
                className={`p-3 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <h5 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {influence}
                </h5>
                <div className="space-y-2">
                  {stakeholders.map(stakeholder => (
                    <div
                      key={stakeholder.id}
                      className={`text-sm p-2 rounded cursor-pointer transition-colors ${
                        selectedStakeholder === stakeholder.id
                          ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                          : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedStakeholder(stakeholder.id)}
                    >
                      {stakeholder.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderStakeholderDetails = (stakeholder: Stakeholder) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {stakeholder.name}
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {stakeholder.role} - {stakeholder.organization}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm ${getInfluenceColor(stakeholder.influence)}`}>
            {stakeholder.influence} Influence
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${getEngagementColor(stakeholder.engagement)}`}>
            {stakeholder.engagement}
          </span>
          {stakeholder.impact && (
            <span className={`px-3 py-1 rounded-full text-sm ${getImpactColor(stakeholder.impact)}`}>
              {stakeholder.impact} Impact
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {stakeholder.communicationPreferences ? (
          <div>
            <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Communication Preferences
            </h4>
            <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>Preferred Channel: {stakeholder.communicationPreferences.preferredChannel}</p>
              <p>Frequency: {stakeholder.communicationPreferences.frequency}</p>
              <p>Best Time: {stakeholder.communicationPreferences.bestTime}</p>
            </div>
          </div>
        ) : (
          <div>
            <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Communication Details
            </h4>
            <div className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>Frequency: {stakeholder.communicationFrequency}</p>
              <p>Status: {stakeholder.status}</p>
              <p>Email: {stakeholder.contactInfo?.email}</p>
              <p>Phone: {stakeholder.contactInfo?.phone}</p>
            </div>
          </div>
        )}

        {stakeholder.satisfaction !== undefined && (
          <div>
            <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Satisfaction Metrics
            </h4>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      stakeholder.satisfaction >= 80
                        ? 'bg-green-500'
                        : stakeholder.satisfaction >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${stakeholder.satisfaction}%` }}
                  />
                </div>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Satisfaction: {stakeholder.satisfaction}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Contact Information
        </h4>
        <div className={`space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>Email: {stakeholder.contactInfo?.email}</p>
          <p>Phone: {stakeholder.contactInfo?.phone}</p>
          <p>Address: {stakeholder.contactInfo?.address}</p>
        </div>
      </div>

      <div className="mt-4">
        <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Engagement Details
        </h4>
        <div className={`space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>Last Contact: {new Date(stakeholder.lastContact).toLocaleDateString()}</p>
          <p>Next Contact: {new Date(stakeholder.nextContact).toLocaleDateString()}</p>
          <p>Notes: {stakeholder.notes}</p>
        </div>
      </div>

      {stakeholder.actionItems && stakeholder.actionItems.length > 0 && (
        <div className="mt-6">
          <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Action Items
          </h4>
          <div className="space-y-3">
            {stakeholder.actionItems.map(item => (
              <div
                key={item.id}
                className={`p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h5>
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Priority: <span className={getPriorityColor(item.priority)}>{item.priority}</span>
                  </span>
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Due: {new Date(item.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Version indicator and debug info */}
      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mb-4 text-sm">
        <div className="font-bold text-blue-800 dark:text-blue-200">Stakeholder Management Dashboard (v2.0)</div>
        <div className="text-blue-600 dark:text-blue-300 text-xs mt-1">
          Stakeholders: {data.stakeholders.length} | Activities: {data.engagementActivities.length}
        </div>
      </div>
      
      {/* Stakeholder Matrix */}
      <CollapsibleSection
        id="stakeholder-matrix"
        title="Stakeholder Matrix"
        icon="👥"
        isCollapsed={preferences.collapsedSections.includes('stakeholder-matrix')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="space-y-6">
          {renderStakeholderMatrix()}
          {selectedStakeholder && (
            <div className="mt-6">
              {renderStakeholderDetails(
                data.stakeholders.find(s => s.id === selectedStakeholder)!
              )}
            </div>
          )}
        </div>
      </CollapsibleSection>

      {/* Engagement Activities */}
      <CollapsibleSection
        id="engagement-activities"
        title="Engagement Activities"
        icon="📅"
        isCollapsed={preferences.collapsedSections.includes('engagement-activities')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Chart
            type="line"
            data={data.engagementTrends}
            xKey="date"
            yKeys={['active', 'neutral', 'resistant']}
            title="Engagement Trends"
            darkMode={darkMode}
            height={300}
          />
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h4 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activities
            </h4>
            <div className="space-y-4">
              {data.engagementActivities
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 5)
                .map((activity: EngagementActivity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {activity.title}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {activity.type} - {activity.location}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <h5 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Attendees:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {activity.attendees.map((attendee, idx) => (
                          <span
                            key={idx}
                            className={`text-sm px-2 py-1 rounded-full ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {attendee}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className="font-medium">Duration:</span> {activity.duration}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className="font-medium">Outcome:</span> {activity.outcome}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className="font-medium">Next Steps:</span> {activity.nextSteps}
                      </div>
                      {activity.agenda.length > 0 && (
                        <div className="mt-2">
                          <h5 className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Agenda:
                          </h5>
                          <ul className="list-disc list-inside space-y-1">
                            {activity.agenda.map((item, idx) => (
                              <li
                                key={idx}
                                className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {activity.followUpActions && activity.followUpActions.length > 0 && (
                        <div className="mt-4">
                          <h5 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Follow-up Actions:
                          </h5>
                          <div className="space-y-2">
                            {activity.followUpActions.map(action => (
                              <div
                                key={action.id}
                                className={`p-2 rounded ${
                                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {action.description}
                                  </span>
                                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(action.status)}`}>
                                    {action.status}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between mt-1 text-xs">
                                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                    Assigned to: {action.assignedTo}
                                  </span>
                                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                    Due: {new Date(action.dueDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default StakeholderManagement; 