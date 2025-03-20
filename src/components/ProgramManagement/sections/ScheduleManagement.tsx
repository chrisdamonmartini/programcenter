import React, { useState, useEffect } from 'react';
import CollapsibleSection from '../common/CollapsibleSection';
import Chart from '../common/Chart';
import { ScheduleMetric, Milestone, ResourceAllocation } from '../../../mockupData/programManagementData';
import { Progress, Tag, Select, Space, Tooltip, Tabs, Card, Button, Timeline, Badge, Segmented, Switch } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  InfoCircleOutlined, 
  CalendarOutlined,
  NodeIndexOutlined,
  TeamOutlined,
  ApartmentOutlined,
  BarChartOutlined,
  LinkOutlined,
  ClockCircleOutlined,
  FlagOutlined,
  CheckCircleOutlined,
  ZoomOutOutlined,
  ZoomInOutlined
} from '@ant-design/icons';

interface ScheduleManagementProps {
  data: {
    scheduleMetrics: ScheduleMetric[];
    milestones: Milestone[];
    resourceAllocation: ResourceAllocation[];
    criticalPath: string[];
  };
  preferences: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse: () => void;
}

// Gantt chart types
interface GanttTask {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  status: string;
  dependencies?: string[];
  isCritical?: boolean;
  category?: string;
  deliverables?: string[];
}

