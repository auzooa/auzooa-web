import { css, customElement, html, LitElement, property } from 'lit-element'
import { AppEvent } from '../../../app-event'
import { general } from '../../../../styles/general'
import { range } from '../../../utils/range'

@customElement('app-input-code')
export class InputCode extends LitElement {
  @property({ type: String })
  value = ''

  @property({ type: Boolean })
  readonly = false

  static get styles() {
    return [
      general,
      css`
        :host {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          gap: var(--s);
        }

        input {
          border-radius: 4px;
          border: none;
          color: var(--input-text-color, var(--background-color));
          background-color: var(--input-text-background-color, var(--on-background-color));
          max-width: 40px;
          padding: var(--m) 0;
          text-align: center;
          margin: 0;
        }

        .dash {
          display: inline;
          color: white;
        }
      `
    ]
  }

  render() {
    return html`
      ${range(3).map(
        i => html`<input
          .value="${this.value[i] ?? ''}"
          ?disabled="${this.readonly}"
          @input="${(event: InputEvent) =>
            this.dispatchEvent(new AppEvent((event.target as HTMLInputElement).value))}"
        />`
      )}

      <div class="dash">-</div>

      ${range(3, 6).map(
        i => html`<input
          .value="${this.value[i] ?? ''}"
          ?disabled="${this.readonly}"
          @input="${(event: InputEvent) =>
            this.dispatchEvent(new AppEvent((event.target as HTMLInputElement).value))}"
        />`
      )}
    `
  }
}
