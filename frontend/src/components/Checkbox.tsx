import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id?: string;
  className?: string;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  id,
  className = "",
  disabled = false,
}) => {
  return (
    <label 
      className={`inline-flex items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
        disabled={disabled}
        className={`
          w-5 h-5 rounded border-1 border-slate-400 
          bg-transparent appearance-none cursor-pointer
          checked:bg-slate-500 checked:border-slate-500
          relative
          transition-colors duration-200
          ${disabled ? "cursor-not-allowed opacity-50" : ""}
          ${label ? "mr-2" : ""}
        `}
        style={{
          backgroundImage: checked ? `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")` : 'none',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {label && <span className="text-white">{label}</span>}
    </label>
  );
};

export default Checkbox;
