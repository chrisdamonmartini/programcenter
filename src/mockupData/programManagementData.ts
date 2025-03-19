import { mockTechnicalPerformanceData } from './technicalPerformanceData';

export interface ProgramOverview {
  programName: string;
  programPhase: string;
  startDate: string;
  endDate: string;
  status: 'On Track' | 'At Risk' | 'Behind Schedule';
  budgetStatus: {
    totalBudget: number;
    spent: number;
    remaining: number;
    percentageComplete: number;
  };
  keyMilestones: {
    name: string;
    date: string;
    status: 'Completed' | 'In Progress' | 'Upcoming';
    description: string;
  }[];
}

export interface PerformanceMetric {
  name: string;
  value: number;
  target: number;
  trend: 'Increasing' | 'Stable' | 'Decreasing';
}

export interface TechnicalIssue {
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'High' | 'Medium' | 'Low';
  impact: 'High' | 'Medium' | 'Low';
}

export interface SystemHealthComponent {
  component: string;
  status: 'Healthy' | 'Warning' | 'Critical';
  performance: number;
}

export interface InnovationMetric {
  name: string;
  value: number;
  target: number;
  trend: 'Increasing' | 'Stable' | 'Decreasing';
  patents: number;
  research: number;
  development: number;
}

export interface TechnicalPerformance {
  performanceMetrics: PerformanceMetric[];
  technicalIssues: TechnicalIssue[];
  systemHealth: SystemHealthComponent[];
  innovationMetrics: InnovationMetric[];
}

export interface ScheduleMetric {
  name: string;
  value: number;
  target: number;
  trend: 'On Track' | 'At Risk' | 'Behind';
}

export interface Milestone {
  name: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Not Started';
  dueDate: string;
  progress: number;
}

export interface ResourceAllocation {
  resource: string;
  allocated: number;
  available: number;
  utilization: number;
  planned: number;
  actual: number;
  availability: number;
}

export interface ScheduleManagement {
  scheduleMetrics: ScheduleMetric[];
  milestones: Milestone[];
  resourceAllocation: ResourceAllocation[];
  criticalPath: string[];
}

export interface CostMetric {
  name: string;
  value: number;
  target: number;
  trend: 'On Track' | 'At Risk' | 'Behind';
  date: string;
}

export interface BudgetCategory {
  category: string;
  budget: number;
  spent: number;
  remaining: number;
  budgeted: number;
  trend: 'On Track' | 'At Risk' | 'Behind';
}

export interface CostTrend {
  date: string;
  planned: number;
  actual: number;
  earned: number;
  labor: number;
  materials: number;
  overhead: number;
}

export interface CostManagement {
  costMetrics: CostMetric[];
  budgetCategories: BudgetCategory[];
  costTrends: CostTrend[];
  evmMetrics: {
    pv: number;
    ev: number;
    ac: number;
    spi: number;
    cpi: number;
  };
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  probability: number;
  impact: number;
  status: 'Open' | 'Mitigated' | 'Closed';
  mitigationPlan: string;
  owner: string;
  dateIdentified: string;
  lastUpdated: string;
  component: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  owner: string;
  dateIdentified: string;
  lastUpdated: string;
  component?: string;
  dueDate?: string;
  relatedRisks?: string[];
}

export interface RiskManagement {
  risks: Risk[];
  issues: Issue[];
  riskTrends: {
    date: string;
    open: number;
    mitigated: number;
    closed: number;
  }[];
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  organization: string;
  interest: 'High' | 'Medium' | 'Low';
  influence: 'High' | 'Medium' | 'Low';
  communicationFrequency: string;
  engagement: 'Active' | 'Neutral' | 'Resistant';
  lastContact: string;
  nextContact: string;
  notes: string;
  status: 'Active' | 'Inactive';
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
}

export interface EngagementActivity {
  id: string;
  title: string;
  date: string;
  type: 'Meeting' | 'Review' | 'Workshop' | 'Presentation';
  attendees: string[];
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  outcome: string;
  nextSteps: string;
  location: string;
  duration: string;
  agenda: string[];
}

