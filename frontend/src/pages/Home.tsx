export default function Home() {
  return (
    <div className="p-8 text-white space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Spokenarr</h1>
      <p className="text-gray-300">
        Manage, download, and organize your audiobook collection.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">Recently Added</div>
        <div className="card">Active Downloads</div>
        <div className="card">Library Summary</div>
      </div>
    </div>
  );
}
