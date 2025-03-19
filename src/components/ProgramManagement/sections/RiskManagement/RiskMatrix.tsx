import React, { useState } from 'react';
import { 
  Card, Typography, Table, Tag, Tooltip, 
  Button, Select, Space, Row, Col, Alert, Badge
} from 'antd';
import { InfoCircleOutlined, FilterOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

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

interface RiskMatrixProps {
  risks: Risk[];
  darkMode: boolean;
}

const RiskMatrix: React.FC<RiskMatrixProps> = ({ risks, darkMode }) => {
  const [filters, setFilters] = useState({
    status: 'all',
    owner: 'all',
    priority: 'all',
  });
  
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);

  // Matrix dimensions
  const probabilityLevels = [5, 4, 3, 2, 1];
  const impactLevels = [1, 2, 3, 4, 5];
  
  // Map numeric values to text
  const probabilityMap: Record<number, string> = {
    1: 'Very Low (1-20%)',
    2: 'Low (21-40%)',
    3: 'Medium (41-60%)',
    4: 'High (61-80%)',
    5: 'Very High (81-100%)'
  };
  
  const impactMap: Record<number, string> = {
    1: 'Very Low',
    2: 'Low',
    3: 'Medium',
    4: 'High',
    5: 'Very High'
  };

  // Generate unique owners list for filter
  const owners = ['all', ...Array.from(new Set(risks.map(risk => risk.owner)))];
  const statuses = ['all', ...Array.from(new Set(risks.map(risk => risk.status)))];
  const priorities = ['all', ...Array.from(new Set(risks.map(risk => risk.priority)))];

  // Filter risks based on selected filters
  const filteredRisks = risks.filter(risk => {
    return (
      (filters.status === 'all' || risk.status === filters.status) &&
      (filters.owner === 'all' || risk.owner === filters.owner) &&
      (filters.priority === 'all' || risk.priority === filters.priority)
    );
  });

  // Determine cell color based on risk level
  const getCellColor = (probability: number, impact: number) => {
    const score = probability * impact;
    
    if (score >= 15) return { background: '#ff4d4f', color: 'white' };        // High risk
    if (score >= 8 && score < 15) return { background: '#faad14', color: 'black' };  // Medium risk
    if (score >= 3 && score < 8) return { background: '#ffe58f', color: 'black' };   // Low risk
    return { background: '#b7eb8f', color: 'black' };                         // Very low risk
  };

  // Get risks for a specific cell
  const getRisksForCell = (probability: number, impact: number) => {
    return filteredRisks.filter(risk => 
      Math.round(risk.probability) === probability && 
      Math.round(risk.impact) === impact
    );
  };

  const handleCellClick = (probability: number, impact: number) => {
    const cellRisks = getRisksForCell(probability, impact);
    if (cellRisks.length > 0) {
      setSelectedRisk(cellRisks[0]);
    }
  };

  // Format risk status with appropriate tag color
  const getStatusTag = (status: string) => {
    const statusMap: Record<string, string> = {
      'Open': 'error',
      'Mitigated': 'warning',
      'Closed': 'success',
      'In Progress': 'processing'
    };
    
    return <Tag color={statusMap[status] || 'default'}>{status}</Tag>;
  };

  return (
    <div className="risk-matrix">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className={darkMode ? 'bg-gray-800 text-white' : ''} 
            bordered={false}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={4} className={darkMode ? 'text-white' : ''}>
                  Risk Matrix
                </Title>
              </Col>
              <Col>
                <Space>
                  <Select
                    defaultValue="all"
                    style={{ width: 120 }}
                    onChange={(value) => setFilters({...filters, status: value})}
                    placeholder="Status"
                    prefix={<FilterOutlined />}
                  >
                    {statuses.map((status) => (
                      <Option key={status} value={status}>{status === 'all' ? 'All Statuses' : status}</Option>
                    ))}
                  </Select>
                  <Select
                    defaultValue="all"
                    style={{ width: 120 }}
                    onChange={(value) => setFilters({...filters, owner: value})}
                    placeholder="Owner"
                  >
                    {owners.map((owner) => (
                      <Option key={owner} value={owner}>{owner === 'all' ? 'All Owners' : owner}</Option>
                    ))}
                  </Select>
                  <Select
                    defaultValue="all"
                    style={{ width: 120 }}
                    onChange={(value) => setFilters({...filters, priority: value})}
                    placeholder="Priority"
                  >
                    {priorities.map((priority) => (
                      <Option key={priority} value={priority}>{priority === 'all' ? 'All Priorities' : priority}</Option>
                    ))}
                  </Select>
                </Space>
              </Col>
            </Row>

            <div className="matrix-container mt-4">
              <table className="risk-matrix-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ width: '12%', background: darkMode ? '#333' : '#f0f0f0', padding: '8px', textAlign: 'center', color: darkMode ? 'white' : 'black' }}>
                      Probability ↓ / Impact →
                    </th>
                    {impactLevels.map(impact => (
                      <th key={`impact-${impact}`} style={{ width: '17%', background: darkMode ? '#333' : '#f0f0f0', padding: '8px', textAlign: 'center', color: darkMode ? 'white' : 'black' }}>
                        {impactMap[impact]}
                        <div style={{ fontSize: '12px' }}>(Level {impact})</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {probabilityLevels.map(probability => (
                    <tr key={`prob-${probability}`}>
                      <td style={{ background: darkMode ? '#333' : '#f0f0f0', padding: '8px', textAlign: 'center', color: darkMode ? 'white' : 'black' }}>
                        {probabilityMap[probability]}
                        <div style={{ fontSize: '12px' }}>(Level {probability})</div>
                      </td>
                      {impactLevels.map(impact => {
                        const cellRisks = getRisksForCell(probability, impact);
                        const cellColor = getCellColor(probability, impact);
                        
                        return (
                          <td 
                            key={`cell-${probability}-${impact}`}
                            onClick={() => handleCellClick(probability, impact)}
                            style={{ 
                              ...cellColor,
                              padding: '8px', 
                              textAlign: 'center',
                              cursor: cellRisks.length ? 'pointer' : 'default',
                              border: '1px solid #ccc',
                              height: '80px',
                              verticalAlign: 'middle',
                              position: 'relative'
                            }}
                          >
                            {cellRisks.length > 0 ? (
                              <div>
                                <Badge count={cellRisks.length} />
                                <div style={{ marginTop: '5px' }}>
                                  {cellRisks.slice(0, 2).map(risk => (
                                    <Tooltip 
                                      key={risk.id} 
                                      title={<>
                                        <p><strong>{risk.title}</strong></p>
                                        <p>{risk.description}</p>
                                        <p>Owner: {risk.owner}</p>
                                        <p>Status: {risk.status}</p>
                                      </>}
                                    >
                                      <div style={{ 
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        fontSize: '11px',
                                        padding: '2px'
                                      }}>
                                        {risk.id}: {risk.title}
                                      </div>
                                    </Tooltip>
                                  ))}
                                  {cellRisks.length > 2 && (
                                    <div style={{ fontSize: '11px' }}>and {cellRisks.length - 2} more...</div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div style={{ fontSize: '11px', opacity: 0.7 }}>No risks</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="matrix-legend mt-4">
              <Row gutter={16}>
                <Col span={6}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#ff4d4f', marginRight: '8px' }}></div>
                    <Text className={darkMode ? 'text-white' : ''}>High Risk (15-25)</Text>
                  </div>
                </Col>
                <Col span={6}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#faad14', marginRight: '8px' }}></div>
                    <Text className={darkMode ? 'text-white' : ''}>Medium Risk (8-14)</Text>
                  </div>
                </Col>
                <Col span={6}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#ffe58f', marginRight: '8px' }}></div>
                    <Text className={darkMode ? 'text-white' : ''}>Low Risk (3-7)</Text>
                  </div>
                </Col>
                <Col span={6}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '20px', height: '20px', backgroundColor: '#b7eb8f', marginRight: '8px' }}></div>
                    <Text className={darkMode ? 'text-white' : ''}>Very Low Risk (1-2)</Text>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>

      {selectedRisk && (
        <Row gutter={[16, 16]} className="mt-4">
          <Col span={24}>
            <Card 
              className={darkMode ? 'bg-gray-800 text-white' : ''}
              bordered={false}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4} className={darkMode ? 'text-white' : ''}>
                  Risk Details
                </Title>
                <Button type="text" onClick={() => setSelectedRisk(null)}>Close</Button>
              </div>
              
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Alert
                    message={`Risk ID: ${selectedRisk.id} - ${selectedRisk.title}`}
                    description={selectedRisk.description}
                    type={selectedRisk.riskScore >= 15 ? "error" : selectedRisk.riskScore >= 8 ? "warning" : "info"}
                    showIcon
                  />
                </Col>
                
                <Col span={8}>
                  <div className="detail-item">
                    <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Probability:</Text>
                    <Text className={darkMode ? 'text-white' : ''}>
                      {probabilityMap[Math.round(selectedRisk.probability)]} ({selectedRisk.probability})
                    </Text>
                  </div>
                </Col>
                
                <Col span={8}>
                  <div className="detail-item">
                    <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Impact:</Text>
                    <Text className={darkMode ? 'text-white' : ''}>
                      {impactMap[Math.round(selectedRisk.impact)]} ({selectedRisk.impact})
                    </Text>
                  </div>
                </Col>
                
                <Col span={8}>
                  <div className="detail-item">
                    <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Risk Score:</Text>
                    <Text className={darkMode ? 'text-white' : ''}>{selectedRisk.riskScore}</Text>
                  </div>
                </Col>
                
                <Col span={8}>
                  <div className="detail-item">
                    <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Status:</Text>
                    {getStatusTag(selectedRisk.status)}
                  </div>
                </Col>
                
                <Col span={8}>
                  <div className="detail-item">
                    <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Priority:</Text>
                    <Tag color={
                      selectedRisk.priority === 'High' ? 'red' : 
                      selectedRisk.priority === 'Medium' ? 'orange' : 'green'
                    }>
                      {selectedRisk.priority}
                    </Tag>
                  </div>
                </Col>
                
                <Col span={8}>
                  <div className="detail-item">
                    <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Owner:</Text>
                    <Text className={darkMode ? 'text-white' : ''}>{selectedRisk.owner}</Text>
                  </div>
                </Col>
                
                <Col span={12}>
                  <div className="detail-item">
                    <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Date Identified:</Text>
                    <Text className={darkMode ? 'text-white' : ''}>{selectedRisk.dateIdentified}</Text>
                  </div>
                </Col>
                
                <Col span={12}>
                  <div className="detail-item">
                    <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Last Updated:</Text>
                    <Text className={darkMode ? 'text-white' : ''}>{selectedRisk.lastUpdated}</Text>
                  </div>
                </Col>
                
                <Col span={24}>
                  <div className="detail-item">
                    <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Mitigation Plan:</Text>
                    <div className="mt-2">
                      <Text className={darkMode ? 'text-white' : ''}>{selectedRisk.mitigationPlan}</Text>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default RiskMatrix; 