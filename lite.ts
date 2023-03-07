import axios from "axios"
import dayjs from "dayjs"

export const getLiteCoinBalance = async (
    address: string,
    timestamp: string
) => {
    const [received, spent] = await Promise.all([
        axios.get(`https://chain.so/api/v2/get_tx_received/ltc/${address}`),
        axios.get(`https://chain.so/api/v2/get_tx_spent/ltc/${address}`),
    ])
    const spentTxs = spent.data.data.txs
    const receivedTxs = received.data.data.txs
    console.log("spentTxs", spentTxs)
    console.log("receivedTxs", receivedTxs)
    const spentTxsPos = findClosestByTimestamp(spentTxs, timestamp)
    const receivedTxsPos = findClosestByTimestamp(receivedTxs, timestamp)
    let spentTxsValue = 0,
        receivedTxsValue = 0
    if (spentTxsPos !== -1) {
        for (let i = spentTxs.length - 1; i >= spentTxsPos; i--) {
            console.log(spentTxs[i])
            spentTxsValue -= parseFloat(spentTxs[i].value)
        }
    }
    if (receivedTxsPos !== -1) {
        for (let i = receivedTxs.length - 1; i >= receivedTxsPos; i--) {
            receivedTxsValue += parseFloat(receivedTxs[i].value)
        }
    }
    console.log(spentTxsValue + receivedTxsValue)
}
const findClosestByTimestamp = (data: any[], timestamp: string) => {
    const unix = dayjs(timestamp).unix()
    return data
        .map((d) => ({ ...d, space: unix - parseInt(d.time) }))
        .findIndex((tx) => tx.space > 0)
}
