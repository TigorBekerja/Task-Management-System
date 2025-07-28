import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import '#validators/index'
import { createTaskValidator, updateTaskValidator } from '#validators/task'

export default class TasksController {
    public async index({request, response }: HttpContext) {
        const {category, priority, deadline_from, deadline_to, sort} = request.qs()

        let query = Task.query()
        if (category) {
            query = query.where('category', category)
        }
        if (priority) {
            query = query.where('priority', priority)
        }
        if (deadline_from) {
            query = query.where('deadline', '>=', new Date(deadline_from))
        }
        if (deadline_to) {
            query = query.where('deadline', '<=', new Date(deadline_to))
        }

        if (sort) {
            const [field, order] = sort.split(':')
            if (!['title', 'priority', 'deadline', 'createdAt'].includes(field)) {
                return response.status(400).json({ message: 'Invalid sort field' })
            }
            if (field === 'priority') {
                query = query.orderByRaw(`array_position(ARRAY['low', 'medium', 'high'], priority) ${order === 'asc' ? 'ASC' : 'DESC'}`)
            }
            
            query = query.orderBy(field, order === 'asc' ? 'asc' : 'desc')
        } else {
            query = query.orderBy('id', 'asc')
        }

        const tasks = await query
        return response.json(tasks)
    }
    
    public async store({ request, response }: HttpContext) {
        try {
            let validatedData = await createTaskValidator.validate(request.only(
                ['title', 'description', 'category', 'priority', 'deadline']
            ))
            const task = await Task.create(validatedData)
            return response.status(201).json(task)
        } catch (error) {
            return response.status(400).json({ message: 'invalid input' , errors: error.messages })
        }
    }
    
    public async show({ params, response }: HttpContext) {
        const task = await Task.find(params.id)
        if (!task) {
            return response.status(404).json({ message: 'Task not found' })
        }
        return response.json(task)
    }
    
    public async update({ params, request, response }: HttpContext) {
        const data = await updateTaskValidator.validate(request.only(
            ['title', 'description', 'category', 'priority', 'deadline']
        ))
        const task = await Task.find(params.id)
        if (!task) {
            return response.status(404).json({ message: 'Task not found' })
        }
        task.merge(data)
        await task.save()
        
        return response.json(task)
    }
    
    public async destroy({ params, response }: HttpContext) {
        const task = await Task.find(params.id)
        if (!task) {
            return response.status(404).json({ message: 'Task not found' })
        }
        
        await task.delete()
        return response.status(204).send(true)
    }
}