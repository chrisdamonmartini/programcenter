import React from 'react';
import { 
  Card, Row, Col, Statistic, Tabs, Typography, Badge, Space
} from 'antd';
import {
  ArrowUpOutlined, ArrowDownOutlined, CheckCircleOutlined, 
  WarningOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import { 
  LineChart, Line, BarChart, Bar, ComposedChart, ScatterChart,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, Cell, Scatter, 
  ReferenceLine, Area, AreaChart
} from 'recharts';
import CollapsibleSection from '../common/CollapsibleSection';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Define interfaces for the variance data
interface VarianceDataPoint {
  period: string;
  sv: number;
  cv: number;
  svValue: number;
  cvValue: number;
}

interface EVMVarianceData {
  varianceData: VarianceDataPoint[];
  summary: {
    sv: number;
    cv: number;
    svPercent: number;
    cvPercent: number;
  };
}

// Generate EVM data (PV, EV, AC curves)
const generateEVMData = (pv: number, ev: number, ac: number, months = 12) => {
  const data = [];
  const totalBudget = pv;
  
  // Create historic data
  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (months - i - 1));
    
    // S-curve progression
    const progressFactor = i / (months - 1);
    const sCurveFactor = progressFactor < 0.5 ? 
      2 * Math.pow(progressFactor, 2) : 
      1 - 2 * Math.pow(1 - progressFactor, 2);
    
    const plannedValue = totalBudget * sCurveFactor;
    
    // Calculate EV and AC based on inputs (but keeping the S-curve shape)
    // If pv > ev, project is behind schedule
    // If ac > ev, project is over budget
    const evAdjustment = ev / pv;
    const acAdjustment = ac / ev;
    
    const earnedValue = progressFactor >= 0.9 ? 
      plannedValue * evAdjustment : 
      plannedValue * evAdjustment * (0.9 + 0.1 * Math.random());
    
    const actualCost = progressFactor >= 0.9 ? 
      earnedValue * acAdjustment : 
      earnedValue * acAdjustment * (0.9 + 0.1 * Math.random());
      
    data.push({
      month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      pv: plannedValue,
      ev: earnedValue,
      ac: actualCost,
      pvCumulative: totalBudget * sCurveFactor,
      evCumulative: earnedValue,
      acCumulative: actualCost
    });
  }
  
  return data;
};

// Generate EVM quadrant data
const generateEVMQuadrantData = (spi: number, cpi: number) => {
  const quadrantData = [
    {
      name: "Performance",
      x: spi,
      y: cpi,
    }
  ];
  
  // Generate some benchmark comparison points
  const benchmarks = [
    { name: "Target", x: 1, y: 1 },
    { name: "Avg. Industry", x: 0.95, y: 0.92 },
    { name: "Best-in-Class", x: 1.05, y: 1.1 },
    { name: "Last Month", x: spi - 0.05 + Math.random() * 0.1, y: cpi - 0.05 + Math.random() * 0.1 },
  ];
  
  return { current: quadrantData, benchmarks };
};

// Generate EVM variance data
const generateEVMVarianceData = (pv: number, ev: number, ac: number): EVMVarianceData => {
  // Calculate Schedule Variance (SV) and Cost Variance (CV)
  const sv = ev - pv;  // Schedule Variance
  const cv = ev - ac;  // Cost Variance
  
  // Calculate SV% and CV%
  const svPercent = (sv / pv) * 100;
  const cvPercent = (cv / ev) * 100;
  
  // Generate monthly variance data (for the last 6 periods)
  const varianceData = [];
  const periods = 6;
  
  for (let i = 0; i < periods; i++) {
    // This would normally come from historical data
    // Here we're simulating with some random variations
    const periodSvPercent = svPercent * (0.7 + Math.random() * 0.6);
    const periodCvPercent = cvPercent * (0.7 + Math.random() * 0.6);
    
    // Calculate the actual values based on relative progress
    const periodProgress = (i + 1) / periods;
    const periodPv = pv * periodProgress;
    const periodSv = (periodSvPercent / 100) * periodPv;
    const periodEv = periodPv + periodSv;
    const periodCv = (periodCvPercent / 100) * periodEv;
    
    varianceData.push({
      period: `P${i + 1}`,
      sv: periodSvPercent,
      cv: periodCvPercent,
      svValue: periodSv,
      cvValue: periodCv
    });
  }
  
  return {
    varianceData,
    summary: {
      sv,
      cv,
      svPercent,
      cvPercent
    }
  };
};

