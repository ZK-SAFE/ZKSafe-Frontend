import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { toast } from 'sonner';

const Create = () => {
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const [isCreating, setIsCreating] = useState(false);

  // Redirect to home if not connected
  if (!currentAccount) {
    toast.error("Please connect your wallet first");
    return <Navigate to="/" replace />;
  }

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      // Add your vault creation logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating contract interaction
      toast.success('Vault created successfully!');
      navigate('/vault');
    } catch (error) {
      toast.error('Failed to create vault');
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl border border-blue-100 p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Create New Vault</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-1">Your Address</h3>
                <p className="font-mono text-gray-600">
                  {currentAccount?.address || 'Not connected'}
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-1">Network</h3>
                <p className="text-gray-600">Sui Testnet</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-900 mb-1">Initial Configuration</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Zero initial balance</li>
                  <li>• Single owner (you)</li>
                  <li>• Standard security settings</li>
                </ul>
              </div>

              <button
                onClick={handleCreate}
                disabled={isCreating || !currentAccount}
                className={`w-full px-6 py-3 bg-blue-600 text-white rounded-lg transition
                  ${isCreating || !currentAccount 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-blue-700'}`}
              >
                {isCreating ? 'Creating...' : 'Create Vault'}
              </button>

              <p className="text-sm text-gray-500 text-center">
                By creating a vault, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create; 