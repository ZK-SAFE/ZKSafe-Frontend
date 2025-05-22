import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Lock, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const VaultsList = () => {
  const navigate = useNavigate();
  const [showPasswords, setShowPasswords] = useState({});

  // Example vaults data - replace with actual data from your backend
  const [vaults, setVaults] = useState([
    {
      id: 1,
      username: "Personal Use",
      password: "••••••••",
      hiddenPassword: "password123",
      packageAddress: "0x4e1e6a1ec45fd6d3e12c9ca960c98cab18674a118aeb3e16fa1764586b07bf56",
      argsKey: "[132,24,89,232,77,12,34,145,201,144,111,9,83,199,182,33,44,188,100,72,1,222,173,109,160,255,21,78,77,2,23,7]"
    },
    {
      id: 2,
      username: "Work Use",
      password: "••••••••",
      hiddenPassword: "securepass456",
      packageAddress: "0x4e1e6a1ec45fd6d3e12c9ca960c98cab18674a118aeb3e16fa1764586b07bf56",
      argsKey: "[132,24,89,232,77,12,34,145,201,144,111,9,83,199,182,33,44,188,100,72,1,222,173,109,160,255,21,78,77,2,23,7]"
    }
  ]);

  const togglePassword = (id) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDelete = (id) => {
    setVaults(prev => prev.filter(vault => vault.id !== id));
    toast.success('Vault deleted successfully');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-white"
          >
            Your Vaults
          </motion.h1>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/create-vault')}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Create Vault</span>
          </motion.button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {vaults.map((vault) => (
            <motion.div
              key={vault.id}
              variants={itemVariants}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{vault.username}</h3>
                  </div>
                  <button
                    onClick={() => handleDelete(vault.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Password</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-700 rounded-lg px-3 py-2 text-white">
                        {showPasswords[vault.id] ? vault.hiddenPassword : vault.password}
                      </div>
                      <button
                        onClick={() => togglePassword(vault.id)}
                        className="text-gray-400 hover:text-gray-300"
                      >
                        {showPasswords[vault.id] ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Package Address</label>
                    <div className="bg-gray-700 rounded-lg px-3 py-2">
                      <code className="text-gray-300 text-sm break-all">{vault.packageAddress}</code>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Args Key</label>
                    <div className="bg-gray-700 rounded-lg px-3 py-2">
                      <code className="text-gray-300 text-sm break-all">{vault.argsKey}</code>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default VaultsList; 