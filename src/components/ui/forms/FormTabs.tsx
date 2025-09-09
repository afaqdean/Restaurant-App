import { ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  icon: ReactNode;
}

interface FormTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function FormTabs({ tabs, activeTab, onTabChange, className = "" }: FormTabsProps) {
  return (
    <div className={`flex space-x-1 bg-gray-100 p-1 rounded-lg ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${
            activeTab === tab.id 
              ? 'bg-white shadow text-emerald-600' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
