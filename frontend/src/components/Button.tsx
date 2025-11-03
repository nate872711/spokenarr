import React from "react";

export interface ButtonProps {
  /** Text label displayed on the button */
  label: string;
  /** Whether this is the primary (accent) button style */
  primary?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional custom CSS class names */
  className?: string;
}

/**
 * A simple, reusable button component styled for consistency
 * across your application.
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  primary = false,
  onClick,
  className = "",
}) => {
  const mode = primary
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-900";

  return (
    <button
      onClick={onClick}
      className={`${mode} font-semibold px-4 py-2 rounded-md shadow-sm transition ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
