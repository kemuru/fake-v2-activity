import { ethers } from 'ethers'
import pnkJson from "../../contractsJson/PNK.json"
import { provider } from '../provider'
import dotenv from "dotenv"
dotenv.config()

export const pnk = new ethers.Contract(
  process.env.PNK_CONTRACT_ADDRESS as string,
  pnkJson.abi,
  provider
) as any