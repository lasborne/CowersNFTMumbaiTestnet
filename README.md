# CowersNFT
Regular ERC721-standard contract, built inheriting all the attributes of the OpenZeppelin ERC721 smart contract, deployed on the Polygon Mumbai Testnet.
Contains basic functions like mint. This 'Mint' function is not allowed for use by the contract owner, a user can only mint the NFT once, and is guarded for ReEntrancy attacks.
The user is allowed to mint only if a value of 0.005 Ether (MATIC) is sent along (nothing more nor less) while invoking the mint function.
The funds received by the 'Mint' function from the sender is immediately transferred to the contract owner.
MintAll function is only available to the CowersNFT contract deployer.

CowersNFT is built for minting 1 NFT per user.
