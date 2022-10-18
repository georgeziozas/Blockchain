const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    //deployments: contains functions to access past deployments or to save new ones, as well as helpers functions.
    //The deploy Task, This is a new task that the hardhat-deploy adds. As the name suggests it deploys contracts. To be exact it will look for files in the folder deploy and excecute them in turn
    const { deploy, log } = deployments

    //getNamedAccounts: () => Promise<{ [name: string]: string }>: a function returning an object whose keys are names and values are addresses. It is parsed from the namedAccounts configuration
    //namedAccounts allows you to associate names to addresses and have them configured per chain. This allows you to have meaningful names in your tests while the addresses match to multi sig in real network for example.
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUsdPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        //network.name === --network x on CLI
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    //if the contract pricefeed doesnt exist (localhost) then we deploy a minimal
    //version of it
    //when going for localhost or hardhat network we want to use mocks

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], //the args of the constructor of the contract we want to deploy
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log("--------------------------------------------------")

    log(`FundMe deployed at ${fundMe.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}

module.exports.tags = ["all", "fundMe"]
