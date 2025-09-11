import { Receipt } from "lucide-react";
import { InfoCard } from "@/components/ui/cards";

interface CustomerInfoCardProps {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
}

export function CustomerInfoCard({ 
  customerName, 
  customerEmail, 
  customerPhone, 
  notes 
}: CustomerInfoCardProps) {
  const items = [
    { label: "Name", value: customerName },
    { label: "Email", value: customerEmail },
    { label: "Phone", value: customerPhone },
    ...(notes ? [{ label: "Special Instructions", value: notes, showBorder: false }] : [])
  ];

  return (
    <InfoCard
      title="Customer Information"
      icon={<Receipt className="w-4 h-4 text-emerald-600" />}
      items={items}
    />
  );
}
