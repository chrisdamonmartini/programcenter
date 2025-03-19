import React, { useState } from 'react';
import { Card, Typography, Row, Col, Select, Space } from 'antd';
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

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

interface RiskHeatmapProps {
  risks: Risk[];
  risksByComponent: Record<string, Risk[]>;
  darkMode: boolean;
}

const RiskHeatmap: React.FC<RiskHeatmapProps> = ({ risks, risksByComponent, darkMode }) => {
  const [selectedView, setSelectedView] = useState<'all' | 'byComponent'>('all');
  const [selectedComponent, setSelectedComponent] = useState<string>('all');
  
  // Convert risks to format suitable for scatter chart
  const getScatterData = () => {
    if (selectedView === 'all') {
      return risks.map(risk => ({
        x: risk.impact,
        y: risk.probability,
        z: risk.riskScore,
        id: risk.id,
        title: risk.title,
        status: risk.status,
        owner: risk.owner,
        priority: risk.priority,
        component: risk.component || 'Unassigned'
      }));
    } else {
      const componentsToShow = selectedComponent === 'all' 
        ? Object.keys(risksByComponent) 
        : [selectedComponent];
      
      return componentsToShow.flatMap(component => 
        risksByComponent[component]?.map(risk => ({
          x: risk.impact,
          y: risk.probability,
          z: risk.riskScore,
          id: risk.id,
          title: risk.title,
          status: risk.status,
          owner: risk.owner,
          priority: risk.priority,
          component: component
        })) || []
      );
    }
  };
  
  // Get color based on risk score
  const getRiskColor = (score: number) => {
    if (score >= 15) return '#ff4d4f';  // High risk (red)
    if (score >= 8) return '#faad14';   // Medium risk (orange)
    if (score >= 3) return '#ffe58f';   // Low risk (yellow)
    return '#b7eb8f';                  // Very low risk (green)
  };

  // Create dataset for heatmap
  const heatmapData = getScatterData();

  // Format the tooltip content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div 
          style={{ 
            backgroundColor: darkMode ? '#333' : 'white', 
            padding: '10px', 
            border: '1px solid #ccc',
            color: darkMode ? 'white' : 'black'
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>{data.id}: {data.title}</p>
          <p style={{ margin: 0 }}>Probability: {data.y}</p>
          <p style={{ margin: 0 }}>Impact: {data.x}</p>
          <p style={{ margin: 0 }}>Risk Score: {data.z}</p>
          <p style={{ margin: 0 }}>Status: {data.status}</p>
          <p style={{ margin: 0 }}>Priority: {data.priority}</p>
          <p style={{ margin: 0 }}>Owner: {data.owner}</p>
          <p style={{ margin: 0 }}>Component: {data.component}</p>
        </div>
      );
    }
    return null;
  };
  
  // Get components for dropdown
  const components = ['all', ...Object.keys(risksByComponent)];

  // Generate risk distribution by component for stacked bar chart
  const getRiskDistributionByComponent = () => {
    const distributionData: any[] = [];
    
    Object.entries(risksByComponent).forEach(([component, risks]) => {
      const highRisks = risks.filter(r => r.riskScore >= 15).length;
      const mediumRisks = risks.filter(r => r.riskScore >= 8 && r.riskScore < 15).length;
      const lowRisks = risks.filter(r => r.riskScore >= 3 && r.riskScore < 8).length;
      const veryLowRisks = risks.filter(r => r.riskScore < 3).length;
      
      distributionData.push({
        name: component,
        highRisks,
        mediumRisks,
        lowRisks,
        veryLowRisks,
        totalRisks: risks.length
      });
    });
    
    // Sort by total number of risks
    return distributionData.sort((a, b) => b.totalRisks - a.totalRisks);
  };

  return (
    <div className="risk-heatmap">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className={darkMode ? 'bg-gray-800 text-white' : ''} 
            bordered={false}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Title level={4} className={darkMode ? 'text-white' : ''}>
                Risk Heatmap
              </Title>
              <Space>
                <Select
                  value={selectedView}
                  style={{ width: 140 }}
                  onChange={(value: 'all' | 'byComponent') => {
                    setSelectedView(value);
                    if (value === 'all') {
                      setSelectedComponent('all');
                    }
                  }}
                >
                  <Option value="all">All Risks</Option>
                  <Option value="byComponent">By Component</Option>
                </Select>
                
                {selectedView === 'byComponent' && (
                  <Select
                    value={selectedComponent}
                    style={{ width: 160 }}
                    onChange={(value) => setSelectedComponent(value)}
                  >
                    {components.map((component) => (
                      <Option key={component} value={component}>
                        {component === 'all' ? 'All Components' : component}
                      </Option>
                    ))}
                  </Select>
                )}
              </Space>
            </div>
            
            <div style={{ height: 400, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Impact" 
                    domain={[0, 5]} 
                    ticks={[1, 2, 3, 4, 5]}
                    label={{ 
                      value: 'Impact', 
                      position: 'insideBottom',
                      style: { fill: darkMode ? '#ddd' : '#666' }
                    }}
                    stroke={darkMode ? '#ddd' : '#666'}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Probability" 
                    domain={[0, 5]} 
                    ticks={[1, 2, 3, 4, 5]}
                    label={{ 
                      value: 'Probability', 
                      angle: -90, 
                      position: 'insideLeft',
                      style: { fill: darkMode ? '#ddd' : '#666' }
                    }}
                    stroke={darkMode ? '#ddd' : '#666'}
                  />
                  <ZAxis 
                    type="number" 
                    dataKey="z" 
                    range={[60, 400]} 
                    name="Risk Score" 
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Scatter 
                    name={selectedView === 'byComponent' && selectedComponent !== 'all' 
                      ? `Risks in ${selectedComponent}` 
                      : "All Risks"
                    } 
                    data={heatmapData} 
                    fill="#8884d8"
                  >
                    {heatmapData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getRiskColor(entry.z)} 
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div className="matrix-legend mt-4">
              <Row gutter={16}>
                <Col span={24}>
                  <Text className={darkMode ? 'text-white' : ''} strong>
                    Risk Heatmap Legend:
                  </Text>
                </Col>
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
              <Row className="mt-2">
                <Col span={24}>
                  <Text className={darkMode ? 'text-white' : ''} type="secondary">
                    * Bubble size represents the risk score (probability × impact)
                  </Text>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RiskHeatmap; 