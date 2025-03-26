"use client";

import { ReactNode } from "react";

interface ToggleButtonProps {
  id: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export function ToggleButton({
  id,
  isChecked,
  onChange,
  label,
  icon,
  disabled = false,
}: ToggleButtonProps) {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!isChecked);
    }
  };

  return (
    <div className="flex items-center">
      <div
        className="relative inline-block w-10 mr-2 align-middle select-none"
        onClick={handleToggle}
      >
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={`block h-6 rounded-full ${
            disabled ? "bg-gray-300" : "bg-gray-200"
          } peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors duration-200 cursor-pointer`}
        ></div>
        <div
          className={`absolute left-0.5 top-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform duration-200 transform ${
            isChecked ? "translate-x-4" : "translate-x-0"
          } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        ></div>
      </div>
      <label
        htmlFor={id}
        className={`flex items-center text-sm ${
          disabled
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 cursor-pointer"
        }`}
        onClick={handleToggle}
      >
        {icon && <span className="mr-1.5">{icon}</span>}
        {label}
      </label>
    </div>
  );
}
