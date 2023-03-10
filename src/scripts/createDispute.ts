import { Wallet } from "ethers"
import { disputeResolver } from "src/utils/contractsObject/disputeResolver"
import { klerosCore } from "../utils/contractsObject/klerosCore"
let options = { gasLimit: 10000000, gasPrice: 5000000000 }

export const createDispute = async (wallet: Wallet) => {
  //first parameter is courtId, second is desired PNK to stake (in wei)
  const setStakeFunctionArgs = [1, "200000000000000000000"]

  const resultSetStakeTx = await klerosCore
    .connect(wallet)
    ["createDispute"](...setStakeFunctionArgs)
  return resultSetStakeTx
}

const createDisputeOnResolver = async () => {
  const choices = 2
  const nbOfJurors = 3
  const feeForJuror = (await klerosCore.courts(1)).feeForJuror
  var tx
  try {
    tx = await (
      await disputeResolver.createDispute(
        "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
        "",
        2,
        {
          value: feeForJuror.mul(nbOfJurors),
          ...options,
        }
      )
    ).wait()
    console.log("txID: %s", tx?.transactionHash)
  } catch (e) {
    if (typeof e === "string") {
      console.log("Error: %s", e)
    } else if (e instanceof Error) {
      console.log("%O", e)
    }
  } finally {
    if (tx) {
      const filter = klerosCore.filters.DisputeCreation()
      const logs = await klerosCore.queryFilter(
        filter,
        tx.blockNumber,
        tx.blockNumber
      )
      console.log("DisputeID: %s", logs[0]?.args?._disputeID)
    }
  }
}
