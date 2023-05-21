// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

// fallback https://solidity-by-example.org/fallback/
// fallback is a special function that is executed either when
// a function that does not exist is called or
// Ether is sent directly to a contract but receive() does not exist or msg.data is not empty
// fallback has a 2300 gas limit when called by transfer or send.

contract Fallback {

    uint public compteur;

    event Error(string);

    fallback() external payable {
        ++compteur;
        emit Error("call of a non-existent function");
    }
}