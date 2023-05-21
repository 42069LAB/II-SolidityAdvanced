import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import hre from "hardhat";

// First we import the things we are going to use: the expect function from chai to write 
// our assertions, the Hardhat Runtime Environment (hre), and the network helpers to interact with the Hardhat Network.
// After that we use the DESCRIBE and IT functions, which are global Mocha functions used to describe and group your tests.
// (You can read more about Mocha here : https://mochajs.org/#getting-started



describe("Modifier", async function () {
        
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    // deploy a contract
    const Modifier = await hre.ethers.getContractFactory("Modifier");
    const modifier = await Modifier.deploy(owner.address); 
   
    it("Should set the right owner", async function () {
        // assert that the value is correct
        expect(await modifier.owner().to.equal(owner.address));
    });

    it("Should allow only owner to use test function", async function () {
        
        // assert that the value is correct
        await expect(modifier.connect(otherAccount).test()).to.be.revertedWith(
            "You aren't the owner"
        );
    });

});