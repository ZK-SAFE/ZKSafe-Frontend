import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Sui zkLogin Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of zero-knowledge proofs with Sui's zkLogin - a secure and private way to authenticate using your existing social accounts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">zkLogin Authentication</h2>
            <p className="text-gray-600 mb-6">
              Sign in with your Google account using zero-knowledge proofs. Maintain privacy while proving your identity.
            </p>
            <Link
              to="/zklogin"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition-colors"
            >
              Try zkLogin
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Wallet Connection</h2>
            <p className="text-gray-600 mb-6">
              Connect your Sui wallet to interact with the blockchain. Send transactions and manage your assets.
            </p>
            <Link
              to="/wallet"
              className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded transition-colors"
            >
              Connect Wallet
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Authenticate</h3>
              <p className="text-gray-600">
                Sign in with your Google account using zkLogin or connect your Sui wallet.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Generate Proof</h3>
              <p className="text-gray-600">
                A zero-knowledge proof is generated to verify your identity without revealing sensitive information.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Interact</h3>
              <p className="text-gray-600">
                Once authenticated, you can interact with the Sui blockchain securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;