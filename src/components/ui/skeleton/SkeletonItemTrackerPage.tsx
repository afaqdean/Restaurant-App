import { memo } from "react";
import { SkeletonBase, SkeletonBox, SkeletonText } from "./SkeletonBase";

interface SkeletonItemTrackerPageProps {
  className?: string;
}

export const SkeletonItemTrackerPage = memo(function SkeletonItemTrackerPage({
  className = ""
}: SkeletonItemTrackerPageProps) {
  return (
    <SkeletonBase className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <SkeletonText lines={1} lineHeight="lg" className="w-80 text-4xl" />
          <SkeletonText lines={1} lineHeight="md" className="w-96 text-xl mt-2" />
        </div>

        {/* Filter Button */}
        <div className="flex justify-end mb-6">
          <SkeletonBox width={100} height={40} rounded="lg" />
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SkeletonBox width={80} height={16} />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SkeletonBox width={70} height={16} />
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SkeletonBox width={90} height={16} />
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SkeletonBox width={70} height={16} />
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SkeletonBox width={80} height={16} />
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <SkeletonBox width={60} height={16} />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: 8 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SkeletonBox width={120} height={16} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <SkeletonBox width={80} height={24} rounded="full" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <SkeletonBox width={40} height={16} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <SkeletonBox width={40} height={16} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <SkeletonBox width={40} height={16} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <SkeletonBox width={60} height={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
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
      </div>
    </SkeletonBase>
  );
});
