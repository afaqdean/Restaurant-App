import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Restaurant App Documentation
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome to the Restaurant Management System documentation. 
            Explore our API endpoints and test them interactively.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/api-docs"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View API Documentation
            </Link>
            
                         <div className="text-sm text-gray-500">
               <p>Current API Endpoints:</p>
               <ul className="mt-2 space-y-1">
                 <li>• POST /api/auth/register - User registration</li>
                 <li>• GET /api/docs - OpenAPI specification</li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
