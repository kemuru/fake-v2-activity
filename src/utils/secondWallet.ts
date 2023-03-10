import { ethers } from "ethers"
import { provider } from "./provider"
import dotenv from "dotenv"
dotenv.config()

export const secondWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY_WALLET_2 as string,
  provider
)
