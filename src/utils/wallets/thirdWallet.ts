import { ethers } from "ethers"
import { provider } from "../provider"
import dotenv from "dotenv"
dotenv.config()

export const thirdWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY_WALLET_3 as string,
  provider
)
