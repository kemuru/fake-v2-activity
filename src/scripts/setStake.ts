import { Wallet } from "ethers"
import { klerosCore } from "../utils/contractsObject"

export const setStake = async (wallet: Wallet) => {
  //first parameter is courtId, second is desired PNK to stake (in wei)
  const setStakeFunctionArgs = [1, "200000000000000000000"]

  const resultSetStakeTx = await klerosCore
    .connect(wallet)
    ["setStake"](...setStakeFunctionArgs)
  return resultSetStakeTx
}
