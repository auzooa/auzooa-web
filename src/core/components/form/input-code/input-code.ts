import { css, customElement, html, LitElement, property } from 'lit-element'
import { AppEvent } from '../../../app-event'
import { general } from '../../../../styles/general'

@customElement('app-input-code')
export class InputCode extends LitElement {
  @property({ type: String })
  value: string = ''

  static get styles() {
    return [
      general,
      css`
        input {
          border-radius: 4px;
          border: none;
          margin-right: var(--xs);
          color: var(--input-text-color, var(--background-color));
          background-color: var(--input-text-background-color, var(--on-background-color));
          max-width: var(--m);
          padding: var(--m);
        }
        input:not(:first-child) {
          margin-left: var(--xs);
        }
        .dash {
          display: inline;
          color: white;
        }
      `
    ]
  }

  render() {
    return html`<input
        .value="${this.value}"
        @input="${(event: InputEvent) =>
          this.dispatchEvent(new AppEvent((event.target as HTMLInputElement).value))}"
      />
      <input
        .value="${this.value}"
        @input="${(event: InputEvent) =>
          this.dispatchEvent(new AppEvent((event.target as HTMLInputElement).value))}"
      />
      <input
        .value="${this.value}"
        @input="${(event: InputEvent) =>
          this.dispatchEvent(new AppEvent((event.target as HTMLInputElement).value))}"
      />

      <div class="dash">-</div>
      <input
        .value="${this.value}"
        @input="${(event: InputEvent) =>
          this.dispatchEvent(new AppEvent((event.target as HTMLInputElement).value))}"
      />
      <input
        .value="${this.value}"
        @input="${(event: InputEvent) =>
          this.dispatchEvent(new AppEvent((event.target as HTMLInputElement).value))}"
      />
      <input
        .value="${this.value}"
        @input="${(event: InputEvent) =>
          this.dispatchEvent(new AppEvent((event.target as HTMLInputElement).value))}"
      /> `
  }
}
