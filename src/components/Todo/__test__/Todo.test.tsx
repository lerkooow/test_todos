import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react"; // Import screen here
import store from "../../../toolkitRedux";
import TodoMain from "../TodoMain/TodoMain";
import "@testing-library/jest-dom";
import { addTodo, resetTodos, toggleTodo } from "../../../toolkitRedux/todoSlice";

const MockTodoTask = () => {
  return (
    <Provider store={store}>
      <TodoMain />
    </Provider>
  );
};

describe("TodoItem", () => {
  beforeEach(() => {
    store.dispatch(resetTodos());
  });

  it("should render add todo", () => {
    store.dispatch(addTodo("First Task"));
    store.dispatch(addTodo("Second Task"));
    store.dispatch(addTodo("Third Task"));

    render(<MockTodoTask />);

    expect(screen.getByText("First Task")).toBeInTheDocument();
    expect(screen.getByText("Second Task")).toBeInTheDocument();
    expect(screen.getByText("Third Task")).toBeInTheDocument();
    expect(screen.getByText("3 items left")).toBeInTheDocument();
  });

  it("should render delete todo", () => {
    store.dispatch(addTodo("First Task"));
    store.dispatch(addTodo("Second Task"));
    store.dispatch(addTodo("Third Task"));

    render(<MockTodoTask />);

    expect(screen.getByText("3 items left")).toBeInTheDocument();
    const deleteButton = screen.getByTestId("delete-2");
    fireEvent.click(deleteButton);
    expect(screen.getByText("2 items left")).toBeInTheDocument();
    expect(screen.getByText("First Task")).toBeInTheDocument();
    expect(screen.getByText("Third Task")).toBeInTheDocument();
  });

  it("should filter todo based on selected filter and checked todo", () => {
    store.dispatch(addTodo("First Task"));
    store.dispatch(addTodo("Second Task"));
    store.dispatch(addTodo("Third Task"));

    store.dispatch(toggleTodo(1));
    store.dispatch(toggleTodo(2));

    render(<MockTodoTask />);

    fireEvent.click(screen.getByText("All"));
    expect(screen.getByText("3 items left")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Active"));
    expect(screen.getByText("1 items left")).toBeInTheDocument();
    expect(screen.getByText("Third Task")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Completed"));
    expect(screen.getByText("2 items left")).toBeInTheDocument();
    expect(screen.getByText("First Task")).toBeInTheDocument();
    expect(screen.getByText("Second Task")).toBeInTheDocument();
  });

  it("should Checkbox toggles task completion", () => {
    store.dispatch(addTodo("Second Task"));
    store.dispatch(addTodo("Third Task"));

    render(<MockTodoTask />);

    const checkbox = screen.getByLabelText("Second Task");

    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    fireEvent.click(screen.getByText("Completed"));
    expect(screen.getByText("Second Task")).toBeInTheDocument();
  });

  it("should render clear completed todo", () => {
    store.dispatch(addTodo("First Task"));
    store.dispatch(addTodo("Second Task"));
    store.dispatch(addTodo("Third Task"));

    store.dispatch(toggleTodo(1));
    store.dispatch(toggleTodo(2));

    render(<MockTodoTask />);
    fireEvent.click(screen.getByText("Clear completed"));

    expect(screen.getByText("Third Task")).toBeInTheDocument();
  });
});

describe("TodoAddTask", () => {
  it("should update input value when typing", () => {
    render(<MockTodoTask />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "New Task" } });

    expect(inputElement.value).toBe("New Task");
  });

  it("should dispatch addTodo and clear input on button click", () => {
    render(<MockTodoTask />);

    const inputElement = screen.getByPlaceholderText("What needs to be done?") as HTMLInputElement;
    const addButton = screen.getByTestId("button-add");

    fireEvent.change(inputElement, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    const todos = store.getState().todos.todos;

    expect(todos).toContainEqual({ id: expect.any(Number), task: "New Task", checked: false });

    expect(inputElement.value).toBe("");
  });
});
