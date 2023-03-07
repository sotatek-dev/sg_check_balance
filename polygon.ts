import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
import { Alchemy, Utils } from "alchemy-sdk";
import {
  getTokenBalanceByBlock,
  getTokenBalanceByTransactionHistory,
  network
} from "./balance";

export const getPolygonBalance = async (
  address: string,
  network: network,
  alchemy: Alchemy,
  blockNumber: number
) => {
  console.log("Polygon block", blockNumber);
  let balance = await alchemy.core.getBalance(address, blockNumber);
  balance = Utils.formatEther(balance) as any;
  const [tokenBalanceAtGivenDate, getTokenBalanceTransactionHistory] =
    await Promise.all([
      getTokenBalanceByBlock(address, blockNumber, "Polygon", alchemy),
      getTokenBalanceByTransactionHistory(
        address,
        blockNumber,
        "Polygon",
        alchemy
      )
    ]);
  return [
    { network, address, currency: "MATIC", balance: balance.toString() },
    ...tokenBalanceAtGivenDate,
    ...getTokenBalanceTransactionHistory
  ];
};
