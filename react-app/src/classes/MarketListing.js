class MarketListing
{
    constructor(_listingId, _contractAddress, _tokenId, _seller, _priceInEther, _contractSymbol,_contractName, _imageAddress,_hashedMessage, _v, _r, _s)
    {
        this.listingId = _listingId;
        this.contractAddress = _contractAddress;
        this.tokenId = _tokenId;
        this.seller = _seller;
        this.priceInEther = _priceInEther;
        this.available = false;
        this.contractSymbol = _contractSymbol;
        this.contractName = _contractName;
        this.imageAddress = _imageAddress;
        this.v = _v;
        this.r = _r;
        this.s = _s;
        this.hashedMessage = _hashedMessage;
    }
}

export default MarketListing;