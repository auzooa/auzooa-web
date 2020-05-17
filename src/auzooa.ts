import { customElement, html, LitElement } from 'lit-element'
import { subscribe } from './core/subscribe'
import { inject } from './core/types/inject'
import { Translation } from './core/language/translation'
import { TYPES } from './types'

@customElement('app-auzooa')
export class Auzooa extends LitElement {
  @inject(TYPES.TRANSLATION)
  readonly translation!: Translation

  render() {
    return html`<h1>${subscribe(this.translation('_name'))}</h1>`
  }
}
