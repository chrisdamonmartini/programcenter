import React, { useState, useEffect } from 'react';
import { 
  Card, Row, Col, Progress, Statistic, Tooltip as AntTooltip, Tabs, 
  Tag, Table, Space, Button, Typography
} from 'antd';
import {
  ArrowUpOutlined, ArrowDownOutlined, DollarOutlined, 
  WarningOutlined, CheckCircleOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  AreaChart, Area, ComposedChart, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell,
  ScatterChart, ReferenceLine, ReferenceArea, Scatter
} from 'recharts';
import CollapsibleSection from '../common/CollapsibleSection';
import Chart from '../common/Chart';
import { CostMetric, BudgetCategory, CostTrend } from '../../../mockupData/programManagementData';
import CostBreakdownSection from './CostBreakdownSection';
import FinancialRiskSection from './FinancialRiskSection';
import AdvancedEVMSection from './AdvancedEVMSection';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface SparklineProps {
  data: any[];
  dataKey: string;
  color?: string;
  height?: number;
}

// Sparkline component for mini trend visualization
const Sparkline: React.FC<SparklineProps> = ({ data, dataKey, color = "#1890ff", height = 30 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data}>
      <Line 
        type="monotone" 
        dataKey={dataKey} 
        stroke={color} 
        strokeWidth={2} 
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

interface MiniProgressProps {
  percent: number;
  status: string;
}

// Mini progress bar component
const MiniProgress: React.FC<MiniProgressProps> = ({ percent, status }) => {
  const getColorByStatus = (status: string): string => {
    switch(status) {
      case 'On Track': return '#52c41a';
      case 'At Risk': return '#faad14';
      case 'Behind': return '#f5222d';
      default: return '#1890ff';
    }
  };
  
  return (
    <Progress 
      percent={percent} 
      size="small" 
      strokeColor={getColorByStatus(status)}
      showInfo={false}
    />
  );
};

// Generate trend data for sparklines
const generateTrendData = (current: number, variance = 0.1, points = 10): Array<{value: number}> => {
  const result: Array<{value: number}> = [];
  let value = current * 0.7;
  
  for (let i = 0; i < points; i++) {
    const randomVariance = (Math.random() * 2 - 1) * variance;
    value = value * (1 + randomVariance);
    if (i === points - 1) value = current; // Ensure final value matches current
    result.push({ value });
  }
  
  return result;
};

// Generate monthly data for budget timeline
const generateMonthlyData = (startValue: number, months = 12, variancePercent = 0.1): Array<{
  date: string;
  planned: number;
  actual: number | null;
  remaining: number;
}> => {
  const result = [];
  let currentDate = new Date();
  let cumulativeValue = 0;
  
  for (let i = 0; i < months; i++) {
    const month = new Date(currentDate);
    month.setMonth(currentDate.getMonth() + i);
    
    // Simulate variance in monthly spending
    const monthVariance = (Math.random() * 2 - 1) * variancePercent;
    const monthValue = (startValue / months) * (1 + monthVariance);
    cumulativeValue += monthValue;
    
    result.push({
      date: month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      planned: Math.round((startValue / months) * (i + 1)),
      actual: i < 6 ? Math.round(cumulativeValue) : null, // Only show actual for past months
      remaining: Math.round(startValue - cumulativeValue)
    });
  }
  
  return result;
};

// Generate variance data
const generateVarianceData = (categories: any[], totalBudget: number) => {
  return categories.map((category: any) => {
    const variance = category.spent - category.budget;
    const variancePercent = (variance / category.budget) * 100;
    
    return {
      category: category.category,
      budget: category.budget,
      actual: category.spent,
      variance: variance,
      variancePercent: variancePercent,
      impact: Math.abs(variance / totalBudget) * 100
    };
  });
};

// Generate forecast data
const generateForecastData = (currentSpent: number, totalBudget: number, burnRate: number, months = 6) => {
  const result = [];
  let spent = currentSpent;
  let current = new Date();
  
  for (let i = 0; i < months; i++) {
    const month = new Date(current);
    month.setMonth(current.getMonth() + i);
    
    // Slightly increase burn rate each month (simulate acceleration)
    const adjustedBurnRate = burnRate * (1 + (i * 0.02));
    spent += adjustedBurnRate;
    
    result.push({
      date: month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      projected: Math.min(spent, totalBudget),
      budget: totalBudget,
      remaining: Math.max(totalBudget - spent, 0)
    });
  }
  
  return result;
};

// Generate data for EVM S-curve
const generateEVMData = (pv: number, ev: number, ac: number, months = 12) => {
  const result = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6); // Start 6 months ago
  
  // Generate cumulative values
  let cumPV = 0;
  let cumEV = 0;
  let cumAC = 0;
  
  // Program baseline total value
  const totalValue = pv * 2.5; // Assuming PV is around 40% of project
  
  for (let i = 0; i < months; i++) {
    const month = new Date(startDate);
    month.setMonth(startDate.getMonth() + i);
    
    // Calculate s-curve values with some variance
    const normalizedTime = i / (months - 1);
    const sCurveMultiplier = 4 * normalizedTime * (1 - normalizedTime); // Creates an S-curve effect
    
    // Current month values
    const monthPV = totalValue * sCurveMultiplier * (1 + (Math.random() * 0.1 - 0.05));
    
    // EV and AC as variants of PV based on performance indices
    const monthEV = i < 6 ? monthPV * (0.8 + (Math.random() * 0.4)) : null; // Only actual for past months
    const monthAC = i < 6 ? (monthEV ? monthEV / (0.9 + (Math.random() * 0.2)) : null) : null; // Only actual for past months
    
    // Accumulate values
    cumPV += monthPV;
    if (i < 6) {
      cumEV += monthEV || 0;
      cumAC += monthAC || 0;
    }
    
    result.push({
      date: month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      pv: Math.round(cumPV),
      ev: i < 6 ? Math.round(cumEV) : null,
      ac: i < 6 ? Math.round(cumAC) : null,
      monthPV: Math.round(monthPV),
      monthEV: i < 6 ? (monthEV ? Math.round(monthEV) : null) : null,
      monthAC: i < 6 ? (monthAC ? Math.round(monthAC) : null) : null,
    });
  }
  
  // Set the last values to match our current metrics
  if (result.length >= 6) {
    result[5].ev = ev;
    result[5].ac = ac;
    result[5].pv = pv;
  }
  
  return result;
};

