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
        await qfi.transfer(airdrop.address, web3.utils.toWei('150000', 'ether'));

        // Check that transfer completed as desired
        let balance = await qfi.balanceOf(airdrop.address);
        assert.equal(balance, web3.utils.toWei('150000', 'ether'));

        // Use non-minter accounts to ensure initial balance is 0
        for (let i = 1; i < 101; i++) {
            await airdrop.signUp.sendTransaction({from: accounts[i]})
        }

        // Check random address to ensure they are signed up
        assert.equal(await airdrop.signeesMapping(accounts[1]), true)
        assert.equal(await airdrop.signeesMapping(accounts[12]), true)
        assert.equal(await airdrop.signeesMapping(accounts[33]), true)
        assert.equal(await airdrop.signeesMapping(accounts[49]), true)
        assert.equal(await airdrop.signeesMapping(accounts[71]), true)
        assert.equal(await airdrop.signeesMapping(accounts[99]), true)

        // Check that the contract properly counted both signees
        let signees = new web3.utils.BN(await airdrop.totalSignees.call()).toString();
        assert.equal(signees, "100");

        // Sleep function to wait for the airdrop period to close
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }

        // Need to set qfi token migration closing time value (2nd parameter) to 30s or edit value below
        await sleep(31000);

        for (let i = 1; i < 101; i++) {
            await airdrop.claim.sendTransaction({from: accounts[i]})
            let balance = await qfi.balanceOf.call(accounts[i]);
            assert(web3.utils.fromWei(balance, 'ether'), 1500)
        }

    })
})