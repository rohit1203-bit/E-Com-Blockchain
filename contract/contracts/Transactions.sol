// SPDX-License-Identifier: UNLINCENSED

pragma solidity ^0.8.7;

contract Transactions {
    // variables
    mapping (address => uint256) private balance;
    struct Transaction {
        address to;
        address from;
        uint256 amt;
        string productName;
        string productId;

    }
    mapping(address => Transaction[]) private buyTransactions;
    mapping(address => Transaction[]) private sellTransactions;
    Transaction[] private transactions; 

    // functions
    function transfer(address _to, string memory _productName, string memory _productId) public payable {
        uint256 amt = msg.value;
        require(amt > 0 , "Not enough Money");
        balance[_to] += amt;
        Transaction memory t = Transaction(_to, msg.sender, amt, _productName,  _productId);
        transactions.push(t);
        buyTransactions[msg.sender].push(t);
        sellTransactions[_to].push(t);
    }

    function withdraw() public {
        require(balance[msg.sender] > 0, "No Balance");
        (bool callSuccess,) = payable(msg.sender).call{ value:balance[msg.sender] }("");
        require(callSuccess, "Call Failed");
        balance[msg.sender] = 0;
        delete sellTransactions[msg.sender];
    }

    // getters
    function getBuyTransactions() public view returns (Transaction[] memory) {
        return buyTransactions[msg.sender];
    }

    function getSellTransactions() public view returns (Transaction[] memory) {
        return sellTransactions[msg.sender];
    }

    function getBalance() public view returns (uint256) {
        return balance[msg.sender];
    }

}