import { TranslationIdentifiers } from './translations/translation-identifiers'
import { Observable } from 'rxjs'

export type Translation = (key: keyof TranslationIdentifiers) => Observable<string>
