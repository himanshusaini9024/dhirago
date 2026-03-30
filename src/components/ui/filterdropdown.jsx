const FilterDropdown = ({ label, children }) => {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 hover:text-black">
        {label}
        <span className="text-xs">▾</span>
      </button>

      <div className="absolute hidden group-hover:block bg-white border shadow-md mt-3 z-50 min-w-[200px]">
        <div className="p-4 max-h-[250px] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;

export const CheckboxItem = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer mb-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-black"
      />
      {label}
    </label>
  );
};