export interface StakeholderManagement {
  stakeholders: Stakeholder[];
  engagementActivities: EngagementActivity[];
  engagementTrends: {
    date: string;
    active: number;
    neutral: number;
    resistant: number;
  }[];
  stakeholderMatrix: {
    highInterestHighInfluence: Stakeholder[];
    highInterestLowInfluence: Stakeholder[];
    lowInterestHighInfluence: Stakeholder[];
    lowInterestLowInfluence: Stakeholder[];
  };
}

export interface QualityMetric {
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'Meeting' | 'Not Meeting' | 'At Risk';
  date: string;
  planned: number;
  actual: number;
}

export interface QualityIssue {
  id: string;
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Closed';
  resolutionDate: string | null;
  component: string;
  reportedBy: string;
  dateReported: string;
  lastUpdated: string;
}

export interface QualityTrend {
  date: string;
  defects: number;
  resolved: number;
  open: number;
  rework: number;
  compliance: number;
}

export interface QualityManagement {
  qualityMetrics: QualityMetric[];
  qualityIssues: QualityIssue[];
  qualityTrends: QualityTrend[];
  complianceStatus: {
    standard: string;
    status: 'Compliant' | 'Non-Compliant';
    lastAudit: string;
    nextAudit: string;
    findings: string[];
  }[];
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  performance: number;
  risk: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'At Risk' | 'Inactive';
  lastAssessment: string;
  nextAssessment: string;
  issues: string[];
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  metrics: {
    onTimeDelivery: number;
    qualityScore: number;
    costEfficiency: number;
  };
}

export interface Order {
  id: string;
  supplierId: string;
  supplier: string;
  item: string;
  items: string[];
  quantity: number;
  status: 'In Transit' | 'Delayed' | 'Pending' | 'Delivered';
  orderDate: string;
  expectedDate: string;
  expectedDelivery: string;
  trackingNumber: string;
  cost: number;
  priority: 'High' | 'Medium' | 'Low';
  notes: string;
}

export interface SupplyChainTrend {
  date: string;
  orders: number;
  deliveries: number;
  delays: number;
  costVariance: number;
  qualityIssues: number;
}

export interface SupplyChainManagement {
  suppliers: Supplier[];
  orders: Order[];
  supplyChainTrends: SupplyChainTrend[];
  inventoryLevels: {
    item: string;
    current: number;
    minimum: number;
    maximum: number;
    reorderPoint: number;
    location: string;
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  }[];
}

export interface ConfigurationItem {
  id: string;
  name: string;
  version: string;
  status: 'Current' | 'Pending' | 'Deprecated';
  lastUpdated: string;
  type: 'Software' | 'Hardware' | 'Documentation';
  owner: string;
  dependencies: string[];
  description: string;
  location: string;
  baselines: string[];
  changeHistory: {
    date: string;
    version: string;
    changes: string;
    author: string;
  }[];
}

export interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'Approved' | 'Rejected' | 'Implemented';
  impact: 'High' | 'Medium' | 'Low';
  date: string;
  requester: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  affectedItems: string[];
  comments: {
    date: string;
    author: string;
    content: string;
  }[];
}

export interface ConfigurationTrend {
  date: string;
  changes: number;
  approvals: number;
  rejections: number;
  pending: number;
  implemented: number;
}

export interface ConfigurationManagement {
  items: ConfigurationItem[];
  changeRequests: ChangeRequest[];
  configurationTrends: ConfigurationTrend[];
  baselines: {
    name: string;
    date: string;
    items: string[];
    status: 'Active' | 'Archived';
    description: string;
    createdBy: string;
    approvedBy: string;
  }[];
}

export interface Document {
  id: string;
  title: string;
  type: 'Technical' | 'User' | 'Process' | 'Compliance';
  status: 'Current' | 'Outdated' | 'Draft' | 'Under Review';
  owner: string;
  lastUpdated: string;
  reviewers: string[];
  version: string;
  completion: number;
}

