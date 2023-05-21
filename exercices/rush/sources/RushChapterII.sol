// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract RushChapterII {


    // --------------------------------------
    address public owner;

    event Error(string);
    
    event saleEvent(
        address indexed sender, 
        uint256 indexed date,
        uint saleId,
        Sale sale,
        string message
    );

    event OffreCree(
        address indexed sender, 
        uint256 indexed date,
        uint offerId,
        Offer offer,
        string message
    );

    event OffreAnswer(
        address indexed sender, 
        uint256 indexed date,
        uint offerId,
        Offer offer,
        string message
    );
    
    event OffreCree(string);
    uint saleEntries;
    uint offerEntries;
    enum Status {Waiting, Accepted, Not_accepted}

    // --------------------------------------
    struct Sale {
        address payable owner;
        string title;
        uint price;
        bool sold;
    }

    struct Offer {
        address buyer;
        uint saleId;
        uint price;
        Status status;
    }
    
    mapping(uint256 => Sale) internal sales;
    mapping(uint256 => Offer) internal offers;

    // constructor --------------------------------------
    /*
    constructor(){
        owner = msg.sender;
    }*/

    // @description: Create a new sale
    // @param: The params of the sale
    // @return: Id of the sale
    function createSale(string memory title, uint price) public returns(uint ) {
        sales[saleEntries].owner = payable(msg.sender);
        sales[saleEntries].title = title;
        sales[saleEntries].price = price;
        emit saleEvent(msg.sender, block.timestamp, saleEntries, sales[saleEntries], "Nouvelle annonce ajoutee");
        ++saleEntries;
        return (saleEntries-1);
    }

    // @description: Get a sale
    // @param _id: the id of the sale
    // @return: The sale
    //function getSale(uint256 _id) public returns() {}

    // @description: Add an offer to a sale
    // @param _saleId: the id of the sale
    // @param _price: the price of the offer
    // @return: Id of the offer
    function addOffer(uint256 _saleId, uint256 _price) public returns(uint) {
        //Owner not allowed to send an offer on hiw own announce"
        if(sales[_saleId].owner != msg.sender){
            offers[offerEntries].buyer = msg.sender;
            offers[offerEntries].saleId = _saleId;
            offers[offerEntries].price = _price;
            emit OffreCree(msg.sender, block.timestamp, offerEntries, offers[offerEntries], "Nouvelle offre ajoutee");
            ++offerEntries;
            return(offerEntries-1);
        }  else {
            return(offerEntries);
        }
        
    }

    // @description: Get an offer
    // @param _id: the id of the offer
    // @return: The offer
    function getOffer(uint256 _id) public view returns(Offer memory) {
        return(offers[_id]);
    }

    // @description: Accept an offer
    // @param _offerId: the id of the offer
    // @param _isAccepted: true if the offer is accepted, false otherwise
    // @return: Nothing
    function responseToOffer(uint256 _offerId, bool _isAccepted) public {
        if(_isAccepted == true){
            offers[_offerId].status = Status.Accepted;
        } else{
            offers[_offerId].status = Status.Not_accepted;
        }
        emit OffreAnswer(msg.sender, block.timestamp, _offerId, offers[offerEntries], "Nouvelle reponse d'offre");
    }

    // @description: Claim an offer
    // @param _offerId: the id of the offer
    // @return: Nothing
    function buyTheSale(uint256 _offerId) public payable{
        //msg.value in Wei 
        //offers[_offerId].price to be converted in wei
        uint weiPrice = offers[_offerId].price * 10^18;

        require(
            msg.value == weiPrice,
            "Not the right price"
        );
            //address(this).transfer(msg.value);   
    }
    // @description: Close a sale
    // @param _saleId: the id of the sale
    // @return: Nothing

    function getSaleBalance(uint256 _saleId) public payable {
        require (
            sales[_saleId].owner == msg.sender,
            "Not the right owner"
        );
        //funds withdraw
        sales[_saleId].owner.transfer(msg.value);
        // log
        emit saleEvent(msg.sender, block.timestamp, _saleId, sales[saleEntries], "withdraw realise");  
    }

    // fallback --------------------------------------
    fallback() external{
        emit Error("call of non existing function or Ether have been sent directly to contract");
    }

    /*
    function destroySmartContract() public {
        require(msg.sender == owner, "You are not the owner");
        selfdestruct(payable(owner));
    }*/
}