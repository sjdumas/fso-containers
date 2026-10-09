import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import Todo from './Todo'

describe('Todo', () => {
	test('renders the text of a todo that is not done', () => {
		const todo = { _id: '1', text: 'Write tests', done: false }

		render(<Todo todo={todo} deleteTodo={() => { }} completeTodo={() => { }} />)

		expect(screen.getByText('Write tests')).toBeInTheDocument()
		expect(screen.getByText('This todo is not done')).toBeInTheDocument()
		expect(screen.getByText('Set as done')).toBeInTheDocument()
	})

	test('a done todo shows it is done and has no "Set as done" button', () => {
		const todo = { _id: '2', text: 'Learn Docker', done: true }

		render(<Todo todo={todo} deleteTodo={() => { }} completeTodo={() => { }} />)

		expect(screen.getByText('This todo is done')).toBeInTheDocument()
		expect(screen.queryByText('Set as done')).not.toBeInTheDocument()
	})

	test('clicking the buttons calls the right functions with the todo', () => {
		const todo = { _id: '3', text: 'Click buttons', done: false }
		const deleteTodo = vi.fn()
		const completeTodo = vi.fn()

		render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)

		fireEvent.click(screen.getByText('Delete'))
		expect(deleteTodo).toHaveBeenCalledWith(todo)

		fireEvent.click(screen.getByText('Set as done'))
		expect(completeTodo).toHaveBeenCalledWith(todo)
	})
})
