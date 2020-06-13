import { Id } from '../../core/types/id'
import { Observable } from 'rxjs'

export interface WallRepository {
  create(name: string): Observable<Id>
}
