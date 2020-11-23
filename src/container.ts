import 'reflect-metadata'
import { container } from 'tsyringe'
import { TYPES } from './types'
import { Translator } from './core/language/translator'
import { map } from 'rxjs/operators'
import { Store } from './core/store/store'
import { Translation } from './core/language/translation'
import * as RxFire from 'rxfire/firestore'
import { app } from './core/firestore'
import { StairsRepository } from './features/new-stair/stairs-repository'
import { StairsFirestoreRepository } from './features/new-stair/stairs-firestore-repository'

container.register(TYPES.STORAGE, { useValue: window.localStorage })
container.register<Translation>(TYPES.TRANSLATION, {
  useValue: key =>
    container
      .resolve<Store>(Store)
      .on()
      .pipe(
        map(x => x.locale),
        map(x => container.resolve<Translator>(Translator).translations.get(x)!.get(key)!)
      )
})
container.register<StairsRepository>(TYPES.STAIR_REPOSITORY, {
  useClass: StairsFirestoreRepository
})
container.register(TYPES.RX_FIRE, { useValue: RxFire })
container.register(TYPES.FIREBASE, { useValue: app })

export { container }
