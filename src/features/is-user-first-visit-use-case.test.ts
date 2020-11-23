import { IsUserFirstVisitUseCase } from './is-user-first-visit-use-case'
import { instance, mock, when } from 'ts-mockito'

describe('IsUserFirstVisitUseCase', () => {
  it('should check if it is the first visit of the user', async () => {
    const { isUserFirstVisitUseCase, storage } = setup()
    when(storage.getItem('HAS_USER_VISITED')).thenReturn(null)

    const actual = await isUserFirstVisitUseCase.internalExecute()

    expect(actual).toBe(true)
  })

  it('should check if it is the first visit of the user if it is specified', async () => {
    const { isUserFirstVisitUseCase, storage } = setup()
    when(storage.getItem('HAS_USER_VISITED')).thenReturn('false')

    const actual = await isUserFirstVisitUseCase.internalExecute()

    expect(actual).toBe(true)
  })

  it('should check if it is not the first visit of the user', async () => {
    const { isUserFirstVisitUseCase, storage } = setup()
    when(storage.getItem('HAS_USER_VISITED')).thenReturn('true')

    const actual = await isUserFirstVisitUseCase.internalExecute()

    expect(actual).toBe(false)
  })
})

function setup() {
  const storage = mock<Storage>()
  return {
    storage,
    isUserFirstVisitUseCase: new IsUserFirstVisitUseCase(instance(storage))
  }
}
