import { css, customElement, html, LitElement, property } from 'lit-element'
import { TYPES } from '../../types'
import { Translation } from '../../core/language/translation'
import { subscribe } from '../../core/subscribe'
import { general } from '../../styles/general'
import { resolve } from '../../core/types/resolve'

@customElement('app-onboarding')
export class OnboardingPage extends LitElement {
  @resolve(TYPES.TRANSLATION)
  readonly translation!: Translation

  @property({ type: Number })
  count = 10

  static get styles() {
    return [
      general,
      css`
        :host {
          height: 100%;
        }

        .wrapper {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .description {
          text-align: center;
        }

        .counter {
          width: 6rem;
        }
      `
    ]
  }

  private goToHome() {
    history.pushState(null, '', '/')
  }

  render() {
    return html`<div class="wrapper">
      <h1>${subscribe(this.translation('onboarding_title'))}</h1>
      <p class="description">${subscribe(this.translation('onboarding_description'))}</p>
      <app-counter
        class="counter"
        .start="${this.count}"
        @on-counter-end="${this.goToHome}"
      ></app-counter>
    </div>`
  }
}
