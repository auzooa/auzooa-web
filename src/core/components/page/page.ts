import { css, customElement, html, LitElement } from 'lit-element'
import { general } from '../../styles/general'

@customElement('app-page')
export class Page extends LitElement {
  static get styles() {
    return [
      general,
      css`
        .page {
          width: 100%;
          background-color: var(--background-color);
          color: var(--on-background-color);
          display: flex;
          flex-direction: column;
        }

        .wrapper {
          flex: 1;
          min-height: 100vh;
          padding: var(--m);
          margin: 0 auto;
          max-width: 40rem;
        }
      `
    ]
  }

  render() {
    return html`<main class="page">
      <slot name="header"></slot>
      <div class="wrapper"><slot></slot></div>
    </main>`
  }
}
