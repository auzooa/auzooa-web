import { css, customElement, html, LitElement, property } from 'lit-element'
import { general } from '../../../styles/general'
import { classMap } from 'lit-html/directives/class-map'

@customElement('app-button')
export class Button extends LitElement {
  @property({ type: Boolean })
  round = false

  static get styles() {
    return [
      general,
      css`
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

        .round {
          border-radius: 100%;
          line-height: 0;
          padding: var(--m);
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }

        .round:after {
          content: '';
          display: block;
          padding-bottom: 100%;
        }
      `
    ]
  }

  render() {
    return html`<button class="button" class="${classMap({ round: this.round })}">
      <slot></slot>
    </button>`
  }
}
