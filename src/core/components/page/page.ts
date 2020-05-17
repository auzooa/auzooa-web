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
          min-height: 100vh;
          background-color: var(--background-color);
        }
      `
    ]
  }

  render() {
    return html`<main class="page"><slot></slot></main>`
  }
}
