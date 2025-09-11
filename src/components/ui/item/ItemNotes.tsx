interface ItemNotesProps {
  notes: string;
  onNotesChange: (notes: string) => void;
  placeholder?: string;
}

export function ItemNotes({ 
  notes, 
  onNotesChange, 
  placeholder = "e.g., No pickles, Extra spicy, Well done" 
}: ItemNotesProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Special Instructions
      </label>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
      />
    </div>
  );
}
