import { singleton } from 'tsyringe'
import { StairsRepository } from './stairs-repository'
import { inject } from '../../core/types/inject'
import { TYPES } from '../../types'
import { UseCase } from '../../core/types/use-case'
import { Id } from '../../core/types/id'

@singleton()
export class CreateStairCmd extends UseCase<Id, string> {
  constructor(@inject(TYPES.STAIR_REPOSITORY) private readonly stairsRepository: StairsRepository) {
    super()
  }

  internalExecute(name: string) {
    return this.stairsRepository.create(name)
  }
}
