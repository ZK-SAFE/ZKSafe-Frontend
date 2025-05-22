import { Link } from 'react-router-dom';
import { ConnectButton } from '@mysten/dapp-kit';
import Navbar from './Navbar';

const Landing = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="flex-grow container mx-auto px-4 pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6 mt-[120px]">
            ZKSafe: Privacy-First Credential Vault
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Securely store and share encrypted secrets using OAuth-based login with no need for a wallet or seed phrase.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <ConnectButton 
              connectText="Connect Wallet"
              className="px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 shadow-lg transition transform hover:scale-105"
            />
            
            {/* <Link
              to="/login"
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 shadow-lg transition transform hover:scale-105"
            >
              zkLogin
            </Link> */}
          </div>
        </div>

        {/* Features Section with Unequal Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-16">
          {/* Left Box - Smaller */}
          <div className="md:col-span-3 bg-gray-900 p-6 rounded-xl shadow-md transform hover:translate-y-1 transition-all duration-300 border border-gray-800">
            <div className="bg-blue-400 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Fully On-Chain
            </h3>
            <p className="text-gray-400">
              Leveraging Sui's native cryptography, object ownership, and composability.
            </p>
          </div>
          
          {/* Middle Box - Larger */}
          <div className="md:col-span-6 bg-blue-400 p-8 rounded-xl shadow-lg text-white transform hover:translate-y-1 transition-all duration-300">
            <div className="bg-white text-blue-400 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Privacy First
            </h3>
            <p className="text-lg text-white">
              Secure encryption and zero-knowledge proofs ensure your data stays private, offering industry-leading protection without compromises.
            </p>
            <div className="mt-6">
              <Link to="/learn-more" className="inline-flex items-center text-sm font-medium text-white hover:text-gray-100">
                Learn more 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Right Box - Smaller */}
          <div className="md:col-span-3 bg-gray-900 p-6 rounded-xl shadow-md transform hover:translate-y-1 transition-all duration-300 border border-gray-800">
            <div className="bg-blue-400 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Easy Access
            </h3>
            <p className="text-gray-400">
              Use social login via zkLogin - no wallet or seed phrase needed.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-blue-400 shadow-md hover:shadow-lg transition-all">
              <div className="bg-blue-400/20 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Connect
              </h4>
              <p className="text-gray-400">
                Use zkLogin or connect your Sui wallet to get started in seconds.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-blue-400 shadow-md hover:shadow-lg transition-all mt-4 md:mt-0">
              <div className="bg-blue-400/20 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Create Vault
              </h4>
              <p className="text-gray-400">
                Set up your secure credential vault with customizable options.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-blue-400 shadow-md hover:shadow-lg transition-all mt-4 md:mt-8">
              <div className="bg-blue-400/20 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Store Secrets
              </h4>
              <p className="text-gray-400">
                Add encrypted credentials securely with enhanced protection.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-xl border-l-4 border-blue-400 shadow-md hover:shadow-lg transition-all mt-4 md:mt-16">
              <div className="bg-blue-400/20 text-blue-400 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
              <h4 className="text-lg font-semibold text-white mb-2">
                Share Safely
              </h4>
              <p className="text-gray-400">
                Control access with zero-knowledge proofs and fine-grained permissions.
              </p>
            </div>
          </div>
        </div>
        
        {/* Testimonial Section */}
        <div className="mt-24 bg-gradient-to-r from-blue-400 to-blue-500 p-10 rounded-2xl shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-10">Why Users Trust ZKSafee</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6 items-stretch">
              <div className="bg-white p-6 rounded-xl shadow flex-1 max-w-md mx-auto md:mx-0">
                <p className="italic text-gray-600 mb-4">"Finally a secure solution that doesn't require me to manage complex wallets. The OAuth integration is seamless."</p>
                <p className="font-semibold text-blue-400">- Alex Chen, Developer</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow flex-1 max-w-md mx-auto md:mx-0 mt-4 md:mt-0">
                <p className="italic text-gray-600 mb-4">"The privacy features are unmatched. I can store sensitive information confidently knowing it's fully protected."</p>
                <p className="font-semibold text-blue-400">- Maria Rodriguez, Security Analyst</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ZKSafee</h3>
              <p className="text-gray-400">
                The next generation of private credential management on Sui blockchain.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Tutorial Videos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2024 ZKSafee. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;