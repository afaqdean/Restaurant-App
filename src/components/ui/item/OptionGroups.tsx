import { formatPrice } from "@/lib/utils/formatting";
import { MenuItem } from "@/types/menu";

interface OptionGroupsProps {
  optionGroups: MenuItem['optionGroups'];
  selectedOptions: { optionId: string; groupId: string }[];
  onOptionChange: (groupId: string, optionId: string, isMultiple: boolean) => void;
}

export function OptionGroups({ optionGroups, selectedOptions, onOptionChange }: OptionGroupsProps) {
  const isOptionSelected = (groupId: string, optionId: string) => {
    return selectedOptions.some(opt => opt.groupId === groupId && opt.optionId === optionId);
  };

  if (!optionGroups || optionGroups.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-gray-900 flex items-center">
        <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center mr-2">
          <span className="text-emerald-600 text-sm">⚙️</span>
        </div>
        Customizations
      </h4>
      {optionGroups.map((group) => (
        <div key={group.id} className="bg-gray-50 rounded-xl p-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {group.name}
            {group.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className="space-y-3">
            {group.options.map((option) => (
              <label key={option.id} className="flex items-center space-x-3 cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200">
                <input
                  type={group.multiple ? "checkbox" : "radio"}
                  name={group.id}
                  checked={isOptionSelected(group.id, option.id)}
                  onChange={() => onOptionChange(group.id, option.id, group.multiple)}
                  className="text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <div className="flex-1 flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{option.name}</span>
                  {option.price > 0 && (
                    <span className="text-sm font-bold text-emerald-600">
                      +{formatPrice(option.price)}
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
