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
  communicationPreferences?: {
    preferredChannel: 'Email' | 'Phone' | 'Meeting' | 'Report';
    frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
    bestTime: string;
  };
  satisfaction?: number;
  impact?: 'Critical' | 'High' | 'Medium' | 'Low';
  actionItems?: {
    id: string;
    title: string;
    status: 'Open' | 'In Progress' | 'Completed';
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
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
  satisfaction?: number;
  followUpActions?: {
    id: string;
    description: string;
    assignedTo: string;
    dueDate: string;
    status: 'Open' | 'In Progress' | 'Completed';
  }[];
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
  name?: string;
  value?: number;
  target: number;
  unit?: string;
  status?: 'Meeting' | 'Not Meeting' | 'At Risk';
  date: string;
  planned: number;
  actual: number;
}

export interface QualityIssue {
  id: string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  resolutionDate?: string | null;
  component: string;
  reportedBy: string;
  dateReported: string;
  lastUpdated: string;
  assignedTo?: string;
  resolution?: string;
  impactAreas?: string[];
  relatedIssues?: string[];
}

export interface QualityTrend {
  date: string;
  defects: number;
  resolved?: number;
  open?: number;
  rework: number;
  compliance: number;
}

export interface ProcessAdherence {
  process: string;
  adherenceRate: number;
  trend: 'Improving' | 'Stable' | 'Declining';
}

export interface QualityMetricsSummary {
  defectDensity: number;
  testCoverage: number;
  codeReviewCoverage: number;
  automationRate: number;
  firstTimePassRate: number;
  technicalDebtIndex: number;
}

export interface QualityImprovement {
  id: string;
  title: string;
  description: string;
  status: 'Planned' | 'In Progress' | 'Completed' | 'Canceled';
  startDate: string;
  targetDate: string;
  actualDate?: string;
  leader: string;
  type: 'Process' | 'Tool' | 'Training' | 'Infrastructure';
  impact: 'High' | 'Medium' | 'Low';
  metrics: string[];
  progress: number;
}

export interface RootCauseCategory {
  category: string;
  count: number;
  subcategories?: {
    name: string;
    count: number;
  }[];
}

export interface QualityManagement {
  qualityMetrics: QualityMetric[];
  qualityIssues: QualityIssue[];
  qualityTrends: QualityTrend[];
  complianceStatus: {
    standard: string;
    status: 'Compliant' | 'Partially Compliant' | 'Non-Compliant';
    lastAudit: string;
    nextAudit: string;
    findings: string[];
  }[];
  qualityMetricsSummary?: QualityMetricsSummary;
  processAdherence?: ProcessAdherence[];
  qualityImprovements?: QualityImprovement[];
  rootCauseAnalysis?: RootCauseCategory[];
  qualityScorecard?: {
    overall: number;
    categories: {
      name: string;
      score: number;
      weight: number;
    }[];
    previousScore: number;
    trend: 'Improving' | 'Stable' | 'Declining';
  };
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  status: 'Active' | 'At Risk' | 'Inactive';
  performance: number;
  lastAssessment: string;
  nextAssessment: string;
  issues: string[];
  location: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  leadTime: number; // in days
  onTimeDeliveryRate: number;
  qualityRating: number;
  contractDetails?: {
    startDate: string;
    endDate: string;
    value: number;
    terms: string;
  };
  certifications?: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  alternativeSuppliers?: string[];
}

