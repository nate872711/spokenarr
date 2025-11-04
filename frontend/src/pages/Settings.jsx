export default function Settings() {
  return (
    <div className="p-8 text-white space-y-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="grid gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Library Paths</h2>
          <p className="text-gray-400">Configure where your audiobooks are stored.</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Download Sources</h2>
          <p className="text-gray-400">Add or manage audiobook providers (e.g. AudiobookBay).</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Metadata Settings</h2>
          <p className="text-gray-400">Choose how metadata is fetched and updated.</p>
        </div>
      </div>
    </div>
  );
}
