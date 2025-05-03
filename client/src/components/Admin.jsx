import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { toast } from 'sonner';

const Admin = () => {
  const currentAccount = useCurrentAccount();
  const [selectedVault, setSelectedVault] = useState(null);
  
  // Redirect to home if not connected
  if (!currentAccount) {
    toast.error("Please connect your wallet first");
    return <Navigate to="/" replace />;
  }

  // Placeholder data - would be fetched from your contract
  const vaults = [
    { id: '1', owner: '0x123...abc', balance: '10.5 SUI', status: 'active' },
    { id: '2', owner: '0x456...def', balance: '5.2 SUI', status: 'frozen' },
  ];

  // Check if current user is admin
  const isAdmin = currentAccount?.address === 'YOUR_ADMIN_ADDRESS';

  if (!isAdmin) {
    toast.error("Access denied: Admin only");
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Admin Dashboard</h2>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Vaults</h3>
              <p className="text-3xl font-bold text-blue-600">{vaults.length}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Active Vaults</h3>
              <p className="text-3xl font-bold text-blue-600">
                {vaults.filter(v => v.status === 'active').length}
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Frozen Vaults</h3>
              <p className="text-3xl font-bold text-blue-600">
                {vaults.filter(v => v.status === 'frozen').length}
              </p>
            </div>
          </div>

          {/* Vaults Table */}
          <div className="bg-white rounded-xl border border-blue-100 p-6 mb-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4">All Vaults</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-100">
                    <th className="text-left py-3 px-4 text-blue-900">Vault ID</th>
                    <th className="text-left py-3 px-4 text-blue-900">Owner</th>
                    <th className="text-left py-3 px-4 text-blue-900">Balance</th>
                    <th className="text-left py-3 px-4 text-blue-900">Status</th>
                    <th className="text-left py-3 px-4 text-blue-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vaults.map(vault => (
                    <tr key={vault.id} className="border-b border-blue-50">
                      <td className="py-3 px-4 font-mono text-gray-600">{vault.id}</td>
                      <td className="py-3 px-4 font-mono text-gray-600">{vault.owner}</td>
                      <td className="py-3 px-4 text-gray-600">{vault.balance}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs
                          ${vault.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'}`}>
                          {vault.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => setSelectedVault(vault)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Emergency Tools */}
          <div className="bg-white rounded-xl border border-blue-100 p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Emergency Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                Force Delete Vault
              </button>
              <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                Freeze Vault
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Verify zkProofs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 