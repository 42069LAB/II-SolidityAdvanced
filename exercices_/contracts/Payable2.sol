// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract Payable {

    // Il est important de fournir le
    // mot-clé `payable` ici, sinon la fonction
    // rejettera automatiquement tous les Ethers qui lui sont envoyés.


    address payable public owner;

    constructor () payable{
        //send eth
        owner = payable(msg.sender);

    }
    
    // payable = https://solidity-by-example.org/payable/
    // Functions and addresses declared payable can receive ether into the contract.
    
    // transfer = https://solidity-by-example.org/sending-ether/

    function sendTo(address payable _to) public payable{
        // This function is no longer recommended for sending Ether.
        _to.transfer(msg.value);
    }

}
