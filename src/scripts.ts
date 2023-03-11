import {
  disputeKitClassic,
  klerosCore,
  pnk,
  disputeResolver,
  randomizerRng,
} from "./utils/contractsObject"
import { Wallet } from "ethers"
let options = { gasLimit: 10000000, gasPrice: 5000000000 }

// this function returns information about a court
export const courts = async (courtId: number) => {
  // parameter is courtId
  const courtsFunctionArgs = [1]
  const resultCourtsTx = await klerosCore.courts(...courtsFunctionArgs)
  console.log(resultCourtsTx)
}

/* this function grants permission to KlerosCore to use your PNK tokens*/
export const approve = async (wallet: Wallet) => {
  /*first parameter is KlerosCore contract address
second parameter is amount of PNK you want to approve (in wei)*/
  const approvePNKFunctionArgs = [
    process.env.KLEROS_CORE_CONTRACT_ADDRESS,
    "200000000000000000000",
  ]
  const resultApproveTx = await pnk
    .connect(wallet)
    ["approve"](...approvePNKFunctionArgs)
  console.log(resultApproveTx)
}

export const setStake = async (wallet: Wallet) => {
  //first parameter is courtId, second is desired PNK to stake (in wei)
  const setStakeFunctionArgs = [1, "200000000000000000000"]

  const resultSetStakeTx = await klerosCore
    .connect(wallet)
    ["setStake"](...setStakeFunctionArgs)
  return resultSetStakeTx
}

export const createDisputeOnResolver = async (wallet: Wallet) => {
  const choices = 2
  const nbOfJurors = 3n
  const feeForJuror = 100000000000000000n
  var tx
  try {
    tx = await disputeResolver
      .connect(wallet)
      .createDispute(
        "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
        "",
        choices,
        {
          value: feeForJuror * nbOfJurors,
          ...options,
        }
      )
    await tx.wait()
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
      return logs[0]?.args?._disputeID
    }
  }
}

export const passPhaseKlerosCore = async (wallet: Wallet) => {
  const resultPassPhaseTx = await klerosCore
    .connect(wallet)
    ["passPhase"](options)
  return resultPassPhaseTx
}

export const passPhaseDisputeKitClassic = async (wallet: Wallet) => {
  const resultPassPhaseTx = await disputeKitClassic
    .connect(wallet)
    ["passPhase"](options)
  return resultPassPhaseTx
}

export const setRandomizer = async (wallet: Wallet) => {
  //parameter is Arbitrum Goerli randomizer
  const setRandomizerFunctionArgs = [
    "0xF25c6Ad3694dA9D3C97F4D316b0B31F96cEb39d5",
  ]

  const resultSetRandomizerTx = await randomizerRng
    .connect(wallet)
    ["setRandomizer"](...setRandomizerFunctionArgs)
  return resultSetRandomizerTx
}

export const draw = async (wallet: Wallet) => {
  var info = await klerosCore.getRoundInfo(0, 0)
  console.log("Drawn jurors before: %O", info.drawnJurors)
  let tx
  try {
    tx = await (await klerosCore.connect(wallet).draw(0, 10, options)).wait()
    console.log("txID: %s", tx?.transactionHash)
  } catch (e) {
    if (typeof e === "string") {
      console.log("Error: %s", e)
    } else if (e instanceof Error) {
      console.log("%O", e)
    }
  } finally {
    info = await klerosCore.getRoundInfo(0, 0)
    console.log("Drawn jurors after: %O", info.drawnJurors)
  }
}

export const passPeriod = async (wallet: Wallet) => {
  //parameter is disputeID
  const passPeriodFunctionArgs = [0]

  const resultPassPeriodTx = await klerosCore
    .connect(wallet)
    ["passPeriod"](...passPeriodFunctionArgs)
  return resultPassPeriodTx
}

// a drawn juror votes with this function
export const castVote = async (wallet: Wallet) => {
  // parameters are disputeID, possibleChoices, selectedChoice, , justification
  const castVoteFunctionArgs = [0, [0, 1], 1, 0, "because"]

  const resultCastVoteTx = await disputeKitClassic
    .connect(wallet)
    ["castVote"](...castVoteFunctionArgs)
  console.log(resultCastVoteTx)
}
