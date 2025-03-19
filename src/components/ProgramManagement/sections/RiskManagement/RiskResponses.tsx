import React, { useState } from 'react';
import { 
  Card, Typography, Table, Tag, Tooltip, 
  Progress, Row, Col, Space, Timeline,
  Collapse, Tabs, Badge
} from 'antd';
import { 
  CheckCircleOutlined, CloseCircleOutlined, 
  WarningOutlined, ClockCircleOutlined,
  InfoCircleOutlined, FileTextOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;
const { TabPane } = Tabs;

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
  riskScore: number;
}

interface RiskResponsesProps {
  risks: Risk[];
  darkMode: boolean;
}

// Example response strategy types
type ResponseStrategy = 'Avoid' | 'Mitigate' | 'Transfer' | 'Accept';

// Extended risk type with response strategy
interface RiskWithStrategy extends Risk {
  responseStrategy: ResponseStrategy;
  mitigationSteps?: {
    id: string;
    description: string;
    status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
    dueDate?: string;
    assignee?: string;
    notes?: string;
  }[];
  contingencyPlan?: string;
  fallbackPlan?: string;
}

const RiskResponses: React.FC<RiskResponsesProps> = ({ risks, darkMode }) => {
  const [activeTab, setActiveTab] = useState<string>('1');
  
  // Assign mock response strategies to risks
  const risksWithStrategies: RiskWithStrategy[] = risks.map(risk => {
    // Assign strategies based on risk score
    let responseStrategy: ResponseStrategy = 'Accept';
    
    if (risk.riskScore >= 15) {
      responseStrategy = 'Avoid';
    } else if (risk.riskScore >= 10) {
      responseStrategy = 'Mitigate';
    } else if (risk.riskScore >= 5) {
      responseStrategy = 'Transfer';
    }
    
    // Mock mitigation steps
    const mitigationSteps = [
      {
        id: `${risk.id}-step-1`,
        description: `Review ${risk.title} with stakeholders`,
        status: 'Completed' as const,
        dueDate: '2023-03-15',
        assignee: risk.owner,
        notes: 'All stakeholders have been informed and provided feedback'
      },
      {
        id: `${risk.id}-step-2`,
        description: 'Develop detailed mitigation plan',
        status: 'In Progress' as const,
        dueDate: '2023-04-01',
        assignee: risk.owner,
        notes: 'Draft plan in review'
      },
      {
        id: `${risk.id}-step-3`,
        description: 'Implement mitigation measures',
        status: 'Pending' as const,
        dueDate: '2023-04-15',
        assignee: risk.owner
      }
    ];
    
    return {
      ...risk,
      responseStrategy,
      mitigationSteps,
      contingencyPlan: `If ${risk.title} occurs, we will implement the following steps: 1) Notify stakeholders, 2) Activate response team, 3) Execute recovery procedures`,
      fallbackPlan: `If mitigation fails, we will: 1) Escalate to program management, 2) Adjust timeline and deliverables, 3) Allocate additional resources`
    };
  });

  // Sort risks by score in descending order
  const sortedRisks = [...risksWithStrategies].sort((a, b) => b.riskScore - a.riskScore);
  
  // Group risks by response strategy
  const risksByStrategy: Record<ResponseStrategy, RiskWithStrategy[]> = {
    'Avoid': sortedRisks.filter(r => r.responseStrategy === 'Avoid'),
    'Mitigate': sortedRisks.filter(r => r.responseStrategy === 'Mitigate'),
    'Transfer': sortedRisks.filter(r => r.responseStrategy === 'Transfer'),
    'Accept': sortedRisks.filter(r => r.responseStrategy === 'Accept')
  };
  
  // Get color for response strategy
  const getStrategyColor = (strategy: ResponseStrategy) => {
    const colorMap: Record<ResponseStrategy, string> = {
      'Avoid': 'red',
      'Mitigate': 'orange',
      'Transfer': 'blue',
      'Accept': 'green'
    };
    
    return colorMap[strategy];
  };
  
  // Get icon for response strategy
  const getStrategyIcon = (strategy: ResponseStrategy) => {
    const iconMap: Record<ResponseStrategy, React.ReactNode> = {
      'Avoid': <CloseCircleOutlined />,
      'Mitigate': <WarningOutlined />,
      'Transfer': <InfoCircleOutlined />,
      'Accept': <CheckCircleOutlined />
    };
    
    return iconMap[strategy];
  };
  
  // Get status badge for mitigation step
  const getStepStatusBadge = (status: string) => {
    const statusMap: Record<string, { status: string; text: string }> = {
      'Completed': { status: 'success', text: 'Completed' },
      'In Progress': { status: 'processing', text: 'In Progress' },
      'Pending': { status: 'default', text: 'Pending' },
      'Delayed': { status: 'error', text: 'Delayed' }
    };
    
    const config = statusMap[status] || { status: 'default', text: status };
    
    return <Badge status={config.status as any} text={config.text} />;
  };
  
  // Render mitigation steps for a risk
  const renderMitigationSteps = (steps: RiskWithStrategy['mitigationSteps']) => {
    if (!steps || steps.length === 0) {
      return <Text type="secondary">No mitigation steps defined</Text>;
    }
    
    return (
      <Timeline>
        {steps.map(step => (
          <Timeline.Item 
            key={step.id}
            color={
              step.status === 'Completed' ? 'green' :
              step.status === 'In Progress' ? 'blue' :
              step.status === 'Delayed' ? 'red' : 'gray'
            }
          >
            <div>
              <Text strong>{step.description}</Text>
              <div style={{ marginTop: 8 }}>
                {getStepStatusBadge(step.status)}
                {step.dueDate && (
                  <Text type="secondary" style={{ marginLeft: 16 }}>
                    Due: {step.dueDate}
                  </Text>
                )}
                {step.assignee && (
                  <Text type="secondary" style={{ marginLeft: 16 }}>
                    Assignee: {step.assignee}
                  </Text>
                )}
              </div>
              {step.notes && (
                <div style={{ marginTop: 4 }}>
                  <Text type="secondary">{step.notes}</Text>
                </div>
              )}
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    );
  };

  return (
    <div className="risk-responses">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className={darkMode ? 'bg-gray-800 text-white' : ''} 
            bordered={false}
          >
            <Title level={4} className={darkMode ? 'text-white' : ''}>
              Risk Response Planning
            </Title>
            
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              type="card"
              className={darkMode ? 'dark-tabs' : ''}
            >
              <TabPane 
                tab={
                  <span>
                    <FileTextOutlined />
                    Overview
                  </span>
                } 
                key="1"
              >
                <Row gutter={[16, 16]}>
                  {/* Response Strategy Summary */}
                  <Col xs={24} lg={12}>
                    <Card 
                      className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                      bordered={false}
                      title={
                        <Text strong className={darkMode ? 'text-white' : ''}>
                          Response Strategies Summary
                        </Text>
                      }
                    >
                      <div style={{ marginBottom: 16 }}>
                        <Text className={darkMode ? 'text-white' : ''}>
                          Total Risks: {sortedRisks.length}
                        </Text>
                      </div>
                      
                      {/* Avoid strategy */}
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text className={darkMode ? 'text-white' : ''}>
                            <Tag color="red" icon={<CloseCircleOutlined />}>Avoid</Tag>
                            {risksByStrategy['Avoid'].length} risks
                          </Text>
                          <Text className={darkMode ? 'text-white' : ''}>
                            {Math.round((risksByStrategy['Avoid'].length / sortedRisks.length) * 100)}%
                          </Text>
                        </div>
                        <Progress 
                          percent={Math.round((risksByStrategy['Avoid'].length / sortedRisks.length) * 100)} 
                          showInfo={false} 
                          strokeColor="#ff4d4f"
                        />
                      </div>
                      
                      {/* Mitigate strategy */}
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text className={darkMode ? 'text-white' : ''}>
                            <Tag color="orange" icon={<WarningOutlined />}>Mitigate</Tag>
                            {risksByStrategy['Mitigate'].length} risks
                          </Text>
                          <Text className={darkMode ? 'text-white' : ''}>
                            {Math.round((risksByStrategy['Mitigate'].length / sortedRisks.length) * 100)}%
                          </Text>
                        </div>
                        <Progress 
                          percent={Math.round((risksByStrategy['Mitigate'].length / sortedRisks.length) * 100)} 
                          showInfo={false} 
                          strokeColor="#faad14"
                        />
                      </div>
                      
                      {/* Transfer strategy */}
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text className={darkMode ? 'text-white' : ''}>
                            <Tag color="blue" icon={<InfoCircleOutlined />}>Transfer</Tag>
                            {risksByStrategy['Transfer'].length} risks
                          </Text>
                          <Text className={darkMode ? 'text-white' : ''}>
                            {Math.round((risksByStrategy['Transfer'].length / sortedRisks.length) * 100)}%
                          </Text>
                        </div>
                        <Progress 
                          percent={Math.round((risksByStrategy['Transfer'].length / sortedRisks.length) * 100)} 
                          showInfo={false} 
                          strokeColor="#1890ff"
                        />
                      </div>
                      
                      {/* Accept strategy */}
                      <div style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <Text className={darkMode ? 'text-white' : ''}>
                            <Tag color="green" icon={<CheckCircleOutlined />}>Accept</Tag>
                            {risksByStrategy['Accept'].length} risks
                          </Text>
                          <Text className={darkMode ? 'text-white' : ''}>
                            {Math.round((risksByStrategy['Accept'].length / sortedRisks.length) * 100)}%
                          </Text>
                        </div>
                        <Progress 
                          percent={Math.round((risksByStrategy['Accept'].length / sortedRisks.length) * 100)} 
                          showInfo={false} 
                          strokeColor="#52c41a"
                        />
                      </div>
                    </Card>
                  </Col>
                  
                  {/* Strategy Definitions */}
                  <Col xs={24} lg={12}>
                    <Card 
                      className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                      bordered={false}
                      title={
                        <Text strong className={darkMode ? 'text-white' : ''}>
                          Response Strategy Definitions
                        </Text>
                      }
                    >
                      <div style={{ marginBottom: 16 }}>
                        <Text strong className={darkMode ? 'text-white' : ''}>
                          <Tag color="red">Avoid</Tag> Risks
                        </Text>
                        <Paragraph className={darkMode ? 'text-white' : ''}>
                          Eliminate the threat entirely by removing the cause or changing the approach.
                          Applied to high-impact, high-probability risks that require restructuring project elements.
                        </Paragraph>
                      </div>
                      
                      <div style={{ marginBottom: 16 }}>
                        <Text strong className={darkMode ? 'text-white' : ''}>
                          <Tag color="orange">Mitigate</Tag> Risks
                        </Text>
                        <Paragraph className={darkMode ? 'text-white' : ''}>
                          Reduce the probability or impact of the risk to an acceptable threshold.
                          Early preventive action is more effective than trying to repair the damage later.
                        </Paragraph>
                      </div>
                      
                      <div style={{ marginBottom: 16 }}>
                        <Text strong className={darkMode ? 'text-white' : ''}>
                          <Tag color="blue">Transfer</Tag> Risks
                        </Text>
                        <Paragraph className={darkMode ? 'text-white' : ''}>
                          Shift some or all of the negative impact, along with ownership of the response,
                          to a third party. Transfers don't eliminate risks; they reassign responsibility.
                        </Paragraph>
                      </div>
                      
                      <div>
                        <Text strong className={darkMode ? 'text-white' : ''}>
                          <Tag color="green">Accept</Tag> Risks
                        </Text>
                        <Paragraph className={darkMode ? 'text-white' : ''}>
                          Acknowledge the risk and take no preemptive action.
                          Used for risks with low impact or probability, where other strategies aren't cost-effective.
                        </Paragraph>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              
              {/* Tab for each response strategy */}
              {Object.entries(risksByStrategy).map(([strategy, risks]) => (
                <TabPane 
                  tab={
                    <span>
                      {getStrategyIcon(strategy as ResponseStrategy)}
                      {strategy} ({risks.length})
                    </span>
                  } 
                  key={strategy}
                  disabled={risks.length === 0}
                >
                  <Collapse 
                    className={darkMode ? 'dark-collapse' : ''}
                    defaultActiveKey={risks.length > 0 ? [risks[0].id] : []}
                  >
                    {risks.map(risk => (
                      <Panel 
                        key={risk.id} 
                        header={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: 8 }}>
                              <Tag color={getStrategyColor(risk.responseStrategy)}>
                                {risk.responseStrategy}
                              </Tag>
                            </div>
                            <div>
                              <Text strong className={darkMode ? 'text-white' : ''}>
                                {risk.id}: {risk.title}
                              </Text>
                              <div>
                                <Text type="secondary" className={darkMode ? 'text-gray-400' : ''}>
                                  Risk Score: {risk.riskScore} • Priority: {risk.priority} • Owner: {risk.owner}
                                </Text>
                              </div>
                            </div>
                          </div>
                        }
                      >
                        <Row gutter={[16, 16]}>
                          <Col span={24}>
                            <Card 
                              className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                              bordered={false}
                              size="small"
                              title={
                                <Text strong className={darkMode ? 'text-white' : ''}>
                                  Description & Context
                                </Text>
                              }
                            >
                              <Paragraph className={darkMode ? 'text-white' : ''}>
                                {risk.description}
                              </Paragraph>
                            </Card>
                          </Col>
                          
                          <Col span={24}>
                            <Card 
                              className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                              bordered={false}
                              size="small"
                              title={
                                <Text strong className={darkMode ? 'text-white' : ''}>
                                  Mitigation Plan
                                </Text>
                              }
                            >
                              <Paragraph className={darkMode ? 'text-white' : ''}>
                                {risk.mitigationPlan}
                              </Paragraph>
                              
                              <div style={{ marginTop: 16 }}>
                                <Text strong className={darkMode ? 'text-white' : ''}>
                                  Action Steps:
                                </Text>
                                {renderMitigationSteps(risk.mitigationSteps)}
                              </div>
                            </Card>
                          </Col>
                          
                          <Col xs={24} md={12}>
                            <Card 
                              className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                              bordered={false}
                              size="small"
                              title={
                                <Text strong className={darkMode ? 'text-white' : ''}>
                                  Contingency Plan
                                </Text>
                              }
                            >
                              <Paragraph className={darkMode ? 'text-white' : ''}>
                                {risk.contingencyPlan}
                              </Paragraph>
                            </Card>
                          </Col>
                          
                          <Col xs={24} md={12}>
                            <Card 
                              className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                              bordered={false}
                              size="small"
                              title={
                                <Text strong className={darkMode ? 'text-white' : ''}>
                                  Fallback Plan
                                </Text>
                              }
                            >
                              <Paragraph className={darkMode ? 'text-white' : ''}>
                                {risk.fallbackPlan}
                              </Paragraph>
                            </Card>
                          </Col>
                        </Row>
                      </Panel>
                    ))}
                  </Collapse>
                </TabPane>
              ))}
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RiskResponses; 