# ZkSafe

A secure vault system built on Sui blockchain with zero-knowledge proof authentication.

## Overview

ZkSafe is a decentralized vault system that uses zero-knowledge proofs to authenticate users. The system consists of:

- A Sui smart contract for vault management
- A Circom circuit for zero-knowledge proof generation
- A React frontend for user interaction

## Features

- Create secure vaults on Sui blockchain
- Zero-knowledge proof based authentication
- Secure vault unlocking mechanism
- Modern React frontend with TypeScript

## Project Structure

```
ZkSafe/
├── src/
│   ├── hooks/
│   │   ├── useVault.ts      # Sui contract integration
│   │   └── useCircuit.ts    # ZK proof generation and verification
│   ├── components/          # React components
│   └── App.tsx             # Main application component
├── contracts/              # Sui Move smart contracts
│   └── vault.move         # Vault contract implementation
├── circuits/              # Circom circuits
│   └── VaultAuth.circom   # Authentication circuit
└── package.json
```

## Prerequisites

- Node.js (v16 or higher)
- Sui CLI
- Circom compiler

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ZkSafe.git
cd ZkSafe
```

2. Install dependencies:
```bash
npm install
```

3. Install required global packages:
```bash
npm install -g @mysten/sui-cli circom
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. Build the project:
```bash
npm run build
```

## Smart Contract

The vault contract is written in Move and deployed on Sui blockchain. Key features:
- Vault creation and management
- Zero-knowledge proof verification
- Secure unlocking mechanism

## Circuit

The authentication circuit is implemented in Circom and uses Poseidon hash function for zero-knowledge proof generation.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Sui Blockchain
- Circom
- React + Vite 
