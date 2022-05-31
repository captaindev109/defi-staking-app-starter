pragma solidity >=0.4.22 <0.9.0;

contract Tether {
  string public name = 'Tether';
  string public symbol = 'mUSDT';
  uint256 totalSupply = 1000000000000000000000000; // 1 million tokens
  uint8 public decimals = 18;
}