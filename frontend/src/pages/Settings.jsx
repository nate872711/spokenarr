// frontend/src/pages/Settings.jsx
import React, { useEffect, useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    downloadPath: "",
    autoDownload: false,
    notifications: false,
    preferredSource: "",
  });

  useEffect(() => {
    // ✅ Use Storybook mock data if present
    if (window.mockSettings) {
      setSettings(window.mockSettings);
      return;
    }

    // ✅ Otherwise fetch from API
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("API not available");
        const data = await res.json();
        setSettings(data);
      } catch {
        // Default fallback for offline mode
        setSettings({
          downloadPath: "/app/audio",
          autoDownload: true,
          notifications: true,
          preferredSource: "AudiobookBay",
        });
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-1">Download Path</label>
          <input
            type="text"
            value={settings.downloadPath}
            readOnly
            className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300">Auto Download</span>
          <input
            type="checkbox"
            checked={settings.autoDownload}
            readOnly
            className="accent-purple-500 h-5 w-5"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300">Notifications</span>
          <input
            type="checkbox"
            checked={settings.notifications}
            readOnly
            className="accent-blue-500 h-5 w-5"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Preferred Source</label>
          <input
            type="text"
            value={settings.preferredSource}
            readOnly
            className="w-full bg-gray-800 rounded-lg p-2 border border-gray-700"
          />
        </div>
      </div>
    </div>
  );
}
