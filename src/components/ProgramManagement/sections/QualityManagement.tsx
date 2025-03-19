import React from 'react';
import { QualityManagement as QualityManagementType } from '../../../mockupData/programManagementData';
import CollapsibleSection from '../common/CollapsibleSection';
import Chart from '../common/Chart';

interface QualityMetric {
  date: string;
  planned: number;
  actual: number;
  target: number;
}

interface QualityIssue {
  id: string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  component: string;
  reportedBy: string;
  dateReported: string;
  lastUpdated: string;
}

interface QualityTrend {
  date: string;
  defects: number;
  rework: number;
  compliance: number;
}

interface QualityManagementProps {
  data: {
    qualityMetrics: QualityMetric[];
    qualityIssues: QualityIssue[];
    qualityTrends: QualityTrend[];
    complianceStatus: {
      standard: string;
      status: 'Compliant' | 'Partially Compliant' | 'Non-Compliant';
      lastAudit: string;
      nextAudit: string;
      findings: string[];
    }[];
  };
  preferences: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse: () => void;
}

const QualityManagement: React.FC<QualityManagementProps> = ({
  data,
  preferences,
  onToggleCollapse,
}) => {
  const { darkMode } = preferences;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      case 'High':
        return darkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-800';
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
      case 'Open':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      case 'In Progress':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Resolved':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'Closed':
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'Compliant':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'Partially Compliant':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Non-Compliant':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quality Metrics */}
      <CollapsibleSection
        id="quality-metrics"
        title="Quality Metrics"
        icon="📊"
        isCollapsed={preferences.collapsedSections.includes('quality-metrics')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.qualityMetrics && data.qualityMetrics.length > 0 ? (
            <Chart
              type="line"
              data={data.qualityMetrics}
              xKey="date"
              yKeys={['planned', 'actual', 'target']}
              title="Quality Performance"
              darkMode={darkMode}
              height={300}
            />
          ) : (
            <div className={`bg-${darkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow flex items-center justify-center`}>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No quality metrics data available for chart</p>
            </div>
          )}
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h4 className={`font-medium mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Current Metrics</h4>
            <div className="space-y-4">
              {data.qualityMetrics && data.qualityMetrics.length > 0 ? 
                Object.entries(data.qualityMetrics[data.qualityMetrics.length - 1])
                  .filter(([key]) => key !== 'date')
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className={`capitalize ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>{key}</span>
                      <span className={`font-medium ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>{value}%</span>
                    </div>
                  ))
                : <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No quality metrics data available</div>
              }
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Quality Issues */}
      <CollapsibleSection
        id="quality-issues"
        title="Quality Issues"
        icon="⚠️"
        isCollapsed={preferences.collapsedSections.includes('quality-issues')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.qualityTrends && data.qualityTrends.length > 0 ? (
            <Chart
              type="line"
              data={data.qualityTrends}
              xKey="date"
              yKeys={['defects', 'rework', 'compliance']}
              title="Quality Trends"
              darkMode={darkMode}
              height={300}
            />
          ) : (
            <div className={`bg-${darkMode ? 'gray-800' : 'white'} p-6 rounded-lg shadow flex items-center justify-center`}>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No quality trends data available</p>
            </div>
          )}
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h4 className={`font-medium mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Issue Summary</h4>
            <div className="space-y-4">
              {data.qualityIssues && data.qualityIssues.length > 0 ? (
                data.qualityIssues.map((issue: QualityIssue) => (
                  <div
                    key={issue.id}
                    className={`p-4 rounded-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className={`font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{issue.title}</h4>
                        <p className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>{issue.component}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-sm ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </div>
                    </div>
                    <p className={`text-sm mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{issue.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{issue.reportedBy}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No quality issues data available</div>
              )}
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default QualityManagement;