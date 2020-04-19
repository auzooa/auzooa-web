import { Translations } from './translations/translations'
import { es } from './translations/es'
import { en } from './translations/en'
import { Locale } from './locale'
import { injectable } from '../../core/types/injectable'

@injectable()
export class Translator {
  readonly translations: Map<Locale, Translations> = new Map<Locale, Translations>([
    [Locale.ES, es],
    [Locale.EN, en]
  ])

  getDefaultLocaleTranslation(): Translations {
    return this.translations.get(Locale.EN)!
  }
}
