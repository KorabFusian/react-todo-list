import Header from './components/Header'
import Tasks from './components/Tasks'
import Footer from './components/Footer'
import { useState, useEffect } from 'react'
import AddTask from './components/AddTask'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const serverTasks = await fetchTasks()
      setTasks(serverTasks)
    }

    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const id = Math.floor(Math.random() * 10000 + 1)

    const newTask = { id, ...task }
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
    const data = await res.json()

    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const task = await fetchTask(id)
    const newTaskVersion = { ...task, reminder: !task.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newTaskVersion)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <Router>
      <div className="App">
        <Header
          title="Todo List"
          onShow={() => setShowAddTask(!showAddTask)}
          show={showAddTask}
        />
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                <p className="empty">No tasks to show !</p>
              )}
            </>
          )}
        />

        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  )
}

export default App
