import React, { useState, useEffect } from 'react';
import { Card, Typography, Row, Col, Select, DatePicker, Space, Radio } from 'antd';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ComposedChart, Scatter
} from 'recharts';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface RiskTrend {
  date: string;
  open: number;
  mitigated: number;
  closed: number;
  total?: number;
  high?: number;
  medium?: number;
  low?: number;
}

interface CumulativeRiskData {
  date: string;
  riskIdentified: number;
  risksClosed: number;
  activeRisks: number;
}

interface RiskExposureData {
  date: string;
  exposureIndex: number;
  mitigationEffectiveness: number;
}

interface RiskTrendAnalysisProps {
  riskTrends: RiskTrend[];
  darkMode: boolean;
}

const RiskTrendAnalysis: React.FC<RiskTrendAnalysisProps> = ({ riskTrends, darkMode }) => {
  const [chartType, setChartType] = useState<'area' | 'line' | 'bar'>('area');
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y' | 'all'>('all');
  const [viewMode, setViewMode] = useState<'status' | 'priority'>('status');
  const [showCumulativeData, setShowCumulativeData] = useState<boolean>(false);
  
  // Generate some additional trend data
  const generateAdditionalTrendData = () => {
    // Create enriched data with priority breakdowns
    const enrichedData = riskTrends.map((item, index) => {
      // Calculate total risks
      const total = item.open + item.mitigated + item.closed;
      
      // For demo purposes, assign risk levels based on simple distribution
      // In a real app, this would come from actual data
      const high = Math.round(item.open * 0.4); // 40% of open risks are high
      const medium = Math.round(item.open * 0.35); // 35% of open risks are medium
      const low = item.open - high - medium; // Remaining are low
      
      return {
        ...item,
        total,
        high,
        medium,
        low
      };
    });
    
    return enrichedData;
  };
  
  // Generate cumulative risk data
  const generateCumulativeData = () => {
    const cumulativeData: CumulativeRiskData[] = [];
    
    let totalIdentified = 0;
    let totalClosed = 0;
    
    riskTrends.forEach((item) => {
      // Assume the difference between current and previous total is newly identified risks
      const newRisksThisPeriod = (item.open + item.mitigated + item.closed) - 
        (cumulativeData.length > 0 ? 
          (cumulativeData[cumulativeData.length - 1].activeRisks + 
           cumulativeData[cumulativeData.length - 1].risksClosed) : 0);
      
      const newClosedThisPeriod = item.closed - 
        (cumulativeData.length > 0 ? 
          cumulativeData[cumulativeData.length - 1].risksClosed : 0);
      
      totalIdentified += Math.max(0, newRisksThisPeriod);
      totalClosed += Math.max(0, newClosedThisPeriod);
      
      cumulativeData.push({
        date: item.date,
        riskIdentified: totalIdentified,
        risksClosed: totalClosed,
        activeRisks: totalIdentified - totalClosed
      });
    });
    
    return cumulativeData;
  };
  
  // Generate risk exposure data
  const generateRiskExposureData = () => {
    const exposureData: RiskExposureData[] = [];
    
    riskTrends.forEach((item) => {
      // Calculate a mock risk exposure index (0-100)
      // This would be based on a more complex algorithm in a real app
      const totalRisks = item.open + item.mitigated + item.closed;
      const exposureIndex = Math.min(
        100,
        Math.round(
          (item.open * 100 + item.mitigated * 30) / 
          Math.max(1, totalRisks)
        )
      );
      
      // Calculate mitigation effectiveness (0-100)
      const mitigationEffectiveness = item.open > 0 ? 
        Math.min(100, Math.round((item.mitigated / (item.open + item.mitigated)) * 100)) : 100;
      
      exposureData.push({
        date: item.date,
        exposureIndex,
        mitigationEffectiveness
      });
    });
    
    return exposureData;
  };
  
  // Apply time range filter
  const getTimeFilteredData = (data: any[]) => {
    const now = moment();
    let cutoffDate: moment.Moment;
    
    switch (timeRange) {
      case '1m': 
        cutoffDate = now.clone().subtract(1, 'month');
        break;
      case '3m':
        cutoffDate = now.clone().subtract(3, 'months');
        break;
      case '6m':
        cutoffDate = now.clone().subtract(6, 'months');
        break;
      case '1y':
        cutoffDate = now.clone().subtract(1, 'year');
        break;
      default:
        cutoffDate = moment('2000-01-01'); // Default to showing all data
        break;
    }
    
    return data.filter(item => moment(item.date).isAfter(cutoffDate));
  };
  
  const trendData = generateAdditionalTrendData();
  const cumulativeData = generateCumulativeData();
  const exposureData = generateRiskExposureData();
  
  const filteredTrendData = getTimeFilteredData(trendData);
  const filteredCumulativeData = getTimeFilteredData(cumulativeData);
  const filteredExposureData = getTimeFilteredData(exposureData);
  
  // Custom tooltip formatter
  const renderTooltip = (props: any) => {
    const { active, payload, label } = props;
    
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: darkMode ? '#333' : '#fff',
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '3px',
          color: darkMode ? '#fff' : '#333'
        }}>
          <p className="label" style={{ marginBottom: '5px' }}><strong>{label}</strong></p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color, margin: '3px 0' }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    
    return null;
  };
  
  // Render charts based on type
  const renderMainChart = () => {
    const filteredTrendData = getTimeFilteredData(trendData);

    const getChartComponent = () => {
      switch (chartType) {
        case 'line':
          return (
            <LineChart
              data={filteredTrendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
              <XAxis dataKey="date" stroke={darkMode ? '#ddd' : '#666'} />
              <YAxis stroke={darkMode ? '#ddd' : '#666'} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#333' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                  border: '1px solid #ccc'
                }}
              />
              <Legend wrapperStyle={{ color: darkMode ? '#ddd' : '#333' }} />
              <Line 
                type="monotone" 
                dataKey="open" 
                stroke="#ff4d4f" 
                name="Open Risks" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="mitigated" 
                stroke="#faad14" 
                name="Mitigated Risks" 
              />
              <Line 
                type="monotone" 
                dataKey="closed" 
                stroke="#52c41a" 
                name="Closed Risks" 
              />
              {viewMode === 'priority' && (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="high" 
                    stroke="#f5222d" 
                    name="High Priority" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="medium" 
                    stroke="#fa8c16" 
                    name="Medium Priority" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="low" 
                    stroke="#52c41a" 
                    name="Low Priority" 
                  />
                </>
              )}
            </LineChart>
          );
        case 'bar':
          return (
            <BarChart
              data={filteredTrendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
              <XAxis dataKey="date" stroke={darkMode ? '#ddd' : '#666'} />
              <YAxis stroke={darkMode ? '#ddd' : '#666'} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#333' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                  border: '1px solid #ccc'
                }}
              />
              <Legend wrapperStyle={{ color: darkMode ? '#ddd' : '#333' }} />
              {viewMode === 'status' ? (
                <>
                  <Bar dataKey="open" fill="#ff4d4f" name="Open Risks" />
                  <Bar dataKey="mitigated" fill="#faad14" name="Mitigated Risks" />
                  <Bar dataKey="closed" fill="#52c41a" name="Closed Risks" />
                </>
              ) : (
                <>
                  <Bar dataKey="high" fill="#f5222d" name="High Priority" />
                  <Bar dataKey="medium" fill="#fa8c16" name="Medium Priority" />
                  <Bar dataKey="low" fill="#52c41a" name="Low Priority" />
                </>
              )}
            </BarChart>
          );
        case 'area':
        default:
          return (
            <AreaChart
              data={filteredTrendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
              <XAxis dataKey="date" stroke={darkMode ? '#ddd' : '#666'} />
              <YAxis stroke={darkMode ? '#ddd' : '#666'} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#333' : '#fff',
                  color: darkMode ? '#fff' : '#000',
                  border: '1px solid #ccc'
                }}
              />
              <Legend wrapperStyle={{ color: darkMode ? '#ddd' : '#333' }} />
              {viewMode === 'status' ? (
                <>
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
                </>
              ) : (
                <>
                  <Area 
                    type="monotone" 
                    dataKey="high" 
                    stackId="1"
                    stroke="#f5222d" 
                    fill="#f5222d" 
                    name="High Priority"
                    fillOpacity={0.5}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="medium" 
                    stackId="1"
                    stroke="#fa8c16" 
                    fill="#fa8c16" 
                    name="Medium Priority"
                    fillOpacity={0.5}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="low" 
                    stackId="1"
                    stroke="#52c41a" 
                    fill="#52c41a" 
                    name="Low Priority"
                    fillOpacity={0.5}
                  />
                </>
              )}
            </AreaChart>
          );
      }
    };
    
    return (
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          {getChartComponent()}
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Render cumulative chart
  const renderCumulativeChart = () => {
    return (
      <div style={{ width: '100%', height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={filteredCumulativeData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
            <XAxis 
              dataKey="date" 
              stroke={darkMode ? '#ddd' : '#666'}
            />
            <YAxis stroke={darkMode ? '#ddd' : '#666'} />
            <Tooltip content={renderTooltip} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="riskIdentified" 
              stroke="#1890ff" 
              strokeWidth={2}
              name="Total Risks Identified"
              dot={{ r: 3 }}
            />
            <Line 
              type="monotone" 
              dataKey="risksClosed" 
              stroke="#52c41a" 
              strokeWidth={2}
              name="Total Risks Closed"
              dot={{ r: 3 }}
            />
            <Area
              type="monotone"
              dataKey="activeRisks"
              fill="#faad14"
              fillOpacity={0.3}
              stroke="#faad14"
              name="Active Risks"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  // Render exposure chart
  const renderExposureChart = () => {
    return (
      <div style={{ width: '100%', height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart 
            data={filteredExposureData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
            <XAxis 
              dataKey="date" 
              stroke={darkMode ? '#ddd' : '#666'}
            />
            <YAxis 
              yAxisId="left" 
              stroke="#ff4d4f" 
              label={{ 
                value: 'Risk Exposure', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#ff4d4f' }
              }}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#52c41a"
              label={{ 
                value: 'Mitigation Effectiveness', 
                angle: 90, 
                position: 'insideRight',
                style: { fill: '#52c41a' }
              }}
            />
            <Tooltip content={renderTooltip} />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="exposureIndex" 
              stroke="#ff4d4f" 
              strokeWidth={2}
              name="Risk Exposure Index"
              dot={{ r: 4 }}
            />
            <Bar 
              yAxisId="right"
              dataKey="mitigationEffectiveness" 
              barSize={20} 
              fill="#52c41a" 
              fillOpacity={0.8}
              name="Mitigation Effectiveness (%)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="risk-trend-analysis">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className={darkMode ? 'bg-gray-800 text-white' : ''} 
            bordered={false}
          >
            <Title level={4} className={darkMode ? 'text-white' : ''}>
              Risk Trend Analysis
            </Title>
            
            {/* Chart Controls */}
            <Row gutter={16} className="mb-4">
              <Col>
                <Radio.Group 
                  value={chartType} 
                  onChange={(e) => setChartType(e.target.value)}
                  buttonStyle="solid"
                >
                  <Radio.Button value="area">Area</Radio.Button>
                  <Radio.Button value="line">Line</Radio.Button>
                  <Radio.Button value="bar">Bar</Radio.Button>
                </Radio.Group>
              </Col>
              
              <Col>
                <Radio.Group 
                  value={viewMode} 
                  onChange={(e) => setViewMode(e.target.value)}
                  buttonStyle="solid"
                >
                  <Radio.Button value="status">By Status</Radio.Button>
                  <Radio.Button value="priority">By Priority</Radio.Button>
                </Radio.Group>
              </Col>
              
              <Col>
                <Select 
                  value={timeRange}
                  style={{ width: 120 }}
                  onChange={(value) => setTimeRange(value)}
                >
                  <Option value="1m">Last Month</Option>
                  <Option value="3m">Last 3 Months</Option>
                  <Option value="6m">Last 6 Months</Option>
                  <Option value="1y">Last Year</Option>
                  <Option value="all">All Time</Option>
                </Select>
              </Col>
            </Row>
            
            {/* Main Trend Chart */}
            <div className="trend-chart-container">
              <Card 
                className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                bordered={false}
                title={
                  <Text strong className={darkMode ? 'text-white' : ''}>
                    Risk Distribution Over Time {viewMode === 'status' ? 'by Status' : 'by Priority'}
                  </Text>
                }
              >
                {renderMainChart()}
              </Card>
            </div>
            
            {/* Additional Charts */}
            <Row gutter={[16, 16]} className="mt-4">
              <Col xs={24} lg={12}>
                <Card 
                  className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                  bordered={false}
                  title={
                    <Text strong className={darkMode ? 'text-white' : ''}>
                      Cumulative Risk Tracking
                    </Text>
                  }
                >
                  {renderCumulativeChart()}
                </Card>
              </Col>
              
              <Col xs={24} lg={12}>
                <Card 
                  className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                  bordered={false}
                  title={
                    <Text strong className={darkMode ? 'text-white' : ''}>
                      Risk Exposure & Mitigation Effectiveness
                    </Text>
                  }
                >
                  {renderExposureChart()}
                </Card>
              </Col>
            </Row>
            
            {/* Trend Insights */}
            <Row className="mt-4">
              <Col span={24}>
                <Card 
                  className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                  bordered={false}
                  title={
                    <Text strong className={darkMode ? 'text-white' : ''}>
                      Trend Analysis Insights
                    </Text>
                  }
                >
                  <Row gutter={16}>
                    <Col xs={24} md={8}>
                      <div className="insight-item">
                        <Title level={5} className={darkMode ? 'text-white' : ''}>
                          Risk Velocity
                        </Title>
                        <Text className={darkMode ? 'text-white' : ''}>
                          The rate of new risks identified is {
                            filteredTrendData.length >= 2 && 
                            filteredTrendData[filteredTrendData.length - 1].total > filteredTrendData[filteredTrendData.length - 2].total
                              ? 'increasing, suggesting either growing project complexity or improved risk identification processes'
                              : 'improved risk management or reduced project complexity'
                          }.
                        </Text>
                      </div>
                    </Col>
                    
                    <Col xs={24} md={8}>
                      <div className="insight-item">
                        <Title level={5} className={darkMode ? 'text-white' : ''}>
                          Mitigation Rate
                        </Title>
                        <Text className={darkMode ? 'text-white' : ''}>
                          {
                            filteredExposureData.length >= 2 && 
                            filteredExposureData[filteredExposureData.length - 1].mitigationEffectiveness > 
                            filteredExposureData[filteredExposureData.length - 2].mitigationEffectiveness
                              ? 'Mitigation effectiveness is improving, indicating successful risk management strategies.'
                              : 'Mitigation effectiveness has decreased, requiring attention to improve risk response strategies.'
                          }
                        </Text>
                      </div>
                    </Col>
                    
                    <Col xs={24} md={8}>
                      <div className="insight-item">
                        <Title level={5} className={darkMode ? 'text-white' : ''}>
                          Risk Exposure Forecast
                        </Title>
                        <Text className={darkMode ? 'text-white' : ''}>
                          Based on current trends, overall risk exposure is expected to {
                            filteredExposureData.length >= 3 && 
                            (filteredExposureData[filteredExposureData.length - 1].exposureIndex < 
                            filteredExposureData[filteredExposureData.length - 2].exposureIndex)
                              ? 'continue decreasing if current mitigation strategies are maintained.'
                              : 'increase if current mitigation strategies are not enhanced.'
                          }
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RiskTrendAnalysis; 