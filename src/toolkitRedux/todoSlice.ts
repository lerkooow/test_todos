import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  task: string;
  checked: boolean;
}

interface TodosState {
  todos: Todo[];
}

export const initialState: TodosState = {
  todos: JSON.parse(localStorage.getItem("todos")!) || [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const newTask: Todo = {
        id: new Date().toISOString(),
        task: action.payload,
        checked: false,
      };
      state.todos.push(newTask);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleTodo(state, action: PayloadAction<string>) {
      const todoId = action.payload;
      const todo = state.todos.find((todo) => todo.id === todoId);
      if (todo) {
        todo.checked = !todo.checked;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      const todoId = action.payload;
      state.todos = state.todos.filter((item) => item.id !== todoId);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.checked);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const selectAllTodo = (state: { todos: TodosState }) => state.todos.todos;

export default todosSlice.reducer;
export const { addTodo, toggleTodo, deleteTask, clearCompleted } = todosSlice.actions;
