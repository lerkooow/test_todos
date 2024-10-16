import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../../toolkitRedux/todoSlice";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
function TodoAddTask() {
  const [task, setTask] = useState(localStorage.getItem("task") || "");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (task) {
      dispatch(addTodo(task));
    }
    setTask("");
    localStorage.removeItem("task");
  };

  return (
    <div>
      <div className="flex">
        <input
          placeholder="What needs to be done?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-4 border focus:outline-none"
        />
        <button onClick={handleAddTodo} className="bg-gray-100 text-white px-4 py-2 hover:bg-gray-200">
          <PlaylistAddIcon style={{ color: "black" }} />
        </button>
      </div>
    </div>
  );
}

export default TodoAddTask;
