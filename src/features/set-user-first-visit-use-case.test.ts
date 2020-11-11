import { SetUserFirstVisitUseCase } from './set-user-first-visit-use-case'

describe('SetUserFirstVisitUseCase', () => {
  it("should set the user's first visit", async () => {
    const { setUserFirstVisitUseCase } = setup()
    jest.spyOn(window.localStorage.__proto__, 'setItem')

    await setUserFirstVisitUseCase.internalExecute()

    expect(localStorage.setItem).toHaveBeenCalledWith('HAS_USER_VISITED', 'true')
  })
})

function setup() {
  return {
    setUserFirstVisitUseCase: new SetUserFirstVisitUseCase()
  }
}
