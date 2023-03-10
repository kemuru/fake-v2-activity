import { ethers } from 'ethers'
import disputeResolverJson from "../../contractsJson/DisputeResolver.json"
import { provider } from '../provider'
import dotenv from "dotenv"
dotenv.config()

export const disputeResolver = new ethers.Contract(
  process.env.DISPUTE_RESOLVER_CONTRACT_ADDRESS as string,
  disputeResolverJson.abi,
  provider
) as any

