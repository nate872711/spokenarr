// src/pwa-updater.js
import { useEffect, useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

export default function PWAUpdater() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (offlineReady || needRefresh) setShow(true);
  }, [offlineReady, needRefresh]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-gray-800/90 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border border-blue-500/50">
      {offlineReady ? (
        <span>✅ App ready to work offline!</span>
      ) : (
        <span>🔄 New version available</span>
      )}
      {needRefresh && (
        <button
          onClick={() => {
            updateServiceWorker(true);
            setShow(false);
          }}
          className="ml-3 px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition"
        >
          Refresh
        </button>
      )}
      <button
        onClick={() => setShow(false)}
        className="ml-2 text-gray-300 hover:text-white"
      >
        ✖
      </button>
    </div>
  );
}
