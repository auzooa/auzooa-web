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
          height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .wrapper {
          padding: var(--m);
          margin: 0 auto;
          max-width: 40rem;
          width: 100%;
          height: 100%;
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
