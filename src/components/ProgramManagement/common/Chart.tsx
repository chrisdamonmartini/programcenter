import React, { ReactElement } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface ChartProps {
  type: 'line' | 'bar' | 'pie';
  data: any[];
  xKey: string;
  yKeys: string[];
  title: string;
  darkMode?: boolean;
  height?: number;
  colors?: string[];
}

const Chart: React.FC<ChartProps> = ({
  type,
  data,
  xKey,
  yKeys,
  title,
  darkMode = false,
  height = 300,
  colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
}) => {
  const textColor = darkMode ? '#E5E7EB' : '#374151';
  const gridColor = darkMode ? '#374151' : '#E5E7EB';

  const renderChart = (): ReactElement => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey={xKey} stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${gridColor}`,
                color: textColor,
              }}
            />
            <Legend />
            {yKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ fill: colors[index % colors.length], r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey={xKey} stroke={textColor} />
            <YAxis stroke={textColor} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${gridColor}`,
                color: textColor,
              }}
            />
            <Legend />
            {yKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={yKeys[0]}
              nameKey={xKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                border: `1px solid ${gridColor}`,
                color: textColor,
              }}
            />
            <Legend />
          </PieChart>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="w-full">
      <h3 className={`text-lg font-semibold mb-4 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h3>
      <div className={`p-4 rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-sm`}>
        <div style={{ width: '100%', height }}>
          <ResponsiveContainer>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Chart; 