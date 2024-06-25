import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts/TodoContext";
import { Todo, TodoForm } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([todo, ...todos]);
  };

  const updateTodo = (id, newTodo) => {
    setTodos(todos.map((todo) => (todo.id === id ? newTodo : todo)));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleIsCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos && todos.length && setTodos(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, removeTodo, toggleIsCompleted }}
    >
      <div className="bg-slate-900 h-screen text-white">
        <h1 className="text-3xl font-semibold underline text-center">
          Todo App
        </h1>
        <TodoForm />
        <div className="flex-col bg-slate-800 rounded-xl flex gap-7 w-2/5 m-auto h-3/5 overflow-y-auto p-8">
          {todos.map((todo, index) => (
            <Todo key={todo.id} todo={todo} index={index} />
          ))}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
