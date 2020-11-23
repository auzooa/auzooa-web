import { css, customElement, html, LitElement, property } from 'lit-element'
import { general } from '../../../styles/general'
import { Datetime } from '../../utils/datetime'
import { datetimeDirective } from '../../directives/datetime-directive'

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
          display: flex;
          flex-direction: column;
          padding: var(--s);
          background-color: var(--secondary-color);
          color: var(--on-secondary-color);
          border-radius: var(--xs);
        }

        .sender {
          margin: 0;
        }

        .date {
          opacity: 0.7;
          align-self: flex-end;
        }
      `
    ]
  }

  render() {
    return html`<section class="message">
      <h6 class="sender">${this.sender}</h6>
      <slot></slot>
      <small class="date">${datetimeDirective(this.timestamp)}</small>
    </section>`
  }
}
