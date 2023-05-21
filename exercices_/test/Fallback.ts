import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import hre from "hardhat";

// First we import the things we are going to use: the expect function from chai to write 
// our assertions, the Hardhat Runtime Environment (hre), and the network helpers to interact with the Hardhat Network.
// After that we use the DESCRIBE and IT functions, which are global Mocha functions used to describe and group your tests.
// (You can read more about Mocha here : https://mochajs.org/#getting-started

describe("Fallback", async function () {
        
    async function deployOneYearLockFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        // deploy a contract
        const Fallback = await hre.ethers.getContractFactory("Fallback");
        const fallback = await Fallback.deploy(); 

        return { fallback, owner, otherAccount };
    }

    describe("Deployment", function () {

        it("Should increment compteur", async function () {
            const { fallback, owner } = await loadFixture(deployOneYearLockFixture);
            // launch an unexisting function + test de la valeur de compteur
            await owner.sendTransaction({
                to: fallback.address,
                data: "0x",
            });
            expect(await fallback.compteur()).to.equal(1);
        });
    });
});