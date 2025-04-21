import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWalletConnect } from '../hook/WalletConnect';

const Dashboard = () => {
  const navigate = useNavigate();
  const { walletStatus, walletAddress } = useWalletConnect();
  const [balance, setBalance] = useState('1000');
  
  console.log('Dashboard component rendered');
  console.log('Wallet status:', walletStatus);
  console.log('Wallet address:', walletAddress);

  // Simplified dashboard for debugging
  return (
    <div className="pt-20 min-h-screen bg-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-gray-700 p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-white">Dashboard</h1>
          
          <div className="bg-gray-800 p-6 rounded-lg mb-6 border border-gray-600">
            <h2 className="text-xl font-semibold mb-4 text-white">Account Information</h2>
            
            {walletAddress ? (
              <div>
                <p className="mb-2 text-gray-300">
                  <span className="font-semibold">Address:</span> 
                  <span className="ml-2 font-mono text-sm break-all">{walletAddress}</span>
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">Balance:</span> 
                  <span className="ml-2">{balance} SUI</span>
                </p>
              </div>
            ) : (
              <p className="text-gray-300">
                You are logged in via zkLogin. Connect a wallet to see your balance.
              </p>
            )}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 