import { ethers } from "ethers"
import { firstWallet, secondWallet, thirdWallet } from "./utils/wallets"
import {
  approve,
  setStake,
  createDisputeOnResolver,
  passPeriod,
  castVote,
  passPhaseDisputeKitClassic,
  passPhaseKlerosCore,
  toVoting,
} from "./scripts"

const main = async () => {
  // approve KlerosCore to use your PNK tokens on 3 different wallets
  await approve(firstWallet)
  await approve(secondWallet)
  await approve(thirdWallet)

  // stake PNK with 3 different wallets
  await setStake(firstWallet)
  await setStake(secondWallet)
  await setStake(thirdWallet)

  // create a new dispute
  const disputeID = await createDisputeOnResolver(firstWallet)

  // start Voting phase on the previously created dispute
  await toVoting(firstWallet, disputeID)

  // vote with 3 different jurors
  await castVote(firstWallet, disputeID)
  await castVote(secondWallet, disputeID)
  await castVote(thirdWallet, disputeID)

  // pass period to appeal period
  await passPeriod(firstWallet, disputeID)

  // pass period and end dispute
  await passPeriod(firstWallet, disputeID)
}

// executes scripts
main()
