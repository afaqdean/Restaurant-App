import { User } from "lucide-react";
import { FormField } from "@/components/ui";

interface CustomerInfoSectionProps {
  formData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function CustomerInfoSection({ formData, onInputChange }: CustomerInfoSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
          <User className="w-4 h-4 text-emerald-600" />
        </div>
        Customer Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          name="customerName"
          value={formData.customerName}
          onChange={onInputChange}
          placeholder="Enter your full name"
          required
        />
        
        <FormField
          label="Email Address"
          name="customerEmail"
          type="email"
          value={formData.customerEmail}
          onChange={onInputChange}
          placeholder="Enter your email"
          required
        />
      </div>
      
      <FormField
        label="Phone Number"
        name="customerPhone"
        type="tel"
        value={formData.customerPhone}
        onChange={onInputChange}
        placeholder="Enter your phone number"
        required
      />
    </div>
  );
}
