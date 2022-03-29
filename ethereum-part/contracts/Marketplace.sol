//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

abstract contract Ownable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(msg.sender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == msg.sender, "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

interface IERC721
{
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
}



contract MarketPlace is Ownable
{
    mapping(address => mapping(address => mapping(uint => mapping(uint => bool)))) private cancelledTransactions;
    event NFTSold(address indexed from, address indexed to, uint256 indexed tokenId);

	function _verifyMessage(bytes32 _hashedMsg, uint8 _v, bytes32 _r, bytes32 _s) public pure returns (address)
	{
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, _hashedMsg));
        address signer = ecrecover(prefixedHashMessage, _v, _r, _s);
        return signer;
    }

    function cancelListing(address _contractAddress, uint _tokenId, uint _price) public
    {
        cancelledTransactions[msg.sender][_contractAddress][_tokenId][_price] = true;
    }

    function buyNFT(bytes32 _hashedMsg, uint8 _v, bytes32 _r, bytes32 _s, uint _price, address _contractAddress, uint _tokenId, address _seller) public payable
    {
        require(_price == msg.value, "Msg.value must be equal to _price of NFT");
        require(_seller == IERC721(_contractAddress).ownerOf(_tokenId) , "seller is not the same");
        require(keccak256(abi.encode(_seller, _contractAddress, _tokenId, _price)) == _hashedMsg, "Hashed message not same as othe parameters' hash");
        require(_seller == _verifyMessage(_hashedMsg, _v, _r, _s), "Signed wallet doesn't match the seller");
        require(cancelledTransactions[_seller][_contractAddress][_tokenId][_price] == false);
        IERC721(_contractAddress).transferFrom(_seller, msg.sender, _tokenId);
        payable(address(_seller)).transfer(msg.value);
        emit NFTSold( _seller,  msg.sender,  _tokenId);
    }

    function isTokenApproved(address _contractAddress, uint _tokenId, address _seller) public view returns (bool)
    {
        return IERC721(_contractAddress).getApproved(_tokenId) == address(this) || IERC721(_contractAddress).isApprovedForAll(_seller, address(this)) ;
    }
}

// "0xaeb885eae7ecc425b6a49bad5ef205e236b8ab5b400e2a7554cbf7610f22d943", "28", "0x4ec437d6ed046b242067d2c9ed22767999a842bb288f0b3c9cff270c893d46c3", "0x0b867556e7a36ebb1b887a6beedd467388f237c4a856665d701ae4e2883de665", "1000000000000000000", "0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b", "415918", "0x1Abf3a6C41035C1d2A3c74ec22405B54450f5e13"