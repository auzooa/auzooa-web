import { css, customElement, html, LitElement, property } from 'lit-element'
import { general } from '../../../styles/general'
import { IconName } from '../icon/icon-name'
import { Translation } from '../../language/translation'
import { subscribe } from '../../subscribe'
import { resolve } from '../../types/resolve'
import { TYPES } from '../../../types'

@customElement('app-navbar')
export class Navbar extends LitElement {
  @property({ type: String })
  title!: string

  @property({ type: String })
  subtitle!: string

  @resolve(TYPES.TRANSLATION)
  translation!: Translation

  private back() {
    history.back()
  }

  static get styles() {
    return [
      general,
      css`
        nav {
          width: 100%;
          padding: var(--m);
          background-color: var(--secondary-color);
          display: flex;
          align-items: center;
          color: var(--on-secondary-color);
        }

        a {
          display: inline-flex;
          align-items: center;
          margin-right: var(--s);
        }

        p {
          margin: 0;
        }

        button {
          margin-left: auto;
          background-color: transparent;
          border: none;
          padding: 0;
          color: var(--on-secondary-color);
        }

        .text {
          display: flex;
          flex-direction: column;
        }

        .text > * {
          margin: 0;
        }

        .text small {
          line-height: 0.7;
        }
      `
    ]
  }

  render() {
    return html`<nav>
      <a @click="${this.back}"
        ><app-icon
          .name="${IconName.LEFT_ARROW}"
          .alt="${subscribe(this.translation('_back'))}"
        ></app-icon
      ></a>
      <div class="text">
        <strong>${this.title ?? ''}</strong>
        ${this.subtitle !== undefined ? html`<small>${this.subtitle}</small>` : null}
      </div>
      <button>
        <app-icon
          .name="${IconName.MEATBALLS}"
          .alt="${subscribe(this.translation('_options'))}"
        ></app-icon>
      </button>
    </nav>`
  }
}
