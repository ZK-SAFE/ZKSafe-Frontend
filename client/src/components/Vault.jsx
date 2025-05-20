import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ConnectButton } from '@mysten/dapp-kit';

const Vault = () => {
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(false);

  const handleLockVault = () => {
    setIsLocked(true);
    navigate('/unlock-vault');
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">Your Vault</h1>
              <div className="flex items-center space-x-4">
                <ConnectButton 
                  connectText="Connect Wallet"
                  className="bg-blue-400 hover:bg-blue-500 text-white"
                />
                <button
                  onClick={handleLockVault}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Lock Vault
                </button>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Vault Status</h2>
              <p className="text-gray-300">
                {isLocked ? 'Your vault is locked' : 'Your vault is currently unlocked and ready to use.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vault;
