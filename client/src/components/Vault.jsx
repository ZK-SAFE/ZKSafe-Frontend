import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { toast } from 'sonner';

const Vault = () => {
  const currentAccount = useCurrentAccount();
  const [vault, setVault] = useState(null); // This would be fetched from your contract
  
  // Redirect to home if not connected
  if (!currentAccount) {
    toast.error("Please connect your wallet first");
    return <Navigate to="/" replace />;
  }

  // Placeholder actions - these would connect to your Sui contract
  const handleDeposit = () => {
    console.log('Deposit action');
  };

  const handleWithdraw = () => {
    console.log('Withdraw action');
  };

  const handleDelete = () => {
    console.log('Delete action');
  };

  const handleTransfer = () => {
    console.log('Transfer action');
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4">
        {!vault ? (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Create Your Vault</h2>
            <p className="text-gray-600 mb-8">Get started by creating your secure vault on Sui.</p>
            <Link
              to="/create"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create Vault
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-blue-100 p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-900">Your Vault</h2>
                <span className="text-sm text-gray-500">ID: {vault?.id}</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">SUI Balance</h3>
                  <p className="text-2xl font-bold text-blue-600">0.00 SUI</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Tokens</h3>
                  <p className="text-gray-600">No tokens found</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={handleDeposit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Deposit
                </button>
                <button
                  onClick={handleWithdraw}
                  className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
                >
                  Withdraw
                </button>
                <button
                  onClick={handleTransfer}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Transfer
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Activity Logs */}
            <div className="bg-white rounded-xl border border-blue-100 p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Activity Logs</h3>
              <div className="space-y-4">
                <p className="text-gray-600 text-center">No activity yet</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vault; 