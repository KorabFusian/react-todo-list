import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState } from 'react'
import AddTask from './components/AddTask'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th',
      reminder: true
    },
    {
      id: 2,
      text: 'Pick up Kids',
      day: 'Feb 6th',
      reminder: true
    },
    {
      id: 3,
      text: 'Groceries',
      day: 'Feb 5th',
      reminder: false
    }
  ])

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000 + 1)

    const newTask = { id, ...task }

    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    )
  }

  return (
    <div className="App">
      <Header
        title="Todo List"
        onShow={() => setShowAddTask(!showAddTask)}
        show={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        <p className="empty">No tasks to show !</p>
      )}
    </div>
  )
}

export default App
