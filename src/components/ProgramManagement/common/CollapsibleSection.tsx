import React, { useState } from 'react';

interface CollapsibleSectionProps {
  id: string;
  title: string;
  icon?: string;
  isCollapsed: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
  darkMode?: boolean;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  id,
  title,
  icon,
  isCollapsed,
  onToggle,
  children,
  darkMode = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => onToggle(id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
          darkMode
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-white hover:bg-gray-50'
        } shadow-sm`}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <h3 className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {title}
          </h3>
        </div>
        <div className={`transform transition-transform duration-200 ${
          isCollapsed ? 'rotate-0' : 'rotate-180'
        }`}>
          ▼
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[2000px] opacity-100'
        }`}
      >
        <div className={`p-4 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-b-lg shadow-sm`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection; 