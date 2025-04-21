import { useWalletConnect } from '../hook/WalletConnect';
import { useNavigate } from 'react-router-dom';

const Wallet = () => {
  const { 
    walletStatus, 
    walletAddress, 
    connectWallet, 
    disconnectWallet,
    isSuiWalletAvailable,
    debugWallet
  } = useWalletConnect();
  const navigate = useNavigate();

  const handleWalletConnect = async () => {
    const result = await connectWallet();
    if (result.success) {
      console.log('Connected to wallet with address:', result.address);
      
      setTimeout(() => {
        console.log('Navigating to dashboard...');
        navigate('/dashboard', { replace: true });
      }, 1000);
    } else {
      console.error('Failed to connect wallet:', result.error);
    }
  };

  const handleWalletDisconnect = () => {
    disconnectWallet();
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Sui Wallet Connection</h1>
          
          {!isSuiWalletAvailable() && (
            <div>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
                <p className="font-bold">Wallet Not Detected</p>
                <p>Sui Wallet extension is not installed or not detected.</p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => {
                    const possibleWallets = debugWallet();
                    console.log('Debug wallet results:', possibleWallets);
                    alert('Check console for wallet debug information');
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Debug Wallet
                </button>
                
                <a 
                  href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Install Sui Wallet
                </a>
              </div>
            </div>
          )}
          
          {walletStatus === 'disconnected' && isSuiWalletAvailable() && (
            <div>
              <p className="mb-6 text-gray-600">
                Connect to your Sui Wallet to interact with the blockchain. This will allow you to sign transactions
                and manage your assets on the Sui network.
              </p>
              
              <button 
                onClick={handleWalletConnect}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded transition-colors"
              >
                Connect Sui Wallet
              </button>
            </div>
          )}
          
          {walletStatus === 'connecting' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p>Connecting to wallet...</p>
            </div>
          )}
          
          {walletStatus === 'connected' && (
            <div>
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                <p className="font-bold">Wallet Connected!</p>
                <p>Your Sui wallet is now connected.</p>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Your wallet address:</p>
                <div className="bg-gray-100 p-3 rounded break-all font-mono text-sm">
                  {walletAddress}
                </div>
              </div>
              
              <button 
                onClick={handleWalletDisconnect}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Disconnect Wallet
              </button>
            </div>
          )}
          
          {walletStatus === 'error' && (
            <div>
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                <p className="font-bold">Error</p>
                <p>An error occurred while connecting to the wallet. Please try again.</p>
              </div>
              
              <button 
                onClick={handleWalletConnect}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet; 