const { task } = require("hardhat/config")

require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.blockNumber
        console.log(`Current Block Number: ${blockNumber}`)
    }
)
