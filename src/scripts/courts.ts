import { klerosCoreContract } from "../utils/klerosCoreContract"

export const courts = async (courtId: number) => {
  // parameter is courtId, this function returns information about a court
  const courtsFunctionArgs = [1]
  const resultCourtsTx = await klerosCoreContract.courts(
    ...courtsFunctionArgs
  )
  return resultCourtsTx
}
