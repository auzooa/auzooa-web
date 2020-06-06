import { css, customElement, html, LitElement, property } from 'lit-element'
import { general } from '../../../styles/general'
import { IconName } from './icon-name'

@customElement('app-icon')
export class Icon extends LitElement {
  @property({ type: String })
  name!: IconName

  @property({ type: String })
  alt!: string

  static get styles() {
    return [
      general,
      css`
        :host {
          display: inline-flex;
        }
      `
    ]
  }

  render() {
    return html`<link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      /><i class="material-icons" aria-label="${this.alt}">${this.name}</i>`
  }
}
