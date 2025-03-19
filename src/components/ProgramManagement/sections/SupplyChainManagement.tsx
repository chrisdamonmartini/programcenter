import React from 'react';
import { SupplyChainManagement as SupplyChainManagementType } from '../../../mockupData/programManagementData';
import CollapsibleSection from '../common/CollapsibleSection';
import Chart from '../common/Chart';

interface Supplier {
  id: string;
  name: string;
  category: string;
  status: 'Active' | 'At Risk' | 'Inactive';
  performance: number;
  lastAssessment: string;
  nextAssessment: string;
  issues: string[];
}

interface Order {
  id: string;
  supplierId: string;
  item: string;
  quantity: number;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Delayed';
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
}

interface SupplyChainTrend {
  date: string;
  orders: number;
  deliveries: number;
  delays: number;
}

interface SupplyChainManagementProps {
  data: {
    suppliers: Supplier[];
    orders: Order[];
    supplyChainTrends: SupplyChainTrend[];
    inventoryLevels: {
      item: string;
      current: number;
      minimum: number;
      maximum: number;
      reorderPoint: number;
    }[];
  };
  preferences: {
    darkMode: boolean;
    collapsedSections: string[];
  };
  onToggleCollapse: () => void;
}

const SupplyChainManagement: React.FC<SupplyChainManagementProps> = ({
  data,
  preferences,
  onToggleCollapse,
}) => {
  const { darkMode } = preferences;

  const getSupplierStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'At Risk':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'In Transit':
        return darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'Delayed':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Supply Chain Overview */}
      <CollapsibleSection
        id="supply-chain-overview"
        title="Supply Chain Overview"
        icon="📊"
        isCollapsed={preferences.collapsedSections.includes('supply-chain-overview')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Chart
            type="line"
            data={data.supplyChainTrends}
            xKey="date"
            yKeys={['orders', 'deliveries', 'delays']}
            title="Supply Chain Trends"
            darkMode={darkMode}
            height={300}
          />
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h4 className={`font-medium mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Inventory Levels</h4>
            <div className="space-y-4">
              {data.inventoryLevels.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>{item.item}</h4>
                    <span className={`text-sm ${
                      item.current <= item.reorderPoint
                        ? darkMode ? 'text-red-300' : 'text-red-600'
                        : darkMode ? 'text-green-300' : 'text-green-600'
                    }`}>
                      {item.current} units
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className={`${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Min:</span>
                      <span className={`ml-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{item.minimum}</span>
                    </div>
                    <div>
                      <span className={`${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Max:</span>
                      <span className={`ml-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{item.maximum}</span>
                    </div>
                    <div>
                      <span className={`${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>Reorder:</span>
                      <span className={`ml-1 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{item.reorderPoint}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Supplier Management */}
      <CollapsibleSection
        id="supplier-management"
        title="Supplier Management"
        icon="🏭"
        isCollapsed={preferences.collapsedSections.includes('supplier-management')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="space-y-4">
          {data.suppliers.map((supplier: Supplier) => (
            <div
              key={supplier.id}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{supplier.name}</h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{supplier.category}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${getSupplierStatusColor(supplier.status)}`}>
                    {supplier.status}
                  </span>
                  <span className={`text-sm ${
                    supplier.performance >= 80
                      ? darkMode ? 'text-green-300' : 'text-green-600'
                      : supplier.performance >= 60
                      ? darkMode ? 'text-yellow-300' : 'text-yellow-600'
                      : darkMode ? 'text-red-300' : 'text-red-600'
                  }`}>
                    {supplier.performance}% Performance
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Last Assessment: {new Date(supplier.lastAssessment).toLocaleDateString()}
                </span>
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Next Assessment: {new Date(supplier.nextAssessment).toLocaleDateString()}
                </span>
              </div>
              {supplier.issues.length > 0 && (
                <div className="mt-2">
                  <h5 className={`text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Issues:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {supplier.issues.map((issue, idx) => (
                      <li key={idx} className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Orders Tracking */}
      <CollapsibleSection
        id="orders-tracking"
        title="Orders Tracking"
        icon="📦"
        isCollapsed={preferences.collapsedSections.includes('orders-tracking')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="space-y-4">
          {data.orders.map((order: Order) => (
            <div
              key={order.id}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{order.item}</h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {data.suppliers.find(s => s.id === order.supplierId)?.name}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${getOrderStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Qty: {order.quantity}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Order Date: {new Date(order.orderDate).toLocaleDateString()}
                </span>
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Expected: {new Date(order.expectedDelivery).toLocaleDateString()}
                  {order.actualDelivery && ` | Actual: ${new Date(order.actualDelivery).toLocaleDateString()}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default SupplyChainManagement; 