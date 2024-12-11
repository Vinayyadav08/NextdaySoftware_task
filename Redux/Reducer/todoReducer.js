import { add_todo, remove_todo } from "../Constant";

const initState = [];

const todoReducer = (state = initState, action) => {
  switch (action.type) {
    case add_todo:
      return [...state, action.data];
    case remove_todo:
      return state.filter((i) => i.id != action.id);
    default:
      return state;
  }
};

export default todoReducer;