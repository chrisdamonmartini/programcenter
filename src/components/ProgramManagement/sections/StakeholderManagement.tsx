import React from 'react';
import { StakeholderManagement as StakeholderManagementType } from '../../../mockupData/programManagementData';
import CollapsibleSection from '../common/CollapsibleSection';
import Chart from '../common/Chart';

interface Stakeholder {
  id: string;
  name: string;
  role: string;
  organization: string;
  influence: 'High' | 'Medium' | 'Low';
  interest: 'High' | 'Medium' | 'Low';
  engagement: 'Active' | 'Neutral' | 'Resistant';
  lastContact: string;
  nextContact: string;
  notes: string;
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

  return (
    <div className="space-y-6">
      {/* Stakeholder Matrix */}
      <CollapsibleSection
        id="stakeholder-matrix"
        title="Stakeholder Matrix"
        icon="👥"
        isCollapsed={preferences.collapsedSections.includes('stakeholder-matrix')}
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
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h4 className={`font-medium mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Stakeholder Summary</h4>
            <div className="space-y-4">
              {data.stakeholders.map((stakeholder: Stakeholder) => (
                <div
                  key={stakeholder.id}
                  className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className={`font-medium ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{stakeholder.name}</h4>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{stakeholder.role} - {stakeholder.organization}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${getInfluenceColor(stakeholder.influence)}`}>
                        {stakeholder.influence} Influence
                      </span>
                      <span className={`px-2 py-1 rounded-full text-sm ${getEngagementColor(stakeholder.engagement)}`}>
                        {stakeholder.engagement}
                      </span>
                    </div>
                  </div>
                  <p className={`text-sm mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{stakeholder.notes}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Last Contact: {new Date(stakeholder.lastContact).toLocaleDateString()}
                    </span>
                    <span className={`${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Next Contact: {new Date(stakeholder.nextContact).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
        <div className="space-y-4">
          {data.engagementActivities.map((activity: EngagementActivity) => (
            <div
              key={activity.id}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{activity.title}</h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {activity.type} - {activity.location}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    activity.status === 'Completed'
                      ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                      : activity.status === 'Scheduled'
                      ? darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800'
                      : darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <h5 className={`text-sm font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Attendees:</h5>
                <div className="flex flex-wrap gap-2">
                  {activity.attendees.map((attendee, idx) => (
                    <span key={idx} className={`text-sm px-2 py-1 rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {attendee}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span className="font-medium">Duration:</span> {activity.duration}
                </div>
                <div className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span className="font-medium">Outcome:</span> {activity.outcome}
                </div>
                <div className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <span className="font-medium">Next Steps:</span> {activity.nextSteps}
                </div>
                {activity.agenda.length > 0 && (
                  <div className="mt-2">
                    <h5 className={`text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Agenda:</h5>
                    <ul className="list-disc list-inside space-y-1">
                      {activity.agenda.map((item, idx) => (
                        <li key={idx} className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default StakeholderManagement; 