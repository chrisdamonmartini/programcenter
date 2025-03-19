# Program Center

A comprehensive program management dashboard built with React, TypeScript, and Ant Design. This application provides a centralized view of various program management aspects including:

- Program Overview
- Schedule Management
- Cost Management
- Risk Management
- Stakeholder Management
- Quality Management
- Supply Chain Management
- Configuration Management
- Documentation Status

## Features

- Modern, responsive UI built with React and Ant Design
- Interactive data visualizations using Recharts
- Dark mode support
- Collapsible sections for better organization
- Real-time data updates
- TypeScript for enhanced type safety

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/programcenter.git
   cd programcenter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production

To create a production build:
```bash
npm run build
```

## Project Structure

```
src/
  ├── components/         # React components
  │   ├── ProgramManagement/
  │   │   ├── sections/  # Individual management sections
  │   │   └── common/    # Shared components
  │   └── Sidebar/       # Navigation sidebar
  ├── mockupData/        # Mock data for development
  ├── types/             # TypeScript type definitions
  ├── utils/             # Utility functions
  └── App.tsx            # Root component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 