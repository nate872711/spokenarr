import { useEffect, useState } from "react";
import { api } from "../api";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await api.settings();
      setSettings(data);
      setLoading(false);
    };
    loadSettings();
  }, []);

  if (loading)
    return (
      <p className="text-gray-400 fade-in">Loading settings...</p>
    );

  if (!settings)
    return (
      <p className="text-gray-400 fade-in">Failed to load settings.</p>
    );

  return (
    <div className="fade-in max-w-xl">
      <h1 className="text-3xl font-bold gradient-text mb-6">
        Application Settings
      </h1>

      <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Download Path</span>
          <code className="text-gray-400 text-sm">
            {settings.downloadPath}
          </code>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-300">Auto Download</span>
          <span
            className={`px-2 py-1 rounded-md text-sm ${
              settings.autoDownload
                ? "bg-green-600/20 text-green-400"
                : "bg-gray-700/50 text-gray-400"
            }`}
          >
            {settings.autoDownload ? "Enabled" : "Disabled"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-300">Preferred Source</span>
          <span className="text-gray-400">{settings.preferredSource}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-300">Notifications</span>
          <span
            className={`px-2 py-1 rounded-md text-sm ${
              settings.notifications
                ? "bg-blue-600/20 text-blue-400"
                : "bg-gray-700/50 text-gray-400"
            }`}
          >
            {settings.notifications ? "On" : "Off"}
          </span>
        </div>
      </div>
    </div>
  );
}
