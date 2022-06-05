pragma solidity >=0.4.22 <0.9.0;
import './RWD.sol';
import './Tether.sol';

contract DecentralBank {
  string public name = "Decentral Bank";
  address public owner;

  RWD public rwd;
  Tether public tether;

  address[] public stakers;

  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(RWD _rwd, Tether _tether) {
    rwd = _rwd;
    tether = _tether;
    owner = msg.sender;
  }

  function depositTokens(uint _amount) public {
    require(_amount > 0, '_amount cannot be 0');
    //Transfer tether tokens to this address for staking
    tether.transferFrom(msg.sender, address(this), _amount);

    stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

    if(!hasStaked[msg.sender]) {
      stakers.push(msg.sender);
    }

    isStaking[msg.sender] = true;
    hasStaked[msg.sender] = true;
  }

  function issueTokens() public {
    // require the owner to issue tokens only
    require(msg.sender == owner, 'caller must be the owner');
    for(uint i = 0; i < stakers.length; i++) {
      address recipient = stakers[i];
      uint balance = stakingBalance[recipient]; // / 9 to create incentive for stakers 
      if(balance > 0) {
        rwd.transfer(recipient, balance);
      }
    }
  }
}