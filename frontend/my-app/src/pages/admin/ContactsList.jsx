import { useState, useEffect } from 'react';
import api from '../../api';
import { FaTrash, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';

export default function ContactsList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts');
      setContacts(res.data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const markRead = async (id) => {
    try {
      await api.patch(`/contacts/${id}/read`);
      fetchContacts();
    } catch (err) { alert('Failed to mark as read.'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contacts/${id}`);
      setContacts(contacts.filter((c) => c.id !== id));
    } catch (err) { alert('Failed to delete.'); }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pn-purple"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white font-poppins">Contact Messages</h1>
        <p className="text-gray-400 mt-1">{contacts.length} messages, {contacts.filter(c => !c.is_read).length} unread</p>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-pn-card rounded-2xl border border-pn-purple/20 p-12 text-center">
          <FaEnvelope className="text-4xl text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div key={c.id} className={`bg-pn-card rounded-2xl border p-6 transition-all duration-300 ${c.is_read ? 'border-pn-purple/10' : 'border-pn-pink/30 shadow-pn-pink-glow'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">
                      {c.first_name} {c.last_name}
                    </h3>
                    {!c.is_read && (
                      <span className="bg-pn-pink/20 text-pn-pink text-xs font-bold px-2 py-0.5 rounded-full">New</span>
                    )}
                  </div>
                  {c.subject && <p className="text-pn-purple font-medium text-sm mb-1">{c.subject}</p>}
                  <p className="text-gray-300 text-sm mb-3">{c.message}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    {c.email && <span>📧 {c.email}</span>}
                    {c.phone && <span>📞 {c.phone}</span>}
                    <span>📅 {new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!c.is_read && (
                    <button onClick={() => markRead(c.id)} title="Mark read" className="p-2.5 rounded-xl border border-pn-purple/20 text-gray-400 hover:text-green-400 hover:border-green-500/50 transition-all">
                      <FaEnvelopeOpen />
                    </button>
                  )}
                  <button onClick={() => handleDelete(c.id)} title="Delete" className="p-2.5 rounded-xl border border-red-500/20 text-gray-400 hover:text-red-400 hover:border-red-500/50 transition-all">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
