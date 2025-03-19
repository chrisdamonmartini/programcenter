import React from 'react';
import { 
  Card, Row, Col, Statistic, Typography
} from 'antd';
import {
  ArrowUpOutlined, ArrowDownOutlined, DollarOutlined
} from '@ant-design/icons';
import { 
  PieChart, Pie, Treemap,
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import CollapsibleSection from '../common/CollapsibleSection';

const { Title, Text } = Typography;

// Generate a color based on category name (consistent colors for same categories)
const getCategoryColor = (categoryName: string): string => {
  const colors = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    hash = categoryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
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

interface CostBreakdownSectionProps {
  data: {
    budgetCategories: any[];
  };
  preferences: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse: () => void;
}

const CostBreakdownSection: React.FC<CostBreakdownSectionProps> = ({ 
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
  
  // Calculate total budget
  const totalBudget = data.budgetCategories.reduce((sum, category) => sum + category.budget, 0);
  const totalSpent = data.budgetCategories.reduce((sum, category) => sum + category.spent, 0);
  
  // Generate data
  const costBreakdownData = generateCostBreakdownData(data.budgetCategories);
  const costAllocationData = generateCostAllocationData(data.budgetCategories);
  
  return (
    <CollapsibleSection
      id="cost-breakdown"
      title="Cost Breakdown & Allocation"
      icon="🧩"
      isCollapsed={preferences.collapsedSections.includes('cost-breakdown')}
      onToggle={onToggleCollapse}
      darkMode={darkMode}
    >
      <div className="mb-6">
        <Title level={4} className={darkMode ? 'text-white' : ''}>Cost Structure Analysis</Title>
        <Row gutter={[16, 16]}>
          <Col span={24} lg={12}>
            <Card title="Cost Breakdown by Category" bordered={false} className={darkMode ? 'bg-gray-800 text-white' : ''}>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={costBreakdownData as any}
                    dataKey="budget"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    isAnimationActive={false}
                  >
                    <RechartsTooltip
                      formatter={(value: any) => formatCurrency(Number(value))}
                      contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ccc' }}
                      itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                    />
                    {(costBreakdownData as any).children.map((item: any, index: number) => (
                      <Treemap
                        key={`level-1-${index}`}
                        dataKey="value"
                        data={item.children}
                        fill={getCategoryColor(item.name)}
                        stroke="#fff"
                      />
                    ))}
                  </Treemap>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
          <Col span={24} lg={12}>
            <Card title="Budget vs. Spending Allocation" bordered={false} className={darkMode ? 'bg-gray-800 text-white' : ''}>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costAllocationData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      isAnimationActive={false}
                    >
                      {costAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Pie
                      data={costAllocationData}
                      dataKey="spent"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      fill="#82ca9d"
                      label
                      isAnimationActive={false}
                    >
                      {costAllocationData.map((entry, index) => (
                        <Cell key={`cell-spent-${index}`} fill={entry.fill} opacity={0.6} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: any, name: any, props: any) => [formatCurrency(Number(value)), props.payload.name]}
                      contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: '1px solid #ccc' }}
                      itemStyle={{ color: darkMode ? '#fff' : '#000' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <Row gutter={[16, 16]} className="mt-4">
                <Col span={8}>
                  <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}>
                    <Statistic
                      title={<Text className={darkMode ? 'text-gray-300' : ''}>Largest Budget Category</Text>}
                      value={costAllocationData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name}
                      valueStyle={{ color: darkMode ? '#fff' : undefined }}
                    />
                    <div style={{ marginTop: 5 }}>
                      <Text className={darkMode ? 'text-gray-300' : ''}>
                        {formatCurrency(costAllocationData.reduce((prev, current) => (prev.value > current.value) ? prev : current).value)}
                        {' '}({(costAllocationData.reduce((prev, current) => (prev.value > current.value) ? prev : current).value / totalBudget * 100).toFixed(1)}% of budget)
                      </Text>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}>
                    <Statistic
                      title={<Text className={darkMode ? 'text-gray-300' : ''}>Most Spent Category</Text>}
                      value={costAllocationData.reduce((prev, current) => (prev.spent > current.spent) ? prev : current).name}
                      valueStyle={{ color: darkMode ? '#fff' : undefined }}
                    />
                    <div style={{ marginTop: 5 }}>
                      <Text className={darkMode ? 'text-gray-300' : ''}>
                        {formatCurrency(costAllocationData.reduce((prev, current) => (prev.spent > current.spent) ? prev : current).spent)}
                        {' '}({(costAllocationData.reduce((prev, current) => (prev.spent > current.spent) ? prev : current).spent / totalSpent * 100).toFixed(1)}% of spending)
                      </Text>
                    </div>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card bordered={false} className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}>
                    <Statistic
                      title={<Text className={darkMode ? 'text-gray-300' : ''}>Budget Utilization</Text>}
                      value={(totalSpent / totalBudget * 100).toFixed(1) + '%'}
                      valueStyle={{ 
                        color: (totalSpent / totalBudget) > 1 ? 
                          (darkMode ? '#ff4d4f' : '#cf1322') : 
                          (darkMode ? '#52c41a' : '#3f8600')
                      }}
                      prefix={totalSpent > totalBudget ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    />
                    <div style={{ marginTop: 5 }}>
                      <Text className={darkMode ? 'text-gray-300' : ''}>
                        {formatCurrency(totalSpent)} of {formatCurrency(totalBudget)}
                      </Text>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </CollapsibleSection>
  );
};

export default CostBreakdownSection; 