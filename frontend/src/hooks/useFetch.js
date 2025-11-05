import { useState, useCallback } from "react";

export default function useFetch(baseUrl = "") {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (endpoint, options = {}, isFile = false) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(baseUrl + endpoint, options);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        // Handle file (blob) responses like audiobook downloads
        const data = isFile ? await res.blob() : await res.json();
        return data;
      } catch (err) {
        setError(err.message || "Request failed");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  return { fetchData, loading, error };
}
