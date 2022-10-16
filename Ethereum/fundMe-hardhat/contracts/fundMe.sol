// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./PriceConverter.sol";
error FundMe__NotOwner();

/** @title A contract for crowd funding
 * @author Ziozas George
 * @notice This contract is to demo a sample funding contract
 * @dev This implements price feeds as our library
 */
contract FundMe {
    //Type Declarations
    using PriceConverter for uint256;
    //State Variables
    uint256 public constant MINIMUM_USD = 50 * 1e18;
    address[] private s_funders;
    mapping(address => uint256) private s_adressToAmountFunded;
    address private immutable i_owner;
    AggregatorV3Interface private s_priceFeed;

    //Modifier
    //A modifier is a keyword that we can add right in the function declaration, to modify the function with that functionality
    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        }
        //require(msg.sender == i_owner, "You are not the i_owner!");
        _; //do the rest of the  code after

        //If we had the _; before the first line, it means that: First do all the other code and then run the require
    }

    /* What happens if someone sends this contract ETH without calling the fund function?
    There is actually a way for when people send money to this contract or people call a function that doesnt exist, for us to still trigger some code.
    1. Receive() [when you send something but you dont specify what to do (CALLDATA)]
    2. Fallback() [when you send something but you specify what to do (CALLDATA)]

     Diagram Explaining the special functions
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

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }

    /**
     * @notice This function funds this contract
     * @dev This implements price feeds as our library
     */
    function fund() public payable {
        // msg.value here is considered as the first parameter of the function it calls(getConversionRate)
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "The amount is less than 1ETH! Try Again."
        ); // 1e18 == 1* 10 ** 18 = 100000000000000000 wei = 1eth
        s_funders.push(msg.sender);
        s_adressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner {
        //resset mapping
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_adressToAmountFunded[funder] = 0;
        }
        //resetting array
        s_funders = new address[](0);

        //Withdraw funds (we can do it with 3 ways)

        //1. Transfer [Capped at 2300 gas and will throw an error upon failing]
        //payable(msg.sender).transfer(address(this).balance);

        //2. Send [Capped at 2300 gas and will return a bool upon excecution without error]
        //bool sendSuccess = payable(msg.sender).send(address(this).balance);
        //require(sendSuccess, "Send Failed");

        //3. Call [forward all gas or set gas, reutns bool] - RECOMENDED WAY
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Send Failed");
    }

    function cheaperWithdraw() public onlyOwner {
        address[] memory funders = s_funders;
        // mappings can't be in memory, sorry!
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            s_adressToAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        // payable(msg.sender).transfer(address(this).balance);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success);
    }

    function getAddressToAmountFunded(address fundingAddress)
        public
        view
        returns (uint256)
    {
        return s_adressToAmountFunded[fundingAddress];
    }

    function getVersion() public view returns (uint256) {
        return s_priceFeed.version();
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
