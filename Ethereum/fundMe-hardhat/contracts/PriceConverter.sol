//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/* Explanation:
Libraries are simillar to contracts, but you cant declare any state variable and you cant send ether.
A library is embedded into the contract if all library functions are internal.
Otherwise the library must be deployed and then linked before the contract is deployed.
We can also use libraries to add more functionallity to different values. For example, what we can do actually in this example
is we can have getConversionRate() function be a function of an int256.
So we can add functions as if uint256 was an object or a struct or a contract that we actually created!.
*/

library PriceConverter {
    /*Returns the current price of ETH */
    function getPrice(AggregatorV3Interface priceFeed)
        internal
        view
        returns (uint256)
    {
        (, int256 price, , , ) = priceFeed.latestRoundData(); //ETH in terms of USD
        return uint256(price * 1e10); // 1*10 == 10000000000
    }

    function getConversionRate(
        uint256 ethAmount,
        AggregatorV3Interface priceFeed
    ) internal view returns (uint256) {
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUSD = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUSD;
    }
}
