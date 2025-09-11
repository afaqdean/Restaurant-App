import { FileText } from "lucide-react";
import { FormField } from "@/components/ui";

interface OrderNotesSectionProps {
  notes: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function OrderNotesSection({ notes, onInputChange }: OrderNotesSectionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
          <FileText className="w-4 h-4 text-emerald-600" />
        </div>
        Special Instructions
      </h3>
      
      <FormField
        label="Delivery Notes (Optional)"
        name="notes"
        type="textarea"
        value={notes}
        onChange={onInputChange}
        placeholder="Any special delivery instructions or notes..."
        rows={4}
      />
    </div>
  );
}
