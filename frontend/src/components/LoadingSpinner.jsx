export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a]">
      <img
        src="/assets/spinner.png"
        alt="Loading..."
        className="w-16 h-16 animate-spin-slow opacity-90"
      />
    </div>
  );
}
