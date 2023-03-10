import { ethers } from "ethers"
import { arbGoerliProvider } from "./providers"
import dotenv from "dotenv"
dotenv.config()

export const firstWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY_WALLET_1 as string,
  arbGoerliProvider
)

export const secondWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY_WALLET_2 as string,
  arbGoerliProvider
)

export const thirdWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY_WALLET_3 as string,
  arbGoerliProvider
)
