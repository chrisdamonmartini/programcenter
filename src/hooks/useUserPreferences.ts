import { useState, useEffect } from 'react';
import { ProgramManagementData } from '../mockupData/programManagementData';

interface UserPreferences {
  activeSection: keyof ProgramManagementData;
  darkMode: boolean;
  chartConfigurations: Record<string, any>;
  collapsedSections: string[];
}

const DEFAULT_PREFERENCES: UserPreferences = {
  activeSection: 'programOverview',
  darkMode: false,
  chartConfigurations: {},
  collapsedSections: [],
};

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('programManagementPreferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    const updatedPreferences = {
      ...preferences,
      ...newPreferences,
    };
    setPreferences(updatedPreferences);
    localStorage.setItem('programManagementPreferences', JSON.stringify(updatedPreferences));
  };

  const toggleDarkMode = () => {
    updatePreferences({ darkMode: !preferences.darkMode });
  };

  const setActiveSection = (section: keyof ProgramManagementData) => {
    updatePreferences({ activeSection: section });
  };

  const toggleSectionCollapse = (sectionId: string) => {
    const newCollapsedSections = preferences.collapsedSections.includes(sectionId)
      ? preferences.collapsedSections.filter(id => id !== sectionId)
      : [...preferences.collapsedSections, sectionId];
    updatePreferences({ collapsedSections: newCollapsedSections });
  };

  const updateChartConfig = (chartId: string, config: any) => {
    updatePreferences({
      chartConfigurations: {
        ...preferences.chartConfigurations,
        [chartId]: config,
      },
    });
  };

  return {
    preferences,
    updatePreferences,
    toggleDarkMode,
    setActiveSection,
    toggleSectionCollapse,
    updateChartConfig,
  };
}; 