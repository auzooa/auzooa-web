import { Datetime } from '../core/utils/datetime'
import { Markdown } from './markdown'

export interface Message {
  timestamp: Datetime
  sender: string
  content: Markdown
}
