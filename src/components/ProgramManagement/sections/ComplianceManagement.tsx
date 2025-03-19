import React, { useState } from 'react';
import { Card, Table, Tabs, Typography, Tag, Progress, Row, Col, List, Badge, Statistic } from 'antd';
import { SafetyOutlined, FileProtectOutlined, GlobalOutlined, SafetyCertificateOutlined, AuditOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

interface ComplianceManagementProps {
  data: {
    contractCompliance: {
      id: string;
      requirement: string;
      status: string;
      lastReviewed: string;
      notes: string;
    }[];
    securityClassification: {
      overall: string;
      components: {
        name: string;
        level: string;
        authority: string;
      }[];
    };
    exportControl: {
      category: string;
      description: string;
      compliance: string;
      lastReviewed: string;
    }[];
    cybersecurity: {
      cmmcLevel: string;
      nist800171: {
        total: number;
        implemented: number;
        inProgress: number;
        lastAssessment: string;
      };
      incidents: any[];
      nextAssessment: string;
    };
    audits: {
      id: string;
      type: string;
      date: string;
      status: string;
      findings: number | null;
      open: number | null;
    }[];
  };
  preferences?: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse?: () => void;
}

const ComplianceManagement: React.FC<ComplianceManagementProps> = ({
  data,
  preferences = { darkMode: false, collapsedSections: [] },
  onToggleCollapse
}) => {
  const isCollapsed = preferences.collapsedSections.includes('ComplianceManagement');
  const [activeTab, setActiveTab] = useState('1');

  const contractComplianceColumns = [
    {
      title: 'Requirement',
      dataIndex: 'requirement',
      key: 'requirement',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Compliant' ? 'success' : 'error'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Last Reviewed',
      dataIndex: 'lastReviewed',
      key: 'lastReviewed',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
  ];

  const securityClassificationColumns = [
    {
      title: 'Component',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Classification Level',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => {
        let color = 'blue';
        if (level === 'Top Secret') color = 'red';
        if (level === 'Secret') color = 'orange';
        if (level === 'Confidential') color = 'blue';
        
        return (
          <Tag color={color}>
            {level}
          </Tag>
        );
      },
    },
    {
      title: 'Authority',
      dataIndex: 'authority',
      key: 'authority',
    },
  ];

  const exportControlColumns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Compliance',
      dataIndex: 'compliance',
      key: 'compliance',
      render: (status: string) => (
        <Tag color={status === 'Compliant' ? 'success' : 'error'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Last Reviewed',
      dataIndex: 'lastReviewed',
      key: 'lastReviewed',
    },
  ];

  const auditColumns = [
    {
      title: 'Audit Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Completed' ? 'success' : 'processing'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Findings',
      key: 'findings',
      render: (record: any) => (
        <>
          {record.findings !== null ? (
            <span>
              {record.findings} ({record.open} open)
            </span>
          ) : (
            <span>N/A</span>
          )}
        </>
      ),
    },
  ];

  return (
    <Card
      className={`shadow-md ${preferences.darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
      title={
        <div className="flex justify-between items-center">
          <Title level={4} className={preferences.darkMode ? 'text-white mb-0' : 'mb-0'}>
            <SafetyOutlined className="mr-2" />
            Compliance & Regulatory Oversight
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
            tab={<span><FileProtectOutlined />Contract Compliance</span>} 
            key="1"
          >
            <Table 
              dataSource={data.contractCompliance} 
              columns={contractComplianceColumns} 
              rowKey="id"
              pagination={false}
              className={preferences.darkMode ? 'table-dark' : ''}
            />
          </TabPane>
          
          <TabPane 
            tab={<span><SafetyOutlined />Security Classification</span>} 
            key="2"
          >
            <div className="mb-6">
              <Card 
                bordered={false}
                className={`mb-6 ${preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}`}
              >
                <Row>
                  <Col span={12}>
                    <Title level={5} className={preferences.darkMode ? 'text-white' : ''}>
                      Overall Program Classification
                    </Title>
                    <Tag color="orange" className="text-lg px-4 py-1">
                      {data.securityClassification.overall}
                    </Tag>
                  </Col>
                  <Col span={12}>
                    <Title level={5} className={preferences.darkMode ? 'text-white' : ''}>
                      Classification Authority
                    </Title>
                    <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Program Security Classification Guide Rev 2.3
                    </Text>
                  </Col>
                </Row>
              </Card>
              
              <Title level={5} className={preferences.darkMode ? 'text-white' : ''}>
                Component Security Classifications
              </Title>
              <Table 
                dataSource={data.securityClassification.components} 
                columns={securityClassificationColumns} 
                rowKey="name"
                pagination={false}
                className={preferences.darkMode ? 'table-dark' : ''}
              />
            </div>
          </TabPane>
          
          <TabPane 
            tab={<span><GlobalOutlined />Export Control</span>} 
            key="3"
          >
            <Table 
              dataSource={data.exportControl} 
              columns={exportControlColumns} 
              rowKey="category"
              pagination={false}
              className={preferences.darkMode ? 'table-dark' : ''}
            />
          </TabPane>
          
          <TabPane 
            tab={<span><SafetyCertificateOutlined />Cybersecurity</span>} 
            key="4"
          >
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Card 
                  bordered={false}
                  className={preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}
                >
                  <Statistic
                    title={<span className={preferences.darkMode ? 'text-white' : ''}>CMMC Level</span>}
                    value={data.cybersecurity.cmmcLevel}
                    valueStyle={{ color: '#1890ff' }}
                    suffix={<span className="text-sm">/ 5</span>}
                  />
                </Card>
              </Col>
              
              <Col xs={24} md={8}>
                <Card 
                  bordered={false}
                  className={preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}
                >
                  <Statistic
                    title={<span className={preferences.darkMode ? 'text-white' : ''}>NIST 800-171</span>}
                    value={data.cybersecurity.nist800171.implemented}
                    valueStyle={{ color: '#52c41a' }}
                    suffix={<span className="text-sm">/ {data.cybersecurity.nist800171.total}</span>}
                  />
                  <Progress 
                    percent={Math.round((data.cybersecurity.nist800171.implemented / data.cybersecurity.nist800171.total) * 100)} 
                    size="small"
                    status="success"
                  />
                  <Text className={preferences.darkMode ? 'text-gray-300' : 'text-gray-500'}>
                    {data.cybersecurity.nist800171.inProgress} controls in progress
                  </Text>
                </Card>
              </Col>
              
              <Col xs={24} md={8}>
                <Card 
                  bordered={false}
                  className={preferences.darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}
                >
                  <Statistic
                    title={<span className={preferences.darkMode ? 'text-white' : ''}>Cybersecurity Incidents</span>}
                    value={data.cybersecurity.incidents.length}
                    valueStyle={{ color: '#52c41a' }}
                  />
                  <Paragraph className={preferences.darkMode ? 'text-gray-300 mt-2' : 'text-gray-600 mt-2'}>
                    Last assessment: {data.cybersecurity.nist800171.lastAssessment}
                  </Paragraph>
                  <Paragraph className={preferences.darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Next assessment: {data.cybersecurity.nextAssessment}
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </TabPane>
          
          <TabPane 
            tab={<span><AuditOutlined />Audits & Certifications</span>} 
            key="5"
          >
            <Table 
              dataSource={data.audits} 
              columns={auditColumns} 
              rowKey="id"
              pagination={false}
              className={preferences.darkMode ? 'table-dark' : ''}
            />
          </TabPane>
        </Tabs>
      )}
    </Card>
  );
};

export default ComplianceManagement; 