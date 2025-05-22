import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Lock, Copy, CheckCircle2 } from 'lucide-react';

const SaveKeys = () => {
  const navigate = useNavigate();
  const [hasSaved, setHasSaved] = useState(false);
  const [copiedPackage, setCopiedPackage] = useState(false);
  const [copiedArgs, setCopiedArgs] = useState(false);
  
  // These would be populated from the vault creation process
  const packageAddress = "0x4e1e6a1ec45fd6d3e12c9ca960c98cab18674a118aeb3e16fa1764586b07bf56";
  const argsKey = "[132,24,89,232,77,12,34,145,201,144,111,9,83,199,182,33,44,188,100,72,1,222,173,109,160,255,21,78,77,2,23,7]";

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'package') {
      setCopiedPackage(true);
      setTimeout(() => setCopiedPackage(false), 2000);
    } else {
      setCopiedArgs(true);
      setTimeout(() => setCopiedArgs(false), 2000);
    }
  };

  const handleContinue = () => {
    if (!hasSaved) {
      toast.error('Please confirm that you have saved your keys');
      return;
    }
    navigate('/vault');
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white text-center mb-6"
          >
            Save Your Keys
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-700/50 p-6 rounded-lg mb-8 border border-gray-600"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">!</span>
              </div>
              <p className="text-red-400 font-semibold">IMPORTANT: Save these keys securely</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-300">Package Address</label>
                  <button
                    onClick={() => handleCopy(packageAddress, 'package')}
                    className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                  >
                    {copiedPackage ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <code className="text-gray-300 font-mono break-all">{packageAddress}</code>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-300">Args Key</label>
                  <button
                    onClick={() => handleCopy(argsKey, 'args')}
                    className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                  >
                    {copiedArgs ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
                  <code className="text-gray-300 font-mono break-all">{argsKey}</code>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center mb-8 p-4 bg-gray-700/30 rounded-lg border border-gray-600"
          >
            <input
              type="checkbox"
              id="saved"
              checked={hasSaved}
              onChange={(e) => setHasSaved(e.target.checked)}
              className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-400"
            />
            <label htmlFor="saved" className="ml-3 text-gray-300">
              I have saved these keys securely and understand that I will need them to unlock my vault
            </label>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            onClick={handleContinue}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Continue to Vault
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default SaveKeys; 