import { useState } from "react";

export default function FloatingInput({
  label,
  type = "text",
  name,
}: {
  label: string;
  type?: string;
  name?: string;
}) {
  const inputId = `input-${name}`;
  const [value, setValue] = useState("");

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative w-[200px] group">
      {/* Input */}
      <input
        id={inputId}
        type={type}
        name={name}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
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