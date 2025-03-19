import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';
import ProgramOverview from './sections/ProgramOverview';
import TechnicalPerformance from './sections/TechnicalPerformance';
import ScheduleManagement from './sections/ScheduleManagement';
import CostManagement from './sections/CostManagement';
import RiskManagement from './sections/RiskManagement';
import StakeholderManagement from './sections/StakeholderManagement';
import QualityManagement from './sections/QualityManagement';
import SupplyChainManagement from './sections/SupplyChainManagement';
import ConfigurationManagement from './sections/ConfigurationManagement';
import DocumentationStatus from './sections/DocumentationStatus';
import ProgramStatus from './sections/ProgramStatus';
import PersonnelManagement from './sections/PersonnelManagement';
import ComplianceManagement from './sections/ComplianceManagement';

import { ProgramManagementData } from '../../mockupData/programManagementData';

interface ProgramManagementDashboardProps {
  data: ProgramManagementData;
}

const ProgramManagementDashboard: React.FC<ProgramManagementDashboardProps> = ({ data }) => {
  const [preferences, setPreferences] = useState({
    darkMode: false,
    collapsedSections: [] as string[]
  });

  const handleToggleCollapse = (section: string) => {
    setPreferences(prev => ({
      ...prev,
      collapsedSections: prev.collapsedSections.includes(section)
        ? prev.collapsedSections.filter(s => s !== section)
        : [...prev.collapsedSections, section]
    }));
  };

  return (
    <div className="program-management-dashboard">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ProgramOverview 
            data={data.programOverview}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24}>
          <ProgramStatus 
            data={data.programStatus}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('ProgramStatus')}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} lg={12}>
          <ScheduleManagement 
            data={data.scheduleManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Schedule')}
            key={`schedule-management-dashboard-${Date.now()}`}
          />
        </Col>
        <Col xs={24} lg={12}>
          <CostManagement 
            data={data.costManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Cost')}
            key={`cost-management-${Date.now()}`}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24}>
          <TechnicalPerformance 
            data={data.technicalPerformance}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Technical')}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24}>
          <RiskManagement 
            data={data.riskManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Risk')}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24}>
          <PersonnelManagement 
            data={data.personnelManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('PersonnelManagement')}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24}>
          <ComplianceManagement 
            data={data.complianceManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('ComplianceManagement')}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} lg={12}>
          <QualityManagement 
            data={data.qualityManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Quality')}
          />
        </Col>
        <Col xs={24} lg={12}>
          <SupplyChainManagement 
            data={data.supplyChainManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('SupplyChain')}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} lg={12}>
          <ConfigurationManagement 
            data={data.configurationManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Configuration')}
          />
        </Col>
        <Col xs={24} lg={12}>
          <StakeholderManagement 
            data={data.stakeholderManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Stakeholder')}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24}>
          <DocumentationStatus 
            data={data.documentationStatus}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Documentation')}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProgramManagementDashboard; 