import { memo } from "react";
import { SkeletonBase, SkeletonBox, SkeletonText, SkeletonAvatar, SkeletonButton } from "./SkeletonBase";

interface SkeletonTableRowProps {
  columns: number;
  className?: string;
}

export const SkeletonTableRow = memo(function SkeletonTableRow({
  columns,
  className = ""
}: SkeletonTableRowProps) {
  return (
    <tr className={`hover:bg-gray-50/50 transition-colors duration-150 ${className}`}>
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-6 py-5">
          <div className="flex items-center space-x-3">
            <SkeletonText lines={1} lineHeight="sm" className="w-24" />
          </div>
        </td>
      ))}
    </tr>
  );
});

interface SkeletonOrdersTableProps {
  rows?: number;
  className?: string;
}

export const SkeletonOrdersTable = memo(function SkeletonOrdersTable({
  rows = 5,
  className = ""
}: SkeletonOrdersTableProps) {
  return (
    <SkeletonBase className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-48">
                Order
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-48">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-64">
                Order Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                Payment Method
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                Payment Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">
                Total
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-150">
                {/* Order Column */}
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <SkeletonBox width={40} height={40} rounded="lg" className="bg-emerald-100" />
                    <div className="space-y-1">
                      <SkeletonText lines={1} lineHeight="sm" className="w-24" />
                      <SkeletonText lines={1} lineHeight="sm" className="w-32" />
                      <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                    </div>
                  </div>
                </td>

                {/* Customer Column */}
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <SkeletonAvatar size="sm" />
                    <div className="space-y-1">
                      <SkeletonText lines={1} lineHeight="sm" className="w-20" />
                      <SkeletonText lines={1} lineHeight="sm" className="w-28" />
                    </div>
                  </div>
                </td>

                {/* Order Status Column */}
                <td className="px-6 py-5">
                  <SkeletonBox height={36} className="bg-gray-100" />
                </td>

                {/* Payment Method Column */}
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-2">
                    <SkeletonBox width={8} height={8} rounded="full" className="bg-gray-200" />
                    <SkeletonText lines={1} lineHeight="sm" className="w-12" />
                  </div>
                </td>

                {/* Payment Status Column */}
                <td className="px-6 py-5">
                  <SkeletonBox width={60} height={20} rounded="full" className="bg-emerald-100" />
                </td>

                {/* Total Column */}
                <td className="px-6 py-5">
                  <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                </td>

                {/* Actions Column */}
                <td className="px-6 py-5 text-center">
                  <SkeletonButton size="sm" variant="text" className="w-8 h-8" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonAuditTableProps {
  rows?: number;
  className?: string;
}

export const SkeletonAuditTable = memo(function SkeletonAuditTable({
  rows = 5,
  className = ""
}: SkeletonAuditTableProps) {
  return (
    <SkeletonBase className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Entity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-150">
                <td className="px-6 py-5">
                  <SkeletonText lines={1} lineHeight="sm" className="w-32" />
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <SkeletonAvatar size="sm" />
                    <SkeletonText lines={1} lineHeight="sm" className="w-20" />
                  </div>
                </td>
                <td className="px-6 py-5">
                  <SkeletonBox width={80} height={20} rounded="full" className="bg-blue-100" />
                </td>
                <td className="px-6 py-5">
                  <SkeletonText lines={1} lineHeight="sm" className="w-24" />
                </td>
                <td className="px-6 py-5">
                  <SkeletonText lines={1} lineHeight="sm" className="w-40" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonMenuTableProps {
  rows?: number;
  className?: string;
}

export const SkeletonMenuTable = memo(function SkeletonMenuTable({
  rows = 5,
  className = ""
}: SkeletonMenuTableProps) {
  return (
    <SkeletonBase className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-150">
                <td className="px-6 py-5">
                  <div className="flex items-center space-x-3">
                    <SkeletonBox width={60} height={60} rounded="lg" className="bg-gray-200" />
                    <div className="space-y-1">
                      <SkeletonText lines={1} lineHeight="sm" className="w-32" />
                      <SkeletonText lines={1} lineHeight="sm" className="w-48" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <SkeletonBox width={80} height={20} rounded="full" className="bg-emerald-100" />
                </td>
                <td className="px-6 py-5">
                  <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                </td>
                <td className="px-6 py-5">
                  <SkeletonBox width={60} height={20} rounded="full" className="bg-green-100" />
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="flex justify-center space-x-2">
                    <SkeletonButton size="sm" variant="text" className="w-8 h-8" />
                    <SkeletonButton size="sm" variant="text" className="w-8 h-8" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SkeletonBase>
  );
});

interface SkeletonExpensesTableProps {
  rows?: number;
  className?: string;
}

export const SkeletonExpensesTable = memo(function SkeletonExpensesTable({
  rows = 5,
  className = ""
}: SkeletonExpensesTableProps) {
  return (
    <SkeletonBase className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-150">
                <td className="px-6 py-5">
                  <SkeletonText lines={1} lineHeight="sm" className="w-24" />
                </td>
                <td className="px-6 py-5">
                  <SkeletonText lines={1} lineHeight="sm" className="w-40" />
                </td>
                <td className="px-6 py-5">
                  <SkeletonBox width={80} height={20} rounded="full" className="bg-blue-100" />
                </td>
                <td className="px-6 py-5">
                  <SkeletonText lines={1} lineHeight="sm" className="w-16" />
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="flex justify-center space-x-2">
                    <SkeletonButton size="sm" variant="text" className="w-8 h-8" />
                    <SkeletonButton size="sm" variant="text" className="w-8 h-8" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SkeletonBase>
  );
});