// Generate data for EVM performance quadrant
const generateEVMQuadrantData = (spi: number, cpi: number) => {
  // Current performance point
  const current = { x: spi, y: cpi, name: 'Current' };
  
  // Generate historical performance points (last 6 months)
  const historical = [];
  const startSPI = spi - 0.2 - Math.random() * 0.3;
  const startCPI = cpi - 0.15 - Math.random() * 0.3;
  
  for (let i = 0; i < 6; i++) {
    const progress = i / 5; // 0 to 1
    const historicalSPI = startSPI + (spi - startSPI) * progress + (Math.random() * 0.1 - 0.05);
    const historicalCPI = startCPI + (cpi - startCPI) * progress + (Math.random() * 0.1 - 0.05);
    
    historical.push({
      x: historicalSPI,
      y: historicalCPI,
      name: `Month ${i+1}`,
      size: 5 + i * 2 // Increasing size to show progression
    });
  }
  
  return { current, historical };
};

// Fix the variance data structure
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

// Generate variance data for EVM analysis
const generateEVMVarianceData = (pv: number, ev: number, ac: number): EVMVarianceData => {
  const svPercent = ((ev - pv) / pv) * 100;
  const cvPercent = ((ev - ac) / ac) * 100;
  
  // Calculate variance by time periods
  const periods = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'];
  const varianceData = periods.map((period, index) => {
    // Create a trend that leads to current values
    const progressFactor = index / (periods.length - 1);
    const historicalSV = svPercent * progressFactor * (0.7 + Math.random() * 0.6);
    const historicalCV = cvPercent * progressFactor * (0.7 + Math.random() * 0.6);
    
    return {
      period,
      sv: historicalSV,
      cv: historicalCV,
      svValue: (historicalSV / 100) * pv,
      cvValue: (historicalCV / 100) * ac,
    };
  });
  
  return {
    varianceData,
    summary: {
      sv: svPercent,
      cv: cvPercent,
      svPercent: svPercent,
      cvPercent: cvPercent
    }
  };
};

