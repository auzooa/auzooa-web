import 'reflect-metadata'
import { container } from 'inversify-props'
import { TYPES } from './types'
import { TranslationService } from './core/language/translation-service'
import { Translator } from './core/language/translator'
import { map } from 'rxjs/operators'
import { Store } from './core/store/store'
import { Translation } from './core/language/translation'
import { IsUserFirstVisitUseCase } from './features/is-user-first-visit-use-case'
import { SetUserFirstVisitUseCase } from './features/set-user-first-visit-use-case'
import { WallRepository } from './features/new-wall/wall-repository'
import { WallFirestoreRepository } from './features/new-wall/wall-firestore-repository'
import * as RxFire from 'rxfire/firestore'
import { app } from './core/firestore'

container
  .bind<TranslationService>(TYPES.TRANSLATION_SERVICE)
  .to(TranslationService)
  .inSingletonScope()
container.bind<Translator>(TYPES.TRANSLATOR).to(Translator).inSingletonScope()
container.bind<Translation>(TYPES.TRANSLATION).toFunction(key =>
  container
    .get<Store>(TYPES.STORE)
    .on()
    .pipe(
      map(x => x.locale),
      map(x => container.get<Translator>(TYPES.TRANSLATOR).translations.get(x)!.get(key)!)
    )
)
container
  .bind<IsUserFirstVisitUseCase>(TYPES.IS_USER_FIRST_VISIT_USE_CASE)
  .to(IsUserFirstVisitUseCase)
  .inSingletonScope()
container
  .bind<SetUserFirstVisitUseCase>(TYPES.SET_USER_FIRST_VISIT_USE_CASE)
  .to(SetUserFirstVisitUseCase)
  .inSingletonScope()
container.bind<Store>(TYPES.STORE).to(Store)
container.bind<WallRepository>(TYPES.WALL_REPOSITORY).to(WallFirestoreRepository).inSingletonScope()
container.bind(TYPES.RX_FIRE).toConstantValue(RxFire)
container.bind(TYPES.FIREBASE).toConstantValue(app)

export { container }
