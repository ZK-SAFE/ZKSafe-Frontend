import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui.js/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import './App.css';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import ZkLogin from './components/ZkLogin';
import Wallet from './components/Wallet';
import Dashboard from './components/Dashboard';
import Vault from './components/Vault';
import Create from './components/Create';
import Admin from './components/Admin';


// Create a query client
const queryClient = new QueryClient();

// Configure networks
const networks = {
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  devnet: { url: getFullnodeUrl('devnet') },
  localnet: { url: getFullnodeUrl('localnet') },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider
          autoConnect={false}
          preferredWallets={['Sui Wallet']}
          enableUnsafeBurner={false}
        >
          <Router>
            <div className="min-h-screen bg-gray-900 text-white">
              <Navbar />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/vault" element={<Vault />} />
                <Route path="/create" element={<Create />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<ZkLogin />} />
               
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Add a catch-all route that redirects to dashboard for testing */}
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </div>
            <Toaster position="top-right" />
          </Router>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;
