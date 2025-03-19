import React from 'react';
import { 
  Card, Row, Col, Progress, Statistic, Tabs, Tag, Table, Typography
} from 'antd';
import {
  ArrowUpOutlined, ArrowDownOutlined, WarningOutlined, 
  CheckCircleOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { 
  LineChart, Line, BarChart, Bar, ComposedChart, ScatterChart,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, Cell, Scatter, 
  ReferenceLine, ReferenceArea
} from 'recharts';
import CollapsibleSection from '../common/CollapsibleSection';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Generate data for financial risk assessment
const generateFinancialRiskData = () => {
  // Define financial risk categories
  const riskCategories = [
    'Budget Overrun',
    'Resource Shortage',
    'Supplier Price Increase',
    'Exchange Rate Fluctuation',
    'Contract Penalties',
    'Delayed Funding',
    'Regulatory Changes'
  ];
  
  // Generate random risk data
  return riskCategories.map(category => {
    // Random impact between 1-5
    const impact = 1 + Math.floor(Math.random() * 5);
    const probability = 1 + Math.floor(Math.random() * 5); // 1-5 probability
    const severity = impact * probability;
    const budgetImpact = 5000000 * (0.01 * impact) * (probability / 5);
    
    return {
      category,
      impact,
      probability,
      severity,
      budgetImpact,
      status: severity > 15 ? 'High' : severity > 8 ? 'Medium' : 'Low',
      mitigation: `Risk mitigation plan for ${category}`
    };
  }).sort((a, b) => b.severity - a.severity); // Sort by severity
};

// Generate contingency analysis data
const generateContingencyData = (contingencyPercent = 0.1) => {
  const totalProgramBudget = 5000000;
  const budgetWithoutContingency = totalProgramBudget / (1 + contingencyPercent);
  const contingencyAmount = totalProgramBudget - budgetWithoutContingency;
  
  // Generate historic contingency utilization
  const months = 12;
  const utilization = [];
  let cumulativeUsage = 0;
  const totalContingencyUsed = contingencyAmount * (0.3 + Math.random() * 0.4); // 30-70% used
  
  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i - 1));
    
    // More contingency is used later in the project
    const progressFactor = i / (months - 1);
    const monthUsage = totalContingencyUsed * (0.5 * progressFactor + 0.5 * Math.random() * progressFactor);
    
    // For past months
    if (i < months - 1) {
      const monthlyUsage: number = i === 0 ? 0 : monthUsage - (utilization[i - 1]?.cumulative || 0);
      
      cumulativeUsage = monthUsage;
      utilization.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        used: monthlyUsage,
        cumulative: cumulativeUsage,
        remaining: contingencyAmount - cumulativeUsage,
        percent: (cumulativeUsage / contingencyAmount) * 100
      });
    }
    // Current month
    else {
      const monthlyUsage: number = monthUsage - (utilization[i - 1]?.cumulative || 0);
      cumulativeUsage = monthUsage;
      utilization.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        used: monthlyUsage,
        monthly: monthlyUsage,
        cumulative: cumulativeUsage,
        remaining: contingencyAmount - cumulativeUsage,
        percent: (cumulativeUsage / contingencyAmount) * 100
      });
    }
  }
  
  const projectedRemaining = contingencyAmount - cumulativeUsage;
  
  return {
    contingencyAmount,
    budgetWithoutContingency,
    contingencyPercent,
    used: cumulativeUsage,
    remaining: projectedRemaining,
    utilization,
    projectedUtilization: (cumulativeUsage / contingencyAmount) * 100
  };
};

// Generate variance tracking data
const generateVarianceTrackingData = () => {
  // Create 12 months of variance data
  const months = 12;
  const data = [];
  const totalProgramBudget = 5000000;
  
  let cumulativePlanned = 0;
  let cumulativeActual = 0;
  
  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i - 1));
    
    // Monthly spend increases over time
    const progressFactor = i / (months - 1);
    const monthlyPlanned = totalProgramBudget * (0.05 + 0.1 * progressFactor);
    
    // Random variance in actual vs planned (tending toward over budget)
    const variance = monthlyPlanned * (0.1 * progressFactor + (Math.random() * 0.2 - 0.05));
    const monthlyActual = monthlyPlanned + variance;
    
    // Accumulate
    cumulativePlanned += monthlyPlanned;
    cumulativeActual += monthlyActual;
    
    // Calculate CPI as the project progresses
    const cpi = i === 0 ? 1 : cumulativePlanned / cumulativeActual;
    const variancePercent = ((monthlyActual - monthlyPlanned) / monthlyPlanned) * 100;
    const cumulativeVariancePercent = ((cumulativeActual - cumulativePlanned) / cumulativePlanned) * 100;
    
    // Only include actual data for past months
    if (i < months - 1) {
      data.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        planned: monthlyPlanned,
        actual: monthlyActual,
        variance: monthlyActual - monthlyPlanned,
        variancePercent,
        cumulativePlanned,
        cumulativeActual,
        cumulativeVariance: cumulativeActual - cumulativePlanned,
        cumulativeVariancePercent,
        cpi
      });
    } else {
      // Current month
      data.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        planned: monthlyPlanned,
        actual: monthlyActual,
        variance: monthlyActual - monthlyPlanned,
        variancePercent,
        cumulativePlanned,
        cumulativeActual,
        cumulativeVariance: cumulativeActual - cumulativePlanned,
        cumulativeVariancePercent,
        cpi
      });
    }
  }
  
  return data;
};

