class TokenInstance {
    constructor(contractAddress, tokenId, contractName, contractSymbol, imageAddress) 
    {
      this.contractAddress = contractAddress;
      this.tokenId = tokenId;
      this.contractName = contractName;
      this.contractSymbol = contractSymbol;
      this.imageAddress = imageAddress;
    }
}

export default TokenInstance;