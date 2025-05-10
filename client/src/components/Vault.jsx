import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { 
  Copy, Eye, EyeOff, Key, LogOut, Plus, Search, 
  Settings, Share2, Shield, Trash2 
} from 'lucide-react';
import Navbar from './Navbar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

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
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white mt-[180px]">Credential Vault</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search credentials..."
              className="px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-800 focus:outline-none focus:border-blue-400"
            />
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
            >
              Add Credential
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'all'
                ? 'bg-blue-400 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'shared'
                ? 'bg-blue-400 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('shared')}
          >
            Shared
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'personal'
                ? 'bg-blue-400 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('personal')}
          >
            Personal
          </button>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCredentials.map((credential) => (
            <div
              key={credential.id}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-400 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{credential.name}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedCredential(credential);
                      setIsShareDialogOpen(true);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-400"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteCredential(credential.id)}
                    className="p-2 text-gray-400 hover:text-red-400"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Username</label>
                  <div className="flex items-center bg-gray-800 rounded-lg p-2">
                    <input
                      type="text"
                      value={credential.username}
                      readOnly
                      className="bg-transparent text-white flex-grow outline-none"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(credential.username)}
                      className="text-gray-400 hover:text-blue-400"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Password</label>
                  <div className="flex items-center bg-gray-800 rounded-lg p-2">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={credential.password}
                      readOnly
                      className="bg-transparent text-white flex-grow outline-none"
                    />
                    <button
                      onClick={() => togglePasswordVisibility(credential.id)}
                      className="text-gray-400 hover:text-blue-400 mr-2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(credential.password)}
                      className="text-gray-400 hover:text-blue-400"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <span className="inline-block px-3 py-1 bg-blue-400/20 text-blue-400 rounded-full text-sm">
                    {credential.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Credential Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add New Credential</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddCredential} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={newCredential.name}
                onChange={(e) => setNewCredential({ ...newCredential, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <input
                type="text"
                value={newCredential.username}
                onChange={(e) => setNewCredential({ ...newCredential, username: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <input
                type="password"
                value={newCredential.password}
                onChange={(e) => setNewCredential({ ...newCredential, password: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select
                value={newCredential.category}
                onChange={(e) => setNewCredential({ ...newCredential, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
              >
                <option value="email">Email</option>
                <option value="financial">Financial</option>
                <option value="social">Social Media</option>
                <option value="developer">Developer</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Notes</label>
              <textarea
                value={newCredential.notes}
                onChange={(e) => setNewCredential({ ...newCredential, notes: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
                required
                rows="3"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsAddDialogOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
              >
                Add Credential
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Share Credential Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Share Credential</DialogTitle>
          </DialogHeader>
          <form onSubmit={confirmShare} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Share with Address</label>
              <input
                type="text"
                value={selectedCredential?.username}
                onChange={(e) => {
                  // Handle address change
                }}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Permissions</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCredential?.shared}
                    onChange={(e) => {
                      // Handle permission change
                    }}
                    className="rounded border-gray-700 text-blue-400 focus:ring-blue-400"
                  />
                  <span className="text-white">View</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCredential?.shared}
                    onChange={(e) => {
                      // Handle permission change
                    }}
                    className="rounded border-gray-700 text-blue-400 focus:ring-blue-400"
                  />
                  <span className="text-white">Edit</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsShareDialogOpen(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500"
              >
                Share
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vault;
