import { ethers } from "ethers"
import { pnkContract } from "./utils/pnkContract"
import { klerosCoreContract } from "./utils/klerosCoreContract"
import { firstWallet } from "./utils/firstWallet"
import { secondWallet } from "./utils/secondWallet"
import { courts } from "./scripts/courts"

const main = async () => {
  // see courts, use this function to gather some data about some subcourt

  // const functionArgs = [1]
  // const resultCourtsTx = await klerosCoreContract
  //   .connect(firstWallet)
  //   ["courts"](...functionArgs)
  //   console.log(resultCourtsTx)

  //approve PNK on firstWallet and secondWallet

  //setStake of 200 PNK each on firstWallet and secondWallet

  console.log(await courts(1))
}

// executes script
main()
