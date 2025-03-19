import React, { useState, useEffect } from 'react';
import { Typography, Tabs, Row, Col, Card, Collapse } from 'antd';
import { 
  AlertOutlined, AreaChartOutlined, WarningOutlined, 
  FileSearchOutlined, TeamOutlined, LineChartOutlined 
} from '@ant-design/icons';
import RiskMatrix from './RiskMatrix';
import RiskHeatmap from './RiskHeatmap';
import IssueTracker from './IssueTracker';
import RiskMetrics from './RiskMetrics';
import RiskResponses from './RiskResponses';
import RiskTrendAnalysis from './RiskTrendAnalysis';

const { Title } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

interface Risk {
  id: string;
  title: string;
  description: string;
  probability: number;
  impact: number;
  status: string;
  mitigationPlan: string;
  owner: string;
  dateIdentified: string;
  lastUpdated: string;
  priority: string;
  component?: string;
}

interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  owner: string;
  dateIdentified: string;
  lastUpdated: string;
  component?: string;
  dueDate?: string;
  relatedRisks?: string[];
}

interface RiskTrend {
  date: string;
  open: number;
  mitigated: number;
  closed: number;
}

interface RiskManagementProps {
  data: {
    risks: Risk[];
    issues: Issue[];
    riskTrends: RiskTrend[];
  };
  darkMode: boolean;
  userPreferences?: {
    lastTab?: string;
    riskMatrixView?: 'probability' | 'impact';
  };
}

const RiskManagement: React.FC<RiskManagementProps> = ({ data, darkMode, userPreferences }) => {
  const [activeKey, setActiveKey] = useState<string>(userPreferences?.lastTab || '1');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Calculate risk score (probability * impact)
  const risksWithScore = data.risks.map(risk => ({
    ...risk,
    riskScore: risk.probability * risk.impact
  }));

  // Group risks by component for analysis
  const risksByComponent: Record<string, any[]> = {};
  risksWithScore.forEach(risk => {
    const component = risk.component || 'Unassigned';
    if (!risksByComponent[component]) {
      risksByComponent[component] = [];
    }
    risksByComponent[component].push(risk);
  });

  // Calculate aggregate risk metrics
  const totalRisks = risksWithScore.length;
  const openRisks = risksWithScore.filter(risk => risk.status === 'Open').length;
  const mitigatedRisks = risksWithScore.filter(risk => risk.status === 'Mitigated').length;
  const closedRisks = risksWithScore.filter(risk => risk.status === 'Closed').length;
  
  const totalIssues = data.issues.length;
  const openIssues = data.issues.filter(issue => issue.status === 'Open').length;
  const inProgressIssues = data.issues.filter(issue => issue.status === 'In Progress').length;
  const resolvedIssues = data.issues.filter(issue => issue.status === 'Resolved').length;
  
  // Calculate high priority risks
  const highPriorityRisks = risksWithScore.filter(risk => risk.priority === 'High').length;
  const highPriorityIssues = data.issues.filter(issue => issue.priority === 'High').length;

  // Create aggregate data for risk metrics component
  const riskMetricsData = {
    totalRisks,
    openRisks,
    mitigatedRisks,
    closedRisks,
    totalIssues,
    openIssues,
    inProgressIssues,
    resolvedIssues,
    highPriorityRisks,
    highPriorityIssues,
    trends: data.riskTrends
  };

  // Determine risk level
  const calculateRiskLevel = (probability: number, impact: number): string => {
    const score = probability * impact;
    if (score >= 15) return 'High';
    if (score >= 8) return 'Medium';
    return 'Low';
  };

  return (
    <div className="risk-management">
      <Card 
        className={darkMode ? 'bg-gray-800 text-white' : ''} 
        bordered={false}
      >
        <Collapse 
          activeKey={isCollapsed ? [] : ['1']} 
          onChange={() => setIsCollapsed(!isCollapsed)}
          className={darkMode ? 'dark-collapse' : ''}
        >
          <Panel 
            header={
              <Title level={4} className={darkMode ? 'text-white' : ''} style={{ margin: 0 }}>
                <AlertOutlined /> Risk Management
              </Title>
            } 
            key="1"
          >
            <Tabs
              activeKey={activeKey}
              onChange={setActiveKey}
              type="card"
              className={darkMode ? 'dark-tabs' : ''}
            >
              <TabPane 
                tab={
                  <span>
                    <AreaChartOutlined />
                    Dashboard
                  </span>
                } 
                key="1"
              >
                <RiskMetrics 
                  riskData={riskMetricsData}
                  darkMode={darkMode}
                />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <AlertOutlined />
                    Risk Matrix
                  </span>
                } 
                key="2"
              >
                <RiskMatrix 
                  risks={risksWithScore}
                  darkMode={darkMode}
                />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <WarningOutlined />
                    Risk Heatmap
                  </span>
                } 
                key="3"
              >
                <RiskHeatmap 
                  risks={risksWithScore}
                  risksByComponent={risksByComponent}
                  darkMode={darkMode}
                />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <FileSearchOutlined />
                    Issue Tracker
                  </span>
                } 
                key="4"
              >
                <IssueTracker 
                  issues={data.issues}
                  darkMode={darkMode}
                />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <TeamOutlined />
                    Risk Responses
                  </span>
                } 
                key="5"
              >
                <RiskResponses 
                  risks={risksWithScore}
                  darkMode={darkMode}
                />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <LineChartOutlined />
                    Trend Analysis
                  </span>
                } 
                key="6"
              >
                <RiskTrendAnalysis 
                  riskTrends={data.riskTrends}
                  darkMode={darkMode}
                />
              </TabPane>
            </Tabs>
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default RiskManagement; 