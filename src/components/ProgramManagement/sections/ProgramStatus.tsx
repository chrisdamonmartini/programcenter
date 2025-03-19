import React from 'react';
import { Card, Progress, Typography, Row, Col, Tag, Divider } from 'antd';
import { CheckCircleOutlined, WarningOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ProgramStatusProps {
  data: {
    overallHealth: string;
    budget: {
      status: string;
      percentage: number;
      details: string;
    };
    schedule: {
      status: string;
      percentage: number;
      details: string;
    };
    technical: {
      status: string;
      percentage: number;
      details: string;
    };
    risk: {
      status: string;
      percentage: number;
      details: string;
    };
    compliance: {
      status: string;
      percentage: number;
      details: string;
    };
  };
  preferences?: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse?: () => void;
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Green':
      return 'success';
    case 'Yellow':
      return 'warning';
    case 'Red':
      return 'error';
    default:
      return 'default';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Green':
      return <CheckCircleOutlined />;
    case 'Yellow':
      return <WarningOutlined />;
    case 'Red':
      return <CloseCircleOutlined />;
    default:
      return null;
  }
};

const getProgressColor = (status: string): string => {
  switch (status) {
    case 'Green':
      return '#52c41a';
    case 'Yellow':
      return '#faad14';
    case 'Red':
      return '#f5222d';
    default:
      return '#1890ff';
  }
};

const ProgramStatus: React.FC<ProgramStatusProps> = ({ 
  data, 
  preferences = { darkMode: false, collapsedSections: [] },
  onToggleCollapse 
}) => {
  const isCollapsed = preferences.collapsedSections.includes('ProgramStatus');

  return (
    <Card 
      className={`shadow-md ${preferences.darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
      title={
        <div className="flex justify-between items-center">
          <Title level={4} className={preferences.darkMode ? 'text-white mb-0' : 'mb-0'}>
            Program Status Dashboard
          </Title>
          <button 
            onClick={onToggleCollapse}
            className="text-gray-400 hover:text-gray-600"
          >
            {isCollapsed ? '▼' : '▲'}
          </button>
        </div>
      }
    >
      {!isCollapsed && (
        <>
          <div className="flex justify-center items-center mb-8">
            <div className="text-center">
              <div className="mb-2">
                <Tag 
                  icon={getStatusIcon(data.overallHealth)}
                  color={getStatusColor(data.overallHealth)} 
                  className="text-lg px-4 py-1"
                >
                  OVERALL PROGRAM HEALTH: {data.overallHealth}
                </Tag>
              </div>
              <Text type="secondary" className={preferences.darkMode ? 'text-gray-300' : ''}>
                Last updated: May 15, 2024
              </Text>
            </div>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card 
                className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                bordered={false}
              >
                <Title level={5} className={preferences.darkMode ? 'text-white' : ''}>
                  <Tag color={getStatusColor(data.budget.status)}>
                    {getStatusIcon(data.budget.status)} Budget
                  </Tag>
                </Title>
                <Progress 
                  percent={data.budget.percentage} 
                  strokeColor={getProgressColor(data.budget.status)} 
                  status={data.budget.status === 'Red' ? 'exception' : undefined}
                />
                <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {data.budget.details}
                </Text>
              </Card>
            </Col>
            
            <Col xs={24} lg={12}>
              <Card 
                className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                bordered={false}
              >
                <Title level={5} className={preferences.darkMode ? 'text-white' : ''}>
                  <Tag color={getStatusColor(data.schedule.status)}>
                    {getStatusIcon(data.schedule.status)} Schedule
                  </Tag>
                </Title>
                <Progress 
                  percent={data.schedule.percentage} 
                  strokeColor={getProgressColor(data.schedule.status)}
                  status={data.schedule.status === 'Red' ? 'exception' : undefined}
                />
                <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {data.schedule.details}
                </Text>
              </Card>
            </Col>
            
            <Col xs={24} lg={8}>
              <Card 
                className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                bordered={false}
              >
                <Title level={5} className={preferences.darkMode ? 'text-white' : ''}>
                  <Tag color={getStatusColor(data.technical.status)}>
                    {getStatusIcon(data.technical.status)} Technical
                  </Tag>
                </Title>
                <Progress 
                  type="circle" 
                  percent={data.technical.percentage} 
                  width={80}
                  strokeColor={getProgressColor(data.technical.status)}
                  status={data.technical.status === 'Red' ? 'exception' : undefined}
                  className="my-2"
                />
                <div className="mt-2">
                  <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {data.technical.details}
                  </Text>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} lg={8}>
              <Card 
                className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                bordered={false}
              >
                <Title level={5} className={preferences.darkMode ? 'text-white' : ''}>
                  <Tag color={getStatusColor(data.risk.status)}>
                    {getStatusIcon(data.risk.status)} Risk
                  </Tag>
                </Title>
                <Progress 
                  type="circle" 
                  percent={data.risk.percentage} 
                  width={80}
                  strokeColor={getProgressColor(data.risk.status)}
                  status={data.risk.status === 'Red' ? 'exception' : undefined}
                  className="my-2"
                />
                <div className="mt-2">
                  <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {data.risk.details}
                  </Text>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} lg={8}>
              <Card 
                className={`${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
                bordered={false}
              >
                <Title level={5} className={preferences.darkMode ? 'text-white' : ''}>
                  <Tag color={getStatusColor(data.compliance.status)}>
                    {getStatusIcon(data.compliance.status)} Compliance
                  </Tag>
                </Title>
                <Progress 
                  type="circle" 
                  percent={data.compliance.percentage} 
                  width={80}
                  strokeColor={getProgressColor(data.compliance.status)}
                  status={data.compliance.status === 'Red' ? 'exception' : undefined}
                  className="my-2"
                />
                <div className="mt-2">
                  <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {data.compliance.details}
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Card>
  );
};

export default ProgramStatus; 