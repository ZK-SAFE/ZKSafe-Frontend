import { useState } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { Lock, Unlock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Navbar from './Navbar';

const Vault = () => {
  const currentAccount = useCurrentAccount();
  const [currentStep, setCurrentStep] = useState(1);
  const [vaultAddress, setVaultAddress] = useState('');
  const [checkVaultAddress, setCheckVaultAddress] = useState('');
  const [unlockVaultAddress, setUnlockVaultAddress] = useState('');
  const [verifyVaultAddress, setVerifyVaultAddress] = useState('');
  const [isLocked, setIsLocked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const steps = [
    {
      title: 'Create Vault',
      description: 'Create a new vault by providing your address',
      icon: <Lock className="w-8 h-8" />,
    },
    {
      title: 'Check Vault Status',
      description: 'Verify that your vault is locked',
      icon: <Lock className="w-8 h-8" />,
    },
    {
      title: 'Unlock Vault',
      description: 'Provide arguments to unlock your vault',
      icon: <Unlock className="w-8 h-8" />,
    },
    {
      title: 'Verify Unlock',
      description: 'Confirm that your vault is unlocked',
      icon: <Unlock className="w-8 h-8" />,
    },
  ];

  const handleCreateVault = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Here you would integrate with Sui CLI command
      // sui client call --package 0x4e1e6a1ec45fd6d3e12c9ca960c98cab18674a118aeb3e16fa1764586b07bf56 --module vault --function create --gas-budget 10000000
      setCurrentStep(2);
    } catch (err) {
      setError('Failed to create vault');
    }
    setIsLoading(false);
  };

  const handleCheckVaultStatus = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Here you would integrate with Sui CLI command
      // sui client object 0x4e1e6a1ec45fd6d3e12c9ca960c98cab18674a118aeb3e16fa1764586b07bf56
      setCurrentStep(3);
    } catch (err) {
      setError('Failed to check vault status');
    }
    setIsLoading(false);
  };

  const handleUnlockVault = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Here you would integrate with Sui CLI command
      // sui client call --package 0x4e1e6a1ec45fd6d3e12c9ca960c98cab18674a118aeb3e16fa1764586b07bf56 --module vault --function unlock --args 0x62a44996b11c08c7df3c8ce515c902cf1d1baa535c3610abe0069d5382b36713 --args '[132,24,89,232,77,12,34,145,201,144,111,9,83,199,182,33,44,188,100,72,1,222,173,109,160,255,21,78,77,2,23,7]' --gas-budget 10000000
      setCurrentStep(4);
    } catch (err) {
      setError('Failed to unlock vault');
    }
    setIsLoading(false);
  };

  const handleVerifyUnlock = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Here you would integrate with Sui CLI command
      // sui client object 0x62a44996b11c08c7df3c8ce515c902cf1d1baa535c3610abe0069d5382b36713
      setIsLocked(false);
    } catch (err) {
      setError('Failed to verify unlock status');
    }
    setIsLoading(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-gray-800 transition-all duration-500 ${isLocked ? 'border-2 border-red-500' : 'border-2 border-green-500'}`}>
                <Lock className={`w-12 h-12 ${isLocked ? 'text-red-500' : 'text-green-500'} transition-all duration-500`} />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Enter your address</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={vaultAddress}
                  onChange={(e) => setVaultAddress(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
                />
              </div>
              <button
                onClick={handleCreateVault}
                disabled={isLoading || !vaultAddress}
                className="w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating...' : 'Create Vault'}
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-800 border-2 border-red-500 animate-pulse">
                <Lock className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Enter vault address to check</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={checkVaultAddress}
                  onChange={(e) => setCheckVaultAddress(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
                />
              </div>
              <button
                onClick={handleCheckVaultStatus}
                disabled={isLoading || !checkVaultAddress}
                className="w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Checking...' : 'Verify Status'}
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gray-800 border-2 border-red-500">
                <Lock className="w-12 h-12 text-red-500" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Enter vault address to unlock</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={unlockVaultAddress}
                  onChange={(e) => setUnlockVaultAddress(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Unlock Arguments (Fixed)</label>
                <input
                  type="text"
                  value="[132,24,89,232,77,12,34,145,201,144,111,9,83,199,182,33,44,188,100,72,1,222,173,109,160,255,21,78,77,2,23,7]"
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 opacity-50"
                />
              </div>
              <button
                onClick={handleUnlockVault}
                disabled={isLoading || !unlockVaultAddress}
                className="w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Unlocking...' : 'Unlock Vault'}
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-gray-800 transition-all duration-1000 ${
                isLocked 
                  ? 'border-2 border-red-500' 
                  : 'border-2 border-green-500 animate-bounce'
              }`}>
                {isLocked ? (
                  <Lock className="w-12 h-12 text-red-500" />
                ) : (
                  <div className="relative">
                    <Unlock className="w-12 h-12 text-green-500 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-2 border-green-500 animate-ping opacity-75"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Enter vault address to verify</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={verifyVaultAddress}
                  onChange={(e) => setVerifyVaultAddress(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-400"
                />
              </div>
              <button
                onClick={handleVerifyUnlock}
                disabled={isLoading || !verifyVaultAddress}
                className={`w-full px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all duration-300 ${
                  isLocked ? '' : 'animate-pulse'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Verifying...' : isLocked ? 'Verify Unlock' : 'Vault Unlocked!'}
              </button>
              {!isLocked && (
                <div className="text-center mt-4">
                  <p className="text-green-500 animate-fade-in">Vault successfully unlocked!</p>
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="bg-black">
        <div className="container mx-auto px-4 pt-40">
          <div className="max-w-3xl mx-auto mt-16">
            {/* Progress Steps */}
            <div className="flex justify-between mb-20">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                      currentStep > index + 1
                        ? 'bg-green-500'
                        : currentStep === index + 1
                        ? 'bg-blue-400'
                        : 'bg-gray-800'
                    }`}
                  >
                    {currentStep > index + 1 ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span className="text-sm text-gray-400">{step.title}</span>
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="bg-gray-900 rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-2">{steps[currentStep - 1].title}</h2>
              <p className="text-gray-400 mb-8">{steps[currentStep - 1].description}</p>
              
              {error && (
                <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
                  {error}
                </div>
              )}

              {renderStepContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Vault;
