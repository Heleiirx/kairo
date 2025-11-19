import { useState } from "react";

interface FloatingInputProps {
  label: string;
  type: string;
  name?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function FloatingInput({ label, type, name, id, value: externalValue, onChange, required }: FloatingInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const inputId = id || `input-${name}`;
  const inputName = name || id || '';
  
  // Use external value if provided, otherwise use internal state
  const value = externalValue !== undefined ? externalValue : internalValue;
  const isControlled = externalValue !== undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled && onChange) {
      onChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
  };

  return (
    <div className="relative min-w-[200px] w-full group">
      {/* Input */}
      <input
        id={inputId}
        type={type}
        name={inputName}
        required={required}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder=" "
        className="peer w-full border-0 border-b border-white bg-transparent py-2 px-1 text-base text-white placeholder-transparent focus:outline-none focus:border-white"
      />

      {/* Label */}
      <label
        htmlFor={inputId}
        className={`absolute left-1 transition-all text-white opacity-60
          ${value
            ? "top-[-1rem] text-sm"
            : "top-2 text-base"} 
          peer-focus:top-[-1rem] peer-focus:text-sm`}
      >
        {label}
      </label>

      {/* Bar animation */}
      <span className="absolute left-0 bottom-0 w-full h-0.5 transition-transform origin-center" />

      {/* Highlight animation */}
      <span className="absolute top-1/4 left-0 h-[60%] w-[100px] opacity-50 pointer-events-none hidden peer-focus:inline-block" />
    </div>
  );
}