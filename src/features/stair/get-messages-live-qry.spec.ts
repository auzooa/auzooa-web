import { singleton } from 'tsyringe'
import { StairsRepository } from '../new-stair/stairs-repository'
import { inject } from '../../core/types/inject'
import { TYPES } from '../../types'
import { Id } from '../../core/types/id'

@singleton()
export class GetMessagesLiveQry {
  constructor(
    @inject(TYPES.STAIR_REPOSITORY) private readonly stairsRepository: StairsRepository
  ) {}

  execute(id: Id) {
    return this.stairsRepository.findMessages(id)
  }
}
import {} from './get-messages-live-qry'

describe('', () => {
  it('', () => {})
})
