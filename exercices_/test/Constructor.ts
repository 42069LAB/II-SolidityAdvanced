import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import hre from "hardhat";

// First we import the things we are going to use: the expect function from chai to write 
// our assertions, the Hardhat Runtime Environment (hre), and the network helpers to interact with the Hardhat Network.
// After that we use the DESCRIBE and IT functions, which are global Mocha functions used to describe and group your tests.
// (You can read more about Mocha here : https://mochajs.org/#getting-started



describe("Constructor", function () {
    it("Should return the right param constructor", async function () {
        const testValue = 5;
        // deploy a lock contract where funds can be withdrawn
        // one year in the future
        const Constructor = await hre.ethers.getContractFactory("Constructor");
        const construc = await Constructor.deploy(testValue);
        // assert that the value is correct
        expect(await construc.constructor().to.equal(testValue));
    });
});