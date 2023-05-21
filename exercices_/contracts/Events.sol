// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract Events {

    address public owner;
    // Il est important de fournir le
    // mot-clé `payable` ici, sinon la fonction
    // rejettera automatiquement tous les Ethers qui lui sont envoyés.

    constructor () payable{
        //send eth
        owner = msg.sender;
    }
    
    // payable = https://solidity-by-example.org/payable/
    // Functions and addresses declared payable can receive ether into the contract.
    
    // transfer = https://solidity-by-example.org/sending-ether/

    function sendTo(address payable _to) public payable{
        // This function is no longer recommended for sending Ether.
        _to.transfer(msg.value);
    }

    // Contracts can be deleted from the blockchain by calling selfdestruct.
    // selfdestruct sends all remaining Ether stored in the contract to a designated addres
    
    function destroySmartContract(address payable _to) public{
        require(msg.sender == owner, "You are not the owner");
        selfdestruct(_to);
    }

        

}
