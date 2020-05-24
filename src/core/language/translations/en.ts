import { Translations } from './translations'
import { TranslationIdentifiers } from './translation-identifiers'

export const en: Translations = new Map<keyof TranslationIdentifiers, string>([
  ['_name', 'Auzooa'],
  ['_seconds', 'seconds'],
  ['onboarding_title', 'What is auzooa?'],
  ['onboarding_description', 'A tool that will allow you to connect with your neighbours.']
])
