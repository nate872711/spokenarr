import React from "react";
import Button from "./Button";

export interface HeaderProps {
  /** Displayed title text */
  title: string;
  /** Optional subtitle below the main title */
  subtitle?: string;
  /** Called when user clicks “Sign In” */
  onLogin?: () => void;
  /** Called when user clicks “Sign Out” */
  onLogout?: () => void;
  /** Called when user clicks “Sign Up” */
  onCreateAccount?: () => void;
}

/** Application header component used at the top of pages */
export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onLogin,
  onLogout,
  onCreateAccount,
}) => {
  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      <div className="flex gap-3">
        <Button label="Login" onClick={onLogin} />
        <Button label="Sign Up" primary onClick={onCreateAccount} />
        <Button label="Logout" onClick={onLogout} />
      </div>
    </header>
  );
};

export default Header;
