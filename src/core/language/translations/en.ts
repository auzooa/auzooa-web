import { Translations } from './translations'
import { TranslationIdentifiers } from './translation-identifiers'

export const en: Translations = new Map<keyof TranslationIdentifiers, string>([
  ['_name', 'Auzooa'],
  ['_seconds', 'seconds'],
  ['_back', 'Go back'],
  ['_options', 'Options'],
  ['home_newChat', 'Or create a new chat'],
  ['newChat_name', 'New stair'],
  ['newChat_subtitle', 'Add subject'],
  ['newChat_subject', 'Write the subject here...'],
  ['newChat_subjectByline', 'Add a subject to the stair'],
  ['onboarding_title', 'What is auzooa?'],
  ['onboarding_description', 'A tool that will allow you to connect with your neighbours.'],
  ['chat_instruction', 'Good job! You just created the stairs feed. The code is the following:'],
  ['chat_newMessage', 'Write a message'],
  [
    'chat_template',
    'Now, the next step is to say hello to the world. to do this you can download the following template'
  ],
  ['chat_downloadTemplate', 'Download template'],
  [
    'chat_nextSteps',
    'Perfect! Now the next step is to print it and place it in a visible area. We recommend you do it in the ground floor so all your neighbours can see it.'
  ]
])
