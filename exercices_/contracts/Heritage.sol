// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

/*

Inheritance

Solidity supports multiple inheritance. Contracts can inherit other contract by using the IS keyword.

Function that is going to be overridden by a child contract must be declared as virtual.

Function that is going to override a parent function must use the keyword override.

Order of inheritance is important.

You have to list the parent contracts in the order from “most base-like” to “most derived”.
*/

contract BaseA {

    function getNb() public view virtual returns (uint256) {
        return 42;
    }

}

contract BaseB {

    function getNb() public view virtual returns (uint256) {
        return 22;
    }

}

contract BaseC is BaseA {

    function getNb() public view virtual override returns (uint256) {
        return super.getNb();
    }

}

contract Final is BaseB, BaseC {

    function getNb() public view virtual override(BaseB,BaseC) returns (uint256) {
        return super.getNb();
    }

}

