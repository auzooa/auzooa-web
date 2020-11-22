import { range } from './range'

describe('range', () => {
  it('should get an array up until that number', () => {
    const actual = range(3)

    expect(actual).toEqual([0, 1, 2])
  })

  it('should get an array from a given number up until another number', () => {
    const actual = range(3, 6)

    expect(actual).toEqual([3, 4, 5])
  })
})
