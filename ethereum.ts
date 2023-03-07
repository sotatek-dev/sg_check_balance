import moment from "moment"
;(moment as any).suppressDeprecationWarnings = true
import { Alchemy, Utils } from "alchemy-sdk"
import {
    getTokenBalanceByBlock,
    getTokenBalanceByTransactionHistory,
    network,
} from "./balance"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

export const getEthereumBalance = async (
    address: string,
    network: network,
    alchemy: Alchemy,
    blockNumber: number
) => {
    console.log("Ethereum block", blockNumber)
    let balance = await alchemy.core.getBalance(address, blockNumber)
    balance = Utils.formatEther(balance) as any
    const [tokenBalanceAtGivenDate, getTokenBalanceTransactionHistory] =
        await Promise.all([
            getTokenBalanceByBlock(address, blockNumber, "Ethereum", alchemy),
            getTokenBalanceByTransactionHistory(
                address,
                blockNumber,
                "Ethereum",
              alchemy
            ),
        ])
    return [
        { network, address, currency: "ETH", balance: balance.toString() },
        ...tokenBalanceAtGivenDate,
        ...getTokenBalanceTransactionHistory,
    ]
}