// Generate data for cost breakdown treemap
const generateCostBreakdownData = (budgetCategories: any[]) => {
  // Top level categories
  const result = {
    name: 'Total Program',
    children: budgetCategories.map((category: any) => {
      // Generate subcategories for each category
      const subcategories = [
        { name: 'Labor', value: category.budget * (0.4 + Math.random() * 0.2) },
        { name: 'Materials', value: category.budget * (0.3 + Math.random() * 0.1) },
        { name: 'Equipment', value: category.budget * (0.15 + Math.random() * 0.1) },
        { name: 'Other', value: category.budget * (0.05 + Math.random() * 0.05) },
      ];
      
      // Adjust values to ensure they sum up to category budget
      const sum = subcategories.reduce((acc, curr) => acc + curr.value, 0);
      const adjustmentFactor = category.budget / sum;
      
      subcategories.forEach(sub => {
        sub.value = Math.round(sub.value * adjustmentFactor);
      });
      
      return {
        name: category.category,
        budget: category.budget,
        children: subcategories
      };
    })
  };
  
  return result;
};

// Generate data for cost allocation pie chart
const generateCostAllocationData = (budgetCategories: any[]) => {
  // Basic cost allocation by category
  return budgetCategories.map((category: any) => ({
    name: category.category,
    value: category.budget,
    spent: category.spent,
    fill: getCategoryColor(category.category)
  }));
};

