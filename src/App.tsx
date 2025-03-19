import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import ProgramManagementDashboard from './components/ProgramManagement/ProgramManagementDashboard';
import { mockProgramManagementData } from './mockupData/programManagementData';
import ProgramOverview from './components/ProgramManagement/sections/ProgramOverview';
import TechnicalPerformance from './components/ProgramManagement/sections/TechnicalPerformance';
import ScheduleManagement from './components/ProgramManagement/sections/ScheduleManagement';
import CostManagement from './components/ProgramManagement/sections/CostManagement';
import RiskManagement from './components/ProgramManagement/sections/RiskManagement';
import StakeholderManagement from './components/ProgramManagement/sections/StakeholderManagement';
import QualityManagement from './components/ProgramManagement/sections/QualityManagement';
import SupplyChainManagement from './components/ProgramManagement/sections/SupplyChainManagement';
import ConfigurationManagement from './components/ProgramManagement/sections/ConfigurationManagement';
import DocumentationStatus from './components/ProgramManagement/sections/DocumentationStatus';
import { BankOutlined } from '@ant-design/icons';
import ProgramStatus from './components/ProgramManagement/sections/ProgramStatus';
import PersonnelManagement from './components/ProgramManagement/sections/PersonnelManagement';
import ComplianceManagement from './components/ProgramManagement/sections/ComplianceManagement';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [preferences, setPreferences] = useState({
    darkMode: false,
    collapsedSections: [] as string[]
  });
  const [forceUpdate, setForceUpdate] = useState(0);

  const handleNavigate = (path: string) => {
    // Force component refresh on navigation
    setForceUpdate(prev => prev + 1);
    setActiveView(path === '/' ? 'dashboard' : path.replace('/', ''));
  };

  const handleToggleCollapse = (section: string) => {
    setPreferences(prev => ({
      ...prev,
      collapsedSections: prev.collapsedSections.includes(section)
        ? prev.collapsedSections.filter(s => s !== section)
        : [...prev.collapsedSections, section]
    }));
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  const renderContent = () => {
    const data = mockProgramManagementData;

    switch (activeView) {
      case 'dashboard':
        return <ProgramManagementDashboard data={data} key={forceUpdate} />;
      case 'program-status':
        return (
          <ProgramStatus 
            data={data.programStatus}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('ProgramStatus')}
            key={forceUpdate}
          />
        );
      case 'technical':
        return (
          <TechnicalPerformance 
            data={data.technicalPerformance}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Technical')}
            key={forceUpdate}
          />
        );
      case 'schedule':
    return (
          <ScheduleManagement 
            data={data.scheduleManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Schedule')}
            key={`schedule-${Date.now()}`}
          />
        );
      case 'cost':
          return (
          <CostManagement 
            data={data.costManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Cost')}
            key={forceUpdate}
          />
        );
      case 'risk':
        return (
          <RiskManagement 
            data={data.riskManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Risk')}
            key={forceUpdate}
          />
        );
      case 'stakeholders':
      return (
          <StakeholderManagement 
            data={data.stakeholderManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Stakeholder')}
            key={forceUpdate}
          />
        );
      case 'quality':
    return (
          <QualityManagement 
            data={data.qualityManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Quality')}
            key={forceUpdate}
          />
        );
      case 'supply-chain':
      return (
          <SupplyChainManagement 
            data={data.supplyChainManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('SupplyChain')}
            key={forceUpdate}
          />
        );
      case 'configuration':
    return (
          <ConfigurationManagement 
            data={data.configurationManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Configuration')}
            key={forceUpdate}
          />
        );
      case 'documentation':
  return (
          <DocumentationStatus 
            data={data.documentationStatus}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('Documentation')}
            key={forceUpdate}
          />
        );
      case 'personnel':
        return (
          <PersonnelManagement 
            data={data.personnelManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('PersonnelManagement')}
            key={forceUpdate}
          />
        );
      case 'compliance':
  return (
          <ComplianceManagement 
            data={data.complianceManagement}
            preferences={preferences}
            onToggleCollapse={() => handleToggleCollapse('ComplianceManagement')}
            key={forceUpdate}
          />
        );
      default:
        return <ProgramManagementDashboard data={data} key={forceUpdate} />;
    }
  };
  
  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <div className={`flex flex-col min-h-screen flex-shrink-0 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <header className="bg-[#1e3a8a] text-white p-4 flex items-center h-16 flex-shrink-0">
          <div className="flex items-center">
            <BankOutlined className="text-2xl mr-2 text-white" />
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold whitespace-nowrap">PROGRAMCENTER</h1>
            )}
        </div>
        </header>
        <Sidebar 
          currentView={activeView} 
          onNavigate={handleNavigate} 
          onCollapse={handleSidebarCollapse}
        />
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="bg-[#1e3a8a] text-white p-4 flex justify-end items-center h-16 flex-shrink-0">
          <div className="flex items-center space-x-4">
        <button 
              onClick={() => {
                setDarkMode(!darkMode);
                setPreferences(prev => ({ ...prev, darkMode: !darkMode }));
              }}
              className="p-2 rounded-full hover:bg-blue-700"
            >
              {darkMode ? '🌞' : '🌙'}
        </button>
            <button className="p-2 rounded-full hover:bg-blue-700">
              🔔
        </button>
            <button className="p-2 rounded-full hover:bg-blue-700">
              👤
        </button>
      </div>
        </div>
        <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
          <div className="p-6">
            {renderContent()}
        </div>
        </main>
      </div>
    </div>
  );
};

export default App; 