import React from 'react';

interface SimpleGaugeProps {
  id: string;
  value: number;
  maxValue: number;
  colors?: string[];
  textColor?: string;
  formatTextValue?: (value: number) => string;
  arcWidth?: number;
  cornerRadius?: number;
}

const SimpleGauge: React.FC<SimpleGaugeProps> = ({
  id,
  value,
  maxValue,
  colors = ['#ff0000', '#ffff00', '#00ff00'],
  textColor = '#000000',
  formatTextValue = (value) => `${value}`,
  arcWidth = 0.3,
  cornerRadius = 0
}) => {
  const percent = value / maxValue;
  const radius = 50;
  const centerX = 60;
  const centerY = 60;
  const startAngle = -Math.PI * 0.75;
  const endAngle = Math.PI * 0.75;
  const angleRange = endAngle - startAngle;
  const valueAngle = startAngle + angleRange * percent;
  const width = arcWidth * radius;
  const outerRadius = radius;
  const innerRadius = radius - width;

  // Calculate points for gauge background arc
  const getArcPath = (start: number, end: number, innerR: number, outerR: number) => {
    const startOuterX = centerX + Math.cos(start) * outerR;
    const startOuterY = centerY + Math.sin(start) * outerR;
    const endOuterX = centerX + Math.cos(end) * outerR;
    const endOuterY = centerY + Math.sin(end) * outerR;
    const startInnerX = centerX + Math.cos(start) * innerR;
    const startInnerY = centerY + Math.sin(start) * innerR;
    const endInnerX = centerX + Math.cos(end) * innerR;
    const endInnerY = centerY + Math.sin(end) * innerR;

    const largeArcFlag = end - start > Math.PI ? 1 : 0;

    return `
      M ${startOuterX} ${startOuterY}
      A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${endOuterX} ${endOuterY}
      L ${endInnerX} ${endInnerY}
      A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${startInnerX} ${startInnerY}
      Z
    `;
  };

  // Calculate gradient based on percent
  const getGradientColor = () => {
    if (colors.length === 1) return colors[0];
    
    const colorIndex = Math.min(
      Math.floor(percent * (colors.length - 1)),
      colors.length - 2
    );
    const ratio = (percent * (colors.length - 1)) % 1;
    
    // Simple linear interpolation between colors
    return interpolateColor(colors[colorIndex], colors[colorIndex + 1], ratio);
  };
  
  // Simple color interpolation
  const interpolateColor = (color1: string, color2: string, ratio: number) => {
    // Parse hex colors
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    
    // Interpolate
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <svg width="120" height="120" viewBox="0 0 120 120" id={id}>
      {/* Background track */}
      <path
        d={getArcPath(startAngle, endAngle, innerRadius, outerRadius)}
        fill="#e6e6e6"
      />
      
      {/* Value arc */}
      <path
        d={getArcPath(startAngle, valueAngle, innerRadius, outerRadius)}
        fill={getGradientColor()}
      />
      
      {/* Text value */}
      <text
        x={centerX}
        y={centerY + 5}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize="16"
        fontWeight="bold"
      >
        {formatTextValue(value)}
      </text>
    </svg>
  );
};

export default SimpleGauge; 