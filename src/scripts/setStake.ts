import { Wallet } from "ethers"
import { klerosCoreContract } from "../utils/klerosCoreContract"

export const setStake = async (wallet: Wallet) => {
  //first parameter is courtId, second is desired PNK to stake (in wei)
  const setStakeFunctionArgs = [1, "200000000000000000000"]

  const resultSetStakeTx = await klerosCoreContract
    .connect(wallet)
    ["setStake"](...setStakeFunctionArgs)
  return resultSetStakeTx
}
