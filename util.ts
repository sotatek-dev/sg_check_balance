import { ethers } from "ethers"

export const convertToNumber = (hex: any, decimals = 18): any => {
    if (!hex || hex == "0x") return 0
    console.log(`Converting to number ${hex} with ${decimals} decimals`)
    return ethers.utils.formatUnits(hex, decimals)
}
export const commify = (n: string) => {
    var parts = n.toString().split(".")
    const numberPart = parts[0]
    const decimalPart = parts[1]
    const thousands = /\B(?=(\d{3})+(?!\d))/g
    return (
        numberPart.replace(thousands, ",") +
        (decimalPart ? "." + decimalPart : "")
    )
}
