import React, { useState, useEffect } from 'react';

export default function Discover() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    cover_url: '',
  });
  const [uploading, setUploading] = useState(false);

  const fetchAudiobooks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/audiobooks');
      const data = await res.json();
      setAudiobooks(data);
    } catch (err) {
      console.error('Failed to fetch audiobooks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudiobooks();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      const res = await fetch('/api/upload-cover', {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      if (res.ok && data.cover_url) {
        setFormData((prev) => ({ ...prev, cover_url: data.cover_url }));
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/audiobooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ title: '', author: '', cover_url: '' });
        setShowModal(false);
        fetchAudiobooks();
      } else {
        const err = await res.json();
        alert(`Failed to add audiobook: ${err.detail || 'Unknown error'}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Discover Audiobooks</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition font-semibold"
        >
          + Add Audiobook
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : audiobooks.length === 0 ? (
        <p className="text-center text-gray-400">No audiobooks yet. Add one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiobooks.map((book) => (
            <div
              key={book.id}
              className="bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <img
                src={book.cover_url || '/assets/placeholder.png'}
                alt={book.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-400">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-96 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-center">Add New Audiobook</h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full p-2 mb-3 rounded-md bg-gray-800 text-white"
              />

              <label className="block text-sm mb-1">Author</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                className="w-full p-2 mb-3 rounded-md bg-gray-800 text-white"
              />

              <label className="block text-sm mb-1">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full p-2 mb-4 text-gray-300"
              />
              {uploading && <p className="text-xs text-gray-400 mb-2">Uploading...</p>}
              {formData.cover_url && (
                <img
                  src={formData.cover_url}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-md mb-3 border border-gray-700"
                />
              )}

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md font-semibold"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
