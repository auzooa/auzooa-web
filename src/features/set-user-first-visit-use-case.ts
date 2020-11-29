import { UseCase } from '../core/types/use-case'
import { injectable } from '../core/types/injectable'
import { inject } from '../core/types/inject'
import { TYPES } from '../types'

@injectable()
export class SetUserFirstVisitUseCase extends UseCase {
  constructor(@inject(TYPES.STORAGE) private readonly storage: Storage) {
    super()
  }

  async internalExecute(): Promise<void> {
    this.storage.setItem('HAS_USER_VISITED', 'true')
  }
}
