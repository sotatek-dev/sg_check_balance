import { network } from "./balance"
import { Network } from "alchemy-sdk"

export const wallet: {
    address: string
    network: network
    alchemy: Network | null
}[] = [
    {
        address: "0x01224829fa4d9fc7e37bca74f756e4f718da3476",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x1785ee8dd9e22f14e7d538b32c505905cfde3eb2",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x5d8d4884d6194d23b98b086d2c740a2d1dd93dae",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0xCbAC3Af157D5732Dc6F66C39Abb456b76A924Aa5",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x81Ea7531aE062Be7871f1310FD384bC569D2002e",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0xD00af5317C7b210494e045259a796557422292e7",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x75e64504fc283974d6208cc12b0fd844378c3e17",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x53AF215278b88AdaD04226b2b8eE64aed369C7B2",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0xf67666246bc53194736b8695e3566fe9a0830ea3",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x70dff939b64aec32bfacb3771ba861c2907607fc",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x2e2deefa9d237f74337e5a1d8069e259a78e4526",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x4822606d9932b1f7897382ef689248d77e345ebe",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x65c01b7403448301b740c6d5a5478485e5f0960c",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0xf110691e3d9a498b2cb5a51f71c1930b3fe2f19a",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0xbf487a300b2d33b691a46293be9c1054335078e1",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x0271114379ad9ccb31dd7c6c9c9336bb83d7cad0",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x83468A7dF2D46B19d3E623321891bFdF5cb1FE96",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x01224829fa4d9fc7e37bca74f756e4f718da3476",
        network: "Ethereum",
        alchemy: Network.ETH_MAINNET,
    },
    {
        address: "0x01224829fa4d9fc7e37bca74f756e4f718da3476",
        network: "Polygon",
        alchemy: Network.MATIC_MAINNET,
    },
    {
        address: "0x1785ee8dd9e22f14e7d538b32c505905cfde3eb2",
        network: "Polygon",
        alchemy: Network.MATIC_MAINNET,
    },
    {
        address: "0x5d8d4884d6194d23b98b086d2c740a2d1dd93dae",
        network: "Polygon",
        alchemy: Network.MATIC_MAINNET,
    },
    {
        address: "0xCbAC3Af157D5732Dc6F66C39Abb456b76A924Aa5",
        network: "Polygon",
        alchemy: Network.MATIC_MAINNET,
    },
    {
        address: "0x81Ea7531aE062Be7871f1310FD384bC569D2002e",
        network: "Polygon",
        alchemy: Network.MATIC_MAINNET,
    },
    {
        address: "0xD00af5317C7b210494e045259a796557422292e7",
        network: "Polygon",
        alchemy: Network.MATIC_MAINNET,
    },
    {
        address: "0x53AF215278b88AdaD04226b2b8eE64aed369C7B2",
        network: "Polygon",
        alchemy: Network.MATIC_MAINNET,
    },
    {
        address: "0x2E2DEEFA9d237f74337e5a1d8069E259A78E4526",
        network: "Polygon",
        alchemy: Network.MATIC_MAINNET,
    },
    {
        address: "0x83468a7df2d46b19d3e623321891bfdf5cb1fe96",
        network: "Polygon",
        alchemy: Network.MATIC_MAINNET,
    },
    {
        address: "0x0271114379ad9ccb31dd7c6c9c9336bb83d7cad0",
        network: "Polygon",
        alchemy: Network.MATIC_MAINNET,
    },
    {
        address: "0x4822606d9932B1f7897382EF689248D77E345Ebe",
        network: "Polygon",
        alchemy: Network.MATIC_MAINNET,
    },
    {
        address: "bc1qv4jvwgpe74xwlcvfjqhqf502qzh9gn7caemct3",
        network: "Bitcoin",
        alchemy: null,
    },
    {
        address: "bc1qeedh94dk7w2x70yrp23qrm53lkcx7q3w3ukf9t",
        network: "Bitcoin",
        alchemy: null,
    },
    {
        address: "3J4Rku1tdHzk9jBu1kaRUUKbj6oTZXEsBT",
        network: "Bitcoin",
        alchemy: null,
    },
    // {
    //     address: "qr5pu7eznvmn57p6hrgq8ngcqz50uthh0unetlcxt8",
    //     network: "BitcoinCash",
    //     alchemy: null,
    // },
    // {
    //     address: "D9KvmkL2AnWY55DxHkXVA4Kzk3MEq6X2tP",
    //     network: "Dogecoin",
    //     alchemy: null,
    // },
    // {
    //     address: "LTG2dAYdaEXdpu3mG986NXRdNArUuuChg7",
    //     network: "Litecoin",
    //     alchemy: null,
    // },
]
