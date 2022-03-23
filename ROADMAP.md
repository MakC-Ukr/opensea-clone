# Approximate Roadmap - 23 March 


###On-Chain Actions

######OpenSea contract
MarketItem struct{
	uint itemId;
	address nftContract;
	uint256 tokenId;
	address payable seller; //person selling the nft
	address payable buyer; // 0 address upon creation
	uint256 price;
	bool sold;
}

mapping(address => mapping(address => mapping(uint => mapping(uint => bool)))) private cancelledTransactions(); 

	E.g. : user-contract-NFT ID-at a price of X Eth-True/False

Public methods:
- fetchmyNFTs()
- fetchUnsoldItems()
- verifySignature(signature, price, contractAddress, tokenId, seller) private
- isCancelledInPast(user, contract, NFT ID, price) 
- sellMarketItem(signature, price, contractAddress, tokenId, seller) : 
	- sets owner as new address, requires signature to match all other parameters and the transfers the NFT.
	- requires that a specific user hasnt cancelled the NFT
	- if seller A sells his NFT (ID: 1212) from contract X but has ID: 4545 left, we will still have its approval permission. If someone tries to call the sellMarketItem() he will not have a valid signature since tokenId will now be different
	- if A decides to cancel the transaction, he can. Will cost gas but we make the boolean true in cancelledTransactions mapping. 
	- if A decides to cancel a transaction, and then relists at a higher price, someone can steal the signature from us for a previous listing at a lower price and submit the tx. But it will fail since the isCancelledInPast will return true for the lower price. 
	- if A wishes to relist a cancelled item with the same eth price as before, it will cost A some gas, since A will have to edit the mapping values => Indecisiveness hurts xD. 



######Interaction with foreign contracts
- calling setApprovalForAll() functions to set out contract address
- 



###Off-Chain Actions

- asking for signing a sale with the following parameters: price, contractAddress, tokenId, seller
- Moralis will be used to get all the NFTs of a userAddress to show in Profile 

