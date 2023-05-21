// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract Mofifier{

    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner(){
        require (
            owner == msg.sender,
            "You aren't the owner"
        );
        _;
    }

    function test() public isOwner{
        // code
    }
}