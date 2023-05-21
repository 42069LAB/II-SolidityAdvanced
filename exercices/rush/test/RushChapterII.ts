import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import {anyValue} from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import {expect} from "chai";
import {ethers} from "hardhat";
import hre from "hardhat";

describe("RushChapterII", async function (){

    async function deployRushChapter(){
        // instantiate  the first abstract eth signer/account 
        const [owner, otherAccount] = await ethers.getSigners();
        //deploy a contract
        const RushChapterII = await hre.ethers.getContractFactory("RushChapterII");
        const rushChapterII = await RushChapterII.deploy();

        return { rushChapterII, owner, otherAccount };
    }

    describe("Adding sales", function (){
    
        //test 1 (positive): adding one sale/annonce with account owner - saleId = 0
        it("Should add one sale/annonce 0, and emit an event", async function () {
            const {rushChapterII, owner } = await loadFixture(deployRushChapter);
            // test
            const tx = await rushChapterII.connect(owner).createSale("Annonce1", 10);
            //console.log(tx)
            await expect(tx).to.emit(rushChapterII, "saleEvent")
            .withArgs(owner.address,anyValue,0,anyValue,'Nouvelle annonce ajoutee');
            // only pure view function can be tested for what they return
            //expect(await rushChapterII.connect(owner).createSale("Annonce1", 10).toNumber()).to.equal(0);

        });

        //test 2 (positive): adding one sale/annonce with account otherAccount - saleId = 1
        
        it("Should add one sale/annonce 1, and emit event", async function () {
            const {rushChapterII, owner, otherAccount } = await loadFixture(deployRushChapter);
            // test
            const tx1 = await rushChapterII.connect(owner).createSale("Annonce1", 10);
            const tx2 = await rushChapterII.connect(otherAccount).createSale("Annonce2", 20);
            //console.log(tx);
            await expect(tx2).to.emit(rushChapterII, "saleEvent")
            .withArgs(otherAccount.address,anyValue,1,anyValue,'Nouvelle annonce ajoutee');
        });

    });

    describe("Adding offer to sales", function (){
        //test 3 (negative): adding one offer to saleId = 0 from account owner 
        it("Should not add one offer on his own sale", async function () {
            const {rushChapterII, owner } = await loadFixture(deployRushChapter);
            // tx
            const tx = await rushChapterII.connect(owner).createSale("Annonce1", 10);
            // test
            await expect(rushChapterII.connect(owner).addOffer(0, 10)).to.be.revertedWith(
                "Owner can't add an offer"
            );
        });
        
        
        //test 4 (positive): adding one offer to saleId = 0 from account otherAccount - offerId = 0
        it("Should add one offer 0", async function () {
            const {rushChapterII, otherAccount } = await loadFixture(deployRushChapter);
            // test
            const tx = await rushChapterII.connect(otherAccount).addOffer(0, 10)
            await expect (tx).to.emit(rushChapterII, "OfferEvent")
            .withArgs(otherAccount.address,anyValue,0,anyValue,'Nouvelle offre ajoutee');
        });

        //test 5 (positive): adding one offer to saleId = 1 from account owner - offerId = 1
        it("Should add one offer 1", async function () {
            const {rushChapterII, owner, otherAccount } = await loadFixture(deployRushChapter);
            // test
            const tx1 = await rushChapterII.connect(otherAccount).addOffer(0, 10);
            const tx2 = await rushChapterII.connect(owner).addOffer(1, 20);
            await expect (tx2).to.emit(rushChapterII, "OfferEvent")
            .withArgs(owner.address,anyValue,1,anyValue,'Nouvelle offre ajoutee');
        });
    });

    describe("Accepting offers", function (){
        //test 6 (negative): accepting unexisting offerId = 10
        it("Should not be able to accept an unexisting offer", async function () {
            const {rushChapterII, owner, otherAccount} = await loadFixture(deployRushChapter);
            //tx for annonces
            const tx1 = await rushChapterII.connect(owner).createSale("Annonce1", 10);
            const tx2 = await rushChapterII.connect(otherAccount).createSale("Annonce2", 20);
            //tx for offers
            const tx3 = await rushChapterII.connect(otherAccount).addOffer(0, 10);
            const tx4 = await rushChapterII.connect(owner).addOffer(1, 20);
            // test
            await expect(rushChapterII.connect(otherAccount).responseToOffer(10, true)).to.be.revertedWith(
                "This offer ID does not exist"
            );
        });

        //test 7 (negative): accepting offerId = 0 for saleId = 0 from account otherAccount
        it("Should not be able to accept the offer 0", async function () {
            const {rushChapterII, owner, otherAccount} = await loadFixture(deployRushChapter);
            //tx for annonces
            const tx1 = await rushChapterII.connect(owner).createSale("Annonce1", 10);
            const tx2 = await rushChapterII.connect(otherAccount).createSale("Annonce2", 20);
            //tx for offers
            const tx3 = await rushChapterII.connect(otherAccount).addOffer(0, 10);
            const tx4 = await rushChapterII.connect(owner).addOffer(1, 20);
            // test
            await expect(rushChapterII.connect(otherAccount).responseToOffer(0, true)).to.be.revertedWith(
                "You are not the owner"
            );
        });

        //test 8 (positive): accepting offerId = 1 for saleId = 1 from account otherAccount
        it("Should accept the offer 1", async function () {
            const {rushChapterII, owner,otherAccount} = await loadFixture(deployRushChapter);
            //tx for annonces
            const tx1 = await rushChapterII.connect(owner).createSale("Annonce1", 10);
            const tx2 = await rushChapterII.connect(otherAccount).createSale("Annonce2", 20);
            //tx for offers
            const tx3 = await rushChapterII.connect(otherAccount).addOffer(0, 10);
            const tx4 = await rushChapterII.connect(owner).addOffer(1, 20);
            // test
            const tx5 = rushChapterII.connect(otherAccount).responseToOffer(1, true);
            await expect (tx5).to.emit(rushChapterII, "OfferEvent")
            .withArgs(otherAccount.address,anyValue,2,anyValue,'Offre acceptee');

        });
    });
    
    describe("Claim offer & funds withdraw", function (){
        //test 9 :  le vendeur doit ne doit pas pouvoir claim l'offre 0 qui n'est pas acceptée
        it("Should not be able to claim offer 0", async function () {
            const {rushChapterII, owner,otherAccount} = await loadFixture(deployRushChapter);
            //tx for annonces
            const tx1 = await rushChapterII.connect(owner).createSale("Annonce1", 10);
            const tx2 = await rushChapterII.connect(otherAccount).createSale("Annonce2", 20);
            //tx for offers
            const tx3 = await rushChapterII.connect(otherAccount).addOffer(0, 10);
            const tx4 = await rushChapterII.connect(owner).addOffer(1, 20);
            // tx for accepting offer 1
            const tx5 = rushChapterII.connect(otherAccount).responseToOffer(1, true);
            // tx for claiming offer
            const tx6 = rushChapterII.connect(otherAccount).buyTheSale(0);
            // test
            await expect(tx6).to.be.revertedWith(
                "Offer not accepted yet"
            );
        });

        //test 10 : le vendeur doit ne doit pas pouvoir claim l'offre 1 au mauvais prix ( 5 vs 20)
        it("Should not be able to claim offer 1 with a price of 5", async function () {
            const {rushChapterII, owner,otherAccount} = await loadFixture(deployRushChapter);
            //tx for annonces
            const tx1 = await rushChapterII.connect(owner).createSale("Annonce1", 10);
            const tx2 = await rushChapterII.connect(otherAccount).createSale("Annonce2", 20);
            //tx for offers
            const tx3 = await rushChapterII.connect(otherAccount).addOffer(0, 10);
            const tx4 = await rushChapterII.connect(owner).addOffer(1, 20);
            // tx for accepting offer 1
            const tx5 = rushChapterII.connect(otherAccount).responseToOffer(1, true);
            // tx for claiming offer
            const tx6 = rushChapterII.connect(otherAccount).buyTheSale(1,{ value: 5 });
            // test
            await expect(tx6).to.be.revertedWith(
                "Not the right price"
            );
        });

        //test 11 : le vendeur doit pouvoir claim l'offre 1 au bon prix
        it("Should be able to claim offer 1 with a price of 20", async function () {
            const {rushChapterII, owner,otherAccount} = await loadFixture(deployRushChapter);
            //tx for annonces
            const tx1 = await rushChapterII.connect(owner).createSale("Annonce1", 10);
            const tx2 = await rushChapterII.connect(otherAccount).createSale("Annonce2", 20);
            //tx for offers
            const tx3 = await rushChapterII.connect(otherAccount).addOffer(0, 10);
            const tx4 = await rushChapterII.connect(owner).addOffer(1, 20);
            // tx for accepting offer 1
            const tx5 = rushChapterII.connect(otherAccount).responseToOffer(1, true);
            // tx for claiming offer
            const tx6 = rushChapterII.connect(otherAccount).buyTheSale(1,{ value: 20 });
            // test
            await expect (tx6).to.emit(rushChapterII, "saleEvent")
            .withArgs(otherAccount.address,anyValue,1,anyValue,'offer claimed');
        });


        //test 12 :  seul le le vendeur doit pouvoir retirer ses fonds
        it("Should accept the offer 1", async function () {
            const {rushChapterII, owner,otherAccount} = await loadFixture(deployRushChapter);
            //tx for annonces
            const tx1 = await rushChapterII.connect(owner).createSale("Annonce1", 10);
            const tx2 = await rushChapterII.connect(otherAccount).createSale("Annonce2", 20);
            //tx for offers
            const tx3 = await rushChapterII.connect(otherAccount).addOffer(0, 10);
            const tx4 = await rushChapterII.connect(owner).addOffer(1, 20);
            // tx for accepting offer 1
            const tx5 = rushChapterII.connect(otherAccount).responseToOffer(1, true);
            // tx for claiming offer
            const tx6 = rushChapterII.connect(otherAccount).buyTheSale(1,{ value: 20 });
            // tx for withdraw
            const tx7 = rushChapterII.connect(otherAccount).getSaleBalance(1,{ value: 20 });
            // test
            await expect (tx7).to.emit(rushChapterII, "saleEvent")
            .withArgs(otherAccount.address,anyValue,1,anyValue,'withdraw realise');

        });
    });

});