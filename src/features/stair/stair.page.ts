import { css, customElement, html, LitElement, property } from 'lit-element'
import { general } from '../../styles/general'
import { AppPage } from '../../core/components/app-page'
import { inject } from '../../core/types/inject'
import { TYPES } from '../../types'
import { Translation } from '../../core/language/translation'
import { queryParentRouterSlot } from 'router-slot'
import { StairsRepository } from '../new-stair/stairs-repository'
import { take } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs'
import { subscribe } from '../../core/subscribe'
import { Code } from '../../core/types/code'

@customElement('app-stair')
export class StairPage extends LitElement implements AppPage {
  @inject(TYPES.STAIR_REPOSITORY)
  private readonly stairRepository!: StairsRepository

  @inject(TYPES.TRANSLATION)
  private readonly translation!: Translation

  @property({ type: String })
  private code: Code = ''

  nameBehaviourSubject = new BehaviorSubject('')

  @property({ type: Object })
  name: Observable<string> = this.nameBehaviourSubject.asObservable()

  private stairId: string | undefined
  private hasLoaded = false

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
          overflow-y: scroll;
        }

        app-neighbours {
          margin-top: var(--s);
        }

        .message {
          margin: var(--m) 0;
        }

        .write-message {
          --input-text-background-color: var(--secondary-color);
          --input-text-color: white;
          display: flex;
          margin-top: var(--s);
          border-radius: 5%;
        }
      `
    ]
  }

  private async setName() {
    if (this.stairId !== undefined && !this.hasLoaded) {
      const stair = await this.stairRepository.find(this.stairId).pipe(take(1)).toPromise()
      this.nameBehaviourSubject.next(stair.name)
      this.code = stair.code
      this.hasLoaded = true
    }
  }

  render() {
    this.stairId = queryParentRouterSlot(this)?.match?.params.id
    this.setName()
    return html` <div class="wrapper">
      <header class="instructions">
        <app-neighbours></app-neighbours>
        <app-message class="message">
          ${subscribe(this.translation('chat_instruction'))}
        </app-message>
        <app-input-code .readonly="${true}" .value="${this.code}"></app-input-code>
        <app-message class="message">
          ${subscribe(this.translation('chat_template'))}
        </app-message>
        <app-button>${subscribe(this.translation('chat_downloadTemplate'))}</app-button>
        <app-message class="message">
          ${subscribe(this.translation('chat_nextSteps'))}
        </app-message>
      </header>
      <app-input-text
        class="write-message"
        .label="${subscribe(this.translation('chat_newMessage'))}"
        value=""
      ></app-input-text>
    </div>`
  }
}
