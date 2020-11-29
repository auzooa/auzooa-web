import { SetUserFirstVisitUseCase } from './set-user-first-visit-use-case'
import { instance, mock, when } from 'ts-mockito'

describe('SetUserFirstVisitUseCase', () => {
  it("should set the user's first visit", async () => {
    const { setUserFirstVisitUseCase, storage } = setup()
    when(storage.getItem('HAS_USER_VISITED')).thenReturn(null)

    await setUserFirstVisitUseCase.internalExecute()

    expect(localStorage.setItem).toHaveBeenCalledWith('HAS_USER_VISITED', 'true')
  })
})

function setup() {
  const storage = mock<Storage>()
  return {
    storage,
    setUserFirstVisitUseCase: new SetUserFirstVisitUseCase(instance(storage))
  }
}
