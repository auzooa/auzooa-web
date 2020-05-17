import { css, customElement, LitElement, html } from 'lit-element'
import { inject } from '../../core/types/inject'
import { TYPES } from '../../types'
import { Translation } from '../../core/language/translation'
import { subscribe } from '../../core/subscribe'
import { general } from '../../core/styles/general'

@customElement('app-onboarding')
export class OnboardingPage extends LitElement {
  @inject(TYPES.TRANSLATION)
  readonly translation!: Translation

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
      `
    ]
  }
  render() {
    return html`<div class="wrapper">
      <h1>${subscribe(this.translation('onboarding_title'))}</h1>
      <p>${subscribe(this.translation('onboarding_description'))}</p>
    </div>`
  }
}
