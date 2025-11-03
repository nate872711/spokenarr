import React from "react";
import Header from "./Header";
import Button from "./Button";

export interface PageLayoutProps {
  /** Optional title shown in the Header */
  title?: string;
  /** Optional subtitle under the Header title */
  subtitle?: string;
  /** Main page content (children) */
  children?: React.ReactNode;
}

/** A simple layout structure combining the Header and main content area */
export const PageLayout: React.FC<PageLayoutProps> = ({
  title = "Spokenarr",
  subtitle = "Your voice-powered content platform",
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        title={title}
        subtitle={subtitle}
        onLogin={() => console.log("Login clicked")}
        onCreateAccount={() => console.log("Create Account clicked")}
        onLogout={() => console.log("Logout clicked")}
      />
      <main className="flex-grow p-8">
        {children || (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to Spokenarr
            </h2>
            <p className="text-gray-600 mb-8">
              This is a placeholder for your app content.
            </p>
            <Button label="Get Started" primary />
          </div>
        )}
      </main>
      <footer className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Spokenarr. All rights reserved.
      </footer>
    </div>
  );
};

export default PageLayout;
