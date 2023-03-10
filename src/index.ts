import { ethers } from "ethers"
import { firstWallet } from "./utils/wallets"
import { secondWallet } from "./utils/wallets"
import { thirdWallet } from "./utils/wallets"
import { courts } from "./scripts/courts"
import { approve } from "./scripts/approve"
import { setStake } from "./scripts/setStake"

const main = async () => {
  // console.log(await courts(1))
  console.log(await approve(thirdWallet))
  console.log(await setStake(thirdWallet))
}

// executes script
main()
