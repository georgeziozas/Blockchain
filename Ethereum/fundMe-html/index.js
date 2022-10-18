import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const withdrawButton = document.getElementById("withdrawButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
connectButton.onclick = connect;
withdrawButton.onclick = withdraw;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      //MetaMask uses the ethereum.request(args) method to wrap an RPC API.
      //eth_requestAccounts::: Requests that the user provides an Ethereum address to be identified by. Returns a Promise that resolves to an array of a single Ethereum address string. If the user denies the request, the Promise will reject with a 4001 error.
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "Connected";
    //eth_accounts::: Returns a list of addresses owned by client.
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function withdraw() {
  console.log(`Withdrawing...`);
  if (typeof window.ethereum !== "undefined") {
    //The Web3Provider is meant to ease moving from a web3.js based application to ethers by wrapping an existing Web3-compatible and exposing it as an ethers.js Provider which can then be used with the rest of the library.
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //send():::The request should be a standard JSON-RPC payload, which should at a minimum specify the method and params.
    await provider.send("eth_requestAccounts", []);
    //getSigner() returns the wallet provided by the provider obj
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.withdraw();
      await listenForTransactionMine(transactionResponse, provider);
      // await transactionResponse.wait(1)
    } catch (error) {
      console.log(error);
    }
  } else {
    withdrawButton.innerHTML = "Please install MetaMask";
  }
}

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value;
  console.log(`Funding with ${ethAmount}...`);
  if (typeof window.ethereum !== "undefined") {
    //The Web3Provider is meant to ease moving from a web3.js based application to ethers by wrapping an existing Web3-compatible and exposing it as an ethers.js Provider which can then be used with the rest of the library.
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //getSigner() returns the wallet provided by the provider obj
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      //await means: we are going to stop untill this is done
      await listenForTransactionMine(transactionResponse, provider);
    } catch (error) {
      console.log(error);
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask";
  }
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      const balance = await provider.getBalance(contractAddress);
      console.log(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log(error);
    }
  } else {
    balanceButton.innerHTML = "Please install MetaMask";
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    //promise here works kind like a listener for the blockchain
    try {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations. `
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
