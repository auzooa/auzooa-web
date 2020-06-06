import { css, customElement, html, LitElement } from 'lit-element'
import { AppPage } from '../../core/components/app-page'
import { general } from '../../core/styles/general'
import { IconName } from '../../core/components/icon/icon-name'

@customElement('app-home')
export class HomePage extends LitElement implements AppPage {
  title = 'Auzooa'

  static get styles() {
    return [
      general,
      css`
        .container {
          display: flex;
          justify-content: end;
          align-items: end;
        }

        app-button {
          display: flex;
          justify-content: end;
        }
      `
    ]
  }

  render() {
    return html`<div class="container">
      <app-button round><app-icon .name="${IconName.ADD}"></app-icon></app-button>
    </div>`
  }
}
