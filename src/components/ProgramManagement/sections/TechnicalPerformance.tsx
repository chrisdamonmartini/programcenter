import React, { useState } from 'react';
import { Tabs, Card, Row, Col, Progress, Table, Tag, Statistic, Badge, Tooltip, Button } from 'antd';
import { 
  CaretUpOutlined, 
  CaretDownOutlined, 
  DashOutlined, 
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  RocketOutlined,
  DashboardOutlined,
  ExperimentOutlined,
  BugOutlined,
  FileSearchOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip as RechartsTooltip, 
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const { TabPane } = Tabs;

interface TechnicalPerformanceProps {
  data: typeof import('../../../mockupData/technicalPerformanceData').mockTechnicalPerformanceData;
  preferences: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse: () => void;
}

const COLORS = {
  green: '#52c41a',
  yellow: '#faad14',
  red: '#f5222d',
  blue: '#1890ff',
  purple: '#722ed1',
  gray: '#bfbfbf'
};

const getStatusColor = (status: string): string => {
  if (status === 'Green') return COLORS.green;
  if (status === 'Yellow') return COLORS.yellow;
  if (status === 'Red') return COLORS.red;
  return COLORS.blue;
};

const getStatusIcon = (status: string) => {
  if (status === 'Green') return <CheckCircleOutlined />;
  if (status === 'Yellow') return <WarningOutlined />;
  if (status === 'Red') return <CloseCircleOutlined />;
  return null;
};

const getTrendIcon = (trend: string) => {
  if (trend === 'Improving') return <CaretUpOutlined style={{ color: COLORS.green }} />;
  if (trend === 'Declining') return <CaretDownOutlined style={{ color: COLORS.red }} />;
  return <DashOutlined style={{ color: COLORS.yellow }} />;
};

// Simple Gauge component
const SimpleGauge: React.FC<{
  id: string;
  value: number;
  maxValue: number;
  colors?: string[];
  textColor?: string;
  formatTextValue?: (value: number) => string;
}> = ({
  id,
  value,
  maxValue,
  colors = ['#ff0000', '#ffff00', '#00ff00'],
  textColor = '#000000',
  formatTextValue = (value) => `${value}`,
}) => {
  const percent = value / maxValue * 100;
  
  return (
    <div id={id} className="relative w-24 h-24 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0">
        <path
          d="M 50,50 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
          stroke="#eee"
          strokeWidth="10"
          fill="none"
        />
        <path
          d="M 50,50 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
          stroke={percent < 33 ? colors[0] : percent < 66 ? colors[1] : colors[2]}
          strokeWidth="10"
          fill="none"
          strokeDasharray={`${2.83 * Math.PI * percent} ${2.83 * Math.PI * (100 - percent)}`}
          strokeDashoffset={2.83 * Math.PI * 25}
        />
      </svg>
      <div className="text-center font-bold text-xl" style={{ color: textColor }}>
        {formatTextValue(value)}
      </div>
    </div>
  );
};

const TechnicalPerformance: React.FC<TechnicalPerformanceProps> = ({ 
  data, 
  preferences,
  onToggleCollapse 
}) => {
  const isCollapsed = preferences.collapsedSections.includes('Technical');
  const [activeTab, setActiveTab] = useState('1');
  const [selectedSystem, setSelectedSystem] = useState('');
  
  // Format data for radar chart
  const radarData = data.radarChartData.kpp;
  
  const formattedKPPs = data.kpps.map(kpp => ({
    key: kpp.id,
    name: kpp.name,
    actualValue: kpp.actual,
    targetValue: kpp.target,
    unit: kpp.unit,
    status: kpp.status,
    trend: kpp.trend,
    description: kpp.description,
    completion: Math.round((kpp.actual / kpp.target) * 100)
  }));

  // Calculate overall test progress
  const testProgress = data.testProgress.summary;
  const testCompletionRate = Math.round((testProgress.completed / testProgress.total) * 100);
  const testPassRate = Math.round((testProgress.passed / testProgress.completed) * 100);
  
  // Column definitions for KPP table
  const kppColumns = [
    {
      title: 'Key Performance Parameter',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Tooltip title={record.description}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Actual',
      dataIndex: 'actualValue',
      key: 'actual',
      render: (value: number, record: any) => `${value} ${record.unit}`,
    },
    {
      title: 'Target',
      dataIndex: 'targetValue',
      key: 'target',
      render: (value: number, record: any) => `${value} ${record.unit}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {getStatusIcon(status)} {status}
        </Tag>
      ),
    },
    {
      title: 'Trend',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend: string) => (
        <span>
          {getTrendIcon(trend)} {trend}
        </span>
      ),
    },
    {
      title: 'Completion',
      dataIndex: 'completion',
      key: 'completion',
      render: (completion: number, record: any) => (
        <Progress 
          percent={completion} 
          size="small" 
          status={record.status === 'Red' ? 'exception' : undefined}
          strokeColor={getStatusColor(record.status)}
        />
      ),
    },
  ];

  // Issue table columns
  const issueColumns = [
    {
      title: 'Issue',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <Tooltip title={record.description}>
          <span className="font-medium">{text}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Subsystem',
      dataIndex: 'subsystem',
      key: 'subsystem',
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => {
        const color = severity === 'High' ? 'red' : (severity === 'Medium' ? 'orange' : 'green');
        return <Tag color={color}>{severity}</Tag>;
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        const color = priority === 'High' ? 'red' : (priority === 'Medium' ? 'orange' : 'green');
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = 
          status === 'In Progress' ? 'processing' : 
          status === 'In Analysis' ? 'warning' : 
          status === 'Resolved' ? 'success' : 'default';
        return <Badge status={color as any} text={status} />;
      },
    },
    {
      title: 'Assignment',
      dataIndex: 'assignment',
      key: 'assignment',
    },
    {
      title: 'Target Resolution',
      dataIndex: 'targetResolution',
      key: 'targetResolution',
    },
  ];

  // Requirements traceability data
  const requirementsCategories = data.requirementsTraceability.categories.map(category => ({
    name: category.name,
    verified: category.verified,
    inVerification: category.inVerification,
    notVerified: category.notVerified,
  }));

  // Find subsystem by ID
  const getSubsystemById = (id: string) => {
    return data.subsystems.find(subsystem => subsystem.id === id);
  };

  return (
    <Card 
      className={`shadow-md ${preferences.darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
      title={
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold flex items-center">
            <RocketOutlined className="mr-2" /> Technical Performance Dashboard
          </div>
          <Button 
            type="text"
            icon={isCollapsed ? <CaretUpOutlined /> : <CaretDownOutlined />}
            onClick={onToggleCollapse}
            className={preferences.darkMode ? 'text-white' : ''}
          />
        </div>
      }
    >
      {!isCollapsed && (
        <>
          {/* Performance Summary */}
          <div className="mb-8">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={6}>
                <Card 
                  className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                  bordered={false}
                >
                  <Statistic
                    title="Overall Technical Status"
                    value={data.summary.overall}
                    valueStyle={{ color: getStatusColor(data.summary.overall) }}
                    prefix={getStatusIcon(data.summary.overall)}
                  />
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">
                      {data.summary.openDefects} open defects ({data.summary.criticalDefects} critical)
                    </span>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={9}>
                <Card 
                  className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                  bordered={false}
                >
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <div className="text-sm mb-1">Technology Readiness Level (TRL)</div>
                      <div className="flex justify-center">
                        <SimpleGauge 
                          id="trl-gauge"
                          value={data.trlAssessment.current}
                          maxValue={9}
                          colors={['#ff0000', '#ffff00', '#00ff00']}
                          textColor={preferences.darkMode ? '#ffffff' : '#000000'}
                          formatTextValue={() => `${data.trlAssessment.current}`}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm mb-1">Manufacturing Readiness Level (MRL)</div>
                      <div className="flex justify-center">
                        <SimpleGauge 
                          id="mrl-gauge"
                          value={data.mrlAssessment.current}
                          maxValue={10}
                          colors={['#ff0000', '#ffff00', '#00ff00']}
                          textColor={preferences.darkMode ? '#ffffff' : '#000000'}
                          formatTextValue={() => `${data.mrlAssessment.current}`}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={9}>
                <Card 
                  className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                  bordered={false}
                >
                  <Statistic title="Test Completion" value={testCompletionRate} suffix="%" />
                  <Progress 
                    percent={testCompletionRate} 
                    status={testCompletionRate < 80 ? 'active' : 'success'} 
                    size="small"
                  />
                  <div className="mt-3">
                    <Statistic title="Test Pass Rate" value={testPassRate} suffix="%" />
                    <Progress 
                      percent={testPassRate} 
                      status={testPassRate < 90 ? 'exception' : 'success'}
                      size="small"
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Main Tabs */}
          <Tabs activeKey={activeTab} onChange={setActiveTab} className={preferences.darkMode ? 'text-white tabs-dark' : ''}>
            <TabPane 
              tab={<span><DashboardOutlined />KPP Dashboard</span>}
              key="1"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Card 
                    title="KPP Radar Analysis" 
                    className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                    bordered={false}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart outerRadius={90} data={radarData.categories.map((cat, i) => ({
                        category: cat,
                        actual: radarData.actual[i],
                        target: radarData.target[i]
                      }))}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Actual" dataKey="actual" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.6} />
                        <Radar name="Target" dataKey="target" stroke={COLORS.red} fill={COLORS.red} fillOpacity={0.1} />
                        <Legend />
                        <RechartsTooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
                
                <Col xs={24} lg={12}>
                  <Card 
                    title="Performance Trend Analysis"
                    className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                    bordered={false}
                  >
                    <Tabs defaultActiveKey="1" size="small">
                      {data.kpps.map((kpp, i) => (
                        <TabPane tab={kpp.name} key={i.toString()}>
                          <ResponsiveContainer width="100%" height={240}>
                            <LineChart data={kpp.history}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis domain={['auto', 'auto']} />
                              <RechartsTooltip />
                              <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke={getStatusColor(kpp.status)} 
                                activeDot={{ r: 8 }} 
                              />
                              <CartesianGrid strokeDasharray="3 3" />
                            </LineChart>
                          </ResponsiveContainer>
                          <div className="text-center mt-2">
                            Target: {kpp.target} {kpp.unit}
                          </div>
                        </TabPane>
                      ))}
                    </Tabs>
                  </Card>
                </Col>
                
                <Col xs={24}>
                  <Card 
                    title="Key Performance Parameters" 
                    className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                    bordered={false}
                  >
                    <Table 
                      dataSource={formattedKPPs} 
                      columns={kppColumns} 
                      pagination={false}
                      className={preferences.darkMode ? 'table-dark' : ''}
                      rowKey="key"
                    />
                  </Card>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane 
              tab={<span><ExperimentOutlined />Subsystems</span>}
              key="2"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={8}>
                  <Card 
                    title="Subsystem Status" 
                    className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                    bordered={false}
                  >
                    <div className="space-y-4">
                      {data.subsystems.map((subsystem) => (
                        <div 
                          key={subsystem.id}
                          className={`p-3 rounded-lg border cursor-pointer ${
                            selectedSystem === subsystem.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200'
                          }`}
                          onClick={() => setSelectedSystem(subsystem.id)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="font-medium">
                              {subsystem.name}
                            </div>
                            <Tag color={getStatusColor(subsystem.status)}>
                              {subsystem.status}
                            </Tag>
                          </div>
                          <Progress 
                            percent={subsystem.completion} 
                            size="small"
                            status={subsystem.status === 'Red' ? 'exception' : undefined}
                            strokeColor={getStatusColor(subsystem.status)}
                          />
                          <div className="text-sm text-gray-500 mt-1">
                            {subsystem.defectCount} open defects
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </Col>
                
                <Col xs={24} lg={16}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24}>
                      <Card 
                        title="Subsystem Overview" 
                        className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                        bordered={false}
                      >
                        <div className="p-6 text-center">
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart 
                              data={data.subsystems}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis domain={[0, 100]} />
                              <RechartsTooltip />
                              <Legend />
                              <Bar 
                                dataKey="completion" 
                                name="Completion %" 
                                fill={COLORS.blue} 
                                background={{ fill: '#eee' }}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                          <div className="mt-2 text-sm text-center text-gray-500">
                            Click on a subsystem to view detailed metrics
                          </div>
                        </div>
                      </Card>
                    </Col>
                    
                    <Col xs={24}>
                      <Card 
                        title={`Subsystem Metrics ${
                          selectedSystem ? ` - ${getSubsystemById(selectedSystem)?.name || ''}` : ''
                        }`}
                        className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                        bordered={false}
                      >
                        {selectedSystem ? (
                          <div>
                            <Row gutter={[16, 16]}>
                              {getSubsystemById(selectedSystem)?.metrics.map((metric, index) => (
                                <Col xs={24} md={8} key={index}>
                                  <Card 
                                    bordered 
                                    className={`${preferences.darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                                  >
                                    <Statistic
                                      title={metric.name}
                                      value={metric.value}
                                      suffix={metric.unit}
                                      valueStyle={{ color: getStatusColor(metric.status) }}
                                    />
                                    <div className="mt-2">
                                      <small>Target: {metric.target} {metric.unit}</small>
                                      <Progress 
                                        percent={Math.round((metric.value / metric.target) * 100)} 
                                        size="small"
                                        status={metric.status === 'Red' ? 'exception' : undefined}
                                        strokeColor={getStatusColor(metric.status)}
                                      />
                                    </div>
                                  </Card>
                                </Col>
                              ))}
                            </Row>
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            Select a subsystem to view detailed metrics
                          </div>
                        )}
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane 
              tab={<span><BugOutlined />Issues & Risks</span>}
              key="3"
            >
              <Card 
                title="Technical Issues" 
                className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                bordered={false}
              >
                <Table 
                  dataSource={data.issues} 
                  columns={issueColumns} 
                  pagination={false}
                  className={preferences.darkMode ? 'table-dark' : ''}
                  rowKey="id"
                />
              </Card>
            </TabPane>
            
            <TabPane 
              tab={<span><FileSearchOutlined />Requirements Traceability</span>}
              key="4"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={8}>
                  <Card 
                    title="Requirements Status" 
                    className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                    bordered={false}
                  >
                    <Statistic
                      title="Total Requirements"
                      value={data.requirementsTraceability.totalRequirements}
                    />
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span>Verified</span>
                        <span>{data.requirementsTraceability.verified} ({Math.round((data.requirementsTraceability.verified / data.requirementsTraceability.totalRequirements) * 100)}%)</span>
                      </div>
                      <Progress 
                        percent={Math.round((data.requirementsTraceability.verified / data.requirementsTraceability.totalRequirements) * 100)}
                        status="success"
                        showInfo={false}
                        strokeColor={COLORS.green}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between mb-1">
                        <span>In Verification</span>
                        <span>{data.requirementsTraceability.inVerification} ({Math.round((data.requirementsTraceability.inVerification / data.requirementsTraceability.totalRequirements) * 100)}%)</span>
                      </div>
                      <Progress 
                        percent={Math.round((data.requirementsTraceability.inVerification / data.requirementsTraceability.totalRequirements) * 100)}
                        status="active"
                        showInfo={false}
                        strokeColor={COLORS.yellow}
                      />
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between mb-1">
                        <span>Not Verified</span>
                        <span>{data.requirementsTraceability.notVerified} ({Math.round((data.requirementsTraceability.notVerified / data.requirementsTraceability.totalRequirements) * 100)}%)</span>
                      </div>
                      <Progress 
                        percent={Math.round((data.requirementsTraceability.notVerified / data.requirementsTraceability.totalRequirements) * 100)}
                        status="exception"
                        showInfo={false}
                        strokeColor={COLORS.red}
                      />
                    </div>
                  </Card>
                </Col>
                
                <Col xs={24} lg={16}>
                  <Card 
                    title="Requirements by Category" 
                    className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                    bordered={false}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart 
                        data={requirementsCategories}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="verified" stackId="a" fill={COLORS.green} name="Verified" />
                        <Bar dataKey="inVerification" stackId="a" fill={COLORS.yellow} name="In Verification" />
                        <Bar dataKey="notVerified" stackId="a" fill={COLORS.red} name="Not Verified" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
                
                <Col xs={24}>
                  <Card 
                    title="Top Unverified Requirements" 
                    className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}
                    bordered={false}
                  >
                    <Table 
                      dataSource={data.requirementsTraceability.topUnverified} 
                      columns={[
                        {
                          title: 'ID',
                          dataIndex: 'id',
                          key: 'id',
                        },
                        {
                          title: 'Description',
                          dataIndex: 'description',
                          key: 'description',
                        },
                        {
                          title: 'Category',
                          dataIndex: 'category',
                          key: 'category',
                          render: (category: string) => <Tag>{category}</Tag>,
                        },
                      ]} 
                      pagination={false}
                      className={preferences.darkMode ? 'table-dark' : ''}
                      rowKey="id"
                    />
                  </Card>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane 
              tab={<span><ToolOutlined />Tech Readiness</span>}
              key="5"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                  <Card 
                    title="Technology Readiness Level (TRL)" 
                    className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                    bordered={false}
                  >
                    <div className="text-center mb-4">
                      <div className="flex justify-center">
                        <SimpleGauge 
                          id="trl-gauge-large"
                          value={data.trlAssessment.current}
                          maxValue={9}
                          colors={['#ff0000', '#ffff00', '#00ff00']}
                          textColor={preferences.darkMode ? '#ffffff' : '#000000'}
                          formatTextValue={() => `TRL ${data.trlAssessment.current}`}
                        />
                      </div>
                      <div className="mt-4">
                        <div className="font-bold">Next Milestone: TRL {data.trlAssessment.nextMilestone.level}</div>
                        <div className="text-sm text-gray-500">{data.trlAssessment.nextMilestone.criteria}</div>
                        <div className="text-sm text-gray-500">Target Date: {data.trlAssessment.nextMilestone.targetDate}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="font-medium mb-2">TRL History</div>
                      <ResponsiveContainer width="100%" height={150}>
                        <LineChart data={data.trlAssessment.history}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[5, 9]} />
                          <RechartsTooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={COLORS.blue} 
                            activeDot={{ r: 8 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </Col>
                
                <Col xs={24} lg={12}>
                  <Card 
                    title="Manufacturing Readiness Level (MRL)" 
                    className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                    bordered={false}
                  >
                    <div className="text-center mb-4">
                      <div className="flex justify-center">
                        <SimpleGauge 
                          id="mrl-gauge-large"
                          value={data.mrlAssessment.current}
                          maxValue={10}
                          colors={['#ff0000', '#ffff00', '#00ff00']}
                          textColor={preferences.darkMode ? '#ffffff' : '#000000'}
                          formatTextValue={() => `MRL ${data.mrlAssessment.current}`}
                        />
                      </div>
                      <div className="mt-4">
                        <div className="font-bold">Next Milestone: MRL {data.mrlAssessment.nextMilestone.level}</div>
                        <div className="text-sm text-gray-500">{data.mrlAssessment.nextMilestone.criteria}</div>
                        <div className="text-sm text-gray-500">Target Date: {data.mrlAssessment.nextMilestone.targetDate}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="font-medium mb-2">MRL History</div>
                      <ResponsiveContainer width="100%" height={150}>
                        <LineChart data={data.mrlAssessment.history}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis domain={[4, 10]} />
                          <RechartsTooltip />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={COLORS.purple} 
                            activeDot={{ r: 8 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </Col>
                
                <Col xs={24}>
                  <Card 
                    title="Subsystem Readiness Levels" 
                    className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                    bordered={false}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[...data.trlAssessment.subsystems].map(sub => ({
                          name: sub.name,
                          trl: sub.level,
                          mrl: data.mrlAssessment.subsystems.find(s => s.name === sub.name)?.level || 0
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="trl" fill={COLORS.blue} name="TRL" />
                        <Bar dataKey="mrl" fill={COLORS.purple} name="MRL" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </>
      )}
    </Card>
  );
};

export default TechnicalPerformance; 