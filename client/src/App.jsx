import { useState, useEffect } from 'react'
import { useZkLogin } from './hook/KeyPair'
import { useWalletConnect } from './hook/WalletConnect'
import './App.css'

function App() {
  const { initiateLogin, completeLogin } = useZkLogin();
  const { 
    walletStatus, 
    walletAddress, 
    connectWallet, 
    disconnectWallet,
    isSuiWalletAvailable,
    debugWallet
  } = useWalletConnect();
  
  const [loginStatus, setLoginStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [address, setAddress] = useState(null);

  // Check for JWT in URL after redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const idToken = urlParams.get('id_token');
    
    if (idToken) {
      setLoginStatus('success');
      console.log('JWT received:', idToken);
      
      // In a real app, you would call completeLogin here with the necessary parameters
      // For example:
      // const userSalt = '...'; // This would come from your backend or local storage
      // const userSignature = '...'; // This would be generated
      // const partialZkLoginSignature = {...}; // This would come from your backend
      // const transactionBytes = '...'; // This would be your transaction
      
      // completeLogin(idToken, userSalt, userSignature, partialZkLoginSignature, transactionBytes)
      //   .then(({ result, address }) => {
      //     setAddress(address);
      //     console.log('Transaction result:', result);
      //   })
      //   .catch(error => {
      //     console.error('Error completing login:', error);
      //     setLoginStatus('error');
      //   });
    }
  }, [completeLogin]);

  const handleLoginClick = async () => {
    setLoginStatus('loading');
    try {
      await initiateLogin();
      // The page will redirect, so we don't need to handle success here
    } catch (error) {
      console.error('Error initiating login:', error);
      setLoginStatus('error');
    }
  };

  const handleWalletConnect = async () => {
    const result = await connectWallet();
    if (result.success) {
      console.log('Connected to wallet with address:', result.address);
    } else {
      console.error('Failed to connect wallet:', result.error);
    }
  };

  const handleWalletDisconnect = () => {
    disconnectWallet();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sui zkLogin Demo</h1>
      
      {/* zkLogin Section */}
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">zkLogin Authentication</h2>
        
        {loginStatus === 'idle' && (
          <div>
            <p className="mb-4">Sign in with your Google account using zkLogin</p>
            <button 
              onClick={handleLoginClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Sign in with Google
            </button>
          </div>
        )}
        
        {loginStatus === 'loading' && (
          <p>Initiating login...</p>
        )}
        
        {loginStatus === 'success' && (
          <div>
            <p className="text-green-600 mb-2">Successfully authenticated!</p>
            {address && (
              <p className="mb-4">Your zkLogin address: {address}</p>
            )}
            <p className="text-sm text-gray-600">
              Note: In a real application, you would need to complete the zkLogin process
              by generating a zkLogin signature and executing transactions.
            </p>
          </div>
        )}
        
        {loginStatus === 'error' && (
          <p className="text-red-600">An error occurred during login. Please try again.</p>
        )}
      </div>
      
      {/* Wallet Connect Section */}
      <div className="p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Sui Wallet Connection</h2>
        
        {!isSuiWalletAvailable() && (
          <div className="mb-4">
            <p className="text-yellow-600">Sui Wallet extension is not installed or not detected.</p>
            <button 
              onClick={() => {
                const possibleWallets = debugWallet();
                console.log('Debug wallet results:', possibleWallets);
                alert('Check console for wallet debug information');
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2 mt-2"
            >
              Debug Wallet
            </button>
            <a 
              href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Install Sui Wallet
            </a>
          </div>
        )}
        
        {walletStatus === 'disconnected' && isSuiWalletAvailable() && (
          <div>
            <p className="mb-4">Connect to your Sui Wallet to interact with the blockchain</p>
            <button 
              onClick={handleWalletConnect}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
            >
              Connect Sui Wallet
            </button>
          </div>
        )}
        
        {walletStatus === 'connecting' && (
          <p>Connecting to wallet...</p>
        )}
        
        {walletStatus === 'connected' && (
          <div>
            <p className="text-green-600 mb-2">Wallet connected!</p>
            <p className="mb-4">Your wallet address: {walletAddress}</p>
            <button 
              onClick={handleWalletDisconnect}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Disconnect Wallet
            </button>
          </div>
        )}
        
        {walletStatus === 'error' && (
          <p className="text-red-600">An error occurred while connecting to the wallet. Please try again.</p>
        )}
      </div>
    </div>
  )
}

export default App
