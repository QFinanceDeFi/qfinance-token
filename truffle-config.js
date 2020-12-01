// Truffle Config File

const HDWalletProvider = require('@truffle/hdwallet-provider');
const { mnemonic, address, projectId } = require('./secrets.json');

module.exports = {

  networks: {
    // Local development blockchain
    development: {
     host: "127.0.0.1",
     port: 8545,
     network_id: "*",
    },
    // Kovan Ethereum testnet blockchain
    kovan: {
      provider: new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/${projectId}`),
      port: 443,
      network_id: "*",
      from: address,
      gas: 10000000
    },
    // Ethereum mainnet production blockchain
    mainnet: {
      provider: new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${projectId}`),
      port: 443,
      network_id: "*",
      from: address,
      gas: 10000000
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.12",
      docker: false,
      settings: {
       optimizer: {
         enabled: true,
         runs: 200
       }
      }
    },
  },
};