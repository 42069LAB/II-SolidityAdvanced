// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract Payable {

    // Il est important de fournir le
    // mot-clé `payable` ici, sinon la fonction
    // rejettera automatiquement tous les Ethers qui lui sont envoyés.

    address payable public owner;

    // Payable constructor can receive Ether
    constructor () payable{
        //send eth
        owner = payable(msg.sender);
    }

}
