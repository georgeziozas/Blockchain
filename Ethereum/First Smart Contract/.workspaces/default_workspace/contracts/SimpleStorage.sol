// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7; //^ means any version >=0.8.7, we can also specifiy a specific range of versions: >=0.8.7 <0.9.0;


/* Smart Contract TOC
-We have a global variable favoriteNumber that we can save a favorite number to with the help of store() function.
-We have a mapping of name to favoriteNumber
-We have an array of type People 
-We can add to both the array and the mapping through our addPerson() function so we can save multiple peoples favorite numbers and retrieve them by name only.
*/

contract SimpleStorage{
    
    uint256 favoriteNumber;

    People[] public people;
    struct People {
        uint256 favoriteNumber;
        string name;
    }
    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }
    
    function addPerson(string memory _name, uint256 _favoriteNumber ) public {
        people.push(People(_favoriteNumber,_name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }


}

/*################################SOLIDITY CHEATSHEET################################*/

    /*##########FUNCTION VISIBILITY SPECIFIERS##########
    
    public: visible externally and internally (creates a getter function for storage/state variables)
    private: only visible in the current contract
    external: only visible externally (only for functions) - i.e. can only be message-called (via this.func)
    internal: only visible internally
     */

    /*##########VALUE TYPES (they are always passed by value)##########
    bool hasFavoriteNumber = true;
    uint256 favoriteNumber = 5;
    string favoriteNumberInText = "Five";
    int256 favoriteInt = -5; //int default is int256
    address myAddress = 0xC6Ca95661AfA2499Cfdc56a28AC74B5dBc2C56e7;
    bytes32 favoriteBytes = "cat"; //0x12345634.. whatever
    */

    /*##########VIEW & PURE TYPE OF FUNCTIONS##########
    
    There are 2 keywords in solidity that notate a function that doesnt actually have to spend gas to be run - view & pure

    VIEW --> A function that is a view function means we're just going to read state from this contract. It also disallows any 
             modification of state, so you can cannot alter state with view type of function.

                    function retrieve() public view returns (uint256){ return x;}

    PURE --> pure functions also disallow to alter state but they FURTHER disallow to read from the blockchain. What would you do with a pure
            function is to just calculate and return something static. 

                    function retrieve() public pure returns (uint256){ return 1+1;}
    
    !! If we call a view or pure function from inside a function that costs gas then the view or pure function will also cost gas
    !! Every public variable we create on solidity has a getter-VIEW automatically created for it.
    */       

    /*##########STRUCT##########
    People[] public people;
    struct People {
        uint256 favoriteNumber;
        string name;
    }
    people.push(People(_favoriteNumber,_name));
    */
   
    /*##########DATA LOCATION OF INFORMATION ON EVM##########

    !! Data location can only be specified for array, struct or mapping types

    1. Stack
    2. Memory: Temporary variables that can be modified. It only exists temporarily during the transaction.
    3. Storage: Permanent variables that can be modified. If we dont specify it otherwise, all variables are storage variables.
    4. Calldata: Temporary variables that cannot be modified. It only exists temporarily during the transaction.
    5. Code
    6. Logs
    */

    /*##########Mappings##########
    A mapping is a data structure where a key is "mapped" to a single value, something like a dictionary.

        mapping(string => uint256) public nameToFavoriteNumber;
        nameToFavoriteNumber[_name] = _favoriteNumber;
    */