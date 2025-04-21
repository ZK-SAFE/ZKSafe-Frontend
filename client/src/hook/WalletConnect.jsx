import { useState, useEffect, useCallback } from 'react';

export const useWalletConnect = () => {
  const [walletStatus, setWalletStatus] = useState('disconnected'); // 'disconnected', 'connecting', 'connected', 'error'
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletProvider, setWalletProvider] = useState(null);

  // Check if any Sui wallet is installed
  const isSuiWalletAvailable = useCallback(() => {
    // Check for Ethos wallet (which might be exposed as window.ethereum)
    if (window.ethereum && typeof window.ethereum.isSui === 'undefined') {
      // Check if it has Sui-related methods
      return typeof window.ethereum.signAndExecuteTransaction === 'function' ||
             typeof window.ethereum.getAccounts === 'function' ||
             (typeof window.ethereum.request === 'function' && 
              window.ethereum.request({ method: 'eth_chainId' })
                .then(chainId => chainId && chainId.toLowerCase().includes('sui'))
                .catch(() => false));
    }
    
    // Check for window.haha (which might be a custom wallet)
    if (window.haha && typeof window.haha === 'object') {
      return true;
    }
    
    // Standard Sui wallet checks
    return window.suiWallet !== undefined || 
           window.sui !== undefined || 
           window.Sui !== undefined ||
           (typeof window.ethereum !== 'undefined' && window.ethereum.isSui);
  }, []);

  // Get the wallet provider object
  const getWalletProvider = useCallback(() => {
    // Try the haha object first (if it exists)
    if (window.haha && typeof window.haha === 'object') {
      console.log("Using 'haha' as wallet provider");
      return window.haha;
    }
    
    // Try ethereum object (for Ethos wallet)
    if (window.ethereum) {
      console.log("Using 'ethereum' as wallet provider");
      return window.ethereum;
    }
    
    // Standard Sui wallet checks
    if (window.suiWallet) return window.suiWallet;
    if (window.sui) return window.sui;
    if (window.Sui) return window.Sui;
    
    return null;
  }, []);

  // Initialize wallet connection
  useEffect(() => {
    const checkWalletConnection = async () => {
      const walletProvider = getWalletProvider();
      if (walletProvider) {
        try {
          // Different wallets might have different methods
          let accounts;
          
          // Try different methods to get accounts
          if (walletProvider.getAccounts) {
            accounts = await walletProvider.getAccounts();
          } else if (walletProvider.request) {
            try {
              accounts = await walletProvider.request({ method: 'sui_getAccounts' });
            } catch (e) {
              // Fallback for Ethereum wallets
              accounts = await walletProvider.request({ method: 'eth_accounts' });
            }
          } else if (walletProvider.accounts) {
            accounts = walletProvider.accounts;
          }
          
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setWalletProvider(walletProvider);
            setWalletStatus('connected');
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkWalletConnection();
  }, [getWalletProvider]);

  // Connect to wallet
  const connectWallet = useCallback(async () => {
    const walletProvider = getWalletProvider();
    if (!walletProvider) {
      setWalletStatus('error');
      return { success: false, error: 'Wallet extension not installed' };
    }

    setWalletStatus('connecting');
    
    try {
      // Different wallets might have different connection methods
      if (walletProvider.requestPermissions) {
        await walletProvider.requestPermissions();
      } else if (walletProvider.request) {
        try {
          // Try Sui method first
          await walletProvider.request({ method: 'sui_requestPermissions' });
        } catch (e) {
          // Fallback to Ethereum method
          await walletProvider.request({ method: 'eth_requestAccounts' });
        }
      } else if (walletProvider.connect) {
        await walletProvider.connect();
      } else if (walletProvider.enable) {
        await walletProvider.enable();
      }
      
      // Get accounts
      let accounts;
      if (walletProvider.getAccounts) {
        accounts = await walletProvider.getAccounts();
      } else if (walletProvider.request) {
        try {
          accounts = await walletProvider.request({ method: 'sui_getAccounts' });
        } catch (e) {
          // Fallback for Ethereum wallets
          accounts = await walletProvider.request({ method: 'eth_accounts' });
        }
      } else if (walletProvider.accounts) {
        accounts = walletProvider.accounts;
      }
      
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletProvider(walletProvider);
        setWalletStatus('connected');
        return { success: true, address: accounts[0] };
      } else {
        setWalletStatus('error');
        return { success: false, error: 'No accounts found' };
      }
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setWalletStatus('error');
      return { success: false, error: error.message || 'Failed to connect to wallet' };
    }
  }, [getWalletProvider]);

  // Disconnect from wallet
  const disconnectWallet = useCallback(() => {
    setWalletAddress(null);
    setWalletProvider(null);
    setWalletStatus('disconnected');
    return { success: true };
  }, []);

  // Execute a transaction
  const executeTransaction = useCallback(async (transactionBlock) => {
    if (!walletProvider || walletStatus !== 'connected') {
      return { success: false, error: 'Wallet not connected' };
    }

    try {
      // Different wallets might have different transaction methods
      let result;
      if (walletProvider.signAndExecuteTransactionBlock) {
        result = await walletProvider.signAndExecuteTransactionBlock({
          transactionBlock,
        });
      } else if (walletProvider.signAndExecuteTransaction) {
        result = await walletProvider.signAndExecuteTransaction(transactionBlock);
      } else if (walletProvider.request) {
        try {
          result = await walletProvider.request({
            method: 'sui_signAndExecuteTransactionBlock',
            params: [{ transactionBlock }]
          });
        } catch (e) {
          // Fallback for other wallet types
          result = await walletProvider.request({
            method: 'eth_sendTransaction',
            params: [transactionBlock]
          });
        }
      }
      
      return { success: true, result };
    } catch (error) {
      console.error('Error executing transaction:', error);
      return { success: false, error: error.message || 'Transaction failed' };
    }
  }, [walletProvider, walletStatus]);

  // Enhanced debug function to help identify the wallet
  const debugWallet = useCallback(() => {
    console.log('Window object keys:', Object.keys(window));
    
    // Check standard wallet objects
    console.log('suiWallet exists:', window.suiWallet !== undefined);
    console.log('sui exists:', window.sui !== undefined);
    console.log('Sui exists:', window.Sui !== undefined);
    console.log('ethereum exists:', window.ethereum !== undefined);
    
    // Detailed ethereum object inspection
    if (window.ethereum) {
      console.log('ethereum methods:', Object.getOwnPropertyNames(window.ethereum).filter(
        prop => typeof window.ethereum[prop] === 'function'
      ));
      console.log('ethereum properties:', Object.getOwnPropertyNames(window.ethereum).filter(
        prop => typeof window.ethereum[prop] !== 'function'
      ));
    }
    
    // Detailed haha object inspection
    if (window.haha) {
      console.log('haha methods:', Object.getOwnPropertyNames(window.haha).filter(
        prop => typeof window.haha[prop] === 'function'
      ));
      console.log('haha properties:', Object.getOwnPropertyNames(window.haha).filter(
        prop => typeof window.haha[prop] !== 'function'
      ));
    }
    
    // Try to detect any wallet-like objects
    const possibleWallets = Object.keys(window).filter(key => 
      typeof window[key] === 'object' && 
      window[key] !== null && 
      (
        (window[key].getAccounts && typeof window[key].getAccounts === 'function') ||
        (window[key].request && typeof window[key].request === 'function') ||
        (window[key].signAndExecuteTransaction && typeof window[key].signAndExecuteTransaction === 'function') ||
        key.toLowerCase().includes('sui') ||
        key.toLowerCase().includes('wallet')
      )
    );
    
    console.log('Possible wallet objects:', possibleWallets);
    
    // Try to connect to ethereum wallet
    if (window.ethereum && window.ethereum.request) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => console.log('Ethereum accounts:', accounts))
        .catch(err => console.log('Error requesting ethereum accounts:', err));
    }
    
    // Try to connect to haha wallet
    if (window.haha && window.haha.request) {
      try {
        window.haha.request({ method: 'eth_requestAccounts' })
          .then(accounts => console.log('Haha accounts:', accounts))
          .catch(err => console.log('Error requesting haha accounts:', err));
      } catch (e) {
        console.log('Error calling haha.request:', e);
      }
    }
    
    return possibleWallets;
  }, []);

  return {
    walletStatus,
    walletAddress,
    connectWallet,
    disconnectWallet,
    executeTransaction,
    isSuiWalletAvailable,
    debugWallet,
  };
};