import React, { useEffect, useState } from 'react';

export default function Library() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '' });

  const loadLibrary = async () => {
    setLoading(true);
    const res = await fetch('/api/audiobooks');
    const data = await res.json();
    setAudiobooks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this audiobook?')) return;
    await fetch(`/api/audiobooks/${id}`, { method: 'DELETE' });
    loadLibrary();
  };

  const handleEdit = (book) => {
    setEditing(book.id);
    setFormData({ title: book.title, author: book.author });
  };

  const handleSave = async (id) => {
    await fetch(`/api/audiobooks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    setEditing(null);
    loadLibrary();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Library</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading your library...</p>
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
                {editing === book.id ? (
                  <>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-gray-900 text-white rounded-md p-1 mb-2"
                    />
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full bg-gray-900 text-white rounded-md p-1 mb-2"
                    />
                    <button
                      onClick={() => handleSave(book.id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm transition mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded-md text-sm transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold text-white truncate">{book.title}</h2>
                    <p className="text-sm text-gray-400 mb-2">{book.author}</p>
                    <p className="text-xs text-gray-500 mb-4">
                      Added: {book.added_at ? new Date(book.added_at).toLocaleDateString() : '—'}
                    </p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleEdit(book)}
                        className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-md text-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm transition"
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
