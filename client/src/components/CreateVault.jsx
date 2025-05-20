import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreateVault = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [address, setAddress] = useState('');

  const handleCreateVault = async () => {
    if (!address.trim()) {
      toast.error('Please enter an address');
      return;
    }

    try {
      setIsCreating(true);
      // TODO: Add vault creation logic here
      // After successful creation, navigate to save keys page
      navigate('/save-keys');
    } catch (error) {
      toast.error('Failed to create vault');
      console.error(error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">Create Your Vault</h1>
          <p className="text-gray-300 mb-8">
            Enter your address to create a secure vault.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-400"
              />
            </div>

            <button
              onClick={handleCreateVault}
              disabled={isCreating}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {isCreating ? 'Creating Vault...' : 'Create Vault'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVault; 