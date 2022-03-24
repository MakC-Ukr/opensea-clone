class MarketListing
{
    constructor(listingId, contractAddress, tokenId, seller, price)
    {
        this.listingId = listingId;
        this.contractAddress = contractAddress;
        this.tokenId = tokenId;
        this.seller = seller;
        this.price = price;
    }
}

export default MarketListing;