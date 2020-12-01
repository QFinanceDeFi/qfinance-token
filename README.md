# QFI Token + Airdrop Contracts

## Airdrop Contract

The QAirdrop.sol contract can be reused by anyone. It is a non-network spamming, skin-in-the-game airdrop. Users must first send a transaction to the contract which requires gas fees. No Twitter bots, Telegram bots, etc. No dumping hundreds/thousands of transactions on the network at once.

Users can sign up with more than one address, but risk wasting money on gas fees if the airdrop is not real or does not materialize. This is how it is skin-in-the-game.

It is generalized and not specific to QFinance. Feel free to copy the code and adjust it for your needs.

## QFI Token

The QERC20.sol contract is as simple an ERC20 token as can be. Not much of a reason to copy this contract... this is a standard Open Zeppelin ERC20 token with no special functionality. The functionality of the QFinance protocol, as well as the staking contracts, do not rely on any special functionality from the token.

### Setup Test Environment

1. You can use either Alchemy API or Infura to get an environment. Get a project ID from there.
2. Recommended to create a new Metamask wallet (not connected to any mainnet funds as you will be using your seed.) You should create two addresses as the tests require 2.
3. Create a secrets.json file in the root. Add the following values:
   * projectId: [project Id from Infura/Alchemy]
   * mnemonic: [mnemonic phrase from Metamask]
   * address: [address from Metamask]
  
_Note, the truffle-config file uses Infura so you will need to change the https address there if you chose to use Alchemy_
4. If you haven't install ganache-cli to create a local blockchain.

### Run Tests
1. Run the Ganache CLI first - we will run it by forking the Kovan Ethereum testnet so we can interact with it in its current state:
```bash
ganache-cli -f [Infura/Alchemy address with project ID] -m "seed phrase" -i 42 -u [address 1]
```
2. Run tests:
```bash
truffle test --network development
```
_Note: Read the test file for information about how to test the time sensitive airdrop contract._