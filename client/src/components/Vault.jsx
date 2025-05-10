import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { 
  Copy, Eye, EyeOff, Key, LogOut, Plus, Search, 
  Settings, Share2, Shield, Trash2 
} from 'lucide-react';
import Navbar from './Navbar';

// Mock data moved outside component
const mockCredentials = [
  {
    id: "1",
    name: "Personal Email",
    username: "user@example.com",
    password: "password123",
    notes: "My personal email account",
    category: "email",
    dateAdded: "2023-05-15",
    shared: false,
  },
  {
    id: "2",
    name: "GitHub Account",
    username: "devuser",
    password: "github_pass!",
    notes: "Work GitHub account",
    category: "developer",
    dateAdded: "2023-06-20",
    shared: true,
  },
  {
    id: "3",
    name: "Banking Portal",
    username: "bankuser",
    password: "secure_bank_123!",
    notes: "Main bank account",
    category: "financial",
    dateAdded: "2023-07-10",
    shared: false,
  }
];

const Vault = () => {
  const currentAccount = useCurrentAccount();
  const [credentials, setCredentials] = useState(mockCredentials);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [newCredential, setNewCredential] = useState({
    name: '',
    username: '',
    password: '',
    notes: '',
    category: 'other'
  });

  const filteredCredentials = credentials.filter(
    (cred) =>
      cred.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cred.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCredential = () => {
    const newId = (credentials.length + 1).toString();
    setCredentials([
      ...credentials,
      {
        ...newCredential,
        id: newId,
        dateAdded: new Date().toISOString().split('T')[0],
        shared: false,
      },
    ]);
    setNewCredential({
      name: '',
      username: '',
      password: '',
      notes: '',
      category: 'other',
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteCredential = (id) => {
    setCredentials(credentials.filter((cred) => cred.id !== id));
  };

  const togglePasswordVisibility = (id) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShareCredential = (credential) => {
    setSelectedCredential(credential);
    setIsShareDialogOpen(true);
  };

  const confirmShare = () => {
    setCredentials(credentials.map((cred) => 
      cred.id === selectedCredential.id ? { ...cred, shared: true } : cred
    ));
    setIsShareDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mt-[140px]">Credential Vault</h1>
            <p className="text-gray-600">Manage your secure credentials</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search credentials..."
                className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex gap-2 border-b border-gray-200">
            {['all', 'shared', 'recent'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCredentials.map((credential) => (
            <div
              key={credential.id}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">{credential.name}</h3>
                  <p className="text-sm text-gray-500">Added on {credential.dateAdded}</p>
                </div>
                {credential.shared && (
                  <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    Shared
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500">Username</label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-700">{credential.username}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(credential.username)}
                      className="p-1 text-gray-400 hover:text-blue-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Password</label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-700">
                      {showPassword[credential.id] ? credential.password : '••••••••••••'}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => togglePasswordVisibility(credential.id)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        {showPassword[credential.id] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(credential.password)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleShareCredential(credential)}
                  className="px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
                <button
                  onClick={() => handleDeleteCredential(credential.id)}
                  className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {isAddDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Add New Credential</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCredential.name}
                  onChange={(e) => setNewCredential({ ...newCredential, name: e.target.value })}
                  placeholder="e.g., Work Email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCredential.username}
                  onChange={(e) => setNewCredential({ ...newCredential, username: e.target.value })}
                  placeholder="e.g., user@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCredential.password}
                  onChange={(e) => setNewCredential({ ...newCredential, password: e.target.value })}
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCredential.category}
                  onChange={(e) => setNewCredential({ ...newCredential, category: e.target.value })}
                >
                  <option value="email">Email</option>
                  <option value="financial">Financial</option>
                  <option value="social">Social Media</option>
                  <option value="developer">Developer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCredential.notes}
                  onChange={(e) => setNewCredential({ ...newCredential, notes: e.target.value })}
                  placeholder="Add any additional notes here"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddDialogOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCredential}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isShareDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Share Credential</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter recipient's email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Permission Level</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="view">View Only</option>
                  <option value="edit">View & Edit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a message for the recipient"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsShareDialogOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmShare}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vault;
