import { ethers } from "ethers"
import { firstWallet } from "./utils/wallets/firstWallet"
import { secondWallet } from "./utils/wallets/secondWallet"
import { thirdWallet } from "./utils/wallets/thirdWallet"
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
