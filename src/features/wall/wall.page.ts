import { css, customElement, html, LitElement } from 'lit-element'
import { general } from '../../styles/general'
import { AppPage } from '../../core/components/app-page'
import { inject } from '../../core/types/inject'
import { TYPES } from '../../types'
import { Translation } from '../../core/language/translation'

@customElement('app-wall')
export class WallPage extends LitElement implements AppPage {
  @inject(TYPES.TRANSLATION)
  translation!: Translation

  static get styles() {
    return [general, css``]
  }

  render() {
    return html`<div></div>`
  }
}
