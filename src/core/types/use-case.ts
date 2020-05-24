import { Observable } from 'rxjs'

export interface UseCase<Result = void, Param = void> {
  execute(param: Param): Observable<Result>
}
