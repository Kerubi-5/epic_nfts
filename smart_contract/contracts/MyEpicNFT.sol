pragma solidity ^0.8.1;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import {Base64} from "./lib/Base64.sol";

// We inherit the contract we imported. This means we'll have access
// to the inherited contract's methods.
contract MyEpicNFT is ERC721URIStorage {
    // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Total number of tokens we have.
    uint256 private _totalSupply;

    string svgPartOne =
        "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='";
    string svgPartTwo =
        "'/><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    string[] firstWords = [
        "Lohtar's",
        "Thoges'",
        "Zithek's",
        "Urgonoth's",
        "Zeelvan's",
        "Zakarum's",
        "Vuguls'",
        "Vanec's",
        "Saalrac's",
        "Rak's",
        "Pelor's",
        "Nadarr's",
        "Myrddraal's",
        "Mephisto's",
        "Mara's",
        "Lemuria's",
        "Kurast's",
        "Kerberos's",
        "Khalim's",
        "Izual's",
        "Hrimul's",
        "Hate's",
        "Gheed's",
        "Furax's",
        "Elder's",
        "Droga's",
        "Drognan's"
    ];

    string[] secondWords = [
        "Smelly",
        "Humorous",
        "Technical",
        "Lavish",
        "Voiceless",
        "Madly",
        "Scary",
        "Swanky",
        "Gusty",
        "Accessible",
        "Bewildered",
        "Enchanting",
        "Snotty",
        "Filthy",
        "Feigned",
        "Legal",
        "Bustling",
        "Zealous",
        "Stupendous",
        "Square",
        "Godly"
    ];

    string[] thirdWords = [
        "Quarterstaff",
        "Sword",
        "Dagger",
        "Mace",
        "Axe",
        "Bow",
        "Staff",
        "Wand",
        "Scepter",
        "Spear",
        "Crossbow",
        "Hammer",
        "Flail",
        "Glaive",
        "Halberd",
        "Lance",
        "Pike",
        "Rapier",
        "Scimitar",
        "Trident",
        "Warhammer",
        "Whip"
    ];

    string[] colors = ["red", "#08C2A8", "black", "yellow", "blue", "green"];

    event NewEpicNFTMinted(address sender, uint256 tokenId, string svg);

    // We need to pass the name of our NFTs token and its symbol.
    constructor() ERC721("SquareNFT", "SQUARE") {
        console.log("This is my NFT contract. Woah!");
    }

    function getTotalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function incrementSupply() public {
        _totalSupply++;
    }

    // I create a function to randomly pick a word from each array.
    function pickRandomFirstWord(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        // I seed the random generator. More on this in the lesson.
        uint256 rand = random(
            string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId)))
        );
        // Squash the # between 0 and the length of the array to avoid going out of bounds.
        rand = rand % firstWords.length;
        return firstWords[rand];
    }

    function pickRandomSecondWord(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId)))
        );
        rand = rand % secondWords.length;
        return secondWords[rand];
    }

    function pickRandomThirdWord(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("THIRD_WORD", Strings.toString(tokenId)))
        );
        rand = rand % thirdWords.length;
        return thirdWords[rand];
    }

    function pickRandomColor(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("COLOR", Strings.toString(tokenId)))
        );
        rand = rand % colors.length;
        return colors[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    // A function our user will hit to get their NFT.
    function makeAnEpicNFT() public {
        uint256 newItemId = _tokenIds.current();

        string memory first = pickRandomFirstWord(newItemId);
        string memory second = pickRandomSecondWord(newItemId);
        string memory third = pickRandomThirdWord(newItemId);
        string memory combinedWord = string(
            abi.encodePacked(first, " ", second, " ", third)
        );

        // Add the random color in.
        string memory randomColor = pickRandomColor(newItemId);

        string memory finalSvg = string(
            abi.encodePacked(
                svgPartOne,
                randomColor,
                svgPartTwo,
                combinedWord,
                "</text></svg>"
            )
        );

        string memory finalSvgB64 = Base64.encode(bytes(finalSvg));

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        combinedWord,
                        '", "description": "A highly acclaimed collection of squares.", "image": "data:image/svg+xml;base64,',
                        finalSvgB64,
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n--------------------");
        console.log(
            string(
                abi.encodePacked(
                    "https://nftpreview.0xdev.codes/?code=",
                    finalTokenUri
                )
            )
        );
        console.log("--------------------\n");

        // Increment the supply.
        incrementSupply();
        require(getTotalSupply() <= 50, "Has exceeded supply limit");
        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );
        emit NewEpicNFTMinted(msg.sender, newItemId, finalSvgB64);
    }
}
