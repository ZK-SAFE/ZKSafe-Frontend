import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import './App.css';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import CreateVault from './components/CreateVault';
import SaveKeys from './components/SaveKeys';
import Vault from './components/Vault';
import UnlockVault from './components/UnlockVault';
import VaultsList from './components/VaultsList';

import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@mysten/dapp-kit/dist/index.css";

const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider>
          <Router>
            <div className="min-h-screen bg-gray-900">
              <Navbar />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/vaults" element={<VaultsList />} />
                <Route path="/create-vault" element={<CreateVault />} />
                <Route path="/save-keys" element={<SaveKeys />} />
                <Route path="/vault" element={<Vault />} />
                <Route path="/unlock-vault" element={<UnlockVault />} />
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
