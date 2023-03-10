import {
  disputeKitClassic,
  klerosCore,
  pnk,
  disputeResolver,
  randomizerRng,
} from "./utils/contractsObject"
import { Wallet } from "ethers"
import { firstWallet } from "./utils/wallets"
import dotenv from "dotenv"
dotenv.config()
let options = { gasLimit: 10000000, gasPrice: 50000000000 }

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
    "400000000000000000000",
  ]
  const resultApproveTx = await pnk
    .connect(wallet)
    ["approve"](...approvePNKFunctionArgs)
  await resultApproveTx.wait()
  console.log(
    `approve wallet ${wallet.address}, txID: %s`,
    resultApproveTx?.hash
  )
}

export const setStake = async (wallet: Wallet) => {
  //first parameter is courtId, second is desired PNK to stake (in wei)
  const setStakeFunctionArgs = [1, "400000000000000000000"]

  const resultSetStakeTx = await klerosCore
    .connect(wallet)
    ["setStake"](...setStakeFunctionArgs)
  await resultSetStakeTx.wait()
  console.log(
    `setStake wallet ${wallet.address}, txID: %s`,
    resultSetStakeTx?.hash
  )
}

export const createDisputeOnResolver = async (wallet: Wallet) => {
  const choices = 2
  const nbOfJurors = 3n
  const feeForJuror = 100000000000000000n
  let tx
  let disputeID
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
    console.log("txID: %s", tx?.hash)
    const filter = klerosCore.filters.DisputeCreation()
    const logs = await klerosCore.queryFilter(
      filter,
      tx.blockNumber,
      tx.blockNumber
    )
    disputeID = logs[logs.length-1]?.args?._disputeID
    console.log("DisputeID: %s", disputeID)
  } catch (e) {
    if (typeof e === "string") {
      console.log("Error: %s", e)
    } else if (e instanceof Error) {
      console.log("%O", e)
    }
  }
  return disputeID
}

export const passPhaseKlerosCore = async (wallet: Wallet) => {
  const before = await klerosCore.phase()
  var tx
  try {
    tx = await (await klerosCore.connect(wallet).passPhase(options)).wait()
    console.log("txID: %s", tx?.hash)
  } catch (e) {
    if (typeof e === "string") {
      console.log("Error: %s", e)
    } else if (e instanceof Error) {
      console.log("%O", e)
    }
  } finally {
    const after = await klerosCore.phase()
    console.log("KlerosCore Phase: %d -> %d", before, after)
  }
}

export const passPhaseDisputeKitClassic = async (wallet: Wallet) => {
  const before = await disputeKitClassic.phase()
  var tx
  try {
    tx = await (
      await disputeKitClassic.connect(wallet).passPhase(options)
    ).wait()
    console.log("txID: %s", tx?.hash)
  } catch (e) {
    if (typeof e === "string") {
      console.log("Error: %s", e)
    } else if (e instanceof Error) {
      console.log("%O", e)
    }
  } finally {
    const after = await disputeKitClassic.phase()
    console.log("DisputeKitClassic Phase: %d -> %d", before, after)
  }
}

export const setRandomizer = async (wallet: Wallet) => {
  //parameter is Arbitrum Goerli randomizer
  const setRandomizerFunctionArgs = [
    "0xF25c6Ad3694dA9D3C97F4D316b0B31F96cEb39d5",
  ]

  const resultSetRandomizerTx = await randomizerRng
    .connect(wallet)
    ["setRandomizer"](...setRandomizerFunctionArgs)
  console.log(resultSetRandomizerTx)
}

export const isRngReady = async (wallet: Wallet) => {
  const requesterID = await randomizerRng.requesterToID(
    process.env.DISPUTE_KIT_CLASSIC_CONTRACT_ADDRESS
  )
  const n = await randomizerRng.randomNumbers(requesterID)
  if (Number(n) === 0) {
    console.log("rng is NOT ready.")
    return false
  } else {
    console.log("rng is ready: %s", n.toString())
    return true
  }
}

export const toEvidencePeriod = async (wallet: Wallet, disputeID: number) => {
  console.log("Running for disputeID %d", disputeID)
  var ready
  try {
    await passPhaseKlerosCore(wallet)
    await passPhaseDisputeKitClassic(wallet)
    ready = await isRngReady(wallet)
  } catch (e) {
    ready = false
  }
  while (!ready) {
    console.log("Waiting for RNG to be ready...", disputeID)
    await new Promise((r) => setTimeout(r, 10000))
    ready = await isRngReady(wallet)
  }
  console.log("RNG is ready, pass another DK phase & draw jurors.", disputeID)
  await passPhaseDisputeKitClassic(wallet)
  await draw(wallet, disputeID)
}

export const draw = async (wallet: Wallet, disputeID: number) => {
  var info = await klerosCore.getRoundInfo(disputeID, 0)
  console.log("Drawn jurors before: %O", info.drawnJurors)
  let tx
  try {
    tx = await (
      await klerosCore.connect(wallet).draw(disputeID, 10, options)
    ).wait()
    console.log("txID: %s", tx?.transactionHash)
  } catch (e) {
    if (typeof e === "string") {
      console.log("Error: %s", e)
    } else if (e instanceof Error) {
      console.log("%O", e)
    }
  } finally {
    info = await klerosCore.getRoundInfo(disputeID, 0)
    console.log("Drawn jurors after: %O", info.drawnJurors)
  }
}

export const passPeriod = async (wallet: Wallet, disputeID: number) => {
  const before = (await klerosCore.disputes(disputeID)).period
  var tx
  try {
    tx = await (
      await klerosCore.connect(wallet).passPeriod(disputeID, options)
    ).wait()
    console.log("txID: %s", tx?.transactionHash)
  } catch (e) {
    if (typeof e === "string") {
      console.log("Error: %s", e)
    } else if (e instanceof Error) {
      console.log("%O", e)
    }
  } finally {
    const after = (await klerosCore.disputes(disputeID)).period
    console.log("Period for dispute %s: %d -> %d", disputeID, before, after)
  }
}

// a drawn juror votes with this function
export const castVote = async (wallet: Wallet, disputeID: number) => {
  // parameters are disputeID, possibleChoices, selectedChoice, , justification
  const castVoteFunctionArgs = [disputeID, [0, 1], 1, 0, "because"]

  const resultCastVoteTx = await disputeKitClassic
    .connect(wallet)
    ["castVote"](...castVoteFunctionArgs)
  console.log(resultCastVoteTx)
}
