// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract TestNFT is ERC721Enumerable {
    constructor() ERC721("TestNFT", "TNFT") {}

    function mint() public {
        _safeMint(msg.sender, totalSupply());
    }
}