import { v4 as uuidV4 } from "uuid"

interface Task {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

const form = document.getElementById('new-task-form') as HTMLFormElement;
const list = document.querySelector<HTMLUListElement>('#list');
const input = document.querySelector<HTMLInputElement>('#new-task-title')

const tasks: Task[] = loadItems()
tasks.forEach(task => addListItem(task))

form.addEventListener('submit', e => {
  e.preventDefault()

  if (input?.value == '' || input?.value == null) return

  const task: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  addListItem(task)
  tasks.push(task)
})

function addListItem(task: Task) {
  const item = document.createElement('li')
  const label = document.createElement('label')
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.addEventListener('change', () => {
    task.completed = input.checked
    saveItems()
  })
  input.checked = task.completed
  label.append(input, task.title)
  item.append(label)
  list?.append(item)
}

function saveItems(): void {
  localStorage.setItem('TASKS', JSON.stringify(tasks))
}

function loadItems(): Task[] {
  const tasksJSON = localStorage.getItem('TASKS')
  if (tasksJSON == null) return []
  return JSON.parse(tasksJSON)
}
