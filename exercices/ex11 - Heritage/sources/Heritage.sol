// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

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