import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ConnectButton } from '@mysten/dapp-kit';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-blue-400 font-semibold'
      : 'text-gray-400 hover:text-blue-400';
  };

  return (
    <nav className="bg-black shadow-md fixed top-0 left-0 right-0 z-10 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold">
              <span className="text-blue-400">zk</span>
              <span className="text-white">Safe</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/vault" className={`px-3 py-2 rounded-md text-sm ${isActive('/vault')}`}>
              <button className="bg-blue-400 hover:bg-blue-500 text-white text-md text-semibold rounded-md px-4 py-2">Get Started</button>
            </Link>
            {/* <Link to="/login" className={`px-3 py-2 rounded-md text-sm ${isActive('/login')}`}>
              zkLogin
            </Link> */}
            <div className="ml-4">
              <ConnectButton 
                connectText="Connect Wallet"
                className="bg-blue-400 hover:bg-blue-500 text-white"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <ConnectButton 
              connectText="Connect"
              className="bg-blue-400 hover:bg-blue-500 text-white"
            />
            <button
              onClick={toggleMenu}
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-blue-400 hover:bg-gray-800 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-900 border-t border-gray-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base ${isActive('/')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/vault"
            className={`block px-3 py-2 rounded-md text-base ${isActive('/vault')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Vault
          </Link>
          {/* <Link
            to="/login"
            className={`block px-3 py-2 rounded-md text-base ${isActive('/login')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            zkLogin
          </Link> */}
          <Link
            to="/docs"
            className={`block px-3 py-2 rounded-md text-base ${isActive('/docs')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Docs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;