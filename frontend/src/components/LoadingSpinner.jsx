export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-transparent">
      <img
        src="/assets/spinner.png"
        alt="Loading..."
        className="w-16 h-16 animate-spin-slow opacity-80 drop-shadow-lg"
      />
    </div>
  );
}
