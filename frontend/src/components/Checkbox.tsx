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
  className,
  disabled = false,
}) => {
  return (
    <label 
      className={className} 
      style={{ 
        display: "inline-flex", 
        alignItems: "center", 
        cursor: disabled ? "not-allowed" : "pointer",
        minWidth: "44px",
        minHeight: "44px"
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
        disabled={disabled}
        style={{ 
          marginRight: label ? 8 : 0,
          minWidth: "24px",
          minHeight: "24px",
          cursor: disabled ? "not-allowed" : "pointer"
        }}
      />
      {label && <span>{label}</span>}
    </label>
  );
};

export default Checkbox;
