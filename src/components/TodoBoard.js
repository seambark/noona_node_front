import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, updateTask, deleteTask }) => {
  return (
    <div>
      <h2>Todo List</h2>
      <div className="todo-area">
        {todoList?.length > 0 ? (
          todoList?.map((item, index) => (
            <TodoItem
              item={item}
              key={index}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <h2>There is no Item to show</h2>
        )}
      </div>
    </div>
  );
};

export default TodoBoard;
