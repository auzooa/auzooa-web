import { css, customElement, html, LitElement } from 'lit-element'

@customElement('app-button')
export class Button extends LitElement {
  static get styles() {
    return css`
      .button {
        font-size: inherit;
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
        border-radius: 999px;
        padding: var(--s) var(--m);
        cursor: pointer;
        transition: 0.5s ease color, 0.5s ease background-color;
        outline: none;
      }

      .button:hover {
        color: var(--on-primary-color);
        background-color: var(--primary-color);
      }
    `
  }

  render() {
    return html` <button class="button"><slot></slot></button> `
  }
}
