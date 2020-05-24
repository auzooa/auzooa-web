import { UseCase } from '../core/types/use-case'
import { defer, Observable, of } from 'rxjs'
import { injectable } from '../core/types/injectable'

@injectable()
export class SetUserFirstVisitUseCase implements UseCase {
  execute(): Observable<void> {
    return defer(() => of(localStorage.setItem('HAS_USER_VISITED', 'true')))
  }
}
