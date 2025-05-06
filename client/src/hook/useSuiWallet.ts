
import { useState, useEffect } from "react";

export const useSuiWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // Check if Sui wallet is installed
      if (typeof window !== "undefined" && window.suiWallet) {
        const accounts = await window.suiWallet.requestAccounts();
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        }
      } else {
        console.error("Sui wallet not found");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setIsConnected(false);
  };

  useEffect(() => {
    // Check if wallet is already connected
    if (typeof window !== "undefined" && window.suiWallet) {
      window.suiWallet.getAccounts().then((accounts: string[]) => {
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        }
      });
    }
  }, []);

  return {
    isConnected,
    address,
    connectWallet,
    disconnectWallet,
  };
}; 