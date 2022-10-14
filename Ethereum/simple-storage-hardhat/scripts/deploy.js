const { config } = require("dotenv")
const { ethers, run, network } = require("hardhat")
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying Contract...")
    const simpleStorageContract = await SimpleStorageFactory.deploy()
    await simpleStorageContract.deployed()
    console.log(`Deployed Contract to: ${simpleStorageContract.address}`)

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorageContract.deployTransaction.wait(6)
        await verify(simpleStorageContract.address, [])
    }

    const currentValue = await simpleStorageContract.retrieve()
    console.log(`Current Value is: ${currentValue}`)

    const TransactionResposneUpdateValue = await simpleStorageContract.store(7)
    await TransactionResposneUpdateValue.wait(1)
    const updatedValue = await simpleStorageContract.retrieve()
    console.log(`Current Value is: ${updatedValue}`)
}

//contract auto-verification on etherscan
async function verify(contractAddress, args) {
    console.log("verifying Contract...:")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}
// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
