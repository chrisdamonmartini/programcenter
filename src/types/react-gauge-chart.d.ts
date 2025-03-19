declare module 'react-gauge-chart' {
  import { Component } from 'react';

  export interface GaugeChartProps {
    id: string;
    nrOfLevels?: number;
    percent?: number;
    arcWidth?: number;
    arcPadding?: number;
    cornerRadius?: number;
    colors?: string[];
    textColor?: string;
    needleColor?: string;
    needleBaseColor?: string;
    hideText?: boolean;
    animate?: boolean;
    animDelay?: number;
    animateDuration?: number;
    style?: React.CSSProperties;
    className?: string;
    formatTextValue?: (value: number) => string;
  }

  class GaugeChart extends Component<GaugeChartProps> {}
  export default GaugeChart;
} 