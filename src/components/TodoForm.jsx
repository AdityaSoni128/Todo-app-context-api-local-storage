import React, { useRef, useState } from "react";
import { useTodo } from "../contexts";

export function TodoForm() {
  const [todoMessage, setTodoMessage] = useState("");
  const { addTodo } = useTodo();
  const todoMessageRef = useRef();
  const addTodos = () => {
    const todo = {
      id: Date.now(),
      todoMessage,
      isCompleted: false,
    };
    addTodo(todo);
    setTodoMessage("");
    todoMessageRef?.current?.focus();
  };
  return (
    <div className="rounded-2xl w-1/4 m-auto flex mt-10 p-2 mb-6">
      <input
        type="text"
        className="flex-1 text-black rounded-xl rounded-r-none p-3 border-x-teal-600 outline"
        value={todoMessage}
        maxLength={40}
        onChange={(e) => setTodoMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodos();
          }
        }}
        placeholder="Add todo..."
        ref={todoMessageRef}
      />

      <button
        className="p-2 w-20 rounded-xl rounded-l-none bg-green-400"
        onClick={addTodos}
      >
        Add
      </button>
    </div>
  );
}
