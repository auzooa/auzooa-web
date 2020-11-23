import { css, customElement, html, LitElement, property } from 'lit-element'
import { general } from '../../../styles/general'
import { Datetime } from '../../utils/datetime'

@customElement('app-message')
export class Message extends LitElement {
  @property({ type: String })
  sender?: string

  @property({ type: Object })
  timestamp?: Datetime

  static get styles() {
    return [
      general,
      css`
        .message {
          padding: var(--s);
          background-color: var(--secondary-color);
          color: var(--on-secondary-color);
          border-radius: var(--xs);
        }
      `
    ]
  }

  render() {
    return html`<section class="message">
      ${this.sender} ${this.timestamp}
      <slot></slot>
    </section>`
  }
}
