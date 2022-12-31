import {useState, useEffect} from 'react'
import Clock from './custom/Clock'
import Remaining from './custom/Remaining'

const API_BASE = 'http://localhost:3001'

function App() {
  const [todos, setTodos] = useState([])
  const [popupActive, setPopupActive] = useState(false)
  const[newTodo, setNewTodo] = useState("")
  const[newTime, setTime] = useState()
  const[newPriority, setPriority] = useState(1)

  useEffect(() => {
    GetTodos()
  }, [])

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
     .then(res => res.json())
     .then(data => setTodos(data))
     .catch(err => console.error("Error: ", err))
  }

  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id)
      .then(res => res.json())
    
      setTodos(todos => todos.map(todo => {
        if(todo._id === data._id){
          todo.complete = data.complete
        }

        return todo
      }))
  }

  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE"
    }).then(res => res.json())

    setTodos(todos => todos.filter(todo => todo._id !== data._id))

    for(var i = 0; i < todos.length; i++){
      if(todos[i]._id !== data._id && data.priority <= todos[i].priority){
        decreasePriority(todos[i]._id)
      }
    }
  }

  const deleteAll = async () => {
    const data = await fetch(API_BASE + "/todo/delete/", {
      method: "DELETE"
    }).then(res => res.json())

    setTodos([])
  }

  const addTodo = async () => {
    // Error check
    if(newTodo.replace(/\s/g, '') == ''){
      alert('Invalid input')
      return
    }

    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTodo,
        timestamp:newTime,
        priority:newPriority
      })
    }).then(res => res.json())

    for(var i = 0; i < todos.length; i++){
      if(data.priority <= todos[i].priority){
        increasePriority(todos[i]._id)
      }
    }
    
    setTodos([...todos, data])
    setPopupActive(false)
    setNewTodo("")
    setTime("")
    setPriority(1)
  }

  const increasePriority = async (id) => {
    const data = await fetch(API_BASE + "/todo/increase/" + id, {
      method: "PUT"
    }).then(res => res.json())

    setTodos(todos => todos.map(todo => {
      if(todo._id === data._id){
        todo.priority = data.priority
      }

      return todo
    }))
  }

  const decreasePriority = async (id) => {
    const data = await fetch(API_BASE + "/todo/decrease/" + id, {
      method: "PUT"
    }).then(res => res.json())

    setTodos(todos => todos.map(todo => {
      if(todo._id === data._id){
        todo.priority = data.priority
      }

      return todo
    }))
  }

  todos.sort((a, b) => (a.priority - b.priority))

  return (
    <div className="App">
      <h2 className="title">Your tasks</h2>
      <Clock />
      <div className="todos">
        {todos.length > 0 ? todos.map(todo => (
          <div>
            <div className={
              "todo" + (todo.complete ? " isComplete" : "")
            } key={todo._id}>
              <div className="priority">{todo.priority}</div>

              <div className="text" onClick={() => completeTodo(todo._id)}>{todo.text}</div>

              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>

              <div className="show-text delete-task">delete</div>

              <div className="show-text complete-task">complete</div>
            </div>
            {todo.timestamp ? <Remaining time={todo.timestamp}/> : ''}
          </div>
        )): (
          <p>Your to do list is empty.</p>
        )}
        
      </div>

      <div className="clearAll">
        <div className="clearbtn" onClick={() => deleteAll()}><span>x</span></div>
        <div className="cleartext">clear all</div>
      </div>
      
      <div className="addPopup">
        <div className="addbtn" onClick={() => setPopupActive(true)}><span>+</span></div>
        <div className="addtext">add</div>
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="content">
            <h3>Add Task</h3>
              <span>Task</span>
              <input type="text"
              className="input-text"
              onChange={e => setNewTodo(e.target.value)}
              value={newTodo} 
              placeholder="type your task"
              />
            <span>Time</span>
            <input type="datetime-local" className="input-date" onChange={e => setTime(e.target.value)} value={newTime}/>
            <span>Priority</span>
            <input type="number" className="input-num" onChange={e => setPriority(e.target.value)} value={newPriority} min="1" max={todos.length+1} />
            <div className="button submit" onClick={addTodo}>Create a task</div>
            <div className="button cancel" onClick={() => setPopupActive(false)}>Cancel</div>
          </div>
        </div>
      ) : ''}
    </div>
  );
}

export default App;
