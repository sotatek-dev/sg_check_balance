import { getEthereumBalance } from "./ethereum";
import { wallet } from "./wallet";
import * as _ from "lodash";
import { ethers } from "ethers";
import { AlchemySettings } from "alchemy-sdk/dist/src/types/types";
import { Alchemy, Network } from "alchemy-sdk";
import dayjs from "dayjs";
import { getBalanceBitcoin } from "./bitcoin";
import { getPolygonBalance } from "./polygon";
import { createWriteStream } from "fs";
import * as csv from "fast-csv";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import axios from "axios";
import { commify, convertToNumber } from "./util";
import moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { erc20ABI } from "./abi";
import BigNumber from "bignumber.js";
import { getLiteCoinBalance } from "./lite";

export const molarisAPI =
  "OD8efw4Rj1K1pGROjiTGmOF7b6W8kpmkKxzusEjyhxRD61hkqIwtf5dZMAHojjtx";

dayjs.extend(utc);
dayjs.extend(timezone);

// adds the blockTag flag to query past balances

interface IBalanceResponse {
  network: string;
  balance: string | number;
  currency: string;
  address: string;
  date?: string;
}

export type network =
  | "Polygon"
  | "Ethereum"
  | "Solana"
  | "Bitcoin"
  | "Dogecoin"
  | "Litecoin"
  | "BitcoinCash"
export const alchemyApiKey = "N74maNprKJusav0WLa6DD0cgyoJA2D-b";
export const etherScanAPIKey = "R2EAF7EPGS2XC1Z3ID9EZ2JKXYIMPHPWW2";
export const polygonScanAPIKey = "ES4E98FJ523AXHUCDTPSSQ45E6UM9EGNA5";
export const alchemyConfig: AlchemySettings = {
  apiKey: alchemyApiKey
};

export const getTokenBalance = async (address: string, network: network) => {
  const chain = network === "Ethereum" ? EvmChain.ETHEREUM : EvmChain.POLYGON;
  const response = await moralis.EvmApi.token.getWalletTokenBalances({
    address,
    chain
  });
  return response.toJSON();
};
export const getTokenBalanceByTransactionHistory = async (
  walletAddress: string,
  blockNum: number,
  network: network,
  alchemy: Alchemy
) => {
  let url = null;
  if (network === "Ethereum") {
    url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${walletAddress}&startblock=0&endblock=${blockNum}&sort=asc&apikey=${etherScanAPIKey}`;
  }
  if (network === "Polygon") {
    url = `https://api.polygonscan.com/api?module=account&action=tokentx&address=${walletAddress}&startblock=0&endblock=${blockNum}&sort=asc&apikey=${polygonScanAPIKey}`;
  }
  const { status, data } = await axios.get(url);
  if (status !== 200) {
    throw new Error("Fail to get transaction");
  }
  const transaction = data.result;
  const uniqueToken: any[] = [
    ...new Map(
      transaction
        .map((t) => ({
          token_address: t.contractAddress,
          name: t.tokenName,
          symbol: t.tokenSymbol,
          decimals: t.tokenDecimal,
          balance: null
        }))
        .map((item) => [item["symbol"], item])
    ).values()
  ];
  return await Promise.all(
    uniqueToken.map(async (t) => {
      // let provider;
      // if (network === "Ethereum") {
      //   provider = new ethers.providers.InfuraProvider("homestead");
      // }
      // if (network === "Polygon") {
      //   provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
      // }
      // const contract = new ethers.Contract(
      //   t.token_address,
      //   erc20ABI,
      //   provider
      // );
      // const data = await contract.balanceOf(walletAddress, {
      //   blockTag: +blockNum
      // });
      let abi = ["function balanceOf(address account)"];
      let iface = new ethers.utils.Interface(abi);
      let encodeFunctionData = iface.encodeFunctionData("balanceOf", [
        walletAddress
      ]);
      let balanceHex: any = await alchemy.core.call(
        {
          to: t.token_address,
          data: encodeFunctionData
        },
        +blockNum
      );
      balanceHex = BigInt(balanceHex);
      const balance = convertToNumber(balanceHex, t.decimals);
      return {
        network,
        address: walletAddress,
        currency: t.symbol,
        balance
      };
    })
  );
};
export const getTokenBalanceByBlock = async (
  walletAddress: string,
  blockNum: number,
  network: network,
  alchemy: Alchemy
) => {
  const tokenBalanceRes = await getTokenBalance(walletAddress, network);
  return await Promise.all(
    tokenBalanceRes.map(async (t) => {
      // let provider;
      // if (network === "Ethereum") {
      //   provider = new ethers.providers.InfuraProvider("homestead");
      // }
      // if (network === "Polygon") {
      //   provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");
      // }
      // console.log("TOKEN: ", t);
      // const contract = new ethers.Contract(
      //   t.token_address,
      //   erc20ABI,
      //   provider
      // );
      // const data = await contract.balanceOf(walletAddress, {
      //   blockTag: +blockNum
      // });
      let abi = ["function balanceOf(address account)"];
      let iface = new ethers.utils.Interface(abi);
      let encodeFunctionData = iface.encodeFunctionData("balanceOf", [
        walletAddress
      ]);
      let balanceHex: any = await alchemy.core.call(
        {
          to: t.token_address,
          data: encodeFunctionData
        },
        +blockNum
      );
      let balance = 0;
      if (balanceHex != "0x") {
        balanceHex = BigInt(balanceHex);
        balance = convertToNumber(balanceHex, t.decimals);
      }
      // const balance = convertToNumber(data, t.decimals);
      return {
        network,
        address: walletAddress,
        currency: t.symbol,
        balance
      };
    })
  );
};

