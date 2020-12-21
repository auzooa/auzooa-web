import { CreateStairCmd } from './create-stair-cmd'
import { instance, mock, when } from 'ts-mockito'
import { StairsRepository } from './stairs-repository'

describe('CreateStairCmd', () => {
  it('should create a stair', async () => {
    const { stairsRepository, createStairCmd } = setup()
    when(stairsRepository.create('foo')).thenResolve('1')

    const actual = await createStairCmd.internalExecute('foo')

    expect(actual).toBe('1')
  })
})

function setup() {
  const stairsRepository = mock<StairsRepository>()

  return {
    stairsRepository,
    createStairCmd: new CreateStairCmd(instance(stairsRepository))
  }
}