// Generate a color based on category name (consistent colors for same categories)
const getCategoryColor = (categoryName: string) => {
  const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

// Generate data for cost components breakdown
const generateCostComponentsData = () => {
  // Define some cost components for the program
  const components = [
    { name: 'Labor', value: 0 },
    { name: 'Materials', value: 0 },
    { name: 'Equipment', value: 0 },
    { name: 'Overhead', value: 0 },
    { name: 'Subcontracts', value: 0 },
    { name: 'Travel', value: 0 },
    { name: 'Other', value: 0 },
  ];
  
  // Generate random values that add up to a total
  const total = 1000000;
  let remaining = total;
  
  components.forEach((component, index) => {
    if (index === components.length - 1) {
      component.value = remaining; // Last component gets the remainder
    } else {
      // Distribute values with some components getting more than others
      const share = remaining * (0.1 + (index === 0 ? 0.3 : index === 1 ? 0.2 : 0.1) * Math.random());
      component.value = Math.round(share);
      remaining -= component.value;
    }
  });
  
  return components;
};

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

interface CostManagementProps {
  data: {
    costMetrics: CostMetric[];
    budgetCategories: BudgetCategory[];
    costTrends: CostTrend[];
    evmMetrics: {
      pv: number;
      ev: number;
      ac: number;
      spi: number;
      cpi: number;
    };
  };
  preferences: any;
  onToggleCollapse: () => void;
}

const CostManagement: React.FC<CostManagementProps> = ({
  data,
  preferences = { darkMode: false, collapsedSections: [] },
  onToggleCollapse,
}) => {
  const [darkMode, setDarkMode] = useState(preferences?.darkMode || false);
  
  // Debug log to confirm component rendering with latest version
  console.log('Rendering enhanced CostManagement component', new Date().toISOString());
  
  // Force re-render of charts when component mounts
  useEffect(() => {
    console.log('CostManagement mounted/updated', data);
    // Force any recharts to update
    window.dispatchEvent(new Event('resize'));
  }, [data]);
  
  const [activeTab, setActiveTab] = useState('overview');
  
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
  
  // Calculate total budget and spending
  const totalBudget = data.budgetCategories.reduce((sum, category) => sum + category.budget, 0);
  const totalSpent = data.budgetCategories.reduce((sum, category) => sum + category.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const spendingPercent = Math.round((totalSpent / totalBudget) * 100);
  
  // Calculate monthly/weekly spending rate
  const burnRate = totalSpent / 12; // Simplified monthly burn rate
  
  // Enhanced cost metrics section
  const renderCostMetricsSection = () => (
    <CollapsibleSection
      id="cost-metrics"
      title="Cost Metrics"
      icon="📊"
      isCollapsed={preferences.collapsedSections.includes('cost-metrics')}
      onToggle={onToggleCollapse}
      darkMode={darkMode}
    >
      <div className="mb-6">
        <Row gutter={[16, 16]}>
          {/* Total Program Budget Card */}
          <Col xs={24} md={12} lg={6}>
            <Card 
              className={darkMode ? 'bg-gray-800 text-white' : ''} 
              bordered={false}
              style={{ height: '100%' }}
            >
              <Statistic
                title={<Text className={darkMode ? 'text-gray-300' : ''}>Total Program Budget</Text>}
                value={formatCurrency(totalBudget)}
                precision={0}
                valueStyle={{ color: darkMode ? '#fff' : '#1890ff' }}
                prefix={<DollarOutlined />}
              />
              <div style={{ marginTop: 10, marginBottom: 5 }}>
                <Text className={darkMode ? 'text-gray-300' : ''}>
                  Spent: {formatCurrency(totalSpent)} ({spendingPercent}%)
                </Text>
              </div>
              <Progress 
                percent={spendingPercent} 
                status={spendingPercent > 95 ? "exception" : spendingPercent > 80 ? "active" : "normal"}
                strokeColor={{
                  from: '#108ee9',
                  to: spendingPercent > 95 ? '#ff4d4f' : spendingPercent > 80 ? '#faad14' : '#52c41a',
                }}
              />
              <div style={{ marginTop: 10 }}>
                <Text className={darkMode ? 'text-gray-300' : ''}>
                  Remaining: {formatCurrency(totalRemaining)}
                </Text>
              </div>
            </Card>
          </Col>

          {/* Monthly Burn Rate */}
          <Col xs={24} md={12} lg={6}>
            <Card 
              className={darkMode ? 'bg-gray-800 text-white' : ''} 
              bordered={false}
              style={{ height: '100%' }}
            >
              <Statistic
                title={<Text className={darkMode ? 'text-gray-300' : ''}>Monthly Burn Rate</Text>}
                value={formatCurrency(burnRate)}
                precision={0}
                valueStyle={{ color: darkMode ? '#fff' : '#cf1322' }}
                prefix={<ArrowDownOutlined />}
              />
              <div style={{ marginTop: 10, height: 30 }}>
                <Sparkline 
                  data={generateTrendData(burnRate, 0.05, 12)}
                  dataKey="value"
                  color="#ff4d4f"
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <Text className={darkMode ? 'text-gray-300' : ''}>
                  Financial Runway: {Math.round(totalRemaining / burnRate)} months
                </Text>
              </div>
            </Card>
          </Col>

          {/* Cost Performance Index */}
          <Col xs={24} md={12} lg={6}>
            <Card 
              className={darkMode ? 'bg-gray-800 text-white' : ''} 
              bordered={false}
              style={{ height: '100%' }}
            >
              <Statistic
                title={<Text className={darkMode ? 'text-gray-300' : ''}>CPI (Cost Performance)</Text>}
                value={data.evmMetrics.cpi}
                precision={2}
                valueStyle={{ 
                  color: data.evmMetrics.cpi >= 1 ? 
                    (darkMode ? '#52c41a' : '#3f8600') : 
                    (darkMode ? '#ff4d4f' : '#cf1322') 
                }}
                prefix={data.evmMetrics.cpi >= 1 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                suffix={data.evmMetrics.cpi >= 1 ? 
                  <Tag color="success">Under Budget</Tag> : 
                  <Tag color="error">Over Budget</Tag>
                }
              />
              <div style={{ marginTop: 10 }}>
                <Progress
                  type="circle"
                  percent={data.evmMetrics.cpi * 100}
                  status={data.evmMetrics.cpi >= 1 ? "success" : "exception"}
                  strokeColor={data.evmMetrics.cpi >= 1 ? "#52c41a" : "#ff4d4f"}
                  format={percent => `${((percent || 0) > 0 ? '+' : '') + (percent || 0).toFixed(1)}%`}
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <Text className={darkMode ? 'text-gray-300' : ''}>
                  Earned: {formatCurrency(data.evmMetrics.ev)} vs Actual: {formatCurrency(data.evmMetrics.ac)}
                </Text>
              </div>
            </Card>
          </Col>

          {/* Schedule Performance Index */}
          <Col xs={24} md={12} lg={6}>
            <Card 
              className={darkMode ? 'bg-gray-800 text-white' : ''} 
              bordered={false}
              style={{ height: '100%' }}
            >
              <Statistic
                title={<Text className={darkMode ? 'text-gray-300' : ''}>SPI (Schedule Performance)</Text>}
                value={data.evmMetrics.spi}
                precision={2}
                valueStyle={{ 
                  color: data.evmMetrics.spi >= 1 ? 
                    (darkMode ? '#52c41a' : '#3f8600') : 
                    (darkMode ? '#ff4d4f' : '#cf1322') 
                }}
                prefix={data.evmMetrics.spi >= 1 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                suffix={data.evmMetrics.spi >= 1 ? 
                  <Tag color="success">Ahead</Tag> : 
                  <Tag color="error">Behind</Tag>
                }
              />
              <div style={{ marginTop: 10 }}>
                <Progress
                  type="circle"
                  percent={data.evmMetrics.spi * 100}
                  status={data.evmMetrics.spi >= 1 ? "success" : "exception"}
                  strokeColor={data.evmMetrics.spi >= 1 ? "#52c41a" : "#ff4d4f"}
                  format={percent => `${((percent || 0) > 0 ? '+' : '') + (percent || 0).toFixed(1)}%`}
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <Text className={darkMode ? 'text-gray-300' : ''}>
                  Earned: {formatCurrency(data.evmMetrics.ev)} vs Planned: {formatCurrency(data.evmMetrics.pv)}
                </Text>
              </div>
            </Card>
          </Col>
        </Row>
        
        {/* Individual Cost Metrics Cards */}
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          {data.costMetrics.map((metric, index) => {
            // Calculate percentage against target
            const percentOfTarget = Math.round((metric.value / metric.target) * 100);
            const trendData = generateTrendData(metric.value, 0.08, 10);
            
            return (
              <Col key={index} xs={24} sm={12} md={6}>
                <Card className={darkMode ? 'bg-gray-800 text-white' : ''} bordered={false}>
                  <div className="flex justify-between items-start">
                    <Title level={5} className={darkMode ? 'text-white m-0' : 'm-0'}>
                      {metric.name}
                    </Title>
                    <Tag color={
                      metric.trend === 'On Track' ? 'success' :
                      metric.trend === 'At Risk' ? 'warning' : 'error'
                    }>
                      {metric.trend}
                    </Tag>
                  </div>
                  
                  <Statistic
                    value={formatCurrency(metric.value)}
                    valueStyle={{ fontSize: '20px', color: darkMode ? '#fff' : undefined }}
                    className="my-2"
                  />
                  
                  <div style={{ marginBottom: 5 }}>
                    <div className="flex justify-between">
                      <Text className={darkMode ? 'text-gray-300' : ''}>
                        Target: {formatCurrency(metric.target)}
                      </Text>
                      <Text className={darkMode ? 'text-gray-300' : ''}>
                        {percentOfTarget}%
                      </Text>
                    </div>
                    <MiniProgress percent={percentOfTarget} status={metric.trend} />
                  </div>
                  
                  <div style={{ height: 20, marginTop: 8 }}>
                    <Sparkline 
                      data={trendData}
                      dataKey="value"
                      color={
                        metric.trend === 'On Track' ? '#52c41a' :
                        metric.trend === 'At Risk' ? '#faad14' : '#ff4d4f'
                      }
                    />
                  </div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </CollapsibleSection>
  );

  // Add after the existing renderCostMetricsSection function
  const renderBudgetAnalysisSection = () => {
    // Generate data for budget timeline
    const timelineData = generateMonthlyData(totalBudget);
    
    // Generate forecast data
    const forecastData = generateForecastData(totalSpent, totalBudget, burnRate);
    
    // Generate variance data
    const varianceData = generateVarianceData(data.budgetCategories, totalBudget);
    
    // Create fixed domain values for the variance analysis chart
    const minDomain = -20;
    const maxDomain = 20;
    
    return (
      <CollapsibleSection
        id="budget-analysis"
        title="Budget Analysis & Forecasting"
        icon="💰"
        isCollapsed={preferences.collapsedSections.includes('budget-analysis')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="mb-6">
          <Tabs defaultActiveKey="timeline" onChange={(key) => console.log(key)}>
            <TabPane tab="Budget Timeline" key="timeline">
              <Card className={darkMode ? 'bg-gray-800 text-white' : ''} bordered={false}>
                <Title level={5} className={darkMode ? 'text-white' : ''}>
                  Program Budget Timeline
                </Title>
                <div style={{ height: 300, marginTop: 16 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={timelineData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                      <XAxis 
                        dataKey="date" 
                        stroke={darkMode ? '#ddd' : '#666'}
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke={darkMode ? '#ddd' : '#666'}
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                      />
                      <RechartsTooltip
                        formatter={(value) => `$${value.toLocaleString()}`}
                        labelFormatter={(label) => `Date: ${label}`}
                        contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ccc' }}
                        itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="planned" 
                        name="Planned Budget" 
                        barSize={20} 
                        fill="#8884d8"
                        isAnimationActive={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        name="Actual Spending" 
                        stroke="#ff7300"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        isAnimationActive={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ marginTop: 16 }}>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Initial Budget</Text>}
                        value={formatCurrency(totalBudget)}
                        valueStyle={{ color: darkMode ? '#fff' : undefined }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Current Spending</Text>}
                        value={formatCurrency(totalSpent)}
                        valueStyle={{ color: darkMode ? '#fff' : undefined }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Projected Completion</Text>}
                        value={`${Math.round(totalRemaining / burnRate)} months`}
                        valueStyle={{ color: darkMode ? '#fff' : undefined }}
                      />
                    </Col>
                  </Row>
                </div>
              </Card>
            </TabPane>

            <TabPane tab="Budget Burn-down" key="burndown">
              <Card className={darkMode ? 'bg-gray-800 text-white' : ''} bordered={false}>
                <Title level={5} className={darkMode ? 'text-white' : ''}>
                  Budget Burn-down & Forecast
                </Title>
                <div style={{ height: 300, marginTop: 16 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={forecastData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                      <XAxis 
                        dataKey="date" 
                        stroke={darkMode ? '#ddd' : '#666'}
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke={darkMode ? '#ddd' : '#666'}
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                      />
                      <RechartsTooltip
                        formatter={(value) => `$${value.toLocaleString()}`}
                        labelFormatter={(label) => `Date: ${label}`}
                        contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ccc' }}
                        itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="remaining"
                        name="Remaining Budget"
                        fill="#8884d8"
                        fillOpacity={0.6}
                        stroke="#8884d8"
                        isAnimationActive={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="projected"
                        name="Projected Spending"
                        fill="#ffc658"
                        fillOpacity={0.6}
                        stroke="#ffc658"
                        isAnimationActive={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="budget"
                        name="Total Budget"
                        stroke="#ff7300"
                        strokeWidth={2}
                        dot={false}
                        activeDot={false}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ marginTop: 16 }}>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Current Budget Remaining</Text>}
                        value={formatCurrency(totalRemaining)}
                        valueStyle={{ color: darkMode ? '#fff' : undefined }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Monthly Burn Rate</Text>}
                        value={formatCurrency(burnRate)}
                        valueStyle={{ color: darkMode ? '#fff' : undefined }}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic
                        title={<Text className={darkMode ? 'text-gray-300' : ''}>Estimated Completion Date</Text>}
                        value={forecastData[forecastData.length - 1].date}
                        valueStyle={{ 
                          color: totalRemaining > 0 ? 
                            (darkMode ? '#52c41a' : '#3f8600') : 
                            (darkMode ? '#ff4d4f' : '#cf1322')
                        }}
                      />
                    </Col>
                  </Row>
                </div>
              </Card>
            </TabPane>

            <TabPane tab="Variance Analysis" key="variance">
              <Card className={darkMode ? 'bg-gray-800 text-white' : ''} bordered={false}>
                <Title level={5} className={darkMode ? 'text-white' : ''}>
                  Budget Variance Analysis
                </Title>
                <div style={{ height: 300, marginTop: 16 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={varianceData}
                      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                      <XAxis 
                        dataKey="period" 
                        stroke={darkMode ? '#ddd' : '#666'}
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke={darkMode ? '#ddd' : '#666'}
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `${value.toFixed(0)}%`}
                        domain={[minDomain, maxDomain]}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        stroke={darkMode ? '#ddd' : '#666'}
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `${formatCurrency(value)}`}
                        domain={['dataMin - 100000', 'dataMax + 100000']}
                      />
                      <RechartsTooltip
                        formatter={(value, name) => {
                          if (typeof value !== 'number') {
                            return [String(value), String(name)];
                          }
                          
                          if (typeof name === 'string' && (name === 'sv' || name === 'cv')) {
                            return [`${value.toFixed(2)}%`, name.toUpperCase()];
                          }
                          
                          if (typeof name === 'string') {
                            return [`${formatCurrency(value)}`, `${name.substring(0, 2).toUpperCase()} Value`];
                          }
                          
                          return [formatCurrency(value), String(name)];
                        }}
                        labelFormatter={(label) => `Period: ${label}`}
                        contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ccc' }}
                        itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                      />
                      <Legend />
                      <ReferenceLine y={0} stroke="#888" />
                      <Bar 
                        dataKey="svValue" 
                        name="SV Value" 
                        yAxisId="right"
                        fill="#8884d8"
                        fillOpacity={0.6}
                        isAnimationActive={false}
                      />
                      <Bar 
                        dataKey="cvValue" 
                        name="CV Value" 
                        yAxisId="right"
                        fill="#82ca9d"
                        fillOpacity={0.6}
                        isAnimationActive={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sv" 
                        name="SV %" 
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                        isAnimationActive={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="cv" 
                        name="CV %" 
                        stroke="#82ca9d"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                        isAnimationActive={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ marginTop: 16 }}>
                  <Table
                    dataSource={varianceData}
                    pagination={false}
                    size="small"
                    style={{ 
                      background: darkMode ? '#1f1f1f' : '#fff',
                      color: darkMode ? '#fff' : '#000'
                    }}
                    columns={[
                      {
                        title: 'Category',
                        dataIndex: 'category',
                        key: 'category',
                      },
                      {
                        title: 'Budgeted',
                        dataIndex: 'budget',
                        key: 'budget',
                        render: (value) => formatCurrency(value),
                      },
                      {
                        title: 'Actual',
                        dataIndex: 'actual',
                        key: 'actual',
                        render: (value) => formatCurrency(value),
                      },
                      {
                        title: 'Variance',
                        dataIndex: 'variance',
                        key: 'variance',
                        render: (value) => (
                          <Text style={{ 
                            color: value < 0 ? '#52c41a' : '#ff4d4f',
                          }}>
                            {formatCurrency(value)}
                          </Text>
                        ),
                      },
                      {
                        title: 'Variance %',
                        dataIndex: 'variancePercent',
                        key: 'variancePercent',
                        render: (value) => (
                          <Text style={{ 
                            color: value < 0 ? '#52c41a' : '#ff4d4f',
                          }}>
                            {value.toFixed(2)}%
                          </Text>
                        ),
                      },
                    ]}
                  />
                </div>
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </CollapsibleSection>
    );
  };

  return (
    <div className="cost-management-dashboard">
      <div className="mb-4">
        <Title level={3} className={darkMode ? 'text-white' : ''}>
          Cost Management Dashboard
        </Title>
      </div>
      
      {/* Enhanced Cost Metrics */}
      {renderCostMetricsSection()}
      
      {/* Budget Analysis & Forecasting */}
      {renderBudgetAnalysisSection()}
      
      {/* Advanced EVM Section */}
      <AdvancedEVMSection 
        data={data} 
        preferences={preferences} 
        onToggleCollapse={onToggleCollapse} 
      />
      
      {/* Cost Breakdown & Allocation */}
      <CostBreakdownSection 
        data={data} 
        preferences={preferences} 
        onToggleCollapse={onToggleCollapse} 
      />
      
      {/* Financial Risk Assessment */}
      <FinancialRiskSection 
        preferences={preferences} 
        onToggleCollapse={onToggleCollapse} 
      />
      
      {/* EVM Metrics */}
      <CollapsibleSection
        title="EVM Metrics"
        id="evm-metrics"
        isCollapsed={preferences.collapsedSections.includes('evm-metrics')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="evm-metrics-content">
          <Card bordered={false} className={darkMode ? 'bg-gray-800 text-white' : ''}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Text className={darkMode ? 'text-white' : ''}>
                  View detailed EVM metrics in the Advanced EVM Dashboard section above.
                </Text>
              </Col>
            </Row>
          </Card>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default CostManagement; 