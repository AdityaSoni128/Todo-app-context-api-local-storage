import React, { useRef, useState } from "react";
import { useTodo } from "../contexts";

export function Todo({ todo, index }) {
  const { toggleIsCompleted, updateTodo, removeTodo } = useTodo();
  const [isTodoEdited, setIsTodoEdited] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo.todoMessage);
  const editRef = useRef();

  return (
    <div className="w-full bg-white rounded-xl p-3 m-auto flex justify-center gap-2">
        <div className="font-bold text-black text-lg flex items-center ">{index + 1}.</div>
      <input
        type="checkbox"
        disabled={isTodoEdited}
        checked={todo.isCompleted}
        onChange={() => toggleIsCompleted(todo.id)}
      />

      <input
        type="text"
        className={`text-black flex-1 rounded-xl  p-2 border-x-teal-600 ${
          !isTodoEdited ? "outline-none bg-slate-300" : "outline outline-1"
        } `}
        value={updatedTodo}
        readOnly={!isTodoEdited}
        ref={editRef}
        onChange={(e) => {
          if (e.target.value) {
            setUpdatedTodo(e.target.value);
          }
        }}
      />

      <button
        className={`${
          isTodoEdited
            ? "bg-green-400 disabled"
            : "bg-blue-400 disabled:bg-blue-200 disabled:text-gray-500"
        } py-2 mx-2 px-4 rounded-xl`}
        disabled={todo.isCompleted}
        onClick={() => {
          setIsTodoEdited((prev) => {
            const val = !prev;
            if (!val) {
              todo.todoMessage = updatedTodo;
              updateTodo(todo.id, todo);
            } else {
              editRef?.current?.focus();
            }
            return val;
          });
        }}
      >
        {isTodoEdited ? "Save" : "Edit"}
      </button>
      <button
        className="bg-red-400 py-2 px-4 rounded-xl"
        onClick={() => {
          removeTodo(todo.id);
        }}
      >
        remove
      </button>
    </div>
  );
}