export interface ReviewRequest {
  id: string;
  documentId: string;
  reviewer: string;
  status: 'Pending' | 'Completed' | 'Rejected';
  comments: string[];
  requestedBy: string;
  requestedDate: string;
  dueDate: string;
  reviewers: {
    name: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    comments?: string;
  }[];
}

export interface DocumentationTrend {
  date: string;
  total: number;
  approved: number;
  inReview: number;
  outdated: number;
}

export interface DocumentationStatus {
  documents: Document[];
  reviewRequests: ReviewRequest[];
  documentationTrends: DocumentationTrend[];
  metrics: {
    totalDocuments: number;
    currentDocuments: number;
    underReview: number;
    outdated: number;
    completionRate: number;
  };
}

export interface ProgramManagementData {
  programOverview: ProgramOverview;
  technicalPerformance: typeof mockTechnicalPerformanceData;
  scheduleManagement: ScheduleManagement;
  costManagement: CostManagement;
  riskManagement: RiskManagement;
  stakeholderManagement: StakeholderManagement;
  qualityManagement: QualityManagement;
  supplyChainManagement: SupplyChainManagement;
  configurationManagement: ConfigurationManagement;
  documentationStatus: DocumentationStatus;
  programStatus: {
    overallHealth: string;
    budget: {
      status: string;
      percentage: number;
      details: string;
    };
    schedule: {
      status: string;
      percentage: number;
      details: string;
    };
    technical: {
      status: string;
      percentage: number;
      details: string;
    };
    risk: {
      status: string;
      percentage: number;
      details: string;
    };
    compliance: {
      status: string;
      percentage: number;
      details: string;
    };
  };
  personnelManagement: {
    keyPersonnel: {
      id: string;
      name: string;
      role: string;
      organization: string;
      clearance: string;
      availability: string;
      status: string;
    }[];
    resourceAllocation: {
      engineering: {
        allocated: number;
        required: number;
        status: string;
      };
      manufacturing: {
        allocated: number;
        required: number;
        status: string;
      };
      testing: {
        allocated: number;
        required: number;
        status: string;
      };
      management: {
        allocated: number;
        required: number;
        status: string;
      };
      support: {
        allocated: number;
        required: number;
        status: string;
      };
    };
    trainingCertification: {
      id: string;
      name: string;
      personnel: number;
      compliant: number;
      dueDate: string;
      status: string;
    }[];
    securityClearance: {
      tsSci: {
        required: number;
        active: number;
        inProcess: number;
      };
      secret: {
        required: number;
        active: number;
        inProcess: number;
      };
      confidential: {
        required: number;
        active: number;
        inProcess: number;
      };
    };
  };
  complianceManagement: {
    contractCompliance: {
      id: string;
      requirement: string;
      status: string;
      lastReviewed: string;
      notes: string;
    }[];
    securityClassification: {
      overall: string;
      components: {
        name: string;
        level: string;
        authority: string;
      }[];
    };
    exportControl: {
      category: string;
      description: string;
      compliance: string;
      lastReviewed: string;
    }[];
    cybersecurity: {
      cmmcLevel: string;
      nist800171: {
        total: number;
        implemented: number;
        inProgress: number;
        lastAssessment: string;
      };
      incidents: [];
      nextAssessment: string;
    };
    audits: {
      id: string;
      type: string;
      date: string;
      status: string;
      findings: number | null;
      open: number | null;
    }[];
  };
}