export interface Order {
  id: string;
  supplierId: string;
  item: string;
  quantity: number;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Delayed' | 'Canceled';
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  price: number;
  totalCost: number;
  trackingInfo?: {
    trackingNumber: string;
    carrier: string;
    currentLocation?: string;
    estimatedArrival: string;
    lastUpdated: string;
  };
  qualityInspection?: {
    passed: boolean;
    date: string;
    inspector: string;
    notes: string;
  };
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface SupplyChainTrend {
  date: string;
  orders: number;
  deliveries: number;
  delays: number;
  costVariance: number;
  qualityIssues: number;
  onTimeDeliveryRate: number;
  averageLeadTime: number;
  backorderedItems: number;
}

export interface InventoryItem {
  item: string;
  current: number;
  minimum: number;
  maximum: number;
  reorderPoint: number;
  location: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  category: string;
  unitCost: number;
  totalValue: number;
  lastRestocked: string;
  turnoverRate: number;
  supplier: string;
  leadTime: number;
  demandForecast: number;
  itemCritical: boolean;
}

export interface SupplyChainKPI {
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'Improving' | 'Declining' | 'Stable';
  periodChange: number;
}

export interface SupplyChainRisk {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: 'Low' | 'Medium' | 'High';
  probability: 'Low' | 'Medium' | 'High';
  status: 'Identified' | 'Monitoring' | 'Mitigated' | 'Occurred';
  mitigation: string;
  owner: string;
  suppliers: string[];
  lastUpdated: string;
}

export interface SupplyChainManagement {
  suppliers: Supplier[];
  orders: Order[];
  supplyChainTrends: SupplyChainTrend[];
  inventoryLevels: InventoryItem[];
  keyMetrics: SupplyChainKPI[];
  risks: SupplyChainRisk[];
  sustainabilityMetrics?: {
    carbonFootprint: number; // in metric tons CO2
    recycledMaterials: number; // percentage
    energyEfficiency: number; // rating 1-100
    wasteReduction: number; // percentage change
    transportationEfficiency: number; // rating 1-100
  };
  demandForecasting: {
    period: string;
    predictedDemand: number;
    actualDemand?: number;
    variance?: number;
    confidence: number;
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
    stakeholders: [
      {
        id: 'STK001',
        name: 'John Smith',
        role: 'Program Manager',
        organization: 'Siemens Energy',
        interest: 'High',
        influence: 'High',
        communicationFrequency: 'Weekly',
        engagement: 'Active',
        lastContact: '2023-03-15',
        nextContact: '2023-03-22',
        notes: 'Key decision maker for budget allocations. Prefers detailed reporting and data-driven insights.',
        status: 'Active',
        contactInfo: {
          email: 'john.smith@siemens-energy.com',
          phone: '+1-555-1234',
          address: '123 Energy Plaza, Houston, TX'
        },
        communicationPreferences: {
          preferredChannel: 'Email',
          frequency: 'Weekly',
          bestTime: 'Morning (8-10am)'
        },
        satisfaction: 85,
        impact: 'Critical',
        actionItems: [
          {
            id: '1',
            title: 'Review Q2 project plan',
            status: 'In Progress',
            dueDate: '2023-03-30',
            priority: 'High'
          },
          {
            id: '2',
            title: 'Schedule executive presentation',
            status: 'Open',
            dueDate: '2023-04-15',
            priority: 'Medium'
          }
        ]
      },
      {
        id: 'STK002',
        name: 'Sarah Johnson',
        role: 'Technical Lead',
        organization: 'Siemens Digital Industries',
        interest: 'High',
        influence: 'Medium',
        communicationFrequency: 'Bi-weekly',
        engagement: 'Active',
        lastContact: '2023-03-10',
        nextContact: '2023-03-24',
        notes: 'Technical subject matter expert. Prefers direct communication about technical issues.',
        status: 'Active',
        contactInfo: {
          email: 'sarah.johnson@siemens.com',
          phone: '+1-555-2345',
          address: '456 Innovation Drive, Princeton, NJ'
        },
        communicationPreferences: {
          preferredChannel: 'Meeting',
          frequency: 'Weekly',
          bestTime: 'Afternoon (2-4pm)'
        },
        satisfaction: 78,
        impact: 'High',
        actionItems: [
          {
            id: '3',
            title: 'Review technical documentation',
            status: 'Completed',
            dueDate: '2023-03-15',
            priority: 'High'
          },
          {
            id: '4',
            title: 'Coordinate with engineering team',
            status: 'In Progress',
            dueDate: '2023-03-28',
            priority: 'Medium'
          }
        ]
      },
      {
        id: 'STK003',
        name: 'Michael Chen',
        role: 'Customer Representative',
        organization: 'Client XYZ',
        interest: 'Medium',
        influence: 'High',
        communicationFrequency: 'Monthly',
        engagement: 'Neutral',
        lastContact: '2023-02-28',
        nextContact: '2023-03-30',
        notes: 'Important client stakeholder. Concerned about timeline and deliverables.',
        status: 'Active',
        contactInfo: {
          email: 'michael.chen@clientxyz.com',
          phone: '+1-555-3456',
          address: '789 Client Way, Chicago, IL'
        },
        communicationPreferences: {
          preferredChannel: 'Phone',
          frequency: 'Monthly',
          bestTime: 'Late Afternoon (4-5pm)'
        },
        satisfaction: 65,
        impact: 'High',
        actionItems: [
          {
            id: '5',
            title: 'Address timeline concerns',
            status: 'Open',
            dueDate: '2023-04-05',
            priority: 'High'
          }
        ]
      },
      {
        id: 'STK004',
        name: 'Emily Rodriguez',
        role: 'Regulatory Affairs',
        organization: 'Siemens Compliance',
        interest: 'Low',
        influence: 'Medium',
        communicationFrequency: 'Monthly',
        engagement: 'Neutral',
        lastContact: '2023-03-05',
        nextContact: '2023-04-05',
        notes: 'Oversees compliance and regulatory aspects of the program.',
        status: 'Active',
        contactInfo: {
          email: 'emily.rodriguez@siemens.com',
          phone: '+1-555-4567',
          address: '321 Compliance Ave, Washington DC'
        },
        communicationPreferences: {
          preferredChannel: 'Email',
          frequency: 'Monthly',
          bestTime: 'Morning (9-11am)'
        },
        satisfaction: 72,
        impact: 'Medium',
        actionItems: [
          {
            id: '6',
            title: 'Submit regulatory documents',
            status: 'In Progress',
            dueDate: '2023-04-10',
            priority: 'Medium'
          }
        ]
      },
      {
        id: 'STK005',
        name: 'David Patel',
        role: 'Finance Director',
        organization: 'Siemens Financial',
        interest: 'Medium',
        influence: 'Medium',
        communicationFrequency: 'Monthly',
        engagement: 'Active',
        lastContact: '2023-03-12',
        nextContact: '2023-04-12',
        notes: 'Oversees budget allocation and financial reporting.',
        status: 'Active',
        contactInfo: {
          email: 'david.patel@siemens.com',
          phone: '+1-555-5678',
          address: '555 Financial District, New York, NY'
        },
        communicationPreferences: {
          preferredChannel: 'Report',
          frequency: 'Monthly',
          bestTime: 'End of Month'
        },
        satisfaction: 80,
        impact: 'Medium',
        actionItems: [
          {
            id: '7',
            title: 'Prepare Q2 financial forecast',
            status: 'Open',
            dueDate: '2023-04-20',
            priority: 'High'
          }
        ]
      },
      {
        id: 'STK006',
        name: 'Robert Taylor',
        role: 'Engineering Manager',
        organization: 'Siemens Technology',
        interest: 'High',
        influence: 'Low',
        communicationFrequency: 'Weekly',
        engagement: 'Active',
        lastContact: '2023-03-17',
        nextContact: '2023-03-24',
        notes: 'Manages the engineering team working on technical implementation.',
        status: 'Active',
        contactInfo: {
          email: 'robert.taylor@siemens.com',
          phone: '+1-555-6789',
          address: '777 Engineering Blvd, Austin, TX'
        },
        communicationPreferences: {
          preferredChannel: 'Meeting',
          frequency: 'Weekly',
          bestTime: 'Morning (10-11am)'
        },
        satisfaction: 88,
        impact: 'Medium',
        actionItems: [
          {
            id: '8',
            title: 'Review resource allocation',
            status: 'Completed',
            dueDate: '2023-03-15',
            priority: 'Medium'
          }
        ]
      }
    ],
    engagementActivities: [
      {
        id: 'EA001',
        title: 'Program Kickoff Meeting',
        date: '2023-03-01',
        type: 'Meeting',
        attendees: ['John Smith', 'Sarah Johnson', 'Michael Chen', 'David Patel', 'Robert Taylor'],
        status: 'Completed',
        outcome: 'Program objectives and timelines established',
        nextSteps: 'Follow up with individual stakeholder meetings',
        location: 'Main Conference Room',
        duration: '2 hours',
        agenda: ['Introduction', 'Program Objectives', 'Timeline Overview', 'Risk Assessment', 'Q&A'],
        satisfaction: 92,
        followUpActions: [
          {
            id: '1',
            description: 'Distribute meeting minutes',
            assignedTo: 'John Smith',
            dueDate: '2023-03-03',
            status: 'Completed'
          },
          {
            id: '2',
            description: 'Schedule technical deep dive',
            assignedTo: 'Sarah Johnson',
            dueDate: '2023-03-10',
            status: 'Completed'
          }
        ]
      },
      {
        id: 'EA002',
        title: 'Technical Deep Dive',
        date: '2023-03-10',
        type: 'Workshop',
        attendees: ['Sarah Johnson', 'Robert Taylor', 'Engineering Team'],
        status: 'Completed',
        outcome: 'Technical approach finalized',
        nextSteps: 'Begin implementation planning',
        location: 'Engineering Lab',
        duration: '3 hours',
        agenda: ['Technical Requirements', 'Architecture Review', 'Implementation Plan'],
        satisfaction: 85,
        followUpActions: [
          {
            id: '3',
            description: 'Document technical specifications',
            assignedTo: 'Sarah Johnson',
            dueDate: '2023-03-17',
            status: 'In Progress'
          }
        ]
      },
      {
        id: 'EA003',
        title: 'Client Status Update',
        date: '2023-03-15',
        type: 'Review',
        attendees: ['John Smith', 'Michael Chen', 'Client Team'],
        status: 'Completed',
        outcome: 'Progress update provided, client concerns addressed',
        nextSteps: 'Adjust timeline based on feedback',
        location: 'Virtual Meeting',
        duration: '1 hour',
        agenda: ['Progress Update', 'Timeline Review', 'Issues and Concerns', 'Next Steps'],
        satisfaction: 78,
        followUpActions: [
          {
            id: '4',
            description: 'Revise project timeline document',
            assignedTo: 'John Smith',
            dueDate: '2023-03-22',
            status: 'Open'
          },
          {
            id: '5',
            description: 'Schedule follow-up with client',
            assignedTo: 'John Smith',
            dueDate: '2023-03-25',
            status: 'Open'
          }
        ]
      },
      {
        id: 'EA004',
        title: 'Budget Review Meeting',
        date: '2023-03-17',
        type: 'Review',
        attendees: ['John Smith', 'David Patel', 'Finance Team'],
        status: 'Completed',
        outcome: 'Budget tracking on target, minor adjustments made',
        nextSteps: 'Update financial forecasts',
        location: 'Finance Conference Room',
        duration: '1.5 hours',
        agenda: ['Budget Status', 'Expense Review', 'Financial Projections'],
        satisfaction: 90,
        followUpActions: [
          {
            id: '6',
            description: 'Update Q2 financial projections',
            assignedTo: 'David Patel',
            dueDate: '2023-03-24',
            status: 'In Progress'
          }
        ]
      },
      {
        id: 'EA005',
        title: 'Compliance Check-in',
        date: '2023-03-20',
        type: 'Meeting',
        attendees: ['Emily Rodriguez', 'John Smith'],
        status: 'Scheduled',
        outcome: '',
        nextSteps: '',
        location: 'Small Conference Room',
        duration: '1 hour',
        agenda: ['Regulatory Requirements', 'Documentation Status', 'Compliance Timeline'],
        satisfaction: 0,
        followUpActions: []
      }
    ],
    engagementTrends: [
      {
        date: '2022-10',
        active: 3,
        neutral: 2,
        resistant: 1
      },
      {
        date: '2022-11',
        active: 3,
        neutral: 3,
        resistant: 0
      },
      {
        date: '2022-12',
        active: 4,
        neutral: 2,
        resistant: 0
      },
      {
        date: '2023-01',
        active: 5,
        neutral: 1,
        resistant: 0
      },
      {
        date: '2023-02',
        active: 4,
        neutral: 2,
        resistant: 0
      },
      {
        date: '2023-03',
        active: 5,
        neutral: 1,
        resistant: 0
      }
    ],
    stakeholderMatrix: {
      highInterestHighInfluence: [
        {
          id: 'STK001',
          name: 'John Smith',
          role: 'Program Manager',
          organization: 'Siemens Energy',
          interest: 'High',
          influence: 'High',
          communicationFrequency: 'Weekly',
          engagement: 'Active',
          lastContact: '2023-03-15',
          nextContact: '2023-03-22',
          notes: 'Key decision maker for budget allocations. Prefers detailed reporting and data-driven insights.',
          status: 'Active',
          contactInfo: {
            email: 'john.smith@siemens-energy.com',
            phone: '+1-555-1234',
            address: '123 Energy Plaza, Houston, TX'
          },
          communicationPreferences: {
            preferredChannel: 'Email',
            frequency: 'Weekly',
            bestTime: 'Morning (8-10am)'
          },
          satisfaction: 85,
          impact: 'Critical',
          actionItems: [
            {
              id: '1',
              title: 'Review Q2 project plan',
              status: 'In Progress',
              dueDate: '2023-03-30',
              priority: 'High'
            },
            {
              id: '2',
              title: 'Schedule executive presentation',
              status: 'Open',
              dueDate: '2023-04-15',
              priority: 'Medium'
            }
          ]
        }
      ],
      highInterestLowInfluence: [
        {
          id: 'STK006',
          name: 'Robert Taylor',
          role: 'Engineering Manager',
          organization: 'Siemens Technology',
          interest: 'High',
          influence: 'Low',
          communicationFrequency: 'Weekly',
          engagement: 'Active',
          lastContact: '2023-03-17',
          nextContact: '2023-03-24',
          notes: 'Manages the engineering team working on technical implementation.',
          status: 'Active',
          contactInfo: {
            email: 'robert.taylor@siemens.com',
            phone: '+1-555-6789',
            address: '777 Engineering Blvd, Austin, TX'
          },
          communicationPreferences: {
            preferredChannel: 'Meeting',
            frequency: 'Weekly',
            bestTime: 'Morning (10-11am)'
          },
          satisfaction: 88,
          impact: 'Medium',
          actionItems: [
            {
              id: '8',
              title: 'Review resource allocation',
              status: 'Completed',
              dueDate: '2023-03-15',
              priority: 'Medium'
            }
          ]
        },
        {
          id: 'STK002',
          name: 'Sarah Johnson',
          role: 'Technical Lead',
          organization: 'Siemens Digital Industries',
          interest: 'High',
          influence: 'Medium',
          communicationFrequency: 'Bi-weekly',
          engagement: 'Active',
          lastContact: '2023-03-10',
          nextContact: '2023-03-24',
          notes: 'Technical subject matter expert. Prefers direct communication about technical issues.',
          status: 'Active',
          contactInfo: {
            email: 'sarah.johnson@siemens.com',
            phone: '+1-555-2345',
            address: '456 Innovation Drive, Princeton, NJ'
          },
          communicationPreferences: {
            preferredChannel: 'Meeting',
            frequency: 'Weekly',
            bestTime: 'Afternoon (2-4pm)'
          },
          satisfaction: 78,
          impact: 'High',
          actionItems: [
            {
              id: '3',
              title: 'Review technical documentation',
              status: 'Completed',
              dueDate: '2023-03-15',
              priority: 'High'
            },
            {
              id: '4',
              title: 'Coordinate with engineering team',
              status: 'In Progress',
              dueDate: '2023-03-28',
              priority: 'Medium'
            }
          ]
        }
      ],
      lowInterestHighInfluence: [
        {
          id: 'STK003',
          name: 'Michael Chen',
          role: 'Customer Representative',
          organization: 'Client XYZ',
          interest: 'Medium',
          influence: 'High',
          communicationFrequency: 'Monthly',
          engagement: 'Neutral',
          lastContact: '2023-02-28',
          nextContact: '2023-03-30',
          notes: 'Important client stakeholder. Concerned about timeline and deliverables.',
          status: 'Active',
          contactInfo: {
            email: 'michael.chen@clientxyz.com',
            phone: '+1-555-3456',
            address: '789 Client Way, Chicago, IL'
          },
          communicationPreferences: {
            preferredChannel: 'Phone',
            frequency: 'Monthly',
            bestTime: 'Late Afternoon (4-5pm)'
          },
          satisfaction: 65,
          impact: 'High',
          actionItems: [
            {
              id: '5',
              title: 'Address timeline concerns',
              status: 'Open',
              dueDate: '2023-04-05',
              priority: 'High'
            }
          ]
        }
      ],
      lowInterestLowInfluence: [
        {
          id: 'STK004',
          name: 'Emily Rodriguez',
          role: 'Regulatory Affairs',
          organization: 'Siemens Compliance',
          interest: 'Low',
          influence: 'Medium',
          communicationFrequency: 'Monthly',
          engagement: 'Neutral',
          lastContact: '2023-03-05',
          nextContact: '2023-04-05',
          notes: 'Oversees compliance and regulatory aspects of the program.',
          status: 'Active',
          contactInfo: {
            email: 'emily.rodriguez@siemens.com',
            phone: '+1-555-4567',
            address: '321 Compliance Ave, Washington DC'
          },
          communicationPreferences: {
            preferredChannel: 'Email',
            frequency: 'Monthly',
            bestTime: 'Morning (9-11am)'
          },
          satisfaction: 72,
          impact: 'Medium',
          actionItems: [
            {
              id: '6',
              title: 'Submit regulatory documents',
              status: 'In Progress',
              dueDate: '2023-04-10',
              priority: 'Medium'
            }
          ]
        },
        {
          id: 'STK005',
          name: 'David Patel',
          role: 'Finance Director',
          organization: 'Siemens Financial',
          interest: 'Medium',
          influence: 'Medium',
          communicationFrequency: 'Monthly',
          engagement: 'Active',
          lastContact: '2023-03-12',
          nextContact: '2023-04-12',
          notes: 'Oversees budget allocation and financial reporting.',
          status: 'Active',
          contactInfo: {
            email: 'david.patel@siemens.com',
            phone: '+1-555-5678',
            address: '555 Financial District, New York, NY'
          },
          communicationPreferences: {
            preferredChannel: 'Report',
            frequency: 'Monthly',
            bestTime: 'End of Month'
          },
          satisfaction: 80,
          impact: 'Medium',
          actionItems: [
            {
              id: '7',
              title: 'Prepare Q2 financial forecast',
              status: 'Open',
              dueDate: '2023-04-20',
              priority: 'High'
            }
          ]
        }
      ]
    }
  },
  qualityManagement: {
    qualityMetrics: [
      {
        date: '2023-01',
        planned: 95,
        actual: 92,
        target: 98
      },
      {
        date: '2023-02',
        planned: 95,
        actual: 93,
        target: 98
      },
      {
        date: '2023-03',
        planned: 96,
        actual: 94,
        target: 98
      },
      {
        date: '2023-04',
        planned: 96,
        actual: 95,
        target: 98
      },
      {
        date: '2023-05',
        planned: 97,
        actual: 96,
        target: 98
      },
      {
        date: '2023-06',
        planned: 97,
        actual: 96.5,
        target: 98
      }
    ],
    qualityIssues: [
      {
        id: 'QI001',
        title: 'Documentation Inconsistency',
        description: 'Inconsistencies found between design specs and implementation docs',
        severity: 'Medium',
        status: 'In Progress',
        component: 'Documentation',
        reportedBy: 'Quality Team',
        dateReported: '2023-05-10',
        lastUpdated: '2023-05-15',
        assignedTo: 'Sarah Johnson',
        resolution: '',
        impactAreas: ['Documentation', 'Development'],
        relatedIssues: ['RI002']
      },
      {
        id: 'QI002',
        title: 'Performance Test Failure',
        description: 'System response time exceeds threshold under high load conditions',
        severity: 'High',
        status: 'Open',
        component: 'Backend Services',
        reportedBy: 'Test Team',
        dateReported: '2023-05-12',
        lastUpdated: '2023-05-12',
        assignedTo: 'Robert Chen',
        resolution: '',
        impactAreas: ['Performance', 'User Experience'],
        relatedIssues: []
      },
      {
        id: 'QI003',
        title: 'Security Vulnerability',
        description: 'Potential XSS vulnerability identified in form handling',
        severity: 'Critical',
        status: 'In Progress',
        component: 'Frontend',
        reportedBy: 'Security Audit',
        dateReported: '2023-05-08',
        lastUpdated: '2023-05-14',
        assignedTo: 'David Patel',
        resolution: '',
        impactAreas: ['Security', 'Compliance'],
        relatedIssues: ['RI005']
      },
      {
        id: 'QI004',
        title: 'UI Accessibility Issue',
        description: 'Dashboard elements not properly accessible via screen readers',
        severity: 'Medium',
        status: 'Open',
        component: 'Frontend',
        reportedBy: 'UX Team',
        dateReported: '2023-05-14',
        lastUpdated: '2023-05-14',
        assignedTo: 'Emily Rodriguez',
        resolution: '',
        impactAreas: ['Accessibility', 'User Experience'],
        relatedIssues: []
      },
      {
        id: 'QI005',
        title: 'Database Query Optimization',
        description: 'Inefficient query pattern causing increased load times in reporting module',
        severity: 'Medium',
        status: 'Resolved',
        component: 'Database',
        reportedBy: 'Performance Team',
        dateReported: '2023-05-02',
        lastUpdated: '2023-05-17',
        assignedTo: 'Michael Smith',
        resolution: 'Implemented query caching and index optimization',
        impactAreas: ['Performance', 'Reliability'],
        relatedIssues: []
      },
      {
        id: 'QI006',
        title: 'API Documentation Gap',
        description: 'Missing documentation for newly added API endpoints',
        severity: 'Low',
        status: 'Closed',
        component: 'API',
        reportedBy: 'Integration Team',
        dateReported: '2023-04-28',
        lastUpdated: '2023-05-05',
        assignedTo: 'John Wilson',
        resolution: 'Updated API documentation with missing endpoints',
        impactAreas: ['Documentation', 'Integration'],
        relatedIssues: []
      }
    ],
    qualityTrends: [
      {
        date: '2023-01',
        defects: 24,
        rework: 15,
        compliance: 92
      },
      {
        date: '2023-02',
        defects: 21,
        rework: 14,
        compliance: 93
      },
      {
        date: '2023-03',
        defects: 18,
        rework: 12,
        compliance: 95
      },
      {
        date: '2023-04',
        defects: 15,
        rework: 10,
        compliance: 96
      },
      {
        date: '2023-05',
        defects: 12,
        rework: 8,
        compliance: 97
      },
      {
        date: '2023-06',
        defects: 10,
        rework: 7,
        compliance: 98
      }
    ],
    complianceStatus: [
      {
        standard: 'ISO 9001:2015',
        status: 'Compliant',
        lastAudit: '2023-03-15',
        nextAudit: '2023-09-15',
        findings: []
      },
      {
        standard: 'ISO 27001',
        status: 'Partially Compliant',
        lastAudit: '2023-02-20',
        nextAudit: '2023-08-20',
        findings: ['Documentation updates needed for risk assessment', 'Enhance access control monitoring']
      },
      {
        standard: 'CMMI Level 4',
        status: 'Compliant',
        lastAudit: '2023-01-10',
        nextAudit: '2023-07-10',
        findings: []
      },
      {
        standard: 'IEC 62304',
        status: 'Partially Compliant',
        lastAudit: '2023-04-05',
        nextAudit: '2023-10-05',
        findings: ['Update risk management documentation', 'Enhance traceability between requirements and tests']
      }
    ],
    qualityMetricsSummary: {
      defectDensity: 0.8,
      testCoverage: 92,
      codeReviewCoverage: 95,
      automationRate: 85,
      firstTimePassRate: 78,
      technicalDebtIndex: 15
    },
    processAdherence: [
      {
        process: 'Requirements Review',
        adherenceRate: 92,
        trend: 'Improving'
      },
      {
        process: 'Design Review',
        adherenceRate: 88,
        trend: 'Stable'
      },
      {
        process: 'Code Review',
        adherenceRate: 95,
        trend: 'Improving'
      },
      {
        process: 'Test Execution',
        adherenceRate: 97,
        trend: 'Stable'
      },
      {
        process: 'Release Procedures',
        adherenceRate: 94,
        trend: 'Improving'
      }
    ],
    qualityImprovements: [
      {
        id: 'QI001',
        title: 'Automated Testing Framework',
        description: 'Implement automated testing framework to increase test coverage and reliability',
        status: 'In Progress',
        startDate: '2023-04-15',
        targetDate: '2023-07-30',
        leader: 'Sarah Johnson',
        type: 'Tool',
        impact: 'High',
        metrics: ['testCoverage', 'defectDensity', 'automationRate'],
        progress: 65
      },
      {
        id: 'QI002',
        title: 'Code Review Process Enhancement',
        description: 'Refine code review process with better guidelines and tooling',
        status: 'Completed',
        startDate: '2023-03-01',
        targetDate: '2023-05-15',
        actualDate: '2023-05-12',
        leader: 'David Patel',
        type: 'Process',
        impact: 'Medium',
        metrics: ['codeReviewCoverage', 'defectDensity'],
        progress: 100
      },
      {
        id: 'QI003',
        title: 'Security Testing Training',
        description: 'Training program for development team on security testing principles',
        status: 'Planned',
        startDate: '2023-07-01',
        targetDate: '2023-08-15',
        leader: 'Emily Rodriguez',
        type: 'Training',
        impact: 'High',
        metrics: ['defectDensity', 'firstTimePassRate'],
        progress: 0
      },
      {
        id: 'QI004',
        title: 'Technical Debt Reduction Initiative',
        description: 'Focused effort to reduce technical debt in core modules',
        status: 'In Progress',
        startDate: '2023-05-01',
        targetDate: '2023-09-30',
        leader: 'Robert Taylor',
        type: 'Process',
        impact: 'High',
        metrics: ['technicalDebtIndex'],
        progress: 35
      },
      {
        id: 'QI005',
        title: 'QA Environment Upgrade',
        description: 'Upgrade testing infrastructure to match production environment',
        status: 'In Progress',
        startDate: '2023-06-01',
        targetDate: '2023-07-15',
        leader: 'Michael Chen',
        type: 'Infrastructure',
        impact: 'Medium',
        metrics: ['firstTimePassRate'],
        progress: 45
      }
    ],
    rootCauseAnalysis: [
      {
        category: 'Requirements',
        count: 12,
        subcategories: [
          { name: 'Incomplete Requirements', count: 5 },
          { name: 'Ambiguous Requirements', count: 4 },
          { name: 'Changing Requirements', count: 3 }
        ]
      },
      {
        category: 'Design',
        count: 8,
        subcategories: [
          { name: 'Architecture Issues', count: 3 },
          { name: 'Interface Design', count: 3 },
          { name: 'Performance Considerations', count: 2 }
        ]
      },
      {
        category: 'Coding',
        count: 15,
        subcategories: [
          { name: 'Logic Errors', count: 6 },
          { name: 'Error Handling', count: 4 },
          { name: 'Concurrency Issues', count: 3 },
          { name: 'Language Misuse', count: 2 }
        ]
      },
      {
        category: 'Testing',
        count: 9,
        subcategories: [
          { name: 'Incomplete Test Cases', count: 4 },
          { name: 'Test Environment', count: 3 },
          { name: 'Test Data', count: 2 }
        ]
      },
      {
        category: 'Documentation',
        count: 7,
        subcategories: [
          { name: 'Missing Documentation', count: 4 },
          { name: 'Outdated Documentation', count: 3 }
        ]
      }
    ],
    qualityScorecard: {
      overall: 87,
      categories: [
        { name: 'Process Compliance', score: 92, weight: 0.25 },
        { name: 'Product Quality', score: 85, weight: 0.30 },
        { name: 'Defect Management', score: 88, weight: 0.20 },
        { name: 'Testing Effectiveness', score: 82, weight: 0.25 }
      ],
      previousScore: 83,
      trend: 'Improving'
    }
  },
  supplyChainManagement: {
    suppliers: [
      {
        id: "SUP-001",
        name: "AeroTech Components",
        category: "Electronics",
        status: "Active",
        performance: 92,
        lastAssessment: "2023-10-15",
        nextAssessment: "2024-04-15",
        issues: [],
        location: "San Diego, CA",
        contactInfo: {
          name: "Michael Chen",
          email: "mchen@aerotechcomp.com",
          phone: "858-555-1234"
        },
        leadTime: 14,
        onTimeDeliveryRate: 94,
        qualityRating: 4.8,
        contractDetails: {
          startDate: "2023-01-01",
          endDate: "2025-12-31",
          value: 2500000,
          terms: "Net 30"
        },
        certifications: ["ISO 9001", "AS9100D", "ITAR"],
        riskLevel: "Low",
        alternativeSuppliers: ["SUP-005", "SUP-006"]
      },
      {
        id: "SUP-002",
        name: "GlobalMetals Inc.",
        category: "Raw Materials",
        status: "At Risk",
        performance: 68,
        lastAssessment: "2023-11-10",
        nextAssessment: "2024-02-10",
        issues: ["Recent quality issues with titanium alloys", "Delayed shipments", "Price fluctuations"],
        location: "Pittsburgh, PA",
        contactInfo: {
          name: "Sarah Johnson",
          email: "sjohnson@globalmetals.com",
          phone: "412-555-6789"
        },
        leadTime: 30,
        onTimeDeliveryRate: 74,
        qualityRating: 3.2,
        contractDetails: {
          startDate: "2023-01-01",
          endDate: "2024-12-31",
          value: 1800000,
          terms: "Net 45"
        },
        certifications: ["ISO 9001"],
        riskLevel: "High",
        alternativeSuppliers: ["SUP-008"]
      },
      {
        id: "SUP-003",
        name: "Precision Engineering Ltd.",
        category: "Machined Parts",
        status: "Active",
        performance: 87,
        lastAssessment: "2023-09-20",
        nextAssessment: "2024-03-20",
        issues: ["Minor capacity constraints"],
        location: "Wichita, KS",
        contactInfo: {
          name: "Robert Williams",
          email: "rwilliams@precisioneng.com",
          phone: "316-555-2345"
        },
        leadTime: 21,
        onTimeDeliveryRate: 89,
        qualityRating: 4.3,
        contractDetails: {
          startDate: "2022-07-01",
          endDate: "2025-06-30",
          value: 1200000,
          terms: "Net 30"
        },
        certifications: ["ISO 9001", "AS9100D"],
        riskLevel: "Medium",
        alternativeSuppliers: ["SUP-007"]
      },
      {
        id: "SUP-004",
        name: "Avionic Systems International",
        category: "Electronics",
        status: "Active",
        performance: 95,
        lastAssessment: "2023-12-05",
        nextAssessment: "2024-06-05",
        issues: [],
        location: "Austin, TX",
        contactInfo: {
          name: "Amanda Garcia",
          email: "agarcia@avi-systems.com",
          phone: "512-555-3456"
        },
        leadTime: 18,
        onTimeDeliveryRate: 97,
        qualityRating: 4.9,
        contractDetails: {
          startDate: "2023-03-01",
          endDate: "2026-02-28",
          value: 3200000,
          terms: "Net 30"
        },
        certifications: ["ISO 9001", "AS9100D", "ITAR", "CMMI Level 5"],
        riskLevel: "Low",
        alternativeSuppliers: []
      }
    ],
    orders: [
      {
        id: "ORD-1001",
        supplierId: "SUP-001",
        item: "Flight Control Modules",
        quantity: 50,
        status: "In Transit",
        orderDate: "2023-11-15",
        expectedDelivery: "2023-12-05",
        price: 2850,
        totalCost: 142500,
        trackingInfo: {
          trackingNumber: "ASI928374655",
          carrier: "ExpressFreight",
          currentLocation: "Denver, CO",
          estimatedArrival: "2023-12-04",
          lastUpdated: "2023-12-01"
        },
        priority: "High"
      },
      {
        id: "ORD-1002",
        supplierId: "SUP-002",
        item: "Titanium Alloy Sheets",
        quantity: 200,
        status: "Delayed",
        orderDate: "2023-10-10",
        expectedDelivery: "2023-11-10",
        price: 350,
        totalCost: 70000,
        trackingInfo: {
          trackingNumber: "GMI847562944",
          carrier: "FreightLine",
          currentLocation: "Columbus, OH",
          estimatedArrival: "2023-12-10",
          lastUpdated: "2023-11-28"
        },
        priority: "Critical"
      },
      {
        id: "ORD-1003",
        supplierId: "SUP-003",
        item: "Precision Gear Assemblies",
        quantity: 100,
        status: "Delivered",
        orderDate: "2023-10-20",
        expectedDelivery: "2023-11-15",
        actualDelivery: "2023-11-12",
        price: 420,
        totalCost: 42000,
        qualityInspection: {
          passed: true,
          date: "2023-11-14",
          inspector: "David Martinez",
          notes: "All assemblies meet specifications"
        },
        priority: "Medium"
      },
      {
        id: "ORD-1004",
        supplierId: "SUP-004",
        item: "Navigation Subsystems",
        quantity: 25,
        status: "Pending",
        orderDate: "2023-11-25",
        expectedDelivery: "2023-12-15",
        price: 3650,
        totalCost: 91250,
        priority: "High"
      },
      {
        id: "ORD-1005",
        supplierId: "SUP-001",
        item: "Sensor Arrays",
        quantity: 30,
        status: "In Transit",
        orderDate: "2023-11-18",
        expectedDelivery: "2023-12-08",
        price: 1280,
        totalCost: 38400,
        trackingInfo: {
          trackingNumber: "ASI928374981",
          carrier: "ExpressFreight",
          currentLocation: "Albuquerque, NM",
          estimatedArrival: "2023-12-07",
          lastUpdated: "2023-12-02"
        },
        priority: "Medium"
      }
    ],
    supplyChainTrends: [
      {
        date: "2023-07",
        orders: 42,
        deliveries: 38,
        delays: 4,
        costVariance: 1.5,
        qualityIssues: 3,
        onTimeDeliveryRate: 90.5,
        averageLeadTime: 18.2,
        backorderedItems: 5
      },
      {
        date: "2023-08",
        orders: 45,
        deliveries: 40,
        delays: 5,
        costVariance: 2.1,
        qualityIssues: 4,
        onTimeDeliveryRate: 88.9,
        averageLeadTime: 19.5,
        backorderedItems: 7
      },
      {
        date: "2023-09",
        orders: 39,
        deliveries: 37,
        delays: 2,
        costVariance: 0.8,
        qualityIssues: 2,
        onTimeDeliveryRate: 94.9,
        averageLeadTime: 17.8,
        backorderedItems: 4
      },
      {
        date: "2023-10",
        orders: 48,
        deliveries: 43,
        delays: 5,
        costVariance: 1.9,
        qualityIssues: 3,
        onTimeDeliveryRate: 89.6,
        averageLeadTime: 18.7,
        backorderedItems: 6
      },
      {
        date: "2023-11",
        orders: 52,
        deliveries: 48,
        delays: 4,
        costVariance: 1.2,
        qualityIssues: 2,
        onTimeDeliveryRate: 92.3,
        averageLeadTime: 18.1,
        backorderedItems: 5
      }
    ],
    inventoryLevels: [
      {
        item: "Flight Control Modules",
        current: 35,
        minimum: 20,
        maximum: 100,
        reorderPoint: 40,
        location: "Warehouse A, Section 3",
        status: "Low Stock",
        category: "Electronics",
        unitCost: 2850,
        totalValue: 99750,
        lastRestocked: "2023-11-10",
        turnoverRate: 2.3,
        supplier: "AeroTech Components",
        leadTime: 14,
        demandForecast: 45,
        itemCritical: true
      },
      {
        item: "Titanium Alloy Sheets",
        current: 85,
        minimum: 50,
        maximum: 250,
        reorderPoint: 75,
        location: "Warehouse B, Section 1",
        status: "In Stock",
        category: "Raw Materials",
        unitCost: 350,
        totalValue: 29750,
        lastRestocked: "2023-10-28",
        turnoverRate: 1.8,
        supplier: "GlobalMetals Inc.",
        leadTime: 30,
        demandForecast: 130,
        itemCritical: true
      },
      {
        item: "Precision Gear Assemblies",
        current: 120,
        minimum: 75,
        maximum: 300,
        reorderPoint: 100,
        location: "Warehouse A, Section 5",
        status: "In Stock",
        category: "Machined Parts",
        unitCost: 420,
        totalValue: 50400,
        lastRestocked: "2023-11-14",
        turnoverRate: 1.5,
        supplier: "Precision Engineering Ltd.",
        leadTime: 21,
        demandForecast: 90,
        itemCritical: false
      },
      {
        item: "Navigation Subsystems",
        current: 15,
        minimum: 10,
        maximum: 50,
        reorderPoint: 20,
        location: "Warehouse A, Section 2",
        status: "Low Stock",
        category: "Electronics",
        unitCost: 3650,
        totalValue: 54750,
        lastRestocked: "2023-10-15",
        turnoverRate: 1.2,
        supplier: "Avionic Systems International",
        leadTime: 18,
        demandForecast: 25,
        itemCritical: true
      },
      {
        item: "Hydraulic Control Units",
        current: 5,
        minimum: 15,
        maximum: 75,
        reorderPoint: 25,
        location: "Warehouse A, Section 4",
        status: "Out of Stock",
        category: "Mechanical",
        unitCost: 1850,
        totalValue: 9250,
        lastRestocked: "2023-09-20",
        turnoverRate: 2.5,
        supplier: "Precision Engineering Ltd.",
        leadTime: 21,
        demandForecast: 30,
        itemCritical: true
      }
    ],
    keyMetrics: [
      {
        name: "On-Time Delivery",
        value: 92.3,
        target: 95.0,
        unit: "%",
        trend: "Improving",
        periodChange: 2.7
      },
      {
        name: "Supplier Performance Index",
        value: 85.5,
        target: 90.0,
        unit: "%",
        trend: "Stable",
        periodChange: 0.3
      },
      {
        name: "Inventory Turnover",
        value: 6.8,
        target: 8.0,
        unit: "turns/year",
        trend: "Improving",
        periodChange: 0.5
      },
      {
        name: "Lead Time",
        value: 18.1,
        target: 15.0,
        unit: "days",
        trend: "Declining",
        periodChange: -0.6
      },
      {
        name: "Order Fulfillment Rate",
        value: 94.2,
        target: 98.0,
        unit: "%",
        trend: "Improving",
        periodChange: 1.8
      }
    ],
    risks: [
      {
        id: "SCR-001",
        title: "Titanium Supply Disruption",
        description: "Potential disruption in titanium supply due to geopolitical tensions affecting global metal markets",
        category: "Material Shortage",
        impact: "High",
        probability: "Medium",
        status: "Monitoring",
        mitigation: "Identify alternative suppliers and increase safety stock levels for critical materials",
        owner: "Sarah Johnson",
        suppliers: ["GlobalMetals Inc."],
        lastUpdated: "2023-11-28"
      },
      {
        id: "SCR-002",
        title: "Logistics Delays",
        description: "Increasing transportation delays due to port congestion and driver shortages",
        category: "Logistics",
        impact: "Medium",
        probability: "High",
        status: "Mitigated",
        mitigation: "Implemented multi-carrier strategy and increased lead times in planning",
        owner: "Robert Taylor",
        suppliers: ["All"],
        lastUpdated: "2023-11-15"
      },
      {
        id: "SCR-003",
        title: "Electronic Components Shortage",
        description: "Global shortage of specialized microprocessors affecting production schedules",
        category: "Material Shortage",
        impact: "High",
        probability: "High",
        status: "Monitoring",
        mitigation: "Long-term contracts with suppliers, exploring redesign options with alternative components",
        owner: "Jennifer Lee",
        suppliers: ["AeroTech Components", "Avionic Systems International"],
        lastUpdated: "2023-11-20"
      }
    ],
    sustainabilityMetrics: {
      carbonFootprint: 12500,
      recycledMaterials: 35.8,
      energyEfficiency: 78,
      wasteReduction: 12.5,
      transportationEfficiency: 72
    },
    demandForecasting: [
      {
        period: "2023-Q4",
        predictedDemand: 850,
        actualDemand: 872,
        variance: 2.6,
        confidence: 90
      },
      {
        period: "2024-Q1",
        predictedDemand: 920,
        confidence: 85
      },
      {
        period: "2024-Q2",
        predictedDemand: 980,
        confidence: 75
      },
      {
        period: "2024-Q3",
        predictedDemand: 1050,
        confidence: 65
      }
    ]
  }
}; 