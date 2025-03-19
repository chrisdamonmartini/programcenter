import React, { useState } from 'react';
import { 
  Card, Typography, Table, Tag, Tooltip, 
  Progress, Input, Button, Row, Col, Space,
  Dropdown, Menu, Badge, Collapse
} from 'antd';
import { 
  SearchOutlined, FilterOutlined, SortAscendingOutlined,
  SortDescendingOutlined, DownOutlined, ExclamationCircleOutlined,
  CheckCircleOutlined, ClockCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Panel } = Collapse;

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

interface IssueTrackerProps {
  issues: Issue[];
  darkMode: boolean;
}

const IssueTracker: React.FC<IssueTrackerProps> = ({ issues, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIssues, setFilteredIssues] = useState(issues);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [filterOwner, setFilterOwner] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('priority');
  const [sortDirection, setSortDirection] = useState<'ascend' | 'descend'>('descend');
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  
  // Extract unique values for filters
  const statuses = Array.from(new Set(issues.map(issue => issue.status)));
  const priorities = Array.from(new Set(issues.map(issue => issue.priority)));
  const owners = Array.from(new Set(issues.map(issue => issue.owner)));
  
  // Filter and sort issues
  React.useEffect(() => {
    let result = [...issues];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(issue => 
        issue.title.toLowerCase().includes(lowercasedSearch) || 
        issue.description.toLowerCase().includes(lowercasedSearch) ||
        issue.id.toLowerCase().includes(lowercasedSearch) ||
        issue.owner.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Apply status filter
    if (filterStatus) {
      result = result.filter(issue => issue.status === filterStatus);
    }
    
    // Apply priority filter
    if (filterPriority) {
      result = result.filter(issue => issue.priority === filterPriority);
    }
    
    // Apply owner filter
    if (filterOwner) {
      result = result.filter(issue => issue.owner === filterOwner);
    }
    
    // Apply sorting
    result = result.sort((a, b) => {
      let comparison = 0;
      
      // Custom sort logic for priority
      if (sortField === 'priority') {
        const priorityMap: Record<string, number> = {
          'High': 3,
          'Medium': 2,
          'Low': 1
        };
        
        comparison = (priorityMap[a.priority] || 0) - (priorityMap[b.priority] || 0);
      } 
      // Custom sort logic for status
      else if (sortField === 'status') {
        const statusMap: Record<string, number> = {
          'Open': 3,
          'In Progress': 2,
          'Resolved': 1,
          'Closed': 0
        };
        
        comparison = (statusMap[a.status] || 0) - (statusMap[b.status] || 0);
      }
      // Date sorting
      else if (sortField === 'dateIdentified' || sortField === 'lastUpdated' || sortField === 'dueDate') {
        const dateA = a[sortField as keyof Issue] ? new Date(a[sortField as keyof Issue] as string).getTime() : 0;
        const dateB = b[sortField as keyof Issue] ? new Date(b[sortField as keyof Issue] as string).getTime() : 0;
        comparison = dateA - dateB;
      }
      // Default string sorting
      else {
        const fieldA = (a[sortField as keyof Issue] || '') as string;
        const fieldB = (b[sortField as keyof Issue] || '') as string;
        comparison = fieldA.localeCompare(fieldB);
      }
      
      return sortDirection === 'ascend' ? comparison : -comparison;
    });
    
    setFilteredIssues(result);
  }, [issues, searchTerm, filterStatus, filterPriority, filterOwner, sortField, sortDirection]);
  
  // Get status tag with color
  const getStatusTag = (status: string) => {
    const statusConfig: Record<string, { color: string, icon: React.ReactNode }> = {
      'Open': { 
        color: 'red', 
        icon: <ExclamationCircleOutlined /> 
      },
      'In Progress': { 
        color: 'processing', 
        icon: <ClockCircleOutlined /> 
      },
      'Resolved': { 
        color: 'success', 
        icon: <CheckCircleOutlined /> 
      },
      'Closed': { 
        color: 'default', 
        icon: <CheckCircleOutlined /> 
      }
    };
    
    const config = statusConfig[status] || { color: 'default', icon: null };
    
    return (
      <Tag color={config.color} icon={config.icon}>
        {status}
      </Tag>
    );
  };
  
  // Get priority tag with color
  const getPriorityTag = (priority: string) => {
    const priorityConfig: Record<string, { color: string, text: string }> = {
      'High': { color: 'red', text: 'High' },
      'Medium': { color: 'orange', text: 'Medium' },
      'Low': { color: 'green', text: 'Low' }
    };
    
    const config = priorityConfig[priority] || { color: 'default', text: priority };
    
    return (
      <Tag color={config.color}>
        {config.text}
      </Tag>
    );
  };
  
  // Get days since last update
  const getDaysSinceUpdate = (lastUpdated: string) => {
    const lastUpdatedDate = new Date(lastUpdated);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - lastUpdatedDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    
    return differenceInDays;
  };
  
  // Toggle row expansion
  const toggleRowExpansion = (id: string) => {
    setExpandedRowKeys(prevKeys => {
      if (prevKeys.includes(id)) {
        return prevKeys.filter(key => key !== id);
      } else {
        return [...prevKeys, id];
      }
    });
  };
  
  // Generate stats for issue summary
  const openIssues = issues.filter(issue => issue.status === 'Open').length;
  const inProgressIssues = issues.filter(issue => issue.status === 'In Progress').length;
  const resolvedIssues = issues.filter(issue => issue.status === 'Resolved').length;
  const highPriorityIssues = issues.filter(issue => issue.priority === 'High').length;
  
  // Columns for the issues table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (id: string) => <Text strong className={darkMode ? 'text-white' : ''}>{id}</Text>
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Issue) => (
        <div>
          <div 
            className="issue-title" 
            onClick={() => toggleRowExpansion(record.id)}
            style={{ cursor: 'pointer' }}
          >
            <Text strong className={darkMode ? 'text-white' : ''}>{title}</Text>
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: string) => getStatusTag(status),
      sorter: true
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      render: (priority: string) => getPriorityTag(priority),
      sorter: true
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      width: 150,
      render: (owner: string) => <Text className={darkMode ? 'text-white' : ''}>{owner}</Text>,
      sorter: true
    },
    {
      title: 'Date Identified',
      dataIndex: 'dateIdentified',
      key: 'dateIdentified',
      width: 150,
      render: (date: string) => <Text className={darkMode ? 'text-white' : ''}>{date}</Text>,
      sorter: true
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      width: 150,
      render: (date: string) => {
        const days = getDaysSinceUpdate(date);
        return (
          <Tooltip title={`${days} days ago`}>
            <Text className={darkMode ? 'text-white' : ''}>{date}</Text>
            {days > 14 && <Badge status="warning" style={{ marginLeft: 8 }} />}
          </Tooltip>
        );
      },
      sorter: true
    }
  ];
  
  // Expanded row render function
  const expandedRowRender = (record: Issue) => {
    return (
      <div style={{ padding: '10px 40px' }} className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
        <Row gutter={16}>
          <Col span={24}>
            <Paragraph className={darkMode ? 'text-white' : ''}>
              <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Description:</Text> {record.description}
            </Paragraph>
          </Col>
        </Row>
        <Row gutter={16} className="mt-2">
          {record.component && (
            <Col span={8}>
              <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Component:</Text>{' '}
              <Text className={darkMode ? 'text-white' : ''}>{record.component}</Text>
            </Col>
          )}
          {record.dueDate && (
            <Col span={8}>
              <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Due Date:</Text>{' '}
              <Text className={darkMode ? 'text-white' : ''}>{record.dueDate}</Text>
            </Col>
          )}
          {record.relatedRisks && record.relatedRisks.length > 0 && (
            <Col span={24} className="mt-2">
              <Text strong className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Related Risks:</Text>{' '}
              <div style={{ marginTop: 4 }}>
                {record.relatedRisks.map(riskId => (
                  <Tag key={riskId} color="blue">{riskId}</Tag>
                ))}
              </div>
            </Col>
          )}
        </Row>
      </div>
    );
  };

  return (
    <div className="issue-tracker">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            className={darkMode ? 'bg-gray-800 text-white' : ''} 
            bordered={false}
          >
            <Title level={4} className={darkMode ? 'text-white' : ''}>
              Issue Tracker
            </Title>
            
            {/* Issue Summary */}
            <Row gutter={16} className="mb-4">
              <Col xs={12} sm={6}>
                <Card 
                  className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'}
                  bordered={false}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Text strong className={darkMode ? 'text-white' : ''}>Total Issues</Text>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: darkMode ? 'white' : 'black' }}>
                      {issues.length}
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={12} sm={6}>
                <Card 
                  className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                  bordered={false}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Text strong className={darkMode ? 'text-white' : ''}>Open</Text>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>
                      {openIssues}
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={12} sm={6}>
                <Card 
                  className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                  bordered={false}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Text strong className={darkMode ? 'text-white' : ''}>In Progress</Text>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                      {inProgressIssues}
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={12} sm={6}>
                <Card 
                  className={darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50'} 
                  bordered={false}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Text strong className={darkMode ? 'text-white' : ''}>High Priority</Text>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff7a45' }}>
                      {highPriorityIssues}
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            
            {/* Search and filters */}
            <Row gutter={16} className="mb-4">
              <Col span={8}>
                <Search
                  placeholder="Search issues..."
                  allowClear
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={16}>
                <Space>
                  <Dropdown
                    overlay={
                      <Menu onClick={({ key }) => setFilterStatus(key !== 'all' ? key : null)}>
                        <Menu.Item key="all">All Statuses</Menu.Item>
                        {statuses.map(status => (
                          <Menu.Item key={status}>{status}</Menu.Item>
                        ))}
                      </Menu>
                    }
                    trigger={['click']}
                  >
                    <Button>
                      Status {filterStatus && <Tag color="blue">{filterStatus}</Tag>} <DownOutlined />
                    </Button>
                  </Dropdown>
                  
                  <Dropdown
                    overlay={
                      <Menu onClick={({ key }) => setFilterPriority(key !== 'all' ? key : null)}>
                        <Menu.Item key="all">All Priorities</Menu.Item>
                        {priorities.map(priority => (
                          <Menu.Item key={priority}>{priority}</Menu.Item>
                        ))}
                      </Menu>
                    }
                    trigger={['click']}
                  >
                    <Button>
                      Priority {filterPriority && <Tag color="blue">{filterPriority}</Tag>} <DownOutlined />
                    </Button>
                  </Dropdown>
                  
                  <Dropdown
                    overlay={
                      <Menu onClick={({ key }) => setFilterOwner(key !== 'all' ? key : null)}>
                        <Menu.Item key="all">All Owners</Menu.Item>
                        {owners.map(owner => (
                          <Menu.Item key={owner}>{owner}</Menu.Item>
                        ))}
                      </Menu>
                    }
                    trigger={['click']}
                  >
                    <Button>
                      Owner {filterOwner && <Tag color="blue">{filterOwner}</Tag>} <DownOutlined />
                    </Button>
                  </Dropdown>
                  
                  <Button
                    type="text"
                    icon={sortDirection === 'ascend' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                    onClick={() => setSortDirection(sortDirection === 'ascend' ? 'descend' : 'ascend')}
                  />
                </Space>
              </Col>
            </Row>
            
            {/* Issues table */}
            <Table
              dataSource={filteredIssues}
              columns={columns}
              rowKey="id"
              expandable={{
                expandedRowRender,
                expandedRowKeys: expandedRowKeys,
                onExpand: (expanded, record) => {
                  toggleRowExpansion(record.id);
                }
              }}
              onChange={(pagination, filters, sorter: any) => {
                if (sorter.field) {
                  setSortField(sorter.field);
                  setSortDirection(sorter.order);
                }
              }}
              pagination={{ pageSize: 10 }}
              className={darkMode ? 'dark-table' : ''}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default IssueTracker; 