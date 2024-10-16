import { useDispatch, useSelector } from "react-redux";
import { deleteTask, selectAllTodo, toggleTodo, clearCompleted } from "../../../toolkitRedux/todoSlice";
import TodoAddTask from "../TodoAddTask/TodoAddTask";
import { Checkbox } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState } from "react";

function TodoItem() {
  console.log(1);
  const todo = useSelector(selectAllTodo);
  const dispatch = useDispatch();
  console.log(2);

  const [filter, setFilter] = useState("all");
  console.log(3);

  const filteredTodo = todo.filter((todo) => {
    if (filter === "completed") return todo.checked;
    if (filter === "active") return !todo.checked;
    return true;
  });

  const contentToDisplay = (() => {
    if (filteredTodo.length === 0) {
      if (filter === "active") {
        return <span className="text-gray-500">No active tasks...</span>;
      } else if (filter === "completed") {
        return <span className="text-gray-500">No completed tasks...</span>;
      } else {
        return <span className="text-gray-500">No tasks...</span>;
      }
    } else {
      return filteredTodo.map((item) => (
        <div className="flex items-center justify-between" key={item.id}>
          <li className={`p-2 rounded-md mb-2 transition-colors ${item.checked ? "line-through" : ""}`}>
            <Checkbox
              checked={item.checked}
              onChange={() => dispatch(toggleTodo(item.id))}
              color="default"
              aria-label={item.task}
            />
            <span className="text-gray-700">{item.task}</span>
          </li>
          <button
            data-testid={`delete-${item.id}`}
            onClick={() => dispatch(deleteTask(item.id))}
            className="text-red-500 hover:text-red-700"
          >
            <DeleteOutlinedIcon />
          </button>
        </div>
      ));
    }
  })();

  console.log(4);

  return (
    <div className="shadow-lg">
      <TodoAddTask />
      <ul className="p-4">{contentToDisplay}</ul>
      <div className="p-4 text-sm text-gray-600 border-t">
        <div className="mt-2 flex space-x-4 text-gray-500 justify-around">
          <h6 className="font-medium">{filteredTodo.length} items left</h6>
          <button
            onClick={() => setFilter("all")}
            className={` ${filter === "all" ? "font-bold hover:underline" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={` ${filter === "active" ? "font-bold hover:underline" : ""}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={` ${filter === "completed" ? "font-bold hover:underline" : ""}`}
          >
            Completed
          </button>
          <button onClick={() => dispatch(clearCompleted())} className=" text-red-500">
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