interface FinancialRiskSectionProps {
  preferences: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse: () => void;
}

const FinancialRiskSection: React.FC<FinancialRiskSectionProps> = ({ 
  preferences, 
  onToggleCollapse 
}) => {
  const darkMode = preferences?.darkMode || false;
  
  // Format large numbers for display
  const formatCurrency = (value: number): string => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    } else {
      return `$${value.toFixed(0)}`;
    }
  };
  
  // Generate data
  const financialRiskData = generateFinancialRiskData();
  const contingencyData = generateContingencyData(0.1);
  const varianceTrackingData = generateVarianceTrackingData();
  
  return (
    <CollapsibleSection
      id="financial-risk"
      title="Financial Risk Assessment"
      icon="⚠️"
      isCollapsed={preferences.collapsedSections.includes('financial-risk')}
      onToggle={onToggleCollapse}
      darkMode={darkMode}
    >
      <div className="space-y-6">
        <Tabs defaultActiveKey="heatmap">
          <TabPane tab="Cost Risk Heatmap" key="heatmap">
            <Card className={darkMode ? 'bg-gray-800 text-white' : ''} bordered={false}>
              <Title level={5} className={darkMode ? 'text-white' : ''}>
                Program Cost Risk Assessment
              </Title>
              <div style={{ height: 400, marginTop: 16 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                    <XAxis 
                      type="number"
                      dataKey="probability"
                      name="Probability"
                      domain={[0, 6]}
                      stroke={darkMode ? '#ddd' : '#666'}
                      style={{ fontSize: '12px' }}
                      label={{ 
                        value: 'Probability', 
                        position: 'insideBottom', 
                        offset: -5,
                        style: { fill: darkMode ? '#ddd' : '#666' }
                      }}
                    />
                    <YAxis 
                      type="number"
                      dataKey="impact"
                      name="Impact"
                      domain={[0, 6]}
                      stroke={darkMode ? '#ddd' : '#666'}
                      style={{ fontSize: '12px' }}
                      label={{ 
                        value: 'Financial Impact', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fill: darkMode ? '#ddd' : '#666' }
                      }}
                    />
                    <RechartsTooltip
                      formatter={(value: any) => String(value)}
                      labelFormatter={() => ""}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className={`p-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`} style={{ border: '1px solid #ccc' }}>
                              <p className="font-bold">{data.category}</p>
                              <p>Impact: {data.impact} (${formatCurrency(data.budgetImpact)})</p>
                              <p>Probability: {data.probability}</p>
                              <p>Risk Level: {data.status}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    
                    {/* Risk zones */}
                    <ReferenceArea x1={0} x2={6} y1={0} y2={2} fill="#52c41a" fillOpacity={0.15} />
                    <ReferenceArea x1={0} x2={3} y1={2} y2={4} fill="#52c41a" fillOpacity={0.15} />
                    <ReferenceArea x1={0} x2={2} y1={4} y2={6} fill="#52c41a" fillOpacity={0.15} />
                    
                    {/* Risk items */}
                    <Scatter
                      name="Risk Items"
                      data={financialRiskData}
                      fill="#8884d8"
                      shape="circle"
                    >
                      {financialRiskData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            entry.status === 'High' ? '#ff4d4f' :
                            entry.status === 'Medium' ? '#faad14' : '#52c41a'
                          } 
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginTop: 16 }}>
                <Table
                  dataSource={financialRiskData}
                  pagination={{ pageSize: 5 }}
                  size="small"
                  style={{ 
                    background: darkMode ? '#1f1f1f' : '#fff',
                    color: darkMode ? '#fff' : '#000'
                  }}
                  columns={[
                    {
                      title: 'Risk Category',
                      dataIndex: 'category',
                      key: 'category',
                    },
                    {
                      title: 'Potential Budget Impact',
                      dataIndex: 'budgetImpact',
                      key: 'budgetImpact',
                      render: (value) => formatCurrency(value),
                    },
                    {
                      title: 'Risk Level',
                      dataIndex: 'status',
                      key: 'status',
                      render: (status) => (
                        <Tag color={
                          status === 'High' ? 'error' :
                          status === 'Medium' ? 'warning' : 'success'
                        }>
                          {status}
                        </Tag>
                      ),
                    },
                    {
                      title: 'Probability',
                      dataIndex: 'probability',
                      key: 'probability',
                      render: (value) => `${value}/5`,
                    },
                    {
                      title: 'Impact',
                      dataIndex: 'impact',
                      key: 'impact',
                      render: (value) => `${value}/5`,
                    },
                  ]}
                />
              </div>
            </Card>
          </TabPane>
          
          <TabPane tab="Contingency Analysis" key="contingency">
            <Card className={darkMode ? 'bg-gray-800 text-white' : ''} bordered={false}>
              <Title level={5} className={darkMode ? 'text-white' : ''}>
                Financial Contingency Analysis
              </Title>
              <div style={{ height: 400, marginTop: 16 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={contingencyData.utilization}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                    <XAxis 
                      dataKey="month" 
                      stroke={darkMode ? '#ddd' : '#666'}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke={darkMode ? '#ddd' : '#666'}
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                      domain={[0, Math.ceil(contingencyData.contingencyAmount * 1.1 / 1000000) * 1000000]}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke={darkMode ? '#ddd' : '#666'}
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `${value.toFixed(0)}%`}
                      domain={[0, 100]}
                    />
                    <RechartsTooltip
                      formatter={(value: any, name: any) => {
                        if (typeof value !== 'number') {
                          return [String(value), String(name)];
                        }
                        
                        if (name === 'percent') {
                          return [`${value.toFixed(1)}%`, 'Usage %'];
                        }
                        
                        if (name === 'monthly') {
                          return [formatCurrency(value), 'Monthly Usage'];
                        }
                        
                        return [formatCurrency(value), name === 'used' ? 'Used' : 'Available'];
                      }}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ccc' }}
                      itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="used" 
                      name="Monthly Usage" 
                      yAxisId="left"
                      barSize={20}
                      fill="#8884d8"
                      isAnimationActive={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cumulative" 
                      name="Cumulative Usage" 
                      yAxisId="left"
                      stroke="#ff7300"
                      strokeWidth={2}
                      dot={true}
                      activeDot={{ r: 8 }}
                      isAnimationActive={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="percent" 
                      name="Usage Percentage" 
                      yAxisId="right"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      dot={true}
                      activeDot={{ r: 8 }}
                      isAnimationActive={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginTop: 16 }}>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} size="small">
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Contingency Budget</Text>}
                        value={formatCurrency(contingencyData.contingencyAmount)}
                        valueStyle={{ color: darkMode ? '#fff' : undefined }}
                      />
                      <div style={{ marginTop: 5 }}>
                        <Text className={darkMode ? 'text-gray-300' : ''}>
                          {(contingencyData.contingencyPercent * 100).toFixed(1)}% of total budget
                        </Text>
                      </div>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} size="small">
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Contingency Used</Text>}
                        value={formatCurrency(contingencyData.used)}
                        valueStyle={{ color: darkMode ? '#fff' : undefined }}
                      />
                      <div style={{ marginTop: 5 }}>
                        <Text className={darkMode ? 'text-gray-300' : ''}>
                          {contingencyData.projectedUtilization.toFixed(1)}% of contingency
                        </Text>
                      </div>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} size="small">
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Contingency Remaining</Text>}
                        value={formatCurrency(contingencyData.remaining)}
                        valueStyle={{ 
                          color: contingencyData.projectedUtilization < 75 ? 
                            (darkMode ? '#52c41a' : '#3f8600') : 
                            (darkMode ? '#ff4d4f' : '#cf1322')
                        }}
                      />
                      <div style={{ marginTop: 5 }}>
                        <Text className={darkMode ? 'text-gray-300' : ''}>
                          {(100 - contingencyData.projectedUtilization).toFixed(1)}% remaining
                        </Text>
                      </div>
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} size="small">
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Usage Status</Text>}
                        value={
                          contingencyData.projectedUtilization < 50 ? 'Healthy' :
                          contingencyData.projectedUtilization < 75 ? 'Moderate' : 'At Risk'
                        }
                        valueStyle={{ 
                          color: contingencyData.projectedUtilization < 50 ? 
                            (darkMode ? '#52c41a' : '#3f8600') : 
                            contingencyData.projectedUtilization < 75 ?
                              (darkMode ? '#faad14' : '#d48806') :
                              (darkMode ? '#ff4d4f' : '#cf1322')
                        }}
                      />
                      <div style={{ marginTop: 5 }}>
                        <Progress 
                          percent={contingencyData.projectedUtilization} 
                          status={
                            contingencyData.projectedUtilization < 50 ? "success" :
                            contingencyData.projectedUtilization < 75 ? "active" : "exception"
                          }
                          size="small"
                        />
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Card>
          </TabPane>
          
          <TabPane tab="Variance Tracking" key="variance">
            <Card className={darkMode ? 'bg-gray-800 text-white' : ''} bordered={false}>
              <Title level={5} className={darkMode ? 'text-white' : ''}>
                Budget Variance Tracking
              </Title>
              <div style={{ height: 400, marginTop: 16 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={varianceTrackingData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                    <XAxis 
                      dataKey="month" 
                      stroke={darkMode ? '#ddd' : '#666'}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke={darkMode ? '#ddd' : '#666'}
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke={darkMode ? '#ddd' : '#666'}
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `${value.toFixed(1)}%`}
                      domain={[-15, 15]}
                    />
                    <RechartsTooltip
                      formatter={(value: any, name: any) => {
                        if (typeof value !== 'number') {
                          return [String(value), String(name)];
                        }
                        
                        if (name === 'cpi') {
                          return [`${value.toFixed(2)}`, 'CPI'];
                        }
                        
                        if (typeof name === 'string' && (name === 'variancePercent' || name === 'cumulativeVariancePercent')) {
                          return [`${value.toFixed(2)}%`, name.includes('cumulative') ? 'Cumulative Variance %' : 'Monthly Variance %'];
                        }
                        
                        if (typeof name === 'string' && name.includes('cumulative')) {
                          return [formatCurrency(value), `Cumulative ${name.replace('cumulative', '')}`];
                        }
                        
                        return [formatCurrency(value), String(name)];
                      }}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ccc' }}
                      itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="planned" 
                      name="Planned" 
                      yAxisId="left"
                      barSize={10}
                      fill="#8884d8"
                      stackId="a"
                      isAnimationActive={false}
                    />
                    <Bar 
                      dataKey="actual" 
                      name="Actual" 
                      yAxisId="left"
                      barSize={10}
                      fill="#82ca9d"
                      stackId="b"
                      isAnimationActive={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cumulativeVariancePercent" 
                      name="Cumulative Variance %" 
                      yAxisId="right"
                      stroke="#ff7300"
                      strokeWidth={2}
                      dot={true}
                      isAnimationActive={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="cpi" 
                      name="CPI" 
                      yAxisId="right"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={true}
                      isAnimationActive={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginTop: 16 }}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} size="small">
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Cumulative Variance</Text>}
                        value={formatCurrency(varianceTrackingData[varianceTrackingData.length - 1].cumulativeVariance)}
                        valueStyle={{ 
                          color: varianceTrackingData[varianceTrackingData.length - 1].cumulativeVariance >= 0 ?
                            (darkMode ? '#52c41a' : '#3f8600') : 
                            (darkMode ? '#ff4d4f' : '#cf1322')
                        }}
                        prefix={varianceTrackingData[varianceTrackingData.length - 1].cumulativeVariance >= 0 ? 
                          <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      />
                      <div style={{ marginTop: 5 }}>
                        <Text className={darkMode ? 'text-gray-300' : ''}>
                          {varianceTrackingData[varianceTrackingData.length - 1].cumulativeVariancePercent.toFixed(2)}% 
                          {varianceTrackingData[varianceTrackingData.length - 1].cumulativeVariance >= 0 ? 
                            ' under budget' : ' over budget'}
                        </Text>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} size="small">
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Current CPI</Text>}
                        value={varianceTrackingData[varianceTrackingData.length - 1].cpi.toFixed(2)}
                        valueStyle={{ 
                          color: varianceTrackingData[varianceTrackingData.length - 1].cpi >= 1 ?
                            (darkMode ? '#52c41a' : '#3f8600') : 
                            (darkMode ? '#ff4d4f' : '#cf1322')
                        }}
                      />
                      <div style={{ marginTop: 5 }}>
                        <Text className={darkMode ? 'text-gray-300' : ''}>
                          {varianceTrackingData[varianceTrackingData.length - 1].cpi >= 1 ? 
                            'Under budget' : 'Over budget'}
                        </Text>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'} size="small">
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Latest Monthly Variance</Text>}
                        value={formatCurrency(varianceTrackingData[varianceTrackingData.length - 1].variance)}
                        valueStyle={{ 
                          color: varianceTrackingData[varianceTrackingData.length - 1].variance >= 0 ?
                            (darkMode ? '#52c41a' : '#3f8600') : 
                            (darkMode ? '#ff4d4f' : '#cf1322')
                        }}
                        prefix={varianceTrackingData[varianceTrackingData.length - 1].variance >= 0 ? 
                          <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      />
                      <div style={{ marginTop: 5 }}>
                        <Text className={darkMode ? 'text-gray-300' : ''}>
                          {varianceTrackingData[varianceTrackingData.length - 1].variancePercent.toFixed(2)}% variance
                        </Text>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </CollapsibleSection>
  );
};

export default FinancialRiskSection; 