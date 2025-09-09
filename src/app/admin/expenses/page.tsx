"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Check, X, Filter } from "lucide-react";
import { 
  useExpenses, 
  useCreateExpense, 
  useUpdateExpense, 
  useDeleteExpense,
  Expense
} from "@/hooks/useExpenses";
import { ExpenseForm } from "@/components/admin/ExpenseForm";

export default function AdminExpensesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filters, setFilters] = useState<{ category?: string; paid?: boolean }>({});

  const { data: expensesData, isLoading } = useExpenses(filters);
  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();
  const deleteExpense = useDeleteExpense();

  const expenses = expensesData?.expenses || [];

  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      FOOD: "bg-green-100 text-green-800",
      UTILITIES: "bg-blue-100 text-blue-800",
      RENT: "bg-purple-100 text-purple-800",
      SUPPLIES: "bg-yellow-100 text-yellow-800",
      MARKETING: "bg-pink-100 text-pink-800",
      OTHER: "bg-gray-100 text-gray-800",
    };
    return colors[category as keyof typeof colors] || colors.OTHER;
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      FOOD: "Food & Ingredients",
      UTILITIES: "Utilities",
      RENT: "Rent",
      SUPPLIES: "Supplies",
      MARKETING: "Marketing",
      OTHER: "Other",
    };
    return labels[category as keyof typeof labels] || category;
  };

  const handleExpenseSubmit = (data: any) => {
    if (editingExpense) {
      updateExpense.mutate({ id: editingExpense.id, data });
    } else {
      createExpense.mutate(data);
    }
    setShowForm(false);
    setEditingExpense(null);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleDeleteExpense = (expense: Expense) => {
    if (confirm(`Are you sure you want to delete "${expense.description}"?`)) {
      deleteExpense.mutate(expense.id);
    }
  };

  const togglePaidStatus = (expense: Expense) => {
    updateExpense.mutate({ 
      id: expense.id, 
      data: { paid: !expense.paid } 
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidExpenses = expenses.filter(e => e.paid).reduce((sum, expense) => sum + expense.amount, 0);
  const unpaidExpenses = totalExpenses - paidExpenses;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
        <p className="text-gray-600 mt-2">Track and manage your restaurant expenses.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 font-bold">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(totalExpenses)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Paid</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(paidExpenses)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-bold">!</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Unpaid</p>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(unpaidExpenses)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={filters.category || ""}
              onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              <option value="FOOD">Food & Ingredients</option>
              <option value="UTILITIES">Utilities</option>
              <option value="RENT">Rent</option>
              <option value="SUPPLIES">Supplies</option>
              <option value="MARKETING">Marketing</option>
              <option value="OTHER">Other</option>
            </select>

            <select
              value={filters.paid === undefined ? "" : filters.paid.toString()}
              onChange={(e) => {
                const value = e.target.value;
                setFilters({ 
                  ...filters, 
                  paid: value === "" ? undefined : value === "true" 
                });
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="true">Paid</option>
              <option value="false">Unpaid</option>
            </select>

            {(filters.category || filters.paid !== undefined) && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </button>
            )}
          </div>

          <button
            onClick={() => {
              setEditingExpense(null);
              setShowForm(true);
            }}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </button>
        </div>
      </div>

      {/* Expense Form */}
      {showForm && (
        <div className="mb-6">
          <ExpenseForm
            initialData={editingExpense || undefined}
            onSubmit={handleExpenseSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingExpense(null);
            }}
            isLoading={createExpense.isPending || updateExpense.isPending}
            isEditing={!!editingExpense}
          />
        </div>
      )}

      {/* Expenses List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Expenses</h2>
        </div>

        {isLoading ? (
          <div className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        ) : expenses.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No expenses found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {expense.description}
                        </div>
                        {expense.notes && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {expense.notes}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(expense.category)}`}>
                        {getCategoryLabel(expense.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.vendor || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(expense.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => togglePaidStatus(expense)}
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          expense.paid
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {expense.paid ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            Paid
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3 mr-1" />
                            Unpaid
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(expense.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditExpense(expense)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(expense)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
