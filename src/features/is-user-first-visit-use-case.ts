import { UseCase } from '../core/types/use-case'
import { defer, Observable, of } from 'rxjs'
import { injectable } from '../core/types/injectable'

@injectable()
export class IsUserFirstVisitUseCase implements UseCase<boolean> {
  execute(): Observable<boolean> {
    return defer(() => {
      const hasVisited = localStorage.getItem('HAS_USER_VISITED') === 'true'
      return of(!hasVisited)
    })
  }
}
