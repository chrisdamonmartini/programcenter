import React from 'react';
import { DocumentationStatus as DocumentationStatusType } from '../../../mockupData/programManagementData';
import CollapsibleSection from '../common/CollapsibleSection';
import Chart from '../common/Chart';
import { Document, ReviewRequest, DocumentationTrend } from '../../../mockupData/programManagementData';

interface DocumentationStatusProps {
  data: {
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
  };
  preferences: any;
  onToggleCollapse: () => void;
}

const DocumentationStatus: React.FC<DocumentationStatusProps> = ({
  data,
  preferences,
  onToggleCollapse,
}) => {
  const { darkMode } = preferences;

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case 'Current':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'Under Review':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'Outdated':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      case 'Draft':
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  const getReviewStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-800';
      case 'Completed':
        return darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800';
      case 'Rejected':
        return darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800';
      default:
        return darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Documentation Overview */}
      <CollapsibleSection
        id="documentation-overview"
        title="Documentation Overview"
        icon="📚"
        isCollapsed={preferences.collapsedSections.includes('documentation-overview')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Chart
            type="line"
            data={data.documentationTrends}
            xKey="date"
            yKeys={['updates', 'reviews', 'completions']}
            title="Documentation Activity"
            darkMode={darkMode}
            height={300}
          />
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h4 className={`font-medium mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>Documentation Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="text-sm mb-2">
                  <span className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Total Documents</span>
                </div>
                <div className={`text-2xl font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>{data.metrics.totalDocuments}</div>
              </div>
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="text-sm mb-2">
                  <span className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Current Documents</span>
                </div>
                <div className={`text-2xl font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>{data.metrics.currentDocuments}</div>
              </div>
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="text-sm mb-2">
                  <span className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Under Review</span>
                </div>
                <div className={`text-2xl font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>{data.metrics.underReview}</div>
              </div>
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="text-sm mb-2">
                  <span className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Completion Rate</span>
                </div>
                <div className={`text-2xl font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>{data.metrics.completionRate}%</div>
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Document Status */}
      <CollapsibleSection
        id="document-status"
        title="Document Status"
        icon="📄"
        isCollapsed={preferences.collapsedSections.includes('document-status')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="space-y-4">
          {data.documents.map((doc: Document) => (
            <div
              key={doc.id}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>{doc.title}</h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>{doc.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${getDocumentStatusColor(doc.status)}`}>
                    {doc.status}
                  </span>
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>v{doc.version}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Last Updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                </span>
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Owner: {doc.owner}
                </span>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Completion</span>
                  <span className={`${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{doc.completion}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      doc.completion >= 80
                        ? darkMode ? 'bg-green-600' : 'bg-green-500'
                        : doc.completion >= 60
                        ? darkMode ? 'bg-yellow-600' : 'bg-yellow-500'
                        : darkMode ? 'bg-red-600' : 'bg-red-500'
                    }`}
                    style={{ width: `${doc.completion}%` }}
                  />
                </div>
              </div>
              {doc.reviewers.length > 0 && (
                <div className="mt-2">
                  <h5 className={`text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Reviewers:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {doc.reviewers.map((reviewer, idx) => (
                      <li key={idx} className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{reviewer}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Review Requests */}
      <CollapsibleSection
        id="review-requests"
        title="Review Requests"
        icon="✍️"
        isCollapsed={preferences.collapsedSections.includes('review-requests')}
        onToggle={onToggleCollapse}
        darkMode={darkMode}
      >
        <div className="space-y-4">
          {data.reviewRequests.map((request: ReviewRequest) => (
            <div
              key={request.id}
              className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {data.documents.find(d => d.id === request.documentId)?.title}
                  </h4>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Review Request</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${getReviewStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Requested by {request.requestedBy} on {new Date(request.requestedDate).toLocaleDateString()}
                </span>
                <span className={`${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Due: {new Date(request.dueDate).toLocaleDateString()}
                </span>
              </div>
              {request.comments.length > 0 && (
                <div className="mt-2">
                  <h5 className={`text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Comments:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {request.comments.map((comment, idx) => (
                      <li key={idx} className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{comment}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-4">
                <h5 className={`text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Review Status:</h5>
                <div className="space-y-2">
                  {request.reviewers.map((reviewer, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{reviewer.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        reviewer.status === 'Approved'
                          ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
                          : reviewer.status === 'Rejected'
                          ? darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800'
                          : darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {reviewer.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default DocumentationStatus; 