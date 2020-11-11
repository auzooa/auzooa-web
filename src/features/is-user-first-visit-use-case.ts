import { UseCase } from '../core/types/use-case'
import { injectable } from '../core/types/injectable'

@injectable()
export class IsUserFirstVisitUseCase extends UseCase<boolean> {
  async internalExecute(): Promise<boolean> {
    console.log('executed')
    const hasVisited = localStorage.getItem('HAS_USER_VISITED') === 'true'
    return !hasVisited
  }
}
