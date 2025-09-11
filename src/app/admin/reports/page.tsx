"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign, CreditCard, Banknote, BarChart3, ShoppingCart } from "lucide-react";
import { useReports, downloadCSVReport } from "@/hooks/useReports";
import { PageLoadingState, PageErrorState } from "@/components/ui/StandardStates";
import { SkeletonAdminReportsPage } from "@/components/ui/skeleton";

export default function AdminReportsPage() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  
  const { data, isLoading, error } = useReports(startDate || undefined, endDate || undefined);

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const handleDownloadCSV = () => {
    downloadCSVReport(startDate || undefined, endDate || undefined);
  };

  const setDateRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  if (isLoading) {
    return <SkeletonAdminReportsPage />;
  }

  if (error) {
    return (
      <PageErrorState 
        title="Error Loading Reports"
        message="Failed to load reports. Please try again." 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  const summary = data?.summary;
  const dailyData = data?.dailyData || [];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8" data-aos="fade-up">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Reports</h1>
        <p className="text-lg text-gray-600">View your restaurant's performance and analytics.</p>
      </div>

      {/* Financial Reports Section */}
      <div className="mb-8" data-aos="fade-up" data-aos-delay="100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial Reports</h2>
        <p className="text-gray-600">View your restaurant's financial performance and analytics.</p>
      </div>

      {/* Date Range Controls */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8" data-aos="fade-up" data-aos-delay="200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Date Range:</span>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setDateRange(7)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Last 7 days
              </button>
              <button
                onClick={() => setDateRange(30)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Last 30 days
              </button>
              <button
                onClick={() => setDateRange(90)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Last 90 days
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">From:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">To:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>

            <button
              onClick={handleDownloadCSV}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-xl hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-aos="fade-up" data-aos-delay="300">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                {summary ? formatPrice(summary.totalRevenue) : "$0.00"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">
                {summary ? formatPrice(summary.totalExpenses) : "$0.00"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                summary && summary.netProfit >= 0 ? "bg-green-100" : "bg-red-100"
              }`}>
                <TrendingUp className={`w-4 h-4 ${
                  summary && summary.netProfit >= 0 ? "text-green-600" : "text-red-600"
                }`} />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Net Profit</p>
              <p className={`text-2xl font-bold ${
                summary && summary.netProfit >= 0 ? "text-green-600" : "text-red-600"
              }`}>
                {summary ? formatPrice(summary.netProfit) : "$0.00"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">📊</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {summary ? summary.totalOrders : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" data-aos="fade-up" data-aos-delay="400">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Revenue</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Card Payments</p>
                  <p className="text-xs text-gray-500">{summary?.stripeOrders || 0} orders</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {summary ? formatPrice(summary.stripeRevenue) : "$0.00"}
                </p>
                <p className="text-xs text-gray-500">
                  {summary && summary.totalRevenue > 0 
                    ? `${((summary.stripeRevenue / summary.totalRevenue) * 100).toFixed(1)}%`
                    : "0%"
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Banknote className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">{summary?.codOrders || 0} orders</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {summary ? formatPrice(summary.codRevenue) : "$0.00"}
                </p>
                <p className="text-xs text-gray-500">
                  {summary && summary.totalRevenue > 0 
                    ? `${((summary.codRevenue / summary.totalRevenue) * 100).toFixed(1)}%`
                    : "0%"
                  }
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="flex h-2 rounded-full">
                <div 
                  className="bg-blue-500 h-2 rounded-l-full" 
                  style={{ 
                    width: summary && summary.totalRevenue > 0 
                      ? `${(summary.stripeRevenue / summary.totalRevenue) * 100}%` 
                      : "0%" 
                  }}
                />
                <div 
                  className="bg-green-500 h-2 rounded-r-full" 
                  style={{ 
                    width: summary && summary.totalRevenue > 0 
                      ? `${(summary.codRevenue / summary.totalRevenue) * 100}%` 
                      : "0%" 
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Performance</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {dailyData.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No data available for the selected period.</p>
            ) : (
              dailyData.map((day) => (
                <div key={day.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(day.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">{day.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatPrice(day.revenue)}
                    </p>
                    <p className={`text-xs ${
                      day.netProfit >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {day.netProfit >= 0 ? "+" : ""}{formatPrice(day.netProfit)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
