import 'reflect-metadata'
import { container } from 'inversify-props'
import { TYPES } from './types'
import { TranslationService } from './core/language/translation-service'
import { Translator } from './core/language/translator'
import { map } from 'rxjs/operators'
import { Store } from './core/store/store'
import { Translation } from './core/language/translation'

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
container.bind<Store>(TYPES.STORE).to(Store)

export { container }
