import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as GoIcons from 'react-icons/go';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import { motion } from 'framer-motion';
import { 
  HomeOutlined,
  RocketOutlined,
  FundOutlined,
  ExperimentOutlined,
  ApartmentOutlined,
  NodeIndexOutlined,
  SettingOutlined,
  FileSearchOutlined,
  AuditOutlined,
  BranchesOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  DashboardOutlined,
  TeamOutlined,
  SafetyOutlined
} from '@ant-design/icons';

// Update the navigation items array for Program Management
export const SidebarData = [
  {
    title: 'Program Overview',
    path: '/',
    icon: <HomeOutlined className="text-white" />,
    subNav: []
  },
  {
    title: 'Program Status',
    path: '/program-status',
    icon: <DashboardOutlined className="text-white" />,
    subNav: []
  },
  {
    title: 'Technical Performance',
    path: '/technical',
    icon: <RocketOutlined className="text-white" />,
    subNav: []
  },
  {
    title: 'Schedule Management',
    path: '/schedule',
    icon: <AiIcons.AiOutlineSchedule className="text-white" />,
    subNav: []
  },
  {
    title: 'Cost Management',
    path: '/cost',
    icon: <FundOutlined className="text-white" />,
    subNav: []
  },
  {
    title: 'Risk Management',
    path: '/risk',
    icon: <WarningOutlined className="text-white" />,
    subNav: []
  },
  {
    title: 'Stakeholder Mgmt.',
    path: '/stakeholders',
    icon: <AiIcons.AiOutlineTeam className="text-white" />,
    subNav: []
  },
  {
    title: 'Quality Management',
    path: '/quality',
    icon: <CheckCircleOutlined className="text-white" />,
    subNav: []
  },
  {
    title: 'Supply Chain Mgmt.',
    path: '/supply-chain',
    icon: <AiIcons.AiOutlineCluster className="text-white" />,
    subNav: []
  },
  {
    title: 'Configuration Mgmt.',
    path: '/configuration',
    icon: <SettingOutlined className="text-white" />,
    subNav: []
  },
  {
    title: 'Documentation Status',
    path: '/documentation',
    icon: <FileSearchOutlined className="text-white" />,
    subNav: []
  },
  {
    title: 'Personnel & Resources',
    path: '/personnel',
    icon: <TeamOutlined className="text-white" />,
    subNav: []
  },
  {
    title: 'Compliance & Regulatory',
    path: '/compliance',
    icon: <SafetyOutlined className="text-white" />,
    subNav: []
  }
];

interface SidebarProps {
  currentView: string;
  onNavigate: (route: string) => void;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onCollapse(newCollapsed);
  };

  return (
    <div 
      className={`bg-[#1e3a8a] text-white flex-1 transition-all duration-300`}
    >
      {/* Collapse Toggle Button */}
      <div className="p-4 flex justify-end">
        <button 
          onClick={handleCollapse}
          className="text-white/70 hover:text-white"
        >
          {collapsed ? (
            <FaIcons.FaAngleRight className="text-xl text-white" />
          ) : (
            <FaIcons.FaAngleLeft className="text-xl text-white" />
          )}
        </button>
      </div>

      <nav className="px-4 pb-4">
        {SidebarData.map((item, index) => {
          const itemPath = item.path === '/' ? 'dashboard' : item.path.replace('/', '');
          
          return (
            <div
              key={index}
              className={`flex items-center p-3 mb-2 rounded cursor-pointer
                ${currentView === itemPath ? 'bg-blue-700' : 'hover:bg-blue-800'}`}
              onClick={() => onNavigate(item.path)}
              title={collapsed ? item.title : undefined}
            >
              <span className={`text-xl ${collapsed ? 'mx-auto' : 'mr-4'}`}>{item.icon}</span>
              {!collapsed && <span className="whitespace-nowrap">{item.title}</span>}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar; 