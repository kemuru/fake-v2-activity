import { ethers } from 'ethers'
import klerosCoreJson from "../contracts/KlerosCore.json"
import { provider } from './provider'
import dotenv from "dotenv"
dotenv.config()

export const klerosCoreContract = new ethers.Contract(
  process.env.KLEROS_CORE_CONTRACT_ADDRESS as string,
  klerosCoreJson.abi,
  provider
) as any

