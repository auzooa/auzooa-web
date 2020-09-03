import { css, customElement, html, LitElement } from 'lit-element'
import { general } from '../../../styles/general'

@customElement('app-message')
export class Message extends LitElement {
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
      <slot></slot>
    </section>`
  }
}
