import { BaseContract, BytesLike, ethers } from "ethers"
import dotenv from "dotenv"
import klerosCoreJson from "./contracts/KlerosCore.json"
import pnkJson from "./contracts/PNK.json"
dotenv.config()

const main = async () => {
  // setup provider, 2 testing wallets, and the contracts to interact with
  const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_GOERLI_RPC)
  const firstWallet = new ethers.Wallet(
    process.env.PRIVATE_KEY_WALLET_1 as string,
    provider
  )
  const secondWallet = new ethers.Wallet(
    process.env.PRIVATE_KEY_WALLET_2 as string,
    provider
  )
  const pnkContract = new ethers.Contract(
    process.env.PNK_CONTRACT_ADDRESS as string,
    pnkJson.abi,
    provider
  ) as any
  const klerosCoreContract = new ethers.Contract(
    process.env.KLEROS_CORE_CONTRACT_ADDRESS as string,
    klerosCoreJson.abi,
    provider
  ) as any

  // see courts, use this function to gather some data about some subcourt

  // const functionArgs = [1]
  // const resultCourtsTx = await klerosCoreContract
  //   .connect(firstWallet)
  //   ["courts"](...functionArgs)
  //   console.log(resultCourtsTx)

  //approve PNK on firstWallet and secondWallet

  const approvePNKFunctionArgs = [
    process.env.KLEROS_CORE_CONTRACT_ADDRESS,
    "200000000000000000000",
  ]
  // const firstWalletResultApprovePNK = await pnkContract
  //   .connect(firstWallet)
  //   ["approve"](...approvePNKFunctionArgs)

  const secondWalletResultApprovePNK = await pnkContract
    .connect(secondWallet)
    ["approve"](...approvePNKFunctionArgs)
  // await firstWalletResultApprovePNK.wait()
  await secondWalletResultApprovePNK.wait()

  //setStake of 200 PNK each on firstWallet and secondWallet

  const setStakeFunctionArgs = [1, "200000000000000000000"]

  // const firstWalletSetStakeTransaction = await klerosCoreContract
  //   .connect(firstWallet)
  //   ["setStake"](...setStakeFunctionArgs, { gasLimit: 500000 })

  const secondWalletSetStakeTransaction = await klerosCoreContract
    .connect(secondWallet)
    ["setStake"](...setStakeFunctionArgs, { gasLimit: 500000 })

  // const firstWalletTxReceipt = await firstWalletSetStakeTransaction.wait()
  const secondWalletTxReceipt = await secondWalletSetStakeTransaction.wait()
  // console.log(firstWalletTxReceipt)
  console.log(secondWalletTxReceipt)
}

// executes script
main()
