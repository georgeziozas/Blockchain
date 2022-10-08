// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./PriceConverter.sol";

//gas : 972215

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;
    uint256 public constant MINIMUM_USD = 50 * 1e18;
    address[] public funders;
    mapping(address => uint256) public adressToAmountFunded;
    address public immutable i_owner;

    constructor(){
        i_owner = msg.sender;
    }

    function fund() public payable{
        // msg.value here is considered as the first parameter of the function it calls(getConversionRate)
        require(msg.value.getConversionRate() >= MINIMUM_USD, "The amount is less than 1ETH! Try Again."); // 1e18 == 1* 10 ** 18 = 100000000000000000 wei = 1eth
        funders.push(msg.sender);
        adressToAmountFunded[msg.sender] = msg.value;
    }
    
    function withdraw() public onlyOwner{
        //resset mapping
        for(uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            adressToAmountFunded[funder] = 0;  
        }
        //resetting array
        funders = new address[](0);

        //Withdraw funds (we can do it with 3 ways)
        
        //1. Transfer [Capped at 2300 gas and will throw an error upon failing]
            //payable(msg.sender).transfer(address(this).balance);
       
        //2. Send [Capped at 2300 gas and will return a bool upon excecution without error]
            //bool sendSuccess = payable(msg.sender).send(address(this).balance);
            //require(sendSuccess, "Send Failed");
        
        //3. Call [forward all gas or set gas, reutns bool] - RECOMENDED WAY
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");    
        require(callSuccess, "Send Failed");
    }

//Modifier
//A modifier is a keyword that we can add right in the function declaration, to modify the function with that functionality
modifier onlyOwner{
        if(msg.sender != i_owner){ revert NotOwner(); }
        //require(msg.sender == i_owner, "You are not the Owner!");
        _; //do the rest of the  code after 

        //If we had the _; before the first line, it means that: First do all the other code and then run the require
    }

    // What happens if someone sends this contract ETH without calling the fund function?
    //There is actually a way for when people send money to this contract or people call a function that doesnt exist, for us to still trigger some code.

        //1. Receive() [when you send something but you dont specify what to do (CALLDATA)]

        //2. Fallback() [when you send something but you specify what to do (CALLDATA)]

    /* Diagram Explaining the special functions
            is msg.data empty?
                  /   \
                  yes  no
                   /    \    
            receive()?   fallback()   
             /      \     
            yes     no
             /       \   
        receive()  fallback()
    */

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

}
