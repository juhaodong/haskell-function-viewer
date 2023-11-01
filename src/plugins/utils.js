export async function sleep(ms = 1000) {
  return await new Promise(resolve => setTimeout(resolve, ms))
}
