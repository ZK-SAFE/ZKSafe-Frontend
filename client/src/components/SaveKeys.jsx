import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SaveKeys = () => {
  const navigate = useNavigate();
  const [hasSaved, setHasSaved] = useState(false);
  
  // These would be populated from the vault creation process
  const packageAddress = "0x4e1e6a1ec45fd6d3e12c9ca960c98cab18674a118aeb3e16fa1764586b07bf56"; // Example package address
  const argsKey = "[132,24,89,232,77,12,34,145,201,144,111,9,83,199,182,33,44,188,100,72,1,222,173,109,160,255,21,78,77,2,23,7]"; // Example args key

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
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Save Your Keys</h1>
          <div className="bg-gray-700 p-4 rounded-lg mb-6">
            <p className="text-red-400 mb-4 font-semibold">⚠️ IMPORTANT: Save these keys securely. You will need them to unlock your vault.</p>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Package Address:</label>
              <div className="bg-gray-600 p-3 rounded break-all text-white font-mono">
                {packageAddress}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Args Key:</label>
              <div className="bg-gray-600 p-3 rounded break-all text-white font-mono">
                {argsKey}
              </div>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="saved"
              checked={hasSaved}
              onChange={(e) => setHasSaved(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="saved" className="text-gray-300">
              I have saved these keys securely
            </label>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            Continue to Vault
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveKeys; 