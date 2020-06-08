import { Translations } from './translations'
import { TranslationIdentifiers } from './translation-identifiers'

export const en: Translations = new Map<keyof TranslationIdentifiers, string>([
  ['_name', 'Auzooa'],
  ['_seconds', 'seconds'],
  ['_back', 'Go back'],
  ['_options', 'Options'],
  ['home_newChat', 'Or create a new chat'],
  ['newChat_name', 'New wall'],
  ['newChat_subtitle', 'Add subject'],
  ['newChat_subject', 'Write the subject here...'],
  ['newChat_subjectByline', 'Add a subject to the wall'],
  ['onboarding_title', 'What is auzooa?'],
  ['onboarding_description', 'A tool that will allow you to connect with your neighbours.'],
  ['chat_instruction', 'Good job! You just created the stairs feed. The code is the following:'],
  ['chat_newMessage', 'Write a message']
])
