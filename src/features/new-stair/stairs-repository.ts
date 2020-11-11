import { Id } from '../../core/types/id'
import { Stair } from './stair'

export interface StairsRepository {
  create(name: string): Promise<Id>
  find(id: Id): Promise<Stair>
}
