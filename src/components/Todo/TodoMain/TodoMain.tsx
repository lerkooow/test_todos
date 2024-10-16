import TodoItem from "../TodoItem/TodoItem";
import "./TodoMain.css";

function TodoMain() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="p-4">
          <h2 className="text-7xl text-center text-gray-800">todos</h2>
        </div>
        <TodoItem />
      </div>
    </div>
  );
}

export default TodoMain;
