import { useState, useEffect } from 'react';
import { ProgramManagementData, mockProgramManagementData } from '../mockupData/programManagementData';

interface UseProgramManagementReturn {
  data: ProgramManagementData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

export const useProgramManagement = (): UseProgramManagementReturn => {
  const [data, setData] = useState<ProgramManagementData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      setData(mockProgramManagementData);
      setError(null);
    } catch (err) {
      setError('Failed to load program management data');
      console.error('Error fetching program management data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refreshData: fetchData,
  };
}; 