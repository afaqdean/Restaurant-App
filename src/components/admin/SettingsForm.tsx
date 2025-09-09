import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Clock, CreditCard, Building, DollarSign } from "lucide-react";
import { Settings } from "@/hooks/useSettings";

const settingsSchema = z.object({
  // Business Information
  businessName: z.string().min(1, "Business name is required"),
  businessAddress: z.string().optional(),
  businessPhone: z.string().optional(),
  businessEmail: z.string().email("Invalid email").optional(),
  businessWebsite: z.string().url("Invalid URL").optional(),
  
  // Tax and Fees
  taxRate: z.number().min(0).max(100, "Tax rate cannot exceed 100%"),
  serviceFee: z.number().min(0).max(100, "Service fee cannot exceed 100%"),
  currency: z.string().min(1, "Currency is required"),
  
  // Stripe Configuration
  stripePublishableKey: z.string().optional(),
  stripeSecretKey: z.string().optional(),
  stripeWebhookSecret: z.string().optional(),
  
  // Other Settings
  orderPrefix: z.string().optional(),
  autoAcceptOrders: z.boolean().default(false),
  requireCustomerInfo: z.boolean().default(true),
});

interface SettingsFormProps {
  initialData?: Settings;
  onSubmit: (data: Settings) => void;
  isLoading?: boolean;
}

export function SettingsForm({ 
  initialData, 
  onSubmit, 
  isLoading = false 
}: SettingsFormProps) {
  const [activeTab, setActiveTab] = useState<"business" | "taxes" | "stripe" | "general">("business");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      businessName: initialData?.businessName || "",
      businessAddress: initialData?.businessAddress || "",
      businessPhone: initialData?.businessPhone || "",
      businessEmail: initialData?.businessEmail || "",
      businessWebsite: initialData?.businessWebsite || "",
      taxRate: initialData?.taxRate || 0,
      serviceFee: initialData?.serviceFee || 0,
      currency: initialData?.currency || "USD",
      stripePublishableKey: initialData?.stripePublishableKey || "",
      stripeSecretKey: initialData?.stripeSecretKey || "",
      stripeWebhookSecret: initialData?.stripeWebhookSecret || "",
      orderPrefix: initialData?.orderPrefix || "ORD",
      autoAcceptOrders: initialData?.autoAcceptOrders || false,
      requireCustomerInfo: initialData?.requireCustomerInfo !== false,
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  const tabs = [
    { id: "business", label: "Business Info", icon: Building },
    { id: "taxes", label: "Taxes & Fees", icon: DollarSign },
    { id: "stripe", label: "Stripe Config", icon: CreditCard },
    { id: "general", label: "General", icon: Clock },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6">
        {/* Business Information Tab */}
        {activeTab === "business" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Business Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <input
                  {...register("businessName")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Restaurant Name"
                />
                {errors.businessName && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Phone
                </label>
                <input
                  {...register("businessPhone")}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Email
                </label>
                <input
                  {...register("businessEmail")}
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="info@restaurant.com"
                />
                {errors.businessEmail && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessEmail.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  {...register("businessWebsite")}
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://restaurant.com"
                />
                {errors.businessWebsite && (
                  <p className="text-red-500 text-sm mt-1">{errors.businessWebsite.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Address
              </label>
              <textarea
                {...register("businessAddress")}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123 Main Street, City, State 12345"
              />
            </div>
          </div>
        )}

        {/* Taxes & Fees Tab */}
        {activeTab === "taxes" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Taxes & Fees</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  {...register("taxRate", { valueAsNumber: true })}
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="8.5"
                />
                {errors.taxRate && (
                  <p className="text-red-500 text-sm mt-1">{errors.taxRate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Fee (%)
                </label>
                <input
                  {...register("serviceFee", { valueAsNumber: true })}
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="3.0"
                />
                {errors.serviceFee && (
                  <p className="text-red-500 text-sm mt-1">{errors.serviceFee.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency *
                </label>
                <select
                  {...register("currency")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
                {errors.currency && (
                  <p className="text-red-500 text-sm mt-1">{errors.currency.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stripe Configuration Tab */}
        {activeTab === "stripe" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Stripe Configuration</h3>
            <p className="text-sm text-gray-600">
              Configure your Stripe payment processing settings. These are used for card payments.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Publishable Key
                </label>
                <input
                  {...register("stripePublishableKey")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="pk_test_..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secret Key
                </label>
                <input
                  {...register("stripeSecretKey")}
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="sk_test_..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Webhook Secret
                </label>
                <input
                  {...register("stripeWebhookSecret")}
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="whsec_..."
                />
              </div>
            </div>
          </div>
        )}

        {/* General Settings Tab */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Prefix
                </label>
                <input
                  {...register("orderPrefix")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ORD"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Prefix for order numbers (e.g., ORD-20240101-001)
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    {...register("autoAcceptOrders")}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Auto-accept orders
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    {...register("requireCustomerInfo")}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Require customer information for orders
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
