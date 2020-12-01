import { singleton } from 'tsyringe'
import { StairsRepository } from '../new-stair/stairs-repository'
import { inject } from '../../core/types/inject'
import { TYPES } from '../../types'
import { Id } from '../../core/types/id'
import { UseCase } from '../../core/types/use-case'
import { Stair } from '../stair'

@singleton()
export class GetStairQry extends UseCase<Stair, Id> {
  constructor(@inject(TYPES.STAIR_REPOSITORY) private readonly stairsRepository: StairsRepository) {
    super()
  }

  internalExecute(id: Id) {
    return this.stairsRepository.find(id)
  }
}
