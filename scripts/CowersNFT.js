// This is the main Script for the deploy, minting and showing all mints done
const {ethers} = require('hardhat');
require('dotenv').config();

const deployerAddress = '0xCF7869798aa5132Ef4A245fAE10aC79aB7e62375'
const contractAddress = '0x46aF4C2e6Fb91F68fED0FCdEa8B9c02FC365a42a'

//The object containing properties and functions for performing mints, and tasks
let CowersApp = {
    // This property function is called to deploy the cowersNFT smart contract
    deployCowers: async function deployCowersFunction() {
        let deployer, cowersNFT
        [deployer, ] = await ethers.getSigners()
        let CowersNFT = await ethers.getContractFactory('CowersNFT', deployer)
        cowersNFT = await CowersNFT.deploy()

        await cowersNFT.deployed()
        return cowersNFT
    },

    // Mint property function for calling the mint function of the CowersNFT smart contract
    mint: async function mintFunction(_tokenId) {
        [, , user2] = await ethers.getSigners()
        let CowersNFT = await ethers.getContractFactory('CowersNFT')
        let cowersNFT = CowersNFT.attach(contractAddress)

        cost = ethers.utils.parseEther('0.005')
        try {
            await cowersNFT.connect(user2).functions.mint('0x', _tokenId, {
                value: cost, gasLimit: 6700000, gasPrice: Number(await ethers.provider.getGasPrice())
            })
        } catch (err) {
            console.log(err.message)
            throw err
        }
    },

    // This is a special function that can only be called by the deployer to mint all tokens
    mintAll: async function mintAllFunction(numberOfTokens) {
        [deployer, , ] = await ethers.getSigners()
        let CowersNFT = await ethers.getContractFactory('CowersNFT')
        let cowersNFT = CowersNFT.attach(contractAddress)

        try {
            await cowersNFT.functions.mintAll('0x', numberOfTokens, {
                gasLimit: 6700000, gasPrice: Number(await ethers.provider.getGasPrice())
            })
        } catch (err) {
            console.log(err.message)
            throw err
        }
    },

    // Transfer function for owners of tokens to transfer to other ethereum wallet addresses
    transferTo: async function transferToFunction(from, to, tokenId) {
        
        let CowersNFT = await ethers.getContractFactory('CowersNFT')
        let cowersNFT = CowersNFT.attach(contractAddress)

        try {
            await cowersNFT.connect(from).functions.transferTo(to, tokenId, {
                gasLimit: 6700000, gasPrice: Number(await ethers.provider.getGasPrice())
            })
        } catch (err) {
            console.log(err.message)
            throw err
        }
    },

    // Shows the Mints and information.
    showMints: async function showMintsFunction() {
        [,,user2] = await ethers.getSigners()
        let CowersNFT = await ethers.getContractFactory('CowersNFT')
        let cowersNFT = CowersNFT.attach(contractAddress)

        try {
            let allMints = await cowersNFT.functions.allMintsShow()
            console.log(allMints)
        } catch (err) {
            console.log(err.message)
            throw err
        }
        let balUser2 = await cowersNFT.functions.balanceOf(user2.address)
        console.log(`User2 Address (${user2.address}): ${Number(await balUser2)} NFT(s)`)
    }
}

main = async () => {
    //await CowersApp.mint(5)
    //await CowersApp.mintAll(20)

    //[,from] = await ethers.getSigners()
    //await CowersApp.transferTo(from, to, tokenId)
    await CowersApp.showMints()
}
main()