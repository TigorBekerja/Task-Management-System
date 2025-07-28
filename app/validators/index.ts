import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'required': '{{ field }} is required',
    'string': '{{ field }} must be a string',
    'enum': '{{ field }} must be one of {{ choices }}',
    'date.after': '{{ field }} must be a date after today',
})