interface AdvancedEVMSectionProps {
  data: {
    evmMetrics: {
      pv: number;
      ev: number;
      ac: number;
      spi: number;
      cpi: number;
    };
  };
  preferences: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse: () => void;
}

const AdvancedEVMSection: React.FC<AdvancedEVMSectionProps> = ({ 
  data, 
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
  
  const evmMetrics = data.evmMetrics;
  
  // Generate data
  const evmData = generateEVMData(evmMetrics.pv, evmMetrics.ev, evmMetrics.ac);
  const quadrantData = generateEVMQuadrantData(evmMetrics.spi, evmMetrics.cpi);
  const varianceData: EVMVarianceData = generateEVMVarianceData(evmMetrics.pv, evmMetrics.ev, evmMetrics.ac);
  
  // EVM status indicators
  const getScheduleStatus = (spi: number) => {
    if (spi >= 1) return { text: "On/Ahead of Schedule", color: "success", icon: <CheckCircleOutlined /> };
    if (spi >= 0.9) return { text: "Slightly Behind", color: "warning", icon: <WarningOutlined /> };
    return { text: "Behind Schedule", color: "error", icon: <CloseCircleOutlined /> };
  };
  
  const getCostStatus = (cpi: number) => {
    if (cpi >= 1) return { text: "Under Budget", color: "success", icon: <CheckCircleOutlined /> };
    if (cpi >= 0.9) return { text: "Slightly Over", color: "warning", icon: <WarningOutlined /> };
    return { text: "Over Budget", color: "error", icon: <CloseCircleOutlined /> };
  };
  
  const scheduleStatus = getScheduleStatus(evmMetrics.spi);
  const costStatus = getCostStatus(evmMetrics.cpi);
  
  return (
    <CollapsibleSection
      id="advanced-evm"
      title="Advanced EVM Dashboard"
      icon="📊"
      isCollapsed={preferences.collapsedSections.includes('advanced-evm')}
      onToggle={onToggleCollapse}
      darkMode={darkMode}
    >
      <div className="mb-6">
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12}>
            <Card title="EVM Performance Summary" bordered={false} className={darkMode ? 'bg-gray-800 text-white' : ''}>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Statistic
                    title="Schedule Performance Index (SPI)"
                    value={evmMetrics.spi.toFixed(2)}
                    precision={2}
                    valueStyle={{ 
                      color: evmMetrics.spi >= 1 ? (darkMode ? '#52c41a' : '#3f8600') : 
                             evmMetrics.spi >= 0.9 ? (darkMode ? '#faad14' : '#d48806') : 
                             (darkMode ? '#ff4d4f' : '#cf1322')
                    }}
                    prefix={evmMetrics.spi >= 1 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  />
                  <div className="mt-2">
                    <Badge 
                      status={scheduleStatus.color as "success" | "warning" | "error" | "default" | "processing" | undefined} 
                      text={
                        <Text className={darkMode ? 'text-gray-300' : ''}>
                          {scheduleStatus.text}
                        </Text>
                      } 
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Cost Performance Index (CPI)"
                    value={evmMetrics.cpi.toFixed(2)}
                    precision={2}
                    valueStyle={{ 
                      color: evmMetrics.cpi >= 1 ? (darkMode ? '#52c41a' : '#3f8600') : 
                             evmMetrics.cpi >= 0.9 ? (darkMode ? '#faad14' : '#d48806') : 
                             (darkMode ? '#ff4d4f' : '#cf1322')
                    }}
                    prefix={evmMetrics.cpi >= 1 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  />
                  <div className="mt-2">
                    <Badge 
                      status={costStatus.color as "success" | "warning" | "error" | "default" | "processing" | undefined} 
                      text={
                        <Text className={darkMode ? 'text-gray-300' : ''}>
                          {costStatus.text}
                        </Text>
                      } 
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <Statistic
                    title="Schedule Variance (SV)"
                    value={formatCurrency(varianceData.summary.sv)}
                    valueStyle={{ 
                      color: varianceData.summary.sv >= 0 ? (darkMode ? '#52c41a' : '#3f8600') : (darkMode ? '#ff4d4f' : '#cf1322')
                    }}
                    prefix={varianceData.summary.sv >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  />
                  <div className="mt-2">
                    <Text className={darkMode ? 'text-gray-300' : ''}>
                      {varianceData.summary.svPercent.toFixed(1)}% {varianceData.summary.sv >= 0 ? 'ahead' : 'behind'}
                    </Text>
                  </div>
                </Col>
              </Row>
              
              <div className="mt-4">
                <Tabs defaultActiveKey="performance">
                  <TabPane tab="Performance Quadrant" key="performance">
                    <div style={{ height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                          <XAxis 
                            type="number" 
                            dataKey="x" 
                            name="SPI" 
                            domain={[0.7, 1.3]}
                            stroke={darkMode ? '#ddd' : '#666'}
                            label={{ 
                              value: 'Schedule Performance (SPI)', 
                              position: 'insideBottom', 
                              offset: -10,
                              style: { fill: darkMode ? '#ddd' : '#666' } 
                            }}
                          />
                          <YAxis 
                            type="number" 
                            dataKey="y" 
                            name="CPI" 
                            domain={[0.7, 1.3]}
                            stroke={darkMode ? '#ddd' : '#666'}
                            label={{ 
                              value: 'Cost Performance (CPI)', 
                              angle: -90, 
                              position: 'insideLeft',
                              style: { fill: darkMode ? '#ddd' : '#666' } 
                            }}
                          />
                          <RechartsTooltip
                            formatter={(value: any) => {
                              if (typeof value === 'number') {
                                return [value.toFixed(2), ''];
                              }
                              return [String(value), ''];
                            }}
                            labelFormatter={(name) => name}
                            contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ccc' }}
                            itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                          />
                          
                          {/* Quadrants */}
                          <ReferenceLine x={1} stroke="#666" strokeDasharray="3 3" />
                          <ReferenceLine y={1} stroke="#666" strokeDasharray="3 3" />
                          
                          {/* Benchmarks */}
                          <Scatter 
                            name="Benchmarks" 
                            data={quadrantData.benchmarks} 
                            fill="#8884d8"
                            shape="triangle"
                          />
                          
                          {/* Current Performance */}
                          <Scatter 
                            name="Current Performance" 
                            data={quadrantData.current} 
                            fill="#ff7300"
                            shape="circle"
                          >
                            {quadrantData.current.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={
                                  entry.x >= 1 && entry.y >= 1 ? '#52c41a' :  // Good
                                  entry.x < 1 && entry.y < 1 ? '#ff4d4f' :   // Bad
                                  '#faad14'                                  // Mixed
                                } 
                              />
                            ))}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </TabPane>
                  <TabPane tab="Variance Analysis" key="variance">
                    <div style={{ height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          data={varianceData.varianceData}
                          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                          <XAxis 
                            dataKey="period" 
                            stroke={darkMode ? '#ddd' : '#666'}
                            style={{ fontSize: '12px' }}
                          />
                          <YAxis 
                            yAxisId="left"
                            stroke={darkMode ? '#ddd' : '#666'}
                            style={{ fontSize: '12px' }}
                            tickFormatter={(value) => `${value.toFixed(0)}%`}
                            domain={[
                              Math.min(-20, Math.floor(Math.min(varianceData.summary.svPercent, varianceData.summary.cvPercent) - 5)), 
                              Math.max(20, Math.ceil(Math.max(varianceData.summary.svPercent, varianceData.summary.cvPercent) + 5))
                            ]}
                          />
                          <YAxis 
                            yAxisId="right"
                            orientation="right"
                            stroke={darkMode ? '#ddd' : '#666'}
                            style={{ fontSize: '12px' }}
                            tickFormatter={(value) => formatCurrency(value)}
                          />
                          <RechartsTooltip
                            formatter={(value: any, name: any) => {
                              if (typeof value !== 'number') {
                                return [String(value), String(name)];
                              }
                              
                              if (typeof name === 'string' && (name === 'sv' || name === 'cv')) {
                                return [`${value.toFixed(2)}%`, name.toUpperCase()];
                              }
                              
                              return [formatCurrency(value), 
                                typeof name === 'string' ? `${name.substring(0, 2).toUpperCase()} Value` : ''];
                            }}
                            labelFormatter={(label) => `Period: ${label}`}
                            contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ccc' }}
                            itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                          />
                          <Legend />
                          <Bar 
                            dataKey="sv" 
                            name="Schedule Variance %" 
                            yAxisId="left"
                            barSize={20}
                            fill="#8884d8"
                          />
                          <Bar 
                            dataKey="cv" 
                            name="Cost Variance %" 
                            yAxisId="left"
                            barSize={20}
                            fill="#82ca9d"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="svValue" 
                            name="SV Value" 
                            yAxisId="right"
                            stroke="#ff7300"
                            strokeWidth={2}
                            dot={true}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="cvValue" 
                            name="CV Value" 
                            yAxisId="right"
                            stroke="#413ea0"
                            strokeWidth={2}
                            dot={true}
                          />
                          <ReferenceLine y={0} stroke="#666" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Col>
          <Col span={24} lg={12}>
            <Card title="EVM Cumulative Curves" bordered={false} className={darkMode ? 'bg-gray-800 text-white' : ''}>
              <div style={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={evmData}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                    <XAxis 
                      dataKey="month" 
                      stroke={darkMode ? '#ddd' : '#666'}
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke={darkMode ? '#ddd' : '#666'}
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => formatCurrency(value)}
                    />
                    <RechartsTooltip
                      formatter={(value: any) => typeof value === 'number' ? formatCurrency(value) : String(value)}
                      labelFormatter={(label) => `Month: ${label}`}
                      contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ccc' }}
                      itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="pvCumulative" 
                      name="Planned Value (PV)" 
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.2}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="evCumulative" 
                      name="Earned Value (EV)" 
                      stroke="#82ca9d"
                      strokeWidth={2}
                      dot={true}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="acCumulative" 
                      name="Actual Cost (AC)" 
                      stroke="#ff7300"
                      strokeWidth={2}
                      dot={true}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4">
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}>
                      <Statistic
                        title="Planned Value (PV)"
                        value={formatCurrency(evmMetrics.pv)}
                        valueStyle={{ color: darkMode ? '#fff' : undefined }}
                      />
                      <div style={{ marginTop: 5 }}>
                        <Text className={darkMode ? 'text-gray-300' : ''}>
                          Budget as Scheduled
                        </Text>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}>
                      <Statistic
                        title="Earned Value (EV)"
                        value={formatCurrency(evmMetrics.ev)}
                        valueStyle={{ color: darkMode ? '#fff' : undefined }}
                      />
                      <div style={{ marginTop: 5 }}>
                        <Text className={darkMode ? 'text-gray-300' : ''}>
                          Work Completed Value
                        </Text>
                      </div>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}>
                      <Statistic
                        title="Actual Cost (AC)"
                        value={formatCurrency(evmMetrics.ac)}
                        valueStyle={{ color: darkMode ? '#fff' : undefined }}
                      />
                      <div style={{ marginTop: 5 }}>
                        <Text className={darkMode ? 'text-gray-300' : ''}>
                          Total Cost Incurred
                        </Text>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </CollapsibleSection>
  );
};

export default AdvancedEVMSection; 