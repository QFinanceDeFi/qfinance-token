const QAirdrop = artifacts.require("QAirdrop.sol");
const QFI = artifacts.require("QERC20.sol");
const web3 = require('web3');


contract("QAirdrop", async accounts => {
    it("Setup contracts", async () => {
        // Deploy QFI Token and QAirdrop contracts
        let qfi = await QFI.deployed();
        let airdrop = await QAirdrop.deployed();

        // Transfer QFI Tokens to the airdrop address
        // It should but doesn't have to match the total amount parameter
        await qfi.transfer(airdrop.address, web3.utils.toWei('400000', 'ether'));

        // Check that transfer completed as desired
        let balance = await qfi.balanceOf(airdrop.address);
        assert.equal(balance, web3.utils.toWei('400000', 'ether'));

        // Sign up for the airdrop using 2 separate accounts
        // Use non-minter accounts to ensure initial balance is 0
        await airdrop.signUp.sendTransaction({from: accounts[1]});
        await airdrop.signUp.sendTransaction({from: accounts[2]});

        // Check that the contract properly counted both signees
        let signees = await airdrop.totalSignees.call();
        assert.equal(signees, 2);

        // Sleep function to wait for the airdrop period to close
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }

        // Need to set qfi token migration closing time value (2nd parameter) to 30s or edit value below
        await sleep(31000);

        // Once airdrop period is closed, claim tokens and get balance of each account
        await airdrop.claim.sendTransaction({from: accounts[1]});
        await airdrop.claim.sendTransaction({from: accounts[2]});
        let balanceOne = await qfi.balanceOf.call(accounts[1]);
        let balanceTwo = await qfi.balanceOf.call(accounts[2]);

        // Since there are two addresses signed up, each should get half of initial amount
        assert.equal(web3.utils.fromWei(balanceOne, 'ether'), 200000);
        assert.equal(web3.utils.fromWei(balanceTwo, 'ether'), 200000);
    })
})