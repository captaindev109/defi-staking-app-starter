pragma solidity >=0.4.22 <0.9.0;

contract RWD {
  string public name = "Reward Token";
  string public symbol = "RWD";
  uint256 public totalSupply = 100000000000000000000000;   // 1 million tokens
  uint8 decimals = 18;

  mapping(address => uint256) public balanceOf;

  mapping(address => mapping(address => uint256)) public allowance;

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint256 _value
  );

  event Approval(
    address _owner,
    address indexed _spender,
    uint256 _value
  );

  constructor() {
    balanceOf[msg.sender] = totalSupply;  
  }

  // transfer by the owner of the account
  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  // approve spender to spend his tether
  function approve(address _spender, uint256 _value) public returns (bool success) {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  // transfer by third party
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(allowance[_from][msg.sender] >= _value);
    require(balanceOf[_from] >= _value);
    allowance[_from][msg.sender] -= _value;
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(_from, _to, _value);
    return true;
  }
}