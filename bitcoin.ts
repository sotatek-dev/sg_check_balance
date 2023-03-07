import {network} from "./balance";
import axios from "axios";
import * as sb from "satoshi-bitcoin"
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
export const getBalanceBitcoin = async (date: string, address: string, network: network) => {
    try {
        const blockConvert = dayjs(date).unix() + "000";
        const blockInformation = await axios.get(`https://blockchain.info/blocks/${blockConvert}?format=json`);
        if (blockInformation.data.length) {
            const blockHeight = blockInformation.data[0].height;
            const balanceResponse = await axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${address}?before=${blockHeight}&limit=1`);
            const balance = sb.toBitcoin(balanceResponse.data.final_balance) as string;
            return [
                {network, address, currency: "BTC", balance},
            ]
        }
    } catch (e) {
        throw e;
    }
}
// getBalanceBitcoin(dayjs(new Date()).utcOffset(0).toString(), "bc1qv4jvwgpe74xwlcvfjqhqf502qzh9gn7caemct3", "Bitcoin").then(res => console.log(res))