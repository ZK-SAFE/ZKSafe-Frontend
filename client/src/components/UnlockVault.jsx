import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const UnlockVault = () => {
  const navigate = useNavigate();
  const [packageAddress, setPackageAddress] = useState('');
  const [argsKey, setArgsKey] = useState('');
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = async () => {
    if (!packageAddress || !argsKey) {
      toast.error('Please enter both package address and args key');
      return;
    }

    try {
      setIsUnlocking(true);
      // TODO: Add vault unlocking logic here
      // Example validation (replace with actual logic)
      if (packageAddress === "0x4e1e6a1ec45fd6d3e12c9ca960c98cab18674a118aeb3e16fa1764586b07bf56" &&
          argsKey === "[132,24,89,232,77,12,34,145,201,144,111,9,83,199,182,33,44,188,100,72,1,222,173,109,160,255,21,78,77,2,23,7]") {
        toast.success('Vault unlocked successfully');
        navigate('/vault');
      } else {
        toast.error('Invalid package address or args key');
      }
    } catch (error) {
      toast.error('Failed to unlock vault');
      console.error(error);
    } finally {
      setIsUnlocking(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Unlock Your Vault</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Package Address</label>
              <input
                type="text"
                value={packageAddress}
                onChange={(e) => setPackageAddress(e.target.value)}
                placeholder="Enter package address"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Args Key</label>
              <input
                type="text"
                value={argsKey}
                onChange={(e) => setArgsKey(e.target.value)}
                placeholder="Enter args key"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              />
            </div>

            <button
              onClick={handleUnlock}
              disabled={isUnlocking}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {isUnlocking ? 'Unlocking...' : 'Unlock Vault'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockVault; 