// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.4;

contract RushChapterII {

    struct Sale {
        // TODO: Define the Sale struct
    }

    struct Offer {
        // TODO: Define the Offer struct
    }

    uint256 internal salesNbr = 0;
    uint256 internal offerNbr = 0;
    mapping(uint256 => Sale) internal sales;
    mapping(uint256 => Offer) internal offers;

    // @description: Create a new sale
    // @param: The params of the sale
    // @return: Id of the sale
    function createSale() public returns() {}

    // @description: Get a sale
    // @param _id: the id of the sale
    // @return: The sale
    function getSale(uint256 _id) public returns() {}

    // @description: Add an offer to a sale
    // @param _saleId: the id of the sale
    // @param _price: the price of the offer
    // @return: Id of the offer
    function addOffer(uint256 _saleId, uint256 _price) public returns() {}

    // @description: Get an offer
    // @param _id: the id of the offer
    // @return: The offer
    function getOffer(uint256 _id) public returns() {}

    // @description: Accept an offer
    // @param _offerId: the id of the offer
    // @param _isAccepted: true if the offer is accepted, false otherwise
    // @return: Nothing
    function responseToOffer(uint256 _offerId, bool _isAccepted) public {}

    // @description: Claim an offer
    // @param _offerId: the id of the offer
    // @return: Nothing
    function buyTheSale(uint256 _offerId) public {}

    // @description: Close a sale
    // @param _saleId: the id of the sale
    // @return: Nothing
    function getSaleBalance(uint256 _saleId) public {}
}