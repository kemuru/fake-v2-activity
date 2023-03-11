import { ethers } from "ethers"
import {
  governorWallet,
  firstWallet,
  secondWallet,
  thirdWallet,
} from "./utils/wallets"
import {
  courts,
  approve,
  setStake,
  createDisputeOnResolver,
  passPeriod,
  castVote,
  passPhaseDisputeKitClassic,
  passPhaseKlerosCore,
  draw,
  setRandomizer,
} from "./scripts"

const main = async () => {
  // await courts(1)
  // await setStake(firstWallet)
  // await createDisputeOnResolver()
  // await passPeriod(firstWallet)
  // await passPhaseDisputeKitClassic(firstWallet)
  await setRandomizer(governorWallet)
  // await draw(firstWallet)
  // await passPhaseKlerosCore(firstWallet)
  // await castVote(firstWallet))
  // await castVote(secondWallet)
  // await castVote(thirdWallet)
}

// executes scripts
main()
