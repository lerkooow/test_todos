import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  task: string;
  checked: boolean;
}

interface TodosState {
  todos: Todo[];
  nextId: number;
}

export const initialState: TodosState = {
  todos: JSON.parse(localStorage.getItem("todos")!) || [],
  nextId: JSON.parse(localStorage.getItem("nextId")!) || 1,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const newTask: Todo = {
        id: state.nextId,
        task: action.payload,
        checked: false,
      };
      state.todos.push(newTask);
      state.nextId += 1;
      localStorage.setItem("todos", JSON.stringify(state.todos));
      localStorage.setItem("nextId", JSON.stringify(state.nextId));
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todoId = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.checked = !todo.checked;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      const todoId = action.payload;
      state.todos = state.todos.filter((item) => item.id !== todoId);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.checked);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    resetTodos(state) {
      state.todos = [];
      state.nextId = 1;
      localStorage.setItem("todos", JSON.stringify(state.todos));
      localStorage.setItem("nextId", JSON.stringify(state.nextId));
    },
  },
});

export const selectAllTodo = (state: { todos: TodosState }) => state.todos.todos;

export default todosSlice.reducer;
export const { addTodo, toggleTodo, deleteTask, clearCompleted, resetTodos } = todosSlice.actions;
