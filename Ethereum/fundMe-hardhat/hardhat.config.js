require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter")
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */
/*Reading the variables from the .env file*/
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli.."
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
    //Besides localhost, Hardhat comes with another pre-defined network: hardhat. This is the same network used by the development node, but instead of starting an HTTP server, it’s an in-process network that is created when you run your task, and killed at the end of it. So if you run hh test --network hardhat, the result will be pretty much equivalent to the combination of starting a new node, running hh test --network localhost, and then killing the node, all in one command.
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
        //If you run hh node in a terminal, an HTTP server with this development node will start listening for requests in http://localhost:8545, You can now connect to this network from another terminal running hh console --network localhost and make any call as before. Hardhat comes with this pre-defined network and we dont need to add it exclusively, only for parameterization.
        localhost: {
            //Hardhat
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
            // It check the "networks" filed in hardhat-config and the the first key from the second parameter of the network we pass on the cli
        },
    },
}
