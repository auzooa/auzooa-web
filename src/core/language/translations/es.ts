import { Translations } from './translations'
import { TranslationIdentifiers } from './translation-identifiers'

export const es: Translations = new Map<keyof TranslationIdentifiers, string>([
  ['_name', 'Auzooa'],
  ['onboarding_title', '¿Qué es auzooa?'],
  [
    'onboarding_description',
    'Una herramienta que te posibilitará conectar con tus vecinos y vecinas.'
  ]
])
