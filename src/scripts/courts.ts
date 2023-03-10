import { klerosCore } from "../utils/contractsObject"

export const courts = async (courtId: number) => {
  // parameter is courtId, this function returns information about a court
  const courtsFunctionArgs = [1]
  const resultCourtsTx = await klerosCore.courts(
    ...courtsFunctionArgs
  )
  return resultCourtsTx
}
