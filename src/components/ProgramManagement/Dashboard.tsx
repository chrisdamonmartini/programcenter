import React, { useState, useEffect } from 'react';
import { ProgramManagementData } from '../../mockupData/programManagementData';
import { useProgramManagement } from '../../hooks/useProgramManagement';
import { useUserPreferences } from '../../hooks/useUserPreferences';
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

interface DashboardProps {
  data: ProgramManagementData;
  preferences: {
    darkMode: boolean;
    activeSection: keyof ProgramManagementData;
  };
}

type SectionComponent = React.FC<{
  data: any;
  preferences: any;
  onToggleCollapse: () => void;
}>;

interface Section {
  id: keyof ProgramManagementData;
  label: string;
  component: SectionComponent;
  icon: string;
}

const Dashboard: React.FC<DashboardProps> = ({ data, preferences }) => {
  const { loading, error, refreshData } = useProgramManagement();
  const { 
    setActiveSection, 
    toggleDarkMode,
    toggleSectionCollapse,
    updateChartConfig 
  } = useUserPreferences();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

  const handleToggleCollapse = (sectionId: keyof ProgramManagementData) => {
    setCollapsedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sections: Section[] = [
    { id: 'programOverview', label: 'Overview', component: ProgramOverview, icon: '📊' },
    { id: 'technicalPerformance', label: 'Technical', component: TechnicalPerformance, icon: '⚙️' },
    { id: 'scheduleManagement', label: 'Schedule', component: ScheduleManagement, icon: '📅' },
    { id: 'costManagement', label: 'Cost', component: CostManagement, icon: '💰' },
    { id: 'riskManagement', label: 'Risk', component: RiskManagement, icon: '⚠️' },
    { id: 'stakeholderManagement', label: 'Stakeholder', component: StakeholderManagement, icon: '👥' },
    { id: 'qualityManagement', label: 'Quality', component: QualityManagement, icon: '✅' },
    { id: 'supplyChainManagement', label: 'Supply Chain', component: SupplyChainManagement, icon: '📦' },
    { id: 'configurationManagement', label: 'Configuration', component: ConfigurationManagement, icon: '⚙️' },
    { id: 'documentationStatus', label: 'Documentation', component: DocumentationStatus, icon: '📄' }
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // In a real application, this would generate and download a report
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Exporting data...');
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    // Apply dark mode class to body
    document.body.classList.toggle('dark', preferences.darkMode);
  }, [preferences.darkMode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <div className="text-gray-600 dark:text-gray-300">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      preferences.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`shadow transition-colors duration-200 ${
        preferences.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Program Management Dashboard</h1>
            <div className="flex space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title={preferences.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {preferences.darkMode ? '🌞' : '🌙'}
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center ${
                  isExporting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Exporting...
                  </>
                ) : (
                  'Export Report'
                )}
              </button>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center ${
                  isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isRefreshing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Refreshing...
                  </>
                ) : (
                  'Refresh Data'
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`shadow-sm sticky top-0 z-10 transition-colors duration-200 ${
        preferences.darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors flex items-center ${
                  preferences.activeSection === section.id
                    ? preferences.darkMode
                      ? 'bg-blue-900 text-blue-100'
                      : 'bg-blue-100 text-blue-700'
                    : preferences.darkMode
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map(section => {
              const Component = section.component;
              return (
                <div key={section.id} className="col-span-full">
                  <Component
                    data={data[section.id]}
                    preferences={preferences}
                    onToggleCollapse={() => handleToggleCollapse(section.id)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Global styles */}
      <style>{`
        .dark {
          color-scheme: dark;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;