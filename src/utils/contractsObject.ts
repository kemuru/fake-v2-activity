import { ethers } from "ethers"
import disputeResolverJson from "../contractsJson/DisputeResolver.json"
import klerosCoreJson from "../contractsJson/KlerosCore.json"
import pnkJson from "../contractsJson/PNK.json"
import disputeKitClassicJson from "../contractsJson/DisputeKitClassic.json"
import randomizerRngJson from "../contractsJson/RandomizerRNG.json"
import { arbGoerliProvider } from "./providers"
import dotenv from "dotenv"
dotenv.config()

export const disputeResolver = new ethers.Contract(
  process.env.DISPUTE_RESOLVER_CONTRACT_ADDRESS as string,
  disputeResolverJson.abi,
  arbGoerliProvider
) as any

export const klerosCore = new ethers.Contract(
  process.env.KLEROS_CORE_CONTRACT_ADDRESS as string,
  klerosCoreJson.abi,
  arbGoerliProvider
) as any

export const pnk = new ethers.Contract(
  process.env.PNK_CONTRACT_ADDRESS as string,
  pnkJson.abi,
  arbGoerliProvider
) as any

export const disputeKitClassic = new ethers.Contract(
  process.env.DISPUTE_KIT_CLASSIC_CONTRACT_ADDRESS as string,
  disputeKitClassicJson.abi,
  arbGoerliProvider
) as any

export const randomizerRng = new ethers.Contract(
  process.env.RANDOMIZER_RNG_CONTRACT_ADDRESS as string,
  randomizerRngJson.abi,
  arbGoerliProvider
) as any
