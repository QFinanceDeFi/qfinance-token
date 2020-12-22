// SPDX-License-Identifier: MIT

pragma solidity ^ 0.6.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract QAirdrop {
    using SafeMath for uint256;

    mapping(address => bool) public signeesMapping;
    uint256 public totalSignees;

    uint256 public totalAmount;
    uint public closingTime;
    IERC20 airdropToken;

    constructor (
        uint256 _totalAmount,
        uint _closingTime,
        address _airdropToken
    ) public {
        totalAmount = _totalAmount;
        closingTime = _closingTime;
        airdropToken = IERC20(_airdropToken);
        totalSignees = 0;
    }

    function addSignee(address _address) private {        
        signeesMapping[_address] = true;
        totalSignees += 1;
    }

    function removeSignee(address _address) private {
        signeesMapping[_address] = false;
        totalSignees -= 1;
    }

    function signUp() public returns (bool) {
        require(now < closingTime, "Airdrop is closed");
        require(totalSignees < 1001, "Airdrop is full");
        require(!signeesMapping[msg.sender], "You can't sign up twice frend.");
        
        addSignee(msg.sender);
        return true;
    }
    
    function unsignUp() public returns (bool) {
        require(now < closingTime, "Airdrop is closed - can't unsign up now!");
        require(totalSignees > 0, "Nobody is signed up yet so you can't be :P");
        require(signeesMapping[msg.sender], "You aren't even signed up silly donut.");
        
        removeSignee(msg.sender);
        return true;
    }

    function claim() public {
        require(now > closingTime, "Airdrop is still open");
        require(signeesMapping[msg.sender], "You did not register - u r such a spiderbrain.");
        uint256 _airdropAmount = airdropToken.balanceOf(address(this)).div(totalSignees);
        removeSignee(msg.sender);
        airdropToken.transfer(msg.sender, _airdropAmount);
    }
}
