import { useState, useEffect } from 'react';
import { useZkLogin } from '../hook/KeyPair';

const ZkLogin = () => {
  const { initiateLogin, completeLogin } = useZkLogin();
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

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">zkLogin Authentication</h1>
          
          {loginStatus === 'idle' && (
            <div>
              <p className="mb-6 text-gray-600">
                Sign in with your Google account using zkLogin to authenticate with zero-knowledge proofs.
                This allows you to prove your identity without revealing sensitive information.
              </p>
              <button 
                onClick={handleLoginClick}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded transition-colors"
              >
                Sign in with Google
              </button>
            </div>
          )}
          
          {loginStatus === 'loading' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Initiating login...</p>
            </div>
          )}
          
          {loginStatus === 'success' && (
            <div>
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
                <p className="font-bold">Successfully authenticated!</p>
                <p>Your zkLogin authentication was successful.</p>
              </div>
              
              {address && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-1">Your zkLogin address:</p>
                  <div className="bg-gray-100 p-3 rounded break-all font-mono text-sm">
                    {address}
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-600 mb-6">
                Note: In a real application, you would need to complete the zkLogin process
                by generating a zkLogin signature and executing transactions.
              </p>
              
              <button 
                onClick={() => setLoginStatus('idle')}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Start Over
              </button>
            </div>
          )}
          
          {loginStatus === 'error' && (
            <div>
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                <p className="font-bold">Error</p>
                <p>An error occurred during login. Please try again.</p>
              </div>
              
              <button 
                onClick={() => setLoginStatus('idle')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
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

export default ZkLogin; 