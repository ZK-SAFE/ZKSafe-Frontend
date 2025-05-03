import { Link } from 'react-router-dom';
import { ConnectButton } from '@mysten/dapp-kit';

const Landing = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-6">
            zkSafe: Privacy-First Credential Vault
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Securely store and share encrypted secrets using OAuth-based login with no need for a wallet or seed phrase.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <ConnectButton 
              connectText="Connect Wallet"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            />
            <Link
              to="/login"
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              zkLogin
            </Link>
            <Link
              to="/vault"
              className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition"
            >
              Open Vault
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              Fully On-Chain
            </h3>
            <p className="text-gray-600">
              Leveraging Sui's native cryptography, object ownership, and composability.
            </p>
          </div>
          
          <div className="bg-blue-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              Privacy First
            </h3>
            <p className="text-gray-600">
              Secure encryption and zero-knowledge proofs ensure your data stays private.
            </p>
          </div>
          
          <div className="bg-blue-200 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-blue-900 mb-3">
              Easy Access
            </h3>
            <p className="text-gray-600">
              Use social login via zkLogin - no wallet or seed phrase needed.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-blue-100">
              <div className="text-blue-600 text-2xl font-bold mb-2">1</div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                Connect
              </h4>
              <p className="text-gray-600">
                Use zkLogin or connect your Sui wallet
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-blue-100">
              <div className="text-blue-600 text-2xl font-bold mb-2">2</div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                Create Vault
              </h4>
              <p className="text-gray-600">
                Set up your secure credential vault
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-blue-100">
              <div className="text-blue-600 text-2xl font-bold mb-2">3</div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                Store Secrets
              </h4>
              <p className="text-gray-600">
                Add encrypted credentials securely
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-blue-100">
              <div className="text-blue-600 text-2xl font-bold mb-2">4</div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                Share Safely
              </h4>
              <p className="text-gray-600">
                Control access with zero-knowledge proofs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;