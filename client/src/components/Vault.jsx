import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ConnectButton } from '@mysten/dapp-kit';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, Lock, Key, Clock, Activity } from 'lucide-react';

const Vault = () => {
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(false);

  const handleLockVault = () => {
    setIsLocked(true);
    navigate('/unlock-vault');
  };

  // Example vault data - replace with actual data
  const vaultData = {
    id: "0x4e1e6a1ec45fd6d3e12c9ca960c98cab18674a118aeb3e16fa1764586b07bf56",
    lastUnlocked: "2024-03-20 14:30:00",
    accessCount: 12,
    permissions: ["Minting", "Voting", "DAO Access"]
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

            <div className="bg-gray-700 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Vault Status</h2>
              <div className="flex items-center space-x-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-lg animate-pulse"></div>
                  <div className="relative w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-green-400" />
                  </div>
                </motion.div>
                <p className="text-gray-300">
                  {isLocked ? 'Your vault is locked' : 'Your vault is currently unlocked and ready to use.'}
                </p>
              </div>
            </div>

            {/* Vault Information Box */}
            <div className="bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Vault Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Key className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Vault ID</p>
                      <p className="text-white font-mono text-sm break-all">{vaultData.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Last Unlocked</p>
                      <p className="text-white">{vaultData.lastUnlocked}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Access Count</p>
                      <p className="text-white">{vaultData.accessCount} times</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Permissions</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {vaultData.permissions.map((permission, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-gray-600 rounded-full text-xs text-gray-300"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vault;
