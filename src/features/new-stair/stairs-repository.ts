import { Id } from '../../core/types/id'
import { Observable } from 'rxjs'
import { Stair } from './stair'

export interface StairsRepository {
  create(name: string): Observable<Id>
  find(id: Id): Observable<Stair>
}
