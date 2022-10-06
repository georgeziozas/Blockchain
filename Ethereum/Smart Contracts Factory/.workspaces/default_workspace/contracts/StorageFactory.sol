// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*RECAP
Our StorageFactory contract allows us to create simple storage contracts, it then saves it to our simpleStorageArray, which we can then call different functions on. We can store values to our SimpleStorage contracts through sfstore() function and retrieve them through sfGet() method. 
*/
import "./SimpleStorage.sol";

contract StorageFactory{
    SimpleStorage[] public simpleStorageArray;

    function createSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    //Access & Interact with 'SimpleStorage' functions
    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
        //In order for you to interact with any contract, you will need two things:
            //Address
            // ABI - Application Binary Interface
        simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);
    }

    //To read the the 'store' function of SimpleStorage From the SimpleStorage Factory
    function sfGet(uint256 _simpleStorageIndex) public view returns(uint256){
       return simpleStorageArray[_simpleStorageIndex].retrieve();
    }


}