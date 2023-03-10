import { pnk } from "../utils/contractsObject/pnk"
import { Wallet } from "ethers"

export const approve = async (wallet: Wallet) => {
  /* first parameter is KlerosCore contract address (who you need to grant permission to use your PNKs)
  second parameter is amount of PNK you want to approve (in wei)*/
  const approvePNKFunctionArgs = [
    process.env.KLEROS_CORE_CONTRACT_ADDRESS,
    "200000000000000000000",
  ]
  const resultApproveTx = await pnk
    .connect(wallet)
    ["approve"](...approvePNKFunctionArgs)
  return resultApproveTx
}