const ScheduleManagement: React.FC<ScheduleManagementProps> = ({ data, preferences, onToggleCollapse }) => {
  const { darkMode, collapsedSections } = preferences;
  const [milestoneFilter, setMilestoneFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dueDate');
  const [viewType, setViewType] = useState<string>('gantt');
  const [ganttTasks, setGanttTasks] = useState<GanttTask[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<string>('overview');
  const [timeScale, setTimeScale] = useState<string>('week');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showCategories, setShowCategories] = useState<boolean>(true);
  
  // Create mock aerospace defense program milestones
  useEffect(() => {
    // Get dates for positioning
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 3);
    
    // Create tasks from milestones
    let tasks: GanttTask[] = data.milestones.map((milestone, index) => {
      // Calculate an end date based on progress (for demo purposes)
      const dueDate = new Date(milestone.dueDate);
      const taskStartDate = new Date(dueDate);
      taskStartDate.setDate(taskStartDate.getDate() - (30 - (milestone.progress / 100) * 30));
      
      // Check if this milestone is part of the critical path
      const isCritical = data.criticalPath.some(cp => 
        milestone.name.toLowerCase().includes(cp.toLowerCase())
      );
      
      return {
        id: `task-${index}`,
        name: milestone.name,
        startDate: taskStartDate,
        endDate: dueDate,
        progress: milestone.progress,
        status: milestone.status,
        isCritical,
        category: 'Planning'
      };
    });
    
    // Add aerospace-specific milestones
    const programStart = new Date(startDate);
    programStart.setMonth(programStart.getMonth() - 3);
    
    const aerospaceMilestones: GanttTask[] = [
      {
        id: 'sdr',
        name: 'System Design Review',
        startDate: new Date(programStart),
        endDate: new Date(programStart.getTime() + 7 * 24 * 60 * 60 * 1000),
        progress: 100,
        status: 'Completed',
        category: 'Design Reviews',
        deliverables: ['System Requirements Document', 'Interface Control Document']
      },
      {
        id: 'pdr',
        name: 'Preliminary Design Review',
        startDate: new Date(programStart.getTime() + 30 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 40 * 24 * 60 * 60 * 1000),
        progress: 100,
        status: 'Completed',
        category: 'Design Reviews',
        deliverables: ['Preliminary Design Document', 'Analysis Results']
      },
      {
        id: 'cdr',
        name: 'Critical Design Review',
        startDate: new Date(programStart.getTime() + 90 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 100 * 24 * 60 * 60 * 1000),
        progress: 80,
        status: 'In Progress',
        category: 'Design Reviews',
        isCritical: true,
        deliverables: ['Detailed Design Document', 'Test Plan']
      },
      {
        id: 'avionics-dev',
        name: 'Avionics Development',
        startDate: new Date(programStart.getTime() + 40 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 120 * 24 * 60 * 60 * 1000),
        progress: 65,
        status: 'In Progress',
        category: 'Hardware Development',
        isCritical: true
      },
      {
        id: 'software-dev',
        name: 'Flight Software Development',
        startDate: new Date(programStart.getTime() + 45 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 150 * 24 * 60 * 60 * 1000),
        progress: 55,
        status: 'In Progress',
        category: 'Software Development',
        isCritical: true
      },
      {
        id: 'prototype',
        name: 'Prototype Fabrication',
        startDate: new Date(programStart.getTime() + 110 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 170 * 24 * 60 * 60 * 1000),
        progress: 40,
        status: 'In Progress',
        category: 'Manufacturing'
      },
      {
        id: 'integration',
        name: 'System Integration',
        startDate: new Date(programStart.getTime() + 175 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 205 * 24 * 60 * 60 * 1000),
        progress: 0,
        status: 'Not Started',
        category: 'Integration & Test',
        isCritical: true
      },
      {
        id: 'qualification',
        name: 'Environmental Qualification',
        startDate: new Date(programStart.getTime() + 210 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 240 * 24 * 60 * 60 * 1000),
        progress: 0,
        status: 'Not Started',
        category: 'Integration & Test'
      },
      {
        id: 'fac',
        name: 'Flight Acceptance Tests',
        startDate: new Date(programStart.getTime() + 245 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 260 * 24 * 60 * 60 * 1000),
        progress: 0,
        status: 'Not Started',
        category: 'Integration & Test',
        isCritical: true
      },
      {
        id: 'trr',
        name: 'Test Readiness Review',
        startDate: new Date(programStart.getTime() + 265 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 267 * 24 * 60 * 60 * 1000),
        progress: 0,
        status: 'Not Started',
        category: 'Design Reviews'
      },
      {
        id: 'field-test',
        name: 'Field Testing',
        startDate: new Date(programStart.getTime() + 270 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 300 * 24 * 60 * 60 * 1000),
        progress: 0,
        status: 'Not Started',
        category: 'Integration & Test',
        isCritical: true
      },
      {
        id: 'sft',
        name: 'Security & Compliance Testing',
        startDate: new Date(programStart.getTime() + 180 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 230 * 24 * 60 * 60 * 1000),
        progress: 20,
        status: 'In Progress',
        category: 'Compliance'
      },
      {
        id: 'deployment',
        name: 'Initial Deployment',
        startDate: new Date(programStart.getTime() + 310 * 24 * 60 * 60 * 1000),
        endDate: new Date(programStart.getTime() + 325 * 24 * 60 * 60 * 1000),
        progress: 0,
        status: 'Not Started',
        category: 'Delivery'
      }
    ];
    
    // Add dependencies
    aerospaceMilestones.forEach((task, index) => {
      if (index > 0) {
        const dependencies: string[] = [];
        
        // Create logical dependencies based on category and timing
        if (task.category === 'Design Reviews' && index > 1) {
          // Design reviews depend on previous design reviews
          const prevReviews = aerospaceMilestones
            .filter(t => t.category === 'Design Reviews' && new Date(t.endDate) < new Date(task.startDate))
            .map(t => t.id);
          if (prevReviews.length > 0) {
            dependencies.push(prevReviews[prevReviews.length - 1]);
          }
        }
        
        // Development depends on design reviews
        if (task.category === 'Hardware Development' || task.category === 'Software Development') {
          const designReviews = aerospaceMilestones
            .filter(t => t.category === 'Design Reviews' && new Date(t.endDate) < new Date(task.startDate))
            .map(t => t.id);
          if (designReviews.length > 0) {
            dependencies.push(designReviews[designReviews.length - 1]);
          }
        }
        
        // Manufacturing depends on development
        if (task.category === 'Manufacturing') {
          const development = aerospaceMilestones
            .filter(t => (t.category === 'Hardware Development' || t.category === 'Software Development') && 
                     new Date(t.endDate) < new Date(task.startDate))
            .map(t => t.id);
          if (development.length > 0) {
            dependencies.push(development[0]);
          }
        }
        
        // Integration depends on manufacturing and development
        if (task.category === 'Integration & Test' && task.name.includes('Integration')) {
          const manufacturing = aerospaceMilestones
            .filter(t => t.category === 'Manufacturing' && new Date(t.endDate) <= new Date(task.startDate))
            .map(t => t.id);
          if (manufacturing.length > 0) {
            dependencies.push(manufacturing[0]);
          }
          
          const development = aerospaceMilestones
            .filter(t => (t.category === 'Hardware Development' || t.category === 'Software Development') && 
                     new Date(t.endDate) <= new Date(task.startDate))
            .map(t => t.id);
          if (development.length > 0) {
            dependencies.push(development[development.length - 1]);
          }
        }
        
        // Testing depends on integration
        if (task.category === 'Integration & Test' && !task.name.includes('Integration')) {
          const integration = aerospaceMilestones
            .filter(t => t.category === 'Integration & Test' && t.name.includes('Integration') && 
                     new Date(t.endDate) <= new Date(task.startDate))
            .map(t => t.id);
          if (integration.length > 0) {
            dependencies.push(integration[0]);
          }
        }
        
        // Delivery depends on testing
        if (task.category === 'Delivery') {
          const testing = aerospaceMilestones
            .filter(t => t.category === 'Integration & Test' && !t.name.includes('Integration') && 
                     new Date(t.endDate) <= new Date(task.startDate))
            .map(t => t.id);
          if (testing.length > 0) {
            dependencies.push(testing[testing.length - 1]);
          }
        }
        
        if (dependencies.length > 0) {
          task.dependencies = dependencies;
        }
      }
    });
    
    // Merge all tasks
    tasks = [...aerospaceMilestones, ...tasks];
    
    setGanttTasks(tasks);
  }, [data.milestones, data.criticalPath]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'In Progress':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Not Started':
        return darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'On Track':
        return darkMode ? 'text-green-400' : 'text-green-600';
      case 'At Risk':
        return darkMode ? 'text-yellow-400' : 'text-yellow-600';
      case 'Behind':
        return darkMode ? 'text-red-400' : 'text-red-600';
      default:
        return darkMode ? 'text-gray-400' : 'text-gray-600';
    }
  };

  const filteredMilestones = data.milestones
    .filter(m => milestoneFilter === 'all' || m.status === milestoneFilter)
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return b.progress - a.progress;
    });

  const renderScheduleMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.scheduleMetrics.map((metric, index) => (
        <Card
          key={index}
          className={`${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
          }`}
          bodyStyle={{ padding: "16px" }}
          bordered
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm font-medium ${
              darkMode ? 'text-gray-300' : 'text-gray-900'
            }`}>{metric.name}</h3>
            <Tooltip title={`Target: ${metric.target}`}>
              <InfoCircleOutlined className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
            </Tooltip>
          </div>
          <div className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>{metric.value}</div>
          <div className="flex items-center mt-2">
            <span className={`text-sm ${getTrendColor(metric.trend)}`}>
              {metric.trend === 'On Track' ? <ArrowUpOutlined /> : 
               metric.trend === 'Behind' ? <ArrowDownOutlined /> : null}
              {metric.trend}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderGanttChart = () => {
    const today = new Date();
    
    // Find earliest and latest dates to set scale
    let earliest = today;
    let latest = today;
    
    ganttTasks.forEach(task => {
      if (task.startDate < earliest) earliest = task.startDate;
      if (task.endDate > latest) latest = task.endDate;
    });
    
    // Add padding
    earliest = new Date(earliest);
    earliest.setDate(earliest.getDate() - 14);
    latest = new Date(latest);
    latest.setDate(latest.getDate() + 14);
    
    // Group by category if enabled
    let organizedTasks = [...ganttTasks];
    const categories = new Set<string>();
    ganttTasks.forEach(task => {
      if (task.category) categories.add(task.category);
    });
    
    // Calculate time units based on scale
    let timeUnits: Date[] = [];
    let timeUnitWidth = 20 * (zoomLevel / 100); // Base width adjusted by zoom level
    let formatTimeUnit: (date: Date) => string;
    
    if (timeScale === 'day') {
      const totalDays = Math.ceil((latest.getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24));
      const startDay = new Date(earliest);
      for (let i = 0; i < totalDays; i++) {
        const day = new Date(startDay);
        day.setDate(day.getDate() + i);
        timeUnits.push(day);
      }
      formatTimeUnit = (date) => date.getDate().toString();
    } else if (timeScale === 'week') {
      // Calculate weeks - each week starts on Monday
      const startDate = new Date(earliest);
      // Move to the previous Monday
      const day = startDate.getDay();
      startDate.setDate(startDate.getDate() - (day === 0 ? 6 : day - 1));
      
      // Calculate weeks through the end date
      const endDate = new Date(latest);
      let currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        timeUnits.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 7);
      }
      
      formatTimeUnit = (date) => {
        // Format as "MM/DD"
        return `${date.getMonth() + 1}/${date.getDate()}`;
      };
    } else { // month
      // Calculate months
      const startMonth = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
      const endMonth = new Date(latest.getFullYear(), latest.getMonth() + 1, 0);
      
      let currentDate = new Date(startMonth);
      while (currentDate <= endMonth) {
        timeUnits.push(new Date(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
      
      formatTimeUnit = (date) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return monthNames[date.getMonth()];
      };
    }
    
    // Check if a time unit contains today
    const isToday = (date: Date) => {
      if (timeScale === 'day') {
        return date.getDate() === today.getDate() && 
               date.getMonth() === today.getMonth() && 
               date.getFullYear() === today.getFullYear();
      } else if (timeScale === 'week') {
        // Check if today falls within this week
        const weekEnd = new Date(date);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return today >= date && today <= weekEnd;
      } else { // month
        return date.getMonth() === today.getMonth() && 
               date.getFullYear() === today.getFullYear();
      }
    };
    
    // Calculate task position helpers
    const getTaskStart = (task: GanttTask) => {
      if (timeScale === 'day') {
        return Math.floor((task.startDate.getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24));
      } else if (timeScale === 'week') {
        // Calculate weeks difference
        const taskWeekStart = new Date(task.startDate);
        const day = taskWeekStart.getDay();
        taskWeekStart.setDate(taskWeekStart.getDate() - (day === 0 ? 6 : day - 1));
        
        const earliestWeekStart = new Date(earliest);
        const earliestDay = earliestWeekStart.getDay();
        earliestWeekStart.setDate(earliestWeekStart.getDate() - (earliestDay === 0 ? 6 : earliestDay - 1));
        
        return Math.floor((taskWeekStart.getTime() - earliestWeekStart.getTime()) / (1000 * 60 * 60 * 24 * 7));
      } else { // month
        return (task.startDate.getFullYear() - earliest.getFullYear()) * 12 + 
               task.startDate.getMonth() - earliest.getMonth();
      }
    };
    
    const getTaskDuration = (task: GanttTask) => {
      if (timeScale === 'day') {
        return Math.ceil((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;
      } else if (timeScale === 'week') {
        return Math.ceil((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24 * 7)) || 1;
      } else { // month
        const months = (task.endDate.getFullYear() - task.startDate.getFullYear()) * 12 + 
                       task.endDate.getMonth() - task.startDate.getMonth();
        return months || 1;
      }
    };
    
    return (
      <div className={`p-4 rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-sm`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-medium ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <CalendarOutlined className="mr-2" />
            Program Schedule
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Select
                value={timeScale}
                onChange={setTimeScale}
                options={[
                  { label: 'Days', value: 'day' },
                  { label: 'Weeks', value: 'week' },
                  { label: 'Months', value: 'month' }
                ]}
                className={darkMode ? 'bg-gray-700 text-white' : ''}
                style={{ width: 100 }}
              />
            </div>
            <div className="flex items-center">
              <Button 
                type="text" 
                icon={<ZoomOutOutlined />} 
                onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                disabled={zoomLevel <= 50}
              />
              <span className={`mx-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{zoomLevel}%</span>
              <Button 
                type="text" 
                icon={<ZoomInOutlined />} 
                onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
                disabled={zoomLevel >= 150}
              />
            </div>
            <Switch
              checkedChildren="Show Categories"
              unCheckedChildren="Hide Categories"
              checked={showCategories}
              onChange={setShowCategories}
              className={darkMode ? 'bg-blue-900' : ''}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center mr-2">
            <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-blue-400' : 'bg-blue-500'} mr-1`}></div>
            <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Task</span>
          </div>
          <div className="flex items-center mr-2">
            <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-red-400' : 'bg-red-500'} mr-1`}></div>
            <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Critical Path</span>
          </div>
          <div className="flex items-center mr-2">
            <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-green-400' : 'bg-green-500'} mr-1`}></div>
            <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Completed</span>
          </div>
          <div className="flex items-center mr-2">
            <div className={`w-3 h-3 rounded-full ${darkMode ? 'bg-yellow-400' : 'bg-yellow-500'} mr-1`}></div>
            <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>In Progress</span>
          </div>
        </div>
        
        {/* Gantt Chart Container */}
        <div className="rounded-lg border overflow-auto">
          <div className="relative" style={{ minWidth: timeUnits.length * timeUnitWidth + 250 }}>
            {/* Header - Time Units */}
            <div className="flex sticky top-0 z-20" style={{ height: '50px' }}>
              {/* Task name column */}
              <div className={`w-[250px] flex-shrink-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} p-2 font-semibold border-r border-b`}>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Task</span>
              </div>
              
              {/* Time unit columns */}
              <div className="flex flex-grow">
                {timeUnits.map((unit, i) => {
                  // Determine if this is a weekend for week or day scale
                  const isWeekend = timeScale === 'day' && (unit.getDay() === 0 || unit.getDay() === 6);
                  
                  return (
                    <div 
                      key={i} 
                      className={`border-r border-b text-center py-2 ${
                        isToday(unit) 
                          ? darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'
                          : isWeekend
                            ? darkMode ? 'bg-gray-900 text-gray-400' : 'bg-gray-200 text-gray-700'
                            : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'
                      }`}
                      style={{ width: `${timeUnitWidth}px`, flexShrink: 0 }}
                    >
                      <div className="text-xs">{formatTimeUnit(unit)}</div>
                      {timeScale === 'week' && (
                        <div className="text-xs">Week</div>
                      )}
                      {timeScale === 'month' && (
                        <div className="text-xs">{unit.getFullYear()}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Categories and Tasks rows */}
            <div>
              {showCategories && (
                Array.from(categories).map((category, catIndex) => {
                  const categoryTasks = ganttTasks.filter(task => task.category === category);
                  if (categoryTasks.length === 0) return null;
                  
                  return (
                    <div key={`cat-${catIndex}`}>
                      {/* Category row */}
                      <div className={`flex border-b ${
                        darkMode ? 'bg-gray-850 border-gray-700' : 'bg-gray-100 border-gray-200'
                      }`}>
                        <div 
                          className={`w-[250px] flex-shrink-0 p-2 font-semibold border-r ${
                            darkMode ? 'bg-gray-900 text-gray-300 border-gray-700' : 'bg-gray-200 text-gray-800 border-gray-300'
                          }`}
                        >
                          {category}
                        </div>
                        <div className="flex-grow h-8"></div>
                      </div>
                      
                      {/* Tasks in this category */}
                      {categoryTasks.map((task, taskIndex) => renderGanttRow(task, taskIndex, timeUnits, getTaskStart, getTaskDuration, timeUnitWidth))}
                    </div>
                  );
                })
              )}
              
              {/* If not showing categories, just show all tasks */}
              {!showCategories && ganttTasks.map((task, taskIndex) => 
                renderGanttRow(task, taskIndex, timeUnits, getTaskStart, getTaskDuration, timeUnitWidth)
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderGanttRow = (
    task: GanttTask, 
    taskIndex: number, 
    timeUnits: Date[], 
    getTaskStart: (task: GanttTask) => number,
    getTaskDuration: (task: GanttTask) => number,
    timeUnitWidth: number
  ) => {
    const today = new Date();
    const startPosition = getTaskStart(task);
    const duration = getTaskDuration(task);
    
    return (
      <div 
        key={task.id} 
        className={`flex items-center border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } ${
          taskIndex % 2 === 0 
            ? darkMode ? 'bg-gray-800' : 'bg-white' 
            : darkMode ? 'bg-gray-850' : 'bg-gray-50'
        }`}
        style={{ height: '40px' }}
      >
        {/* Task name */}
        <div className={`w-[250px] flex-shrink-0 p-2 overflow-hidden border-r ${
          darkMode ? 'text-gray-300 border-gray-700' : 'text-gray-700 border-gray-200'
        }`}>
          <Tooltip title={
            <div>
              <div><strong>{task.name}</strong></div>
              <div>Start: {task.startDate.toLocaleDateString()}</div>
              <div>End: {task.endDate.toLocaleDateString()}</div>
              <div>Progress: {task.progress}%</div>
              <div>Status: {task.status}</div>
              {task.category && <div>Category: {task.category}</div>}
              {task.deliverables && task.deliverables.length > 0 && (
                <div>
                  <div>Deliverables:</div>
                  <ul className="pl-5 list-disc">
                    {task.deliverables.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
              {task.isCritical && <div className="text-red-400">Critical Path</div>}
            </div>
          }>
            <div className="truncate flex items-center">
              {task.isCritical && (
                <Badge 
                  status="error" 
                  className="mr-1"
                  title="Critical Path"
                />
              )}
              {task.name}
            </div>
          </Tooltip>
        </div>
        
        {/* Gantt bar area */}
        <div className="flex-grow relative" style={{ height: '100%' }}>
          {/* Today line */}
          {(() => {
            const todayPosition = timeScale === 'day' 
              ? Math.floor((today.getTime() - new Date(timeUnits[0]).getTime()) / (1000 * 60 * 60 * 24))
              : timeScale === 'week'
                ? Math.floor((today.getTime() - new Date(timeUnits[0]).getTime()) / (1000 * 60 * 60 * 24 * 7))
                : (today.getFullYear() - timeUnits[0].getFullYear()) * 12 + today.getMonth() - timeUnits[0].getMonth();
            
            if (todayPosition >= 0 && todayPosition < timeUnits.length) {
              return (
                <div 
                  className="absolute h-full w-[2px] bg-green-500 z-10"
                  style={{ left: `${todayPosition * timeUnitWidth + timeUnitWidth/2}px` }}
                ></div>
              );
            }
            return null;
          })()}
          
          {/* Task bar */}
          <div 
            className={`absolute h-5 rounded-sm flex items-center ${
              task.isCritical 
                ? darkMode ? 'bg-red-800 border-red-600' : 'bg-red-200 border-red-400'
                : task.status === 'Completed'
                  ? darkMode ? 'bg-green-800 border-green-600' : 'bg-green-200 border-green-400'
                  : task.status === 'In Progress'
                    ? darkMode ? 'bg-yellow-800 border-yellow-600' : 'bg-yellow-200 border-yellow-400'
                    : darkMode ? 'bg-blue-800 border-blue-600' : 'bg-blue-200 border-blue-400'
            } border`}
            style={{
              left: `${startPosition * timeUnitWidth}px`,
              width: `${Math.max(duration * timeUnitWidth - 2, 3)}px`,
              top: '8px',
            }}
          >
            {/* Progress bar */}
            <div 
              className={`h-full rounded-l-sm ${
                task.isCritical 
                  ? darkMode ? 'bg-red-600' : 'bg-red-500'
                  : task.status === 'Completed'
                    ? darkMode ? 'bg-green-600' : 'bg-green-500'
                    : task.status === 'In Progress'
                      ? darkMode ? 'bg-yellow-600' : 'bg-yellow-500'
                      : darkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}
              style={{ width: `${task.progress}%` }}
            ></div>
            
            {/* Show task name if there's enough space */}
            {duration > 2 && (
              <span className={`absolute text-xs font-medium ml-1 truncate ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`} style={{ maxWidth: `${duration * timeUnitWidth - 10}px` }}>
                {task.name}
              </span>
            )}
          </div>
          
          {/* Dependencies */}
          {task.dependencies?.map(depId => {
            const sourceTask = ganttTasks.find(t => t.id === depId);
            if (!sourceTask) return null;
            
            const sourceEndPosition = getTaskStart(sourceTask) + getTaskDuration(sourceTask);
            const sourceEndX = sourceEndPosition * timeUnitWidth;
            const targetStartX = startPosition * timeUnitWidth;
            
            // Only draw if there's a visible gap
            if (sourceEndX < targetStartX) {
              return (
                <svg 
                  key={`${depId}-${task.id}`}
                  className="absolute top-0 h-full w-full overflow-visible pointer-events-none"
                  style={{ zIndex: 5 }}
                >
                  <path 
                    d={`M ${sourceEndX} 15 H ${(sourceEndX + targetStartX) / 2} V 8 H ${targetStartX - 3} L ${targetStartX} 15`}
                    fill="none"
                    stroke={darkMode ? "#9CA3AF" : "#6B7280"} 
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                </svg>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  const renderTimelineView = () => (
    <div className={`p-4 rounded-lg ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-sm`}>
      <h3 className={`text-lg font-medium mb-4 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <ClockCircleOutlined className="mr-2" />
        Schedule Timeline
      </h3>
      
      <Timeline
        mode="alternate"
        items={filteredMilestones.map((milestone) => {
          const isCritical = data.criticalPath.some(cp => 
            milestone.name.toLowerCase().includes(cp.toLowerCase())
          );
          
          let itemColor = 'blue';
          let icon = <FlagOutlined />;
          
          if (milestone.status === 'Completed') {
            itemColor = 'green';
            icon = <CheckCircleOutlined />;
          } else if (isCritical) {
            itemColor = 'red';
            icon = <ClockCircleOutlined />;
          } else if (milestone.status === 'Not Started') {
            itemColor = 'gray';
          }
          
          return {
            color: itemColor,
            dot: icon,
            children: (
              <div className={`p-3 rounded-lg border ${
                isCritical 
                  ? darkMode ? 'border-red-700 bg-red-900/30' : 'border-red-200 bg-red-50' 
                  : darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className="flex justify-between items-center">
                  <div className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {milestone.name}
                    {isCritical && (
                      <Tag color="red" className="ml-2">Critical Path</Tag>
                    )}
                  </div>
                  <Tag className={getStatusColor(milestone.status)}>
                    {milestone.status}
                  </Tag>
                </div>
                
                <div className={`text-sm mt-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {milestone.description}
                </div>
                
                <div className="mt-2">
                  <Progress 
                    percent={milestone.progress} 
                    size="small"
                    status={milestone.status === 'Completed' ? 'success' : 'active'}
                    strokeColor={isCritical ? '#f5222d' : undefined}
                  />
                </div>
                
                <div className={`text-xs mt-2 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {new Date(milestone.dueDate).toLocaleDateString()}
                </div>
              </div>
            )
          };
        })}
      />
    </div>
  );

  const renderMilestones = () => (
    <div className={`p-4 rounded-lg ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-sm`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-medium ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          <FlagOutlined className="mr-2" />
          Milestones
        </h3>
        <Space>
          <Select
            value={milestoneFilter}
            onChange={setMilestoneFilter}
            options={[
              { label: 'All', value: 'all' },
              { label: 'Completed', value: 'Completed' },
              { label: 'In Progress', value: 'In Progress' },
              { label: 'Not Started', value: 'Not Started' }
            ]}
            className={darkMode ? 'bg-gray-700 text-white' : ''}
          />
          <Select
            value={sortBy}
            onChange={setSortBy}
            options={[
              { label: 'Due Date', value: 'dueDate' },
              { label: 'Progress', value: 'progress' }
            ]}
            className={darkMode ? 'bg-gray-700 text-white' : ''}
          />
        </Space>
      </div>
      <div className="space-y-4">
        {filteredMilestones.map((milestone, index) => {
          const isCritical = data.criticalPath.some(cp => 
            milestone.name.toLowerCase().includes(cp.toLowerCase())
          );
          
          return (
            <Card
              key={index}
              className={`w-full ${
                darkMode ? 'bg-gray-850 border-gray-700' : 'bg-white border-gray-200'
              } ${
                isCritical 
                  ? darkMode ? 'border-l-4 border-l-red-600' : 'border-l-4 border-l-red-500'
                  : ''
              }`}
              bodyStyle={{ padding: "16px" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className={`font-medium flex items-center ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {milestone.name}
                    {isCritical && (
                      <Tag color="error" className="ml-2">Critical Path</Tag>
                    )}
                  </h4>
                  <p className={`text-sm mt-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{milestone.description}</p>
                </div>
                <Tag className={getStatusColor(milestone.status)}>
                  {milestone.status}
                </Tag>
              </div>
              <div className="mt-3">
                <Progress
                  percent={milestone.progress}
                  status={milestone.status === 'Completed' ? 'success' : 'active'}
                  strokeColor={isCritical ? '#f5222d' : undefined}
                />
              </div>
              <div className={`mt-2 flex justify-between items-center text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <div>
                  Due: {new Date(milestone.dueDate).toLocaleDateString()}
                </div>
                <div>
                  {milestone.status !== 'Completed' && (
                    <Button size="small" type="primary" ghost>
                      Update Progress
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderResourceAllocation = () => (
    <div className={`p-4 rounded-lg ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-sm`}>
      <h3 className={`text-lg font-medium mb-4 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <TeamOutlined className="mr-2" />
        Resource Allocation
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.resourceAllocation.map((resource, index) => (
          <Card
            key={index}
            className={`${
              darkMode ? 'bg-gray-850 border-gray-700' : 'bg-white'
            }`}
            bodyStyle={{ padding: "16px" }}
            title={
              <span className={`flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <TeamOutlined className="mr-2" />
                {resource.resource}
              </span>
            }
            bordered
          >
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Utilization</span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {resource.utilization}%
                    {resource.utilization > 90 && (
                      <Tag color="error" className="ml-1">High</Tag>
                    )}
                  </span>
                </div>
                <Progress
                  percent={resource.utilization}
                  status={resource.utilization > 90 ? 'exception' : 'active'}
                  strokeColor={darkMode ? '#1890ff' : undefined}
                  size="small"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Availability</span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {resource.availability}%
                    {resource.availability < 70 && (
                      <Tag color="warning" className="ml-1">Low</Tag>
                    )}
                  </span>
                </div>
                <Progress
                  percent={resource.availability}
                  status={resource.availability < 70 ? 'exception' : 'active'}
                  strokeColor={darkMode ? '#52c41a' : undefined}
                  size="small"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Allocated:</span>
                  <span className={`ml-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{resource.allocated}</span>
                </div>
                <div>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Available:</span>
                  <span className={`ml-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{resource.available}</span>
                </div>
                <div>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Planned:</span>
                  <span className={`ml-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{resource.planned}</span>
                </div>
                <div>
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Actual:</span>
                  <span className={`ml-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{resource.actual}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCriticalPath = () => (
    <div className={`p-4 rounded-lg ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-sm`}>
      <h3 className={`text-lg font-medium mb-4 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        <ApartmentOutlined className="mr-2" />
        Critical Path
      </h3>
      
      {/* Visualization */}
      <div className="relative py-8">
        <div className={`absolute top-1/2 left-0 right-0 h-1 ${
          darkMode ? 'bg-red-800' : 'bg-red-200'
        } -translate-y-1/2`}></div>
        
        <div className="flex justify-between relative">
          {data.criticalPath.map((item, index) => {
            const isComplete = Math.random() > 0.5; // Demo: Randomly determine completion
            const inProgress = !isComplete && Math.random() > 0.5;
            
            return (
              <div 
                key={index} 
                className="relative flex flex-col items-center"
                style={{ zIndex: 10 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isComplete 
                    ? darkMode ? 'bg-green-600 border-green-400' : 'bg-green-500 border-green-300'
                    : inProgress
                      ? darkMode ? 'bg-yellow-600 border-yellow-400' : 'bg-yellow-500 border-yellow-300'
                      : darkMode ? 'bg-red-600 border-red-400' : 'bg-red-500 border-red-300'
                } border-2 shadow-lg`}>
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                
                {index < data.criticalPath.length - 1 && (
                  <div className={`absolute top-4 left-4 ${
                    darkMode ? 'text-red-500' : 'text-red-600'
                  }`} style={{ transform: 'translateX(8px)' }}>
                    <LinkOutlined />
                  </div>
                )}
                
                <div className={`mt-4 p-2 rounded-lg text-center ${
                  isComplete 
                    ? darkMode ? 'bg-green-900/40 border-green-800' : 'bg-green-50 border-green-200'
                    : inProgress
                      ? darkMode ? 'bg-yellow-900/40 border-yellow-800' : 'bg-yellow-50 border-yellow-200'
                      : darkMode ? 'bg-red-900/40 border-red-800' : 'bg-red-50 border-red-200'
                } border shadow-md w-32`}>
                  <div className={`font-medium truncate ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <Tooltip title={item}>
                      <span>{item}</span>
                    </Tooltip>
                  </div>
                  <div className={`text-xs mt-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {isComplete ? 'Completed' : inProgress ? 'In Progress' : 'Not Started'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className={`mt-8 p-4 rounded-lg ${
        darkMode ? 'bg-red-900/30 border border-red-800' : 'bg-red-50 border border-red-200'
      }`}>
        <h4 className={`font-medium flex items-center ${
          darkMode ? 'text-red-300' : 'text-red-700'
        }`}>
          <InfoCircleOutlined className="mr-2" />
          Critical Path Impact
        </h4>
        <p className={`mt-2 text-sm ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Any delay in critical path activities will directly impact the overall project timeline. 
          These activities must be completed on schedule to avoid project delays.
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    return (
      <Tabs
        activeKey={activeTabKey}
        onChange={setActiveTabKey}
        className={darkMode ? 'text-white' : ''}
        items={[
          {
            key: 'overview',
            label: (
              <span>
                <BarChartOutlined />
                Overview
              </span>
            ),
            children: (
              <div className="space-y-6">
                {renderScheduleMetrics()}
                <div className="flex justify-center my-4">
                  <Segmented
                    options={[
                      {
                        label: (
                          <div className="px-2">
                            <CalendarOutlined className="mr-1" />
                            Gantt
                          </div>
                        ),
                        value: 'gantt',
                      },
                      {
                        label: (
                          <div className="px-2">
                            <ClockCircleOutlined className="mr-1" />
                            Timeline
                          </div>
                        ),
                        value: 'timeline',
                      },
                    ]}
                    value={viewType}
                    onChange={(value) => setViewType(value.toString())}
                  />
                </div>
                {viewType === 'gantt' ? renderGanttChart() : renderTimelineView()}
              </div>
            ),
          },
          {
            key: 'milestones',
            label: (
              <span>
                <FlagOutlined />
                Milestones
              </span>
            ),
            children: renderMilestones(),
          },
          {
            key: 'resources',
            label: (
              <span>
                <TeamOutlined />
                Resources
              </span>
            ),
            children: renderResourceAllocation(),
          },
          {
            key: 'critical-path',
            label: (
              <span>
                <ApartmentOutlined />
                Critical Path
              </span>
            ),
            children: renderCriticalPath(),
          },
        ]}
      />
    );
  };

  return (
    <CollapsibleSection
      id="schedule-management"
      title="Schedule Management"
      icon="📅"
      isCollapsed={collapsedSections.includes('schedule-management')}
      onToggle={onToggleCollapse}
      darkMode={darkMode}
    >
      {renderContent()}
    </CollapsibleSection>
  );
};

export default ScheduleManagement; 