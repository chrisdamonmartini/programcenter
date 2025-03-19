import React from 'react';
import { Card, Row, Col, Statistic, Progress, Typography } from 'antd';
import { 
  WarningOutlined, CheckCircleOutlined, 
  ClockCircleOutlined, AlertOutlined 
} from '@ant-design/icons';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie,
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';

const { Title, Text } = Typography;

interface RiskMetricsProps {
  riskData: {
    totalRisks: number;
    openRisks: number;
    mitigatedRisks: number;
    closedRisks: number;
    totalIssues: number;
    openIssues: number;
    inProgressIssues: number;
    resolvedIssues: number;
    highPriorityRisks: number;
    highPriorityIssues: number;
    trends: {
      date: string;
      open: number;
      mitigated: number;
      closed: number;
    }[];
  };
  darkMode: boolean;
}

const RiskMetrics: React.FC<RiskMetricsProps> = ({ riskData, darkMode }) => {
  // Calculate percentages for visualization
  const openRiskPercentage = riskData.totalRisks ? 
    Math.round((riskData.openRisks / riskData.totalRisks) * 100) : 0;
  
  const mitigatedRiskPercentage = riskData.totalRisks ? 
    Math.round((riskData.mitigatedRisks / riskData.totalRisks) * 100) : 0;
  
  const closedRiskPercentage = riskData.totalRisks ? 
    Math.round((riskData.closedRisks / riskData.totalRisks) * 100) : 0;
  
  const openIssuePercentage = riskData.totalIssues ? 
    Math.round((riskData.openIssues / riskData.totalIssues) * 100) : 0;
  
  const highPriorityRiskPercentage = riskData.totalRisks ? 
    Math.round((riskData.highPriorityRisks / riskData.totalRisks) * 100) : 0;
  
  const highPriorityIssuePercentage = riskData.totalIssues ? 
    Math.round((riskData.highPriorityIssues / riskData.totalIssues) * 100) : 0;

  // Data for pie charts
  const riskStatusData = [
    { name: 'Open', value: riskData.openRisks, color: '#ff4d4f' },
    { name: 'Mitigated', value: riskData.mitigatedRisks, color: '#faad14' },
    { name: 'Closed', value: riskData.closedRisks, color: '#52c41a' }
  ];

  const issueStatusData = [
    { name: 'Open', value: riskData.openIssues, color: '#ff4d4f' },
    { name: 'In Progress', value: riskData.inProgressIssues, color: '#faad14' },
    { name: 'Resolved', value: riskData.resolvedIssues, color: '#52c41a' }
  ];

  // Calculate risk exposure index (0-100)
  const riskExposureIndex = Math.min(
    100,
    Math.round(
      (riskData.openRisks * 10 + 
      riskData.highPriorityRisks * 15 + 
      riskData.highPriorityIssues * 5) / 
      Math.max(1, riskData.totalRisks + riskData.totalIssues) * 10
    )
  );

  const getRiskExposureStatus = (index: number) => {
    if (index >= 70) return { color: '#ff4d4f', status: 'High Exposure' };
    if (index >= 40) return { color: '#faad14', status: 'Moderate Exposure' };
    return { color: '#52c41a', status: 'Low Exposure' };
  };
  
  const exposureStatus = getRiskExposureStatus(riskExposureIndex);

  return (
    <div className="risk-metrics">
      <Row gutter={[16, 16]}>
        {/* Risk Exposure Index */}
        <Col xs={24} lg={8}>
          <Card 
            className={darkMode ? 'bg-gray-800 text-white' : ''} 
            bordered={false}
          >
            <Title level={4} className={darkMode ? 'text-white' : ''}>
              Risk Exposure Index
            </Title>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Progress
                type="dashboard"
                percent={riskExposureIndex}
                strokeColor={exposureStatus.color}
                strokeWidth={8}
                width={180}
                format={(percent) => (
                  <div>
                    <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{percent}</span>
                    <div style={{ fontSize: '14px', color: exposureStatus.color }}>
                      {exposureStatus.status}
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="mt-4">
              <Text className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                The Risk Exposure Index is a weighted measure combining the number of open risks, 
                high-priority risks, and issues, normalized to a 0-100 scale.
              </Text>
            </div>
          </Card>
        </Col>

        {/* Risk Statistics */}
        <Col xs={24} lg={8}>
          <Card 
            className={darkMode ? 'bg-gray-800 text-white' : ''} 
            bordered={false}
          >
            <Title level={4} className={darkMode ? 'text-white' : ''}>
              Risk Statistics
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic 
                  title={<Text className={darkMode ? 'text-gray-300' : ''}>Total Risks</Text>} 
                  value={riskData.totalRisks} 
                  valueStyle={{ color: darkMode ? '#fff' : 'rgba(0, 0, 0, 0.85)' }}
                  prefix={<AlertOutlined />} 
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title={<Text className={darkMode ? 'text-gray-300' : ''}>Open Risks</Text>} 
                  value={riskData.openRisks} 
                  valueStyle={{ color: '#ff4d4f' }}
                  prefix={<WarningOutlined />} 
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title={<Text className={darkMode ? 'text-gray-300' : ''}>Mitigated</Text>} 
                  value={riskData.mitigatedRisks} 
                  valueStyle={{ color: '#faad14' }}
                  prefix={<ClockCircleOutlined />} 
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title={<Text className={darkMode ? 'text-gray-300' : ''}>Closed</Text>} 
                  value={riskData.closedRisks} 
                  valueStyle={{ color: '#52c41a' }}
                  prefix={<CheckCircleOutlined />} 
                />
              </Col>
            </Row>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={riskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {riskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} risks`, '']}
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#333' : '#fff',
                      color: darkMode ? '#fff' : '#000',
                      border: '1px solid #ccc'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* Issue Statistics */}
        <Col xs={24} lg={8}>
          <Card 
            className={darkMode ? 'bg-gray-800 text-white' : ''} 
            bordered={false}
          >
            <Title level={4} className={darkMode ? 'text-white' : ''}>
              Issue Statistics
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic 
                  title={<Text className={darkMode ? 'text-gray-300' : ''}>Total Issues</Text>} 
                  value={riskData.totalIssues} 
                  valueStyle={{ color: darkMode ? '#fff' : 'rgba(0, 0, 0, 0.85)' }}
                  prefix={<AlertOutlined />} 
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title={<Text className={darkMode ? 'text-gray-300' : ''}>Open Issues</Text>} 
                  value={riskData.openIssues} 
                  valueStyle={{ color: '#ff4d4f' }}
                  prefix={<WarningOutlined />} 
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title={<Text className={darkMode ? 'text-gray-300' : ''}>In Progress</Text>} 
                  value={riskData.inProgressIssues} 
                  valueStyle={{ color: '#faad14' }}
                  prefix={<ClockCircleOutlined />} 
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title={<Text className={darkMode ? 'text-gray-300' : ''}>Resolved</Text>} 
                  value={riskData.resolvedIssues} 
                  valueStyle={{ color: '#52c41a' }}
                  prefix={<CheckCircleOutlined />} 
                />
              </Col>
            </Row>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={issueStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {issueStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} issues`, '']}
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#333' : '#fff',
                      color: darkMode ? '#fff' : '#000',
                      border: '1px solid #ccc'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        {/* High Priority Stats */}
        <Col xs={24} lg={8}>
          <Card 
            className={darkMode ? 'bg-gray-800 text-white' : ''} 
            bordered={false}
          >
            <Title level={4} className={darkMode ? 'text-white' : ''}>
              High Priority Items
            </Title>
            <div className="mt-4">
              <div className="mb-2">
                <Text className={darkMode ? 'text-white' : ''}>
                  High Priority Risks: {riskData.highPriorityRisks} of {riskData.totalRisks} ({highPriorityRiskPercentage}%)
                </Text>
                <Progress 
                  percent={highPriorityRiskPercentage} 
                  strokeColor="#ff4d4f"
                  showInfo={false}
                />
              </div>
              <div className="mb-2">
                <Text className={darkMode ? 'text-white' : ''}>
                  High Priority Issues: {riskData.highPriorityIssues} of {riskData.totalIssues} ({highPriorityIssuePercentage}%)
                </Text>
                <Progress 
                  percent={highPriorityIssuePercentage} 
                  strokeColor="#ff7a45"
                  showInfo={false}
                />
              </div>
            </div>
            <div className="mt-4">
              <Title level={5} className={darkMode ? 'text-white' : ''}>
                Suggested Actions
              </Title>
              <ul className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                <li>Review all high priority risks immediately</li>
                <li>Assign owners to unassigned high priority items</li>
                <li>Update mitigation plans for all high priority risks</li>
                <li>Schedule weekly review for critical items</li>
              </ul>
            </div>
          </Card>
        </Col>

        {/* Risk Trends */}
        <Col xs={24} lg={16}>
          <Card 
            className={darkMode ? 'bg-gray-800 text-white' : ''} 
            bordered={false}
          >
            <Title level={4} className={darkMode ? 'text-white' : ''}>
              Risk Trends Over Time
            </Title>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={riskData.trends}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                  <XAxis 
                    dataKey="date"
                    stroke={darkMode ? '#ddd' : '#666'}
                  />
                  <YAxis 
                    stroke={darkMode ? '#ddd' : '#666'}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#333' : '#fff',
                      color: darkMode ? '#fff' : '#000',
                      border: '1px solid #ccc'
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="open" 
                    stackId="1"
                    stroke="#ff4d4f" 
                    fill="#ff4d4f" 
                    name="Open Risks"
                    fillOpacity={0.5}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mitigated" 
                    stackId="1"
                    stroke="#faad14" 
                    fill="#faad14" 
                    name="Mitigated Risks"
                    fillOpacity={0.5}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="closed" 
                    stackId="1"
                    stroke="#52c41a" 
                    fill="#52c41a" 
                    name="Closed Risks"
                    fillOpacity={0.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RiskMetrics; 