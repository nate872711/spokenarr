export default function Settings() {
  return (
    <div className="fade-in max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold gradient-text mb-6">Settings</h1>
      <p className="text-gray-400 mb-8">
        Configure your download directories, indexers, and metadata sources.
      </p>

      <form className="space-y-6 bg-gray-900/70 border border-gray-800 p-6 rounded-2xl">
        <div>
          <label className="block mb-2 font-medium">Library Path</label>
          <input
            type="text"
            placeholder="/audiobooks"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-400 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Download Source</label>
          <select className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-400 outline-none">
            <option>AudiobookBay</option>
            <option>LibriVox</option>
            <option>Custom RSS Feed</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Save Settings
        </button>
      </form>
    </div>
  );
}
