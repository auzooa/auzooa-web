import { Code } from '../core/types/code'
import { Message } from './message'

export interface Stair {
  name: string
  code: Code
  messages: Message[]
}