const getBalance = async (
  timestamp: string,
  address: string,
  network: network,
  alchemyNetwork: Network
) => {
  let balance: IBalanceResponse[] | null = null;
  const alchemy = new Alchemy({
    ...alchemyConfig,
    network: alchemyNetwork
  });
  let block: number;
  const unix = dayjs(timestamp).unix();
  if (network === "Ethereum") {
    const res = await axios.get(
      `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${unix}&closest=before&apikey=${etherScanAPIKey}`
    );
    block = parseInt(res.data.result);
  }
  if (network === "Polygon") {
    const res = await axios.get(
      `https://api.polygonscan.com/api?module=block&action=getblocknobytime&timestamp=${unix}&closest=before&apikey=${polygonScanAPIKey}`
    );
    block = parseInt(res.data.result);
  }
  switch (network) {
    case "Ethereum": {
      balance = await getEthereumBalance(address, network, alchemy, block);
      break;
    }
    case "Polygon": {
      balance = await getPolygonBalance(address, network, alchemy, block);
      break;
    }
    case "Bitcoin": {
      balance = await getBalanceBitcoin(timestamp, address, network);
      break;
    }
    // case "Litecoin": {
    //     await getLiteCoinBalance(address, timestamp)
    // }
  }
  return balance;
};
const exportCSV = (
  time: string,
  data: IBalanceResponse[],
  fileName: string
) => {
  data = data
    .map((d) => {
      return {
        "date (JST)": time,
        network: d.network,
        address: d.address,
        currency: d.currency,
        balance: commify(d.balance as string)
      };
    })
    .filter(
      (d) =>
        (d.balance as unknown as string) !== "0.0" &&
        d.balance != "0" &&
        d.currency !== null &&
        d.currency.length <= 15
    );
  const dataUnique = _.uniqBy(data, (d) => [d.address, d.network, d.currency].join());
  const ws = createWriteStream(fileName);
  csv.write(dataUnique, { headers: true })
    .on("finish", function () {
      console.log("Write to CSV successfully!");
    })
    .pipe(ws);
};

/**
 * Get multiple balance.
 * @constructor
 * @param {string} date - timestamp (must be follow format: YYYY-MM-DD HH:mm:ss:SSS)
 * @param {string} timezone - timeZone
 * @param {string} fileName - fileNameToExport.
 */
const getMultipleBalance = async (
  date: string,
  timezone: string,
  fileName: string
) => {
  console.time("dbsave");
  await moralis.start({
    apiKey: molarisAPI
  });
  const currentDate = date + "+" + timezone;
  const timestamp = dayjs.utc(new Date(currentDate)).format();
  let result = [];
  const batchCalls = _.chunk(wallet, 1);
  for await (const wa of batchCalls) {
    const data = await Promise.all(
      wa.map(async (w) => {
        console.log(w.address, w.network);
        return await getBalance(
          timestamp,
          w.address,
          w.network,
          w.alchemy
        );
      })
    );

    for (const d of data) {
      result = [...result, ...d];
    }
  }
  exportCSV(date, result, fileName);
  console.timeEnd("dbsave");
};
getMultipleBalance("2023-02-28 23:59:59:999", "9", "2022_02_28.csv");
