// Enhanced Technical Performance data
export const mockTechnicalPerformanceData = {
  summary: {
    overall: 'Yellow',
    trl: 7, // Technology Readiness Level (1-9)
    mrl: 6, // Manufacturing Readiness Level (1-10)
    completedTests: 78,
    plannedTests: 94,
    openDefects: 12,
    criticalDefects: 2
  },
  kpps: [
    {
      id: 'KPP001',
      name: 'Maximum Speed',
      actual: 1.6,
      target: 1.6,
      unit: 'Mach',
      status: 'Green',
      trend: 'Stable',
      description: 'Maximum achievable airspeed',
      history: [
        { date: '2023-12', value: 1.52 },
        { date: '2024-01', value: 1.55 },
        { date: '2024-02', value: 1.58 },
        { date: '2024-03', value: 1.59 },
        { date: '2024-04', value: 1.6 }
      ]
    },
    {
      id: 'KPP002',
      name: 'Combat Radius',
      actual: 1050,
      target: 1200,
      unit: 'km',
      status: 'Yellow',
      trend: 'Improving',
      description: 'Maximum combat mission radius',
      history: [
        { date: '2023-12', value: 950 },
        { date: '2024-01', value: 980 },
        { date: '2024-02', value: 1000 },
        { date: '2024-03', value: 1020 },
        { date: '2024-04', value: 1050 }
      ]
    },
    {
      id: 'KPP003',
      name: 'Radar Detection Range',
      actual: 120,
      target: 150,
      unit: 'nm',
      status: 'Yellow',
      trend: 'Stable',
      description: 'Maximum radar detection range',
      history: [
        { date: '2023-12', value: 115 },
        { date: '2024-01', value: 118 },
        { date: '2024-02', value: 119 },
        { date: '2024-03', value: 120 },
        { date: '2024-04', value: 120 }
      ]
    },
    {
      id: 'KPP004',
      name: 'Weapons Payload',
      actual: 5500,
      target: 5000,
      unit: 'kg',
      status: 'Green',
      trend: 'Stable',
      description: 'Maximum weapons payload capacity',
      history: [
        { date: '2023-12', value: 5300 },
        { date: '2024-01', value: 5400 },
        { date: '2024-02', value: 5500 },
        { date: '2024-03', value: 5500 },
        { date: '2024-04', value: 5500 }
      ]
    },
    {
      id: 'KPP005',
      name: 'MTBF',
      actual: 210,
      target: 250,
      unit: 'hours',
      status: 'Yellow',
      trend: 'Improving',
      description: 'Mean Time Between Failures',
      history: [
        { date: '2023-12', value: 180 },
        { date: '2024-01', value: 185 },
        { date: '2024-02', value: 190 },
        { date: '2024-03', value: 200 },
        { date: '2024-04', value: 210 }
      ]
    },
    {
      id: 'KPP006',
      name: 'Stealth Signature',
      actual: 0.12,
      target: 0.10,
      unit: 'RCS',
      status: 'Yellow',
      trend: 'Improving',
      description: 'Radar Cross Section',
      history: [
        { date: '2023-12', value: 0.18 },
        { date: '2024-01', value: 0.16 },
        { date: '2024-02', value: 0.15 },
        { date: '2024-03', value: 0.13 },
        { date: '2024-04', value: 0.12 }
      ]
    }
  ],
  subsystems: [
    {
      id: 'SUB001',
      name: 'Propulsion System',
      status: 'Green',
      completion: 92,
      defectCount: 3,
      metrics: [
        { name: 'Thrust', value: 180, target: 175, unit: 'kN', status: 'Green' },
        { name: 'Fuel Efficiency', value: 0.78, target: 0.8, unit: 'ratio', status: 'Yellow' },
        { name: 'Engine Weight', value: 1850, target: 2000, unit: 'kg', status: 'Green' }
      ]
    },
    {
      id: 'SUB002',
      name: 'Avionics System',
      status: 'Yellow',
      completion: 85,
      defectCount: 5,
      metrics: [
        { name: 'Processing Power', value: 3.8, target: 4.0, unit: 'TFLOPS', status: 'Yellow' },
        { name: 'Power Consumption', value: 12, target: 15, unit: 'kW', status: 'Green' },
        { name: 'Cooling Requirements', value: 8.5, target: 8.0, unit: 'kW', status: 'Yellow' }
      ]
    },
    {
      id: 'SUB003',
      name: 'Airframe Structure',
      status: 'Green',
      completion: 95,
      defectCount: 2,
      metrics: [
        { name: 'Weight', value: 9200, target: 9500, unit: 'kg', status: 'Green' },
        { name: 'G-Force Tolerance', value: 9.2, target: 9.0, unit: 'G', status: 'Green' },
        { name: 'Service Life', value: 8000, target: 8000, unit: 'hours', status: 'Green' }
      ]
    },
    {
      id: 'SUB004',
      name: 'Weapons Systems',
      status: 'Green',
      completion: 90,
      defectCount: 1,
      metrics: [
        { name: 'Targeting Accuracy', value: 98.5, target: 98.0, unit: '%', status: 'Green' },
        { name: 'Integration Speed', value: 0.8, target: 0.75, unit: 'sec', status: 'Green' },
        { name: 'Payload Capacity', value: 5500, target: 5000, unit: 'kg', status: 'Green' }
      ]
    },
    {
      id: 'SUB005',
      name: 'Mission Systems',
      status: 'Yellow',
      completion: 78,
      defectCount: 4,
      metrics: [
        { name: 'Sensor Range', value: 145, target: 150, unit: 'km', status: 'Yellow' },
        { name: 'Data Processing', value: 1.2, target: 1.5, unit: 'Gbps', status: 'Yellow' },
        { name: 'Secure Comms', value: 256, target: 256, unit: 'bit', status: 'Green' }
      ]
    }
  ],
  issues: [
    {
      id: 'ISS001',
      title: 'Avionics Integration Issue',
      severity: 'Medium',
      priority: 'High',
      status: 'In Progress',
      description: 'Minor delay in avionics suite integration affecting radar performance',
      assignment: 'Dr. Sarah Chen',
      subsystem: 'Avionics System',
      reportDate: '2024-04-05',
      targetResolution: '2024-06-15'
    },
    {
      id: 'ISS002',
      title: 'Fuel Efficiency Optimization',
      severity: 'Low',
      priority: 'Medium',
      status: 'In Progress',
      description: 'Fuel consumption exceeds projections by 2.5% under certain flight conditions',
      assignment: 'Robert Johnson',
      subsystem: 'Propulsion System',
      reportDate: '2024-03-22',
      targetResolution: '2024-07-30'
    },
    {
      id: 'ISS003',
      title: 'Data Fusion Latency',
      severity: 'Medium',
      priority: 'Medium',
      status: 'In Analysis',
      description: 'Sensor data fusion experiences 350ms latency in high data rate scenarios',
      assignment: 'Maria Garcia',
      subsystem: 'Mission Systems',
      reportDate: '2024-04-12',
      targetResolution: '2024-08-18'
    }
  ],
  requirementsTraceability: {
    totalRequirements: 475,
    verified: 352,
    inVerification: 98,
    notVerified: 25,
    categories: [
      { name: 'Performance', total: 120, verified: 95, inVerification: 20, notVerified: 5 },
      { name: 'Functional', total: 185, verified: 152, inVerification: 28, notVerified: 5 },
      { name: 'Interface', total: 85, verified: 65, inVerification: 15, notVerified: 5 },
      { name: 'Environmental', total: 45, verified: 20, inVerification: 15, notVerified: 10 },
      { name: 'Supportability', total: 40, verified: 20, inVerification: 20, notVerified: 0 }
    ],
    topUnverified: [
      { id: 'REQ-145', description: 'The system shall maintain stealth characteristics in all weather conditions', category: 'Performance' },
      { id: 'REQ-267', description: 'The system shall operate in extreme temperature ranges (-40°C to +70°C)', category: 'Environmental' },
      { id: 'REQ-312', description: 'The system shall maintain data link in GPS-denied environments', category: 'Functional' },
      { id: 'REQ-098', description: 'The system shall achieve 98% mission reliability', category: 'Supportability' },
      { id: 'REQ-421', description: 'The system shall operate in high-radiation environments', category: 'Environmental' }
    ]
  },
  testProgress: {
    summary: { total: 94, completed: 78, inProgress: 8, notStarted: 8, passed: 68, failed: 10 },
    categories: [
      { name: 'Unit Tests', total: 45, completed: 43, passed: 40, failed: 3 },
      { name: 'Integration Tests', total: 32, completed: 25, passed: 20, failed: 5 },
      { name: 'System Tests', total: 15, completed: 10, passed: 8, failed: 2 },
      { name: 'Performance Tests', total: 2, completed: 0, passed: 0, failed: 0 }
    ],
    recentResults: [
      { id: 'TEST-089', name: 'Radar System Integration Test', status: 'Passed', date: '2024-05-10', coverage: 92 },
      { id: 'TEST-090', name: 'Communication Systems Performance Test', status: 'Failed', date: '2024-05-08', coverage: 85 },
      { id: 'TEST-091', name: 'Weapons Systems Interface Test', status: 'Passed', date: '2024-05-05', coverage: 90 },
      { id: 'TEST-092', name: 'Environmental Stress Testing - Phase 1', status: 'Passed', date: '2024-05-02', coverage: 75 },
      { id: 'TEST-093', name: 'Flight Control System Failure Mode Test', status: 'In Progress', date: '2024-05-12', coverage: 65 }
    ]
  },
  trlAssessment: {
    current: 7,
    target: 8,
    history: [
      { date: '2023-09', value: 6 },
      { date: '2023-12', value: 6 },
      { date: '2024-02', value: 7 },
      { date: '2024-05', value: 7 }
    ],
    subsystems: [
      { name: 'Propulsion System', level: 8 },
      { name: 'Avionics System', level: 7 },
      { name: 'Airframe Structure', level: 9 },
      { name: 'Weapons Systems', level: 8 },
      { name: 'Mission Systems', level: 6 }
    ],
    nextMilestone: {
      level: 8,
      criteria: 'System prototype demonstration in an operational environment',
      targetDate: '2024-09-30'
    }
  },
  mrlAssessment: {
    current: 6,
    target: 8,
    history: [
      { date: '2023-09', value: 5 },
      { date: '2023-12', value: 5 },
      { date: '2024-02', value: 6 },
      { date: '2024-05', value: 6 }
    ],
    subsystems: [
      { name: 'Propulsion System', level: 7 },
      { name: 'Avionics System', level: 6 },
      { name: 'Airframe Structure', level: 8 },
      { name: 'Weapons Systems', level: 7 },
      { name: 'Mission Systems', level: 5 }
    ],
    nextMilestone: {
      level: 7,
      criteria: 'Capability to produce systems, subsystems, or components in a production representative environment',
      targetDate: '2024-10-30'
    }
  },
  modelCoordinates: [
    { id: 'SUB001', x: 0.2, y: 0.5, z: 0.5, label: 'Propulsion System', status: 'Green' },
    { id: 'SUB002', x: 0.5, y: 0.2, z: 0.5, label: 'Avionics System', status: 'Yellow' },
    { id: 'SUB003', x: 0.5, y: 0.5, z: 0.5, label: 'Airframe Structure', status: 'Green' },
    { id: 'SUB004', x: 0.5, y: 0.8, z: 0.5, label: 'Weapons Systems', status: 'Green' },
    { id: 'SUB005', x: 0.8, y: 0.5, z: 0.5, label: 'Mission Systems', status: 'Yellow' }
  ],
  radarChartData: {
    kpp: {
      categories: ['Speed', 'Combat Radius', 'Radar Range', 'Payload', 'MTBF', 'Stealth'],
      actual: [100, 87.5, 80, 110, 84, 83],
      target: [100, 100, 100, 100, 100, 100]
    },
    subsystems: {
      categories: ['Propulsion', 'Avionics', 'Airframe', 'Weapons', 'Mission'],
      completion: [92, 85, 95, 90, 78],
      target: [100, 100, 100, 100, 100]
    }
  }
}; 