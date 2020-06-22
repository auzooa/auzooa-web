import { css, customElement, html, LitElement } from 'lit-element'
import { AppPage } from '../../core/components/app-page'
import { general } from '../../styles/general'
import { IconName } from '../../core/components/icon/icon-name'
import { subscribe } from '../../core/subscribe'
import { inject } from '../../core/types/inject'
import { TYPES } from '../../types'
import { Translation } from '../../core/language/translation'

@customElement('app-home')
export class HomePage extends LitElement implements AppPage {
  @inject(TYPES.TRANSLATION)
  translation!: Translation

  name = this.translation('_name')

  static get styles() {
    return [
      general,
      css`
        :host {
          display: block;
          height: 100%;
        }

        .container {
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
        }

        .description {
          position: relative;
          margin: 0;
        }

        .arrow {
          height: 10rem;
        }
      `
    ]
  }

  goToNewChat() {
    history.pushState(null, '', '/new-stair')
  }

  render() {
    return html`<div class="container">
      <div class="wrapper">
        <p class="description">${subscribe(this.translation('home_newChat'))}</p>
        <app-arrow class="arrow"></app-arrow>
      </div>

      <app-button @click="${this.goToNewChat}" round
        ><app-icon .name="${IconName.ADD}"></app-icon
      ></app-button>
    </div>`
  }
}
