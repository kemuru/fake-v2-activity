import { ethers } from "ethers"
import {
  firstWallet,
  secondWallet,
  thirdWallet,
  fourthWallet,
  fifthWallet,
} from "./utils/wallets"
import {
  approve,
  setStake,
  createDisputeOnResolver,
  passPeriod,
  castVote,
  passPhaseDisputeKitClassic,
  passPhaseKlerosCore,
  toVoting,
  draw,
} from "./scripts"

const executeDisputeWorkflow = async () => {
  // approve KlerosCore to use your PNK tokens on 5 different wallets
  await approve(firstWallet)
  await approve(secondWallet)
  await approve(thirdWallet)
  await approve(fourthWallet)
  await approve(fifthWallet)

  // stake PNK with 5 different wallets
  await setStake(firstWallet)
  await setStake(secondWallet)
  await setStake(thirdWallet)
  await setStake(fourthWallet)
  await setStake(fifthWallet)

  // create a new dispute (you need some ETH on the wallet)
  const disputeID = Number(await createDisputeOnResolver(firstWallet))
  console.log(disputeID)

  // leaves the dispute ready for voting. note: this passes a bunch of phases, draws jurors, passes periods..
  await toVoting(firstWallet, disputeID)

  // we can skip voting if the court has no time periods [0,0,0,0], otherwise use this formula on the drawn jurors/wallets:
  // await castVote(firstWallet, disputeID)

  // pass period to appeal period
  await passPeriod(firstWallet, disputeID)

  // pass period and end dispute
  await passPeriod(firstWallet, disputeID)

  // return DK and Core phases to "resolving" and "staking", respectively
  await passPhaseDisputeKitClassic(firstWallet)
  await passPhaseKlerosCore(firstWallet)
}

const createdisputtest = async () => {
  const disputeID = await createDisputeOnResolver(firstWallet)
  console.log(disputeID)
}

// executes script
createdisputtest()
