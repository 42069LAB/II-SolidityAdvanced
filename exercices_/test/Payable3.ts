import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import hre from "hardhat";

// First we import the things we are going to use: the expect function from chai to write 
// our assertions, the Hardhat Runtime Environment (hre), and the network helpers to interact with the Hardhat Network.
// After that we use the DESCRIBE and IT functions, which are global Mocha functions used to describe and group your tests.
// (You can read more about Mocha here : https://mochajs.org/#getting-started

describe("Payable", async function () {
        
    async function deployOneYearLockFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        // deploy a contract
        const Payable = await hre.ethers.getContractFactory("Payable3");
        const payable = await Payable.deploy(); 

        return { payable, owner, otherAccount };
    }

    describe("Deployment", function () {

        it("Should set the owner address as the owner", async function () {
            const { payable, owner } = await loadFixture(deployOneYearLockFixture);
            // assert that the value is correct
            expect(await payable.owner()).to.equal(owner.address);
        });

        it("Should be able to receive ethers as it is payable (+50 eth)", async function () {
            const { payable, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
            // assert that the value is correct
            const transfertAmount = ethers.utils.parseEther("50");
            const tx = await payable.connect(owner).sendTo(otherAccount.address, { value: transfertAmount});
            const receipt = await tx.wait()
            const gasSpent = receipt.gasUsed.mul(receipt.effectiveGasPrice)
    
            const OtherAccount = await otherAccount.getBalance();
            console.log(OtherAccount);
            expect(await owner.getBalance()).to.eq(OtherAccount.add(transfertAmount).sub(gasSpent));
            console.log(OtherAccount);
        });
        
        it("Should allow only owner to access Destroy function", async function () {
            const { payable, otherAccount } = await loadFixture(deployOneYearLockFixture);
            // assert that the value is correct
            await expect(payable.connect(otherAccount).destroySmartContract(payable.address)).to.be.revertedWith(
                "You are not the owner"
            );
        });
    });
});


// msg.value : 