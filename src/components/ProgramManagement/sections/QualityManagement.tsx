import React, { useState } from 'react';
import { 
  QualityManagement as QualityManagementType, 
  QualityIssue, 
  QualityMetric,
  QualityTrend,
  ProcessAdherence,
  QualityImprovement,
  RootCauseCategory
} from '../../../mockupData/programManagementData';
import CollapsibleSection from '../common/CollapsibleSection';
import Chart from '../common/Chart';
import { motion } from 'framer-motion';

interface QualityManagementProps {
  data: QualityManagementType;
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
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Improving':
        return <span className="text-green-500">↑</span>;
      case 'Declining':
        return <span className="text-red-500">↓</span>;
      case 'Stable':
        return <span className="text-yellow-500">→</span>;
      default:
        return null;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
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

  const getQualityImprovementStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'In Progress':
        return darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800';
      case 'Planned':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Canceled':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const renderQualityMetricsSummary = () => {
    if (!data.qualityMetricsSummary) return null;
    
    const { qualityMetricsSummary } = data;
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {Object.entries(qualityMetricsSummary).map(([key, value]) => (
          <div 
            key={key} 
            className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}
          >
            <div className="text-xs uppercase tracking-wider mb-1 text-gray-500 dark:text-gray-400">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </div>
            <div className="flex items-end">
              <div className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {key.includes('Rate') || key.includes('Coverage') ? `${value}%` : value}
              </div>
              {key === 'technicalDebtIndex' && (
                <div className={`ml-2 text-sm ${value > 20 ? 'text-red-500' : value > 10 ? 'text-yellow-500' : 'text-green-500'}`}>
                  {value > 20 ? '(High)' : value > 10 ? '(Medium)' : '(Low)'}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderProcessAdherence = () => {
    if (!data.processAdherence || data.processAdherence.length === 0) return null;
    
    return (
      <div className="mt-4">
        <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Process Adherence
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.processAdherence.map((process: ProcessAdherence) => (
            <div 
              key={process.process} 
              className={`p-3 rounded-lg flex items-center justify-between ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}
            >
              <div>
                <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {process.process}
                </div>
                <div className="mt-1 flex items-center text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    Trend: {process.trend}
                  </span>
                  <span className="ml-1">{getTrendIcon(process.trend)}</span>
                </div>
              </div>
              <div>
                <div 
                  className={`text-lg font-semibold ${
                    process.adherenceRate >= 90 
                      ? 'text-green-500' 
                      : process.adherenceRate >= 75 
                        ? 'text-yellow-500' 
                        : 'text-red-500'
                  }`}
                >
                  {process.adherenceRate}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderQualityIssueDetails = (issue: QualityIssue) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow mt-4`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {issue.title}
        </h3>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(issue.severity)}`}>
            {issue.severity}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(issue.status)}`}>
            {issue.status}
          </span>
        </div>
      </div>
      
      <div className={`mb-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {issue.description}
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
        <div>
          <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Component: </span>
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{issue.component}</span>
        </div>
        <div>
          <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Reported By: </span>
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{issue.reportedBy}</span>
        </div>
        <div>
          <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Date Reported: </span>
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            {new Date(issue.dateReported).toLocaleDateString()}
          </span>
        </div>
        <div>
          <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last Updated: </span>
          <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            {new Date(issue.lastUpdated).toLocaleDateString()}
          </span>
        </div>
        {issue.assignedTo && (
          <div>
            <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Assigned To: </span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{issue.assignedTo}</span>
          </div>
        )}
        {issue.resolution && (
          <div className="col-span-2">
            <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Resolution: </span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{issue.resolution}</span>
          </div>
        )}
      </div>
      
      {issue.impactAreas && issue.impactAreas.length > 0 && (
        <div className="mb-3">
          <div className={`font-medium text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Impact Areas:
          </div>
          <div className="flex flex-wrap gap-2">
            {issue.impactAreas.map((area, idx) => (
              <span 
                key={idx} 
                className={`text-xs px-2 py-1 rounded-full ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {issue.relatedIssues && issue.relatedIssues.length > 0 && (
        <div>
          <div className={`font-medium text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Related Issues:
          </div>
          <div className="flex flex-wrap gap-2">
            {issue.relatedIssues.map((relatedId, idx) => (
              <span 
                key={idx} 
                className={`text-xs px-2 py-1 rounded-full cursor-pointer ${
                  darkMode ? 'bg-blue-900 text-blue-300 hover:bg-blue-800' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
                onClick={() => setSelectedIssue(relatedId)}
              >
                {relatedId}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderQualityScorecard = () => {
    if (!data.qualityScorecard) return null;
    
    const { qualityScorecard } = data;
    const scoreChange = qualityScorecard.overall - qualityScorecard.previousScore;
    const scoreChangeColor = scoreChange > 0 
      ? 'text-green-500' 
      : scoreChange < 0 
        ? 'text-red-500' 
        : 'text-yellow-500';
    
    return (
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow col-span-1`}>
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider mb-1 text-gray-500 dark:text-gray-400">
                Overall Quality Score
              </div>
              <div className="flex items-center justify-center">
                <div className={`text-5xl font-bold ${
                  qualityScorecard.overall >= 90 
                    ? 'text-green-500' 
                    : qualityScorecard.overall >= 75 
                      ? 'text-yellow-500' 
                      : 'text-red-500'
                }`}>
                  {qualityScorecard.overall}
                </div>
                <div className={`ml-2 text-sm ${scoreChangeColor} font-medium flex items-center`}>
                  {scoreChange > 0 ? '+' : ''}{scoreChange}
                  <span className="ml-1">{getTrendIcon(qualityScorecard.trend)}</span>
                </div>
              </div>
              <div className="mt-2 text-sm flex items-center justify-center text-gray-500 dark:text-gray-400">
                <span>Previous: {qualityScorecard.previousScore}</span>
                <span className="mx-2">•</span>
                <span>Trend: {qualityScorecard.trend}</span>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow col-span-2`}>
            <div className="text-xs uppercase tracking-wider mb-3 text-gray-500 dark:text-gray-400">
              Score Breakdown
            </div>
            <div className="space-y-4">
              {qualityScorecard.categories.map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {category.name}
                      </span>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        (Weight: {(category.weight * 100).toFixed(0)}%)
                      </span>
                    </div>
                    <span className={`font-medium ${
                      category.score >= 90 
                        ? 'text-green-500' 
                        : category.score >= 75 
                          ? 'text-yellow-500' 
                          : 'text-red-500'
                    }`}>
                      {category.score}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div 
                      className={`h-2 rounded-full ${
                        category.score >= 90 
                          ? 'bg-green-500' 
                          : category.score >= 75 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderQualityImprovements = () => {
    if (!data.qualityImprovements || data.qualityImprovements.length === 0) return null;
    
    return (
      <div className="grid grid-cols-1 gap-4">
        {data.qualityImprovements.map((improvement: QualityImprovement) => (
          <div 
            key={improvement.id}
            className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {improvement.title}
                </h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {improvement.type} • Led by {improvement.leader}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${getQualityImprovementStatusColor(improvement.status)}`}>
                {improvement.status}
              </span>
            </div>
            
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {improvement.description}
            </p>
            
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Progress</span>
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {improvement.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div 
                  className={`h-2 rounded-full ${
                    improvement.status === 'Completed' 
                      ? 'bg-green-500' 
                      : 'bg-blue-500'
                  }`}
                  style={{ width: `${improvement.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Start Date: </span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {new Date(improvement.startDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Target Date: </span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {new Date(improvement.targetDate).toLocaleDateString()}
                </span>
              </div>
              {improvement.actualDate && (
                <div>
                  <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Actual Date: </span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {new Date(improvement.actualDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Impact: </span>
                <span className={getImpactColor(improvement.impact)}>
                  {improvement.impact}
                </span>
              </div>
            </div>
            
            {improvement.metrics && improvement.metrics.length > 0 && (
              <div>
                <div className={`font-medium text-xs mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Affected Metrics:
                </div>
                <div className="flex flex-wrap gap-2">
                  {improvement.metrics.map((metric, idx) => (
                    <span 
                      key={idx} 
                      className={`text-xs px-2 py-1 rounded-full ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderRootCauseAnalysis = () => {
    if (!data.rootCauseAnalysis || data.rootCauseAnalysis.length === 0) return null;
    
    // Calculate total issues for percentage calculation
    const totalIssues = data.rootCauseAnalysis.reduce((sum, category) => sum + category.count, 0);
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left side - Overview bars */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <h4 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Issue Categories Overview
            </h4>
            <div className="space-y-4">
              {data.rootCauseAnalysis.map((category, index) => {
                const percentage = ((category.count / totalIssues) * 100).toFixed(1);
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {category.category}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {category.count} issues
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          ({percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div 
                        className="h-2.5 rounded-full bg-blue-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right side - Detailed breakdown */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
            <h4 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Issue Subcategories
            </h4>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {data.rootCauseAnalysis.map((category, categoryIdx) => (
                <div key={categoryIdx} className="mb-4">
                  <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {category.category}
                  </div>
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="pl-2 border-l-2 border-gray-300 dark:border-gray-600 space-y-2">
                      {category.subcategories.map((sub, subIdx) => {
                        const subPercentage = ((sub.count / category.count) * 100).toFixed(0);
                        return (
                          <div key={subIdx} className="flex justify-between items-center text-xs">
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                              {sub.name}
                            </span>
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mr-2">
                                <div 
                                  className="h-1.5 rounded-full bg-blue-400"
                                  style={{ width: `${subPercentage}%` }}
                                ></div>
                              </div>
                              <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                                {sub.count}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Version indicator and debug info */}
      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mb-4 text-sm">
        <div className="font-bold text-blue-800 dark:text-blue-200">Quality Management Dashboard (v3.0)</div>
        <div className="text-blue-600 dark:text-blue-300 text-xs mt-1">
          Issues: {data.qualityIssues.length} | Improvements: {data.qualityImprovements?.length || 0} | Quality Score: {data.qualityScorecard?.overall || 'N/A'}
        </div>
      </div>
      
      {/* Quality Scorecard */}
      <CollapsibleSection
        id="quality-scorecard"
        title="Quality Scorecard"
        icon="🏆"
        isCollapsed={preferences.collapsedSections.includes('quality-scorecard')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        {renderQualityScorecard()}
      </CollapsibleSection>
      
      {/* Quality Metrics Summary */}
      <CollapsibleSection
        id="quality-metrics-summary"
        title="Quality Metrics at a Glance"
        icon="🔍"
        isCollapsed={preferences.collapsedSections.includes('quality-metrics-summary')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        {renderQualityMetricsSummary()}
        {renderProcessAdherence()}
      </CollapsibleSection>

      {/* Quality Improvements */}
      <CollapsibleSection
        id="quality-improvements"
        title="Quality Improvement Initiatives"
        icon="📈"
        isCollapsed={preferences.collapsedSections.includes('quality-improvements')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        {renderQualityImprovements()}
      </CollapsibleSection>
      
      {/* Root Cause Analysis */}
      <CollapsibleSection
        id="root-cause-analysis"
        title="Root Cause Analysis"
        icon="🔍"
        isCollapsed={preferences.collapsedSections.includes('root-cause-analysis')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        {renderRootCauseAnalysis()}
      </CollapsibleSection>

      {/* Quality Metrics */}
      <CollapsibleSection
        id="quality-metrics"
        title="Quality Metrics Trends"
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
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {data.qualityIssues && data.qualityIssues.length > 0 ? (
                data.qualityIssues.map((issue: QualityIssue) => (
                  <div
                    key={issue.id}
                    className={`p-3 rounded-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow cursor-pointer hover:shadow-md transition-shadow duration-200`}
                    onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h4 className={`font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>{issue.title}</h4>
                        <p className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>{issue.component}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(issue.severity)}`}>
                          {issue.severity}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </div>
                    </div>
                    <p className={`text-sm truncate ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>{issue.description}</p>
                  </div>
                ))
              ) : (
                <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No quality issues data available</div>
              )}
            </div>
          </div>
        </div>
        
        {selectedIssue && renderQualityIssueDetails(
          data.qualityIssues.find(issue => issue.id === selectedIssue)!
        )}
      </CollapsibleSection>
      
      {/* Compliance Status */}
      <CollapsibleSection
        id="compliance-status"
        title="Compliance Status"
        icon="📋"
        isCollapsed={preferences.collapsedSections.includes('compliance-status')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.complianceStatus && data.complianceStatus.length > 0 ? (
            data.complianceStatus.map((compliance, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {compliance.standard}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${getComplianceColor(compliance.status)}`}>
                    {compliance.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last Audit: </span>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {new Date(compliance.lastAudit).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Next Audit: </span>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      {new Date(compliance.nextAudit).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {compliance.findings && compliance.findings.length > 0 && (
                  <>
                    <div className={`font-medium text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Findings:
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {compliance.findings.map((finding, idx) => (
                        <li key={idx} className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className={`col-span-2 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow flex items-center justify-center`}>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No compliance data available</p>
            </div>
          )}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default QualityManagement;