export const abi = [
    {
        "type": "constructor",
        "name": "",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "error",
        "name": "ERC1155InsufficientBalance",
        "inputs": [
            {
                "type": "address",
                "name": "sender",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "balance",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "needed",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "tokenId",
                "internalType": "uint256"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "ERC1155InvalidApprover",
        "inputs": [
            {
                "type": "address",
                "name": "approver",
                "internalType": "address"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "ERC1155InvalidArrayLength",
        "inputs": [
            {
                "type": "uint256",
                "name": "idsLength",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "valuesLength",
                "internalType": "uint256"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "ERC1155InvalidOperator",
        "inputs": [
            {
                "type": "address",
                "name": "operator",
                "internalType": "address"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "ERC1155InvalidReceiver",
        "inputs": [
            {
                "type": "address",
                "name": "receiver",
                "internalType": "address"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "ERC1155InvalidSender",
        "inputs": [
            {
                "type": "address",
                "name": "sender",
                "internalType": "address"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "ERC1155MissingApprovalForAll",
        "inputs": [
            {
                "type": "address",
                "name": "operator",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "owner",
                "internalType": "address"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "EnforcedPause",
        "inputs": [],
        "outputs": []
    },
    {
        "type": "error",
        "name": "ExpectedPause",
        "inputs": [],
        "outputs": []
    },
    {
        "type": "error",
        "name": "InvalidFTType",
        "inputs": [
            {
                "type": "uint256",
                "name": "ftType",
                "internalType": "uint256"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "InvalidNFTType",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenType",
                "internalType": "uint256"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "InvalidTokenId",
        "inputs": [
            {
                "type": "uint256",
                "name": "invalidId",
                "internalType": "uint256"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "MaxNFTSupplyReached",
        "inputs": [
            {
                "type": "uint8",
                "name": "tokenType",
                "internalType": "enum DraftMultiMinter.TokenType"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "type": "address",
                "name": "owner",
                "internalType": "address"
            }
        ],
        "outputs": []
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            }
        ],
        "outputs": []
    },
    {
        "type": "event",
        "name": "ApprovalForAll",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "operator",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "bool",
                "name": "approved",
                "indexed": false,
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "FTMinted",
        "inputs": [
            {
                "type": "address",
                "name": "Account",
                "indexed": false,
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "FtType",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "Amount",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NFTBatchMinted",
        "inputs": [
            {
                "type": "address",
                "name": "Account",
                "indexed": false,
                "internalType": "address"
            },
            {
                "type": "uint256[]",
                "name": "Ids",
                "indexed": false,
                "internalType": "uint256[]"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "NFTMinted",
        "inputs": [
            {
                "type": "address",
                "name": "Account",
                "indexed": false,
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "NftType",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "NewId",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "type": "address",
                "name": "previousOwner",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "newOwner",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Paused",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TransferBatch",
        "inputs": [
            {
                "type": "address",
                "name": "operator",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "from",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "uint256[]",
                "name": "ids",
                "indexed": false,
                "internalType": "uint256[]"
            },
            {
                "type": "uint256[]",
                "name": "values",
                "indexed": false,
                "internalType": "uint256[]"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "TransferSingle",
        "inputs": [
            {
                "type": "address",
                "name": "operator",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "from",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "to",
                "indexed": true,
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "id",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "value",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "URI",
        "inputs": [
            {
                "type": "string",
                "name": "value",
                "indexed": false,
                "internalType": "string"
            },
            {
                "type": "uint256",
                "name": "id",
                "indexed": true,
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "URIUpdated",
        "inputs": [
            {
                "type": "string",
                "name": "NewUri",
                "indexed": false,
                "internalType": "string"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Unpaused",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "outputs": [],
        "anonymous": false
    },
    {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "id",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "balanceOfBatch",
        "inputs": [
            {
                "type": "address[]",
                "name": "accounts",
                "internalType": "address[]"
            },
            {
                "type": "uint256[]",
                "name": "ids",
                "internalType": "uint256[]"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "",
                "internalType": "uint256[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "burn",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "id",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "value",
                "internalType": "uint256"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "burnBatch",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            },
            {
                "type": "uint256[]",
                "name": "ids",
                "internalType": "uint256[]"
            },
            {
                "type": "uint256[]",
                "name": "values",
                "internalType": "uint256[]"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "contractURI",
        "inputs": [],
        "outputs": [
            {
                "type": "string",
                "name": "collectionURI",
                "internalType": "string"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "exists",
        "inputs": [
            {
                "type": "uint256",
                "name": "id",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getCurrentNFTSupply",
        "inputs": [
            {
                "type": "uint8",
                "name": "tokenType",
                "internalType": "enum DraftMultiMinter.TokenType"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTokenId",
        "inputs": [
            {
                "type": "uint8",
                "name": "tokenType",
                "internalType": "enum DraftMultiMinter.TokenType"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getTokenTypeFromId",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "uint8",
                "name": "",
                "internalType": "enum DraftMultiMinter.TokenType"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "isApprovedForAll",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "operator",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "isFungibleToken",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "isNonFungibleToken",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "stateMutability": "pure"
    },
    {
        "type": "function",
        "name": "mintFT",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "ftType",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "amount",
                "internalType": "uint256"
            },
            {
                "type": "bytes",
                "name": "data",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "mintNFT",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "tokenType",
                "internalType": "uint256"
            },
            {
                "type": "bytes",
                "name": "data",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": "",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pause",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "paused",
        "inputs": [],
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "safeBatchTransferFrom",
        "inputs": [
            {
                "type": "address",
                "name": "from",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256[]",
                "name": "ids",
                "internalType": "uint256[]"
            },
            {
                "type": "uint256[]",
                "name": "values",
                "internalType": "uint256[]"
            },
            {
                "type": "bytes",
                "name": "data",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "safeTransferFrom",
        "inputs": [
            {
                "type": "address",
                "name": "from",
                "internalType": "address"
            },
            {
                "type": "address",
                "name": "to",
                "internalType": "address"
            },
            {
                "type": "uint256",
                "name": "id",
                "internalType": "uint256"
            },
            {
                "type": "uint256",
                "name": "value",
                "internalType": "uint256"
            },
            {
                "type": "bytes",
                "name": "data",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setApprovalForAll",
        "inputs": [
            {
                "type": "address",
                "name": "operator",
                "internalType": "address"
            },
            {
                "type": "bool",
                "name": "approved",
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "setURI",
        "inputs": [
            {
                "type": "string",
                "name": "newUri",
                "internalType": "string"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "supportsInterface",
        "inputs": [
            {
                "type": "bytes4",
                "name": "interfaceId",
                "internalType": "bytes4"
            }
        ],
        "outputs": [
            {
                "type": "bool",
                "name": "",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalSupply",
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalSupply",
        "inputs": [
            {
                "type": "uint256",
                "name": "id",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "type": "address",
                "name": "newOwner",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "unpause",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "uri",
        "inputs": [
            {
                "type": "uint256",
                "name": "tokenId",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "type": "string",
                "name": "",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    }
]