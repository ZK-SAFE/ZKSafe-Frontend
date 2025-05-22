import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const CreateVault = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [address, setAddress] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        if (animationStep < 2) {
          setAnimationStep(prev => prev + 1);
        } else {
          navigate('/save-keys');
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation, animationStep, navigate]);

  const handleCreateVault = async () => {
    if (!address.trim()) {
      toast.error('Please enter an address');
      return;
    }

    try {
      setIsCreating(true);
      setShowAnimation(true);
    } catch (error) {
      toast.error('Failed to create vault');
      console.error(error);
      setIsCreating(false);
      setShowAnimation(false);
    }
  };

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-6"
          >
            Create Your Vault
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 mb-8"
          >
            Enter your address to create a secure vault.
          </motion.p>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-gray-300 mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              />
            </motion.div>

            <AnimatePresence>
              {showAnimation && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={animationVariants}
                  className="mt-8 space-y-4"
                >
                  {animationStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-blue-500/20 p-4 rounded-lg border border-blue-500"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white">1</span>
                        </div>
                        <div>
                          <h3 className="text-blue-400 font-semibold">Generating Vault</h3>
                          <p className="text-gray-300">Creating secure vault structure...</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {animationStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-purple-500/20 p-4 rounded-lg border border-purple-500"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                          <span className="text-white">2</span>
                        </div>
                        <div>
                          <h3 className="text-purple-400 font-semibold">Encrypting Data</h3>
                          <p className="text-gray-300">Securing your vault contents...</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {animationStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-green-500/20 p-4 rounded-lg border border-green-500"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                          <span className="text-white">3</span>
                        </div>
                        <div>
                          <h3 className="text-green-400 font-semibold">Vault Created!</h3>
                          <p className="text-gray-300">Your vault is ready. Saving keys...</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={handleCreateVault}
              disabled={isCreating}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {isCreating ? 'Creating Vault...' : 'Create Vault'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVault; 