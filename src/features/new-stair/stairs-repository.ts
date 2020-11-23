import { Id } from '../../core/types/id'
import { Stair } from '../stair'
import { Message } from '../message'
import { Observable } from 'rxjs'

export interface StairsRepository {
  create(name: string): Promise<Id>
  find(id: Id): Promise<Stair>
  findMessages(id: Id): Observable<Message[]>
}
