// SPDX-License-Identifier: GPL-3.0
/*
pragma solidity ^0.8.4;

contract Random{

    function getRandom(string Texte) view returns (uint256){

        keccak256(Texte);
        abi.encodePacked(blockhash(block.number - 1), block.timestamp);
        return(keccak256(Texte));
    };

}*/