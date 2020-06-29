export function range(start: number, end?: number): number[] {
  return [...Array(end !== undefined ? end - start : start).keys()].map(
    i => i + (end !== undefined ? start : 0)
  )
}
