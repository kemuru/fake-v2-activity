import { BaseContract, BytesLike, ethers } from "ethers"
import dotenv from "dotenv"
import klerosCoreJson from "./contracts/KlerosCore.json"
import pnkJson from "./contracts/PNK.json"
dotenv.config()

const main = async () => {
  const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_GOERLI_RPC)
  const firstWallet = new ethers.Wallet(
    process.env.PRIVATE_KEY_WALLET_1 as string,
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

  // const functionArgs = [0]
  // const resultCourtsTx = await klerosCoreContract
  //   .connect(firstWallet)
  //   ["courts"](...functionArgs)
  // console.log(resultCourtsTx)
  // const approvePNKFunctionArgs = [process.env.WALLET_1, "200000000000000000000"]
  // const resultApprovePNK = await pnkContract
  //   .connect(firstWallet)
  //   ["approve"](...approvePNKFunctionArgs)
  // await resultApprovePNK
  const setStakeFunctionArgs = [0, "1"]
  const setStakeTransaction = await klerosCoreContract
    .connect(firstWallet)
    ["setStake"](...setStakeFunctionArgs, { gasLimit: 300000})
    const txReceipt = await setStakeTransaction.wait();
  console.log(txReceipt)

  // resultMinStake.map((v: number) => { console.log(v.toString() )})
}

// executes script
main()
