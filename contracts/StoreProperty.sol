pragma solidity >=0.4.21;

contract StoreProperty {
    //Intellectual Property Model
    struct IP {
        uint256 id;
        string propertyHash;
        uint256 timestamp;
    }

    mapping(uint256 => IP) public property;

    uint256 public IPCount;

    //Constructor
    /*constructor() public {
    }*/

    function addIP(string memory IPHash) public {
        IPCount++;
        property[IPCount] = IP(IPCount, IPHash, now);
    }
}
