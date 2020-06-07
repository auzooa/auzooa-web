import { Translations } from './translations'
import { TranslationIdentifiers } from './translation-identifiers'

export const es: Translations = new Map<keyof TranslationIdentifiers, string>([
  ['_name', 'Auzooa'],
  ['_seconds', 'segundos'],
  ['_back', 'Ir atrás'],
  ['_options', 'Opciones'],
  ['home_newChat', 'O crea un chat nuevo'],
  ['newChat_name', 'Nuevo muro escalera'],
  ['newChat_subtitle', 'Añadir asunto'],
  ['newChat_subject', 'Escribe el asunto aquí...'],
  ['newChat_subjectByline', 'Proporciona asunto al muro de la escalera'],
  ['onboarding_title', '¿Qué es auzooa?'],
  [
    'onboarding_description',
    'Una herramienta que te posibilitará conectar con tus vecinos y vecinas.'
  ]
])
