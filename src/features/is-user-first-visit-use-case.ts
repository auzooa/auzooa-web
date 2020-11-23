import { UseCase } from '../core/types/use-case'
import { injectable } from '../core/types/injectable'
import { inject } from '../core/types/inject'
import { TYPES } from '../types'

@injectable()
export class IsUserFirstVisitUseCase extends UseCase<boolean> {
  constructor(@inject(TYPES.STORAGE) private readonly storage: Storage) {
    super()
  }

  async internalExecute(): Promise<boolean> {
    const hasVisited = this.storage.getItem('HAS_USER_VISITED') === 'true'
    return !hasVisited
  }
}
