import { UseCase } from '../core/types/use-case'
import { injectable } from '../core/types/injectable'

@injectable()
export class SetUserFirstVisitUseCase extends UseCase {
  async internalExecute(): Promise<void> {
    localStorage.setItem('HAS_USER_VISITED', 'true')
  }
}
