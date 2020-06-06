import { Translations } from './translations'
import { TranslationIdentifiers } from './translation-identifiers'

export const en: Translations = new Map<keyof TranslationIdentifiers, string>([
  ['_name', 'Auzooa'],
  ['_seconds', 'seconds'],
  ['_back', 'Go back'],
  ['_options', 'Options'],
  ['home_newChat', 'Or create a new chat'],
  ['onboarding_title', 'What is auzooa?'],
  ['onboarding_description', 'A tool that will allow you to connect with your neighbours.']
])
