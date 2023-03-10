import { ethers } from "ethers"
import { provider } from "../provider"
import dotenv from "dotenv"
dotenv.config()

export const firstWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY_WALLET_1 as string,
  provider
)
