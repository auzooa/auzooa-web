import { Id } from '../../core/types/id'
import { Observable } from 'rxjs'
import { Wall } from './wall'

export interface WallRepository {
  create(name: string): Observable<Id>
  find(id: Id): Observable<Wall>
}
