import React from 'react';
import EnhancedRiskManagement from './RiskManagement/index';

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
}

interface Issue {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  owner: string;
  dateIdentified: string;
  lastUpdated: string;
  component?: string;
  dueDate?: string;
  relatedRisks?: string[];
}

interface RiskManagementProps {
  data: {
    risks: Risk[];
    issues: Issue[];
    riskTrends: {
      date: string;
      open: number;
      mitigated: number;
      closed: number;
    }[];
  };
  preferences: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse: () => void;
}

const RiskManagement: React.FC<RiskManagementProps> = ({
  data,
  preferences,
  onToggleCollapse,
}) => {
  const { darkMode } = preferences;
  
  const handleToggleCollapse = () => {
    onToggleCollapse();
  };
  
  // Forward the data to the enhanced component
  return (
    <EnhancedRiskManagement 
      data={data}
      darkMode={darkMode}
    />
  );
};

export default RiskManagement; 