import { directive, Part } from 'lit-html'
import { Datetime } from '../utils/datetime'

export const datetimeDirective = directive((datetime?: Datetime) => (part: Part) => {
  part.setValue(datetime?.getTimeAgo())
})
