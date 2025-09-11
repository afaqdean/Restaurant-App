import { memo } from "react";
import { SkeletonBase, SkeletonBox, SkeletonText } from "./SkeletonBase";

interface SkeletonAdminPageProps {
  className?: string;
  titleWidth?: number;
  subtitleWidth?: number;
  showActionButton?: boolean;
  actionButtonWidth?: number;
  showFilterButton?: boolean;
  filterButtonWidth?: number;
  tableColumns?: number;
  tableRows?: number;
  showPagination?: boolean;
}

export const SkeletonAdminPage = memo(function SkeletonAdminPage({
  className = "",
  titleWidth = 80,
  subtitleWidth = 96,
  showActionButton = false,
  actionButtonWidth = 128,
  showFilterButton = false,
  filterButtonWidth = 100,
  tableColumns = 6,
  tableRows = 8,
  showPagination = true,
}: SkeletonAdminPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className={`w-${titleWidth} text-4xl`} />
          <SkeletonText lines={1} lineHeight="md" className={`w-${subtitleWidth} text-xl mt-2`} />
        </div>

        {/* Action Button */}
        {showActionButton && (
          <div className="mb-6">
            <SkeletonBox width={actionButtonWidth} height={40} rounded="lg" />
          </div>
        )}

        {/* Filter Button */}
        {showFilterButton && (
          <div className="flex justify-end mb-6">
            <SkeletonBox width={filterButtonWidth} height={40} rounded="lg" />
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {Array.from({ length: tableColumns }).map((_, index) => (
                    <th key={index} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <SkeletonBox width={80} height={16} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: tableRows }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: tableColumns }).map((_, colIndex) => (
                      <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                        <SkeletonBox width={120} height={16} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-lg shadow-sm mt-8">
            <div className="flex-1 flex justify-between sm:hidden">
              <SkeletonBox width={80} height={36} rounded="md" />
              <SkeletonBox width={60} height={36} rounded="md" />
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <SkeletonBox width={200} height={16} />
              </div>
              <div>
                <div className="flex space-x-1">
                  <SkeletonBox width={36} height={36} rounded="md" />
                  <SkeletonBox width={36} height={36} rounded="md" />
                  <SkeletonBox width={36} height={36} rounded="md" />
                  <SkeletonBox width={36} height={36} rounded="md" />
                  <SkeletonBox width={36} height={36} rounded="md" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SkeletonBase>
  );
});
