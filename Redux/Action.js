import { types } from "@babel/core";
import { add_todo, remove_todo } from "./Constant";

export const addTodo = (data) => {
  return {
    type: add_todo,
    data: data,
  };
};
export const removeTodo = (id) => {
  return {
    type: remove_todo,
    id: id,
  };
};
