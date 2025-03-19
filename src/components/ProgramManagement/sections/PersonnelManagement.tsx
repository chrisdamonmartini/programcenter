import React, { useState } from 'react';
import { Card, Table, Tabs, Typography, Tag, Progress, Row, Col, Badge } from 'antd';
import { UserOutlined, TeamOutlined, SafetyCertificateOutlined, KeyOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface PersonnelManagementProps {
  data: {
    keyPersonnel: {
      id: string;
      name: string;
      role: string;
      organization: string;
      clearance: string;
      availability: string;
      status: string;
    }[];
    resourceAllocation: {
      engineering: {
        allocated: number;
        required: number;
        status: string;
      };
      manufacturing: {
        allocated: number;
        required: number;
        status: string;
      };
      testing: {
        allocated: number;
        required: number;
        status: string;
      };
      management: {
        allocated: number;
        required: number;
        status: string;
      };
      support: {
        allocated: number;
        required: number;
        status: string;
      };
    };
    trainingCertification: {
      id: string;
      name: string;
      personnel: number;
      compliant: number;
      dueDate: string;
      status: string;
    }[];
    securityClearance: {
      tsSci: {
        required: number;
        active: number;
        inProcess: number;
      };
      secret: {
        required: number;
        active: number;
        inProcess: number;
      };
      confidential: {
        required: number;
        active: number;
        inProcess: number;
      };
    };
  };
  preferences?: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse?: () => void;
}

const PersonnelManagement: React.FC<PersonnelManagementProps> = ({
  data,
  preferences = { darkMode: false, collapsedSections: [] },
  onToggleCollapse
}) => {
  const isCollapsed = preferences.collapsedSections.includes('PersonnelManagement');
  const [activeTab, setActiveTab] = useState('1');

  const getStatusColor = (status: string): string => {
    if (status === 'Active') return 'success';
    if (status === 'On leave until 06/15/2024') return 'warning';
    if (status.includes('Red')) return 'error';
    if (status.includes('Yellow')) return 'warning';
    if (status.includes('Green')) return 'success';
    return 'default';
  };

  const keyPersonnelColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Organization',
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: 'Clearance',
      dataIndex: 'clearance',
      key: 'clearance',
      render: (text: string) => (
        <Tag color={text.includes('SCI') ? 'red' : 'blue'}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <Tag color={getStatusColor(text)}>
          {text}
        </Tag>
      ),
    },
  ];

  const trainingColumns = [
    {
      title: 'Training',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Compliance',
      dataIndex: 'id',
      key: 'compliance',
      render: (id: string, record: any) => (
        <div>
          <Progress 
            percent={Math.round((record.compliant / record.personnel) * 100)} 
            size="small"
            status={getProgressStatus(record.status)}
            format={() => `${record.compliant}/${record.personnel}`}
          />
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
  ];

  const getProgressStatus = (status: string) => {
    if (status === 'Red') return 'exception';
    if (status === 'Yellow') return 'active';
    if (status === 'Green') return 'success';
    return 'normal';
  };

  return (
    <Card
      className={`shadow-md ${preferences.darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
      title={
        <div className="flex justify-between items-center">
          <Title level={4} className={preferences.darkMode ? 'text-white mb-0' : 'mb-0'}>
            <TeamOutlined className="mr-2" />
            Personnel & Resource Management
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
        <Tabs activeKey={activeTab} onChange={setActiveTab} className={preferences.darkMode ? 'text-white tabs-dark' : ''}>
          <TabPane 
            tab={<span><UserOutlined />Key Personnel</span>} 
            key="1"
          >
            <Table 
              dataSource={data.keyPersonnel} 
              columns={keyPersonnelColumns} 
              rowKey="id"
              pagination={false}
              className={preferences.darkMode ? 'table-dark' : ''}
            />
          </TabPane>
          
          <TabPane 
            tab={<span><TeamOutlined />Resource Allocation</span>} 
            key="2"
          >
            <Row gutter={[24, 24]}>
              {Object.entries(data.resourceAllocation).map(([dept, info]) => (
                <Col xs={24} md={12} xl={8} key={dept}>
                  <Card 
                    title={dept.charAt(0).toUpperCase() + dept.slice(1)} 
                    bordered={false}
                    className={preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}
                  >
                    <div className="flex justify-between mb-2">
                      <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Required: {info.required}
                      </Text>
                      <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Allocated: {info.allocated}
                      </Text>
                    </div>
                    <Progress 
                      percent={Math.round((info.allocated / info.required) * 100)} 
                      status={getProgressStatus(info.status)}
                    />
                    <div className="mt-2">
                      <Tag color={getStatusColor(info.status)}>
                        {info.status}
                      </Tag>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
          
          <TabPane 
            tab={<span><SafetyCertificateOutlined />Training & Certification</span>} 
            key="3"
          >
            <Table 
              dataSource={data.trainingCertification} 
              columns={trainingColumns} 
              rowKey="id"
              pagination={false}
              className={preferences.darkMode ? 'table-dark' : ''}
            />
          </TabPane>
          
          <TabPane 
            tab={<span><KeyOutlined />Security Clearance</span>} 
            key="4"
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={8}>
                <Card 
                  title="TS/SCI" 
                  bordered={false}
                  className={preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}
                  extra={<Badge count={data.securityClearance.tsSci.inProcess} overflowCount={99} />}
                >
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold">{data.securityClearance.tsSci.active}</span>
                    <span className="text-gray-500 ml-2">/ {data.securityClearance.tsSci.required}</span>
                  </div>
                  <Progress 
                    percent={Math.round((data.securityClearance.tsSci.active / data.securityClearance.tsSci.required) * 100)} 
                    status={data.securityClearance.tsSci.active < data.securityClearance.tsSci.required ? 'exception' : 'success'}
                  />
                  <div className="mt-2 text-center">
                    <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-500'}>
                      {data.securityClearance.tsSci.inProcess} in process
                    </Text>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} lg={8}>
                <Card 
                  title="Secret" 
                  bordered={false}
                  className={preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}
                  extra={<Badge count={data.securityClearance.secret.inProcess} overflowCount={99} />}
                >
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold">{data.securityClearance.secret.active}</span>
                    <span className="text-gray-500 ml-2">/ {data.securityClearance.secret.required}</span>
                  </div>
                  <Progress 
                    percent={Math.round((data.securityClearance.secret.active / data.securityClearance.secret.required) * 100)} 
                    status={data.securityClearance.secret.active < data.securityClearance.secret.required ? 'exception' : 'success'}
                  />
                  <div className="mt-2 text-center">
                    <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-500'}>
                      {data.securityClearance.secret.inProcess} in process
                    </Text>
                  </div>
                </Card>
              </Col>
              
              <Col xs={24} lg={8}>
                <Card 
                  title="Confidential" 
                  bordered={false}
                  className={preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}
                  extra={<Badge count={data.securityClearance.confidential.inProcess} overflowCount={99} />}
                >
                  <div className="text-center mb-4">
                    <span className="text-3xl font-bold">{data.securityClearance.confidential.active}</span>
                    <span className="text-gray-500 ml-2">/ {data.securityClearance.confidential.required}</span>
                  </div>
                  <Progress 
                    percent={Math.round((data.securityClearance.confidential.active / data.securityClearance.confidential.required) * 100)} 
                    status={data.securityClearance.confidential.active < data.securityClearance.confidential.required ? 'exception' : 'success'}
                  />
                  <div className="mt-2 text-center">
                    <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-500'}>
                      {data.securityClearance.confidential.inProcess} in process
                    </Text>
                  </div>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      )}
    </Card>
  );
};

export default PersonnelManagement; 