// Mock data
export const mockProgramManagementData: ProgramManagementData = {
  programOverview: {
    programName: "F-35 Lightning II Program",
    programPhase: "Production",
    startDate: "2020-01-01",
    endDate: "2025-12-31",
    status: "On Track",
    budgetStatus: {
      totalBudget: 500000000,
      spent: 250000000,
      remaining: 250000000,
      percentageComplete: 50
    },
    keyMilestones: [
      {
        name: "Initial Operational Capability",
        date: "2023-06-30",
        status: "Completed",
        description: "Achieved IOC with first squadron"
      },
      {
        name: "Full Rate Production",
        date: "2024-12-31",
        status: "In Progress",
        description: "Transition to full rate production"
      }
    ]
  },
  technicalPerformance: mockTechnicalPerformanceData,
  scheduleManagement: {
    scheduleMetrics: [
      {
        name: "Schedule Variance",
        value: 2,
        target: 0,
        trend: "At Risk"
      },
      {
        name: "Milestone Completion",
        value: 85,
        target: 90,
        trend: "On Track"
      },
      {
        name: "Resource Utilization",
        value: 75,
        target: 80,
        trend: "Behind"
      },
      {
        name: "Critical Path Length",
        value: 120,
        target: 100,
        trend: "At Risk"
      }
    ],
    milestones: [
      {
        name: "System Design Review",
        description: "Complete system architecture and design review",
        status: "Completed",
        dueDate: "2023-12-15",
        progress: 100
      },
      {
        name: "Prototype Testing",
        description: "Complete initial prototype testing phase",
        status: "In Progress",
        dueDate: "2024-01-15",
        progress: 60
      },
      {
        name: "Integration Testing",
        description: "Begin system integration testing",
        status: "Not Started",
        dueDate: "2024-02-15",
        progress: 0
      }
    ],
    resourceAllocation: [
      {
        resource: "Engineering Team",
        allocated: 85,
        available: 100,
        utilization: 85,
        planned: 90,
        actual: 85,
        availability: 95
      }
    ],
    criticalPath: ["Avionics Testing", "System Integration", "Flight Testing"]
  },
  costManagement: {
    costMetrics: [
      {
        name: "Total Program Cost",
        value: 480000000,
        target: 500000000,
        trend: "On Track",
        date: "2023-12-15"
      },
      {
        name: "Development Cost",
        value: 180000000,
        target: 200000000,
        trend: "At Risk",
        date: "2023-12-15"
      },
      {
        name: "Production Cost",
        value: 250000000,
        target: 250000000,
        trend: "On Track",
        date: "2023-12-15"
      },
      {
        name: "Testing Cost",
        value: 50000000,
        target: 50000000,
        trend: "Behind",
        date: "2023-12-15"
      }
    ],
    budgetCategories: [
      {
        category: "Development",
        budget: 200000000,
        spent: 180000000,
        remaining: 20000000,
        budgeted: 200000000,
        trend: "At Risk"
      },
      {
        category: "Production",
        budget: 250000000,
        spent: 250000000,
        remaining: 0,
        budgeted: 250000000,
        trend: "On Track"
      },
      {
        category: "Testing",
        budget: 50000000,
        spent: 50000000,
        remaining: 0,
        budgeted: 50000000,
        trend: "Behind"
      }
    ],
    costTrends: [
      {
        date: "2023-12",
        planned: 250000000,
        actual: 240000000,
        earned: 245000000,
        labor: 120000000,
        materials: 80000000,
        overhead: 40000000
      }
    ],
    evmMetrics: {
      pv: 250000000,
      ev: 245000000,
      ac: 240000000,
      spi: 0.98,
      cpi: 1.02
    }
  },
  riskManagement: {
    risks: [
      {
        id: "RISK-001",
        title: "Supply Chain Disruption",
        description: "Potential disruption in the supply chain affecting component availability",
        probability: 3.8,
        impact: 4.2,
        status: "Open",
        mitigationPlan: "Identify alternative suppliers and create buffer stock for critical components",
        owner: "John Smith",
        dateIdentified: "2023-03-15",
        lastUpdated: "2023-06-12",
        priority: "High",
        component: "Procurement"
      },
      {
        id: "RISK-002",
        title: "Technology Integration Issues",
        description: "Compatibility issues between new and legacy systems",
        probability: 2.7,
        impact: 3.8,
        status: "Mitigated",
        mitigationPlan: "Conduct comprehensive integration testing and establish fallback procedures",
        owner: "Sarah Johnson",
        dateIdentified: "2023-02-20",
        lastUpdated: "2023-05-23",
        priority: "Medium",
        component: "Engineering"
      },
      {
        id: "RISK-003",
        title: "Regulatory Compliance Delay",
        description: "Potential delay in regulatory approval for new product features",
        probability: 2.4,
        impact: 3.2,
        status: "Open",
        mitigationPlan: "Early engagement with regulatory bodies and preparation of compliance documentation",
        owner: "Michael Davis",
        dateIdentified: "2023-04-05",
        lastUpdated: "2023-06-10",
        priority: "Medium",
        component: "Legal"
      },
      {
        id: "RISK-004",
        title: "Resource Skill Gap",
        description: "Potential skills gap in team for implementing new technologies",
        probability: 3.1,
        impact: 2.8,
        status: "Mitigated",
        mitigationPlan: "Conduct skills assessment and implement training program for identified gaps",
        owner: "Amanda Wilson",
        dateIdentified: "2023-03-10",
        lastUpdated: "2023-05-15",
        priority: "Medium",
        component: "HR"
      },
      {
        id: "RISK-005",
        title: "Budget Overrun",
        description: "Risk of exceeding allocated budget due to unforeseen expenses",
        probability: 3.5,
        impact: 4.0,
        status: "Open",
        mitigationPlan: "Implement strict budget monitoring and establish contingency fund",
        owner: "Robert Chen",
        dateIdentified: "2023-02-25",
        lastUpdated: "2023-06-05",
        priority: "High",
        component: "Finance"
      },
      {
        id: "RISK-006",
        title: "Schedule Delay",
        description: "Potential delay in project schedule due to dependencies",
        probability: 3.3,
        impact: 3.7,
        status: "Open",
        mitigationPlan: "Identify critical path activities and implement buffer time in schedule",
        owner: "Lisa Park",
        dateIdentified: "2023-03-20",
        lastUpdated: "2023-06-08",
        priority: "High",
        component: "Project Management"
      },
      {
        id: "RISK-007",
        title: "Quality Assurance Issues",
        description: "Potential quality issues in final product",
        probability: 2.5,
        impact: 3.9,
        status: "Mitigated",
        mitigationPlan: "Enhance QA process and implement automated testing",
        owner: "David Kim",
        dateIdentified: "2023-04-02",
        lastUpdated: "2023-05-30",
        priority: "Medium",
        component: "Quality"
      },
      {
        id: "RISK-008",
        title: "Stakeholder Alignment",
        description: "Risk of misalignment among key stakeholders regarding project goals",
        probability: 2.2,
        impact: 3.5,
        status: "Closed",
        mitigationPlan: "Regular stakeholder meetings and clear communication of project objectives",
        owner: "Emily Taylor",
        dateIdentified: "2023-02-15",
        lastUpdated: "2023-04-20",
        priority: "Medium",
        component: "Stakeholder Management"
      }
    ],
    issues: [
      {
        id: "ISSUE-001",
        title: "Integration Test Failure",
        description: "Integration testing revealed incompatibility between module A and module B",
        status: "Open",
        priority: "High",
        owner: "Sarah Johnson",
        dateIdentified: "2023-05-10",
        lastUpdated: "2023-06-07",
        component: "Engineering",
        dueDate: "2023-06-21",
        relatedRisks: ["RISK-002"]
      },
      {
        id: "ISSUE-002",
        title: "Vendor Delivery Delay",
        description: "Key components from vendor XYZ are delayed by 2 weeks",
        status: "In Progress",
        priority: "High",
        owner: "John Smith",
        dateIdentified: "2023-05-15",
        lastUpdated: "2023-06-05",
        component: "Procurement",
        dueDate: "2023-06-18",
        relatedRisks: ["RISK-001"]
      },
      {
        id: "ISSUE-003",
        title: "Documentation Gap",
        description: "Regulatory documentation for feature X is incomplete",
        status: "In Progress",
        priority: "Medium",
        owner: "Michael Davis",
        dateIdentified: "2023-05-20",
        lastUpdated: "2023-06-03",
        component: "Legal",
        dueDate: "2023-06-25",
        relatedRisks: ["RISK-003"]
      },
      {
        id: "ISSUE-004",
        title: "Training Program Delay",
        description: "Technical training program for team is behind schedule",
        status: "Resolved",
        priority: "Medium",
        owner: "Amanda Wilson",
        dateIdentified: "2023-04-25",
        lastUpdated: "2023-05-25",
        component: "HR",
        dueDate: "2023-05-20",
        relatedRisks: ["RISK-004"]
      },
      {
        id: "ISSUE-005",
        title: "Unexpected Cost Increase",
        description: "Material costs have increased by 15% compared to initial estimates",
        status: "Open",
        priority: "High",
        owner: "Robert Chen",
        dateIdentified: "2023-05-28",
        lastUpdated: "2023-06-05",
        component: "Finance",
        dueDate: "2023-06-15",
        relatedRisks: ["RISK-005"]
      },
      {
        id: "ISSUE-006",
        title: "Milestone Delay",
        description: "Milestone M2 is projected to be delayed by 1 week",
        status: "In Progress",
        priority: "Medium",
        owner: "Lisa Park",
        dateIdentified: "2023-05-30",
        lastUpdated: "2023-06-07",
        component: "Project Management",
        dueDate: "2023-06-20",
        relatedRisks: ["RISK-006"]
      }
    ],
    riskTrends: [
      {
        date: "2023-01",
        open: 4,
        mitigated: 2,
        closed: 1
      },
      {
        date: "2023-02",
        open: 5,
        mitigated: 2,
        closed: 1
      },
      {
        date: "2023-03",
        open: 6,
        mitigated: 3,
        closed: 1
      },
      {
        date: "2023-04",
        open: 5,
        mitigated: 4,
        closed: 2
      },
      {
        date: "2023-05",
        open: 4,
        mitigated: 3,
        closed: 3
      },
      {
        date: "2023-06",
        open: 5,
        mitigated: 3,
        closed: 2
      }
    ]
  },
  configurationManagement: {
    items: [
      {
        id: "CI-001",
        name: "Flight Control Software",
        version: "2.1.0",
        status: "Current",
        lastUpdated: "2023-12-15",
        type: "Software",
        owner: "John Smith",
        dependencies: ["Navigation System", "Radar System"],
        description: "Main flight control system software",
        location: "Software Repository",
        baselines: ["System Baseline 2.0"],
        changeHistory: [
          {
            date: "2023-12-15",
            version: "2.1.0",
            changes: "Updated navigation algorithms",
            author: "John Smith"
          }
        ]
      },
      {
        id: "CI-002",
        name: "Navigation System",
        version: "1.5.0",
        status: "Current",
        lastUpdated: "2023-12-10",
        type: "Hardware",
        owner: "Mike Johnson",
        dependencies: [],
        description: "Advanced navigation system hardware",
        location: "Hardware Storage",
        baselines: ["System Baseline 2.0"],
        changeHistory: [
          {
            date: "2023-12-10",
            version: "1.5.0",
            changes: "Hardware upgrade completed",
            author: "Mike Johnson"
          }
        ]
      }
    ],
    changeRequests: [
      {
        id: "CR-001",
        title: "Update Navigation Algorithm",
        description: "Implement improved navigation algorithm for better accuracy",
        status: "Open",
        impact: "Medium",
        date: "2023-12-20",
        requester: "Sarah Wilson",
        assignedTo: "John Smith",
        priority: "High",
        affectedItems: ["Flight Control Software"],
        comments: [
          {
            date: "2023-12-20",
            author: "Sarah Wilson",
            content: "Request for improved navigation accuracy"
          }
        ]
      },
      {
        id: "CR-002",
        title: "Hardware Upgrade",
        description: "Upgrade navigation system hardware to latest version",
        status: "Approved",
        impact: "High",
        date: "2023-12-15",
        requester: "Mike Johnson",
        assignedTo: "Mike Johnson",
        priority: "High",
        affectedItems: ["Navigation System"],
        comments: [
          {
            date: "2023-12-15",
            author: "Mike Johnson",
            content: "Hardware upgrade request"
          },
          {
            date: "2023-12-16",
            author: "John Smith",
            content: "Approved - Critical for system performance"
          }
        ]
      }
    ],
    configurationTrends: [
      {
        date: "2023-12",
        changes: 15,
        approvals: 12,
        rejections: 3,
        pending: 5,
        implemented: 10
      }
    ],
    baselines: [
      {
        name: "System Baseline 2.0",
        date: "2023-12-01",
        items: ["Flight Control Software", "Navigation System"],
        status: "Active",
        description: "Major system baseline including all core components",
        createdBy: "John Smith",
        approvedBy: "Mike Johnson"
      }
    ]
  },
  documentationStatus: {
    documents: [
      {
        id: "DOC-001",
        title: "System Design Document",
        type: "Technical",
        status: "Current",
        owner: "Sarah Wilson",
        lastUpdated: "2023-12-15",
        reviewers: ["John Smith", "Mike Johnson"],
        version: "2.0",
        completion: 100
      }
    ],
    reviewRequests: [
      {
        id: "RR-001",
        documentId: "DOC-001",
        reviewer: "John Smith",
        status: "Completed",
        comments: ["Approved with minor suggestions"],
        requestedBy: "Sarah Wilson",
        requestedDate: "2023-12-01",
        dueDate: "2023-12-15",
        reviewers: [
          {
            name: "John Smith",
            status: "Approved",
            comments: "Approved with minor suggestions"
          }
        ]
      }
    ],
    documentationTrends: [
      {
        date: "2023-12",
        total: 50,
        approved: 45,
        inReview: 3,
        outdated: 2
      }
    ],
    metrics: {
      totalDocuments: 50,
      currentDocuments: 48,
      underReview: 3,
      outdated: 2,
      completionRate: 96
    }
  },
  programStatus: {
    overallHealth: 'Yellow',
    budget: {
      status: 'Green',
      percentage: 92,
      details: 'Budget utilization on track with 8% contingency remaining'
    },
    schedule: {
      status: 'Yellow',
      percentage: 85,
      details: 'Minor delays in avionics integration, mitigation plan in place'
    },
    technical: {
      status: 'Green',
      percentage: 95,
      details: 'All key performance parameters on track to be met'
    },
    risk: {
      status: 'Yellow',
      percentage: 78,
      details: '3 high risks identified, active mitigation plans in progress'
    },
    compliance: {
      status: 'Green',
      percentage: 100,
      details: 'All regulatory requirements currently satisfied'
    }
  },
  personnelManagement: {
    keyPersonnel: [
      {
        id: 'KP001',
        name: 'Col. James Wilson',
        role: 'Program Manager',
        organization: 'USAF',
        clearance: 'TS/SCI',
        availability: 'Full-time',
        status: 'Active'
      },
      {
        id: 'KP002',
        name: 'Dr. Sarah Chen',
        role: 'Chief Engineer',
        organization: 'Contractor',
        clearance: 'Secret',
        availability: 'Full-time',
        status: 'Active'
      },
      {
        id: 'KP003',
        name: 'Maj. Robert Davis',
        role: 'Test Director',
        organization: 'USAF',
        clearance: 'TS/SCI',
        availability: 'Part-time',
        status: 'On leave until 06/15/2024'
      },
      {
        id: 'KP004',
        name: 'Kevin Martinez',
        role: 'Logistics Lead',
        organization: 'Contractor',
        clearance: 'Secret',
        availability: 'Full-time',
        status: 'Active'
      },
      {
        id: 'KP005',
        name: 'Lt. Col. Andrea Johnson',
        role: 'Government Representative',
        organization: 'DoD',
        clearance: 'TS/SCI',
        availability: 'Part-time',
        status: 'Active'
      }
    ],
    resourceAllocation: {
      engineering: {
        allocated: 42,
        required: 45,
        status: 'Yellow'
      },
      manufacturing: {
        allocated: 28,
        required: 25,
        status: 'Green'
      },
      testing: {
        allocated: 15,
        required: 18,
        status: 'Red'
      },
      management: {
        allocated: 12,
        required: 12,
        status: 'Green'
      },
      support: {
        allocated: 8,
        required: 10,
        status: 'Yellow'
      }
    },
    trainingCertification: [
      {
        id: 'TC001',
        name: 'Cybersecurity Awareness',
        personnel: 48,
        compliant: 45,
        dueDate: '07/15/2024',
        status: 'Yellow'
      },
      {
        id: 'TC002',
        name: 'Export Control (ITAR/EAR)',
        personnel: 32,
        compliant: 32,
        dueDate: '05/30/2024',
        status: 'Green'
      },
      {
        id: 'TC003',
        name: 'Quality Management System',
        personnel: 40,
        compliant: 38,
        dueDate: '08/12/2024',
        status: 'Green'
      },
      {
        id: 'TC004',
        name: 'Program Protection Plan',
        personnel: 25,
        compliant: 20,
        dueDate: '06/01/2024',
        status: 'Red'
      }
    ],
    securityClearance: {
      tsSci: {
        required: 15,
        active: 12,
        inProcess: 3
      },
      secret: {
        required: 35,
        active: 32,
        inProcess: 5
      },
      confidential: {
        required: 25,
        active: 25,
        inProcess: 0
      }
    }
  },
  complianceManagement: {
    contractCompliance: [
      {
        id: 'CC001',
        requirement: 'Deliverable Schedule Adherence',
        status: 'Compliant',
        lastReviewed: '05/10/2024',
        notes: 'All deliverables on schedule'
      },
      {
        id: 'CC002',
        requirement: 'Quality Management System',
        status: 'Compliant',
        lastReviewed: '04/22/2024',
        notes: 'ISO 9001:2015 certification current'
      },
      {
        id: 'CC003',
        requirement: 'Cost Reporting',
        status: 'Compliant',
        lastReviewed: '05/05/2024',
        notes: 'Monthly CDRL A001 submissions current'
      }
    ],
    securityClassification: {
      overall: 'Secret',
      components: [
        {
          name: 'Propulsion Subsystem',
          level: 'Secret',
          authority: 'Program Security Classification Guide Rev 2.3'
        },
        {
          name: 'Avionics Integration',
          level: 'Secret',
          authority: 'Program Security Classification Guide Rev 2.3'
        },
        {
          name: 'Structural Design',
          level: 'Confidential',
          authority: 'Program Security Classification Guide Rev 2.3'
        }
      ]
    },
    exportControl: [
      {
        category: 'USML Category VIII',
        description: 'Aircraft Components',
        compliance: 'Compliant',
        lastReviewed: '04/15/2024'
      },
      {
        category: 'USML Category XI',
        description: 'Electronics',
        compliance: 'Compliant',
        lastReviewed: '04/15/2024'
      },
      {
        category: 'EAR 9E003',
        description: 'Technology for Gas Turbine Engines',
        compliance: 'Compliant',
        lastReviewed: '04/15/2024'
      }
    ],
    cybersecurity: {
      cmmcLevel: '3',
      nist800171: {
        total: 110,
        implemented: 105,
        inProgress: 5,
        lastAssessment: '03/28/2024'
      },
      incidents: [],
      nextAssessment: '09/28/2024'
    },
    audits: [
      {
        id: 'AD001',
        type: 'DCMA Quality Systems Review',
        date: '02/10/2024',
        status: 'Completed',
        findings: 2,
        open: 0
      },
      {
        id: 'AD002',
        type: 'Internal AS9100 Audit',
        date: '03/15/2024',
        status: 'Completed',
        findings: 5,
        open: 1
      },
      {
        id: 'AD003',
        type: 'DCAA Business Systems Review',
        date: '06/20/2024',
        status: 'Scheduled',
        findings: null,
        open: null
      }
    ]
  },
  stakeholderManagement: {
    stakeholders: [],
    engagementActivities: [],
    engagementTrends: [],
    stakeholderMatrix: {
      highInterestHighInfluence: [],
      highInterestLowInfluence: [],
      lowInterestHighInfluence: [],
      lowInterestLowInfluence: []
    }
  },
  qualityManagement: {
    qualityMetrics: [],
    qualityIssues: [],
    qualityTrends: [],
    complianceStatus: []
  },
  supplyChainManagement: {
    suppliers: [],
    orders: [],
    supplyChainTrends: [],
    inventoryLevels: []
  }
}; 