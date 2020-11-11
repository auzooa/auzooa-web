import { IsUserFirstVisitUseCase } from './is-user-first-visit-use-case'

describe('IsUserFirstVisitUseCase', () => {
  it('should check if it is the first visit of the user', async () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null)
    const { isUserFirstVisitUseCase } = setup()

    const actual = await isUserFirstVisitUseCase.internalExecute()

    expect(actual).toBe(true)
  })

  it('should check if it is the first visit of the user if it is specified', async () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('false')
    const { isUserFirstVisitUseCase } = setup()

    const actual = await isUserFirstVisitUseCase.internalExecute()

    expect(actual).toBe(true)
  })

  it('should check if it is not the first visit of the user', async () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('true')
    const { isUserFirstVisitUseCase } = setup()

    const actual = await isUserFirstVisitUseCase.internalExecute()

    expect(actual).toBe(false)
  })
})

function setup() {
  return {
    isUserFirstVisitUseCase: new IsUserFirstVisitUseCase()
  }
}
