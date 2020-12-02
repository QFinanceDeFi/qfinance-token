const QFI = artifacts.require("QERC20.sol");
const QAirdrop = artifacts.require("QAirdrop.sol");
const QStaking = artifacts.require("QPoolStakingFactory.sol");
const web3 = require('web3');

module.exports = function (deployer) {
  // Deploy ERC20 token first
  deployer.deploy(QFI).then(() => {
    // Deploy Airdrop contract with required parameters
      return deployer.deploy(
        QAirdrop,
        web3.utils.toWei('400000', 'ether'),
        Math.round(new Date().getTime() / 1000) + 2592000,
        QFI.address)
  }).then(() => {
    // Deploy Staking Factory contract with required parameters
    return deployer.deploy(
      QStaking,
      QFI.address,
      Math.round(new Date().getTime() / 1000) + 2592000
    )
  })
};