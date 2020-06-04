import { css, customElement, html, LitElement, property } from 'lit-element'
import { general } from '../../styles/general'
import { IconName } from '../icon/icon-name'
import { inject } from 'inversify-props'
import { TYPES } from '../../../types'
import { Translation } from '../../language/translation'
import { subscribe } from '../../subscribe'

@customElement('app-navbar')
export class Navbar extends LitElement {
  @property({ type: String })
  title!: string

  @inject(TYPES.TRANSLATION)
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
      <p>${this.title ?? ''}</p>
      <button>
        <app-icon
          .name="${IconName.MEATBALLS}"
          .alt="${subscribe(this.translation('_options'))}"
        ></app-icon>
      </button>
    </nav>`
  }
}
