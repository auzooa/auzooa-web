import { css, customElement, html, LitElement } from 'lit-element'
import { general } from '../../styles/general'
import { AppPage } from '../../core/components/app-page'
import { inject } from '../../core/types/inject'
import { TYPES } from '../../types'
import { Translation } from '../../core/language/translation'
import { queryParentRouterSlot } from 'router-slot'
import { WallRepository } from '../new-wall/wall-repository'
import { map } from 'rxjs/operators'
import { Observable, of } from 'rxjs'
import { subscribe } from '../../core/subscribe'

@customElement('app-wall')
export class WallPage extends LitElement implements AppPage {
  @inject(TYPES.WALL_REPOSITORY)
  wallRepository!: WallRepository

  name: Observable<string> = of('')

  @inject(TYPES.TRANSLATION)
  translation!: Translation
  private wallId: string | undefined

  static get styles() {
    return [
      general,
      css`
        :host {
          height: 100%;
        }

        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .instructions {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        app-neighbours {
          margin: var(--m) 0;
        }

        .user-message {
          background-color: var(--secondary-color);
          color: white;
        }

        .write-message {
          --input-text-background-color: var(--secondary-color);
          --input-text-color: white;
          display: flex;
          border-radius: 5%;
        }
      `
    ]
  }

  private setName() {
    if (this.wallId !== undefined) {
      this.name = this.wallRepository.find(this.wallId).pipe(map(x => x.name))
    }
  }

  render() {
    this.wallId = queryParentRouterSlot(this)?.match?.params.id
    this.setName()
    return html`<div>${subscribe(this.name)}</div>
      <div class="wrapper">
        <header class="instructions">
          <app-neighbours></app-neighbours>
          <div class="user-message">
            ${subscribe(this.translation('chat_instruction'))}
          </div>
          <app-input-code></app-input-code>
        </header>
        <app-input-text
          class="write-message"
          .label="${subscribe(this.translation('chat_newMessage'))}"
          value=""
        ></app-input-text>
      </div>`
  }
}
