import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    description: vine.string().trim().optional(),
    category: vine.string().trim(),
    priority: vine.enum(['low', 'medium', 'high']),
    deadline: vine.date().after("today").transform((value) => DateTime.fromJSDate(value)),
  })
)

export const updateTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().optional(),
    description: vine.string().trim().optional(),
    category: vine.string().trim().optional(),
    priority: vine.enum(['low', 'medium', 'high']).optional(),
    deadline: vine.date().after("today").transform((value) => DateTime.fromJSDate(value)).optional(),
  })
)